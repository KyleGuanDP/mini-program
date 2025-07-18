<template>
  <view class="container">
    <view class="category">
      <view class="sub-category product" @tap="selectItem" data-name="product">产品</view>
      <view class="sub-category" @tap="selectItem" data-name="paper">技术文章</view>
      <view class="sub-category" @tap="selectItem" data-name="design">参考设计</view>
    </view>

    <view class="main">
      <view class="edit">
        <view class="add">新建文件夹</view>
        <view class="order">智能排序</view>
      </view>
      <scroll-view scroll-y class="content">
        <view class="back-wrapper" v-if="folderStack.length > 1" @click="goBack">
          <text class="back-arrow">←</text>
          <text class="back-label">返回上一级</text>
        </view>
        <view class="folders">
          <view class="folder-name" v-for="folder in folders" :key="folder.id">
            <view class="folder-image" @click="getFolder(type, folder.id)">
              <image src="../../static/images/folder.png" mode="scaleToFill" />
            </view>
            <view @click="getFolder(type, folder.id)">{{ folder.name }}</view>
            <view
              class="icon"
              :class="{ active: activeIcons[folder.id] }"
              @click="toggleFolderIcon(folder.id)"
            ></view>
          </view>
        </view>

        <view class="items">
          <view class="folder-name" v-for="item in items" :key="item.id">
            <view class="folder-image">
              <image src="../../static/images/folder.png" mode="scaleToFill" />
            </view>
            <view>{{ item.target_name }}</view>
            <view
              class="icon"
              :class="{ active: activeIcons[item.id] }"
              @click="toggleCollectionIcon(item.id)"
            ></view>
          </view>
        </view>
      </scroll-view>
    </view>
    <management
      :selectedFolders="selectedFolderStack"
      :selectedItems="selectedCollectionStack"
      v-if="selectedFolderStack.length || selectedCollectionStack.length"
      @allSelected="allSelected"
    />
  </view>
</template>

<script setup lang="ts">
import { withAuthRequest } from '@/utils/withAuthRequest'
import { ref } from 'vue'
import management from '../favorite/management.vue'
//初始化数据
const folders = ref<any[]>([])
const items = ref<any[]>([])
const type = ref<string>('product')
const folderStack = ref<(string | null)[]>([])
const selectedCollectionStack = ref<(string | null)[]>([])
const selectedFolderStack = ref<(string | null)[]>([])
const activeIcons = ref<Record<string, boolean>>({})

//切换icon状态
function toggleCollectionIcon(id: string) {
  activeIcons.value[id] = !activeIcons.value[id]
  if (selectedCollectionStack.value.includes(id)) {
    selectedCollectionStack.value = selectedCollectionStack.value.filter((itemId) => itemId !== id)
  } else {
    selectedCollectionStack.value.push(id)
  }
  console.log('这是收藏的stack:', selectedCollectionStack.value)
}

function toggleFolderIcon(id: string) {
  activeIcons.value[id] = !activeIcons.value[id]
  if (selectedFolderStack.value.includes(id)) {
    selectedFolderStack.value = selectedFolderStack.value.filter((itemId) => itemId !== id)
  } else {
    selectedFolderStack.value.push(id)
  }
  console.log('这是文件夹的stack:', selectedFolderStack.value)
}

// 切换type
function selectItem(e) {
  type.value = e.currentTarget.dataset.name
  console.log('当前选中：', type.value)
  getFolder(type.value, null)
}

// 请求显示内容的函数
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

// 全选
const allSelected = (value: boolean) => {
  if (value) {
    activeIcons.value = {}
    for (const folder of folders.value) {
      activeIcons.value[folder.id] = true
      selectedFolderStack.value.push(folder.id)
    }

    for (const item of items.value) {
      activeIcons.value[item.id] = true
      selectedCollectionStack.value.push(item.id)
    }
  } else {
    activeIcons.value = {}
    selectedFolderStack.value = []
    selectedCollectionStack.value = []
  }
}
//初始化数据
onShow(() => {
  folderStack.value = [null]
  getFolder(type.value, null)
})
</script>
<style lang="css" scoped>
[class] {
  border: 1rpx solid;
}

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.category {
  padding-top: 70rpx;
  padding-left: 30rpx;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.sub-category {
  width: 130rpx;
  height: 46rpx;
  font-family: Inter, Inter;
  font-weight: 400;
  font-size: 30rpx;
}

.product {
  width: 70rpx;
}

.main {
  margin-top: 10rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.edit {
  width: 95%;
  height: 50rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.content {
  flex: 1;
  width: 98%;
}

.folders,
.items {
  display: flex;
  flex-direction: column;
}

.folder-name {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 24rpx 32rpx;
  margin-bottom: 16rpx;
  border-radius: 12rpx;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s;
  width: 90%;
}

.folder-image {
  width: 100rpx;
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 12rpx;
  background-color: #f8f8f8;
}

.folder-image image {
  width: 100%;
  height: 100%;
}

.icon {
  margin-left: auto;
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
</style>
