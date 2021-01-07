const constants = require('../constants.js')
const Stomp = require('./stomp.min.js').Stomp;

let stompClient;
let stompReconnectTimes = 0;
let subscribedTopics = []
// socket是否连接
let socketConnected = false;
// 是否断线重连
let reconnect = true;
//
let currentThread = {
	tid: '',
	topic: ''
}

var stompApi = {

  connect: function(thread) {
    console.log('connect stomp')
	currentThread = thread;
	// 已经连接则无需重复连接
	if (socketConnected) {
		return
	}

    // 发送消息
    function sendSocketMessage(msg) {
      // 如果socket已连接则发送消息
      if (socketConnected) {
        uni.sendSocketMessage({
          data: msg
        })
      } else {
        console.log('提示连接断开，无法发送消息')
      }
    }

    // 关闭连接
    function close() {
      if (socketConnected) {
        uni.closeSocket()
        socketConnected = false;
      }
    }

    // 符合WebSocket定义的对象
    var ws = {
      send: sendSocketMessage,
      close: close
    }

    // 创建一个 WebSocket 连接
    function connectWebSocket() {
      uni.connectSocket({
        url: constants.WEBSOCKET_URL + uni.getStorageSync(constants.accessToken),
        header: {
          // access_token: app.globalData.token.access_token
        },
        success() {
          console.log("socket连接成功")
        },
        fail() {
          console.log("socket连接失败")
        },
        complete() {
          console.log("socket连接完成");
        }
      })
    }

    // 监听 WebSocket 连接打开事件
    uni.onSocketOpen(function (res) {
      console.log("WebSocket 连接成功:", res)
      socketConnected = true;
      ws.onopen();
    })

    // 监听 WebSocket 接受到服务器的消息事件
    uni.onSocketMessage(function (res) {
      ws.onmessage(res);
    })

    // 监听 WebSocket 错误事件
    uni.onSocketError(function (res) {
      console.log("WebSocket 错误事件:", res)
      if (!socketConnected) {
        // 断线重连
        if (reconnect) {
          connectWebSocket();
        }
      }
    })

    // 监听 WebSocket 连接关闭事件
    uni.onSocketClose(function (res) {
      console.log("WebSocket 连接关闭:", res)
      socketConnected = false;
      // 断线重连
      if (reconnect) {
        connectWebSocket();
      }
    })

    //
    connectWebSocket();
    stompApi.stompConnect(ws)
  },

  /**
   * stomp长连接
   * TODO: 加载所属工作组，添加订阅
   */
  stompConnect: function(ws) {
    /**
     * 定期发送心跳或检测服务器心跳
     *  The heart-beating is using window.setInterval() to regularly send heart-beats and/or check server heart-beats.
     *  可看stomp.js的源码（195,207，489行），由于小程序没有window对象，所以我们要调用小程序的定时器api实现
     */
    Stomp.setInterval = function (interval, f) {
      return setInterval(f, interval);
    };

    // 结束定时器的循环调用
    Stomp.clearInterval = function (id) {
      return clearInterval(id);
    };

    stompClient = Stomp.over(ws);
    // 更新连接状态: 连接中...
    // let connectionStatus = constants.STOMP_CONNECTION_STATUS_CONNECTING
    // commit(types.UPDATE_USER_CONNECTION, { connectionStatus }, { root: true })
    // bus.$emit(constants.EVENT_BUS_STOMP_CONNECTION_STATUS, connectionStatus)
    // to disable logging, set it to an empty function:
    if (constants.IS_PRODUCTION) {
      // stompClient.debug = function (value) {}
    }
    stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame)
      // TODO: 断开重连成功之后，需要重新从服务器请求thread，然后添加sub订阅
      // 登录成功之后，尝试登录次数清零
      stompReconnectTimes = 0
	  // 订阅topic
	  let topic = currentThread.topic.replace(/\//, ".");
	  stompApi.subscribeTopic(topic)
      // 更新连接状态：连接成功
      // let connectionStatus = constants.STOMP_CONNECTION_STATUS_CONNECTED
      // commit(types.UPDATE_USER_CONNECTION, { connectionStatus }, { root: true })
      // bus.$emit(constants.EVENT_BUS_STOMP_CONNECTION_STATUS, connectionStatus)
    }, function (error) {
      console.log('连接断开【' + error + '】')
      // 清空订阅topic，以便于重连后添加订阅
      // commit(types.CLEAR_TOPIC, { root: true })
      // 统计连接次数，如果短时间内重试连接次数过多，则说明有可能token过期，需要刷新页面重新登录一下
      if (stompReconnectTimes >= 10) {
        // bus.$emit(constants.EVENT_BUS_LOGOUT, 'logout')
      }
      // 更新连接状态: 断开
      // let connectionStatus = constants.STOMP_CONNECTION_STATUS_DISCONNECTED
      // commit(types.UPDATE_USER_CONNECTION, { connectionStatus }, { root: true })
      // bus.$emit(constants.EVENT_BUS_STOMP_CONNECTION_STATUS, connectionStatus)
      // 10秒后重新连接，实际效果：每10秒重连一次，直到连接成功
      setTimeout(function () {
        console.log('reconnecting...')
        // 增加尝试连接次数
        stompReconnectTimes++
        // 重新连接
        stompConnect(ws)
      }, 5000)
    })
  },
  
  // 发送消息
  sendMessage: function(topic, jsonString) {
    console.log('sendMessage:', topic, jsonString)
    //
    stompClient.send("/app/" + topic, {},
      jsonString
    );
  },

  /**
   * 添加订阅，必须添加前缀 '/topic/'
   * FIXME: 初始登录之后，当需要订阅主题太多的情况容易造成界面卡顿
   * @param topic
   */
  subscribeTopic: function(topic) {
    console.log('subscribeTopic:' + topic)
	//
    let contains = subscribedTopics.some(tp => {
      return tp === topic
    })
    if (contains) {
      return
    }
    subscribedTopics.push(topic)
    //
    stompClient.subscribe("/topic/" + topic, function (message) {
      console.log('message :', message, 'body:', message.body);
      //
      var messageObject = JSON.parse(message.body);
	  // uni.$emit('message', messageObject);
	   
      if ((messageObject.type === 'text'
        || messageObject.type === 'image'
        || messageObject.type === 'file')
        // && messageObject.user.uid !== app.uid
        ) {
        //
        // // 新protobuf转换json
        // messageObject.createdAt = messageObject.timestamp;
        // if (messageObject.type === "text") {
        //     messageObject.content = messageObject.text.content;
        // } else if (messageObject.type === "image") {
        //     messageObject.imageUrl = messageObject.image.imageUrl;
        // }
        // //
        // let mid = messageObject.mid;
        // // 发送消息回执：消息送达
        // app.sendReceiptMessage(mid, 'received');
        // app.sendReceiptMessage(mid, "read");
      }
      else if (messageObject.type === 'notification_browse_invite') {
        //
      } else if (messageObject.type === 'notification_queue') {
          // 排队
      } else if (messageObject.type === 'notification_queue_accept') {
        // // 1. 保存thread
        // app.thread = messageObject.thread;
        // // 2. 订阅会话消息
        // app.subscribeTopic(app.threadTopic);
      } else if (messageObject.type === 'notification_invite_rate') {
        // // 邀请评价
        // app.isInviteRate = true;
        // app.switchRate()
      } else if (messageObject.type === 'notification_agent_close'
          || messageObject.type === 'notification_auto_close') {
        // // 新protobuf转换json
        // messageObject.createdAt = messageObject.timestamp;
        // messageObject.content = messageObject.text.content;
        // // TODO: 会话关闭，添加按钮方便用户点击重新请求会话
        // app.isThreadClosed = true
      } else if (messageObject.type === 'notification_preview') {
        //
        // if (messageObject.user.uid !== app.uid) {
        //     app.isInputingVisible = true;
        //     setTimeout(function () {
        //         app.isInputingVisible = false;
        //     }, 5000)
        // }
      } else if (messageObject.type === 'notification_receipt') {
        // 消息状态：送达 received、已读 read
        // if (messageObject.user.uid !== app.uid) {
        //   console.log('FIXME:消息状态：送达、已读, 显示不正确');
        //   for (let i = app.messages.length - 1; i >= 0; i--) {
        //     const msg = app.messages[i]
        //     if (msg.mid === messageObject.receipt.mid) {
        //       // TODO: 可更新顺序 read > received > stored > sending, 前面的状态可更新后面的
        //       if (app.messages[i].status === 'read') {
        //         return
        //       }
        //       console.log('do update:', msg.mid)
        //       app.messages[i].status = messageObject.receipt.status
        //     }
        //   }
        // }
      } else if (messageObject.type === 'notification_recall') {
        console.log('TODO:消息撤回');
        // $("#other" + messageObject.mid).hide();
      }
      //
      if (messageObject.type !== 'notification_preview'
          && messageObject.type !== 'notification_receipt'
          && messageObject.type !== 'notification_connect'
          && messageObject.type !== 'notification_disconnect') {
          // app.isRobot = false;
          // app.pushToMessageArray(messageObject);
          // app.scrollToBottom()
      } else {
          // TODO: 监听客服端输入状态
      }
    });
  },

  /**
   * 取消订阅，必须添加前缀 '/topic/'
   * https://stomp-js.github.io/stomp-websocket/codo/class/Client.html#unsubscribe-dynamic
   * @param topic
   */
  unsubscribeTopic: function(topic) {
    stompClient.unsubscribe('/topic/' + topic)
  },

  /**
   * 断开stomp连接
   * https://stomp-js.github.io/stomp-websocket/codo/extra/docs-src/Usage.md.html
   */
  stompDisconnect: function() {
    stompClient.disconnect(function () {
      console.log('stomp disconnect')
    })
  }

}

module.exports = {
  // stompClient: stompClient,
  connect: stompApi.connect,
  subscribeTopic: stompApi.subscribeTopic,
  sendMessage: stompApi.sendMessage
  // sendImageMessage: stompApi.sendImageMessage,
  // sendContactTextMessage: stompApi.sendContactTextMessage,
  // sendContactImageMessage: stompApi.sendContactImageMessage,
  // sendGroupTextMessage: stompApi.sendGroupTextMessage,
  // sendGroupImageMessage: stompApi.sendGroupImageMessage
}
