<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    transparentTitle: 'always',
    allowsBounceVertical: 'false',
    pullRefresh: 'false',
  },
}
</route>

<template>
  <view class="inner-wrapper">
    <fgNavbar leftText="丝印反查" />
    <view class="search-box">
      <image class="search-icon" src="@/static/images/search.png" mode="scaleToFill" />
      <input
        class="my-input"
        confirm-type="search"
        type="text"
        v-model="keywords"
        @confirm="searchData"
        placeholder="请输入芯片丝印（如5430、ALL）"
        placeholder-style="color: #666666 ; font-size: 28rpx;"
      />
      <image
        v-if="keywords"
        @click="keywords = ''"
        class="icon-clean"
        src="@/static/images/clean.png"
        mode="scaleToFill"
      />
      <view class="btn" @click="searchData">搜索</view>
    </view>
    <view class="text-intr">
      共计找到
      <text style="color: #e65925">{{ total > 100 ? '100+' : total }}</text>
      个匹配结果
    </view>
    <view class="select-wrapper">
      <view class="flex items-center">
        <view
          class="flex justify-between items-center select-item"
          :class="[activeManufacture || activeCountry ? 'active-select-item' : '']"
          @click="showSelect = true"
        >
          <view class="text3">品牌</view>
          <image
            class="icon2"
            v-if="activeManufacture || activeCountry"
            src="@/static/images/chip-detail/icon33.jpg"
            mode="scaleToFill"
          />
          <image
            class="icon2"
            v-else
            src="@/static/images/chip-detail/icon23.png"
            mode="scaleToFill"
          />
        </view>
        <view
          class="flex justify-between items-center select-item"
          :class="[activeCategory_lv3.length ? 'active-select-item' : '']"
          @click="showSelect1 = true"
        >
          <view class="text3">分类</view>
          <image
            class="icon2"
            v-if="activeCategory_lv3.length"
            src="@/static/images/chip-detail/icon33.jpg"
            mode="scaleToFill"
          />
          <image
            class="icon2"
            v-else
            src="@/static/images/chip-detail/icon23.png"
            mode="scaleToFill"
          />
        </view>
        <view
          class="flex justify-between items-center select-item"
          :class="[activePackage_std.length ? 'active-select-item' : '']"
          @click="showSelect2 = true"
        >
          <view class="text3">封装</view>

          <image
            class="icon2"
            v-if="activePackage_std.length"
            src="@/static/images/chip-detail/icon33.jpg"
            mode="scaleToFill"
          />
          <image
            class="icon2"
            v-else
            src="@/static/images/chip-detail/icon23.png"
            mode="scaleToFill"
          />
        </view>
      </view>
      <!-- <view class="select-content" v-if="activeSelect">
        <view class="select-filter">
          <view
            class="select-item-content"
            v-for="item in activeSelectList"
            :key="item"
            :class="activeSelectValue.includes(item) ? 'active-select-item-content' : ''"
            @click="handleSelect(item)"
          >
            {{ item }}
          </view>
        </view>
        <view class="select-mask" @click="activeSelect = 0"></view>
      </view> -->
    </view>
    <scroll-view
      v-if="showList"
      :scroll-y="true"
      class="scroll-content"
      @scrolltolower="handelReachBottom"
    >
      <view
        class="list-card"
        v-for="item in list"
        :key="item.order_device"
        @click="goProductDetail(item)"
      >
        <view class="flex items-start">
          <image
            class="icon3"
            v-if="item?.chip_img"
            :src="item.chip_img"
            mode="scaleToFill"
            @error="item.chip_img = ''"
          />
          <image
            v-else
            class="icon3"
            src="@/static/images/chip-detail/chip-image.png"
            mode="scaleToFill"
          />
          <view>
            <view class="flex items-center">
              <view class="text4 ellipsis">{{ item.order_device || '-' }}</view>
              <view class="text8 ellipsis">{{ item.company_name || '-' }}</view>
              <view class="tag ellipsis" :style="styleList[item.status]" v-if="item.status">
                {{ item.status }}
              </view>
            </view>
            <view class="flex items-start">
              <view class="text6">分类：</view>
              <view class="text7">
                {{ getCategoriesText(item) }}
              </view>
            </view>
            <view class="text7 mt-8rpx ellipsis-2">
              {{ item.part_number_title || '-' }}
            </view>
            <view class="flex items-center mt-20rpx justify-between">
              <view class="flex items-center">
                <view class="text6">封装：</view>
                <view class="text7">{{ item.package_type_std || '-' }}</view>
              </view>
              <view class="flex items-center">
                <view class="text6">引脚：</view>
                <view class="text7">{{ item.pin_count || '-' }}</view>
              </view>
              <view class="flex items-center pr-4rpx">
                <view class="text6">丝印：</view>
                <rich-text
                  class="text7"
                  :nodes="highlightNodes(item.marking, keywords)"
                ></rich-text>
              </view>
            </view>
          </view>
        </view>
        <view class="card-bottom">
          <view class="bottom-left" @click.stop="openFile(item)">
            <image class="icon2" src="@/static/images/chip-detail/pdf2.png" mode="scaleToFill" />
            <view class="text1">规格书</view>
          </view>
          <view class="bottom-line"></view>
          <view class="bottom-right">
            <image class="icon2" src="@/static/images/chip-detail/xilie.png" mode="scaleToFill" />
            <view class="text1">产品系列:</view>
            <view class="text1 text2">{{ item.part_number }}</view>
          </view>
        </view>
      </view>
      <view class="no-data" v-if="!list?.length">
        <image class="no-data-img" src="@/static/images/no-data.png" mode="scaleToFill" />
        <view class="no-data-text">暂无数据</view>
        <view class="no-data-text1">暂时没有找到您想要的内容哦</view>
      </view>
      <wd-loadmore :state="state" loading-text="正在努力加载中..." finished-text="没有更多了" />
    </scroll-view>
    <wd-popup
      v-model="showSelect"
      position="bottom"
      custom-style="height: 75vh;border-radius: 20rpx 20rpx 0rpx 0rpx;"
    >
      <view class="my-popup">
        <view class="pop-title">
          <view class="text">品牌查询</view>
          <image
            @click="showSelect = false"
            class="close-icon"
            src="@/static/images/chip-detail/close.png"
            mode="scaleToFill"
          />
        </view>
        <view class="pop-content">
          <view class="select-list" v-for="item in activitySelectList" :key="item.label">
            <view class="list-title">{{ item.label }}</view>
            <view class="list-content">
              <view
                class="pop-select-item"
                :class="item.value.includes(e) ? 'pop-select-item-active' : ''"
                v-for="e in item.list"
                @click="handleSelectPop(item, e)"
                :key="e"
              >
                {{ e }}
              </view>
            </view>
          </view>
        </view>
        <view class="pop-bottom">
          <view class="reset-btn" @click="resetPop">
            <image
              class="reset-icon"
              src="@/static/images/chip-detail/reset.png"
              mode="scaleToFill"
            />
            <text>重置</text>
          </view>
          <view class="confirm-btn" @click="confirmBtn">确定</view>
        </view>
      </view>
    </wd-popup>
    <wd-popup
      v-model="showSelect1"
      position="bottom"
      custom-style="height: 75vh;border-radius: 20rpx 20rpx 0rpx 0rpx;"
    >
      <view class="my-popup">
        <view class="pop-title">
          <view class="text">分类查询</view>
          <image
            @click="showSelect1 = false"
            class="close-icon"
            src="@/static/images/chip-detail/close.png"
            mode="scaleToFill"
          />
        </view>
        <view class="pop-content">
          <view class="select-list">
            <view class="list-content">
              <view
                class="pop-select-item"
                :class="activeCategory_lv3.includes(item) ? 'pop-select-item-active' : ''"
                v-for="item in category_lv3List"
                @click="handleSelectPop1(item)"
                :key="item"
              >
                {{ item }}
              </view>
            </view>
          </view>
        </view>
        <view class="pop-bottom">
          <view class="reset-btn" @click="resetPop1">
            <image
              class="reset-icon"
              src="@/static/images/chip-detail/reset.png"
              mode="scaleToFill"
            />
            <text>重置</text>
          </view>
          <view class="confirm-btn" @click="confirmBtn1">确定</view>
        </view>
      </view>
    </wd-popup>
    <wd-popup
      v-model="showSelect2"
      position="bottom"
      custom-style="height: 75vh;border-radius: 20rpx 20rpx 0rpx 0rpx;"
    >
      <view class="my-popup">
        <view class="pop-title">
          <view class="text">封装查询</view>
          <image
            @click="showSelect2 = false"
            class="close-icon"
            src="@/static/images/chip-detail/close.png"
            mode="scaleToFill"
          />
        </view>
        <view class="pop-content">
          <view class="select-list">
            <view class="list-content">
              <view
                class="pop-select-item"
                :class="activePackage_std.includes(item) ? 'pop-select-item-active' : ''"
                v-for="item in package_stdList"
                @click="handleSelectPop2(item)"
                :key="item"
              >
                {{ item }}
              </view>
            </view>
          </view>
        </view>
        <view class="pop-bottom">
          <view class="reset-btn" @click="resetPop2">
            <image
              class="reset-icon"
              src="@/static/images/chip-detail/reset.png"
              mode="scaleToFill"
            />
            <text>重置</text>
          </view>
          <view class="confirm-btn" @click="confirmBtn2">确定</view>
        </view>
      </view>
    </wd-popup>
  </view>
</template>

<script lang="ts" setup>
import fgNavbar from '@/components/fg-navbar/fg-navbar.vue'
import { getDeviceSearchData } from '@/service/index'
import { downloadFile } from '@/utils/download'
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
const showSelect = ref(false)
const showSelect1 = ref(false)
const showSelect2 = ref(false)
const activitySelectList = ref([
  { label: '品牌名称(可多选)', list: ['不限', 'TI', 'ADI'], value: ['不限'], multiple: true },
  {
    label: '品牌地域(可多选)',
    list: ['不限', '中国', '美国', '日本', '韩国'],
    value: ['不限'],
    multiple: true,
  },
])
const resetPop = () => {
  activitySelectList.value.forEach((item) => {
    item.value = ['不限']
  })
}
const resetPop1 = () => {
  activeCategory_lv3.value = []
}
const resetPop2 = () => {
  activePackage_std.value = []
}
const confirmBtn = () => {
  if (activitySelectList.value[0].value.includes('不限')) {
    activeManufacture.value = ''
  } else {
    activeManufacture.value = activitySelectList.value[0].value.join(',')
  }
  if (activitySelectList.value[1].value.includes('不限')) {
    activeCountry.value = ''
  } else {
    activeCountry.value = activitySelectList.value[1].value.join(',')
  }
  showSelect.value = false
  showList.value = false
  page.value = 0
  getData()
}
const confirmBtn1 = () => {
  showSelect1.value = false
  page.value = 0
  showList.value = false
  getData()
}
const confirmBtn2 = () => {
  showSelect2.value = false
  page.value = 0
  showList.value = false
  getData()
}
const handleSelectPop = (item, value) => {
  if (value === '不限') {
    item.value = ['不限']
    return
  }
  if (item.multiple) {
    if (item.value.includes(value)) {
      item.value = item.value.filter((e) => e !== value)
    } else {
      item.value = item.value.filter((e) => e !== '不限') //如果之前有不限，则去掉
      item.value.push(value)
    }
  } else {
    item.value = [value]
  }
}
const handleSelectPop2 = (item) => {
  console.log('item', item)
  if (activePackage_std.value.includes(item)) {
    activePackage_std.value = activePackage_std.value.filter((e) => e !== item)
  } else {
    activePackage_std.value.push(item)
  }
}
const handleSelectPop1 = (item) => {
  console.log('item', item, activeCategory_lv3.value)
  if (activeCategory_lv3.value.includes(item)) {
    activeCategory_lv3.value = activeCategory_lv3.value.filter((e) => e !== item)
  } else {
    activeCategory_lv3.value.push(item)
  }
}
const getCategoriesText = (item) => {
  const res =
    (item.category_lv1 ? item.category_lv1 + '/' : '') +
    (item.category_lv2 ? item.category_lv2 + '/' : '') +
    (item.category_lv3 || '')
  return res ? res : '-'
}
const list = ref()
const keywords = ref('')
const activeManufacture = ref()
const activeCategory_lv3 = ref([])
const activePackage_std = ref([])
const activeCountry = ref() //国家
const package_stdList = ref()
const category_lv3List = ref()
const isSearch = ref(true)
//const manufactureList = ref()
const total = ref(0)
const page = ref(0)
const limit = ref(20)
const showList = ref(false)
const state = ref<'loading' | 'error' | 'finished'>('loading')
const handelReachBottom = () => {
  console.log('handelReachBottom')
  loadmore()
}
const loadmore = () => {
  if (state.value === 'finished') return
  page.value++
  getData()
}
const searchData = () => {
  isSearch.value = true
  showList.value = false
  page.value = 0
  getData()
}
const getData = async () => {
  if (!keywords.value || !keywords.value.trim()) {
    uni.showToast({
      title: '请输入搜索内容',
      icon: 'none',
      duration: 2000,
    })
    return
  }
  try {
    const params = {
      marking: keywords.value, //丝印
      skip: page.value * limit.value,
      limit: limit.value,
      manufacture: activeManufacture.value, //品牌
      category_lv3: activeCategory_lv3.value?.length ? activeCategory_lv3.value.join(',') : '', //分类
      package_std: activePackage_std.value?.length ? activePackage_std.value?.join(',') : '', //封装类型
      country: activeCountry.value,
    }
    const res = await getDeviceSearchData(params)
    const items = res.data.hits || []
    if (page.value === 0) {
      list.value = items.map((item) => ({ ...item })) // 创建新对象避免引用问题
    } else {
      list.value.push(...items.map((item) => ({ ...item })))
    }

    if (items.length < limit.value) {
      state.value = 'finished'
    } else {
      state.value = 'loading'
    }
    total.value = res.data.total
    if (isSearch.value) {
      if (res.data.manufacture_agg.length) {
        // manufactureList.value = res.data.manufacture_agg
        activitySelectList.value[0].list = ['不限', ...res.data.manufacture_agg]
      }
      if (res.data.country_agg) {
        activitySelectList.value[1].list = ['不限', ...res.data.country_agg]
      }
      if (res.data.category_agg.length) {
        category_lv3List.value = res.data.category_agg
      }
      if (res.data.package_std_agg.length) {
        package_stdList.value = res.data.package_std_agg
      }
    }
  } catch (error) {
    console.log('error', error)
  } finally {
    isSearch.value = false
    showList.value = true
  }
}
const goProductDetail = debounce((item) => {
  console.log('goProductDetail', item)
  uni.navigateTo({ url: '/pages/chip-detail/index?id=' + item.pid })
}, 300)
const openFile = debounce((item: any) => {
  console.log('openFile', item)
  downloadFile(item?.datasheet_file, '规格书', true)
}, 300)
const highlightNodes = (text, keyword, color = '#e65925') => {
  if (!keyword || !text || text === '-') {
    return [{ type: 'text', text: text }]
  }
  const nodes = []
  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escapedKeyword})`, 'gi')
  let lastIndex = 0
  let match
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push({
        type: 'text',
        text: text.substring(lastIndex, match.index),
      })
    }
    nodes.push({
      name: 'span',
      attrs: {
        style: `color: ${color};`,
      },
      children: [
        {
          type: 'text',
          text: match[1],
        },
      ],
    })

    lastIndex = regex.lastIndex
  }

  // 剩余文本
  if (lastIndex < text.length) {
    nodes.push({
      type: 'text',
      text: text.substring(lastIndex),
    })
  }

  return nodes
}
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate: boolean = false,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this

    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }

    const callNow = immediate && !timeout

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)

    if (callNow) func.apply(context, args)
  }
}
onLoad(async (options) => {
  keywords.value = options.keywords
  getData()
})
</script>

<style lang="scss" scoped>
//
.inner-wrapper {
  background: #f9f9f9;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.scroll-content {
  flex: 1;
  padding-bottom: 60rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.text-intr {
  height: 34rpx;
  font-weight: 400;
  font-size: 24rpx;
  color: #666666;
  line-height: 34rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin: 20rpx 20rpx;
  margin-bottom: 30rpx;
  padding-left: 30rpx;
}
.card-two {
  flex: 1;
}
.select-wrapper {
  position: relative;
  box-sizing: border-box;
  padding-bottom: 20rpx;
  box-sizing: border-box;
}
.select-item {
  width: 222rpx;
  height: 68rpx;
  background: #ffffff;
  box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.1);
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  box-sizing: border-box;
  padding: 0 20rpx;
  margin-left: 20rpx;
  &:last-child {
    margin-right: 0;
  }
  .text3 {
    height: 34rpx;
    font-weight: 400;
    font-size: 24rpx;
    color: #333333;
    line-height: 34rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}
.active-select-item {
  width: 222rpx;
  height: 68rpx;
  background: #fce6de;
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  border: 2rpx solid #e65925;
  .text3 {
    color: #e65925;
  }
}
.select-content {
  z-index: 10;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 82rpx;
  left: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.5);
  .select-filter {
    background: #f9f9f9;
    // height: 500rpx;
    max-height: 500rpx;
    box-sizing: border-box;
    border-radius: 0rpx 0rpx 20rpx 20rpx;
    padding-top: 10rpx;
  }
  .select-mask {
    flex: 1;
  }
  .select-item-content {
    height: 100rpx;
    font-weight: 400;
    font-size: 28rpx;
    color: #333333;
    line-height: 100rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;
    box-sizing: border-box;
    border-bottom: 2rpx solid #eeeeee;
    margin: 0 20rpx;
    &:last-child {
      border-bottom: none;
      border-radius: 0rpx 0rpx 20rpx 20rpx;
    }
  }
  .active-select-item-content {
    color: #e65925;
  }
}
.list-card {
  background: #ffffff;
  border-radius: 10rpx 10rpx 10rpx 10rpx;
  border: 2rpx solid #eeeeee;
  box-sizing: border-box;
  margin: 0 20rpx;
  margin-bottom: 20rpx;
  padding: 20rpx;
  padding-bottom: 0;
}
.card-bottom {
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  border-top: 2rpx dashed #eeeeee;
  margin-top: 20rpx;
  .bottom-left {
    padding-top: 28rpx;
    display: flex;
    align-items: center;
    height: 100%;
    width: 45%;
    justify-content: flex-start;
    padding-bottom: 20rpx;
    padding-left: 132rpx;
    box-sizing: border-box;
  }
  .bottom-line {
    width: 2rpx;
    height: 40rpx;
    border: 1rpx dashed #eeeeee;
    box-sizing: border-box;
  }
  .bottom-right {
    width: 45%;
    padding-top: 28rpx;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 20rpx;
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
  min-width: 112rpx;
  height: 112rpx;
  //background: #f95;
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  margin-right: 30rpx;
  margin-top: 30rpx;
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
  max-width: 300rpx;
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
  min-width: 110rpx;
}
.tag {
  min-width: 90rpx;
  height: 28rpx;
  border-radius: 18rpx 18rpx 18rpx 18rpx;
  margin-left: 10rpx;
  font-family: PingFang SC;
  line-height: unset;
  font-weight: 500;
  font-size: 16rpx;
  color: #ffffff !important;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0rpx 12rpx;
  box-sizing: border-box;
}
.search-box {
  height: 84rpx;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.1);
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  border: 4rpx solid #ff7c4d;
  margin: 0 20rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6rpx 8rpx;
  .my-input {
    flex: 1;
    margin-left: 20rpx;
    margin-right: 8rpx;
    color: #333333;
    font-weight: 400;
    font-size: 28rpx;
    background: #ffffff;
  }

  .btn {
    width: 140rpx;
    height: 68rpx;
    box-sizing: border-box;
    background: #e65925;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    font-weight: 400;
    font-size: 28rpx;
    color: #ffffff;
    line-height: 68rpx;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}
.search-icon {
  width: 32rpx;
  height: 32rpx;
  margin-left: 22rpx;
}
.no-data {
  box-sizing: border-box;
  justify-content: flex-start;
  padding-top: 156rpx;
}
.icon-clean {
  width: 32rpx;
  height: 32rpx;
  margin-right: 15rpx;
}
.my-popup {
  display: flex;
  flex-direction: column;
  height: 100%;
  .pop-title {
    height: 104rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 30rpx 0;
    margin: 0 30rpx;
    box-sizing: border-box;
    border-bottom: 2rpx dashed #eeeeee;
    .text {
      height: 44rpx;
      font-weight: 500;
      font-size: 32rpx;
      color: #333333;
      line-height: 44rpx;
      text-align: center;
      font-style: normal;
      text-transform: none;
    }
    .close-icon {
      position: absolute;
      right: 16rpx;
      width: 32rpx;
      height: 32rpx;
      top: 36rpx;
    }
  }
  .pop-content {
    margin-left: 30rpx;
    margin-top: 30rpx;
    //margin-right: 4rpx;
    flex: 1;
    .select-list {
      box-sizing: border-box;
      .list-title {
        height: 40rpx;
        font-weight: 600;
        font-size: 28rpx;
        color: #333333;
        line-height: 40rpx;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
      .list-content {
        margin-top: 30rpx;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 40rpx;
        gap: 20rpx;
        .pop-select-item {
          border-radius: 32rpx 32rpx 32rpx 32rpx;
          background: #eeeeee;
          box-sizing: border-box;
          border: 2rpx solid transparent;
          font-weight: 400;
          font-size: 24rpx;
          color: #333333;
          text-align: center;
          font-style: normal;
          text-transform: none;
          padding: 14rpx 54rpx;
        }
        .pop-select-item-active {
          background: #fce6de;
          border: 2rpx solid #e65925;
          color: #e65925;
        }
      }
    }
  }
  .pop-bottom {
    height: 150rpx;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0rpx -10rpx 30rpx 2rpx rgba(0, 0, 0, 0.05);
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    display: flex;
    padding: 20rpx;
    .reset-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 192rpx;
      height: 80rpx;
      background: #eeeeee;
      border-radius: 40rpx 40rpx 40rpx 40rpx;
      .reset-icon {
        width: 34rpx;
        height: 34rpx;
        margin-right: 10rpx;
      }
      text {
        height: 40rpx;
        font-weight: 400;
        font-size: 28rpx;
        color: #333333;
        line-height: 40rpx;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
    }
    .confirm-btn {
      flex: 1;
      height: 80rpx;
      background: linear-gradient(90deg, #ff7c4d 0%, #e65925 100%);
      border-radius: 40rpx 40rpx 40rpx 40rpx;
      font-weight: 400;
      font-size: 28rpx;
      color: #ffffff;
      line-height: 80rpx;
      text-align: center;
      font-style: normal;
      text-transform: none;
      margin-left: 22rpx;
    }
  }
}
</style>
