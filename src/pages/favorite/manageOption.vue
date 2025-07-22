<template>
  <view class="container">
    <view class="mask"></view>
    <view class="modal">
      <view class="head">
        <view class="cancel" @click="cancel">取消</view>
      </view>
      <view class="options">
        <button class="delete" @click="deleteFolders">删除文件夹</button>
        <button class="edit" :disabled="disableButton" @click="activeEdit">编辑文件夹</button>
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
// props
const props = defineProps<{
  type: any
  selectedFolders: any[]
  selectedItems: any[]
}>()

// emit
const emit = defineEmits<{
  (e: 'deactivateManage'): void
  (e: 'editEmit'): void
}>()

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
</script>

<style lang="css" scoped>
[class] {
  border: 1rpx solid;
}

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
  background-color: #fff;
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
.edit {
  height: 10vh;
  width: 100%;
  font-size: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1rpx solid #eee;
}

button[disabled] {
  background-color: #c0c0c0 !important;
  color: #f9f9f9 !important;
  opacity: 0.5;
}
</style>
