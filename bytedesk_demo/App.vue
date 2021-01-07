<script>
// import * as auth from '@/components/bytedesk_kefu/js/api/auth.js'

export default {
	onLaunch: function() {
		console.log('App Launch')
		// 萝卜丝-匿名登录
		// 获取subDomain，也即企业号：登录后台->客服管理->客服账号->企业号
		let subDomain = 'vip'
		// 登录后台->渠道管理-》uniapp中创建应用获取
		let appKey = 'f4970e52-8cc8-48fd-84f6-82390640549d'
		// auth.anonymousLogin(subDomain, appKey, function(result) {
		// 	//
		// }, function(error) {
			
		// })
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style>

</style>
