export const withAuthRequest = async (
  requestOptions: UniApp.RequestOptions,
  onSuccess: (res: UniApp.RequestSuccessCallbackResult) => void,
  onFail?: (err: any) => void,
  silent: boolean = true,
) => {
  let token = ''
  if (silent) {
    token = uni.getStorageSync('token')
  } else {
    token = uni.getStorageSync('refresh')
  }

  try {
    let res = await uni.request({
      ...requestOptions,
      header: {
        ...requestOptions.header,
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.statusCode === 200) {
      onSuccess(res)
    } else if (res.statusCode === 401) {
      const refresh = uni.getStorageSync('refresh')
      if (!refresh) throw new Error('无 refresh_token')

      const refreshRes = await uni.request({
        url: 'http://121.199.10.78:8000/api/v1/auth/refresh_token',
        method: 'POST',
        header: {
          Authorization: `Bearer ${refresh}`,
        },
      })

      if (refreshRes.statusCode === 200) {
        const data = refreshRes.data as any
        uni.setStorageSync('token', data.access_token)
        uni.setStorageSync('refresh', data.refresh_token)

        // 重新请求原请求
        token = data.access_token
        res = await uni.request({
          ...requestOptions,
          header: {
            ...requestOptions.header,
            Authorization: `Bearer ${token}`,
          },
        })

        if (res.statusCode === 200) {
          onSuccess(res)
        } else {
          console.error('刷新后仍失败:', res)
        }
      } else {
        console.error('refresh_token 失效，重新登录')
        uni.removeStorageSync('token')
        uni.removeStorageSync('refresh')
      }
    } else {
      console.error(`请求失败 (${res.statusCode})`)
      onFail?.(res)
    }
  } catch (err) {
    console.error('请求异常:', err)
    onFail?.(err)
    uni.showToast({
      title: '请先登录',
      icon: 'none',
    })
  }
}
