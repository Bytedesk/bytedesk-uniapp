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

            const candidates = [payload]

            if (typeof payload === 'string') {
                try {
                    const decodedPayload = decodeURIComponent(payload)
                    if (decodedPayload !== payload) {
                        candidates.push(decodedPayload)
                    }
                } catch (error) {
                    console.warn('decode order payload failed', error)
                }
            }

            for (let index = 0; index < candidates.length; index += 1) {
                try {
                    return this.normalizeOrder(JSON.parse(candidates[index]))
                } catch (error) {
                    if (index === candidates.length - 1) {
                        console.warn('parse order payload failed', error)
                    }
                }
            }

            return {}
        },
        normalizeOrder(payload) {
            const source = this.unwrapPayload(payload)
            if (!source || typeof source !== 'object') {
                return {}
            }

            const goodsSource = source.goods && typeof source.goods === 'object'
                ? source.goods
                : source
            const shippingSource = source.shippingAddress && typeof source.shippingAddress === 'object'
                ? source.shippingAddress
                : source

            return {
                uid: source.uid || source.orderUid || '',
                visitorUid: source.visitorUid || '',
                shopUid: source.shopUid || source.storeUid || '',
                status: source.status || '',
                statusText: source.statusText || source.orderStatusText || '',
                totalAmount: source.totalAmount ?? source.amount ?? source.orderPrice ?? source.goodsPrice ?? 0,
                paymentMethod: source.paymentMethod || source.payType || '',
                goods: {
                    uid: goodsSource.uid || source.goodsUid || source.orderUid || '',
                    title: goodsSource.title || source.goodsTitle || source.orderTitle || source.title || '',
                    image: goodsSource.image || source.goodsImage || source.orderImage || source.image || '',
                    description: goodsSource.description || source.goodsDescription || source.orderDescription || source.description || '',
                    price: goodsSource.price ?? source.goodsPrice ?? source.orderPrice ?? 0,
                    quantity: goodsSource.quantity ?? source.goodsQuantity ?? source.orderQuantity ?? 1,
                    shopUid: goodsSource.shopUid || source.shopUid || ''
                },
                shippingAddress: {
                    name: shippingSource.name || source.shippingName || '',
                    phone: shippingSource.phone || source.shippingPhone || '',
                    address: shippingSource.address || source.shippingAddress || ''
                },
                raw: source
            }
        },
        unwrapPayload(payload) {
            if (!payload || typeof payload !== 'object') {
                return payload
            }

            if (payload.value && typeof payload.value === 'object') {
                return payload.value
            }

            return payload
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