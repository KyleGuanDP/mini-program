// utils/ws.ts
let socket: UniApp.SocketTask | null = null
let reconnectTimer: number | null = null
let reconnectAttempts = 0
const MAX_RECONNECT_ATTEMPTS = 5
const RECONNECT_INTERVAL = 2000 // 2秒

let wsUrl = ''

let closeCallbacks: Array<() => void> = []

export function connectWebSocket(url: string) {
  wsUrl = url
  if (socket) {
    socket.close()
    socket = null
  }

  socket = uni.connectSocket({
    url,
    success() {
      console.log('WebSocket 已连接')
    },
    fail(err) {
      console.error('WebSocket 连接失败', err)
      tryReconnect()
    },
  })

  socket.onOpen(() => {
    console.log('WebSocket 已开启')
    reconnectAttempts = 0
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
      reconnectTimer = null
    }
  })

  socket.onError((err) => {
    console.error('WebSocket 错误', err)
    tryReconnect()
  })

  socket.onClose(() => {
    console.log('WebSocket 已关闭')
    closeCallbacks.forEach((cb) => cb())
    tryReconnect()
  })
}

function tryReconnect() {
  if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
    console.error('WebSocket 重连次数已达上限')
    return
  }
  if (reconnectTimer) return // 已有重连定时器
  reconnectAttempts++
  reconnectTimer = setTimeout(() => {
    console.log(`WebSocket 正在重连... 第${reconnectAttempts}次`)
    connectWebSocket(wsUrl)
    reconnectTimer = null
  }, RECONNECT_INTERVAL) as unknown as number
}

export function sendMsg(msg: string) {
  console.log('socket', socket)

  if (socket) {
    socket.send({ data: msg })
  }
}

export function onMessage(callback: (data: string) => void) {
  if (socket) {
    socket.onMessage((res) => {
      callback(res.data)
    })
  }
}

export function closeWebSocket() {
  if (socket) {
    socket.close()
    socket = null
  }
  if (reconnectTimer) {
    clearTimeout(reconnectTimer)
    reconnectTimer = null
  }
  reconnectAttempts = 0
}

// 新增：注册关闭回调
export function onSocketClose(callback: () => void) {
  closeCallbacks.push(callback)
}
