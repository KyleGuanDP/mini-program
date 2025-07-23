<template>
  <view class="container">
    <view class="mask"></view>

    <view class="modal">
      <view class="head">
        <view class="cancel" @click="cancel">取消</view>
        <view class="move">Move</view>
        <view class="create">新建目录</view>
      </view>

      <scroll-view scroll-y class="content">
        <view class="folders">
          <view class="folder-name" v-for="folder in folders" :key="folder.id">
            <view class="folder-image" @click="() => loadFolder(folder.id, folder.name)">
              <image src="../../static/images/folder.png" mode="scaleToFill" />
            </view>
            <view @click="() => loadFolder(folder.id, folder.name)">
              {{ folder.name }}
            </view>
            <view class="icon"></view>
          </view>
        </view>

        <view class="items">
          <view class="folder-name" v-for="item in items" :key="item.id">
            <view class="folder-image">
              <image src="../../static/images/chip.png" mode="scaleToFill" />
            </view>
            <view>{{ item.target_name }}</view>
            <view class="icon"></view>
          </view>
        </view>
      </scroll-view>
      <view class="confirm" @click="handleMove()">移动到此处</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { moveElements } from '@/utils/moveElements'
import { moveFolders } from '@/utils/moveFolders'
import { ref, onMounted } from 'vue'
import { getFolder } from '@/utils/getFolders'
const emit = defineEmits<{
  (e: 'deactivateMove'): void
  (e: 'getRouters', value: Array<{ name: string; id: string | null }>): void
}>()

const props = defineProps<{ type: string; selectedCollections: any; selectedFolders?: any }>()

const routes = ref<{ name: string; id: string | null }[]>([{ name: '根目录', id: null }])
const folders = ref<any[]>([])
const items = ref<any[]>([])
// const folderStack = ref<(string | null)[]>([])
// 点击路径跳转
function goToIndex(index: number) {
  const target = routes.value[index]
  routes.value = routes.value.slice(0, index + 1)
  getFolder(props.type, target.id, false, folders, items)
}

// 点击文件夹进入
function loadFolder(folderId: string | null, folderName?: string | null) {
  getFolder(props.type, folderId, true, folders, items)

  const lastRoute = routes.value.at(-1)
  if (folderName && lastRoute?.name !== folderName) {
    routes.value.push({ name: folderName, id: folderId })
  }
}

// 点击取消
const cancel = () => {
  emit('deactivateMove')
}

// 点击移动
const move = async (
  type: string,
  selectedItems: any[],
  route: Ref<{ name: string; id: string | null }[]>,
  selectedFolders: any[],
) => {
  const routeValue = route.value
  const lastRoute = routeValue.at(-1)
  let targetId = null
  if (lastRoute.id) targetId = lastRoute.id

  await moveFolders(type, selectedFolders, targetId)
  await moveElements(type, selectedItems, targetId)
  emit('getRouters', routeValue)
}

const handleMove = () => {
  move(props.type, props.selectedCollections, routes, props.selectedFolders)
}

onMounted(() => {
  routes.value = [{ name: '根目录', id: null }]
  loadFolder(null)
})
</script>

<style scoped>
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
  height: 80vh;
  background-color: #fff;
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
  z-index: 1002;
}

.head {
  display: flex;
  width: 95%;
  height: 50rpx;
  justify-content: space-between;
  font-weight: bold;
}

.route {
  width: 95%;
  display: flex;
  flex-direction: row;
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 400;
  font-size: 30rpx;
  color: #1d8aed;
  text-align: left;
  font-style: normal;
  text-transform: none;
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
}

.folder-image image {
  width: 100%;
  height: 100%;
}

.confirm {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 670rpx;
  height: 64rpx;
  background: #ffffff;
  border-radius: 12rpx 12rpx 12rpx 12rpx;
  border: 2rpx solid #fb9109;
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 400;
  font-size: 28rpx;
  color: #fb9109;
  font-style: normal;
  text-transform: none;
  margin-bottom: 30rpx;
}
</style>
