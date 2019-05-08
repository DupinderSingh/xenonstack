import {
    ADD_IMAGE_FAILURE,
    ADD_IMAGE_REQUEST,
    ADD_IMAGE_SUCCESS,
    ADD_QUESTION_TO_POOL_FAILURE,
    ADD_QUESTION_TO_POOL_REQUEST,
    ADD_QUESTION_TO_POOL_SUCCESS,
    CHANGE_CREATE_POOL_FORM,
    CHANGE_OPTION,
    CHANGE_QUESTION,
    CLEAR_ALL,
    CLEAR_STATUS,
    CREATE_POOL_FAILURE,
    CREATE_POOL_REQUEST,
    CREATE_POOL_SUCCESS,
    DELETE_IMAGE_FAILURE,
    DELETE_IMAGE_REQUEST,
    DELETE_IMAGE_SUCCESS,
    DELETE_POOL_FAILURE,
    DELETE_POOL_REQUEST,
    DELETE_POOL_SUCCESS,
    DELETE_QUESTION_FAILURE,
    DELETE_QUESTION_REQUEST,
    DELETE_QUESTION_SUCCESS,
    EDIT_POOL_FAILURE,
    EDIT_POOL_REQUEST,
    EDIT_POOL_SUCCESS,
    EDIT_QUESTION_DETAILS_FAILURE,
    EDIT_QUESTION_DETAILS_REQUEST,
    EDIT_QUESTION_DETAILS_SUCCESS,
    GET_POOL_FAILURE,
    GET_POOL_REQUEST,
    GET_POOL_SUCCESS,
    GET_QUESTION_DETAILS_FAILURE,
    GET_QUESTION_DETAILS_REQUEST,
    GET_QUESTION_DETAILS_SUCCESS,
    GET_QUESTIONS_FAILURE,
    GET_QUESTIONS_REQUEST,
    GET_QUESTIONS_SUCCESS,
    UPDATE_IMAGES,
    UPLOAD_CSV_FAILURE,
    UPLOAD_CSV_REQUEST,
    UPLOAD_CSV_SUCCESS,
    SELECT_DELETE_POOL,
    CHANGE_CREATE_QUESTION_CSV_FORM
} from '../../../types/dashboard/admin/pool/pool'

const initialState = {
    /* creating pool*/
    container: {
        name: "",
        poolId: "",
        operation: ""
    },
    deletePool: {},
    pools: [], // getting all pools
    message: "",
    // pool: {}, // getting pool name and id
    isPoolDeletedMessage: "",
    isPoolEditedMessage: "",
    isPoolCreatedMessage: "",

    /*---------------------------------------add questionto pool ------------------------------------*/
    addQuestionToPoolMessage: "",

    question: {
        title: "",
        images: []
    },
    options: [
        {
            title: "",
            images: [],
            selected: false
        },
        {
            title: "",
            images: [],
            selected: false
        }
    ],

    /*add image to question / answer */
    addImageMessage: "",

    /* delete image from question / answer*/
    deleteImageMessage: "",

    /* pool questions*/

    questions: [],
    deleteQuestionMessage: "",

    editQuestionMessage: "",

    uploadCsvMessage: "",

    /*common*/
    pageLoading: false,
    status: "",
    error: false,

    createQuestionCsv: {
        csv: ""
    }
};

export default function poolReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CREATE_POOL_FORM:
            return Object.assign({}, state, {
                pool: action.newState,
                error: false,
                message: "",
                status: ""
            });
        case CREATE_POOL_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case CREATE_POOL_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                error: action.response.data.error,
                isPoolCreatedMessage: action.response.data.message,
                status: 200
            });
        case CREATE_POOL_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                error: true,
                isPoolCreatedMessage: action.response.data.message,
                status: action.response.status
            });
        case GET_POOL_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true,
                isPoolDeletedMessage: "",
                isPoolEditedMessage: "",
                isPoolCreatedMessage: ""
            });
        case GET_POOL_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                error: action.response.data.error,
                message: action.response.data.error ? action.response.data.message : "",
                status: 200,
                pools: action.response.data.error ? [] : action.response.data.pools
            });
        case GET_POOL_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                error: true,
                message: action.response.data.message,
                status: action.response.status,
                pools: []
            });
        case DELETE_POOL_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case DELETE_POOL_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                error: action.response.data.error,
                isPoolDeletedMessage: action.response.data.message,
                status: 200
            });
        case DELETE_POOL_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                error: true,
                isPoolDeletedMessage: action.response.data.message,
                status: action.response.status
            });
        case EDIT_POOL_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case EDIT_POOL_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                error: action.response.data.error,
                isPoolEditedMessage: action.response.data.message,
                status: 200
            });
        case EDIT_POOL_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                error: true,
                isPoolEditedMessage: action.response.data.message,
                status: action.response.status
            });

        /*------------------------------------------------ Adding question to pool-------------------------------------*/

        case ADD_QUESTION_TO_POOL_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case ADD_QUESTION_TO_POOL_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                error: action.response.data.error,
                addQuestionToPoolMessage: action.response.data.message,
                status: 200
            });
        case ADD_QUESTION_TO_POOL_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                error: action.response.data.error,
                addQuestionToPoolMessage: action.response.data.message,
                status: action.response.status
            });

        case CHANGE_QUESTION:
            return Object.assign({}, state, {
                question: action.newState
            });

        case CHANGE_OPTION:
            return Object.assign({}, state, {
                options: action.newState
            });

        /*------------------------------------------------- Adding image -----------------------------------------------*/

        case ADD_IMAGE_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case ADD_IMAGE_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                error: action.response.data.error,
                addImageMessage: action.response.data.message,
                status: 200
            });
        case ADD_IMAGE_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                error: action.response.data.error,
                addImageMessage: action.response.data.message,
                status: action.response.status
            });
        case UPDATE_IMAGES:
            if (action.status === "question") {
                return Object.assign({}, state, {
                    question: {
                        title: state.question.title,
                        images: action.newState
                    }
                });
            } else {
                console.log("in reducer options,", action.newState, "newstate")
                return Object.assign({}, state, {
                    options: action.newState
                });
            }

        /*--------------------------------------------- Deleting Image --------------------------------*/

        case DELETE_IMAGE_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case DELETE_IMAGE_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                error: action.response.data.error,
                deleteImageMessage: action.response.data.message,
                status: 200
            });
        case DELETE_IMAGE_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                error: action.response.data.error,
                deleteImageMessage: action.response.data.message,
                status: action.response.status
            });

        /*------------------------------------------------ get questions request ------------------------------------------------*/

        case GET_QUESTIONS_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true,
                deleteQuestionMessage: ""
            });
        case GET_QUESTIONS_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                error: action.response.data.error,
                message: action.response.data.error ? action.response.data.message : "",
                status: 200,
                questions: action.response.data.error ? [] : action.response.data.questions
            });
        case GET_QUESTIONS_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                error: true,
                message: action.response.data.message,
                status: action.response.status,
                questions: []
            });



        /*------------------------------------------------ Delete question------------------------------------------------------*/


        case DELETE_QUESTION_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case DELETE_QUESTION_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                error: action.response.data.error,
                deleteQuestionMessage: action.response.data.message,
                status: 200
            });
        case DELETE_QUESTION_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                error: true,
                deleteQuestionMessage: action.response.data.message,
                status: action.response.status
            });

        /*---------------------------------------------------------- get question details ----------------------------------------------------------------*/

        case GET_QUESTION_DETAILS_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true,
                editQuestionMessage: ""
            });

        case GET_QUESTION_DETAILS_SUCCESS:
            let updatedQuestion = {};
            let updatedOptions = [];
            if (!action.response.data.error) {
                const question = action.response.data.question;
                const questionImages = question.images;
                let updatedQuestionImages = [];
                for (let i in questionImages) {
                    updatedQuestionImages.push(questionImages[i]["url"])
                }
                updatedQuestion.title = question.title;
                updatedQuestion.images = updatedQuestionImages;
                updatedQuestion.type = question.type;

                const options = action.response.data.question.options;

                for (let i in options) {
                    const optionImages = options[i]["images"];
                    let updatedOptionImages = [];

                    for (let i in optionImages) {
                        updatedOptionImages.push(optionImages[i]["url"])
                    }
                    ;
                    updatedOptions.push({
                        title: options[i]["value"],
                        type: options[i]["type"],
                        images: updatedOptionImages,
                        selected: options[i]["is_correct"],
                    })
                }
            }
            return Object.assign({}, state, {
                pageLoading: false,
                error: action.response.data.error,
                message: action.response.data.error ? action.response.data.message : "",
                status: 200,
                question: action.response.data.error ? state.question : updatedQuestion,
                options: action.response.data.error ? state.options : updatedOptions
            });
        case GET_QUESTION_DETAILS_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                error: action.response.data.error,
                message: action.response.data.message,
                status: action.response.status,
                question: {
                    title: "",
                    images: []
                },
                options: [
                    {
                        title: "",
                        images: [],
                        selected: false
                    },
                    {
                        title: "",
                        images: [],
                        selected: false
                    }
                ]
            });

        /*-------------------------------------------------- edit question--------------------------------------------------------------*/

        case EDIT_QUESTION_DETAILS_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case EDIT_QUESTION_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                error: action.response.data.error,
                editQuestionMessage: action.response.data.message,
                status: 200
            });
        case EDIT_QUESTION_DETAILS_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                error: true,
                editQuestionMessage: action.response.data.message,
                status: action.response.status
            });


        /*----------------------------------------------------- upload questions using csv -----------------------------------------------*/

        case UPLOAD_CSV_REQUEST:
            return Object.assign({}, state, {
                pageLoading: true
            });
        case UPLOAD_CSV_SUCCESS:
            return Object.assign({}, state, {
                pageLoading: false,
                error: action.response.data.error,
                uploadCsvMessage: action.response.data.message,
                status: 200
            });
        case UPLOAD_CSV_FAILURE:
            return Object.assign({}, state, {
                pageLoading: false,
                error: true,
                uploadCsvMessage: action.response.data.message,
                status: action.response.status
            });

        /*--------------------------------------------------------------------------------------------------------------------------------*/
        case CLEAR_ALL:
            return Object.assign({}, state, {
                createQuestionCsv: {
                    csv: ""
                },
                question: {
                    title: "",
                    images: []
                },
                options: [
                    {
                        title: "",
                        images: [],
                        selected: false
                    },
                    {
                        title: "",
                        images: [],
                        selected: false
                    }
                ],
                container: {
                    name: "",
                    poolId: "",
                    operation: "create"
                },
                pools: [],
                error: false,
                message: "",
                status: "",
                isPoolDeletedMessage: "",
                isPoolEditedMessage: "",
                isPoolCreatedMessage: "",
                deleteQuestionMessage: "",

                questions: []
            });
        case CLEAR_STATUS:
            return Object.assign({}, state, {
                status: "",
                isPoolDeletedMessage: "",
                isPoolEditedMessage: "",
                isPoolCreatedMessage: "",

                addImageMessage: "",
                deleteImageMessage: "",
                addQuestionToPoolMessage: "",

                deleteQuestionMessage: "",

                editQuestionMessage: "",

                uploadCsvMessage: ""
            });
        case SELECT_DELETE_POOL:
            return Object.assign({}, state, {
                deletePool: action.pool
            });

        case CHANGE_CREATE_QUESTION_CSV_FORM:
            return Object.assign({}, state, {
                createQuestionCsv: action.newState
            });
        default:
            return state
    }
}
