<template>
	<view>
		<!-- 空盒子用来防止消息过少时 拉起键盘会遮盖消息 -->
		<view :animation="anData" style="height:0;">
		</view>
		<!-- 消息体 -->
		<scroll-view scroll-with-animation scroll-y="true" @touchmove="hideKey" style="width: 750rpx;" :style="{'height':srcollHeight}"
		 :scroll-top="go">
			<!-- 用来获取消息体高度 -->
			<view id="content" scroll-with-animation>
				<!-- 消息 -->
				<view class="flex-column-start" v-for="(x,i) in msgList" :key="i">

					<!-- 用户消息 头像可选加入-->
					<view v-if="x.my" class="flex justify-end padding-right one-show  align-start  padding-top">
						<!-- 	<image v-if="!x.my" class="chat-img" src="../../static/..." mode="aspectFill" ></image> -->
						<view class="flex justify-end" style="width: 400rpx;">
							<view class="margin-left padding-chat bg-cyan" style="border-radius: 35rpx;">
								<text style="word-break: break-all;">{{x.msg}}</text>
							</view>
						</view>
						<!-- <image class="chat-img margin-left" src="../../static/..." mode="aspectFill" ></image> -->
					</view>
					
					<!-- 机器人消息 -->
					<view v-if="!x.my" class="flex-row-start margin-left margin-top one-show">
						<view class="chat-img flex-row-center">
							<image style="height: 75rpx;width: 75rpx;" src="./image/robot.png" mode="aspectFit"></image>
						</view>
						<view class="flex" style="width: 500rpx;">
							<view class="margin-left padding-chat flex-column-start" style="border-radius: 35rpx;background-color: #f9f9f9;">
								<text style="word-break: break-all;">{{x.msg}}</text>
								<!-- 消息模板 =>初次问候 -->
								<view class="flex-column-start" v-if="x.type==1" style="color: #2fa39b;">
									<text style="color: #838383;font-size: 22rpx;margin-top: 15rpx;">你可以这样问我:</text>
									<text @click="answer(index)" style="margin-top: 30rpx;" v-for="(item,index) in x.questionList" :key="index">{{item}}</text>
									<view class="flex-row-start  padding-top-sm">
										<text class="my-neirong-sm">没有你要的答案?</text>
										<text class="padding-left" style="color: #007AFF;">换一批</text>
									</view>
								</view>
								<!-- 消息模板 =>多个答案 -->
								<view class="flex-column-start" v-if="x.type==2" style="color: #2fa39b;">
									<text style="color: #838383;font-size: 22rpx;margin-top: 15rpx;">猜你想问:</text>
									<!-- 连接服务器应该用item.id -->
									<text @click="answer(index)" style="margin-top: 30rpx;" v-for="(item,index) in x.questionList" :key="index">{{item}}</text>
								</view>
								<!-- 消息模板 => 无法回答-->
								<view class="flex-column-start" v-if="x.type==0">
									<text class="padding-top-sm" style="color: #2fa39b;">提交意见与反馈</text>
									<text style="color: #838383;font-size: 22rpx;margin-top: 15rpx;">下面是一些常见问题,您可以点击对应的文字快速获取答案:</text>
									<text @click="answer(index)" style="margin-top: 30rpx;color: #2fa39b;" v-for="(item,index) in x.questionList"
									 :key="index">{{item}}</text>
									<view class="flex-row-start  padding-top-sm">
										<text class="my-neirong-sm">没有你要的答案?</text>
										<text class="padding-left" style="color: #1396c5;">换一批</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				
				<!-- loading是显示 -->
				<view v-show="msgLoad" class="flex-row-start margin-left margin-top">
					<view class="chat-img flex-row-center">
						<image style="height: 75rpx;width: 75rpx;" src="./image/robot.png" mode="aspectFit"></image>
					</view>
					<view class="flex" style="width: 500rpx;">
						<view class="margin-left padding-chat flex-column-start" style="border-radius: 35rpx;background-color: #f9f9f9;">
							<view class="cuIcon-loading turn-load" style="font-size: 35rpx;color: #3e9982;">

							</view>
						</view>
					</view>
				</view>
				
				<!-- 防止消息底部被遮 -->
				<view style="height: 120rpx;"></view>
			</view>
		</scroll-view>

		<!-- 底部导航栏 -->
		<view class="flex-column-center" style="position: fixed;bottom: -180px;" :animation="animationData">
			<view class="bottom-dh-char flex-row-around" style="font-size: 55rpx;">
				<text @click="ckAdd" class="cuIcon-roundadd text-gray"></text>
				<!-- vue无法使用软键盘"发送"，可以使用nvue -->
				<input v-model="inputContent" class="dh-input" type="text" style="background-color: #f0f0f0;" @confirm="sendTextMessage"
				 confirm-type="search" placeholder-class="my-neirong-sm" placeholder="输入内容..." />
				<view @click="sendTextMessage" class="cu-tag round">
					发送
				</view>
			</view>
			<!-- 附加栏(自定义) -->
			<view class="box-normal flex-row-around flex-wrap">
				<view class="tb-text" @click="takePicture()">
					<view class="cuIcon-form"></view>
					<text>拍照</text>
				</view>
				<view class="tb-text" @click="pickPhoto()">
					<view class="cuIcon-form"></view>
					<text>相册</text>
				</view>
<!-- 				<view class="tb-text">
					<view class="cuIcon-form"></view>
					<text>问题反馈</text>
				</view> -->
<!-- 				<view class="tb-text">
					<view class="cuIcon-form"></view>
					<text>人工客服</text>
				</view> -->
			</view>
		</view>
		
	</view>
</template>

<script>
import * as constants from '@/components/bytedesk_kefu/js/constants.js'
import * as httpApi from '@/components/bytedesk_kefu/js/api/httpapi.js'
import * as stompApi from '@/components/bytedesk_kefu/js/api/stompapi.js'
// rpx和px的比率
var l
// 可用窗口高度
var wh
// 顶部空盒子的高度
var mgUpHeight
export default {
	onLoad(option) {
		// 如果需要缓存消息缓存msgList即可
		// 监听键盘拉起
		// 因为无法控制键盘拉起的速度,所以这里尽量以慢速处理
		uni.onKeyboardHeightChange(res => {
			const query = uni.createSelectorQuery()
			query.select('#content').boundingClientRect(data => {
				// 若消息体没有超过2倍的键盘则向下移动差值,防止遮住消息体
				var up = res.height * 2 - data.height - l * 110
				// console.log(up)
				if (up > 0) {
					// 动态改变空盒子高度
					this.msgMove(up, 300)
					// 记录改变的值,若不收回键盘且发送了消息用来防止消息过多被遮盖
					mgUpHeight = up
				}
				// 收回
				if (res.height == 0) {
					this.msgMove(0, 0)
				}
			}).exec();
		})
		var query = uni.getSystemInfoSync()
		l = query.screenWidth / 750
		wh = query.windowHeight
		this.srcollHeight = query.windowHeight + "px"
		
		// 登录
		uni.setNavigationBarTitle({
		　　title:option.title
		})
		this.login(option)
	},
	onShow () {},
	onReady () {},
	onHide () {},
	data() {
		return {
			msgLoad: false,
			anData: {},
			animationData: {},
			showTow: false,
			// 消息体,定义机器人初次的消息(或者自定义出现时机)
			// my->谁发的消息 msg->消息文本 type->客服消息模板类型 questionList->快速获取问题答案的问题列表
			msgList: [{
				my: false,
				msg: "你好我是客服机器人娜娜,请问有什么问题可以帮助您?(问候模板)",
				type: 1,
				questionList: ["如何注销用户", "我想了解业务流程", "手机号如何更换"]
			}],
			msg: "",
			go: 0,
			srcollHeight: 0,

			// 萝卜丝
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
			access_token: '',
			passport: {
				token: {
					access_token: '',
				}
			},
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
			// 当前访客用户名
			uid: '',
			username: '',
			password: '',
			nickname: '',
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
		}
	},
	computed: {
		threadTopic() {
			return this.thread.topic.replace(/\//, ".");
		},
	},
	methods: {
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
				|| message.type === 'commodity'
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
			return this.nickname.trim().length > 0 ? this.nickname : this.thread.visitor.nickname
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
		login(option) {
			// 萝卜丝-匿名登录
			try {
			    // 获取subDomain，也即企业号：登录后台->客服管理->客服账号->企业号
			    let subDomain = uni.getStorageSync(constants.subDomain)
			    // 登录后台->渠道管理-》uniapp中创建应用获取
			    let appKey = uni.getStorageSync(constants.appKey)
			    if (subDomain && appKey) {
			        // console.log(subDomain, appKey);
					let app = this
					httpApi.anonymousLogin(subDomain, appKey, function(result) {
						// 请求会话
						app.requestThread(option)
					}, function(error) {
						console.log('login error:', error)
					})
			    } else {
					console.error('未设置subDomain或appKey')
				}
			} catch (error) {
			    console.error('read subdomain/appkey error', error)
			}
		},
		// 请求会话
		requestThread (option) {
			//
			if (option.type === undefined || option.type === null) {
				return
			}
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
				if (this.isManulRequestThread || this.loadHistory === '0') {
					this.pushToMessageArray(message);
				}
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
				if (this.isManulRequestThread || this.loadHistory === '0') {
					this.pushToMessageArray(message);
				}
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
			// this.scrollToBottom();
			// // 建立长连接
			this.byteDeskConnect();
		},
		/**
		 * 发送同步消息
		 */
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
		sendImageMessageSync(content) {
			// this.sendMessageSync('image', content)
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
					"imageUrl": content
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
		sendCommodityMessageSync() {
			let goods = this.getUrlParam("goods")
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
			let goods = this.getUrlParam("goods")
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
				"id": this.getUrlParam("goods_id"),
				"title": this.getUrlParam("goods_title"),
				"content":this.getUrlParam("goods_content"),
				"price": this.getUrlParam("goods_price"),
				"url": this.getUrlParam("goods_url"),
				"imageUrl": this.getUrlParam("goods_imageUrl"),
				"categoryCode": this.getUrlParam("goods_categoryCode"),
				"type":"commodity"
			}
			return JSON.stringify(commodidy)
		},
		/**
		 * 输入框变化
		 */
		onInputChange (content) {
			// console.log(content);
			if (this.isRobot || this.isThreadClosed) {
				return;
			}
			this.localPreviewContent = content
			this.delaySendPreviewMessage()
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
		/**
		 * 发送消息
		 */
		sendTextMessage () {
			//
			if (this.inputContent.trim().length === 0) {
				return;
			}
			//
			if (this.isRobot) {
				// this.messageAnswer(this.inputContent);
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
		/**
		 * 消息回执：收到消息之后回复给消息发送方
		 * 消息content字段存放status: 1. received, 2. read
		 */
		sendReceiptMessage (mid, status) {
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
		/**
		 * 消息撤回
		 */
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
			//
			stompApi.connect(this.thread)
		},
		//
		currentTimestamp () {
			// return moment().format('YYYY-MM-DD HH:mm:ss')
			return ''
		},
		///
		takePicture () {
			console.log('take picture');
		},
		pickPhoto () {
			console.log('pick photo');
		},
		guid() {
			function s4 () {
				return Math.floor((1 + Math.random()) * 0x10000)
					.toString(16)
					.substring(1)
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
		},
		// 切换输入法时移动输入框(按照官方的上推页面的原理应该会自动适应不同的键盘高度-->官方bug)
		goPag(kh) {
			this.upTowmn(0, 250)
			if (this.keyHeight != 0) {
				if (kh - this.keyHeight > 0) {
					this.upTowmn(this.keyHeight - kh, 250)
				}
			}
		},
		// 移动顶部的空盒子
		msgMove(x, t) {
			var animation = uni.createAnimation({
				duration: t,
				timingFunction: 'linear',
			})
			this.animation = animation
			animation.height(x).step()
			this.anData = animation.export()
		},
		// 保持消息体可见
		msgGo() {
			const query = uni.createSelectorQuery()
			// 延时100ms保证是最新的高度
			setTimeout(() => {
				// 获取消息体高度
				query.select('#content').boundingClientRect(data => {
					// 如果超过scorll高度就滚动scorll
					if (data.height - wh > 0) {
						this.go = data.height - wh
					}
					// 保证键盘第一次拉起时消息体能保持可见
					var moveY = wh - data.height
					// 超出页面则缩回空盒子
					if (moveY - mgUpHeight < 0) {
						// 小于0则视为0
						if (moveY < 0) {
							this.msgMove(0, 200)
						} else {
							// 否则缩回盒子对应的高度
							this.msgMove(moveY, 200)
						}
					}

				}).exec();
			}, 100)
		},
		// 回答问题的业务逻辑
		answer(id) {
			// 这里应该传入问题的id,模拟就用index代替了
			console.log(id)

		},
		sendMsg() {
			// 消息为空不做任何操作
			if (this.msg == "") {
				return 0;
			}
			// 显示消息 msg消息文本,my鉴别是谁发的消息(不能用俩个消息数组循环,否则消息不会穿插)
			this.msgList.push({
				"msg": this.msg,
				"my": true
			})
			// 保证消息可见
			this.msgGo()
			// 回答问题
			this.msgKf(this.msg)
			// 清除消息
			this.msg = ""
		},
		msgKf(x) {
			// loading
			this.msgLoad = true
			// 这里连接服务器获取答案
			// 下面模拟请求
			setTimeout(() => {
				// 取消loading
				this.msgLoad = false
				this.msgList.push({
					my: false,
					msg: "娜娜还在学习中,没能明白您的问题,您点击下方提交反馈与问题,我们会尽快人工处理(无法回答模板)",
					type: 0,
					questionList: ["如何注销用户", "我想了解业务流程", "手机号如何更换"]
				})
				this.msgList.push({
					my: false,
					msg: "单消息模板",
					type: -1
				})
				this.msgList.push({
					my: false,
					msg: "根据您的问题,已为您匹配了下列问题(多个答案模板)",
					type: 2,
					questionList: ["如何注销用户", "我想了解业务流程", "手机号如何更换"]
				})
				this.msgGo()
			}, 2000)
		},
		// 不建议输入框聚焦时操作此动画
		ckAdd() {
			if (!this.showTow) {
				this.upTowmn(-180, 350)
			} else {
				this.upTowmn(0, 200)
			}
			this.showTow = !this.showTow
		},
		hideKey() {
			uni.hideKeyboard()
		},
		// 拉起/收回附加栏
		upTowmn(x, t) {
			var animation = uni.createAnimation({
				duration: t,
				timingFunction: 'ease',
			})
			this.animation = animation
			animation.translateY(x).step()
			this.animationData = animation.export()
		}
	}
}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "css/index-app.css";

	.bottom-dh-char {
		background-color: #f9f9f9;
		width: 750rpx;
		height: 110rpx;
	}

	.center-box {
		width: 720rpx;
		padding-left: 25rpx;
	}

	.hui-box {
		width: 750rpx;
		height: 100%;
	}

	.dh-input {
		width: 500rpx;
		height: 65rpx;
		border-radius: 30rpx;
		padding-left: 15rpx;
		background-color: #FFFFFF;
	}

	.box-normal {
		width: 750rpx;
		height: 180px;
		background-color: #FFFFFF;
	}

	.tb-text view {
		font-size: 65rpx;
	}

	.tb-text text {
		font-size: 25rpx;
		color: #737373;
	}

	.chat-img {
		border-radius: 50%;
		width: 100rpx;
		height: 100rpx;
		background-color: #f7f7f7;
	}

	.padding-chat {
		padding: 17rpx 20rpx;
	}

	.tb-nv {
		width: 50rpx;
		height: 50rpx;
	}
</style>
