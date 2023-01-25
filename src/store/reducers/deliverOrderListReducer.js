import {
  GET_DELIVER_ORDER_LIST,
  GET_DELIVER_ORDER_LIST_SUCCESS,
  GET_DELIVER_ORDER_LIST_ERROR,

  GET_DELIVER_ORDER_LIST_BY_ID,
  GET_DELIVER_ORDER_LIST_BY_ID_SUCCESS,
  GET_DELIVER_ORDER_LIST_BY_ID_ERROR,

  CONFIRM_ORDER,
  CONFIRM_ORDER_SUCCESS,
  CONFIRM_ORDER_ERROR,

  CANCEL_ORDER,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_ERROR

} from "../actions/deliverOrderListAction";

const initialState = {
  deliverOrders: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
  deliverOrderDetails: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
  data: {}, // THIS IS USED FOR TO HOLD OBJECT DATA
  loading: false,
  loaded: false,
  deleting: false,
  deleted: false,
  processing: false,
  processed: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DELIVER_ORDER_LIST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_DELIVER_ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        deliverOrders: action.payload.success,
      };

    case GET_DELIVER_ORDER_LIST_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        deliverOrders: [],
      };


    case GET_DELIVER_ORDER_LIST_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_DELIVER_ORDER_LIST_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        deliverOrders: action.payload.success,
      };

    case GET_DELIVER_ORDER_LIST_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        deliverOrders: [],
      };


    case CONFIRM_ORDER:
      return {
        ...state,
        processing: true,
        processed: false,
        error: null,
      };

    case CONFIRM_ORDER_SUCCESS:
      return {
        ...state,
        processing: false,
        processed: true,
        data: action.payload.success,
      };

    case CONFIRM_ORDER_ERROR:
      return {
        ...state,
        processing: false,
        processed: false,
        error: action.payload.error,
        data: {},
      };

      
    case CANCEL_ORDER:
      return {
        ...state,
        processing: true,
        processed: false,
        error: null,
      };

    case CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        processing: false,
        processed: true,
        data: action.payload.success,
      };

    case CANCEL_ORDER_ERROR:
      return {
        ...state,
        processing: false,
        processed: false,
        error: action.payload.error,
        data: {},
      };

    default:
      return state;
  }
}
