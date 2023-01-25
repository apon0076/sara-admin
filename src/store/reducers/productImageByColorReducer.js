import {
  GET_PRODUCT_IMAGE_BY_COLOR,
  GET_PRODUCT_IMAGE_BY_COLOR_SUCCESS,
  GET_PRODUCT_IMAGE_BY_COLOR_ERROR,

  GET_PRODUCT_IMAGE_BY_COLOR_BY_ID,
  GET_PRODUCT_IMAGE_BY_COLOR_BY_ID_SUCCESS,
  GET_PRODUCT_IMAGE_BY_COLOR_BY_ID_ERROR,

  CREATE_PRODUCT_IMAGE_BY_COLOR,
  CREATE_PRODUCT_IMAGE_BY_COLOR_SUCCESS,
  CREATE_PRODUCT_IMAGE_BY_COLOR_ERROR,

  UPDATE_PRODUCT_IMAGE_BY_COLOR,
  UPDATE_PRODUCT_IMAGE_BY_COLOR_SUCCESS,
  UPDATE_PRODUCT_IMAGE_BY_COLOR_ERROR,

  DELETE_PRODUCT_IMAGE_BY_COLOR,
  DELETE_PRODUCT_IMAGE_BY_COLOR_SUCCESS,
  DELETE_PRODUCT_IMAGE_BY_COLOR_ERROR

} from "../actions/productImageByColorAction";

const initialState = {
  productImgColors: [], //THIS IS UESED FOR TO HOLD ARRAY DATA AFTER SERACHING RECORD BY PRODUCT ID
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
    case GET_PRODUCT_IMAGE_BY_COLOR:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PRODUCT_IMAGE_BY_COLOR_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        productImgColors: action.payload.success,
      };

    case GET_PRODUCT_IMAGE_BY_COLOR_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        productImgColors: [],
      };


    case GET_PRODUCT_IMAGE_BY_COLOR_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PRODUCT_IMAGE_BY_COLOR_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        productImgColors: action.payload.success,
      };

    case GET_PRODUCT_IMAGE_BY_COLOR_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        productImgColors: [],
      };


    case CREATE_PRODUCT_IMAGE_BY_COLOR:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_PRODUCT_IMAGE_BY_COLOR_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_PRODUCT_IMAGE_BY_COLOR_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_PRODUCT_IMAGE_BY_COLOR:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_PRODUCT_IMAGE_BY_COLOR_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_PRODUCT_IMAGE_BY_COLOR_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };

      
    case DELETE_PRODUCT_IMAGE_BY_COLOR:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_PRODUCT_IMAGE_BY_COLOR_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_PRODUCT_IMAGE_BY_COLOR_ERROR:
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
