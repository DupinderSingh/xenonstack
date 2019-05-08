import {
    ACTIVITIES_FAILURE,
    ACTIVITIES_REQUEST,
    ACTIVITIES_SUCCESS,
    CLEAR_ALL
} from "../../../../types/dashboard/user/activities/activities-types";
import {GET_API} from "../../../../middleware/token/get-api";

const AUTH_URL = process.env.REACT_APP_AUTH_API;

export function getActivities(portal) {
    if (portal === "/v1/apply") {
        return {
            [GET_API]: {
                endpoint: AUTH_URL + portal,
                types: [ACTIVITIES_REQUEST, ACTIVITIES_SUCCESS, ACTIVITIES_FAILURE]
            }
        }
    } else {
        return {
            [GET_API]: {
                endpoint: AUTH_URL + portal,
                types: [ACTIVITIES_REQUEST, ACTIVITIES_SUCCESS, ACTIVITIES_FAILURE]
            }
        }
    }
}

export function clearAll() {
    return {type: CLEAR_ALL}
}

