<template>
  <view class="container">
    <view class="mask"></view>
    <view class="modal">
      <view class="options">
        <button class="delete row-1" @click="removeFromFolder">仅从文件夹中删除</button>
        <button class="edit row-1" @click="activePromptFunc">取消收藏</button>
        <button class="edit" @click="close">取消</button>
      </view>
    </view>
  </view>
  <prompt v-if="activePrompt" @closePrompt="closePromptFunc" @removeAll="removeFromAll" />
</template>

<script setup lang="ts">
import prompt from './prompt.vue'
import { removeCollectedItems } from '@/utils/removeCollectedItems'

const activePrompt = ref(false)
const props = defineProps<{
  type: any
  items: any
}>()

const emit = defineEmits(['closeRemove', 'removeBack'])
// 从当前目录下删除
const removeFromFolder = async () => {
  uni.showLoading({
    title: '加载中...',
    mask: true,
  })
  const res = await removeCollectedItems(props.type, props.items, false)
  uni.hideLoading()
  if (res.statusCode === 200) {
    uni.showToast({ title: '移动成功', icon: 'success' })
  } else {
    uni.showToast({ title: '移动失败', icon: 'error' })
  }
  setTimeout(() => {
    emit('closeRemove')
    emit('removeBack')
  }, 1000)
}

// 删除所有的
const removeFromAll = async () => {
  uni.showLoading({
    title: '加载中...',
    mask: true,
  })
  const res = await removeCollectedItems(props.type, props.items, true)
  uni.hideLoading()
  if (res.statusCode === 200) {
    uni.showToast({ title: '移动成功', icon: 'success' })
  } else {
    uni.showToast({ title: '移动失败', icon: 'error' })
  }
  setTimeout(() => {
    emit('closeRemove')
    emit('removeBack')
  }, 1000)
}

// 打开弹窗
const activePromptFunc = () => {
  activePrompt.value = true
}

// close remove
const close = () => {
  emit('closeRemove')
}

// close prompt
const closePromptFunc = () => {
  activePrompt.value = false
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
  background: #f9f9f9;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-weight: bold;
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

.row-1 {
  border-bottom: 4rpx solid #eeeeee;
}
</style>
