import {
    CHANGE_EMAIL_VERIFICATION_FORM,
    EMAIL_VERIFICATION_FAILURE,
    EMAIL_VERIFICATION_REQUEST,
    EMAIL_VERIFICATION_SUCCESS
} from "../../types/account/Email-verification";
import {POST_WITHOUT_TOKEN} from "../../middleware/without_token/post-api-without-token";
import {authapi} from "../app/app";

const AUTH_API = authapi();

export function changeEmailVerificationForm(newState) {
    return {type: CHANGE_EMAIL_VERIFICATION_FORM, newState}
}

export function verifyEmail(body) {
    return {
        [POST_WITHOUT_TOKEN]: {
            endpoint: AUTH_API + '/v1/verifymail',
            types: [EMAIL_VERIFICATION_REQUEST, EMAIL_VERIFICATION_SUCCESS, EMAIL_VERIFICATION_FAILURE],
            body: JSON.stringify(body)
        }
    }
}