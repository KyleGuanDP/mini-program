<template>
  <view class="container">
    <view class="mask"></view>
    <view class="modal">
      <view class="head">
        <view class="cancel" @click="deActivate">取消</view>
        <view class="move">新建文件夹</view>
        <view class="create" @click="complete">完成</view>
      </view>
      <view class="content">
        <view class="input-area">
          <view class="title">标题</view>
          <view class="title-input">
            <input
              v-model="inputValue"
              placeholder="请输入标题"
              placeholder-class="input-placeholder"
            />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { createFolder } from '@/utils/createFolder'
// receive params
const props = defineProps<{
  type: any
  parentId: any
}>()

// emit
const emit = defineEmits(['closeCreateFolder', 'createFolder'])
// 初始化数据
const inputValue = ref('')

// close edit
const deActivate = () => {
  emit('closeCreateFolder')
}

// handle complete
const complete = async () => {
  console.log('new name', inputValue.value)
  await createFolder(props.type, props.parentId.at(-1).id, inputValue.value)
  emit('createFolder')
  emit('closeCreateFolder')
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
  z-index: 2000;
  width: 100%;
  height: 100vh;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2001;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 45vh;
  background-color: #fff;
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
  z-index: 2002;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 -6rpx 20rpx rgba(0, 0, 0, 0.1);
}

.head {
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30rpx;
  font-weight: 600;
  margin-bottom: 36rpx;
}

.cancel,
.create {
  color: #999;
}

.create {
  color: #1a73e8;
}

.move {
  font-size: 32rpx;
  color: #333;
}

.content {
  width: 95%;
  display: flex;
  flex-direction: column;
}

.input-area {
  background-color: #f5f5f5;
  padding: 24rpx;
  border-radius: 16rpx;
  display: flex;
  flex-direction: column;
}

.label {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 16rpx;
}

.input {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 24rpx;
  font-size: 30rpx;
  border: 1rpx solid #ddd;
  color: #000;
}

.input-placeholder {
  color: #ccc;
}
</style>
