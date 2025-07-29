<template>
  <view class="container">
    <view class="content">
      <view class="title">用户隐私保护提示</view>
      <view class="notice">
        感谢您使用本小程序，在使用前您应当 阅读井同意
        <text class="link" @click="toGuide">《用户隐私保护指引》</text>
        ，当 点击同意并继续时，即表示您已理解并 同意该条款内容，该条款将对您产生法
        律约束力；如您不同意，将无法继续使 用小程序相关功能。
      </view>
      <!-- 登录按钮 -->
      <view class="button-group">
        <button @click="close" class="login-button-disagree">不同意</button>
        <button open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber" class="login-button">
          同意并继续
        </button>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
const emit = defineEmits(['close'])

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
    const data = res.data as any
    uni.setStorageSync('token', data.access_token)
    uni.setStorageSync('refresh', data.refresh_token)

    uni.setStorageSync('status', true)
    // await getPersonalInfo('http://121.199.10.78:8001/')
    // console.log("这是头像地址2", avatarUrl.value)
    uni.showToast({ title: '登录成功' })
    setTimeout(() => {
      uni.switchTab({ url: '/pages/login/center' })
    }, 1000)
  }
}

// close
const close = () => {
  emit('close')
}

// toGuide
const toGuide = () => {
  uni.navigateTo({
    url: '/pages/privacy/guide',
  })
}
</script>

<style lang="css" scoped>
/* [class] {
  border: 1rpx solid;
} */

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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  width: 594rpx;
  height: 594rpx;
  background: #ffffff;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  padding: 40rpx;
  border-radius: 16rpx;
  gap: 40rpx;
}

.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 500;
  font-size: 36rpx;
  color: #000000;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.login-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80rpx;
  background: #e65924;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  width: 280rpx;
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

.login-button-disagree {
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 500;
  font-size: 28rpx;
  color: #fa541c;
  border: solid 1rpx;
  border-color: #fa541c;
  text-align: left;
  font-style: normal;
  text-transform: none;
  width: 280rpx;
}

.notice {
  width: 576rpx;
  height: 288rpx;
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 500;
  font-size: 28rpx;
  color: #636572;
  line-height: 48rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.link {
  color: #007aff;
  text-decoration: underline;
  margin: 0 4rpx;
}

.button-group {
  display: flex;
  flex-direction: row;
  gap: 5%;
}
</style>
