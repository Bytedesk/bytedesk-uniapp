<template>
    <view class="page">
        <view class="card">
            <text class="title">商品详情</text>
            <image v-if="goods.image" class="cover" :src="goods.image" mode="aspectFill"></image>
            <view class="row">
                <text class="label">商品 UID</text>
                <text class="value">{{ goods.uid || '-' }}</text>
            </view>
            <view class="row">
                <text class="label">标题</text>
                <text class="value">{{ goods.title || '-' }}</text>
            </view>
            <view class="row">
                <text class="label">价格</text>
                <text class="value">{{ formatPrice(goods.price) }}</text>
            </view>
            <view class="row">
                <text class="label">数量</text>
                <text class="value">{{ goods.quantity || 1 }}</text>
            </view>
            <view class="row">
                <text class="label">店铺</text>
                <text class="value">{{ goods.shopUid || '-' }}</text>
            </view>
            <view class="row multiline">
                <text class="label">描述</text>
                <text class="value">{{ goods.description || '-' }}</text>
            </view>
            <view class="row multiline">
                <text class="label">标签</text>
                <text class="value">{{ formatTagList(goods.tagList) }}</text>
            </view>
        </view>

        <view class="card">
            <text class="section-title">原始载荷</text>
            <text class="json">{{ formatPretty(goods) }}</text>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            goods: {}
        }
    },
    onLoad(options) {
        this.goods = this.parsePayload(options && options.payload)
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
                    console.warn('decode goods payload failed', error)
                }
            }

            for (let index = 0; index < candidates.length; index += 1) {
                try {
                    return this.normalizeGoods(JSON.parse(candidates[index]))
                } catch (error) {
                    if (index === candidates.length - 1) {
                        console.warn('parse goods payload failed', error)
                    }
                }
            }

            return {}
        },
        normalizeGoods(payload) {
            const source = this.unwrapPayload(payload)
            if (!source || typeof source !== 'object') {
                return {}
            }

            return {
                uid: source.uid || source.goodsUid || source.id || '',
                title: source.title || source.goodsTitle || source.name || '',
                image: source.image || source.goodsImage || source.cover || '',
                description: source.description || source.goodsDescription || source.summary || '',
                price: source.price ?? source.goodsPrice ?? source.amount ?? 0,
                quantity: source.quantity ?? source.goodsQuantity ?? 1,
                shopUid: source.shopUid || source.storeUid || '',
                url: source.url || source.goodsUrl || '',
                tagList: Array.isArray(source.tagList)
                    ? source.tagList
                    : Array.isArray(source.goodsTagList)
                        ? source.goodsTagList
                        : [],
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
        formatTagList(list) {
            return Array.isArray(list) && list.length ? list.join(' / ') : '-'
        }
    }
}
</script>

<style>
.page {
    min-height: 100vh;
    padding: 24rpx;
    background: #f4f7f2;
}

.card {
    margin-bottom: 24rpx;
    padding: 28rpx;
    border-radius: 24rpx;
    background: #ffffff;
    box-shadow: 0 12rpx 36rpx rgba(33, 63, 44, 0.08);
}

.title,
.section-title {
    display: block;
    margin-bottom: 20rpx;
    font-size: 34rpx;
    font-weight: 600;
    color: #173127;
}

.cover {
    width: 100%;
    height: 360rpx;
    margin-bottom: 24rpx;
    border-radius: 18rpx;
    background: #eef4ef;
}

.row {
    display: flex;
    justify-content: space-between;
    padding: 14rpx 0;
    border-bottom: 1rpx solid #edf1eb;
}

.multiline {
    align-items: flex-start;
}

.label {
    width: 180rpx;
    font-size: 26rpx;
    color: #6a7b72;
}

.value {
    flex: 1;
    font-size: 28rpx;
    text-align: right;
    color: #173127;
    word-break: break-all;
}

.json {
    display: block;
    padding: 20rpx;
    border-radius: 18rpx;
    background: #f5f7f5;
    font-size: 24rpx;
    line-height: 1.6;
    color: #365244;
    word-break: break-all;
}
</style>