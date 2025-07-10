<route lang="json5">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '',
  },
}
</route>

<template>
  <view class="card">
    <view class="flex justify-between">
      <view class="text">搜索历史</view>
      <image
        class="del-icon"
        src="@/static/images/del.png"
        mode="scaleToFill"
        @click="searchHistoryStore.clearHistory"
      />
    </view>
    <view class="history-content">
      <view
        class="history-item ellipsis"
        v-for="item in searchHistoryStore.syfcHistoryList"
        :key="item"
        @click="goDetail(item)"
      >
        {{ item }}
      </view>
    </view>
    <!-- <view class="flex items-center justify-center">
      <view class="expand-text">展开</view>
      <image class="expand-icon" src="@/static/images/expand.png" mode="scaleToFill" />
    </view> -->
  </view>
</template>

<script lang="ts" setup>
import { useSearchHistoryStore } from '@/store'
const searchHistoryStore = useSearchHistoryStore()
onLoad(() => {})
const goDetail = (item) => {
  searchHistoryStore.addHistory(item)
  uni.navigateTo({ url: '/pages/syfc/search?keywords=' + item?.trim() })
}
</script>

<style lang="scss" scoped>
.card {
  //min-height: 202rpx;
  background: #ffffff;
  box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.05);
  border-radius: 20rpx;
  box-sizing: border-box;
  padding: 30rpx;
  margin: 0 20rpx;
  margin-bottom: 20rpx;
  display: flex;
  flex-direction: column;
}
.expand-text {
  height: 34rpx;
  font-weight: 400;
  font-size: 24rpx;
  color: #666666;
  line-height: 34rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.text {
  height: 40rpx;
  min-height: 40rpx;
  font-weight: 500;
  font-size: 28rpx;
  color: #333333;
  line-height: 40rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.del-icon {
  width: 32rpx;
  height: 32rpx;
}
.expand-icon {
  width: 24rpx;
  height: 24rpx;
}
.history-content {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  margin: 20rpx 0;
  gap: 20rpx;
}
.history-item {
  height: 54rpx;
  background: #eeeeee;
  border-radius: 30rpx 30rpx 30rpx 30rpx;
  box-sizing: border-box;
  line-height: 54rpx;
  font-weight: 400;
  font-size: 24rpx;
  color: #333333;
  text-align: center;
  font-style: normal;
  text-transform: none;
  padding: 0 28rpx;
}
</style>
