import {
    CHANGE_CREATE_TEAM_FORM, CLEAR_ALL, CLEAR_EDIT_TEAM_DETAILS_RESPONSE, CLEAR_TEAMS, CREATE_TEAM_FAILURE,
    CREATE_TEAM_REQUEST, CREATE_TEAM_SUCCESS, EDIT_TEAM_DETAILS_FAILURE, EDIT_TEAM_DETAILS_REQUEST,
    EDIT_TEAM_DETAILS_SUCCESS, GET_TEAM_DETAILS_FAILURE, GET_TEAM_DETAILS_REQUEST, GET_TEAM_DETAILS_SUCCESS,
    GET_TEAMS_FAILURE, GET_TEAMS_REQUEST, GET_TEAMS_SUCCESS,
    DELETE_TEAM_REQUEST, DELETE_TEAM_SUCCESS, DELETE_TEAM_FAILURE,CLEAR_STATUS, SELECTED_DELETE_TEAM
} from "../../../../types/dashboard/admin/team/team";
import {CALL_POST_API} from "../../../../middleware/token/post-api";
import {GET_API} from "../../../../middleware/token/get-api";
import {PUT_API} from "../../../../middleware/token/put_api/put-api-with-body";
import {CALL_DELETE_API} from "../../../../middleware/token/delete/without-body";

const BASE_URL = process.env.REACT_APP_DRIVE_API;

// create TEAM

export function changeCreateTeamForm(newState) {
    return {type: CHANGE_CREATE_TEAM_FORM, newState}
}

export function createTeam(body) {
    return {
        [CALL_POST_API]: {
            endpoint: BASE_URL + '/v1/teamjob',
            types: [CREATE_TEAM_REQUEST, CREATE_TEAM_SUCCESS, CREATE_TEAM_FAILURE],
            body: body
        }
    }
}

export function getTeamDetails(team) {
    return {
        [GET_API]: {
            endpoint: BASE_URL + '/v1/teamjob/' + team,
            types: [GET_TEAM_DETAILS_REQUEST, GET_TEAM_DETAILS_SUCCESS, GET_TEAM_DETAILS_FAILURE]
        }
    }
}

export function editTeamDetails(team, body) {
    return {
        [PUT_API]: {
            endpoint: BASE_URL + '/v1/teamjob/' + team,
            types: [EDIT_TEAM_DETAILS_REQUEST, EDIT_TEAM_DETAILS_SUCCESS, EDIT_TEAM_DETAILS_FAILURE],
            body: JSON.stringify(body)
        }
    }
}

export function clearEditTeamDetailsResponse() {
    return {
        type: CLEAR_EDIT_TEAM_DETAILS_RESPONSE
    }
}

export function clear_get_teams() {
    return {type: CLEAR_TEAMS}
}

export function deleteTeam(team) {
    return {
        [CALL_DELETE_API]: {
            endpoint: BASE_URL + '/v1/teamjob/' + team,
            types: [DELETE_TEAM_REQUEST, DELETE_TEAM_SUCCESS, DELETE_TEAM_FAILURE],
        }
    }
}

export function getTeams() {
    return {
        [GET_API]: {
            endpoint: BASE_URL + '/v1/teamjob',
            types: [GET_TEAMS_REQUEST, GET_TEAMS_SUCCESS, GET_TEAMS_FAILURE]
        }
    }
}

export function clearAll() {
    return {type: CLEAR_ALL}
}

export function clearStatus() {
    return {type: CLEAR_STATUS}
}

//
// {
//     "error": false,
//     "team": {
//     "Id": "software-and-service",
//         "Name": "Software and service",
//         "Description": "aoftware and service teammmmm"
// }
// }

// /v1/teamjob/:id

// export function clearStatus() {
//     return {type: CLEAR_STATUS}
// }


export function selectedDeleteTeam(team) {
    return {type: SELECTED_DELETE_TEAM, team}
}