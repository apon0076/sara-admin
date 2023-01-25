//////////////////////This is import for API Call/////////////
import discountService from "../services/discountService"

export const GET_DISCOUNT = "GET_DISCOUNT"
export const GET_DISCOUNT_SUCCESS = "GET_DISCOUNT_SUCCESS"
export const GET_DISCOUNT_ERROR = "GET_DISCOUNT_ERROR"

export const GET_DISCOUNT_BY_ID = "GET_DISCOUNT_BY_ID"
export const GET_DISCOUNT_BY_ID_SUCCESS = "GET_DISCOUNT_BY_ID_SUCCESS"
export const GET_DISCOUNT_BY_ID_ERROR = "GET_DISCOUNT_BY_ID_ERROR"

export const CREATE_DISCOUNT = "CREATE_DISCOUNT"
export const CREATE_DISCOUNT_SUCCESS = "CREATE_DISCOUNT_SUCCESS"
export const CREATE_DISCOUNT_ERROR = "CREATE_DISCOUNT_ERROR"

export const UPDATE_DISCOUNT = "UPDATE_DISCOUNT"
export const UPDATE_DISCOUNT_SUCCESS = "UPDATE_DISCOUNT_SUCCESS"
export const UPDATE_DISCOUNT_ERROR = "UPDATE_DISCOUNT_ERROR"

export const DELETE_DISCOUNT = "DELETE_DISCOUNT"
export const DELETE_DISCOUNT_SUCCESS = "DELETE_DISCOUNT_SUCCESS"
export const DELETE_DISCOUNT_ERROR = "DELETE_DISCOUNT_ERROR"

//////////////////End of Discount Action Types/////////////////////////

export function getDiscountRecord() {
  return async (dispatch) => {
    dispatch(getDiscount())
    return await discountService
      .getDiscount()
      
      .then((response) => dispatch(getDiscountSuccess(response.data)))
      .catch((error) => dispatch(getDiscountError(error)))
  }
}

export function getDiscount() {
  return {
    type: GET_DISCOUNT,
  }
}

export function getDiscountSuccess(success) {
  return {
    type: GET_DISCOUNT_SUCCESS,
    payload: { success },
  }
}

export function getDiscountError(error) {
  return {
    type: GET_DISCOUNT_ERROR,
    payload: { error },
  }
}

export function getDiscountByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getDiscountById())
    return await discountService
      .getDiscountById(id)

      .then((response) => dispatch(getDiscountByIdSuccess(response.data)))
      .catch((error) => dispatch(getDiscountByIdError(error)))
  }
}

export function getDiscountById() {
  return {
    type: GET_DISCOUNT_BY_ID,
  }
}

export function getDiscountByIdSuccess(success) {
  return {
    type: GET_DISCOUNT_BY_ID_SUCCESS,
    payload: { success },
  }
}

export function getDiscountByIdError(error) {
  return {
    type: GET_DISCOUNT_BY_ID_ERROR,
    payload: { error },
  }
}

export function createDiscountRecord(discount) {
  return async (dispatch) => {
    dispatch(createDiscount())
    return await discountService
      .createDiscount(discount)

      .then((response) => dispatch(createDiscountSuccess(response)))
      .catch((error) => dispatch(createDiscountError(error)))
  }
}

export function createDiscount() {
  return {
    type: CREATE_DISCOUNT,
  }
}

export function createDiscountSuccess(success) {
  return {
    type: CREATE_DISCOUNT_SUCCESS,
    payload: { success },
  }
}

export function createDiscountError(error) {
  return {
    type: CREATE_DISCOUNT_ERROR,
    payload: { error },
  }
}

export function updateDiscountRecord(discount) {
  return async (dispatch) => {
    dispatch(updateDiscount())
    return await discountService
      .updateDiscount(discount)

      .then((response) => dispatch(updateDiscountSuccess(response)))
      .catch((error) => dispatch(updateDiscountError(error)))
  }
}

export function updateDiscount() {
  return {
    type: UPDATE_DISCOUNT,
  }
}

export function updateDiscountSuccess(success) {
  return {
    type: UPDATE_DISCOUNT_SUCCESS,
    payload: { success },
  }
}

export function updateDiscountError(error) {
  return {
    type: UPDATE_DISCOUNT_ERROR,
    payload: { error },
  }
}

export function deleteDiscountRecord(id) {
  return async (dispatch) => {
    dispatch(deleteDiscount())
    return await discountService
      .deleteDiscount(id)

      .then((response) => dispatch(deleteDiscountSuccess(response)))
      .catch((error) => dispatch(deleteDiscountError(error)))
  }
}

export function deleteDiscount() {
  return {
    type: DELETE_DISCOUNT,
  }
}

export function deleteDiscountSuccess(success) {
  return {
    type: DELETE_DISCOUNT_SUCCESS,
    payload: { success },
  }
}

export function deleteDiscountError(error) {
  return {
    type: DELETE_DISCOUNT_ERROR,
    payload: { error },
  }
}
