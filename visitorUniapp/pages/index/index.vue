<template>
	<view class="page">
		<view class="panel">
			<text class="hero-title">Bytedesk Visitor UniApp Demo</text>
			<text class="hero-subtitle">通过 URL 嵌入 visitor chat，并监听消息气泡点击事件。</text>

			<view class="card">
				<text class="section-title">当前演示</text>
				<view class="segment-row">
					<view v-for="item in bizScenes" :key="item.value" class="segment-item"
						:class="{ 'segment-item-active': bizScene === item.value }" @click="switchBizScene(item.value)">
						<text class="segment-text">{{ item.label }}</text>
					</view>
				</view>
				<text class="tip">{{ currentSceneTip }}</text>
				<view class="action-row">
					<view class="action-button action-button-primary" @click="openCurrentChat">
						<text class="action-button-text action-button-text-primary">{{ openChatButtonText }}</text>
					</view>
				</view>

				<text class="tip">{{ lastActionText }}</text>
			</view>

		</view>

		<view class="url-footer">
			<text class="url-footer-label">当前客服链接 URL</text>
			<text selectable class="url-footer-value">{{ chatUrl }}</text>
		</view>
	</view>
</template>

<script>
const LOCAL_CHAT_BASE_URL = 'http://127.0.0.1:9006'
const PROD_CHAT_BASE_URL = 'https://cdn.weiyuai.cn'
const DEFAULT_CHAT_BASE_URL = process.env.NODE_ENV === 'development' ? LOCAL_CHAT_BASE_URL : PROD_CHAT_BASE_URL
const CHAT_PAGE_PATH = '/pages/chat/index'
const CHAT_PAGE_URL_STORAGE_KEY = 'visitor_uniapp_chat_page_url'
const CHAT_PAGE_TITLE_STORAGE_KEY = 'visitor_uniapp_chat_page_title'

export default {
	data() {
		return {
			htmlBaseUrl: DEFAULT_CHAT_BASE_URL,
			chatProfile: {
				org: 'df_org_uid',
				t: '1',
				sid: 'df_wg_uid'
			},
			visitorProfile: {
				visitorUid: 'visitor_001',
				nickname: '访客小明',
				avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg'
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
				{ value: 'plain', label: '普通会话演示' },
				{ value: 'goods', label: '商品消息演示' },
				{ value: 'order', label: '订单消息演示' }
			],
			bizScene: 'plain',
			lastActionText: '点击按钮后会跳转到独立客服页，消息气泡点击事件会在客服页内打印。'
		}
	},
	computed: {
		currentBizParamKey() {
			if (this.bizScene === 'order') {
				return 'orderInfo'
			}

			if (this.bizScene === 'goods') {
				return 'goodsInfo'
			}

			return ''
		},
		currentBizPayload() {
			if (this.bizScene === 'order') {
				return this.orderInfoDemo
			}

			if (this.bizScene === 'goods') {
				return this.goodsInfoDemo
			}

			return null
		},
		currentSceneTip() {
			if (this.bizScene === 'plain') {
				return '点击按钮后会打开普通客服会话，不传商品卡片和订单卡片参数。'
			}

			return this.bizScene === 'order'
				? '点击按钮后会打开订单场景客服会话，并自动发送订单卡片。点击订单气泡后进入订单详情页。'
				: '点击按钮后会打开商品场景客服会话，并自动发送商品卡片。点击商品气泡后进入商品详情页。'
		},
		openChatButtonText() {
			if (this.bizScene === 'plain') {
				return '打开普通客服会话'
			}

			return this.bizScene === 'order' ? '打开订单客服会话' : '打开商品客服会话'
		},
		currentChatTitle() {
			if (this.bizScene === 'plain') {
				return '普通客服会话'
			}

			return this.bizScene === 'order' ? '订单客服会话' : '商品客服会话'
		},
		chatUrl() {
			const baseHtmlUrl = this.htmlBaseUrl.replace(/\/?chat(?:\/thread)?\/?$/, '')
			const params = new URLSearchParams()
			params.append('org', this.chatProfile.org)
			params.append('t', this.chatProfile.t)
			params.append('sid', this.chatProfile.sid)
			params.append('lang', 'zh-cn')
			params.append('navbar', '0')
			params.append('visitorUid', this.visitorProfile.visitorUid)
			params.append('nickname', this.visitorProfile.nickname)
			params.append('avatar', this.visitorProfile.avatar)
			if (this.currentBizParamKey && this.currentBizPayload) {
				params.append(this.currentBizParamKey, JSON.stringify(this.currentBizPayload))
			}
			return `${baseHtmlUrl}/chat?${params.toString()}`
		}
	},
	onLoad() {
	},
	methods: {
		switchBizScene(nextScene) {
			if (nextScene === this.bizScene) {
				return
			}

			this.bizScene = nextScene
				if (nextScene === 'plain') {
					this.lastActionText = '已切换到普通会话演示，请点击按钮后打开不传商品和订单的客服会话。'
					return
				}

			this.lastActionText = nextScene === 'order'
				? '已切换到订单消息演示，请点击按钮后再打开订单客服会话。'
				: '已切换到商品消息演示，请点击按钮后再打开商品客服会话。'
		},
		openCurrentChat() {
			const pageTitle = this.currentChatTitle
				if (this.bizScene === 'plain') {
					this.lastActionText = '普通客服会话页已打开，当前不会传商品卡片和订单卡片参数。'
				} else {
					this.lastActionText = this.bizScene === 'order'
						? '订单客服会话页已打开，请在独立页面内点击订单卡片测试跳转。'
						: '商品客服会话页已打开，请在独立页面内点击商品卡片测试跳转。'
				}
			uni.setStorageSync(CHAT_PAGE_URL_STORAGE_KEY, this.chatUrl)
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

.segment-row {
	display: flex;
	gap: 16rpx;
}

.segment-item {
	flex: 1;
	padding: 18rpx 20rpx;
	border-radius: 18rpx;
	background: #edf3ee;
	text-align: center;
}

.segment-item-active {
	background: #1f6f54;
}

.segment-text {
	font-size: 26rpx;
	color: #173127;
}

.segment-item-active .segment-text {
	color: #ffffff;
}

.action-row {
	display: flex;
	gap: 16rpx;
	margin-top: 20rpx;
}

.action-button {
	flex: 1;
	padding: 20rpx 24rpx;
	border-radius: 18rpx;
	text-align: center;
}

.action-button-primary {
	background: #1f6f54;
}

.action-button-text {
	font-size: 26rpx;
	font-weight: 600;
}

.action-button-text-primary {
	color: #ffffff;
}

.tip {
	display: block;
	margin-top: 14rpx;
	font-size: 24rpx;
	line-height: 1.6;
	color: #607269;
}

.url-footer {
	padding: 18rpx 24rpx 28rpx;
	background: rgba(255, 255, 255, 0.92);
	box-shadow: 0 -10rpx 30rpx rgba(32, 59, 43, 0.06);
}

.url-footer-label {
	display: block;
	margin-bottom: 10rpx;
	font-size: 22rpx;
	font-weight: 600;
	color: #5d6d65;
}

.url-footer-value {
	display: block;
	font-size: 22rpx;
	line-height: 1.6;
	color: #173127;
	word-break: break-all;
}
</style>
