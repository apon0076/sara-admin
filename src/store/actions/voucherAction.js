import voucherService from "../services/voucherService"
import httpBackend from "../../utils/httpClient";

export const CREATE_OR_UPDATE_VOUCHER = "CREATE_OR_UPDATE_VOUCHER"
export const CREATE_OR_UPDATE_VOUCHER_SUCCESS = "CREATE_OR_UPDATE_VOUCHER_SUCCESS"
export const CREATE_OR_UPDATE_VOUCHER_ERROR = "CREATE_OR_UPDATE_VOUCHER_ERROR"

export const GET_VOUCHER = "GET_VOUCHER"
export const GET_VOUCHER_SUCCESS = "GET_VOUCHER_SUCCESS"
export const GET_VOUCHER_ERROR = "GET_VOUCHER_ERROR"

export const CHECK_VOUCHER = "CHECK_VOUCHER"
export const CHECK_VOUCHER_SUCCESS = "CHECK_VOUCHER_SUCCESS"
export const CHECK_VOUCHER_ERROR = "CHECK_VOUCHER_ERROR"
export const CHECK_VOUCHER_RESET = "CHECK_VOUCHER_RESET"

export function createOrUpdateVoucherRecord(voucher) {
  return async (dispatch) => {
    dispatch(createOrUpdateVoucher())
    return await voucherService
      .createOrUpdateVoucher(voucher)

      .then((response) => dispatch(createOrUpdateVoucherSuccess(response)))
      .catch((error) => dispatch(createOrUpdateVoucherError(error)))
  }
}

export function createOrUpdateVoucher() {
  return {
    type: CREATE_OR_UPDATE_VOUCHER,
  }
}

export function createOrUpdateVoucherSuccess(success) {
  return {
    type: CREATE_OR_UPDATE_VOUCHER_SUCCESS,
    payload: { success },
  }
}

export function createOrUpdateVoucherError(error) {
  return {
    type: CREATE_OR_UPDATE_VOUCHER_ERROR,
    payload: { error },
  }
}

export function getVoucherRecord() {
  return async (dispatch) => {
    dispatch(getVoucher())
    return await voucherService
      .getVoucher()
      
      .then((response) => dispatch(getVoucherSuccess(response.data)))
      .catch((error) => dispatch(getVoucherError(error)))
  }
}

export function getVoucher() {
  return {
    type: GET_VOUCHER,
  }
}

export function getVoucherSuccess(success) {
  return {
    type: GET_VOUCHER_SUCCESS,
    payload: { success },
  }
}

export function getVoucherError(error) {
  return {
    type: GET_VOUCHER_ERROR,
    payload: { error },
  }
}

export const checkVoucher = (voucherCode) => async (dispatch) => {
  try {
      dispatch({ type: CHECK_VOUCHER });
      const { data } = await httpBackend.get(`api/Order/CheckVoucherCode?voucherCode=${voucherCode}`);
      dispatch({
          type: CHECK_VOUCHER_SUCCESS,
          payload: data,
      });
  } catch (error) {
      dispatch({
          type: CHECK_VOUCHER_ERROR,
          payload: error.message,
      });
  }
};