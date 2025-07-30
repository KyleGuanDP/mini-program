export const getFilterItems = async (category: any): Promise<any> => {
  const url = `http://121.199.10.78:8001/api/v1/categories/search?category_lv3=${category.name}`

  return new Promise((resolve, reject) => {
    uni.request({
      url,
      method: 'POST',
      success: (res) => {
        const data = res.data as any
        const finalData = data.data
        if (res.statusCode === 200) {
          console.log('这是品牌data', finalData)
          resolve(finalData)
        } else {
          reject('请求失败')
        }
      },
      fail: (err) => {
        console.error('网络错误', err)
        reject(err)
      },
    })
  })
}
