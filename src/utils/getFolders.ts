// utils/folder.ts
import { withAuthRequest } from '@/utils/withAuthRequest'

export const getFolder = async (
  typeValue: string,
  folderId: string | null,
  shouldPush: boolean,
  foldersRef: Ref<any[]>,
  itemsRef: Ref<any[]>,
) => {
  let url = `http://121.199.10.78:8001/api/v1/collections/folders/children?target_type=${typeValue}`

  if (folderId !== null) {
    url += `&folder_id=${folderId}`
  }

  console.log('这是getfolder请求 URL:', url)

  return await withAuthRequest(
    { url, method: 'GET' },
    (res) => {
      const data = res.data as any
      console.log('这是后端返回的item', data.items)
      foldersRef.value = data.folders
      itemsRef.value = data.items
      return res
    },
    (err) => {
      console.warn('获取文件夹失败', err)
    },
  )
}
