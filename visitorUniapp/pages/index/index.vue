<template>
	<view class="page">
		<view class="panel">
			<view class="card">
				<view class="scene-list">
					<view
						v-for="item in bizScenes"
						:key="item.value"
						class="scene-item"
						@click="openSceneChat(item)"
					>
						<view class="scene-copy">
							<view class="scene-row">
								<text class="scene-title">{{ item.label }}</text>
								<view class="scene-arrow" aria-hidden="true"></view>
							</view>
							<text class="scene-description">{{ item.description }}</text>
						</view>
					</view>
				</view>

			</view>

		</view>
	</view>
</template>

<script>
import {
	buildChatUrl,
	CHAT_PAGE_PATH,
	CHAT_PAGE_TITLE_STORAGE_KEY,
	CHAT_PAGE_URL_STORAGE_KEY,
	DEFAULT_CHAT_PROFILE,
	getDefaultHtmlBaseUrl,
	getSelectedUserProfile
} from '../../common/demo-config'

export default {
	data() {
		return {
			htmlBaseUrl: getDefaultHtmlBaseUrl(),
			chatProfile: {
				...DEFAULT_CHAT_PROFILE
			},
			visitorProfile: {
				...getSelectedUserProfile()
			},
			goodsInfoDemo: {
				uid: 'goods_uniapp_001',
				title: '轻奢通勤双肩包',
				image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
				description: '适合日常通勤和短途出差的多功能双肩包。',
				price: 399,
				url: 'https://www.weiyuai.cn',
				tagList: ['新品', '包邮', '支持7天无理由'],
				// extra: JSON.stringify({
				// 	source: 'visitor-uniapp-demo',
				// 	scene: 'goods',
				// 	note: 'uniapp goods demo'
				// }),
				quantity: 1,
				shopUid: 'shop_001'
			},
			orderInfoDemo: {
				uid: 'order_uniapp_001',
				visitorUid: 'visitor_001',
				shopUid: 'shop_001',
				time: '2026-03-11 10:30:00',
				status: 'paid',
				statusText: '已付款，待发货',
				goods: {
					uid: 'goods_uniapp_001',
					title: '轻奢通勤双肩包',
					image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
					description: '适合日常通勤和短途出差的多功能双肩包。',
					price: 399,
					url: 'https://www.weiyuai.cn',
					tagList: ['新品', '包邮'],
					// extra: JSON.stringify({
					// 	source: 'visitor-uniapp-demo',
					// 	scene: 'order-goods',
					// 	note: 'embedded order goods'
					// }),
					quantity: 1
				},
				totalAmount: 399,
				shippingAddress: {
					name: '张三',
					phone: '13800000000',
					address: '上海市浦东新区世纪大道 100 号'
				},
				paymentMethod: '支付宝',
				// extra: JSON.stringify({
				// 	source: 'visitor-uniapp-demo',
				// 	scene: 'order',
				// 	note: 'uniapp order demo'
				// })
			},
			bizScenes: [
				{
					value: 'plain',
					label: '普通会话演示',
					description: '直接打开普通客服会话，不携带商品卡片和订单卡片参数。'
				},
				{
					value: 'goods',
					label: '商品消息演示',
					description: '打开商品场景客服会话，并自动发送商品卡片。',
					autoSendBizInfo: '1'
				},
				{
					value: 'goods-confirm',
					label: '商品消息演示（弹窗确认发送）',
					description: '打开商品场景客服会话，通过弹窗确认后再发送商品卡片。',
					autoSendBizInfo: '0'
				},
				{
					value: 'order',
					label: '订单消息演示',
					description: '打开订单场景客服会话，并自动发送订单卡片。',
					autoSendBizInfo: '1'
				},
				{
					value: 'order-confirm',
					label: '订单消息演示（弹窗确认发送）',
					description: '打开订单场景客服会话，通过弹窗确认后再发送订单卡片。',
					autoSendBizInfo: '0'
				}
			],
			lastActionText: '点击任意列表项后会跳转到独立客服页，消息气泡点击事件会在客服页内打印。'
		}
	},
	onShow() {
		this.syncSelectedUserProfile()
	},
	methods: {
		syncSelectedUserProfile() {
			this.visitorProfile = {
				...getSelectedUserProfile()
			}
			this.orderInfoDemo = {
				...this.orderInfoDemo,
				visitorUid: this.visitorProfile.visitorUid
			}
		},
		getSceneParamKey(scene) {
			if (scene.value === 'order' || scene.value === 'order-confirm') {
				return 'orderInfo'
			}

			if (scene.value === 'goods' || scene.value === 'goods-confirm') {
				return 'goodsInfo'
			}

			return ''
		},
		getScenePayload(scene) {
			if (scene.value === 'order' || scene.value === 'order-confirm') {
				return this.orderInfoDemo
			}

			if (scene.value === 'goods' || scene.value === 'goods-confirm') {
				return this.goodsInfoDemo
			}

			return null
		},
		getSceneTitle(scene) {
			if (scene.value === 'plain') {
				return '普通客服会话'
			}

			return scene.value === 'order' || scene.value === 'order-confirm' ? '订单客服会话' : '商品客服会话'
		},
		resolveAutoSendBizInfo(scene) {
			if (scene.value === 'goods' || scene.value === 'goods-confirm' || scene.value === 'order' || scene.value === 'order-confirm') {
				return scene.autoSendBizInfo || '1'
			}

			return ''
		},
		buildSceneChatUrl(scene) {
			return buildChatUrl({
				htmlBaseUrl: this.htmlBaseUrl,
				chatProfile: this.chatProfile,
				visitorProfile: this.visitorProfile,
				bizKey: this.getSceneParamKey(scene),
				bizPayload: this.getScenePayload(scene),
				autoSendBizInfo: this.resolveAutoSendBizInfo(scene),
				lang: 'zh-cn',
				navbar: 0
			})
		},
		openSceneChat(scene) {
			this.syncSelectedUserProfile()
			const pageTitle = this.getSceneTitle(scene)
			const chatUrl = this.buildSceneChatUrl(scene)
			console.log('[visitorUniapp] open chat url:', chatUrl)
			if (scene.value === 'plain') {
				this.lastActionText = '普通客服会话页已打开，当前不会传商品卡片和订单卡片参数。'
			} else {
				const isOrderScene = scene.value === 'order' || scene.value === 'order-confirm'
				const sendModeText = this.resolveAutoSendBizInfo(scene) === '1' ? '自动发送' : '弹窗确认'
				this.lastActionText = isOrderScene
					? `订单客服会话页已打开，当前为${sendModeText}模式，请在独立页面内测试订单卡片。`
					: `商品客服会话页已打开，当前为${sendModeText}模式，请在独立页面内测试商品卡片。`
			}
			uni.setStorageSync(CHAT_PAGE_URL_STORAGE_KEY, chatUrl)
			uni.setStorageSync(CHAT_PAGE_TITLE_STORAGE_KEY, pageTitle)
			uni.navigateTo({
				url: CHAT_PAGE_PATH
			})
		},
	}
}
</script>

<style>
.page {
	height: 100vh;
	display: flex;
	flex-direction: column;
	background: linear-gradient(180deg, #f6f8f3 0%, #eef3ec 100%);
}

.panel {
	padding: 24rpx 24rpx 12rpx;
}

.hero-title {
	display: block;
	font-size: 40rpx;
	font-weight: 700;
	color: #173127;
}

.hero-subtitle {
	display: block;
	margin-top: 10rpx;
	font-size: 26rpx;
	line-height: 1.6;
	color: #607269;
}

.card {
	margin-top: 20rpx;
	padding: 24rpx;
	border-radius: 24rpx;
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0 14rpx 40rpx rgba(32, 59, 43, 0.08);
}

.section-title {
	display: block;
	margin-bottom: 18rpx;
	font-size: 30rpx;
	font-weight: 600;
	color: #173127;
}

.profile-summary {
	display: flex;
	align-items: center;
	gap: 18rpx;
	margin-bottom: 18rpx;
	padding: 18rpx;
	border-radius: 20rpx;
	background: #f4f8f3;
}

.profile-avatar {
	width: 84rpx;
	height: 84rpx;
	border-radius: 50%;
	background: #dce9e1;
	flex-shrink: 0;
}

.profile-copy {
	display: flex;
	flex-direction: column;
	min-width: 0;
}

.profile-name {
	font-size: 28rpx;
	font-weight: 600;
	color: #173127;
}

.profile-meta {
	margin-top: 6rpx;
	font-size: 22rpx;
	color: #607269;
	word-break: break-all;
}


.scene-list {
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.scene-item {
	display: flex;
	align-items: center;
	padding: 22rpx 20rpx;
	border-radius: 18rpx;
	background: #edf3ee;
}

.scene-copy {
	flex: 1;
	min-width: 0;
}

.scene-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16rpx;
}


.scene-title {
	font-size: 26rpx;
	color: #173127;
	font-weight: 600;
}

.scene-arrow {
	width: 16rpx;
	height: 16rpx;
	border-top: 4rpx solid #1f6f54;
	border-right: 4rpx solid #1f6f54;
	transform: rotate(45deg);
	flex-shrink: 0;
}

.scene-description {
	display: block;
	margin-top: 8rpx;
	font-size: 23rpx;
	line-height: 1.6;
	color: #607269;
}

.tip {
	display: block;
	margin-top: 14rpx;
	font-size: 24rpx;
	line-height: 1.6;
	color: #607269;
}
</style>
