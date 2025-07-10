<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '',
  },
}
</route>

<template>
  <web-view :src="src" />
</template>

<script lang="ts" setup>
//
const src = ref(
  'https://storage.djyanbao.com/dj-docs/a2c53ba0a1282567c9a651b9d261df4d2e537ead.pdf?u=1&t=1758463609677&token=f20522591266f347da67e29d45f50676',
)
onShareAppMessage(() => {
  return {
    title: '这是自定义分享标题',
    path: '/pages/pdf/index?from=share', // 可带参数
    imageUrl: 'https://yourdomain.com/share.jpg', // 可选，自定义封面图
  }
})
onLoad((option) => {
  // 页面加载时的逻辑
  console.log('Page loaded with options:', option)
  if (option.src) {
    src.value = option.src
  }
})
</script>

<style lang="scss" scoped>
//
</style>
