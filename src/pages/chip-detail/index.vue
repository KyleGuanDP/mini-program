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
    <fgNavbar leftText="芯片详情" />
    <scroll-view scroll-y class="scroll-content">
      <infoCard :data="detail" />
      <detailCard :data="detail" class="card-two" />
    </scroll-view>
  </view>
</template>

<script lang="ts" setup>
import { getChipDetail } from '@/api/chip'
import fgNavbar from '@/components/fg-navbar/fg-navbar.vue'
import detailCard from './components/detail-card.vue'
import infoCard from './components/infoCard.vue'
interface TechnicalPaperFile {
  name: string
  path: string
}
interface Package {
  type: string
  type_std: string
  pin_count: number
  length: number
  width: number
  hight: number
}
interface IChip {
  pid: string
  part_number: string
  category_lv1: string
  category_lv2: string
  category_lv3: string
  part_number_title: string
  feature: string
  description: string
  applications: string
  typical_application_circuit: string
  pin_config: string
  function_block_diagram: string
  company_name: string
  country: string
  automotive_grade: boolean
  industry_grade: boolean
  consumer_grade: boolean
  package: Package[]
  technical_paper_file: TechnicalPaperFile[]
  reference_design_file: TechnicalPaperFile[]
  simulation_model: TechnicalPaperFile[]
  cad_file: TechnicalPaperFile[]
  industry_information: TechnicalPaperFile[]
}
const detail = ref<IChip>()
const chipId = ref('')
const getData = async () => {
  try {
    const res: any = await getChipDetail({
      id: chipId.value,
    })

    console.log('获取芯片详情', res)
    detail.value = res.data
  } catch (error) {
    console.log(error)
  }
}
onLoad((option) => {
  // 初始化数据
  if (option.id) {
    // 从列表跳转过来
    console.log(option.id)
    chipId.value = option.id
    getData()
  }
  //getData()
})
onShareAppMessage(() => {
  return {
    title: 'junctionMagic',
    path: `/pages/chip-detail/index?from=share&id=${chipId.value}`, // 可带参数
    //imageUrl: 'https://yourdomain.com/share.jpg', // 可选，自定义封面图
  }
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
  padding-bottom: 20rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.card-two {
  flex: 1;
}
</style>
