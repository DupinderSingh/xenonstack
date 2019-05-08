import {
    ACTIVITIES_FAILURE,
    ACTIVITIES_REQUEST,
    ACTIVITIES_SUCCESS,
    CLEAR_ALL
} from "../../../types/dashboard/user/activities/activities-types";

const initialState = {
    activities: [],
    activitiesError: "",
    activitiesMessage: "",
    activitiesStatus: "",
    activitiesPageLoading: false
};

export default function activitiesReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIVITIES_REQUEST:
            return Object.assign({}, state, {
                activitiesPageLoading: true
            });
        case ACTIVITIES_SUCCESS:
            return Object.assign({}, state, {
                activitiesPageLoading: false,
                activitiesStatus: 200,
                activitiesError: action.response.data.error,
                activitiesMessage: action.response.data.error ? action.response.data.message : "",
                activities: action.response.data.error ? [] : action.response.data.jobs
            });
        case ACTIVITIES_FAILURE:
            return Object.assign({}, state, {
                activitiesPageLoading: false,
                activitiesStatus: action.response.status,
                activitiesError: true,
                activitiesMessage: action.response.data.message,
                activities: []
            });

        case CLEAR_ALL:
            return Object.assign({}, state, {
                activitiesStatus: "",
                activitiesError: "",
                activitiesMessage: "",
                activities: []
            });
        default:
            return state
    }
}
