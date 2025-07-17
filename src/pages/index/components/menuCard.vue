<route lang="json5">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '',
  },
}
</route>

<template>
  <view class="card-wrapper">
    <view class="flex items-center">
      <view class="title-text">常用功能</view>
    </view>
    <view class="flex justify-between menu-content">
      <view class="menu-item" @click="goDetail('syfc')">
        <image class="menu-icon" src="@/static/images/syfc.png" mode="scaleToFill" />
        <view>丝印反查</view>
      </view>
      <view class="menu-item" @click="goDetail('classifyQuery')">
        <image class="menu-icon" src="@/static/images/flcx.png" mode="scaleToFill" />
        <view>分类选型</view>
      </view>
      <view class="menu-item" @click="test">
        <image class="menu-icon" src="@/static/images/jtcx.png" mode="scaleToFill" />
        <view>交替查询</view>
      </view>
      <view class="menu-item" @click="test">
        <image class="menu-icon" src="@/static/images/cxtd.png" mode="scaleToFill" />
        <view>替代查询</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
//
const goDetail = (url: string) => {
  uni.navigateTo({
    url: `/pages/${url}/index`,
  })
}
const test = () => {
  // uni.showModal({
  //   title: '敬请期待',
  // })
  uni.showToast({
    title: '敬请期待~',
    icon: 'none',
  })
}
</script>

<style lang="scss" scoped>
//
.card-wrapper {
  background: #ffffff;
  box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.05);
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  border: 2rpx solid #eeeeee;
  box-sizing: border-box;
  padding: 20rpx;
  margin: 0 20rpx;
}
.title-text {
  height: 40rpx;
  font-weight: 500;
  font-size: 28rpx;
  color: #333333;
  line-height: 40rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
  flex: 1;
}
.menu-content {
  margin-top: 22rpx;
  box-sizing: border-box;
  padding: 0 24rpx;
}
.menu-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > view {
    height: 34rpx;
    font-weight: 500;
    font-size: 24rpx;
    color: #333333;
    line-height: 34rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}
.menu-icon {
  width: 56rpx;
  height: 56rpx;
  margin-bottom: 20rpx;
}
</style>
