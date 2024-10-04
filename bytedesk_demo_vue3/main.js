/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2021-07-26 23:22:16
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-10-03 11:23:39
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import App from './App'

// FIXME: i18n 报错
// 引入国际化设置插件
// 官方文档 https://uniapp.dcloud.net.cn/collocation/i18n
// 国际化 json 文件，文件内容详见下面的示例
import en from '@/components/bytedesk_sdk/i18n/en.json'
import cn from '@/components/bytedesk_sdk/i18n/cn.json'
const messages = {
    en,
    cn
}
let i18nConfig = {
  // 其中：中文填写 'cn', 英文填写 'en'
  locale: 'cn', // uni.getLocale(), // 获取已设置的语言
  messages,
  fallbackLocale: "zh", // 回退语言
}

// #ifndef VUE3
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18nVue2 = new VueI18n(i18nConfig)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  i18nVue2, // 国际化配置
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { createI18n } from "vue-i18n"
const i18n = createI18n(i18nConfig)
export function createApp() {
  const app = createSSRApp(App)
  app.use(i18n)
  return {
    app
  }
}
// #endif