/* eslint-disable no-undef */
import * as constants from '../constants.js'
import * as httpApi from './httpapi.js'

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
