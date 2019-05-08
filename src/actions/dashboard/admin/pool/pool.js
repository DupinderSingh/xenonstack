import {
    ADD_IMAGE_FAILURE, ADD_IMAGE_REQUEST, ADD_IMAGE_SUCCESS, ADD_QUESTION_TO_POOL_FAILURE,
    ADD_QUESTION_TO_POOL_REQUEST, ADD_QUESTION_TO_POOL_SUCCESS, CHANGE_CREATE_POOL_FORM, CHANGE_OPTION, CHANGE_QUESTION,
    CLEAR_ALL, CLEAR_STATUS, CREATE_POOL_FAILURE, CREATE_POOL_REQUEST, CREATE_POOL_SUCCESS, DELETE_IMAGE_FAILURE,
    DELETE_IMAGE_REQUEST, DELETE_IMAGE_SUCCESS, DELETE_POOL_FAILURE, DELETE_POOL_REQUEST, DELETE_POOL_SUCCESS,
    DELETE_QUESTION_FAILURE, DELETE_QUESTION_REQUEST, DELETE_QUESTION_SUCCESS, EDIT_POOL_FAILURE, EDIT_POOL_REQUEST,
    EDIT_POOL_SUCCESS, EDIT_QUESTION_DETAILS_FAILURE, EDIT_QUESTION_DETAILS_REQUEST, EDIT_QUESTION_DETAILS_SUCCESS,
    GET_POOL_FAILURE, GET_POOL_REQUEST, GET_POOL_SUCCESS, GET_QUESTION_DETAILS_FAILURE, GET_QUESTION_DETAILS_REQUEST,
    GET_QUESTION_DETAILS_SUCCESS, GET_QUESTIONS_FAILURE, GET_QUESTIONS_REQUEST, GET_QUESTIONS_SUCCESS, UPDATE_IMAGES,
    UPLOAD_CSV_FAILURE, UPLOAD_CSV_REQUEST, UPLOAD_CSV_SUCCESS, SELECT_DELETE_POOL, CHANGE_CREATE_QUESTION_CSV_FORM
} from "../../../../types/dashboard/admin/pool/pool";
import {CALL_POST_API} from "../../../../middleware/token/post-api";
import {CALL_DELETE_API} from "../../../../middleware/token/delete/without-body";
import {GET_API} from "../../../../middleware/token/get-api";
import {PUT_API} from "../../../../middleware/token/put_api/put-api-with-body";
import {logout} from "../../../account/login-actions";
import {store} from "../../../../index";

const BASE_URL = process.env.REACT_APP_DRIVE_API;

/* ------------------------------------------------------- create pool ----------------------------------------------*/

export function changeCreatePoolForm(newState) {
    return {type: CHANGE_CREATE_POOL_FORM, newState}
}

export function createPool(body) {
    return {
        [CALL_POST_API]: {
            endpoint: BASE_URL + '/v1/pool',
            types: [CREATE_POOL_REQUEST, CREATE_POOL_SUCCESS, CREATE_POOL_FAILURE],
            body: body
        }
    }
}

export function editPool(pool, body) {
    return {
        [PUT_API]: {
            endpoint: BASE_URL + '/v1/pool/' + pool,
            types: [EDIT_POOL_REQUEST, EDIT_POOL_SUCCESS, EDIT_POOL_FAILURE],
            body: JSON.stringify(body)
        }
    }
}

export function selectedDeletePool(pool) {
    return {type: SELECT_DELETE_POOL, pool}
}

export function deletePool(pool) {
    return {
        [CALL_DELETE_API]: {
            endpoint: BASE_URL + '/v1/pool/' + pool,
            types: [DELETE_POOL_REQUEST, DELETE_POOL_SUCCESS, DELETE_POOL_FAILURE],
        }
    }
}

export function getAllPool() {
    return {
        [GET_API]: {
            endpoint: BASE_URL + '/v1/pool',
            types: [GET_POOL_REQUEST, GET_POOL_SUCCESS, GET_POOL_FAILURE]
        }
    }
}

/* ------------------------------------------------------------- add questions to pool -------------------------------------------------*/

export function changeQuestion(newState) {
    return {type: CHANGE_QUESTION, newState}
}

export function changeOption(newState) {
    return {type: CHANGE_OPTION, newState}
}

export function addQuestionToPool(pool_id, body) {
    return {
        [CALL_POST_API]: {
            endpoint: BASE_URL + '/v1/question/' + pool_id,
            types: [ADD_QUESTION_TO_POOL_REQUEST, ADD_QUESTION_TO_POOL_SUCCESS, ADD_QUESTION_TO_POOL_FAILURE],
            body: body
        }
    }
}

export function addImageRequest() {
    return {type: ADD_IMAGE_REQUEST}
}

export function addImageSuccess(response) {
    return {type: ADD_IMAGE_SUCCESS, response}
}

export function addImageFailure(response) {
    return {type: ADD_IMAGE_FAILURE, response}
}

export function updateImages(status, updatedImages) {
    return {type: UPDATE_IMAGES, status, newState: updatedImages}
}

export function addImage(file, type, index) {
    console.log(file, type, index, "file, type, index")
    let formData = new FormData();
    formData.append('image', file);
    let status = "";
    const config = {
        method: "POST",
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
        body: formData
    };
    return dispatch => {
        dispatch(addImageRequest());
        fetch(BASE_URL + '/v1/upload_image', config)
            .then(function (res) {
                status = res.status;
                return res.json()
            })
            .then(function (res) {
                    if (status === 200) {
                        if (res.error) {
                            dispatch(addImageSuccess({
                                data: {error: true, message: res.message}, status: 200
                            }));
                        }
                        else {
                            dispatch(addImageSuccess({
                                data: {error: false, message: "Image added"}, status: 200
                            }));
                            if (type === "question") {
                                let updatedImages = store.getState().poolReducer.question.images;
                                updatedImages.push(res.link);
                                dispatch(updateImages("question", updatedImages))
                            }
                            else {
                                let options = store.getState().poolReducer.options;
                                options[index]["images"].push(res.link);
                                dispatch(updateImages("option", options))
                            }
                        }
                    }
                    else {
                        if (status === 401) {
                            dispatch(logout())
                        }
                        else {
                            dispatch(addImageFailure({data: {error: true, message: res.message}, status: status}))
                        }
                    }
                },
                function () {
                    dispatch(addImageFailure({data: {message: "Error while updating image", error: true}, status: 500}))
                })
    }
}

/* --------------------------------------------------------- removing image --------------------------------------------------------*/

export function deleteImageRequest() {
    return {type: DELETE_IMAGE_REQUEST}
}

export function deleteImageSuccess(response) {
    return {type: DELETE_IMAGE_SUCCESS, response}
}

export function deleteImageFailure(response) {
    return {type: DELETE_IMAGE_FAILURE, response}
}

export function deleteImage(type, parentIndex, childIndex, image) {
    console.log(type, parentIndex, childIndex, image, "type, parentIndex, childIndex, image")
    let status = "";
    const config = {
        method: "DELETE",
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
        body: JSON.stringify({url: image})
    };
    return dispatch => {
        dispatch(deleteImageRequest());
        fetch(BASE_URL + '/v1/delete_image', config)
            .then(function (res) {
                status = res.status;
                return res.json()
            })
            .then(function (res) {
                    if (status === 200) {
                        if (res.error) {
                            dispatch(deleteImageSuccess({
                                data: {error: true, message: res.message}, status: 200
                            }));
                        }
                        else {
                            dispatch(deleteImageSuccess({
                                data: {error: false, message: "Image deleted"}, status: 200
                            }));
                            if (type === "question") {
                                let updatedImages = store.getState().poolReducer.question.images;
                                updatedImages.splice(childIndex, 1);
                                console.log()
                                dispatch(updateImages("question", updatedImages))
                            }
                            else {
                                let options = store.getState().poolReducer.options;
                                const oldImages = options[parentIndex]["images"];
                                oldImages.splice(childIndex, 1);
                                console.log(options, "new options")
                                dispatch(updateImages("option", options))
                            }
                        }
                    }
                    else {
                        if (status === 401) {
                            dispatch(logout())
                        }
                        else {
                            dispatch(deleteImageFailure({data: {error: true, message: res.message}, status: status}))
                        }
                    }
                },
                function () {
                    dispatch(deleteImageFailure({
                        data: {message: "Error while updating image", error: true},
                        status: 500
                    }))
                })
    }
}

/*----------------------------------------------------------------------------------------------------------------------------------------*/

export function getQuestions(pool) {
    return {
        [GET_API]: {
            endpoint: BASE_URL + '/v1/question/' + pool,
            types: [GET_QUESTIONS_REQUEST, GET_QUESTIONS_SUCCESS, GET_QUESTIONS_FAILURE]
        }
    }
}

export function getQuestionDetails(pool, question) {
    return {
        [GET_API]: {
            endpoint: BASE_URL + '/v1/question/' + pool + "/" + question,
            types: [GET_QUESTION_DETAILS_REQUEST, GET_QUESTION_DETAILS_SUCCESS, GET_QUESTION_DETAILS_FAILURE]
        }
    }
}


export function editQuestionDetails(pool, question, body) {
    return {
        [PUT_API]: {
            endpoint: BASE_URL + '/v1/question/' + pool + "/" + question,
            types: [EDIT_QUESTION_DETAILS_REQUEST, EDIT_QUESTION_DETAILS_SUCCESS, EDIT_QUESTION_DETAILS_FAILURE],
            body: JSON.stringify(body)
        }
    }
}


//
export function deleteQuestion(pool, id) {
    return {
        [CALL_DELETE_API]: {
            endpoint: BASE_URL + '/v1/question/' + pool + '/' + id,
            types: [DELETE_QUESTION_REQUEST, DELETE_QUESTION_SUCCESS, DELETE_QUESTION_FAILURE]
        }
    }
}

// common

export function clearAll() {
    return {type: CLEAR_ALL}
}

export function clearStatus() {
    return {type: CLEAR_STATUS}
}

//
// POST /v1/csv_question/:pool
// Content-Type: form-data
// Header:-
//     Authorization: Bearer <<admin_token>>
//
// UrlBody :-
//     pool -> pool_id
// Body:-
//     question file required
//
// Note:- only csv file supported please convert excel sheet to csv then upload.

/*----------------------------------------------------- add csv file to upload questions---------------------------------------------------------------*/

export function uploadCsvRequest() {
    return {type: UPLOAD_CSV_REQUEST}
}

export function uploadCsvSuccess(response) {
    return {type: UPLOAD_CSV_SUCCESS, response}
}

export function uploadCsvFailure(response) {
    return {type: UPLOAD_CSV_FAILURE, response}
}

export function uploadCsv(file, pool) {
    let formData = new FormData();
    formData.append('questions', file);
    let status = "";
    const config = {
        method: "POST",
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`},
        body: formData
    };
    return dispatch => {
        dispatch(uploadCsvRequest());
        fetch(BASE_URL + '/v1/csv_question/' + pool, config)
            .then(function (res) {
                status = res.status;
                return res.json()
            })
            .then(function (res) {
                    if (status === 200) {
                        if (res.error) {
                            dispatch(uploadCsvSuccess({
                                data: {error: true, message: res.message}, status: 200
                            }));
                        }
                        else {
                            dispatch(uploadCsvSuccess({
                                data: {error: false, message: res.message}, status: 200
                            }));
                        }
                    }
                    else {
                        if (status === 401) {
                            dispatch(logout())
                        }
                        else {
                            dispatch(uploadCsvFailure({data: {error: true, message: res.message}, status: status}))
                        }
                    }
                },
                function () {
                    dispatch(uploadCsvFailure({
                        data: {message: "Error while uploading questions", error: true},
                        status: 500
                    }))
                })
    }
}


export function changeCreateQuestionCsvForm(newState) {
    return {type: CHANGE_CREATE_QUESTION_CSV_FORM, newState}
}