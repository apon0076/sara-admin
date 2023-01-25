//////////////////////This is import for API Call/////////////
import deliverOrderListService from "../services/deliverOrderListService";

export const GET_DELIVER_ORDER_LIST = "GET_DELIVER_ORDER_LIST";
export const GET_DELIVER_ORDER_LIST_SUCCESS = "GET_DELIVER_ORDER_LIST_SUCCESS";
export const GET_DELIVER_ORDER_LIST_ERROR = "GET_DELIVER_ORDER_LIST_ERROR";

export const GET_DELIVER_ORDER_LIST_BY_ID = "GET_DELIVER_ORDER_LIST_BY_ID";
export const GET_DELIVER_ORDER_LIST_BY_ID_SUCCESS =
  "GET_DELIVER_ORDER_LIST_BY_ID_SUCCESS";
export const GET_DELIVER_ORDER_LIST_BY_ID_ERROR =
  "GET_DELIVER_ORDER_LIST_BY_ID_ERROR";

export const CONFIRM_ORDER = "CONFIRM_ORDER";
export const CONFIRM_ORDER_SUCCESS = "CONFIRM_ORDER_SUCCESS";
export const CONFIRM_ORDER_ERROR = "CONFIRM_ORDER_ERROR";

export const CANCEL_ORDER = "CANCEL_ORDER";
export const CANCEL_ORDER_SUCCESS = "CANCEL_ORDER_SUCCESS";
export const CANCEL_ORDER_ERROR = "CANCEL_ORDER_ERROR";

//////////////////End of Brand Action Types/////////////////////////

export function getDeliverOrderListRecord() {
  return async (dispatch) => {
    dispatch(getDeliverOrderList());
    return await deliverOrderListService
      .getDeliverOrderList()

      .then((response) => dispatch(getDeliverOrderListSuccess(response.data)))
      .catch((error) => dispatch(getDeliverOrderListError(error)));
  };
}

export function getDeliverOrderList() {
  return {
    type: GET_DELIVER_ORDER_LIST,
  };
}

export function getDeliverOrderListSuccess(success) {
  return {
    type: GET_DELIVER_ORDER_LIST_SUCCESS,
    payload: { success },
  };
}

export function getDeliverOrderListError(error) {
  return {
    type: GET_DELIVER_ORDER_LIST_ERROR,
    payload: { error },
  };
}

export function getDeliverOrderListByIdRecord(searchBy) {
  return async (dispatch) => {
    dispatch(getDeliverOrderListById());
    return await deliverOrderListService
      .getDeliverOrderListById(searchBy)

      .then((response) =>
        dispatch(getDeliverOrderListByIdSuccess(response.data))
      )
      .catch((error) => dispatch(getDeliverOrderListByIdError(error)));
  };
}

export function getDeliverOrderListById() {
  return {
    type: GET_DELIVER_ORDER_LIST_BY_ID,
  };
}

export function getDeliverOrderListByIdSuccess(success) {
  return {
    type: GET_DELIVER_ORDER_LIST_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getDeliverOrderListByIdError(error) {
  return {
    type: GET_DELIVER_ORDER_LIST_BY_ID_ERROR,
    payload: { error },
  };
}

export function confirmOrderRecord(data) {
  return async (dispatch) => {
    dispatch(confirmOrder());
    return await deliverOrderListService
      .confirmOrder(data)

      .then((response) => dispatch(confirmOrderSuccess(response.data)))
      .catch((error) => dispatch(confirmOrderError(error)));
  };
}

export function confirmOrder() {
  return {
    type: CONFIRM_ORDER,
  };
}

export function confirmOrderSuccess(success) {
  return {
    type: CONFIRM_ORDER_SUCCESS,
    payload: { success },
  };
}

export function confirmOrderError(error) {
  return {
    type: CONFIRM_ORDER_ERROR,
    payload: { error },
  };
}

export function cancelOrderRecord(data) {
  return async (dispatch) => {
    dispatch(cancelOrder());
    return await deliverOrderListService
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
