import {
    CHANGE_CREATE_TEAM_FORM, CLEAR_ALL, CLEAR_EDIT_TEAM_DETAILS_RESPONSE, CLEAR_STATUS, CLEAR_TEAMS,
    CREATE_TEAM_FAILURE, CREATE_TEAM_REQUEST, CREATE_TEAM_SUCCESS, EDIT_TEAM_DETAILS_FAILURE, EDIT_TEAM_DETAILS_REQUEST,
    EDIT_TEAM_DETAILS_SUCCESS, GET_TEAM_DETAILS_FAILURE, GET_TEAM_DETAILS_REQUEST, GET_TEAM_DETAILS_SUCCESS,
    GET_TEAMS_FAILURE, GET_TEAMS_REQUEST, GET_TEAMS_SUCCESS,
    DELETE_TEAM_REQUEST, DELETE_TEAM_SUCCESS, DELETE_TEAM_FAILURE,CLEAR_DELETE_TEAM_RESPONSE, SELECTED_DELETE_TEAM
} from '../../../types/dashboard/admin/team/team'

const initialState = {
    /* creating TEAM*/
    createTeam: {
        name: "",
        description: ""
    },


    get_teams_status: "",
    get_teams_error: "",
    get_teams_message: "",
    get_teams: [],


    team_details_status: "",
    team_details_error: "",
    team_details_message: "",


    edit_team_details_status: "",
    edit_team_details_error: "",
    edit_team_details_message: "",

    delete_team_error: "",
    delete_team_message: "",
    delete_team_status: "",

    pageLoading: false,
    status: "",
    error: "",
    message: "",

    deleteTeam: ""
};

export default function adminTeamReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CREATE_TEAM_FORM:
            return Object.assign({}, state, {
                createTeam: action.newState,
                error: "",
                message: "",
                status: ""
            });
        case CREATE_TEAM_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case CREATE_TEAM_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                error: action.response.data.error,
                message: action.response.data.message,
                status: 200,
                createTeam: action.response.data.error ? state.createTeam : {
                    name: "",
                    description: ""
                }
            });
        case CREATE_TEAM_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                error: true,
                message: action.response.data.message,
                status: action.response.status
            });


        case GET_TEAMS_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true,
                delete_team_error: "",
                delete_team_message: "",
                delete_team_status: "",
                edit_team_details_status: "",
                edit_team_details_error: "",
                edit_team_details_message: ""
            });
        case GET_TEAMS_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                get_teams_status: 200,
                get_teams_error: action.response.data.error,
                get_teams_message: action.response.data.error ? action.response.data.message : "",
                get_teams: action.response.data.error ? [] : action.response.data.teams
            });
        case GET_TEAMS_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                get_teams_status: action.response.status,
                get_teams_error: true,
                get_teams_message: action.response.data.message,
                get_teams: []
            });


        case GET_TEAM_DETAILS_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true,
                edit_team_details_status: "",
                edit_team_details_error: "",
                edit_team_details_message: ""
            });
        case GET_TEAM_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                team_details_status: 200,
                team_details_error: action.response.data.error,
                team_details_message: action.response.data.error ? action.response.data.message : "",
                createTeam: action.response.data.error ? {
                    name: "",
                    description: ""
                } : Object.assign(action.response.data.team, {name: action.response.data.team.Name}, {description: action.response.data.team.Description})
            });
        case GET_TEAM_DETAILS_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                team_details_status: action.response.status,
                team_details_error: true,
                team_details_message: action.response.data.message,
                createTeam: {name: "", description: ""}
            });


        case EDIT_TEAM_DETAILS_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case EDIT_TEAM_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                edit_team_details_error: action.response.data.error,
                edit_team_details_message: action.response.data.message,
                edit_team_details_status: 200,
                createTeam: action.response.data.error ? state.createTeam : {
                    name: "",
                    description: ""
                }
            });
        case EDIT_TEAM_DETAILS_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                edit_team_details_error: true,
                edit_team_details_message: action.response.data.message,
                edit_team_details_status: action.response.status
            });


        case DELETE_TEAM_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case DELETE_TEAM_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                delete_team_error: action.response.data.error,
                delete_team_message: action.response.data.message,
                delete_team_status: 200
            });
        case DELETE_TEAM_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                delete_team_error: true,
                delete_team_message: action.response.data.message,
                delete_team_status: action.response.status
            });

        case CLEAR_EDIT_TEAM_DETAILS_RESPONSE:
            return Object.assign({}, state, {
                edit_team_details_error: "",
                edit_team_details_message: "",
                edit_team_details_status: "",

                error: "",
                message: "",
                status: ""
            });

        case CLEAR_DELETE_TEAM_RESPONSE:
            return Object.assign({}, state, {
                delete_team_error: "",
                delete_team_message: "",
                delete_team_status: ""
            });


        case CLEAR_ALL:
            return Object.assign({}, state, {
                createTeam: {
                    name: "",
                    description: ""
                },

                get_teams_status: "",
                get_teams_error: "",
                get_teams_message: "",
                get_teams: [],


                team_details_status: "",
                team_details_error: "",
                team_details_message: "",


                edit_team_details_status: "",
                edit_team_details_error: "",
                edit_team_details_message: "",

                delete_team_error: "",
                delete_team_message: "",
                delete_team_status: "",

                error: "",
                message: "",
                status: ""
            });
        case CLEAR_STATUS:
            return Object.assign({}, state, {
                status: "",
                delete_team_error: "",
                delete_team_message: "",
                delete_team_status: ""
            });
        case CLEAR_TEAMS:
            return Object.assign({}, state, {
                get_teams: []
            });

        case SELECTED_DELETE_TEAM:
            return Object.assign({}, state, {
                deleteTeam: action.team
            });

        default:
            return state
    }
}
