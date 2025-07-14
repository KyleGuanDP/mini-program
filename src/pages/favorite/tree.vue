<template>
  <view class="tree">
    <view class="name" :class="{ expanded }" @click="toggle">
      📁 {{ node.name }}
      <view class="actions" @click.stop>
        <text class="btn" @click="addChild">➕</text>
        <text class="btn" @click="removeSelf">🗑️</text>
      </view>
    </view>

    <!-- 添加目录输入框 -->
    <view class="add" v-if="add">
      <input
        v-model="folder_name"
        placeholder="请输入文件夹名称"
        placeholder-class="input-placeholder"
        confirm-type="done"
        @confirm="confirmAdd"
      />
    </view>

    <!-- 子目录 -->
    <view v-if="expanded && node.children?.length > 0" class="children">
      <Tree
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        @add="emit('add', $event)"
        @remove="emit('remove', $event)"
      />
    </view>

    <!-- 收藏项 -->
    <view v-if="expanded && node.items?.length > 0" class="children">
      <view v-for="item in node.items" :key="item.id" class="item">📄 {{ item.target_name }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Tree from './tree.vue'
import { ref } from 'vue'

const props = defineProps<{
  node: any
}>()

const emit = defineEmits(['add', 'remove'])

const expanded = ref(false)
const add = ref(false)
const folder_name = ref('')

const toggle = () => {
  expanded.value = !expanded.value
}

const addChild = () => {
  add.value = !add.value
}

const confirmAdd = () => {
  const name = folder_name.value.trim()
  if (!name) return
  emit('add', { parent_id: props.node.id, name })
  folder_name.value = ''
  add.value = false
}

const removeSelf = () => {
  emit('remove', { id: props.node.id })
}
</script>

<style scoped>
.tree {
  padding-left: 16px;
  font-size: 14px;
}

.name {
  font-weight: 500;
  padding: 6px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
}

.actions {
  display: flex;
  gap: 6px;
}

.btn {
  padding: 0 4px;
  font-size: 16px;
  color: #007aff;
}

.add {
  margin: 8px 0;
}

.children {
  padding-left: 12px;
  border-left: 1px dashed #ccc;
  margin-top: 4px;
}

.item {
  padding: 4px 0;
}
</style>
