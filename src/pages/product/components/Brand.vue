<template>
  <view class="container">
    <view class="header">
      <view class="title">品牌筛选</view>
      <view class="cancle" @click="onClickClose">
        <image src="/static/images/product/cancle.png" mode="aspectFit" />
      </view>
    </view>

    <view class="body">
      <view class="brand-title">品牌名称（可多选）</view>
      <view class="brand-selector">
        <view
          v-for="brand in brands"
          :key="brand"
          class="option-button"
          :class="{ selected: selectedBrands.includes(brand) }"
          @click="toggleBrand(brand)"
        >
          {{ brand }}
        </view>
      </view>

      <view class="region-title">品牌地域（可多选）</view>
      <view class="region-selecor">
        <view
          v-for="region in regions"
          :key="region"
          class="option-button"
          :class="{ selected: selectedRegions.includes(region) }"
          @click="toggleRegion(region)"
        >
          {{ region }}
        </view>
      </view>
    </view>

    <view class="bottom">
      <Reset @reset="handleReset" @confirm="handleConfirm" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineModel } from 'vue'
import Reset from './Reset.vue'

const props = defineProps<{
  clickClose?: () => void
}>()

const emit = defineEmits<{
  (e: 'submit'): void
}>()

const brands = ['德州仪器-TI', 'ADI', 'ST', 'Infineon']
const regions = ['中国', '美国', '日本', '德国', '欧洲', '中国台湾', '韩国']

const selectedBrands = defineModel<string[]>('selectedBrands', {
  default: () => [],
})
const selectedRegions = defineModel<string[]>('selectedRegions', {
  default: () => [],
})

const toggleBrand = (brand: string) => {
  const i = selectedBrands.value.indexOf(brand)
  if (i === -1) selectedBrands.value.push(brand)
  else selectedBrands.value.splice(i, 1)
}

const toggleRegion = (region: string) => {
  const i = selectedRegions.value.indexOf(region)
  if (i === -1) selectedRegions.value.push(region)
  else selectedRegions.value.splice(i, 1)
}

// 重置
const handleReset = () => {
  selectedBrands.value = []
  selectedRegions.value = []
}

// 确认
const handleConfirm = () => {
  emit('submit')
}

// 关闭弹窗
const onClickClose = () => {
  props.clickClose?.()
}
</script>

<style scoped>
.container {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #ffffff;
  box-shadow: 0rpx -10rpx 30rpx 2rpx rgba(0, 0, 0, 0.05);
  border-radius: 20rpx 20rpx 0rpx 0rpx;
}
.header {
  margin-top: 30rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.title {
  width: 128rpx;
  margin-left: 312rpx;
  height: 44rpx;

  font-weight: 500;
  font-size: 32rpx;
  color: #333333;
  line-height: 44rpx;
  text-align: left;
}
.cancle {
  margin-left: 232rpx;
  height: 32rpx;
  width: 32rpx;
}
.cancle image {
  width: 100%;
  height: 100%;
  display: block;
}
.divider {
  margin-top: 30rpx;
  width: 690rpx;
  height: 0rpx;
  border: 2rpx solid #eeeeee;
}
.body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0 30rpx;
}
.brand-title,
.region-title {
  margin: 30rpx 0 20rpx 0;
  height: 40rpx;

  font-weight: 600;
  font-size: 28rpx;
  color: #333333;
  line-height: 40rpx;
  text-align: left;
}
.brand-selector,
.region-selecor {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 20rpx;
}
.option-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 158rpx;
  height: 62rpx;
  background: #eeeeee;
  border-radius: 32rpx;
  font-size: 28rpx;
  color: #333;
}
.option-button.selected {
  background: #fce6de;
}
.bottom {
  width: 100%;
  height: 150rpx;
  border-top: 2rpx solid #eeeeee;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
}
</style>
