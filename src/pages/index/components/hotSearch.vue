<route lang="json5">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '',
  },
}
</route>

<template>
  <view class="search-card">
    <view class="flex items-center search-item">
      <view class="title-text">热搜型号:</view>
      <view class="text" v-for="item in hotList" :key="item.id" @click="search(item)">
        {{ item.value }}
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const hotList = ref([
  { id: 1, value: 'TPS53513' },
  { id: 2, value: 'MCP1416' },
  { id: 3, value: 'AD623' },
  { id: 4, value: 'MPQ8633' },
  { id: 5, value: 'UCC2806' },
])
const search = (item) => {
  uni.navigateTo({ url: '/pages/dataSearch/index?keywords=' + item.value?.trim() })
}
</script>
<style lang="scss" scoped>
.search-card {
  margin: 40rpx 20rpx;
  box-sizing: border-box;
  //padding-left: 20rpx;
  margin-bottom: 60rpx;
  .search-item {
    gap: 8rpx;
  }
  .title-text {
    width: 120rpx;
    height: 34rpx;
    font-weight: 600;
    font-size: 24rpx;
    color: #e65925;
    line-height: 34rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
  .text {
    height: 34rpx;
    font-weight: 600;
    font-size: 24rpx;
    color: #333333;
    line-height: 34rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}
</style>
