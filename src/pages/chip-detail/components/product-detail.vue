<route lang="json5">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '',
  },
}
</route>

<template>
  <view class="tab1">
    <view class="swiper-wrap">
      <swiper
        class="swiper"
        circular
        :indicator-dots="false"
        :autoplay="false"
        :current="currentIndex"
        @change="swiperChange"
        :interval="2000"
        :duration="500"
        :indicator="false"
      >
        <swiper-item class="swiper-item" v-for="(item, index) in swiperList" :key="item">
          <image :src="item" mode="aspectFit" @click="zoomIn(swiperList, index)" />
        </swiper-item>
      </swiper>
      <view class="left-nav nav" @click="decrementIndex">
        <image class="nav-icon" src="@/static/images/chip-detail/icon9.png" mode="scaleToFill" />
      </view>
      <view class="right-nav nav" @click="incrementIndex">
        <image class="nav-icon" src="@/static/images/chip-detail/icon10.png" mode="scaleToFill" />
      </view>
      <view class="dots-list">
        <view
          class="dots"
          :class="currentIndex === item ? 'active-dots' : ''"
          v-for="item in dotList"
          :key="item"
          @click="changeDot(item)"
        ></view>
      </view>
    </view>
    <view class="info2">
      <view class="flex items-center" @click="show1 = !show1">
        <view class="text3">特性</view>
        <image
          class="icon3"
          :class="show1 ? 'rotate-180' : ''"
          src="@/static/images/chip-detail/icon11.png"
          mode="scaleToFill"
        />
      </view>
      <view class="text4-wrapper" :class="show1 ? 'expanded' : 'collapsed'">
        <view class="text4" v-if="show1">
          <text>{{ detail?.feature || '-' }}</text>
        </view>
      </view>
    </view>
    <view class="info2">
      <view class="flex items-center" @click="show2 = !show2">
        <view class="text3">说明</view>
        <image
          class="icon3"
          :class="show2 ? 'rotate-180' : ''"
          src="@/static/images/chip-detail/icon11.png"
          mode="scaleToFill"
        />
      </view>
      <view class="text4-wrapper" :class="show2 ? 'expanded' : 'collapsed'">
        <view class="text4" v-if="show2">
          <text>{{ detail?.description || '-' }}</text>
        </view>
      </view>
    </view>
    <view class="info2">
      <view class="flex items-center" @click="show3 = !show3">
        <view class="text3">应用</view>
        <image
          :class="show3 ? 'rotate-180' : ''"
          class="icon3"
          src="@/static/images/chip-detail/icon11.png"
          mode="scaleToFill"
        />
      </view>
      <view class="text4-wrapper" :class="show3 ? 'expanded' : 'collapsed'">
        <view class="text4" v-if="show3">
          <text v-for="item in detail?.applications" :key="item" class="mr-10rpx">{{ item }}</text>
          <text v-if="!detail?.applications?.length">暂无相关应用～</text>
        </view>
      </view>
    </view>
    <view class="info2 no-border">
      <view class="flex items-center" @click="show4 = !show4">
        <view class="text3">参数</view>
        <image
          class="icon3"
          :class="show4 ? 'rotate-180' : ''"
          src="@/static/images/chip-detail/icon11.png"
          mode="scaleToFill"
        />
      </view>
      <view class="text4-wrapper" :class="show4 ? 'expanded' : 'collapsed'">
        <view class="text4 flex flex-wrap justify-between" v-if="show4">
          <view
            class="flex items-center w-1/2 mb-10rpx"
            v-for="(item, index) in detail?.attributes"
            :key="index"
          >
            <view class="text-#333333 font-600">{{ item.name }}：</view>
            <view class="text-#666666">
              {{ item.val ? item.val + (item.unit ? item.unit : '') : '' }}
            </view>
          </view>

          <view v-if="!detail?.attributes || !Object.keys(detail?.attributes).length">-</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})
const detail = toRef(props, 'data')

const swiperList = computed(() => {
  const list: string[] = []

  if (detail.value?.pin_config) {
    list.push(detail.value.pin_config)
  }

  if (detail.value?.function_block_diagram) {
    list.push(detail.value.function_block_diagram)
  }

  if (Array.isArray(detail.value?.typical_application_circuit)) {
    detail.value.typical_application_circuit.forEach((e) => {
      if (e?.path) {
        list.push(e.path)
      }
    })
  }

  return list
})

const dotList = computed(() => {
  return swiperList.value.map((item, index) => index)
})
const currentIndex = ref(0)
const swiperChange = (e) => {
  currentIndex.value = e.detail.current
}
const changeDot = (e: any) => {}
const incrementIndex = () => {
  currentIndex.value = (currentIndex.value + 1) % swiperList.value.length
}
const decrementIndex = () => {
  currentIndex.value = currentIndex.value === 0 ? swiperList.value.length : currentIndex.value - 1
}
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)

// 提取fid
const getFid = (url: string): string | null => {
  const parts = url.split('fid=')
  return parts.length > 1 ? parts[1] : null
}

// 添加图片放大功能
const zoomIn = async (swiperList, index) => {
  const origin = swiperList[index]
  const fid = getFid(origin)
  console.log(fid)
  try {
    const res = await uni.request({
      url: `https://junctionmagic.com/api/v1/files/get_oss_url?fid=${fid}`,
      method: 'GET',
    })
    const data = res.data as any
    const ossUrl = data.url

    console.log('真实 OSS 链接:', ossUrl)

    uni.previewImage({
      current: ossUrl,
      urls: [ossUrl],
    })
  } catch (err) {
    console.error('获取图片重定向失败:', err)
    uni.showToast({
      title: '加载失败',
      icon: 'none',
      duration: 3000,
    })
  }
}
</script>

<style lang="scss" scoped>
.tab1 {
  margin-top: 20rpx;
  .swiper-wrap {
    background: white;
    height: 500rpx;
    border-radius: 20rpx 20rpx 20rpx 20rpx;
    position: relative;
  }
  .swiper {
    height: 500rpx;
    .swiper-item {
      border-radius: 20rpx 20rpx 20rpx 20rpx;
    }
  }
  .nav {
    width: 60rpx;
    height: 60rpx;
    background: rgba(255, 255, 255, 0.75);
    border-radius: 50%;
    box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.05);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .nav-icon {
    width: 16rpx;
    height: 28rpx;
  }
  .left-nav {
    left: 20rpx;
  }
  .right-nav {
    right: 20rpx;
  }
  .dots-list {
    display: flex;
    align-items: center;
    gap: 6rpx;
    position: absolute;
    bottom: 20rpx;
    left: 50%;
    transform: translateX(-50%);
    .dots {
      width: 6rpx;
      height: 6rpx;
      border-radius: 50%;
      background: rgba(255, 124, 77, 0.5);
    }
    .active-dots {
      width: 40rpx;
      height: 6rpx;
      background: #ff7c4d;
      border-radius: 4rpx;
    }
  }
  .info2 {
    box-sizing: border-box;
    border-bottom: 2rpx dashed #eeeeee;
    padding: 30rpx 0;
  }
  .no-border {
    border-bottom: none;
    padding-bottom: 0;
  }
  .icon3 {
    width: 32rpx;
    height: 32rpx;
  }
  .text3 {
    height: 40rpx;
    font-weight: 500;
    font-size: 28rpx;
    color: #000105;
    line-height: 40rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
    flex: 1;
    margin: 0 10rpx;
  }
  .text4 {
    font-weight: 400;
    font-size: 20rpx;
    color: #333333;
    line-height: 36rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin-top: 20rpx;
    border-left: 6rpx solid #eeeeee;
    padding-left: 20rpx;
    box-sizing: border-box;
    margin-left: 10rpx;
  }
  .text4-wrapper {
    overflow: hidden;
    transition:
      transform 0.5s ease,
      opacity 0.5s ease;
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
}
</style>
