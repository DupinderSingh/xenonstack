import {CHANGE_RESET_PASSWORD_FORM, RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_RESET_PASSWORD_FORM} from '../../types/account/Reset-password';
import {POST_WITHOUT_TOKEN} from "../../middleware/without_token/post-api-without-token";
import {authapi} from '../app/app';
import {PUT_API} from "../../middleware/token/put_api/put-api-with-body";

const AUTH_API = authapi();

export function changeResetPasswordForm(newState) {
    return {type: CHANGE_RESET_PASSWORD_FORM, newState}
}
export function resetPassword(body, status) {
    if (status === "reset") {
        return {
            [POST_WITHOUT_TOKEN]: {
                endpoint: AUTH_API + '/v1/forgotpass',
                types: [RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE],
                body: JSON.stringify(body)
            }
        }
    }
    else {
        return {
            [PUT_API]: {
                endpoint: AUTH_API + '/v1/changepass',
                types: [RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE],
                body: JSON.stringify(body)
            }
        }
    }
}
export function resetResetPasswordForm() {
    return {type: RESET_RESET_PASSWORD_FORM}
}
