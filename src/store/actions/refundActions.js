import refundService from "../services/refundService";

export const POST_REFUND_DATA = "POST_REFUND_DATA";
export const POST_REFUND_DATA_SUCCESS = "POST_REFUND_DATA_SUCCESS";
export const POST_REFUND_DATA_ERROR = "POST_REFUND_DATA_ERROR";
export const POST_REFUND_DATA_RESET = "POST_REFUND_DATA_RESET";

export const FETCH_REFUNDED_DATA = "FETCH_REFUNDED_DATA";
export const FETCH_REFUNDED_DATA_SUCCESS = "FETCH_REFUNDED_DATA_SUCCESS";
export const FETCH_REFUNDED_DATA_ERROR = "FETCH_REFUNDED_DATA_ERROR";
export const FETCH_REFUNDED_DATA_RESET = "FETCH_REFUNDED_DATA_RESET";

// Post refund data start
export function postRefundDataRecord(data) {
  return async (dispatch) => {
    dispatch(postRefundData());
    return await refundService
      .postRefundData(data)

      .then((response) => dispatch(postRefundDataSuccess(response.data)))
      .catch((error) => dispatch(postRefundDataError(error)));
  };
}
export function postRefundData() {
  return {
    type: POST_REFUND_DATA,
  };
}
export function postRefundDataSuccess(success) {
  return {
    type: POST_REFUND_DATA_SUCCESS,
    payload: { success },
  };
}
export function postRefundDataError(error) {
  return {
    type: POST_REFUND_DATA_ERROR,
    payload: { error },
  };
}
export function postRefundDataReset() {
  return {
    type: POST_REFUND_DATA_RESET,
  };
}
// Post refund data end

// Fetch refunded data start
export function fetchRefundedDataRecord(data, currentPage, itemPerPage) {
  return async (dispatch) => {
    dispatch(fetchRefundedData());
    return await refundService
      .fetchRefundedData(data, currentPage, itemPerPage)
      .then((response) => dispatch(fetchRefundedDataSuccess(response)))
      .catch((error) => dispatch(fetchRefundedDataError(error)));
  };
}
export function fetchRefundedData() {
  return {
    type: FETCH_REFUNDED_DATA,
  };
}
export function fetchRefundedDataSuccess(success) {
  return {
    type: FETCH_REFUNDED_DATA_SUCCESS,
    payload: { success },
  };
}
export function fetchRefundedDataError(error) {
  return {
    type: FETCH_REFUNDED_DATA_ERROR,
    payload: { error },
  };
}
// Fetch refunded data end
