<template>
	<view class="bytedesk">
		<uni-section title="技能组客服(可按规则分配多个客服)" type="line"></uni-section>
		<uni-list :border="true">
			<!-- 技能组客服会话-支持多个客服 -->
			<uni-list-item title="技能组客服" clickable @click="startWorkGroupChat()" note="默认人工" showArrow />
			<uni-list-item title="技能组客服-无历史消息记录" clickable @click="startWorkGroupChatNoHistory()" note="默认人工" showArrow />
			<uni-list-item title="技能组客服-机器人" clickable @click="startWorkGroupChatRobot()" note="默认机器人(服务器设置)" showArrow />
			<uni-list-item title="技能组客服-电商" clickable @click="startWorkGroupChatShop()" note="自动发送商品信息" showArrow />
			<uni-list-item title="技能组客服-附言" clickable @click="startWorkGroupChatPostscript()" note="自动发送附言" showArrow />
			<uni-list-item title="技能组客服-自定义昵称" clickable @click="startWorkGroupChatNickname()" note="客服所见昵称" showArrow />
		</uni-list>
		<uni-section title="指定客服(分配固定一个客服)" type="line"></uni-section>
		<uni-list :border="true">
			<!-- 指定客服-支持一对一客服 -->
			<uni-list-item title="指定客服" clickable @click="startAppointedChat()" note="默认人工" showArrow />
			<uni-list-item title="指定客服-电商" clickable @click="startAppointedChatShop()" note="自动发送商品信息" showArrow />
			<uni-list-item title="指定客服-附言" clickable @click="startAppointedChatPostscript()" note="自动发送附言" showArrow />
			<uni-list-item title="指定客服-自定义昵称" clickable @click="startAppointedChatNickname()" note="客服所见昵称" showArrow />
		</uni-list>
		<uni-section title="H5客服" type="line"></uni-section>
		<uni-list :border="true">
			<!-- 如果不想集成SDK，也可以直接集成H5页面即可，其余操作均可忽略，只需一步集成H5链接即可 -->
			<uni-list-item title="H5客服" clickable @click="startH5Chat()" note="H5客服一步搞定" showArrow />
		</uni-list>
		<uni-section title="TODO:小程序码" type="line"></uni-section>
		<uni-list :border="true">
			<!-- 服务器端生成小程序码 -->
			<uni-list-item title="技能组客服" clickable @click="startWorkGroupQrcodeChat()" note="服务器生成小程序码" showArrow />
			<uni-list-item title="指定客服" clickable @click="startAgentQrcodeChat()" note="服务器生成小程序码" showArrow />
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
			// workGroupWid: '2021052308060013524a6c424672e9f4ee5886a0b6e86a2c683', // 测试用户
			workGroupWidRobot: '201809061716221', // 默认机器人, 在管理后台开启或关闭机器人
			// 说明：直接发送给此一个客服账号，一对一会话
			agentUid: '201808221551193'
		}
	},
	methods: {
		// 萝卜丝第三步：开始会话
		// 参数说明：
		// nickname 自定义昵称，可设置为非空字符串，如不设置，会系统生成默认昵称
		// history 是否显示历史聊天记录，默认为显示，设置history=0，则不显示历史聊天记录
		// postscript 附言，在连接成功客服之后，自动将此消息发送给客服
		// lang 语言，默认值为lang=cn,显示中文，如需显示英文设置lang=en
		// goods 是否显示商品信息，如果要显示，设置为goods=1，设置为其他值，则不显示商品信息
		// goods_id 商品信息id，参数goods=1的情况有效
		// goods_title 商品信息标题，参数goods=1的情况有效
		// goods_content 商品信息详情，参数goods=1的情况有效
		// goods_price 商品信息价格，参数goods=1的情况有效
		// goods_url 商品信息网址，参数goods=1的情况有效
		// goods_imageUrl 商品图片，参数goods=1的情况有效
		// goods_categoryCode 可选，商品信息类别，参数goods=1的情况有效
		// 技能组会话
		startWorkGroupChat () {
			uni.navigateTo({
				url: '../../components/bytedesk_kefu/chat-kf?wid=' + this.workGroupWid + '&type=workGroup&aid=&title=萝卜丝'
			});
		},
		// 技能组会话-无历史消息记录
		startWorkGroupChatNoHistory () {
			// 注意：最后添加参数history=0
			uni.navigateTo({
				url: '../../components/bytedesk_kefu/chat-kf?wid=' + this.workGroupWid + '&type=workGroup&aid=&title=萝卜丝&history=0'
			});
		},
		startWorkGroupChatRobot () {
			// 服务器端设置此技能组为默认机器人
			// 管理后台-》客服管理-》技能组-》点击某个技能组最右边‘编辑’按钮-》开启默认机器人或离线机器人
			// 如何开启机器人：https://www.bytedesk.com/support/article?sub=vip&uid=201808221551193&aid=202104291459561&ph=ph
			uni.navigateTo({
				url: '../../components/bytedesk_kefu/chat-kf?wid=' + this.workGroupWidRobot + '&type=workGroup&aid=&title=萝卜丝&history=0'
			});
		},
		startWorkGroupChatShop () {
			// 增加商品信息参数
			// uni.navigateTo({
			// 	url: '../../components/bytedesk_kefu/chat-kf?wid=' + this.workGroupWid + '&type=workGroup&aid=&title=萝卜丝&&goods=1&goods_categoryCode=101&goods_content=商品详情&goods_id=123&goods_imageUrl=https://bytedesk.oss-cn-shenzhen.aliyuncs.com/images/123.webp&goods_price=1000&goods_title=商品标题&goods_url=https://item.m.jd.com/product/12172344.html&history=0&lang=cn'
			// });
			// url编码
			let goodsUrl = encodeURI('https://item.m.jd.com/product/12172344.html')
			// 增加商品信息参数
			uni.navigateTo({
				url: '../../components/bytedesk_kefu/chat-kf?wid=' + this.workGroupWid 
					+ '&type=workGroup&aid=&title=萝卜丝' 
					+ '&goods=1' 
					+ '&goods_categoryCode=101' 
					+ '&goods_content=商品详情' 
					+ '&goods_id=123' 
					+ '&goods_imageUrl=https://bytedesk.oss-cn-shenzhen.aliyuncs.com/images/123.webp' 
					+ '&goods_price=1000' 
					+ '&goods_title=商品标题' 
					+ '&goods_url=' + goodsUrl 
					+ '&history=0' 
					+ '&lang=cn'
			});
		},
		startWorkGroupChatPostscript () {
			// 增加附言参数：postscript=这是附言自动发送给客服
			uni.navigateTo({
				url: '../../components/bytedesk_kefu/chat-kf?wid=' + this.workGroupWid + '&type=workGroup&aid=&title=萝卜丝&postscript=这是附言自动发送给客服'
			});
		},
		startWorkGroupChatNickname () {
			// 增加参数：nickname=自定义昵称
			uni.navigateTo({
				url: '../../components/bytedesk_kefu/chat-kf?wid=' + this.workGroupWid + '&type=workGroup&aid=&title=萝卜丝&nickname=自定义昵称'
			});
		},
		// 一对一会话
		startAppointedChat () {
			uni.navigateTo({
				url: '../../components/bytedesk_kefu/chat-kf?wid=&type=appointed&aid=' + this.agentUid + '&title=萝卜丝'
			});
		},
		startAppointedChatShop () {
			// 增加商品信息参数
			// uni.navigateTo({
			// 	url: '../../components/bytedesk_kefu/chat-kf?wid=&type=appointed&aid=' + this.agentUid + '&title=萝卜丝&goods=1&goods_categoryCode=101&goods_content=商品详情&goods_id=123&goods_imageUrl=https://bytedesk.oss-cn-shenzhen.aliyuncs.com/images/123.webp&goods_price=1000&goods_title=商品标题哈哈哈哈哈哈哈哈哈哈或或或或或或或或或&goods_url=https://item.m.jd.com/product/12172344.html&history=0&lang=cn'
			// });
			// url编码
			let goodsUrl = encodeURI('https://item.m.jd.com/product/12172344.html')
			// 增加商品信息参数
			uni.navigateTo({
				url: '../../components/bytedesk_kefu/chat-kf?wid=&type=appointed&aid=' + this.agentUid + '&title=萝卜丝' 
				+ '&goods=1' 
				+ '&goods_categoryCode=101' 
				+ '&goods_content=商品详情' 
				+ '&goods_id=123' 
				+ '&goods_imageUrl=https://bytedesk.oss-cn-shenzhen.aliyuncs.com/images/123.webp' 
				+ '&goods_price=1000' 
				+ '&goods_title=商品标题哈哈哈哈哈哈哈哈哈哈或或或或或或或或或' 
				+ '&goods_url=' + goodsUrl 
				+ '&history=0' 
				+ '&lang=cn'
			});
		},
		startAppointedChatPostscript () {
			// 增加附言参数：postscript=这是附言自动发送给客服
			uni.navigateTo({
				url: '../../components/bytedesk_kefu/chat-kf?wid=&type=appointed&aid=' + this.agentUid + '&title=萝卜丝&postscript=这是附言自动发送给客服'
			});
		},
		startAppointedChatNickname () {
			// 增加参数：nickname=自定义昵称
			uni.navigateTo({
				url: '../../components/bytedesk_kefu/chat-kf?wid=&type=appointed&aid=' + this.agentUid + '&title=萝卜丝&nickname=自定义昵称'
			});
		},
		// 集成H5链接
		startH5Chat () {
			// 如果不想集成SDK，也可以直接集成H5页面即可，其余操作均可忽略，只需一步集成H5链接即可 
			// 登录管理后台：https://www.bytedesk.com/antv/user/login，客服管理-》技能组-》获取组客服代码
			let url = "https://www.bytedesk.com/chat?sub=vip&uid=201808221551193&wid=201807171659201&type=workGroup&hidenav=1&aid=&ph=ph";
			uni.navigateTo({
				url:"../../components/bytedesk_kefu/webview?url=" + encodeURIComponent(url)
			})
		},
		// TODO内测中: 小程序码客服-技能组客服
		startWorkGroupQrcodeChat () {
			// 服务器端生成小程序码
			// scene: scene=wid // 其中wid非同上面wid, 此处wid = w + workgroup.id, 注意：是workGroup表的id字段非wid字段，因微信小程序码参数长度限制<32
			// page: components/bytedesk_kefu/chat-scan
			uni.navigateTo({
				url: '../../components/bytedesk_kefu/chat-scan?scan=w17'
			});
		},
		// TODO内测中: 小程序码客服-指定客服
		startAgentQrcodeChat () {
			// 服务器端生成小程序码
			// scene: scene=aid // 其中aid非同上面aid, 此处aid = a + agent.id, 注意：是user表的id字段非uuid字段，因微信小程序码参数长度限制<32
			// page: components/bytedesk_kefu/chat-scan
			uni.navigateTo({
				url: '../../components/bytedesk_kefu/chat-scan?scan=a15'
			});
		},
	}
}
</script>

<style>
</style>
