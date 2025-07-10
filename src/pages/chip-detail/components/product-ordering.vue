<route lang="json5">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '',
  },
}
</route>

<template>
  <view class="tab2">
    <view class="list-items" v-for="item in data?.hits" :key="item.oid">
      <view class="list-items-top">
        <view class="title">{{ item.order_device }}</view>
        <!-- <view class="show-icon">量产</view> -->
      </view>
      <view class="list-content">
        <view class="list1">
          <view class="list1-item">
            <view class="text1">封装：</view>
            <view class="text2">{{ item.package_type || '-' }}</view>
          </view>
          <view class="list1-item">
            <view class="text1">温度：</view>
            <view class="text2">
              {{ getTemp(item) }}
            </view>
          </view>

          <view class="list1-item">
            <view class="text1">引脚：</view>
            <view class="text2">{{ item.pin_count || '-' }}</view>
          </view>
          <view class="list1-item">
            <view class="text1">丝印：</view>
            <view class="text2">{{ item.marking || '-' }}</view>
          </view>
          <view class="list1-item">
            <view class="text1">尺寸：</view>
            <view class="text2">{{ getSize(item) }}</view>
          </view>
          <view class="list1-item">
            <view class="text1">状态：</view>
            <view class="text2" :style="styleList[item.status]">{{ item.status || '-' }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="no-data" v-if="!data?.hits?.length">
      <image class="no-data-img" src="@/static/images/no-data.png" mode="scaleToFill" />
      <view class="no-data-text">暂无数据</view>
      <view class="no-data-text1">暂时没有找到您想要的内容哦</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getDeviceSearchData } from '@/service/index'
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})
const detail = toRef(props, 'data')
const styleList = ref({
  新产品: 'color: #E65925;',
  正在供货: 'color: #21C55E;',
  预发布: 'color: #2A7DE2;',
  不推荐用于新设计: 'color: #C48714;',
  停产: 'color: #8B8B8B;',
})
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const params = ref({
  skip: 0,
  limit: 9999,
  part_number: detail.value.part_number, //型号
})
const initialData = undefined
const { loading, error, data, run } = useRequest(() => getDeviceSearchData(params.value), {
  immediate: true,
  initialData,
})
const getSize = (item) => {
  if (!item.length || !item.width || !item.hight) {
    return '-'
  }
  return `${item.length}*${item.width}*${item.hight}`
}
const getTemp = (item) => {
  if (!item.min_operation_temp || !item.max_operation_temp) {
    return '-'
  }
  return `${item.min_operation_temp}～${item.max_operation_temp}℃`
}
</script>

<style lang="scss" scoped>
.tab2 {
  .list-items {
    margin-top: 20rpx;
    background: #ffffff;
    border-radius: 20rpx 20rpx 20rpx 20rpx;
    border: 2rpx solid #eeeeee;
    box-sizing: border-box;
    .list-items-top {
      height: 74rpx;
      background: #e9f2fc;
      border-radius: 15rpx;
      border-radius: 20rpx 20rpx 0rpx 0rpx;
      box-sizing: border-box;
      padding: 0 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .title {
      height: 40rpx;
      font-weight: 500;
      font-size: 28rpx;
      color: #000105;
      line-height: 40rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
    .show-icon {
      width: 80rpx;
      height: 48rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      border-radius: 24rpx;
      font-weight: 500;
      font-size: 20rpx;
      color: #333333;
    }
  }
  .list-content {
    box-sizing: border-box;
    padding: 30rpx;
    padding-top: 10rpx;
  }
  .list1 {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .list1-item {
      min-width: 50%;
      display: flex;
      align-items: center;
      margin-top: 20rpx;
    }
    .text1 {
      height: 34rpx;
      font-weight: 500;
      font-size: 24rpx;
      color: #333333;
      line-height: 34rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
    .text2 {
      height: 34rpx;
      font-weight: 400;
      font-size: 24rpx;

      color: #666666;
      line-height: 34rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }
}
.icon1 {
  width: 28rpx;
  height: 28rpx;
  margin-right: 10rpx;
}
.no-data {
  margin-top: 50rpx;
}
</style>
