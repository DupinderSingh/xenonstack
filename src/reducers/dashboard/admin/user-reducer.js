import {
    CLEAR_ALL,
    DROPDOWN_FILTER_DATA_FAILURE,
    DROPDOWN_FILTER_DATA_REQUEST,
    DROPDOWN_FILTER_DATA_SUCCESS,
    FILTER_USER,
    GET_ALL_USERS_FAILURE,
    GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_SUCCESS,
    GET_USER_DETAILS_FAILURE,
    GET_USER_DETAILS_REQUEST,
    GET_USER_DETAILS_SUCCESS,
    NEW_PAGE_NUMBER
} from '../../../types/dashboard/admin/user/user';

const initialState = {
    pageLoading: false,
    getAllUsersMessage: "",
    getAllUsersError: "",
    getAllUsersStatus: "",
    allUsers: [],
    getUserDetailsError: "",
    getUserDetailsMessage: "",
    getUserDetailsStatus: "",
    userDetails: {},
    userActivePage: 1,
    itemPerPage: 10,

    all_records_count: 0,
    loca: "",
    qual: "",
    appl: "",
    locations: [],
    qualifications: [],
    applied: []
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_USERS_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case GET_ALL_USERS_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                getAllUsersError: action.response.data.error,
                getAllUsersMessage: action.response.data.error ? action.response.data.message : "",
                getAllUsersStatus: 200,
                allUsers: action.response.data.error ? [] : action.response.data.candidates,
                all_records_count: action.response.data.error ? 0 : action.response.data.total
            });
        case GET_ALL_USERS_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                getAllUsersError: true,
                getAllUsersMessage: action.response.data.message,
                getAllUsersStatus: action.response.status,
                allUsers: [],
                all_records_count: 0
            });

        case GET_USER_DETAILS_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });

        case GET_USER_DETAILS_SUCCESS:
            console.log(action.response.data, "success, candidate details.....")
            return Object.assign({}, state, {
                pageLoading: false,
                getUserDetailsError: action.response.data.error,
                getUserDetailsMessage: action.response.data.error ? action.response.data.message : "",
                getUserDetailsStatus: 200,
                userDetails: action.response.data.error ? {} : action.response.data
            });
        case GET_USER_DETAILS_FAILURE:
            console.log(action.response.data, "failure, candidate details.....")
            return Object.assign({}, state, {
                pageLoading: false,
                getUserDetailsError: true,
                getUserDetailsMessage: action.response.data.message,
                getUserDetailsStatus: action.response.status,
                userDetails: {}
            });
        case CLEAR_ALL:
            return Object.assign({}, state, {
                getAllUsersMessage: "",
                getAllUsersError: "",
                getAllUsersStatus: "",
                allUsers: [],

                loca: "",
                qual: "",
                appl: "",
                locations: [],
                qualifications: [],
                applied: [],
            });
        case NEW_PAGE_NUMBER:
            return Object.assign({}, state, {
                userActivePage: action.newPageNumber,
                all_records_count: action.totalCount
            });

        /*------------------------------------------------------------------------ candidate filter -----------------------------------------------------------*/

        case DROPDOWN_FILTER_DATA_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case DROPDOWN_FILTER_DATA_SUCCESS:
            console.log(action.response.data, "data.....")
            return Object.assign({}, state, {
                pageLoading: false,
                locations: action.response.data.error ? [] : action.response.data.location,
                qualifications: action.response.data.error ? [] : action.response.data.qualification,
                applied: action.response.data.error ? [] : action.response.data.jobs
            });
        case DROPDOWN_FILTER_DATA_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                locations: [],
                qualifications: [],
                applied: []
            });

        case FILTER_USER:
            console.log(action.newState, "fiilter user state")
            return Object.assign({}, state, {
                loca: action.newState.loca,
                qual: action.newState.qual,
                appl: action.newState.appl
            });

        // case VIEW_TENANTS_TOTAL_LENGTH:
        //     return Object.assign({}, state, {
        //         all_records_count: action.totalLength
        //     });
        default:
            return state
    }
}