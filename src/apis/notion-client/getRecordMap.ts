import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"
import { normalizeRecordMap } from "src/libs/utils/notion/normalizeRecordMap"

const normalizePageId = (pageId: string) => {
  return pageId.replace(/-/g, "")
}

export const getRecordMap = async (pageId: string) => {
  const api = new NotionAPI()

  const safePageId = normalizePageId(pageId)
  const recordMap = normalizeRecordMap(await api.getPage(idToUuid(safePageId)))

  return recordMap
}
