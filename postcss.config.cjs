const pxToViewport = require('postcss-px-to-viewport-8-plugin')

module.exports = {
  plugins: [
    pxToViewport({
      viewportWidth: 375,
      unitPrecision: 6,
      viewportUnit: 'vw',
      // 以类名前缀 "ignore-" 标记不需要转换的选择器
      selectorBlackList: ['ignore-'],
      minPixelValue: 1,
      mediaQuery: false,
      // 仅包含项目源码与 Vant 的样式参与转换，避免影响其它依赖库
      include: [/src/, /node_modules[\/]vant/],
      landscape: false,
    }),
  ],
}
