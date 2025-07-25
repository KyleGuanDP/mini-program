<template>
  <view class="agree-container">
    <view class="brand-logo"></view>

    <view class="content">
      <!-- 协议弹窗组件（可选） -->
      <agree v-model="isShow" class="agree" />

      <!-- 协议勾选区 -->
      <checkbox-group @change="onChange">
        <label class="checkbox-line">
          <checkbox value="agree" :checked="isChecked" />
          <text class="agree-text">
            我已阅读并同意
            <text class="link" @click.stop="openAgreement('user')">《用户协议》</text>
            和
            <text class="link" @click.stop="openAgreement('privacy')">《隐私政策》</text>
          </text>
        </label>
      </checkbox-group>
      <view class="login-button" @click="activePop" v-if="isChecked">一键登录 / 获取手机号</view>
      <view class="login-button-disable" v-else="!isChecked">一键登录 / 获取手机号</view>
    </view>
  </view>
  <phone-login-pop-up v-if="isPopShow" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import phoneLoginPopUp from './phoneLoginPopUp.vue'
import agree from './agree.vue' // 可选，如果你有协议弹窗组件

const isChecked = ref(false)
const isShow = ref(false)
const isPopShow = ref(false)

const onChange = (e: any) => {
  isChecked.value = e.detail.value.includes('agree')
}

const openAgreement = (type: 'user' | 'privacy') => {
  const url = type === 'user' ? '/pages/agreement/user' : '/pages/agreement/privacy'
  uni.navigateTo({ url })
}

// active pop
const activePop = () => {
  isPopShow.value = true
}
</script>

<style lang="css" scoped>
[class] {
  border: 1rpx solid;
}

.agree-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.brand-logo {
  width: 90%;
  height: 700rpx;
  background-color: rgb(99, 82, 82);
  margin-top: 100rpx;
}

.content {
  margin-top: 100rpx;
}

.checkbox-line {
  display: flex;
  align-items: center;
  margin-bottom: 40rpx;
}

.agree-text {
  font-size: 26rpx;
  color: #666;
  margin-left: 16rpx;
}

.link {
  color: #007aff;
  text-decoration: underline;
  margin: 0 4rpx;
}

.login-button {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;
  width: 518rpx;
  height: 80rpx;
  background: #e65924;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  width: 100%;
  height: 88rpx;
  color: #fff;
  font-family: Inter, Inter;
  font-weight: 400;
  font-size: 30rpx;
  color: #ffffff;
  line-height: 44rpx;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.login-button-disable {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;
  width: 518rpx;
  height: 80rpx;
  background: #e1dddb;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  width: 100%;
  height: 88rpx;
  color: #fff;
  font-family: Inter, Inter;
  font-weight: 400;
  font-size: 30rpx;
  color: #ffffff;
  line-height: 44rpx;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
</style>
