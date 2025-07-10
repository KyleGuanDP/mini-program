<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    transparentTitle: 'always',
    allowsBounceVertical: 'false',
    pullRefresh: 'false',
  },
}
</route>

<template>
  <view class="inner-wrapper" :style="{ paddingTop: systemInfo.safeAreaInsets?.top + 'px' }">
    <view class="flex header">
      <image class="back-icon" @click="back" src="@/static/images/back.png" mode="scaleToFill" />
    </view>
    <scroll-view scroll-y class="scroll-content">
      <view class="flex items-center justify-center mb-22rpx">
        <image class="logo" src="@/static/images/syfc-logo.png" mode="scaleToFill" />
      </view>
      <view class="title-card">
        <image class="title-text" src="@/static/images/biaoti.png" mode="scaleToFill" />
      </view>
      <SearchCard />
      <historyCard v-if="searchHistoryStore.syfcHistoryList.length" />
      <introduceCard />
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import historyCard from '@/pages/syfc/components/historyCard.vue'
import introduceCard from '@/pages/syfc/components/introduceCard.vue'
import SearchCard from '@/pages/syfc/components/searchCard.vue'
import { useSearchHistoryStore, useSystemInfoStore } from '@/store'
const searchHistoryStore = useSearchHistoryStore()
const systemInfo = useSystemInfoStore()
const back = () => {
  uni.navigateBack()
}
onShareAppMessage(() => {
  return {
    title: 'junctionMagic',
    path: '/pages/syfc/index?from=share', // 可带参数
    //imageUrl: 'https://yourdomain.com/share.jpg', // 可选，自定义封面图
  }
})
</script>

<style lang="scss" scoped>
.header {
  box-sizing: border-box;
  padding-left: 40rpx;
  position: relative;
  z-index: 100;
  //height: 100rpx;
  margin-bottom: 22rpx;
}
.inner-wrapper {
  background: #f9f9f9;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.scroll-content {
  flex: 1;
  padding-bottom: 20rpx;
  box-sizing: border-box;
}
.title-card {
  margin-bottom: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title-text {
  width: 118rpx;
  height: 32rpx;
}
.back-icon {
  width: 32rpx;
  height: 32rpx;
  margin-top: 16rpx;
}
.logo {
  width: 100rpx;
  height: 100rpx;
}
</style>
