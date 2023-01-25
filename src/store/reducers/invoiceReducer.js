import {
  GET_INVOICE,
  GET_INVOICE_SUCCESS,
  GET_INVOICE_ERROR,

  GET_INVOICE_BY_ID,
  GET_INVOICE_BY_ID_SUCCESS,
  GET_INVOICE_BY_ID_ERROR

} from "../actions/invoiceAction";

const initialState = {
  invoices: [], //THIS IS USED FOR TO HOLD ARRAY DATA
  loading: false,
  loaded: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INVOICE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        invoices: action.payload.success,
      };

    case GET_INVOICE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        invoices: [],
      };

      
    case GET_INVOICE_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_INVOICE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        invoices: action.payload.success,
      };

    case GET_INVOICE_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        invoices: [],
      };

    default:
      return state;
  }
}
