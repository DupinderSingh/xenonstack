import {
    CLEAR_ALL,
    CLEAR_STATUS,
    DRIVES_FAILURE,
    DRIVES_REQUEST,
    DRIVES_SUCCESS
} from "../../../types/dashboard/user/drives/drives-types";
import {
    SAVE_APPLY_JOB_FAILURE,
    SAVE_APPLY_JOB_REQUEST,
    SAVE_APPLY_JOB_SUCCESS
} from "../../../types/dashboard/user/jobs/jobs-types";

const initialState = {
    drives: [],
    error: "",
    message: "",
    status: "",
    pageLoading: false,

    saveApplyJobPageLoading: false,
    saveApplyJobStatus: "",
    saveApplyJobError: "",
    saveApplyJobMessage: ""
};

export default function userDrivesReducer(state = initialState, action) {
    switch (action.type) {
        case DRIVES_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true,
                saveApplyJobStatus: "",
                saveApplyJobError: "",
                saveApplyJobMessage: ""
            });
        case DRIVES_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                status: 200,
                error: action.response.data.error,
                message: action.response.data.error ? action.response.data.message : "",
                drives: action.response.data.error ? [] : action.response.data.list
            });
        case DRIVES_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                status: action.response.status,
                error: true,
                message: action.response.data.message,
                drives: []
            });


        case CLEAR_ALL:
            return Object.assign({}, state, {
                drives: [],
                error: "",
                message: "",
                status: "",

                saveApplyJobStatus: "",
                saveApplyJobError: "",
                saveApplyJobMessage: ""
            });

        case SAVE_APPLY_JOB_REQUEST:
            return Object.assign({}, state, {
                saveApplyJobPageLoading: true
            });
        case SAVE_APPLY_JOB_SUCCESS:
            return Object.assign({}, state, {
                saveApplyJobPageLoading: false,
                saveApplyJobStatus: 200,
                saveApplyJobError: action.response.data.error,
                saveApplyJobMessage: action.response.data.message
            });
        case SAVE_APPLY_JOB_FAILURE:
            return Object.assign({}, state, {
                saveApplyJobPageLoading: false,
                saveApplyJobStatus: action.response.status,
                saveApplyJobError: true,
                saveApplyJobMessage: action.response.status === 500 ? "Cannot apply job right now. Service unavailable. Please try again later." : action.response.data.message
            });
        case CLEAR_STATUS:
            return Object.assign({}, state, {
                saveApplyJobStatus: "",
                saveApplyJobError: "",
                saveApplyJobMessage: ""
            });

        default:
            return state
    }
}
