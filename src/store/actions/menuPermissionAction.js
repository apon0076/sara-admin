//////////////////////This is import for API Call/////////////
import menuPermissionService from "../services/menuPermissionService";

export const GET_MENU_PERMISSION = "GET_MENU_PERMISSION";
export const GET_MENU_PERMISSION_SUCCESS = "GET_MENU_PERMISSION_SUCCESS";
export const GET_MENU_PERMISSION_ERROR = "GET_MENU_PERMISSION_ERROR";

export const GET_MENU_PERMISSION_BY_ID = "GET_MENU_PERMISSION_BY_ID";
export const GET_MENU_PERMISSION_BY_ID_SUCCESS =
  "GET_MENU_PERMISSION_BY_ID_SUCCESS";
export const GET_MENU_PERMISSION_BY_ID_ERROR =
  "GET_MENU_PERMISSION_BY_ID_ERROR";

export const CREATE_MENU_PERMISSION = "CREATE_MENU_PERMISSION";
export const CREATE_MENU_PERMISSION_SUCCESS = "CREATE_MENU_PERMISSION_SUCCESS";
export const CREATE_MENU_PERMISSION_ERROR = "CREATE_MENU_PERMISSION_ERROR";

export const UPDATE_MENU_PERMISSION = "UPDATE_MENU_PERMISSION";
export const UPDATE_MENU_PERMISSION_SUCCESS = "UPDATE_MENU_PERMISSION_SUCCESS";
export const UPDATE_MENU_PERMISSION_ERROR = "UPDATE_MENU_PERMISSION_ERROR";

export const DELETE_MENU_PERMISSION = "DELETE_MENU_PERMISSION";
export const DELETE_MENU_PERMISSION_SUCCESS = "DELETE_MENU_PERMISSION_SUCCESS";
export const DELETE_MENU_PERMISSION_ERROR = "DELETE_MENU_PERMISSION_ERROR";

//////////////////END OF COLOR ACTION TYPES/////////////////////////

export function getMenuPermissionRecord() {
  return async (dispatch) => {
    dispatch(getMenuPermission());
    return await menuPermissionService
      .getMenuPermission()

      .then((response) => dispatch(getMenuPermissionSuccess(response.data)))
      .catch((error) => dispatch(getMenuPermissionError(error)));
  };
}

export function getMenuPermission() {
  return {
    type: GET_MENU_PERMISSION,
  };
}

export function getMenuPermissionSuccess(success) {
  return {
    type: GET_MENU_PERMISSION_SUCCESS,
    payload: { success },
  };
}

export function getMenuPermissionError(error) {
  return {
    type: GET_MENU_PERMISSION_ERROR,
    payload: { error },
  };
}

export function getMenuPermissionByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getMenuPermissionById());
    return await menuPermissionService
      .getMenuPermissionById(id)

      .then((response) => dispatch(getMenuPermissionByIdSuccess(response.data)))
      .catch((error) => dispatch(getMenuPermissionByIdError(error)));
  };
}

export function getMenuPermissionById() {
  return {
    type: GET_MENU_PERMISSION_BY_ID,
  };
}

export function getMenuPermissionByIdSuccess(success) {
  return {
    type: GET_MENU_PERMISSION_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getMenuPermissionByIdError(error) {
  return {
    type: GET_MENU_PERMISSION_BY_ID_ERROR,
    payload: { error },
  };
}

export function createMenuPermissionRecord(data) {
  //////debugger;
  return async (dispatch) => {
    dispatch(createMenuPermission());
    return await menuPermissionService
      .createMenuPermission(data)

      .then((response) =>
        dispatch(createMenuPermissionSuccess(response), alert(response.message))
      )
      .catch((error) => dispatch(createMenuPermissionError(error)));
  };
}

export function createMenuPermission() {
  return {
    type: CREATE_MENU_PERMISSION,
  };
}

export function createMenuPermissionSuccess(success) {
  return {
    type: CREATE_MENU_PERMISSION_SUCCESS,
    payload: { success },
  };
}

export function createMenuPermissionError(error) {
  return {
    type: CREATE_MENU_PERMISSION_ERROR,
    payload: { error },
  };
}

export function updateMenuPermissionRecord(menus) {
  return async (dispatch) => {
    dispatch(updateMenuPermission());
    return await menuPermissionService
      .createMenuPermission(menus)

      .then((response) => dispatch(updateMenuPermissionSuccess(response)))
      .catch((error) => dispatch(updateMenuPermissionError(error)));
  };
}

export function updateMenuPermission() {
  return {
    type: UPDATE_MENU_PERMISSION,
  };
}

export function updateMenuPermissionSuccess(success) {
  return {
    type: UPDATE_MENU_PERMISSION_SUCCESS,
    payload: { success },
  };
}

export function updateMenuPermissionError(error) {
  return {
    type: UPDATE_MENU_PERMISSION_ERROR,
    payload: { error },
  };
}

export function deleteMenuPermissionRecord(id) {
  return async (dispatch) => {
    dispatch(deleteMenuPermission());
    return await menuPermissionService
      .deleteMenuPermission(id)

      .then((response) => dispatch(deleteMenuPermissionSuccess(response)))
      .catch((error) => dispatch(deleteMenuPermissionError(error)));
  };
}

export function deleteMenuPermission() {
  return {
    type: DELETE_MENU_PERMISSION,
  };
}

export function deleteMenuPermissionSuccess(success) {
  return {
    type: DELETE_MENU_PERMISSION_SUCCESS,
    payload: { success },
  };
}

export function deleteMenuPermissionError(error) {
  return {
    type: DELETE_MENU_PERMISSION_ERROR,
    payload: { error },
  };
}
