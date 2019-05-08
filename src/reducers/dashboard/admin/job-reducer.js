import {
    CHANGE_CREATE_JOB_FORM, CLEAR_ALL, CLEAR_STATUS, CREATE_JOB_FAILURE, CREATE_JOB_REQUEST, CREATE_JOB_SUCCESS,
    EDIT_JOB_DETAILS_FAILURE, EDIT_JOB_DETAILS_REQUEST, EDIT_JOB_DETAILS_SUCCESS, GET_JOB_DETAILS_FAILURE,
    GET_JOB_DETAILS_REQUEST, GET_JOB_DETAILS_SUCCESS,CLEAR_CREATE_JOB_RESPONSE
} from '../../../types/dashboard/admin/job/job'

const initialState = {
    /* creating job*/
    createJob: {
        name: "",
        summary: "",
        location: "",
        skills: [" "],
        body: "",
        team: "",
        all_teams: []
    },
    body: "",

    edit_job_error: "",
    edit_job_message: "",
    edit_job_status: "",

    pageLoading: false,
    status: "",
    error: "",
    message: ""
};

export default function adminJobReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CREATE_JOB_FORM:
            return Object.assign({}, state, {
                createJob: action.newState,
                body: "",
                error: "",
                message: "",
                status: ""
            });
        case CREATE_JOB_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case CREATE_JOB_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                error: action.response.data.error,
                message: action.response.data.message,
                status: 200,
                createJob: {
                    name: "",
                    summary: "",
                    location: "",
                    skills: [" "],
                    body: "",
                    team: "",
                    all_teams: state.createJob.all_teams
                }
            });
        case CREATE_JOB_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                error: true,
                message: action.response.data.message,
                status: action.response.status
            });

        case EDIT_JOB_DETAILS_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case EDIT_JOB_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                edit_job_error: action.response.data.error,
                edit_job_message: action.response.data.message,
                edit_job_status: 200
            });
        case EDIT_JOB_DETAILS_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                edit_job_error: true,
                edit_job_message: action.response.data.message,
                edit_job_status: action.response.status
            });

        case GET_JOB_DETAILS_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true,
                edit_job_error: "",
                edit_job_message: "",
                edit_job_status: ""
            });
        case GET_JOB_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                get_job_details_error: action.response.data.error,
                get_job_details_message: action.response.data.message,
                get_job_details_status: 200,
                createJob: action.response.data.error ?
                    {
                        name: state.createJob.name,
                        summary: state.createJob.summary,
                        location: state.createJob.location,
                        skills: state.createJob.skills,
                        body: state.createJob.body,
                        team: state.createJob.team,
                        all_teams: state.createJob.all_teams
                    }
                    :
                    {
                        name: action.response.data.job.name,
                        summary: action.response.data.job.summary,
                        location: action.response.data.job.location,
                        skills: action.response.data.job.skills.length === 0 ? [" "] : action.response.data.job.skills,
                        body: action.response.data.job.body,
                        team: action.response.data.job.teamName,
                        all_teams: state.createJob.all_teams
                    },
                body: action.response.data.error ? "" : action.response.data.job.body
            });
        case GET_JOB_DETAILS_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                get_job_details_error: true,
                get_job_details_message: action.response.data.message,
                get_job_details_status: action.response.status,
                createJob: {
                    name: state.createJob.name,
                    summary: state.createJob.summary,
                    location: state.createJob.location,
                    skills: state.createJob.skills,
                    body: state.createJob.body,
                    team: state.createJob.team,
                    all_teams: state.createJob.all_teams
                },
                body: ""
            });


        case CLEAR_ALL:
            return Object.assign({}, state, {
                createJob: {
                    name: "",
                    summary: "",
                    location: "",
                    skills: [" "],
                    body: "",
                    team: "",
                    all_teams: [],
                },
                edit_job_error: "",
                edit_job_message: "",
                edit_job_status: "",
                error: "",
                message: "",
                status: ""
            });
        case CLEAR_CREATE_JOB_RESPONSE:
            return Object.assign({}, state, {
                status: ""
            });
        case CLEAR_STATUS:
            return Object.assign({}, state, {
                status: "",
                message: "",
                error: "",
                edit_job_error: "",
                edit_job_message: "",
                edit_job_status: "",
            });
        default:
            return state
    }
}
