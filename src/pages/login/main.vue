<template>
  <view class="container">
    <view class="username">
      {{ username }}
    </view>
    <view>
      <button open-type="getPhoneNumber" @click="onGetPhoneNumber">点击登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const username = ref<string>('微信用户')

// 点击手机号登录
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
      // 更新username
      username.value = token.username
      // 保存username到缓存中
      uni.setStorageSync('username', token.username)
      console.log(res.data)
      uni.setStorageSync('token', token.access_toke)
      uni.showToast({ title: '登录成功' })
    }
  } else {
    uni.showToast({ title: '用户拒绝授权', icon: 'none' })
  }
}
</script>
