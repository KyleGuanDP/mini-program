<template>
  <scroll-view scroll-y class="scroll-container">
    <view class="container">
      <view class="element" v-for="item in selectedOptions" :key="item.label">
        <view class="title">{{ item.label }}</view>

        <!-- 数值范围 -->
        <view v-if="item.pin">
          <view class="pin-inputs">
            <input
              type="number"
              class="pin-input"
              :value="labelToParaRangeModelMap[item.label]?.value[item.label]?.[0] ?? ''"
              @input="onPinInput(item.label, 0, $event)"
              :placeholder="`最小值 (${item.pin[0]})`"
            />
            <text class="divider">~</text>
            <input
              type="number"
              class="pin-input"
              :value="labelToParaRangeModelMap[item.label]?.value[item.label]?.[1] ?? ''"
              @input="onPinInput(item.label, 1, $event)"
              :placeholder="`最大值 (${item.pin[1]})`"
            />
          </view>
        </view>

        <!-- 多选项 -->
        <view v-else class="selector">
          <view
            class="option"
            v-for="option in item.selector"
            :key="item.label + '-' + option"
            @click="() => toggleOption(item.label, option)"
            :class="{ selected: isOptionSelected(item.label, option) }"
          >
            {{ option }}
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import { defineProps, toRef, computed, ref, type Ref } from 'vue'

// 定义 RangeMap 类型（如果你还没定义）
type RangeMap = Array<Record<string, [number, number]>>
type RangeParaMap = Record<string, [number, number]>

const props = defineProps<{
  currentKey: string

  // 基础封装属性
  selectedDistance: RangeMap
  selectedArea: RangeMap
  selectedPin: RangeMap
  selectedNormal: string[]
  selectedType: string[]

  // 参数筛选字段
  selectedPhase: RangeParaMap
  selectedInputVoltageMax: RangeParaMap
  selectedInputVoltageMin: RangeParaMap
  selectedOutputVoltageMax: RangeParaMap
  selectedOutputVoltageMin: RangeParaMap
  selectedOutputCurrentMax: RangeParaMap
  selectedSwitchFreqMax: RangeParaMap
  selectedVoltageAccuracy: RangeParaMap
  selectedStaticCurrent: RangeParaMap

  scenario: string[]
  topologyConfig: string[]
  topologyDevice: string[]
  powerMode: string[]
  voltageConfigMode: string[]
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
  uvpOutput: string[]
  ovpOutput: string[]
  ocp: string[]
  scp: string[]
  otp: string[]
}>()

const isOptionSelected = (label: string, option: string): boolean => {
  const model = labelToArrayModelMap[label]
  return model?.value.includes(option) ?? false
}

const labelToArrayModelMap: Record<string, Ref<string[]>> = {
  封装类型: toRef(props, 'selectedType'),
  常见封装: toRef(props, 'selectedNormal'),
  应用场景: toRef(props, 'scenario'),
  功率器件配置方式: toRef(props, 'topologyConfig'),
  功率器件类型: toRef(props, 'topologyDevice'),

  工作模式: toRef(props, 'powerMode'),
  输出电压配置模式: toRef(props, 'voltageConfigMode'),
  通信接口: toRef(props, 'communicationInterface'),
  使能功能: toRef(props, 'enableFunction'),
  轻载模式: toRef(props, 'lightLoadMode'),
  满占空比运行: toRef(props, 'fullDutyMode'),
  软启动: toRef(props, 'softStart'),
  输出放电: toRef(props, 'dischargeOutput'),
  集成LDO: toRef(props, 'integratedLdo'),
  频率同步: toRef(props, 'freqSync'),
  电压跟随: toRef(props, 'voltageTracking'),
  动态调压: toRef(props, 'dynamicVoltage'),
  电源指示: toRef(props, 'powerIndicator'),

  输入过压保护: toRef(props, 'ovp'),
  输入欠压保护: toRef(props, 'uvpInput'),
  输出过压保护: toRef(props, 'ovpOutput'),
  输出欠压保护: toRef(props, 'uvpOutput'),
  输出过载保护: toRef(props, 'ocp'),
  输出短路保护: toRef(props, 'scp'),
  过温保护: toRef(props, 'otp'),
}

const labelToRangeModelMap: Record<string, Ref<RangeMap>> = {
  配置引脚数量: toRef(props, 'selectedPin'),
  脚间距: toRef(props, 'selectedDistance'),
  封装面积: toRef(props, 'selectedArea'),
}

const labelToParaRangeModelMap: Record<string, Ref<RangeParaMap>> = {
  电源相位数: toRef(props, 'selectedPhase'),
  最高输入电压: toRef(props, 'selectedInputVoltageMax'),
  最低输入电压: toRef(props, 'selectedInputVoltageMin'),
  最高输出电压: toRef(props, 'selectedOutputVoltageMax'),
  最小输出电压: toRef(props, 'selectedOutputVoltageMin'),
  最大输出电流: toRef(props, 'selectedOutputCurrentMax'),
  最高开关频率: toRef(props, 'selectedSwitchFreqMax'),
  输出电压精度: toRef(props, 'selectedVoltageAccuracy'),
  静态电流: toRef(props, 'selectedStaticCurrent'),
}

const dictionary = {
  应用场景: [{ label: '应用场景', selector: ['车规级', '消费级', '工业级'] }],
  拓扑架构: [
    {
      label: '功率器件配置方式',
      selector: ['单管集成(异步)', '双管集成(同步)', '外置(控制器)'],
    },
    { label: '功率器件类型', selector: ['MOSFET', 'GaN', 'SiC'] },
    { label: '电源相位数', selector: [], pin: [1, 20] },
  ],
  参数指标: [
    { label: '最高输入电压', selector: [], pin: [4, 200] },
    { label: '最低输入电压', selector: [], pin: [1, 10] },
    { label: '最高输出电压', selector: [], pin: [4, 200] },
    { label: '最小输出电压', selector: [], pin: [0.1, 2] },
    { label: '最大输出电流', selector: [], pin: [0.01, 100] },
    { label: '最高开关频率', selector: [], pin: [0.05, 10] },
    { label: '输出电压精度', selector: [], pin: [0.5, 5] },
    { label: '静态电流', selector: [], pin: [0.01, 500] },
  ],
  特殊功能: [
    { label: '工作模式', selector: ['同步', '异步'] },
    {
      label: '输出电压配置模式',
      selector: ['输出电压固定', '输出电压可调'],
    },
    {
      label: '通信接口',
      selector: ['I²C', 'PMBus', 'VID', 'AVSBUS', '其他'],
    },
    { label: '使能功能', selector: ['是', '否'] },
    { label: '轻载模式', selector: ['频率调制 PFM', '强制连续 FCCM'] },
    { label: '满占空比运行', selector: ['是', '否'] },
    { label: '软启动', selector: ['是', '否'] },
    { label: '输出放电', selector: ['是', '否'] },
    { label: '集成LDO', selector: ['是', '否'] },
    { label: '频率同步', selector: ['是', '否'] },
    { label: '电压跟随', selector: ['是', '否'] },
    { label: '动态调压', selector: ['是', '否'] },
    { label: '电源指示', selector: ['是', '否'] },
  ],
  保护功能: [
    { label: '输入过压保护', selector: ['是', '否'] },
    { label: '输入欠压保护', selector: ['是', '否'] },
    { label: '输出过压保护', selector: ['是', '否'] },
    { label: '输出欠压保护', selector: ['是', '否'] },
    { label: '输出过载保护', selector: ['是', '否'] },
    { label: '输出短路保护', selector: ['是', '否'] },
    { label: '过温保护', selector: ['是', '否'] },
  ],
  DIP: [
    { label: '封装类型', selector: ['DIP', 'DIP wide'] },
    { label: '配置引脚数量', selector: [], pin: [1, 16] },
    { label: '常见封装', selector: ['DIP7', 'DIP8', 'DIP14', 'DIP16'] },
  ],
  TO: [
    {
      label: '封装类型',
      selector: [
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
    },
    { label: '配置引脚数量', selector: [], pin: [1, 10] },
  ],
  SOP: [
    {
      label: '封装类型',
      selector: [
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
      ],
    },
    { label: '配置引脚数量', selector: [], pin: [1, 20] },
    // { label: '脚间距', selector: [], pin: [0.2, 1.0] },
    // { label: '封装体宽度', selector: [], pin: [1, 20] },
    {
      label: '常见封装',
      selector: ['SOP8', 'SOP14', 'SOP16', 'ESOP8', 'SSOP10'],
    },
  ],
  QFP: [
    { label: '封装类型', selector: ['QFP', 'LQFP', 'TQFP', 'VQFP'] },
    { label: '配置引脚数量', selector: [], pin: [8, 128] },
    // { label: '脚间距', selector: [], pin: [0.2, 1.0] },
    // { label: '封装面积', selector: [], pin: [1, 100] },
  ],
  QFN: [
    { label: '封装类型', selector: ['QFN', 'TQFN', 'VQFN'] },
    { label: '配置引脚数量', selector: [], pin: [8, 80] },
    // { label: '脚间距', selector: [], pin: [0.2, 1.0] },
    // // { label: '封装面积', selector: [], pin: [1, 100] },
  ],
  DFN: [
    { label: '封装类型', selector: ['DFN', 'TDFN'] },
    { label: '配置引脚数量', selector: [], pin: [2, 64] },
    // { label: '脚间距', selector: [], pin: [0.2, 1.0] },
    // { label: '封装面积', selector: [], pin: [1, 100] },
  ],
  LGA: [
    { label: '封装类型', selector: ['LGA'] },
    { label: '配置引脚数量', selector: [], pin: [4, 64] },
    // { label: '脚间距', selector: [], pin: [0.2, 1.0] },
    // { label: '封装面积', selector: [], pin: [1, 100] },
  ],
  BGA: [
    { label: '封装类型', selector: ['BGA'] },
    { label: '配置引脚数量', selector: [], pin: [16, 400] },
    // { label: '脚间距', selector: [], pin: [0.2, 1.27] },
    // { label: '封装面积', selector: [], pin: [1, 400] },
  ],
  CSP: [
    { label: '封装类型', selector: ['CSP', 'WLCSP', 'FCCSP'] },
    { label: '配置引脚数量', selector: [], pin: [4, 64] },
    // { label: '脚间距', selector: [], pin: [0.2, 1.0] },
    // { label: '封装面积', selector: [], pin: [1, 100] },
  ],
  SM: [
    { label: '封装类型', selector: ['SMA', 'SMB', 'SMC', 'SMD'] },
    { label: '配置引脚数量', selector: [], pin: [2, 6] },
  ],
  SOD: [
    {
      label: '封装类型',
      selector: [
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
    },
    { label: '配置引脚数量', selector: [], pin: [2, 6] },
  ],
  SOT: [
    {
      label: '封装类型',
      selector: [
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
      ],
    },
    { label: '配置引脚数量', selector: [], pin: [3, 6] },
    {
      label: '常见封装',
      selector: ['SOT23-3', 'SOT23-5', 'SOT23-6', 'SOT563', 'SOT89-3', 'TSOT23-6'],
    },
  ],
}

const selectedOptions = computed(() => {
  return dictionary[props.currentKey] || []
})

// 本地管理多选状态
const selectedOptionsMap = ref<Record<string, Set<string>>>({})

// toggle 多选
function toggleOption(label: string, value: string) {
  if (!selectedOptionsMap.value[label]) {
    selectedOptionsMap.value[label] = new Set()
  }

  const set = selectedOptionsMap.value[label]
  const model = labelToArrayModelMap[label]

  const isYesNo = value === '是' || value === '否'

  if (isYesNo) {
    if (set.has(value)) {
      set.delete(value)
      if (model) {
        model.value.splice(model.value.indexOf(value), 1)
      }
    } else {
      set.clear()
      set.add(value)
      if (model) {
        model.value.splice(0, model.value.length)
        model.value.push(value)
      }
    }
  } else {
    if (set.has(value)) {
      set.delete(value)
      model?.value.splice(model.value.indexOf(value), 1)
    } else {
      set.add(value)
      if (model && !model.value.includes(value)) {
        model.value.push(value)
      }
    }
  }

  // 触发响应式更新
  selectedOptionsMap.value = { ...selectedOptionsMap.value }
}

//本地记录数值输入（两个 input）
const pinRanges = ref<Record<string, Record<string, [number?, number?]>>>({})

function onPinInput(label: string, index: number, event: Event) {
  const target = event.target as HTMLInputElement
  const rawValue = target.value.trim()

  if (rawValue === '' || isNaN(+rawValue)) return
  const value = parseFloat(rawValue)
  const key = props.currentKey

  // 初始化封装类型对象
  if (!pinRanges.value[key]) {
    pinRanges.value[key] = {}
  }

  // 初始化 label 对应的区间值
  if (!pinRanges.value[key][label]) {
    pinRanges.value[key][label] = [undefined, undefined]
  }

  // 设置区间值
  pinRanges.value[key][label][index] = value

  const [min, max] = pinRanges.value[key][label]

  if (['配置引脚数量', '脚间距', '封装面积'].includes(label)) {
    const model = labelToRangeModelMap[label]
    if (model && typeof min === 'number' && typeof max === 'number') {
      model.value[key] = [min, max]
    }
  } else {
    const paraModel = labelToParaRangeModelMap[label]
    if (paraModel && typeof min === 'number' && typeof max === 'number') {
      if (!paraModel.value) {
        paraModel.value = {}
      }
      paraModel.value[label] = [min, max]
    }
  }

  // 触发响应式更新（可选）
  pinRanges.value = { ...pinRanges.value }
}
</script>

<style scoped>
.scroll-container {
  height: 100%;
  width: 100%;
}
.container {
  width: 100%;
  padding: 30rpx;
  display: flex;
  flex-direction: column;
  gap: 40rpx;
  padding-bottom: 100rpx;
}
.element {
  width: 100%;
}
.title {
  font-size: 28rpx;
  font-weight: 600;
  color: #000105;
  margin-bottom: 20rpx;
}
.selector {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}
.option {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 249rpx;
  height: 62rpx;
  background: #eeeeee;
  border-radius: 32rpx;
  font-size: 24rpx;
  color: #000105;
  line-height: 34rpx;
}
.option.selected {
  background: #fce6de;
  color: #e65925;
}
.option:hover {
  opacity: 0.8;
}
.pin-inputs {
  display: flex;
  align-items: center;
  gap: 20rpx;
  flex-wrap: wrap;
}
.pin-input {
  width: 160rpx;
  height: 62rpx;
  border: 2rpx solid #ccc;
  border-radius: 32rpx;
  text-align: center;
  font-size: 24rpx;
}
.divider {
  font-size: 28rpx;
  color: #666;
}
</style>
