<template>
  <view class="container">
    <view class="select">
      <view class="text">全选</view>
      <view class="icon" :class="{ active: allSelected }" @click="toggleAllSelected"></view>
      <view class="total">
        共
        <text class="highlight">{{ selectNumbers }}</text>
        个文件
      </view>
      <view class="cancel" @click="close">
        <image src="../../static/images/product/cancle.png" mode="scaleToFill" />
      </view>
    </view>

    <view class="button-group">
      <view class="button-container">
        <view class="button-icon">
          <image src="../../static/images/center/move.png" mode="scaleToFill" />
        </view>
        <button class="button move" :disabled="moveDisable" @click="onActiveMove">移动到</button>
      </view>

      <view class="button-container">
        <view class="button-icon">
          <image src="../../static/images/center/move.png" mode="scaleToFill" />
        </view>
        <button class="button cancelCollection" @click="onActiveRemove">移除</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const emit = defineEmits(['allSelected', 'activeMove', 'activeRemove', 'closeManage'])

const props = defineProps<{
  selectedItems: any[]
}>()

const selectNumbers = computed(() => props.selectedItems.length)

const moveDisable = computed(() => props.selectedItems.length === 0)

const manageDisable = computed(() => props.selectedItems.length > 0)

const allSelected = ref(false)

const toggleAllSelected = () => {
  allSelected.value = !allSelected.value
  emit('allSelected', allSelected.value)
}

const onActiveMove = () => {
  emit('activeMove')
}

const close = () => {
  emit('closeManage')
}

const onActiveRemove = () => {
  emit('activeRemove')
}
</script>

<style lang="css" scoped>
.container {
  bottom: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
  background: #f9f9f9;
}

.select {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 95%;
  gap: 10rpx;
  padding-top: 20rpx;
}

.text,
.total {
  font-size: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.total {
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #333333;
}

.total text {
  color: #e65924;
}

.icon {
  height: 20rpx;
  width: 20rpx;
  border-radius: 50%;
  border: 1rpx solid;
}

.icon.active {
  color: #1e80ff;
  background-color: blue;
  border: 1rpx solid;
}

/* button */
.button-group {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 95%;
  gap: 120rpx;
  margin-top: 40rpx;
}

.button-container {
  padding-top: 10rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180rpx;
  height: 120rpx;
  border-radius: 16rpx;
  background-color: #ffffff;
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32rpx;
  height: 32rpx;
}

button.button {
  background-color: #ffffff;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  border: none;
  border-radius: 12rpx;
  color: black;
  transition: all 0.2s ease;
}

button.button[disabled] {
  color: #bcbcbc !important;
  opacity: 0.5;
}
.cancel {
  height: 32rpx;
  width: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}
</style>
