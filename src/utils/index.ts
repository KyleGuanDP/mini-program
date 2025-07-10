import pagesConfig from '@/pages.json'
import { isMpWeixin } from './platform'

const { pages, subPackages, tabBar = { list: [] } } = { ...pagesConfig }
export const tabBarList = tabBar.list

export const getLastPage = () => {
  // getCurrentPages() 至少有1个元素，所以不再额外判断
  // const lastPage = getCurrentPages().at(-1)
  // 上面那个在低版本安卓中打包会报错，所以改用下面这个【虽然我加了 src/interceptions/prototype.ts，但依然报错】
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}

/** 判断当前页面是否是 tabbar 页  */
export const getIsTabbar = () => {
  try {
    const lastPage = getLastPage()
    const currPath = lastPage?.route

    return Boolean(tabBar?.list?.some((item) => item.pagePath === currPath))
  } catch {
    return false
  }
}

/**
 * 判断指定页面是否是 tabbar 页
 * @param path 页面路径
 * @returns true: 是 tabbar 页 false: 不是 tabbar 页
 */
export const isTableBar = (path: string) => {
  if (!tabBar) {
    return false
  }
  if (!tabBar.list.length) {
    // 通常有 tabBar 的话，list 不能有空，且至少有2个元素，这里其实不用处理
    return false
  }
  // 这里需要处理一下 path，因为 tabBar 中的 pagePath 是不带 /pages 前缀的
  if (path.startsWith('/')) {
    path = path.substring(1)
  }
  return !!tabBar.list.find((e) => e.pagePath === path)
}

/**
 * 获取当前页面路由的 path 路径和 redirectPath 路径
 * path 如 '/pages/login/index'
 * redirectPath 如 '/pages/demo/base/route-interceptor'
 */
export const currRoute = () => {
  const lastPage = getLastPage()
  const currRoute = (lastPage as any).$page
  // console.log('lastPage.$page:', currRoute)
  // console.log('lastPage.$page.fullpath:', currRoute.fullPath)
  // console.log('lastPage.$page.options:', currRoute.options)
  // console.log('lastPage.options:', (lastPage as any).options)
  // 经过多端测试，只有 fullPath 靠谱，其他都不靠谱
  const { fullPath } = currRoute as { fullPath: string }
  // console.log(fullPath)
  // eg: /pages/login/index?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor (小程序)
  // eg: /pages/login/index?redirect=%2Fpages%2Froute-interceptor%2Findex%3Fname%3Dfeige%26age%3D30(h5)
  return getUrlObj(fullPath)
}

const ensureDecodeURIComponent = (url: string) => {
  if (url.startsWith('%')) {
    return ensureDecodeURIComponent(decodeURIComponent(url))
  }
  return url
}
/**
 * 解析 url 得到 path 和 query
 * 比如输入url: /pages/login/index?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor
 * 输出: {path: /pages/login/index, query: {redirect: /pages/demo/base/route-interceptor}}
 */
export const getUrlObj = (url: string) => {
  const [path, queryStr] = url.split('?')
  // console.log(path, queryStr)

  if (!queryStr) {
    return {
      path,
      query: {},
    }
  }
  const query: Record<string, string> = {}
  queryStr.split('&').forEach((item) => {
    const [key, value] = item.split('=')
    // console.log(key, value)
    query[key] = ensureDecodeURIComponent(value) // 这里需要统一 decodeURIComponent 一下，可以兼容h5和微信y
  })
  return { path, query }
}
/**
 * 得到所有的需要登录的 pages，包括主包和分包的
 * 这里设计得通用一点，可以传递 key 作为判断依据，默认是 needLogin, 与 route-block 配对使用
 * 如果没有传 key，则表示所有的 pages，如果传递了 key, 则表示通过 key 过滤
 */
export const getAllPages = (key = 'needLogin') => {
  // 这里处理主包
  const mainPages = pages
    .filter((page) => !key || page[key])
    .map((page) => ({
      ...page,
      path: `/${page.path}`,
    }))

  // 这里处理分包
  const subPages: any[] = []
  subPackages.forEach((subPageObj) => {
    // console.log(subPageObj)
    const { root } = subPageObj

    subPageObj.pages
      .filter((page) => !key || page[key])
      .forEach((page: { path: string } & Record<string, any>) => {
        subPages.push({
          ...page,
          path: `/${root}/${page.path}`,
        })
      })
  })
  const result = [...mainPages, ...subPages]
  // console.log(`getAllPages by ${key} result: `, result)
  return result
}

/**
 * 得到所有的需要登录的 pages，包括主包和分包的
 * 只得到 path 数组
 */
export const getNeedLoginPages = (): string[] => getAllPages('needLogin').map((page) => page.path)

/**
 * 得到所有的需要登录的 pages，包括主包和分包的
 * 只得到 path 数组
 */
export const needLoginPages: string[] = getAllPages('needLogin').map((page) => page.path)

/**
 * 根据微信小程序当前环境，判断应该获取的 baseUrl
 */
export const getEnvBaseUrl = () => {
  // 请求基准地址
  let baseUrl = import.meta.env.VITE_SERVER_BASEURL

  // 微信小程序端环境区分
  if (isMpWeixin) {
    const {
      miniProgram: { envVersion },
    } = uni.getAccountInfoSync()

    switch (envVersion) {
      case 'develop':
        baseUrl = import.meta.env.VITE_SERVER_BASEURL__WEIXIN_DEVELOP || baseUrl
        break
      case 'trial':
        baseUrl = import.meta.env.VITE_SERVER_BASEURL__WEIXIN_TRIAL || baseUrl
        break
      case 'release':
        baseUrl = import.meta.env.VITE_SERVER_BASEURL__WEIXIN_RELEASE || baseUrl
        break
    }
  }

  return baseUrl
}

/**
 * 根据微信小程序当前环境，判断应该获取的 UPLOAD_BASEURL
 */
export const getEnvBaseUploadUrl = () => {
  // 请求基准地址
  let baseUploadUrl = import.meta.env.VITE_UPLOAD_BASEURL

  // 微信小程序端环境区分
  if (isMpWeixin) {
    const {
      miniProgram: { envVersion },
    } = uni.getAccountInfoSync()

    switch (envVersion) {
      case 'develop':
        baseUploadUrl = import.meta.env.VITE_UPLOAD_BASEURL__WEIXIN_DEVELOP || baseUploadUrl
        break
      case 'trial':
        baseUploadUrl = import.meta.env.VITE_UPLOAD_BASEURL__WEIXIN_TRIAL || baseUploadUrl
        break
      case 'release':
        baseUploadUrl = import.meta.env.VITE_UPLOAD_BASEURL__WEIXIN_RELEASE || baseUploadUrl
        break
    }
  }

  return baseUploadUrl
}

/**
 * 下载并打开文件方法兼容小程序 app ios 安卓
 * @param url 文件地址
 */
export const openFileByUrl = (url: any, type: any) => {
  console.log(url)
  let baseUrl = getEnvBaseUrl()
  uni.downloadFile({
    url: `${baseUrl}/api/v1/files/download?fid=${url}`,
    // url: `https://www.pwithe.com/Public/Upload/download/20170211/589ebf8e5bb13.pdf`,
    success: function (res) {
      var filePath = res.tempFilePath
      console.log('下载成功', res)
      //只下载不打开
      if (type == 1) {
        uni.showToast({
          // title: `下载成功,文件存储路径为${res.tempFilePath}`,
          title: `下载成功`,
          icon: 'success',
          duration: 2000,
        })
        return
      }
      // console.log(filePath);
      // window.open(filePath);

      // 打开文件
      let fileType = ''
      const sufInx = res.tempFilePath.lastIndexOf('.')
      fileType = res.tempFilePath
        .substring(sufInx + 1)
        .split('&')[0]
        .split('?')[0]
      const supportedTypes = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf']
      if (!supportedTypes.includes(fileType.toLowerCase())) {
        uni.showToast({
          title: '暂不支持打开该文档类型',
          icon: 'none',
          duration: 2000,
        })
        return
      }
      uni.openDocument({
        filePath: filePath,
        fileType: fileType,
        showMenu: true,
        success: function (res) {
          console.log('打开文档成功')
        },
        fail: function (err) {
          console.log(err)
          console.log('打开文档失败')
        },
      })

      // //下载成功，得到文件临时地址
      // console.log('下载成功', res.tempFilePath);
    },
    fail: function (err) {
      uni.showToast({
        title: '下载失败',
        icon: 'none',
        duration: 2000,
      })
      console.log('文件下载失败', err)
    },
  })
}
export const filterEmptyValues = (obj) => {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return obj
  }

  const result = {}

  for (const [key, value] of Object.entries(obj)) {
    if (['automotive_grade', 'industry_grade', 'consumer_grade'].includes(key) && value === null) {
      continue
    }
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // 如果值是对象，递归处理
      const filteredValue = filterEmptyValues(value)

      // 检查过滤后的对象是否还有有效属性
      if (Object.keys(filteredValue).length > 0) {
        result[key] = filteredValue
      }
    } else if (hasValue(value)) {
      // 如果值不为空，保留该属性
      result[key] = value
    }
    // 如果值为空，则不添加到结果中（即移除）
  }

  return result
}

/**
 * 判断一个值是否有有效内容
 * @param {*} value - 要检查的值
 * @returns {boolean} - 是否有有效内容
 */
function hasValue(value) {
  // null 或 undefined
  if (value === null || value === undefined) {
    return false
  }

  // 空字符串
  if (typeof value === 'string' && value.trim() === '') {
    return false
  }

  // 空数组
  if (Array.isArray(value) && value.length === 0) {
    return false
  }

  // 空对象
  if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) {
    return false
  }

  return true
}
