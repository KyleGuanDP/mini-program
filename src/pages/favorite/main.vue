<template>
  <view class="container">
    <button @click="addRootFolder">添加根目录</button>
    <view class="tree">
      <Tree
        v-for="item in nodes"
        :key="item.id"
        :node="item"
        @add="handleAdd"
        @remove="handleRemove"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Tree from './tree.vue'

const nodes = ref<any[]>([])

const getNodesInfo = async () => {
  const token = uni.getStorageSync('token')
  const query = 'product'

  try {
    const res = await uni.request({
      url: `http://121.199.10.78:8001/api/v1/collections/folders/full-tree?target_type=${query}`,
      method: 'GET',
      header: { Authorization: `Bearer ${token}` },
    })

    if (res.statusCode === 200) {
      const data = res.data as {
        children: any[]
      }
      nodes.value = data.children || []
    } else {
      console.error('请求失败:', res)
    }
  } catch (err) {
    console.error('请求异常:', err)
  }
}

const addRootFolder = async () => {
  await handleAdd({ parent_id: null, name: '新建根目录' })
}

const handleAdd = async ({ parent_id, name }) => {
  const token = uni.getStorageSync('token')
  const query = 'product'

  try {
    const res = await uni.request({
      url: `http://121.199.10.78:8001/api/v1/collections/folders?target_type=${query}`,
      method: 'POST',
      header: { Authorization: `Bearer ${token}` },
      data: { parent_id, name },
    })

    if (res.statusCode === 200 || res.statusCode === 201) {
      getNodesInfo()
    } else {
      console.error('创建失败：', res.data)
    }
  } catch (err) {
    console.error('添加目录异常:', err)
  }
}

const handleRemove = async ({ id }) => {
  const token = uni.getStorageSync('token')
  const query = 'product'

  try {
    await uni.request({
      url: `http://121.199.10.78:8001/api/v1/collections/folders/${id}/?target_type=${query}`,
      method: 'DELETE',
      header: { Authorization: `Bearer ${token}` },
    })

    getNodesInfo()
  } catch (err) {
    console.error('删除目录异常:', err)
  }
}

onMounted(() => {
  getNodesInfo()
})
</script>

<style scoped>
.container {
  padding: 20rpx;
}
.tree {
  margin-top: 20rpx;
}
</style>
