<route lang="json5" type="page">
{
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
    <fgNavbar leftText="AI芯片助手" />
    <template v-if="!messageList.length">
      <image class="logo" src="@/static/images/ai/logo.png" mode="scaleToFill" />
      <view class="text">
        请输入您的问题，例如:请输入您的问题，例如：请问TPS54140A的输出电压基准是多少
        、请介绍一下TPS54系列的芯片
      </view>
      <view class="search-item" @click="handleClick('请问TPS54140A的输出电压基准是多少')">
        <image class="logo2" src="@/static/images/ai/icon7.png" mode="scaleToFill" />
        <view class="text2">请问TPS54140A的输出电压基准是多少</view>
      </view>
      <view class="search-item" @click="handleClick('请介绍一下TPS54系列的芯片')">
        <image class="logo2" src="@/static/images/ai/icon7.png" mode="scaleToFill" />
        <view class="text2">请介绍一下TPS54系列的芯片</view>
      </view>
      <!-- <view class="search-item" @click="search">
        <image class="logo2" src="@/static/images/ai/icon7.png" mode="scaleToFill" />
        <view class="text2">推荐一款性价比较高的MCU</view>
      </view> -->
    </template>
    <template v-else>
      <scroll-view
        class="content-scroll"
        scroll-y
        @scroll="onScroll"
        :scroll-top="scrollTop"
        @scrolltolower="onScrollToLower"
        :scroll-with-animation="scrollWithAnimation"
      >
        <view class="pb-320rpx">
          <view
            v-for="item in messageList"
            :key="item.id"
            :class="item.role === 'user' ? 'message-list' : 'message-list2'"
          >
            <template v-if="item.role === 'user'">
              <view class="list1">{{ item.message }}</view>
            </template>
            <template v-else>
              <view v-if="isLoading" class="message-text">思考中...</view>
              <!-- <view class="flex items-center mb-20rpx">
              <image class="logo2" src="@/static/images/ai/icon7.png" mode="scaleToFill" />
              <view class="title-text">
                <text>找到</text>
                <text style="color: #2a7de1">{{ item.titleNum }}篇参考资料</text>
              </view>
            </view> -->
              <view class="message-text">
                <rich-text :nodes="marked(item.message)"></rich-text>
              </view>
            </template>
          </view>
        </view>
      </scroll-view>
    </template>
    <view class="search">
      <view class="search-content">
        <image
          class="icon4"
          v-if="!isAtBottom"
          @click="scroll"
          src="@/static/images/ai/icon8.png"
          mode="scaleToFill"
        />
        <view class="input-wrapper">
          <input
            class="my-input"
            v-model="value"
            :adjust-position="true"
            :cursor-spacing="50"
            placeholder="请输入您的问题"
            placeholder-style="color: #666666 ; font-size: 14px;"
          />
          <image
            class="icon3"
            v-if="isDone"
            @click="search"
            src="@/static/images/ai/icon6.png"
            mode="scaleToFill"
          />
          <image
            v-else
            class="icon3"
            @click="stop"
            src="@/static/images/ai/stop.png"
            mode="scaleToFill"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import fgNavbar from '@/components/fg-navbar/fg-navbar.vue'
import { marked } from 'marked'

const value = ref('')
const scrollWithAnimation = ref(true)
const scrollTop = ref()
const currentScrollTop = ref(0)
const isAtBottom = ref(true)
const handleClick = (str) => {
  const message = {
    id: messageList.value.length + 1,
    role: 'user',
    message: str,
  }
  messageList.value.push(message)
  fetchMessages(str)
}
const search = () => {
  if (!value.value.trim()) {
    uni.showToast({
      title: '请输入问题',
      icon: 'none',
    })
    return
  }
  const message = {
    id: messageList.value.length + 1,
    role: 'user',
    message: value.value,
  }
  messageList.value.push(message)
  fetchMessages(value.value)
}

const messageList = ref([])
const scroll = () => {
  scrollWithAnimation.value = true
  scrollTop.value = currentScrollTop.value + 200
}
// 监听滚动事件
const onScroll = (e: any) => {
  currentScrollTop.value = e.detail.scrollTop
  const { scrollTop } = e.detail
  // 简单的判断方式：如果scrollTop为0说明不在底部
  if (scrollTop < 0) {
    isAtBottom.value = false
  }
}
const onScrollToLower = () => {
  // 滚动到底部时触发
  isAtBottom.value = true
  console.log('已到达底部')
}
const scrollToBottom = () => {
  nextTick(() => {
    scrollWithAnimation.value = true
    scrollTop.value = 9999999
  })
}
//search()
const isLoading = ref(false)
const fetchMessages = async (value: string) => {
  isDone.value = false
  try {
    isLoading.value = true
    const message = {
      id: messageList.value.length + 1,
      role: 'ai',
      message: '',
    }
    messageList.value.push(message)
    await sendMsg(value)
  } catch (error) {
    console.error('Error fetching messages:', error)
  }
}

const isDone = ref(true)
const stop = async () => {
  isDone.value = true
  isLoading.value = false
  await closeWebSocket()
  setTimeout(() => {
    initSocket()
  }, 500)
}
const initSocket = async () => {
  await connectWebSocket('wss://junctionmagic.com/ws/111/messages')
  onMessage()
}

const wsUrl = ref('wss://junctionmagic.com/ws/111/messages')
const socket = ref<UniApp.SocketTask | null>()
const reconnectTimer = ref<number | null>(null)
const reconnectAttempts = ref<number>(0)
const MAX_RECONNECT_ATTEMPTS = ref(5)
const RECONNECT_INTERVAL = ref(2000) // 2秒
const tryReconnect = () => {
  if (reconnectAttempts.value >= MAX_RECONNECT_ATTEMPTS.value) {
    console.error('WebSocket 重连次数已达上限')
    return
  }
  if (reconnectTimer) return // 已有重连定时器
  reconnectAttempts.value++
  reconnectTimer.value = setTimeout(() => {
    console.log(`WebSocket 正在重连... 第${reconnectAttempts.value}次`)
    initSocket()
    reconnectTimer.value = null
  }, RECONNECT_INTERVAL.value) as unknown as number
}
const connectWebSocket = (url: string) => {
  if (socket.value) {
    socket.value.close()
    socket.value = null
  }

  socket.value = uni.connectSocket({
    url,
    success() {
      console.log('WebSocket 已连接')
    },
    fail(err) {
      console.error('WebSocket 连接失败', err)
      tryReconnect()
    },
  })

  socket.value.onOpen(() => {
    console.log('WebSocket 已开启')
    reconnectAttempts.value = 0
    if (reconnectTimer) {
      clearTimeout(reconnectTimer.value)
      reconnectTimer.value = null
    }
  })

  socket.value.onError((err) => {
    console.error('WebSocket 错误', err)
    tryReconnect()
  })

  socket.value.onClose(() => {
    console.log('WebSocket 已关闭')
    tryReconnect()
  })
}
const sendMsg = (msg: string) => {
  if (socket.value) {
    socket.value.send({ data: msg })
  }
}
const onMessage = () => {
  if (socket.value) {
    socket.value.onMessage((res) => {
      console.log('===', res)
      if (res.data) {
        isLoading.value = false
        const res1 = JSON.parse(res.data)
        res1.chunk ? (messageList.value[messageList.value.length - 1].message += res1.chunk) : ''
        nextTick(() => {
          scroll()
        })
        if (res1.done) {
          isDone.value = true
          isLoading.value = false
          if (value.value) {
            value.value = ''
          }
        }
      }
    })
  }
}
const closeWebSocket = () => {
  if (socket.value) {
    socket.value.close()
    socket.value = null
  }
  if (reconnectTimer) {
    clearTimeout(reconnectTimer.value)
    reconnectTimer.value = null
  }
  reconnectAttempts.value = 0
}
onLoad(() => {
  initSocket()
})
</script>

<style lang="scss" scoped>
.inner-wrapper {
  background: #f9f9f9;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .logo {
    width: 100rpx;
    height: 100rpx;
    min-height: 100rpx;
    margin: 62rpx auto 80rpx;
  }
  .text {
    min-height: 40rpx;
    font-weight: 400;
    font-size: 28rpx;
    color: #666666;
    line-height: 40rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
    margin: 0 40rpx;
    margin-bottom: 40rpx;
  }
  .search-item {
    height: 80rpx;
    background: #ffffff;
    border-radius: 20rpx 20rpx 20rpx 20rpx;
    border: 2rpx solid #eeeeee;
    box-sizing: border-box;
    margin: 0 40rpx;
    margin-bottom: 20rpx;
    padding: 0 30rpx;
    display: flex;
    align-items: center;
    .logo2 {
      width: 32rpx;
      height: 32rpx;
      margin-right: 16rpx;
    }
    .text2 {
      height: 34rpx;
      font-weight: 400;
      font-size: 24rpx;
      color: #666666;
      line-height: 34rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }
  .content-scroll {
    flex: 1;
    box-sizing: border-box;

    padding-top: 20rpx;
  }
  .search {
    width: 100%;
    position: absolute;
    bottom: 0;

    .search-content {
      padding: 0 20rpx;
      padding-bottom: 30rpx;
      height: 400rpx;
      max-height: 400rpx;
      box-sizing: border-box;
      //background: #f7f0f0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      background: linear-gradient(
        180deg,
        rgba(219, 223, 255, 0) 0%,

        #dbdfff 50%
      );
    }
    .input-wrapper {
      width: 100%;
      height: 100rpx;
      background: #ffffff;
      border-radius: 40rpx;
      border: 2rpx solid rgba(42, 125, 225, 0.5);
      box-sizing: border-box;
      padding-left: 40rpx;
      padding-right: 20rpx;
      display: flex;
      align-items: center;
    }
    .my-input {
      flex: 1;
      font-size: 24rpx;
      color: #000105;
    }
    .icon3 {
      width: 48rpx;
      height: 48rpx;
      margin-left: 50rpx;
    }
  }
}
.message-list {
  display: flex;
  justify-content: flex-end;
  margin-right: 40rpx;
  margin-bottom: 40rpx;
}
.message-text {
  font-weight: 400;
  font-size: 28rpx;
  color: #666666;
  line-height: 42rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
}
.message-list2 {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-left: 40rpx;
  margin-right: 40rpx;
  margin-bottom: 40rpx;
  .logo2 {
    width: 32rpx;
    height: 32rpx;
    margin-right: 16rpx;
  }
  .title-text {
    height: 34rpx;
    font-weight: 400;
    font-size: 24rpx;
    color: #333333;
    line-height: 34rpx;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}
.icon4 {
  width: 60rpx;
  height: 60rpx;
  margin-bottom: 24rpx;
}
.list1 {
  //width: 440rpx;
  max-width: 70%;
  background: linear-gradient(90deg, #2a7de1 0%, #2f80ed 100%);
  border-radius: 20rpx 4rpx 20rpx 20rpx;
  font-weight: 500;
  font-size: 28rpx;
  color: #ffffff;
  line-height: 40rpx;
  text-align: left;
  font-style: normal;
  text-transform: none;
  padding: 20rpx 40rpx;
  box-sizing: border-box;
}
</style>
