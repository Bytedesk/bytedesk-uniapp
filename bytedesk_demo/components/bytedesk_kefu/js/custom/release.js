/**
 * 线上发布
 */
module.exports = {
  //
  HTTP_CLIENT: 'wechat_mini',
  // 判断是否为客户端
  IS_ELECTRON: false,
  // 线上环境
  IS_PRODUCTION: true,
  // 线上版本
  // 私有部署验证
  IS_PRIVATE_SERVER: false,
  PRIVATE_SERVER_UID: '',
  // 是否为大学长定制
  IS_DAXUEZHANG: false,
  IS_IP: false,
  HTTP_PREFIX: 'https://',
  // 在线访客
  SHOW_ONLINE_VISITOR: true,
  // 历史记录 -> 消息
  SHOW_HISTORY_MESSAGE: true,
  // 历史记录 -> 黑名单
  SHOW_HISTOR_BLOCK: true,
  // 会话监控
  SHOW_MONITOR: true,
  // 质量检查
  SHOW_QUALITY_CHECK: true,
  // 统计数据
  SHOW_STATISTIC: true,
  // 帮助中心
  SHOW_SUPPORT: true,
  // 意见反馈
  SHOW_FEEDBACK: true,
  // 管理后台
  ADMIN_URL: '/admin#/admin',
  // 登录页面
  LOGIN_URL: '/admin#/login',
  // 单独聊天窗口
  CHAT_BASE_URL: '/chat',
  // 管理后台baseUrl
  ADMIN_BASE_URL: 'https://www.bytedesk.com/admin#',
  // 主页网站
  HOME_URL: 'https://www.bytedesk.com',
  // 线上
  HTTP_BASE_URL: 'https://www.bytedesk.com',
  // 官方帮助首页
  HELP_URL: 'https://www.bytedesk.com/support?uid=201808221551193',
  // 帮助页面base url
  HELP_BASE_URL: 'https://www.bytedesk.com/support/article?uid=201808221551193&aid=',
  // websocket
  SOCKJS_WEBSOCKET_ENDPOINT: 'wss://www.bytedesk.com/stomp/mini?access_token=',
  // 跳转到微信公众号授权页面
  WECHAT_OPEN_PLATFORM_REDIRECT_URI: 'https://www.bytedesk.com/redirect/',
  // 私有部署服务器验证url
  PRIVATE_SERVER_VALIDATE_URL: 'https://api.bytedesk.com/visitor/api/server/validate',
  // restapi 发布
  AXIOS_DEFAULT_BASEURL: 'https://www.bytedesk.com',
  // 是否显示im对话框
  SHOW_IM: true,
  // 上传头像
  UPLOAD_AVATAR_URL: 'https://www.bytedesk.com/visitor/api/upload/avatar',
  // 上传图片
  UPLOAD_IMAGE_URL: 'https://www.bytedesk.com/visitor/api/upload/image',
  // 上传文件
  UPLOAD_FILE_URL: 'https://www.bytedesk.com/visitor/api/upload/file',
  // 上传图片
  UPLOAD_LAYIM_IMAGE_URL: 'https://www.bytedesk.com/visitor/api/upload/layim/image',
  // 上传文件
  UPLOAD_LAYIM_FILE_URL: 'https://www.bytedesk.com/visitor/api/upload/layim/file',
  // 上传微信图片
  UPLOAD_WECHAT_IMAGE_URL: 'https://www.bytedesk.com/visitor/api/upload/wechat/image',
  // 上传微信语音文件
  UPLOAD_WECHAT_VOICE_URL: 'https://www.bytedesk.com/visitor/api/upload/wechat/voice',
  // 上传微信视频
  UPLOAD_WECHAT_VIDEO_URL: 'https://www.bytedesk.com/visitor/api/upload/wechat/video',
  // 上传微信缩略图
  UPLOAD_WECHAT_THUMB_URL: 'https://www.bytedesk.com/visitor/api/upload/wechat/thumb'
}
