import {
    CHANGE_CREATE_TEST_FORM, CLEAR_ALL, CLEAR_STATUS, CREATE_TEST_FAILURE, CREATE_TEST_REQUEST, CREATE_TEST_SUCCESS,
    GET_TEST_FAILURE, GET_TEST_REQUEST, GET_TEST_SUCCESS,
    DELETE_TEST_REQUEST, DELETE_TEST_SUCCESS, DELETE_TEST_FAILURE,
    GET_TEST_DETAILS_REQUEST, GET_TEST_DETAILS_SUCCESS, GET_TEST_DETAILS_FAILURE,
    EDIT_TEST_DETAILS_REQUEST, EDIT_TEST_DETAILS_SUCCESS, EDIT_TEST_DETAILS_FAILURE, SELECTED_DELETE_TEST
} from '../../../types/dashboard/admin/test/test'

const initialState = {
    /* creating TEST*/
    createTest: {
        name: "",
        duration: "",
        pools: [
            {
                totalQuestions: "",
                poolId: "",
                noOfQuestions: ""
            }
        ]
    },

    getTestPageLoading: false,
    getTest_status: "",
    getTest_error: "",
    getTest_message: "",
    tests: [],

    // test deails

      getTestDetailsPageLoading: false,
      getTestDetailsStatus: "",
      getTestDetailsError: "",
      getTestDetailsMessage: "",

    // edit_TEST_details_status: "",
    // edit_TEST_details_error: "",
    // edit_TEST_details_message: "",
    //

    delete_test_pageLoading: false,
    delete_test_error: "",
    delete_test_message: "",
    delete_test_status: "",

    editTestDetailsPageLoading: false,
    editTestDetailsStatus: "",
    editTestDetailsError: "",
    editTestDetailsMessage: "",

    createTestPageLoading: false,
    createTestStatus: "",
    createTestError: "",
    createTestMessage: "",

    deleteTest: {test_id: "", test_name: ""}
};

export default function adminTestReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CREATE_TEST_FORM:
            return Object.assign({}, state, {
                createTest: action.newState
            });
        case CREATE_TEST_REQUEST:
            return Object.assign({}, state, {
                createTestPageLoading: true
            });
        case CREATE_TEST_SUCCESS:
            return Object.assign({}, state, {
                createTestPageLoading: false,
                createTesterror: action.response.data.error,
                createTestMessage: action.response.data.message,
                createTestStatus: 200,
                createTest: {
                    name: "",
                    duration: "",
                    pools: [
                        {
                            totalQuestions: "",
                            poolId: "",
                            noOfQuestions: ""
                        }
                    ]
                }
            });
        case CREATE_TEST_FAILURE:
            return Object.assign({}, state, {
                createTestPageLoading: false,
                createTestError: true,
                createTestMessage: action.response.data.message,
                createTestStatus: action.response.status
            });


        case GET_TEST_REQUEST:
            return Object.assign({}, state, {
                getTestpageLoading: true,
                delete_test_error: "",
                delete_test_message: "",
                delete_test_status: "",

            });
        case GET_TEST_SUCCESS:
      //   let createTest = {
      //       name: "",
      //       duration: "",
      //       pools: [
      //           {
      //               totalQuestions: "",
      //               poolId: "",
      //               noOfQuestions: ""
      //           }
      //       ]
      //   };
      // };
      //   if (!action.response.data.error) {
      //     const tests = action.response.data.tests;
      //     let newTests = [];
      //     for (let i in newTests) {
      //
      //     }
      //   }
            return Object.assign({}, state, {
                getTestpageLoading: false,
                getTest_status: 200,
                getTest_error: action.response.data.error,
                getTest_message: action.response.data.error ? action.response.data.message : "",
                tests: action.response.data.error ? [] : action.response.data.tests,

            });
        case GET_TEST_FAILURE:
            return Object.assign({}, state, {
                getTestPageLoading: false,
                getTest_status: action.response.status,
                getTest_error: true,
                getTest_message: action.response.data.message,
                tests: []
            });

            case GET_TEST_DETAILS_REQUEST:
                return Object.assign({}, state, {
                    getTestDetailsPageLoading: true,
                    editTestDetailsStatus: "",
                    editTestDetailsError: "",
                    editTestDetailsMessage: "",
                });
            case GET_TEST_DETAILS_SUCCESS:
            console.log(action.response.data, "fuuuuuuuuuuuuuuuuuuuuu")
              let createTest = {
                  name: "",
                  duration: "",
                  pools: [
                      {
                          totalQuestions: "",
                          poolId: "",
                          noOfQuestions: ""
                      }
                  ]
              };

              if (!action.response.data.error) {
                createTest = action.response.data.test;
                let newPools = createTest.pools;
                for (let i in newPools) {
                    newPools[i]["totalQuestions"] = ""
                };
                createTest.pools = newPools;
              }
                return Object.assign({}, state, {
                    getTestDetailsPageLoading: false,
                    getTestDetailsStatus: 200,
                    getTestDetailsError: action.response.data.error,
                    getTestDetailsMessage: action.response.data.error ? action.response.data.message : "",
                    createTest: createTest

                });
            case GET_TEST_DETAILS_FAILURE:
                return Object.assign({}, state, {
                    getTestDetailsPageLoading: false,
                    getTestDetailsStatus: action.response.status,
                    getTestDetailsError: true,
                    getTestDetailsMessage: action.response.data.message,
                    createTest: {
                        name: "",
                        duration: "",
                        pools: [
                            {
                                totalQuestions: "",
                                poolId: "",
                                noOfQuestions: ""
                            }
                        ]
                    }
                })

/*============================================== edit test details ==================================*/

case EDIT_TEST_DETAILS_REQUEST:
    return Object.assign({}, state, {
        editTestDetailsPageLoading: true
    });
case EDIT_TEST_DETAILS_SUCCESS:
    return Object.assign({}, state, {
        editTestDetailsPageLoading: false,
        editTestDetailsStatus: 200,
        editTestDetailsError: action.response.data.error,
        editTestDetailsMessage: action.response.data.message
    });
case EDIT_TEST_DETAILS_FAILURE:
    return Object.assign({}, state, {
        editTestDetailsPageLoading: false,
        editTestDetailsStatus: action.response.status,
        editTestDetailsError: true,
        editTestDetailsMessage: action.response.data.message,
      })


    //----------------------------------------------//-----------------------------------------//
        case DELETE_TEST_REQUEST:
            return Object.assign({}, state, {
                delete_testPageLoading: true
            });
        case DELETE_TEST_SUCCESS:
            return Object.assign({}, state, {
                delete_testPageLoading: false,
                delete_test_error: action.response.data.error,
                delete_test_message: action.response.data.message,
                delete_test_status: 200
            });
        case DELETE_TEST_FAILURE:
            return Object.assign({}, state, {
                delete_testPageLoading: false,
                delete_test_error: true,
                delete_test_message: action.response.data.message,
                delete_test_status: action.response.status
            });

        // case CLEAR_EDIT_TEST_DETAILS_RESPONSE:
        //     return Object.assign({}, state, {
        //         edit_TEST_details_error: "",
        //         edit_TEST_details_message: "",
        //         edit_TEST_details_status: ""
        //     });
        //
        // case CLEAR_DELETE_TEST_RESPONSE:
        //     return Object.assign({}, state, {
        //         delete_TEST_error: "",
        //         delete_TEST_message: "",
        //         delete_TEST_status: ""
        //     });


        case CLEAR_ALL:
            return Object.assign({}, state, {
                deleteTest: {test_id: "", test_name: ""},
                createTest: {
                    name: "",
                    duration: "",
                    totalQuestions: "",
                    pools: [
                        {
                            poolId: "",
                            noOfQuestions: ""
                        }
                    ]
                },

                // get_TESTs_status: "",
                // get_TESTs_error: "",
                // get_TESTs_message: "",
                // get_TESTs: [],
                //
                //
                // TEST_details_status: "",
                // TEST_details_error: "",
                // TEST_details_message: "",
                //
                //
                // edit_TEST_details_status: "",
                // edit_TEST_details_error: "",
                // edit_TEST_details_message: "",
                //

                delete_test_error: "",
                delete_test_message: "",
                delete_test_status: "",

                createTestError: "",
                createTestMessage: "",
                createTestStatus: "",

                getTestDetailsStatus: "",
                getTestDetailsError: "",
                getTestDetailsMessage: "",


                editTestDetailsStatus: "",
                editTestDetailsError: "",
                editTestDetailsMessage: ""


            });
        case CLEAR_STATUS:
            return Object.assign({}, state, {
                status: "",

                createTestStatus: "",
                createTestError: "",
                createTestMessage: "",

                getTestPageLoading: false,
                getTest_status: "",
                getTest_error: "",
                getTest_message: "",
                tests: [],

                delete_test_error: "",
                delete_test_message: "",
                delete_test_status: "",

                editTestDetailsStatus: "",
                editTestDetailsError: "",
                editTestDetailsMessage: ""
            });
        case SELECTED_DELETE_TEST:
            return Object.assign({}, state, {
                deleteTest: action.test
            });
        default:
            return state
    }
}
