import {
    BEGIN_TEST_FAILURE,
    BEGIN_TEST_REQUEST,
    BEGIN_TEST_SUCCESS,
    CLEAR_ALL
} from "../../../types/dashboard/user/test/xenonstack-test";

const initialState = {
    beginTestError: "",
    beginTestMessage: "",
    beginTestStatus: "",
    beginTestPageLoading: false,

    testToken: "",
    testExpire: ""
};

export default function testReducer(state = initialState, action) {
    switch (action.type) {
        case BEGIN_TEST_REQUEST:
            return Object.assign({}, state, {
                beginTestPageLoading: true
            });
        case BEGIN_TEST_SUCCESS:
            if (action.response.data.error) {
                return Object.assign({}, state, {
                    beginTestPageLoading: false,
                    beginTestStatus: 200,
                    beginTestError: true,
                    beginTestMessage: action.response.data.message,
                    testToken: "",
                    testExpire: "",
                });
            } else {
                if (!!action.response.data.token && !!action.response.data.expire) {
                    return Object.assign({}, state, {
                        beginTestPageLoading: false,
                        beginTestStatus: 200,
                        beginTestError: false,
                        beginTestMessage: "",
                        testToken: action.response.data.token,
                        testExpire: action.response.data.expire,
                    });
                } else {
                    return Object.assign({}, state, {
                        beginTestPageLoading: false,
                        beginTestStatus: 200,
                        beginTestError: true,
                        beginTestMessage: action.response.data.message,
                        testToken: "",
                        testExpire: "",
                    });
                }
            }
        case BEGIN_TEST_FAILURE:
            return Object.assign({}, state, {
                beginTestPageLoading: false,
                beginTestStatus: action.response.status,
                beginTestError: true,
                beginTestMessage: action.response.data.message,
                testToken: "",
                testExpire: "",
            });
        case CLEAR_ALL:
            return Object.assign({}, state, {
                beginTestError: "",
                beginTestMessage: "",
                beginTestStatus: "",

                testToken: "",
                testExpire: ""
            });

        default:
            return state
    }
}
