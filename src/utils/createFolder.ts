// utils/folder.ts
import { withAuthRequest } from '@/utils/withAuthRequest'

export const createFolder = async (typeValue: string, folderId: any, name: any) => {
  let url = `http://121.199.10.78:8000/api/v1/collections/folders?target_type=${typeValue}`
  const data = {
    name: name,
    parent_id: folderId,
  }
  await withAuthRequest(
    { url, method: 'POST', data },
    (res) => {
      const data = res.data as any
      console.log(data)
    },
    (err) => {
      console.warn('移动文件夹失败', err)
    },
  )
}
