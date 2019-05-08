import {USER_FEEDBACK_FAILURE, USER_FEEDBACK_REQUEST, USER_FEEDBACK_SUCCESS,
ARCH_UNARCH_REQUEST, ARCH_UNARCH_FEEDBACK_SUCCESS, ARCH_UNARCH_FEEDBACK_FAILURE, CLEAR_ALL, CLEAR_STATUS} from "../../../types/dashboard/admin/user_feedback/user-feedback";

const initialState = {
    pageLoading: false,
    feedbacks: [],
    error: "",
    message: "",

    archUnarch_PageLoading: false,
    archUnarch_error: "",
    archUnarch_message: ""
};

export default function UserFeedbackReducer(state = initialState, action) {
    switch (action.type) {
        case USER_FEEDBACK_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true,
                archUnarch_error: "",
                archUnarch_message: ""
            });
        case USER_FEEDBACK_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                feedbacks: action.response.data.error ? [] : action.response.data.feedback,
                error: action.response.data.error,
                message: action.response.data.error ? action.response.data.message : ""
            });
        case USER_FEEDBACK_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                feedbacks: [],
                error: true,
                message: action.response.data.message
            });


        case ARCH_UNARCH_REQUEST:
            return Object.assign({}, state, {
                archUnarch_PageLoading: true
            });
        case ARCH_UNARCH_FEEDBACK_SUCCESS:
            return Object.assign({}, state, {
                archUnarch_PageLoading: false,
                archUnarch_error: action.response.data.error,
                archUnarch_message: action.response.data.message
            });
        case ARCH_UNARCH_FEEDBACK_FAILURE:
            return Object.assign({}, state, {
                archUnarch_PageLoading: false,
                archUnarch_error: true,
                archUnarch_message: action.response.data.message
            });

        case CLEAR_ALL:
          return Object.assign({}, state, {
            feedbacks: [],
            error: "",
            message: "",

            archUnarch_error: "",
            archUnarch_message: ""
          })

        case CLEAR_STATUS:
          return Object.assign({}, state, {
              archUnarch_error: "",
              archUnarch_message: ""
          })
        default:
            return state
    }
}
