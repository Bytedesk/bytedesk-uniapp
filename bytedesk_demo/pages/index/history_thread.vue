<template>
	<view class="bytedesk">
		<uni-section title="历史会话" type="line"></uni-section>
		<uni-list-chat v-for="thread in historyThreadList" :key="thread.tid" :title="thread.nickname" :note="thread.content" :time="thread.timestamp" showArrow/>
	</view>
</template>

<script>
	// 引入js文件
	import * as httpApi from '@/components/bytedesk_kefu/js/api/httpapi.js'
	
	export default {
		data() {
			return {
				historyThreadList: []
			}
		},
		onLoad() {
			this.getVisitorThreads()
		},
		methods: {
			getVisitorThreads () {
				let page = 0;
				let size = 20;
				//
				let app = this
				httpApi.getVisitorThreads(page, size, function(response) {
					console.log('getVisitorThreads success:', response)
					app.historyThreadList = response.data.content
				}, function(error) {
					console.log('getVisitorThreads error', error)
					uni.showToast({ title: error, duration: 2000 });
				})
			}
		}
	}
</script>

<style>
</style>
