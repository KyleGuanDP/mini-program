export const withAuthUpload = async (
  requestOptions: UniApp.RequestOptions & { uploadMode?: boolean; filePath?: string },
  onSuccess: (res: UniApp.RequestSuccessCallbackResult | any) => void,
  onFail?: (err: any) => void,
) => {
  let token = uni.getStorageSync('token')

  const doRequest = () => {
    if (requestOptions.uploadMode) {
      return new Promise((resolve, reject) => {
        uni.uploadFile({
          url: requestOptions.url!,
          filePath: requestOptions.filePath!,
          name: 'file',
          formData: requestOptions.data || {},
          header: {
            Authorization: `Bearer ${token}`,
          },
          success: resolve,
          fail: reject,
        })
      })
    } else {
      return uni.request({
        ...requestOptions,
        header: {
          ...requestOptions.header,
          Authorization: `Bearer ${token}`,
        },
      })
    }
  }

  try {
    let res: any = await doRequest()

    if (res.statusCode === 200) {
      onSuccess(res)
    } else if (res.statusCode === 401) {
      const refresh = uni.getStorageSync('refresh')
      if (!refresh) throw new Error('无 refresh_token')

      const refreshRes = await uni.request({
        url: 'http://121.199.10.78:8001/api/v1/auth/refresh_token',
        method: 'POST',
        header: { Authorization: `Bearer ${refresh}` },
      })

      if (refreshRes.statusCode === 200) {
        const data = refreshRes.data as any
        uni.setStorageSync('token', data.access_token)
        uni.setStorageSync('refresh', data.refresh_token)
        token = data.access_token

        res = await doRequest()
        if (res.statusCode === 200) {
          onSuccess(res)
        } else {
          onFail?.(res)
        }
      } else {
        uni.removeStorageSync('token')
        uni.removeStorageSync('refresh')
        uni.showToast({ title: '请重新登录', icon: 'none' })
      }
    } else {
      onFail?.(res)
    }
  } catch (err) {
    onFail?.(err)
    uni.showToast({ title: '请求异常', icon: 'none' })
  }
}
