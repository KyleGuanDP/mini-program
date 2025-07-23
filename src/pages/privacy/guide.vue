<template>
  <view class="container">
    <scroll-view scroll-y class="scroll-box">
      <view class="title">用户隐私保护指引</view>

      <view class="section">
        <view class="section-title">一、我们收集的信息</view>
        <text class="paragraph">
          在取得您明确同意的前提下，我们可能会收集以下信息：
          <br />
          1. 用于展示头像和昵称：您的微信昵称和头像。
          <br />
          2. 用于实现登录功能：您的手机号码。
        </text>
      </view>

      <view class="section">
        <view class="section-title">二、第三方插件/SDK使用</view>
        <text class="paragraph">
          为实现特定功能，Lumy 小程序可能集成第三方插件/SDK，其信息处理规则请以其官方隐私政策为准。
          <br />
          当前已接入插件如下：插件名称：暂无；提供方：暂无。
        </text>
      </view>

      <view class="section">
        <view class="section-title">三、用户的权利</view>
        <text class="paragraph">
          1. 您可通过：“...” → “设置” → “小程序已获取的信息” →
          通知开发者删除，我们将在收到后及时处理。
          <br />
          2. 可联系开发者行使查阅、更正、删除等权利。
          <br />
          3. 注册用户可申请注销账号，15 个工作日内完成处理。
          <br />
          联系电话：15372592199
        </text>
      </view>

      <view class="section">
        <view class="section-title">四、信息存储</view>
        <text class="paragraph">
          我们仅在实现目的所需的最短期间内保留您的个人信息，除非法律另有规定。
        </text>
      </view>

      <view class="section">
        <view class="section-title">五、信息使用规则</view>
        <text class="paragraph">
          1. 信息仅用于本指引所列目的。
          <br />
          2. 如使用目的变更，将通过邮件另行征得您同意。
        </text>
      </view>

      <view class="section">
        <view class="section-title">六、信息共享与披露</view>
        <text class="paragraph">
          1. 未经授权，我们不会共享或转让您的信息。
          <br />
          2. 公开披露前将说明披露目的、内容和风险，并征得您同意。
        </text>
      </view>

      <view class="section">
        <view class="section-title">七、问题反馈与投诉</view>
        <text class="paragraph">如有问题可联系开发者或微信平台投诉。联系电话：15372592199</text>
      </view>

      <view class="section">
        <view class="section-title">八、未成年人条款</view>
        <text class="paragraph">若您为未成年人，请在监护人陪同下阅读和使用本小程序。</text>
      </view>

      <view class="section">
        <view class="section-title">九、境外用户</view>
        <text class="paragraph">中国大陆以外用户还需遵守其本地法律。</text>
      </view>

      <view class="section">
        <view class="section-title">十、信息采集说明</view>
        <text class="paragraph">
          为保证服务正常运行，Lumy 小程序将依据必要性收集信息。我们将以高度审慎态度保护您的数据。
        </text>
      </view>

      <view class="footer">
        更新日期：2025年7月22日
        <br />
        生效日期：2025年7月22日
      </view>
    </scroll-view>
  </view>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
}

.scroll-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  height: 100%;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40rpx;
  color: #222;
}

.section {
  margin-bottom: 32rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: 600;
  margin-bottom: 16rpx;
  color: #1a1a1a;
}

.paragraph {
  font-size: 28rpx;
  line-height: 1.8;
  color: #444;
}

.footer {
  font-size: 24rpx;
  text-align: center;
  color: #888;
  margin-top: 40rpx;
}
</style>
