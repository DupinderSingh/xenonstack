import {CALL_POST_API} from "../../../../middleware/token/post-api";
import {
    CHANGE_CREATE_COLLEGE_FORM, CLEAR_ALL, CLEAR_STATUS, CREATE_COLLEGE_CSV_FAILURE, CREATE_COLLEGE_CSV_REQUEST,
    CREATE_COLLEGE_CSV_SUCCESS, CREATE_COLLEGE_FAILURE, CREATE_COLLEGE_REQUEST, CREATE_COLLEGE_SUCCESS,
    GET_COLLEGE_FAILURE, GET_COLLEGE_REQUEST, GET_COLLEGE_SUCCESS, CHANGE_CREATE_COLLEGE_CSV_FORM,
    DELETE_COLLEGE_REQUEST, DELETE_COLLEGE_SUCCESS, DELETE_COLLEGE_FAILURE,
    GET_COLLEGE_DETAILS_REQUEST, GET_COLLEGE_DETAILS_SUCCESS, GET_COLLEGE_DETAILS_FAILURE,
    EDIT_COLLEGE_DETAILS_REQUEST, EDIT_COLLEGE_DETAILS_SUCCESS, EDIT_COLLEGE_DETAILS_FAILURE, COLLEGE_LOADING,
    SELECTED_DELETE_COLLEGE
} from "../../../../types/dashboard/admin/college/college";
import {GET_API} from "../../../../middleware/token/get-api";
import {logout} from "../../../account/login-actions";
import {CALL_DELETE_API} from "../../../../middleware/token/delete/without-body";
import {PUT_API} from "../../../../middleware/token/put_api/put-api-with-body";

const BASE_URL = process.env.REACT_APP_DRIVE_API;

export function changeCreateCollegeForm(newState) {
    return {type: CHANGE_CREATE_COLLEGE_FORM, newState}
}

export function createCollege(body) {
    return {
        [CALL_POST_API]: {
            endpoint: BASE_URL + '/v1/college',
            types: [CREATE_COLLEGE_REQUEST, CREATE_COLLEGE_SUCCESS, CREATE_COLLEGE_FAILURE],
            body: body
        }
    }
}

export function clearAll() {
    return {type: CLEAR_ALL}
}

export function clearStatus() {
    return {type: CLEAR_STATUS}
}

export function getCollege() {
    return {
        [GET_API]: {
            endpoint: BASE_URL + '/v1/college',
            types: [GET_COLLEGE_REQUEST, GET_COLLEGE_SUCCESS, GET_COLLEGE_FAILURE]
        }
    }
}

export function getCollegeDetails(college_id) {
    return {
        [GET_API]: {
            endpoint: BASE_URL + '/v1/college/'+college_id,
            types: [GET_COLLEGE_DETAILS_REQUEST, GET_COLLEGE_DETAILS_SUCCESS, GET_COLLEGE_DETAILS_FAILURE]
        }
    }
}

export function deleteCollege(college_id) {
    return {
        [CALL_DELETE_API]: {
            endpoint: BASE_URL + '/v1/college/'+ college_id,
            types: [DELETE_COLLEGE_REQUEST, DELETE_COLLEGE_SUCCESS, DELETE_COLLEGE_FAILURE]
        }
    }
}

export function editCollegeDetails(college_id, body) {

    return {
        [PUT_API]: {
            endpoint: BASE_URL + '/v1/college/' + college_id,
            types: [EDIT_COLLEGE_DETAILS_REQUEST, EDIT_COLLEGE_DETAILS_SUCCESS, EDIT_COLLEGE_DETAILS_FAILURE],
            body: JSON.stringify(body)
        }
    }
}


/*----------------------------------------------------- add csv file to upload colleges---------------------------------------------------------------*/

export function changeCreateCollegeCsvForm(newState) {
    return {type: CHANGE_CREATE_COLLEGE_CSV_FORM, newState}
}

export function createCollegeCsvRequest() {
    return {type: CREATE_COLLEGE_CSV_REQUEST}
}

export function createCollegeCsvSuccess(response) {
    return {type: CREATE_COLLEGE_CSV_SUCCESS, response}
}

export function createCollegeCsvFailure(response) {
    return {type: CREATE_COLLEGE_CSV_FAILURE, response}
}

export function uploadCollegeCsv(file) {
    let formData = new FormData();
    formData.append('colleges', file);
    let status = "";
    const config = {
        method: "POST",
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
        body: formData
    };
    return dispatch => {
        dispatch(createCollegeCsvRequest());
        fetch(BASE_URL + '/v1/csv_college', config)
            .then(function (res) {
                status = res.status;
                return res.json()
            })
            .then(function (res) {
                    if (status === 200) {
                        dispatch(createCollegeCsvSuccess({data: {error: res.error, message: res.message}, status: 200}));
                    }
                    else {
                        if (status === 401) {
                            dispatch(logout())
                        }
                        else {
                            dispatch(createCollegeCsvFailure({data: {error: true, message: res.message}, status: status}))
                        }
                    }
                },
                function () {
                    dispatch(createCollegeCsvFailure({
                        data: {message: "Error while uploading colleges", error: true},
                        status: 500
                    }))
                })
    }
}

export function selectedDeleteCollege(college) {
    return {type: SELECTED_DELETE_COLLEGE, college}
}