<template>
	<view class="bytedesk">
		<!-- <uni-section title="未读消息数目" type="line"></uni-section> -->
		<!-- <uni-list :border="true">
			<uni-list-item title="未读消息数目" :note="unreadMessageCount"/>
		</uni-list> -->
		<uni-section title="技能组客服(可按规则分配多个客服)" type="line"></uni-section>
		<uni-list :border="true">
			<!-- 技能组客服会话-支持多个客服 -->
			<uni-list-item title="技能组客服" clickable @click="startWorkGroupChat()" note="默认人工" showArrow />
			<!-- <uni-list-item title="技能组客服-电商" clickable @click="startWorkGroupChatShop()" note="自动发送商品信息" showArrow /> -->
			<!-- <uni-list-item title="技能组客服-附言" clickable @click="startWorkGroupChatPostscript()" note="自动发送附言" showArrow /> -->
		</uni-list>
		<uni-section title="指定客服(分配固定一个客服)" type="line"></uni-section>
		<uni-list :border="true">
			<!-- 指定客服-支持一对一客服 -->
			<uni-list-item title="指定客服" clickable @click="startAppointedChat()" note="默认人工" showArrow />
			<!-- <uni-list-item title="指定客服-电商" clickable @click="startAppointedChatShop()" note="自动发送商品信息" showArrow /> -->
			<!-- <uni-list-item title="指定客服-附言" clickable @click="startAppointedChatPostscript()" note="自动发送附言" showArrow /> -->
		</uni-list>
		<uni-section title="H5客服" type="line"></uni-section>
		<uni-list :border="true">
			<!-- 如果不想集成SDK，也可以直接集成H5页面即可，其余操作均可忽略，只需一步集成H5链接即可 -->
			<uni-list-item title="H5客服" clickable @click="startH5Chat()" note="H5客服一步搞定" showArrow />
		</uni-list>
		<!-- <uni-section title="视频客服" type="line"></uni-section>
		<uni-list :border="true">
			<uni-list-item title="视频客服" clickable @click="startVideoChat()" note="视频客服一步搞定" showArrow />
		</uni-list> -->
		<!-- <uni-section title="TODO:小程序码" type="line"></uni-section> -->
		<!-- <uni-list :border="true"> -->
			<!-- 服务器端生成小程序码 -->
			<!-- <uni-list-item title="技能组客服" clickable @click="startWorkGroupQrcodeChat()" note="服务器生成小程序码" showArrow /> -->
			<!-- <uni-list-item title="指定客服" clickable @click="startAgentQrcodeChat()" note="服务器生成小程序码" showArrow /> -->
		<!-- </uni-list> -->
	</view>
</template>

<script>
// 引入js文件
// import * as httpApi from '@/components/bytedesk_sdk/js/httpapi.js'

export default {
	data() {
		return {
			// 未读消息数目
			unreadMessageCount: "0",
			// 获取技能组uid，登录后台->客服->渠道->uniapp
			// http://www.weiyuai.cn/admin/cs/channel
			workGroupUid: 'df_wg_uid', // 默认人工
			// 获取指定客服uid，登录后台->客服->渠道->uniapp
			// http://www.weiyuai.cn/admin/cs/channel
			agentUid: 'df_ag_uid'
		}
	},
	onLoad(option) {
		// 监听点击商品回调
		uni.$on('commodity',function(content) {
			console.log('点击商品回调:', content);
		})
		// 加载未读消息数目
		// this.getUnreadCountVisitor()
	},
	onUnload() {
	    // 移除点击商品回调监听
		uni.$off('commodity'); 
	},
	methods: {
		// 微语三步：开始会话
		// 参数说明：
		// postscript 附言，在连接成功客服之后，自动将此消息发送给客服
		// 技能组会话
		startWorkGroupChat () {
			uni.navigateTo({
				url: '../../components/bytedesk_sdk/chat-kf?sid=' + this.workGroupWid + '&type=1'
			});
		},
		// startWorkGroupChatShop () {
		// 	// 增加商品信息参数
		// 	// uni.navigateTo({
		// 	// 	url: '../../components/bytedesk_sdk/chat-kf?sid=' + this.workGroupWid + '&type=1&title=微语&goods=1&goods_categoryCode=101&goods_content=商品详情&goods_id=123&goods_imageUrl=https://bytedesk.oss-cn-shenzhen.aliyuncs.com/images/123.webp&goods_price=1000&goods_title=商品标题&goods_url=https://item.m.jd.com/product/12172344.html&&lang=cn'
		// 	// });
		// 	// url编码
		// 	let goodsUrl = encodeURI('https://item.m.jd.com/product/12172344.html')
		// 	// 增加商品信息参数
		// 	uni.navigateTo({
		// 		url: '../../components/bytedesk_sdk/chat-kf?sid='
		// 	});
		// },
		// startWorkGroupChatPostscript () {
		// 	// 增加附言参数：postscript=这是附言自动发送给客服
		// 	uni.navigateTo({
		// 		url: '../../components/bytedesk_sdk/chat-kf?sid=&type=1&title=微语postscript=这是附言自动发送给客服'
		// 	});
		// },
		// 一对一会话
		startAppointedChat () {
			uni.navigateTo({
				url: '../../components/bytedesk_sdk/chat-kf?sid=' + this.agentUid + '&type=0'
			});
		},
		// startAppointedChatShop () {
		// 	// 增加商品信息参数
		// 	// uni.navigateTo({
		// 	// 	url: '../../components/bytedesk_sdk/chat-kf?sid=&type=0d' + this.agentUid + '&title=微语goods=1&goods_categoryCode=101&goods_content=商品详情&goods_id=123&goods_imageUrl=https://bytedesk.oss-cn-shenzhen.aliyuncs.com/images/123.webp&goods_price=1000&goods_title=商品标题哈哈哈哈哈哈哈哈哈哈或或或或或或或或或&goods_url=https://item.m.jd.com/product/12172344.html&&lang=cn'
		// 	// });
		// 	// url编码
		// 	let goodsUrl = encodeURI('https://item.m.jd.com/product/12172344.html')
		// 	// 增加商品信息参数
		// 	uni.navigateTo({
		// 		url: '../../components/bytedesk_sdk/chat-kf?sid=&type=0d&title=微语'
		// 	});
		// },
		// startAppointedChatPostscript () {
		// 	// 增加附言参数：postscript=这是附言自动发送给客服
		// 	uni.navigateTo({
		// 		url: '../../components/bytedesk_sdk/chat-kf?sid=&type=0d&title=微语postscript=这是附言自动发送给客服'
		// 	});
		// },
		// 集成H5链接
		startH5Chat () {
			// 如果不想集成SDK，也可以直接集成H5页面即可，其余操作均可忽略，只需一步集成H5链接即可 
			// 登录管理后台：https://www.weiyuai.cn/admin，客服-》技能组-》获取组客服代码
			let url = "https://www.weiyuai.cn/chat/?org=df_org_uid&t=1&sid=df_wg_uid&navbar=0&";
			uni.navigateTo({
				url:"../../components/bytedesk_sdk/webview?url=" + encodeURIComponent(url)
			})
		},
		// 访客端-查询访客所有未读消息数目
		getUnreadCountVisitor () {
			// httpApi.getUnreadCountVisitor(response => {
			// 	console.log('getUnreadCountVisitor: ', response.data)
			// 	let unreadCount = response.data
			// 	if (unreadCount > 0) {
			// 		uni.showToast({ title: '未读消息数目：' + unreadCount, duration: 2000 });
			// 		this.unreadMessageCount = unreadCount + ''
			// 	}
			// }, error => {
			// 	console.log(error)
			// })
		}
	}
}
</script>

<style>
</style>
