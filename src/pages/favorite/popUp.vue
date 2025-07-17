<template>
  <view class="popup">
    <view class="popup-content">
      <text class="text-success">收藏成功！</text>
      <text class="text-action" @click="changeState">添加到目录 ></text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['change'])

const changeState = () => {
  emit('change')
}
</script>

<style scoped>
.popup {
  position: fixed;
  bottom: 100rpx;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(145deg, #ffffff, #f7f7f7);
  padding: 28rpx 40rpx;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  z-index: 999;
  min-width: 500rpx;
  max-width: 80%;
  justify-content: space-between;
}

.popup-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.text-success {
  font-size: 30rpx;
  font-weight: 600;
  color: #2ecc71;
}

.text-action {
  font-size: 28rpx;
  color: #007aff;
  font-weight: 500;
  padding: 8rpx 16rpx;
  border-radius: 12rpx;
  transition: background-color 0.2s ease;
}

.text-action:active {
  background-color: rgba(0, 122, 255, 0.08);
}
</style>
