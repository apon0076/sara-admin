//////////////////////This is import for API Call/////////////
import bussinessTypeService from "../services/bussinessTypeService";

export const GET_BUSSINESS_TYPE = "GET_BUSSINESS_TYPE";
export const GET_BUSSINESS_TYPE_SUCCESS = "GET_BUSSINESS_TYPE_SUCCESS";
export const GET_BUSSINESS_TYPE_ERROR = "GET_BUSSINESS_TYPE_ERROR";

export const GET_BUSSINESS_TYPE_BY_ID = "GET_BUSSINESS_TYPE_BY_ID";
export const GET_BUSSINESS_TYPE_BY_ID_SUCCESS =
  "GET_BUSSINESS_TYPE_BY_ID_SUCCESS";
export const GET_BUSSINESS_TYPE_BY_ID_ERROR = "GET_BUSSINESS_TYPE_BY_ID_ERROR";

export const CREATE_BUSSINESS_TYPE = "CREATE_BUSSINESS_TYPE";
export const CREATE_BUSSINESS_TYPE_SUCCESS = "CREATE_BUSSINESS_TYPE_SUCCESS";
export const CREATE_BUSSINESS_TYPE_ERROR = "CREATE_BUSSINESS_TYPE_ERROR";

export const UPDATE_BUSSINESS_TYPE = "UPDATE_BUSSINESS_TYPE";
export const UPDATE_BUSSINESS_TYPE_SUCCESS = "UPDATE_BUSSINESS_TYPE_SUCCESS";
export const UPDATE_BUSSINESS_TYPE_ERROR = "UPDATE_BUSSINESS_TYPE_ERROR";

export const DELETE_BUSSINESS_TYPE = "DELETE_BUSSINESS_TYPE";
export const DELETE_BUSSINESS_TYPE_SUCCESS = "DELETE_BUSSINESS_TYPE_SUCCESS";
export const DELETE_BUSSINESS_TYPE_ERROR = "DELETE_BUSSINESS_TYPE_ERROR";

//////////////////END OF BUSSINESS TYPE ACTION TYPES/////////////////////////

export function getBussinessTypeRecord() {
  return async (dispatch) => {
    dispatch(getBussinessType());
    return await bussinessTypeService
      .getBussinessType()

      .then((response) => dispatch(getBussinessTypeSuccess(response.data)))
      .catch((error) => dispatch(getBussinessTypeError(error)));
  };
}

export function getBussinessType() {
  return {
    type: GET_BUSSINESS_TYPE,
  };
}

export function getBussinessTypeSuccess(success) {
  return {
    type: GET_BUSSINESS_TYPE_SUCCESS,
    payload: { success },
  };
}

export function getBussinessTypeError(error) {
  return {
    type: GET_BUSSINESS_TYPE_ERROR,
    payload: { error },
  };
}

export function getBussinessTypeByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getBussinessTypeById());
    return await bussinessTypeService
      .getBussinessTypeId(id)

      .then((response) => dispatch(getBussinessTypeByIdSuccess(response.data)))
      .catch((error) => dispatch(getBussinessTypeByIdError(error)));
  };
}

export function getBussinessTypeById() {
  return {
    type: GET_BUSSINESS_TYPE_BY_ID,
  };
}

export function getBussinessTypeByIdSuccess(success) {
  return {
    type: GET_BUSSINESS_TYPE_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getBussinessTypeByIdError(error) {
  return {
    type: GET_BUSSINESS_TYPE_ERROR,
    payload: { error },
  };
}

export function createBussinessTypeRecord(bussinessTypes) {
  return async (dispatch) => {
    dispatch(createBussinessType());
    return await bussinessTypeService
      .createBussinessType(bussinessTypes)
      
      .then((response) => dispatch(createBussinessTypeSuccess(response)))
      .catch((error) => dispatch(createBussinessTypeError(error)));
  };
}

export function createBussinessType() {
  return {
    type: CREATE_BUSSINESS_TYPE,
  };
}

export function createBussinessTypeSuccess(success) {
  return {
    type: CREATE_BUSSINESS_TYPE_SUCCESS,
    payload: { success },
  };
}

export function createBussinessTypeError(error) {
  return {
    type: CREATE_BUSSINESS_TYPE_ERROR,
    payload: { error },
  };
}

export function updateBussinessTypeRecord(bussinessTypes) {
  return async (dispatch) => {
    dispatch(updateBussinessType());
    return await bussinessTypeService
      .createBussinessType(bussinessTypes)

      .then((response) => dispatch(updateBussinessTypeSuccess(response)))
      .catch((error) => dispatch(updateBussinessTypeError(error)));
  };
}

export function updateBussinessType() {
  return {
    type: UPDATE_BUSSINESS_TYPE,
  };
}

export function updateBussinessTypeSuccess(success) {
  return {
    type: UPDATE_BUSSINESS_TYPE_SUCCESS,
    payload: { success },
  };
}

export function updateBussinessTypeError(error) {
  return {
    type: UPDATE_BUSSINESS_TYPE_ERROR,
    payload: { error },
  };
}

export function deleteBussinessTypeRecord(id) {
  return async (dispatch) => {
    dispatch(deleteBussinessType());
    return await bussinessTypeService
      .deleteBussinessType(id)

      .then((response) => dispatch(deleteBussinessTypeSuccess(response)))
      .catch((error) => dispatch(deleteBussinessTypeError(error)));
  };
}

export function deleteBussinessType() {
  return {
    type: DELETE_BUSSINESS_TYPE,
  };
}

export function deleteBussinessTypeSuccess(success) {
  return {
    type: DELETE_BUSSINESS_TYPE_SUCCESS,
    payload: { success },
  };
}

export function deleteBussinessTypeError(error) {
  return {
    type: DELETE_BUSSINESS_TYPE_ERROR,
    payload: { error },
  };
}
