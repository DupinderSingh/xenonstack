import {
    SEND_FEEDBACK_FAILURE, SEND_FEEDBACK_REQUEST,
    SEND_FEEDBACK_SUCCESS, CHANGE_FEEDBACK_FORM
} from "../../../types/dashboard/user/feedback/send-feedback-types";

const initialState = {
    feedback: {
        comment: ""
    },
    error: "",
    message: "",
    status: "",
    pageLoading: false
};
export default function feedbackReducer(state = initialState, action) {
    switch(action.type) {
        case SEND_FEEDBACK_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case SEND_FEEDBACK_SUCCESS:
            if (action.response.data.error === false) {
                return Object.assign({}, state, {
                    pageLoading: false,
                    status: 200,
                    error: false,
                    message: action.response.data.message,
                    feedback: {
                        comment: ""
                    }
                });
            }
            else {
                return Object.assign({}, state, {
                    pageLoading: false,
                    status: 200,
                    error: true,
                    message: action.response.data.message
                });
            }
        case SEND_FEEDBACK_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                status: action.response.status,
                error: action.response.data.error,
                message: action.response.data.message
            });
        case CHANGE_FEEDBACK_FORM:
            return Object.assign({}, state, {
                feedback: action.newState,
                error: "",
                message: "",
                status: ""
            });
        default:
            return state
    }
}
