import {
    CHANGE_EMAIL_VERIFICATION_FORM,
    EMAIL_VERIFICATION_FAILURE,
    EMAIL_VERIFICATION_REQUEST,
    EMAIL_VERIFICATION_SUCCESS
} from '../../types/account/Email-verification';

const initialState = {
    emailVerificationForm: {
        verification_code_1: "",
        verification_code_2: "",
        verification_code_3: "",
        verification_code_4: "",
        verification_code_5: "",
        verification_code_6: ""
    },
    message: "",
    status: "",
    error: false,
    pageLoading: false
};

export default function emailVerifyReducer(state = initialState, action) {
    switch (action.type) {
        case EMAIL_VERIFICATION_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case EMAIL_VERIFICATION_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                message: action.response.data.message,
                error: action.response.data.error,
                status: 200
            });
        case EMAIL_VERIFICATION_FAILURE:
            console.log(action.response, "test");
            return Object.assign({}, state, {
                pageLoading: false,
                message: action.response.data.message,
                error: true,
                status: action.response.status
            });
        case CHANGE_EMAIL_VERIFICATION_FORM:
            return Object.assign({}, state, {
                emailVerificationForm: action.newState,
                message: "",
                status: "",
                error: false
            });
        default:
            return state
    }
}
