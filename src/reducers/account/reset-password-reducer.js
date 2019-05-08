import {RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE, CHANGE_RESET_PASSWORD_FORM, RESET_RESET_PASSWORD_FORM} from '../../types/account/Reset-password';

const initialState = {
    resetPasswordForm: {
        password: "",
        confirmPassword: "",
        state: "reset"
    },
    message: "",
    status: "",
    error: false,
    pageLoading: false
};

export default function resetPasswordReducer(state=initialState, action) {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case RESET_PASSWORD_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                message: action.response.data.message,
                error: action.response.data.error,
                status: 200
            });
        case RESET_PASSWORD_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                message: action.response.data.message,
                error: true,
                status: action.response.status
            });
        case RESET_RESET_PASSWORD_FORM:
            return Object.assign({}, state, {
                resetPasswordForm: {
                    password: "",
                    confirmPassword: "",
                    state: "reset"
                },
                status: ""
            });
        case CHANGE_RESET_PASSWORD_FORM:
            return Object.assign({}, state, {
                resetPasswordForm: action.newState,
                message: "",
                status: "",
                error: false
            });
        default:
            return state
    }
}