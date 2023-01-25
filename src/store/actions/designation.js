//////////////////////This is import for API Call/////////////
import designationService from "../services/designation"

export const GET_DESIGNATION = "GET_DESIGNATION"
export const GET_DESIGNATION_SUCCESS = "GET_DESIGNATION_SUCCESS"
export const GET_DESIGNATION_ERROR = "GET_DESIGNATION_ERROR"

export const GET_DESIGNATION_BY_ID = "GET_DESIGNATION_BY_ID"
export const GET_DESIGNATION_BY_ID_SUCCESS = "GET_DESIGNATION_BY_ID_SUCCESS"
export const GET_DESIGNATION_BY_ID_ERROR = "GET_DESIGNATION_BY_ID_ERROR"

export const CREATE_DESIGNATION = "CREATE_DESIGNATION"
export const CREATE_DESIGNATION_SUCCESS = "CREATE_DESIGNATION_SUCCESS"
export const CREATE_DESIGNATION_ERROR = "CREATE_DESIGNATION_ERROR"

export const UPDATE_DESIGNATION = "UPDATE_DESIGNATION"
export const UPDATE_DESIGNATION_SUCCESS = "UPDATE_DESIGNATION_SUCCESS"
export const UPDATE_DESIGNATION_ERROR = "UPDATE_DESIGNATION_ERROR"

export const DELETE_DESIGNATION = "DELETE_DESIGNATION"
export const DELETE_DESIGNATION_SUCCESS = "DELETE_DESIGNATION_SUCCESS"
export const DELETE_DESIGNATION_ERROR = "DELETE_DESIGNATION_ERROR"

//////////////////END OF DESIGNATION ACTION TYPES/////////////////////////

export function getDesignationRecord() {
  return async (dispatch) => {
    dispatch(getDesignation())
    return await designationService
      .getDesignation()

      .then((response) => dispatch(getDesignationSuccess(response.data)))
      .catch((error) => dispatch(getDesignationError(error)))
  }
}

export function getDesignation() {
  return {
    type: GET_DESIGNATION,
  }
}

export function getDesignationSuccess(success) {
  return {
    type: GET_DESIGNATION_SUCCESS,
    payload: { success },
  }
}

export function getDesignationError(error) {
  return {
    type: GET_DESIGNATION_ERROR,
    payload: { error },
  }
}

export function getDesignationByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getDesignationById())
    return await designationService
      .getDesignationById(id)

      .then((response) => dispatch(getDesignationByIdSuccess(response.data)))
      .catch((error) => dispatch(getDesignationByIdError(error)))
  }
}

export function getDesignationById() {
  return {
    type: GET_DESIGNATION_BY_ID,
  }
}

export function getDesignationByIdSuccess(success) {
  return {
    type: GET_DESIGNATION_BY_ID_SUCCESS,
    payload: { success },
  }
}

export function getDesignationByIdError(error) {
  return {
    type: GET_DESIGNATION_BY_ID_ERROR,
    payload: { error },
  }
}

export function createDesignationRecord(colors) {
  return async (dispatch) => {
    dispatch(createDesignation())
    return await designationService
      .createDesignation(colors)
      
      .then((response) => dispatch(createDesignationSuccess(response)))
      .catch((error) => dispatch(createDesignationError(error)))
  }
}

export function createDesignation() {
  return {
    type: CREATE_DESIGNATION,
  }
}

export function createDesignationSuccess(success) {
  return {
    type: CREATE_DESIGNATION_SUCCESS,
    payload: { success },
  }
}

export function createDesignationError(error) {
  return {
    type: CREATE_DESIGNATION_ERROR,
    payload: { error },
  }
}

export function updateDesignationRecord(colors) {
  return async (dispatch) => {
    dispatch(updateDesignation())
    return await designationService
      .createDesignation(colors)

      .then((response) => dispatch(updateDesignationSuccess(response)))
      .catch((error) => dispatch(updateDesignationError(error)))
  }
}

export function updateDesignation() {
  return {
    type: UPDATE_DESIGNATION,
  }
}

export function updateDesignationSuccess(success) {
  return {
    type: UPDATE_DESIGNATION_SUCCESS,
    payload: { success },
  }
}

export function updateDesignationError(error) {
  return {
    type: UPDATE_DESIGNATION_ERROR,
    payload: { error },
  }
}

export function deleteDesignationRecord(id) {
  return async (dispatch) => {
    dispatch(deleteDesignation())
    return await designationService
      .deleteDesignation(id)

      .then((response) => dispatch(deleteDesignationSuccess(response)))
      .catch((error) => dispatch(deleteDesignationError(error)))
  }
}

export function deleteDesignation() {
  return {
    type: DELETE_DESIGNATION,
  }
}

export function deleteDesignationSuccess(success) {
  return {
    type: DELETE_DESIGNATION_SUCCESS,
    payload: { success },
  }
}

export function deleteDesignationError(error) {
  return {
    type: DELETE_DESIGNATION_ERROR,
    payload: { error },
  }
}
