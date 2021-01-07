const custom = require('./custom/debug.js')
// const custom = require('./custom/release.js')
// import * as custom from './custom/debug.js'

// const API_BASE_URL = "http://localhost:8000/"
// const WEBSOCKET_URL = "ws://localhost:8000/stomp/mini"

module.exports = {
  //
  client: 'mini',
  accessKey: 'access_token',
  EVENT_BUS_LOGIN_SUCCESS: 'EVENT_BUS_LOGIN_SUCCESS',
  EVENT_BUS_INVALID_TOKEN: 'EVENT_BUS_INVALID_TOKEN',
  DEFAULT_TEST_ADMIN_UID: '201808221551193',
  // 高德地图KEY，参考：http://ask.dcloud.net.cn/article/35070
  // https://console.amap.com/dev/key/app
  AMAP_WECHAT_MINI_KEY: '7b9fae1ac3bdfcc28be265a70a44de6e',
  // 测试
  httpBaseUrl: custom.HTTP_BASE_URL,
  //
  uid: 'uid',
  username: 'username',
  nickname: 'nickname',
  avatar: 'avatar',
  description: 'description',
  subDomain: 'subDomain',
  role: 'role',
  isLogin: 'isLogin',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  //
  CHAT_TYPE_WORKGROUP: 'workGroup',
  CHAT_TYPE_APPOINTED: 'appointed',
  //
  // 客户端
  HTTP_CLIENT: custom.HTTP_CLIENT,
  API_BASE_URL: custom.AXIOS_DEFAULT_BASEURL,
  WEBSOCKET_URL: custom.SOCKJS_WEBSOCKET_ENDPOINT,
  // 上传头像
  UPLOAD_AVATAR_URL: custom.UPLOAD_AVATAR_URL,
  // 上传图片
  UPLOAD_IMAGE_URL: custom.UPLOAD_IMAGE_URL,
  // 上传文件
  UPLOAD_FILE_URL: custom.UPLOAD_FILE_URL,
  // 上传图片
  UPLOAD_LAYIM_IMAGE_URL: custom.UPLOAD_LAYIM_IMAGE_URL,
  // 上传文件
  UPLOAD_LAYIM_FILE_URL: custom.UPLOAD_LAYIM_FILE_URL,
  // 上传微信图片
  UPLOAD_WECHAT_IMAGE_URL: custom.UPLOAD_WECHAT_IMAGE_URL,
  // 上传微信语音文件
  UPLOAD_WECHAT_VOICE_URL: custom.UPLOAD_WECHAT_VOICE_URL,
  // 上传微信视频
  UPLOAD_WECHAT_VIDEO_URL: custom.UPLOAD_WECHAT_VIDEO_URL,
  // 上传微信缩略图
  UPLOAD_WECHAT_THUMB_URL: custom.UPLOAD_WECHAT_THUMB_URL,

  // 默认title
  DEFAULT_TITLE: '萝卜丝',
  // web、mac 左边导航栏宽度：
  LEFT_SIDEBAR_WIDTH: '65px',
  // stomp连接中
  STOMP_CONNECTION_STATUS_CONNECTING: 'connecting',
  // stomp连接成功
  STOMP_CONNECTION_STATUS_CONNECTED: 'connected',
  // stomp连接断开
  STOMP_CONNECTION_STATUS_DISCONNECTED: 'disconnncted',
  // 下载页面
  DOWNLOAD_URL: 'https://www.bytedesk.com/download',
  // 咨询官方客服页面
  CHAT_URL: 'https://vip.bytedesk.com/chatvue?uid=201808221551193&wid=201807171659201&type=workGroup&aid=&ph=ph',
  // 通知icon图标
  ICON_URL: 'https://cdn.bytedesk.com/assets/icon/64.png',
  // 语音播放器base url
  VOICE_PLAYER_BASE_URL: 'https://wuxieyun.com/opencore-amr-js/js/index.php?url=',
  // 声音叮咚
  SOUND_DINGDONG_URL: 'https://cdn.bytedesk.com/assets/sound/dingdong.wav',
  // 表情base url
  EMOJI_BASE_URL: 'https://chainsnow.oss-cn-shenzhen.aliyuncs.com/emojis/gif/',
  // 连接中
  CONNECTING_IMAGE: 'https://bytedesk.oss-cn-shenzhen.aliyuncs.com/util/connecting.gif',
  // 连接成功
  CONNCTED_IMAGE: 'https://bytedesk.oss-cn-shenzhen.aliyuncs.com/util/connected.png',
  // 断开连接
  DISCONNECTED_IMAGE: 'https://bytedesk.oss-cn-shenzhen.aliyuncs.com/util/disconnected.png',
  //
  DEFAULT_AVATAR: 'https://chainsnow.oss-cn-shenzhen.aliyuncs.com/avatars/agent_default_avatar.png',
  //
  DEFAULT_WORKGROUP_AVATAR: 'https://chainsnow.oss-cn-shenzhen.aliyuncs.com/avatars/workgroup_default_avatar.png',
  //
  DEFAULT_WEB_AVATAR_URL: 'https://chainsnow.oss-cn-shenzhen.aliyuncs.com/avatars/chrome_default_avatar.png',
  //
  DEFAULT_ANDROID_AVATAR_URL: 'https://chainsnow.oss-cn-shenzhen.aliyuncs.com/avatars/android_default_avatar.png',
  //
  DEFAULT_IOS_AVATAR_URL: 'https://chainsnow.oss-cn-shenzhen.aliyuncs.com/avatars/apple_default_avatar.png',

  // 接收到小程序消息之后Redis publish消息到此
  WECHAT_MINI_REDIS_CHANNEL: 'wechat_mini_redis_message',
  // Socket IO服务器广播小程序排队消息到此
  WECHAT_MINI_QUEUE_CHANNEL: 'wechat_mini_queue',
  // Socket IO服务器广播小程序消息到此
  WECHAT_MINI_MESSAGE_CHANNEL: 'wechat_mini_message',
  // 接收到公众号消息之后Redis publish消息到此
  WECHAT_MP_REDIS_CHANNEL: 'wechat_mp_redis_message',
  // Socket IO服务器广播公众号排队消息到此
  WECHAT_MP_QUEUE_CHANNEL: 'wechat_mp_queue',
  // Socket IO服务器广播公众号消息到此
  WECHAT_MP_MESSAGE_CHANNEL: 'wechat_mp_message',

  // 文本消息类型
  MESSAGE_TYPE_TEXT: 'text',
  // 图片消息类型
  MESSAGE_TYPE_IMAGE: 'image',
  // 文件消息类型
  MESSAGE_TYPE_FILE: 'file',
  // 语音消息类型
  MESSAGE_TYPE_VOICE: 'voice',
  // 视频消息类型
  MESSAGE_TYPE_VIDEO: 'video',
  // 自定义消息类型
  MESSAGE_TYPE_CUSTOM: 'custom',
  // 短视频消息类型
  MESSAGE_TYPE_SHORT_VIDEO: 'shortvideo',
  // 位置消息类型
  MESSAGE_TYPE_LOCATION: 'location',
  // 链接消息类型
  MESSAGE_TYPE_LINK: 'link',
  // 事件消息类型
  MESSAGE_TYPE_EVENT: 'event',
  // 机器人, 自动回复
  MESSAGE_TYPE_ROBOT: 'robot',
  // 问卷
  MESSAGE_TYPE_QUESTIONNAIRE: 'questionnaire',
  // 分公司，方便提取分公司所包含的国家，金吉列大学长
  MESSAGE_TYPE_COMPANY: 'company',
  // 选择工作组
  MESSAGE_TYPE_WORK_GROUP: 'workGroup',
  // 通知消息类型
  MESSAGE_TYPE_NOTIFICATION: 'notification',
  // 非工作时间
  MESSAGE_TYPE_NOTIFICATION_NON_WORKING_TIME: 'notification_non_working_time',
  // 客服离线，当前无客服在线
  MESSAGE_TYPE_NOTIFICATION_OFFLINE: 'notification_offline',
  // 访客开始网页浏览
  MESSAGE_TYPE_NOTIFICATION_BROWSE_START: 'notification_browse_start',
  // 访客关闭网页
  MESSAGE_TYPE_NOTIFICATION_BROWSE_END: 'notification_browse_end',
  // 邀请访客
  MESSAGE_TYPE_NOTIFICATION_BROWSE_INVITE: 'notification_browse_invite',
  // 访客接受邀请
  MESSAGE_TYPE_NOTIFICATION_BROWSE_INVITE_ACCEPT: 'notification_browse_invite_accept',
  // 访客拒绝邀请
  MESSAGE_TYPE_NOTIFICATION_BROWSE_INVITE_REJECT: 'notification_browse_invite_reject',
  // 新会话thread
  MESSAGE_TYPE_NOTIFICATION_THREAD: 'notification_thread',
  // 重新进入会话
  MESSAGE_TYPE_NOTIFICATION_THREAD_REENTRY: 'notification_thread_reentry',
  // 排队通知类型
  MESSAGE_TYPE_NOTIFICATION_QUEUE: 'notification_queue',
  // 排队中离开
  MESSAGE_TYPE_NOTIFICATION_QUEUE_LEAVE: 'notification_queue_leave',
  // 接入队列访客
  MESSAGE_TYPE_NOTIFICATION_QUEUE_ACCEPT: 'notification_queue_accept',
  // 自动接入会话
  MESSAGE_TYPE_NOTIFICATION_ACCEPT_AUTO: 'notification_accept_auto',
  // 手动接入
  MESSAGE_TYPE_NOTIFICATION_ACCEPT_MANUAL: 'notification_accept_manual',
  // 上线
  MESSAGE_TYPE_NOTIFICATION_CONNECT: 'notification_connect',
  // 离线
  MESSAGE_TYPE_NOTIFICATION_DISCONNECT: 'notification_disconnect',
  // 离开会话页面
  MESSAGE_TYPE_NOTIFICATION_LEAVE: 'notification_leave',
  // 客服关闭会话
  MESSAGE_TYPE_NOTIFICATION_AGENT_CLOSE: 'notification_agent_close',
  // 访客关闭会话
  MESSAGE_TYPE_NOTIFICATION_VISITOR_CLOSE: 'notification_visitor_close',
  // 自动关闭会话
  MESSAGE_TYPE_NOTIFICATION_AUTO_CLOSE: 'notification_auto_close',
  // 邀请评价
  MESSAGE_TYPE_NOTIFICATION_INVITE_RATE: 'notification_invite_rate',
  // 评价结果
  MESSAGE_TYPE_NOTIFICATION_RATE_RESULT: 'notification_rate_result',
  // 邀请会话
  MESSAGE_TYPE_NOTIFICATION_INVITE: 'notification_invite',
  // 接受邀请
  MESSAGE_TYPE_NOTIFICATION_INVITE_ACCEPT: 'notification_invite_accept',
  // 拒绝邀请
  MESSAGE_TYPE_NOTIFICATION_INVITE_REJECT: 'notification_invite_reject',
  // 转接会话
  MESSAGE_TYPE_NOTIFICATION_TRANSFER: 'notification_transfer',
  // 接受转接
  MESSAGE_TYPE_NOTIFICATION_TRANSFER_ACCEPT: 'notification_transfer_accept',
  // 拒绝转接
  MESSAGE_TYPE_NOTIFICATION_TRANSFER_REJECT: 'notification_transfer_reject',
  // 满意度请求
  MESSAGE_TYPE_NOTIFICATION_RATE_REQUEST: 'notification_rate_request',
  // 评价
  MESSAGE_TYPE_NOTIFICATION_RATE: 'notification_rate',
  // 连接状态
  MESSAGE_TYPE_NOTIFICATION_CONNECTION_STATUS: 'notification_connection_status',
  // 接待状态
  MESSAGE_TYPE_NOTIFICATION_ACCEPT_STATUS: 'notification_accept_status',
  // 消息预知
  MESSAGE_TYPE_NOTIFICATION_PREVIEW: 'notification_preview',
  // 消息回执
  MESSAGE_TYPE_NOTIFICATION_RECEIPT: 'notification_receipt',
  // 踢掉其他客户端
  MESSAGE_TYPE_NOTIFICATION_KICKOFF: 'notification_kickoff',
  // 通知初始化localStream
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_INVITE: 'notification_webrtc_invite',
  // webrtc取消邀请
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_CANCEL: 'notification_webrtc_cancel',
  // webrtc邀请视频会话
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_OFFER_VIDEO: 'notification_webrtc_offer_video',
  // webrtc邀请音频会话
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_OFFER_AUDIO: 'notification_webrtc_offer_audio',
  // 接受webrtc邀请
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_ANSWER: 'notification_webrtc_answer',
  // webrtccandidate信息
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_CANDIDATE: 'notification_webrtc_candidate',
  // 接受webrtc邀请
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_ACCEPT: 'notification_webrtc_accept',
  // 拒绝webrtc邀请
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_REJECT: 'notification_webrtc_reject',
  // 被邀请方视频设备 + peeConnection已经就绪
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_READY: 'notification_webrtc_ready',
  // webrtc忙线
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_BUSY: 'notification_webrtc_busy',
  // 结束webrtc会话
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_CLOSE: 'notification_webrtc_close',
  // 创建群组
  MESSAGE_TYPE_NOTIFICATION_GROUP_CREATE: 'notification_group_create',
  // 更新群名称、简介等
  MESSAGE_TYPE_NOTIFICATION_GROUP_UPDATE: 'notification_group_update',
  // 群公告
  MESSAGE_TYPE_NOTIFICATION_GROUP_ANNOUNCEMENT: 'notification_group_announcement',
  // 邀请多人加入群
  MESSAGE_TYPE_NOTIFICATION_GROUP_INVITE: 'notification_group_invite',
  // 受邀请：同意
  MESSAGE_TYPE_NOTIFICATION_GROUP_INVITE_ACCEPT: 'notification_group_invite_accept',
  // 受邀请：拒绝
  MESSAGE_TYPE_NOTIFICATION_GROUP_INVITE_REJECT: 'notification_group_invite_reject',
  // 不需要审核加入群组
  MESSAGE_TYPE_NOTIFICATION_GROUP_JOIN: 'notification_group_join',
  // 主动申请加入群组
  MESSAGE_TYPE_NOTIFICATION_GROUP_APPLY: 'notification_group_apply',
  // 同意：主动申请加群
  MESSAGE_TYPE_NOTIFICATION_GROUP_APPLY_APPROVE: 'notification_group_apply_approve',
  // 拒绝：主动申请加群
  MESSAGE_TYPE_NOTIFICATION_GROUP_APPLY_DENY: 'notification_group_apply_deny',
  // 踢人
  MESSAGE_TYPE_NOTIFICATION_GROUP_KICK: 'notification_group_kick',
  // 禁言
  MESSAGE_TYPE_NOTIFICATION_GROUP_MUTE: 'notification_group_mute',
  // 取消禁言
  MESSAGE_TYPE_NOTIFICATION_GROUP_UNMUTE: 'notification_group_unmute',
  // 设置管理员
  MESSAGE_TYPE_NOTIFICATION_GROUP_SET_ADMIN: 'notification_group_set_admin',
  // 取消设置管理员
  MESSAGE_TYPE_NOTIFICATION_GROUP_UNSET_ADMIN: 'notification_group_unset_admin',
  // 移交群组
  MESSAGE_TYPE_NOTIFICATION_GROUP_TRANSFER: 'notification_group_transfer',
  // 移交群组：同意、接受
  MESSAGE_TYPE_NOTIFICATION_GROUP_TRANSFER_ACCEPT: 'notification_group_transfer_accept',
  // 移交群组：拒绝
  MESSAGE_TYPE_NOTIFICATION_GROUP_TRANSFER_REJECT: 'notification_group_transfer_reject',
  // 退出群组
  MESSAGE_TYPE_NOTIFICATION_GROUP_WITHDRAW: 'notification_group_withdraw',
  // 解散群组
  MESSAGE_TYPE_NOTIFICATION_GROUP_DISMISS: 'notification_group_dismiss',
  //
  // 会话类型: 工作组会话、访客跟客服一对一、同事一对一、群组会话
  THREAD_TYPE_THREAD: 'thread',
  // 指定客服会话
  THREAD_TYPE_APPOINTED: 'appointed',
  // 同事会话
  THREAD_TYPE_CONTACT: 'contact',
  // 群组会话
  THREAD_TYPE_GROUP: 'group',
  // 消息会话类型：访客会话、同事一对一、群组会话
  MESSAGE_SESSION_TYPE_THREAD: 'thread',
  //
  MESSAGE_SESSION_TYPE_CONTACT: 'contact',
  //
  MESSAGE_SESSION_TYPE_GROUP: 'group',

  // 访客消息来源端
  // 访客pc网站
  CLIENT_WEB: 'web',
  // 访客手机网站
  CLIENT_WAP: 'wap',
  // 微信商城
  CLIENT_WEIXIN: 'weixin',
  // 网站漂浮框
  CLIENT_FLOAT: 'float',
  // 访客安卓
  CLIENT_ANDROID: 'android',
  // 访客苹果
  CLIENT_IOS: 'ios',
  // 访客微信客服接口
  CLIENT_WECHAT_MP: 'wechat_mp',
  // 访客微信自定义菜单
  CLIENT_WECHAT_URL: 'wechat_url',
  // 微信小程序
  CLIENT_WECHAT_MINI: 'wechat_mini',

  // 客服端
  // Windwow客服端
  CLIENT_WINDOW_ADMIN: 'window_admin',
  // MAC客服端
  CLIENT_MAC_ADMIN: 'mac_admin',
  // 安卓手机客服端
  CLIENT_ANDROID_ADMIN: 'android_admin',
  // 苹果手机客服端
  CLIENT_IOS_ADMIN: 'ios_admin',
  // web客服端
  CLIENT_WEB_ADMIN: 'web_admin',
  // 微信小程序客服端
  CLIENT_WECHAT_MINI_ADMIN: 'wechat_mini_admin',
  // 系统端
  CLIENT_SYSTEM: 'system',

  // 消息发送状态
  // 发送中
  MESSAGE_STATUS_SENDING: 'sending',
  // 送达
  MESSAGE_STATUS_RECEIVED: 'received',
  // 已读
  MESSAGE_STATUS_READ: 'read',
  // 发送到服务器，成功存储数据库中
  MESSAGE_STATUS_STORED: 'stored',
  // 发送错误
  MESSAGE_STATUS_ERROR: 'error',

  // 客服在线状态
  // 跟服务器建立长连接
  USER_STATUS_CONNECTED: 'connected',
  // 断开长连接
  USER_STATUS_DISCONNECTED: 'disconnected',
  // 在线状态
  USER_STATUS_ONLINE: 'online',
  // 离线状态
  USER_STATUS_OFFLINE: 'offline',
  // 忙
  USER_STATUS_BUSY: 'busy',
  // 离开
  USER_STATUS_AWAY: 'away',
  // 登出
  USER_STATUS_LOGOUT: 'logout',
  // 登录
  USER_STATUS_LOGIN: 'login',
  // 离开
  USER_STATUS_LEAVE: 'leave',
  // 话后
  USER_STATUS_AFTER: 'after',
  // 就餐
  USER_STATUS_EAT: 'eat',
  // 小休
  USER_STATUS_REST: 'rest',
  // 签入
  USER_STATUS_SIGN_IN: 'sign_in',
  // 签出
  USER_STATUS_SIGN_OUT: 'sign_out',

  // 角色类型
  // 超级管理员
  ROLE_SUPER: 'ROLE_SUPER',
  // 注册管理员：注册用户默认角色
  ROLE_ADMIN: 'ROLE_ADMIN',
  // 付费注册用户
  ROLE_VIP: 'ROLE_VIP',
  // 试用会员
  ROLE_TRY: 'ROLE_TRY',
  // 第三方代理公司
  ROLE_PROXY: 'ROLE_PROXY',
  // 免费注册用户
  ROLE_FREE: 'ROLE_FREE',
  // 访客
  ROLE_VISITOR: 'ROLE_VISITOR',
  // 普通员工：非客服人员
  ROLE_MEMBER: 'ROLE_MEMBER',
  // 智能客服：客服机器人
  ROLE_ROBOT: 'ROLE_ROBOT',
  // 客服组长，工作组管理员
  ROLE_WORKGROUP_ADMIN: 'ROLE_WORKGROUP_ADMIN',
  // 接待访客角色，如果要接待访客，必须赋予此角色
  ROLE_WORKGROUP_AGENT: 'ROLE_WORKGROUP_AGENT',
  // 质检账号
  ROLE_WORKGROUP_CHECKER: 'ROLE_WORKGROUP_CHECKER',

  // 自动回复
  AUTO_REPLY_NO: '无自动回复',
  //
  AUTO_REPLY_EAT: '外出就餐，请稍后',
  //
  AUTO_REPLY_LEAVE: '不在电脑旁，请稍后',
  //
  AUTO_REPLY_BACK: '马上回来',
  //
  AUTO_REPLY_PHONE: '接听电话中',
  //
  AUTO_REPLY_SELF: '自定义',

  // 权限
  // 我的首页
  AUTHORITY_HOME: 'home',
  // 绩效数据
  AUTHORITY_STATISTIC: 'statistic',
  // 人工客服
  AUTHORITY_CHAT: 'chat',
  // 人工客服-当前会话
  AUTHORITY_THREAD: 'thread',
  // 人工客服-当前访客
  AUTHORITY_VISITOR: 'visitor',
  // 人工客服-历史记录
  AUTHORITY_HISTORY: 'history',
  // 人工客服-监控组内所有会话
  AUTHORITY_MONITOR: 'monitor',
  // 人工客服-Quality Assurance(QA) 质量检查
  AUTHORITY_QUALITY: 'quality',
  // 人工客服-客服账号CRUD增删改查
  AUTHORITY_ADMIN: 'admin',
  // 智能客服
  AUTHORITY_ROBOT: 'robot',
  // 帮助中心
  AUTHORITY_SUPPORT: 'support',
  // 所有设置
  AUTHORITY_SETTING: 'setting',
  // 意见反馈
  AUTHORITY_FEEDBACK: 'feedback',
  // 工单系统
  AUTHORITY_WORKORDER: 'workorder',
  // 呼叫中心
  AUTHORITY_CALLCENTER: 'callcenter',
  // 客户管理
  AUTHORITY_CRM: 'crm',
  // 调查问卷
  AUTHORITY_WENJUAN: 'wenjuan',
  // 内部协同
  AUTHORITY_INTERNAL: 'internal',

  // 通知账号
  USERNAME_NOTIFICATION: 'bytedesk_notification',

  // 常用语类型
  // 常用语: 平台类型
  // CUW_TYPE_PLATFORM: 'platform',
  // 常用语: 公司类型
  CUW_TYPE_COMPANY: 'company',
  // 常用语: 客服类型
  CUW_TYPE_MINE: 'mine',

  // 类别类型：智能客服robot
  CATEGORY_TYPE_ROBOT: 'robot',
  // 帮助文档support
  CATEGORY_TYPE_SUPPORT: 'support',
  // 常用语分类：cuw
  CATEGORY_TYPE_CUW_MINE: 'cuw_mine',
  CATEGORY_TYPE_CUW_COMPANY: 'cuw_company',
  CATEGORY_TYPE_CUW_PLATFORM: 'cuw_platform',
  // 意见反馈类别
  CATEGORY_TYPE_FEEDBACK: 'feedback',

  // 问卷题目类型：单选、多选，单行输入input、多行输入textarea
  QUESTIONNAIRE_ITEM_TYPE_RADIO: 'radio',
  QUESTIONNAIRE_ITEM_TYPE_CHECKBOX: 'checkbox',
  QUESTIONNAIRE_ITEM_TYPE_INPUT: 'input',
  QUESTIONNAIRE_ITEM_TYPE_TEXTAREA: 'textarea',

  // 查看历史消息记录
  EVENT_BUS_MESSAGE_HISTORY: 'EVENT_BUS_MESSAGE_HISTORY',
  // 选中常用语
  EVENT_BUS_SELECT_CUW: 'EVENT_BUS_SELECT_CUW',
  // 选中某条会话
  EVENT_BUS_SELECT_THREAD: 'EVENT_BUS_SELECT_THREAD',
  // 通知成功
  EVENT_BUS_NOTIFICATION_SUCCESS: 'EVENT_BUS_NOTIFICATION_SUCCESS',
  // 通知警告
  EVENT_BUS_NOTIFICATION_WARNING: 'EVENT_BUS_NOTIFICATION_WARNING',
  // 通知信息
  EVENT_BUS_NOTIFICATION_INFO: 'EVENT_BUS_NOTIFICATION_INFO',
  // 通知报错
  EVENT_BUS_NOTIFICATION_ERROR: 'EVENT_BUS_NOTIFICATION_ERROR',
  // 联系人消息
  EVENT_BUS_NOTIFICATION_CONTACT_MESSAGE: 'EVENT_BUS_NOTIFICATION_CONTACT_MESSAGE',
  // 群组消息
  EVENT_BUS_NOTIFICATION_GROUP_MESSAGE: 'EVENT_BUS_NOTIFICATION_GROUP_MESSAGE',
  // 邀请会话请求
  EVENT_BUS_NOTIFICATION_INVITE: 'EVENT_BUS_NOTIFICATION_INVITE',
  // 访客开始网页浏览
  EVENT_BUS_NOTIFICATION_BROWSE_START: 'EVENT_BUS_NOTIFICATION_BROWSE_START',
  // 访客关闭网页
  EVENT_BUS_NOTIFICATION_BROWSE_END: 'EVENT_BUS_NOTIFICATION_BROWSE_END',
  // 接受邀请会话请求
  EVENT_BUS_NOTIFICATION_INVITE_ACCEPT: 'EVENT_BUS_NOTIFICATION_INVITE_ACCEPT',
  // 拒绝邀请会话请求
  EVENT_BUS_NOTIFICATION_INVITE_REJECT: 'EVENT_BUS_NOTIFICATION_INVITE_REJECT',
  // 转接会话请求
  EVENT_BUS_NOTIFICATION_TRANSFER: 'EVENT_BUS_NOTIFICATION_TRANSFER',
  // 转接会话请求
  EVENT_BUS_NOTIFICATION_TRANSFER_ACCEPT: 'EVENT_BUS_NOTIFICATION_TRANSFER_ACCEPT',
  // 转接会话请求
  EVENT_BUS_NOTIFICATION_TRANSFER_REJECT: 'EVENT_BUS_NOTIFICATION_TRANSFER_REJECT',
  // 通知界面滚动到底部
  EVENT_BUS_MESSAGE_SCROLL_TO_BOTTOM: 'EVENT_BUS_MESSAGE_SCROLL_TO_BOTTOM',
  // 登录超时
  EVENT_BUS_LOGIN_TIMEOUT: 'EVENT_BUS_LOGIN_TIMEOUT',
  // 用户名或密码错误
  EVENT_BUS_LOGIN_ERROR_400: 'EVENT_BUS_LOGIN_ERROR_400',
  // 服务器错误500
  EVENT_BUS_SERVER_ERROR_500: 'EVENT_BUS_SERVER_ERROR_500',
  // 创建帮助中心文章
  EVENT_BUS_SUPPORT_NEW_ARTICLE: 'EVENT_BUS_SUPPORT_NEW_ARTICLE',
  // 创建成功
  EVENT_BUS_SUPPORT_NEW_ARTICLE_SUCCESS: 'EVENT_BUS_SUPPORT_NEW_ARTICLE_SUCCESS',
  // 保存错误
  EVENT_BUS_SUPPORT_NEW_ARTICLE_ERROR: 'EVENT_BUS_SUPPORT_NEW_ARTICLE_ERROR',
  // 更新文档
  EVENT_BUS_SUPPORT_EDIT_ARTICLE: 'EVENT_BUS_SUPPORT_EDIT_ARTICLE',
  // 更新成功
  EVENT_BUS_SUPPORT_UPDATE_ARTICLE_SUCCESS: 'EVENT_BUS_SUPPORT_UPDATE_ARTICLE_SUCCESS',
  // 更新错误
  EVENT_BUS_SUPPORT_UPDATE_ARTICLE_ERROR: 'EVENT_BUS_SUPPORT_UPDATE_ARTICLE_ERROR',
  // 创建工单
  EVENT_BUS_SUPPORT_NEW_TICKET: 'EVENT_BUS_SUPPORT_NEW_TICKET',
  // 创建工单成功
  EVENT_BUS_SUPPORT_NEW_TICKET_SUCCESS: 'EVENT_BUS_SUPPORT_NEW_TICKET_SUCCESS',
  // 保存工单错误
  EVENT_BUS_SUPPORT_NEW_TICKET_ERROR: 'EVENT_BUS_SUPPORT_NEW_TICKET_ERROR',
  // 更新工单
  EVENT_BUS_SUPPORT_EDIT_TICKET: 'EVENT_BUS_SUPPORT_EDIT_TICKET',
  // 更新工单成功
  EVENT_BUS_SUPPORT_UPDATE_TICKET_SUCCESS: 'EVENT_BUS_SUPPORT_UPDATE_TICKET_SUCCESS',
  // 更新工单错误
  EVENT_BUS_SUPPORT_UPDATE_TICKET_ERROR: 'EVENT_BUS_SUPPORT_UPDATE_TICKET_ERROR',
  // 查看统计详情
  EVENT_BUS_STATISTIC_DETAIL: 'EVENT_BUS_STATISTIC_DETAIL',
  // 客服、工作组 代码页面
  EVENT_BUS_AGENT_CODE: 'EVENT_BUS_AGENT_CODE',
  EVENT_BUS_WORKGROUP_CODE: 'EVENT_BUS_WORKGROUP_CODE',
  // 管理公众号
  EVENT_BUS_MP_ADMIN: 'EVENT_BUS_MP_ADMIN',
  //
  EVENT_BUS_CONTACT_LOAD_FINISHED: 'EVENT_BUS_CONTACT_LOAD_FINISHED',
  EVENT_BUS_AGENT_LOAD_FINISHED: 'EVENT_BUS_AGENT_LOAD_FINISHED',
  EVENT_BUS_WORKGROUP_LOAD_FINISHIED: 'EVENT_BUS_WORKGROUP_LOAD_FINISHIED',
  EVENT_BUS_COMPANY_LOAD_FINISHED: 'EVENT_BUS_COMPANY_LOAD_FINISHED',
  // 添加群组
  EVENT_BUS_GROUP_ADDED: 'EVENT_BUS_GROUP_ADDED',
  // 创建问卷
  EVENT_BUS_NEW_QUESTIONNAIRE: 'EVENT_BUS_NEW_QUESTIONNAIRE',
  // 消息预知
  EVENT_BUS_MESSAGE_PREVIEW: 'EVENT_BUS_MESSAGE_PREVIEW',
  // 消息回执
  EVENT_BUS_MESSAGE_RECEIPT: 'EVENT_BUS_MESSAGE_RECEIPT',
  // 通知初始化localStream
  EVENT_BUS_MESSAGE_WEBRTC_INVITE: 'EVENT_BUS_MESSAGE_WEBRTC_INVITE',
  // webrtc取消邀请
  EVENT_BUS_MESSAGE_WEBRTC_CANCEL: 'EVENT_BUS_MESSAGE_WEBRTC_CANCEL',
  // webrtc邀请视频会话
  EVENT_BUS_MESSAGE_WEBRTC_OFFER_VIDEO: 'EVENT_BUS_MESSAGE_WEBRTC_OFFER_VIDEO',
  // webrtc邀请音频会话
  EVENT_BUS_MESSAGE_WEBRTC_OFFER_AUDIO: 'EVENT_BUS_MESSAGE_WEBRTC_OFFER_AUDIO',
  // 接受webrtc邀请
  EVENT_BUS_MESSAGE_WEBRTC_ANSWER: 'EVENT_BUS_MESSAGE_WEBRTC_ANSWER',
  // webrtccandidate信息
  EVENT_BUS_MESSAGE_WEBRTC_CANDIDATE: 'EVENT_BUS_MESSAGE_WEBRTC_CANDIDATE',
  // 接受webrtc邀请
  EVENT_BUS_MESSAGE_WEBRTC_ACCEPT: 'EVENT_BUS_MESSAGE_WEBRTC_ACCEPT',
  // 拒绝webrtc邀请
  EVENT_BUS_MESSAGE_WEBRTC_REJECT: 'EVENT_BUS_MESSAGE_WEBRTC_REJECT',
  // 被邀请方视频设备 + peeConnection已经就绪
  EVENT_BUS_MESSAGE_WEBRTC_READY: 'EVENT_BUS_MESSAGE_WEBRTC_READY',
  // webrtc忙线
  EVENT_BUS_MESSAGE_WEBRTC_BUSY: 'EVENT_BUS_MESSAGE_WEBRTC_BUSY',
  // 结束webrtc会话
  EVENT_BUS_MESSAGE_WEBRTC_CLOSE: 'EVENT_BUS_MESSAGE_WEBRTC_CLOSE',
  // stomp连接
  EVENT_BUS_STOMP_CONNECTION_STATUS: 'EVENT_BUS_STOMP_CONNECTION_STATUS',
  // 退出登录，跳转到登录页面
  EVENT_BUS_LOGOUT: 'EVENT_BUS_LOGOUT'
}
