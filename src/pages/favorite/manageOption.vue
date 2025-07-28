<template>
  <view class="container">
    <view class="mask"></view>
    <view class="modal">
      <!-- <view class="head">
        <view class="cancel" @click="cancel">取消</view>
      </view> -->
      <view class="select">
        <view class="text">全选</view>
        <view class="icon" :class="{ active: allSelected }" @click="toggleAllSelected"></view>
        <view class="total">
          共
          <text class="highlight">{{ selectNumbers }}</text>
          个文件
        </view>
      </view>
      <view class="options">
        <button class="delete" @click="deleteFolders">删除文件夹</button>
        <button class="edit" :disabled="disableButton" @click="activeEdit">编辑目录</button>
        <button class="cancel" :disabled="disableButton" @click="cancel">取消</button>
      </view>
    </view>
  </view>
  <editFolderName
    v-if="showEdit"
    :type="type"
    :selectedFolders="selectedFolders"
    @closeEdit="closeEdit"
    @editEmit="editEmit"
  />
</template>

<script setup lang="ts">
import editFolderName from './editFolderName.vue'
import { deleteFolder } from '@/utils/deleteFolder'
// initiate params
const showEdit = ref(false)
const allSelected = ref(false)
// props
const props = defineProps<{
  type: any
  selectedFolders: any[]
  selectedItems: any[]
}>()

// emit
const emit = defineEmits<{
  (e: 'allSelected', value): void
  (e: 'deactivateManage'): void
  (e: 'editEmit'): void
}>()

// computed selected numbers
const selectNumbers = computed(() => {
  return props.selectedFolders.length + props.selectedItems.length
})

// computed disable
const disableButton = computed(() => {
  return props.selectedFolders.length > 1
})

// close
const cancel = () => {
  emit('deactivateManage')
}

// active edit
const activeEdit = () => {
  showEdit.value = true
}
// close edit
const closeEdit = () => {
  showEdit.value = false
}

// edit emit
const editEmit = () => {
  emit('editEmit')
}

const deleteFolders = async () => {
  await deleteFolder(props.type, props.selectedFolders)
  emit('editEmit')
}

// all selected
const toggleAllSelected = () => {
  allSelected.value = !allSelected.value
  emit('allSelected', allSelected.value)
}
</script>

<style lang="css" scoped>
/* [class] {
  border: 1rpx solid;
} */

.container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100vh;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #f9f9f9;
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
  z-index: 1002;
}

.head {
  display: flex;
  flex-direction: row;
  width: 95%;
  height: 50rpx;
  justify-content: space-between;
  font-weight: bold;
}

.options {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.delete,
.edit,
.cancel {
  height: 10vh;
  width: 100%;
  font-size: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1rpx solid #eee;
  font-weight: bold;
}

button[disabled] {
  background-color: #c0c0c0 !important;
  color: #f9f9f9 !important;
  opacity: 0.5;
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

.total text {
  color: #e65924;
}
</style>
