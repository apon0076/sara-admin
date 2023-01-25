//////////////////////This is import for API Call/////////////
import discountTypeService from "../services/discountTypeService"

export const GET_DISCOUNT_TYPE = "GET_DISCOUNT_TYPE"
export const GET_DISCOUNT_TYPE_SUCCESS = "GET_DISCOUNT_TYPE_SUCCESS"
export const GET_DISCOUNT_TYPE_ERROR = "GET_DISCOUNT_TYPE_ERROR"

export const GET_DISCOUNT_TYPE_BY_ID = "GET_DISCOUNT_TYPE_BY_ID"
export const GET_DISCOUNT_TYPE_BY_ID_SUCCESS = "GET_DISCOUNT_TYPE_BY_ID_SUCCESS"
export const GET_DISCOUNT_TYPE_BY_ID_ERROR = "GET_DISCOUNT_TYPE_BY_ID_ERROR"

export const CREATE_DISCOUNT_TYPE = "CREATE_DISCOUNT_TYPE"
export const CREATE_DISCOUNT_TYPE_SUCCESS = "CREATE_DISCOUNT_TYPE_SUCCESS"
export const CREATE_DISCOUNT_TYPE_ERROR = "CREATE_DISCOUNT_TYPE_ERROR"

export const UPDATE_DISCOUNT_TYPE = "UPDATE_DISCOUNT_TYPE"
export const UPDATE_DISCOUNT_TYPE_SUCCESS = "UPDATE_DISCOUNT_TYPE_SUCCESS"
export const UPDATE_DISCOUNT_TYPE_ERROR = "UPDATE_DISCOUNT_TYPE_ERROR"

export const DELETE_DISCOUNT_TYPE = "DELETE_DISCOUNT_TYPE"
export const DELETE_DISCOUNT_TYPE_SUCCESS = "DELETE_DISCOUNT_TYPE_SUCCESS"
export const DELETE_DISCOUNT_TYPE_ERROR = "DELETE_DISCOUNT_TYPE_ERROR"

//////////////////End of Discount Action Types/////////////////////////

export function getDiscountTypeRecord() {
  return async (dispatch) => {
    dispatch(getDiscountType())
    return await discountTypeService
      .getDiscountType()
      
      .then((response) => dispatch(getDiscountTypeSuccess(response.data)))
      .catch((error) => dispatch(getDiscountTypeError(error)))
  }
}

export function getDiscountType() {
  return {
    type: GET_DISCOUNT_TYPE,
  }
}

export function getDiscountTypeSuccess(success) {
  return {
    type: GET_DISCOUNT_TYPE_SUCCESS,
    payload: { success },
  }
}

export function getDiscountTypeError(error) {
  return {
    type: GET_DISCOUNT_TYPE_ERROR,
    payload: { error },
  }
}

export function getDiscountTypeByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getDiscountTypeById())
    return await discountTypeService
      .getDiscountTypeById(id)

      .then((response) => dispatch(getDiscountTypeByIdSuccess(response.data)))
      .catch((error) => dispatch(getDiscountTypeByIdError(error)))
  }
}

export function getDiscountTypeById() {
  return {
    type: GET_DISCOUNT_TYPE_BY_ID,
  }
}

export function getDiscountTypeByIdSuccess(success) {
  return {
    type: GET_DISCOUNT_TYPE_BY_ID_SUCCESS,
    payload: { success },
  }
}

export function getDiscountTypeByIdError(error) {
  return {
    type: GET_DISCOUNT_TYPE_BY_ID_ERROR,
    payload: { error },
  }
}

export function createDiscountTypeRecord(discountType) {
  return async (dispatch) => {
    dispatch(createDiscountType())
  
    return await discountTypeService
      .createDiscountType(discountType)

      .then((response) => dispatch(createDiscountTypeSuccess(response)))
      .catch((error) => dispatch(createDiscountTypeError(error)))
  }
}

export function createDiscountType() {
  return {
    type: CREATE_DISCOUNT_TYPE,
  }
}

export function createDiscountTypeSuccess(success) {
  return {
    type: CREATE_DISCOUNT_TYPE_SUCCESS,
    payload: { success },
  }
}

export function createDiscountTypeError(error) {
  return {
    type: CREATE_DISCOUNT_TYPE_ERROR,
    payload: { error },
  }
}

export function updateDiscountTypeRecord(discountType) {
  return async (dispatch) => {
    dispatch(updateDiscountType())
    return await discountTypeService
      .updateDiscountType(discountType)

      .then((response) => dispatch(updateDiscountTypeSuccess(response)))
      .catch((error) => dispatch(updateDiscountTypeError(error)))
  }
}

export function updateDiscountType() {
  return {
    type: UPDATE_DISCOUNT_TYPE,
  }
}

export function updateDiscountTypeSuccess(success) {
  return {
    type: UPDATE_DISCOUNT_TYPE_SUCCESS,
    payload: { success },
  }
}

export function updateDiscountTypeError(error) {
  return {
    type: UPDATE_DISCOUNT_TYPE_ERROR,
    payload: { error },
  }
}

export function deleteDiscountTypeRecord(id) {
  return async (dispatch) => {
    dispatch(deleteDiscountType())
    return await discountTypeService
      .deleteDiscountType(id)

      .then((response) => dispatch(deleteDiscountTypeSuccess(response)))
      .catch((error) => dispatch(deleteDiscountTypeError(error)))
  }
}

export function deleteDiscountType() {
  return {
    type: DELETE_DISCOUNT_TYPE,
  }
}

export function deleteDiscountTypeSuccess(success) {
  return {
    type: DELETE_DISCOUNT_TYPE_SUCCESS,
    payload: { success },
  }
}

export function deleteDiscountTypeError(error) {
  return {
    type: DELETE_DISCOUNT_TYPE_ERROR,
    payload: { error },
  }
}
