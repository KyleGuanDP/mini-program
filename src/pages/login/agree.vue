<template>
  <view class="page">
    <view v-if="modelValue" class="popup-mask">
      <view class="popup-content">
        <view class="popup-title">用户隐私保护</view>
        <view class="popup-text">
          阅读并同意
          <text class="link" @click="openAgreement('user')">《用户协议》</text>
          <text class="link" @click="openAgreement('privacy')">《隐私条款》</text>
        </view>
        <view class="popup-actions">
          <view class="popup-btn reject" @click="handleReject">不同意</view>
          <view class="popup-btn accept" @click="handleAccept">同意</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue'])
const openAgreement = (type: 'user' | 'privacy') => {
  const url = type === 'user' ? '/pages/agreement/user' : '/pages/agreement/privacy'
  uni.navigateTo({ url })
}

const handleAccept = () => {
  emit('update:modelValue', false)
}

const handleReject = () => {
  uni.showModal({
    title: '提示',
    content: '您必须同意协议才能继续使用',
    showCancel: false,
  })
}
</script>

<style scoped>
.popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999; /* 确保在顶层 */
}
.popup-content {
  background: #fff;
  width: 80%;
  border-radius: 16rpx;
  padding: 40rpx 20rpx;
  text-align: center;
}
.popup-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}
.popup-text {
  font-size: 28rpx;
  margin-bottom: 40rpx;
}
.link {
  color: #007aff;
  margin: 0 10rpx;
}
.popup-actions {
  display: flex;
  justify-content: space-around;
  border-top: 1px solid #eee;
}
.popup-btn {
  flex: 1;
  padding: 20rpx 0;
  font-size: 30rpx;
}
.reject {
  color: #666;
  border-right: 1px solid #eee;
}
.accept {
  color: #007aff;
}
</style>
