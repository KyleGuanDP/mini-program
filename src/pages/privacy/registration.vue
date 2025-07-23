<template>
  <view class="container">
    <scroll-view scroll-y class="scroll-box">
      <view class="title">用户注册协议</view>

      <view class="section">
        <view class="section-title">一、协议概述</view>
        <text class="paragraph">
          欢迎使用 Lumy-卓迈微信小程序（以下简称“Lumy
          小程序”），由杭州卓迈智能科技有限公司（以下简称“卓迈智能”或“我们”）运营。在注册成为用户之前，请您仔细阅读本《用户注册协议》（以下简称“本协议”），点击“同意并继续”即视为完全接受本协议内容。
        </text>
      </view>

      <view class="section">
        <view class="section-title">二、服务条款的确认与接纳</view>
        <text class="paragraph">
          用户确认具有享受服务的合法行为能力，并理解：本协议是具有法律约束力的合同。一旦注册成功，即成为本小程序正式用户。
        </text>
      </view>

      <view class="section">
        <view class="section-title">三、小程序服务</view>
        <text class="paragraph">
          用户应自备设备与网络接入条件，自行承担上网相关费用。用户在同意本协议的前提下可使用 Lumy
          小程序提供的各类服务。
        </text>
      </view>

      <view class="section">
        <view class="section-title">四、用户信息</view>
        <text class="paragraph">
          用户应保证注册信息真实有效，并妥善保管账户信息。如发生账户被盗、信息泄露，应及时联系我们。我们有权发送短信、邮件等通知信息。
        </text>
      </view>

      <view class="section">
        <view class="section-title">五、用户行为规范</view>
        <text class="paragraph">
          用户不得传播违法、暴力、色情、侮辱等内容；不得实施违法行为；不得侵犯他人权利。若违反，我们有权暂停或终止服务。
        </text>
      </view>

      <view class="section">
        <view class="section-title">六、不可抗力</view>
        <text class="paragraph">
          因自然灾害、战争、政策变更等不可抗力导致无法履约的，双方可延期或免责处理。
        </text>
      </view>

      <view class="section">
        <view class="section-title">七、知识产权</view>
        <text class="paragraph">
          本小程序所有内容、数据、软件均属卓迈智能所有，受到著作权法保护。用户在平台发表的内容，其相关权利归卓迈智能所有。
        </text>
      </view>

      <view class="section">
        <view class="section-title">八、责任声明</view>
        <text class="paragraph">
          本程序按“现状”提供服务，我们不对服务持续性、准确性或系统安全性做担保。用户应自担风险。
        </text>
      </view>

      <view class="section">
        <view class="section-title">九、协议更新</view>
        <text class="paragraph">
          卓迈智能保留随时修改本协议内容的权利。变更后的协议将通过平台公示，用户继续使用即视为同意。
        </text>
      </view>

      <view class="section">
        <view class="section-title">十、用户权益</view>
        <text class="paragraph">
          我们承诺保障您的知情权、选择权、信息安全权，采用 TLS1.3
          加密、仿真数据环境等手段保障数据传输与存储安全。
        </text>
      </view>

      <view class="section">
        <view class="section-title">十一、AI服务声明</view>
        <text class="paragraph">
          本平台提供的 AI
          功能内容由模型自动生成，仅供参考，不构成专业建议。用户需自行判断并承担相应后果。
        </text>
      </view>

      <view class="section">
        <view class="section-title">十二、法律适用</view>
        <text class="paragraph">
          本协议适用中华人民共和国法律，如有争议由卓迈智能所在地人民法院管辖。
        </text>
      </view>

      <view class="section">
        <view class="section-title">十三、其他</view>
        <text class="paragraph">
          若您点击“同意并继续”即表示您完全同意本协议内容，并确认阅读无误。如有建议请反馈，我们将持续优化。
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
