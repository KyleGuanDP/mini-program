<template>
  <view class="container">
    <view class="category-bar">
      <view class="category-bar-element" @click="changeCategory('product')">产品</view>
      <view class="category-bar-element" @click="changeCategory('paper')">技术文章</view>
      <view class="category-bar-element" @click="changeCategory('design')">参考设计</view>
    </view>
    <view class="content" v-for="folder in folders" :key="folder.id">
      {{ folder.name }}
    </view>
    <view class="content" v-for="item in items" :key="item.id">
      {{ item.name }}
    </view>
  </view>
</template>

<script lang="ts" setup>
import { withAuthRequest } from '@/utils/withAuthRequest'
import { ref, onMounted } from 'vue'

const folder_id = ref<any>(null)
const folders = ref<any[]>([])
const items = ref<any[]>([])
const category = ref<any>('product')

// 改种类
const changeCategory = (category) => {
  category.value = category
}
const getContent = async () => {
  const query = category.value
  let url = `http://121.199.10.78:8001/api/v1/collections/folders/children?target_type=${query}`

  if (folder_id.value !== null && folder_id.value !== undefined) {
    url += `&folder_id=${folder_id.value}`
  }

  const res = await withAuthRequest(
    { url, method: 'GET' },
    (res) => {
      const data = res.data as any
      folders.value = data.folders
      items.value = data.items
    },
    (err) => {
      uni.showModal({
        title: '请求失败',
        content: JSON.stringify(err),
        showCancel: false,
      })
    },
  )
}

onMounted(() => {
  getContent()
})
</script>
