<template>
	<view>
		<!-- 空盒子用来防止消息过少时 拉起键盘会遮盖消息 -->
		<view :animation="anData" style="height:0;"></view>
		<!-- 消息体 -->
		<scroll-view scroll-with-animation scroll-y="true" @touchmove="hideKey" style="width: 750rpx;" :style="{'height':srcollHeight}"
		 :scroll-top="go">
			<!-- 用来获取消息体高度 -->
			<view id="content" scroll-with-animation>
				<!-- 消息 -->
				<view class="flex-column-start" v-for="(message, i) in messages" :key="i">
					
					<text style="text-align: center; margin-top: 10rpx; font-size: 25rpx; color: #AAAAAA;">{{ message.createdAt }}</text>
					
					<view style="text-align: center; margin-top: 10rpx;">
						<text v-if="is_type_notification_agent_close(message)" style="word-break: break-all;">{{ message.content }}</text>
						<text v-else-if="is_type_notification_visitor_close(message)" style="word-break: break-all;">{{ message.content }}</text>
						<text v-else-if="is_type_notification_auto_close(message)" style="word-break: break-all;">{{ message.content }}</text>
						<text v-else-if="is_type_notification_thread_reentry(message)" style="word-break: break-all;">{{ message.content }}</text>
						<text v-else-if="is_type_notification_offline(message)" style="word-break: break-all;">{{ message.content }}</text>
						<text v-else-if="is_type_notification_invite_rate(message)" style="word-break: break-all;">{{ message.content }}</text>
						<text v-else-if="is_type_notification_rate_result(message)" style="word-break: break-all;">{{ message.content }}</text>
						<text v-else-if="is_type_notification(message)" style="word-break: break-all;">{{ message.content }}</text>
					</view>
					
					<view v-if="!is_type_notification(message)">
						
						<!-- 发送消息-->
						<view v-if="is_self(message)" class="flex justify-end padding-right one-show  align-start  padding-top">
							
							<!-- <image class="chat-img margin-left" src="../../static/..." mode="aspectFill" ></image> -->
							<view class="flex justify-end" style="width: 400rpx;">
								<!-- 消息状态 -->
								<view class="status">
									<text v-if="is_sending(message)" class="fa fa-spinner fa-spin" style="font-size:12px"></text>
									<text v-if="is_stored(message)" class="fa fa-times-circle" style="font-size:10px"></text>
									<text v-if="is_received(message)" style="font-size:10px; margin-right: 5px;">送达</text>
									<text v-if="is_read(message)" style="font-size:10px; margin-right: 5px;">已读</text>
									<text v-if="is_error(message)" class="fa fa-times-circle" style="font-size:12px"></text>
								</view>
								<view class="margin-left padding-chat bg-cyan" style="border-radius: 35rpx;">
									<text v-if="is_type_text(message)" style="word-break: break-all;">{{ message.content }}</text>
									<image v-if="is_type_image(message)" class="message-img" :src="message.imageUrl" @click="previewImageMessage(message)" mode="aspectFill" ></image> 
								</view>
							</view>
							<!-- 发送者头像 -->
							<!-- <image v-if="is_self(message)" style="height: 75rpx;width: 75rpx; margin-left: 10rpx;" class="chat-img" :src="message.user.avatar" mode="aspectFill" ></image> -->
						</view>
						
						<!-- 接收消息 -->
						<view v-if="!is_self(message)" class="flex-row-start margin-left margin-top one-show">
							<!-- 头像 -->
							<view class="chat-img flex-row-center">
								<image style="height: 75rpx;width: 75rpx;" :src="message.user.avatar" mode="aspectFit"></image>
							</view>
							<!-- 消息体 -->
							<view class="flex" style="width: 500rpx;">
								<view class="margin-left padding-chat flex-column-start" style="border-radius: 35rpx;background-color: #f9f9f9;">
									
									<text v-if="is_type_text(message)" style="word-break: break-all;">{{ message.content }}</text>
									<image v-if="is_type_image(message)" class="message-img" :src="message.imageUrl" @click="previewImageMessage(message)" mode="aspectFill" ></image> 
									<!-- 消息模板 =>初次问候 -->
									<view class="flex-column-start" v-if="message.type==1" style="color: #2fa39b;">
										<text style="color: #838383;font-size: 22rpx;margin-top: 15rpx;">你可以这样问我:</text>
										<text @click="answer(index)" style="margin-top: 30rpx;" v-for="(item, index) in message.questionList" :key="index">{{item}}</text>
										<!-- TODO: -->
										<view class="flex-row-start  padding-top-sm">
											<text class="my-neirong-sm">没有你要的答案?</text>
											<text class="padding-left" style="color: #007AFF;">换一批</text>
										</view>
									</view>
									<!-- 消息模板 =>多个答案 -->
									<view class="flex-column-start" v-if="message.type==2" style="color: #2fa39b;">
										<text style="color: #838383;font-size: 22rpx;margin-top: 15rpx;">猜你想问:</text>
										<!-- 连接服务器应该用item.id -->
										<text @click="answer(index)" style="margin-top: 30rpx;" v-for="(item,index) in message.questionList" :key="index">{{item}}</text>
									</view>
									<!-- 消息模板 => 无法回答-->
									<view class="flex-column-start" v-if="message.type==0">
										<text class="padding-top-sm" style="color: #2fa39b;">提交意见与反馈</text>
										<text style="color: #838383;font-size: 22rpx;margin-top: 15rpx;">下面是一些常见问题,您可以点击对应的文字快速获取答案:</text>
										<text @click="answer(index)" style="margin-top: 30rpx;color: #2fa39b;" v-for="(item,index) in message.questionList"
										 :key="index">{{ item }}</text>
										<view class="flex-row-start  padding-top-sm">
											<text class="my-neirong-sm">没有你要的答案?</text>
											<text class="padding-left" style="color: #1396c5;">换一批</text>
										</view>
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
					<text>图片</text>
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
		//
		this.option = option
	},
	onShow () {},
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
		this.login(this.option)
	},
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
				content: "你好我是客服机器人娜娜,请问有什么问题可以帮助您?(问候模板)",
				type: 1,
				questionList: ["如何注销用户", "我想了解业务流程", "手机号如何更换"]
			}],
			//
			content: "",
			go: 0,
			srcollHeight: 0,

			// 萝卜丝
			option: {},
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
		}
	},
	computed: {
		threadTopic() {
			return this.thread.topic.replace(/\//, ".");
		},
	},
	methods: {
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
			// this.scrollToBottom();
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
			stompApi.connect(this.thread)
		},
		onMessageReceived (messageObject) {
			//
			if ((messageObject.type === 'text'
			  || messageObject.type === 'image'
			  || messageObject.type === 'file')
			  // && messageObject.user.uid !== this.uid
			  ) {
			  // 新protobuf转换json
			  messageObject.createdAt = messageObject.timestamp;
			  if (messageObject.type === "text") {
			      messageObject.content = messageObject.text.content;
			  } else if (messageObject.type === "image") {
			      messageObject.imageUrl = messageObject.image.imageUrl;
			  }
			  //
			  let mid = messageObject.mid;
			  // 发送消息回执：消息送达
			  this.sendReceiptMessage(mid, 'received');
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
						// this.messages[i].status = messageObject.receipt.status
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
			    // this.scrollToBottom()
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
		takePicture () {
			// 拍照 + 相册
			console.log('take picture');
			let app = this;
			uni.chooseImage({
				count: 1, //默认9
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
			if (this.content == "") {
				return 0;
			}
			// 显示消息 content消息文本,my鉴别是谁发的消息(不能用俩个消息数组循环,否则消息不会穿插)
			this.msgList.push({
				"content": this.content,
				"my": true
			})
			// 保证消息可见
			this.msgGo()
			// 回答问题
			this.msgKf(this.content)
			// 清除消息
			this.content = ""
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
					content: "娜娜还在学习中,没能明白您的问题,您点击下方提交反馈与问题,我们会尽快人工处理(无法回答模板)",
					type: 0,
					questionList: ["如何注销用户", "我想了解业务流程", "手机号如何更换"]
				})
				this.msgList.push({
					my: false,
					content: "单消息模板",
					type: -1
				})
				this.msgList.push({
					my: false,
					content: "根据您的问题,已为您匹配了下列问题(多个答案模板)",
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
	
	.message-img {
		border-radius: 5%;
		width: 300rpx;
		height: 300rpx;
		background-color: #f7f7f7;
	}

	.padding-chat {
		padding: 17rpx 20rpx;
	}

	.tb-nv {
		width: 50rpx;
		height: 50rpx;
	}
	
	.status {
	    float: right;
	    margin-right: 8px;
	}
</style>
