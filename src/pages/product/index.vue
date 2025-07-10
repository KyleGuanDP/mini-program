<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="page">
{
  style: {
    navigationStyle: 'custom',
    transparentTitle: 'always',
    allowsBounceVertical: 'false',
    pullRefresh: 'false',
  },
}
</route>
<template>
  <view class="page-container">
    <fgNavbar :leftText="classfiy" />
    <view class="mid">
      <Mid :keyword="keyword" @update:keyword="(val) => (keyword = val)" @search="goSearch" />
    </view>
    <view class="top">
      <Head @search="goSearch" />
    </view>
    <view class="buttom">
      <Bottom ref="bottomRef" :classfiy="classfiy" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { filterEmptyValues } from '@/utils'
import { ref } from 'vue'
import Bottom from './components/Bottom.vue'
import Head from './components/Head.vue'
import Mid from './components/Mid.vue'
defineOptions({
  name: 'product',
})
const keyword = ref('')
const bottomRef = ref(null)
const goSearch = (other) => {
  console.log('other', other)
  const data = filterEmptyValues(other)
  console.log('this is data', data)
  bottomRef.value?.goSearch(data)
}
const classfiy = ref('')
onLoad((option) => {
  classfiy.value = option.name
  setTimeout(() => {
    bottomRef.value?.goSearch()
  }, 200)
  // bottomRef.value?.goSearch(keyword.value)
})
</script>

<style scoped lang="scss">
.page-container {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  background-color: #f9f9f9;
  height: 100vh;
}

.top {
  height: 68rpx;
  width: 100%;
  margin-bottom: 30rpx;
}

.mid {
  /* height: 80rpx; */
  background: #f9f9f9;
  width: 100%;
  /* margin-bottom: 30rpx; */
}

.buttom {
  width: calc(100% - 40rpx);
  margin: auto;
  flex: 1;
  overflow-y: scroll;
  background: #ffffff;
  box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.05);
  border-radius: 20rpx 20rpx 0rpx 0rpx;
}
</style>
