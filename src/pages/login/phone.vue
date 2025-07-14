<!-- template -->
<template>
  <view>
    <button open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
      一键登录 / 获取手机号
    </button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const onGetPhoneNumber = async (e) => {
  console.log('按钮返回:', e.detail)

  if (e.detail.errMsg === 'getPhoneNumber:ok') {
    const encryptedData = e.detail.encryptedData
    const iv = e.detail.iv

    const loginRes = await uni.login()
    const code = loginRes.code

    const res = await uni.request({
      url: 'https://你的后端接口/api/wechat/phone_login',
      method: 'POST',
      data: {
        code,
        encryptedData,
        iv,
      },
    })

    console.log('后端登录返回:', res.data)

    if (res.statusCode === 200) {
      const token = res.data as any
      console.log(res.data)
      uni.setStorageSync('token', token.access_toke)
      uni.showToast({ title: '登录成功' })
    }
  } else {
    uni.showToast({ title: '用户拒绝授权', icon: 'none' })
  }
}
</script>
