// 本地测试
// export const IS_DEBUG = true;
// export const API_BASE_URL = 'http://127.0.0.1:9003';
// export const BASE_HOST = "127.0.0.1:9003";
// export const BASE_URL = "http://127.0.0.1:9003";
// export const STOMP_WS_URL = "ws://127.0.0.1:9003/stomp"
// export const STOMP_SOCKJS_URL = "http://127.0.0.1:9003/sockjs";
// export const UPLOAD_FILE_URL = "http://127.0.0.1:9003/visitor/api/v1/upload/file";
// 
// export const MQTT_PORT = 9885;
// export const MQTT_WS_HOST = '127.0.0.1';
// export const MQTT_HOST = 'wss://127.0.0.1:9885/websocket';

// 线上环境
export const IS_DEBUG = false;
export const API_BASE_URL = 'https://api.weiyuai.cn';
export const BASE_HOST = "api.weiyuai.cn";
export const BASE_URL = "https://api.weiyuai.cn";
export const STOMP_WS_URL = "wss://api.weiyuai.cn/stomp";
export const STOMP_SOCKJS_URL = "https://api.weiyuai.cn/sockjs";
export const UPLOAD_FILE_URL = "https://api.weiyuai.cn/visitor/api/v1/upload/file";
// 
// export const MQTT_PORT = 3885;
// export const MQTT_WS_HOST = 'api.weiyuai.cn';
// export const MQTT_HOST = 'wss://api.weiyuai.cn/websocket';
//
export const HTTP_CLIENT = 'uniapp';
export const PLATFORM = "weiyuai";
export const LOCALE = "locale";
export const VISITOR_UID = "visitor_uid";
export const VISITOR_NICKNAME = "visitor_nickname";
export const VISITOR_AVATAR = "visitor_avatar";
export const VISITOR_ORGUID = "visitor_orguid";
export const VISITOR_DEVICEUID = "visitor_deviceuid";
export const I18N_PREFIX = "i18n.";
// 登录超时
export const EVENT_BUS_LOGIN_TIMEOUT = "EVENT_BUS_LOGIN_TIMEOUT";
// 用户名或密码错误
export const EVENT_BUS_LOGIN_ERROR_400 = "EVENT_BUS_LOGIN_ERROR_400";
// 服务器错误500
export const EVENT_BUS_SERVER_ERROR_500 = "EVENT_BUS_SERVER_ERROR_500";
// token失效
export const EVENT_BUS_TOKEN_INVALID = "EVENT_BUS_TOKEN_INVALID";
export const EVENT_BUS_SWITCH_THEME = "EVENT_BUS_SWITCH_THEME";
//
export const EVENT_BUS_MESSAGE_TYPE_STATUS = "EVENT_BUS_MESSAGE_TYPE_STATUS";
export const EVENT_BUS_MESSAGE_TYPE_TYPING = "EVENT_BUS_MESSAGE_TYPE_TYPING";
export const EVENT_BUS_MESSAGE_TYPE_PROCESSING =
  "EVENT_BUS_MESSAGE_TYPE_PROCESSING";
export const EVENT_BUS_MESSAGE_TYPE_STREAM = "EVENT_BUS_MESSAGE_TYPE_STREAM";
export const EVENT_BUS_MESSAGE_TYPE_PREVIEW = "EVENT_BUS_MESSAGE_TYPE_PREVIEW";
export const EVENT_BUS_MESSAGE_TYPE_CONTENT = "EVENT_BUS_MESSAGE_TYPE_CONTENT";
//
export const THEME_MODE_TYPE = "THEME_MODE_TYPE";
export const THEME_MODE_TYPE_LIGHT = "light";
export const THEME_MODE_TYPE_DARK = "dark";
export const THEME_MODE_TYPE_SYSTEM = "system";
//
export const THEME_NAME_TYPE = "THEME_NAME_TYPE";
export const THEME_NAME_TYPE_DARK = "dark";
export const THEME_NAME_TYPE_LIGHT = "light";
//
export const PLAY_AUDIO = "PLAY_AUDIO";
//
export const CONFIG_ENABLED = "CONFIG_ENABLED";
export const CONFIG_API_HOST = "CONFIG_API_HOST";
export const CONFIG_HTML_HTML = "CONFIG_HTML_HOST";
//
export const USER_TYPE_AGENT = "AGENT";
export const USER_TYPE_SYSTEM = "SYSTEM";
export const USER_TYPE_VISITOR = "VISITOR";
export const USER_TYPE_ROBOT = "ROBOT";
export const USER_TYPE_MEMBER = "MEMBER";
export const USER_TYPE_ASSISTANT = "ASSISTANT";
export const USER_TYPE_CHANNEL = "CHANNEL";
export const USER_TYPE_LOCAL = "LOCAL";
export const USER_TYPE_USER = "USER";
//
// 会话类型 = 工作组会话、访客跟客服一对一、同事一对一、群组会话
export const THREAD_TYPE_AGENT = "AGENT";
export const THREAD_TYPE_WORKGROUP = "WORKGROUP";
export const THREAD_TYPE_KB = "KB";
export const THREAD_TYPE_LLM = "LLM";
export const THREAD_TYPE_MEMBER = "MEMBER";
export const THREAD_TYPE_GROUP = "GROUP";
export const THREAD_TYPE_LEAVEMSG = "LEAVEMSG";
export const THREAD_TYPE_FEEDBACK = "FEEDBACK";
export const THREAD_TYPE_ASISTANT = "ASISTANT";
export const THREAD_TYPE_CHANNEL = "CHANNEL";
export const THREAD_TYPE_LOCAL = "LOCAL";
//
export const THREAD_STATUS_QUEUING = "QUEUING"; // 排队中
export const THREAD_STATUS_NORMAL = "NORMAL"; // 正常
export const THREAD_STATUS_REENTER = "REENTER"; // 会话进行中，访客关闭会话页面之后，重新进入
export const THREAD_STATUS_REOPEN = "REOPEN"; // 会话关闭之后，重新进入
export const THREAD_STATUS_OFFLINE = "OFFLINE"; // 客服不在线
export const THREAD_STATUS_RATED = "RATED"; // rated, prevent repeated rate
export const THREAD_STATUS_AUTO_CLOSED = "AUTO_CLOSED";
export const THREAD_STATUS_AGENT_CLOSED = "AGENT_CLOSED";
export const THREAD_STATUS_DISMISSED = "DISMISSED"; // 会话解散
export const THREAD_STATUS_MUTED = "MUTED"; // 会话静音
export const THREAD_STATUS_FORBIDDEN = "FORBIDDEN"; // 会话禁言
export const THREAD_STATUS_MONITORED = "MONITORED"; // 会话监控
// 消息发送状态
// 发送中
export const MESSAGE_STATUS_SENDING = "SENDING"; // sending
export const MESSAGE_STATUS_TIMEOUT = "TIMEOUT"; // network send failed
export const MESSAGE_STATUS_BLOCKED = "BLOCKED"; // in black list
export const MESSAGE_STATUS_NOTFRIEND = "NOTFRIEND"; // not friend
export const MESSAGE_STATUS_ERROR = "ERROR"; // other send error
export const MESSAGE_STATUS_SUCCESS = "SUCCESS"; // send success
export const MESSAGE_STATUS_RECALL = "RECALL"; // recall back
export const MESSAGE_STATUS_DELIVERED = "DELIVERED"; // send to the other client
export const MESSAGE_STATUS_READ = "READ"; // read by the other client
export const MESSAGE_STATUS_DESTROYED = "DESTROYED"; // destroyed after read
export const MESSAGE_STATUS_UNPRECESSED = "UNPRECESSED"; // not processed
export const MESSAGE_STATUS_PROCESSED = "PROCESSED"; // leave message processed
export const MESSAGE_STATUS_LEAVE_MSG_SUBMIT = "LEAVE_MSG_SUBMIT"; // 提交留言
export const MESSAGE_STATUS_RATE_SUBMIT = "RATE_SUBMIT"; // 提交会话评价
export const MESSAGE_STATUS_RATE_CANCEL = "RATE_CANCEL"; // 取消评价会话
export const MESSAGE_STATUS_RATE_UP = "RATE_UP"; // 评价消息up
export const MESSAGE_STATUS_RATE_DOWN = "RATE_DOWN"; // 评价消息down
//
// 消息类型
export const MESSAGE_TYPE_WELCOME = "WELCOME";
export const MESSAGE_TYPE_CONTINUE = "CONTINUE";
export const MESSAGE_TYPE_SYSTEM = "SYSTEM";
export const MESSAGE_TYPE_TEXT = "TEXT"; // 文本消息类型
export const MESSAGE_TYPE_IMAGE = "IMAGE"; // 图片消息类型
export const MESSAGE_TYPE_FILE = "FILE"; // 文件消息类型
export const MESSAGE_TYPE_AUDIO = "AUDIO"; // 语音消息类型
export const MESSAGE_TYPE_VIDEO = "VIDEO"; // 视频消息类型
export const MESSAGE_TYPE_MUSIC = "MUSIC";
export const MESSAGE_TYPE_LOCATION = "LOCATION";
export const MESSAGE_TYPE_GOODS = "GOODS";
export const MESSAGE_TYPE_CARD = "CARD";
export const MESSAGE_TYPE_EVENT = "EVENT";
//
export const MESSAGE_TYPE_GUESS = "GUESS"; // 猜你想问
export const MESSAGE_TYPE_HOT = "HOT"; // 热门问题
export const MESSAGE_TYPE_SHORTCUT = "SHORTCUT"; // 快捷路径
export const MESSAGE_TYPE_ORDER = "ORDER"; // 订单
export const MESSAGE_TYPE_POLL = "POLL"; // 投票
export const MESSAGE_TYPE_FORM = "FORM"; // 表单：询前表单
export const MESSAGE_TYPE_LEAVE_MSG = "LEAVE_MSG"; // 留言
export const MESSAGE_TYPE_LEAVE_MSG_SUBMIT = "LEAVE_MSG_SUBMIT"; // 留言提交
export const MESSAGE_TYPE_TICKET = "TICKET"; // 客服工单
export const MESSAGE_TYPE_TYPING = "TYPING"; // 正在输入
export const MESSAGE_TYPE_PROCESSING = "PROCESSING"; // 正在处理，等待大模型回复中
export const MESSAGE_TYPE_STREAM = "STREAM"; // 流式消息TEXT，大模型回复
export const MESSAGE_TYPE_PREVIEW = "PREVIEW"; // 消息预知
export const MESSAGE_TYPE_RECALL = "RECALL"; // 撤回
export const MESSAGE_TYPE_DELIVERED = "DELIVERED"; // 回执: 已送达
export const MESSAGE_TYPE_READ = "READ"; // 回执: 已读
export const MESSAGE_TYPE_QUOTATION = "QUOTATION"; // qoute message
export const MESSAGE_TYPE_KICKOFF = "KICKOFF"; // kickoff other clients
export const MESSAGE_TYPE_SHAKE = "SHAKE"; // shake window
//
export const MESSAGE_TYPE_FAQ = "FAQ"; // 常见问题FAQ
export const MESSAGE_TYPE_FAQ_Q = "FAQ_Q"; // 常见问题FAQ-问题
export const MESSAGE_TYPE_FAQ_A = "FAQ_A"; // 常见问题FAQ-答案
export const MESSAGE_TYPE_FAQ_UP = "FAQ_UP"; // 常见问题答案评价:UP
export const MESSAGE_TYPE_FAQ_DOWN = "FAQ_DOWN"; // 常见问题答案评价:DOWN
export const MESSAGE_TYPE_ROBOT = "ROBOT"; // 机器人
export const MESSAGE_TYPE_ROBOT_UP = "ROBOT_UP"; // 机器人答案评价:UP
export const MESSAGE_TYPE_ROBOT_DOWN = "ROBOT_DOWN"; // 机器人答案评价:DOWN
//
export const MESSAGE_TYPE_RATE = "RATE"; // 访客主动评价
export const MESSAGE_TYPE_RATE_INVITE = "RATE_INVITE"; // 客服邀请评价
export const MESSAGE_TYPE_RATE_SUBMIT = "RATE_SUBMIT"; // 访客提交评价
export const MESSAGE_TYPE_RATE_CANCEL = "RATE_CANCEL"; // 访客取消评价
//
export const MESSAGE_TYPE_AUTO_CLOSED = "AUTO_CLOSED"; // 自动关闭
export const MESSAGE_TYPE_AGENT_CLOSED = "AGENT_CLOSED"; // 客服关闭
//
export const MESSAGE_TYPE_TRANSFER = "TRANSFER"; // 转接
export const MESSAGE_TYPE_TRANSFER_ACCEPT = "TRANSFER_ACCEPT"; // 转接-接受
export const MESSAGE_TYPE_TRANSFER_REJECT = "TRANSFER_REJECT"; // 转接-拒绝
//
export const MESSAGE_TYPE_INVITE = "INVITE"; // 邀请
export const MESSAGE_TYPE_INVITE_ACCEPT = "INVITE_ACCEPT"; // 邀请-接受
export const MESSAGE_TYPE_INVITE_REJECT = "INVITE_REJECT"; // 邀请-拒绝
//
export const TOPIC_FILE_ASISTANT = "file";
export const TOPIC_SYSTEM_NOTIFICATION = "system";
// 注意：没有 '/' 开头，防止stomp主题中奖 '/' 替换为 '.'之后，在最前面多余一个 '.'
export const TOPIC_USER_PREFIX = "user/";
// export const TOPIC_PRIVATE_PREFIX = "private/";
// export const TOPIC_GROUP_PREFIX = "group/";
export const TOPIC_FILE_PREFIX = "file/";
export const TOPIC_SYSTEM_PREFIX = "system/";
// export const TOPIC_ROBOT_PREFIX = "robot/";
//
export const TOPIC_ORGNIZATION_PREFIX = "org/";
export const TOPIC_ORG_MEMBER_PREFIX = "org/member/";
export const TOPIC_ORG_DEPARTMENT_PREFIX = "org/department/";
export const TOPIC_ORG_GROUP_PREFIX = "org/group/";
export const TOPIC_ORG_PRIVATE_PREFIX = "org/private/";
export const TOPIC_ORG_ROBOT_PREFIX = "org/robot/";
export const TOPIC_ORG_AGENT_PREFIX = "org/agent/";
export const TOPIC_ORG_WORKGROUP_PREFIX = "org/workgroup/";
export const TOPIC_ORG_KB_PREFIX = "org/kb/";
export const TOPIC_ORG_KBDOC_PREFIX = "org/kbdoc/";
//
export const KB_TYPE_ASISTANT = "ASISTANT";
export const KB_TYPE_HELPDOC = "HELPDOC";
export const KB_TYPE_LLM = "LLM";
export const KB_TYPE_KEYWORD = "KEYWORD";
export const KB_TYPE_FAQ = "FAQ";
export const KB_TYPE_QUICKREPLY = "QUICKREPLY";
export const KB_TYPE_AUTOREPLY = "AUTOREPLY";
export const KB_TYPE_BLOG = "BLOG";
export const KB_TYPE_EMAIL = "EMAIL";
export const KB_TYPE_TABOO = "TABOO";
//
export const UPLOAD_TYPE_CHAT = "CHAT";
//
export const AUTO_REPLY_TYPE_FIXED = "FIXED";
export const AUTO_REPLY_TYPE_KEYWORD = "KEYWORD";
export const AUTO_REPLY_TYPE_LLM = "LLM";
// 
export const EVENT_BUS_MESSAGE = 'BYTEDESK_EVENT_BUS_MESSAGE';
// 连接中
export const CONNECTION_STATUS_CONNECTING = 'connecting';
// 连接成功
export const CONNECTION_STATUS_CONNECTED = 'connected';
// 连接断开
export const CONNECTION_STATUS_DISCONNECTED = 'disconnncted';
// 长连接状态
export const EVENT_BUS_CONNECTION_STATUS = 'EVENT_BUS_CONNECTION_STATUS';
