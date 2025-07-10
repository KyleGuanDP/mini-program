<template>
  <view class="container">
    <view class="header">
      <view class="title" v-if="popupKey === 'param'">参数筛选</view>
      <view class="title" v-if="popupKey === 'package'">封装筛选</view>
      <view class="cancle" @click="handleClose">
        <image src="/static/images/product/cancle.png" mode="aspectFit" />
      </view>
    </view>
    <view class="divider"></view>

    <view class="body">
      <view class="side-bar" v-if="popupKey === 'package'">
        <SideBar
          @clearPackageRange="clearPackageRange"
          :elements="packageTypes"
          :selected="selectedSideKey"
          @select="handleSideSelect"
          v-model:selectedNormal="selectedNormal"
          v-model:selectedType="selectedType"
          v-model:scenario="scenario"
          v-model:topologyConfig="topologyConfig"
          v-model:topologyDevice="topologyDevice"
          v-model:powerMode="powerMode"
          v-model:voltageConfigMode="voltageConfigMode"
          v-model:communicationInterface="communicationInterface"
          v-model:enableFunction="enableFunction"
          v-model:lightLoadMode="lightLoadMode"
          v-model:fullDutyMode="fullDutyMode"
          v-model:softStart="softStart"
          v-model:dischargeOutput="dischargeOutput"
          v-model:integratedLdo="integratedLdo"
          v-model:freqSync="freqSync"
          v-model:voltageTracking="voltageTracking"
          v-model:dynamicVoltage="dynamicVoltage"
          v-model:powerIndicator="powerIndicator"
          v-model:ovp="ovp"
          v-model:uvpInput="uvpInput"
          v-model:ovpOutput="ovpOutput"
          v-model:uvpOutput="uvpOutput"
          v-model:ocp="ocp"
          v-model:scp="scp"
          v-model:otp="otp"
        />
      </view>
      <view class="side-bar" v-if="popupKey === 'param'">
        <SideBar
          @clearPackageRange="clearPackageRange"
          :elements="parameterTypes"
          :selected="selectedSideKey"
          @select="handleSideSelect"
          v-model:selectedNormal="selectedNormal"
          v-model:selectedInputVoltageMax="selectedInputVoltageMax"
          v-model:selectedInputVoltageMin="selectedInputVoltageMin"
          v-model:selectedOutputVoltageMax="selectedOutputVoltageMax"
          v-model:selectedOutputVoltageMin="selectedOutputVoltageMin"
          v-model:selectedOutputCurrentMax="selectedOutputCurrentMax"
          v-model:selectedSwitchFreqMax="selectedSwitchFreqMax"
          v-model:selectedVoltageAccuracy="selectedVoltageAccuracy"
          v-model:selectedStaticCurrent="selectedStaticCurrent"
          v-model:selectedType="selectedType"
          v-model:scenario="scenario"
          v-model:topologyConfig="topologyConfig"
          v-model:topologyDevice="topologyDevice"
          v-model:powerMode="powerMode"
          v-model:voltageConfigMode="voltageConfigMode"
          v-model:communicationInterface="communicationInterface"
          v-model:enableFunction="enableFunction"
          v-model:lightLoadMode="lightLoadMode"
          v-model:fullDutyMode="fullDutyMode"
          v-model:softStart="softStart"
          v-model:dischargeOutput="dischargeOutput"
          v-model:integratedLdo="integratedLdo"
          v-model:freqSync="freqSync"
          v-model:voltageTracking="voltageTracking"
          v-model:dynamicVoltage="dynamicVoltage"
          v-model:powerIndicator="powerIndicator"
          v-model:ovp="ovp"
          v-model:uvpInput="uvpInput"
          v-model:ovpOutput="ovpOutput"
          v-model:uvpOutput="uvpOutput"
          v-model:ocp="ocp"
          v-model:scp="scp"
          v-model:otp="otp"
        />
      </view>
      <!-- {{ selectedInputVoltageMax }} -->
      <view class="selector">
        <Selector
          :currentKey="selectedSideKey"
          v-model:selectedDistance="selectedDistance"
          v-model:selectedArea="selectedArea"
          v-model:selectedPin="selectedPin"
          v-model:selectedNormal="selectedNormal"
          v-model:selectedType="selectedType"
          v-model:selectedPhase="selectedPhase"
          v-model:selectedInputVoltageMax="selectedInputVoltageMax"
          v-model:selectedInputVoltageMin="selectedInputVoltageMin"
          v-model:selectedOutputVoltageMax="selectedOutputVoltageMax"
          v-model:selectedOutputVoltageMin="selectedOutputVoltageMin"
          v-model:selectedOutputCurrentMax="selectedOutputCurrentMax"
          v-model:selectedSwitchFreqMax="selectedSwitchFreqMax"
          v-model:selectedVoltageAccuracy="selectedVoltageAccuracy"
          v-model:selectedStaticCurrent="selectedStaticCurrent"
          v-model:scenario="scenario"
          v-model:topologyConfig="topologyConfig"
          v-model:topologyDevice="topologyDevice"
          v-model:powerMode="powerMode"
          v-model:voltageConfigMode="voltageConfigMode"
          v-model:communicationInterface="communicationInterface"
          v-model:enableFunction="enableFunction"
          v-model:lightLoadMode="lightLoadMode"
          v-model:fullDutyMode="fullDutyMode"
          v-model:softStart="softStart"
          v-model:dischargeOutput="dischargeOutput"
          v-model:integratedLdo="integratedLdo"
          v-model:freqSync="freqSync"
          v-model:voltageTracking="voltageTracking"
          v-model:dynamicVoltage="dynamicVoltage"
          v-model:powerIndicator="powerIndicator"
          v-model:ovp="ovp"
          v-model:uvpInput="uvpInput"
          v-model:ovpOutput="ovpOutput"
          v-model:uvpOutput="uvpOutput"
          v-model:ocp="ocp"
          v-model:scp="scp"
          v-model:otp="otp"
        />
      </view>
    </view>

    <!-- 底部重置 + 确认 -->
    <view class="bottom">
      <Reset @reset="handleReset" @confirm="handleConfirm" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, watch } from 'vue'
import Reset from './Reset.vue'
import Selector from './Selector.vue'
import SideBar from './SideBar.vue'

const props = defineProps<{
  popupKey: string
  clickClose?: () => void
}>()

const selectedDistance = defineModel<Array<Record<string, [number, number]>>>('selectedDistance', {
  default: () => [],
})
const selectedArea = defineModel<Array<Record<string, [number, number]>>>('selectedArea', {
  default: () => [],
})
const selectedPin = defineModel<Array<Record<string, [number, number]>>>('selectedPin', {
  default: () => [],
})

const selectedNormal = defineModel<string[]>('selectedNormal', {
  default: () => [],
})
const selectedType = defineModel<string[]>('selectedType', {
  default: () => [],
})

//para
type RangeMap = Record<string, [number, number]>

const selectedPhase = defineModel<RangeMap>('selectedPhase', {
  default: () => ({}),
})

const selectedInputVoltageMax = defineModel<RangeMap>('selectedInputVoltageMax', {
  default: () => ({}),
})

const selectedInputVoltageMin = defineModel<RangeMap>('selectedInputVoltageMin', {
  default: () => ({}),
})

const selectedOutputVoltageMax = defineModel<RangeMap>('selectedOutputVoltageMax', {
  default: () => ({}),
})

const selectedOutputVoltageMin = defineModel<RangeMap>('selectedOutputVoltageMin', {
  default: () => ({}),
})

const selectedOutputCurrentMax = defineModel<RangeMap>('selectedOutputCurrentMax', {
  default: () => ({}),
})

const selectedSwitchFreqMax = defineModel<RangeMap>('selectedSwitchFreqMax', {
  default: () => ({}),
})

const selectedVoltageAccuracy = defineModel<RangeMap>('selectedVoltageAccuracy', {
  default: () => ({}),
})

const selectedStaticCurrent = defineModel<RangeMap>('selectedStaticCurrent', {
  default: () => ({}),
})

const scenario = defineModel<string[]>('scenario', { default: () => [] })
const topologyConfig = defineModel<string[]>('topologyConfig', {
  default: () => [],
})
const topologyDevice = defineModel<string[]>('topologyDevice', {
  default: () => [],
})

const powerMode = defineModel<string[]>('powerMode', { default: () => [] })
const voltageConfigMode = defineModel<string[]>('voltageConfigMode', {
  default: () => [],
})
const communicationInterface = defineModel<string[]>('communicationInterface', {
  default: () => [],
})
const enableFunction = defineModel<string[]>('enableFunction', {
  default: () => [],
})
const lightLoadMode = defineModel<string[]>('lightLoadMode', {
  default: () => [],
})
const fullDutyMode = defineModel<string[]>('fullDutyMode', {
  default: () => [],
})
const softStart = defineModel<string[]>('softStart', { default: () => [] })
const dischargeOutput = defineModel<string[]>('dischargeOutput', {
  default: () => [],
})
const integratedLdo = defineModel<string[]>('integratedLdo', {
  default: () => [],
})
const freqSync = defineModel<string[]>('freqSync', { default: () => [] })
const voltageTracking = defineModel<string[]>('voltageTracking', {
  default: () => [],
})
const dynamicVoltage = defineModel<string[]>('dynamicVoltage', {
  default: () => [],
})
const powerIndicator = defineModel<string[]>('powerIndicator', {
  default: () => [],
})

const ovp = defineModel<string[]>('ovp', { default: () => [] })
const uvpInput = defineModel<string[]>('uvpInput', { default: () => [] })
const ovpOutput = defineModel<string[]>('ovpOutput', { default: () => [] })
const uvpOutput = defineModel<string[]>('uvpOutput', { default: () => [] })
const ocp = defineModel<string[]>('ocp', { default: () => [] })
const scp = defineModel<string[]>('scp', { default: () => [] })
const otp = defineModel<string[]>('otp', { default: () => [] })

// Emits
const emit = defineEmits<{
  (e: 'submit'): void
}>()

const selectedSideKey = ref('')

const packageTypes = [
  'QFP',
  'QFN',
  'DFN',
  'LGA',
  'BGA',
  'CSP',
  'SOP',
  'SM',
  'SOD',
  'SOT',
  'DIP',
  'TO',
]
const parameterTypes = ['应用场景', '拓扑架构', '参数指标', '特殊功能', '保护功能']

const { popupKey } = props

watch(
  () => props.popupKey,
  (newKey) => {
    if (newKey === 'package' && packageTypes.length) {
      selectedSideKey.value = packageTypes[0]
    } else if (newKey === 'param' && parameterTypes.length) {
      selectedSideKey.value = parameterTypes[0]
    }
  },
  { immediate: true },
)

// 侧边栏点击
const handleSideSelect = (val: string) => {
  selectedSideKey.value = val
}

const handleClose = () => {
  props.clickClose?.()
}

const clearPackageRange = () => {
  selectedDistance.value = []
  selectedArea.value = []
  selectedPin.value = []
}

const clearAllFilters = () => {
  // 封装类
  selectedDistance.value = []
  selectedArea.value = []
  selectedPin.value = []
  selectedNormal.value = []
  selectedType.value = []

  // 参数类（数值）
  selectedPhase.value = {}
  selectedInputVoltageMax.value = {}
  selectedInputVoltageMin.value = {}
  selectedOutputVoltageMax.value = {}
  selectedOutputVoltageMin.value = {}
  selectedOutputCurrentMax.value = {}
  selectedSwitchFreqMax.value = {}
  selectedVoltageAccuracy.value = {}
  selectedStaticCurrent.value = {}

  // 应用场景 & 架构
  scenario.value = []
  topologyConfig.value = []
  topologyDevice.value = []

  // 特殊功能
  powerMode.value = []
  voltageConfigMode.value = []
  communicationInterface.value = []
  enableFunction.value = []
  lightLoadMode.value = []
  fullDutyMode.value = []
  softStart.value = []
  dischargeOutput.value = []
  integratedLdo.value = []
  freqSync.value = []
  voltageTracking.value = []
  dynamicVoltage.value = []
  powerIndicator.value = []

  // 保护功能
  ovp.value = []
  uvpInput.value = []
  ovpOutput.value = []
  uvpOutput.value = []
  ocp.value = []
  scp.value = []
  otp.value = []

  // 可选：重置左侧菜单
  if (popupKey === 'package' && packageTypes.length) {
    selectedSideKey.value = packageTypes[0]
  } else if (popupKey === 'param' && parameterTypes.length) {
    selectedSideKey.value = parameterTypes[0]
  }
}

// ✅ 重置
const handleReset = () => {
  clearAllFilters()
  if (props.popupKey === 'package' && packageTypes.length) {
    selectedSideKey.value = packageTypes[0]
  } else if (props.popupKey === 'param' && parameterTypes.length) {
    selectedSideKey.value = parameterTypes[0]
  }
}

const handleConfirm = () => {
  emit('submit')
  selectedDistance.value = []
  selectedArea.value = []
  selectedPin.value = []
}
</script>

<style scoped>
.container {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #ffffff;
  box-shadow: 0rpx -10rpx 30rpx 2rpx rgba(0, 0, 0, 0.05);
  border-radius: 20rpx 20rpx 0rpx 0rpx;
}

.header {
  margin-top: 30rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.title {
  width: 128rpx;
  margin-left: 312rpx;
  height: 44rpx;
  font-weight: 500;
  font-size: 32rpx;
  color: #333333;
  line-height: 44rpx;
  text-align: left;
}
.cancle {
  margin-left: 232rpx;
  height: 32rpx;
  width: 32rpx;
}
.cancle image {
  width: 100%;
  height: 100%;
  display: block;
}
.divider {
  margin-top: 30rpx;
  margin-bottom: 30rpx;
  width: 690rpx;
  height: 0rpx;
  border: 2rpx solid #eeeeee;
}
.body {
  height: 1104rpx;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.side-bar {
  height: 100%;
  width: 172rpx;
}
.body .selector {
  flex: 1;
}
.bottom {
  width: 100%;
  height: 150rpx;
  border-top: 2rpx solid #eeeeee;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
}
</style>
