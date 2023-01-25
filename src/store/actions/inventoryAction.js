//////////////////////This is import for API Call/////////////
import inventoryService from "../services/inventoryService";

export const GET_INVENTORY = "GET_INVENTORY";
export const GET_INVENTORY_SUCCESS = "GET_INVENTORY_SUCCESS";
export const GET_INVENTORY_ERROR = "GET_INVENTORY_ERROR";

export const GET_INVENTORY_BY_ID = "GET_INVENTORY_BY_ID";
export const GET_INVENTORY_BY_ID_SUCCESS = "GET_INVENTORY_BY_ID_SUCCESS";
export const GET_INVENTORY_BY_ID_ERROR = "GET_INVENTORY_BY_ID_ERROR";

export const CREATE_INVENTORY = "CREATE_INVENTORY";
export const CREATE_INVENTORY_SUCCESS = "CREATE_INVENTORY_SUCCESS";
export const CREATE_INVENTORY_ERROR = "CREATE_INVENTORY_ERROR";

export const UPDATE_INVENTORY = "UPDATE_INVENTORY";
export const UPDATE_INVENTORY_SUCCESS = "UPDATE_INVENTORY_SUCCESS";
export const UPDATE_INVENTORY_ERROR = "UPDATE_INVENTORY_ERROR";

export const DELETE_INVENTORY = "DELETE_INVENTORY";
export const DELETE_INVENTORY_SUCCESS = "DELETE_INVENTORY_SUCCESS";
export const DELETE_INVENTORY_ERROR = "DELETE_INVENTORY_ERROR";

//////////////////End of Attribute Action Types/////////////////////////

export function getInventoryRecord() {
  return async (dispatch) => {
    dispatch(getInventory());
    return await inventoryService
      .getInventory()

      .then((response) => dispatch(getInventorySuccess(response.data)))
      .catch((error) => dispatch(getInventoryError(error)));
  };
}

export function getInventory() {
  return {
    type: GET_INVENTORY,
  };
}

export function getInventorySuccess(success) {
  return {
    type: GET_INVENTORY_SUCCESS,
    payload: { success },
  };
}

export function getInventoryError(error) {
  return {
    type: GET_INVENTORY_ERROR,
    payload: { error },
  };
}

export function getInventoryByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getInventoryById());
    return await inventoryService
      .getInventoryById(id)

      .then((response) => dispatch(getInventoryByIdSuccess(response.data)))
      .catch((error) => dispatch(getInventoryByIdError(error)));
  };
}

export function getInventoryById() {
  return {
    type: GET_INVENTORY_BY_ID,
  };
}

export function getInventoryByIdSuccess(success) {
  return {
    type: GET_INVENTORY_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getInventoryByIdError(error) {
  return {
    type: GET_INVENTORY_BY_ID_ERROR,
    payload: { error },
  };
}

export function createInventoryRecord(inventory) {
  return async (dispatch) => {
    dispatch(createInventory());
    return await inventoryService
      .createInventory(inventory)
      
      .then((response) => dispatch(createInventorySuccess(response)))
      .catch((error) => dispatch(createInventoryError(error)));
  };
}

export function createInventory() {
  return {
    type: CREATE_INVENTORY,
  };
}

export function createInventorySuccess(success) {
  return {
    type: CREATE_INVENTORY_SUCCESS,
    payload: { success },
  };
}

export function createInventoryError(error) {
  return {
    type: CREATE_INVENTORY_ERROR,
    payload: { error },
  };
}

export function updateInventoryRecord(brand) {
  return async (dispatch) => {
    dispatch(updateInventory());
    return await inventoryService
      .createInventory(brand)

      .then((response) => dispatch(updateInventorySuccess(response)))
      .catch((error) => dispatch(updateInventoryError(error)));
  };
}

export function updateInventory() {
  return {
    type: UPDATE_INVENTORY,
  };
}

export function updateInventorySuccess(success) {
  return {
    type: UPDATE_INVENTORY_SUCCESS,
    payload: { success },
  };
}

export function updateInventoryError(error) {
  return {
    type: UPDATE_INVENTORY_ERROR,
    payload: { error },
  };
}

export function deleteInventoryRecord(id) {
  return async (dispatch) => {
    dispatch(deleteInventory());
    return await inventoryService
      .deleteInventory(id)

      .then((response) => dispatch(deleteInventorySuccess(response)))
      .catch((error) => dispatch(deleteInventoryError(error)));
  };
}

export function deleteInventory() {
  return {
    type: DELETE_INVENTORY,
  };
}

export function deleteInventorySuccess(success) {
  return {
    type: DELETE_INVENTORY_SUCCESS,
    payload: { success },
  };
}

export function deleteInventoryError(error) {
  return {
    type: DELETE_INVENTORY_ERROR,
    payload: { error },
  };
}
