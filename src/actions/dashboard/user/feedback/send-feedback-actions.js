import {
    SEND_FEEDBACK_FAILURE, SEND_FEEDBACK_REQUEST,
    SEND_FEEDBACK_SUCCESS, CHANGE_FEEDBACK_FORM
} from "../../../../types/dashboard/user/feedback/send-feedback-types";
import {CALL_POST_API} from "../../../../middleware/token/post-api";
import {authapi} from '../../../app/app';
const AUTH_API = authapi();

export function sendFeedback(body) {
    return {
        [CALL_POST_API]: {
            endpoint: AUTH_API + '/v1/feedback',
            types: [SEND_FEEDBACK_REQUEST, SEND_FEEDBACK_SUCCESS, SEND_FEEDBACK_FAILURE],
            body: body
        }
    }
}

export function changeFeedbackForm(newState) {
    return {type: CHANGE_FEEDBACK_FORM, newState}
}