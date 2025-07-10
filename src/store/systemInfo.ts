import { defineStore } from 'pinia'
import { ref } from 'vue'
interface ISafeAreaInsets {
  top: number
  right: number
  bottom: number
  left: number
}
export const useSystemInfoStore = defineStore(
  'systemInfo',
  () => {
    // 获取屏幕边界到安全区域距离
    let safeAreaInsets = ref<ISafeAreaInsets>()
    let systemInfo = ref<any>()
    const menuInfoHeight = ref(0)
    // #ifdef MP-WEIXIN
    // 微信小程序使用新的API
    systemInfo.value = uni.getWindowInfo()
    console.log('systemInfo', systemInfo.value)

    safeAreaInsets.value = systemInfo.value?.safeArea
      ? {
          top: systemInfo.value.safeArea.top,
          right: systemInfo.value.windowWidth - systemInfo.value.safeArea.right,
          bottom: systemInfo.value.windowHeight - systemInfo.value.safeArea.bottom,
          left: systemInfo.value.safeArea.left,
        }
      : null
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    console.log('🚀 ~ menuButtonInfo:', menuButtonInfo)
    if (menuButtonInfo?.top) {
      safeAreaInsets.value.top = menuButtonInfo.top
    }
    if (menuButtonInfo?.height) {
      menuInfoHeight.value = menuButtonInfo.height
    }
    // #endif

    // #ifndef MP-WEIXIN
    // 其他平台继续使用uni API
    systemInfo.value = uni.getSystemInfoSync()
    safeAreaInsets.value = systemInfo.value.safeAreaInsets
    // #endif
    return {
      safeAreaInsets,
      systemInfo,
      menuInfoHeight,
    }
  },
  {
    persist: true,
  },
)
