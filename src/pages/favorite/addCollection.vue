<template>
  <view class="modal-mask" @click="close">
    <view class="modal-container" @click.stop>
      <!-- 新建按钮 -->
      <view class="create">➕</view>
      <!--返回按钮 -->
      <view class="back-wrapper" v-if="folderStack.length > 1" @click="goBack">
        <text class="back-arrow">←</text>
        <text class="back-label">返回上一级</text>
      </view>

      <!--文件夹列表 -->
      <view class="folders">
        <view class="folder-name" v-for="folder in folders" :key="folder.id">
          <view>{{ folder.name }}</view>
          <view class="toNextLevel" @click="getFolder(type, folder.id)">></view>
        </view>
      </view>

      <!--文件项列表 -->
      <view class="items">
        <view class="folder-name" v-for="item in items" :key="item.id">
          <view>{{ item.target_name }}</view>
          <view class="toNextLevel">></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { addToFolder } from '../../utils/addToFolder'
import { ref, onMounted, defineEmits, defineProps } from 'vue'
import { withAuthRequest } from '@/utils/withAuthRequest'
// receive parameters
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})
// 控制弹窗是否显示
const close = () => {
  emit('change')
}
const emit = defineEmits(['change'])
// 类型和根目录
const type = ref<string>('product')
const folders = ref<any[]>([])
const items = ref<any[]>([])

// 路径栈
const folderStack = ref<(string | null)[]>([])
// 添加到文件夹中

// 进入某个文件夹，默认入栈
const getFolder = async (
  typeValue: string,
  folderId: string | null,
  shouldPush: boolean = true,
) => {
  let url = `http://121.199.10.78:8000/api/v1/collections/folders/children?target_type=${typeValue}`
  if (folderId !== null) {
    url += `&folder_id=${folderId}`
  }

  console.log('请求 URL:', url)

  await withAuthRequest(
    { url, method: 'GET' },
    (res) => {
      const data = res.data as any
      folders.value = data.folders
      items.value = data.items

      if (shouldPush && folderStack.value.at(-1) !== folderId) {
        folderStack.value.push(folderId)
      }

      console.log('当前 folderStack:', [...folderStack.value])
    },
    (err) => {
      console.warn('获取文件夹失败', err)
    },
  )
}

// 返回上一级
const goBack = () => {
  if (folderStack.value.length <= 1) return
  folderStack.value.pop()
  const prev = folderStack.value.at(-1) ?? null
  getFolder(type.value, prev, false)
}

// 初始加载根目录
onMounted(() => {
  folderStack.value = [null]
  getFolder(type.value, null)
})
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  width: 80%;
  max-height: 80%;
  overflow-y: auto;
  background-color: #f8f8f8;
  padding: 24rpx;
  border-radius: 20rpx;
  box-shadow: 0 12rpx 30rpx rgba(0, 0, 0, 0.2);
}

.back-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
  color: #007aff;
  font-size: 30rpx;
  padding-left: 16rpx;
}

.back-arrow {
  font-size: 36rpx;
  margin-right: 12rpx;
}

.back-label {
  font-weight: 500;
}

.folders,
.items {
  margin-bottom: 40rpx;
}

.folder-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 24rpx 32rpx;
  margin-bottom: 16rpx;
  border-radius: 12rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s;
}

.folder-name:active {
  background-color: #f0f0f0;
}

.folder-name > view:first-child {
  font-size: 32rpx;
  color: #333333;
}

.toNextLevel {
  font-size: 36rpx;
  color: #bbbbbb;
}
</style>
