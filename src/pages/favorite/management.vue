<template>
  <!-- <view class="mask"></view> -->
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
        <button class="button cancelCollection" :disabled="cancelDisable" @click="activeRemove">
          移除
        </button>
      </view>

      <view class="button-container">
        <view class="button-icon">
          <image src="../../static/images/center/management.png" mode="scaleToFill" />
        </view>
        <button class="button management" :disabled="manageDisable" @click="onActiveManage">
          目录管理
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// emit all select
const emit = defineEmits([
  'allSelected',
  'activeMove',
  'activeManage',
  'activeRemove',
  'closeManage',
])

// 接受传入值
const props = defineProps<{
  selectedFolders: any[]
  selectedItems: any[]
}>()

// computed
const selectNumbers = computed(() => {
  return props.selectedFolders.length + props.selectedItems.length
})

const moveDisable = computed(() => {
  if (props.selectedFolders.length || props.selectedItems.length) {
    return false
  } else {
    return true
  }
})

const cancelDisable = computed(() => {
  if (props.selectedFolders.length) {
    return true
  } else {
    return false
  }
})

const manageDisable = computed(() => {
  if (props.selectedItems.length) {
    return true
  } else {
    return false
  }
})

// 状态
const allSelected = ref(false)

// 全选切换
const toggleAllSelected = () => {
  allSelected.value = !allSelected.value
  emit('allSelected', allSelected.value)
}

// active move
const onActiveMove = () => {
  emit('activeMove')
}

// active management
const onActiveManage = () => {
  emit('activeManage')
}

// active remove
const activeRemove = () => {
  emit('activeRemove')
}

// close

const close = () => {
  emit('closeManage')
}
</script>
<style lang="css" scoped>
/* [class] {
  border: 1rpx solid;
} */

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

.mask {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
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
.selected-number {
  font-size: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
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

.cancel {
  height: 32rpx;
  width: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}

/* button */
.button-group {
  display: flex;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  gap: 20rpx;
}

.button-container {
  padding-top: 10rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180rpx;
  height: 120rpx;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  background-color: #ffffff;
  margin-top: 40rpx;
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

.total {
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #333333;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.total text {
  color: #e65924;
}
</style>
