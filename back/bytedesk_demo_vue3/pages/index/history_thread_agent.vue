<!--
 * @Author: jackning 270580156@qq.com
 * @Date: 2022-03-10 14:57:11
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-09-29 16:55:42
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
		<!-- 用于需要将SDK集成到客服端的开发者 -->
		<uni-section title="客服端-历史会话" type="line"></uni-section>
		<uni-list-chat clickable @click="startChat(thread)" v-for="thread in workGroupThreadList" :key="thread.tid" :avatar="thread.avatar" :title="thread.nickname" :note="thread.content" :time="thread.timestamp" showArrow/>
		<uni-list-chat clickable @click="startChat(thread)" v-for="thread in agentThreadList" :key="thread.tid" :avatar="thread.avatar" :title="thread.nickname" :note="thread.content" :time="thread.timestamp" showArrow/>
		<view class="nodata" v-if="workGroupThreadList.length === 0 && agentThreadList.length === 0">
			当前无进行中会话
		</view>
	</view>
</template>
		
<script>
	// 引入js文件
	import * as httpApi from '@/components/bytedesk_sdk/js/httpapi.js'
	
	export default {
		data() {
			return {
				workGroupThreadList: [],
				agentThreadList: []
			}
		},
		onLoad() {
			this.getThreadHistoryRecords()
		},
		methods: {
			startChat (thread) {
				console.log('chat');
				uni.navigateTo({
					url: '../../components/bytedesk_sdk/chat-im?'
						+ 'tid=' + thread.tid
						+ '&uid=' + thread.uid 
						+ '&nickname=' + thread.nickname 
						+ '&avatar=' + thread.avatar 
						+ '&topic=' + thread.topic 
						+ '&type=' + thread.type 
						+ '&title=' + thread.nickname
						+ '&agentclient=1'
				});
			},
			getThreadHistoryRecords () {
				let page = 0;
				let size = 20;
				//
				let app = this
				httpApi.getThreadHistoryRecords(page, size, function(response) {
					console.log('getThreadHistoryRecords success:', response)
					for (var i = 0; i < response.data.content.length; i++) {
						let thread = response.data.content[i]
						if (thread.type === 'workgroup') {
							let contains = false
							for (var j = 0; j < app.workGroupThreadList.length; j++) {
								let wthread = app.workGroupThreadList[j]
								if (wthread.topic === thread.topic) {
									contains = true
								}
							}
							if (!contains) {
								app.workGroupThreadList.push(thread)
							}
						} else {
							let contains = false
							for (var j = 0; j < app.agentThreadList.length; j++) {
								let wthread = app.agentThreadList[j]
								if (wthread.topic === thread.topic) {
									contains = true
								}
							}
							if (!contains) {
								app.agentThreadList.push(thread)
							}
						}
					}
				}, function(error) {
					console.log('getThreadHistoryRecords error', error)
					uni.showToast({ title: error, duration: 2000 });
				})
			}
		}
	}
</script>

<style>
	.nodata {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 400rpx;
		width: 100%;
		align-items: center;
		color: #555555;
		font-size: 28rpx;
	}
</style>
