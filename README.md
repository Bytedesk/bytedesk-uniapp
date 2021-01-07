# 萝卜丝智能客服

- [官网](https://www.bytedesk.com/)
- 全部基于vuejs开发，不依赖原生SDK，全开源
- 支持web/h5/小程序/安卓/iOS等全平台

## Demo下载

- [Gitee Demo](https://gitee.com/270580156/bytedesk-uniapp)
- [Github Demo](https://github.com/Bytedesk/bytedesk-uniapp)

## 使用步骤说明

- 首先：将 bytedesk_kefu 文件夹拷贝到 components 文件夹，
- 然后：在pages.json中添加此两个页面，具体可参考demo中pages.json文件
```js
{
	"path": "components/bytedesk_kefu/chat",
	"style": {
		"navigationBarTitleText": "萝卜丝智能客服"
	}
},
{
	"path": "components/bytedesk_kefu/webview",
	"style": {
		"navigationBarTitleText": "萝卜丝智能客服"
	}
}
```
- 第一步：在调用客服的vue页面，如：index.vue，引入
```js
import * as bytedesk from '@/components/bytedesk_kefu/js/api/bytedesk.js'
```
- 第二步：在index.vue页面onLooad函数
```js
// 萝卜丝第二步：初始化
// 获取subDomain，也即企业号：登录后台->客服管理->客服账号->企业号
let subDomain = 'vip'
// 登录后台->渠道管理-》uniapp中创建应用获取
let appKey = 'f4970e52-8cc8-48fd-84f6-82390640549d'
bytedesk.init(subDomain, appKey);
```
- 第三步：开始会话
```js
startChat () {
	// console.log('start chat')
	uni.navigateTo({
		url: '../../components/bytedesk_kefu/chat?wid=' + this.workGroupWid + '&type=workGroup&aid=&title=萝卜丝'
	});
}
```
- 结束
- 具体请参考demo中index.vue页面
