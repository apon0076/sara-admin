import sizeService from "../services/sizeService";

export const GET_SIZE = "GET_SIZE";
export const GET_SIZE_SUCCESS = "GET_SIZE_SUCCESS";
export const GET_SIZE_ERROR = "GET_SIZE_ERROR";

export const GET_SIZE_BY_ID = "GET_SIZE_BY_ID";
export const GET_SIZE_BY_ID_SUCCESS = "GET_SIZE_BY_ID_SUCCESS";
export const GET_SIZE_BY_ID_ERROR = "GET_SIZE_BY_ID_ERROR";

export const UPDATE_SIZE = "UPDATE_SIZE";
export const UPDATE_SIZE_SUCCESS = "UPDATE_SIZE_SUCCESS";
export const UPDATE_SIZE_ERROR = "UPDATE_SIZE_ERROR";

export const DELETE_SIZE = "DELETE_SIZE";
export const DELETE_SIZE_SUCCESS = "DELETE_SIZE_SUCCESS";
export const DELETE_SIZE_ERROR = "DELETE_SIZE_ERROR";

export const CREATE_SIZE = "CREATE_SIZE";
export const CREATE_SIZE_SUCCESS = "CREATE_SIZE_SUCCESS";
export const CREATE_SIZE_ERROR = "CREATE_SIZE_ERROR";

//////////////////END OF SIZE ACTION TYPES/////////////////////////

export function getSizeRecord() {
  return async (dispatch) => {
    dispatch(getSize());
    return await sizeService
      .getSize()

      .then((response) => dispatch(getSizeSuccess(response.data)))
      .catch((error) => dispatch(getSizeError(error)));
  };
}

export function getSize() {
  return {
    type: GET_SIZE,
  };
}

export function getSizeSuccess(success) {
  return {
    type: GET_SIZE_SUCCESS,
    payload: { success },
  };
}

export function getSizeError(error) {
  return {
    type: GET_SIZE_ERROR,
    payload: { error },
  };
}

export function getSizeByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getSizeById());
    return await sizeService
      .getSizeById(id)

      .then((response) => dispatch(getSizeByIdSuccess(response.data)))
      .catch((error) => dispatch(getSizeByIdError(error)));
  };
}

export function getSizeById() {
  return {
    type: GET_SIZE_BY_ID,
  };
}

export function getSizeByIdSuccess(success) {
  return {
    type: GET_SIZE_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getSizeByIdError(error) {
  return {
    type: GET_SIZE_BY_ID_ERROR,
    payload: { error },
  };
}

export function createSizeRecord(sizes) {
  return async (dispatch) => {
    dispatch(createSize());
    return await sizeService
      .createSize(sizes)

      .then((response) => dispatch(createSizeSuccess(response)))
      .catch((error) => dispatch(createSizeError(error)));
  };
}

export function createSize() {
  return {
    type: CREATE_SIZE,
  };
}

export function createSizeSuccess(success) {
  return {
    type: CREATE_SIZE_SUCCESS,
    payload: { success },
  };
}

export function createSizeError(error) {
  return {
    type: CREATE_SIZE_ERROR,
    payload: { error },
  };
}

export function updateSizeRecord(sizes) {
  return async (dispatch) => {
    dispatch(updateSize());
    return await sizeService
      .createSize(sizes)
      
      .then((response) => dispatch(updateSizeSuccess(response)))
      .catch((error) => dispatch(updateSizeError(error)));
  };
}

export function updateSize() {
  return {
    type: UPDATE_SIZE,
  };
}

export function updateSizeSuccess(success) {
  return {
    type: UPDATE_SIZE_SUCCESS,
    payload: { success },
  };
}

export function updateSizeError(error) {
  return {
    type: UPDATE_SIZE_ERROR,
    payload: { error },
  };
}

export function deleteSizeRecord(id) {
  return async (dispatch) => {
    dispatch(deleteSize());
    return await sizeService
      .deleteSize(id)

      .then((response) => dispatch(deleteSizeSuccess(response)))
      .catch((error) => dispatch(deleteSizeError(error)));
  };
}

export function deleteSize() {
  return {
    type: DELETE_SIZE,
  };
}

export function deleteSizeSuccess(success) {
  return {
    type: DELETE_SIZE_SUCCESS,
    payload: { success },
  };
}

export function deleteSizeError(error) {
  return {
    type: DELETE_SIZE_ERROR,
    payload: { error },
  };
}