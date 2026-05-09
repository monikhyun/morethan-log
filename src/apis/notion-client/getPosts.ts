import { CONFIG } from "site.config"
import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"

import getAllPageIds from "src/libs/utils/notion/getAllPageIds"
import getPageProperties from "src/libs/utils/notion/getPageProperties"
import { normalizeRecordMap } from "src/libs/utils/notion/normalizeRecordMap"
import { TPosts } from "src/types"

/**
 * Notion record에서 실제 value만 꺼낸다.
 *
 * Old:
 * record.value
 *
 * New / nested:
 * record.value.value
 */
const getRecordValue = (record: any) => {
  const value = record?.value

  if (
    value &&
    typeof value === "object" &&
    "value" in value &&
    "role" in value
  ) {
    return value.value
  }

  return value
}

export const getPosts = async () => {
  const rawPageId = CONFIG.notionConfig.pageId as string
  const id = idToUuid(rawPageId)
  const api = new NotionAPI()

  const response = normalizeRecordMap(
    await api.getPage(id, { fetchCollections: false })
  )

  const block = response.block
  const collection = getRecordValue(Object.values(response.collection)[0])
  const schema = collection?.schema

  const metadataBlock = Object.values(block).find((record: any) => {
    const value = getRecordValue(record)
    return (
      value?.type === "collection_view_page" ||
      value?.type === "collection_view"
    )
  })

  const rawMetadata =
    getRecordValue(block[id]) ??
    getRecordValue(block[rawPageId]) ??
    getRecordValue(metadataBlock)

  if (
    rawMetadata?.type !== "collection_view_page" &&
    rawMetadata?.type !== "collection_view"
  ) {
    return []
  }

  const collectionId = rawMetadata.collection_id ?? collection?.id

  await fetchCollectionData(api, response, collectionId, rawMetadata.view_ids)

  const pageIds = getAllPageIds(response)
  const data = []

  for (let i = 0; i < pageIds.length; i++) {
    const pageId = pageIds[i]
    const blockValue = getRecordValue(block[pageId])

    if (!blockValue) {
      continue
    }

    const properties = (await getPageProperties(pageId, block, schema)) || null

    if (!properties) {
      continue
    }

    properties.createdTime = new Date(blockValue?.created_time).toString()
    properties.fullWidth = (blockValue?.format as any)?.page_full_width ?? false

    data.push(properties)
  }

  data.sort((a: any, b: any) => {
    const dateA: any = new Date(a?.date?.start_date || a.createdTime)
    const dateB: any = new Date(b?.date?.start_date || b.createdTime)
    return dateB - dateA
  })

  const posts = data as TPosts
  return posts
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
    const collectionView = getRecordValue(response.collection_view?.[viewId])

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
