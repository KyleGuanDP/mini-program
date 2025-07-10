<!-- Filter.vue -->
<template>
  <view class="container">
    <view class="mask" v-if="popupKey" @click="closePopup"></view>
    <view class="filters">
      <view class="filter" :class="{ active: isBrandActive }" @click="togglePopup('brand')">
        <view class="filter-name">品牌</view>
        <view class="drag-image">
          <image src="/static/images/product/drag.png" mode="aspectFit" />
        </view>
      </view>

      <view class="filter" :class="{ active: isPackageActive }" @click="togglePopup('package')">
        <view class="filter-name package">封装</view>
        <view class="drag-image">
          <image src="/static/images/product/drag.png" mode="aspectFit" />
        </view>
      </view>

      <view class="filter" :class="{ active: isParameterActive }" @click="togglePopup('param')">
        <view class="filter-name parameter">参数</view>
        <view class="drag-image">
          <image src="/static/images/product/drag.png" mode="aspectFit" />
        </view>
      </view>
    </view>

    <transition name="popup-slide">
      <view class="pop" v-if="popupKey">
        <Brand
          v-if="popupKey === 'brand'"
          :clickClose="closePopup"
          v-model:selectedBrands="brandFilter"
          v-model:selectedRegions="regionFilter"
          @submit="handleFilterSubmit"
        />

        <Package
          v-if="popupKey === 'package' || popupKey === 'param'"
          :popupKey="popupKey"
          :clickClose="closePopup"
          v-model:selectedDistance="distanceFilter"
          v-model:selectedArea="areaFilter"
          v-model:selectedPin="pinFilter"
          v-model:selectedNormal="normalFilter"
          v-model:selectedType="typeFilter"
          v-model:selectedPhase="phaseCountFilter"
          v-model:selectedInputVoltageMax="inputVoltageMaxFilter"
          v-model:selectedInputVoltageMin="inputVoltageMinFilter"
          v-model:selectedOutputVoltageMax="outputVoltageMaxFilter"
          v-model:selectedOutputVoltageMin="outputVoltageMinFilter"
          v-model:selectedOutputCurrentMax="outputCurrentMaxFilter"
          v-model:selectedSwitchFreqMax="switchFreqMaxFilter"
          v-model:selectedVoltageAccuracy="voltageAccuracyFilter"
          v-model:selectedStaticCurrent="staticCurrentFilter"
          v-model:scenario="scenarioFilter"
          v-model:topologyConfig="topologyConfigFilter"
          v-model:topologyDevice="topologyDeviceFilter"
          v-model:powerMode="powerModeFilter"
          v-model:voltageConfigMode="voltageConfigModeFilter"
          v-model:communicationInterface="communicationInterfaceFilter"
          v-model:enableFunction="enableFunctionFilter"
          v-model:lightLoadMode="lightLoadModeFilter"
          v-model:fullDutyMode="fullDutyModeFilter"
          v-model:softStart="softStartFilter"
          v-model:dischargeOutput="dischargeOutputFilter"
          v-model:integratedLdo="integratedLdoFilter"
          v-model:freqSync="freqSyncFilter"
          v-model:voltageTracking="voltageTrackingFilter"
          v-model:dynamicVoltage="dynamicVoltageFilter"
          v-model:powerIndicator="powerIndicatorFilter"
          v-model:ovp="ovpFilter"
          v-model:uvpInput="uvpInputFilter"
          v-model:ovpOutput="ovpOutputFilter"
          v-model:uvpOutput="uvpOutputFilter"
          v-model:ocp="ocpFilter"
          v-model:scp="scpFilter"
          v-model:otp="otpFilter"
          @submit="handleFilterSubmit"
        />
      </view>
    </transition>
  </view>
</template>

<script lang="ts" setup>
import { buildRequestPayload } from '@/utils/buildRequest'
import { defineEmits, ref, toRaw, computed } from 'vue'
import Brand from './Brand.vue'
import Package from './Package.vue'
const emit = defineEmits(['search'])
const popupKey = ref('')

//品牌
const brandFilter = ref<string[]>([])
const regionFilter = ref<string[]>([])
//封装
const normalFilter = ref<string[]>([])
const typeFilter = ref<string[]>([])
const pinFilter = ref<Array<Record<string, [number, number]>>>([])
const distanceFilter = ref<Array<Record<string, [number, number]>>>([])
const areaFilter = ref<Array<Record<string, [number, number]>>>([])

const phaseCountFilter = ref<Record<string, [number, number]>>({})
const inputVoltageMaxFilter = ref<Record<string, [number, number]>>({})
const inputVoltageMinFilter = ref<Record<string, [number, number]>>({})
const outputVoltageMaxFilter = ref<Record<string, [number, number]>>({})
const outputVoltageMinFilter = ref<Record<string, [number, number]>>({})
const outputCurrentMaxFilter = ref<Record<string, [number, number]>>({})
const switchFreqMaxFilter = ref<Record<string, [number, number]>>({})
const voltageAccuracyFilter = ref<Record<string, [number, number]>>({})
const staticCurrentFilter = ref<Record<string, [number, number]>>({})

// 应用场景
const scenarioFilter = ref<string[]>([])

// 拓扑架构
const topologyConfigFilter = ref<string[]>([]) // 功率器件配置方式
const topologyDeviceFilter = ref<string[]>([]) // 功率器件类型

// 特殊 / 辅助功能
const powerModeFilter = ref<string[]>([])
const voltageConfigModeFilter = ref<string[]>([])
const communicationInterfaceFilter = ref<string[]>([])
const enableFunctionFilter = ref<string[]>([])
const lightLoadModeFilter = ref<string[]>([])
const fullDutyModeFilter = ref<string[]>([])
const softStartFilter = ref<string[]>([])
const dischargeOutputFilter = ref<string[]>([])
const integratedLdoFilter = ref<string[]>([])
const freqSyncFilter = ref<string[]>([])
const voltageTrackingFilter = ref<string[]>([])
const dynamicVoltageFilter = ref<string[]>([])
const powerIndicatorFilter = ref<string[]>([])

// 保护功能
const ovpFilter = ref<string[]>([])
const uvpInputFilter = ref<string[]>([])
const ovpOutputFilter = ref<string[]>([])
const uvpOutputFilter = ref<string[]>([])
const ocpFilter = ref<string[]>([])
const scpFilter = ref<string[]>([])
const otpFilter = ref<string[]>([])

const resetAllFilters = () => {
  // 数组类型
  brandFilter.value = []
  regionFilter.value = []
  normalFilter.value = []
  typeFilter.value = []
  pinFilter.value = []
  distanceFilter.value = []
  areaFilter.value = []
  scenarioFilter.value = []
  topologyConfigFilter.value = []
  topologyDeviceFilter.value = []

  powerModeFilter.value = []
  voltageConfigModeFilter.value = []
  communicationInterfaceFilter.value = []
  enableFunctionFilter.value = []
  lightLoadModeFilter.value = []
  fullDutyModeFilter.value = []
  softStartFilter.value = []
  dischargeOutputFilter.value = []
  integratedLdoFilter.value = []
  freqSyncFilter.value = []
  voltageTrackingFilter.value = []
  dynamicVoltageFilter.value = []
  powerIndicatorFilter.value = []

  ovpFilter.value = []
  uvpInputFilter.value = []
  ovpOutputFilter.value = []
  uvpOutputFilter.value = []
  ocpFilter.value = []
  scpFilter.value = []
  otpFilter.value = []

  // 对象类型（范围型）
  phaseCountFilter.value = {}
  inputVoltageMaxFilter.value = {}
  inputVoltageMinFilter.value = {}
  outputVoltageMaxFilter.value = {}
  outputVoltageMinFilter.value = {}
  outputCurrentMaxFilter.value = {}
  switchFreqMaxFilter.value = {}
  voltageAccuracyFilter.value = {}
  staticCurrentFilter.value = {}
}

const isBrandActive = computed(() => {
  return brandFilter.value.length > 0 || regionFilter.value.length > 0
})

const isPackageActive = computed(() => {
  const rawPin = toRaw(pinFilter.value)
  const rawDistance = toRaw(distanceFilter.value)
  const rawArea = toRaw(areaFilter.value)

  const hasRange =
    rawPin.some((obj) => Object.keys(obj).length > 0) ||
    rawDistance.some((obj) => Object.keys(obj).length > 0) ||
    rawArea.some((obj) => Object.keys(obj).length > 0)

  return normalFilter.value.length > 0 || typeFilter.value.length > 0 || hasRange
})

const isParameterActive = computed(() => {
  const isRangeFilled = (obj: Record<string, [number, number]>) => Object.keys(obj).length > 0

  const hasRange =
    isRangeFilled(phaseCountFilter.value) ||
    isRangeFilled(inputVoltageMaxFilter.value) ||
    isRangeFilled(inputVoltageMinFilter.value) ||
    isRangeFilled(outputVoltageMaxFilter.value) ||
    isRangeFilled(outputVoltageMinFilter.value) ||
    isRangeFilled(outputCurrentMaxFilter.value) ||
    isRangeFilled(switchFreqMaxFilter.value) ||
    isRangeFilled(voltageAccuracyFilter.value) ||
    isRangeFilled(staticCurrentFilter.value)

  const hasScenario = scenarioFilter.value.length > 0

  const hasTopology = topologyConfigFilter.value.length > 0 || topologyDeviceFilter.value.length > 0

  const hasSpecialFunction =
    powerModeFilter.value.length > 0 ||
    voltageConfigModeFilter.value.length > 0 ||
    communicationInterfaceFilter.value.length > 0 ||
    enableFunctionFilter.value.length > 0 ||
    lightLoadModeFilter.value.length > 0 ||
    fullDutyModeFilter.value.length > 0 ||
    softStartFilter.value.length > 0 ||
    dischargeOutputFilter.value.length > 0 ||
    integratedLdoFilter.value.length > 0 ||
    freqSyncFilter.value.length > 0 ||
    voltageTrackingFilter.value.length > 0 ||
    dynamicVoltageFilter.value.length > 0 ||
    powerIndicatorFilter.value.length > 0

  const hasProtection =
    ovpFilter.value.length > 0 ||
    uvpInputFilter.value.length > 0 ||
    ovpOutputFilter.value.length > 0 ||
    uvpOutputFilter.value.length > 0 ||
    ocpFilter.value.length > 0 ||
    scpFilter.value.length > 0 ||
    otpFilter.value.length > 0

  return hasRange || hasScenario || hasTopology || hasSpecialFunction || hasProtection
})

const handleFilterSubmit = () => {
  let applicationGrade = toRaw(scenarioFilter.value)

  let payload = {
    // 品牌: toRaw(brandFilter.value),
    // 地域: toRaw(regionFilter.value),
    封装类型: new Set(toRaw(typeFilter.value)),
    常见封装: new Set(toRaw(normalFilter.value)),
    // 其余字段同理，全部用Set包裹
    // 引脚数量: new Set(toRaw(pinFilter.value)),
    // 封装面积: new Set(toRaw(areaFilter.value)),
    // 引脚间距: new Set(toRaw(distanceFilter.value)),
    // 参数类
    电源相位数: new Set([toRaw(phaseCountFilter.value)]),
    '最高输入电压 (V)': new Set([toRaw(inputVoltageMaxFilter.value)]),
    '最低输入电压 (V)': new Set([toRaw(inputVoltageMinFilter.value)]),
    '最高输出电压 (V)': new Set([toRaw(outputVoltageMaxFilter.value)]),
    '最小输出电压 (V)': new Set([toRaw(outputVoltageMinFilter.value)]),
    '最大输出电流 (A)': new Set([toRaw(outputCurrentMaxFilter.value)]),
    '最高开关频率 (MHz)': new Set([toRaw(switchFreqMaxFilter.value)]),
    '输出电压精度 (%)': new Set([toRaw(voltageAccuracyFilter.value)]),
    '静态电流 (uA)': new Set([toRaw(staticCurrentFilter.value)]),

    // 拓扑架构
    '功率器件配置方式(可多选)': new Set(toRaw(topologyConfigFilter.value)),
    功率器件类型: new Set(toRaw(topologyDeviceFilter.value)),
    // 特殊功能
    工作模式: new Set(toRaw(powerModeFilter.value)),
    输出电压配置模式: new Set(toRaw(voltageConfigModeFilter.value)),
    通信接口: new Set(toRaw(communicationInterfaceFilter.value)),
    使能功能: new Set(toRaw(enableFunctionFilter.value)),
    轻载模式: new Set(toRaw(lightLoadModeFilter.value)),
    满占空比运行: new Set(toRaw(fullDutyModeFilter.value)),
    软启动: new Set(toRaw(softStartFilter.value)),
    输出放电: new Set(toRaw(dischargeOutputFilter.value)),
    集成LDO: new Set(toRaw(integratedLdoFilter.value)),
    频率同步: new Set(toRaw(freqSyncFilter.value)),
    电压跟随: new Set(toRaw(voltageTrackingFilter.value)),
    动态调压: new Set(toRaw(dynamicVoltageFilter.value)),
    电源指示: new Set(toRaw(powerIndicatorFilter.value)),
    // 保护功能
    输入过压保护: new Set(toRaw(ovpFilter.value)),
    输入欠压保护: new Set(toRaw(uvpInputFilter.value)),
    输出过压保护: new Set(toRaw(ovpOutputFilter.value)),
    输出欠压保护: new Set(toRaw(uvpOutputFilter.value)),
    输出过载保护: new Set(toRaw(ocpFilter.value)),
    输出短路保护: new Set(toRaw(scpFilter.value)),
    过温保护: new Set(toRaw(otpFilter.value)),
  }
  // console.log('🧪 当前筛选参数：', payload)

  let brandData = {
    manufacture: toRaw(brandFilter.value),
    country: toRaw(regionFilter.value),
  }

  let pins = Object.entries(pinFilter.value).map(([key, arr]) => ({
    gte: arr[0],
    lte: arr[1],
  }))
  let packageData = {
    selectedOptions: payload,
    pinRanges: {
      配置引脚数量: pins,
      封装面积: areaFilter.value,
      脚间距: distanceFilter.value,
    },
  }

  console.log('this is pin filer', pinFilter)
  let params = buildRequestPayload(brandData, packageData, applicationGrade)
  console.log('this is params', params)
  closePopup()
  emit('search', params)
}

const togglePopup = (key: string) => {
  popupKey.value = popupKey.value === key ? '' : key
}

const closePopup = () => {
  popupKey.value = ''
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
}

.filters {
  width: 100%;
  padding: 0rpx 20rpx;
  gap: 22rpx;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
.filter {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: calc(33%);
  height: 68rpx;
  background: #ffffff;
  border-radius: 20rpx;
  border: 2rpx solid #f0f0f0;
  box-shadow: 0rpx 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.1);
  padding: 0 20rpx;
  box-sizing: border-box;
}

.filter.active {
  border: 2rpx solid #e65925;
}

.filter.active .filter-name {
  color: #e65925;
}

.drag-image {
  width: 28rpx;
  height: 28rpx;
}

.drag-image image {
  width: 100%;
  height: 100%;
  display: block;
  margin-right: 20rpx;
}

.filter-name {
  // margin-left: 20rpx;
  font-size: 24rpx;
  color: #333;
}

.pop {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1356rpx;
  background: #fff;
  border-radius: 20rpx 20rpx 0 0;
  z-index: 1001;
  box-shadow: 0 -10rpx 30rpx rgba(0, 0, 0, 0.1);
}

.popup-slide-enter-active,
.popup-slide-leave-active {
  transition: transform 0.3s ease;
}

.popup-slide-enter-from,
.popup-slide-leave-to {
  transform: translateY(100%);
}
</style>
