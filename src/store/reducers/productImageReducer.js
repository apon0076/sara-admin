import {
  GET_PRODUCTIMAGE,
  GET_PRODUCTIMAGE_SUCCESS,
  GET_PRODUCTIMAGE_ERROR,

  GET_PRODUCTIMAGE_BY_ID,
  GET_PRODUCTIMAGE_BY_ID_SUCCESS,
  GET_PRODUCTIMAGE_BY_ID_ERROR,

  CREATE_PRODUCTIMAGE,
  CREATE_PRODUCTIMAGE_SUCCESS,
  CREATE_PRODUCTIMAGE_ERROR,

  UPDATE_PRODUCTIMAGE,
  UPDATE_PRODUCTIMAGE_SUCCESS,
  UPDATE_PRODUCTIMAGE_ERROR,

  DELETE_PRODUCTIMAGE,
  DELETE_PRODUCTIMAGE_SUCCESS,
  DELETE_PRODUCTIMAGE_ERROR

} from "../actions/productImageAction";

const initialState = {
  productImages: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTIMAGE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PRODUCTIMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        productImages: action.payload.success,
      };

    case GET_PRODUCTIMAGE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        productImages: [],
      };


    case GET_PRODUCTIMAGE_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PRODUCTIMAGE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        productImages: action.payload.success,
      };

    case GET_PRODUCTIMAGE_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        productImages: [],
      };


    case CREATE_PRODUCTIMAGE:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_PRODUCTIMAGE_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_PRODUCTIMAGE_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_PRODUCTIMAGE:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_PRODUCTIMAGE_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_PRODUCTIMAGE_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };

      
    case DELETE_PRODUCTIMAGE:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_PRODUCTIMAGE_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_PRODUCTIMAGE_ERROR:
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
