<template>
  <view class="search-box">
    <image class="search-icon" src="@/static/images/search.png" mode="scaleToFill" />
    <input
      class="my-input"
      confirm-type="search"
      type="text"
      v-model="keyword"
      @confirm="onSearch"
      placeholder="在当前分类中搜索芯片型号"
      placeholder-style="color: #666666 ; font-size: 14px;"
    />
    <image
      v-if="keyword"
      @click="keyword = ''"
      class="icon-clean"
      src="@/static/images/clean.png"
      mode="scaleToFill"
    />
    <view class="btn" @click="onSearch">搜索</view>
  </view>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, watch } from 'vue'
const props = defineProps<{ keyword: string }>()
const emit = defineEmits(['update:keyword', 'search'])
const keyword = ref(props.keyword)

watch(
  () => props.keyword,
  (val) => {
    keyword.value = val
  },
)

watch(keyword, (val) => {
  emit('update:keyword', val)
})

const onInput = (e: any) => {
  keyword.value = e.detail.value
}
const onSearch = () => {
  emit('search')
}
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
  margin-top: 12rpx;
  margin-bottom: 30rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6rpx;
  .my-input {
    flex: 1;
    margin-left: 20rpx;
    margin-right: 88rpx;
    color: #333333;
    font-weight: 400;
    font-size: 28rpx;
    background: #ffffff;
  }

  .btn {
    width: 140rpx;
    height: 68rpx;
    background: #e65925;
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
.icon-clean {
  width: 32rpx;
  height: 32rpx;
  margin-right: 15rpx;
}
</style>
