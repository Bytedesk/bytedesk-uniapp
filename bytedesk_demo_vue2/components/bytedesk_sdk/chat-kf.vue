<template>
	<view>
		<uni-notice-bar :show-close="true" :show-icon="true" :single="true" :scrollable="true" v-if="showTopTip" :text="topTip" @close="closeTopTip" />
		<view class="content" @touchstart="hideDrawer">
			<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop" :scroll-into-view="scrollToView" @scrolltoupper="loadMoreMessages" upper-threshold="50">
				<!-- 加载历史数据 waitingUI -->
				<view class="loading" v-if="isHistoryLoading">
					<view class="spinner">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view>
				<view class="row" v-for="(message, index) in messages" :key="index" :id="'msg'+message.uid">
					<!-- 时间戳 -->
					<view class="system">
						<view class="text"> {{ message.createdAt }}</view>
					</view>
					<!-- 商品消息 -->
					<!-- <view v-if="is_type_commodity(message)" id="goods" class="goods-info" @click="commodityCallback(message)">
						<view class="goods-pic">
							<image id="goods-pic" alt="" style="width: 100rpx; height: 100rpx;" width="50px" height="50px" :src="jsonObject(message.content).imageUrl"></image>
						</view>
						<view class="goods-desc">
							<view id="goods-name" class="goods-name">{{ jsonObject(message.content).title }}</view>
							<view class="goods-more">
								<view id="goods-price" class="goods-price">￥{{ jsonObject(message.content).price }}</view>
								<view id="goods-sendlink" class="goods-sendlink" @click="sendCommodityMessageSync()">{{ $t('sendcommodity') }}</view>
							</view>
						</view>
					</view> -->
					<!-- 系统消息 -->
					<view class="system">
						<view class="text" v-if="is_type_notification(message)">{{ $t(message.content) }}</view>
					</view>
					<!-- 用户消息 -->
					 <!--  && !is_type_commodity(message) -->
					<block v-if="!is_type_notification(message)">
						<!-- 自己发出的消息 -->
						<view class="my" v-if="is_self(message)">
							<!-- 左-消息 -->
							<view class="left">
								<!-- 发送状态 -->
								<view class="status">
									<view>{{ formatStatus(message.status) }}</view>
								</view>
								<!-- 文字消息 -->
								<view v-if="is_type_text(message)" class="bubble"  @longtap="longtap(message)">
									<rich-text :nodes="replaceFace($t(message.content))"></rich-text>
								</view>
								<!-- 语言消息 -->
								<view v-if="message.type=='voice'" class="bubble voice" @tap="playVoice(message)" :class="playMsgid == message.uid ? 'play' : ''">
									<view class="length">{{message.length}}</view>
									<view class="icon my-voice"></view>
								</view>
								<!-- 图片消息 -->
								<view v-if="is_type_image(message)" class="bubble img" @tap="previewImageMessage(message)">
									<image :src="message.content"></image>
								</view>
								<!-- 文件消息 -->
								<div v-if="is_type_file(message)" class="bubble">
								    <view><a :href="message.fileUrl" target="_blank">{{ $t('viewfile') }}</a></view>
								</div>
								<!-- 视频消息 -->
								<div v-if="is_type_video(message)" class="bubble">
								    <view><a :href="message.videoOrShortUrl" target="_blank">{{ $t('viewvideo') }}</a></view>
								</div>
								<!-- 机器人消息 -->
								<view v-if="is_type_robot(message)" class="bubble">
									<rich-text :nodes="message.content"></rich-text>
								</view>
							</view>
							<!-- 右-头像 -->
							<view class="right">
								<image :src="message.user.avatar"></image>
							</view>
						</view>
						<!-- 收到别人的消息 -->
						<view class="other" v-if="!is_self(message)">
							<!-- 左-头像 -->
							<view class="left">
								<image :src="message.user.avatar"></image>
							</view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right">
								<view class="username">
									<view class="name">{{ $t(message.user.nickname) }}</view> 
								</view>
								<!-- 文字消息 -->
								<view v-if="is_type_text(message)" class="bubble" @longtap="longtap(message)">
									<!-- <rich-text :nodes="replaceFace(message.content)"></rich-text> -->
									<view class="flex-column-start" style="color: #2fa39b;">
										<rich-text :nodes="replaceFace($t(message.content))" style="color: black;font-size: 25rpx; margin-top:20rpx;margin-bottom:10rpx;"></rich-text>
										<hr class="hr-solid" v-if="message.content.length > 0 && message.answers && message.answers.length > 0">
										<!-- <view class="flex-row-start  padding-top-sm" v-for="(item, index) in message.answers" :key="index">
											<text @click="queryAnswer(item)" style="margin-top: 20rpx;">
												{{ item.question }}
											</text>
										</view> -->
									</view>
								</view>
								<!-- 语音消息 -->
								<view v-if="is_type_voice(message)" class="bubble voice" @tap="playVoice(message)" :class="playMsgid === message.uid ? 'play': ''">
									<view class="icon other-voice"></view>
									<view class="length">{{ message.length }}</view>
								</view>
								<!-- 图片消息 -->
								<view v-if="is_type_image(message)" class="bubble img" @tap="previewImageMessage(message)">
									<image :src="message.content"></image>
								</view>
								<!-- 文件消息 -->
								<div v-if="is_type_file(message)" class="bubble">
								    <view><a :href="message.fileUrl" target="_blank">{{ $t('viewfile') }}</a></view>
								</div>
								<!-- 视频消息 -->
								<div v-if="is_type_video(message)" class="bubble">
								    <view><a :href="message.videoOrShortUrl" target="_blank">{{ $t('viewvideo') }}</a></view>
								</div>
								<view v-if="is_type_robot(message)" class="bubble">
									<!-- <rich-text :nodes="message.content"></rich-text> -->
									<view class="flex-column-start" style="color: #2fa39b;">
										<rich-text :nodes="message.content" style="color: black;font-size: 25rpx; margin-top:20rpx;margin-bottom:10rpx;"></rich-text>
										<!-- <view class="flex-row-start  padding-top-sm" v-for="(item, index) in message.answers" :key="index">
											<text @click="queryAnswer(item)" style="margin-top: 20rpx;">
												{{ item.question }}
											</text>
										</view> -->
										<hr class="hr-solid">
										<view class="flex-row-start padding-top-sm">
											<text class="my-neirong-sm">{{ $t('noanswer') }}</text>
											<text class="padding-left" style="color: #007AFF;" @click="requestAgent()">{{ $t('human') }}</text>
										</view>
									</view>
								</view>
								<!-- <view v-if="is_type_robot_v2(message)" class="bubble">
									<view class="flex-column-start" style="color: #2fa39b;">
										<rich-text :nodes="message.content" style="color: black;font-size: 25rpx; margin-top:20rpx;margin-bottom:10rpx;"></rich-text>
										<view class="flex-row-start  padding-top-sm" v-for="(item, index) in message.categories" :key="index">
											<text @click="queryCategory(item)" style="margin-top: 20rpx;">
												{{ item.name }}
											</text>
										</view>
									</view>
								</view> -->
								<!-- <view v-if="is_type_robot_result(message)" class="bubble">
									<view class="flex-column-start" style="color: #2fa39b;">
										<rich-text :nodes="message.content" style="color: black;font-size: 25rpx; margin-top:20rpx;margin-bottom:10rpx;"></rich-text>
										<view class="flex-row-start  padding-top-sm" v-for="(item, index) in message.answers" :key="index">
											<text @click="queryAnswer(item)" style="margin-top: 20rpx;">
												{{ item.question }}
											</text>
										</view>
										<hr class="hr-solid">
										<view class="flex-row-start padding-top-sm">
											<text style="color: #007AFF; font-size: 5px;" @click="rateAnswerHelpful(message.answer.aid, message.uid)">{{ $t('helpful') }}</text>
											<text class="padding-left" style="color: #007AFF; margin-left: 10px; font-size: 5px;" @click="rateAnswerHelpless(message.answer.aid, message.uid)">{{ $t('helpless') }}</text>
										</view>
									</view>
								</view> -->
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- 表情 -->
			<swiper class="emoji-swiper" :class="{hidden:hideEmoji}" indicator-dots="true" duration="150">
				<swiper-item v-for="(page, pid) in emojis" :key="pid">
					<view v-for="(item, index) in page" :key="index" @tap="addEmoji(item)">
						<image mode="widthFix" :src="emotionUrl(item.file)"></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- 更多功能 相册-拍照 -->
			<view class="more-layer" :class="{hidden:hideMore}">
				<view class="list">
					<view class="box" @tap="chooseImage"><view class="icon tupian2"></view></view>
					<view class="box" @tap="camera"><view class="icon paizhao"></view></view>
					<view class="box" @tap="showRatePage()">{{ $t('rate') }}</view>
				</view>
			</view>
		</view>
		<!-- 底部快捷按钮 -->
<!-- 		<view class="quick-button">
			<view>
				<button class="mini-btn" size="mini">123</button>
			</view>
		</view> -->
		<div v-if="showQuickButton" id="byteDesk-quick-question">
			<span id="byteDesk-quick-question-arrow" @click="switchQuickButtonItems()">{{ quickButtonArrow }}</span>
			<span v-if="showQuickButtonItem" class="byteDesk-quick-question-item" 
				v-for="item in quickButtons" :key="item.qid" 
				@click="quickButtonItemClicked(item)">{{ item.title }}</span>
		</div>
		<!-- 底部输入栏 -->
		<view class="input-box" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- H5下不能录音，输入栏布局改动一下 -->
			<!-- #ifndef H5 -->
			<view class="voice">
				<view class="icon" :class="isVoice?'jianpan':'yuyin'" @tap="switchVoice"></view>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="textbox">
				<view class="voice-mode" :class="[isVoice?'':'hidden',recording?'recording':'']" @touchstart="voiceBegin" @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd" @touchcancel="voiceCancel">{{voiceTis}}</view>
				<view class="text-mode"  :class="isVoice?'hidden':''">
					<view class="box">
						<textarea auto-height="true" v-model="inputContent" @input="onInputChange" @focus="textareaFocus"/>
					</view>
					<!-- 表情 -->
					<view class="em" @tap="chooseEmoji">
						<view class="icon biaoqing"></view>
					</view>
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="send" :class="isVoice?'hidden':''" @tap="sendTextMessage()">
				<view class="btn">{{ $t('send') }}</view>
			</view>
		</view>
		<!-- 录音UI效果 -->
		<view class="record" :class="recording?'':'hidden'">
			<view class="ing" :class="willStop?'hidden':''"><view class="icon luyin2" ></view></view>
			<view class="cancel" :class="willStop?'':'hidden'"><view class="icon chehui" ></view></view>
			<view class="tis" :class="willStop?'change':''">{{ recordTis }}</view>
		</view>
	</view>
</template>

<script>
import * as constants from '@/components/bytedesk_sdk/js/constants.js'
import * as utils from '@/components/bytedesk_sdk/js/utils.js'
import * as bytedesk from '@/components/bytedesk_sdk/js/bytedesk.js'
import * as httpApi from '@/components/bytedesk_sdk/js/httpapi.js'
import * as stompApi from '@/components/bytedesk_sdk/js/stompapi.js'
import moment from '@/components/bytedesk_sdk/js/moment.min.js'
import Vue from 'vue'
// 
export default {
	data() {
		return {
			//消息列表
			isHistoryLoading:false,
			scrollAnimation:false,
			scrollTop:0,
			scrollToView:'',
			
			//录音相关参数
			// #ifndef H5
			//H5不能录音
			RECORDER:uni.getRecorderManager(),
			// #endif
			isVoice:false,
			voiceTis: this.$t('pressToSpeak'), //'按住 说话',
			recordTis: this.$t('swipeToCancel'), // "手指上滑 取消发送",
			recording:false,
			willStop:false,
			initPoint:{identifier:0,Y:0},
			recordTimer:null,
			recordLength:0,
			
			//播放语音相关参数
			AUDIO:uni.createInnerAudioContext(),
			playMsgid:null,
			VoiceTimer:null,
			// 抽屉参数
			popupLayerClass:'',
			// more参数
			hideMore:true,
			//表情定义
			hideEmoji:true,
			option: {
				type: '',
				sid: '',
				// 
				title: '',
				//
				goods: '0',
				goods_categoryCode: '',
				goods_content: '',
				goods_id: '',
				goods_imageUrl: '',
				goods_price: '',
				goods_title: '',
				goods_url: '',
				//
				postscript: '',
				lang: 'cn',
			},
			isInputingVisible: false,
			localPreviewContent: '',
			//
			imageDialogVisible: false,
			currentImageUrl: '',
			currentVoiceUrl: '',
			// show_emoji: false,
			// emojiBaseUrl: 'https://chainsnow.oss-cn-shenzhen.aliyuncs.com/emojis/gif/',
			inputContent: '',
			messages: [],
			loadMoreVisible: true,
			//
			isLogin: false,
			// 留言 + 表单
			realname: '',
			mobile: '',
			email: '',
			age: 0,
			job: '',
			content: '',
			//
			showRealname: false,
			showMobile: false,
			showEmail: false,
			showAge: false,
			showJob: false,
			showContent: false,
			// 仅允许评价一次
			isRated: false,
			// 是否客服邀请评价
			isInviteRate: false,
			// 满意度评分
			rateScore: 5,
			rateValue: this.$t('verysatisfied'), //'非常满意',
			// 满意度附言
			rateContent: '',
			//
			isLoading: false,
			stompClient: '',
			sessionId: '',
			preSessionId: '',
			browseInviteBIid: '',
			//
			thread: {
				uid: '',
				topic: '',
				type: '',
				status: '',
				user: {
					uid: '',
					nickname: '',
					avatar: ''
				}
			},
			user: {
				uid: '',
				nickname: '',
				avatar: ''
			},
			// 已经订阅的topic
			subscribedTopics: [],
			// 加载聊天记录offset
			page: 0,
			// 是否是最后一批聊天记录
			last: false,
			// workGroup/visitor/contact/group
			type: 'workGroup',
			// 指定客服
			uid: '',
			username: '',
			// password: '',
			nickname: '',
			avatar: '',
			// 本地存储access_token的key
			token: 'bd_kfe_token',
			// 网络连接状态
			isNetworkConnected: true,
			answers: [],
			isRobot: false,
			isQueuing: false,
			isThreadStarted: false,
			isThreadClosed: false,
			// focusStatus: true,
			leaveMessageTip: '',
			loadHistory: '1',
			//
			postscript: '',
			isPostscriptSend: false, // 是否已经发送过附言
			isCommoditySend: false, // 是否已经发送过商品
			//
			hideNav: false,
			backUrl: '',
			topTip: '',
			showTopTip: false,
			//
			showMessage: true,
			showInputBar: true,
			showLeaveMessage: false,
			showRate: false,
			showForm: false,
			// app: this,
			visitorUid: '',
			// 快捷按钮
			quickButtonArrow: '↓',
			showQuickButton: false,
			showQuickButtonItem: true,
			quickButtons: [],
			// 转人工关键词
			transferWords: [],
			//
			loadHistoryTimer: '',
			sendMessageTimer: '',
			//
			emotionBaseUrl: 'https://chainsnow.oss-cn-shenzhen.aliyuncs.com/emojis/gif/',
			// 表情
			emotionMap: {
				'[微笑]': '100.gif',
				'[撇嘴]': '101.gif',
				'[色]': '102.gif',
				'[发呆]': '103.gif',
				'[得意]': '104.gif',
				'[流泪]': '105.gif',
				'[害羞]': '106.gif',
				'[闭嘴]': '107.gif',
				'[睡]': '108.gif',
				'[大哭]': '109.gif',

				'[尴尬]': '110.gif',
				'[发怒]': '111.gif',
				'[调皮]': '112.gif',
				'[呲牙]': '113.gif',
				'[惊讶]': '114.gif',
				'[难过]': '115.gif',
				'[酷]': '116.gif',
				'[冷汗]': '117.gif',
				'[抓狂]': '118.gif',
				'[吐]': '119.gif',

				'[偷笑]': '120.gif',
				'[愉快]': '121.gif',
				'[白眼]': '122.gif',
				'[傲慢]': '123.gif',
				'[饥饿]': '124.gif',
				'[困]': '125.gif',
				'[惊恐]': '126.gif',
				'[流汗]': '127.gif',
				'[憨笑]': '128.gif',
				'[悠闲]': '129.gif',

				'[奋斗]': '130.gif',
				'[咒骂]': '131.gif',
				'[疑问]': '132.gif',
				'[嘘]': '133.gif',
				'[晕]': '134.gif',
				'[疯了]': '135.gif',
				'[衰]': '136.gif',
				'[骷髅]': '137.gif',
				'[敲打]': '138.gif',
				'[再见]': '139.gif',

				'[擦汗]': '140.gif',
				'[抠鼻]': '141.gif',
				'[鼓掌]': '142.gif',
				'[糗大了]': '143.gif',
				'[坏笑]': '144.gif',
				'[左哼哼]': '145.gif',
				'[右哼哼]': '146.gif',
				'[哈欠]': '147.gif',
				'[鄙视]': '148.gif',
				'[委屈]': '149.gif',

				'[快哭]': '150.gif',
				'[阴险]': '151.gif',
				'[亲亲]': '152.gif',
				'[吓]': '153.gif',
				'[可怜]': '154.gif',
				'[菜刀]': '155.gif',
				'[西瓜]': '156.gif',
				'[啤酒]': '157.gif',
				'[篮球]': '158.gif',
				'[乒乓]': '159.gif',

				'[咖啡]': '160.gif',
				'[饭]': '161.gif',
				'[猪头]': '162.gif',
				'[玫瑰]': '163.gif',
				'[凋谢]': '164.gif',
				'[嘴唇]': '165.gif',
				'[爱心]': '166.gif',
				'[心碎]': '167.gif',
				'[蛋糕]': '168.gif',
				'[闪电]': '169.gif',

				'[炸弹]': '170.gif',
				'[刀]': '171.gif',
				'[足球]': '172.gif',
				'[瓢虫]': '173.gif',
				'[便便]': '174.gif',
				'[月亮]': '175.gif',
				'[太阳]': '176.gif',
				'[礼物]': '177.gif',
				'[拥抱]': '178.gif',
				'[强]': '179.gif',

				'[弱]': '180.gif',
				'[握手]': '181.gif',
				'[胜利]': '182.gif',
				'[抱拳]': '183.gif',
				'[勾引]': '184.gif',
				'[拳头]': '185.gif',
				'[差劲]': '186.gif',
				'[爱你]': '187.gif',
				'[No]': '188.gif',
				'[OK]': '189.gif',

				'[爱情]': '190.gif',
				'[飞吻]': '191.gif',
				'[跳跳]': '192.gif',
				'[发抖]': '193.gif',
				'[怄火]': '194.gif',
				'[转圈]': '195.gif',
				'[磕头]': '196.gif',
				'[回头]': '197.gif',
				'[跳绳]': '198.gif',
				'[投降]': '199.gif',

				'[激动]': '201.gif',
				'[乱舞]': '202.gif',
				'[献吻]': '203.gif',
				'[左太极]': '204.gif',
				'[右太极]': '205.gif'
			},
			// emoji表情, code代表来自微信端的表情字符，目前已经在服务器端处理替换为title字段，故code字段暂无用途
			emojis: [
				[
					{ title: '[微笑]', file: '100.gif' },
					{ title: '[撇嘴]', file: '101.gif' },
					{ title: '[色]', file: '102.gif' },
					{ title: '[发呆]', file: '103.gif' },
					{ title: '[得意]', file: '104.gif' },
					{ title: '[流泪]', file: '105.gif' },
					{ title: '[害羞]', file: '106.gif' },
					{ title: '[闭嘴]', file: '107.gif' },
					{ title: '[睡]', file: '108.gif' },
					{ title: '[大哭]', file: '109.gif' },
					{ title: '[尴尬]', file: '110.gif' },
					{ title: '[发怒]', file: '111.gif' },
					{ title: '[调皮]', file: '112.gif' },
					{ title: '[呲牙]', file: '113.gif' },
					{ title: '[惊讶]', file: '114.gif' },
					{ title: '[难过]', file: '115.gif' },
					{ title: '[酷]', file: '116.gif' },
					{ title: '[冷汗]', file: '117.gif' },
					{ title: '[抓狂]', file: '118.gif' },
					{ title: '[吐]', file: '119.gif' },
					{ title: '[偷笑]', file: '120.gif' },
					{ title: '[愉快]', file: '121.gif' },
					{ title: '[白眼]', file: '122.gif' },
					{ title: '[傲慢]', file: '123.gif' },
				],
				
				[
					{ title: '[饥饿]', file: '124.gif' },
					{ title: '[困]', file: '125.gif' },
					{ title: '[惊恐]', file: '126.gif' },
					{ title: '[流汗]', file: '127.gif' },
					{ title: '[憨笑]', file: '128.gif' },
					{ title: '[悠闲]', file: '129.gif' },
					{ title: '[奋斗]', file: '130.gif' },
					{ title: '[咒骂]', file: '131.gif' },
					{ title: '[疑问]', file: '132.gif' },
					{ title: '[嘘]', file: '133.gif' },
					{ title: '[晕]', file: '134.gif' },
					{ title: '[疯了]', file: '135.gif' },
					{ title: '[衰]', file: '136.gif' },
					{ title: '[骷髅]', file: '137.gif' },
					{ title: '[敲打]', file: '138.gif' },
					{ title: '[再见]', file: '139.gif' },
					{ title: '[擦汗]', file: '140.gif' },
					{ title: '[抠鼻]', file: '141.gif' },
					{ title: '[鼓掌]', file: '142.gif' },
					{ title: '[糗大了]', file: '143.gif' },
					{ title: '[坏笑]', file: '144.gif' },
					{ title: '[左哼哼]', file: '145.gif' },
					{ title: '[右哼哼]', file: '146.gif' },
					{ title: '[哈欠]', file: '147.gif' },
				],
				
				[
					{ title: '[鄙视]', file: '148.gif' },
					{ title: '[委屈]', file: '149.gif' },
					{ title: '[快哭]', file: '150.gif' },
					{ title: '[阴险]', file: '151.gif' },
					{ title: '[亲亲]', file: '152.gif' },
					{ title: '[吓]', file: '153.gif' }
				]
			]
		};
	},
	onLoad(option) {
		// this.getMsgList();
		//语音自然播放结束
		this.AUDIO.onEnded((res)=>{
			this.playMsgid=null;
		});
		// #ifndef H5
		//录音开始事件
		this.RECORDER.onStart((e)=>{
			this.recordBegin(e);
		})
		//录音结束事件
		this.RECORDER.onStop((e)=>{
			this.recordEnd(e);
		})
		// #endif
		this.option = option
		if (option.history === '0') {
			this.loadHistory = '0'
		}
		this.user = {
			uid: uni.getStorageSync(constants.VISITOR_UID),
			nickname: uni.getStorageSync(constants.VISITOR_NICKNAME),
			avatar: uni.getStorageSync(constants.VISITOR_AVATAR)
		}
		//
		let app = this;
		uni.$on('message',function(messageObject) {
			// console.log('uni on message');
			app.onMessageReceived(messageObject)
		})
		// uni.$on('close',function() {
		// 	console.log('close top tip');
		// 	this.showTopTip = false
		// })
	},
	onUnload() {
	    // 移除监听事件  
		uni.$off('message');
		//取消监听网络状态变化
		uni.offNetworkStatusChange(function(res) {});
	},
	onShow(){
		this.scrollTop = 9999999;
		//监听网络状态变化
		let app = this
		uni.onNetworkStatusChange(function(res) {
			app.isNetworkConnected = res.isConnected
			// console.log('isNetworkConnected：', res.isConnected); //当前是否有网络连接
			// console.log('networkType：', res.networkType); //网络类型
		});
	},
	onReady () {
		//
		// uni.setNavigationBarTitle({
		// 　　title:this.option.title
		// })
		// 正常打开
		this.requestThread()
	},
	computed: {
		// ...mapGetters([ 'userInfo' ]),
		threadTopic() {
			return this.thread.topic.replace(/\//g, ".");
		},
	},
	methods:{
		//
		is_self (message) {
			// let uid = uni.getStorageSync(constants.VISITOR_UID)
			return message.user.uid === uni.getStorageSync(constants.VISITOR_UID);
		},
		// 发送状态
		is_sending (message) {
			return message.status === 'sending'
		},
		is_stored (message) {
			return message.status === 'stored'
		},
		is_received (message) {
			return message.status === 'received'
		},
		is_error (message) {
			return message.status === 'error'
		},
		is_read (message) {
			return message.status === 'read'
		},
		// 消息类型
		is_type_text (message) {
			return message.type === constants.MESSAGE_TYPE_WELCOME
				|| message.type === constants.MESSAGE_TYPE_TEXT
		},
		is_type_robot (message) {
			return message.type === 'robot'
		},
		is_type_image (message) {
			return message.type === constants.MESSAGE_TYPE_IMAGE
		},
		is_type_file (message) {
			return message.type === 'file'
		},
		is_type_voice (message) {
			return message.type === 'voice'
		},
		is_type_video (message) {
		  return message.type === 'video' || message.type === 'shortvideo'
		},
		is_type_notification (message) {
			return message.type === constants.MESSAGE_TYPE_SYSTEM 
        || message.type === constants.MESSAGE_TYPE_CONTINUE 
        || message.type === constants.MESSAGE_TYPE_AUTO_CLOSED 
        || message.type === constants.MESSAGE_TYPE_AGENT_CLOSED
		},
		is_type_close (message) {
			return message.type === 'notification_auto_close'
			|| message.type === 'notification_agent_close'
		},
		formatStatus(status) {
			if (status === constants.MESSAGE_STATUS_READ) {
				return '已读' // 对方已读
			} else if (status === constants.MESSAGE_STATUS_DELIVERED) {
				return '送达' // 已经发送到对方客户端
			} else if (status === constants.MESSAGE_STATUS_SUCCESS) {
				return '' // 发送到服务器，发送成功
			} else if (status === constants.MESSAGE_STATUS_ERROR) {
				return '失败' // 发送失败
			} else if (status === constants.MESSAGE_STATUS_SENDING) {
				return '发送中..' // 发送中
			} else {
				return status
			}
		},
		jsonObject (content) {
			// console.log('parse json:', content);
			return JSON.parse(content);
		},
		// 识别链接, FIXME: 对于不带http(s)前缀的url，会被识别为子链接，点击链接无法跳出
		replaceUrl(content) {
			if (!content) {
				return content;
			}
			const urlPattern = /(https?:\/\/|www\.)[a-zA-Z_0-9\-@]+(\.\w[a-zA-Z_0-9\-:]+)+(\/[()~#&\-=?+%/.\w]+)?/g;
			return content.replace(urlPattern, (url) => {
				// console.log('url:', url)
				return `<a href="${url}" target="_blank">${url}</a>`;
			})
		},
		//  在发送信息之后，将输入的内容中属于表情的部分替换成emoji图片标签
		//  再经过v-html 渲染成真正的图片
		replaceFace(content) {
			if (content === null || content === undefined) {
				return ''
			}
			// 识别链接
			let replaceUrl = this.replaceUrl(content)
			//
			var emotionMap = this.emotionMap;
			var reg = /\[[\u4E00-\u9FA5NoOK]+\]/g
			var matchresult = replaceUrl.match(reg)
			var result = replaceUrl
			if (matchresult) {
				for (var i = 0; i < matchresult.length; i++) {
					result = result.replace(matchresult[i], '<img height=\'25px\' width=\'25px\' style=\'margin-bottom:4px;\' src=\'' + this.emotionBaseUrl + emotionMap[matchresult[i]] + '\'>')
				}
			}
			return result
		},
		escapeHTML(content) {
			return content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		},
		scrollToBottom () {
			if (this.messages.length > 0) {
				// console.log('scroll to bottom', this.messages.length);
				let lastMessage = this.messages[this.messages.length - 1]
				this.scrollToMessage(lastMessage)
			}
			// 聊天记录滚动到最底部, FIXME: 不起作用？
			// this.$nextTick(function() {
			// 	//进入页面滚动到底部
			// 	this.scrollTop = 9999;
			// 	this.$nextTick(function() {
			// 		this.scrollAnimation = true;
			// 	});
			// });
		},
		scrollToMessage (message) {
			// console.log('scroll to ', message.uid);
			this.$nextTick(function() {
				this.scrollToView = 'msg'+message.uid;//跳转上次的第一行信息位置
				this.$nextTick(function() {
					this.scrollAnimation = true;//恢复滚动动画
				});
			});
		},
		// 请求会话
		requestThread () {
			//
			let app = this
			bytedesk.requestThread(this.option.type, this.option.sid, false, function(response) {
				// console.log('request thread success', response)
				app.dealWithThread(response);
   			}, function(error) {
				console.log('request thread error', error)
			})			
		},
		// 
		dealWithThread (response) {
			console.log('dealWithThread:', response)
			let message = response.data;
			if (response.code === 200) {
				// // 1. 保存thread
				// this.thread = message.thread;
				this.thread = {
					uid: message.thread.uid,
					topic: message.thread.topic,
					type: message.thread.type,
					status: message.thread.status,
					user: message.thread.user
				}
				console.log('thread: ', this.thread)
				//
				this.pushToMessageArray(message);
			}
			this.scrollToBottom();
			// // 建立长连接
			this.byteDeskConnect();
		},
		// 留言页面
		switchLeaveMessage () {
			uni.redirectTo({
				url: '../../components/bytedesk_sdk/leavemsg?wid=' + this.option.wid + '&type=' + this.option.type + '&aid=' + this.option.aid + '&tip=' + this.leaveMessageTip
			});
		},
		// 输入框内容发生变化
		onInputChange (event) {
			console.log('onInputChange:', event.detail.value)
		},
		// 发送文本消息-封装
		sendTextMessage () {
			//
			if (this.inputContent.trim().length === 0) {
				return;
			}
			// 发送/广播会话消息
			this.sendMessage(constants.MESSAGE_TYPE_TEXT, this.inputContent)
			// 清空输入框
			this.inputContent = "";
			// 设置焦点
			// setTimeout(function(){
			// 	$("input")[1].focus()
			// }, 100);
		},
		sendImageMessage(imageUrl) {
			this.sendMessage(constants.MESSAGE_TYPE_IMAGE, imageUrl)
		},
		// 发送预知消息
		sendPreviewMessage() {
		},
		// 发送回执消息
		sendReceiptMessage (uid, status) {
		},
		// 发送消息撤回消息
		sendRecallMessage (uid) {
		},
		sendMessage(type, content) {
			// this.sendMessageSync('text', content)
			if (content.length === 0) {
				// alert('消息不能为空');
				uni.showToast({ title: this.$t('msgshouldnotempty'), icon:'none', duration: 2000 });
				return;
			}
			if (content.length >= 500) {
				// alert('消息长度太长，请分多次发送');
				// alert(this.$t('msgtoolong'))
				uni.showToast({ title: this.$t('msgtoolong'), icon:'none', duration: 2000 });
				return;
			}
			if (this.thread.tid === '') {
				uni.showToast({ title: this.$t('pleaseWait'), icon:'none', duration: 2000 });
				return;
			}
			//
			var messageExtra = {
				orgUid: uni.getStorageSync(constants.VISITOR_ORGUID)
			}
			var json = {
				"uid": utils.guid(),
				"type": type,
				"content": content,
				"status": constants.MESSAGE_STATUS_SENDING,
				"createdAt": this.currentTimestamp(),
				"client": constants.HTTP_CLIENT,
				"extra": JSON.stringify(messageExtra),
				"user": {
					"uid": this.user.uid,
					"nickname": this.user.nickname,
					"avatar": this.user.avatar
				},
				"thread": {
					"uid": this.thread.uid,
					"topic": this.thread.topic,
					"type": this.thread.type,
					"status": this.thread.status,
					"user": this.thread.user
				}
			};
			this.doSendMessage(json);
		},
		sendMessageJsonRest (uid, type, content) {
			// 
		},
		// 实际发送消息
		doSendMessage (json) {
			console.log('doSendMessage:', json)
			// if (this.my_uid() === '') {
			// 	uni.showToast({ title: 'uid不能为空', icon:'none', duration: 2000 });
			// 	return
			// }
			// 判断网络是否断开，如果断开，则提示并直接返回
			if (!this.isNetworkConnected) {
				uni.showToast({ title: '网络断开，请稍后重试', icon:'none', duration: 2000 });
				return
			}
			// 会话请求成功之后，才能够发送消息
			if (this.thread.tid === '') {
				uni.showToast({ title: '请求会话中, 请稍后', icon:'none', duration: 2000 });
				return;
			}
			if (stompApi.isConnected()) {
				// stompApi.sendMessage(this.threadTopic, JSON.stringify(json));
				stompApi.sendMessage(JSON.stringify(json));
			} else {
				this.doSendMessageRest(json)
			}
			// 先插入本地
			this.onMessageReceived(json)
		},
		doSendMessageRest(json) {
			console.log('doSendMessageRest:', json)
			// let app = this
			// httpApi.sendMessageRest(JSON.stringify(json), function(response) {
			// 	console.log('sendMessageRest success:', response)
			// 	let message = JSON.parse(response.data)
			// 	for (let i = app.messages.length - 1; i >= 0; i--) {
			// 		const msg = app.messages[i]
			// 		// console.log('uid:', msg.uid, message.uid)
			// 		if (msg.uid === message.uid) {
			// 			// 可更新顺序 read > received > stored > sending, 前面的状态可更新后面的
			// 			if (app.messages[i].status === 'read' ||
			// 				app.messages[i].status === 'received') {
			// 				return
			// 			}
			// 			Vue.set(app.messages[i], 'status', 'stored')
			// 			return
			// 		}
			// 	}
			// }, function(error) {
			// 	console.log('send message rest error:', error)
			// })
		},
		// 本地消息存储
		pushToMessageArray(message) {
			console.log('pushToMessageArray:', message)
			// 判断是否已经存在
			let contains = false
			for (var i = 0; i < this.messages.length; i++) {
				let msg = this.messages[i]
				if (msg.uid === message.uid) {
					contains = true
				}
			}
			// 如果不存在，则保存
			if (!contains) {
				this.messages.push(message);
				// 排序
				this.messages.sort(function (a, b) {
					if (a.createdAt > b.createdAt) {
					  return 1
					}
					if (a.createdAt < b.createdAt) {
					  return -1
					}
					return 0
				});
			}
			// 消息持久化到 localstorage, 当前消息条数大于100时，清空数据
			if (this.messages.length > 100) {
				uni.setStorage(topic , "");
			} else {
				let topic = this.thread.topic.replace(/\//g, ".");
				let localMessages = JSON.stringify(this.messages);
				uni.setStorage(topic , localMessages);
			}
		},
		// 建立长连接
		byteDeskConnect () {
			//
			if (stompApi.isConnected()) {
				// 订阅topic
				// let topic = this.thread.topic.replace(/\//g, ".")
				// stompApi.subscribeTopic(this.threadTopic);
				stompApi.subscribeTopic(this.thread.topic);
				// 获取本地缓存聊天记录
				// let messagesCache = stompApi.getCacheMessages(topic)
				// for (var i = 0; i < messagesCache.length; i++) {
				// 	let messageObject = messagesCache[i]
				// 	this.onMessageReceived(messageObject)
				// }
			} else {
				stompApi.connect(this.thread.topic, function() {
					// 长连接成功回调
				})
			}
			// 发送附言信息
			// if (this.option.postscript !== null 
			// 	&& this.option.postscript !== undefined 
			// 	&& this.option.postscript !== '' && !this.isPostscriptSend) {
			// 	this.sendTextMessageSync(this.option.postscript)
			// 	this.isPostscriptSend = true
			// }
			// 发送商品信息
			// if (!this.isCommoditySend) {
			// 	this.sendCommodityMessageSync()
			// 	this.isCommoditySend = true
			// }
			// 获取本地缓存聊天记录
			// let topic = this.thread.topic.replace(/\//g, ".");
			// if (topic.length > 0) {
			// 	// 从localstorage里面加载消息
			// 	var localMessages = uni.getStorageSync(topic);
			// 	// console.log('localMessages:', localMessages)
			// 	if (localMessages != null && localMessages.length > 0) {
			// 		var localMessageObjects = JSON.parse(localMessages)
			// 		for (var i = 0; i < localMessageObjects.length; i++) {
			// 			let messageObject = localMessageObjects[i]
			// 			this.onMessageReceived(messageObject)
			// 		}
			// 	}
			// }
			// 加载更多聊天记录
			// this.loadHistoryMessagesByTopic(this.thread.topic)
		},
		// 监听接收消息
		onMessageReceived (messageObject) {
			// console.log('onMessageReceived:', messageObject)
			if (!this.is_self(messageObject)) {
				switch (messageObject.type) {
					case constants.MESSAGE_TYPE_READ:
					case constants.MESSAGE_TYPE_DELIVERED:
						console.log("receive receipt message:", messageObject);
						this.updateMessageStatus(messageObject);
						return;
					case constants.MESSAGE_TYPE_TYPING:
						// 通知界面显示typing
						// emitter.emit(EVENT_BUS_MESSAGE_TYPE_TYPING);
						return;
					case constants.MESSAGE_TYPE_PROCESSING:
						// 通知界面显示processing
						// emitter.emit(EVENT_BUS_MESSAGE_TYPE_PROCESSING);
						return;
					case constants.MESSAGE_TYPE_PREVIEW:
						return;
					case constants.MESSAGE_TYPE_STREAM:
						// emitter.emit(EVENT_BUS_MESSAGE_TYPE_STREAM);
						break;
					default:
				}
				// 播放声音
				// playAudio();
				// 发送消息送达回执到服务器
				// sendReceiptMessage(orgUid, messageObject);
			} else {
				if (utils.shouldReturn(messageObject)) {
					return;
				}
			}
			// 
			this.pushToMessageArray(messageObject);
			// this.scrollToBottom()
			this.scrollToMessage(messageObject)
		},
		updateMessageStatus(messageObject) {
			let app = this
			for (let i = app.messages.length - 1; i >= 0; i--) {
				const msg = app.messages[i]
				console.log('uid:', msg.uid, messageObject.uid)
				if (msg.uid === messageObject.content) {
					// 可更新顺序 read > received > stored > sending, 前面的状态可更新后面的
					// if (app.messages[i].status === 'read' ||
					// 	app.messages[i].status === 'received') {
					// 	return
					// }
					console.log("updateMessageStatus", messageObject.uid, messageObject.type)
					Vue.set(app.messages[i], 'status', messageObject.type)
					return
				}
			}
		},
		//
		currentTimestamp () {
			return moment().format('YYYY-MM-DD HH:mm:ss')
		},
		// 点击商品回调
		commodityCallback (message) {
			// console.log('commodity:', message)
			uni.$emit('commodity', message.content);
		},
		// 选择图片发送
		chooseImage(){
			this.getImage('album');
		},
		//拍照发送
		camera(){
			this.getImage('camera');
		},
		//选照片 or 拍照
		getImage (type) {
			// 拍照 + 相册
			console.log('take picture');
			let app = this;
			uni.chooseImage({
				count: 1, //默认9
				sourceType:[type],
			    success: (chooseImageRes) => {
					console.log('chooseImageRes:', chooseImageRes);
			        const tempFilePaths = chooseImageRes.tempFilePaths;
			        uni.uploadFile({
			            url: constants.UPLOAD_FILE_URL,
			            filePath: tempFilePaths[0],
			            name: 'file',
			            formData: {
			                'file_name': app.guid(),
							'file_type': 'image',
							'is_avatar': 'false',
							'kb_type': constants.UPLOAD_TYPE_CHAT,
							'visitor_uid': uni.getStorageSync(constants.VISITOR_UID),
							'nickname': uni.getStorageSync(constants.VISITOR_NICKNAME),
							'avatar': uni.getStorageSync(constants.VISITOR_AVATAR),
							'org_uid': uni.getStorageSync(constants.VISITOR_ORGUID),
							'client': constants.HTTP_CLIENT
			            },
			            success: (response) => {
			                console.log(response.data);
							// 发送图片
							var imageUrl = JSON.parse(response.data).data;
							console.log('imageUrl:', imageUrl)
							app.sendImageMessage(imageUrl)
			            }
			        });
			    }
			});
		},
		previewImageMessage (message) {
			uni.previewImage({
				urls: [message.imageUrl]
			});
		},
		guid() {
			function s4 () {
				return Math.floor((1 + Math.random()) * 0x10000)
					.toString(16)
					.substring(1)
			}
			let timestamp = moment(new Date()).format('YYYYMMDDHHmmss');
			return timestamp + s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4()
			// return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
		},
		//
		showRatePage () {
			this.isInviteRate = false;
			this.gotoRatePage()
		},
		//
		gotoRatePage () {
			//
			uni.navigateTo({
				url: './rate?tid=' + this.thread.tid + '&invite=' + this.isInviteRate
			});
		},
		//更多功能(点击+弹出) 
		showMore() {
			this.isVoice = false;
			this.hideEmoji = true;
			if(this.hideMore){
				this.hideMore = false;
				this.openDrawer();
			}else{
				this.hideDrawer();
			}
		},
		// 打开抽屉
		openDrawer(){
			this.popupLayerClass = 'showLayer';
		},
		// 隐藏抽屉
		hideDrawer(){
			this.popupLayerClass = '';
			setTimeout(()=>{
				this.hideMore = true;
				this.hideEmoji = true;
			},150);
		},
		// 选择表情
		chooseEmoji(){
			this.hideMore = true;
			if(this.hideEmoji){
				this.hideEmoji = false;
				this.openDrawer();
			}else{
				this.hideDrawer();
			}
		},
		//添加表情
		addEmoji(item){
			this.inputContent += item.title;
		},
		emotionUrl(file) {
		  return this.emotionBaseUrl + file;
		},
		//获取焦点，如果不是选表情ing,则关闭抽屉
		textareaFocus(){
			if(this.popupLayerClass=='showLayer' && this.hideMore == false){
				this.hideDrawer();
			}
		},
		// 播放语音
		playVoice(message) {
			this.playMsgid = message.uid;
			// this.AUDIO.src = message.voice.voiceUrl;
			this.AUDIO.src = message.voiceUrl;
			this.$nextTick(function() {
				this.AUDIO.play();
			});
		},
		// 录音开始
		voiceBegin(e){
			if(e.touches.length>1){
				return ;
			}
			this.initPoint.Y = e.touches[0].clientY;
			this.initPoint.identifier = e.touches[0].identifier;
			this.RECORDER.start({format:"mp3"}); //录音开始,
		},
		//录音开始UI效果
		recordBegin(e){
			this.recording = true;
			this.voiceTis = this.$t('releaseToClose'); //'松开 结束';
			this.recordLength = 0;
			this.recordTimer = setInterval(()=>{
				this.recordLength++;
			},1000)
		},
		// 录音被打断
		voiceCancel(){
			this.recording = false;
			this.voiceTis = this.$t('pressToSpeak'); //'按住 说话';
			this.recordTis = this.$t('swipeToCancel'); //'手指上滑 取消发送'
			this.willStop = true;//不发送录音
			this.RECORDER.stop();//录音结束
		},
		// 录音中(判断是否触发上滑取消发送)
		voiceIng(e){
			if(!this.recording){
				return;
			}
			let touche = e.touches[0];
			//上滑一个导航栏的高度触发上滑取消发送
			if(this.initPoint.Y - touche.clientY>=uni.upx2px(100)){
				this.willStop = true;
				this.recordTis = this.$t('releaseToCancel') //'松开手指 取消发送'
			}else{
				this.willStop = false;
				this.recordTis = this.$t('swipeToCancel') //'手指上滑 取消发送'
			}
		},
		// 结束录音
		voiceEnd(e){
			if(!this.recording){
				return;
			}
			this.recording = false;
			this.voiceTis= this.$t('pressToSpeak') //'按住 说话';
			this.recordTis = this.$t('swipeToCancel') //'手指上滑 取消发送'
			this.RECORDER.stop();//录音结束
		},
		//录音结束(回调文件)
		recordEnd(e){
			clearInterval(this.recordTimer);
			if(!this.willStop){
				// e: {"tempFilePath":"_doc/uniapp_temp_1610607301718/recorder/1610607667800.mp3"}
				// console.log("e: " + JSON.stringify(e), ' length:', this.recordLength);
				let app = this;
				uni.uploadFile({
				    url: constants.UPLOAD_VOICE_URL,
				    filePath: e.tempFilePath,
				    name: 'file',
				    formData: {
				        'file_name': app.guid() + ".mp3",
						'username': app.username,
						'client': constants.client
				    },
				    success: (response) => {
				        console.log(response.data);
						// 发送图片
						var voiceUrl = JSON.parse(response.data).data;
						app.sendVoiceMessageSync(voiceUrl, this.recordLength, "mp3");
				    }
				});
				
			} else {
				// console.log('取消发送录音');
			}
			this.willStop = false;
		},
		// 切换语音/文字输入
		switchVoice() {
			this.hideDrawer();
			this.isVoice = this.isVoice?false:true;
		},
		discard() {
			return;
		},
		can_recall(message) {
		  return (
			this.callRecallMessage(message) &&
			this.is_self(message)
		  );
		},
		// 检测是否在3分钟之内，允许撤回消息
		callRecallMessage(message) {
		  let now = moment(new Date(), "YYYY-MM-DD HH:mm:ss");
		  let createdAt = moment(message.createdAt, "YYYY-MM-DD HH:mm:ss");
		  let seconds = now.diff(createdAt, "seconds");
		  // 现在距消息发送的时间差
		  // console.log('seconds passed: ', seconds)
		  if (seconds < 180) {
			return true;
		  }
		  return false;
		},
		// 长按复制消息
		longtap (message){
		    console.log('longtap',message);
			let app = this
			if (this.can_recall(message)) {
				uni.showActionSheet({
					title: this.$t('chooseAction'), //'选择操作',
					itemList: [this.$t('copy'), this.$t('retract')],
					success: (e) => {
						console.log(e.tapIndex);
						if (e.tapIndex === 0) {
							// #ifndef H5
							let content = message.content.replaceAll('amp;', '')
							uni.setClipboardData({
							  data: content,//要被复制的内容
							  success:() => { //复制成功的回调函数
							    uni.showToast({ //提示
							      title: this.$t('copySuccess') //'复制成功'
							    })
							  }
							});
							// #endif
						} else {
							app.sendRecallMessage(message.uid)
						}
					}
				})
			} else {
				// #ifndef H5
				let content = message.content.replaceAll('amp;', '')
				uni.setClipboardData({
				  data: content,//要被复制的内容
				  success:() => { //复制成功的回调函数
				    uni.showToast({ //提示
				      title: this.$t('copySuccess') //'复制成功'
				    })
				  }
				});
				// #endif
			}
		},
		closeTopTip () {
			// console.log('closeTopTip');
			this.showTopTip = false
		},
		loadMoreMessages() {},
		checkTimeoutMessage() {
		  // 检测-消息是否超时发送失败
		//   for (let i = 0; i < this.messages.length; i++) {
		// 	const message = this.messages[i];
		// 	if (this.is_self(message) && this.is_sending(message)) {
		// 	  let timestamp = moment(message.createdAt);
		// 	  let now = moment(new Date());
		// 	  let diff = now.diff(timestamp, "seconds");
		// 	  console.log('diff:', diff)
		// 	  if (diff > 15) {
		// 		// 超时15秒，设置为消息状态为error
		// 		// this.messages[i].status = 'error'
		// 		Vue.set(this.messages[i], 'status', 'error')
		// 	  } else if (diff > 5) {
		// 		// 5秒没有发送成功，则尝试使用http rest接口发送
		// 		let content = ''
		// 		if (message.type === constants.MESSAGE_TYPE_TEXT) {
		// 			content = message.content
		// 		} else if (message.type === constants.MESSAGE_TYPE_IMAGE) {
		// 			content = message.imageUrl
		// 		} else if (message.type === constants.MESSAGE_TYPE_FILE) {
		// 			content = message.fileUrl
		// 		} else if (message.type === constants.MESSAGE_TYPE_VOICE) {
		// 			content = message.voiceUrl
		// 		} else if (message.type === constants.MESSAGE_TYPE_VIDEO) {
		// 			content = message.videoOrShortUrl
		// 		} else if (message.type === constants.MESSAGE_TYPE_COMMODITY) {
		// 			content = this.commodityInfo();
		// 		}
		// 		this.sendMessageJsonRest(message.uid, message.type, content)
		// 	  }
		// 	}
		//   }
		}
	},
	mounted() {
	  // 如果长连接断开，则定时刷新聊天记录
	  this.loadHistoryTimer = setInterval(this.loadLatestMessage, 1000 * 10);
	  this.sendMessageTimer = setInterval(this.checkTimeoutMessage, 1000);
	},
	beforeDestroy() {
	  clearInterval(this.loadHistoryTimer);
	  clearInterval(this.sendMessageTimer);
	}
}
</script>

<style lang="scss">
	@import "css/style.scss";
</style>