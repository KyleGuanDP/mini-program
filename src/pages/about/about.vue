<template>
  <view class="container">
    <view class="card">
      <text class="title">关于我们</text>
      <text class="paragraph">
        在半导体行业和电子产品行业,查资料、找信息是刚需,也是最高频的需求。这部分工作预计占据行业从业人员工作时间的一半,解决这个环节的问题将对行业影响巨大。其中最为基础的产品信息集中在产品规格书中,产品规格书的收集、内容的解析、数据的归类直接影响了信息获取的效率和体验。
      </text>
      <text class="paragraph">
        Lumy是一款服务于电子产品制造商、芯片原厂、芯片代理商以及使用芯片设计开发方案的个人用户的智能芯片选型工具,她不仅可以提供业界最全、最新的生产商品牌的官方规格书,还可以提供来自生产商官方的方案开发套件资料；另外,她真正储备了各芯片领域的知识点和knowhow,以此为基础从底层上构建了一套半导体领域的专家知识系统,把纷繁复杂的芯片品类、庞大的芯片特征参数库以及千奇百怪的名词术语进行了统一,再借助符合行业用户习惯的多轮AI对话工具,从而可以帮助用户更精准、更便捷的查找器件解决方案（主要是芯片方案为主）。
      </text>
      <text class="paragraph">
        Lumy小程序集成了搜索选型、AI对话和个人中心三大版块的服务内容,她不仅可以帮助芯片下游用户大幅缩短选型时间和方案开发周期,大幅降低产品开发试错成本、提升工作效率；还可以帮助芯片用户解决技术支持的需求以及上下游对接交流的问题。
      </text>
      <text class="paragraph">
        Lumy应该是一个社区、一个生态,一个超级专业值得信赖且跟每一个行业参与者生活工作紧密相连的朋友。
      </text>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  padding: 40rpx;
  background-color: #f9f9f9;
  min-height: 100vh;
}

.card {
  background-color: #fff;
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
  color: #333;
}

.paragraph {
  font-size: 28rpx;
  color: #444;
  line-height: 48rpx;
  margin-bottom: 24rpx;
  display: block;
}
</style>
