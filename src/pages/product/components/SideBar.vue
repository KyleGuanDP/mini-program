<template>
  <view class="sidebar">
    <scroll-view scroll-y class="sidebar-scroll">
      <view
        v-for="(item, index) in elements"
        :key="index"
        :class="[
          'sidebar-item',
          isSelected(index) ? 'active' : '',
          !isSelected(index) && isHighLight(item) ? 'highlight' : '',
        ]"
        @click="setActive(index)"
      >
        {{ item }}
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue'

const props = defineProps<{
  elements: string[]
  selected: string
  selectedNormal: string[]
  selectedType: string[]
  scenario: string[]
  topologyConfig: string[]
  topologyDevice: string[]
  powerMode: string[]
  voltageConfigMode: string[]
  //参数指标
  selectedInputVoltageMax: {}
  selectedInputVoltageMin: {}
  selectedOutputVoltageMax: {}
  selectedOutputVoltageMin: {}
  selectedOutputCurrentMax: {}
  selectedSwitchFreqMax: {}
  selectedVoltageAccuracy: {}
  selectedStaticCurrent: {}
  communicationInterface: string[]
  enableFunction: string[]
  lightLoadMode: string[]
  fullDutyMode: string[]
  softStart: string[]
  dischargeOutput: string[]
  integratedLdo: string[]
  freqSync: string[]
  voltageTracking: string[]
  dynamicVoltage: string[]
  powerIndicator: string[]
  ovp: string[]
  uvpInput: string[]
  ovpOutput: string[]
  uvpOutput: string[]
  ocp: string[]
  scp: string[]
  otp: string[]
}>()

const emit = defineEmits<{
  (e: 'clearPackageRange'): void
  (e: 'select', value: string): void
}>()

const activeIndex = ref(0)
const isSelected = (index: number) => index === activeIndex.value

const isHighLight = (item: string) => {
  const highlightMap: Record<string, string[]> = {
    QFP: ['QFP', 'LQFP', 'TQFP', 'VQFP'],
    QFN: ['QFN', 'TQFN', 'VQFN'],
    DFN: ['DFN', 'TDFN'],
    LGA: ['LGA'],
    BGA: ['BGA'],
    CSP: ['CSP', 'WLCSP', 'FCCSP'],
    SOP: [
      'SOP',
      'SOIC',
      'SSOP',
      'SOP Wide',
      'TSSOP',
      'TSOP',
      'SSOP Wide',
      'ESOP',
      'SOIC-EP',
      'TSOP-EP',
      'SSOP-EP',
      'TSSOP-EP',
      'ESOP Wide',
      'SSOP-EP Wide',
      'SOP8',
      'SOP14',
      'SOP16',
      'ESOP8',
      'SSOP10',
    ],
    SOT: [
      'SOT143',
      'SOT25',
      'SOT3XX',
      'SOT4XX',
      'SOT5X3',
      'SOT723',
      'SC70',
      'SOT89',
      'SOT9X3',
      'SOT223',
      'SOT23',
      'SOT23-3',
      'SOT23-5',
      'SOT23-6',
      'SOT563',
      'SOT89-3',
      'TSOT23-6',
    ],
    DIP: ['DIP', 'DIP wide', 'DIP7', 'DIP8', 'DIP14', 'DIP16'],
    TO: [
      'TO257',
      'TO251(IPAK)',
      'TO252(DPAK)',
      'TO204',
      'TO205',
      'TO220',
      'TO247',
      'TO254',
      'TO268',
      'TO264',
      'TO258',
      'TO259',
      'TO262(I2PAK)',
      'TO263(D2PAK)',
      'TO92',
      'TO276',
      'TO277',
    ],
    SM: ['SMA', 'SMB', 'SMC', 'SMD'],
    SOD: [
      'SOD923',
      'SOD882',
      'SOD123',
      'SOD132',
      'SOD128',
      'SOD142',
      'SOD323',
      'SOD523',
      'SOD723',
      'SOD962',
      'SDO992',
    ],
    应用场景: ['车规级', '消费级', '工业级'],
    拓扑架构: ['单管集成(异步)', '双管集成(同步)', '外置(控制器)', 'MOSFET', 'GaN', 'SiC'],
    参数指标: [],
    特殊功能: [],
    保护功能: [],
  }

  const types = highlightMap[item]
  if (!types) return false
  if (item == '应用场景') {
    if (props.scenario.length > 0) return true
  }
  if (item == '拓扑架构') {
    if (props.topologyConfig.length > 0 || props.topologyDevice.length > 0) return true
  }
  if (item == '参数指标') {
    let list = [
      'selectedInputVoltageMax',
      'selectedInputVoltageMin',
      'selectedOutputVoltageMax',
      'selectedOutputVoltageMin',
      'selectedOutputCurrentMax',
      'selectedSwitchFreqMax',
      'selectedVoltageAccuracy',
      'selectedStaticCurrent',
    ]
    let isTrue = false
    list.map((e) => {
      if (props[e]) {
        if (JSON.stringify(props[e]) != '{}') {
          isTrue = true
        }
      }
    })
    return isTrue
  }

  if (item == '特殊功能') {
    let list = [
      'powerMode',
      'voltageConfigMode',
      'communicationInterface',
      'enableFunction',
      'lightLoadMode',
      'fullDutyMode',
      'softStart',
      'dischargeOutput',
      'integratedLdo',
      'freqSync',
      'voltageTracking',
      'dynamicVoltage',
      'powerIndicator',
    ]
    let isTrue = false
    list.map((e) => {
      if (props[e].length > 0) {
        isTrue = true
      }
    })
    return isTrue
  }
  if (item == '保护功能') {
    let list = ['ovp', 'uvpInput', 'ovpOutput', 'uvpOutput', 'ocp', 'scp', 'otp']
    let isTrue = false
    list.map((e) => {
      if (props[e].length > 0) {
        isTrue = true
      }
    })
    return isTrue
  }

  return (
    types.some((type) => props.selectedType.includes(type)) ||
    types.some((type) => props.selectedNormal.includes(type))
  )
}

watch(
  () => props.selected,
  (val) => {
    const index = props.elements.findIndex((item) => item === val)
    if (index !== -1) {
      activeIndex.value = index
    }
  },
  { immediate: true },
)

const { elements, selected } = props

const setActive = (index: number) => {
  activeIndex.value = index
  emit('select', elements[index])
  emit('clearPackageRange')
}
</script>

<style scoped>
.sidebar {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.sidebar-scroll {
  height: 100%;
  width: 100%;
}

.sidebar-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  width: 172rpx;
  height: 98rpx;
  background: #eeeeee;
}

.sidebar-item.active {
  background-color: #ffffff;
  color: #e93b3d;
  font-weight: bold;
  border-left: 6rpx solid #e93b3d;
}

.sidebar-item.highlight {
  background-color: #eeeeee;
  color: #e93b3d;
  font-weight: bold;
}
</style>
