//////////////////CALLING NECESSARY ACTION/////////////////////////////
import {
  // Get for discountType
  GET_DISCOUNT_TYPE,
  GET_DISCOUNT_TYPE_SUCCESS,
  GET_DISCOUNT_TYPE_ERROR,

  GET_DISCOUNT_TYPE_BY_ID,
  GET_DISCOUNT_TYPE_BY_ID_SUCCESS,
  GET_DISCOUNT_TYPE_BY_ID_ERROR,

  // Create for discountType
  CREATE_DISCOUNT_TYPE,
  CREATE_DISCOUNT_TYPE_SUCCESS,
  CREATE_DISCOUNT_TYPE_ERROR,
  
  UPDATE_DISCOUNT_TYPE,
  UPDATE_DISCOUNT_TYPE_SUCCESS,
  UPDATE_DISCOUNT_TYPE_ERROR,
  
  DELETE_DISCOUNT_TYPE,
  DELETE_DISCOUNT_TYPE_SUCCESS,
  DELETE_DISCOUNT_TYPE_ERROR

} from "../actions/discountTypeAction"

/////////////////END OF CALLING//////////////////////////////

// For initial state
const initialState = {
  discountTypes: [],
  data: {},
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  updating: false,
  updated: false,
  deleting: false,
  deleted: false,
  error: null,
}

export default function discountTypeReducer(state = initialState, action) {
  switch (action.type) {
    // 3 Cases for discountTypeAction for discountTypeListContainer - Start
    case GET_DISCOUNT_TYPE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }

    case GET_DISCOUNT_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        discountTypes: action.payload.success,
      }

    case GET_DISCOUNT_TYPE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        discountTypes: [],
      }
      // 3 Cases for discountTypeAction for discountTypeListContainer - End


    case GET_DISCOUNT_TYPE_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }

    case GET_DISCOUNT_TYPE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        discountTypes: action.payload.success,
      }

    case GET_DISCOUNT_TYPE_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        data: [],
      }


    // 3 Cases for discountTypeAction for createDiscountTypeContainer - Start
    case CREATE_DISCOUNT_TYPE:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      }

    case CREATE_DISCOUNT_TYPE_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      }

    case CREATE_DISCOUNT_TYPE_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      }
    // 3 Cases for discountTypeAction for createDiscountTypeContainer - End


    case UPDATE_DISCOUNT_TYPE:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      }

    case UPDATE_DISCOUNT_TYPE_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      }

    case UPDATE_DISCOUNT_TYPE_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      }

      
    case DELETE_DISCOUNT_TYPE:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      }

    case DELETE_DISCOUNT_TYPE_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      }

    case DELETE_DISCOUNT_TYPE_ERROR:
      return {
        ...state,
        deleting: false,
        deleted: false,
        error: action.payload.error,
        data: {},
      }

    default:
      return state
  }
}
