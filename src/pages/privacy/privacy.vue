<template>
  <view class="container">
    <scroll-view scroll-y class="scroll-box">
      <view class="title">隐私协议</view>

      <view class="section">
        <view class="section-title">一、引言</view>
        <text class="paragraph">
          欢迎使用 Lumy
          小程序，由杭州卓迈智能科技有限公司开发与运营。请您务必仔细阅读并理解本《隐私协议》，您的注册或使用将被视为接受本协议。
        </text>
      </view>

      <view class="section">
        <view class="section-title">二、信息收集与使用</view>
        <text class="paragraph">
          我们可能在注册、登录或使用服务过程中收集必要信息，如手机号、设备信息等。若您拒绝提供，某些服务功能将无法正常使用。
        </text>
        <text class="paragraph">
          根据法律规定，以下情形可在未征得授权下收集信息：国家安全、公共利益、生命安全等情况。
        </text>
      </view>

      <view class="section">
        <view class="section-title">三、第三方服务</view>
        <text class="paragraph">
          为保障功能实现，我们可能接入第三方 SDK，涉及的信息收集遵循其隐私政策。
        </text>
      </view>

      <view class="section">
        <view class="section-title">四、信息共享与披露</view>
        <text class="paragraph">
          除获得明确同意或符合法律要求外，我们不会将您的信息共享、转让或公开披露。
        </text>
      </view>

      <view class="section">
        <view class="section-title">五、信息安全</view>
        <text class="paragraph">
          我们采用加密、权限控制等技术保障您的数据安全，并在账号注销或服务终止后清除您的个人信息。
        </text>
      </view>

      <view class="section">
        <view class="section-title">六、用户权利</view>
        <text class="paragraph">
          您有权访问、更正、删除您的个人信息，或通过注销账号撤回授权。我们将在30天内响应。
        </text>
      </view>

      <view class="section">
        <view class="section-title">七、未成年人保护</view>
        <text class="paragraph">
          若您未满18岁，应在监护人陪同并授权下使用本服务。我们将采取合理措施保障其信息安全。
        </text>
      </view>

      <view class="section">
        <view class="section-title">八、AI服务说明</view>
        <text class="paragraph">
          小程序内部分内容由 AI 自动生成，仅供参考，不构成法律、医疗或财务建议，风险自负。
        </text>
      </view>

      <view class="section">
        <view class="section-title">九、协议变更</view>
        <text class="paragraph">
          本协议将不定期更新。重大变更我们会通过页面提示、短信等方式通知您，并在征得同意后继续使用。
        </text>
      </view>

      <view class="section">
        <view class="section-title">十、联系我们</view>
        <text class="paragraph">
          如您有任何疑问或投诉，欢迎致电 153-7259-2199 联系我们。我们将在30天内处理您的请求。
        </text>
      </view>

      <view class="footer">更新日期：2025年7月22日</view>
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
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
