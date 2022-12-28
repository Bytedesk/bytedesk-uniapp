// 本地测试
// export const IS_PRODUCTION = false
// export const API_BASE_URL = 'http://127.0.0.1:8000'
// export const WEBSOCKET_URL = 'ws://127.0.0.1:8000/stomp/mini?access_token='
// 线上环境
export const IS_PRODUCTION = true
export const API_BASE_URL = 'https://uniapp.bytedesk.com'
export const WEBSOCKET_URL = 'wss://uniapp.bytedesk.com/stomp/mini?access_token='
//
export const uid = 'bytedesk_uid'
export const username = 'bytedesk_username'
export const password = 'bytedesk_password'
export const nickname = 'bytedesk_nickname'
export const avatar = 'bytedesk_avatar'
export const description = 'bytedesk_description'
export const subDomain = 'bytedesk_subDomain'
export const isLogin = 'bytedesk_isLogin'
export const isLoginMobile = 'bytedesk_isLogin_Mobile'
export const accessToken = 'bytedesk_accessToken'
export const refreshToken = 'bytedesk_refreshToken'
export const client = 'uniapp'
export const appKey = 'bytedesk_appkey'
// 文本消息类型
export const MESSAGE_TYPE_TEXT = 'text'
  // 图片消息类型
export const MESSAGE_TYPE_IMAGE = 'image'
  // 文件消息类型
export const MESSAGE_TYPE_FILE = 'file'
  // 语音消息类型
export const MESSAGE_TYPE_VOICE = 'voice'
  // 视频消息类型
export const MESSAGE_TYPE_VIDEO = 'video'
  // 商品
export const MESSAGE_TYPE_COMMODITY = 'commodity'
  // 短视频消息类型
export const MESSAGE_TYPE_SHORT_VIDEO = 'shortvideo'
  // 位置消息类型
export const MESSAGE_TYPE_LOCATION = 'location'
  // 链接消息类型
export const MESSAGE_TYPE_LINK = 'link'
  // 事件消息类型
export const MESSAGE_TYPE_EVENT = 'event'
  // 机器人 自动回复
export const MESSAGE_TYPE_ROBOT = 'robot'
export const MESSAGE_TYPE_ROBOTV2 = 'robotv2'
//
export const MESSAGE_STATUS_SENDING = 'sending'
// 送达
export const MESSAGE_STATUS_RECEIVED = 'received'
// 已读
export const MESSAGE_STATUS_READ = 'read'
// 发送到服务器，成功存储数据库中
export const MESSAGE_STATUS_STORED = 'stored'
// 发送错误
export const MESSAGE_STATUS_ERROR = 'error'
//
export const CHAT_TYPE_WORKGROUP = 'workGroup'
export const CHAT_TYPE_APPOINTED = 'appointed'
//
export const vibrate = 'bytedesk_vibrate'
export const playAudio = 'bytedesk_playAudio'
//
export const EVENT_BUS_MESSAGE = 'BYTEDESK_EVENT_BUS_MESSAGE'
// stomp连接中
export const STOMP_CONNECTION_STATUS_CONNECTING = 'connecting'
// stomp连接成功
export const STOMP_CONNECTION_STATUS_CONNECTED = 'connected'
// stomp连接断开
export const STOMP_CONNECTION_STATUS_DISCONNECTED = 'disconnncted'
// 长连接状态
export const EVENT_BUS_STOMP_CONNECTION_STATUS = 'EVENT_BUS_STOMP_CONNECTION_STATUS'
// 上传图片
export const UPLOAD_IMAGE_URL = 'https://upload.bytedesk.com/visitor/api/upload/image'
// 上传语音
export const UPLOAD_VOICE_URL = 'https://upload.bytedesk.com/visitor/api/upload/voice'
// 上传视频
export const UPLOAD_VIDEO_URL = 'https://upload.bytedesk.com/visitor/api/upload/video'
// 上传文件
export const UPLOAD_FILE_URL = 'https://upload.bytedesk.com/visitor/api/upload/file'
