<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2022-03-10 14:57:11
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-09-29 16:56:02
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 * 联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
-->
<template>
	<view class="bytedesk">
		<uni-section title="历史会话" type="line"></uni-section>
		<uni-list :border="true">
			<uni-list-item title="访客端-历史会话" clickable @click="gotoVisitorHistoryThreads()" note="需要访客登录" showArrow />
			<uni-list-item title="客服端-历史会话" clickable @click="gotoAgentHistoryThreads()" note="需要登录客服账号" showArrow />
		</uni-list>
		<uni-section title="当前会话" type="line"></uni-section>
		<uni-list :border="true">
			<!-- 不仅支持对接访客端，也支持作为客服端集成 -->
			<uni-list-item title="客服端-进行中会话" clickable @click="gotoAgentCurrentThreads()" note="需要登录客服账号" showArrow />
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
			gotoVisitorHistoryThreads () {
				uni.navigateTo({
					url: './history_thread_visitor'
				});
			},
			gotoAgentHistoryThreads () {
				uni.navigateTo({
					url: './history_thread_agent'
				});
			},
			gotoAgentCurrentThreads () {
				uni.navigateTo({
					url: './current_thread_agent'
				});
			}
		}
	}
</script>

<style>
</style>
