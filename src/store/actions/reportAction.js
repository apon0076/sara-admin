import reportService from '../services/reportService'

export const GET_EXCEL_ORDER = 'GET_EXCEL_ORDER'
export const GET_EXCEL_ORDER_SUCCESS = 'GET_EXCEL_ORDER_SUCCESS'
export const GET_EXCEL_ORDER_ERROR = 'GET_EXCEL_ORDER_ERROR'

export const GET_ORDER_INVOICE_LIST = 'GET_ORDER_INVOICE_LIST'
export const GET_ORDER_INVOICE_LIST_SUCCESS = 'GET_ORDER_INVOICE_LIST_SUCCESS'
export const GET_ORDER_INVOICE_LIST_ERROR = 'GET_ORDER_INVOICE_LIST_ERROR'

// Order Report start
export function getExcelOrderRecord(
  startDate,
  endDate,
  sku,
  paymentMethod,
  paymentStatus,
  orderSource,
  orderStatus
) {
  return async (dispatch) => {
    dispatch(getExcelOrder())
    return await reportService
      .getExcelOrder(
        startDate,
        endDate,
        sku,
        paymentMethod,
        paymentStatus,
        orderSource,
        orderStatus
      )

      .then((response) => dispatch(getExcelOrderSuccess(response)))
      .catch((error) => dispatch(getExcelOrderError(error)))
  }
}

export function getExcelOrder() {
  return {
    type: GET_EXCEL_ORDER,
  }
}

export function getExcelOrderSuccess(success) {
  return {
    type: GET_EXCEL_ORDER_SUCCESS,
    payload: { success },
  }
}

export function getExcelOrderError(error) {
  return {
    type: GET_EXCEL_ORDER_ERROR,
    payload: { error },
  }
}

// Order Report End


// Order Invoice List Report start
export function getOrderInvoiceListRecord(
  startDate,
  endDate,
  orderStatus,
  shopId,
  paymentMethodId,
  PaymentStatusNameId,
  orderSource
) {
  return async (dispatch) => {
    dispatch(getOrderInvoiceList())
    return await reportService
      .getOrderInvoiceList(
        startDate,
        endDate,
        orderStatus,
        shopId,
        paymentMethodId,
        PaymentStatusNameId,
        orderSource
      )

      .then((response) => dispatch(getOrderInvoiceListSuccess(response)))
      .catch((error) => dispatch(getOrderInvoiceListError(error)))
  }
}

export function getOrderInvoiceList() {
  return {
    type: GET_ORDER_INVOICE_LIST,
  }
}

export function getOrderInvoiceListSuccess(success) {
  return {
    type: GET_ORDER_INVOICE_LIST_SUCCESS,
    payload: { success },
  }
}

export function getOrderInvoiceListError(error) {
  return {
    type: GET_ORDER_INVOICE_LIST_ERROR,
    payload: { error },
  }
}

// Order Invoice List Report End
