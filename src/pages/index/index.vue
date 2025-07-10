<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '',
  },
}
</route>
<template>
  <view class="inner-wrapper">
    <scroll-view scroll-y>
      <view class="title-card flex justify-center">
        <image class="logo2" src="@/static/images/logo-text.png" mode="widthFix" />
      </view>
      <SearchCard />
      <HotSearch />
      <menuCard />
      <HotBrand />
    </scroll-view>
  </view>
  <!-- <tabbar /> -->
</template>

<script lang="ts" setup>
import HotBrand from '@/pages/index/components/hotBrand.vue'
import HotSearch from '@/pages/index/components/hotSearch.vue'
import menuCard from '@/pages/index/components/menuCard.vue'
import SearchCard from '@/pages/index/components/searchCard.vue'
import { useSystemInfoStore } from '@/store'
defineOptions({
  name: 'Home',
})
const systemInfo = useSystemInfoStore()
console.log('systemInfo', systemInfo.systemInfo)
onShareAppMessage(() => {
  return {
    title: 'junctionMagic',
    path: '/pages/index/index?from=share', // 可带参数
    //imageUrl: 'https://yourdomain.com/share.jpg', // 可选，自定义封面图
  }
})

onLoad(() => {
  // uni.showShareMenu({
  //   withShareTicket: true,
  //   success: function (res) {
  //     console.log('显示分享菜单成功')
  //   },
  //   fail: function (err) {
  //     console.log('显示分享菜单失败', err)
  //   },
  // })
})
// onShareTimeline(() => {
//   return {
//     title: '分享到朋友圈的标题',
//     //query: 'from=timeline&id=123', // 页面参数
//     //imageUrl: '/static/images/share-bg.jpg', // 分享图片
//   }
// })
</script>
<style lang="scss" scoped>
.inner-wrapper {
  background: #f9f9f9;
  height: 100vh;
  box-sizing: border-box;
}
.logo2 {
  width: 564rpx;
  height: 164rpx;
  //margin-top: 20rpx;
}
</style>
