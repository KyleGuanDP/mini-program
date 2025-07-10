<route lang="json5">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '',
  },
}
</route>

<template>
  <view class="card">
    <view class="text">使用指南与搜索技巧</view>
    <view class="inner-card card-1">
      <view class="inner-text">什么是丝印反查？</view>
      <view class="intro-text">通过元器件表面丝印（印字、标记代码）来识别电子元器件型号。</view>
    </view>
    <view class="inner-card card-2">
      <view class="inner-text">如何搜索？</view>
      <view class="intro-text">
        直接输入丝印标记、如果没有结果，尝试删除后缀（批次、日期代码）。
      </view>
    </view>
    <view class="inner-card card-3">
      <view class="inner-text">找不到结果？</view>
      <view class="intro-text">检查输入准确性或尝试使用下方的高级搜索技巧。</view>
    </view>
    <view class="inner-card card-4">
      <view class="inner-text">高级搜索技巧</view>
      <view class="flex items-center mt">
        <view class="green"></view>
        <view class="intro-text text-2">全部丝印搜不出时，可以删减后缀尝试</view>
      </view>
      <view class="flex items-center mt">
        <view class="green"></view>
        <view class="intro-text text-2">多行可以尝试每行分别搜索</view>
      </view>
      <view class="flex items-center mt">
        <view class="green"></view>
        <view class="intro-text text-2">字样作为品牌logo标识，不作为搜索关键词</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
//
</script>

<style lang="scss" scoped>
.card {
  min-height: 920rpx;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.05);
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  margin: 0 20rpx;
  padding: 30rpx;
}
.text {
  height: 40rpx;
  min-height: 40rpx;
  font-weight: 500;
  font-size: 28rpx;
  color: #333333;
  line-height: 40rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-bottom: 26rpx;
}
.inner-card {
  min-height: 152rpx;
  background: #ffffff;
  border-radius: 10rpx 10rpx 10rpx 10rpx;
  border: 2rpx solid #eeeeee;
  margin-bottom: 20rpx;
  box-sizing: border-box;
  padding-top: 20rpx;
  padding-left: 40rpx;
  padding-right: 18rpx;
  padding-bottom: 20rpx;
}
.card-1 {
  border-left: 12rpx solid #ff7c4d;
}
.card-2 {
  border-left: 12rpx solid #f9b378;
}
.card-3 {
  border-left: 12rpx solid #e65925;
}
.card-4 {
  border-left: 12rpx solid #22c55e;
}
.inner-text {
  height: 34rpx;
  font-weight: 500;
  font-size: 24rpx;
  color: #333333;
  line-height: 34rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.intro-text {
  height: 68rpx;
  font-weight: 400;
  font-size: 24rpx;
  color: #666666;
  line-height: 34rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-top: 10rpx;
}
.text-2 {
  height: 34rpx;
  margin-top: 0;
}
.text-3 {
  height: 34rpx;
  color: #e65925;
  margin-top: 0;
}
.green {
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: #22c55e;
  margin-right: 10rpx;
}
.mt {
  margin-top: 10rpx;
}
</style>
