//////////////////////This is import for API Call/////////////
import menuService from "../services/menuService";

export const GET_MENU = "GET_MENU";
export const GET_MENU_SUCCESS = "GET_MENU_SUCCESS";
export const GET_MENU_ERROR = "GET_MENU_ERROR";

export const GET_MENU_BY_ID = "GET_MENU_BY_ID";
export const GET_MENU_BY_ID_SUCCESS = "GET_MENU_BY_ID_SUCCESS";
export const GET_MENU_BY_ID_ERROR = "GET_MENU_BY_ID_ERROR";

export const CREATE_MENU = "CREATE_MENU";
export const CREATE_MENU_SUCCESS = "CREATE_MENU_SUCCESS";
export const CREATE_MENU_ERROR = "CREATE_MENU_ERROR";

export const UPDATE_MENU = "UPDATE_MENU";
export const UPDATE_MENU_SUCCESS = "UPDATE_MENU_SUCCESS";
export const UPDATE_MENU_ERROR = "UPDATE_MENU_ERROR";

export const DELETE_MENU = "DELETE_MENU";
export const DELETE_MENU_SUCCESS = "DELETE_MENU_SUCCESS";
export const DELETE_MENU_ERROR = "DELETE_MENU_ERROR";

//////////////////END OF COLOR ACTION TYPES/////////////////////////

export function getMenuRecord() {
  return async (dispatch) => {
    dispatch(getMenu());
    return await menuService
      .getMenu()

      .then((response) => dispatch(getMenuSuccess(response.data)))
      .catch((error) => dispatch(getMenuError(error)));
  };
}

export function getMenu() {
  return {
    type: GET_MENU,
  };
}

export function getMenuSuccess(success) {
  return {
    type: GET_MENU_SUCCESS,
    payload: { success },
  };
}

export function getMenuError(error) {
  return {
    type: GET_MENU_ERROR,
    payload: { error },
  };
}

export function getMenuByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getMenuById());
    return await menuService
      .getMenuById(id)

      .then((response) => dispatch(getMenuByIdSuccess(response.data)))
      .catch((error) => dispatch(getMenuByIdError(error)));
  };
}

export function getMenuById() {
  return {
    type: GET_MENU_BY_ID,
  };
}

export function getMenuByIdSuccess(success) {
  return {
    type: GET_MENU_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getMenuByIdError(error) {
  return {
    type: GET_MENU_BY_ID_ERROR,
    payload: { error },
  };
}

export function createMenuRecord(data) {
  //////debugger;
  return async (dispatch) => {
    dispatch(createMenu());
    return await menuService
      .createMenu(data)

      .then((response) =>
        dispatch(createMenuSuccess(response), alert(response.message))
      )
      .catch((error) => dispatch(createMenuError(error)));
  };
}

export function createMenu() {
  return {
    type: CREATE_MENU,
  };
}

export function createMenuSuccess(success) {
  return {
    type: CREATE_MENU_SUCCESS,
    payload: { success },
  };
}

export function createMenuError(error) {
  return {
    type: CREATE_MENU_ERROR,
    payload: { error },
  };
}

export function updateMenuRecord(menus) {
  return async (dispatch) => {
    dispatch(updateMenu());
    return await menuService
      .createMenu(menus)

      .then((response) => dispatch(updateMenuSuccess(response)))
      .catch((error) => dispatch(updateMenuError(error)));
  };
}

export function updateMenu() {
  return {
    type: UPDATE_MENU,
  };
}

export function updateMenuSuccess(success) {
  return {
    type: UPDATE_MENU_SUCCESS,
    payload: { success },
  };
}

export function updateMenuError(error) {
  return {
    type: UPDATE_MENU_ERROR,
    payload: { error },
  };
}

export function deleteMenuRecord(id) {
  return async (dispatch) => {
    dispatch(deleteMenu());
    return await menuService
      .deleteMenu(id)

      .then((response) => dispatch(deleteMenuSuccess(response)))
      .catch((error) => dispatch(deleteMenuError(error)));
  };
}

export function deleteMenu() {
  return {
    type: DELETE_MENU,
  };
}

export function deleteMenuSuccess(success) {
  return {
    type: DELETE_MENU_SUCCESS,
    payload: { success },
  };
}

export function deleteMenuError(error) {
  return {
    type: DELETE_MENU_ERROR,
    payload: { error },
  };
}
