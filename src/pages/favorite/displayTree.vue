<template>
  <view class="tree">
    <view class="node" @click="toggle">
      <text class="arrow">{{ expanded && hasChildren ? '▼' : hasChildren ? '▶' : '' }}</text>
      <text class="label" @click.stop="() => addToFolder()">📁 {{ node.name }}</text>
    </view>

    <view v-if="expanded" class="children">
      <DisplayTree v-for="child in node.children" :key="child.id" :node="child" :detail="detail" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DisplayTree from './displayTree.vue'

const props = defineProps<{
  node: any
  detail: any
}>()

const expanded = ref(false)
const hasChildren = computed(() => props.node.children && props.node.children.length > 0)

const toggle = () => {
  if (hasChildren.value) expanded.value = !expanded.value
}

const addToFolder = async () => {
  const token = uni.getStorageSync('token')
  const query = 'product'
  const d = props.detail

  const res = await uni.request({
    url: `http://121.199.10.78:8001/api/v1/collections/items/?target_type=${query}`,
    method: 'POST',
    header: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      target_id: d.pid,
      target_name: d.part_number,
      folder_id: props.node.id,
      target_path: d.datasheet_file,
    },
  })
  if (res.statusCode === 200 || res.statusCode === 201) {
    uni.showToast({ title: '收藏成功', icon: 'success' })
  } else {
    uni.showToast({ title: '收藏失败', icon: 'error' })
  }
}
</script>
