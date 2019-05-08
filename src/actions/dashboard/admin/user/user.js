import {
    CLEAR_ALL, GET_ALL_USERS_FAILURE, GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_USER_DETAILS_FAILURE,
    GET_USER_DETAILS_REQUEST, GET_USER_DETAILS_SUCCESS, NEW_PAGE_NUMBER,
    DROPDOWN_FILTER_DATA_REQUEST, DROPDOWN_FILTER_DATA_SUCCESS, DROPDOWN_FILTER_DATA_FAILURE, FILTER_USER
} from "../../../../types/dashboard/admin/user/user";
import {GET_API} from "../../../../middleware/token/get-api";

const BASE_URL = process.env.REACT_APP_AUTH_API;

export function clearAll() {
    return {type: CLEAR_ALL}
}

export function dropdownFilterData() {
    return {
        [GET_API]: {
            endpoint: BASE_URL + '/v1/filterdata',
            types: [DROPDOWN_FILTER_DATA_REQUEST, DROPDOWN_FILTER_DATA_SUCCESS, DROPDOWN_FILTER_DATA_FAILURE]
        }
    }
};

export function getAllUsers(page, location, qualification, applied) {
    return {
        [GET_API]: {
            endpoint: BASE_URL + '/v1/users?page='+page+'&&location='+location+'&&qualification='+qualification+'&&applied='+applied,
            types: [GET_ALL_USERS_REQUEST, GET_ALL_USERS_SUCCESS, GET_ALL_USERS_FAILURE]
        }
    }
};

export function getUserDetails(email) {
    return {
        [GET_API]: {
            endpoint: BASE_URL + '/v1/users/' + email,
            types: [GET_USER_DETAILS_REQUEST, GET_USER_DETAILS_SUCCESS, GET_USER_DETAILS_FAILURE]
        }
    }
};

export function changePageNumber(newPageNumber, totalCount) {
    return {
        type: NEW_PAGE_NUMBER, newPageNumber, totalCount
    }
};

export function filterUser(newState) {
    console.log(newState, "newState")
    return {type: FILTER_USER, newState}
}
