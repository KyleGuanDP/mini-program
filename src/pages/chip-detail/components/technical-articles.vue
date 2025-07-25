<route lang="json5">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '',
  },
}
</route>

<template>
  <moveInfoCard
    :type="'technical_paper'"
    :selectedCollections="item_id"
    v-if="addVisible"
    @deactivateMove="clockPopUp"
  />
  <pop-up v-if="visible" @change="addV" />
  <view class="tab2">
    <view class="list-item" v-for="item in showList" :key="item">
      <view class="line"></view>
      <view class="text4">
        {{ item.name || '-' }}
      </view>
      <image
        class="icon3"
        src="@/static/images/chip-detail/pdf1.png"
        mode="scaleToFill"
        @click="openFileByUrl(item)"
      />
      <image
        class="icon4"
        src="@/static/images/collection.png"
        mode="scaleToFill"
        @click="showPopup(item)"
      />
    </view>
    <view class="list-item" v-if="!showList?.length">
      <view class="text4">暂无数据~</view>
    </view>
    <view
      class="show-all"
      v-if="detail.value?.technical_paper_file?.length > 7"
      @click="showAllList = !showAllList"
    >
      <view class="text">
        {{
          showAllList
            ? '收起'
            : `展开(剩余${detail?.technical_paper_file?.length - showList.length}篇)`
        }}
      </view>
      <image
        class="icon4"
        :class="showAllList ? 'rotate' : ''"
        src="@/static/images/chip-detail/icon13.png"
        mode="scaleToFill"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { downloadFile } from '@/utils/download'
import { addToFolder } from '@/utils/addToFolder'
import moveInfoCard from '@/pages/favorite/moveInfoCard.vue'
import popUp from '@/pages/favorite/popUp.vue'
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const detail = toRef(props, 'data')
const showAllList = ref(false)
const item_id = ref([])
const visible = ref(false)
const addVisible = ref(false)

const showList = computed(() => {
  detail.value.technical_paper_file = detail.value.technical_paper_file ?? []
  return showAllList.value
    ? detail.value.technical_paper_file
    : detail.value.technical_paper_file.slice(0, 7)
})
const openFileByUrl = (item: any) => {
  console.log('item', item)
  downloadFile(item?.path, item?.name)
}

// 收藏
const showPopup = async (item?: any) => {
  const res = await addToFolder(
    'http://121.199.10.78:8001/api/v1/collections/items',
    'technical_paper',
    item.name,
    null,
    item.name,
    item?.path,
  )

  item_id.value.push(res.data.id)
  // console.log('这是收藏之后的id', res.data.id)
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, 3000) // 3秒自动消失
}

const clockPopUp = () => {
  addVisible.value = false
}

const addV = () => {
  addVisible.value = true
}
</script>

<style lang="scss" scoped>
.tab2 {
  .list-item {
    display: flex;
    align-items: center;
    margin-top: 40rpx;
    .text4 {
      flex: 1;
      font-weight: 400;
      font-size: 24rpx;
      color: #666666;
      line-height: 36rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-left: 20rpx;
      border-left: #eeeeee 6rpx solid;
      box-sizing: border-box;
      padding-left: 20rpx;
    }
    .icon3 {
      width: 80rpx;
      min-width: 80rpx;
      height: 48rpx;
      margin-left: 10rpx;
      margin-right: 10rpx;
    }

    .icon4 {
      width: 30rpx;
      min-width: 30rpx;
      height: 30rpx;
      margin-left: 10rpx;
      margin-right: 10rpx;
    }
  }
  .show-all {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding-top: 20rpx;
    border-top: 2rpx dashed #eeeeee;
    margin-top: 20rpx;
    .text {
      height: 34rpx;
      font-weight: 400;
      font-size: 24rpx;
      color: #666666;
      line-height: 34rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-right: 10rpx;
    }
  }
  .icon4 {
    width: 24rpx;
    height: 24rpx;
  }
  .rotate {
    transform: rotate(180deg);
  }
}
</style>
