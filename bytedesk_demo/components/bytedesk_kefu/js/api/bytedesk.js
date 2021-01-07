/* eslint-disable no-undef */
import * as constants from '../constants.js'

export function init(subDomain, appKey) {
	// console.log('bytedesk:', subDomain, appKey)
	// 本地持久化
	uni.setStorageSync(constants.subDomain, subDomain)
	uni.setStorageSync(constants.appKey, appKey)
}