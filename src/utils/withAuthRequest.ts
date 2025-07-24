export const withAuthRequest = async (
  requestOptions: UniApp.RequestOptions,
  onSuccess: (res: UniApp.RequestSuccessCallbackResult) => any, // 👈 让回调返回内容
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
      return onSuccess(res) // 👈 加上 return
    } else if (res.statusCode === 401) {
      const refresh = uni.getStorageSync('refresh')
      if (!refresh) throw new Error('无 refresh_token')

      const refreshRes = await uni.request({
        url: 'http://121.199.10.78:8001/api/v1/auth/refresh_token',
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
          return onSuccess(res) // 👈 关键也要 return 这里的
        } else {
          console.error('刷新后仍失败:', res)
          onFail?.(res)
        }
      } else {
        console.error('refresh_token 失效，重新登录')
        uni.removeStorageSync('token')
        uni.removeStorageSync('refresh')
        onFail?.(refreshRes)
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
