import {
    CHANGE_CREATE_COLLEGE_CSV_FORM,
    CHANGE_CREATE_COLLEGE_FORM,
    CLEAR_ALL,
    CLEAR_STATUS,
    CREATE_COLLEGE_CSV_FAILURE,
    CREATE_COLLEGE_CSV_REQUEST,
    CREATE_COLLEGE_CSV_SUCCESS,
    CREATE_COLLEGE_FAILURE,
    CREATE_COLLEGE_REQUEST,
    CREATE_COLLEGE_SUCCESS,
    DELETE_COLLEGE_FAILURE,
    DELETE_COLLEGE_REQUEST,
    DELETE_COLLEGE_SUCCESS,
    EDIT_COLLEGE_DETAILS_FAILURE,
    EDIT_COLLEGE_DETAILS_REQUEST,
    EDIT_COLLEGE_DETAILS_SUCCESS,
    GET_COLLEGE_DETAILS_FAILURE,
    GET_COLLEGE_DETAILS_REQUEST,
    GET_COLLEGE_DETAILS_SUCCESS,
    GET_COLLEGE_FAILURE,
    GET_COLLEGE_REQUEST,
    GET_COLLEGE_SUCCESS,
    SELECTED_DELETE_COLLEGE
} from '../../../types/dashboard/admin/college/college'

const initialState = {
    /* creating TEST*/
    createCollege: {
        name: "",
        location: ""
    },

    createCollegeCsv: {
        csv: ""
    },

    getCollegePageLoading: false,
    getCollege_status: "",
    getCollege_error: "",
    getCollege_message: "",
    colleges: [],


    getCollegeDetailsPageLoading: false,
    getCollegeDetailsStatus: "",
    getCollegeDetailsError: "",
    getCollegeDetailsMessage: "",


    delete_college_pageLoading: false,
    delete_college_error: "",
    delete_college_message: "",
    delete_college_status: "",

    editCollegeDetailsPageLoading: false,
    editCollegeDetailsStatus: "",
    editCollegeDetailsError: "",
    editCollegeDetailsMessage: "",

    createCollegePageLoading: false,
    createCollegeStatus: "",
    createCollegeError: "",
    createCollegeMessage: "",

    createCollegeCsvPageLoading: false,
    createCollegeCsvStatus: "",
    createCollegeCsvError: "",
    createCollegeCsvMessage: "",

    deleteCollege: {id: "", name: ""}
};

export default function adminCollegeReducer(state = initialState, action) {
    switch (action.type) {

        /*----------------------------------------- create college manually -------------------------------------*/

        case CHANGE_CREATE_COLLEGE_FORM:
            return Object.assign({}, state, {
                createCollege: action.newState
            });
        case CREATE_COLLEGE_REQUEST:
            return Object.assign({}, state, {
                createCollegePageLoading: true
            });
        case CREATE_COLLEGE_SUCCESS:
            return Object.assign({}, state, {
                createCollegePageLoading: false,
                createCollegeError: action.response.data.error,
                createCollegeMessage: action.response.data.message,
                createCollegeStatus: 200,
                createCollege: {
                    name: "",
                    location: ""
                }
            });
        case CREATE_COLLEGE_FAILURE:
            return Object.assign({}, state, {
                createCollegePageLoading: false,
                createCollegeError: true,
                createCollegeMessage: action.response.data.message,
                createCollegeStatus: action.response.status
            });

        /*--------------------------------------------- create college csv ------------------------------------------*/

        case CHANGE_CREATE_COLLEGE_CSV_FORM:
            return Object.assign({}, state, {
                createCollegeCsv: action.newState
            });

        case CREATE_COLLEGE_CSV_REQUEST:
            return Object.assign({}, state, {
                createCollegeCsvPageLoading: true
            });
        case CREATE_COLLEGE_CSV_SUCCESS:
            return Object.assign({}, state, {
                createCollegeCsvPageLoading: false,
                createCollegeCsvError: action.response.data.error,
                createCollegeCsvMessage: action.response.data.message,
                createCollegeCsvStatus: 200,
                createCollegeCsv: !action.response.data.error ? {
                        csv: ""
                    }
                    :
                    state.createCollegeCsv
            });
        case CREATE_COLLEGE_CSV_FAILURE:
            return Object.assign({}, state, {
                createCollegeCsvPageLoading: false,
                createCollegeCsvError: true,
                createCollegeCsvMessage: action.response.data.message,
                createCollegeCsvStatus: action.response.status
            });

        /*-------------------------------------------------------------------------------------------------------------*/

        case GET_COLLEGE_REQUEST:
            return Object.assign({}, state, {
                getCollegePageLoading: true,
                delete_college_error: "",
                delete_college_message: "",
                delete_college_status: "",

                editCollegeDetailsStatus: "",
                editCollegeDetailsError: "",
                editCollegeDetailsMessage: "",

                createCollegeStatus: "",
                createCollegeError: "",
                createCollegeMessage: "",

                createCollegeCsvStatus: "",
                createCollegeCsvError: "",
                createCollegeCsvMessage: ""
            });
        case GET_COLLEGE_SUCCESS:
            return Object.assign({}, state, {
                getCollegePageLoading: false,
                getCollege_status: 200,
                getCollege_error: action.response.data.error,
                getCollege_message: action.response.data.error ? action.response.data.message : "",
                colleges: action.response.data.error ? [] : action.response.data.colleges,

            });
        case GET_COLLEGE_FAILURE:
            return Object.assign({}, state, {
                getCollegePageLoading: false,
                getCollege_status: action.response.status,
                getCollege_error: true,
                getCollege_message: action.response.data.message,
                colleges: []
            });

        /*------------------------------------------ get college details ---------------------------------------------------------*/

        case GET_COLLEGE_DETAILS_REQUEST:
            return Object.assign({}, state, {
                getCollegeDetailsPageLoading: true,
                editCollegeDetailsStatus: "",
                editCollegeDetailsError: "",
                editCollegeDetailsMessage: ""
            });
        case GET_COLLEGE_DETAILS_SUCCESS:
            let createCollege = {
                id: "",
                location: "",
                name: ""
            };

            if (!action.response.data.error) {
                createCollege = action.response.data.college;
            }
            return Object.assign({}, state, {
                getCollegeDetailsPageLoading: false,
                getCollegeDetailsStatus: 200,
                getCollegeDetailsError: action.response.data.error,
                getCollegeDetailsMessage: action.response.data.error ? action.response.data.message : "",
                createCollege

            });
        case GET_COLLEGE_DETAILS_FAILURE:
            return Object.assign({}, state, {
                getCollegeDetailsPageLoading: false,
                getCollegeDetailsStatus: action.response.status,
                getCollegeDetailsError: true,
                getCollegeDetailsMessage: action.response.data.message,
                createTest: {
                    name: "",
                    location: "",
                    id: ""
                }
            })

        // /*============================================== edit college details ==================================*/

        case EDIT_COLLEGE_DETAILS_REQUEST:
            return Object.assign({}, state, {
                editCollegeDetailsPageLoading: true
            });
        case EDIT_COLLEGE_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                editCollegeDetailsPageLoading: false,
                editCollegeDetailsStatus: 200,
                editCollegeDetailsError: action.response.data.error,
                editCollegeDetailsMessage: action.response.data.message
            });
        case EDIT_COLLEGE_DETAILS_FAILURE:
            return Object.assign({}, state, {
                editCollegeDetailsPageLoading: false,
                editCollegeDetailsStatus: action.response.status,
                editCollegeDetailsError: true,
                editCollegeDetailsMessage: action.response.data.message,
            });


        // //----------------------------------------------delete college-----------------------------------------//

        case DELETE_COLLEGE_REQUEST:
            return Object.assign({}, state, {
                delete_college_pageLoading: true
            });
        case DELETE_COLLEGE_SUCCESS:
            return Object.assign({}, state, {
                delete_college_pageLoading: false,
                delete_college_error: action.response.data.error,
                delete_college_message: action.response.data.message,
                delete_college_status: 200
            });
        case DELETE_COLLEGE_FAILURE:
            return Object.assign({}, state, {
                delete_college_pageLoading: false,
                delete_college_error: true,
                delete_college_message: action.response.data.message,
                delete_college_status: action.response.status
            });

        // ------------------------------------------------------------------------------------------------------------//

        case CLEAR_ALL:
            return Object.assign({}, state, {
                createCollege: {
                    name: "",
                    location: ""
                },

                createCollegeStatus: "",
                createCollegeError: "",
                createCollegeMessage: "",

                createCollegeCsvStatus: "",
                createCollegeCsvError: "",
                createCollegeCsvMessage: "",

                getCollege_status: "",
                getCollege_error: "",
                getCollege_message: "",
                colleges: [],


                delete_college_error: "",
                delete_college_message: "",
                delete_college_status: "",

                editCollegeDetailsStatus: "",
                editCollegeDetailsError: "",
                editCollegeDetailsMessage: "",

                getCollegeDetailsStatus: "",
                getCollegeDetailsError: "",
                getCollegeDetailsMessage: "",


            });
        case CLEAR_STATUS:
            return Object.assign({}, state, {
                createCollegeStatus: "",
                createCollegeError: "",
                createCollegeMessage: "",

                createCollegeCsvStatus: "",
                createCollegeCsvError: "",
                createCollegeCsvMessage: "",

                editCollegeDetailsStatus: "",
                editCollegeDetailsError: "",
                editCollegeDetailsMessage: "",

                delete_college_error: "",
                delete_college_message: "",
                delete_college_status: ""
            });

        case SELECTED_DELETE_COLLEGE:
            return Object.assign({}, state, {
                deleteCollege: action.college
            })
        default:
            return state
    }
}
