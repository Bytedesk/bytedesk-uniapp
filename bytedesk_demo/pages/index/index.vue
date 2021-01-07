<template>
	<view class="bytedesk">
		<uni-list>
			<uni-list-item title="联系客服" clickable @click="startChat()" showArrow />
			<!-- <uni-list-item title="用户信息" clickable @click="startChat()" showArrow /> -->
			<!-- <uni-list-item title="在线状态" clickable @click="startChat()" showArrow /> -->
			<!-- <uni-list-item title="历史会话" clickable @click="startChat()" showArrow /> -->
			<!-- <uni-list-item title="消息提示" clickable @click="startChat()" showArrow /> -->
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				// 第二步：到 客服管理->技能组-有一列 ‘唯一ID（wId）’, 默认设置工作组wid
				// 说明：一个技能组可以分配多个客服，访客会按照一定的规则分配给组内的各个客服账号
				workGroupWid: '201807171659201', // 默认人工
				// workGroupWid: '201809061716221' // 默认机器人
				// 说明：直接发送给此一个客服账号，一对一会话
				agentUid: '201808221551193'
			}
		},
		onLoad() {

		},
		methods: {
			// 开始会话
			startChat () {
				console.log('start chat')
				uni.navigateTo({
				    url: '../../components/bytedesk_kefu/chat?wid=' + this.workGroupWid + '&title=萝卜丝'
				});
			}
		}
	}
</script>

<style>
/* #ifndef APP-PLUS-NVUE */
page {
    min-height: 100%;
    height: auto;
}
/* #endif */

/* 解决头条小程序字体图标不显示问题，因为头条运行时自动插入了span标签，且有全局字体 */
/* #ifdef MP-TOUTIAO */
/* text :not(view) {
    font-family: uniicons;
} */
/* #endif */

.uni-icon {
    font-family: uniicons;
    font-weight: normal;
}

.uni-container {
    padding: 15px;
    background-color: #f8f8f8;
}

.uni-header-logo {
    padding: 15px 15px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10rpx;
}

.uni-header-image {
    width: 80px;
    height: 80px;
}

.uni-hello-text {
    margin-bottom: 20px;
}

.hello-text {
    color: #7A7E83;
    font-size: 14px;
    line-height: 20px;
}

.hello-link {
    color: #7A7E83;
    font-size: 14px;
    line-height: 20px;
}

.uni-panel {
    margin-bottom: 12px;
}

.uni-panel-h {
    background-color: #ffffff;
    flex-direction: row;
    align-items: center;
    padding: 12px;
}
/*
.uni-panel-h:active {
    background-color: #f8f8f8;
}
 */
.uni-panel-h-on {
    background-color: #f0f0f0;
}

.uni-panel-text {
    flex: 1;
    color: #000000;
    font-size: 14px;
    font-weight: normal;
}

.uni-panel-icon {
    margin-left: 15px;
    color: #999999;
    font-size: 14px;
    font-weight: normal;
    transform: rotate(0deg);
    transition-duration: 0s;
    transition-property: transform;
}

.uni-panel-icon-on {
    transform: rotate(180deg);
}

.uni-navigate-item {
    flex-direction: row;
    align-items: center;
    background-color: #FFFFFF;
    border-top-style: solid;
    border-top-color: #f0f0f0;
    border-top-width: 1px;
    padding: 12px;
}

.uni-navigate-item:active {
    background-color: #f8f8f8;
}

.uni-navigate-text {
    flex: 1;
    color: #000000;
    font-size: 14px;
    font-weight: normal;
}

.uni-navigate-icon {
    margin-left: 15px;
    color: #999999;
    font-size: 14px;
    font-weight: normal;
}
</style>
