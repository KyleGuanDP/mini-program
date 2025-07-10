import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'unibest',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#f8f8f8',
    enablePullDownRefresh: false,
    disableScroll: true,
  },
  easycom: {
    autoscan: true,
    custom: {
      '^fg-(.*)': '@/components/fg-$1/fg-$1.vue',
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  // 如果不需要tabBar，推荐使用 spa 模板。（pnpm create xxx -t spa）
  tabBar: {
    color: '#7E7F81 ',
    selectedColor: '#F58B73',
    backgroundColor: '#FFFFFF',
    height: '64px',
    fontSize: '12px',
    iconWidth: '20px',
    spacing: '2px',
    list: [
      {
        iconPath: 'static/tabbar/homepage.png',
        selectedIconPath: 'static/tabbar/homepage_activate.png',
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        iconPath: 'static/tabbar/ai.png',
        selectedIconPath: 'static/tabbar/ai_activate.png',
        pagePath: 'pages/ai/index',
        text: 'AI咨询',
      },
      // {
      //   iconPath: 'static/tabbar/personal_center.png',
      //   selectedIconPath: 'static/tabbar/personal_center_activate.png',
      //   pagePath: 'pages/mine/index',
      //   text: '我的',
      // },
    ],
  },
})
