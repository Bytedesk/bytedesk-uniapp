/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2022-03-10 14:57:11
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-09-29 15:51:52
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 * 联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
/* eslint-disable no-undef */
import * as constants from './constants.js'

// 初始化用户信息
export function init(orgUid, uid, nickname, avatar, successcb, failedcb) {
    uni.request({
        url: constants.API_BASE_URL + '/visitor/api/v1/init',
        data: {
            'orgUid': orgUid,
            'uid': uid,
            'nickname': nickname,
            'avatar': avatar,
            'client': constants.HTTP_CLIENT
        },
        method: 'GET',
        success(res) {
            successcb(res.data)
        },
        fail(res) {
            failedcb(res.data)
        }
    })
}

//  请求会话
export function requestThread(orgUid, type, sid, uid, nickname, avatar, forceAgent, successcb, failedcb) {
    uni.request({
        url: constants.API_BASE_URL + '/visitor/api/v1/thread',
        data: {
            'orgUid': orgUid,
            'type': type,
            'sid': sid,
            // 
            'uid': uid,
            'nickname': nickname,
            'avatar': avatar,
            // 
            'forceAgent': forceAgent,
            'client': constants.HTTP_CLIENT
        },
        method: 'GET',
        success(res) {
            successcb(res.data)
        },
        fail(res) {
            failedcb(res.data)
        }
    })
}

// 发送离线消息
export function sendRestMessage(json, successcb, failedcb) {
    //
    uni.request({
        url: constants.BASE_URL + '/visitor/api/v1/message/send',
        data: {
            'json': json,
            'client': constants.HTTP_CLIENT
        },
        method: 'POST',
        success(res) {
            successcb(res.data)
        },
        fail(res) {
            failedcb(res.data)
        }
    })
}
