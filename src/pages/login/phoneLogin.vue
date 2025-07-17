<template>
  <view class="agree-container">
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

    <!-- 登录按钮 -->
    <button
      open-type="getPhoneNumber"
      @getphonenumber="onGetPhoneNumber"
      :disabled="!isChecked"
      class="login-button"
    >
      一键登录 / 获取手机号
    </button>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import agree from './agree.vue' // 可选，如果你有协议弹窗组件

const isChecked = ref(false)
const isShow = ref(false)

const onChange = (e: any) => {
  isChecked.value = e.detail.value.includes('agree')
}

const openAgreement = (type: 'user' | 'privacy') => {
  const url = type === 'user' ? '/pages/agreement/user' : '/pages/agreement/privacy'
  uni.navigateTo({ url })
}

// 手机号授权登录
const onGetPhoneNumber = async (e: any) => {
  console.log('微信按钮返回数据:', e.detail)
  console.log('这是手机code', e.detail.code)

  if (e.detail.errMsg !== 'getPhoneNumber:ok') {
    uni.showToast({ title: '用户拒绝授权', icon: 'none' })
    return
  }

  const loginRes = await uni.login()
  const code = loginRes.code

  const res = await uni.request({
    url: 'http://121.199.10.78:8000/api/v1/auth/wechat_login_bind_phone',
    method: 'POST',
    data: {
      phone_code: e.detail.code,
      code: code,
    },
  })

  if (res.statusCode === 200) {
    console.log('这是手机号登录返回信息', res)
    uni.setStorageSync('status', true)
    uni.navigateTo({ url: '/pages/login/center' })
  }
}
</script>

<style scoped>
.agree-container {
  padding: 60rpx 40rpx;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  width: 100%;
  height: 88rpx;
  background-color: #007aff;
  color: #fff;
  font-size: 30rpx;
  border-radius: 12rpx;
}
</style>
