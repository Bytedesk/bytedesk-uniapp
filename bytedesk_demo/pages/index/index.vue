<template>
	<view class="bytedesk">
		<uni-list>
			<uni-list-item title="联系客服" clickable @click="startWorkGroupChat()" showArrow />
			<!-- <uni-list-item title="TODO:用户信息" clickable @click="startChat()" showArrow /> -->
			<!-- <uni-list-item title="TODO:在线状态" clickable @click="startChat()" showArrow /> -->
			<!-- <uni-list-item title="TODO:历史会话" clickable @click="startChat()" showArrow /> -->
			<!-- <uni-list-item title="TODO:消息提示" clickable @click="startChat()" showArrow /> -->
			<!-- 如果不想集成SDK，也可以直接集成H5页面即可，其余操作均可忽略，只需一步集成H5链接即可 -->
			<uni-list-item title="H5客服" clickable @click="startH5Chat()" showArrow />
		</uni-list>
	</view>
</template>

<script>
// 萝卜丝第一步：引入js文件
import * as bytedesk from '@/components/bytedesk_kefu/js/api/bytedesk.js'

export default {
	data() {
		return {
			title: '',
			// 第二步：到 客服管理->技能组-有一列 ‘唯一ID（wId）’, 默认设置工作组wid
			// 说明：一个技能组可以分配多个客服，访客会按照一定的规则分配给组内的各个客服账号
			workGroupWid: '201807171659201', // 默认人工
			// workGroupWid: '201809061716221' // 默认机器人
			// 说明：直接发送给此一个客服账号，一对一会话
			agentUid: '201808221551193'
		}
	},
	onLoad() {
		// 萝卜丝第二步：初始化
		// 获取subDomain，也即企业号：登录后台->客服管理->客服账号->企业号
		let subDomain = 'vip'
		// 登录后台->渠道管理-》uniapp中创建应用获取
		let appKey = 'f4970e52-8cc8-48fd-84f6-82390640549d'
		bytedesk.init(subDomain, appKey);
	},
	methods: {
		// 萝卜丝第三步：开始会话
		startWorkGroupChat () {
			// console.log('start chat')
			uni.navigateTo({
				url: '../../components/bytedesk_kefu/chat?wid=' + this.workGroupWid + '&type=workGroup&aid=&title=萝卜丝'
			});
		},
		// 集成H5链接
		startH5Chat () {
			// 如果不想集成SDK，也可以直接集成H5页面即可，其余操作均可忽略，只需一步集成H5链接即可 
			// 登录管理后台：https://www.bytedesk.com/antv/user/login，直接在顶部导航栏获取客服链接代码即可
			let url = "https://www.bytedesk.com/chat?sub=vip&uid=201808221551193&wid=201807171659201&type=workGroup&hidenav=1&aid=&ph=ph";
			uni.navigateTo({
				url:"../../components/bytedesk_kefu/webview?url=" + encodeURIComponent(url)
			})
		},
	}
}
</script>

<style>

</style>
