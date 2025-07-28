<template>
  <view class="container" v-if="page === 'product'">
    <view class="category">
      <view
        class="sub-category product"
        @tap="selectItem"
        data-name="product"
        :class="{ active: type === 'product' }"
      >
        产品
      </view>
      <view
        class="sub-category center"
        @tap="selectItem"
        data-name="technical_paper"
        :class="{ active: type === 'technical_paper' }"
      >
        技术文章
      </view>
      <view
        class="sub-category"
        @tap="selectItem"
        data-name="reference_design"
        :class="{ active: type === 'reference_design' }"
      >
        参考设计
      </view>
    </view>

    <view class="main">
      <view class="edit">
        <view class="page">
          <view class="all" @click="toAlbum" :class="{ active: page === 'Album' }">全部</view>
          <view class="album" @click="toProduct" :class="{ active: page === 'product' }">
            收藏夹
          </view>
        </view>
        <view class="order">
          <view class="order-image">
            <image src="../../static/images/order.png" mode="scaleToFill" />
          </view>
          <view class="order-text">智能排序</view>
        </view>
      </view>
      <view class="total">
        共
        <text class="highlight">{{ items.length }}</text>
        个收藏
      </view>
      <view class="route">
        <view
          class="specific-route"
          :class="{ active: route.id === routes.at(-1).id }"
          v-for="(route, index) in routes"
          :key="index"
          @click="goToIndex(index)"
        >
          {{ route.name }} /
        </view>
      </view>
      <scroll-view scroll-y class="content">
        <view class="folders">
          <view class="folder-name" v-for="folder in folders" :key="folder.id">
            <view class="folder-image" @click="clickFolderAndImage(folder.id, folder.name)">
              <image src="../../static/images/folder.png" mode="scaleToFill" />
            </view>
            <view @click="clickFolderAndImage(folder.id, folder.name)">{{ folder.name }}</view>
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
              <image src="../../static/images/chip.png" mode="scaleToFill" />
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
      @activeMove="activeMoveFunc"
      @activeManage="activeManageFunc"
      @activeRemove="activeRemovePage"
      @closeManage="managementCancel"
    />
    <Move
      :type="type"
      :selectedCollections="selectedCollectionStack"
      :selectedFolders="selectedFolderStack"
      v-if="activeMove"
      @deactivateMove="activeMoveFunc2"
      @getRouters="getRoutes"
    />

    <manageOption
      v-if="activeManage"
      @allSelected="allSelected"
      @deactivateManage="activeManageFunc2"
      @editEmit="processEditEmit"
      :type="type"
      :selectedFolders="selectedFolderStack"
      :selectedItems="selectedCollectionStack"
    />
    <createFolder
      :type="type"
      :parentId="routes"
      v-if="activeCreate"
      @closeCreateFolder="activeCreateFolder2"
      @createFolder="createEmit"
    />
    <removeItems
      :type="type"
      :items="selectedCollectionStack"
      v-if="activeRemove"
      @closeRemove="activeRemovePage2"
      @removeBack="processEditEmit"
    />

    <movable-area class="float-area">
      <movable-view
        class="float-btn"
        direction="all"
        :x="floatX"
        :y="floatY"
        @change="onFloatChange"
        @tap="activeCreateFolder"
      >
        <image src="../../static/images/create.png" mode="scaleToFill" />
      </movable-view>
    </movable-area>
  </view>
  <view class="container" v-else>
    <view class="category">
      <view
        class="sub-category product"
        @tap="selectItem"
        data-name="product"
        :class="{ active: type === 'product' }"
      >
        产品
      </view>
      <view
        class="sub-category center"
        @tap="selectItem"
        data-name="technical_paper"
        :class="{ active: type === 'technical_paper' }"
      >
        技术文章
      </view>
      <view
        class="sub-category"
        @tap="selectItem"
        data-name="reference_design"
        :class="{ active: type === 'reference_design' }"
      >
        参考设计
      </view>
    </view>

    <!-- 👇 新增 main 包裹 -->
    <view class="main">
      <view class="edit">
        <view class="page">
          <view class="all" @click="toAlbum" :class="{ active: page === 'Album' }">全部</view>
          <view class="album" @click="toProduct" :class="{ active: page === 'product' }">
            收藏夹
          </view>
        </view>
      </view>

      <scroll-view scroll-y class="content">
        <view class="items">
          <view class="folder-name" v-for="item in flatItems" :key="item.id">
            <view class="folder-image">
              <image src="../../static/images/chip.png" mode="scaleToFill" />
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
    <!-- 👆 main 包裹结束 -->

    <ManagementAlbum
      :selectedItems="selectedCollectionStack"
      v-if="selectedCollectionStack.length"
      @allSelected="allSelectedFlat"
      @activeMove="activeMoveFunc"
      @activeRemove="activeRemovePage"
    />
    <moveAlbum
      :type="type"
      :selectedCollections="selectedCollectionStack"
      v-if="activeMove"
      @deactivateMove="activeMoveFunc2"
      @getRouters="getRoutes"
    />
    <removeItems
      :type="type"
      :items="selectedCollectionStack"
      v-if="activeRemove"
      @closeRemove="activeRemovePage2"
      @removeBack="processEditEmit"
    />
  </view>
</template>

<script setup lang="ts">
import { getFolder } from '@/utils/getFolders'
import { getAlbum } from '@/utils/getAlbum'
import { ref } from 'vue'
import removeItems from '../favorite/removeItems.vue'
import management from '../favorite/management.vue'
import Move from '../favorite/move.vue'
import ManagementAlbum from '../favorite/managementAlbum.vue'
import manageOption from '../favorite/manageOption.vue'
import createFolder from '../favorite/createFolder.vue'
import moveAlbum from '../favorite/moveAlbum.vue'
//初始化数据
const folders = ref<any[]>([])
const items = ref<any[]>([])
const type = ref<string>('product')
// const folderStack = ref<(string | null)[]>([])
const selectedCollectionStack = ref<(string | null)[]>([])
const selectedFolderStack = ref<(string | null)[]>([])
const activeIcons = ref<Record<number, boolean>>({})

const activeMove = ref<boolean>(false)
const activeManage = ref<boolean>(false)
const activeCreate = ref<boolean>(false)
const activeRemove = ref<boolean>(false)

const routes = ref<{ name: string; id: string | null }[]>([{ name: '根目录', id: null }])
const page = ref<any>('product')
const flatItems = ref<any[]>([])
const loading = ref(false)

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
async function selectItem(e) {
  type.value = e.currentTarget.dataset.name
  routes.value = [{ name: '根目录', id: null }]
  if (page.value === 'product') {
    await loadFolder(null)
  } else {
    await getAlbum(type.value, flatItems)
  }
}

// switch move status to true
const activeMoveFunc = () => {
  activeMove.value = true
}

// switch move status to false
const activeMoveFunc2 = () => {
  activeMove.value = false
}

// switch moveOptions to true
const activeManageFunc = () => {
  activeManage.value = true
}

// switch moveOptions to false
const activeManageFunc2 = () => {
  activeManage.value = false
}

// switch createFolder to true
const activeCreateFolder = () => {
  activeCreate.value = true
}

// switch createFolder to false
const activeCreateFolder2 = () => {
  activeCreate.value = false
}

// switch remove to true
const activeRemovePage = () => {
  activeRemove.value = true
}

// switch remove to false
const activeRemovePage2 = () => {
  activeRemove.value = false
}

// get folder
async function loadFolder(folderId: any | null, folderName?: string | null) {
  const res = await getFolder(type.value, folderId, true, folders, items)
  console.log(items.value)
  const lastRoute = routes.value.at(-1)
  if (folderName && lastRoute?.name !== folderName) {
    routes.value.push({ name: folderName, id: folderId })
  }

  return res
}

// to next folder
const clickFolderAndImage = async (folderId: any | null, folderName?: string | null) => {
  await loadFolder(folderId, folderName)
  activeIcons.value = {}
  selectedCollectionStack.value = []
  selectedFolderStack.value = []
}

// // 返回上一级
// const goBack = () => {
//   if (folderStack.value.length <= 1) return
//   folderStack.value.pop()
//   const prev = folderStack.value.at(-1) ?? null
//   getFolder(type.value, prev, false)
// }

// 路由
async function goToIndex(index: number) {
  const target = routes.value[index]
  routes.value = routes.value.slice(0, index + 1)
  activeIcons.value = {}
  selectedFolderStack.value = []
  selectedCollectionStack.value = []
  await getFolder(type.value, target.id, false, folders, items)
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

// active flat
const allSelectedFlat = (value: boolean) => {
  if (value) {
    activeIcons.value = {}

    for (const item of flatItems.value) {
      activeIcons.value[item.id] = true
      selectedCollectionStack.value.push(item.id)
    }
  } else {
    activeIcons.value = {}
    selectedCollectionStack.value = []
  }
}

// switch page to product
const toProduct = async () => {
  type.value = 'product'
  page.value = 'product'
  flatItems.value = []
  activeIcons.value = {}
  routes.value = [{ name: '根目录', id: null }]
  selectedFolderStack.value = []
  selectedCollectionStack.value = []
  console.log(items.value)
  await loadFolder(null)
}

// switch page to album
const toAlbum = async () => {
  type.value = 'product'
  page.value = 'Album'
  await getAlbum(type.value, flatItems)
  routes.value = [{ name: '根目录', id: null }]
  activeIcons.value = {}
  selectedFolderStack.value = []
  selectedCollectionStack.value = []
}

// move pass the routes parameters
const getRoutes = async (route: Array<{ name: string; id: string | null }>) => {
  // loading.value = true
  uni.showLoading({
    title: '加载中...',
    mask: true,
  })
  const res = await loadFolder(route.at(-1).id, route.at(-1).name)
  routes.value = route
  activeMove.value = false
  activeIcons.value = {}
  selectedFolderStack.value = []
  selectedCollectionStack.value = []
  // loading.value = false
  uni.hideLoading()
  // console.log(res.statusCode)
  // if (res.statusCode === 200) {
  //   uni.showToast({ title: '收藏成功', icon: 'success' })
  // } else {
  //   uni.showToast({ title: '收藏失败', icon: 'error' })
  // }
}
// edit move and remove emit
const processEditEmit = async () => {
  uni.showLoading({
    title: '加载中...',
    mask: true,
  })

  const route = routes.value
  if (page.value === 'product') {
    await loadFolder(route.at(-1).id)
  } else {
    await getAlbum(type.value, flatItems)
  }
  activeManage.value = false
  activeIcons.value = {}
  selectedFolderStack.value = []
  selectedCollectionStack.value = []

  uni.hideLoading()
}

// create folder emit
const createEmit = async () => {
  uni.showLoading({
    title: '加载中...',
    mask: true,
  })

  const route = routes.value
  await loadFolder(route.at(-1).id)
  activeIcons.value = {}
  selectedFolderStack.value = []
  selectedCollectionStack.value = []

  uni.hideLoading()
}

// 悬浮
const floatX = ref(600)
const floatY = ref(1000)

const onFloatChange = (e) => {
  floatX.value = e.detail.x
  floatY.value = e.detail.y
}

// 管理关闭
const managementCancel = () => {
  activeIcons.value = {}
  selectedFolderStack.value = []
  selectedCollectionStack.value = []
}

//初始化数据
onShow(() => {
  routes.value = [{ name: '根目录', id: null }]
  type.value = 'product'
  page.value = 'product'
  loadFolder(null)
})
</script>
<style lang="css" scoped>
/* [class] {
  border: 1rpx solid;
} */

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9f9f9;
  padding-top: 30rpx;
}

.category {
  width: 85%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.sub-category {
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 400;
  font-size: 32rpx;
  color: #979797;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.sub-category.active {
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 600;
  font-size: 32rpx;
  color: #181818;
  text-align: left;
  font-style: normal;
  text-transform: none;
  border-bottom: 4rpx solid #e65924;
}

.sub-category.center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.main {
  background: #ffffff;
  border-radius: 16rpx 16rpx 16rpx 16rpx;
  width: 95%;
  margin-top: 10rpx;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15rpx;
  gap: 10rpx;
}

.edit {
  width: 95%;
  height: 50rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.page {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20rpx;
}

.all,
.album {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #979797;
  text-align: left;
  font-style: normal;
  text-transform: none;
  border-radius: 4rpx 4rpx 4rpx 4rpx;
  border: 1rpx solid #dcdcdc;
  padding-left: 15rpx;
  padding-right: 15rpx;
}

.all.active,
.album.active {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4rpx 4rpx 4rpx 4rpx;
  border: 1rpx solid #e65924;
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #e65924;
  text-align: left;
  font-style: normal;
  text-transform: none;
  padding-left: 15rpx;
  padding-right: 15rpx;
}

.order {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #636572;
  font-style: normal;
  text-transform: none;
  gap: 5rpx;
}

.order-image {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 25rpx;
  height: 25rpx;
}

.order-text {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.total {
  width: 95%;
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 400;
  font-size: 24rpx;
  color: #333333;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.total text {
  color: #e65924;
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
  padding-left: 10rpx;
}

.specific-route.active {
  color: #e65924;
  padding-left: 10rpx;
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
  border-bottom: 2rpx solid #eeeeee;
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

/* 悬浮 */

.float-area {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 999;
}

.float-btn {
  width: 100rpx;
  height: 100rpx;
  background: #e65924;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

.float-btn image {
  width: 40%;
  height: 40%;
}
</style>
