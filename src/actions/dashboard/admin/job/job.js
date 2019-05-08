import {
    CHANGE_CREATE_JOB_FORM, CLEAR_ALL, CREATE_JOB_FAILURE, CREATE_JOB_REQUEST, CREATE_JOB_SUCCESS,
    GET_JOB_DETAILS_REQUEST, GET_JOB_DETAILS_SUCCESS, GET_JOB_DETAILS_FAILURE, CLEAR_CREATE_JOB_RESPONSE, CLEAR_STATUS
} from "../../../../types/dashboard/admin/job/job";
import {CALL_POST_API} from "../../../../middleware/token/post-api";
import {GET_API} from "../../../../middleware/token/get-api";

const BASE_URL = process.env.REACT_APP_DRIVE_API;

// create JOB

export function changeCreateJobForm(newState) {
    return {type: CHANGE_CREATE_JOB_FORM, newState}
}

export function createJob(body) {
    return {
        [CALL_POST_API]: {
            endpoint: BASE_URL + '/v1/job',
            types: [CREATE_JOB_REQUEST, CREATE_JOB_SUCCESS, CREATE_JOB_FAILURE],
            body: body
        }
    }
}

export function getJobDetails(team_id, job_id) {
    return  {
        [GET_API]: {
            endpoint: BASE_URL + "/v1/job/"+team_id+"/"+job_id,
            types: [GET_JOB_DETAILS_REQUEST, GET_JOB_DETAILS_SUCCESS, GET_JOB_DETAILS_FAILURE]
        }
    }
}

export function clearCreateJobResponse() {
    return {type: CLEAR_CREATE_JOB_RESPONSE}
}
export function clearAll() {
    return {type: CLEAR_ALL}
}
export function clearStatus() {
    return {type: CLEAR_STATUS}
}

