<template>
    <view class="page">
        <view class="chat-shell">
            <web-view v-if="chatUrl" class="chat-webview" :src="chatUrl" :webview-styles="webviewStyles"
                @message="handleWebViewMessage" @load="handleWebViewLoad" @error="handleWebViewError"></web-view>
        </view>

        <view v-if="showThreadDetailPanel" class="thread-detail-mask" @click="closeThreadDetail">
            <view class="thread-detail-card" @click.stop>
                <view class="thread-detail-header">
                    <text class="thread-detail-title">会话详情</text>
                    <text class="thread-detail-close" @click="closeThreadDetail">关闭</text>
                </view>
                <scroll-view scroll-y class="thread-detail-scroll">
                    <text class="thread-detail-content">{{ threadDetailText }}</text>
                </scroll-view>
            </view>
        </view>
    </view>
</template>

<script>
import { getBizMessageCallbackDebugMeta, isBizMessageCallbackDebugEnabled, logBizMessageCallbackDebug } from '../../common/biz-message-callback-debug'
import { createMessageNavigationGuard, shouldSkipMiniProgramHostNavigation } from '../../common/chat-message-navigation-guard'
import { CHAT_PAGE_THREAD_STORAGE_KEY, CHAT_PAGE_TITLE_STORAGE_KEY, CHAT_PAGE_URL_STORAGE_KEY, UNIAPP_DEBUG } from '../../common/demo-config'

const EVENT_NAME = 'MESSAGE_BUBBLE_CLICK'
const GOODS_MESSAGE_TYPE = 'GOODS'
const ORDER_MESSAGE_TYPE = 'ORDER'
const NAVIGATION_BAR_BACKGROUND = '#f8f8f8'
const NAVIGATION_BUTTON_ACTIVE_COLOR = '#0f172a'

export default {
    data() {
        return {
            chatUrl: '',
            chatOrigin: '',
            isDebugMode: UNIAPP_DEBUG,
            bizMessageCallbackDebugEnabled: false,
            showThreadDetailPanel: false,
            threadDetail: null,
            lastBubbleClickEvent: null,
            lastActionText: '点击客服会话里的消息气泡后，会在这里打印 onMessageBubbleClick 事件。',
            messageNavigationGuard: createMessageNavigationGuard(),
            windowMessageHandler: null,
            webviewStyles: {
                progress: {
                    color: '#1f6f54'
                }
            }
        }
    },
    computed: {
        hasThreadDetail() {
            return !!this.threadDetail
        },
        threadDetailText() {
            return this.hasThreadDetail ? this.formatPretty(this.threadDetail) : ''
        }
    },
    onLoad() {
        const nextUrl = this.normalizeChatUrlForUniApp(this.readStorageValue(uni.getStorageSync(CHAT_PAGE_URL_STORAGE_KEY)))
        this.chatUrl = nextUrl
        this.chatOrigin = this.getOrigin(nextUrl)
        this.bizMessageCallbackDebugEnabled = isBizMessageCallbackDebugEnabled(nextUrl)
        if (nextUrl) {
            uni.setStorageSync(CHAT_PAGE_URL_STORAGE_KEY, nextUrl)
        }
        const title = this.readStorageValue(uni.getStorageSync(CHAT_PAGE_TITLE_STORAGE_KEY))
        this.threadDetail = this.parseStoredThread(uni.getStorageSync(CHAT_PAGE_THREAD_STORAGE_KEY))
        logBizMessageCallbackDebug(this.bizMessageCallbackDebugEnabled, 'host-init.uniapp', {
            chatUrl: nextUrl,
            debugMeta: getBizMessageCallbackDebugMeta()
        })
        if (title) {
            uni.setNavigationBarTitle({ title })
        }
        this.syncNavigationButton()
        this.bindH5MessageListener()
    },
    onShow() {
        this.syncNavigationButton()
    },
    onReady() {
        this.syncNavigationButton()
    },
    onUnload() {
        this.unbindH5MessageListener()
    },
    onNavigationBarButtonTap() {
        if (!this.isDebugMode || !this.hasThreadDetail) {
            return
        }

        this.showThreadDetailPanel = true
    },
    methods: {
        readStorageValue(value) {
            if (!value) {
                return ''
            }

            return String(value)
        },
        parseStoredThread(value) {
            if (!value) {
                return null
            }

            if (typeof value === 'object') {
                return value
            }

            try {
                return JSON.parse(String(value))
            } catch (error) {
                return {
                    raw: String(value)
                }
            }
        },
        getOrigin(value) {
            try {
                return new URL(value).origin
            } catch (error) {
                return ''
            }
        },
        isAppPlusRuntime() {
            // #ifdef APP-PLUS
            return true
            // #endif

            return false
        },
        normalizeChatUrlForUniApp(value) {
            if (!value) {
                return ''
            }

            try {
                const url = new URL(value)
                if (this.isAppPlusRuntime()) {
                    url.searchParams.set('uniAppHost', '1')
                } else {
                    url.searchParams.delete('uniAppHost')
                }
                url.searchParams.set('bizMessageCallbackDebug', '1')
                return url.toString()
            } catch (error) {
                const separator = String(value).includes('?') ? '&' : '?'
                return this.isAppPlusRuntime()
                    ? `${value}${separator}uniAppHost=1&bizMessageCallbackDebug=1`
                    : `${value}${separator}bizMessageCallbackDebug=1`
            }
        },
        syncNavigationButton() {
            // #ifdef APP-PLUS
            this.$nextTick(() => {
                const pages = getCurrentPages()
                const currentPage = pages && pages.length ? pages[pages.length - 1] : null
                const currentWebview = currentPage && currentPage.$getAppWebview ? currentPage.$getAppWebview() : null
                if (currentWebview && currentWebview.setStyle) {
                    currentWebview.setStyle({
                        titleNView: {
                            backgroundColor: NAVIGATION_BAR_BACKGROUND,
                            buttons: [
                                {
                                    text: '详情',
                                    fontSize: '14px',
                                    color: this.isDebugMode && this.hasThreadDetail ? NAVIGATION_BUTTON_ACTIVE_COLOR : 'transparent',
                                    width: '52px'
                                }
                            ]
                        }
                    })
                }
            })
            // #endif
        },
        bindH5MessageListener() {
            // #ifdef H5
            if (typeof window === 'undefined' || this.windowMessageHandler) {
                return
            }

            this.windowMessageHandler = (event) => {
                this.handleWindowMessage(event)
            }
            window.addEventListener('message', this.windowMessageHandler)
            // #endif
        },
        unbindH5MessageListener() {
            // #ifdef H5
            if (typeof window === 'undefined' || !this.windowMessageHandler) {
                return
            }

            window.removeEventListener('message', this.windowMessageHandler)
            this.windowMessageHandler = null
            // #endif
        },
        handleWindowMessage(event) {
            if (this.chatOrigin && event && event.origin && event.origin !== this.chatOrigin) {
                return
            }

            this.consumeIncomingPayload(event && event.data)
        },
        handleWebViewMessage(event) {
            const packets = event && event.detail ? event.detail.data : []
            logBizMessageCallbackDebug(this.bizMessageCallbackDebugEnabled, 'host-receive.uniapp-webview-message', {
                packets
            })
            this.consumeIncomingPayload(packets)
        },
        handleWebViewLoad(event) {
            console.log('[visitorUniapp] chat web-view loaded:', event && event.detail ? event.detail.src : this.chatUrl)
        },
        handleWebViewError(event) {
            const detail = event && event.detail ? event.detail : {}
            console.error('[visitorUniapp] chat web-view load failed:', detail)
            uni.showToast({
                title: '聊天页加载失败',
                icon: 'none'
            })
        },
        consumeIncomingPayload(packet) {
            if (Array.isArray(packet)) {
                packet.forEach((item) => {
                    this.consumeIncomingPayload(item)
                })
                return
            }

            const normalized = this.normalizeBubbleClickEvent(packet)
            if (!normalized) {
                logBizMessageCallbackDebug(this.bizMessageCallbackDebugEnabled, 'host-receive.uniapp-ignored-packet', {
                    packet
                })
                return
            }

            logBizMessageCallbackDebug(this.bizMessageCallbackDebugEnabled, 'host-receive.uniapp-normalized', normalized)

            this.handleBubbleClick(normalized)
        },
        normalizeBubbleClickEvent(packet) {
            let candidate = packet

            if (!candidate) {
                return null
            }

            if (candidate.detail && candidate.detail.data) {
                return this.normalizeBubbleClickEvent(candidate.detail.data)
            }

            if (candidate.data && !candidate.type) {
                return this.normalizeBubbleClickEvent(candidate.data)
            }

            if (Array.isArray(candidate)) {
                for (let index = 0; index < candidate.length; index += 1) {
                    const normalized = this.normalizeBubbleClickEvent(candidate[index])
                    if (normalized) {
                        return normalized
                    }
                }
                return null
            }

            if (typeof candidate !== 'object') {
                return null
            }

            if (candidate.type === EVENT_NAME) {
                return {
                    uid: candidate.uid,
                    type: candidate.clickedMessageType,
                    content: this.parseMaybeJson(candidate.content),
                    navigateToPath: typeof candidate.navigateToPath === 'string' ? candidate.navigateToPath : '',
                    extra: this.parseMaybeJson(candidate.extra),
                    miniProgramDirectNavigateHandled: Boolean(candidate.miniProgramDirectNavigateHandled),
                    position: candidate.position,
                    status: candidate.status
                }
            }

            if (candidate.uid && candidate.type) {
                return {
                    uid: candidate.uid,
                    type: candidate.type,
                    content: this.parseMaybeJson(candidate.content),
                    navigateToPath: typeof candidate.navigateToPath === 'string' ? candidate.navigateToPath : '',
                    extra: this.parseMaybeJson(candidate.extra),
                    miniProgramDirectNavigateHandled: Boolean(candidate.miniProgramDirectNavigateHandled),
                    position: candidate.position,
                    status: candidate.status
                }
            }

            return null
        },
        parseMaybeJson(value) {
            if (typeof value !== 'string') {
                return value
            }

            const trimmed = value.trim()
            if (!trimmed) {
                return value
            }

            if ((trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
                try {
                    return JSON.parse(trimmed)
                } catch (error) {
                    return value
                }
            }

            return value
        },
        handleBubbleClick(event) {
            this.lastBubbleClickEvent = event
            const messageType = String(event.type || '').toUpperCase()
            logBizMessageCallbackDebug(this.bizMessageCallbackDebugEnabled, 'host-handle.uniapp-bubble-click', {
                messageType,
                navigateToPath: event.navigateToPath,
                miniProgramDirectNavigateHandled: Boolean(event.miniProgramDirectNavigateHandled)
            })

            if (shouldSkipMiniProgramHostNavigation(event)) {
                this.lastActionText = `忽略已由 H5 直跳处理的 ${messageType || 'UNKNOWN'} 消息点击事件。`
                return
            }

            if (!this.messageNavigationGuard.shouldNavigate(event)) {
                this.lastActionText = `忽略重复的 ${messageType || 'UNKNOWN'} 消息点击事件，避免返回时再次打开详情页。`
                return
            }

            if (messageType === GOODS_MESSAGE_TYPE) {
                this.lastActionText = '收到商品消息点击事件，正在打开商品详情页。'
                this.navigateToResolvedPath(event, '/pages/goods/detail/index')
                return
            }

            if (messageType === ORDER_MESSAGE_TYPE) {
                this.lastActionText = '收到订单消息点击事件，正在打开订单详情页。'
                this.navigateToResolvedPath(event, '/pages/order/detail/index')
                return
            }

            this.lastActionText = `收到 ${messageType || 'UNKNOWN'} 消息点击事件，但当前未定义详情页跳转。`
        },
        toRecord(value) {
            const normalized = this.parseMaybeJson(value)
            if (normalized && typeof normalized === 'object') {
                return normalized
            }

            return {
                value: normalized
            }
        },
        navigateToDetail(path, payload) {
            uni.navigateTo({
                url: `${path}?payload=${encodeURIComponent(JSON.stringify(payload || {}))}`
            })
        },
        navigateToResolvedPath(event, fallbackPath) {
            const resolvedPath = typeof event.navigateToPath === 'string' ? event.navigateToPath.trim() : ''
            if (resolvedPath) {
                logBizMessageCallbackDebug(this.bizMessageCallbackDebugEnabled, 'host-navigate.uniapp-resolved-path', {
                    resolvedPath
                })
                uni.navigateTo({
                    url: resolvedPath
                })
                return
            }

            logBizMessageCallbackDebug(this.bizMessageCallbackDebugEnabled, 'host-navigate.uniapp-fallback-payload', {
                fallbackPath,
                payload: this.toRecord(event.content)
            })
            this.navigateToDetail(fallbackPath, this.toRecord(event.content))
        },
        closeThreadDetail() {
            this.showThreadDetailPanel = false
        },
        formatPretty(value) {
            return JSON.stringify(value || {}, null, 2)
        }
    }
}
</script>

<style>
.page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #ffffff;
}

.chat-shell {
    flex: 1;
    min-height: 0;
    padding: 0;
}

.chat-webview {
    width: 100%;
    height: 100%;
    border-radius: 0;
    overflow: hidden;
    background: #ffffff;
}

.thread-detail-mask {
    position: fixed;
    inset: 0;
    z-index: 20;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background: rgba(15, 23, 42, 0.42);
}

.thread-detail-card {
    width: 100%;
    max-height: 72vh;
    padding: 28rpx 28rpx 36rpx;
    border-radius: 28rpx 28rpx 0 0;
    background: #ffffff;
    box-shadow: 0 -16rpx 36rpx rgba(15, 23, 42, 0.12);
}

.thread-detail-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16rpx;
    margin-bottom: 20rpx;
}

.thread-detail-title {
    font-size: 30rpx;
    font-weight: 700;
    color: #1e3554;
}

.thread-detail-close {
    font-size: 24rpx;
    color: #1f6f54;
}

.thread-detail-scroll {
    max-height: 60vh;
}

.thread-detail-content {
    display: block;
    font-size: 22rpx;
    line-height: 1.7;
    color: #4e5d71;
    word-break: break-all;
    white-space: pre-wrap;
}
</style>