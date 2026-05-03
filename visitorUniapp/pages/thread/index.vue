<template>
	<view class="page">

		<view class="search-card">
			<input
				v-model="searchText"
				class="search-input"
				placeholder="搜索会话标题或消息内容"
				confirm-type="search"
				@confirm="handleSearchConfirm"
			/>
			<view class="search-actions">
				<view class="search-button search-button-primary" @click="handleSearchConfirm">
					<text class="search-button-text search-button-text-primary">搜索</text>
				</view>
			</view>
		</view>

		<view v-if="loading && !threadList.length" class="state-card">
			<text class="state-text">正在加载历史会话...</text>
		</view>

		<view v-else-if="errorText && !threadList.length" class="state-card">
			<text class="state-text">{{ errorText }}</text>
			<view class="retry-button" @click="reloadThreads">
				<text class="retry-button-text">重新加载</text>
			</view>
		</view>

		<view v-else-if="!threadList.length" class="state-card">
			<text class="state-text">当前访客暂无历史会话</text>
		</view>

		<view v-else class="thread-list">
			<view v-for="item in threadList" :key="item.uid" class="thread-card" @click="openThread(item)">
				<image v-if="resolveDisplay(item).avatar" class="thread-avatar" :src="resolveDisplay(item).avatar" mode="aspectFill"></image>
				<view v-else class="thread-avatar thread-avatar-fallback" :class="resolveThreadTypeClass(item)">
					<text class="thread-avatar-fallback-text">{{ resolveAvatarText(item) }}</text>
				</view>
				<view class="thread-main">
					<view class="thread-row">
						<text class="thread-name">{{ resolveDisplay(item).name }}</text>
						<view class="thread-meta">
							<text class="thread-time">{{ formatTime(item.updatedAt || item.createdAt) }}</text>
						</view>
					</view>
					<text class="thread-preview">{{ resolveDisplay(item).preview }}</text>
					<view class="thread-row thread-row-bottom">
						<text v-if="resolveUnread(item) > 0" class="thread-unread">{{ resolveUnread(item) }}</text>
					</view>
				</view>
			</view>

			<view class="footer-card">
				<text class="footer-text">{{ footerText }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import {
	buildChatUrl,
	CHAT_PAGE_PATH,
	CHAT_PAGE_THREAD_STORAGE_KEY,
	CHAT_PAGE_TITLE_STORAGE_KEY,
	CHAT_PAGE_URL_STORAGE_KEY,
	DEFAULT_CHAT_PROFILE,
	getDefaultApiBaseUrl,
	getDefaultHtmlBaseUrl,
	normalizeThreadType,
	getSelectedUserProfile,
	requestVisitorThreads,
	resolveThreadDisplay,
	resolveThreadRouteTarget
} from '../../common/demo-config'

const PAGE_SIZE = 10

export default {
	data() {
		return {
			apiBaseUrl: getDefaultApiBaseUrl(),
			htmlBaseUrl: getDefaultHtmlBaseUrl(),
			chatProfile: {
				...DEFAULT_CHAT_PROFILE
			},
			selectedUser: {
				...getSelectedUserProfile()
			},
			searchText: '',
			appliedSearchText: '',
			pageNumber: 0,
			pageSize: PAGE_SIZE,
			total: 0,
			loading: false,
			errorText: '',
			threadList: []
		}
	},
	computed: {
		footerText() {
			if (this.loading && this.threadList.length) {
				return '正在加载更多会话...'
			}

			if (this.threadList.length >= this.total && this.threadList.length) {
				return '没有更多历史会话了'
			}

			return '继续下拉页面可加载更多历史会话'
		}
	},
	onPullDownRefresh() {
		this.reloadThreads().finally(() => {
			uni.stopPullDownRefresh()
		})
	},
	onShow() {
		const nextUser = getSelectedUserProfile()
		const hasChanged = nextUser.visitorUid !== this.selectedUser.visitorUid
		this.selectedUser = {
			...nextUser
		}

		if (hasChanged || !this.threadList.length) {
			this.searchText = ''
			this.appliedSearchText = ''
			this.reloadThreads()
		}
	},
	onReachBottom() {
		if (this.loading || this.threadList.length >= this.total) {
			return
		}

		this.fetchThreads(this.pageNumber + 1)
	},
	methods: {
		resolveDisplay(item) {
			return resolveThreadDisplay(item)
		},
		resolveAvatarText(item) {
			const display = resolveThreadDisplay(item)
			return (display.name || '?').slice(0, 1).toUpperCase()
		},
		resolveUnread(item) {
			return Number(item.visitorUnreadCount || item.unreadCount || 0)
		},
		resolveThreadTypeValue(item) {
			return normalizeThreadType(item)
		},
		formatThreadType(type) {
			const normalized = normalizeThreadType(type)
			if (normalized === '0') {
				return '一对一'
			}
			if (normalized === '1') {
				return '工作组'
			}
			if (normalized === '2') {
				return '机器人'
			}
			return '历史'
		},
		resolveThreadTypeTip(item) {
			const normalized = this.resolveThreadTypeValue(item)
			if (normalized === '0') {
				return '当前会话由客服接待'
			}
			if (normalized === '1') {
				return '当前会话接入工作组'
			}
			if (normalized === '2') {
				return '当前会话由机器人接待'
			}
			return '历史会话'
		},
		resolveThreadTypeClass(item) {
			const normalized = this.resolveThreadTypeValue(item)
			if (normalized === '0') {
				return 'thread-type-agent'
			}
			if (normalized === '1') {
				return 'thread-type-workgroup'
			}
			if (normalized === '2') {
				return 'thread-type-robot'
			}
			return 'thread-type-history'
		},
		formatTime(value) {
			if (!value) {
				return ''
			}

			const date = new Date(value)
			if (Number.isNaN(date.getTime())) {
				return String(value)
			}

			const month = `${date.getMonth() + 1}`.padStart(2, '0')
			const day = `${date.getDate()}`.padStart(2, '0')
			const hour = `${date.getHours()}`.padStart(2, '0')
			const minute = `${date.getMinutes()}`.padStart(2, '0')
			return `${month}-${day} ${hour}:${minute}`
		},
		async reloadThreads() {
			this.pageNumber = 0
			this.total = 0
			this.threadList = []
			this.errorText = ''
			await this.fetchThreads(0)
		},
		handleSearchConfirm() {
			this.appliedSearchText = (this.searchText || '').trim()
			this.reloadThreads()
		},
		handleSearchClear() {
			if (!this.searchText && !this.appliedSearchText) {
				return
			}

			this.searchText = ''
			this.appliedSearchText = ''
			this.reloadThreads()
		},
		async fetchThreads(pageNumber) {
			if (this.loading) {
				return
			}

			this.loading = true
			this.errorText = ''
			try {
				const response = await requestVisitorThreads({
					apiBaseUrl: this.apiBaseUrl,
					chatProfile: this.chatProfile,
					visitorProfile: this.selectedUser,
					pageNumber,
					pageSize: this.pageSize,
					searchText: this.appliedSearchText
				})
				console.log('requestVisitorThreads', response.data, this.selectedUser)
				const payload = response && response.data ? response.data : {}
				if (payload.code !== 200 || !payload.data) {
					this.errorText = payload.message || '加载历史会话失败'
					return
				}

				const content = Array.isArray(payload.data.content) ? payload.data.content : []
				this.pageNumber = pageNumber
				this.total = Number(payload.data.totalElements || 0)
				if (pageNumber > 0) {
					const merged = [...this.threadList, ...content]
					const uniqueMap = {}
					this.threadList = merged.filter((item, index) => {
						const key = item.uid || `index-${index}`
						if (uniqueMap[key]) {
							return false
						}
						uniqueMap[key] = true
						return true
					})
				} else {
					this.threadList = content
				}
			} catch (error) {
				this.errorText = '加载历史会话失败，请检查 API 服务是否可用'
			} finally {
				this.loading = false
			}
		},
		openThread(item) {
			const routeTarget = resolveThreadRouteTarget(item)
			if (!routeTarget.sid) {
				uni.showToast({
					title: '当前会话缺少 sid',
					icon: 'none'
				})
				return
			}

			const display = resolveThreadDisplay(item)
			const chatUrl = buildChatUrl({
				htmlBaseUrl: this.htmlBaseUrl,
				chatProfile: {
					...this.chatProfile,
					t: routeTarget.type,
					sid: routeTarget.sid
				},
				visitorProfile: this.selectedUser,
				lang: 'zh-cn',
				navbar: 0
			})

			uni.setStorageSync(CHAT_PAGE_URL_STORAGE_KEY, chatUrl)
			uni.setStorageSync(CHAT_PAGE_TITLE_STORAGE_KEY, display.name || '历史会话')
			uni.setStorageSync(CHAT_PAGE_THREAD_STORAGE_KEY, JSON.stringify(item || {}))
			uni.navigateTo({
				url: CHAT_PAGE_PATH
			})
		}
	}
}
</script>

<style>
.page {
	min-height: 100vh;
	padding: 24rpx;
	background: linear-gradient(180deg, #f3f7fb 0%, #edf2f7 100%);
}

.hero-card,
.search-card,
.state-card,
.thread-card,
.footer-card {
	border-radius: 24rpx;
	background: rgba(255, 255, 255, 0.94);
	box-shadow: 0 14rpx 36rpx rgba(33, 51, 83, 0.08);
}

.hero-card,
.search-card,
.state-card,
.footer-card {
	padding: 24rpx;
}

.search-card {
	margin-top: 20rpx;
	display: flex;
	align-items: center;
	gap: 14rpx;
}

.search-input {
	flex: 1;
	min-width: 0;
	height: 76rpx;
	padding: 0 22rpx;
	border-radius: 18rpx;
	background: #f4f7fb;
	font-size: 26rpx;
	color: #1e3554;
}

.search-actions {
	display: flex;
	flex-shrink: 0;
}

.search-button {
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: 132rpx;
	height: 72rpx;
	padding: 0 24rpx;
	border-radius: 18rpx;
	background: #eef3f8;
}

.search-button-primary {
	background: #295f9b;
}

.search-button-text {
	font-size: 24rpx;
	font-weight: 600;
	color: #5e6d82;
}

.search-button-text-primary {
	color: #ffffff;
}

.hero-header {
	display: flex;
	align-items: center;
	gap: 18rpx;
}

.hero-avatar {
	width: 92rpx;
	height: 92rpx;
	border-radius: 50%;
	background: #d7e3f1;
}

.hero-copy {
	display: flex;
	flex-direction: column;
	min-width: 0;
}

.hero-title {
	font-size: 34rpx;
	font-weight: 700;
	color: #1e3554;
}

.hero-subtitle,
.hero-tip,
.state-text,
.footer-text {
	font-size: 24rpx;
	line-height: 1.6;
	color: #607089;
	word-break: break-all;
}

.hero-subtitle {
	margin-top: 6rpx;
}

.hero-tip {
	display: block;
	margin-top: 16rpx;
}

.state-card {
	margin-top: 20rpx;
	text-align: center;
}

.retry-button {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin-top: 18rpx;
	padding: 18rpx 30rpx;
	border-radius: 999rpx;
	background: #295f9b;
}

.retry-button-text {
	font-size: 24rpx;
	font-weight: 600;
	color: #ffffff;
}

.thread-list {
	margin-top: 20rpx;
	display: flex;
	flex-direction: column;
	gap: 18rpx;
}

.thread-card {
	display: flex;
	gap: 18rpx;
	padding: 22rpx;
}

.thread-avatar {
	width: 88rpx;
	height: 88rpx;
	border-radius: 50%;
	background: #d9e4f5;
	flex-shrink: 0;
}

.thread-avatar-fallback {
	display: flex;
	justify-content: center;
	align-items: center;
	background: linear-gradient(180deg, #7a9dcf 0%, #456f9f 100%);
}

.thread-avatar-fallback-text {
	font-size: 28rpx;
	font-weight: 700;
	color: #ffffff;
}

.thread-main {
	flex: 1;
	min-width: 0;
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.thread-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12rpx;
}

.thread-meta {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 10rpx;
	flex-shrink: 0;
}

.thread-row-bottom {
	margin-top: 2rpx;
	align-items: flex-end;
}

.thread-name {
	flex: 1;
	min-width: 0;
	font-size: 28rpx;
	font-weight: 600;
	color: #1e3554;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}

.thread-time,
.thread-type-tip {
	font-size: 22rpx;
	color: #7a8797;
	flex-shrink: 0;
}

.thread-type-tip {
	flex: 1;
	min-width: 0;
}

.thread-preview {
	font-size: 24rpx;
	line-height: 1.5;
	color: #4e5d71;
	word-break: break-all;
}

.thread-unread {
	min-width: 36rpx;
	padding: 4rpx 10rpx;
	border-radius: 999rpx;
	background: #e95f54;
	font-size: 20rpx;
	line-height: 1.4;
	text-align: center;
	color: #ffffff;
}

.thread-type-badge {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	height: 40rpx;
	padding: 0 16rpx;
	border-radius: 999rpx;
	font-size: 20rpx;
	font-weight: 600;
	color: #295f9b;
	background: rgba(41, 95, 155, 0.12);
}

.thread-type-agent {
	background: linear-gradient(180deg, #7a9dcf 0%, #456f9f 100%);
	color: #ffffff;
}

.thread-type-workgroup {
	background: linear-gradient(180deg, #4faf7a 0%, #2f7d56 100%);
	color: #ffffff;
}

.thread-type-robot {
	background: linear-gradient(180deg, #9f78d6 0%, #6e4cb0 100%);
	color: #ffffff;
}

.thread-type-history {
	background: linear-gradient(180deg, #a7b2c2 0%, #7a8797 100%);
	color: #ffffff;
}

.footer-card {
	text-align: center;
	margin-bottom: 18rpx;
}
</style>