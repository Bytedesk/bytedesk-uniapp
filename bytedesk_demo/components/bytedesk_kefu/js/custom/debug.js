/**
 * 本地测试
 */
module.exports = {
  //
  HTTP_CLIENT: 'wechat_mini',
  // 判断是否为客户端
  IS_ELECTRON: false,
  // 线上环境
  IS_PRODUCTION: false,
  // 测试版本
  // 私有部署验证
  IS_PRIVATE_SERVER: false,
  PRIVATE_SERVER_UID: '',
  // 是否为大学长定制
  IS_DAXUEZHANG: false,
  IS_IP: false,
  HTTP_PREFIX: 'http://',
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
  ADMIN_BASE_URL: 'http://127.0.0.1:8000/admin#',
  // 主页网站
  HOME_URL: 'http://127.0.0.1:8000',
  // 测试
  HTTP_BASE_URL: 'http://127.0.0.1:8000',
  // 官方帮助首页
  HELP_URL: 'http://127.0.0.1:8000/support?uid=201808221551193',
  // 帮助页面base url
  HELP_BASE_URL: 'http://127.0.0.1:8000/support/article?uid=201808221551193&aid=',
  // websocket
  SOCKJS_WEBSOCKET_ENDPOINT: 'ws://127.0.0.1:8000/stomp/mini?access_token=',
  // 跳转到微信公众号授权页面
  WECHAT_OPEN_PLATFORM_REDIRECT_URI: '/redirect/',
  // 私有部署服务器验证url
  PRIVATE_SERVER_VALIDATE_URL: 'http://127.0.0.1:8000/visitor/api/server/validate',
  // web调试debug
  AXIOS_DEFAULT_BASEURL: 'http://127.0.0.1:8000',
  // 是否显示im对话框
  SHOW_IM: true,
  // 上传头像
  UPLOAD_AVATAR_URL: 'http://127.0.0.1:8000/visitor/api/upload/avatar',
  // 上传图片
  UPLOAD_IMAGE_URL: 'http://127.0.0.1:8000/visitor/api/upload/image',
  // 上传文件
  UPLOAD_FILE_URL: 'http://127.0.0.1:8000/visitor/api/upload/file',
  // 上传图片
  UPLOAD_LAYIM_IMAGE_URL: 'http://127.0.0.1:8000/visitor/api/upload/layim/image',
  // 上传文件
  UPLOAD_LAYIM_FILE_URL: 'http://127.0.0.1:8000/visitor/api/upload/layim/file',
  // 上传微信图片
  UPLOAD_WECHAT_IMAGE_URL: 'http://127.0.0.1:8000/visitor/api/upload/wechat/image',
  // 上传微信语音文件
  UPLOAD_WECHAT_VOICE_URL: 'http://127.0.0.1:8000/visitor/api/upload/wechat/voice',
  // 上传微信视频
  UPLOAD_WECHAT_VIDEO_URL: 'http://127.0.0.1:8000/visitor/api/upload/wechat/video',
  // 上传微信缩略图
  UPLOAD_WECHAT_THUMB_URL: 'http://127.0.0.1:8000/visitor/api/upload/wechat/thumb'
}
