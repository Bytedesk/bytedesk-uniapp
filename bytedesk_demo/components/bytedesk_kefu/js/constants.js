// 常量
module.exports = {
  // 测试
  // IS_PRODUCTION: false,
  // API_BASE_URL: 'http://192.168.0.108:8000',
  // WEBSOCKET_URL: 'ws://192.168.0.108:8000/stomp/mini?access_token=',
  // API_BASE_URL: 'http://127.0.0.1:8000',
  // WEBSOCKET_URL: 'ws://127.0.0.1:8000/stomp/mini?access_token=',
  // 线上环境
  IS_PRODUCTION: true,
  API_BASE_URL: 'https://www.bytedesk.com',
  WEBSOCKET_URL: 'wss://www.bytedesk.com/stomp/mini?access_token=',
  //
  uid: 'bytedesk_uid',
  username: 'bytedesk_username',
  nickname: 'bytedesk_nickname',
  avatar: 'bytedesk_avatar',
  description: 'bytedesk_description',
  subDomain: 'bytedesk_subDomain',
  isLogin: 'bytedesk_isLogin',
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
  // 上传图片
  UPLOAD_IMAGE_URL: 'https://www.bytedesk.com/visitor/api/upload/image',
  // 上传文件
  UPLOAD_FILE_URL: 'https://www.bytedesk.com/visitor/api/upload/file',
}
