//////////////////////This is import for API Call/////////////

import reviewService from "../services/reviewService";

export const GET_REVIEW = "GET_REVIEW";
export const GET_REVIEW_SUCCESS = "GET_REVIEW_SUCCESS";
export const GET_REVIEW_ERROR = "GET_REVIEW_ERROR";

export const GET_REVIEW_BY_ID = "GET_REVIEW_BY_ID";
export const GET_REVIEW_BY_ID_SUCCESS = "GET_REVIEW_BY_ID_SUCCESS";
export const GET_REVIEW_BY_ID_ERROR = "GET_REVIEW_BY_ID_ERROR";

export const CREATE_REVIEW = "CREATE_REVIEW";
export const CREATE_REVIEW_SUCCESS = "CREATE_REVIEW_SUCCESS";
export const CREATE_REVIEW_ERROR = "CREATE_REVIEW_ERROR";

export const UPDATE_REVIEW = "UPDATE_REVIEW";
export const UPDATE_REVIEW_SUCCESS = "UPDATE_REVIEW_SUCCESS";
export const UPDATE_REVIEW_ERROR = "UPDATE_REVIEW_ERROR";

export const DELETE_REVIEW = "DELETE_REVIEW";
export const DELETE_REVIEW_SUCCESS = "DELETE_REVIEW_SUCCESS";
export const DELETE_REVIEW_ERROR = "DELETE_REVIEW_ERROR";

//////////////////END OF COLOR ACTION TYPES/////////////////////////

export function getReviewRecord() {
  return async (dispatch) => {
    dispatch(getReview());
    return await reviewService
      .getReview()

      .then((response) => dispatch(getReviewSuccess(response.data)))
      .catch((error) => dispatch(getReviewError(error)));
  };
}

export function getReview() {
  return {
    type: GET_REVIEW,
  };
}

export function getReviewSuccess(success) {
  return {
    type: GET_REVIEW_SUCCESS,
    payload: { success },
  };
}

export function getReviewError(error) {
  return {
    type: GET_REVIEW_ERROR,
    payload: { error },
  };
}

export function getReviewByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getReviewById());
    return await reviewService
      .getReviewById(id)

      .then((response) => dispatch(getReviewByIdSuccess(response.data)))
      .catch((error) => dispatch(getReviewByIdError(error)));
  };
}

export function getReviewById() {
  return {
    type: GET_REVIEW_BY_ID,
  };
}

export function getReviewByIdSuccess(success) {
  return {
    type: GET_REVIEW_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getReviewByIdError(error) {
  return {
    type: GET_REVIEW_BY_ID_ERROR,
    payload: { error },
  };
}

export function createReviewRecord(data) {
  //debugger;
  return async (dispatch) => {
    dispatch(createReview());
    return await reviewService
      .createReview(data)

      .then((response) =>
        dispatch(createReviewSuccess(response), alert(response.message))
      )
      .catch((error) => dispatch(createReviewError(error)));
  };
}

export function createReview() {
  return {
    type: CREATE_REVIEW,
  };
}

export function createReviewSuccess(success) {
  return {
    type: CREATE_REVIEW_SUCCESS,
    payload: { success },
  };
}

export function createReviewError(error) {
  return {
    type: CREATE_REVIEW_ERROR,
    payload: { error },
  };
}

export function updateReviewRecord(breadcrumbsCategories) {
  return async (dispatch) => {
    dispatch(updateReview());
    return await reviewService
      .createReview(breadcrumbsCategories)
      
      .then((response) => dispatch(updateReviewSuccess(response)))
      .catch((error) => dispatch(updateReviewError(error)));
  };
}

export function updateReview() {
  return {
    type: UPDATE_REVIEW,
  };
}

export function updateReviewSuccess(success) {
  return {
    type: UPDATE_REVIEW_SUCCESS,
    payload: { success },
  };
}

export function updateReviewError(error) {
  return {
    type: UPDATE_REVIEW_ERROR,
    payload: { error },
  };
}

export function deleteReviewRecord(id) {
  return async (dispatch) => {
    dispatch(deleteReview());
    return await reviewService
      .deleteReview(id)

      .then((response) => dispatch(deleteReviewSuccess(response)))
      .catch((error) => dispatch(deleteReviewError(error)));
  };
}

export function deleteReview() {
  return {
    type: DELETE_REVIEW,
  };
}

export function deleteReviewSuccess(success) {
  return {
    type: DELETE_REVIEW_SUCCESS,
    payload: { success },
  };
}

export function deleteReviewError(error) {
  return {
    type: DELETE_REVIEW_ERROR,
    payload: { error },
  };
}
