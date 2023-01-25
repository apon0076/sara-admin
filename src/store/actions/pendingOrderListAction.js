//////////////////////This is import for API Call/////////////
import orderListService from "../services/pendingOrderListService"

export const GET_ORDER_LIST = "GET_ORDER_LIST"
export const GET_ORDER_LIST_SUCCESS = "GET_ORDER_LIST_SUCCESS"
export const GET_ORDER_LIST_ERROR = "GET_ORDER_LIST_ERROR"

export const GET_ORDER_LIST_BY_ID = "GET_ORDER_LIST_BY_ID"
export const GET_ORDER_LIST_BY_ID_SUCCESS = "GET_ORDER_LIST_BY_ID_SUCCESS"
export const GET_ORDER_LIST_BY_ID_ERROR = "GET_ORDER_LIST_BY_ID_ERROR"

export const GET_ORDER_LIST_BY_ORDER_ID = "GET_ORDER_LIST_BY_ORDER_ID"
export const GET_ORDER_LIST_BY_ORDER_ID_SUCCESS =
  "GET_ORDER_LIST_BY_ORDER_ID_SUCCESS"
export const GET_ORDER_LIST_BY_ORDER_ID_ERROR =
  "GET_ORDER_LIST_BY_ORDER_ID_ERROR"

export const DELETE_ORDER = "DELETE_ORDER"
export const DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS"
export const DELETE_ORDER_ERROR = "DELETE_ORDER_ERROR"

export const PROCESS_ORDER = "PROCESS_ORDER"
export const PROCESS_ORDER_SUCCESS = "PROCESS_ORDER_SUCCESS"
export const PROCESS_ORDER_ERROR = "PROCESS_ORDER_ERROR"

export const CANCEL_ORDER = "CANCEL_ORDER"
export const CANCEL_ORDER_SUCCESS = "CANCEL_ORDER_SUCCESS"
export const CANCEL_ORDER_ERROR = "CANCEL_ORDER_ERROR"

//////////////////End of Order Action Types/////////////////////////

export function getOrderListRecord() {
  return async (dispatch) => {
    dispatch(getOrderList())
    return await orderListService
      .getOrderList()
      .then((response) => dispatch(getOrderListSuccess(response.data)))
      .catch((error) => dispatch(getOrderListError(error)))
  }
}

export function getOrderList() {
  return {
    type: GET_ORDER_LIST,
  }
}

export function getOrderListSuccess(success) {
  return {
    type: GET_ORDER_LIST_SUCCESS,
    payload: { success },
  }
}

export function getOrderListError(error) {
  return {
    type: GET_ORDER_LIST_ERROR,
    payload: { error },
  }
}

export function getOrderListByIdRecord(customerId, searchBy) {
  return async (dispatch) => {
    dispatch(getOrderListById())
    return await orderListService
      .getOrderListById(customerId, searchBy)

      .then((response) => dispatch(getOrderListByIdSuccess(response.data)))
      .catch((error) => dispatch(getOrderListByIdError(error)))
  }
}

export function getOrderListById() {
  return {
    type: GET_ORDER_LIST_BY_ID,
  }
}

export function getOrderListByIdSuccess(success) {
  return {
    type: GET_ORDER_LIST_BY_ID_SUCCESS,
    payload: { success },
  }
}

export function getOrderListByIdError(error) {
  return {
    type: GET_ORDER_LIST_BY_ID_ERROR,
    payload: { error },
  }
}

export function getOrderListByOrderIdRecord(customerId, searchBy) {
  return async (dispatch) => {
    dispatch(getOrderListByOrderId())
    return await orderListService
      .getOrderListByOrderId(customerId, searchBy)

      .then((response) => dispatch(getOrderListByOrderIdSuccess(response.data)))
      .catch((error) => dispatch(getOrderListByOrderIdError(error)))
  }
}

export function getOrderListByOrderId() {
  return {
    type: GET_ORDER_LIST_BY_ORDER_ID,
  }
}

export function getOrderListByOrderIdSuccess(success) {
  return {
    type: GET_ORDER_LIST_BY_ORDER_ID_SUCCESS,
    payload: { success },
  }
}

export function getOrderListByOrderIdError(error) {
  return {
    type: GET_ORDER_LIST_BY_ORDER_ID_ERROR,
    payload: { error },
  }
}

export function deleteOrderRecord(customerId, id) {
  return async (dispatch) => {
    dispatch(deleteOrder())
    return await orderListService
      .deleteOrder(customerId, id)

      .then((response) => dispatch(deleteOrderSuccess(response.data)))
      .catch((error) => dispatch(deleteOrderError(error)))
  }
}

export function deleteOrder() {
  return {
    type: DELETE_ORDER,
  }
}

export function deleteOrderSuccess(success) {
  return {
    type: DELETE_ORDER_SUCCESS,
    payload: { success },
  }
}

export function deleteOrderError(error) {
  return {
    type: DELETE_ORDER_ERROR,
    payload: { error },
  }
}

export function processOrderRecord(data) {
  return async (dispatch) => {
    dispatch(processOrder())
    return await orderListService
      .processOrder(data)

      .then((response) => dispatch(processOrderSuccess(response.data)))
      .catch((error) => dispatch(processOrderError(error)))
  }
}

export function processOrder() {
  return {
    type: PROCESS_ORDER,
  }
}

export function processOrderSuccess(success) {
  return {
    type: PROCESS_ORDER_SUCCESS,
    payload: { success },
  }
}

export function processOrderError(error) {
  return {
    type: PROCESS_ORDER_ERROR,
    payload: { error },
  }
}

export function cancelOrderRecord(data) {
  return async (dispatch) => {
    dispatch(cancelOrder())
    return await orderListService
      .cancelOrder(data)

      .then((response) => dispatch(cancelOrderSuccess(response.data)))
      .catch((error) => dispatch(cancelOrderError(error)))
  }
}

export function cancelOrder() {
  return {
    type: CANCEL_ORDER,
  }
}

export function cancelOrderSuccess(success) {
  return {
    type: CANCEL_ORDER_SUCCESS,
    payload: { success },
  }
}

export function cancelOrderError(error) {
  return {
    type: CANCEL_ORDER_ERROR,
    payload: { error },
  }
}
