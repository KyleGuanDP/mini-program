// utils/folder.ts
import { withAuthRequest } from '@/utils/withAuthRequest'

export const getAlbum = async (typeValue: string, itemsRef: Ref<any[]>) => {
  let url = `http://121.199.10.78:8001/api/v1/collections/items_unique?target_type=${typeValue}`

  console.log('请求 URL:', url)

  await withAuthRequest(
    { url, method: 'GET' },
    (res) => {
      const data = res.data as any
      itemsRef.value = data.items
    },
    (err) => {
      console.warn('获取文件夹失败', err)
    },
  )
}
