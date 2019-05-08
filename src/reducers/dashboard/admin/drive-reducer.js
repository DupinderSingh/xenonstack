import {
    ASSIGN_USER_CSV_FAILURE,
    ASSIGN_USER_CSV_REQUEST,
    ASSIGN_USER_CSV_SUCCESS,
    ASSIGN_USER_MANUALLY_FAILURE,
    ASSIGN_USER_MANUALLY_REQUEST,
    ASSIGN_USER_MANUALLY_SUCCESS,
    CHANGE_ASSIGN_USER_CSV_FORM,
    CHANGE_ASSIGN_USER_MANUALLY_FORM,
    CHANGE_CREATE_DRIVE_FORM,
    CLEAR,
    CLEAR_ALL,
    CREATE_DRIVE_FAILURE,
    CREATE_DRIVE_REQUEST,
    CREATE_DRIVE_SUCCESS,
    DELETE_ASSIGN_USER_FAILURE,
    DELETE_ASSIGN_USER_REQUEST,
    DELETE_ASSIGN_USER_SUCCESS,
    DELETE_DRIVE_FAILURE,
    DELETE_DRIVE_REQUEST,
    DELETE_DRIVE_SUCCESS,
    DELETE_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    EDIT_DRIVE_DETAILS_FAILURE,
    EDIT_DRIVE_DETAILS_REQUEST,
    EDIT_DRIVE_DETAILS_SUCCESS,
    GET_ASSIGN_USER_FAILURE,
    GET_ASSIGN_USER_REQUEST,
    GET_ASSIGN_USER_SUCCESS,
    GET_DRIVE_DETAILS_FAILURE,
    GET_DRIVE_DETAILS_REQUEST,
    GET_DRIVE_DETAILS_SUCCESS,
    GET_DRIVE_FAILURE,
    GET_DRIVE_REQUEST,
    GET_DRIVE_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SCORE_FAILURE,
    GET_USER_SCORE_REQUEST,
    GET_USER_SCORE_SUCCESS,
    GET_USER_SUCCESS,
    SELECTED_DELETE_DRIVE,
    SELECTED_DELETE_USER,
    WEBSOCKET_LOADING
} from '../../../types/dashboard/admin/drive/drive'
import moment from 'moment';

const initialState = {
    /* ---------------------------------------------------------------- create drive ----------------------------------------------------------------*/

    createDrive: {
        type: "open",
        name: "",
        startDate: "",
        startDateUnderstandable: "",
        endDate: "",
        endDateUnderstandable: "",
        invalidDateTimeError: "",
        test_id: "",
        college_id: "",
        colleges: []
    },


    websocketUserLoading: false,

    createDrivePageLoading: false,
    createDriveError: "",
    tests: [],
    createDriveMessage: "",
    createDriveStatus: "",

    getDrivePageLoading: false,
    getDrive_status: "",
    getDrive_error: "",
    getDrive_message: "",
    drives: [],

    getUserPageLoading: false,
    getUser_status: "",
    getUser_error: "",
    getUser_message: "",
    users: [],


    getUserScorePageLoading: false,
    getUserScore_status: "",
    getUserScore_error: "",
    getUserScore_message: "",
    userScore: {
        pool_result: "",
        result: {
            attempted: "",
            correct: "",
            email: "",
            time_taken: "",
            total: "",
            wrong: ""

        }
    },

    getDriveDetailsPageLoading: false,
    getDriveDetailsStatus: "",
    getDriveDetailsError: "",
    getDriveDetailsMessage: "",


    delete_drive_pageLoading: false,
    delete_drive_error: "",
    delete_drive_message: "",
    delete_drive_status: "",


    delete_user_pageLoading: false,
    delete_user_error: "",
    delete_user_message: "",
    delete_user_status: "",


    editDriveDetailsPageLoading: false,
    editDriveDetailsStatus: "",
    editDriveDetailsError: "",
    editDriveDetailsMessage: "",

    /* ---------------------------------------------------------------- assign user to drive --------------------------------------------------------*/

    assignUserManually: {
        email: ""
    },
    assignUserCsv: {
        csv: ""
    },

    assignUserManuallyPageLoading: false,
    assignUserManuallyError: "",
    assignUserManuallyMessage: "",
    assignUserManuallyStatus: "",


    assignUserCsvPageLoading: false,
    assignUserCsvError: "",
    assignUserCsvMessage: "",
    assignUserCsvStatus: "",


    getAssignUserPageLoading: false,
    getAssignUser_status: "",
    getAssignUser_error: "",
    getAssignUser_message: "",

    assignUser: [],

    delete_assign_user_pageLoading: false,
    delete_assign_user_error: "",
    delete_assign_user_message: "",
    delete_assign_user_status: "",

    deleteDrive: {drive_id: "", drive_name: ""},
    deleteUser: ""

};

export default function adminDriveReducer(state = initialState, action) {
    switch (action.type) {

        /* ---------------------------------------------- create drive ----------------------------------------------------*/

        case CHANGE_CREATE_DRIVE_FORM:
            return Object.assign({}, state, {
                createDrive: action.newState
            });
        case CREATE_DRIVE_REQUEST:
            return Object.assign({}, state, {
                createDrivePageLoading: true
            });
        case CREATE_DRIVE_SUCCESS:
            let drive = state.createDrive;
            if (!action.response.data.error) {
                drive = {
                    type: "open",
                    name: "",
                    startDate: "",
                    startDateUnderstandable: "",
                    endDate: "",
                    endDateUnderstandable: "",
                    invalidDateTimeError: "",
                    test_id: "",
                    tests: state.createDrive.tests,
                    college_id: "",
                    colleges: state.createDrive.colleges
                }
            }
            return Object.assign({}, state, {
                createDrivePageLoading: false,
                createDriveError: action.response.data.error,
                createDriveMessage: action.response.data.message,
                createDriveStatus: 200,
                createDrive: drive
            });
        case CREATE_DRIVE_FAILURE:
            return Object.assign({}, state, {
                createDrivePageLoading: false,
                createDriveError: true,
                createDriveMessage: action.response.data.message,
                createDriveStatus: action.response.status
            });

        /* ---------------------------------------------- get drive ----------------------------------------------------*/

        case GET_DRIVE_REQUEST:
            return Object.assign({}, state, {
                getDrivePageLoading: true,
                delete_drive_error: "",
                delete_drive_message: "",
                delete_drive_status: "",

            });

        case GET_DRIVE_SUCCESS:
            return Object.assign({}, state, {
                getDrivePageLoading: false,
                getDrive_status: 200,
                getDrive_error: action.response.data.error,
                getDrive_message: action.response.data.error ? action.response.data.message : "",
                drives: action.response.data.error ? [] : action.response.data.drives
            });
        case GET_DRIVE_FAILURE:
            return Object.assign({}, state, {
                getDrivePageLoading: false,
                getDrive_status: action.response.status,
                getDrive_error: true,
                getDrive_message: action.response.data.message,
                drives: []
            });
        /* ---------------------------------------------- drive details ----------------------------------------------------*/

        case GET_DRIVE_DETAILS_REQUEST:
            return Object.assign({}, state, {
                getTestDetailsPageLoading: true
            });
        case GET_DRIVE_DETAILS_SUCCESS:
            console.log(action.response.data, "fcccccccccccccccccccccccccccccccukkkkkkkkkkkkkkkkkkkk");
            let createDrive = {
                type: "open",
                name: "",
                startDate: "",
                startDateUnderstandable: "",
                endDate: "",
                endDateUnderstandable: "",
                invalidDateTimeError: "",
                test_id: "",
                tests: state.createDrive.tests,
                college_id: "",
                colleges: state.createDrive.colleges
            };

            if (!action.response.data.error) {
                createDrive = {
                    type: action.response.data.drive.type,
                    name: action.response.data.drive.name,
                    startDate: !!action.response.data.drive.startStr ? action.response.data.drive.startStr : "",
                    startDateUnderstandable: !!action.response.data.drive.start ? moment(Number(action.response.data.drive.start) * 1000).format('LLL') : "",
                    endDate: action.response.data.drive.endStr ? action.response.data.drive.endStr : "",
                    endDateUnderstandable: action.response.data.drive.end ? moment(Number(action.response.data.drive.end) * 1000).format('LLL') : "",
                    invalidDateTimeError: "",
                    test_id: action.response.data.drive.test_id,
                    tests: state.createDrive.tests,
                    college_id: action.response.data.drive.college_id,
                    colleges: state.createDrive.colleges
                };
                return Object.assign({}, state, {
                    getDriveDetailsPageLoading: false,
                    getDriveDetailsStatus: 200,
                    getDriveDetailsError: action.response.data.error,
                    getDriveDetailsMessage: action.response.data.error ? action.response.data.message : "",
                    createDrive

                });
            }
        case GET_DRIVE_DETAILS_FAILURE:
            return Object.assign({}, state, {
                getDriveDetailsPageLoading: false,
                getDriveDetailsStatus: action.response.status,
                getDriveDetailsError: true,
                getDriveDetailsMessage: action.response.data.message,
                createTest: {
                    type: "open",
                    name: "",
                    startDate: "",
                    startDateUnderstandable: "",
                    endDate: "",
                    endDateUnderstandable: "",
                    invalidDateTimeError: "",
                    test_id: "",
                    tests: state.createDrive.tests,
                    college_id: "",
                    colleges: state.createDrive.colleges
                }
            })

        /*============================================== edit drive details ==================================*/

        case
        EDIT_DRIVE_DETAILS_REQUEST:
            return Object.assign({}, state, {
                editDriveDetailsPageLoading: true
            });
        case
        EDIT_DRIVE_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                editDriveDetailsPageLoading: false,
                editDriveDetailsStatus: 200,
                editDriveDetailsError: action.response.data.error,
                editDriveDetailsMessage: action.response.data.message
            });
        case
        EDIT_DRIVE_DETAILS_FAILURE:
            return Object.assign({}, state, {
                editDriveDetailsPageLoading: false,
                editDriveDetailsStatus: action.response.status,
                editDriveDetailsError: true,
                editDriveDetailsMessage: action.response.data.message,
            })


        //----------------------------------------------/ delete drive/-----------------------------------------//

        case
        DELETE_DRIVE_REQUEST:
            return Object.assign({}, state, {
                delete_drive_PageLoading: true
            });
        case
        DELETE_DRIVE_SUCCESS:
            return Object.assign({}, state, {
                delete_drive_PageLoading: false,
                delete_drive_error: action.response.data.error,
                delete_drive_message: action.response.data.message,
                delete_drive_status: 200
            });
        case
        DELETE_DRIVE_FAILURE:
            return Object.assign({}, state, {
                delete_drive_PageLoading: false,
                delete_drive_error: true,
                delete_drive_message: action.response.data.message,
                delete_drive_status: action.response.status
            });


        /*------------------------------------------------- assign drive to user (manually) -----------------------*/

        case
        CHANGE_ASSIGN_USER_MANUALLY_FORM:
            return Object.assign({}, state, {
                assignUserManually: action.newState
            });
        case
        ASSIGN_USER_MANUALLY_REQUEST:
            return Object.assign({}, state, {
                assignUserManuallyPageLoading: true
            });
        case
        ASSIGN_USER_MANUALLY_SUCCESS:
            let assignUserManually = state.assignUserManually;
            if (!action.response.data.error) {
                assignUserManually = {
                    email: ""
                }
            }
            return Object.assign({}, state, {
                assignUserManuallyPageLoading: false,
                assignUserManuallyError: action.response.data.error,
                assignUserManuallyMessage: action.response.data.message,
                assignUserManuallyStatus: 200,
                assignUserManually
            });
        case
        ASSIGN_USER_MANUALLY_FAILURE:
            return Object.assign({}, state, {
                assignUserManuallyPageLoading: false,
                assignUserManuallyError: true,
                assignUserManuallyMessage: action.response.data.message,
                assignUserManuallyStatus: action.response.status
            });

        /*------------------------------------------------- assign drive to user (csv) -----------------------*/


        case
        CHANGE_ASSIGN_USER_CSV_FORM:
            return Object.assign({}, state, {
                assignUserCsv: action.newState
            });
        case
        ASSIGN_USER_CSV_REQUEST:
            return Object.assign({}, state, {
                assignUserCsvPageLoading: true
            });
        case
        ASSIGN_USER_CSV_SUCCESS:
            let assignUserCsv = state.assignUserCsv;
            if (!action.response.data.error) {
                assignUserCsv = {
                    csv: ""
                }
            }
            return Object.assign({}, state, {
                assignUserCsvPageLoading: false,
                assignUserCsvError: action.response.data.error,
                assignUserCsvMessage: action.response.data.message,
                assignUserCsvStatus: 200,
                assignUserCsv
            });
        case
        ASSIGN_USER_CSV_FAILURE:
            return Object.assign({}, state, {
                assignUserCsvPageLoading: false,
                assignUserCsvError: true,
                assignUserCsvMessage: action.response.data.message,
                assignUserCsvStatus: action.response.status
            });

        /* ---------------------------------------------- get assigned users ----------------------------------------------------*/

        case
        GET_ASSIGN_USER_REQUEST:
            return Object.assign({}, state, {
                getAssignUserPageLoading: true,
                delete_assign_user_error: "",
                delete_assign_user_message: "",
                delete_assign_user_status: "",

            });

        case
        GET_ASSIGN_USER_SUCCESS:
            return Object.assign({}, state, {
                getAssignUserPageLoading: false,
                getAssignUser_status: 200,
                getAssignUser_error: action.response.data.error,
                getAssignUser_message: action.response.data.error ? action.response.data.message : "",
                assignUser: action.response.data.error ? [] : action.response.data.users
            });
        case
        GET_ASSIGN_USER_FAILURE:
            return Object.assign({}, state, {
                getAssignUserPageLoading: false,
                getAssignUser_status: action.response.status,
                getAssignUser_error: true,
                getAssignUser_message: action.response.data.message,
                assignUser: []
            });

        //----------------------------------------------/ delete assigned users/-----------------------------------------//

        case
        DELETE_ASSIGN_USER_REQUEST:
            return Object.assign({}, state, {
                delete_assign_userPageLoading: true
            });
        case
        DELETE_ASSIGN_USER_SUCCESS:
            return Object.assign({}, state, {
                delete_assign_user_pageLoading: false,
                delete_assign_user_error: action.response.data.error,
                delete_assign_user_message: action.response.data.message,
                delete_assign_user_status: 200
            });
        case
        DELETE_ASSIGN_USER_FAILURE:
            return Object.assign({}, state, {
                delete_assign_user_pageLoading: false,
                delete_assign_user_error: true,
                delete_assign_user_message: action.response.data.message,
                delete_assign_user_status: action.response.status
            });


        /* ------------------------------------------- get users ----------------------------------------------------*/

        case
        GET_USER_REQUEST:
            return Object.assign({}, state, {
                getUserPageLoading: true,
                delete_user_error: "",
                delete_user_message: "",
                delete_user_status: ""

            });

        case
        GET_USER_SUCCESS:
            console.log(action.response.data, "data....")
            return Object.assign({}, state, {
                getUserPageLoading: false,
                getUser_status: 200,
                getUser_error: action.response.data.error,
                getUser_message: action.response.data.error ? action.response.data.message : "",
                users: action.response.data.error ? [] : action.response.data.users
            });
        case
        GET_USER_FAILURE:
            return Object.assign({}, state, {
                getUserPageLoading: false,
                getUser_status: action.response.status,
                getUser_error: true,
                getUser_message: action.response.data.message,
                users: []
            });


        case
        GET_USER_SCORE_REQUEST:
            return Object.assign({}, state, {
                getUserScorePageLoading: true

            });

        case
        GET_USER_SCORE_SUCCESS:
            console.log(action.response.data, "data....")
            return Object.assign({}, state, {
                getUserScorePageLoading: false,
                getUserScore_status: 200,
                getUserScore_error: action.response.data.error,
                getUserScore_message: action.response.data.error ? action.response.data.message : "",
                userScore: action.response.data.error ? {
                    pool_result: "",
                    result: {
                        attempted: "",
                        correct: "",
                        email: "",
                        time_taken: "",
                        total: "",
                        wrong: ""

                    }
                } : action.response.data.userScore
            });
        case
        GET_USER_SCORE_FAILURE:
            return Object.assign({}, state, {
                getUserScorePageLoading: false,
                getUserScore_status: action.response.status,
                getUserScore_error: true,
                getUserScore_message: action.response.data.message,
                userScore: {
                    pool_result: "",
                    result: {
                        attempted: "",
                        correct: "",
                        email: "",
                        time_taken: "",
                        total: "",
                        wrong: ""

                    }
                }
            });

        //----------------------------------------------/ delete user/-----------------------------------------//

        case
        DELETE_USER_REQUEST:
            return Object.assign({}, state, {
                delete_user_PageLoading: true
            });
        case
        DELETE_USER_SUCCESS:
            return Object.assign({}, state, {
                delete_user_PageLoading: false,
                delete_user_error: action.response.data.error,
                delete_user_message: action.response.data.message,
                delete_user_status: 200
            });
        case
        DELETE_USER_FAILURE:
            return Object.assign({}, state, {
                delete_user_PageLoading: false,
                delete_user_error: true,
                delete_user_message: action.response.data.message,
                delete_user_status: action.response.status
            });


        /* ---------------------------------------------- common ----------------------------------------------------*/

        case
        CLEAR_ALL:
            return Object.assign({}, state, {
                deleteDrive: {drive_id: "", drive_name: ""},
                deleteUser: "",
                createDrive: {
                    type: "open",
                    name: "",
                    startDate: "",
                    startDateUnderstandable: "",
                    endDate: "",
                    endDateUnderstandable: "",
                    invalidDateTimeError: "",
                    test_id: "",
                    tests: [],
                    college_id: "",
                    colleges: []
                },

                createDriveError: "",
                createDriveMessage: "",
                createDriveStatus: "",

                getDrive_status: "",
                getDrive_error: "",
                getDrive_message: "",
                drives: [],

                getUser_status: "",
                getUser_message: "",
                getUser_error: "",
                users: [],

                getUserScore_status: "",
                getUserScore_error: "",
                getUserScore_message: "",
                userScore: {
                    pool_result: "",
                    result: {
                        attempted: "",
                        correct: "",
                        email: "",
                        time_taken: "",
                        total: "",
                        wrong: ""

                    }
                },

                getDriveDetailsStatus: "",
                getDriveDetailsError: "",
                getDriveDetailsMessage: "",

                delete_drive_error: "",
                delete_drive_message: "",
                delete_drive_status: "",

                editDriveDetailsStatus: "",
                editDriveDetailsError: "",
                editDriveDetailsMessage: "",


                assignUserManually: {
                    email: ""
                },
                assignUserCsv: {
                    csv: ""
                },

                assignUserManuallyError: "",
                assignUserManuallyMessage: "",
                assignUserManuallyStatus: "",

                assignUserCsvError: "",
                assignUserCsvMessage: "",
                assignUserCsvStatus: "",

                delete_assign_user_error: "",
                delete_assign_user_message: "",
                delete_assign_user_status: "",


                delete_user_error: "",
                delete_user_message: "",
                delete_user_status: ""

            });
        case
        CLEAR:
            return Object.assign({}, state, {
                createDriveError: "",
                createDriveMessage: "",
                createDriveStatus: "",

                delete_drive_error: "",
                delete_drive_message: "",
                delete_drive_status: "",


                delete_assign_user_error: "",
                delete_assign_user_message: "",
                delete_assign_user_status: "",

                editDriveDetailsStatus: "",
                editDriveDetailsError: "",
                editDriveDetailsMessage: "",

                assignUserManuallyError: "",
                assignUserManuallyMessage: "",
                assignUserManuallyStatus: "",

                assignUserCsvError: "",
                assignUserCsvMessage: "",
                assignUserCsvStatus: "",

                delete_user_error: "",
                delete_user_message: "",
                delete_user_status: ""
            });
        case
        WEBSOCKET_LOADING:
            return Object.assign({}, state, {
                websocketUserLoading: action.status
            });
        case
        SELECTED_DELETE_DRIVE:
            return Object.assign({}, state, {
                deleteDrive: action.drive
            });
        case
        SELECTED_DELETE_USER:
            return Object.assign({}, state, {
                deleteUser: action.user
            });
        default:
            return state
    }
}
