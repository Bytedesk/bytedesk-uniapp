// 常量
module.exports = {
  // 本地测试
  // IS_PRODUCTION: false,
  // API_BASE_URL: 'http://127.0.0.1:8000',
  // WEBSOCKET_URL: 'ws://127.0.0.1:8000/stomp/mini?access_token=',
  // 线上环境，TODO: 替换掉此域名
  IS_PRODUCTION: true,
  API_BASE_URL: 'https://stomp.bytedesk.com',
  WEBSOCKET_URL: 'wss://www.bytedesk.com/stomp/mini?access_token=',
  //
  uid: 'bytedesk_uid',
  username: 'bytedesk_username',
  password: 'bytedesk_password',
  nickname: 'bytedesk_nickname',
  avatar: 'bytedesk_avatar',
  description: 'bytedesk_description',
  subDomain: 'bytedesk_subDomain',
  isLogin: 'bytedesk_isLogin',
  isLoginMobile: 'bytedesk_isLogin_Mobile',
  accessToken: 'bytedesk_accessToken',
  refreshToken: 'bytedesk_refreshToken',
  client: 'uniapp',
  appKey: 'bytedesk_appkey',
  //
  CHAT_TYPE_WORKGROUP: 'workGroup',
  CHAT_TYPE_APPOINTED: 'appointed',
  //
  vibrate: 'bytedesk_vibrate',
  playAudio: 'bytedesk_playAudio',
  //
  EVENT_BUS_MESSAGE: 'BYTEDESK_EVENT_BUS_MESSAGE',
  // stomp连接中
  STOMP_CONNECTION_STATUS_CONNECTING: 'connecting',
  // stomp连接成功
  STOMP_CONNECTION_STATUS_CONNECTED: 'connected',
  // stomp连接断开
  STOMP_CONNECTION_STATUS_DISCONNECTED: 'disconnncted',
  // 长连接状态
  EVENT_BUS_STOMP_CONNECTION_STATUS: 'EVENT_BUS_STOMP_CONNECTION_STATUS',
  // 上传图片
  UPLOAD_IMAGE_URL: 'https://upload.bytedesk.com/visitor/api/upload/image',
  // 上传语音
  UPLOAD_VOICE_URL: 'https://upload.bytedesk.com/visitor/api/upload/voice',
  // 上传视频
  UPLOAD_VIDEO_URL: 'https://upload.bytedesk.com/visitor/api/upload/video',
  // 上传文件
  UPLOAD_FILE_URL: 'https://upload.bytedesk.com/visitor/api/upload/file',
}
