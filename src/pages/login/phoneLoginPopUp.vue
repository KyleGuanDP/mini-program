<template>
  <view class="container">
    <view class="content">
      <view class="title">用户协议</view>
      <view class="notice">
        用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议
      </view>
      <!-- 登录按钮 -->
      <button open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber" class="login-button">
        一键登录 / 获取手机号
      </button>
    </view>
  </view>
</template>
<script lang="ts" setup>
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
    url: 'http://121.199.10.78:8001/api/v1/auth/wechat_login_bind_phone',
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

<style lang="css" scoped>
[class] {
  border: 1rpx solid;
}

.container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  background: #fff;
  width: 80%;
  height: 50vh;
  padding: 40rpx;
  border-radius: 16rpx;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
</style>
