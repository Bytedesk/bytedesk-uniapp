const LOCAL_CHAT_BASE_URL = 'http://127.0.0.1:9006'
const PROD_CHAT_BASE_URL = 'https://cdn.weiyuai.cn'
const DEFAULT_CHAT_BASE_URL = process.env.NODE_ENV === 'development' ? LOCAL_CHAT_BASE_URL : PROD_CHAT_BASE_URL
const LOCAL_API_BASE_URL = 'http://127.0.0.1:9003'
const PROD_API_BASE_URL = 'https://api.weiyuai.cn'
const DEFAULT_API_BASE_URL = process.env.NODE_ENV === 'development' ? LOCAL_API_BASE_URL : PROD_API_BASE_URL

export const CHAT_PAGE_PATH = '/pages/chat/index'
export const CHAT_PAGE_URL_STORAGE_KEY = 'visitor_uniapp_chat_page_url'
export const CHAT_PAGE_TITLE_STORAGE_KEY = 'visitor_uniapp_chat_page_title'
export const CHAT_PAGE_THREAD_STORAGE_KEY = 'visitor_uniapp_chat_page_thread'
export const SELECTED_USER_KEY_STORAGE_KEY = 'visitor_uniapp_selected_user_key'
export const UNIAPP_DEBUG = process.env.NODE_ENV !== 'production'

export const DEFAULT_CHAT_PROFILE = {
  org: 'df_org_uid',
  t: '1',
  sid: 'df_wg_uid'
}

export const DEMO_USER_PRESETS = {
  user1: {
    key: 'user1',
    visitorUid: 'visitor_001',
    nickname: '用户小明',
    avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg',
    vipLevel: 0
  },
  user2: {
    key: 'user2',
    visitorUid: 'visitor_002',
    nickname: '用户小红',
    avatar: 'https://weiyuai.cn/assets/images/avatar/01.jpg',
    vipLevel: 1
  },
  user3: {
    key: 'user3',
    visitorUid: 'visitor_003',
    nickname: '用户小美',
    avatar: 'https://weiyuai.cn/assets/images/avatar/03.jpg',
    vipLevel: 2
  }
}

export const DEMO_USER_LIST = Object.keys(DEMO_USER_PRESETS).map((key) => DEMO_USER_PRESETS[key])

const THREAD_PREVIEW_LABELS = [
  { match: 'IMAGE', key: 'thread.table.preview.image', fallback: '[图片]' },
  { match: 'VOICE', key: 'thread.table.preview.voice', fallback: '[语音]' },
  { match: 'AUDIO', key: 'thread.table.preview.voice', fallback: '[语音]' },
  { match: 'VIDEO', key: 'thread.table.preview.video', fallback: '[视频]' },
  { match: 'FILE', key: 'thread.table.preview.file', fallback: '[文件]' },
  { match: 'LOCATION', key: 'thread.table.preview.location', fallback: '[位置]' },
  { match: 'PHONE', key: 'thread.table.preview.phone', fallback: '[电话]' },
  { match: 'EMAIL', key: 'thread.table.preview.email', fallback: '[邮箱]' },
  { match: 'WECHAT', key: 'thread.table.preview.wechat', fallback: '[微信]' },
  { match: 'GOODS', key: 'thread.table.preview.goods', fallback: '[商品]' },
  { match: 'ORDER', key: 'thread.table.preview.order', fallback: '[订单]' },
  { match: 'ARTICLE', key: 'thread.table.preview.article', fallback: '[文章]' },
  { match: 'FORM', key: 'thread.table.preview.form', fallback: '[表单]' },
  { match: 'THREAD', key: 'thread.table.preview.thread', fallback: '[会话]' },
  { match: 'TICKET', key: 'thread.table.preview.ticket', fallback: '[工单]' }
]

const THREAD_TRANSLATIONS = {
  'zh-cn': {
    'i18n.agent.nickname': '默认客服',
    'i18n.welcome.tip': '您好，有什么可以帮您的?',
    'i18n.default.welcome.message': '您好，请问有什么可以帮助您？',
    'i18n.robot.nickname': '默认机器人',
    'i18n.robot.agent.assistant.nickname': '默认智能助手',
    'i18n.unified.nickname': '统一客服入口',
    'i18n.workgroup.nickname': '默认工作组',
    'i18n.workgroup.booking.nickname': 'Booking 工作组',
    'i18n.workgroup.before.nickname': '售前工作组',
    'i18n.workgroup.after.nickname': '售后工作组',
    'i18n.workgroup.ticket.nickname': '工单工作组',
    'i18n.message.type.text': '文本消息',
    'i18n.message.type.image': '图片消息',
    'i18n.message.type.file': '文件消息',
    'i18n.message.type.audio': '语音消息',
    'i18n.message.type.voice': '语音通话',
    'i18n.message.type.video': '视频消息',
    'i18n.message.type.location': '位置消息',
    'i18n.message.type.link': '链接消息',
    'i18n.message.type.goods': '商品消息',
    'i18n.message.type.order': '订单消息',
    'i18n.message.type.form': '表单消息',
    'i18n.message.type.thread': '会话消息',
    'i18n.message.type.ticket': '工单消息',
    'i18n.message.type.article': '文章',
    'i18n.message.type.notice': '通知消息',
    'i18n.message.type.unknown': '未知类型',
    'thread.table.defaultTitle': '未命名会话',
    'thread.table.emptyPreview': '暂无消息',
    'thread.table.preview.image': '[图片]',
    'thread.table.preview.voice': '[语音]',
    'thread.table.preview.video': '[视频]',
    'thread.table.preview.file': '[文件]',
    'thread.table.preview.location': '[位置]',
    'thread.table.preview.phone': '[电话]',
    'thread.table.preview.email': '[邮箱]',
    'thread.table.preview.wechat': '[微信]',
    'thread.table.preview.goods': '[商品]',
    'thread.table.preview.order': '[订单]',
    'thread.table.preview.article': '[文章]',
    'thread.table.preview.form': '[表单]',
    'thread.table.preview.thread': '[会话]',
    'thread.table.preview.ticket': '[工单]'
  },
  'en-us': {
    'i18n.agent.nickname': 'DefaultAgent',
    'i18n.welcome.tip': 'What can i help you?',
    'i18n.default.welcome.message': 'Hello, what can I help you with?',
    'i18n.robot.nickname': 'DefaultRobot',
    'i18n.robot.agent.assistant.nickname': 'DefaultRobotAgent',
    'i18n.unified.nickname': 'UnifiedNickname',
    'i18n.workgroup.nickname': 'DefaultWorkgroup',
    'i18n.workgroup.booking.nickname': 'Booking Workgroup',
    'i18n.workgroup.before.nickname': 'BeforeWorkgroup',
    'i18n.workgroup.after.nickname': 'AfterWorkgroup',
    'i18n.workgroup.ticket.nickname': 'Ticket Workgroup',
    'i18n.message.type.text': 'Text Message',
    'i18n.message.type.image': 'Image Message',
    'i18n.message.type.file': 'File Message',
    'i18n.message.type.audio': 'Audio Message',
    'i18n.message.type.voice': 'Voice Call',
    'i18n.message.type.video': 'Video Message',
    'i18n.message.type.location': 'Location Message',
    'i18n.message.type.link': 'Link Message',
    'i18n.message.type.goods': 'Product Message',
    'i18n.message.type.order': 'Order Message',
    'i18n.message.type.form': 'Form Message',
    'i18n.message.type.thread': 'Thread Message',
    'i18n.message.type.ticket': 'Ticket Message',
    'i18n.message.type.article': 'Article',
    'i18n.message.type.notice': 'Notice Message',
    'i18n.message.type.unknown': 'Unknown Type',
    'thread.table.defaultTitle': 'Untitled Conversation',
    'thread.table.emptyPreview': 'No messages yet',
    'thread.table.preview.image': '[Image]',
    'thread.table.preview.voice': '[Voice]',
    'thread.table.preview.video': '[Video]',
    'thread.table.preview.file': '[File]',
    'thread.table.preview.location': '[Location]',
    'thread.table.preview.phone': '[Phone]',
    'thread.table.preview.email': '[Email]',
    'thread.table.preview.wechat': '[WeChat]',
    'thread.table.preview.goods': '[Goods]',
    'thread.table.preview.order': '[Order]',
    'thread.table.preview.article': '[Article]',
    'thread.table.preview.form': '[Form]',
    'thread.table.preview.thread': '[Conversation]',
    'thread.table.preview.ticket': '[Ticket]'
  }
}

export function getDefaultHtmlBaseUrl() {
  return DEFAULT_CHAT_BASE_URL
}

export function getDefaultApiBaseUrl() {
  return DEFAULT_API_BASE_URL
}

export function getStoredSelectedUserKey() {
  const storedKey = uni.getStorageSync(SELECTED_USER_KEY_STORAGE_KEY)
  if (storedKey && DEMO_USER_PRESETS[storedKey]) {
    return storedKey
  }

  return 'user1'
}

export function setStoredSelectedUserKey(nextKey) {
  if (!nextKey || !DEMO_USER_PRESETS[nextKey]) {
    return getStoredSelectedUserKey()
  }

  uni.setStorageSync(SELECTED_USER_KEY_STORAGE_KEY, nextKey)
  return nextKey
}

export function getSelectedUserProfile() {
  const selectedKey = getStoredSelectedUserKey()
  return {
    ...DEMO_USER_PRESETS[selectedKey]
  }
}

function normalizeBaseHtmlUrl(htmlBaseUrl) {
  return (htmlBaseUrl || DEFAULT_CHAT_BASE_URL).replace(/\/?chat(?:\/thread)?\/?$/, '')
}

function appendIfPresent(params, key, value) {
  if (value !== undefined && value !== null && String(value).trim() !== '') {
    params.append(key, String(value))
  }
}

export function buildChatUrl(options = {}) {
  const htmlBaseUrl = normalizeBaseHtmlUrl(options.htmlBaseUrl)
  const chatProfile = options.chatProfile || DEFAULT_CHAT_PROFILE
  const visitorProfile = options.visitorProfile || getSelectedUserProfile()
  const bizKey = options.bizKey || ''
  const bizPayload = options.bizPayload || null
  const autoSendBizInfo = options.autoSendBizInfo
  const path = options.path || '/chat'
  const params = new URLSearchParams()

  params.append('org', chatProfile.org || '')
  params.append('t', chatProfile.t || '1')
  params.append('sid', chatProfile.sid || '')
  params.append('lang', options.lang || 'zh-cn')
  params.append('navbar', options.navbar === undefined ? '0' : String(options.navbar))
  appendIfPresent(params, 'visitorUid', visitorProfile.visitorUid)
  appendIfPresent(params, 'nickname', visitorProfile.nickname)
  appendIfPresent(params, 'avatar', visitorProfile.avatar)
  appendIfPresent(params, 'mobile', visitorProfile.mobile)
  appendIfPresent(params, 'email', visitorProfile.email)
  appendIfPresent(params, 'note', visitorProfile.note)
  appendIfPresent(params, 'autoSendBizInfo', autoSendBizInfo)

  if (bizKey && bizPayload) {
    params.append(bizKey, JSON.stringify(bizPayload))
  }

  return `${htmlBaseUrl}${path}?${params.toString()}`
}

export function buildThreadApiUrl(options = {}) {
  const apiBaseUrl = (options.apiBaseUrl || DEFAULT_API_BASE_URL).replace(/\/$/, '')
  return `${apiBaseUrl}/visitor/api/v1/threads`
}

export function buildThreadRequestParams(options = {}) {
  const chatProfile = options.chatProfile || DEFAULT_CHAT_PROFILE
  const visitorProfile = options.visitorProfile || getSelectedUserProfile()

  return {
    orgUid: chatProfile.org,
    visitorUid: visitorProfile.visitorUid,
    pageNumber: options.pageNumber || 0,
    pageSize: options.pageSize || 10,
    mergeByTopic: true,
    searchText: options.searchText || ''
  }
}

export function requestVisitorThreads(options = {}) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: buildThreadApiUrl(options),
      method: 'GET',
      data: buildThreadRequestParams(options),
      success: (response) => {
        resolve(response)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

export function normalizeThreadType(threadOrType) {
  const rawType = typeof threadOrType === 'object' && threadOrType !== null
    ? threadOrType.type
    : threadOrType
  const threadType = String(rawType || '').toUpperCase()

  if (threadType === 'AGENT' || threadType === '0') {
    return '0'
  }

  if (threadType === 'WORKGROUP' || threadType === '1') {
    return '1'
  }

  if (threadType === 'ROBOT' || threadType === '2') {
    return '2'
  }

  return ''
}

function normalizeLocale(locale) {
  return String(locale || '')
    .trim()
    .replace(/_/g, '-')
    .toLowerCase()
}

function getThreadLocale(options = {}) {
  if (options && typeof options === 'object' && options.locale) {
    return normalizeLocale(options.locale)
  }

  if (typeof uni !== 'undefined' && typeof uni.getLocale === 'function') {
    return normalizeLocale(uni.getLocale()) || 'zh-cn'
  }

  if (typeof uni !== 'undefined' && typeof uni.getSystemInfoSync === 'function') {
    try {
      const systemInfo = uni.getSystemInfoSync()
      return normalizeLocale(systemInfo.language) || 'zh-cn'
    } catch (error) {
      return 'zh-cn'
    }
  }

  return 'zh-cn'
}

function resolveThreadTranslator(options) {
  if (typeof options === 'function') {
    return options
  }

  if (options && typeof options.translate === 'function') {
    return options.translate
  }

  return null
}

function translateThreadLabel(key, fallback, options = {}) {
  const translator = resolveThreadTranslator(options)
  if (translator) {
    const translated = translator(key)
    if (translated && translated !== key) {
      return translated
    }
  }

  const locale = getThreadLocale(options)
  const localeMessages = THREAD_TRANSLATIONS[locale] || THREAD_TRANSLATIONS['zh-cn'] || {}
  return localeMessages[key] || fallback
}

function translateThreadText(value, options = {}) {
  if (!value) {
    return ''
  }

  const translator = resolveThreadTranslator(options)
  if (translator) {
    const translated = translator(value)
    if (translated && translated !== value) {
      return translated
    }
  }

  const locale = getThreadLocale(options)
  const localeMessages = THREAD_TRANSLATIONS[locale] || THREAD_TRANSLATIONS['zh-cn'] || {}
  return localeMessages[value] || value
}

export function resolveThreadRouteTarget(thread) {
  const threadType = normalizeThreadType(thread)

  if (threadType === '0') {
    const sid = thread && thread.agentProtobuf ? thread.agentProtobuf.uid : ''
    if (sid) {
      return { type: '0', sid }
    }
  }

  if (threadType === '1') {
    const sid = thread && thread.workgroupProtobuf ? thread.workgroupProtobuf.uid : ''
    if (sid) {
      return { type: '1', sid }
    }
  }

  if (threadType === '2') {
    const sid = thread && thread.robotProtobuf ? thread.robotProtobuf.uid : ''
    if (sid) {
      return { type: '2', sid }
    }
  }

  return {
    type: '0',
    sid: (thread && thread.uid) || ''
  }
}

export function resolveThreadDisplay(thread, options = {}) {
  const threadType = normalizeThreadType(thread)
  const isWorkgroup = threadType === '1' || Boolean(thread && thread.workgroupProtobuf && (thread.workgroupProtobuf.uid || thread.workgroupProtobuf.nickname))
  const isRobot = threadType === '2' || Boolean(thread && thread.robotProtobuf && (thread.robotProtobuf.uid || thread.robotProtobuf.nickname))
  const displayName = isWorkgroup
    ? (((thread || {}).workgroupProtobuf || {}).nickname || ((thread || {}).agentProtobuf || {}).nickname || ((thread || {}).user || {}).nickname || (thread || {}).topic)
    : isRobot
      ? (((thread || {}).robotProtobuf || {}).nickname || ((thread || {}).agentProtobuf || {}).nickname || ((thread || {}).user || {}).nickname || (thread || {}).topic)
      : (((thread || {}).agentProtobuf || {}).nickname || ((thread || {}).workgroupProtobuf || {}).nickname || ((thread || {}).user || {}).nickname || (thread || {}).topic)

  const displayAvatar = isWorkgroup
    ? (((thread || {}).workgroupProtobuf || {}).avatar || ((thread || {}).agentProtobuf || {}).avatar || ((thread || {}).user || {}).avatar || '')
    : isRobot
      ? (((thread || {}).robotProtobuf || {}).avatar || ((thread || {}).agentProtobuf || {}).avatar || ((thread || {}).user || {}).avatar || '')
      : (((thread || {}).agentProtobuf || {}).avatar || ((thread || {}).workgroupProtobuf || {}).avatar || ((thread || {}).user || {}).avatar || '')

  const normalizedDisplayName = normalizeText(displayName)

  return {
    name: translateThreadText(normalizedDisplayName, options) || translateThreadLabel('thread.table.defaultTitle', '未命名会话', options),
    avatar: displayAvatar,
    preview: resolveThreadPreview(thread, options)
  }
}

export function resolveThreadPreview(thread, options = {}) {
  const directPreview = normalizeText((((thread || {}).contentObject || {}).preview) || (thread && (thread.content || thread.topic)) || '')
  if (directPreview) {
    return translateThreadText(directPreview, options)
  }

  const payload = parseJsonObject(thread && thread.content)
  const rawType = String(payload.type || payload.msgType || payload.messageType || '').toUpperCase()
  if (!rawType) {
    return translateThreadLabel('thread.table.emptyPreview', '暂无消息', options)
  }

  const previewType = THREAD_PREVIEW_LABELS.find((item) => rawType.indexOf(item.match) >= 0)
  const detail = translateThreadText(extractText(payload), options)
  if (!previewType) {
    return detail || translateThreadLabel('thread.table.emptyPreview', '暂无消息', options)
  }

  const label = translateThreadLabel(previewType.key, previewType.fallback, options)
  return detail ? `${label} · ${detail}` : label
}

function looksLikeJson(value) {
  if (!value || typeof value !== 'string') {
    return false
  }

  const trimmed = value.trim()
  return (trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))
}

function parseJsonObject(value) {
  if (!value) {
    return {}
  }

  if (typeof value === 'object' && !Array.isArray(value)) {
    return value
  }

  if (typeof value !== 'string' || !looksLikeJson(value)) {
    return {}
  }

  try {
    const parsed = JSON.parse(value)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
  } catch (error) {
    return {}
  }
}

function normalizeText(value) {
  if (value === undefined || value === null) {
    return ''
  }

  if (Array.isArray(value)) {
    for (let index = 0; index < value.length; index += 1) {
      const text = normalizeText(value[index])
      if (text) {
        return text
      }
    }
    return ''
  }

  if (typeof value === 'object') {
    return extractText(value)
  }

  const text = String(value)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6])>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()

  if (!text) {
    return ''
  }

  if (looksLikeJson(text)) {
    const parsed = parseJsonObject(text)
    if (Object.keys(parsed).length) {
      return extractText(parsed)
    }
  }

  return text
}

function extractText(value) {
  if (!value || typeof value !== 'object') {
    return normalizeText(value)
  }

  const preferredKeys = [
    'label',
    'title',
    'name',
    'text',
    'content',
    'summary',
    'description',
    'address',
    'detail',
    'phoneNumber',
    'phone',
    'mobile',
    'emailAddress',
    'email',
    'wechatNumber',
    'wechat',
    'orderNo',
    'ticketNo',
    'uid'
  ]

  for (let index = 0; index < preferredKeys.length; index += 1) {
    const key = preferredKeys[index]
    const text = normalizeText(value[key])
    if (text) {
      return text
    }
  }

  const keys = Object.keys(value)
  for (let index = 0; index < keys.length; index += 1) {
    const text = normalizeText(value[keys[index]])
    if (text) {
      return text
    }
  }

  return ''
}