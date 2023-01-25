import {
  GET_ORDER_LIST,
  GET_ORDER_LIST_SUCCESS,
  GET_ORDER_LIST_ERROR,

  GET_ORDER_LIST_BY_ID,
  GET_ORDER_LIST_BY_ID_SUCCESS,
  GET_ORDER_LIST_BY_ID_ERROR,

  GET_ORDER_LIST_BY_ORDER_ID,
  GET_ORDER_LIST_BY_ORDER_ID_SUCCESS,
  GET_ORDER_LIST_BY_ORDER_ID_ERROR,

  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_ERROR,

  PROCESS_ORDER,
  PROCESS_ORDER_SUCCESS,
  PROCESS_ORDER_ERROR,

  CANCEL_ORDER,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_ERROR

} from "../actions/pendingOrderListAction"

const initialState = {
  orders: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
  orderDetails: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
  data: {}, // THIS IS USED FOR TO HOLD OBJECT DATA
  loading: false,
  loaded: false,
  deleting: false,
  deleted: false,
  processing: false,
  processed: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_LIST:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case GET_ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.success,
      }

    case GET_ORDER_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        orders: [],
      }


    case GET_ORDER_LIST_BY_ID:
      return {
        ...state,
        loaded: false,
        error: null,
      }

    case GET_ORDER_LIST_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload.success,
      }

    case GET_ORDER_LIST_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        orders: [],
      }


    case GET_ORDER_LIST_BY_ORDER_ID:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case GET_ORDER_LIST_BY_ORDER_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        orderDetails: action.payload.success,
      }

    case GET_ORDER_LIST_BY_ORDER_ID_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        orderDetails: [],
      }


    case DELETE_ORDER:
      return {
        ...state,
        deleting: true,
        error: null,
      }

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        deleting: false,
        data: action.payload.success,
      }

    case DELETE_ORDER_ERROR:
      return {
        ...state,
        deleting: false,
        error: action.payload.error,
        data: {},
      }


    case PROCESS_ORDER:
      return {
        ...state,
        processing: true,
        processed: false,
        error: null,
      }

    case PROCESS_ORDER_SUCCESS:
      return {
        ...state,
        processing: false,
        processed: true,
        data: action.payload.success,
      }

    case PROCESS_ORDER_ERROR:
      return {
        ...state,
        processing: false,
        processed: false,
        error: action.payload.error,
        data: {},
      }

      
    case CANCEL_ORDER:
      return {
        ...state,
        processing: true,
        processed: false,
        error: null,
      }

    case CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        processing: false,
        processed: true,
        data: action.payload.success,
      }

    case CANCEL_ORDER_ERROR:
      return {
        ...state,
        processing: false,
        processed: false,
        error: action.payload.error,
        data: {},
      }

    default:
      return state
  }
}
