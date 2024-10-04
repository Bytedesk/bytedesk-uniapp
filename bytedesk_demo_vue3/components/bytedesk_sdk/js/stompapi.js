// import moment from './moment.min.js'
import moment from "moment"
import * as constants from './constants.js'
import * as utils from './utils.js'
import { Client } from '@stomp/stompjs';
// import * as Stomp from "@stomp/stompjs";

let uid;
// let username;
let nickname;
let avatar;
//
let stompClient;
let stompReconnectTimes = 0;
// 订阅主题topic
let subscribedTopics = []
// socket连接中
let socketConnecting = false
// socket是否连接
let socketConnected = false;
// socketTask实例
let socketTask = false
// 是否断线重连
let reconnect = true;
// 缓存消息
let messagesCache = {}
//
// let currentThread = {
// 	tid: '',
// 	topic: ''
// }
//
export function connect(topic, orgUid, callback) {
	console.log('connect stomp')
	// currentThread = thread;
	// 已经连接则无需重复连接
	if (socketConnected) {
		// 长连接成功回调
		callback();
		return
	}

	// 发送消息
	function sendSocketMessage(msg) {
		// console.log('sendSocketMessage:', msg)
		// 如果socket已连接则发送消息
		if (socketConnected) {
			// uni.sendSocketMessage({
			//   data: msg
			// })
			socketTask.send({
				data: msg,
				success(res) {
					// console.log('socketTask send success:', res);
				},
				fail(err) {
					// TODO: 发送失败 待处理
					// console.log('socketTask send failed:', err);
				}
			})
		} else {
			console.log('提示连接断开，无法发送消息')
			// 重连
			setTimeout(function () {
				connectWebSocket();
			}, 5000)
		}
	}

	// 关闭连接
	function close() {
		console.log('close')
		if (socketConnected) {
			// uni.closeSocket()
			if (socketTask && socketTask.close) {
				socketTask.close()
			}
			socketConnected = false;
			// 为断开重连做准备
			subscribedTopics = [];
		}
	}

	//
	function onopen() {
		console.log('onopen');
		// stompConnect(webSocket)
	}

	//
	function onmessage(message) {
		// console.log('onmessage:', message)
	}

	// 符合WebSocket定义的对象
	var webSocket = {
		send: sendSocketMessage,
		close: close,
		onopen: onopen,
		onmessage: onmessage
	}

	// 创建一个 WebSocket 连接
	function connectWebSocket() {
		//
		uid = uni.getStorageSync(constants.VISITOR_UID)
		//   username = uni.getStorageSync(constants.username)
		nickname = uni.getStorageSync(constants.VISITOR_NICKNAME)
		avatar = uni.getStorageSync(constants.VISITOR_AVATAR)
		//
		if (socketConnected) {
			return
		}
		//
		socketTask = uni.connectSocket({
			// url: constants.WEBSOCKET_URL + uni.getStorageSync(constants.accessToken),
			url: constants.STOMP_WS_URL,
			// #ifdef MP
			header: {
				'content-type': 'application/json'
			},
			// #endif
			// #ifdef MP-WEIXIN
			method: 'GET',
			// #endif
			success(res) {
				// 这里是接口调用成功的回调，不是连接成功的回调，请注意
				console.log("connectWebSocket socketTask success")
			},
			fail(err) {
				// 这里是接口调用失败的回调，不是连接失败的回调，请注意
				console.log("connectWebSocket socketTask failed")
			}
		})
		// console.log(socketTask);

		socketTask.onOpen((result) => {
			console.log("SocketOpen:" + result)
			socketConnecting = false;
			socketConnected = true;
			webSocket.onopen();
		})

		socketTask.onMessage((result) => {
			webSocket.onmessage(result);
			// console.log('onMessage', result)
		})

		socketTask.onError((result) => {
			console.log("SocketError:" + result)
			socketConnecting = false
			if (!socketConnected) {
				// 为断开重连做准备
				subscribedTopics = [];
				// 断线重连
				if (reconnect) {
					setTimeout(function () {
						connectWebSocket();
					}, 5000)
				}
			}
			// this.connecting = false
			// this.connected = false
		})

		socketTask.onClose((result) => {
			console.log("SocketClose:" + result)
			socketConnected = false;
			socketTask = false
			// 为断开重连做准备
			subscribedTopics = [];
			// 断线重连
			if (reconnect) {
				setTimeout(function () {
					connectWebSocket();
				}, 5000)
			}
		})
	}
	connectWebSocket();
	// 
	stompConnect(topic, orgUid)
}

/**
 * stomp长连接
 * TODO: 加载所属工作组，添加订阅
 */
export function stompConnect(topic, orgUid) {
	stompClient = new Client({
		brokerURL: constants.STOMP_WS_URL,
		debug: function (str) {
			if (constants.IS_DEBUG) {
				console.log("debug:", str);
			}
		},
		//   https://stomp-js.github.io/guide/stompjs/using-stompjs-v5.html#auto-reconnect
		// reconnectDelay: 5000,
		// https://stomp-js.github.io/guide/stompjs/using-stompjs-v5.html#heart-beating
		heartbeatIncoming: 10 * 1000, // same as server
		heartbeatOutgoing: 10 * 1000, // same as server
		onConnect: () => {
			console.log('stomp connected...')
			subscribeTopic(topic, orgUid)
		},
		onDisconnect: () => {
			console.log('stomp disconnected...')
		},
		onStompError: (error) => {
			console.log('stomp error...')
		},
		onWebSocketClose: (event) => {
			console.log('stomp close...')
		},
		onWebSocketError: (error) => {
			console.log('stomp error...')
		},
	});
	console.log('stomp connecting...')
	// 更新连接状态：连接中...
	// let connectionStatus = constants.STOMP_CONNECTION_STATUS_CONNECTING
	// uni.$emit(constants.EVENT_BUS_STOMP_CONNECTION_STATUS, connectionStatus)
	if (!constants.IS_DEBUG) {
		stompClient.debug = function (value) { }
	}
	stompClient.activate();
}

// 发送消息
export function sendMessage(topic, jsonString) {
	console.log('stomp sendMessage:', topic)
	// stompClient.send("/app/" + topic, {},
	// 	jsonString
	// );
	stompClient.publish({
		destination: "/app/" + topic,
		body: jsonString,
		// skipContentLengthHeader: true,
		// headers: { priority: '9' },
		// headers: { 'content-type': 'application/octet-stream' },
	});
}

/**
 * 添加订阅，必须添加前缀 '/topic/'
 * FIXME: 初始登录之后，当需要订阅主题太多的情况容易造成界面卡顿
 * @param topic
 */
export function subscribeTopic(topic, orgUid) {
	console.log('subscribeTopic:', topic, orgUid)
	// 防止重复订阅
	if (subscribedTopics.includes(topic)) {
		return;
	}
	subscribedTopics.push(topic);
	// 判断是否为空
	if (stompClient === null || stompClient === undefined) {
		return
	}
	// 初始化
	messagesCache[topic] = []
	// 订阅主题
	stompClient.subscribe("/topic/" + topic, function (message) {
		console.log('subscribe body:', topic);
		// 
		var messageObject = JSON.parse(message.body);
		if (messageObject.status === 'sending') {
			messageObject.status = 'stored'
		}
		uni.$emit('message', messageObject);
		// TODO: 缓存消息
		let messageArray = messagesCache[topic]
		messageArray.push(messageObject)
		messagesCache[topic] = messageArray
		// TODO: 发送送达回执
		sendReceiptMessage(messageObject)
	});
}

/**
 * 取消订阅，必须添加前缀 '/topic/'
 * https://stomp-js.github.io/stomp-websocket/codo/class/Client.html#unsubscribe-dynamic
 * @param topic
 */
export function unsubscribeTopic(topic) {
	stompClient.unsubscribe('/topic/' + topic)
}

/**
 * 断开stomp连接
 * https://stomp-js.github.io/stomp-websocket/codo/extra/docs-src/Usage.md.html
 */
export function stompDisconnect() {
	stompClient.disconnect(function () {
		console.log('stomp disconnect')
	})
}

// 判断stomp是否已连接
export function isConnected() {
	return socketConnected;
}

// 获取本地缓存聊天记录
export function getCacheMessages(topic) {
	return messagesCache[topic]
}

export function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1)
	}
	let timestamp = moment(new Date()).format('YYYYMMDDHHmmss');
	return timestamp + s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4()
}

export function currentTimestamp() {
	return moment().format('YYYY-MM-DD HH:mm:ss')
}

//
export function sendReceiptMessage(messageObject) {
	console.log('sendReceiptMessage:', messageObject)
}

// 打印log
export function printLog(content) {
	if (constants.IS_DEBUG) {
		console.log(content)
	}
}

