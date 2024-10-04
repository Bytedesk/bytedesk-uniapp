/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-09-29 16:54:30
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-09-30 16:09:07
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 * 联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import * as constants from '@/components/bytedesk_sdk/js/constants.js'
import moment from '@/components/bytedesk_sdk/js/moment.min.js'
// 
export function shouldReturn(message) {
    if (
      message.type === constants.MESSAGE_TYPE_READ ||
      message.type === constants.MESSAGE_TYPE_DELIVERED ||
      message.type === constants.MESSAGE_TYPE_TYPING ||
      message.type === constants.MESSAGE_TYPE_PREVIEW
    ) {
      return true;
    }
    return false;
  };

export function printLog(msg) {
    console.log('bytedesk:', msg)
}
export function isSystemMessage(msg) {
    return msg.type === constants.MESSAGE_TYPE_SYSTEM 
        || msg.type === constants.MESSAGE_TYPE_CONTINUE 
        || msg.type === constants.MESSAGE_TYPE_AUTO_CLOSED 
        || msg.type === constants.MESSAGE_TYPE_AGENT_CLOSED;
}
export function guid() {
    function s4 () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    }
    let timestamp = moment(new Date()).format('YYYYMMDDHHmmss'); 
    return timestamp + s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4()
    // return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}