//////////////////////This is import for API Call/////////////
import invoiceService from "../services/invoiceService";

export const GET_INVOICE = "GET_INVOICE";
export const GET_INVOICE_SUCCESS = "GET_INVOICE_SUCCESS";
export const GET_INVOICE_ERROR = "GET_INVOICE_ERROR";

export const GET_INVOICE_BY_ID = "GET_INVOICE_BY_ID";
export const GET_INVOICE_BY_ID_SUCCESS = "GET_INVOICE_BY_ID_SUCCESS";
export const GET_INVOICE_BY_ID_ERROR = "GET_INVOICE_BY_ID_ERROR";

export function getInvoiceRecord() {
  return async (dispatch) => {
    dispatch(getInvoice());
    return await invoiceService
      .getInvoice()

      .then((response) => dispatch(getInvoiceRecordSuccess(response.data)))
      .catch((error) => dispatch(getInvoiceRecordError(error)));
  };
}

export function getInvoice() {
  return {
    type: GET_INVOICE,
  };
}

export function getInvoiceRecordSuccess(success) {
  return {
    type: GET_INVOICE_SUCCESS,
    payload: { success },
  };
}

export function getInvoiceRecordError(error) {
  return {
    type: GET_INVOICE_ERROR,
    payload: { error },
  };
}

export function getInvoiceByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getInvoiceById());
    return await invoiceService
      .getInvoiceById(id)

      .then((response) => dispatch(getInvoiceByIdSuccess(response.data)))
      .catch((error) => dispatch(getInvoiceByIdError(error)));
  };
}

export function getInvoiceById() {
  return {
    type: GET_INVOICE_BY_ID,
  };
}

export function getInvoiceByIdSuccess(success) {
  return {
    type: GET_INVOICE_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getInvoiceByIdError(error) {
  return {
    type: GET_INVOICE_BY_ID_ERROR,
    payload: { error },
  };
}
