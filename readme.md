# 微语uniapp对接演示demo

本文面向接入方开发者，介绍如何在 UniApp、微信小程序或 iframe 宿主页面中，监听访客端聊天窗口中的消息气泡点击事件，并在用户点击商品消息或订单消息时跳转到对应的商品详情页或订单详情页。

适用场景：

- 商品详情页点击咨询客服，聊天中回显商品卡片，用户再次点击卡片时跳回商品详情
- 订单详情页点击咨询客服，聊天中回显订单卡片，用户点击卡片时跳转订单详情
- 将 Bytedesk 聊天页嵌入到 UniApp、微信小程序 web-view 或业务系统 iframe 中

## 能力说明

访客端聊天页会在用户点击任意消息气泡时向宿主环境发送事件。

当前支持的宿主桥接方式：

- iframe：通过 window.parent.postMessage 发送
- 微信小程序：通过 wx.miniProgram.postMessage 发送
- UniApp：通过 uni.postMessage 发送

如果点击的是商品消息或订单消息，宿主就可以基于事件内容跳转到对应详情页。

## 原始事件格式

访客端发出的原始事件格式如下：

```typescript
interface RawMessageBubbleClickPayload {
    type: 'MESSAGE_BUBBLE_CLICK';
    uid: string;
    clickedMessageType?: string;
    content?: unknown;
    extra?: unknown;
    position?: string;
    status?: string;
}
```

字段说明：

- type：固定为 MESSAGE_BUBBLE_CLICK，表示这是“消息气泡点击事件”
- clickedMessageType：被点击消息本身的业务类型，例如 GOODS、ORDER、TEXT
- content：消息内容；商品消息通常是商品对象，订单消息通常是订单对象
- extra：消息额外字段
- uid：消息 UID
- position：消息位置，通常是 left 或 right
- status：消息状态

## 宿主侧推荐使用的归一化格式

在宿主页面中，建议把原始事件统一整理成下面这种更容易消费的结构：

```typescript
interface MessageBubbleClickEvent {
    uid?: string;
    type?: string;
    content?: unknown;
    extra?: unknown;
    position?: string;
    status?: string;
}
```

其中：

- event.type 对应 clickedMessageType，例如 GOODS、ORDER
- event.content 对应被点击消息的业务内容

## 商品与订单消息内容结构

### 商品消息 content 示例

```json
{
    "uid": "goods_001",
    "title": "轻奢通勤双肩包",
    "image": "https://example.com/goods.jpg",
    "description": "适合日常通勤和短途出差的多功能双肩包。",
    "price": 399,
    "url": "https://example.com/goods/001",
    "tagList": ["新品", "包邮"],
    "quantity": 1,
    "shopUid": "shop_001"
}
```

### 订单消息 content 示例

```json
{
    "uid": "order_001",
    "visitorUid": "visitor_001",
    "shopUid": "shop_001",
    "time": "2026-03-11 10:30:00",
    "status": "paid",
    "statusText": "已付款，待发货",
    "goods": {
        "uid": "goods_001",
        "title": "轻奢通勤双肩包",
        "image": "https://example.com/goods.jpg",
        "price": 399,
        "quantity": 1
    },
    "totalAmount": 399,
    "shippingAddress": {
        "name": "张三",
        "phone": "13800000000",
        "address": "上海市浦东新区世纪大道 100 号"
    },
    "paymentMethod": "支付宝"
}
```

## 一、iframe 集成方式

如果你的业务系统是普通 Web 页面，最简单的方式是把聊天页放到 iframe 中，然后监听 postMessage。

### 1. 构造聊天链接

```javascript
const baseUrl = 'https://cdn.weiyuai.cn';

const goodsInfo = {
    uid: 'goods_001',
    title: '轻奢通勤双肩包',
    image: 'https://example.com/goods.jpg',
    description: '适合日常通勤和短途出差的多功能双肩包。',
    price: 399,
    url: 'https://example.com/goods/001',
    tagList: ['新品', '包邮'],
    quantity: 1,
    shopUid: 'shop_001'
};

const chatUrl = `${baseUrl}/chat?org=df_org_uid&t=1&sid=df_wg_uid&lang=zh-cn&navbar=0&visitorUid=visitor_001&nickname=${encodeURIComponent('访客小明')}&goodsInfo=${encodeURIComponent(JSON.stringify(goodsInfo))}`;
```

### 2. 嵌入 iframe

```html
<iframe
  id="bytedesk-chat"
  src="https://cdn.weiyuai.cn/chat?org=df_org_uid&t=1&sid=df_wg_uid&lang=zh-cn&navbar=0"
  style="width: 100%; height: 700px; border: 0;"
></iframe>
```

### 3. 监听消息点击事件

```javascript
const parseMaybeJson = (value) => {
    if (typeof value !== 'string') {
        return value;
    }

    const trimmed = value.trim();
    if (!trimmed) {
        return value;
    }

    if (
        (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
        (trimmed.startsWith('[') && trimmed.endsWith(']'))
    ) {
        try {
            return JSON.parse(trimmed);
        } catch {
            return value;
        }
    }

    return value;
};

window.addEventListener('message', (event) => {
    const payload = event.data;

    if (!payload || payload.type !== 'MESSAGE_BUBBLE_CLICK') {
        return;
    }

    const messageType = String(payload.clickedMessageType || '').toUpperCase();
    const content = parseMaybeJson(payload.content);

    if (messageType === 'GOODS' && content?.uid) {
        window.location.href = `/goods/detail?id=${encodeURIComponent(content.uid)}`;
        return;
    }

    if (messageType === 'ORDER' && content?.uid) {
        window.location.href = `/order/detail?id=${encodeURIComponent(content.uid)}`;
    }
});
```

## 二、UniApp 集成方式

UniApp 的推荐方式是：

- 首页负责生成 chatUrl
- 点击“打开客服会话”后跳到单独的客服页
- 客服页使用 web-view 打开 chatUrl
- 在客服页监听消息点击事件，收到 GOODS 或 ORDER 后跳转业务详情页

### 1. 首页生成 chatUrl

```javascript
const baseHtmlUrl = 'https://cdn.weiyuai.cn';
const params = new URLSearchParams();
params.append('org', 'df_org_uid');
params.append('t', '1');
params.append('sid', 'df_wg_uid');
params.append('lang', 'zh-cn');
params.append('navbar', '0');
params.append('visitorUid', 'visitor_001');
params.append('nickname', '访客小明');

params.append('goodsInfo', JSON.stringify({
    uid: 'goods_001',
    title: '轻奢通勤双肩包',
    image: 'https://example.com/goods.jpg',
    price: 399,
    quantity: 1,
    shopUid: 'shop_001'
}));

const chatUrl = `${baseHtmlUrl}/chat?${params.toString()}`;
```

### 2. 将 chatUrl 传给客服页

```javascript
uni.setStorageSync('visitor_uniapp_chat_page_url', chatUrl);
uni.setStorageSync('visitor_uniapp_chat_page_title', '商品客服会话');
uni.navigateTo({
    url: '/pages/chat/index'
});
```

### 3. 客服页使用 web-view 打开聊天页

```vue
<template>
  <web-view
    v-if="chatUrl"
    :src="chatUrl"
    @message="handleWebViewMessage"
  />
</template>

<script>
export default {
    data() {
        return {
            chatUrl: ''
        }
    },
    onLoad() {
        this.chatUrl = String(uni.getStorageSync('visitor_uniapp_chat_page_url') || '')
    }
}
</script>
```

### 4. 监听并归一化消息点击事件

```javascript
const EVENT_NAME = 'MESSAGE_BUBBLE_CLICK';

const parseMaybeJson = (value) => {
    if (typeof value !== 'string') {
        return value;
    }

    const trimmed = value.trim();
    if (!trimmed) {
        return value;
    }

    if (
        (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
        (trimmed.startsWith('[') && trimmed.endsWith(']'))
    ) {
        try {
            return JSON.parse(trimmed);
        } catch {
            return value;
        }
    }

    return value;
};

function normalizeBubbleClickEvent(packet) {
    let candidate = packet;

    if (!candidate) {
        return null;
    }

    if (candidate.detail && candidate.detail.data) {
        return normalizeBubbleClickEvent(candidate.detail.data);
    }

    if (candidate.data && !candidate.type) {
        return normalizeBubbleClickEvent(candidate.data);
    }

    if (Array.isArray(candidate)) {
        for (const item of candidate) {
            const normalized = normalizeBubbleClickEvent(item);
            if (normalized) {
                return normalized;
            }
        }
        return null;
    }

    if (typeof candidate !== 'object') {
        return null;
    }

    if (candidate.type === EVENT_NAME) {
        return {
            uid: candidate.uid,
            type: candidate.clickedMessageType,
            content: parseMaybeJson(candidate.content),
            extra: parseMaybeJson(candidate.extra),
            position: candidate.position,
            status: candidate.status
        };
    }

    if (candidate.uid && candidate.type) {
        return {
            uid: candidate.uid,
            type: candidate.type,
            content: parseMaybeJson(candidate.content),
            extra: parseMaybeJson(candidate.extra),
            position: candidate.position,
            status: candidate.status
        };
    }

    return null;
}

function handleWebViewMessage(event) {
    const packets = event?.detail?.data || [];
    const normalized = normalizeBubbleClickEvent(packets);

    if (!normalized) {
        return;
    }

    const messageType = String(normalized.type || '').toUpperCase();

    if (messageType === 'GOODS' && normalized.content?.uid) {
        uni.navigateTo({
            url: `/pages/goods/detail/index?payload=${encodeURIComponent(JSON.stringify(normalized.content))}`
        });
        return;
    }

    if (messageType === 'ORDER' && normalized.content?.uid) {
        uni.navigateTo({
            url: `/pages/order/detail/index?payload=${encodeURIComponent(JSON.stringify(normalized.content))}`
        });
    }
}
```

### 5. 商品页与订单页解析 payload

```javascript
onLoad(options) {
    const payload = options?.payload;
    if (!payload) {
        this.goods = {};
        return;
    }

    try {
        this.goods = JSON.parse(decodeURIComponent(payload));
    } catch {
        this.goods = {};
    }
}
```

订单详情页处理方式相同，只是把 goods 替换为 order。

## 三、微信小程序集成方式

微信小程序的思路与 UniApp 类似，也是用 web-view 打开聊天页，然后在宿主页面通过 message 事件接收。

### 1. 页面结构

```xml
<web-view src="{{chatUrl}}" bindmessage="handleMessage"></web-view>
```

### 2. 页面逻辑

```javascript
Page({
    data: {
        chatUrl: ''
    },

    onLoad() {
        const goodsInfo = {
            uid: 'goods_001',
            title: '轻奢通勤双肩包',
            image: 'https://example.com/goods.jpg',
            price: 399,
            quantity: 1,
            shopUid: 'shop_001'
        };

        const params = new URLSearchParams();
        params.append('org', 'df_org_uid');
        params.append('t', '1');
        params.append('sid', 'df_wg_uid');
        params.append('lang', 'zh-cn');
        params.append('navbar', '0');
        params.append('goodsInfo', JSON.stringify(goodsInfo));

        this.setData({
            chatUrl: `https://cdn.weiyuai.cn/chat?${params.toString()}`
        });
    },

    handleMessage(event) {
        const packets = event?.detail?.data || [];
        const normalized = normalizeBubbleClickEvent(packets);

        if (!normalized) {
            return;
        }

        const messageType = String(normalized.type || '').toUpperCase();

        if (messageType === 'GOODS' && normalized.content?.uid) {
            wx.navigateTo({
                url: `/pages/goods/detail/index?payload=${encodeURIComponent(JSON.stringify(normalized.content))}`
            });
            return;
        }

        if (messageType === 'ORDER' && normalized.content?.uid) {
            wx.navigateTo({
                url: `/pages/order/detail/index?payload=${encodeURIComponent(JSON.stringify(normalized.content))}`
            });
        }
    }
});
```

说明：

- 微信小程序侧同样建议复用上文 UniApp 中的 normalizeBubbleClickEvent 与 parseMaybeJson 方法
- 聊天页内部会调用 wx.miniProgram.postMessage 把点击事件发给宿主小程序页面

## 四、按消息类型跳转

宿主侧最核心的逻辑，就是根据消息类型决定跳转目标：

```javascript
function routeByMessageType(event) {
    const messageType = String(event.type || '').toUpperCase();

    if (messageType === 'GOODS') {
        return openGoodsDetail(event.content);
    }

    if (messageType === 'ORDER') {
        return openOrderDetail(event.content);
    }

    console.log('当前消息类型未配置跳转:', messageType, event);
}
```

建议：

- GOODS 跳转商品详情页
- ORDER 跳转订单详情页
- 其他消息类型如 TEXT、IMAGE、FAQ 可先忽略或做埋点统计

## 五、完整接入流程建议

### 商品咨询链路

1. 业务页构造 goodsInfo 并拼接 chatUrl
2. 宿主打开客服聊天页
3. 用户在聊天页看到商品卡片
4. 用户点击商品卡片
5. 宿主收到 MESSAGE_BUBBLE_CLICK 事件
6. 识别 clickedMessageType 或归一化后的 event.type 为 GOODS
7. 跳转到业务系统商品详情页

### 订单咨询链路

1. 业务页构造 orderInfo 并拼接 chatUrl
2. 宿主打开客服聊天页
3. 用户在聊天页看到订单卡片
4. 用户点击订单卡片
5. 宿主收到 MESSAGE_BUBBLE_CLICK 事件
6. 识别 clickedMessageType 或归一化后的 event.type 为 ORDER
7. 跳转到业务系统订单详情页

## 六、注意事项

### 1. goodsInfo 与 orderInfo 需要编码

如果你是手动拼接 URL 字符串，而不是使用 URLSearchParams，务必对 JSON 字符串执行 encodeURIComponent，否则容易因为中文、空格或特殊字符导致参数解析失败。

### 2. content 和 extra 可能是字符串，也可能已经是对象

宿主接收到事件后，不要直接假设 content 一定是对象，建议先走 parseMaybeJson。

### 3. 只把必要字段放进 URL

H5 链接长度有限，建议只传：

- 商品主键
- 商品标题
- 商品图片
- 价格
- 数量
- 店铺主键

订单信息同理，优先保留订单主键、订单状态、商品摘要和收货信息。

### 4. 建议默认携带 navbar=0

在嵌入式场景里，通常由宿主应用自己提供顶部导航，因此建议默认追加：

```text
navbar=0
```

### 5. 不同宿主的监听入口不同

- iframe：window.addEventListener('message', ...)
- UniApp：web-view 的 @message
- 微信小程序：web-view 的 bindmessage

## 七、参考实现

可参考仓库中的以下实现：

- visitor 端消息点击事件发送：frontend/apps/visitor/src/pages/Chat/components/MessageRenderer.tsx
- UniApp 首页生成聊天链接：frontend/apps/visitorUniapp/pages/index/index.vue
- UniApp 客服页监听与跳转：frontend/apps/visitorUniapp/pages/chat/index.vue
- UniApp 商品详情页：frontend/apps/visitorUniapp/pages/goods/detail/index.vue
- UniApp 订单详情页：frontend/apps/visitorUniapp/pages/order/detail/index.vue
- React 商品消息对接示例：frontend/apps/visitorSdk/examples/react-demo/src/pages/GoodsInfoDemo.tsx
- React 订单消息对接示例：frontend/apps/visitorSdk/examples/react-demo/src/pages/OrderInfoDemo.tsx

## 八、与商品/订单对接文档配合阅读

如果你还没有完成商品信息或订单信息传参，请先阅读：

- [访客端商品信息对接](../development/goods_info.md)
- [访客端订单信息对接](../development/order_info.md)

本页解决的是“打开会话之后，如何监听消息点击并跳转回业务详情页”；而商品/订单对接文档解决的是“如何把商品和订单数据传进客服系统”。两部分通常需要配合使用。
