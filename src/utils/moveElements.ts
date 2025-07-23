// utils/folder.ts
import { withAuthRequest } from '@/utils/withAuthRequest'

export const moveElements = async (
  typeValue: string,
  itemIDs: number[],
  target_folder_id: number,
) => {
  let url = `http://121.199.10.78:8001/api/v1/collections/items/move?target_type=${typeValue}`

  console.log('请求 URL:', url)

  const data = {
    item_ids: itemIDs,
    target_folder_id: target_folder_id,
  }
  console.log('this is move data', data)
  await withAuthRequest(
    { url, method: 'PUT', data },
    (res) => {
      const data = res.data as any
      console.log(data)
    },
    (err) => {
      console.warn('移动文件夹失败', err)
    },
  )
}
