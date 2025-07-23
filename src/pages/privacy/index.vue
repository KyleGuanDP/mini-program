<template>
  <view class="container">
    <view @click="toRegistration">用户注册协议</view>
    <view @click="toPrivacy">隐私协议</view>
    <view @click="toGuide">用户隐私保护指引</view>
  </view>
</template>

<script setup lang="ts">
const toRegistration = () => {
  uni.navigateTo({ url: '/pages/privacy/registration' })
}

const toPrivacy = () => {
  uni.navigateTo({ url: '/pages/privacy/privacy' })
}

const toGuide = () => {
  uni.navigateTo({ url: '/pages/privacy/guide' })
}
</script>
