// 1. 基础下载功能
import { getEnvBaseUrl } from './index'
const COMMON_MIME_TYPES = {
  // 文档类
  'application/pdf': 'PDF',
  'application/msword': 'DOC',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
  'application/vnd.ms-excel': 'XLS',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
  'text/plain': 'TXT',
  'text/csv': 'CSV',

  // 图片类
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
  'image/gif': 'GIF',
  'image/webp': 'WEBP',
  'image/svg+xml': 'SVG',

  // 压缩包
  'application/zip': 'ZIP',
  'application/x-rar-compressed': 'RAR',

  // 音频视频
  'audio/mpeg': 'MP3',
  'video/mp4': 'MP4',

  // 网页相关
  'text/html': 'HTML',
  'text/css': 'CSS',
  'application/javascript': 'JS',
  'application/json': 'JSON',

  // 默认回退
  'application/octet-stream': 'BIN',
}
export const downloadFile = (url, fileName, path = false) => {
  let baseUrl = getEnvBaseUrl()
  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: 'Loading...',
    })
    console.log('下载文件:', url, '文件名:', fileName, path)

    uni.downloadFile({
      url: path ? `${baseUrl}/api/v1/files/download?fid=${url}` : url,
      success: (res) => {
        uni.hideLoading()
        console.log('下载结果:', res)
        if (res.statusCode === 200) {
          var filePath = res.tempFilePath
          let fileType = COMMON_MIME_TYPES[res?.header['Content-Type']] || 'UNKNOWN'
          // 下载成功，保存到相册或本地
          if (isImage(fileName) || isImage(filePath)) {
            // 如果是图片，保存到相册
            saveImageToAlbum(res.tempFilePath)
          } else {
            // 其他文件类型，打开文档预览
            openDocument(res.tempFilePath, fileType)
          }
          resolve(res.tempFilePath)
        } else {
          uni.showToast({
            title: '下载失败',
            icon: 'none',
          })
          reject(new Error('下载失败'))
        }
      },
      fail: (err) => {
        uni.hideLoading()
        uni.showToast({
          title: '下载失败',
          icon: 'none',
        })
        reject(err)
      },
    })
  })
}

// 2. 判断是否为图片文件
const isImage = (fileName) => {
  const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
  const ext = fileName.toLowerCase().substring(fileName.lastIndexOf('.'))
  return imageExts.includes(ext)
}

// 3. 保存图片到相册
const saveImageToAlbum = (filePath) => {
  uni.saveImageToPhotosAlbum({
    filePath: filePath,
    success: () => {
      uni.showToast({
        title: '保存成功',
        icon: 'success',
      })
    },
    fail: (err) => {
      if (err.errMsg.includes('auth')) {
        // 权限被拒绝，引导用户开启权限
        uni.showModal({
          title: '提示',
          content: '需要相册权限来保存图片，请在设置中开启',
          confirmText: '去设置',
          success: (res) => {
            if (res.confirm) {
              uni.openSetting()
            }
          },
        })
      } else {
        uni.showToast({
          title: '保存失败',
          icon: 'none',
        })
      }
    },
  })
}

// 4. 打开文档预览
const openDocument = (filePath, fileType) => {
  uni.openDocument({
    filePath: filePath,
    fileType: fileType,
    showMenu: true,
    success: () => {
      console.log('打开文档成功')
    },
    fail: (err) => {
      console.log(err, fileType, filePath)
      uni.showToast({
        title: '无法预览此文件',
        icon: 'none',
      })
    },
  })
}

// 5. 带进度的下载功能
export const downloadFileWithProgress = (url, fileName) => {
  return new Promise((resolve, reject) => {
    let downloadTask = uni.downloadFile({
      url: url,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.tempFilePath)
        } else {
          reject(new Error('下载失败'))
        }
      },
      fail: reject,
    })

    // 监听下载进度
    downloadTask.onProgressUpdate((res) => {
      console.log('下载进度', res.progress)
      console.log('已下载数据长度', res.totalBytesWritten)
      console.log('预期下载数据总长度', res.totalBytesExpectedToWrite)

      // 可以在这里更新UI进度条
      uni.showLoading({
        title: `下载中 ${res.progress}%`,
      })
    })
  })
}
