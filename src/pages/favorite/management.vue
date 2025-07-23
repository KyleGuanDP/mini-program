<template>
  <view class="container">
    <view class="select">
      <view class="text">全选</view>
      <view class="icon" :class="{ active: allSelected }" @click="toggleAllSelected"></view>
      <view class="selected-number">已选择个{{ selectNumbers }}文件</view>
    </view>
    <view class="button-group">
      <button class="button move" :disabled="moveDisable" @click="onActiveMove">移动到</button>
      <button class="button cancelCollection" :disabled="cancelDisable" @click="activeRemove">
        移除
      </button>
      <button class="button management" :disabled="manageDisable" @click="onActiveManage">
        目录管理
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
// emit all select
const emit = defineEmits(['allSelected', 'activeMove', 'activeManage', 'activeRemove'])

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
  height: 10vh;
  display: flex;
  flex-direction: row;
  z-index: 999;
  background-color: grey;
}

.select {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 90%;
  width: 300rpx;
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

/* button */
.button-group {
  flex: 1;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20rpx;
}

button.button {
  height: 60rpx;
  font-size: 22rpx;
  border: none;
  border-radius: 12rpx;
  color: #fff;
  background-color: #1e80ff;
  transition: all 0.2s ease;
}

button.button[disabled] {
  background-color: #c0c0c0 !important;
  color: #f9f9f9 !important;
  opacity: 0.5;
}
</style>
