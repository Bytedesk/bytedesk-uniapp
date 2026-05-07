# Visitor UniApp

Visitor UniApp 是 Bytedesk 访客端多端实现的参考版本，当前的原生 iOS、原生 Android 和 Flutter 访客应用都以它的三 tab 交互为对齐基线。

## 功能说明

- 三个 tab：首页、消息、我的。
- 首页提供普通会话、商品会话、订单会话等场景入口，点击后直接进入客服会话页。
- 消息页从线上 Bytedesk 接口拉取访客历史会话，并按会话类型跳转到对应会话。
- 我的页面支持在预置演示用户之间切换身份。
- chat 页面默认加载线上客服地址，不再依赖本地测试链接。

## 默认线上地址

- Chat 页面：https://cdn.weiyuai.cn
- API 地址：https://api.weiyuai.cn

默认地址定义在 common/demo-config.js 中。

## 关键文件

- pages/index/index.vue：首页场景列表
- pages/thread/index.vue：历史会话列表
- pages/profile/index.vue：演示用户切换
- pages/chat/index.vue：聊天 WebView 容器
- common/demo-config.js：默认访客资料、URL 构造、会话解析逻辑

## 使用步骤

该应用是 UniApp 项目，推荐直接通过 HBuilderX 导入运行。

1. 打开 HBuilderX。
2. 导入 frontend/apps/visitorUniapp 目录。
3. 在 HBuilderX 中运行到 H5，或运行到模拟器/真机。
4. 默认即可连接线上地址；如果需要切换，请修改 common/demo-config.js。

## 体验流程

1. 进入首页，点击任一场景卡片，直接打开客服会话页。
2. 进入消息页，拉取远端历史会话，点击某条会话继续沟通。
3. 进入我的页，切换不同预置用户，验证不同访客身份下的会话效果。

## 说明

- 默认 org 和工作组参数在 common/demo-config.js 中维护。
- 当前选中的演示用户会保存到本地，下次启动时自动恢复。
- 调试模式下，chat 页面可显示会话详情按钮用于排查问题。
