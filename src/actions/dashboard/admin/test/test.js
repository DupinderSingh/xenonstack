import {CALL_POST_API} from "../../../../middleware/token/post-api";
import {
    CHANGE_CREATE_TEST_FORM, CLEAR_ALL, CLEAR_STATUS, CREATE_TEST_FAILURE, CREATE_TEST_REQUEST,
    CREATE_TEST_SUCCESS,
    GET_TEST_REQUEST, GET_TEST_SUCCESS, GET_TEST_FAILURE,
    DELETE_TEST_REQUEST, DELETE_TEST_SUCCESS, DELETE_TEST_FAILURE,
    GET_TEST_DETAILS_REQUEST, GET_TEST_DETAILS_SUCCESS, GET_TEST_DETAILS_FAILURE,
    EDIT_TEST_DETAILS_REQUEST, EDIT_TEST_DETAILS_SUCCESS, EDIT_TEST_DETAILS_FAILURE, SELECTED_DELETE_TEST
} from "../../../../types/dashboard/admin/test/test";
import {GET_API} from "../../../../middleware/token/get-api";
import {PUT_API} from "../../../../middleware/token/put_api/put-api-with-body";
import {CALL_DELETE_API} from "../../../../middleware/token/delete/without-body";

const BASE_URL = process.env.REACT_APP_DRIVE_API;

/* ----------------------------------------------------- create test manually --------------------------------------------------------*/

export function changeCreateTestForm(newState) {
    return {type: CHANGE_CREATE_TEST_FORM, newState}
}

export function createTest(body) {
    return {
        [CALL_POST_API]: {
            endpoint: BASE_URL + '/v1/test',
            types: [CREATE_TEST_REQUEST, CREATE_TEST_SUCCESS, CREATE_TEST_FAILURE],
            body: body
        }
    }
}

/*---------------------------------------------------- get all test --------------------------------------------------------------------*/
export function getTest() {
    return {
        [GET_API]: {
            endpoint: BASE_URL + '/v1/test',
            types: [GET_TEST_REQUEST, GET_TEST_SUCCESS, GET_TEST_FAILURE]
        }
    }
}

/*---------------------------------------------------- get test details --------------------------------------------------------------------*/
export function getTestDetails(test_id) {
    return {
        [GET_API]: {
            endpoint: BASE_URL + '/v1/test/'+test_id,
            types: [GET_TEST_DETAILS_REQUEST, GET_TEST_DETAILS_SUCCESS, GET_TEST_DETAILS_FAILURE]
        }
    }
}

/*---------------------------------------------------- delete test --------------------------------------------------------------------*/

export function deleteTest(test_id) {
    return {
        [CALL_DELETE_API]: {
            endpoint: BASE_URL + '/v1/test/'+ test_id,
            types: [DELETE_TEST_REQUEST, DELETE_TEST_SUCCESS, DELETE_TEST_FAILURE]
        }
    }
}

/*---------------------------------------------------- edit test details --------------------------------------------------------------------*/

export function editTestDetails(test_id, body) {
    return {
        [PUT_API]: {
            endpoint: BASE_URL + '/v1/test/' + test_id,
            types: [EDIT_TEST_DETAILS_REQUEST, EDIT_TEST_DETAILS_SUCCESS, EDIT_TEST_DETAILS_FAILURE],
            body: JSON.stringify(body)
        }
    }
}

/*---------------------------------------------------- common --------------------------------------------------------------------*/

export function clearAll() {
    return {type: CLEAR_ALL}
}

export function clearStatus() {
    return {type: CLEAR_STATUS}
}

export function selectedDeleteTest(test) {
    return {type: SELECTED_DELETE_TEST, test}
}