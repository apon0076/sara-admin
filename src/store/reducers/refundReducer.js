import {
  POST_REFUND_DATA,
  POST_REFUND_DATA_SUCCESS,
  POST_REFUND_DATA_ERROR,
  POST_REFUND_DATA_RESET,
  FETCH_REFUNDED_DATA,
  FETCH_REFUNDED_DATA_SUCCESS,
  FETCH_REFUNDED_DATA_ERROR,
  FETCH_REFUNDED_DATA_RESET,
} from "../actions/refundActions";

const initialState = {
  post_refund: [],
  get_refunded_data: [],
  success: false,
  loading: false,
  error: null,
};

export const refundReducer = (state = initialState, action) => {
  switch (action.type) {
    //Post Refund Data Start
    case POST_REFUND_DATA:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case POST_REFUND_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        post_refund: action.payload,
      };
    case POST_REFUND_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case POST_REFUND_DATA_RESET:
      return {
        post_refund: [],
        loading: false,
        error: null,
      };
    //Post Refund Data End

    // Get Refund Data Start
    case FETCH_REFUNDED_DATA:
      return {
        ...state,
        loading: true,
        success: false,
      };
      case FETCH_REFUNDED_DATA_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          get_refunded_data: action.payload.success,
      };
    case FETCH_REFUNDED_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_REFUNDED_DATA_RESET:
      return {
        get_refunded_data: [],
        loading: false,
        error: null,
      };
    // Get Refund Data End
    default:
      return state;
  }
};
