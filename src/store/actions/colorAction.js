//////////////////////This is import for API Call/////////////
import colorService from "../services/colorService";

export const GET_COLOR = "GET_COLOR";
export const GET_COLOR_SUCCESS = "GET_COLOR_SUCCESS";
export const GET_COLOR_ERROR = "GET_COLOR_ERROR";

export const GET_COLOR_BY_ID = "GET_COLOR_BY_ID";
export const GET_COLOR_BY_ID_SUCCESS = "GET_COLOR_BY_ID_SUCCESS";
export const GET_COLOR_BY_ID_ERROR = "GET_COLOR_BY_ID_ERROR";

export const CREATE_COLOR = "CREATE_COLOR";
export const CREATE_COLOR_SUCCESS = "CREATE_COLOR_SUCCESS";
export const CREATE_COLOR_ERROR = "CREATE_COLOR_ERROR";

export const UPDATE_COLOR = "UPDATE_COLOR";
export const UPDATE_COLOR_SUCCESS = "UPDATE_COLOR_SUCCESS";
export const UPDATE_COLOR_ERROR = "UPDATE_COLOR_ERROR";

export const DELETE_COLOR = "DELETE_COLOR";
export const DELETE_COLOR_SUCCESS = "DELETE_COLOR_SUCCESS";
export const DELETE_COLOR_ERROR = "DELETE_COLOR_ERROR";

//////////////////END OF COLOR ACTION TYPES/////////////////////////

export function getColorRecord() {
  return async (dispatch) => {
    dispatch(getColor());
    return await colorService
      .getColor()

      .then((response) => dispatch(getColorSuccess(response.data)))
      .catch((error) => dispatch(getColorError(error)));
  };
}

export function getColor() {
  return {
    type: GET_COLOR,
  };
}

export function getColorSuccess(success) {
  return {
    type: GET_COLOR_SUCCESS,
    payload: { success },
  };
}

export function getColorError(error) {
  return {
    type: GET_COLOR_ERROR,
    payload: { error },
  };
}

export function getColorByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getColorById());
    return await colorService
      .getColorById(id)

      .then((response) => dispatch(getColorByIdSuccess(response.data)))
      .catch((error) => dispatch(getColorByIdError(error)));
  };
}

export function getColorById() {
  return {
    type: GET_COLOR_BY_ID,
  };
}

export function getColorByIdSuccess(success) {
  return {
    type: GET_COLOR_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getColorByIdError(error) {
  return {
    type: GET_COLOR_BY_ID_ERROR,
    payload: { error },
  };
}

export function createColorRecord(colors) {
  return async (dispatch) => {
    dispatch(createColor());
    return await colorService
      .createColor(colors)
      
      .then((response) => dispatch(createColorSuccess(response)))
      .catch((error) => dispatch(createColorError(error)));
  };
}

export function createColor() {
  return {
    type: CREATE_COLOR,
  };
}

export function createColorSuccess(success) {
  return {
    type: CREATE_COLOR_SUCCESS,
    payload: { success },
  };
}

export function createColorError(error) {
  return {
    type: CREATE_COLOR_ERROR,
    payload: { error },
  };
}

export function updateColorRecord(colors) {
  return async (dispatch) => {
    dispatch(updateColor());
    return await colorService
      .createColor(colors)

      .then((response) => dispatch(updateColorSuccess(response)))
      .catch((error) => dispatch(updateColorError(error)));
  };
}

export function updateColor() {
  return {
    type: UPDATE_COLOR,
  };
}

export function updateColorSuccess(success) {
  return {
    type: UPDATE_COLOR_SUCCESS,
    payload: { success },
  };
}

export function updateColorError(error) {
  return {
    type: UPDATE_COLOR_ERROR,
    payload: { error },
  };
}

export function deleteColorRecord(id) {
  return async (dispatch) => {
    dispatch(deleteColor());
    return await colorService
      .deleteColor(id)

      .then((response) => dispatch(deleteColorSuccess(response)))
      .catch((error) => dispatch(deleteColorError(error)));
  };
}

export function deleteColor() {
  return {
    type: DELETE_COLOR,
  };
}

export function deleteColorSuccess(success) {
  return {
    type: DELETE_COLOR_SUCCESS,
    payload: { success },
  };
}

export function deleteColorError(error) {
  return {
    type: DELETE_COLOR_ERROR,
    payload: { error },
  };
}
