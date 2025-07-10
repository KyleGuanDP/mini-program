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
  <view class="result-page">
    <fgNavbar leftText="" />

    <view class="main-content">
      <!-- 顶部分类信息 -->
      <view class="category-info">
        <view class="category-info-top">
          <view class="category-title">
            <image
              class="category-icon"
              src="/static/images/classify/fenleilogo.png"
              mode="scaleToFill"
            />

            <view class="category-desc">
              buck(降压)开关稳压器
              <view>选择筛选条件并精准查找您需要的产品</view>
            </view>
          </view>
          <view class="reset">
            <image src="/static/images/classify/reset.png" />
            重置
          </view>
        </view>

        <!-- 筛选栏 -->
        <!-- <view class="filter-bar">
          <view class="filter-item" v-for="item in filterList" :key="item.label">
            <view class="filter-label">{{ item.label }}</view>
            <wd-icon name="arrow-down" size="14px" color="#333" />
          </view>
        </view> -->
      </view>

      <!-- 搜索框 -->
      <view class="search-box">
        <image class="search-icon" src="/static/images/search.png" mode="scaleToFill" />
        <input
          class="my-input"
          type="text"
          placeholder="在当前分类中搜索芯片型号…"
          v-model="keywords"
          placeholder-style="color: #666666 ; font-size: 14px;"
        />
        <view class="btn" @click="goSearch">搜索</view>
      </view>
      <!-- 产品列表 -->
      <view class="product-section">
        <view class="section-title">
          产品列表
          <text class="total">共计{{ productList.length }}个</text>
        </view>
        <view class="product-list">
          <view class="product-item" v-for="(item, idx) in productList" :key="idx">
            <view class="product-header">
              <text class="product-title">{{ item.name }}</text>
              <text class="tag-new" v-if="item.isNew">{{ item.isNew }}</text>
              <text class="tag-hot" v-if="item.isHot">{{ item.isHot }}</text>
              <wd-icon name="arrow-right" size="28rpx" color="#666666" class="arrow-icon" />
            </view>
            <view class="product-desc">{{ item.desc }}</view>
            <view class="product-footer">
              <view class="company">
                厂家：
                <view>{{ item.company }}</view>
              </view>
              <view class="btns">
                <view class="pdf" @click="openFileByUrl(item?.path, 2)">
                  <image src="/static/images/datasearch/pdf.png" />
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { openFileByUrl } from '@/utils'
import { ref } from 'vue'
const filterList = ref([{ label: '品牌' }, { label: '封装' }, { label: '参数' }])
const searchValue = ref('')
const productList = ref([
  {
    name: 'TPS5430',
    desc: '采用SOT583封装具有1%精度，PG/SS和PFM/强制PWM的4.2V至17V，3A同步降压转换器',
    company: '德州仪器-TI',
    isNew: '车规级',
    isHot: '量产',
  },
  {
    name: 'TPS5430',
    desc: '采用SOT583封装具有1%精度，PG/SS和PFM/强制PWM的4.2V至17V，3A同步降压转换器',
    company: '德州仪器-TI',
    isNew: '车规级',
    isHot: '量产',
  },
  {
    name: 'TPS5430',
    desc: '采用SOT583封装具有1%精度，PG/SS和PFM/强制PWM的4.2V至17V，3A同步降压转换器',
    company: '德州仪器-TI',
    isNew: '车规级',
    isHot: '量产',
  },
  {
    name: 'TPS5430',
    desc: '采用SOT583封装具有1%精度，PG/SS和PFM/强制PWM的4.2V至17V，3A同步降压转换器',
    company: '德州仪器-TI',
    isNew: '车规级',
    isHot: '量产',
  },
  {
    name: 'TPS5430',
    desc: '采用SOT583封装具有1%精度，PG/SS和PFM/强制PWM的4.2V至17V，3A同步降压转换器',
    company: '德州仪器-TI',
    isNew: '车规级',
    isHot: '量产',
  },
])
function onSearch() {
  // TODO: 搜索逻辑
}
</script>
<style lang="scss" scoped>
.result-page {
  background: #f9f9f9;
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: 20rpx;
}
.main-content {
  padding: 20rpx;
  .category-info {
    // height: 220rpx;
    background: #ffffff;
    box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 20rpx;
    padding: 20rpx;
    .category-info-top {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .category-icon {
        width: 80rpx;
        height: 80rpx;
        margin-right: 14rpx;
      }
      .category-title {
        display: flex;
      }
      .category-desc {
        font-weight: 600;
        font-size: 28rpx;
        color: #333333;
        line-height: 40rpx;
        // display: flex; display: unset;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

        > view {
          font-weight: 400;
          font-size: 24rpx;
          color: #666666;
          line-height: 34rpx;
          margin-top: 8rpx;
        }
      }
      .reset {
        display: flex;
        // align-items: center;

        font-weight: 400;
        font-size: 24rpx;
        color: #666666;
        line-height: 34rpx;
        > image {
          width: 34rpx;
          height: 34rpx;
          margin-right: 10rpx;
        }
      }
    }
    .filter-bar {
      display: flex;
      flex-direction: row;
      background: #fff;
      padding: 16rpx 24rpx;
      .filter-item {
        margin-right: 32rpx;
        display: flex;
        align-items: center;
        .filter-label {
          font-size: 26rpx;
          color: #333;
          margin-right: 8rpx;
        }
      }
    }
  }

  .search-box {
    margin: 30rpx 0;
    height: 80rpx;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.1);
    border-radius: 20rpx;
    border: 4rpx solid #ff7c4d;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6rpx 8rpx;
    padding-right: 0;
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

  .product-section {
    margin-top: 20rpx;
    background: #ffffff;
    box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.05);
    border-radius: 20rpx;
    padding: 30rpx;
    height: calc(100vh - 560rpx);
    overflow-y: scroll;
    /* 隐藏滚动条 */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      display: none;
    }
    .section-title {
      font-weight: 600;
      font-size: 28rpx;
      color: #333333;
      display: flex;
      justify-content: space-between;
      .total {
        font-weight: 400;
        font-size: 24rpx;
        color: #666666;
      }
    }
    .product-list {
      .product-item {
        border-bottom: 1px dashed #eee;
        padding: 30rpx 0 20rpx;
        box-sizing: border-box;

        &:last-child {
          border-bottom: none;
        }
        .product-header {
          display: flex;
          align-items: center;
          width: calc(100%);
          position: relative;
          .product-title {
            font-weight: 600;
            font-size: 32rpx;
            margin-right: 20rpx;
            max-width: 50%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          .tag-new {
            background: #dfecfb;
            border-radius: 18rpx;
            border: 2rpx solid #2a7de1;
            padding: 0 20rpx;

            font-weight: 600;
            font-size: 20rpx;
            color: #2a7de1;
            margin-right: 20rpx;
          }
          .tag-hot {
            color: #27c16e;
            background: #def7e7;
            border: 2rpx solid #22c55e;
            border-radius: 18rpx;
            padding: 0 20rpx;

            font-weight: 600;
            font-size: 20rpx;
            // margin-right: 20rpx;
          }
          :deep(.wd-icon-arrow-right) {
            position: absolute;
            right: 0;
          }
        }
        .product-desc {
          color: #666;
          margin: 14rpx 0 20rpx 0;

          font-weight: 400;
          font-size: 24rpx;
          color: #666666;
          line-height: 36rpx;
          /* 多行文本溢出隐藏  省略号代替 */
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical; /*设置对齐模式：垂直对齐*/
          -webkit-line-clamp: 2; /*设置多行的行数*/
        }
        .product-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          //   margin-top: 12rpx;
          .company {
            font-size: 24rpx;
            color: #666;
            display: flex;
            align-items: center;
            > view {
              font-weight: 600;
              font-size: 24rpx;
              color: #333333;
            }
          }
          .btns {
            display: flex;
            align-items: center;
            .pdf {
              margin-right: 10rpx;
              width: 80rpx;
              height: 48rpx;
            }
          }
        }
      }
    }
  }
}
</style>
