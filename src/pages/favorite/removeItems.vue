<template>
  <view class="container">
    <view class="mask"></view>
    <view class="modal">
      <view class="head">
        <view class="cancel">取消</view>
      </view>
      <view class="options">
        <button class="delete" @click="removeFromFolder">仅从文件夹中删除</button>
        <button class="edit" @click="removeFromAll">取消收藏</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { removeCollectedItems } from '@/utils/removeCollectedItems'
const props = defineProps<{
  type: any
  items: any
}>()

// 从当前目录下删除
const removeFromFolder = async () => {
  await removeCollectedItems(props.type, props.items, false)
  uni.showToast({
    title: '移除成功',
    icon: 'success',
    duration: 2000,
    mask: true,
  })
}

// 删除所有的
const removeFromAll = async () => {
  await removeCollectedItems(props.type, props.items, true)
  uni.showToast({
    title: '移除成功',
    icon: 'success',
    duration: 2000,
    mask: true,
  })
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
