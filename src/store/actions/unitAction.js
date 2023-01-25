import unitService from "../services/unitService";

export const GET_UNIT = "GET_UNIT";
export const GET_UNIT_SUCCESS = "GET_UNIT_SUCCESS";
export const GET_UNIT_ERROR = "GET_UNIT_ERROR";

export const GET_UNIT_BY_ID = "GET_UNIT_BY_ID";
export const GET_UNIT_BY_ID_SUCCESS = "GET_UNIT_BY_ID_SUCCESS";
export const GET_UNIT_BY_ID_ERROR = "GET_UNIT_BY_ID_ERROR";

export const CREATE_UNIT = "CREATE_UNIT";
export const CREATE_UNIT_SUCCESS = "CREATE_UNIT_SUCCESS";
export const CREATE_UNIT_ERROR = "CREATE_UNIT_ERROR";

export const UPDATE_UNIT = "UPDATE_UNIT";
export const UPDATE_UNIT_SUCCESS = "UPDATE_UNIT_SUCCESS";
export const UPDATE_UNIT_ERROR = "UPDATE_UNIT_ERROR";

export const DELETE_UNIT = "DELETE_UNIT";
export const DELETE_UNIT_SUCCESS = "DELETE_UNIT_SUCCESS";
export const DELETE_UNIT_ERROR = "DELETE_UNIT_ERROR";

//////////////////End of Attribute Action Types/////////////////////////

export function getUnitRecord() {
  return async (dispatch) => {
    dispatch(getUnit());
    return await unitService
      .getUnit()

      .then((response) => dispatch(getUnitSuccess(response.data)))
      .catch((error) => dispatch(getUnitError(error)));
  };
}

export function getUnit() {
  return {
    type: GET_UNIT,
  };
}

export function getUnitSuccess(success) {
  return {
    type: GET_UNIT_SUCCESS,
    payload: { success },
  };
}

export function getUnitError(error) {
  return {
    type: GET_UNIT_ERROR,
    payload: { error },
  };
}

export function getUnitByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getUnitById());
    return await unitService
      .getUnitById(id)

      .then((response) => dispatch(getUnitByIdSuccess(response.data)))
      .catch((error) => dispatch(getUnitByIdError(error)));
  };
}

export function getUnitById() {
  return {
    type: GET_UNIT_BY_ID,
  };
}

export function getUnitByIdSuccess(success) {
  return {
    type: GET_UNIT_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getUnitByIdError(error) {
  return {
    type: GET_UNIT_BY_ID_ERROR,
    payload: { error },
  };
}

export function createUnitRecord(unit) {
  return async (dispatch) => {
    dispatch(createUnit());
    return await unitService
      .createUnit(unit)

      .then((response) => dispatch(createUnitSuccess(response)))
      .catch((error) => dispatch(createUnitError(error)));
  };
}

export function createUnit() {
  return {
    type: CREATE_UNIT,
  };
}

export function createUnitSuccess(success) {
  return {
    type: CREATE_UNIT_SUCCESS,
    payload: { success },
  };
}

export function createUnitError(error) {
  return {
    type: CREATE_UNIT_ERROR,
    payload: { error },
  };
}

export function updateUnitRecord(unit) {
  return async (dispatch) => {
    dispatch(updateUnit());
    return await unitService
      .createUnit(unit)
      
      .then((response) => dispatch(updateUnitSuccess(response)))
      .catch((error) => dispatch(updateUnitError(error)));
  };
}

export function updateUnit() {
  return {
    type: UPDATE_UNIT,
  };
}

export function updateUnitSuccess(success) {
  return {
    type: UPDATE_UNIT_SUCCESS,
    payload: { success },
  };
}

export function updateUnitError(error) {
  return {
    type: UPDATE_UNIT_ERROR,
    payload: { error },
  };
}

export function deleteUnitRecord(id) {
  return async (dispatch) => {
    dispatch(deleteUnit());
    return await unitService
      .deleteUnit(id)

      .then((response) => dispatch(deleteUnitSuccess(response)))
      .catch((error) => dispatch(deleteUnitError(error)));
  };
}

export function deleteUnit() {
  return {
    type: DELETE_UNIT,
  };
}

export function deleteUnitSuccess(success) {
  return {
    type: DELETE_UNIT_SUCCESS,
    payload: { success },
  };
}

export function deleteUnitError(error) {
  return {
    type: DELETE_UNIT_ERROR,
    payload: { error },
  };
}
