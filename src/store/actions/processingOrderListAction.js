//////////////////////This is import for API Call/////////////
import processingOrderListService from "../services/processingOrderListService";

export const GET_PROCESSING_ORDER_LIST = "GET_PROCESSING_ORDER_LIST";
export const GET_PROCESSING_ORDER_LIST_SUCCESS =
  "GET_PROCESSING_ORDER_LIST_SUCCESS";
export const GET_PROCESSING_ORDER_LIST_ERROR =
  "GET_PROCESSING_ORDER_LIST_ERROR";

export const GET_PROCESSING_ORDER_LIST_BY_ID =
  "GET_PROCESSING_ORDER_LIST_BY_ID";
export const GET_PROCESSING_ORDER_LIST_BY_ID_SUCCESS =
  "GET_PROCESSING_ORDER_LIST_BY_ID_SUCCESS";
export const GET_PROCESSING_ORDER_LIST_BY_ID_ERROR =
  "GET_PROCESSING_ORDER_LIST_BY_ID_ERROR";

export const DELIVER_ORDER = "DELIVER_ORDER";
export const DELIVER_ORDER_SUCCESS = "DELIVER_ORDER_SUCCESS";
export const DELIVER_ORDER_ERROR = "DELIVER_ORDER_ERROR";

export const CANCEL_ORDER = "CANCEL_ORDER";
export const CANCEL_ORDER_SUCCESS = "CANCEL_ORDER_SUCCESS";
export const CANCEL_ORDER_ERROR = "CANCEL_ORDER_ERROR";

//////////////////End of Brand Action Types/////////////////////////

export function getProcessingOrderListRecord() {
  return async (dispatch) => {
    dispatch(getProcessingOrderList());
    return await processingOrderListService
      .getProcessingOrderList()

      .then((response) =>
        dispatch(getProcessingOrderListSuccess(response.data))
      )
      .catch((error) => dispatch(getProcessingOrderListError(error)));
  };
}

export function getProcessingOrderList() {
  return {
    type: GET_PROCESSING_ORDER_LIST,
  };
}

export function getProcessingOrderListSuccess(success) {
  return {
    type: GET_PROCESSING_ORDER_LIST_SUCCESS,
    payload: { success },
  };
}

export function getProcessingOrderListError(error) {
  return {
    type: GET_PROCESSING_ORDER_LIST_ERROR,
    payload: { error },
  };
}

export function getProcessingOrderListByIdRecord(searchBy) {
  return async (dispatch) => {
    dispatch(getProcessingOrderListById());
    return await processingOrderListService
      .getProcessingOrderListById(searchBy)

      .then((response) =>
        dispatch(getProcessingOrderListByIdSuccess(response.data))
      )
      .catch((error) => dispatch(getProcessingOrderListByIdError(error)));
  };
}

export function getProcessingOrderListById() {
  return {
    type: GET_PROCESSING_ORDER_LIST_BY_ID,
  };
}

export function getProcessingOrderListByIdSuccess(success) {
  return {
    type: GET_PROCESSING_ORDER_LIST_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getProcessingOrderListByIdError(error) {
  return {
    type: GET_PROCESSING_ORDER_LIST_BY_ID_ERROR,
    payload: { error },
  };
}

export function deliverOrderRecord(data) {
  return async (dispatch) => {
    dispatch(deliverOrder());
    return await processingOrderListService
      .deliverOrder(data)

      .then((response) => dispatch(deliverOrderSuccess(response.data)))
      .catch((error) => dispatch(deliverOrderError(error)));
  };
}

export function deliverOrder() {
  return {
    type: DELIVER_ORDER,
  };
}

export function deliverOrderSuccess(success) {
  return {
    type: DELIVER_ORDER_SUCCESS,
    payload: { success },
  };
}

export function deliverOrderError(error) {
  return {
    type: DELIVER_ORDER_ERROR,
    payload: { error },
  };
}
export function cancelOrderRecord(data) {
  return async (dispatch) => {
    dispatch(cancelOrder());
    return await processingOrderListService
      .cancelOrder(data)

      .then((response) => dispatch(cancelOrderSuccess(response.data)))
      .catch((error) => dispatch(cancelOrderError(error)));
  };
}

export function cancelOrder() {
  return {
    type: CANCEL_ORDER,
  };
}

export function cancelOrderSuccess(success) {
  return {
    type: CANCEL_ORDER_SUCCESS,
    payload: { success },
  };
}

export function cancelOrderError(error) {
  return {
    type: CANCEL_ORDER_ERROR,
    payload: { error },
  };
}
