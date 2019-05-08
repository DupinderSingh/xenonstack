import {
    CHANGE_EMAIL_REGISTER_FORM,
    CHANGE_LOGIN_FORM,
    CHANGE_USER_NAME,
    CLEAR_API_ERROR_MESSAGE,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_ACCOUNT_FAILURE,
    LOGOUT_ACCOUNT_REQUEST,
    LOGOUT_ACCOUNT_SUCCESS,
    LOGOUT_SUCCESS,
    REFRESH_TOKEN_FAILURE,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS
} from '../../types/account/Login';

const initialState = {
    auth: {
        isAuthenticated: localStorage.getItem("token") ? true : false,
        sys_role: localStorage.getItem("sys_role") ? localStorage.getItem("sys_role") : ""
    },
    loginForm: {
        email: '',
        password: ''
    },
    emailRegisterForm: {
        emailAddress: ""
    },
    loginPageLoading: false,
    message: "",
    logoutPageLoading: false,
    logoutMe: "",
    status: "",
    error: "",
    userName: localStorage.getItem("name")
};

export default function LoginReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_LOGIN_FORM:
            return Object.assign({}, state, {
                loginForm: action.newState,
                status: "",
                message: ""
            });
        case CHANGE_EMAIL_REGISTER_FORM:
            return Object.assign({}, state, {
                emailRegisterForm: action.newState
            });
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                loginPageLoading: true
            });
        case LOGIN_SUCCESS:
            if (action.response.data.error) {
                return Object.assign({}, state, {
                    loginPageLoading: false,
                    message: action.response.data.message,
                    status: action.response.status,
                    error: true
                });
            } else {
                if (!!action.response.data.token && !!action.response.data.expire && !!action.response.data.sys_role) {
                    localStorage.setItem("name", !!action.response.data.name ? action.response.data.name : "");
                    localStorage.setItem("token", action.response.data.token);
                    localStorage.setItem("expire", action.response.data.expire);
                    localStorage.setItem("sys_role", action.response.data.sys_role);
                    return Object.assign({}, state, {
                        loginPageLoading: false,
                        auth: {
                            isAuthenticated: true,
                            sys_role: action.response.data.sys_role
                        },
                        status: 200,
                        loginForm: {email: "", password: ""},
                        error: false,
                        userName: !!action.response.data.name ? action.response.data.name : ""
                    });
                } else {
                    return Object.assign({}, state, {
                        loginPageLoading: false,
                        auth: {
                            isAuthenticated: false,
                            sys_role: ""
                        },
                        status: 200,
                        loginForm: {email: "", password: ""},
                        error: false
                    });
                }
            }
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                loginPageLoading: false,
                message: action.response.data.message,
                status: action.response.status,
                error: true
            });
        case CLEAR_API_ERROR_MESSAGE:
            return Object.assign({}, state, {
                loginPageLoading: false,
                logoutMe: "",
                status: "",
                message: "",
                error: ""
            });

        // for force logout the account in case of user playing with app storage, unauthorized......

        case LOGOUT_SUCCESS:
            localStorage.clear();
            sessionStorage.clear();
            return Object.assign({}, state, {
                auth: {
                    isAuthenticated: false,
                    sys_role: ""
                }
            });

        // for logging out the account

        case LOGOUT_ACCOUNT_REQUEST:
            return Object.assign({}, state, {
                logoutPageLoading: true
            });

        case LOGOUT_ACCOUNT_SUCCESS:
            return Object.assign({}, state, {
                logoutPageLoading: false,
                logoutMe: !action.response.data.error
            });
        case LOGOUT_ACCOUNT_FAILURE:
            return Object.assign({}, state, {
                logoutPageLoading: false,
                logoutMe: false
            });

        /* --------------------------------------------- refresh token --------------------------------------------------*/

        case REFRESH_TOKEN_REQUEST:
            return Object.assign({}, state, {
                loginPageLoading: true
            })
        case REFRESH_TOKEN_SUCCESS:
            console.log(action.response.data, "action.response....");
            if (!action.response.error) {
                if (!!action.response.data.token && !!action.response.data.expire && !!action.response.data.sys_role) {
                    localStorage.setItem("name", !!action.response.data.name ? action.response.data.name : "");
                    localStorage.setItem("token", action.response.data.token);
                    localStorage.setItem("expire", action.response.data.expire);
                    localStorage.setItem("sys_role", action.response.data.sys_role);
                    return Object.assign({}, state, {
                        auth: {
                            isAuthenticated: true,
                            sys_role: action.response.data.sys_role
                        }
                    });
                } else {
                    return Object.assign({}, state, {
                        loginPageLoading: false
                    })
                }
            } else {
                return Object.assign({}, state, {
                    loginPageLoading: false
                })
            }
        case REFRESH_TOKEN_FAILURE:
            return Object.assign({}, state, {
                loginPageLoading: false
            })

        /* ---------------------------------------------------------------------------------------------------------------------*/

        case CHANGE_USER_NAME:
            return Object.assign({}, state, {
                userName: action.name
            })
        default:
            return state
    }
}
