/* eslint-disable no-undef */
import * as constants from '../constants.js'
import * as configApi from '../config.js'

export function getProfile (successcb, failedcb) {
  //
  let header = configApi.visitorApiHeader()
  if (header['Authorization'] === undefined) {
    failedcb('not loggined')
    return
  }
  //
  uni.request({
    url: constants.httpBaseUrl + '/api/user/profile',
    data: {
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
