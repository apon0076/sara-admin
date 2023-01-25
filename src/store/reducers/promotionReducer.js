//////////////////CALLING NECESSARY ACTION/////////////////////////////
import {
  GET_PROMOTION,
  GET_PROMOTION_SUCCESS,
  GET_PROMOTION_ERROR,

  GET_PROMOTION_BY_ID,
  GET_PROMOTION_BY_ID_SUCCESS,
  GET_PROMOTION_BY_ID_ERROR,

  CREATE_OR_UPDATE_PROMOTION,
  CREATE_OR_UPDATE_PROMOTION_SUCCESS,
  CREATE_OR_UPDATE_PROMOTION_ERROR,

  DELETE_PROMOTION,
  DELETE_PROMOTION_SUCCESS,
  DELETE_PROMOTION_ERROR

} from "../actions/promotionAction"

/////////////////END OF CALLING//////////////////////////////

const initialState = {
  promotions: [],
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

export default function promotionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROMOTION:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }

    case GET_PROMOTION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        promotions: action.payload.success,
      }

    case GET_PROMOTION_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        promotions: [],
      }


    case GET_PROMOTION_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }

    case GET_PROMOTION_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        promotions: action.payload.success,
      }

    case GET_PROMOTION_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        data: [],
      }


    case CREATE_OR_UPDATE_PROMOTION:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      }

    case CREATE_OR_UPDATE_PROMOTION_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      }

    case CREATE_OR_UPDATE_PROMOTION_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      }

      
    case DELETE_PROMOTION:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      }

    case DELETE_PROMOTION_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      }

    case DELETE_PROMOTION_ERROR:
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
