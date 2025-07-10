<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="page">
{
  style: {
    navigationStyle: 'custom',
    transparentTitle: 'always',
    allowsBounceVertical: 'false',
    pullRefresh: 'false',
  },
}
</route>
<template>
  <view class="data-search-page">
    <fgNavbar leftText="查资料" />
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
        placeholder="请输入关键词"
        v-model="keywords"
        confirm-type="search"
        @confirm="
          () => {
            isFirst = 0
            goSearch()
          }
        "
        placeholder-style="color: #666666 ; font-size: 28rpx;"
      />
      <image
        v-if="keywords"
        @click="keywords = ''"
        class="icon-clean"
        src="@/static/images/clean.png"
        mode="scaleToFill"
      />
      <view
        class="btn"
        @click="
          () => {
            isFirst = 0
            goSearch()
          }
        "
      >
        搜索
      </view>
    </view>
    <!-- 筛选条件 -->
    <view class="filters">
      <view
        class="filter-item"
        :class="{
          'filter-item-active': filterSelectList[index].active != -1,
        }"
        v-for="(item, index) in filterSelectList"
        @click="changeFilter(index)"
        :key="index"
      >
        <view>{{ item.title }}</view>
        <!-- <image src="/static/images/back.png" alt="" /> -->
        <wd-icon
          :name="filterSelectList[index].active != -1 ? 'arrow-down' : 'arrow-down'"
          size="14px"
          :color="filterSelectList[index].active != -1 ? '#E65925' : '#333333'"
        ></wd-icon>
      </view>
    </view>

    <!-- 产品列表 -->
    <view class="section-list" :style="showFilterModal ? 'overflow-y: hidden;' : ''">
      <view
        v-if="showFilterModal"
        class="filter-modal-mask"
        @click="showFilterModal = false"
      ></view>
      <view v-if="showFilterModal" class="filter-modal">
        <view class="filter-modal-content">
          <!-- 这里放筛选弹层内容，可根据实际需求自定义 -->
          <view class="filter-columns">
            <view
              v-for="(item, index) in filterSelectList[showFilterIndex].options"
              class="filter-columns-item"
              @click="changeFilterSelect(item, index)"
              :class="
                filterSelectList[showFilterIndex].active == index
                  ? 'filter-columns-item-active'
                  : ''
              "
              :key="index"
            >
              {{ item.label }}
            </view>
          </view>
        </view>
      </view>
      <view class="section">
        <view class="section-title" :style="productData.total > 0 ? '' : 'margin-bottom:0'">
          <text style="color: #2a7de1">产品</text>

          <view>共计{{ productData.total }}个</view>
        </view>
        <view class="product-list">
          <view class="product-item" v-for="(item, index) in productData.hits" :key="index">
            <view class="product-item-main" :style="showDgs ? '' : 'border-radius:10rpx'">
              <view class="product-item-top" @click="goProductDetail(item)">
                <view
                  class="product-item-img"
                  v-if="item?.chip_img && productData.hits.length == 1"
                >
                  <image :src="item?.chip_img" style="" @error="item.chip_img = ''" />
                </view>
                <view v-else class="product-item-img-demo">
                  <image
                    src="
                         /static/images/datasearch/chanpin.png
                    "
                  />
                </view>
                <view class="product-desc">
                  <view class="product-header">
                    <view class="product-title">
                      <rich-text
                        :nodes="highlightMatch(item.part_number)"
                        style="display: flex"
                        class="xinghao"
                      ></rich-text>

                      <view class="company-name">{{ item.company_name }}</view>
                    </view>

                    <view
                      class="tag-new"
                      :style="'background:' + styleList[item.manufacturing_status]?.background"
                    >
                      {{ item.manufacturing_status }}
                    </view>
                  </view>
                  <view class="classify">
                    分类：
                    <view class="text-ellipsis">
                      {{ item.category_lv1 ? item.category_lv1 + '-' : '' }}
                      {{ item.category_lv2 ? item.category_lv2 + '-' : '' }}
                      {{ item.category_lv3 }}
                    </view>
                  </view>
                  <view class=".ellipsis-2">{{ item.part_number_title }}</view>
                </view>
              </view>
              <view class="product-item-bottom" v-if="productData.hits.length == 1">
                <view class="btn">
                  <view class="pdf" @click="downloadFile(item.datasheet_file, '产品手册')">
                    <image src="/static/images/datasearch/pdf.png" alt="" />
                    产品手册
                  </view>
                  <view class="line"></view>
                  <view class="shop-car" @click="getDeviceHit(item)">
                    <image src="/static/images/datasearch/shop-car.png" alt="" />
                    查看订购器件
                    <image
                      :style="showDgs ? 'transform: rotate(180deg);' : ''"
                      style="width: 24rpx; height: 24rpx"
                      src="/static/images/datasearch/icon1.png"
                    />
                  </view>
                </view>
              </view>
            </view>
            <view class="device_hit" v-if="showDgs">
              <!-- <view class="device_hit-header">订购详情(1个型号)</view> -->
              <view class="device_hit-body" v-if="productData?.is_device_hit">
                <view class="device_hit-body-title" style="color: #e65925">
                  {{ productData?.device_hit?.order_device ?? 'TPS158463476DDCR' }}
                </view>
                <view class="device_hit-body-desc">
                  <view class="w-100">
                    <view class="w-50">
                      <!-- <image src="/static/images/chip-detail/icon18.png" /> -->
                      <text>封装：</text>
                      <text style="color: #333333">
                        {{ productData?.device_hit?.package_type ?? '-' }}
                      </text>
                    </view>
                    <view class="w-50">
                      <!-- <image src="/static/images/chip-detail/icon20.png" /> -->
                      <text>温度：</text>
                      <text
                        style="color: #666666"
                        v-if="productData?.device_hit?.min_operation_temp"
                      >
                        {{
                          `${productData?.device_hit?.min_operation_temp ?? '-'}～${productData?.device_hit?.max_operation_temp ?? '-'}℃`
                        }}
                      </text>
                      <text
                        style="color: #666666"
                        v-if="!productData?.device_hit?.min_operation_temp"
                      >
                        -
                      </text>
                    </view>
                  </view>
                  <view class="w-100">
                    <view class="w-50">
                      <!-- <image src="/static/images/chip-detail/icon29.png" /> -->
                      <text>引脚：</text>
                      <text style="color: #666666">
                        {{ productData?.device_hit?.pin_count ?? '-' }}
                      </text>
                    </view>
                    <view class="w-50">
                      <!-- <image src="/static/images/chip-detail/icon28.png" /> -->
                      <text>丝印</text>
                      <text style="color: #666666">
                        {{ productData?.marking ?? '-' }}
                      </text>
                    </view>
                  </view>
                  <view class="w-100">
                    <view class="w-50">
                      <!-- <image src="/static/images/chip-detail/icon30.png" /> -->
                      <text>尺寸：</text>
                      <text style="color: #666666">
                        {{
                          productData?.device_hit?.length
                            ? (productData?.device_hit?.length ?? '-') +
                              '*' +
                              (productData?.device_hit?.width ?? '-') +
                              '*' +
                              (productData?.device_hit?.hight ?? '-') +
                              'mm'
                            : '-'
                        }}
                      </text>
                    </view>
                    <view class="w-50">
                      <!-- <image src="/static/images/chip-detail/icon30.png" /> -->
                      <text>状态：</text>
                      <!-- <text style="color: #666666">
                        {{ productData?.device_hit?.status ?? '-' }}
                      </text> -->
                      <text :style="'color:' + styleList[productData?.device_hit?.status]?.color">
                        {{ productData?.device_hit?.status ?? '-' }}
                      </text>
                    </view>
                  </view>
                </view>
              </view>

              <view class="device_hit-body" v-for="(item1, index) in item?.device_hit" :key="index">
                <view class="device_hit-body-title">
                  {{ item1?.order_device ?? 'TPS158463476DDCR' }}
                </view>
                <view class="device_hit-body-desc">
                  <view class="w-100">
                    <view class="w-50">
                      <!-- <image src="/static/images/chip-detail/icon18.png" /> -->
                      <text>封装：</text>
                      <text style="color: #666666">
                        {{ item1?.package_type ?? '-' }}
                      </text>
                    </view>
                    <view class="w-50">
                      <!-- <image src="/static/images/chip-detail/icon20.png" /> -->
                      <text>温度：</text>
                      <text style="color: #666666" v-if="item1?.min_operation_temp">
                        {{
                          `   ${item1?.min_operation_temp ?? '-'}～${item1?.max_operation_temp ?? '-'}℃`
                        }}
                      </text>
                      <text style="color: #666666" v-if="!item1?.min_operation_temp">-</text>
                    </view>
                  </view>

                  <view class="w-100">
                    <view class="w-50">
                      <!-- <image src="/static/images/chip-detail/icon29.png" /> -->
                      <text>引脚：</text>
                      <text style="color: #666666">
                        {{ item1?.pin_count ?? '-' }}
                      </text>
                    </view>
                    <view class="w-50">
                      <!-- <image src="/static/images/chip-detail/icon28.png" /> -->
                      <text>丝印：</text>
                      <text style="color: #666666">
                        {{ item1?.marking ?? '-' }}
                      </text>
                    </view>
                  </view>
                  <view class="w-100">
                    <view class="w-50">
                      <!-- <image src="/static/images/chip-detail/icon30.png" /> -->
                      <text>尺寸：</text>
                      <text style="color: #666666">
                        {{
                          item1?.length
                            ? (item1?.length ?? '-') +
                              '*' +
                              (item1?.width ?? '-') +
                              '*' +
                              (item1?.hight ?? '-') +
                              'mm'
                            : '-'
                        }}
                      </text>
                    </view>
                    <view class="w-50">
                      <!-- <image src="/static/images/chip-detail/icon30.png" /> -->
                      <text>状态：</text>
                      <text :style="'color:' + styleList[item1?.status]?.color">
                        {{ item1?.status ?? '-' }}
                      </text>
                    </view>
                  </view>
                </view>
              </view>
              <view class="expand" @click="showOther(item)" v-if="productData?.is_device_hit">
                其他订购型号
                <wd-icon
                  :name="showOtherExpand ? 'arrow-up' : 'arrow-down'"
                  color="#666666"
                  size="16"
                ></wd-icon>
              </view>
            </view>
            <!-- <view class="device_hit" v-if="!showDg && showDgs">
              
            </view> -->
          </view>
          <view v-if="productData.total > 3" class="expand" @click="changeExpand(0)">
            {{ expandList[0] ? '收起' : '展开' }}
            <image
              :style="expandList[0] ? 'transform: rotateX(180deg);' : ''"
              class="expand-icon"
              src="/static/images/expand.png"
              mode="scaleToFill"
            />
          </view>
        </view>
      </view>

      <!-- 设计资源筛选控制的 section -->
      <template>
        <view
          class="section"
          v-if="activeDesginOrg.includes('参考设计') || activeDesginOrg.length == 0"
        >
          <view class="section-title" :style="designData.total > 0 ? '' : 'margin-bottom:0'">
            <text style="color: #8b5cf6">参考设计</text>

            <view>共计{{ designData.total }}个</view>
          </view>
          <view class="product-list">
            <view
              class="product-item"
              v-for="(item, index) in designSkip == 0
                ? designData.hits.slice(0, 3)
                : designData.hits.slice(0, designSkip * 10)"
              :key="index"
            >
              <view class="product-item-main flex items-center justify-between">
                <view class="product-item-top" @click="downloadFile(item.path, '参考设计')">
                  <view class="product-item-img-demo">
                    <image
                      src="
                  
                         /static/images/datasearch/sheji.png
                    "
                    />
                  </view>
                  <view class="product-desc">
                    <view class="product-header">
                      <view class="product-title">
                        <rich-text :nodes="item.name" style="display: flex"></rich-text>
                      </view>
                      <!-- <text class="tag-new" v-if="item.tag">{{ item.tag }}</text> -->
                    </view>
                    <!-- {{ item.description }} -->
                  </view>
                </view>
                <view class="download" @click="downloadFile(item.path, '参考设计')">
                  <image src="/static/images/download2.png"></image>
                </view>
              </view>
            </view>
            <view v-if="designData.hits.length > 3" class="expand" @click="changeExpand(1)">
              {{ expandList[1] ? '收起' : '展开' }}
              <image
                :style="expandList[1] ? 'transform: rotateX(180deg);' : ''"
                class="expand-icon"
                src="/static/images/expand.png"
                mode="scaleToFill"
              />
            </view>
          </view>
        </view>
        <view
          class="section"
          v-if="activeDesginOrg.includes('技术文章') || activeDesginOrg.length == 0"
        >
          <view class="section-title" :style="technicalData.total > 0 ? '' : 'margin-bottom:0'">
            <text style="color: #22c55e">技术文章</text>
            <view>共计{{ technicalData.total }}个</view>
          </view>
          <view class="product-list">
            <view
              class="product-item"
              v-for="(item, index) in technicalSkip == 0
                ? technicalData.hits.slice(0, 3)
                : technicalData.hits.slice(0, technicalSkip * 10)"
              :key="index"
            >
              <view class="product-item-main flex items-center justify-between">
                <view class="product-item-top" @click="downloadFile(item.path, '技术文章')">
                  <view class="product-item-img-demo">
                    <image
                      src="
                  
                         /static/images/datasearch/wendang.png
                    "
                    />
                  </view>
                  <view class="product-desc">
                    <view class="product-header">
                      <view class="product-title">
                        <rich-text :nodes="item.name" style="display: flex"></rich-text>
                      </view>
                      <!-- <text class="tag-new" v-if="item.tag">{{ item.tag }}</text> -->
                    </view>
                    <!-- {{ item.description }} -->
                  </view>
                </view>

                <view class="download" @click="downloadFile(item.path, '技术文章')">
                  <image src="/static/images/download1.png"></image>
                </view>
              </view>
            </view>
            <view v-if="technicalData.hits.length > 3" class="expand" @click="changeExpand(2)">
              {{ expandList[2] ? '收起' : '展开' }}
              <image
                :style="expandList[2] ? 'transform: rotateX(180deg);' : ''"
                class="expand-icon"
                src="/static/images/expand.png"
                mode="scaleToFill"
              />
            </view>
          </view>
        </view>
        <view
          class="section"
          v-if="activeDesginOrg.includes('行业资讯') || activeDesginOrg.length == 0"
        >
          <view class="section-title" :style="informationData.total > 0 ? '' : 'margin-bottom:0'">
            <text style="color: #f9b378">行业资讯</text>
            <view>共计{{ informationData.total }}个</view>
          </view>
          <view class="product-list">
            <view
              class="product-item"
              v-for="(item, index) in informationSkip == 0
                ? informationData.hits.slice(0, 3)
                : informationData.hits.slice(0, informationSkip * 10)"
              :key="index"
            >
              <view class="product-item-main">
                <view class="product-item-top">
                  <view class="product-item-img-demo">
                    <image
                      src="
                         /static/images/datasearch/zixun.png"
                    />
                  </view>
                  <view class="product-desc">
                    <view class="product-header">
                      <view class="product-title">
                        <rich-text :nodes="item.name" style="display: flex"></rich-text>
                      </view>
                      <!-- <text class="tag-new" v-if="item.tag">{{ item.tag }}</text> -->
                    </view>
                    <!-- {{ item.description }} -->
                  </view>
                </view>
              </view>
              <!-- <view class="download" @click="downloadFile(item.path, 2)">
                <image src="/static/images/chip-detail/icon16.png"></image>
              </view> -->
            </view>
            <view v-if="informationData.hits.length > 3" class="expand" @click="changeExpand(4)">
              {{ expandList[4] ? '收起' : '展开' }}
              <image
                :style="expandList[4] ? 'transform: rotateX(180deg);' : ''"
                class="expand-icon"
                src="/static/images/expand.png"
                mode="scaleToFill"
              />
            </view>
          </view>
        </view>
      </template>
    </view>
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
          <view class="text">设计资源</view>
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
                :class="activeDesgin.includes(item) ? 'pop-select-item-active' : ''"
                v-for="item in filterSelectList[2].options"
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
    <wd-popup
      v-model="showSelect3"
      position="bottom"
      custom-style="height: 75vh;border-radius: 20rpx 20rpx 0rpx 0rpx;"
    >
      <view class="my-popup">
        <view class="pop-title">
          <view class="text">排序方式</view>
          <image
            @click="showSelect3 = false"
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
                :class="activeSort.includes(item) ? 'pop-select-item-active' : ''"
                v-for="item in filterSelectList[3].options"
                @click="handleSelectPop3(item)"
                :key="item"
              >
                {{ item }}
              </view>
            </view>
          </view>
        </view>
        <view class="pop-bottom">
          <view class="reset-btn" @click="resetPop3">
            <image
              class="reset-icon"
              src="@/static/images/chip-detail/reset.png"
              mode="scaleToFill"
            />
            <text>重置</text>
          </view>
          <view class="confirm-btn" @click="confirmBtn3">确定</view>
        </view>
      </view>
    </wd-popup>
  </view>
</template>

<script setup lang="ts">
import { getSearchData } from '@/api/search'
import { DesignHit, ProductHit } from '@/api/search.typings'
import { getDeviceSearchData } from '@/service/index'
import { downloadFile } from '@/utils/download'
import { ref } from 'vue'
const keywords = ref('')
// const keywords = ref('INA185A1IDRLT')
// 筛选弹框显示索引，-1 表示不显示
const showFilterIndex = ref(-1)
// 筛选弹框显示/隐藏
const showFilterModal = ref(false)
const showDg = ref(false)

const showDgs = ref(false)
// 筛选项列表，active 表示当前选中项索引，-1 表示未选中
const filterSelectList = ref<any>([
  { title: '品牌', active: -1, options: [] },
  { title: '分类', active: -1, options: [] },
  {
    title: '设计资源',
    active: -1,
    // options: [{ label: '参考设计' }, { label: '技术文章' }, { label: '行业资讯' }],
    options: ['参考设计', '技术文章', '行业资讯'],
  },
  {
    title: '排序方式',
    active: -1,
    // options: [{ label: '相关性优先' }, { label: '信息更新时间优先' }],
    options: ['相关性优先', '信息更新时间优先'],
  },
])

const showSelect = ref(false)
const showSelect1 = ref(false)
const showSelect2 = ref(false)
const showSelect3 = ref(false)
const activitySelectList = ref([
  { label: '品牌名称(可多选)', list: ['不限', 'TI', 'ADI'], value: ['不限'], multiple: true },
  {
    label: '品牌地域(可多选)',
    list: ['不限', '中国', '美国', '日本', '韩国'],
    value: ['不限'],
    multiple: true,
  },
])
const resetPop1 = () => {
  activeCategory_lv3.value = []
}
const resetPop2 = () => {
  activeDesgin.value = []
}
const resetPop3 = () => {
  activeSort.value = []
}
const activeManufacture = ref()
const activeCategory_lv3 = ref([])
const activePackage_std = ref()
const activeCountry = ref() //国家
const package_stdList = ref()
const category_lv3List = ref([])
const resetPop = () => {
  activitySelectList.value.forEach((item) => {
    item.value = ['不限']
  })
}
const isExpand = ref(0)
const confirmBtn = () => {
  if (activitySelectList.value[0].value.includes('不限')) {
    activeManufacture.value = ''
  } else {
    filterSelectList.value[0].active = 1
    activeManufacture.value = activitySelectList.value[0].value.join(',')
  }
  if (activitySelectList.value[1].value.includes('不限')) {
    activeCountry.value = ''
  } else {
    filterSelectList.value[0].active = 1
    activeCountry.value = activitySelectList.value[1].value.join(',')
  }
  if (
    activitySelectList.value[0].value.includes('不限') &&
    activitySelectList.value[1].value.includes('不限')
  ) {
    filterSelectList.value[0].active = -1
  }
  showSelect.value = false
  isExpand.value = 0
  pageLimit.value = 3
  productsSkip.value = 0
  goSearch()
}

const confirmBtn1 = () => {
  if (activeCategory_lv3.value.length > 0) {
    filterSelectList.value[1].active = 1
  } else {
    filterSelectList.value[1].active = -1
  }
  showSelect1.value = false
  isExpand.value = 0
  pageLimit.value = 3
  productsSkip.value = 0
  goSearch()
}

const activeDesginOrg = ref([])
//前端筛选
const confirmBtn2 = () => {
  if (activeDesgin.value.length > 0) {
    filterSelectList.value[2].active = 1
  } else {
    filterSelectList.value[2].active = -1
  }
  activeDesginOrg.value = JSON.parse(JSON.stringify(activeDesgin.value))
  showSelect2.value = false
  // goSearch()
}
const confirmBtn3 = () => {
  if (activeSort.value.length > 0) {
    filterSelectList.value[3].active = 1
  } else {
    filterSelectList.value[3].active = -1
  }
  showSelect3.value = false
  // goSearch()
}
const handleSelectPop1 = (item) => {
  console.log('item', item, activeCategory_lv3.value)
  if (activeCategory_lv3.value.includes(item)) {
    activeCategory_lv3.value = activeCategory_lv3.value.filter((e) => e !== item)
  } else {
    activeCategory_lv3.value.push(item)
  }
}
const activeDesgin = ref([])
const activeSort = ref([])
const handleSelectPop2 = (item) => {
  if (activeDesgin.value.includes(item)) {
    activeDesgin.value = activeDesgin.value.filter((e) => e !== item)
  } else {
    activeDesgin.value.push(item)
  }
}
const handleSelectPop3 = (item) => {
  if (activeSort.value.includes(item)) {
    activeSort.value = activeSort.value.filter((e) => e !== item)
  } else {
    activeSort.value.push(item)
  }
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
const getCategoriesText = (item) => {
  const res =
    (item.category_lv1 ? item.category_lv1 + '/' : '') +
    (item.category_lv2 ? item.category_lv2 + '/' : '') +
    (item.category_lv3 || '')
  return res ? res : '-'
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
// const labelList = ref(['新产品', '正在供货', '预发布', '不推荐用于新设计', '停产'])
// 切换筛选弹框显示/隐藏
const changeFilter = (index: number) => {
  if (index == 0) {
    showSelect.value = true
    showFilterModal.value = false
    return
  } else if (index == 1) {
    showSelect1.value = true
  } else if (index == 2) {
    showSelect2.value = true
  } else if (index == 3) {
    showSelect3.value = true
  }
  // if (showFilterIndex.value === index && showFilterModal.value) {
  //   // 当前已展开则关闭
  //   showFilterModal.value = false
  //   showFilterIndex.value = -1
  // } else {
  //   // 展开对应筛选项
  //   showFilterModal.value = true
  //   showFilterIndex.value = index
  // }
}
// 选择筛选项
const changeFilterSelect = (item: any, idx: number) => {
  const filter = filterSelectList.value[showFilterIndex.value]
  // 切换选中状态，已选中则取消
  filter.active = filter.active === idx ? -1 : idx
  if (filter.active != -1) {
    // 更新标题为选中项
    filter.title = item.label
  } else {
    let list = ['品牌', '分类', '设计资源', '排序方式']
    filter.title = list[showFilterIndex.value]
  }
  if (showFilterIndex.value == 1 || showFilterIndex.value == 0) {
    goSearch()
  }

  // productData.value.total = productData.value.hits.length

  // 关闭弹框
  showFilterModal.value = false
  showFilterIndex.value = -1
}
const pageLimit = ref(3)
const productsSkip = ref(0)
const designSkip = ref(0)
const technicalSkip = ref(0)
const informationSkip = ref(0)
const productData = ref<any>({
  total: 0,
  is_device_hit: false,
  device_hit: {
    status: '',
    order_device: '',
    package_type: '',
    pin_count: 0,
  },
  hits: [] as ProductHit[],
  hitsAll: [] as ProductHit[], // 保留全部产品数据用于筛选
})
const designData = ref({
  total: 0,
  hits: [] as DesignHit[],
})
const technicalData = ref({
  total: 0,
  hits: [] as DesignHit[],
})
// const designData = ref({
//   total: 0,
//   hits: [] as DesignHit[],
// })
const informationData = ref({
  total: 0,
  hits: [] as DesignHit[],
})
const highlight = ref('')
const isFirst = ref(0)
const goSearch = async () => {
  // 重置所有筛选项选中状态
  filterSelectList.value.forEach((f, i) => {
    if (i == 0 || i == 1) {
    } else {
      f.active = -1
      let list = ['品牌', '分类', '设计资源', '排序方式']
      f.title = list[i]
    }
  })
  activeDesgin.value = []
  activeDesginOrg.value = []
  activeSort.value = []
  if (!keywords.value) {
    uni.showToast({
      title: `请先输入搜索内容`,
      icon: 'none',
    })
    return
  }

  // 发起搜索请求d
  let params = {
    query: keywords.value,
    skip: productsSkip.value * pageLimit.value,
    limit: pageLimit.value,
    manufacture: activeManufacture.value, //品牌
    package_std: activePackage_std.value, //封装类型
    country: activeCountry.value,
  }
  if (activeCategory_lv3.value.length > 0) {
    params.category_lv3 = activeCategory_lv3.value.join(',')
  }
  // category_lv3: activeCategory_lv3.value.length > 0 ? : '', //分类
  try {
    const res: any = await getSearchData(params)
    if (res.status == 'success') {
      // productData.value = res.data.product
      //分页逻辑
      // productData.value.hitsAll = res.data.product.hits.slice()
      if (productsSkip.value === 0) {
        productData.value.hits = res.data.product.hits
      } else {
        productData.value.hits = [...productData.value.hits, ...res.data.product.hits]
      }

      productData.value.total = res.data.product.total
      productData.value.is_device_hit = res.data.product.is_device_hit

      if (productData.value.is_device_hit) {
        productData.value.device_hit = res.data.product.device_hit
        showDgs.value = true
      } else {
        showDgs.value = false
      }
      designData.value = res.data.design

      designData.value.total = res.data.design.total
      technicalData.value = res.data.technical

      technicalData.value.total = res.data.technical.total
      informationData.value = res.data.information
      informationData.value.total = res.data.information.total

      expandList.value[1] = 0
      expandList.value[2] = 0
      expandList.value[4] = 0

      designSkip.value = 0
      technicalSkip.value = 0
      informationSkip.value = 0
      if (isExpand.value == 0) {
        expandList.value[0] = 0
      }
      if (isFirst.value == 0) {
        category_lv3List.value = res.data.product.category_agg

        let list = []
        res.data.product.category_agg.map((e) => {
          list.push({
            label: e,
          })
        })
        filterSelectList.value[1].options = list

        if (res.data.product.manufacture_agg.length) {
          // manufactureList.value = res.data.manufacture_agg
          activitySelectList.value[0].list = ['不限', ...res.data.product.manufacture_agg]
        }
        if (res.data.product.country_agg) {
          activitySelectList.value[1].list = ['不限', ...res.data.product.country_agg]
        }
        isFirst.value++
      }

      // filterSelectList.value[1].options = list
      // isFirst.value++

      // if (res.data.product.package_std_agg.length) {
      //   package_stdList.value = res.data.package_std_agg
      // }
    } else {
      // uni.showToast({
      //   title: res.msg,
      //   icon: 'none',
      // })
    }
  } catch (err) {
  } finally {
    highlight.value = keywords.value

    // let list = ['放大器', '变流器']
    // list.map((e) => {
    //   category_lv3List.value.push(e)
    // })
  }
}

const getDeviceHit = async (item) => {
  //直接命中了订购信息
  // if (productData.value.is_device_hit) {
  //   // showDg.value = !showDg.value
  // } else {
  if (item.device_hit) {
    showDgs.value = !showDgs.value
    item.device_hit = null
  } else {
    try {
      let params = {
        limit: 999,
        part_number: item.part_number,
        category_lv3: item.category_lv3,
        package_std: item.package_std,
        device: item.device,
        ignore_device: item.ignore_device,
        manufacture: item.manufacture,
      }
      const res: any = await getDeviceSearchData(params)
      if (res.status == 'success') {
        item.device_hit = res.data.hits ?? []
        // item.is_device_hit = true
      }
    } catch (err) {
      uni.showToast({
        title: err,
        icon: 'none',
      })
    } finally {
      showDgs.value = !showDgs.value
    }
  }

  // }
}
const showOtherExpand = ref(false)
const showOther = async (item) => {
  if (item.device_hit) {
    showOtherExpand.value = !showOtherExpand.value
    item.device_hit = null
  } else {
    try {
      let params = {
        limit: 999,
        part_number: item.part_number,
        category_lv3: item.category_lv3,
        package_std: item.package_std,
        device: item.device,
        ignore_device: item.ignore_device,
        manufacture: item.manufacture,
      }
      const res: any = await getDeviceSearchData(params)
      if (res.status == 'success') {
        item.device_hit = res.data.hits ?? []

        item.device_hit = item.device_hit.filter(
          (e) => e.order_device != productData.value.device_hit.order_device,
        )

        // item.is_device_hit = true
      }
    } catch (err) {
      uni.showToast({
        title: err,
        icon: 'none',
      })
    } finally {
      showOtherExpand.value = !showOtherExpand.value
    }
  }
}
// const columns = ref(['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7'])
const lv3Classfiy = ref([])
const expandList = ref([0, 0, 0, 0, 0])

const showTopTree = ref(true)

const changeExpand = (index: any) => {
  if (index == 0) {
    if (pageLimit.value == 3) {
      pageLimit.value = 10
      if (productData.value.total > 3 && productData.value.total < 11) {
        expandList.value[0] = 1
      }
      goSearch()
      return
    }
    if (expandList.value[index] == 1) {
      productsSkip.value = 0
      expandList.value[index] = 0
      pageLimit.value = 3
      goSearch()
      return
    } else {
      productsSkip.value++
      goSearch()
    }
    if (
      (productsSkip.value + 1) * 10 > productData.value.total ||
      (productsSkip.value + 1) * 10 == productData.value.total
    ) {
      expandList.value[index] = 1
      return
    }
  }
  if (index == 1) {
    if (expandList.value[index] == 1) {
      designSkip.value = 0
      expandList.value[index] = 0
      return
    } else {
      designSkip.value++
    }
    if (
      designSkip.value * 10 > designData.value.total ||
      designSkip.value * 10 == designData.value.total
    ) {
      expandList.value[index] = 1
      return
    }
  }
  if (index == 2) {
    // if ((technicalSkip.value + 1) * 10 > technicalData.value.total) {
    //   expandList.value[index] = expandList.value[index] ? 0 : 1
    // }
    // technicalSkip.value++

    if (expandList.value[index] == 1) {
      technicalSkip.value = 0
      expandList.value[index] = 0
      return
    } else {
      technicalSkip.value++
    }
    if (
      technicalSkip.value * 10 > technicalData.value.total ||
      technicalSkip.value * 10 == technicalData.value.total
    ) {
      expandList.value[index] = 1
      return
    }
  }
  if (index == 4) {
    // if ((informationSkip.value + 1) * 10 > informationData.value.total) {
    //   expandList.value[index] = expandList.value[index] ? 0 : 1
    // }
    // informationSkip.value++

    if (expandList.value[index] == 1) {
      informationSkip.value = 0
      expandList.value[index] = 0
      return
    } else {
      informationSkip.value++
    }
    if (
      informationSkip.value * 10 > informationData.value.total ||
      informationSkip.value * 10 == informationData.value.total
    ) {
      expandList.value[index] = 1
      return
    }
  }
}
const value = ref('')
const goProductDetail = (item: any) => {
  uni.navigateTo({ url: '/pages/chip-detail/index?id=' + item.pid })
}
onLoad((option) => {
  if (option.keywords) {
    console.log('搜索关键词：', option.keywords)
    keywords.value = option.keywords

    goSearch()
  }
  console.log('页面加载完成')
})
watch(
  () => keywords.value,
  (val) => {
    isFirst.value = 0
    pageLimit.value = 3
    productsSkip.value = 0
  },
)
function highlightMatch(text: string) {
  if (!highlight.value) return text
  const regex = new RegExp(highlight.value, 'gi')
  return text.replace(
    regex,
    (match) => `<span style="font-weight: 500;color: #E65925;">${match}</span>`,
  )
}
</script>

<style scoped lang="scss">
.data-search-page {
  background: #f9f9f9;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.navbar {
  display: flex;
  align-items: center;
  height: 88rpx;
  background: #fff;
  padding: 0 24rpx;
  border-bottom: 1rpx solid #eee;
}
.back-icon {
  font-size: 36rpx;
  margin-right: 24rpx;
}
.title {
  font-size: 32rpx;
  font-weight: bold;
  flex: 1;
}
.navbar-actions {
  display: flex;
  align-items: center;
}
.icon-dot,
.icon-more {
  width: 32rpx;
  height: 32rpx;
  background: #eee;
  border-radius: 50%;
  margin-left: 16rpx;
}
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

.filters {
  display: flex;
  /* background: #fff; */
  padding: 0rpx 20rpx;
  margin-bottom: 30rpx;
  gap: 20rpx;
  // border-bottom: 1rpx solid #eee;
  justify-content: space-between;
  // width: calc(100% - 40rpx);
  // overflow-x: scroll;
  :deep(.wd-picker) {
    .wd-picker__cell {
      background: #ffffff;
      border-radius: 20rpx 20rpx 20rpx 20rpx;
      border: 2rpx solid #f0f0f0;
      height: 68rpx;
      align-items: center;
      padding: 0 10rpx 0 20rpx;
    }
    .wd-picker__placeholder {
      color: #333333;
    }
    .wd-picker__arrow {
      color: #333333;
      transform: rotate(90deg);
    }
  }
}
.filter-item {
  background: #ffffff;
  border-radius: 20rpx 20rpx 20rpx 20rpx;
  border: 2rpx solid #f0f0f0;
  height: 68rpx;
  box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.1);
  padding: 0 10rpx 0 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // width: 25%;
  width: calc(25% - 50rpx);
  > view {
    font-weight: 400;
    font-size: 24rpx;
    color: #333333;
    line-height: 34rpx;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
.filter-item-active {
  background: #fce6de;

  border: 2rpx solid #e65925;
  > view {
    color: #e65925;
  }
}
.filter-modal-mask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99;
}
.filter-modal {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 100;
  background: #f9f9f9;
  transform: translateY(-2px);
  border-radius: 0 0 16rpx 16rpx;
  /* top 由 filterModalStyle 控制 */
}
.filter-modal-content {
  padding: 0 20rpx;
  .filter-columns {
    overflow-y: scroll;
    max-height: 300rpx;
    .filter-columns-item {
      display: flex;
      padding: 30rpx 0;

      font-weight: 400;
      font-size: 28rpx;
      color: #333333;
      justify-content: center;
      border-bottom: 2rpx solid #eeeeee;
    }
    .filter-columns-item-active {
      color: #e65925;
    }
  }
  .filter-columns :last-child {
    border-bottom: unset;
  }
}
.section-list {
  padding: 0 20rpx;
  overflow-y: scroll;
  // height: calc(100vh - 450rpx);
  flex: 1;
  position: relative;
  padding-bottom: 20rpx;
  .section {
    background: #ffffff;
    box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.05);
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
  }
  .section-title {
    font-weight: 500;
    font-size: 28rpx;
    color: #333333;
    line-height: 40rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
    > view {
      font-weight: 400;
      font-size: 24rpx;
      color: #666666;
      line-height: 34rpx;
    }
  }
  .product-list {
    // background: #fff;
    // margin: 0 24rpx;
    // border-radius: 16rpx;
    // padding: 16rpx;
    display: flex;
    flex-direction: column;
    gap: 20rpx;

    .product-item {
      .product-item-main {
        padding: 20rpx 20rpx;
        box-sizing: border-box;
        // height: 152rpx;
        background: #ffffff;
        border-radius: 10rpx 10rpx 0 0;
        border: 2rpx solid #eeeeee;
        .download {
          width: 32rpx;
          height: 32rpx;
          flex-shrink: 0;
          > image {
            width: 100%;
            height: 100%;
          }
        }
      }
      .product-item-top {
        display: flex;
        gap: 20rpx;
        align-items: center;

        .product-item-img {
          flex-shrink: 0;
          width: 74rpx;
          height: 74rpx;
          background: #eeeeee;
          border-radius: 20rpx 20rpx 20rpx 20rpx;
          border: 2rpx solid #f0f0f0;
          display: flex;
          justify-content: center;
          align-items: center;
          > image {
            width: 52rpx;
            height: 52rpx;
          }
        }
        .product-item-img-demo {
          width: 74rpx;
          height: 74rpx;
          flex-shrink: 0;
          > image {
            width: 100%;
            height: 100%;
          }
        }
        .product-header {
          display: flex;
          align-items: center;
        }
        .product-title {
          font-weight: 400;
          font-size: 24rpx;
          color: #666666;
          line-height: 34rpx;
          align-items: center;
          display: flex;
          :deep(.xinghao) {
            font-weight: 500;
            // font-size: 24rpx;
            color: #000000;
            line-height: 34rpx;
            display: flex;
            margin-right: 10rpx;
            font-size: 28rpx;
          }
          .company-name {
            font-weight: 500;
            font-size: 20rpx;
            color: #333333;
            line-height: 28rpx;
          }
        }
        .tag-new {
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

        .product-desc {
          font-weight: 400;
          font-size: 20rpx;
          color: #666666;
          line-height: 28rpx;
          .classify {
            display: flex;

            font-weight: 500;
            font-size: 20rpx;
            color: #333333;
            line-height: 28rpx;
            margin: 2rpx 0 8rpx 0;
            > view {
              font-weight: 400;
              font-size: 20rpx;
              color: #666666;
              line-height: 28rpx;
            }
          }
        }
      }
      .product-item-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20rpx;
        padding-top: 20rpx;
        border-top: 2rpx dashed #eee;
        > view {
          font-weight: 600;
          font-size: 24rpx;
          color: #333333;
          line-height: 30rpx;
        }
        .btn {
          display: flex;
          gap: 20rpx;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          > view {
            // width: 80rpx;
            display: flex;

            font-weight: 400;
            font-size: 24rpx;
            color: #333333;
            line-height: 34rpx;
            align-items: center;
            gap: 10rpx;
            > image {
              width: 22rpx;
              height: 28rpx;
            }
          }
          .line {
            width: 2rpx;
            height: 40rpx;
            border-right: 2rpx dashed #eee;
          }
          .pdf {
            margin-left: 94rpx;
          }
          .shop-car {
            justify-content: right;
          }
        }
      }
      .device_hit {
        // margin-top: 20rpx;
        // height: 356rpx;
        // background: #e9f2fc;

        border-radius: 0 0 10rpx 10rpx;
        padding: 20rpx;
        border: 2rpx solid #eeeeee;
        border-top: unset;
        box-sizing: border-box;
        // .device_hit-header {
        //
        //   font-weight: 500;
        //   font-size: 24rpx;
        //   color: #333333;
        //   line-height: 30rpx;
        //   position: relative;
        //   padding-left: 20rpx;
        //   margin-bottom: 20rpx;
        // }
        // .device_hit-header::before {
        //   content: '';
        //   width: 8rpx;
        //   height: 8rpx;
        //   background: #2a7de1;
        //   border-radius: 50%;

        //   margin-right: 10rpx;
        //   position: absolute;
        //   left: 0%;
        //   top: 50%;
        //   transform: translate(0, -50%);
        // }
        .device_hit-body {
          // height: 260rpx;
          // background: #ffffff;
          // border-radius: 10rpx 10rpx 10rpx 10rpx;
          // padding: 20rpx;
          box-sizing: border-box;
          margin-bottom: 20rpx;
          .device_hit-body-title {
            font-weight: 600;
            font-size: 28rpx;
            color: #333333;
            line-height: 40rpx;
            // padding-bottom: 20rpx;
          }
          .device_hit-body-desc {
            display: flex;
            flex-direction: column;
            gap: 18rpx;
            padding: 20rpx 0rpx;
            border-bottom: 2rpx dashed #eeeeee;
            .w-100 {
              width: 100%;
              display: flex;
              // justify-content: space-between;
            }
            .w-100 .w-50:nth-child(2) {
              padding-left: 74rpx;
            }
            .w-50 {
              width: 50%;
            }
            > view {
              > view {
                display: flex;

                > image {
                  width: 28rpx;
                  height: 28rpx;
                  margin-right: 10rpx;
                }
                > text {
                  font-size: 24rpx;
                  color: #333333;
                  line-height: 34rpx;
                }
              }
            }
          }
        }
        .expand {
          justify-content: left;

          font-weight: 400;
          font-size: 24rpx;
          color: #333333;
          gap: 10rpx;
          line-height: 34rpx;
        }
      }
      .device_hit .device_hit-body:last-child .device_hit-body-desc {
        border-bottom: unset;
        padding-bottom: 0;
      }
    }
  }
  .reference-list {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
    .reference-item {
      padding: 26rpx 20rpx;
      box-sizing: border-box;
      height: 152rpx;
      background: #ffffff;
      border-radius: 10rpx;
      border: 2rpx solid #eeeeee;
      display: flex;
      gap: 20rpx;
      align-items: center;
      > image {
        width: 74rpx;
        height: 74rpx;
        flex-shrink: 0;
      }
      .reference-source {
        color: #888;
        font-size: 24rpx;
        margin-left: 16rpx;
        .reference-title {
          font-size: 26rpx;
          font-weight: bold;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}

.expand {
  color: #888;
  font-size: 24rpx;
  margin-top: 16rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  // cursor: pointer;
  .expand-icon {
    width: 24rpx;
    height: 24rpx;
    margin-left: 8rpx;
  }
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
