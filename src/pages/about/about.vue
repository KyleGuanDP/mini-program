<template>
  <view class="container">
    <scroll-view scroll-y class="scroll-box">
      <view class="scroll-content-wrapper">
        <view class="content">
          <view>
            Lumy 诞生于半导体与人工智能深度融合的时代浪潮中，以“推动中国电子产业的创新式发展”为使命，致力于将人工智能技术与半导体领域全产业链经验深度融合，助力中国电子产业在全球竞争中实现智能化跃升。
          </view>
          <view>
            Lumy 是由杭州卓迈智能科技有限公司打造的半导体行业人工智能助手。其基于通用大模型技术，深度融合半导体行业专家知识系统构建而成，不仅可为用户提供精准、完整的智能方案选型服务，更能深度结合半导体行业具体业务场景，提供专业的智能推荐服务。
          </view>
          <view>
            Lumy 创始团队汇聚了兼具顶尖大厂实战经验与硬核创新能力的行业专家，如 A 股芯片上市公司联合创始人、阿里巴巴等国内互联网大厂技术专家等。团队成员深耕半导体与人工智能领域，平均从业年限超 15 年，深度理解行业痛点与发展趋势，是一支兼具半导体全产业链实战经验与 AI 原生研发能力的“全能型”团队。
            作为 Lumy 的运营主体，杭州卓迈智能科技有限公司秉持“以创新为动力，持续为客户创造价值”的理念。基于对半导体产业各环节的精准把控，公司将人工智能技术深度应用于产品开发、应用方案设计、器件评估与选型等环节，有效帮助客户缩短方案开发周期、加快产品推广速度、提升产品创新能力、降低管理成本。同时，依托 AI 驱动的数据分析能力，公司构建产业链协同服务，穿透行业信息屏障，实现方案从选型到采购的全局资源优化，致力于成为全球领先的半导体行业赋能平台。
          </view>
          <view>
            “卓迈”之名承载着创始团队对技术突破与产业变革的坚定信念——“卓”寓意追求卓越技术，源于团队在半导体领域十余年全链条深耕的深厚积淀；“迈”象征开拓创新，代表以人工智能为驱动，推动行业向高效、智能的创新模式迈进。英文名“Junction Magic”巧妙融合了“产业联结（Junction）”与“创新魔力（Magic）”，传递了“以技术联结产业生态，以智能革新产业价值”的品牌内核。
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts" setup></script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.scroll-box {
  flex: 1;
  width: 100%;
}

.scroll-content-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.content {
  background: #ffffff;
  border-radius: 15rpx 15rpx 15rpx 15rpx;
  border: 2rpx solid rgba(211, 211, 211, 0);
  width: 90%;
  max-width: 700rpx;
  display: flex;
  flex-direction: column;
  padding: 30rpx;
  box-sizing: border-box;
}

.content view {
  margin-bottom: 40rpx;
  font-family:
    PingFang SC,
    PingFang SC;
  font-weight: 400;
  font-size: 23rpx;
  color: #000000;
  line-height: 42rpx;
  text-align: justified;
  font-style: normal;
  text-transform: none;
}
</style>
