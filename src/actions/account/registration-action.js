import {
    // ZIPCODE_REQUEST, ZIPCODE_SUCCESS, ZIPCODE_FAILURE,
    CHANGE_REGISTRATION_FORM, CLEAR_API_ERROR_MESSAGE, CHANGE_EDUCATION, CHANGE_EXPERIENCE,
    REGISTRATION_REQUEST, REGISTRATION_FAILURE, STOP_REGISTRATION_LOADING, REGISTRATION_SUCCESS, GO_TO_REGISTERATION,
    SIGNUP_TOKEN, DO_NOT_GO_TO_REGISTRATION, COLLEGE_LOADING, UPDATE_SKIP_EDUCATION, UPDATE_SKIP_EXPERIENCE
} from '../../types/account/Registration';
import {authapi, forwardTo} from "../app/app";
import {store} from "../../index";
import {loginSuccess} from "./login-actions";
import {CHANGE_USER_NAME} from "../../types/account/Login";
// import {GET_WITHOUT_TOKEN} from "../../middleware/get-api-without_token";

const AUTH_API = authapi();

export function changeRegistrationForm(newState) {
    return {type: CHANGE_REGISTRATION_FORM, newState}
}
export function clearApiErrorMessage() {
    return {type: CLEAR_API_ERROR_MESSAGE }
}
export function changeEducation(newState) {
    return {type: CHANGE_EDUCATION, newState}
}
export function changeExperience(newState) {
    return {type: CHANGE_EXPERIENCE, newState}
}

export function checkSignupStatus(goToRegistration, url) {
    if (!goToRegistration) {
       forwardTo("/login");
    }
    else {
        window.history.pushState(null, null, url);
        window.onpopstate = function () {
            window.history.go(1);
        };
    }
}

export function checkEmail(body) {
    let status = "";
    const config = {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    };
    return dispatch => {
        dispatch(registrationRequest());
        fetch(AUTH_API+'/v1/check_email', config)
            .then(function (res) {
                status = res.status;
                return res.json()
            })
            .then(function (res) {
                    if (status === 200 && !res.error) {
                        sessionStorage.setItem("email", body.email);
                        dispatch(registrationSuccess({data: res, status: status, error: false}))
                    }
                    else {
                        dispatch(registrationFailure({data:{message: res.message}, status: status, error: true}))
                    }},
                function () {
                    dispatch(registrationFailure({data:{message: "Error while registering the user"}, status: 500, error: true}))
                })
    }
}

export function signup(file, data) {
    let status = "";
    const config = {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: data.email,
            password: data.password,
            contact: data.contact,
            name: data.name,
            fname: data.fname,
            lname: data.lname
        })
    };
    return dispatch => {
        dispatch(registrationRequest());
        fetch(AUTH_API+'/v1/signup', config)
            .then(function (res) {
                status = res.status;
                return res.json()
            })
            .then(function (res) {
                    if (status === 200 && !res.error) {
                        dispatch(setSignUpToken(res));
                        dispatch(register(file, data))
                    }
                    else {
                        dispatch(registrationFailure({data:{message: res.message}, status: status, error: true}))
                    }},
                function () {
                    dispatch(registrationFailure({data:{message: "Error while registering the user"}, status: 500, error: true}))
                })
    }
}

function setSignUpToken(response) {
    return {type: SIGNUP_TOKEN, response}
}
export function uploadResume(file) {
    let formData = new FormData();
    formData.append('resume', file);
    let status = "";
    const config = {
        method: "POST",
        headers: {'Authorization': `Bearer ${store.getState().RegisterReducer.signupToken}`},
        body: formData
    };
    return dispatch => {
        dispatch(registrationRequest());
        fetch(AUTH_API+'/v1/resume', config)
            .then(function (res) {
                status = res.status;
                return res.json()
            })
            .then(function (res) {
                    if (status === 200 && !res.error) {
                        dispatch(stopRegistrationLoading());
                        dispatch(loginSuccess({data: {error: false, message: "", token: store.getState().RegisterReducer.signupToken, expire: store.getState().RegisterReducer.expire, sys_role: store.getState().RegisterReducer.sys_role, name: store.getState().RegisterReducer.name}}));
                    }
                    else {
                        dispatch(registrationFailure({data:{message: res.message}, status: status, error: true}))
                    }},
                function () {
                    dispatch(registrationFailure({data:{message: "Error while uploading resume"}, status: 500, error: true}))
                })
    }
}

export function register(file, registerData) {
    console.log(registerData, "registerData..")
    let status = "";
    const config = {
        method: "POST",
        headers: {'Authorization': `Bearer ${store.getState().RegisterReducer.signupToken}`},
        body: JSON.stringify(registerData)
    };
    return dispatch => {
        dispatch(registrationRequest());
        fetch(AUTH_API+'/v1/register', config)
            .then(function (res) {
                status = res.status;
                return res.json()
            })
            .then(function (res) {
                    if (status === 200 && !res.error) {
                        dispatch(uploadResume(file));
                    }
                    else {
                        dispatch(registrationFailure({data:{message: res.message}, status: status, error: true}))
                    }},
                function () {
                    dispatch(registrationFailure({data:{message: "Error while registering user"}, status: 500, error: true}))
                })
    }
}

export function registrationRequest() {
    return {type: REGISTRATION_REQUEST}
}
export function registrationSuccess(response) {
    return {type: REGISTRATION_SUCCESS, response}
}
export function registrationFailure(response) {
    return {type: REGISTRATION_FAILURE, response}
}
export function stopRegistrationLoading() {
    return {type: STOP_REGISTRATION_LOADING }
}

export function registerNow() {
    return {type: GO_TO_REGISTERATION}
}

export function doNotGoToRegistration() {
    return {type: DO_NOT_GO_TO_REGISTRATION}
}

export function changeUserName(name) {
    return {type: CHANGE_USER_NAME, name}
}
export function collegeLoading(status) {
    return {type: COLLEGE_LOADING, status}
}
export function updateSkipEducation(status) {
    return {type: UPDATE_SKIP_EDUCATION, status}
}
export function updateSkipExperience(status) {
    return {type: UPDATE_SKIP_EXPERIENCE, status}
}