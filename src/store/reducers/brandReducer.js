//////////////////CALLING NECESSARY ACTION/////////////////////////////
import {
  GET_BRAND,
  GET_BRAND_SUCCESS,
  GET_BRAND_ERROR,

  GET_BRAND_BY_ID,
  GET_BRAND_BY_ID_SUCCESS,
  GET_BRAND_BY_ID_ERROR,

  CREATE_BRAND,
  CREATE_BRAND_SUCCESS,
  CREATE_BRAND_ERROR,

  UPDATE_BRAND,
  UPDATE_BRAND_SUCCESS,
  UPDATE_BRAND_ERROR,

  DELETE_BRAND,
  DELETE_BRAND_SUCCESS,
  DELETE_BRAND_ERROR

} from "../actions/brandAction"

/////////////////END OF CALLING//////////////////////////////

const initialState = {
  brands: [],
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

export default function brandReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BRAND:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }

    case GET_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        brands: action.payload.success,
      }

    case GET_BRAND_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        brands: [],
      }


    case GET_BRAND_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }

    case GET_BRAND_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        brands: action.payload.success,
      }

    case GET_BRAND_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        data: [],
      }


    case CREATE_BRAND:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      }

    case CREATE_BRAND_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      }

    case CREATE_BRAND_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      }


    case UPDATE_BRAND:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      }

    case UPDATE_BRAND_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      }

    case UPDATE_BRAND_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      }

      
    case DELETE_BRAND:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      }

    case DELETE_BRAND_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      }

    case DELETE_BRAND_ERROR:
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
