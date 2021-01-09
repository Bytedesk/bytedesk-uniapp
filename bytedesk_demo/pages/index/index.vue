<template>
	<view class="bytedesk">
		<uni-list>
			<uni-list-item title="联系客服" :to="`./chat_type`" note="人工/机器人/电商/附言" showArrow />
			<uni-list-item title="用户信息" :to="`./user_info`" note="自定义用户信息" showArrow />
			<uni-list-item title="在线状态" :to="`./online_status`" note="客服是否在线" showArrow />
			<uni-list-item title="历史会话" :to="`./history_thread`" note="历史会话记录" showArrow />
			<uni-list-item title="消息提示" :to="`./setting`" note="声音/振动提示" showArrow />
		</uni-list>
	</view>
</template>

<script>
// 萝卜丝第一步：引入js文件
import * as bytedesk from '@/components/bytedesk_kefu/js/api/bytedesk.js'
import * as constants from '@/components/bytedesk_kefu/js/constants.js'

export default {
	data() {
		return {
			vibrate: true,
			playAudio: true
		}
	},
	onLoad() {
		// 萝卜丝第二步：初始化
		// 获取subDomain，也即企业号：登录后台->客服管理->客服账号->企业号
		let subDomain = 'vip'
		// 登录后台->渠道管理-》uniapp中创建应用获取
		let appKey = 'f4970e52-8cc8-48fd-84f6-82390640549d'
		bytedesk.init(subDomain, appKey);
		
		// 读取振动、提示音设置(可选)
		try {
		    this.vibrate = uni.getStorageSync(constants.vibrate)
			if (this.vibrate === null || this.vibrate === '') {
				this.vibrate = true
			}
			this.playAudio = uni.getStorageSync(constants.playAudio)
			if (this.playAudio === null || this.playAudio === '') {
				this.playAudio = true
			}
		} catch (error) {
		    console.error('read vibrate/playAudio error', error)
		}
	},
	onReady () {
		// 监听消息通知
		let app = this
		uni.$on('message',function(messageObject) {
			// console.log('uni on message');
			if (messageObject.type === 'text') {
				console.log('receive text:', messageObject.text.content);
			} else if (messageObject.type === 'image') {
				console.log('receive image:', messageObject.image.imageUrl);
			} else if (messageObject.type === 'voice') {
				console.log('receive voice:', messageObject.voice.voiceUrl);
			} else if (messageObject.type === 'video') {
				console.log('receive video:', messageObject.video.videoOrShortUrl);
			} else if (messageObject.type === 'file') {
				console.log('receive file:', messageObject.file.fileUrl);
			} else {
				console.log('其他类型消息')
			}
			// 仅支持APP
			// #ifdef APP-PLUS
			// 振动
			app.doVibrate();
			// 播放提示音
			app.doPlayAudio();
			// #endif
		})
	},
	methods: {
		// 振动
		doVibrate () {
			if (!this.vibrate) {
				return
			}
			// 仅支持APP
			// #ifdef APP-PLUS
			// 振动
			uni.vibrate({
			    success: function () {
			        console.log('振动');
			    }
			});
			// #endif
		},
		// 播放提示音
		doPlayAudio () {
			if (!this.playAudio) {
				return
			}
			// 仅支持APP
			// #ifdef APP-PLUS
			// 播放提示音
			const innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.autoplay = true;
			innerAudioContext.src = 'https://cdn.bytedesk.com/assets/sound/dingdong.wav';
			innerAudioContext.onPlay(() => {
			  console.log('开始播放');
			});
			innerAudioContext.onError((res) => {
			  console.log(res.errMsg);
			  console.log(res.errCode);
			});
			// #endif
		}
	}
}
</script>

<style>

</style>
