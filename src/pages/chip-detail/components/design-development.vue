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
    :type="'reference_design'"
    :selectedCollections="item_id"
    v-if="addVisible"
    @deactivateMove="clockPopUp"
  />
  <pop-up v-if="visible" @change="addV" />
  <view class="tab2">
    <view class="list-items" :class="show1 ? 'pb-20rpx' : ''">
      <view class="list-items-top" @click="show1 = !show1">
        <view class="title">设计仿真工具</view>
        <view class="show-icon">
          <image
            class="icon1"
            v-if="!show1"
            src="@/static/images/chip-detail/icon15.png"
            mode="scaleToFill"
          />
          <image
            class="icon1"
            v-else
            src="@/static/images/chip-detail/icon14.png"
            mode="scaleToFill"
          />
        </view>
      </view>
      <view class="text4-wrapper" :class="show1 ? 'expanded' : 'collapsed'">
        <view class="list-content" v-if="show1">
          <view
            class="list1"
            v-for="item in detail.simulation_model"
            :key="item.name"
            @click="openFileByUrl(item)"
          >
            <view class="img">
              <image class="icon" src="@/static/images/chip-detail/chart.png" mode="scaleToFill" />
            </view>
            <div class="list1-center">
              <view class="text1" style="color: #e65925">{{ item.name || '-' }}</view>
              <image class="icon2" src="@/static/images/chip-detail/gw.png" mode="scaleToFill" />
            </div>
          </view>
          <view class="text3" v-if="!detail.simulation_model?.length">暂无数据~</view>
        </view>
      </view>
    </view>
    <view class="list-items" :class="show2 ? 'pb-20rpx' : ''">
      <view class="list-items-top" @click="show2 = !show2">
        <view class="title">参考设计</view>
        <view class="show-icon">
          <image
            class="icon1"
            v-if="!show2"
            src="@/static/images/chip-detail/icon15.png"
            mode="scaleToFill"
          />
          <image
            class="icon1"
            v-else
            src="@/static/images/chip-detail/icon14.png"
            mode="scaleToFill"
          />
        </view>
      </view>
      <view class="text4-wrapper" :class="show2 ? 'expanded' : 'collapsed'">
        <view class="list-content list-content2" v-if="show2">
          <view class="list1" v-for="item in detail.reference_design_file" :key="item.name">
            <view class="img">
              <image class="icon" src="@/static/images/chip-detail/design.png" mode="scaleToFill" />
            </view>
            <div class="list1-center">
              <view class="text1" style="color: #666666">{{ item.name || '-' }}</view>
              <image
                class="icon2"
                src="@/static/images/chip-detail/gwc.png"
                mode="scaleToFill"
                @click="openFileByUrl(item)"
              />
              <image
                class="icon2"
                src="@/static/images/collection.png"
                mode="scaleToFill"
                @click="showPopup(item)"
              />
            </div>
          </view>
          <view class="text3" v-if="!detail.reference_design_file?.length">暂无数据~</view>
        </view>
      </view>
    </view>
    <view class="list-items" :class="show3 ? 'pb-20rpx' : ''">
      <view class="list-items-top" @click="show3 = !show3">
        <view class="title">CAD图纸</view>
        <view class="show-icon">
          <image
            class="icon1"
            v-if="!show3"
            src="@/static/images/chip-detail/icon15.png"
            mode="scaleToFill"
          />
          <image
            class="icon1"
            v-else
            src="@/static/images/chip-detail/icon14.png"
            mode="scaleToFill"
          />
        </view>
      </view>
      <view class="text4-wrapper" :class="show3 ? 'expanded' : 'collapsed'">
        <view class="list-content list-content2" v-if="show3">
          <view class="list3" v-for="item in detail.package" :key="item.name">
            <view class="list3-left flex flex-col">
              <view class="text4">封装</view>
              <view class="text5">{{ item.type || '-' }}</view>
            </view>
            <view class="line flex flex-col">
              <view class="text4">引脚</view>
              <view class="text6">{{ item.pin_count || '-' }}</view>
            </view>
            <view class="flex-1 flex justify-between">
              <view class="flex flex-col items-center">
                <view class="text4">符号</view>
                <image
                  class="icon3"
                  src="@/static/images/chip-detail/fuhao.png"
                  mode="scaleToFill"
                  @click="copy"
                />
              </view>
              <view class="flex flex-col items-center">
                <view class="text4">封装图</view>
                <image
                  class="icon3"
                  @click="copy"
                  src="@/static/images/chip-detail/fengzhuang.png"
                  mode="scaleToFill"
                />
              </view>
              <view class="flex flex-col items-center">
                <view class="text4">3D模型</view>
                <image
                  class="icon3"
                  @click="copy"
                  src="@/static/images/chip-detail/moxing.png"
                  mode="scaleToFill"
                />
              </view>
            </view>
          </view>
          <view class="text3" v-if="!detail.package?.length">暂无数据~</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
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
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const item_id = ref([])
const visible = ref(false)
const addVisible = ref(false)

const openFileByUrl = (item: any) => {
  console.log('item', item)
  uni.setClipboardData({
    data: item?.path,
    success: () => {
      uni.showToast({
        title: '链接已复制,请至浏览器打开并下载',
        icon: 'none',
      })
    },
  })
  //downloadFile(item?.path, item?.name)
  // if (item?.url) {
  //   uni.navigateTo({
  //     url: `/pages/chip-detail/components/file-view?url=${encodeURIComponent(item.url)}&name=${encodeURIComponent(item.name)}`,
  //   })
  // } else {
  //   uni.showToast({
  //     title: '文件链接无效',
  //     icon: 'none',
  //   })
  // }
}
const copy = () => {
  console.log('detail', detail.value)
  const url = detail.value?.cad_file[0].path
  uni.setClipboardData({
    data: url || '',
    success: () => {
      uni.showToast({
        title: '链接已复制,请至浏览器打开并下载',
        icon: 'none',
      })
    },
  })
}

// 收藏
const showPopup = async (item?: any) => {
  const res = await addToFolder(
    'http://121.199.10.78:8001/api/v1/collections/items',
    'reference_design',
    item.name,
    null,
    item.name,
    item?.path,
  )

  console.log('这是我的设计文档的path', item?.path, '这是我的name', item.name)

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
  .list-items {
    margin-top: 20rpx;
    background: #ffffff;
    box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.05);
    border-radius: 20rpx 20rpx 20rpx 20rpx;
    border: 2rpx solid #eeeeee;
    box-sizing: border-box;
    .list-items-top {
      height: 74rpx;
      border-radius: 20rpx 20rpx 20rpx 20rpx;
      box-sizing: border-box;
      padding: 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .title {
      height: 40rpx;
      font-weight: 500;
      font-size: 28rpx;
      color: #000105;
      line-height: 40rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
    .show-icon {
      width: 40rpx;
      height: 40rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .list-content {
    box-sizing: border-box;
    padding: 0 20rpx;
    border: 2rpx solid #ffdcb5;
    box-sizing: border-box;
    background: #fff7ed;
    border-radius: 20rpx 20rpx 20rpx 20rpx;
    margin: 0 20rpx;
  }
  .list-content2 {
    background: #f8faff;
    border: 2rpx solid #bfdbfe;
  }

  .list1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 20rpx 0;
    border-bottom: 2rpx dashed #eeeeee;
    &:last-child {
      border-bottom: none;
    }
    .img {
      width: 72rpx;
      height: 72rpx;
      border-radius: 20rpx 20rpx 20rpx 20rpx;
      margin-right: 20rpx;
      .icon {
        width: 72rpx;
        height: 72rpx;
      }
    }
    .list1-center {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .text1 {
        font-weight: 600;
        font-size: 24rpx;
        color: #e65925;
        line-height: 36rpx;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }
  }
}

.list3 {
  display: flex;
  align-items: start;
  box-sizing: border-box;
  padding: 20rpx 0;
  border-bottom: 2rpx dashed #eeeeee;
  .list3-left {
    width: 140rpx;
  }
  &:last-child {
    border-bottom: none;
  }
  .line {
    box-sizing: border-box;
    min-width: 90rpx;
    padding: 0 20rpx;
    border-left: 2rpx dashed #eeeeee;
    border-right: 2rpx dashed #eeeeee;
    margin: 0 22rpx;
  }
}

.icon1 {
  width: 18rpx;
  height: 10rpx;
}
.icon2 {
  width: 40rpx;
  height: 40rpx;
  min-width: 40rpx;
}
.text3 {
  font-weight: 400;
  font-size: 24rpx;
  color: #666666;
  text-align: left;
  font-style: normal;
  padding: 20rpx 0;
}
.text4 {
  height: 34rpx;
  font-weight: 400;
  font-size: 24rpx;
  color: #666666;
  line-height: 34rpx;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin-bottom: 10rpx;
}
.text5 {
  font-weight: 600;
  font-size: 24rpx;
  color: #2a7de1;
  line-height: 34rpx;
  text-align: center;
  margin-top: 8rpx;
  max-width: 140rpx;
  white-space: wrap;
}
.text6 {
  height: 34rpx;
  font-weight: 600;
  font-size: 24rpx;
  color: #333333;
  line-height: 34rpx;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin-top: 8rpx;
}
.icon3 {
  width: 64rpx;
  height: 48rpx;
}
.text4-wrapper {
  overflow: hidden;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
  transform-origin: top;
}

.text4-wrapper.collapsed {
  transform: scaleY(0);
  opacity: 0;
}

.text4-wrapper.expanded {
  transform: scaleY(1);
  opacity: 1;
}
</style>
