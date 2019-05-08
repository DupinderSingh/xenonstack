import {
    WEBSOCKET_LOADING,
    ASSIGN_USER_CSV_FAILURE,
    ASSIGN_USER_CSV_REQUEST,
    ASSIGN_USER_CSV_SUCCESS,
    ASSIGN_USER_MANUALLY_FAILURE,
    ASSIGN_USER_MANUALLY_REQUEST,
    ASSIGN_USER_MANUALLY_SUCCESS,
    CHANGE_ASSIGN_USER_CSV_FORM,
    CHANGE_ASSIGN_USER_MANUALLY_FORM,
    CHANGE_CREATE_DRIVE_FORM,
    CLEAR,
    CLEAR_ALL,
    CREATE_DRIVE_FAILURE,
    CREATE_DRIVE_REQUEST,
    CREATE_DRIVE_SUCCESS,
    DELETE_DRIVE_FAILURE,
    DELETE_DRIVE_REQUEST,
    DELETE_DRIVE_SUCCESS,
    DELETE_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    EDIT_DRIVE_DETAILS_FAILURE,
    EDIT_DRIVE_DETAILS_REQUEST,
    EDIT_DRIVE_DETAILS_SUCCESS,
    GET_DRIVE_DETAILS_FAILURE,
    GET_DRIVE_DETAILS_REQUEST,
    GET_DRIVE_DETAILS_SUCCESS,
    GET_DRIVE_FAILURE,
    GET_DRIVE_REQUEST,
    GET_DRIVE_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_SCORE_REQUEST,
    GET_USER_SCORE_SUCCESS,
    GET_USER_SCORE_FAILURE,
    SELECTED_DELETE_DRIVE,
    SELECTED_DELETE_USER
} from "../../../../types/dashboard/admin/drive/drive";
import {GET_API} from "../../../../middleware/token/get-api";
import {CALL_DELETE_API} from "../../../../middleware/token/delete/without-body";
import {CALL_POST_API} from "../../../../middleware/token/post-api";
import {PUT_API} from "../../../../middleware/token/put_api/put-api-with-body";
import {logout} from "../../../account/login-actions";

const BASE_URL = process.env.REACT_APP_DRIVE_API;

/* ----------------------------------------------------- create drive manually --------------------------------------------------------*/

export function changeCreateDriveForm(newState) {
    return {type: CHANGE_CREATE_DRIVE_FORM, newState}
}

export function createDrive(body) {
    return {
        [CALL_POST_API]: {
            endpoint: BASE_URL + '/v1/drive',
            types: [CREATE_DRIVE_REQUEST, CREATE_DRIVE_SUCCESS, CREATE_DRIVE_FAILURE],
            body: body
        }
    }
}

/*---------------------------------------------------- get drive test --------------------------------------------------------------------*/
export function getDrive(status) {
    return {
        [GET_API]: {
            endpoint: BASE_URL + '/v1/drive?value=' + status,
            types: [GET_DRIVE_REQUEST, GET_DRIVE_SUCCESS, GET_DRIVE_FAILURE]
        }
    }
}

/*---------------------------------------------------- get drive details --------------------------------------------------------------------*/
export function getDriveDetails(drive_id) {
    return {
        [GET_API]: {
            endpoint: BASE_URL + '/v1/drive/' + drive_id,
            types: [GET_DRIVE_DETAILS_REQUEST, GET_DRIVE_DETAILS_SUCCESS, GET_DRIVE_DETAILS_FAILURE]
        }
    }
}

/*---------------------------------------------------- delete drive --------------------------------------------------------------------*/

export function deleteDrive(drive_id) {
    return {
        [CALL_DELETE_API]: {
            endpoint: BASE_URL + '/v1/drive/' + drive_id,
            types: [DELETE_DRIVE_REQUEST, DELETE_DRIVE_SUCCESS, DELETE_DRIVE_FAILURE]
        }
    }
}

/*---------------------------------------------------- edit drive details --------------------------------------------------------------------*/

export function editDriveDetails(drive_id, body) {
    return {
        [PUT_API]: {
            endpoint: BASE_URL + '/v1/drive/' + drive_id,
            types: [EDIT_DRIVE_DETAILS_REQUEST, EDIT_DRIVE_DETAILS_SUCCESS, EDIT_DRIVE_DETAILS_FAILURE],
            body: JSON.stringify(body)
        }
    }
}

/*--------------------------------------------------- assign user to drive(manually) -------------------------------------------------------------------*/


export function changeAssignUserManuallyForm(newState) {
    return {type: CHANGE_ASSIGN_USER_MANUALLY_FORM, newState}
}

export function assignUserManually(drive_id, body) {
    return {
        [CALL_POST_API]: {
            endpoint: BASE_URL + '/v1/drive/' + drive_id + '/user',
            types: [ASSIGN_USER_MANUALLY_REQUEST, ASSIGN_USER_MANUALLY_SUCCESS, ASSIGN_USER_MANUALLY_FAILURE],
            body: body
        }
    }
}

/*--------------------------------------------------- assign user to drive(csv) -------------------------------------------------------------------*/


export function changeAssignUserCsvForm(newState) {
    return {type: CHANGE_ASSIGN_USER_CSV_FORM, newState}
}

export function assignUserCsvRequest() {
    return {type: ASSIGN_USER_CSV_REQUEST}
}

export function assignUserCsvSuccess(response) {
    return {type: ASSIGN_USER_CSV_SUCCESS, response}
}

export function assignUserCsvFailure(response) {
    return {type: ASSIGN_USER_CSV_FAILURE, response}
}

export function assignUserCsv(file, drive_id) {
    let formData = new FormData();
    formData.append('users', file);
    let status = "";
    const config = {
        method: "POST",
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
        body: formData
    };
    return dispatch => {
        dispatch(assignUserCsvRequest());
        fetch(BASE_URL + '/v1/drive/' + drive_id + '/csv_user', config)
            .then(function (res) {
                status = res.status;
                return res.json()
            })
            .then(function (res) {
                    if (status === 200) {
                        dispatch(assignUserCsvSuccess({data: {error: res.error, message: res.message}, status: 200}));
                    } else {
                        if (status === 401) {
                            dispatch(logout())
                        } else {
                            dispatch(assignUserCsvFailure({data: {error: true, message: res.message}, status: status}))
                        }
                    }
                },
                function () {
                    dispatch(assignUserCsvFailure({
                        data: {message: "Error while uploading users", error: true},
                        status: 500
                    }))
                })
    }
}


/*---------------------------------------------------- get user --------------------------------------------------------------------*/
// export function getUser(drive_id) {
//     return {
//         [GET_API]: {
//             endpoint: BASE_URL + '/v1/drive/' + drive_id + '/user',
//             types: [GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE]
//         }
//     }
// }


export function getUserRequest() {
    return {type: GET_USER_REQUEST}
}


export function getUserSuccess(response) {
    return {type: GET_USER_SUCCESS, response}
}


export function getUserFailure(response) {
    return {type: GET_USER_FAILURE, response}
}


export function getUserScoreRequest() {
    return {type: GET_USER_SCORE_REQUEST}
}


export function getUserScoreSuccess(response) {
    return {type: GET_USER_SCORE_SUCCESS, response}
}


export function getUserScoreFailure(response) {
    return {type: GET_USER_SCORE_FAILURE, response}
}

/*---------------------------------------------------- delete user --------------------------------------------------------------------*/

export function deleteUser(drive_id, uid, email) {
    return {
        [CALL_DELETE_API]: {
            endpoint: BASE_URL + '/v1/drive/' + drive_id + '/user/' + email,
            types: [DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE]
        }
    }
}


/*---------------------------------------------------- common --------------------------------------------------------------------*/

export function clearAll() {
    return {type: CLEAR_ALL}
}

export function clear() {
    return {type: CLEAR}
}
//
// export function websocketLoading(status) {
//     return {type: WEBSOCKET_LOADING, status}
// }

export function selectedDeleteDrive(drive) {
    return {type: SELECTED_DELETE_DRIVE, drive}
}

export function selectedDeleteUser(user) {
    return {type: SELECTED_DELETE_USER, user}
}