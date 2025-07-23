// utils/folder.ts
import { withAuthRequest } from '@/utils/withAuthRequest'

export const removeCollectedItems = async (typeValue: string, folderId: any, remove: any) => {
  let url = `http://121.199.10.78:8001/api/v1/collections/items?target_type=${typeValue}`
  const data = {
    item_ids: folderId,
    target_remove: remove,
  }
  await withAuthRequest(
    { url, method: 'DELETE', data },
    (res) => {
      const data = res.data as any
      console.log('this is remove feedback', data)
      console.log('this is remove feedback statuscode', data.statusCode)
      if (data.statusCode === 200) {
        uni.showToast({
          title: '移除成功',
          icon: 'success',
          duration: 2000,
          mask: true,
        })
      }
    },
    (err) => {
      console.warn('删除收藏项失败', err)
      uni.showToast({
        title: '移除失败',
        icon: 'success',
        duration: 2000,
        mask: true,
      })
    },
  )
}
