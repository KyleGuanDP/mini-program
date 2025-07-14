<template>
  <view class="container">
    <view class="edit" v-if="edit">
      <view class="title name">姓名:</view>
      <input
        v-model="name"
        placeholder="请输入姓名"
        placeholder-class="input-placeholder"
        @input=""
      />
      <button hover-class="button-hover" @click="">取消</button>
      <button hover-class="button-hover" @click="">提交</button>
    </view>
    <view v-else class="profile"></view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const edit = ref<boolean>(false)
const name = ref<string>('')
</script>

<style lang="css" scoped></style>
