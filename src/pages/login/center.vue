<template>
  <view class="container">
    <view class="login-area">
      <button class="avatar-button" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
        <view class="avatar">
          <image :src="avatarUrl" class="avatar-img" mode="aspectFill" />
        </view>
      </button>

      <view class="text-area">
        <view class="user-name" @click="getUserProfile">{{ userName }}</view>
        <view class="login-guide" @click="login">登录账号后即可解锁更多 ></view>
      </view>
    </view>

    <view class="info-area">
      <view class="mine">
        <view class="personal" @click="toPersonalCenter">个人中心</view>
        <view class="divider"></view>
        <view class="collection" @click="toCollection">我的收藏</view>
        <view class="divider"></view>
        <view class="history">我的足迹</view>
      </view>
      <view class="mine">
        <view class="download">下载历史</view>
        <view class="divider"></view>
        <view class="feedback">问题反馈</view>
      </view>
      <view class="mine">
        <view class="about">关于lumy</view>
      </view>
      <view class="mine">
        <view class="about" @click="toPrivacy">隐私保护</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { withAuthUpload } from '@/utils/withAuthUpload'
import { withAuthRequest } from '@/utils/withAuthRequest'
const status = ref(false)
const userName = ref('游客')
const avatarUrl = ref('../../static/images/cxtd.png')

// 跳转到隐私选择页
const toPrivacy = () => {
  uni.navigateTo({ url: '/pages/privacy/index' })
}

// 点击头像选择
const onChooseAvatar = (e: any) => {
  avatarUrl.value = e.detail.avatarUrl
  uni.setStorageSync('avatar', avatarUrl.value)
  download(avatarUrl.value)
}

// 点击用户名获取昵称（推荐）
const getUserProfile = () => {
  wx.getUserProfile({
    desc: '用于完善个人资料',
    success: (res) => {
      console.log(res)
      const info = res.userInfo
      userName.value = info.nickName
    },
    fail: () => {
      uni.showToast({ title: '用户取消授权', icon: 'none' })
    },
  })
}

// 登录
const login = async () => {
  const loginRes = await uni.login()
  const res = await uni.request({
    url: 'http://121.199.10.78:8001/api/v1/auth/wechat_login',
    method: 'POST',
    data: {
      code: loginRes.code,
    },
  })
  console.log('只是接口一返回', res)
  const data = res.data as any
  // 判断是否有手机号
  if (data.detail === 'Missing phone number') {
    uni.navigateTo({
      url: '/pages/login/phoneLogin',
    })
  } else {
    uni.setStorageSync('token', data.access_token)
    uni.setStorageSync('refresh', data.refresh_token)

    uni.setStorageSync('status', true)
    await getPersonalInfo('http://121.199.10.78:8001/')
    uni.showToast({ title: '登录成功' })
  }
}

// 去个人中心
const toPersonalCenter = () => {
  status.value = uni.getStorageSync('status') || false
  if (status.value) {
    uni.navigateTo({ url: '/pages/personal-info/edit' })
  } else {
    uni.showToast({
      title: '请先登录',
      icon: 'error',
      duration: 2000,
      mask: true,
    })
  }
}

// 去收藏夹
const toCollection = () => {
  if (uni.getStorageSync('status')) {
    uni.navigateTo({
      url: '/pages/login/collection',
    })
  } else {
    uni.showToast({
      title: '请先登录',
      icon: 'error',
      duration: 2000,
      mask: true,
    })
  }
}
// download avatar
const download = async (url: string) => {
  if (!url) {
    uni.showToast({ title: '头像地址无效', icon: 'none' })
    return
  }

  uni.downloadFile({
    url,
    success: (res) => {
      if (res.statusCode === 200) {
        withAuthUpload(
          {
            url: 'http://121.199.10.78:8001/api/v1/users/me/avatar',
            uploadMode: true,
            filePath: res.tempFilePath,
            method: 'PUT',
            data: {},
          },
          (uploadRes) => {
            console.log('上传成功', uploadRes)
            uni.showToast({ title: '上传成功', icon: 'success' })
          },
          (err) => {
            console.error('上传失败', err)
            uni.showToast({ title: '上传失败', icon: 'none' })
          },
        )
      } else {
        console.warn('下载失败 statusCode:', res.statusCode)
        uni.showToast({ title: '头像下载失败', icon: 'none' })
      }
    },
    fail: (err) => {
      console.error('下载请求失败', err)
      uni.showToast({ title: '网络错误，下载失败', icon: 'none' })
    },
  })
}

// 获取个人信息
const getPersonalInfo = async (head: string) => {
  const url = head + 'api/v1/users/me'

  await withAuthRequest(
    {
      url: url,
      method: 'GET',
    },
    (res) => {
      console.log('this is res of getPersonal Info', res)
      const data = res.data as any
      avatarUrl.value = head + 'api/v1/files/download?path=' + data.avatar_url
    },
    (err) => {
      console.log('出发了获取信息报错流程')
      avatarUrl.value = '../../static/images/cxtd.png'
      console.log('这是报错后的头像地址', (avatarUrl.value = '../../static/images/cxtd.png'))
    },
  )
}

onShow(async () => {
  await getPersonalInfo('http://121.199.10.78:8001/')
  console.log('主页面加载')
})
</script>

<style lang="css" scoped>
.container {
  width: 100%;
  height: 100vh;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-area {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 100rpx 30rpx 0 30rpx;
  box-sizing: border-box;
}

.avatar-button {
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
}

.avatar {
  width: 126rpx;
  height: 126rpx;
  background: #ffffff;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.text-area {
  flex: 1;
  padding-left: 30rpx;
  padding-right: 30rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
}

.user-name {
  font-weight: 400;
  font-size: 32rpx;
  color: #000000;
  line-height: 42rpx;
  cursor: pointer;
}

.login-guide {
  font-weight: 400;
  font-size: 24rpx;
  color: #888888;
  line-height: 36rpx;
  margin-top: 10rpx;
}

.info-area {
  align-items: center;
  margin-top: 60rpx;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  box-sizing: border-box;
}

.mine {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30rpx;
  width: 630rpx;
  background: #ffffff;
  border-radius: 46rpx;
  border: 2rpx solid rgba(211, 211, 211, 0);
  padding-left: 40rpx;
}

.personal,
.collection,
.history,
.download,
.feedback,
.about {
  width: 100%;
  height: 90rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: Inter, Inter;
  font-weight: 400;
  font-size: 29rpx;
  color: #000000;
  line-height: 42rpx;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.divider {
  width: 610.69rpx;
  height: 0rpx;
  border-radius: 0rpx;
  border: 1rpx solid #f5f7fa;
}
</style>
