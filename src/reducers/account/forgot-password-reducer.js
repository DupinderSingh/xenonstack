import {FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE, CHANGE_FORGOT_PASSWORD_FORM, CLEAR_API_ERROR_MESSAGE, RESET_FORGOT_PASSWORD_FORM} from '../../types/account/Forgot-Password';

const initialState = {
    forgotPasswordForm: {
        email: "",
        state: "forgot"
    },
    message: "",
    status: "",
    error: false,
    pageLoading: false
};

export default function forgotPasswordReducer(state=initialState, action) {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case FORGOT_PASSWORD_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                message: action.response.data.message,
                error: action.response.data.error,
                status: 200
            });
        case FORGOT_PASSWORD_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                message: action.response.data.message,
                error: true,
                status: action.response.status
            });
        case CHANGE_FORGOT_PASSWORD_FORM:
            return Object.assign({}, state, {
                forgotPasswordForm: action.newState,
                message: "",
                status: "",
                error: false
            });
        case RESET_FORGOT_PASSWORD_FORM:
            return Object.assign({}, state, {
                forgotPasswordForm: {
                    email: "",
                    state: "forgot"
                },
                status: ""
            });
        case CLEAR_API_ERROR_MESSAGE:
            return Object.assign({}, state, {
                message: "",
                status: "",
                error: false,
            });
        default:
            return state
    }
}