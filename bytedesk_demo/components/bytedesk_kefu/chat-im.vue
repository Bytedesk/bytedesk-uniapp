<template>
	<view>
		<view class="content" @touchstart="hideDrawer">
			<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop" :scroll-into-view="scrollToView" @scrolltoupper="loadHistoryMessage" upper-threshold="50">
				<!-- 加载历史数据waitingUI -->
				<view class="loading" v-if="isHistoryLoading">
					<view class="spinner">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view>
				<view class="row" v-for="(message, index) in messages" :key="index" :id="'msg'+message.id">
					<!-- 时间戳 -->
					<view class="system">
						<view class="text"> {{ message.createdAt }}</view>
					</view>
					
					<view v-if="is_type_commodity(message)" id="goods" class="goods-info">
						<view class="goods-pic">
							<img id="goods-pic" alt="" width="50px" height="50px":src="jsonObject(message.content).imageUrl">
						</view>
						<view class="goods-desc">
							<view id="goods-name" class="goods-name">{{ jsonObject(message.content).title }}</view>
							<view class="goods-more">
								<view id="goods-price" class="goods-price">￥{{ jsonObject(message.content).price }}</view>
								<view id="goods-sendlink" class="goods-sendlink" @click="sendCommodityMessageSync()">发送商品</view>
							</view>
						</view>
					</view>
					
					<!-- 系统消息 -->
					<view class="system">
						<view class="text" v-if="is_type_notification_agent_close(message)">{{ message.content }}</view>
						<view class="text" v-else-if="is_type_notification_visitor_close(message)">{{ message.content }}</view>
						<view class="text" v-else-if="is_type_notification_auto_close(message)">{{ message.content }}</view>
						<view class="text" v-else-if="is_type_notification_thread_reentry(message)">{{ message.content }}</view>
						<view class="text" v-else-if="is_type_notification_offline(message)">{{ message.content }}</view>
						<view class="text" v-else-if="is_type_notification_invite_rate(message)">{{ message.content }}</view>
						<view class="text" v-else-if="is_type_notification_rate_result(message)">{{ message.content }}</view>
						<view class="text" v-else-if="is_type_notification(message)">{{ message.content }}</view>
					</view>
					<!-- 用户消息 -->
					<block v-if="!is_type_notification(message) && !is_type_commodity(message)">
						<!-- 自己发出的消息 -->
						<view class="my" v-if="is_self(message)">
							<!-- 左-消息 -->
							<view class="left">
								<!-- 文字消息 -->
								<view v-if="is_type_text(message)" class="bubble">
									<rich-text :nodes="message.content"></rich-text>
								</view>
								<!-- 语言消息 -->
								<view v-if="message.type=='voice'" class="bubble voice" @tap="playVoice(message)" :class="playMsgid == message.mid ? 'play' : ''">
									<view class="length">{{message.voice.length}}</view>
									<view class="icon my-voice"></view>
								</view>
								<!-- 图片消息 -->
								<view v-if="is_type_image(message)" class="bubble img" @tap="previewImageMessage(message)">
									<image :src="message.imageUrl"></image>
								</view>
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
						<!-- 别人发出的消息 -->
						<view class="other" v-if="!is_self(message)">
							<!-- 左-头像 -->
							<view class="left">
								<image :src="message.user.avatar"></image>
							</view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right">
								<view class="username">
									<view class="name">{{ message.user.nickname }}</view> 
								</view>
								<!-- 文字消息 -->
								<view v-if="is_type_text(message)" class="bubble">
									<rich-text :nodes="message.content"></rich-text>
								</view>
								<!-- 语音消息 -->
								<view v-if="is_type_voice(message)" class="bubble voice" @tap="playVoice(message)" :class="playMsgid === message.mid ? 'play': ''">
									<view class="icon other-voice"></view>
									<view class="length">{{ message.voice.length }}</view>
								</view>
								<!-- 图片消息 -->
								<view v-if="is_type_image(message)" class="bubble img" @tap="previewImageMessage(message)">
									<image :src="message.imageUrl"></image>
								</view>
								<view v-if="is_type_robot(message)" class="bubble img">
									<!-- <rich-text :nodes="message.content"></rich-text> -->
									<view class="flex-column-start" style="color: #2fa39b;">
										<rich-text :nodes="message.content" style="color: black;font-size: 25rpx;cmargin-top: 20rpx;"></rich-text>
										<text @click="queryAnswer(item)" style="margin-top: 20rpx;" v-for="(item, index) in message.answers" :key="index">
											{{item.question}}
										</text>
										<!-- TODO: -->
			<!-- 							<view class="flex-row-start  padding-top-sm">
											<text class="my-neirong-sm">没有你要的答案?</text>
											<text class="padding-left" style="color: #007AFF;">换一批</text>
										</view> -->
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- 表情 --> 
<!-- 			<swiper class="emoji-swiper" :class="{hidden:hideEmoji}" indicator-dots="true" duration="150">
				<swiper-item v-for="(page,pid) in emojiList" :key="pid">
					<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
						<image mode="widthFix" :src="'/image/emoji/'+em.url"></image>
					</view>
				</swiper-item>
			</swiper> -->
			<!-- 更多功能 相册-拍照 -->
			<view class="more-layer" :class="{hidden:hideMore}">
				<view class="list">
					<view class="box" @tap="chooseImage"><view class="icon tupian2"></view></view>
					<view class="box" @tap="camera"><view class="icon paizhao"></view></view>
				</view>
			</view>
		</view>
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
						<textarea auto-height="true" v-model="inputContent" @focus="textareaFocus"/>
					</view>
<!-- 					<view class="em" @tap="chooseEmoji">
						<view class="icon biaoqing"></view>
					</view> -->
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="send" :class="isVoice?'hidden':''" @tap="sendTextMessage()">
				<view class="btn">发送</view>
			</view>
		</view>
		<!-- 录音UI效果 -->
		<view class="record" :class="recording?'':'hidden'">
			<view class="ing" :class="willStop?'hidden':''"><view class="icon luyin2" ></view></view>
			<view class="cancel" :class="willStop?'':'hidden'"><view class="icon chehui" ></view></view>
			<view class="tis" :class="willStop?'change':''">{{recordTis}}</view>
		</view>
	</view>
</template>
<script>
import * as constants from '@/components/bytedesk_kefu/js/constants.js'
import * as httpApi from '@/components/bytedesk_kefu/js/api/httpapi.js'
import * as stompApi from '@/components/bytedesk_kefu/js/api/stompapi.js'
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
			msgList:[],
			msgImgList:[],
			myuid:0,
			
			//录音相关参数
			// #ifndef H5
			//H5不能录音
			RECORDER:uni.getRecorderManager(),
			// #endif
			isVoice:false,
			voiceTis:'按住 说话',
			recordTis:"手指上滑 取消发送",
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
			// emojiList:[
			// 	[{"url":"100.gif",alt:"[微笑]"},{"url":"101.gif",alt:"[伤心]"},{"url":"102.gif",alt:"[美女]"},{"url":"103.gif",alt:"[发呆]"},{"url":"104.gif",alt:"[墨镜]"},{"url":"105.gif",alt:"[哭]"},{"url":"106.gif",alt:"[羞]"},{"url":"107.gif",alt:"[哑]"},{"url":"108.gif",alt:"[睡]"},{"url":"109.gif",alt:"[哭]"},{"url":"110.gif",alt:"[囧]"},{"url":"111.gif",alt:"[怒]"},{"url":"112.gif",alt:"[调皮]"},{"url":"113.gif",alt:"[笑]"},{"url":"114.gif",alt:"[惊讶]"},{"url":"115.gif",alt:"[难过]"},{"url":"116.gif",alt:"[酷]"},{"url":"117.gif",alt:"[汗]"},{"url":"118.gif",alt:"[抓狂]"},{"url":"119.gif",alt:"[吐]"},{"url":"120.gif",alt:"[笑]"},{"url":"121.gif",alt:"[快乐]"},{"url":"122.gif",alt:"[奇]"},{"url":"123.gif",alt:"[傲]"}],
			// 	[{"url":"124.gif",alt:"[饿]"},{"url":"125.gif",alt:"[累]"},{"url":"126.gif",alt:"[吓]"},{"url":"127.gif",alt:"[汗]"},{"url":"128.gif",alt:"[高兴]"},{"url":"129.gif",alt:"[闲]"},{"url":"130.gif",alt:"[努力]"},{"url":"131.gif",alt:"[骂]"},{"url":"132.gif",alt:"[疑问]"},{"url":"133.gif",alt:"[秘密]"},{"url":"134.gif",alt:"[乱]"},{"url":"135.gif",alt:"[疯]"},{"url":"136.gif",alt:"[哀]"},{"url":"137.gif",alt:"[鬼]"},{"url":"138.gif",alt:"[打击]"},{"url":"139.gif",alt:"[bye]"},{"url":"140.gif",alt:"[汗]"},{"url":"141.gif",alt:"[抠]"},{"url":"142.gif",alt:"[鼓掌]"},{"url":"143.gif",alt:"[糟糕]"},{"url":"144.gif",alt:"[恶搞]"},{"url":"145.gif",alt:"[什么]"},{"url":"146.gif",alt:"[什么]"},{"url":"147.gif",alt:"[累]"}],
			// 	[{"url":"148.gif",alt:"[看]"},{"url":"149.gif",alt:"[难过]"},{"url":"150.gif",alt:"[难过]"},{"url":"151.gif",alt:"[坏]"},{"url":"152.gif",alt:"[亲]"},{"url":"153.gif",alt:"[吓]"},{"url":"154.gif",alt:"[可怜]"},{"url":"155.gif",alt:"[刀]"},{"url":"156.gif",alt:"[水果]"},{"url":"157.gif",alt:"[酒]"},{"url":"158.gif",alt:"[篮球]"},{"url":"159.gif",alt:"[乒乓]"},{"url":"160.gif",alt:"[咖啡]"},{"url":"161.gif",alt:"[美食]"},{"url":"162.gif",alt:"[动物]"},{"url":"163.gif",alt:"[鲜花]"},{"url":"164.gif",alt:"[枯]"},{"url":"165.gif",alt:"[唇]"},{"url":"166.gif",alt:"[爱]"},{"url":"167.gif",alt:"[分手]"},{"url":"168.gif",alt:"[生日]"},{"url":"169.gif",alt:"[电]"},{"url":"170.gif",alt:"[炸弹]"},{"url":"171.gif",alt:"[刀子]"}],
			// 	[{"url":"172.gif",alt:"[足球]"},{"url":"173.gif",alt:"[瓢虫]"},{"url":"174.gif",alt:"[翔]"},{"url":"175.gif",alt:"[月亮]"},{"url":"176.gif",alt:"[太阳]"},{"url":"177.gif",alt:"[礼物]"},{"url":"178.gif",alt:"[抱抱]"},{"url":"179.gif",alt:"[拇指]"},{"url":"180.gif",alt:"[贬低]"},{"url":"181.gif",alt:"[握手]"},{"url":"182.gif",alt:"[剪刀手]"},{"url":"183.gif",alt:"[抱拳]"},{"url":"184.gif",alt:"[勾引]"},{"url":"185.gif",alt:"[拳头]"},{"url":"186.gif",alt:"[小拇指]"},{"url":"187.gif",alt:"[拇指八]"},{"url":"188.gif",alt:"[食指]"},{"url":"189.gif",alt:"[ok]"},{"url":"190.gif",alt:"[情侣]"},{"url":"191.gif",alt:"[爱心]"},{"url":"192.gif",alt:"[蹦哒]"},{"url":"193.gif",alt:"[颤抖]"},{"url":"194.gif",alt:"[怄气]"},{"url":"195.gif",alt:"[跳舞]"}],
			// 	[{"url":"196.gif",alt:"[发呆]"},{"url":"197.gif",alt:"[背着]"},{"url":"198.gif",alt:"[伸手]"},{"url":"199.gif",alt:"[耍帅]"},{"url":"200.png",alt:"[微笑]"},{"url":"201.png",alt:"[生病]"},{"url":"202.png",alt:"[哭泣]"},{"url":"203.png",alt:"[吐舌]"},{"url":"204.png",alt:"[迷糊]"},{"url":"205.png",alt:"[瞪眼]"},{"url":"206.png",alt:"[恐怖]"},{"url":"207.png",alt:"[忧愁]"},{"url":"208.png",alt:"[眨眉]"},{"url":"209.png",alt:"[闭眼]"},{"url":"210.png",alt:"[鄙视]"},{"url":"211.png",alt:"[阴暗]"},{"url":"212.png",alt:"[小鬼]"},{"url":"213.png",alt:"[礼物]"},{"url":"214.png",alt:"[拜佛]"},{"url":"215.png",alt:"[力量]"},{"url":"216.png",alt:"[金钱]"},{"url":"217.png",alt:"[蛋糕]"},{"url":"218.png",alt:"[彩带]"},{"url":"219.png",alt:"[礼物]"},]				
			// ],
			//表情图片图床名称 ，由于我上传的第三方图床名称会有改变，所以有此数据来做对应，您实际应用中应该不需要
			// onlineEmoji:{"100.gif":"AbNQgA.gif","101.gif":"AbN3ut.gif","102.gif":"AbNM3d.gif","103.gif":"AbN8DP.gif","104.gif":"AbNljI.gif","105.gif":"AbNtUS.gif","106.gif":"AbNGHf.gif","107.gif":"AbNYE8.gif","108.gif":"AbNaCQ.gif","109.gif":"AbNN4g.gif","110.gif":"AbN0vn.gif","111.gif":"AbNd3j.gif","112.gif":"AbNsbV.gif","113.gif":"AbNwgs.gif","114.gif":"AbNrD0.gif","115.gif":"AbNDuq.gif","116.gif":"AbNg5F.gif","117.gif":"AbN6ET.gif","118.gif":"AbNcUU.gif","119.gif":"AbNRC4.gif","120.gif":"AbNhvR.gif","121.gif":"AbNf29.gif","122.gif":"AbNW8J.gif","123.gif":"AbNob6.gif","124.gif":"AbN5K1.gif","125.gif":"AbNHUO.gif","126.gif":"AbNIDx.gif","127.gif":"AbN7VK.gif","128.gif":"AbNb5D.gif","129.gif":"AbNX2d.gif","130.gif":"AbNLPe.gif","131.gif":"AbNjxA.gif","132.gif":"AbNO8H.gif","133.gif":"AbNxKI.gif","134.gif":"AbNzrt.gif","135.gif":"AbU9Vf.gif","136.gif":"AbUSqP.gif","137.gif":"AbUCa8.gif","138.gif":"AbUkGQ.gif","139.gif":"AbUFPg.gif","140.gif":"AbUPIS.gif","141.gif":"AbUZMn.gif","142.gif":"AbUExs.gif","143.gif":"AbUA2j.gif","144.gif":"AbUMIU.gif","145.gif":"AbUerq.gif","146.gif":"AbUKaT.gif","147.gif":"AbUmq0.gif","148.gif":"AbUuZV.gif","149.gif":"AbUliF.gif","150.gif":"AbU1G4.gif","151.gif":"AbU8z9.gif","152.gif":"AbU3RJ.gif","153.gif":"AbUYs1.gif","154.gif":"AbUJMR.gif","155.gif":"AbUadK.gif","156.gif":"AbUtqx.gif","157.gif":"AbUUZ6.gif","158.gif":"AbUBJe.gif","159.gif":"AbUdIO.gif","160.gif":"AbU0iD.gif","161.gif":"AbUrzd.gif","162.gif":"AbUDRH.gif","163.gif":"AbUyQA.gif","164.gif":"AbUWo8.gif","165.gif":"AbU6sI.gif","166.gif":"AbU2eP.gif","167.gif":"AbUcLt.gif","168.gif":"AbU4Jg.gif","169.gif":"AbURdf.gif","170.gif":"AbUhFS.gif","171.gif":"AbU5WQ.gif","172.gif":"AbULwV.gif","173.gif":"AbUIzj.gif","174.gif":"AbUTQs.gif","175.gif":"AbU7yn.gif","176.gif":"AbUqe0.gif","177.gif":"AbUHLq.gif","178.gif":"AbUOoT.gif","179.gif":"AbUvYF.gif","180.gif":"AbUjFU.gif","181.gif":"AbaSSJ.gif","182.gif":"AbUxW4.gif","183.gif":"AbaCO1.gif","184.gif":"Abapl9.gif","185.gif":"Aba9yR.gif","186.gif":"AbaFw6.gif","187.gif":"Abaiex.gif","188.gif":"AbakTK.gif","189.gif":"AbaZfe.png","190.gif":"AbaEFO.gif","191.gif":"AbaVYD.gif","192.gif":"AbamSH.gif","193.gif":"AbaKOI.gif","194.gif":"Abanld.gif","195.gif":"Abau6A.gif","196.gif":"AbaQmt.gif","197.gif":"Abal0P.gif","198.gif":"AbatpQ.gif","199.gif":"Aba1Tf.gif","200.png":"Aba8k8.png","201.png":"AbaGtS.png","202.png":"AbaJfg.png","203.png":"AbaNlj.png","204.png":"Abawmq.png","205.png":"AbaU6s.png","206.png":"AbaaXn.png","207.png":"Aba000.png","208.png":"AbarkT.png","209.png":"AbastU.png","210.png":"AbaB7V.png","211.png":"Abafn1.png","212.png":"Abacp4.png","213.png":"AbayhF.png","214.png":"Abag1J.png","215.png":"Aba2c9.png","216.png":"AbaRXR.png","217.png":"Aba476.png","218.png":"Abah0x.png","219.png":"Abdg58.png"},
			
			// 萝卜丝
			option: {
				sub: '',
				uid: '',
				wid: '',
				type: '',
				aid: '',
				nickname: '',
				// hidenav: '',
				// backurl: '',
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
				history: 0,
				// 
				postscript: '',
				lang: 'cn'
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
			rateValue: '非常满意',
			// 满意度附言
			rateContent: '',
			//
			isLoading: false,
			stompClient: '',
			sessionId: '',
			preSessionId: '',
			browseInviteBIid: '',
			//
			adminUid: '',
			workGroupWid: '',
			subDomain: '',
			client: 'uniapp',
			thread: {
				id: 0,
				tid: ''
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
			agentUid: '',
			uid: '',
			username: '',
			// password: '',
			nickname: '',
			avatar: '',
			// 本地存储access_token的key
			token: 'bd_kfe_token',
			isConnected: false,
			answers: [],
			isRobot: false,
			isThreadStarted: false,
			isThreadClosed: false,
			isManulRequestThread: false,
			// focusStatus: true,
			leaveMessageTip: '',
			loadHistory: '1',
			postscript: '',
			hideNav: false,
			backUrl: '',
			topTip: '',
			showTopTip: false,
			//
			showMessage: true,
			showInputBar: true,
			showLeaveMessage: false,
			showRate: false,
			showForm: false
		};
	},
	onLoad(option) {
		this.getMsgList();
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
	},
	onShow(){
		this.scrollTop = 9999999;
	},
	onReady () {
		//
		let app = this;
		uni.$on('message',function(messageObject) {
			// console.log('uni on message');
			app.onMessageReceived(messageObject)
		})
		// 登录
		uni.setNavigationBarTitle({
		　　title:this.option.title
		})
		// this.login(this.option)
		this.requestThread(this.option)
	},
	computed: {
		threadTopic() {
			return this.thread.topic.replace(/\//, ".");
		},
	},
	methods:{
		//
		is_self (message) {
			return message.user.uid === this.uid;
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
			return message.type === 'text'
				|| message.type === 'notification_thread'
				|| message.type === 'notification_auto_close'
		},
		is_type_robot (message) {
			return message.type === 'robot'
		},
		is_type_image (message) {
			return message.type === 'image'
		},
		is_type_file (message) {
			return message.type === 'file'
		},
		is_type_voice (message) {
			return message.type === 'voice'
		},
		is_type_commodity (message) {
			return message.type === 'commodity'
		},
		is_type_questionnaire (message) {
			return message.type === 'questionnaire'
		},
		is_type_company (message) {
			return message.type === 'company'
		},
		is_type_workGroup (message) {
			return message.type === 'workGroup'
		},
		is_type_form_request (message) {
			return message.type === 'notification_form_request'
		},
		is_type_form_result (message) {
			return message.type === 'notification_form_result'
		},
		is_type_thread(message) {
			return message.type === 'notification_thread'
		},
		is_type_notification (message) {
			return message.type !== 'notification_preview'
				&& message.type !== 'notification_thread'
				&& message.type.startsWith('notification')
		},
		is_type_close (message) {
			return message.type === 'notification_auto_close'
			|| message.type === 'notification_agent_close'
		},
		is_type_notification_agent_close(message) {
			return message.type === 'notification_agent_close'
		},
		is_type_notification_visitor_close(message) {
			return message.type === 'notification_visitor_close'
		},
		is_type_notification_auto_close(message) {
			return message.type === 'notification_auto_close'
		},
		is_type_notification_thread_reentry(message) {
			return message.type === 'notification_thread_reentry'
		},
		is_type_notification_connect(message) {
			return message.type === 'notification_connect'
		},
		is_type_notification_disconnect(message) {
			return message.type === 'notification_disconnect'
		},
		is_type_notification_offline(message) {
			return message.type === 'notification_offline'
		},
		is_type_notification_invite_rate(message) {
			return message.type === 'notification_invite_rate'
		},
		is_type_notification_rate_result(message) {
			return message.type === 'notification_rate_result'
		},
		my_nickname () {
			if (this.option.nickname) {
				return this.option.nickname
			}
			return this.nickname.trim().length > 0 ? this.nickname : this.thread.visitor.nickname
		},
		jsonObject (content) {
			// console.log('parse json:', content);
			return JSON.parse(content);
			// return content === null ? '{"categoryCode":"","content":"","id":"0","imageUrl":"","price":"","title":"","type":"commodity","url":""}' : JSON.parse(content);
		},
		scrollToBottom () {
			console.log('scroll to bottom');
			// 聊天记录滚动到最底部
			let vm = this;
			this.$nextTick(() => {
				vm.scrollTop = 9999;
				// const ulm = vm.$refs.listm;
				// if (ulm != null) {
				// 	ulm.scrollTop = ulm.scrollHeight
				// }
			})
		},
		pushToMessageArray(message) {
			// 本地发送的消息
			this.messages.push(message);
			// 查看大图刷新
			// if (message.type === 'image') {
			// 	app.$previewRefresh()
			// }
		},
		/**
		 * 1. 首先判断是否已经注册过
		 * 2. 如果已经注册过，则直接调用登录接口
		 * 3. 如果没有注册过，则从服务器请求用户名
		 */
		requestUsername () {
			// this.username = localStorage.bd_kfe_username;
			// this.password = this.username;
			if (this.username) {
				// this.login();
			} else {
				//
				// $.ajax({
				// 	url: this.HTTP_HOST + '/visitor/api/username',
				// 	contentType: "application/json; charset=utf-8",
				// 	type: "get",
				// 	data: {
				// 		nickname: this.nickname,
				// 		subDomain: this.subDomain,
				// 		client: this.client
				// 	},
				// 	success: function (response) {
				// 		console.log('user:', response.data);
				// 		// 登录
				// 		app.uid = response.data.uid;
				// 		app.username = response.data.username;
				// 		app.password = app.username;
				// 		app.nickname = response.data.nickname;
				// 		// 本地存储
				// 		localStorage.bd_kfe_uid = app.uid;
				// 		localStorage.bd_kfe_username = app.username;
				// 		// 登录
				// 		app.login();
				// 	},
				// 	error: function (error) {
				// 		//Do Something to handle error
				// 		console.log(error);
				// 	}
				// });
			}
		},
		//
		// login(option) {
		// 	// 萝卜丝-匿名登录
		// 	try {
		// 	    // 获取subDomain，也即企业号：登录后台->客服管理->客服账号->企业号
		// 	    let subDomain = uni.getStorageSync(constants.subDomain)
		// 	    // 登录后台->渠道管理-》uniapp中创建应用获取
		// 	    let appKey = uni.getStorageSync(constants.appKey)
		// 	    if (subDomain && appKey) {
		// 	        // console.log(subDomain, appKey);
		// 			let app = this
		// 			httpApi.anonymousLogin(subDomain, appKey, function(result) {
		// 				// 请求会话
		// 				app.requestThread(option)
		// 			}, function(error) {
		// 				console.log('login error:', error)
		// 			})
		// 	    } else {
		// 			console.error('未设置subDomain或appKey')
		// 		}
		// 	} catch (error) {
		// 	    console.error('read subdomain/appkey error', error)
		// 	}
		// },
		// 请求会话
		requestThread (option) {
			//
			if (option.type === undefined || option.type === null) {
				return
			}
			try {
			    //
			    this.uid = uni.getStorageSync(constants.uid)
			    this.username = uni.getStorageSync(constants.username)
			    this.nickname = uni.getStorageSync(constants.nickname)
			    this.avatar = uni.getStorageSync(constants.avatar)
			} catch (error) {
			    console.error('read uid/username error', error)
			}
			//
			let app = this
			httpApi.requestThread(option.wid, option.type, option.aid, function(response) {
				console.log('request thread success', option.wid, option.type, option.aid, response)
				//
				app.dealWithThread(response);
			}, function(error) {
				console.log('request thread error', error)
			})
		},
		// 请求人工客服
		requestAgent (option) {
			//
			if (option.type === undefined || option.type === null) {
				return
			}
			//
			let app = this
			httpApi.requestAgent(option.wid, option.type, option.aid, function(response) {
				console.log('request agent success', option.wid, option.type, option.aid, response)
				//
				app.dealWithThread(response);
			}, function(error) {
				console.log('request agent error', error)
			})
		},
		// 
		dealWithThread (response) {
			//
			let message = response.data;
			if (response.status_code === 200) {
				//
				// if (this.isManulRequestThread || this.loadHistory === '0') {
					this.pushToMessageArray(message);
				// }
				// // 1. 保存thread
				this.thread = message.thread;
				// // 3. 加载聊天记录
				// this.loadHistoryMessages();
				// // 设置当前为人工客服
				this.isRobot = false;
				// // 防止会话超时自动关闭，重新标记本地打开会话
				this.isThreadClosed = false;
				// // 显示商品信息
				// this.appendCommodityInfo()
			} else if (response.status_code === 201) {
				// message.content = '继续之前会话';
				// if (this.isManulRequestThread || this.loadHistory === '0') {
					this.pushToMessageArray(message);
				// }
				// // 1. 保存thread
				this.thread = message.thread;
				// // 3. 加载聊天记录
				// this.loadHistoryMessages();
				// // 设置当前为人工客服
				this.isRobot = false;
				// // 防止会话超时自动关闭，重新标记本地打开会话
				this.isThreadClosed = false;
				// // 显示商品信息
				// this.appendCommodityInfo()
			} else if (response.status_code === 202) {
				// 排队
				this.pushToMessageArray(message);
				// // 1. 保存thread
				this.thread = message.thread;
				//
			} else if (response.status_code === 203) {
				// 当前非工作时间，请自助查询或留言
				this.pushToMessageArray(message);
		// 		this.leaveMessageTip = message.content;
		// 		// 1. 保存thread
				this.thread = message.thread;
		// 		// 显示留言界面
		// 		this.switchLeaveMessage();
			} else if (response.status_code === 204) {
				// 当前无客服在线，请自助查询或留言
				this.pushToMessageArray(message);
				// this.leaveMessageTip = message.content;
				// // 1. 保存thread
				this.thread = message.thread;
				// // 显示留言界面
				// this.switchLeaveMessage();
			} else if (response.status_code === 205) {
				// 插入业务路由，相当于咨询前提问问卷（选择 或 填写表单）
				this.pushToMessageArray(message);
				// // 1. 保存thread
				this.thread = message.thread;
			} else if (response.status_code === 206) {
				// 返回机器人初始欢迎语 + 欢迎问题列表
				if (this.isManulRequestThread || this.loadHistory === '0') {
					this.pushToMessageArray(message);
				}
				// 1. 保存thread
				this.thread = message.thread;
				// 3. 加载聊天记录
				// this.loadHistoryMessages();
				// 返回机器人初始欢迎语 + 欢迎问题列表
				this.pushToMessageArray(message);
				// 1. 保存thread
				this.thread = message.thread;
				// 2. 设置当前状态为机器人问答
				this.isRobot = true;
			} else if (response.status_code === -1) {
				this.login();
			} else if (response.status_code === -2) {
				// sid 或 wid 错误
				// this.$message.error('siteId或者工作组id错误');
			} else if (response.status_code === -3) {
				// alert('您已经被禁言')
			}
			this.scrollToBottom();
			// // 建立长连接
			this.byteDeskConnect();
		},
		sendTextMessageSync(content) {
			// this.sendMessageSync('text', content)
			if (content.length === 0) {
				alert('消息不能为空');
				return;
			}
			if (content.length >= 500) {
				alert('消息长度太长，请分多次发送');
				return;
			}
			//
			let localId = this.guid();
			var json = {
				"mid": localId,
				"timestamp": this.currentTimestamp(),
				"client": this.client,
				"version": "1",
				"type": 'text',
				"user": {
					"uid": this.uid,
					"nickname": this.my_nickname(),
					"avatar": this.thread.visitor.avatar
				},
				"text": {
					"content": content
				},
				"thread": {
					"tid": this.thread.tid,
					"type": this.thread.type,
					"content": content,
					"nickname": this.my_nickname(),
					"avatar": this.thread.visitor.avatar,
					"topic": this.threadTopic,
					"timestamp": this.currentTimestamp(),
					"unreadCount": 0
				}
			};
			stompApi.sendMessage(this.threadTopic, JSON.stringify(json));
		},
		sendImageMessageSync(imageUrl) {
			console.log('sendImageMessageSync:', imageUrl);
			//
			let localId = this.guid();
			var json = {
				"mid": localId,
				"timestamp": this.currentTimestamp(),
				"client": this.client,
				"version": "1",
				"type": 'image',
				"user": {
					"uid": this.uid,
					"nickname": this.my_nickname(),
					"avatar": this.thread.visitor.avatar
				},
				"image": {
					"imageUrl": imageUrl
				},
				"thread": {
					"tid": this.thread.tid,
					"type": this.thread.type,
					"content": "[图片]",
					"nickname": this.my_nickname(),
					"avatar": this.thread.visitor.avatar,
					"topic": this.threadTopic,
					"timestamp": this.currentTimestamp(),
					"unreadCount": 0
				}
			};
			stompApi.sendMessage(this.threadTopic, JSON.stringify(json));
		},
		sendVoiceMessageSync(voiceUrl, length, format) {
			console.log('sendVoiceMessageSync:', voiceUrl);
			//
			let localId = this.guid();
			var json = {
				"mid": localId,
				"timestamp": this.currentTimestamp(),
				"client": this.client,
				"version": "1",
				"type": 'voice',
				"user": {
					"uid": this.uid,
					"nickname": this.my_nickname(),
					"avatar": this.thread.visitor.avatar
				},
				"voice": {
					"voiceUrl": voiceUrl,
					"length": length,
					"format": format,
				},
				"thread": {
					"tid": this.thread.tid,
					"type": this.thread.type,
					"content": "[语音]",
					"nickname": this.my_nickname(),
					"avatar": this.thread.visitor.avatar,
					"topic": this.threadTopic,
					"timestamp": this.currentTimestamp(),
					"unreadCount": 0
				}
			};
			stompApi.sendMessage(this.threadTopic, JSON.stringify(json));
		},
		sendVideoMessageSync(videoUrl) {
			console.log('sendVideoMessageSync:', videoUrl);
			//
			let localId = this.guid();
			var json = {
				"mid": localId,
				"timestamp": this.currentTimestamp(),
				"client": this.client,
				"version": "1",
				"type": 'video',
				"user": {
					"uid": this.uid,
					"nickname": this.my_nickname(),
					"avatar": this.thread.visitor.avatar
				},
				"video": {
					"videoOrShortUrl": videoUrl
				},
				"thread": {
					"tid": this.thread.tid,
					"type": this.thread.type,
					"content": "[视频]",
					"nickname": this.my_nickname(),
					"avatar": this.thread.visitor.avatar,
					"topic": this.threadTopic,
					"timestamp": this.currentTimestamp(),
					"unreadCount": 0
				}
			};
			stompApi.sendMessage(this.threadTopic, JSON.stringify(json));
		},
		sendCommodityMessageSync() {
			let goods = this.option.goods
			if (goods !== "1") {
				return
			}
			let jsonContent = this.commodityInfo();
			// 发送商品信息
			var json = {
				"mid": this.guid(),
				"timestamp": this.currentTimestamp(),
				"client": this.client,
				"version": "1",
				"type": 'commodity',
				"user": {
					"uid": this.uid,
					"nickname": this.my_nickname(),
					"avatar": this.thread.visitor.avatar
				},
				"text": {
					"content": jsonContent
				},
				"thread": {
					"tid": this.thread.tid,
					"type": this.thread.type,
					"content": "[商品]",
					"nickname": this.my_nickname(),
					"avatar": this.thread.visitor.avatar,
					"topic": this.threadTopic,
					"timestamp": this.currentTimestamp(),
					"unreadCount": 0
				}
			};
			stompApi.sendMessage(this.threadTopic, JSON.stringify(json));
		},
		appendCommodityInfo () {
			let goods = this.option.goods
			if (goods !== "1") {
				return
			}
			let jsonContent = this.commodityInfo();
			// 发送商品信息
			var json = {
				"mid": this.guid(),
				"timestamp": this.currentTimestamp(),
				"client": this.client,
				"version": "1",
				"type": 'commodity',
				"user": {
					"uid": this.uid,
					"nickname": this.my_nickname(),
					"avatar": this.thread.visitor.avatar
				},
				"content": jsonContent,
				"thread": {
					"tid": this.thread.tid,
					"type": this.thread.type,
					"content": "[商品]",
					"nickname": this.my_nickname(),
					"avatar": this.thread.visitor.avatar,
					"topic": this.threadTopic,
					"timestamp": this.currentTimestamp(),
					"unreadCount": 0
				}
			};
			this.pushToMessageArray(json)
		},
		commodityInfo () {
			//
			let commodidy = {
				"id": this.option.goods_id,
				"title": this.option.goods_title,
				"content":this.option.goods_content,
				"price": this.option.goods_price,
				"url": this.option.goods_url,
				"imageUrl": this.option.goods_imageUrl,
				"categoryCode": this.option.goods_categoryCode,
				"type":"commodity"
			}
			return JSON.stringify(commodidy)
		},
		onInputChange (content) {
			console.log('onInputChange:', content);
			// if (this.isRobot || this.isThreadClosed) {
			// 	return;
			// }
			// this.localPreviewContent = content
			// this.delaySendPreviewMessage()
		},
		sendPreviewMessage() {
			//
			var localId = this.guid();
			var json = {
				"mid": localId,
				"timestamp": this.currentTimestamp(),
				"client": this.client,
				"version": "1",
				"type": "notification_preview",
				"user": {
					"uid": this.uid,
					"nickname": this.my_nickname(),
					"avatar": this.thread.visitor.avatar
				},
				"preview": {
					"content": this.localPreviewContent === undefined ? " " : this.localPreviewContent
				},
				"thread": {
					"tid": this.thread.tid,
					"type": this.thread.type,
					// TODO: 根据内容类型设置不同, 如: [图片]
					"content": this.localPreviewContent,
					"nickname": this.my_nickname(),
					"avatar": this.thread.visitor.avatar,
					"topic": this.threadTopic,
					"timestamp": this.currentTimestamp(),
					"unreadCount": 0
				}
			};
			stompApi.sendMessage(this.threadTopic,JSON.stringify(json));
		},
		sendTextMessage () {
			//
			if (this.inputContent.trim().length === 0) {
				return;
			}
			if (this.isRobot) {
				this.messageAnswer(this.inputContent);
			} else {
				// 发送/广播会话消息
				this.sendTextMessageSync(this.inputContent)
			}
			// 清空输入框
			this.inputContent = "";
			// 设置焦点
			// setTimeout(function(){
			// 	$("input")[1].focus()
			// }, 100);
		},
		sendReceiptMessage (mid, status) {
			console.log(this.thread);
			var localId = this.guid();
			var json = {
				"mid": localId,
				"timestamp": this.currentTimestamp(),
				"client": this.client,
				"version": "1",
				"type": "notification_receipt",
				"user": {
					"uid": this.uid,
					"nickname": this.my_nickname(),
					"avatar": this.thread.visitor.avatar
				},
				"receipt": {
					"mid": mid,
					"status": status
				},
				"thread": {
					"tid": this.thread.tid,
					"type": this.thread.type,
					// "content": content,
					"nickname": this.my_nickname(),
					"avatar": this.thread.visitor.avatar,
					"topic": this.threadTopic,
					"timestamp": this.currentTimestamp(),
					"unreadCount": 0
				}
			};
			stompApi.sendMessage(this.threadTopic, JSON.stringify(json));
			// 收到消息后，向服务器发送回执
		},
		sendRecallMessage (mid) {
			var localId = this.guid();
			var json = {
				"mid": localId,
				"timestamp": this.currentTimestamp(),
				"client": this.client,
				"version": "1",
				"type": "notification_recall",
				"user": {
					"uid": this.uid,
					"nickname": this.my_nickname(),
					"avatar": this.thread.visitor.avatar
				},
				"recall": {
					"mid": mid
				},
				"thread": {
					"tid": this.thread.tid,
					"type": this.thread.type,
					// "content": content,
					"nickname": this.my_nickname(),
					"avatar": this.thread.visitor.avatar,
					"topic": this.threadTopic,
					"timestamp": this.currentTimestamp(),
					"unreadCount": 0
				}
			};
			stompApi.sendMessage(this.threadTopic,JSON.stringify(json));
			// 收到消息后，向服务器发送回执
		},
		// 建立长连接
		byteDeskConnect () {
			let app = this
			stompApi.connect(this.thread, function() {
				// 长连接成功回调
				// 发送附言信息
				if (app.option.postscript !== null 
					&& app.option.postscript !== undefined 
					&& app.option.postscript !== '') {
					app.sendTextMessageSync(app.option.postscript)
				}
				// 发送商品信息
				app.sendCommodityMessageSync()
			})
		},
		onMessageReceived (messageObject) {
			//
			if ((messageObject.type === 'text'
			  || messageObject.type === 'image'
			  || messageObject.type === 'file'
			  || messageObject.type === 'voice'
			  || messageObject.type === 'video'
			  || messageObject.type === 'commodity')
			  // && messageObject.user.uid !== this.uid
			  ) {
			  // 新protobuf转换json
			  messageObject.createdAt = messageObject.timestamp;
			  if (messageObject.type === "text") {
			    messageObject.content = messageObject.text.content;
			  } else if (messageObject.type === "image") {
			    messageObject.imageUrl = messageObject.image.imageUrl;
			  } else if (messageObject.type === "commodity") {
				messageObject.content = messageObject.text.content;
			  }
			  //
			  let mid = messageObject.mid;
			  // 发送消息回执：消息已读
			  this.sendReceiptMessage(mid, "read");
			}
			else if (messageObject.type === 'notification_browebSockete_invite') {
			  //
			} else if (messageObject.type === 'notification_queue') {
			    // 排队
			} else if (messageObject.type === 'notification_queue_accept') {
			  // // 1. 保存thread
			  this.thread = messageObject.thread;
			  // // 2. 订阅会话消息
			  // this.subscribeTopic(this.threadTopic);
			} else if (messageObject.type === 'notification_invite_rate') {
			  // // 邀请评价
			  this.isInviteRate = true;
			  // this.switchRate()
			} else if (messageObject.type === 'notification_agent_close'
			    || messageObject.type === 'notification_auto_close') {
			  // // 新protobuf转换json
			  messageObject.createdAt = messageObject.timestamp;
			  messageObject.content = messageObject.text.content;
			  // // TODO: 会话关闭，添加按钮方便用户点击重新请求会话
			  this.isThreadClosed = true
			} else if (messageObject.type === 'notification_preview') {
			  //
			  if (messageObject.user.uid !== this.uid) {
			      this.isInputingVisible = true;
			      setTimeout(function () {
			          this.isInputingVisible = false;
			      }, 5000)
			  }
			} else if (messageObject.type === 'notification_receipt') {
			  // 消息状态：送达 received、已读 read
			  if (messageObject.user.uid !== this.uid) {
			    for (let i = this.messages.length - 1; i >= 0 ; i--) {
					const msg = this.messages[i]
					if (msg.mid === messageObject.receipt.mid) {
						// 可更新顺序 read > received > stored > sending, 前面的状态可更新后面的
						if (this.messages[i].status === 'read') {
							return
						}
						console.log('do update:', this.messages[i].mid, this.messages[i].content, messageObject.receipt.status)
						Vue.set(this.messages[i], 'status', messageObject.receipt.status)
					}
				}
			  }
			} else if (messageObject.type === 'notification_recall') {
			  console.log('TODO:消息撤回');
			  // $("#other" + messageObject.mid).hide();
			}
			//
			if (messageObject.type !== 'notification_preview'
			    && messageObject.type !== 'notification_receipt'
			    && messageObject.type !== 'notification_connect'
			    && messageObject.type !== 'notification_disconnect') {
			    this.isRobot = false;
			    this.pushToMessageArray(messageObject);
			    this.scrollToBottom()
			} else {
			    // TODO: 监听客服端输入状态
			}
		},
		//
		currentTimestamp () {
			// return moment().format('YYYY-MM-DD HH:mm:ss')
			return ''
		},
		///
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
			        const tempFilePaths = chooseImageRes.tempFilePaths;
			        uni.uploadFile({
			            url: constants.UPLOAD_IMAGE_URL,
			            filePath: tempFilePaths[0],
			            name: 'file',
			            formData: {
			                'file_name': app.guid(),
							'username': app.username,
							'client': constants.client
			            },
			            success: (response) => {
			                console.log(response.data);
							// 发送图片
							var imageUrl = JSON.parse(response.data).data;
							app.sendImageMessageSync(imageUrl)
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
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
		},
		queryAnswer (answer) {
			console.log('answer:', answer);
			let app = this
			httpApi.queryAnswer(this.thread.tid, answer.aid, function(response) {
				console.log('queryAnswer success', response)
				//
				if (response.status_code === 200)  {
					//
					let queryMessage = response.data.query;
					let replyMessage = response.data.reply;
					//
					app.pushToMessageArray(queryMessage);
					app.pushToMessageArray(replyMessage);
					//
					app.scrollToBottom()
				} else {
					// app.$message.warning(response.message)
					uni.showToast({ title: response.message, duration: 2000 });
				}
			}, function(error) {
				console.log('queryAnswer error', error)
			})
		},
		messageAnswer (content) {
			let app = this;
			httpApi.messageAnswer(this.option.wid, this.option.type, this.option.aid, content, function(response) {
				console.log('messageAnswer success', response)
				if (response.status_code === 200 ||
					response.status_code === 201)  {
					//
					let queryMessage = response.data.query;
					let replyMessage = response.data.reply;
					//
					app.pushToMessageArray(queryMessage);
					// 包含’人工‘二字
					if (content.indexOf('人工') !== -1) {
						// 请求人工客服
						app.requestAgent()
					} else {
						app.pushToMessageArray(replyMessage);
					}
					app.scrollToBottom()
				} else {
					// app.$message.warning(response.data.message)
					uni.showToast({ title: response.message, duration: 2000 });
				}
			}, function(error) {
				console.log('messageAnswer error', error)
			})
		},
		// 接受消息(筛选处理)
		screenMsg(msg){
			//从长连接处转发给这个方法，进行筛选处理
			// if(msg.type=='system'){
			// 	// 系统消息
			// 	switch (msg.msg.type){
			// 		case 'text':
			// 			this.addSystemTextMsg(msg);
			// 			break;
			// 		case 'redEnvelope':
			// 			this.addSystemRedEnvelopeMsg(msg);
			// 			break;
			// 	}
			// }else if(msg.type=='user'){
			// 	// 用户消息
			// 	switch (msg.msg.type){
			// 		case 'text':
			// 			this.addTextMsg(msg);
			// 			break;
			// 		case 'voice':
			// 			this.addVoiceMsg(msg);
			// 			break;
			// 		case 'img':
			// 			this.addImgMsg(msg);
			// 			break;
			// 		case 'redEnvelope':
			// 			this.addRedEnvelopeMsg(msg);
			// 			break;
			// 	}
			// 	console.log('用户消息');
			// 	//非自己的消息震动
			// 	if(msg.msg.userinfo.uid!=this.myuid){
			// 		console.log('振动');
			// 		uni.vibrateLong();
			// 	}
			// }
			// this.$nextTick(function() {
			// 	// 滚动到底
			// 	this.scrollToView = 'msg'+msg.msg.id
			// });
		},
		
		//触发滑动到顶部(加载历史信息记录)
		loadHistoryMessage(e){
			if(this.isHistoryLoading){
				return ;
			}
			// TODO: 加载历史聊天记录
			// this.isHistoryLoading = true;//参数作为进入请求标识，防止重复请求
			// this.scrollAnimation = false;//关闭滑动动画
			// let Viewid = this.msgList[0].msg.id;//记住第一个信息ID
			//本地模拟请求历史记录效果
			// setTimeout(()=>{
			// 	// 消息列表
			// 	let list = [
			// 		{type:"user",msg:{id:1,type:"text",time:"12:56",userinfo:{uid:0,username:"大黑哥",face:"/image/face.jpg"},content:{text:"为什么温度会相差那么大？"}}},
			// 		{type:"user",msg:{id:2,type:"text",time:"12:57",userinfo:{uid:1,username:"售后客服008",face:"/image/im/face/face_2.jpg"},content:{text:"这个是有偏差的，两个温度相差十几二十度是很正常的，如果相差五十度，那即是质量问题了。"}}},
			// 		{type:"user",msg:{id:3,type:"voice",time:"12:59",userinfo:{uid:1,username:"售后客服008",face:"/image/im/face/face_2.jpg"},content:{url:"/static/voice/1.mp3",length:"00:06"}}},
			// 		{type:"user",msg:{id:4,type:"voice",time:"13:05",userinfo:{uid:0,username:"大黑哥",face:"/image/face.jpg"},content:{url:"/static/voice/2.mp3",length:"00:06"}}},
			// 	]
			// 	// 获取消息中的图片,并处理显示尺寸
			// 	for(let i=0;i<list.length;i++){
			// 		if(list[i].type=='user'&&list[i].msg.type=="img"){
			// 			list[i].msg.content = this.setPicSize(list[i].msg.content);
			// 			this.msgImgList.unshift(list[i].msg.content.url);
			// 		}
			// 		list[i].msg.id = Math.floor(Math.random()*1000+1);
			// 		this.msgList.unshift(list[i]);
			// 	}
			// 	//这段代码很重要，不然每次加载历史数据都会跳到顶部
			// 	this.$nextTick(function() {
			// 		this.scrollToView = 'msg'+Viewid;//跳转上次的第一行信息位置
			// 		this.$nextTick(function() {
			// 			this.scrollAnimation = true;//恢复滚动动画
			// 		});
			// 	});
			// 	this.isHistoryLoading = false;
			// },1000)
		},
		// 加载初始页面消息
		getMsgList() {
			// 消息列表
			// let list = [
			// 	{type:"system",msg:{id:0,type:"text",content:{text:"欢迎进入HM-chat聊天室"}}},
			// 	{type:"user",msg:{id:1,type:"text",time:"12:56",userinfo:{uid:0,username:"大黑哥",face:"/image/face.jpg"},content:{text:"为什么温度会相差那么大？"}}},
			// 	{type:"user",msg:{id:2,type:"text",time:"12:57",userinfo:{uid:1,username:"售后客服008",face:"/image/im/face/face_2.jpg"},content:{text:"这个是有偏差的，两个温度相差十几二十度是很正常的，如果相差五十度，那即是质量问题了。"}}},
			// 	{type:"user",msg:{id:3,type:"voice",time:"12:59",userinfo:{uid:1,username:"售后客服008",face:"/image/im/face/face_2.jpg"},content:{url:"/static/voice/1.mp3",length:"00:06"}}},
			// 	{type:"user",msg:{id:4,type:"voice",time:"13:05",userinfo:{uid:0,username:"大黑哥",face:"/image/face.jpg"},content:{url:"/static/voice/2.mp3",length:"00:06"}}},
			// 	{type:"user",msg:{id:5,type:"img",time:"13:05",userinfo:{uid:0,username:"大黑哥",face:"/image/face.jpg"},content:{url:"/image/p10.jpg",w:200,h:200}}},
			// 	{type:"user",msg:{id:6,type:"img",time:"12:59",userinfo:{uid:1,username:"售后客服008",face:"/image/im/face/face_2.jpg"},content:{url:"/image/q.jpg",w:1920,h:1080}}},
			// 	{type:"system",msg:{id:7,type:"text",content:{text:"欢迎进入HM-chat聊天室"}}},
			// 	{type:"system",msg:{id:9,type:"redEnvelope",content:{text:"售后客服008领取了你的红包"}}},
			// 	{type:"user",msg:{id:10,type:"redEnvelope",time:"12:56",userinfo:{uid:0,username:"大黑哥",face:"/image/face.jpg"},content:{blessing:"恭喜发财，大吉大利，万事如意",rid:0,isReceived:false}}},
			// 	{type:"user",msg:{id:11,type:"redEnvelope",time:"12:56",userinfo:{uid:1,username:"售后客服008",face:"/image/im/face/face_2.jpg"},content:{blessing:"恭喜发财",rid:1,isReceived:false}}},
			// ]
			// // 获取消息中的图片,并处理显示尺寸
			// for(let i=0;i<list.length;i++){
			// 	if(list[i].type=='user'&&list[i].msg.type=="img"){
			// 		list[i].msg.content = this.setPicSize(list[i].msg.content);
			// 		this.msgImgList.push(list[i].msg.content.url);
			// 	}
			// }
			// this.msgList = list;
			// // 滚动到底部
			// this.$nextTick(function() {
			// 	//进入页面滚动到底部
			// 	this.scrollTop = 9999;
			// 	this.$nextTick(function() {
			// 		this.scrollAnimation = true;
			// 	});
			// });
		},
		//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
		setPicSize(content){
			// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
			let maxW = uni.upx2px(350);//350是定义消息图片最大宽度
			let maxH = uni.upx2px(350);//350是定义消息图片最大高度
			if(content.w>maxW||content.h>maxH){
				let scale = content.w/content.h;
				content.w = scale>1?maxW:maxH*scale;
				content.h = scale>1?maxW/scale:maxH;
			}
			return content;
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
		addEmoji(em){
			this.inputContent+=em.alt;
		},
		//获取焦点，如果不是选表情ing,则关闭抽屉
		textareaFocus(){
			if(this.popupLayerClass=='showLayer' && this.hideMore == false){
				this.hideDrawer();
			}
		},
		// 发送文字消息
		// sendText() {
		// 	this.hideDrawer();//隐藏抽屉
		// 	if(!this.inputContent){
		// 		return;
		// 	}
		// 	let content = this.replaceEmoji(this.inputContent);
		// 	let msg = {text:content}
		// 	this.sendMsg(msg,'text');
		// 	this.inputContent = '';//清空输入框
		// },
		//替换表情符号为图片
		// replaceEmoji(str){
		// 	let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g,(item, index)=>{
		// 		console.log("item: " + item);
		// 		for(let i=0;i<this.emojiList.length;i++){
		// 			let row = this.emojiList[i];
		// 			for(let j=0;j<row.length;j++){
		// 				let EM = row[j];
		// 				if(EM.alt==item){
		// 					//在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径 
		// 					//比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
		// 					let onlinePath = 'https://s2.ax1x.com/2019/04/12/'
		// 					let imgstr = '<img src="'+onlinePath+this.onlineEmoji[EM.url]+'">';
		// 					console.log("imgstr: " + imgstr);
		// 					return imgstr;
		// 				}
		// 			}
		// 		}
		// 	});
		// 	return '<div style="display: flex;align-items: center;word-wrap:break-word;">'+replacedStr+'</div>';
		// },
		// 播放语音
		playVoice(message) {
			this.playMsgid = message.mid;
			this.AUDIO.src = message.voice.voiceUrl;
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
			this.RECORDER.start({format:"mp3"});//录音开始,
		},
		//录音开始UI效果
		recordBegin(e){
			this.recording = true;
			this.voiceTis='松开 结束';
			this.recordLength = 0;
			this.recordTimer = setInterval(()=>{
				this.recordLength++;
			},1000)
		},
		// 录音被打断
		voiceCancel(){
			this.recording = false;
			this.voiceTis='按住 说话';
			this.recordTis = '手指上滑 取消发送'
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
				this.recordTis = '松开手指 取消发送'
			}else{
				this.willStop = false;
				this.recordTis = '手指上滑 取消发送'
			}
		},
		// 结束录音
		voiceEnd(e){
			if(!this.recording){
				return;
			}
			this.recording = false;
			this.voiceTis='按住 说话';
			this.recordTis = '手指上滑 取消发送'
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
				        'file_name': app.guid(),
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
				
			}else{
				console.log('取消发送录音');
			}
			this.willStop = false;
		},
		// 切换语音/文字输入
		switchVoice(){
			this.hideDrawer();
			this.isVoice = this.isVoice?false:true;
		},
		discard(){
			return;
		}
	}
}
</script>
<style lang="scss">
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "css/index-app.css";
	@import "css/style.scss";
	
	 .goods-info {
	    background: #e6f9ff; 
	    margin: 0 auto; 
	    margin-top: 10px; 
	    margin-bottom: 10px;
	    width: 80%; 
	    height: 75px; 
	    border-radius: 5px; 
	    font-size: 15px; 
	    border:1px solid #c2dfe7;
	  }
	  
	  .goods-pic {
	    float:left;
	    margin-left: 10px;
	    margin-top: 10px;
	  }
	  
	  .goods-desc {
	    float:left;
	    margin-left: 10px;
	    margin-top: 10px;
	    width: 70%;
	  }
	  
	  .goods-name {
	    float:left;
	    margin-top: 5px;
	    margin-left: 10px;
	    width: 90%;
	    overflow: hidden;
	    white-space: nowrap;
	    display: block;
	    text-overflow: ellipsis;
	  }
	  
	  .goods-more {
	    clear:both;
	    margin-top: 2px;
	    margin-left: 2px;
	  }
	  
	  .goods-price {
	    float:left;
	    margin-top: 2px;
	    margin-left: 2px;
	    color: red;
	  }
	  
	  .goods-sendlink {
	    float:left;
	    margin-top: 2px;
	    margin-left: 50px;
	    cursor:pointer;
	  }
</style>