import {
  GET_PROCESSING_ORDER_LIST,
  GET_PROCESSING_ORDER_LIST_SUCCESS,
  GET_PROCESSING_ORDER_LIST_ERROR,

  GET_PROCESSING_ORDER_LIST_BY_ID,
  GET_PROCESSING_ORDER_LIST_BY_ID_SUCCESS,
  GET_PROCESSING_ORDER_LIST_BY_ID_ERROR,

  DELIVER_ORDER,
  DELIVER_ORDER_SUCCESS,
  DELIVER_ORDER_ERROR,

  CANCEL_ORDER,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_ERROR

} from "../actions/processingOrderListAction";

const initialState = {
  processOrders: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
  processOrderDetails: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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
    case GET_PROCESSING_ORDER_LIST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PROCESSING_ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        processOrders: action.payload.success,
      };

    case GET_PROCESSING_ORDER_LIST_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        processOrders: [],
      };


    case GET_PROCESSING_ORDER_LIST_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PROCESSING_ORDER_LIST_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        processOrders: action.payload.success,
      };

    case GET_PROCESSING_ORDER_LIST_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        processOrders: [],
      };


    case DELIVER_ORDER:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELIVER_ORDER_SUCCESS:
      return {
        ...state,
        processing: false,
        processed: true,
        data: action.payload.success,
      };

    case DELIVER_ORDER_ERROR:
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
