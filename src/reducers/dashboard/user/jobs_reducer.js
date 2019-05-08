import {
    APPLY_JOB,
    CLEAR_ALL,
    CLEAR_STATUS,
    DELETE_JOB_FAILURE,
    DELETE_JOB_REQUEST,
    DELETE_JOB_SUCCESS,
    GET_JOB_DETAILS_FAILURE,
    GET_JOB_DETAILS_REQUEST,
    GET_JOB_DETAILS_SUCCESS,
    GET_JOBS_FAILURE,
    GET_JOBS_REQUEST,
    GET_JOBS_SUCCESS,
    GET_TEAM_JOBS_FAILURE,
    GET_TEAM_JOBS_REQUEST,
    GET_TEAM_JOBS_SUCCESS,
    NO_APPLY_JOB,
    SEARCH_JOBS,
    SELECTED_DELETE_JOB
} from "../../../types/dashboard/user/jobs/jobs-types";

const initialState = {
    jobs: [],
    job_details: {},
    error: "",
    message: "",
    status: "",
    pageLoading: false,

    team_jobs: [],
    team_jobs_error: "",
    team_jobs_message: "",
    team_jobs_status: "",

    delete_job_error: "",
    delete_job_message: "",
    delete_job_status: "",

    applyForJob: {
        apply: false,
        team: "",
        job: ""
    },
    search: "",

    deleteJob: {team_id: "", job_id: "", job_name: ""}
};

export default function userJobsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_JOBS_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true,
                delete_job_error: "",
                delete_job_message: "",
                delete_job_status: ""
            });
        case GET_JOBS_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                status: 200,
                error: action.response.data.error,
                message: action.response.data.error ? action.response.data.message : "",
                jobs: action.response.data.error ? [] : action.response.data.list
            });
        case GET_JOBS_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                status: action.response.status,
                error: true,
                message: action.response.data.message,
                jobs: []
            });


        case GET_TEAM_JOBS_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case GET_TEAM_JOBS_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                team_jobs_status: 200,
                team_jobs_error: action.response.data.error,
                team_jobs_message: action.response.data.error ? action.response.data.message : "",
                team_jobs: action.response.data.error ? [] : action.response.data.jobs
            });
        case GET_TEAM_JOBS_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                team_jobs_status: action.response.status,
                team_jobs_error: true,
                team_jobs_message: action.response.data.message,
                team_jobs: []
            });
        case CLEAR_ALL:
            return Object.assign({}, state, {
                deleteJob: {team_id: "", job_id: "", job_name: ""},
                search: "",
                status: "",
                error: "",
                message: "",
                jobs: [],
                job_details: {},
                team_jobs_status: "",
                team_jobs_error: "",
                team_jobs_message: "",
                team_jobs: [],
                delete_job_status: "",
                delete_job_error: "",
                delete_job_message: ""
            });

        case DELETE_JOB_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case DELETE_JOB_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                delete_job_status: 200,
                delete_job_error: action.response.data.error,
                delete_job_message: action.response.data.message
            });
        case DELETE_JOB_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                delete_job_status: action.response.status,
                delete_job_error: action.response.data.error,
                delete_job_message: action.response.data.message
            });


        case GET_JOB_DETAILS_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case GET_JOB_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                error: action.response.data.error,
                message: action.response.data.message,
                status: 200,
                job_details: action.response.data.error ? {} : action.response.data.job
            });
        case GET_JOB_DETAILS_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                error: true,
                message: action.response.data.message,
                status: action.response.status,
                job_details: {}
            });


        case CLEAR_STATUS:
            return Object.assign({}, state, {
                delete_job_status: '',
                delete_job_error: '',
                delete_job_message: ''
            });

        case APPLY_JOB:
            return Object.assign({}, state, {
                applyForJob: {
                    apply: true,
                    team: action.job.team,
                    job: action.job.job
                }
            });

        case NO_APPLY_JOB:
            return Object.assign({}, state, {
                applyForJob: {
                    apply: false,
                    team: "",
                    job: ""
                }
            });
        case SEARCH_JOBS:
            return Object.assign({}, state, {
                search: action.search
            });

        case SELECTED_DELETE_JOB:
            return Object.assign({}, state, {
                deleteJob: action.data
            });
        default:
            return state
    }
}
