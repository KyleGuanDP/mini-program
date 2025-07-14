<template>
  <view>
    <button @click="add">收藏</button>
  </view>
</template>

<script lang="ts" setup>
const add = async () => {
  const token = uni.getStorageSync('token')
  const query = 'product'
  const res = await uni.request({
    url: `http://121.199.10.78:8000/api/v1/collections/folders?target_type=${query}`,
    method: 'POST',
    header: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      name: 'fuck9333238888',
      parent_id: null,
    },
  })

  console.log(res)
}
</script>
