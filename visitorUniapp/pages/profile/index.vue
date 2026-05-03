<template>
	<view class="page">
		<view class="profile-list">
			<view
				v-if="selectedUser"
				class="profile-card profile-card-active"
				@click="openUserActionSheet"
			>
				<image class="profile-avatar" :src="selectedUser.avatar" mode="aspectFill"></image>
				<view class="profile-main">
					<view class="profile-row">
						<text class="profile-name">{{ selectedUser.nickname }}</text>
						<view class="profile-actions">
							<text class="profile-badge">VIP {{ selectedUser.vipLevel }}</text>
							<text class="profile-chevron">切换</text>
						</view>
					</view>
					<text class="profile-meta">visitorUid: {{ selectedUser.visitorUid }}</text>
					<text class="profile-tip">点击当前用户卡片，可切换到其他用户身份</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {
	DEMO_USER_LIST,
	getStoredSelectedUserKey,
	setStoredSelectedUserKey
} from '../../common/demo-config'

export default {
	data() {
		return {
			userList: DEMO_USER_LIST,
			selectedKey: getStoredSelectedUserKey()
		}
	},
	computed: {
		selectedUser() {
			return this.userList.find((item) => item.key === this.selectedKey) || this.userList[0] || null
		}
	},
	onShow() {
		this.selectedKey = getStoredSelectedUserKey()
	},
	methods: {
		openUserActionSheet() {
			const itemList = this.userList.map((item) => {
				const isCurrent = item.key === this.selectedKey
				return `${item.nickname}${isCurrent ? '（当前）' : ''}`
			})

			uni.showActionSheet({
				itemList,
				success: ({ tapIndex }) => {
					const nextUser = this.userList[tapIndex]
					if (!nextUser) {
						return
					}

					this.selectUser(nextUser.key)
				}
			})
		},
		selectUser(nextKey) {
			if (nextKey === this.selectedKey) {
				return
			}

			this.selectedKey = setStoredSelectedUserKey(nextKey)
			uni.showToast({
				title: '已切换访客资料',
				icon: 'none'
			})
		}
	}
}
</script>

<style>
.page {
	min-height: 100vh;
	padding: 24rpx;
	background: linear-gradient(180deg, #f7f3ee 0%, #f2ece5 100%);
}

.hero-card,
.profile-card {
	border-radius: 24rpx;
	background: rgba(255, 255, 255, 0.94);
	box-shadow: 0 14rpx 36rpx rgba(66, 47, 27, 0.08);
}

.hero-card {
	padding: 24rpx;
}

.hero-title {
	display: block;
	font-size: 34rpx;
	font-weight: 700;
	color: #4b2e19;
}

.hero-subtitle {
	display: block;
	margin-top: 10rpx;
	font-size: 24rpx;
	line-height: 1.6;
	color: #7f6654;
}

.profile-list {
	display: flex;
	flex-direction: column;
	gap: 18rpx;
	margin-top: 20rpx;
}

.profile-card {
	display: flex;
	gap: 18rpx;
	padding: 22rpx;
	border: 2rpx solid transparent;
}

.profile-card-active {
	border-color: #b36a37;
	background: #fff8f2;
}

.profile-avatar {
	width: 96rpx;
	height: 96rpx;
	border-radius: 50%;
	background: #ecdccd;
	flex-shrink: 0;
}

.profile-main {
	flex: 1;
	min-width: 0;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.profile-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 14rpx;
}

.profile-actions {
	display: flex;
	align-items: center;
	gap: 12rpx;
	flex-shrink: 0;
}

.profile-name {
	font-size: 28rpx;
	font-weight: 600;
	color: #4b2e19;
}

.profile-badge {
	padding: 6rpx 14rpx;
	border-radius: 999rpx;
	background: #f3dfca;
	font-size: 20rpx;
	color: #9f5d2d;
	flex-shrink: 0;
}

.profile-chevron {
	font-size: 22rpx;
	font-weight: 600;
	color: #b36a37;
	flex-shrink: 0;
}

.profile-meta,
.profile-tip {
	font-size: 24rpx;
	line-height: 1.6;
	color: #7f6654;
	word-break: break-all;
}

.profile-tip {
	color: #a15d2c;
}
</style>