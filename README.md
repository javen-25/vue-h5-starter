# H5 快速启动模板

为我自己准备的 H5 Web 起步模版，仅保留最基础的移动端开发配置。

> 网上有很多 H5 模板的开源项目，它们很优秀，但是包含了太多我不需要的功能，所有有了本项目。

## 包含的特性

- Vue 3，Vue Router，Pinia（支持持久化）：全家桶，好用，爱用

- TypeScript：宽松的规则配置，为了提供更好的代码提示和类型检查，而不是为了阻碍提交和构建

- Vite：我差一点就选 RsBuild 了（Vant 官方推荐，目前比 Vite 快的多）

- Vant 4：好看，好看

- Axios：本来想直接用 fetch ，但考虑到网页可能会在旧版本浏览器、安卓 webview、甚至一些不知名的环境下运行，还是用 axios 吧

- PostCSS：用来配置 px to vw 和 css 属性前缀补全

- MSW：mock 服务，前端自己调试页面的时候很好用

- normalize.css：后续可能会去掉，我觉得 * {padding: 0; margin: 0;} 已经够用了

## 快速开始

项目使用 npm 作为包管理器，你也可以使用 yarn 或者 pnpm。

1. 安装依赖，项目默认使用国内镜像，见 .npmrc

```bash
npm install
```

2. 运行开发服务

```bash
npm run dev
```

3. 打包生产环境

```bash
npm run build
```