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
    :type="'product'"
    :selectedCollections="item_id"
    v-if="addVisible"
    @deactivateMove="clockPopUp"
  />
  <pop-up v-if="visible" @change="addV" />
  <view class="list-card">
    <view class="flex items-start">
      <view class="icon3">
        <image
          class="icon6"
          v-if="detail?.chip_img"
          :src="detail?.chip_img"
          mode="scaleToFill"
          @error="detail!.chip_img = ''"
        />
        <image
          v-else
          class="icon6"
          src="@/static/images/chip-detail/chip-image.png"
          mode="scaleToFill"
        />
      </view>
      <view>
        <view class="flex items-center">
          <view class="text4">{{ detail.part_number || '-' }}</view>
          <view class="text8">{{ detail.company_name || '-' }}</view>
          <view
            class="tag"
            :style="styleList[detail.manufacturing_status]"
            v-if="detail.manufacturing_status"
          >
            {{ detail.manufacturing_status }}
          </view>
        </view>
        <view class="flex items-start">
          <view class="text6">分类：</view>
          <view class="text7">
            {{ getCategoriesText(detail) }}
          </view>
        </view>
        <view class="text7 mt-8rpx">
          {{ detail.part_number_title || '-' }}
        </view>
        <view class="flex items-center mt-20rpx justify-between">
          <view class="flex items-center flex-wrap">
            <view class="text6">封装：</view>
            <view class="text7" v-for="item in detail?.package" :key="item.type_std">
              {{ item.type }}
            </view>
            <view v-if="!detail?.package?.length" class="text7">-</view>
          </view>
        </view>
      </view>
    </view>
    <view class="card-bottom">
      <view class="bottom-left">
        <image class="icon2" src="@/static/images/chip-detail/pdf2.png" mode="scaleToFill" />
        <view class="text1">规格书：</view>
        <view class="text1" style="color: #666666">2022-11-22</view>
      </view>
      <view class="bottom-right">
        <view class="flex items-center" @click.stop="openFile(detail)">
          <image class="icon2" src="@/static/images/chip-detail/dakai.png" mode="scaleToFill" />
          <view class="text1" style="color: #2a7de1">打开</view>
        </view>
        <view class="flex items-center" @click.stop="openFile(detail)">
          <image class="icon2" src="@/static/images/chip-detail/xiazai.png" mode="scaleToFill" />
          <view class="text1" style="color: #22c55e">下载</view>
        </view>
        <view class="flex items-center">
          <image class="icon2" src="@/static/images/chip-detail/email.png" mode="scaleToFill" />
          <view class="text1" style="color: #e65925">邮件</view>
        </view>
        <view class="flex items-center">
          <image class="icon2" src="@/static/images/collection.png" mode="scaleToFill" />
          <view class="text1" style="color: #e65925" @click="showPopup">收藏</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { addToFolder } from '../../../utils/addToFolder'
import { downloadFile } from '@/utils/download'
import popUp from '@/pages/favorite/popUp.vue'
import moveInfoCard from '@/pages/favorite/moveInfoCard.vue'
// 弹窗1
const visible = ref(false)
// 弹窗2
const addVisible = ref(false)
// 修改弹窗2状态
const addV = () => {
  addVisible.value = true
}

const addV2 = () => {
  addVisible.value = false
}
// item_id
const item_id = ref([])
const styleList = ref({
  新产品: 'background: #E65925;',
  正在供货: 'background: #21C55E;',
  预发布: 'background: #2A7DE2;',
  不推荐用于新设计: 'background: #C48714;',
  停产: 'background: #8B8B8B;',
})

const showPopup = async () => {
  const res = await addToFolder(
    'http://121.199.10.78:8001/api/v1/collections/items',
    'product',
    detail.value.pid,
    null,
    detail.value.part_number,
    detail.value.datasheet_file,
  )

  console.log('这是芯片详情收藏成功返回', res.data)
  item_id.value.push(res.data.id)
  // console.log('这是收藏之后的id', res.data.id)
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, 3000) // 3秒自动消失
}

// 收藏点击处理

const labelList = ref(['新产品', '正在供货', '预发布', '不推荐用于新设计', '停产'])
// 定义组件接收的 props，data 为芯片详情数据对象
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})
// 通过 toRef 保证 detail 响应式，便于模板直接使用
const detail = toRef(props, 'data')
const getCategoriesText = (item) => {
  const res =
    (item.category_lv1 ? item.category_lv1 + '/' : '') +
    (item.category_lv2 ? item.category_lv2 + '/' : '') +
    (item.category_lv3 || '')
  return res ? res : '-'
}
const openFile = (item: any) => {
  console.log('打开文件', item)
  downloadFile(item?.datasheet_file, '规格书')
  // uni.navigateTo({
  //   url: `/pages/pdf/index?src=${item?.datasheet_file}&title=${item?.part_number || ''}`,
  // })
  //
}

// closeMovePop
const clockPopUp = () => {
  addVisible.value = false
}
</script>

<style lang="scss" scoped>
.list-card {
  background: #ffffff;
  box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.1);
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  box-sizing: border-box;
  margin: 0 20rpx;
  margin-bottom: 20rpx;
  padding: 20rpx;
  padding-bottom: 28rpx;
}
.card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding-top: 28rpx;
  border-top: 2rpx dashed #eeeeee;
  margin-top: 20rpx;
  .bottom-left {
    display: flex;
    align-items: center;
  }
  .bottom-line {
    width: 2rpx;
    height: 40rpx;
    border: 1rpx dashed #eeeeee;
    box-sizing: border-box;
  }
  .bottom-right {
    display: flex;
    align-items: center;
    gap: 40rpx;
  }
  .icon2 {
    margin-right: 10rpx;
  }
  .text1 {
    height: 28rpx;
    font-weight: 400;
    font-size: 20rpx;
    color: #333333;
    line-height: 28rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
  .text2 {
    color: #2a7de1;
  }
}
.icon2 {
  width: 28rpx;
  height: 28rpx;
}
.icon3 {
  width: 112rpx;
  height: 112rpx;
  //background: #f95;
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  margin-right: 30rpx;
  .icon6 {
    margin-top: 30rpx;
    width: 112rpx;
    height: 112rpx;
    border-radius: 20rpx 20rpx 20rpx 20rpx;
  }
}
.text4 {
  height: 40rpx;
  font-weight: 500;
  font-size: 28rpx;
  color: #333333;
  line-height: 40rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-right: 10rpx;
}
.text6 {
  height: 28rpx;
  font-weight: 500;
  font-size: 20rpx;
  color: #333333;
  line-height: 28rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.text7 {
  font-weight: 400;
  font-size: 20rpx;
  color: #666666;
  line-height: 28rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-right: 10rpx;
}
.text8 {
  height: 28rpx;
  font-weight: 500;
  font-size: 20rpx;
  color: #333333;
  line-height: 28rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.tag {
  height: 28rpx;
  border-radius: 18rpx 18rpx 18rpx 18rpx;
  margin-left: 10rpx;

  line-height: unset;
  font-weight: 500;
  font-size: 16rpx;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0rpx 12rpx;
  box-sizing: border-box;
}
</style>
