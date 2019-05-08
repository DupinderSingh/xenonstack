import {
    DRIVES_REQUEST, DRIVES_SUCCESS, DRIVES_FAILURE,
    CLEAR_ALL, CLEAR_STATUS
} from "../../../../types/dashboard/user/drives/drives-types";
import {GET_API} from "../../../../middleware/token/get-api";

const BASE_URL = process.env.REACT_APP_DRIVE_API;

export function driveList() {
    return {
        [GET_API]: {
            endpoint: BASE_URL + '/v1/user/drives',
            types: [DRIVES_REQUEST, DRIVES_SUCCESS, DRIVES_FAILURE]
        }
    }
}

export function clearAll() {
    return {type: CLEAR_ALL}
}

export function clearStatus() {
    return {type: CLEAR_STATUS}
}

