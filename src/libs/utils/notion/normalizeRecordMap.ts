import { ExtendedRecordMap } from "notion-types"

const tableNames = [
  "block",
  "collection",
  "collection_view",
  "notion_user",
  "space",
]

function normalizeRecord(record: any) {
  const nestedRecord = record?.value

  if (!nestedRecord?.value) {
    return record
  }

  return {
    ...record,
    role: record.role ?? nestedRecord.role,
    value: nestedRecord.value,
  }
}

export function normalizeRecordMap<T extends ExtendedRecordMap>(
  recordMap: T
): T {
  const normalizedRecordMap = recordMap as any

  tableNames.forEach((tableName) => {
    const table = normalizedRecordMap[tableName]

    if (!table) {
      return
    }

    Object.keys(table).forEach((id) => {
      table[id] = normalizeRecord(table[id])
    })
  })

  return normalizedRecordMap
}
