// utils/folder.ts
import { withAuthRequest } from '@/utils/withAuthRequest'

export const removeCollectedItems = async (typeValue: string, folderId: any, remove: any) => {
  let url = `http://121.199.10.78:8000/api/v1/collections/items?target_type=${typeValue}`
  const data = {
    item_ids: folderId,
    target_remove: remove,
  }
  await withAuthRequest(
    { url, method: 'DELETE', data },
    (res) => {
      const data = res.data as any
      console.log(data)
    },
    (err) => {
      console.warn('删除收藏项失败', err)
    },
  )
}
