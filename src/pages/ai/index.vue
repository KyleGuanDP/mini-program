<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    transparentTitle: 'always',
    allowsBounceVertical: 'false',
    pullRefresh: 'false',
  },
}
</route>
<template>
  <view class="inner-wrapper" :style="{ paddingTop: (systemInfo.safeAreaInsets?.top || 0) + 'px' }">
    <scroll-view scroll-y>
      <view
        class="flex justify-center"
        :style="{ paddingTop: (systemInfo.menuInfoHeight || 0) + 'px' }"
      >
        <image class="logo" src="@/static/images/ai/logo.png" mode="scaleToFill" />
      </view>
      <view class="title flex items-center justify-center">
        <image class="title-text" src="@/static/images/ai/text.png" mode="scaleToFill" />
      </view>

      <view class="card">
        <view class="flex items-center">
          <image class="icon1" src="@/static/images/ai/icon1.png" mode="scaleToFill" />
          <view class="text1">方案选型</view>
        </view>
        <view class="card-dec">涵盖芯片技术原理、应用指南和行业标准的专业知识问答系统</view>
        <view class="btn" @click="search">开始选型</view>
      </view>
      <view class="card card2">
        <view class="flex items-center">
          <image class="icon1" src="@/static/images/ai/icon2.png" mode="scaleToFill" />
          <view class="text1">SemlKnow</view>
        </view>
        <view class="card-dec">涵盖芯片技术原理、应用指南和行业标准的专业知识问答系统</view>
        <view class="btn" @click="search">开始对话</view>
      </view>
      <view class="card card3">
        <view class="flex items-center">
          <image class="icon1" src="@/static/images/ai/icon3.png" mode="scaleToFill" />
          <view class="text1">辅助设计</view>
        </view>
        <view class="card-dec">通过分析不同的用户场景，为您定制设计方案</view>
        <view class="btn" @click="search">开始设计</view>
      </view>
      <view class="card card4">
        <view class="flex items-center">
          <image class="icon1" src="@/static/images/ai/icon4.png" mode="scaleToFill" />
          <view class="text1">资料问答</view>
        </view>
        <view class="card-dec">针对DS中的内容进行问答</view>
        <view class="btn" @click="search">开始解答</view>
      </view>
    </scroll-view>
    <!-- <view class="search">
      <view class="flex items-center">
        <image class="icon1" src="@/static/images/ai/icon5.png" mode="scaleToFill" />
        <view class="text1">或者直接开始对话</view>
      </view>
      <view class="input-wrapper">
        <input
          class="my-input"
          v-model="value"
          placeholder="请输入您的问题，例如:推荐一款低功耗的MCU…"
          placeholder-style="color: #666666 ; font-size: 12px;"
        />
        <image
          class="icon2"
          @click="search"
          src="@/static/images/ai/icon6.png"
          mode="scaleToFill"
        />
      </view>
    </view> -->
  </view>
  <tabbar />
</template>

<script lang="ts" setup>
import { useSystemInfoStore } from '@/store'
defineOptions({
  name: 'Ai',
})

const systemInfo = useSystemInfoStore()
const value = ref()
onLoad(() => {})
const search = () => {
  console.log('value', value.value)
  uni.navigateTo({ url: '/pages/ai/search' })
}
</script>
<style lang="scss" scoped>
.inner-wrapper {
  background: #f9f9f9;
  height: 100vh;
  box-sizing: border-box;
}
.title {
  margin-top: 20rpx;
  margin-bottom: 60rpx;
}
.title-text {
  width: 170rpx;
  height: 32rpx;
}
.logo {
  width: 100rpx;
  height: 100rpx;
}
.card {
  margin: 0 20rpx;
  background: linear-gradient(180deg, #f6f0ff 0, #ffffff 80px);
  box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.05);
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  box-sizing: border-box;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  margin-bottom: 20rpx;

  .btn {
    height: 54rpx;
    background: linear-gradient(90deg, #8e54e9 0%, #4776e6 100%);
    border-radius: 10rpx 10rpx 10rpx 10rpx;
    font-weight: 500;
    font-size: 24rpx;
    color: #ffffff;
    line-height: 54rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;
    margin-top: 40rpx;
  }
}
.card2 {
  background: linear-gradient(180deg, #eff6ff 0, #ffffff 80px);
  .btn {
    background: #2f80ed;
  }
}
.card3 {
  background: linear-gradient(180deg, #fff5e5 0, #ffffff 80px);
  .btn {
    background: #ebb256;
  }
}
.card4 {
  background: linear-gradient(180deg, #ffece5 0, #ffffff 80px);
  .btn {
    background: #e65925;
  }
}
.content {
  margin: 0 20rpx;
  margin-bottom: 20rpx;
}
.icon1 {
  width: 40rpx;
  height: 40rpx;
  margin-right: 10rpx;
}
.text1 {
  height: 40rpx;
  font-weight: 500;
  font-size: 28rpx;
  color: #000105;
  line-height: 40rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
  flex: 1;
}
.card-dec {
  font-weight: 400;
  font-size: 24rpx;
  color: #7e7f81;
  line-height: 36rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-top: 20rpx;
}
.search {
  margin: 0 20rpx;
  height: 200rpx;
  background: linear-gradient(90deg, #f1f5fd 0%, #f9f3f9 100%);
  box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.05);
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  box-sizing: border-box;
  padding: 20rpx;
  margin-top: 20rpx;
}
.input-wrapper {
  height: 80rpx;
  background: #ffffff;
  border-radius: 10rpx 10rpx 10rpx 10rpx;
  border: 2rpx solid #2a7de1;
  box-sizing: border-box;
  padding-left: 30rpx;
  padding-right: 24rpx;
  display: flex;
  align-items: center;
  margin-top: 40rpx;
}
.my-input {
  flex: 1;
  font-size: 24rpx;
  color: #000105;
}
.icon2 {
  width: 48rpx;
  height: 48rpx;
  margin-left: 50rpx;
}
</style>
