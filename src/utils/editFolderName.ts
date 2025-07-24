// utils/folder.ts
import { withAuthRequest } from '@/utils/withAuthRequest'

export const editFolderName = async (typeValue: string, folderId: any, name: any) => {
  let url = `http://121.199.10.78:8001/api/v1/collections/folders/${folderId}/rename?target_type=${typeValue}&new_name=${name}`

  return await withAuthRequest(
    { url, method: 'PUT' },
    (res) => {
      const data = res.data as any
      console.log(data)
      return res
    },
    (err) => {
      console.warn('移动文件夹失败', err)
    },
  )
}
