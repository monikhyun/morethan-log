import { NotionAPI } from "notion-client"
import { idToUuid } from "notion-utils"

export const getRecordMap = async (pageId: string) => {
  const api = new NotionAPI()
  const recordMap = await api.getPage(idToUuid(pageId))
  return recordMap
}
