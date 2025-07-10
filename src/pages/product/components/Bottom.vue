<template>
  <view class="container">
    <view class="description" v-if="productList.length > 0">
      <view class="description-1">产品列表</view>
      <view
        class="description-2"
        style="font-weight: 400; font-size: 24rpx; color: #666666; line-height: 34rpx"
      >
        共计{{ productTotal }}个
      </view>
    </view>
    <view class="no-data" v-else>
      <image class="no-data-img" src="/static/images/no-data.png" mode="scaleToFill" />
      <view class="no-data-text">暂无数据</view>
      <view class="no-data-text1">暂时没有找到您想要的内容哦</view>
    </view>
    <scroll-view scroll-y class="product" @scrolltolower="loadMore">
      <view
        v-if="productList.length > 0"
        class="element"
        v-for="product in productList"
        :key="product.part_number"
        @click="goProductDetail(product)"
      >
        <view class="element-row1">
          <view class="name">{{ product.part_number }}</view>
          <view class="manufacturer-name">{{ product.company_name }}</view>
          <!-- <view class="production">
            {{ product.attributes?.power_mos_integrated.name || '未知' }}
          </view> -->
          <view
            class="production"
            :style="'background:' + styleList[product.manufacturing_status]?.background"
          >
            {{ product.manufacturing_status }}
          </view>
          <view class="icon">
            <wd-icon name="arrow-right" size="16" color="#666666"></wd-icon>
          </view>
        </view>
        <view class="element-row2">
          {{ product.part_number_title }}
        </view>
      </view>
    </scroll-view>

    <!-- <uni-load-more :status="state"></uni-load-more> -->
  </view>
</template>

<script lang="ts" setup>
import { fetchProducts } from '@/api/search'
import { Product } from '@/utils/api'
import { defineProps, onMounted, ref } from 'vue'
const props = defineProps({
  classfiy: {
    type: String,
    default: '',
  },
})
const productList = ref<Product[]>([])

const loading = ref(true)

const goProductDetail = (item: Product) => {
  uni.navigateTo({ url: '/pages/chip-detail/index?id=' + item.pid })
}
const isFirst = ref(0)
const productsSkip = ref(0)
const pageLimit = ref(20)
const productTotal = ref(0)
const isNoMore = ref(true)
const bodyParms = ref({})
const state = ref('loading')
onMounted(async () => {
  // goSearch()
})
const initData = () => {
  isFirst.value = 0
  productsSkip.value = 0
}
const goSearch = async (other: any) => {
  let body = {
    ...other,
  }
  bodyParms.value = body
  initData()

  getData()
}
const loadMore = () => {
  if (
    (productsSkip.value + 1) * pageLimit.value > productTotal.value ||
    (productsSkip.value + 1) * pageLimit.value == productTotal.value
  ) {
    isNoMore.value = true
  } else {
    productsSkip.value++
    getData()
  }
}
const getData = async () => {
  wx.showLoading({ title: '加载中', mask: true })
  let params = {
    category_lv3: props.classfiy,
    skip: productsSkip.value * pageLimit.value,
    limit: pageLimit.value,
  }

  try {
    console.log('right here is body', bodyParms.value)
    const res = await fetchProducts(params, bodyParms.value)

    const hits = res?.data?.hits ?? []

    if (productsSkip.value === 0) {
      productList.value = hits
    } else {
      productList.value = [...productList.value, ...hits]
    }
    productTotal.value = res?.data?.total
  } catch (error) {
  } finally {
    loading.value = false
    wx.hideLoading()
  }
}
const styleList = ref({
  新产品: {
    background: '#E65925;',
    color: '#E65925;',
  },
  正在供货: {
    background: '#21C55E;',
    color: '#21C55E;',
  },
  预发布: {
    background: '#2A7DE2;',
    color: '#2A7DE2;',
  },
  不推荐用于新设计: {
    background: '#C48714;',
    color: '#C48714;',
  },
  停产: {
    background: '#8B8B8B;',
    color: '#8B8B8B;',
  },
})
defineExpose({
  goSearch,
})
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.description {
  padding: 20rpx 32rpx;
  padding-bottom: 10rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: 400;
  font-size: 24rpx;
  color: #666666;
  line-height: 34rpx;
  // border-bottom: 2rpx solid #f0f0f0;
  .description-1 {
    font-weight: 500;
    line-height: 40rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: #333;
  }
}

.product {
  flex: 1;
  overflow-y: scroll;
  padding: 0rpx 24rpx 0 24rpx;
  box-sizing: border-box;
}

.element {
  background: #fff;
  // border-radius: 20rpx;
  // box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  padding: 20rpx 0rpx;
  // margin-bottom: 24rpx;
  border-bottom: 2rpx dashed #eeeeee;
}

.element-row1 {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16rpx;
  margin-bottom: 12rpx;
}

.name {
  /* font-weight: 500; */
  font-size: 30rpx;
  font-weight: unset;
  line-height: 40rpx;
  color: #000000;
}

.manufacturer-name {
  font-weight: 500;
  font-size: 20rpx;
  color: #333333;
  line-height: 28rpx;
}

.production {
  height: 28rpx;
  // background: #2a7de2;
  border-radius: 18rpx 18rpx 18rpx 18rpx;
  margin-left: 10rpx;

  line-height: unset;
  font-weight: 500;
  font-size: 16rpx;
  color: #ffffff;
  // line-height: 42rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0rpx 12rpx;
  box-sizing: border-box;
}

.icon {
  margin-left: auto;
  width: 32rpx;
  height: 32rpx;
}

.icon image {
  width: 100%;
  height: 100%;
  display: block;
}

.element-row2 {
  font-weight: 400;
  font-size: 20rpx;
  color: #666666;
  line-height: 30rpx;
}

.empty {
  text-align: center;
  color: #999;
  padding: 40rpx;
  font-size: 28rpx;
}
</style>
