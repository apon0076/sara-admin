import {
  GET_PAYMENT_METHOD,
  GET_PAYMENT_METHOD_SUCCESS,
  GET_PAYMENT_METHOD_ERROR,
  CREATE_OR_UPDATE_PAYMENT_METHOD,
  CREATE_OR_UPDATE_PAYMENT_METHOD_SUCCESS,
  CREATE_OR_UPDATE_PAYMENT_METHOD_ERROR,
  CREATE_ORDER_PAYMENT_MANUAL,
  CREATE_ORDER_PAYMENT_MANUAL_SUCCESS,
  CREATE_ORDER_PAYMENT_MANUAL_ERROR,
  CREATE_ORDER_PAYMENT_MANUAL_RESET,
} from "../actions/paymentMethodAction";

const initialState = {
  paymentMethods: [],
  data: {},
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PAYMENT_METHOD:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        paymentMethods: action.payload.success,
      };

    case GET_PAYMENT_METHOD_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        paymentMethods: [],
      };

    case CREATE_OR_UPDATE_PAYMENT_METHOD:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_OR_UPDATE_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_OR_UPDATE_PAYMENT_METHOD_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };

    // Custom Order Payment Start
    case CREATE_ORDER_PAYMENT_MANUAL:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case CREATE_ORDER_PAYMENT_MANUAL_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload.success,
      };

    case CREATE_ORDER_PAYMENT_MANUAL_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        data: {},
      };
    case CREATE_ORDER_PAYMENT_MANUAL_RESET:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: {},
      };
    // Custom Order Payment End
    default:
      return state;
  }
}
