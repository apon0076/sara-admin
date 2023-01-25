import {
  GET_EXCEL_ORDER,
  GET_EXCEL_ORDER_SUCCESS,
  GET_EXCEL_ORDER_ERROR,
  GET_ORDER_INVOICE_LIST,
  GET_ORDER_INVOICE_LIST_SUCCESS,
  GET_ORDER_INVOICE_LIST_ERROR,
} from '../actions/reportAction'

const initialState = {
  orderReportData: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
  orderInvoiceListData: [],
  data: {}, // THIS IS USED FOR TO HOLD SAVE DATA
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  updating: false,
  updated: false,
  deleting: false,
  deleted: false,
  error: null,
  orderInvoiceLoading: false,
  orderInvoiceLoaded: false,
  orderInvoiceError: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EXCEL_ORDER:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }

    case GET_EXCEL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        orderReportData: action.payload.success,
      }

    case GET_EXCEL_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        orderReportData: [],
      }

    case GET_ORDER_INVOICE_LIST:
      return {
        ...state,
        orderInvoiceLoading: true,
        orderInvoiceLoaded: false,
        orderInvoiceError: null,
      }

    case GET_ORDER_INVOICE_LIST_SUCCESS:
      return {
        ...state,
        orderInvoiceLoading: false,
        orderInvoiceLoaded: true,
        orderInvoiceListData: action.payload.success,
      }

    case GET_ORDER_INVOICE_LIST_ERROR:
      return {
        ...state,
        orderInvoiceLoading: false,
        orderInvoiceLoaded: false,
        orderInvoiceError: action.payload.error,
        orderInvoiceListData: [],
      }

    default:
      return state
  }
}
