import {
    BEGIN_TEST_REQUEST, BEGIN_TEST_SUCCESS, BEGIN_TEST_FAILURE, CLEAR_ALL
} from "../../../../types/dashboard/user/test/xenonstack-test";
import {GET_API} from "../../../../middleware/token/get-api";

const BASE_URL = process.env.REACT_APP_DRIVE_API;

export function beginTest(token, drive_id, test_id) {
    return {
        [GET_API]: {
            endpoint: BASE_URL + '/v1/user/drives/'+drive_id+'/'+test_id,
            types: [BEGIN_TEST_REQUEST, BEGIN_TEST_SUCCESS, BEGIN_TEST_FAILURE],
            token: token
        }
    }
}

export function clearAll() {
    return {type: CLEAR_ALL}
}