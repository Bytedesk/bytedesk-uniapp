/* eslint-disable no-undef */
import * as constants from '../constants.js'
import * as httpApi from './httpapi.js'
import * as stompApi from './stompapi.js'

// 简单初始化
export function init(subDomain, appKey) {
	// console.log('bytedesk:', subDomain, appKey)
	// 本地持久化
	uni.setStorageSync(constants.subDomain, subDomain)
	uni.setStorageSync(constants.appKey, appKey)
	//
	httpApi.anonymousLogin(subDomain, appKey, function(result) {
		// console.log('login success:', result)
	}, function(error) {
		console.log('login error:', error)
	})
}

// 带有回调的初始化
export function initWithCallback(subDomain, appKey, successcb, failedcb) {
	// console.log('bytedesk:', subDomain, appKey)
	// 本地持久化
	uni.setStorageSync(constants.subDomain, subDomain)
	uni.setStorageSync(constants.appKey, appKey)
	//
	httpApi.anonymousLogin(subDomain, appKey, function(result) {
		console.log('anonymousLogin success:', result)
		successcb(result)
	}, function(error) {
		console.log('login error:', error)
		failedcb(error)
	})
}

// 建立长连接
export function connect() {
	//
	stompApi.connect(null, function() {
		// 长连接成功回调
	})
}