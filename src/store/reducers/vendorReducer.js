import {
  GET_VENDOR,
  GET_VENDOR_SUCCESS,
  GET_VENDOR_ERROR,

  GET_VENDOR_BY_ID,
  GET_VENDOR_BY_ID_SUCCESS,
  GET_VENDOR_BY_ID_ERROR,

  CREATE_VENDOR,
  CREATE_VENDOR_SUCCESS,
  CREATE_VENDOR_ERROR,

  UPDATE_VENDOR,
  UPDATE_VENDOR_SUCCESS,
  UPDATE_VENDOR_ERROR,

  DELETE_VENDOR,
  DELETE_VENDOR_SUCCESS,
  DELETE_VENDOR_ERROR

} from "../actions/vendorAction";

const intialState = {
  vendors: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
  data: {}, // THIS IS USED FOR TO HOLD SAVE DATA
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  updating: false,
  updated: false,
  deleting: false,
  deleted: false,
  error: null,
};

export default function (state = intialState, action) {
  switch (action.type) {
    case GET_VENDOR:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_VENDOR_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        vendors: action.payload.success,
      };

    case GET_VENDOR_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        vendors: [],
      };


    case GET_VENDOR_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_VENDOR_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        vendors: action.payload.success,
      };

    case GET_VENDOR_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        colors: [],
      };


    case CREATE_VENDOR:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_VENDOR_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_VENDOR_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_VENDOR:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_VENDOR_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_VENDOR_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };

      
    case DELETE_VENDOR:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_VENDOR_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_VENDOR_ERROR:
      return {
        ...state,
        deleting: false,
        deleted: false,
        error: action.payload.error,
        data: {},
      };

    default:
      return state;
  }
}
