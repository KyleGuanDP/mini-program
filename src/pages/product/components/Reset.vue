<template>
  <view class="container">
    <view class="reset" @click="handleReset">
      <view class="reset-image">
        <image src="/static/images/product/reset.png" mode="aspectFit" />
      </view>
      <view class="reset-title">重置</view>
    </view>
    <view class="comfirm" @click="handleConfirm">确定</view>
  </view>
</template>

<script lang="ts" setup>
const emit = defineEmits(['reset', 'confirm'])

const handleReset = () => {
  emit('reset')
}

const handleConfirm = () => {
  emit('confirm')
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 150rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  box-shadow: 0rpx -10rpx 30rpx 2rpx rgba(0, 0, 0, 0.05);
}
.reset {
  margin-right: 20rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 192rpx;
  height: 80rpx;
  border-radius: 40rpx;
  border: 2rpx solid #e6e6e6;
  background: #f7f7f7;
}
.reset-image {
  margin-right: 10rpx;
  width: 28rpx;
  height: 32rpx;
}
.reset-image image {
  width: 100%;
  height: 100%;
  display: block;
}
.reset-title {
  font-size: 28rpx;
  color: #333333;
  line-height: 40rpx;
}
.comfirm {
  margin-right: 20rpx;
  width: 496rpx;
  height: 80rpx;
  background: linear-gradient(90deg, #ff7c4d 0%, #e65925 100%);
  border-radius: 40rpx;
  color: white;
  font-size: 28rpx;
  text-align: center;
  line-height: 80rpx;
}
</style>
