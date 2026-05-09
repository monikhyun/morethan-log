import { CONFIG } from "site.config"
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"

import getAllPageIds from "src/libs/utils/notion/getAllPageIds"
import getPageProperties from "src/libs/utils/notion/getPageProperties"
import { normalizeRecordMap } from "src/libs/utils/notion/normalizeRecordMap"
import { TPosts } from "src/types"

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */

// TODO: react query를 사용해서 처음 불러온 뒤로는 해당데이터만 사용하도록 수정
export const getPosts = async () => {
  const rawPageId = CONFIG.notionConfig.pageId as string
  const id = idToUuid(rawPageId)
  const api = new NotionAPI()

  const response = normalizeRecordMap(
    await api.getPage(id, { fetchCollections: false })
  )
  const collection = Object.values(response.collection)[0]?.value
  const block = response.block
  const schema = collection?.schema

  const rawMetadata =
    block[id]?.value ??
    block[rawPageId]?.value ??
    Object.values(block).find((block: any) => {
      const type = block?.value?.type
      return type === "collection_view_page" || type === "collection_view"
    })?.value

  // Check Type
  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    return []
  } else {
    const collectionId = rawMetadata.collection_id ?? collection?.id
    await fetchCollectionData(api, response, collectionId, rawMetadata.view_ids)

    // Construct Data
    const pageIds = getAllPageIds(response)
    const data = []
    for (let i = 0; i < pageIds.length; i++) {
      const id = pageIds[i]
      const properties = (await getPageProperties(id, block, schema)) || null
      // Add fullwidth, createdtime to properties
      properties.createdTime = new Date(
        block[id].value?.created_time
      ).toString()
      properties.fullWidth =
        (block[id].value?.format as any)?.page_full_width ?? false

      data.push(properties)
    }

    // Sort by date
    data.sort((a: any, b: any) => {
      const dateA: any = new Date(a?.date?.start_date || a.createdTime)
      const dateB: any = new Date(b?.date?.start_date || b.createdTime)
      return dateB - dateA
    })

    const posts = data as TPosts
    return posts
  }
}

async function fetchCollectionData(
  api: NotionAPI,
  response: any,
  collectionId?: string,
  viewIds: string[] = []
) {
  if (!collectionId || !viewIds.length) {
    return
  }

  response.collection_query = response.collection_query ?? {}
  response.collection_query[collectionId] =
    response.collection_query[collectionId] ?? {}

  for (const viewId of viewIds) {
    const collectionView = response.collection_view?.[viewId]?.value

    if (!collectionView) {
      continue
    }

    const collectionData = await api.getCollectionData(
      collectionId,
      viewId,
      collectionView
    )
    const recordMap = normalizeRecordMap(collectionData.recordMap)

    Object.assign(response.block, recordMap.block)
    Object.assign(response.collection, recordMap.collection)
    Object.assign(response.collection_view, recordMap.collection_view)
    Object.assign(response.notion_user, recordMap.notion_user)

    response.collection_query[collectionId][viewId] =
      (collectionData.result as any)?.reducerResults
  }
}
