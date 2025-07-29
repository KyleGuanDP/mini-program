<template>
  <view class="container">
    <view class="mask"></view>

    <view class="modal">
      <view class="head">
        <view class="cancel" @click="goBack">
          <image src="../../static/images/product/leftTo.png" mode="scaleToFill" />
        </view>
        <view class="move">移动</view>
        <view class="create" @click="cancel">
          <image src="../../static/images/product/cancle.png" mode="scaleToFill" />
        </view>
      </view>
      <view class="route">
        <view
          class="specific-route"
          v-for="(route, index) in routes"
          :key="index"
          @click="goToIndex(index)"
          :class="{ active: route.id === routes.at(-1).id }"
        >
          {{ route.name }} /
        </view>
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
      <view class="button-group">
        <view class="confirm create" @click="activeCreateFolder">
          <view class="create-image">
            <image src="../../static/images/product/create.png" mode="scaleToFill" />
          </view>
          <view>新建文件夹</view>
        </view>
        <view class="confirm move" @click="handleMove()">移动到此处</view>
      </view>
    </view>
  </view>
  <createFolder
    :type="type"
    :parentId="routes"
    v-if="activeCreate"
    @closeCreateFolder="activeCreateFolder2"
    @createFolder="createEmit"
  />
</template>

<script setup lang="ts">
import { moveElements } from '@/utils/moveElements'
import { moveFolders } from '@/utils/moveFolders'
import { ref, onMounted } from 'vue'
import { getFolder } from '@/utils/getFolders'
import createFolder from './createFolder.vue'
const emit = defineEmits<{
  (e: 'deactivateMove'): void
  (e: 'getRouters', value: Array<{ name: string; id: string | null }>): void
}>()

const props = defineProps<{
  type: string
  selectedCollections: any
  selectedFolders?: any
  searchPage?: boolean
}>()

const routes = ref<{ name: string; id: string | null }[]>([{ name: '根目录', id: null }])
const folders = ref<any[]>([])
const items = ref<any[]>([])

const activeCreate = ref(false)

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

  const res = await moveFolders(type, selectedFolders, targetId)
  const res2 = await moveElements(type, selectedItems, targetId)
  console.log('this is move status log', res.statusCode, res2.statusCode)
  if (res.statusCode === 200 && res2.statusCode === 200) {
    uni.showToast({ title: '移动成功', icon: 'success' })
  } else {
    uni.showToast({ title: '移动失败', icon: 'error' })
  }
  setTimeout(() => {
    emit('getRouters', routeValue)
  }, 1000)
}

const handleMove = () => {
  console.log('这是传过来的type', props.type)
  move(props.type, props.selectedCollections, routes, props.selectedFolders)
}

// active create
const activeCreateFolder = () => {
  activeCreate.value = true
}

// switch createFolder to false
const activeCreateFolder2 = () => {
  activeCreate.value = false
}

const createEmit = async () => {
  const target = routes.value.at(-1).id
  await getFolder(props.type, target, false, folders, items)
  activeCreate.value = false
}

// 返回
const goBack = () => {
  if (routes.value.length > 1) {
    const pop = routes.value.pop()
    const target = routes.value[routes.value.length - 1]
    getFolder(props.type, target.id, false, folders, items)
  }
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
  padding-top: 30rpx;
}

.cancel {
  width: 18rpx;
  height: 28rpx;
}

.create {
  width: 32rpx;
  height: 32rpx;
}

.route {
  width: 98%;
  display: flex;
  flex-direction: row;
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 400;
  font-size: 22rpx;

  text-align: left;
  font-style: normal;
  text-transform: none;
  color: #979797;
  padding-left: 10rpx;
  padding-top: 10rpx;
}

.specific-route {
  padding-top: 20rpx;
  padding-left: 10rpx;
}

.specific-route.active {
  color: #e65924;
  padding-left: 10rpx;
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
.button-group {
  display: flex;
  flex-direction: row;
  gap: 20rpx;
}

.create-image {
  width: 32rpx;
  height: 32rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.confirm {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 335rpx;
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
.confirm.create {
  border: 0;
}

.confirm.move {
  background: #e65924;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 400;
  font-size: 28rpx;
  color: #ffffff;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
</style>
