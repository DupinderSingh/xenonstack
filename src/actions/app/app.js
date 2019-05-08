import history from '../../index';
import {REFRESH_TOKEN_FAILURE, REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS} from '../../types/account/Login';
import GET_API from '../../middleware/token/get-api';

const BASE_URL = process.env.REACT_APP_DRIVE_API;

export function forwardTo(location) {
    history.push(location)
}

export function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}

export function authapi() {
    return process.env.REACT_APP_AUTH_API
}

export function checkValidation(e) {
    if (e.target.checkValidity()) {
        if (e.target.type === "select-one") {
            e.target.parentElement.classList.remove("has-error");
            e.target.parentElement.classList.remove("personal-select-with-error");
            e.target.parentElement.classList.add("personal-select-without-error");
        }
        else {
            e.target.parentElement.classList.remove("has-error");
        }
    }
    else {
        e.target.parentElement.classList.add("has-error");
        e.target.parentElement.classList.add("personal-select-with-error");
        e.target.parentElement.classList.remove("personal-select-without-error");
        if (e.target.type === "select-one") {
        }
        else {
            e.target.parentElement.classList.add("has-error");
        }
    }
}

export function refreshToken() {
    return {
        [GET_API]: {
            endpoint: 'https://career-admin.xenon.team/api/drive-portal/v1/refresh_token',
            type: [REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILURE]
        }
    }
}
