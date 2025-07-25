import { withAuthRequest } from '@/utils/withAuthRequest'

/**
 * 将资源添加到指定文件夹
 * @param {string} type - 资源类型（如 'image'、'video'）
 * @param {string|number} folderId - 目标文件夹ID
 * @param {string} name - 资源名称
 * @param {string} path - 资源路径
 * @returns {Promise<void>} - 异步操作结果
 */
export const addToFolder = async (
  baseUrl: string,
  type: string,
  target_id: string | number,
  folderId: string | number,
  name: string,
  path: string,
): Promise<any> => {
  const url = baseUrl + `?target_type=${type}`
  const data = {
    target_id: target_id,
    target_name: name,
    target_path: path,
    folder_id: folderId,
  }

  return withAuthRequest(
    {
      url,
      method: 'POST',
      data,
    },
    (res) => {
      uni.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 2000,
      })
      return res
    },
    (err) => {
      console.error('添加到文件夹失败:', err)
      uni.showToast({
        title: '收藏失败',
        icon: 'none',
      })
    },
  )
}
