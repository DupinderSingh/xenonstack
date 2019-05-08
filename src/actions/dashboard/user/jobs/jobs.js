import {
    GET_JOBS_REQUEST,
    GET_JOBS_SUCCESS,
    GET_JOBS_FAILURE,
    CLEAR_ALL,
    GET_TEAM_JOBS_REQUEST,
    GET_TEAM_JOBS_SUCCESS,
    GET_TEAM_JOBS_FAILURE,
    DELETE_JOB_REQUEST,
    DELETE_JOB_SUCCESS,
    DELETE_JOB_FAILURE,
    CLEAR_STATUS,
    EDIT_JOB_DETAILS_REQUEST,
    EDIT_JOB_DETAILS_SUCCESS,
    EDIT_JOB_DETAILS_FAILURE,
    APPLY_JOB, NO_APPLY_JOB,
    SAVE_APPLY_JOB_REQUEST, SAVE_APPLY_JOB_SUCCESS, SAVE_APPLY_JOB_FAILURE,
    SEARCH_JOBS,
    SELECTED_DELETE_JOB
} from "../../../../types/dashboard/user/jobs/jobs-types";
import {GET_API_WITHOUT_TOKEN} from "../../../../middleware/without_token/get-api-without-token";
import {CALL_DELETE_API} from "../../../../middleware/token/delete/without-body";
import {PUT_API} from "../../../../middleware/token/put_api/put-api-with-body";
import {CALL_POST_API} from "../../../../middleware/token/post-api";

const BASE_URL = process.env.REACT_APP_DRIVE_API;
const AUTH_URL = process.env.REACT_APP_AUTH_API;

export function saveApplyJob(body) {
    return {
        [CALL_POST_API]: {
            endpoint: AUTH_URL + '/v1/apply',
            types: [SAVE_APPLY_JOB_REQUEST, SAVE_APPLY_JOB_SUCCESS, SAVE_APPLY_JOB_FAILURE],
            body: body
        }
    }
}

export function getJobs() {
    return {
        [GET_API_WITHOUT_TOKEN]: {
            endpoint: BASE_URL + '/v1/job',
            types: [GET_JOBS_REQUEST, GET_JOBS_SUCCESS, GET_JOBS_FAILURE]
        }
    }
}

export function editJob(team, job, body) {
    return {
        [PUT_API]: {
            endpoint: BASE_URL + '/v1/job/'+team+'/'+job,
            types: [EDIT_JOB_DETAILS_REQUEST, EDIT_JOB_DETAILS_SUCCESS, EDIT_JOB_DETAILS_FAILURE],
            body: JSON.stringify(body)
        }
    }
}

export function deleteJob(team, job) {
    return {
        [CALL_DELETE_API]: {
            endpoint: BASE_URL + '/v1/job/'+team+'/'+job,
            types: [DELETE_JOB_REQUEST, DELETE_JOB_SUCCESS, DELETE_JOB_FAILURE],
        }
    }
}
export function getTeamJobs(team) {
    return {
        [GET_API_WITHOUT_TOKEN]: {
            endpoint: BASE_URL + '/v1/job/'+team,
            types: [GET_TEAM_JOBS_REQUEST, GET_TEAM_JOBS_SUCCESS, GET_TEAM_JOBS_FAILURE]
        }
    }
}

export function clearAll() {
    return {type: CLEAR_ALL}
}

export function clearStatus() {
    return {type: CLEAR_STATUS}
}

export function applyJob(job) {
    return {type: APPLY_JOB, job}
}

export function noApplyJob() {
    return {type: NO_APPLY_JOB}
}

export function searchJobs(search) {
    return {type: SEARCH_JOBS, search}
}

export function selectedDeleteJob(data) {
    return {type: SELECTED_DELETE_JOB, data}
}