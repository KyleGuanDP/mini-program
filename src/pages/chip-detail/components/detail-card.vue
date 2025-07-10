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
    <view class="title">详细信息</view>
    <view class="tab-wrapper">
      <view
        class="tab"
        v-for="item in tabs"
        :key="item.value"
        @click="changTab(item)"
        :class="activeTab === item.value ? 'tab-active' : ''"
      >
        {{ item.name }}
      </view>
    </view>
    <template v-if="activeTab === 1">
      <productDetail :data="detail" />
    </template>
    <template v-else-if="activeTab === 2">
      <technicalArticles :data="detail" />
    </template>
    <template v-else-if="activeTab === 3">
      <designDevelopment :data="detail" />
    </template>
    <template v-else>
      <productOrdering :data="detail" />
    </template>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, toRef } from 'vue'
import designDevelopment from './design-development.vue'
import productDetail from './product-detail.vue'
import productOrdering from './product-ordering.vue'
import technicalArticles from './technical-articles.vue'
// 定义组件接收的 props，data 为芯片详情数据对象
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})
// 通过 toRef 保证 detail 响应式，便于模板直接使用
const detail = toRef(props, 'data')
const activeTab = ref(1)
const tabs = ref([
  { name: '产品详情', value: 1 },
  { name: '技术文章', value: 2 },
  { name: '设计开发', value: 3 },
  { name: '产品订购', value: 4 },
])
const changTab = (item: any) => {
  if (item.value === 4) {
    if (!detail.value?.part_number) {
      uni.showToast({
        title: '暂无订购信息',
        icon: 'none',
      })
      return
    }
  }
  activeTab.value = item.value
  console.log(11111, activeTab.value)
}
</script>

<style lang="scss" scoped>
.card {
  //height: 100%;
  background: #ffffff;
  box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.1);
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  margin: 0 20rpx;
  box-sizing: border-box;
  padding: 30rpx 20rpx;
  margin-top: 20rpx;
}
.title {
  box-sizing: border-box;
  padding: 0 10rpx;
  height: 40rpx;
  font-weight: 500;
  font-size: 28rpx;
  color: #333333;
  line-height: 40rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.tab-wrapper {
  height: 74rpx;
  background: #eeeeee;
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 6rpx;
  justify-content: space-between;
  margin-top: 20rpx;
  .tab {
    width: 164rpx;
    height: 62rpx;
    font-weight: 400;
    font-size: 24rpx;
    color: #333333;
    line-height: 62rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
  .tab-active {
    height: 62rpx;
    background: #e65925;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    font-weight: 400;
    font-size: 24rpx;
    color: #ffffff;
    line-height: 62rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}
</style>
