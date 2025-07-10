<template>
  <view class="filter">
    <Filter @search="goSearch" />
  </view>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'
import Filter from './Filter.vue'
const emits = defineEmits(['search'])
const goSearch = (other) => {
  emits('search', other)
}
</script>

<style scoped>
.container {
  margin-top: 20rpx;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.description {
  height: 80rpx;
  width: 670rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 30rpx;
}

.filter {
  height: 100%;
  width: 100%;
}

.search-icon {
  width: 80rpx;
  height: 80rpx;
}
.search-icon image {
  width: 100%;
  height: 100%;
  display: block;
}

.text {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 20rpx;
}

.row1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.name {
  width: 282rpx;
  height: 40rpx;

  font-weight: 600;
  font-size: 28rpx;
  color: #333333;
  line-height: 40rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.reset {
  display: flex;
  align-items: center;
  gap: 8rpx;
}
.reset-icon {
  width: 28rpx;
  height: 32rpx;
}
.reset-icon image {
  width: 100%;
  height: 100%;
  display: block;
}
.reset text {
  width: 48rpx;
  height: 34rpx;

  font-weight: 400;
  font-size: 24rpx;
  color: #666666;
  line-height: 34rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.description-text {
  margin-top: 8rpx;
}

.row2 {
  width: 408rpx;
  height: 34rpx;

  font-weight: 400;
  font-size: 24rpx;
  color: #666666;
  line-height: 34rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
</style>
