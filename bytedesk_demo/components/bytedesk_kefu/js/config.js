/* eslint-disable no-undef */
import * as constants from './constants.js'

export function visitorApiHeader () {
  let header = {}
  // let accessToken = wx.getStorageSync(constants.accessKey)
  let accessToken = uni.getStorageSync(constants.accessToken)
  if (accessToken) {
    header = {
	  'content-type': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    }
  }
  return header
}
