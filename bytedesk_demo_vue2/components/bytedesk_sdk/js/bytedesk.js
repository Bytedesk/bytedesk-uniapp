/* eslint-disable no-undef */
import * as constants from './constants.js'
import * as httpApi from './httpapi.js'
// import * as stompApi from './stompapi.js'

/**
 * 简单初始化
 */
export function init(orgUid) {
	console.log('bytedesk:', orgUid)
	// 本地持久化
	initWithCallback(orgUid, function(result) {
		// console.log('init success:', result)
		// TODO: 拉取离线消息
	}, function(error) {
		// console.log('init error:', error)
	})
}

/**
 * 带有回调的初始化
 * 
 * @param {Object} successcb
 * @param {Object} failedcb
 */
export function initWithCallback(orgUid, successcb, failedcb) {
	// 本地持久化
	uni.setStorageSync(constants.VISITOR_ORGUID, orgUid)
	// 
	const uid = uni.getStorageSync(constants.VISITOR_UID);
	const nickname = uni.getStorageSync(constants.VISITOR_NICKNAME);
	const avatar = uni.getStorageSync(constants.VISITOR_AVATAR);
	//
	httpApi.init(orgUid, uid, nickname, avatar, function(result) {
		console.log('init success:', result)
		if (result.code == 200) {
			uni.setStorageSync(constants.VISITOR_UID, result.data.uid)
			uni.setStorageSync(constants.VISITOR_NICKNAME, result.data.nickname)
			uni.setStorageSync(constants.VISITOR_AVATAR, result.data.avatar)
			// 
			successcb(result)
		} else {
			console.log('init error:', result)
			failedcb(result)
		}
	}, function(error) {
		console.log('init error:', error)
		failedcb(error)
	})
}

/**
 * 自定义uid初始化登录
 */
export function initWithUid(orgUid, uid) {
	const nickname = uni.getStorageSync(constants.VISITOR_NICKNAME);
	initWithUidAndNickname(orgUid, uid, nickname)
}

/**
 * 自定义uid + 昵称-初始化登录
 */
export function initWithUidAndNickname(orgUid, uid, nickname) {
	const avatar = uni.getStorageSync(constants.VISITOR_AVATAR);
	initWithUidAndNicknameAndAvatar(orgUid, uid, nickname, avatar)
}

// 自定义昵称 + 头像初始化登录
export function initWithNicknameAndAvatar(orgUid, nickname, avatar) {
	const uid = uni.getStorageSync(constants.VISITOR_UID);
	initWithUidAndNicknameAndAvatar(orgUid, uid, nickname, avatar)
}

/**
 * 自定义uid + 昵称 + 头像初始化登录
 * 
 * @param {Object} username 自定义用户名
 * @param {Object} nickname 自定义昵称
 * @param {Object} avatar 自定义头像
 */
export function initWithUidAndNicknameAndAvatar(orgUid, uid, nickname, avatar) {
	// 本地持久化
	uni.setStorageSync(constants.VISITOR_ORGUID, orgUid)
	// 
	// let uuid = orgUid + '_' + uid; // TODO:待处理多个应用uid存在重复的问题
	let uuid = uid;
	httpApi.init(orgUid, uuid, nickname, avatar, function(result) {
		console.log('init success:', result)
		if (result.code == 200) {
			uni.setStorageSync(constants.VISITOR_UID, result.data.uid)
			uni.setStorageSync(constants.VISITOR_NICKNAME, result.data.nickname)
			uni.setStorageSync(constants.VISITOR_AVATAR, result.data.avatar)
			// successcb(result)
		} else {
			console.log('init error:', result)
			// failedcb(result)
		}
	}, function(error) {
		console.log('init error:', error)
		// failedcb(error)
	})
}

// 请求一对一客服会话
// export function requestAgentThread(sid, successcb, failedcb) {
// 	requestThread("0", sid, false, successcb, failedcb)
// }

// 请求一对一客服会话，forceAgent为true时强制分配给人工客服
// export function requestAgentThread(sid, forceAgent, successcb, failedcb) {
// 	requestThread("0", sid, forceAgent, successcb, failedcb)
// }

// 请求技能组会话
// export function requestWorkgroupThread(sid, successcb, failedcb) {
// 	requestThread("1", sid, false, successcb, failedcb)
// }

// 请求技能组会话，forceAgent为true时强制分配给人工客服
// export function requestWorkgroupThread(sid, forceAgent, successcb, failedcb) {
// 	requestThread("1", sid, forceAgent, successcb, failedcb)
// }

// 请求会话
export function requestThread(type, sid, forceAgent, successcb, failedcb) {
	// 
	const orgUid = uni.getStorageSync(constants.VISITOR_ORGUID);
	const uid = uni.getStorageSync(constants.VISITOR_UID);
	const nickname = uni.getStorageSync(constants.VISITOR_NICKNAME);
	const avatar = uni.getStorageSync(constants.VISITOR_AVATAR);
	//
	httpApi.requestThread(orgUid, type, sid, uid, nickname, avatar, forceAgent, function(result) {
		// console.log('requestThread success:', result)
		if (result.code == 200) {
			// 
			successcb(result)
		} else {
			console.log('requestThread error:', result)
			failedcb(result)
		}
	}, function(error) {
		console.log('requestThread error:', error)
		failedcb(error)
	})
}

// 发送离线消息
export function sendRestMessage(json, successcb, failedcb) {
    //
    httpApi.sendRestMessage(json, function(result) {
        if (result.code == 200) {
            successcb(result);
        } else {
            console.log('sendRestMessage error:', result)
            failedcb(result);
        }
    }, function(error) {
        console.log('sendRestMessage error:', error)
    })
}


// 建立长连接
export function connect() {
	//
	// stompApi.connect(null, function() {
	// 	// 长连接成功回调
	// })
}