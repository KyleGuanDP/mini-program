<route lang="json5">
{
  layout: 'demo',
  style: {
    navigationBarTitleText: '请求',
  },
}
</route>

<template>
  <view class="brand-card">
    <view class="flex items-center">
      <!-- <image class="title-icon" src="@/static/images/rmpp.png" mode="scaleToFill" /> -->
      <view class="title-text">热门品牌</view>
      <!-- <view class="more">查看更多</view>
      <image class="next-icon" src="@/static/images/next.png" mode="scaleToFill" /> -->
    </view>
    <view class="items-wrapper">
      <view class="item" v-for="item in list" :key="item.id" @click="goSearch(item)">
        <view class="bg" @click="test">
          <image v-if="item.id === 1" :src="item.img" class="logo1" mode="scaleToFill" />
          <image v-else :src="item.img" mode="scaleToFill" />
        </view>
        <!-- <view class="text">{{ item.name }}</view> -->
      </view>
    </view>
    <!-- <view class="bottom">点击品牌快速搜索相关产品</view> -->
  </view>
</template>

<script lang="ts" setup>
import logo1 from '@/static/images/brand/analogdevices.png'
import logo12 from '@/static/images/brand/awinic.png'
import logo5 from '@/static/images/brand/infineon.png'
import logo3 from '@/static/images/brand/mps.png'
import logo6 from '@/static/images/brand/nxp.png'
import logo7 from '@/static/images/brand/onsemi.png'
import logo9 from '@/static/images/brand/powerintegrations.png'
import logo4 from '@/static/images/brand/renesas.png'
import logo10 from '@/static/images/brand/sgmicro.png'
import logo11 from '@/static/images/brand/silergy.png'
import logo8 from '@/static/images/brand/st.png'
import logo2 from '@/static/images/brand/texasinstruments.png'

const list = ref([
  { id: 1, name: 'Fujitsu', img: logo2 },
  { id: 2, name: 'Fujitsu', img: logo1 },
  { id: 3, name: 'Fujitsu', img: logo4 },
  { id: 4, name: 'Fujitsu', img: logo3 },
  { id: 5, name: 'Fujitsu', img: logo5 },
  { id: 6, name: 'Fujitsu', img: logo6 },
  { id: 7, name: 'Fujitsu', img: logo7 },
  { id: 8, name: 'Fujitsu', img: logo8 },
  { id: 9, name: 'Fujitsu', img: logo9 },
  { id: 10, name: 'Fujitsu', img: logo10 },
  { id: 11, name: 'Fujitsu', img: logo11 },
  { id: 12, name: 'Fujitsu', img: logo12 },
])
const test = () => {
  // uni.showModal({
  //   title: '敬请期待',
  // })
  uni.navigateTo({ url: '/pages/dataSearch/index?keywords=tps' })
}
const goSearch = (item: any) => {
  //uni.navigateTo({ url: '/pages/', query: { keywords: item.name?.trim() } })
}
</script>
<style lang="scss" scoped>
.brand-card {
  background: #ffffff;
  box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.05);
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  border: 2rpx solid #eeeeee;
  margin: 0 20rpx;
  margin-top: 20rpx;
  box-sizing: border-box;
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  padding-bottom: 50rpx;
}
.title-text {
  height: 40rpx;
  font-weight: 500;
  font-size: 28rpx;
  color: #333333;
  line-height: 40rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
  flex: 1;
}
.items-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 80rpx 50rpx;
  margin-top: 40rpx;
  box-sizing: border-box;
  justify-content: space-between;

  .item {
    width: 120rpx;
    .bg {
      width: 120rpx;
      height: 60rpx;
      border-radius: 10rpx 10rpx 10rpx 10rpx;
    }
    .logo1 {
      width: 100%;
      height: 100%;
    }
    .text {
      height: 34rpx;
      font-weight: 400;
      font-size: 24rpx;
      color: #666666;
      line-height: 36rpx;
      text-align: center;
      font-style: normal;
      text-transform: none;
      margin-top: 12rpx;
    }
  }
}
.more {
  height: 34rpx;

  font-weight: 400;
  font-size: 24rpx;
  color: #666666;
  line-height: 34rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-right: 10rpx;
}
.next-icon {
  width: 32rpx;
  height: 32rpx;
}
.title-icon {
  width: 40rpx;
  height: 40rpx;
  margin-right: 20rpx;
}
.bottom {
  border-top: 2rpx dashed #f0f0f0;
  font-weight: 400;
  font-size: 24rpx;
  color: #666666;
  line-height: 36rpx;
  text-align: center;
  font-style: normal;
  text-transform: none;
  box-sizing: border-box;
  padding-top: 20rpx;
  margin-top: 32rpx;
}
</style>
