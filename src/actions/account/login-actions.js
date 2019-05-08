import {CHANGE_LOGIN_FORM, CHANGE_EMAIL_REGISTER_FORM, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, CLEAR_API_ERROR_MESSAGE,
    LOGOUT_SUCCESS,
    LOGOUT_ACCOUNT_REQUEST, LOGOUT_ACCOUNT_SUCCESS, LOGOUT_ACCOUNT_FAILURE} from '../../types/account/Login';
import {POST_WITHOUT_TOKEN} from "../../middleware/without_token/post-api-without-token";
import {authapi} from '../app/app';
import {GET_API} from "../../middleware/token/get-api";

const AUTH_API = authapi();
const BASE_URL = process.env.REACT_APP_AUTH_API;

export function changeEmailRegisterForm(newState) {
    return {type: CHANGE_EMAIL_REGISTER_FORM, newState}
}
export function changeLoginForm(newState) {
    return {type: CHANGE_LOGIN_FORM, newState}
}

export function clearApiErrorMessage() {
    return {type: CLEAR_API_ERROR_MESSAGE }
}
export function login(body) {
    return {
        [POST_WITHOUT_TOKEN]:{
            endpoint: AUTH_API +'/v1/login',
            types: [ LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
            body: JSON.stringify(body)
        }
    }
}

export function logout() {
    return {type: LOGOUT_SUCCESS}
}

export function logoutAccount(){
    return {
        [GET_API]:{
            endpoint: BASE_URL+ '/v1/logout',
            types: [ LOGOUT_ACCOUNT_REQUEST, LOGOUT_ACCOUNT_SUCCESS, LOGOUT_ACCOUNT_FAILURE ]
        }
    }
}
export function loginSuccess(response) {
    return {type: LOGIN_SUCCESS, response}
}
