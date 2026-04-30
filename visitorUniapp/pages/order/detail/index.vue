<template>
    <view class="page">
        <view class="card">
            <text class="title">订单详情</text>
            <view class="row">
                <text class="label">订单 UID</text>
                <text class="value">{{ order.uid || '-' }}</text>
            </view>
            <view class="row">
                <text class="label">访客 UID</text>
                <text class="value">{{ order.visitorUid || '-' }}</text>
            </view>
            <view class="row">
                <text class="label">店铺</text>
                <text class="value">{{ order.shopUid || '-' }}</text>
            </view>
            <view class="row">
                <text class="label">状态</text>
                <text class="value">{{ order.statusText || order.status || '-' }}</text>
            </view>
            <view class="row">
                <text class="label">总金额</text>
                <text class="value">{{ formatPrice(order.totalAmount) }}</text>
            </view>
            <view class="row">
                <text class="label">支付方式</text>
                <text class="value">{{ order.paymentMethod || '-' }}</text>
            </view>
            <view class="row multiline">
                <text class="label">商品</text>
                <text class="value">{{ order.goods && order.goods.title ? order.goods.title : '-' }}</text>
            </view>
            <view class="row multiline">
                <text class="label">收货地址</text>
                <text class="value">{{ formatShipping(order.shippingAddress) }}</text>
            </view>
        </view>

        <view class="card">
            <text class="section-title">原始载荷</text>
            <text class="json">{{ formatPretty(order) }}</text>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            order: {}
        }
    },
    onLoad(options) {
        this.order = this.parsePayload(options && options.payload)
    },
    methods: {
        parsePayload(payload) {
            if (!payload) {
                return {}
            }

            try {
                return JSON.parse(decodeURIComponent(payload))
            } catch (error) {
                console.warn('parse order payload failed', error)
                return {}
            }
        },
        formatPretty(value) {
            return JSON.stringify(value || {}, null, 2)
        },
        formatPrice(value) {
            const numberValue = Number(value || 0)
            return `¥${numberValue.toFixed(2)}`
        },
        formatShipping(shippingAddress) {
            if (!shippingAddress || typeof shippingAddress !== 'object') {
                return '-'
            }

            const values = [shippingAddress.name, shippingAddress.phone, shippingAddress.address].filter(Boolean)
            return values.length ? values.join(' / ') : '-'
        }
    }
}
</script>

<style>
.page {
    min-height: 100vh;
    padding: 24rpx;
    background: #f6f3ef;
}

.card {
    margin-bottom: 24rpx;
    padding: 28rpx;
    border-radius: 24rpx;
    background: #ffffff;
    box-shadow: 0 12rpx 36rpx rgba(67, 44, 28, 0.08);
}

.title,
.section-title {
    display: block;
    margin-bottom: 20rpx;
    font-size: 34rpx;
    font-weight: 600;
    color: #3b2416;
}

.row {
    display: flex;
    justify-content: space-between;
    padding: 14rpx 0;
    border-bottom: 1rpx solid #f0ebe5;
}

.multiline {
    align-items: flex-start;
}

.label {
    width: 180rpx;
    font-size: 26rpx;
    color: #8b6d56;
}

.value {
    flex: 1;
    font-size: 28rpx;
    text-align: right;
    color: #3b2416;
    word-break: break-all;
}

.json {
    display: block;
    padding: 20rpx;
    border-radius: 18rpx;
    background: #faf7f3;
    font-size: 24rpx;
    line-height: 1.6;
    color: #694b35;
    word-break: break-all;
}
</style>