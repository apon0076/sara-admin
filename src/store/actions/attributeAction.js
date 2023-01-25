//////////////////////This is import for API Call/////////////
import inventoryService from "../services/inventoryService";

export const GET_ATTRIBUTE = "GET_ATTRIBUTE";
export const GET_ATTRIBUTE_SUCCESS = "GET_ATTRIBUTE_SUCCESS";
export const GET_ATTRIBUTE_ERROR = "GET_ATTRIBUTE_ERROR";

export const GET_ATTRIBUTE_BY_ID = "GET_ATTRIBUTE_BY_ID";
export const GET_ATTRIBUTE_BY_ID_SUCCESS = "GET_ATTRIBUTE_BY_ID_SUCCESS";
export const GET_ATTRIBUTE_BY_ID_ERROR = "GET_ATTRIBUTE_BY_ID_ERROR";

export const CREATE_ATTRIBUTE = "CREATE_ATTRIBUTE";
export const CREATE_ATTRIBUTE_SUCCESS = "CREATE_ATTRIBUTE_SUCCESS";
export const CREATE_ATTRIBUTE_ERROR = "CREATE_ATTRIBUTE_ERROR";

export const UPDATE_ATTRIBUTE = "UPDATE_ATTRIBUTE";
export const UPDATE_ATTRIBUTE_SUCCESS = "UPDATE_ATTRIBUTE_SUCCESS";
export const UPDATE_ATTRIBUTE_ERROR = "UPDATE_ATTRIBUTE_ERROR";

export const DELETE_ATTRIBUTE = "DELETE_ATTRIBUTE";
export const DELETE_ATTRIBUTE_SUCCESS = "DELETE_ATTRIBUTE_SUCCESS";
export const DELETE_ATTRIBUTE_ERROR = "DELETE_ATTRIBUTE_ERROR";

//////////////////End of Attribute Action Types/////////////////////////

export function getAttributeRecord() {
  return async (dispatch) => {
    dispatch(getAttribute());
    return await inventoryService
      .getAttribute()

      .then((response) => dispatch(getAttributeSuccess(response.data)))
      .catch((error) => dispatch(getAttributeError(error)));
  };
}

export function getAttribute() {
  return {
    type: GET_ATTRIBUTE,
  };
}

export function getAttributeSuccess(success) {
  return {
    type: GET_ATTRIBUTE_SUCCESS,
    payload: { success },
  };
}

export function getAttributeError(error) {
  return {
    type: GET_ATTRIBUTE_ERROR,
    payload: { error },
  };
}

export function getAttributeByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getAttributeById());
    return await inventoryService
      .getAttributeById(id)

      .then((response) => dispatch(getAttributeByIdSuccess(response.data)))
      .catch((error) => dispatch(getAttributeByIdError(error)));
  };
}

export function getAttributeById() {
  return {
    type: GET_ATTRIBUTE_BY_ID,
  };
}

export function getAttributeByIdSuccess(success) {
  return {
    type: GET_ATTRIBUTE_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getAttributeByIdError(error) {
  return {
    type: GET_ATTRIBUTE_BY_ID_ERROR,
    payload: { error },
  };
}

export function createAttributeRecord(brand) {
  return async (dispatch) => {
    dispatch(createAttribute());
    return await inventoryService
      .createAttribute(brand)
      
      .then((response) => dispatch(createAttributeSuccess(response)))
      .catch((error) => dispatch(createAttributeError(error)));
  };
}

export function createAttribute() {
  return {
    type: CREATE_ATTRIBUTE,
  };
}

export function createAttributeSuccess(success) {
  return {
    type: CREATE_ATTRIBUTE_SUCCESS,
    payload: { success },
  };
}

export function createAttributeError(error) {
  return {
    type: CREATE_ATTRIBUTE_ERROR,
    payload: { error },
  };
}

export function updateAttributeRecord(brand) {
  return async (dispatch) => {
    dispatch(updateAttribute());
    return await inventoryService
      .createAttribute(brand)

      .then((response) => dispatch(updateAttributeSuccess(response)))
      .catch((error) => dispatch(updateAttributeError(error)));
  };
}

export function updateAttribute() {
  return {
    type: UPDATE_ATTRIBUTE,
  };
}

export function updateAttributeSuccess(success) {
  return {
    type: UPDATE_ATTRIBUTE_SUCCESS,
    payload: { success },
  };
}

export function updateAttributeError(error) {
  return {
    type: UPDATE_ATTRIBUTE_ERROR,
    payload: { error },
  };
}

export function deleteAttributeRecord(id) {
  return async (dispatch) => {
    dispatch(deleteAttribute());
    return await inventoryService
      .deleteAttribute(id)

      .then((response) => dispatch(deleteAttributeSuccess(response)))
      .catch((error) => dispatch(deleteAttributeError(error)));
  };
}

export function deleteAttribute() {
  return {
    type: DELETE_ATTRIBUTE,
  };
}

export function deleteAttributeSuccess(success) {
  return {
    type: DELETE_ATTRIBUTE_SUCCESS,
    payload: { success },
  };
}

export function deleteAttributeError(error) {
  return {
    type: DELETE_ATTRIBUTE_ERROR,
    payload: { error },
  };
}
