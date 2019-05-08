import {USER_FEEDBACK_REQUEST, USER_FEEDBACK_SUCCESS, USER_FEEDBACK_FAILURE, CLEAR_ALL,
ARCH_UNARCH_REQUEST, ARCH_UNARCH_FEEDBACK_SUCCESS, ARCH_UNARCH_FEEDBACK_FAILURE, CLEAR_STATUS} from '../../../../types/dashboard/admin/user_feedback/user-feedback';
import {GET_API} from "../../../../middleware/token/get-api";
import {PUT_API_WITHOUT_BODY} from "../../../../middleware/token/put_api/put-api-without-body";
const BASE_URL = process.env.REACT_APP_AUTH_API;

export function clearAll() {
    return {type: CLEAR_ALL}
}

export function getUserFeedbacks(type) {
    return {
        [GET_API]:{
            endpoint: BASE_URL+ '/v1/feedback?value='+type,
            types: [USER_FEEDBACK_REQUEST, USER_FEEDBACK_SUCCESS, USER_FEEDBACK_FAILURE]
        }
    }
}

export function archiveUnarchiveFeedback(id, value) {
    return {
        [PUT_API_WITHOUT_BODY]:{
            endpoint: BASE_URL+ '/v1/feedback/'+id+'?value='+value,
            types: [ARCH_UNARCH_REQUEST, ARCH_UNARCH_FEEDBACK_SUCCESS, ARCH_UNARCH_FEEDBACK_FAILURE]
        }
    }
}

export function clearStatus() {
  return {type: CLEAR_STATUS}
}
