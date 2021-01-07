/* eslint-disable no-undef */
import * as constants from '../constants.js'
import * as configApi from '../config.js'

// 请求客服会话
export function requestThread (wid, type, aid, successcb, failedcb) {
  //
  let header = configApi.visitorApiHeader()
  if (header['Authorization'] === undefined) {
    failedcb('not loggined')
    return
  }
  //
  uni.request({
    url: constants.httpBaseUrl + '/api/thread/request',
    data: {
      wId: wid,
      type: type,
      aId: aid,
      client: constants.client
    },
    header: header,
    method: 'GET',
    success (res) {
	  // console.log('request thread:', res)
      successcb(res.data)
    },
    fail (res) {
      failedcb(res.data)
    }
  })
}

// 请求人工客服，不管此工作组是否设置为默认机器人，只要有人工客服在线，则可以直接对接人工
export function requestAgent (wid, type, aid, successcb, failedcb) {
  //
  let header = configApi.visitorApiHeader()
  if (header['Authorization'] === undefined) {
    failedcb('not loggined')
    return
  }
  //
  uni.request({
    url: constants.httpBaseUrl + '/api/thread/request/agent',
    data: {
      wId: wid,
      type: type,
      aId: aid,
      client: constants.client
    },
    header: header,
    method: 'GET',
    success (res) {
      successcb(res.data)
    },
    fail (res) {
      failedcb(res.data)
    }
  })
}

//
export function getVisitorThreads (page, size, successcb, failedcb) {
  //
  let header = configApi.visitorApiHeader()
  if (header['Authorization'] === undefined) {
    failedcb('not loggined')
    return
  }
  //
  uni.request({
    url: constants.httpBaseUrl + '/api/thread/visitor/history',
    data: {
	  page: page,
	  size: size,
      client: constants.client
    },
    header: header,
    method: 'GET',
    success (res) {
      successcb(res.data)
    },
    fail (res) {
      failedcb(res.data)
    }
  })
}
