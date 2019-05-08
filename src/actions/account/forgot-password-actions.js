import {CHANGE_FORGOT_PASSWORD_FORM, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, RESET_FORGOT_PASSWORD_FORM} from '../../types/account/Forgot-Password';
import {POST_WITHOUT_TOKEN} from "../../middleware/without_token/post-api-without-token";
import {authapi} from '../app/app';

const AUTH_API = authapi();

export function changeForgotPasswordForm(newState) {
    return {type: CHANGE_FORGOT_PASSWORD_FORM, newState}
}
export function forgotPassword(body) {
        return {
            [POST_WITHOUT_TOKEN]: {
                endpoint: AUTH_API + '/v1/forgotpass',
                types: [FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE],
                body: JSON.stringify(body)
            }
        }
}
export function resetForgotPasswordForm() {
    return { type: RESET_FORGOT_PASSWORD_FORM }
}