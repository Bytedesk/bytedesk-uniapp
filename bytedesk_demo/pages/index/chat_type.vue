<template>
	<view class="bytedesk">
		<uni-section title="技能组客服" type="line"></uni-section>
		<uni-list :border="true">
			<!-- 技能组客服会话-支持多个客服 -->
			<uni-list-item title="技能组客服" clickable @click="startWorkGroupChat()" note="默认人工" showArrow />
			<!-- <uni-list-item title="TODO:技能组客服-机器人" clickable @click="startWorkGroupChatRobot()" note="默认机器人(服务器设置)" showArrow /> -->
			<!-- <uni-list-item title="TODO:技能组客服-电商" clickable @click="startWorkGroupChatShop()" note="自动发送商品信息" showArrow /> -->
			<!-- <uni-list-item title="TODO:技能组客服-附言" clickable @click="startWorkGroupChatPostscript()" note="自动发送附言" showArrow /> -->
		</uni-list>
		<uni-section title="指定客服" type="line"></uni-section>
		<uni-list :border="true">
			<!-- 指定客服-支持一对一客服 -->
			<uni-list-item title="指定客服" clickable @click="startAppointedChat()" note="默认人工" showArrow />
			<!-- <uni-list-item title="TODO:指定客服-电商" clickable @click="startAppointedChatShop()" note="自动发送商品信息" showArrow /> -->
			<!-- <uni-list-item title="TODO:指定客服-附言" clickable @click="startAppointedChatPostscript()" note="自动发送附言" showArrow /> -->
		</uni-list>
		<uni-section title="H5客服" type="line"></uni-section>
		<uni-list :border="true">
			<!-- 如果不想集成SDK，也可以直接集成H5页面即可，其余操作均可忽略，只需一步集成H5链接即可 -->
			<uni-list-item title="H5客服" clickable @click="startH5Chat()" showArrow />
		</uni-list>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 第二步：到 客服管理->技能组-有一列 ‘唯一ID（wId）’, 默认设置工作组wid
			// 说明：一个技能组可以分配多个客服，访客会按照一定的规则分配给组内的各个客服账号
			workGroupWid: '201807171659201', // 默认人工
			workGroupWidRobot: '201809061716221', // 默认机器人, 在管理后台开启或关闭机器人
			// 说明：直接发送给此一个客服账号，一对一会话
			agentUid: '201808221551193'
		}
	},
	methods: {
		// 萝卜丝第三步：开始会话
		// 技能组会话
		startWorkGroupChat () {
			uni.navigateTo({
				url: '../../components/bytedesk_kefu/chat?wid=' + this.workGroupWid + '&type=workGroup&aid=&title=萝卜丝'
			});
		},
		startWorkGroupChatRobot () {
			// 服务器端设置此技能组为默认机器人
			uni.navigateTo({
				url: '../../components/bytedesk_kefu/chat?wid=' + this.workGroupWidRobot + '&type=workGroup&aid=&title=萝卜丝'
			});
		},
		startWorkGroupChatShop () {
			// 发送商品信息
			uni.navigateTo({
				url: '../../components/bytedesk_kefu/chat?wid=' + this.workGroupWidRobot + '&type=workGroup&aid=&title=萝卜丝'
			});
		},
		startWorkGroupChatPostscript () {
			// 发送附言
			uni.navigateTo({
				url: '../../components/bytedesk_kefu/chat?wid=' + this.workGroupWidRobot + '&type=workGroup&aid=&title=萝卜丝'
			});
		},
		// 一对一会话
		startAppointedChat () {
			uni.navigateTo({
				url: '../../components/bytedesk_kefu/chat?wid=&type=appointed&aid=' + this.agentUid + '&title=萝卜丝'
			});
		},
		startAppointedChatShop () {
			// 发送商品信息
			uni.navigateTo({
				url: '../../components/bytedesk_kefu/chat?wid=&type=appointed&aid=' + this.agentUid + '&title=萝卜丝'
			});
		},
		startAppointedChatPostscript () {
			// 发送附言信息
			uni.navigateTo({
				url: '../../components/bytedesk_kefu/chat?wid=&type=appointed&aid=' + this.agentUid + '&title=萝卜丝'
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
