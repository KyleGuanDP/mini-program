<route lang="json5">
{
  layout: 'demo',
  style: {
    navigationBarTitleText: '请求',
  },
}
</route>

<template>
  <view class="search-box">
    <image class="search-icon" src="@/static/images/search.png" mode="scaleToFill" />
    <input
      class="my-input"
      v-model="value"
      confirm-type="search"
      type="text"
      placeholder="搜索芯片型号、参考设计、设计工具"
      placeholder-style="color: #666666 ; font-size: 28rpx;"
      @confirm="search"
    />
    <image
      v-if="value"
      @click="value = ''"
      class="icon-clean"
      src="@/static/images/clean.png"
      mode="scaleToFill"
    />
    <view class="btn" @click="search">搜索</view>
  </view>
</template>

<script lang="ts" setup>
const value = ref('')
const search = () => {
  if (value.value?.trim()) {
    uni.navigateTo({ url: '/pages/dataSearch/index?keywords=' + value.value?.trim() })
  } else {
    uni.showToast({
      title: `请先输入搜索内容`,
      icon: 'none',
    })
  }
}
// uni.navigateTo({ url: '/pages/dataSearch/index?keywords=INA' })
</script>
<style lang="scss" scoped>
.search-box {
  height: 84rpx;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.1);
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  border: 4rpx solid #ff7c4d;
  margin: 0 20rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6rpx;
  margin-top: 60rpx;
  .my-input {
    flex: 1;
    margin-left: 20rpx;
    margin-right: 8rpx;
    color: #333333;
    font-weight: 400;
    font-size: 28rpx;
    background: #ffffff;
  }
  .icon-clean {
    width: 32rpx;
    height: 32rpx;
    margin-right: 15rpx;
  }
  .btn {
    width: 140rpx;
    height: 68rpx;
    background: linear-gradient(90deg, #ffa751 0%, #f46b45 100%);
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    font-weight: 400;
    font-size: 28rpx;
    color: #ffffff;
    line-height: 68rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}
.search-icon {
  width: 32rpx;
  height: 32rpx;
  margin-left: 24rpx;
}
</style>
