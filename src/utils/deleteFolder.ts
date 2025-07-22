// utils/folder.ts
import { withAuthRequest } from '@/utils/withAuthRequest'

export const deleteFolder = async (typeValue: string, folderId: any) => {
  let url = `http://121.199.10.78:8000/api/v1/collections/folders?target_type=${typeValue}`
  const data = {
    folder_ids: folderId,
  }
  await withAuthRequest(
    { url, method: 'DELETE', data },
    (res) => {
      const data = res.data as any
      console.log(data)
    },
    (err) => {
      console.warn('删除文件夹失败', err)
    },
  )
}
