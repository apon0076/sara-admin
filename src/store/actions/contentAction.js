import contentService from "../services/contentService";

export const CREATE_OR_UPDATE_CONTENT_TYPE = "CREATE_OR_UPDATE_CONTENT_TYPE";
export const CREATE_OR_UPDATE_CONTENT_TYPE_SUCCESS = "CREATE_OR_UPDATE_CONTENT_TYPE_SUCCESS";
export const CREATE_OR_UPDATE_CONTENT_TYPE_ERROR = "CREATE_OR_UPDATE_CONTENT_TYPE_ERROR";

export const GET_CONTENT_TYPE = "GET_CONTENT_TYPE";
export const GET_CONTENT_TYPE_SUCCESS = "GET_CONTENT_TYPE_SUCCESS";
export const GET_CONTENT_TYPE_ERROR = "GET_CONTENT_TYPE_ERROR";

export const CREATE_OR_UPDATE_CONTENT_POST = "CREATE_OR_UPDATE_CONTENT_POST";
export const CREATE_OR_UPDATE_CONTENT_POST_SUCCESS = "CREATE_OR_UPDATE_CONTENT_POST_SUCCESS";
export const CREATE_OR_UPDATE_CONTENT_POST_ERROR = "CREATE_OR_UPDATE_CONTENT_POST_ERROR";
export const CREATE_OR_UPDATE_CONTENT_POST_RESET = "CREATE_OR_UPDATE_CONTENT_POST_RESET";

export const GET_CONTENT_POST = "GET_CONTENT_POST";
export const GET_CONTENT_POST_SUCCESS = "GET_CONTENT_POST_SUCCESS";
export const GET_CONTENT_POST_ERROR = "GET_CONTENT_POST_ERROR";
export const GET_CONTENT_POST_RESET = "GET_CONTENT_POST_RESET";

// Create Content Type Start
export function createOrUpdateContentTypeRecord(data) {
  return async (dispatch) => {
    dispatch(createOrUpdateContentType());
    return await contentService
      .createOrUpdateContentType(data)

      .then((response) => dispatch(createOrUpdateContentTypeSuccess(response)))
      .catch((error) => dispatch(createOrUpdateContentTypeError(error)));
  };
}

export function createOrUpdateContentType() {
  return {
    type: CREATE_OR_UPDATE_CONTENT_TYPE,
  };
}

export function createOrUpdateContentTypeSuccess(success) {
  return {
    type: CREATE_OR_UPDATE_CONTENT_TYPE_SUCCESS,
    payload: { success },
  };
}

export function createOrUpdateContentTypeError(error) {
  return {
    type: CREATE_OR_UPDATE_CONTENT_TYPE_ERROR,
    payload: { error },
  };
}
// Create Content Type End

// Get Content Type Start
export function getContentTypeRecord() {
  return async (dispatch) => {
    dispatch(getContentType());
    return await contentService
      .getContentType()

      .then((response) => dispatch(getContentTypeSuccess(response)))
      .catch((error) => dispatch(getContentTypeError(error)));
  };
}

export function getContentType() {
  return {
    type: GET_CONTENT_TYPE,
  };
}

export function getContentTypeSuccess(success) {
  return {
    type: GET_CONTENT_TYPE_SUCCESS,
    payload: { success },
  };
}

export function getContentTypeError(error) {
  return {
    type: GET_CONTENT_TYPE_ERROR,
    payload: { error },
  };
}
// Get Content Type Start

// Create Content Post Start
export function createOrUpdateContentPostRecord(data) {
  return async (dispatch) => {
    dispatch(createOrUpdateContentPost());
    return await contentService
      .createOrUpdateContentPost(data)

      .then((response) => dispatch(createOrUpdateContentPostSuccess(response)))
      .catch((error) => dispatch(createOrUpdateContentPostError(error)));
  };
}

export function createOrUpdateContentPost() {
  return {
    type: CREATE_OR_UPDATE_CONTENT_POST,
  };
}

export function createOrUpdateContentPostSuccess(success) {
  return {
    type: CREATE_OR_UPDATE_CONTENT_POST_SUCCESS,
    payload: { success },
  };
}

export function createOrUpdateContentPostError(error) {
  return {
    type: CREATE_OR_UPDATE_CONTENT_POST_ERROR,
    payload: { error },
  };
}
export function createOrUpdateContentPostReset() {
  return {
    type: CREATE_OR_UPDATE_CONTENT_POST_RESET,
  };
}
// Create Content Post End

// Get Content Type Start
export function getContentPostRecord() {
  return async (dispatch) => {
    dispatch(getContentPost());
    return await contentService
      .getContentPost()

      .then((response) => dispatch(getContentPostSuccess(response)))
      .catch((error) => dispatch(getContentPostError(error)));
  };
}

export function getContentPost() {
  return {
    type: GET_CONTENT_POST,
  };
}

export function getContentPostSuccess(success) {
  return {
    type: GET_CONTENT_POST_SUCCESS,
    payload: { success },
  };
}

export function getContentPostError(error) {
  return {
    type: GET_CONTENT_POST_ERROR,
    payload: { error },
  };
}

export function getContentPostReset() {
  return {
    type: GET_CONTENT_POST_RESET,
  };
}
// Get Content Type Start