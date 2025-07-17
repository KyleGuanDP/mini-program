<template>
  <view>
    <view class="mask"></view>
    <button open-type="chooseAvatar" hover-class="button-hover" @chooseavatar="onChooseAvatar">
      选择头像
    </button>
    <image
      v-if="avatar"
      :src="avatar"
      mode="scaleToFill"
      style="width: 80px; height: 80px; border-radius: 50%"
    />
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const avatar = ref<string>('')

const onChooseAvatar = (e) => {
  avatar.value = e.detail.avatarUrl
}
</script>

<style lang="css" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
}
</style>
