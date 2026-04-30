<template>
    <view class="page">
        <view class="chat-shell">
            <web-view v-if="chatUrl" class="chat-webview" :src="chatUrl" :webview-styles="webviewStyles"
                @message="handleWebViewMessage"></web-view>
        </view>
    </view>
</template>

<script>
const EVENT_NAME = 'MESSAGE_BUBBLE_CLICK'
const GOODS_MESSAGE_TYPE = 'GOODS'
const ORDER_MESSAGE_TYPE = 'ORDER'
const CHAT_PAGE_URL_STORAGE_KEY = 'visitor_uniapp_chat_page_url'
const CHAT_PAGE_TITLE_STORAGE_KEY = 'visitor_uniapp_chat_page_title'

export default {
    data() {
        return {
            chatUrl: '',
            chatOrigin: '',
            lastBubbleClickEvent: null,
            lastActionText: '点击客服会话里的消息气泡后，会在这里打印 onMessageBubbleClick 事件。',
            windowMessageHandler: null,
            webviewStyles: {
                progress: {
                    color: '#1f6f54'
                }
            }
        }
    },
    onLoad() {
        const nextUrl = this.readStorageValue(uni.getStorageSync(CHAT_PAGE_URL_STORAGE_KEY))
        this.chatUrl = nextUrl
        this.chatOrigin = this.getOrigin(nextUrl)
        const title = this.readStorageValue(uni.getStorageSync(CHAT_PAGE_TITLE_STORAGE_KEY))
        if (title) {
            uni.setNavigationBarTitle({ title })
        }
        this.bindH5MessageListener()
    },
    onUnload() {
        this.unbindH5MessageListener()
    },
    methods: {
        readStorageValue(value) {
            if (!value) {
                return ''
            }

            return String(value)
        },
        getOrigin(value) {
            try {
                return new URL(value).origin
            } catch (error) {
                return ''
            }
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
            this.consumeIncomingPayload(packets)
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
                return
            }

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
                    extra: this.parseMaybeJson(candidate.extra),
                    position: candidate.position,
                    status: candidate.status
                }
            }

            if (candidate.uid && candidate.type) {
                return {
                    uid: candidate.uid,
                    type: candidate.type,
                    content: this.parseMaybeJson(candidate.content),
                    extra: this.parseMaybeJson(candidate.extra),
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

            if (messageType === GOODS_MESSAGE_TYPE) {
                this.lastActionText = '收到商品消息点击事件，正在打开商品详情页。'
                this.navigateToDetail('/pages/goods/detail/index', this.toRecord(event.content))
                return
            }

            if (messageType === ORDER_MESSAGE_TYPE) {
                this.lastActionText = '收到订单消息点击事件，正在打开订单详情页。'
                this.navigateToDetail('/pages/order/detail/index', this.toRecord(event.content))
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
</style>