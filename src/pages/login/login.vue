<template>
  <view class="user-center">
    <view v-if="!hasLogin">
      <button @click="login">点击登录</button>
    </view>
    <view v-else>
      <image :src="userInfo.avatarUrl" mode="aspectFit" />
      <text>{{ userInfo.nickName }}</text>
      <button @click="logout">退出登录</button>
    </view>
    <view>
      <button @click="getUserProfile">获取用户信息</button>
    </view>
    <view>
      <button @click="tokenPrint">查看token</button>
    </view>
    <view>
      <button @click="getUserInfo">Get</button>
    </view>
    <view>
      <button @click="toAvatar">头像</button>
    </view>
    <view>
      <button @click="toFavorite">收藏</button>
    </view>
    <view>
      <button @click="toPop">收藏弹窗</button>
    </view>
    <view>
      <button @click="toLogin">去登录界面</button>
    </view>
    <view>
      <button @click="toCollection">去收藏界面</button>
    </view>
    <view>
      <button @click="toCollectionPopUp">toCollectionPopUp</button>
    </view>
    <view class="photo">
      <image
        src="../../static/images/back.png"
        mode="scaleToFill"
        @click="zoomIn"
        style="width: 200px; height: 200px"
      />
    </view>
    <view v-if="show">
      <view></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import name from './name.vue'
const userInfo = ref<any>({})
const hasLogin = ref(false)
const show = ref(false)

const toCollectionPopUp = () => {
  uni.navigateTo({
    url: '/pages/favorite/addCollection',
  })
}
const toLogin = () => {
  uni.navigateTo({
    url: '/pages/login/center',
  })
}

const toCollection = () => {
  uni.navigateTo({
    url: '/pages/favorite/index',
  })
}
const toAvatar = () => {
  uni.navigateTo({
    url: '/pages/login/avatar',
  })
}

const toFavorite = () => {
  uni.navigateTo({
    url: '/pages/favorite/main',
  })
}

// 收藏弹窗
const toPop = () => {
  uni.navigateTo({
    url: '/pages/favorite/pop',
  })
}
// 图片放大
const zoomIn = () => {
  uni.previewImage({
    current: '/static/images/back.png',
    urls: ['/static/images/back.png'],
    success: () => console.log('预览成功'),
    fail: (err) => console.error('预览失败', err),
  })
}

const getUserProfile = () => {
  uni.getUserProfile({
    desc: '用于完善会员资料',
    lang: 'zh_CN',
    success: (res) => {
      console.log('用户信息', res)
      userInfo.value = res.userInfo
    },
    fail: (err) => {
      console.error('获取失败', err)
      uni.showToast({ title: '获取信息失败', icon: 'none' })
    },
  })
}

const login = async () => {
  const loginRes = await uni.login()
  console.log('this is code', loginRes.code)

  const res = await uni.request({
    url: 'http://121.199.10.78:8000/api/v1/auth/wechat_login',
    method: 'POST',
    data: {
      code: loginRes.code,
      userInfo: {
        nickName: '测试用户',
        gender: 1,
        language: 'zh_CN',
        city: 'Beijing',
        province: 'Beijing',
        country: 'China',
      },
    },
  })

  console.log(res)

  const data = res.data as any
  if (data.access_token) {
    uni.setStorageSync('token', data.access_token)
    uni.setStorageSync('refresh', data.refresh_token)
    userInfo.value = data.user
    hasLogin.value = true
    uni.showToast({ title: '登录成功' })
  }
}

const tokenPrint = () => {
  const token = uni.getStorageSync('token')
  const refresh = uni.getStorageSync('refresh')
  console.log('this is my token', token)
  console.log('this is my refresh', refresh)
}

//获取用户信息
const getUserInfo = async () => {
  const token = uni.getStorageSync('token')
  const res = await uni.request({
    url: 'http://121.199.10.78:8000/api/v1/users/me',
    method: 'GET',
    header: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (res.statusCode === 200) {
    console.log('用户信息请求成功：', res.data)
  } else if (res.statusCode === 401) {
    const refreshToken = uni.getStorageSync('refresh')
    const refreshRes = await uni.request({
      url: 'http://121.199.10.78:8000/api/v1/auth/refresh_token',
      method: 'POST',
      header: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })

    if (refreshRes.statusCode === 200) {
      console.log('刷新成功，重新尝试获取用户信息')
      const data = refreshRes.data as any
      const token = data.access_token
      const refresh = data.refresh_token
      uni.setStorageSync('token', token)
      uni.setStorageSync('refresh', refresh)

      await getUserInfo()
    } else {
      console.error('refresh_token 也失效了')
      await login()
    }
  } else {
  }
}

const logout = () => {
  uni.removeStorageSync('token')
  hasLogin.value = false
  userInfo.value = {}
}
</script>
