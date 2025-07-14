<template>
  <view class="container">
    <DisplayTree v-for="node in nodes" :key="node.id" :node="node" :detail="detail" />
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DisplayTree from './displayTree.vue'

const props = defineProps<{
  detail: any
}>()

const nodes = ref<any>([])

const getNodesInfo = async () => {
  const token = uni.getStorageSync('token')
  const res = await uni.request({
    url: `http://121.199.10.78:8000/api/v1/collections/folders/tree?target_type=product`,
    method: 'GET',
    header: { Authorization: `Bearer ${token}` },
  })

  if (res.statusCode === 200) {
    nodes.value = res.data
  }
}

onMounted(() => {
  getNodesInfo()
})
</script>
