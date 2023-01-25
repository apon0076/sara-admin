//////////////////////This is import for API Call/////////////
import popUpService from "../services/popUpService";

export const GET_POPUP = "GET_POPUP";
export const GET_POPUP_SUCCESS = "GET_POPUP_SUCCESS";
export const GET_POPUP_ERROR = "GET_POPUP_ERROR";

export const GET_POPUP_BY_ID = "GET_POPUP_BY_ID";
export const GET_POPUP_BY_ID_SUCCESS = "GET_POPUP_BY_ID_SUCCESS";
export const GET_POPUP_BY_ID_ERROR = "GET_POPUP_BY_ID_ERROR";

export const CREATE_POPUP = "CREATE_POPUP";
export const CREATE_POPUP_SUCCESS = "CREATE_POPUP_SUCCESS";
export const CREATE_POPUP_ERROR = "CREATE_POPUP_ERROR";

export const UPDATE_POPUP = "UPDATE_POPUP";
export const UPDATE_POPUP_SUCCESS = "UPDATE_POPUP_SUCCESS";
export const UPDATE_POPUP_ERROR = "UPDATE_POPUP_ERROR";

export const DELETE_POPUP = "DELETE_POPUP";
export const DELETE_POPUP_SUCCESS = "DELETE_POPUP_SUCCESS";
export const DELETE_POPUP_ERROR = "DELETE_POPUP_ERROR";

//////////////////End of Attribute Action Types/////////////////////////

export function getPopUpRecord() {
  return async (dispatch) => {
    dispatch(getPopUp());
    return await popUpService
      .getPopUp()

      .then((response) => dispatch(getPopUpSuccess(response.data)))
      .catch((error) => dispatch(getPopUpError(error)));
  };
}

export function getPopUp() {
  return {
    type: GET_POPUP,
  };
}

export function getPopUpSuccess(success) {
  return {
    type: GET_POPUP_SUCCESS,
    payload: { success },
  };
}

export function getPopUpError(error) {
  return {
    type: GET_POPUP_ERROR,
    payload: { error },
  };
}

export function getPopUpByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getPopUpById());
    return await popUpService
      .getPopUpById(id)

      .then((response) => dispatch(getPopUpByIdSuccess(response.data)))
      .catch((error) => dispatch(getPopUpByIdError(error)));
  };
}

export function getPopUpById() {
  return {
    type: GET_POPUP_BY_ID,
  };
}

export function getPopUpByIdSuccess(success) {
  return {
    type: GET_POPUP_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getPopUpByIdError(error) {
  return {
    type: GET_POPUP_BY_ID_ERROR,
    payload: { error },
  };
}

export function createPopUpRecord(banner) {
  return async (dispatch) => {
    dispatch(createPopUp());
    return await popUpService
      .createPopUp(banner)
      
      .then((response) => dispatch(createPopUpSuccess(response)))
      .catch((error) => dispatch(createPopUpError(error)));
  };
}

export function createPopUp() {
  return {
    type: CREATE_POPUP,
  };
}

export function createPopUpSuccess(success) {
  return {
    type: CREATE_POPUP_SUCCESS,
    payload: { success },
  };
}

export function createPopUpError(error) {
  return {
    type: CREATE_POPUP_ERROR,
    payload: { error },
  };
}

export function updatePopUpRecord(brand) {
  return async (dispatch) => {
    dispatch(updatePopUp());
    return await popUpService
      .createPopUp(brand)

      .then((response) => dispatch(updatePopUpSuccess(response)))
      .catch((error) => dispatch(updatePopUpError(error)));
  };
}

export function updatePopUp() {
  return {
    type: UPDATE_POPUP,
  };
}

export function updatePopUpSuccess(success) {
  return {
    type: UPDATE_POPUP_SUCCESS,
    payload: { success },
  };
}

export function updatePopUpError(error) {
  return {
    type: UPDATE_POPUP_ERROR,
    payload: { error },
  };
}

export function deletePopUpRecord(id, imageName) {
  return async (dispatch) => {
    dispatch(deletePopUp());
    return await popUpService
      .deletePopUp(id, imageName)

      .then((response) => dispatch(deletePopUpSuccess(response)))
      .catch((error) => dispatch(deletePopUpError(error)));
  };
}

export function deletePopUp() {
  return {
    type: DELETE_POPUP,
  };
}

export function deletePopUpSuccess(success) {
  return {
    type: DELETE_POPUP_SUCCESS,
    payload: { success },
  };
}

export function deletePopUpError(error) {
  return {
    type: DELETE_POPUP_ERROR,
    payload: { error },
  };
}
