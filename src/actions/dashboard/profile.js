import {
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    UPDATE_RESUME_FAILURE,
    UPDATE_RESUME_SUCCESS,
    UPDATE_RESUME_REQUEST,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    SET_UPDATE_RESUME_GO_TO_PROFILE_TRUE
} from '../../types/dashboard/profile';
import {GET_API} from "../../middleware/token/get-api";
import {logout} from "../account/login-actions";

const BASE_URL = process.env.REACT_APP_AUTH_API;

export function getProfile(){
    return {
        [GET_API]:{
            endpoint: BASE_URL+ '/v1/profile',
            types: [ GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE ]
        }
    }
}

export function updateProfile(data) {
    let status = "";
    const config = {
        method: "PUT",
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
        body: JSON.stringify(data)
    };
    return dispatch => {
        dispatch(updateProfileRequest());
        fetch(BASE_URL+'/v1/profile', config)
            .then(function (res) {
                status = res.status;
                return res.json()
            })
            .then(function (res) {
                    if (status === 200 && !res.error) {
                        dispatch(updateProfileSuccess({data: {error: false, message: res.message, updateProfileGoToProfile: true}, status: 200}));
                    }
                    else {
                        if (status === 401) {
                            dispatch(logout())
                        }
                        else {
                            dispatch(updateProfileFailure({data:{error: true, message: res.message, updateProfileGoToProfile: false}, status: status}));
                        }
                    }},
                function () {
                    dispatch(updateProfileFailure({data:{message: "Error while updating the profile", error: true, updateProfileGoToProfile: false}, status: 500}))
                })
    }
}

export function updateResume(file) {
    let formData = new FormData();
    formData.append('resume', file);
    let status = "";
    const config = {
        method: "POST",
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
        body: formData
    };
    return dispatch => {
        dispatch(updateResumeRequest());
        fetch(BASE_URL+'/v1/resume', config)
            .then(function (res) {
                status = res.status;
                return res.json()
            })
            .then(function (res) {
                    if (status === 200 && !res.error) {
                        dispatch(updateResumeSuccess({data: {error: false, message: res.message, updateResumeGoToProfile: true}, status: 200}));
                    }
                    else {
                        if (status === 401) {
                            dispatch(logout())
                        }
                        else {
                            dispatch(updateResumeFailure({data:{error: true, message: res.message, updateResumeGoToProfile: false}, status: status}))
                        }
                    }},
                function () {
                    dispatch(updateResumeFailure({data:{message: "Error while updating resume", error: true, updateResumeGoToProfile: false}, status: 500}))
                })
    }
}

export function updateProfileRequest() {
    return {type: UPDATE_PROFILE_REQUEST}
}
export function updateProfileSuccess(response) {
    return {type: UPDATE_PROFILE_SUCCESS, response}
}
export function updateProfileFailure(response) {
    return {type: UPDATE_PROFILE_FAILURE, response}
}

export function updateResumeRequest() {
    return {type: UPDATE_RESUME_REQUEST}
}
export function updateResumeSuccess(response) {
    return {type: UPDATE_RESUME_SUCCESS, response}
}
export function updateResumeFailure(response) {
    return {type: UPDATE_RESUME_FAILURE, response}
}
export function setUpdateResumeGoToProfileTrue() {
    return {type: SET_UPDATE_RESUME_GO_TO_PROFILE_TRUE}
}
