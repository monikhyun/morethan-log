import { getTextContent, getDateValue } from "notion-utils"
import { NotionAPI } from "notion-client"
import { BlockMap, CollectionPropertySchemaMap } from "notion-types"
import { customMapImageUrl } from "./customMapImageUrl"

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

async function getPageProperties(
  id: string,
  block: BlockMap,
  schema: CollectionPropertySchemaMap
) {
  const api = new NotionAPI()

  const blockValue = getRecordValue(block?.[id])
  const rawProperties = Object.entries(blockValue?.properties || [])

  const excludeProperties = ["date", "select", "multi_select", "person", "file"]
  const properties: any = {}

  properties.id = id?.replace(/-/g, "") ?? null

  for (let i = 0; i < rawProperties.length; i++) {
    const [key, val]: any = rawProperties[i]

    if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
      properties[schema[key].name] = getTextContent(val) ?? null
    } else {
      switch (schema[key]?.type) {
        case "file": {
          try {
            const url: string = val[0][1][0][1]
            const newurl = customMapImageUrl(url, blockValue)
            properties[schema[key].name] = newurl ?? null
          } catch (error) {
            properties[schema[key].name] = null
          }
          break
        }

        case "date": {
          const dateProperty: any = getDateValue(val)

          if (dateProperty) {
            delete dateProperty.type
            properties[schema[key].name] = dateProperty
          } else {
            properties[schema[key].name] = null
          }

          break
        }

        case "select": {
          const selects = getTextContent(val)

          if (selects?.[0]?.length) {
            properties[schema[key].name] = selects.split(",")
          } else {
            properties[schema[key].name] = []
          }

          break
        }

        case "multi_select": {
          const selects = getTextContent(val)

          if (selects?.[0]?.length) {
            properties[schema[key].name] = selects.split(",")
          } else {
            properties[schema[key].name] = []
          }

          break
        }

        case "person": {
          const rawUsers = val.flat()
          const users = []

          for (let i = 0; i < rawUsers.length; i++) {
            if (rawUsers[i]?.[0]?.[1]) {
              const userId = rawUsers[i][0]
              const res: any = await api.getUsers(userId)

              const rawUserValue =
                res?.recordMapWithRoles?.notion_user?.[userId[1]]

              const resValue = getRecordValue(rawUserValue)

              const user = {
                id: resValue?.id ?? null,
                name:
                  resValue?.name ??
                  `${resValue?.family_name ?? ""}${resValue?.given_name ?? ""}` ??
                  null,
                profile_photo: resValue?.profile_photo ?? null,
              }

              users.push(user)
            }
          }

          properties[schema[key].name] = users
          break
        }

        default:
          break
      }
    }
  }

  return properties
}

export { getPageProperties as default }
