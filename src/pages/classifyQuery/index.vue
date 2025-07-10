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
  <view class="classify-query-page">
    <fgNavbar leftText="分类查询" />
    <!-- 搜索框 -->
    <view class="search-box">
      <image
        class="search-icon"
        @click="goSearch"
        src="/static/images/search.png"
        mode="scaleToFill"
      />
      <input
        class="my-input"
        type="text"
        placeholder="请输入分类名称"
        v-model="keywords"
        placeholder-style="color: #666666 ; font-size: 14px;"
      />
      <image
        v-if="keywords"
        @click="
          () => {
            keywords = ''
            categoryList = categoryListOld
            lv1Active = 0
            lv2Active = 0
          }
        "
        class="icon-clean"
        src="@/static/images/clean.png"
        mode="scaleToFill"
      />
      <view class="btn" @click="goSearch">搜索</view>
    </view>
    <view>
      <view v-if="categoryList.length > 0" class="main-content">
        <!-- 左侧一级分类 -->
        <scroll-view scroll-y class="category-lv1-tabs">
          <view
            v-for="(item, index) in categoryList"
            :key="index"
            :class="['lv1-tab', lv1Active === index ? 'active' : '']"
            @click="onLv1TabClick(index)"
          >
            {{ item.title }}
          </view>
        </scroll-view>
        <!-- 中间二级分类 -->
        <scroll-view scroll-y class="category-lv2-tabs">
          <view
            v-for="(item1, index1) in categoryList[lv1Active]?.children"
            :key="item1"
            :class="['lv2-tab', lv2Active === index1 ? 'active' : '']"
            @click="onLv2TabClick(index1)"
          >
            {{ item1.title }}
          </view>
        </scroll-view>
        <!-- 右侧三级分类 -->
        <scroll-view scroll-y class="category-lv3-list">
          <view
            v-for="(item2, index2) in categoryList[lv1Active]?.children[lv2Active]?.children"
            :key="index2"
            class="lv3-item"
            @click="goDetail(item2)"
          >
            {{ item2.title }}
            <!-- <wd-icon name="arrow-right" size="28rpx" color="#666666" class="arrow-icon" /> -->
          </view>
        </scroll-view>
      </view>

      <view class="no-data" v-else>
        <image class="no-data-img" src="/static/images/no-data.png" mode="scaleToFill" />
        <view class="no-data-text">暂无数据</view>
        <view class="no-data-text1">暂时没有找到您想要的内容哦</view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import classData from '@/static/class.json'
import { ref } from 'vue'
const goSearch = () => {
  if (keywords.value == '') {
    uni.showToast({
      title: '请先输入搜索内容”',
      icon: 'none',
    })
  } else {
    if (!categoryListOld.value) {
      categoryListOld.value = JSON.parse(JSON.stringify(categoryList.value))
    }
    categoryList.value = filterByTitle(classData, keywords.value)
    lv1Active.value = 0
    lv2Active.value = 0
    // 自动选中第一个一级、二级、三级分类
    // 若有数据，自动选中第一个二级和三级
    if (categoryList.value.length > 0) {
      const lv1 = categoryList.value[0]
      if (lv1.children && lv1.children.length > 0) {
        lv2Active.value = 0
      } else {
        lv2Active.value = -1
      }
    } else {
      lv1Active.value = -1
      lv2Active.value = -1
    }
  }
}

function filterByTitle(list: any[], keyword: string): any[] {
  return list
    .map((item) => {
      let match = item.title.includes(keyword)
      let children = item.children ? filterByTitle(item.children, keyword) : []
      if (children.length > 0 || match) {
        return { ...item, children }
      }
      return null
    })
    .filter(Boolean)
}
const keywords = ref('')
// 分类列表
const categoryList = ref<any[]>(classData)
const categoryListOld = ref<any[]>(classData)
const lv1Active = ref(0)
const lv2Active = ref(0)
const onLv1TabClick = (index: number) => {
  lv1Active.value = index
  lv2Active.value = 0
  // TODO: 根据一级分类切换二级、三级分类数据
}
const onLv2TabClick = (index: number) => {
  lv2Active.value = index
  // TODO: 根据二级分类切换三级分类数据
}
const goDetail = (item: any) => {
  uni.navigateTo({
    // url: `/pages/classifyQuery/result?name=${item.title}`,
    url: `/pages/product/index?name=${item.title}`,
  })
}
</script>
<style lang="scss" scoped>
.classify-query-page {
  background: #f9f9f9;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .search-box {
    height: 80rpx;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.1);
    border-radius: 20rpx 20rpx 20rpx 20rpx;
    border: 4rpx solid #ff7c4d;
    // border: 2rpx solid #ff7c4d;
    margin: 0 20rpx;
    // margin-top: 12rpx;
    margin-bottom: 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6rpx 8rpx;
    padding-right: 2rpx;
    .my-input {
      flex: 1;
      margin-left: 20rpx;
      margin-right: 88rpx;
      color: #333333;
      font-weight: 400;
      font-size: 28rpx;
      background: #ffffff;
    }

    .btn {
      width: 140rpx;
      height: 68rpx;
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
    .search-icon {
      width: 32rpx;
      height: 32rpx;
      margin-left: 22rpx;
    }
  }
}
.category-lv1-tabs {
  width: 180rpx;
  background: #ffe8d5;
  flex-shrink: 0;
  .lv1-tab {
    padding: 24rpx;
    text-align: center;
    font-size: 26rpx;
    color: #000105;
    cursor: pointer;
    position: relative;
    &.active {
      background: #fef4eb;
      color: #e65925;
      font-weight: bold;
    }
  }
  // .active::before {
  //   position: absolute;
  //   content: '';
  //   width: 8rpx;
  //   height: 36rpx;
  //   border-radius: 0rpx 10rpx 10rpx 0rpx;
  //   left: 0;
  //   top: 50%;
  //   transform: translateY(-50%);
  //   background: #e65925;
  // }
}
.main-content {
  flex: 1;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 100%;
  /* 隐藏滚动条 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  background: #fff;
  border-radius: 20rpx 20rpx 0rpx 0rpx;
  margin: 0 20rpx;
  &::-webkit-scrollbar {
    display: none;
  }
}
.category-lv2-tabs {
  width: 240rpx;
  background: #fef4eb;

  flex: unset;

  .lv2-tab {
    padding: 24rpx;
    position: relative;

    font-weight: 400;
    font-size: 24rpx;
    color: #000105;
    line-height: 34rpx;
    text-align: center;
    &.active {
      background: #ffffff;
      color: #e65925;
    }
    // &.active::before {
    //   position: absolute;
    //   content: '';
    //   width: 8rpx;
    //   height: 36rpx;
    //   border-radius: 0rpx 10rpx 10rpx 0rpx;
    //   left: 0;
    //   top: 50%;
    //   transform: translateY(-50%);
    //   background: #e65925;
    // }
  }
}
.category-lv3-list {
  flex: 1;
  width: calc(100% - 240rpx);
  // background: #fff;
  // padding: 20rpx;
  /* 隐藏滚动条 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none;
  }
  .lv3-item {
    height: 74rpx;
    background: #ffffff;
    border-radius: 10rpx;
    // border: 2rpx solid #eeeeee;
    margin-bottom: 20rpx;

    font-weight: 400;
    font-size: 24rpx;
    color: #000105;
    line-height: 34rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 20rpx;
    box-sizing: border-box;
  }
}
:deep(.wd-tabs__container) {
  flex: 1;
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 20rpx 20rpx 0rpx 0rpx;
  overflow: hidden;
  // padding: 0rpx 20rpx 0 0;
}
.icon-clean {
  width: 32rpx;
  height: 32rpx;
  margin-right: 15rpx;
}
</style>
