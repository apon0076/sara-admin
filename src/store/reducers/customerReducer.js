import {
  CREATE_CUSTOMER_ADDRESS,
  CREATE_CUSTOMER_ADDRESS_ERROR,
  CREATE_CUSTOMER_ADDRESS_RESET,
  CREATE_CUSTOMER_ADDRESS_SUCCESS,
  CREATE_NEW_CUSTOMER,
  CREATE_NEW_CUSTOMER_ERROR,
  CREATE_NEW_CUSTOMER_SUCCESS,
  CREATE_ORDER,
  CREATE_ORDER_ERROR,
  CREATE_ORDER_SUCCESS,
  GET_CUSTOMER_ADDRESS,
  GET_CUSTOMER_ADDRESS_ERROR,
  GET_CUSTOMER_ADDRESS_SUCCESS,
  GET_CUSTOMER_DETAILS,
  GET_CUSTOMER_DETAILS_ERROR,
  GET_CUSTOMER_DETAILS_SUCCESS,
  GET_PRODUCT_WITH_SKU,
  GET_PRODUCT_WITH_SKU_ERROR,
  GET_PRODUCT_WITH_SKU_SUCCESS,
} from "../actions/customerAction";

const initialState = {
  customerDetails: [],
  productDetails: [],
  customerAddress: [],
  data: {},
  addNewAddress: [],
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  updating: false,
  updated: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CUSTOMER_DETAILS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_CUSTOMER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        customerDetails: action.payload.success,
      };
    case GET_CUSTOMER_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        customerDetails: [],
      };
    case CREATE_NEW_CUSTOMER:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };
    case CREATE_NEW_CUSTOMER_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };
    case CREATE_NEW_CUSTOMER_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };
    case CREATE_CUSTOMER_ADDRESS:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };
    case CREATE_CUSTOMER_ADDRESS_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        addNewAddress: action.payload.success,
      };
    case CREATE_CUSTOMER_ADDRESS_RESET:
      return {
        ...state,
        saving: false,
        saved: false,
        addNewAddress: [],
      };
    case CREATE_CUSTOMER_ADDRESS_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        addNewAddress: [],
      };
    case GET_PRODUCT_WITH_SKU:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PRODUCT_WITH_SKU_SUCCESS:
      return {
        ...state,
        loading: false,
        productDetails: action.payload.success,
      };
    case GET_PRODUCT_WITH_SKU_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        productDetails: [],
      };
    case GET_CUSTOMER_ADDRESS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_CUSTOMER_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        customerAddress: action.payload.success,
      };
    case GET_CUSTOMER_ADDRESS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        customerAddress: [],
      };
    case CREATE_ORDER:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };
    case CREATE_ORDER_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };
    default:
      return state;
  }
}