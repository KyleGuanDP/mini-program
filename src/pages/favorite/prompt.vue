<template>
  <view class="container">
    <view class="modal">
      <view class="title">提示</view>
      <view class="hint">
        此内容同时被收藏在其他收藏夹XXXXX中, 确认后选中内容会在其他收藏夹中被同时删除
      </view>
      <view class="choices">
        <view class="cancel" @click="closePrompt">取消</view>
        <view class="confirm" @click="confirmPrompt">确认</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const emit = defineEmits(['closePrompt', 'removeAll'])
// close
const closePrompt = () => {
  emit('closePrompt')
}

// confirm
const confirmPrompt = () => {
  emit('closePrompt')
  emit('removeAll')
}
</script>

<style scoped lang="css">
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
  background-color: rgba(0, 0, 0, 0.3); /* 背景遮罩 */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 弹窗主体 */
.modal {
  background-color: #fff;
  width: 60%;
  max-width: 300px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 20px 16px 0 16px;
  text-align: center;
  font-size: 14px;
  z-index: 2001;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 标题 */
.title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #333;
}

/* 提示内容 */
.hint {
  color: #666;
  line-height: 1.5;
  margin-bottom: 20px;
  white-space: pre-line;
  border-bottom: 1px solid #eee;
  padding-bottom: 20rpx;
}

/* 按钮区域 */
.choices {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 70%;
  gap: 30rpx;
  height: 44px;
}

/* 左右按钮 */
.cancel,
.confirm {
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
}

/* 取消按钮样式 */
.cancel {
  color: #999;
  /* border-right: 1px solid #eee; */
}

/* 确认按钮样式 */
.confirm {
  color: #e65924;
}
</style>
