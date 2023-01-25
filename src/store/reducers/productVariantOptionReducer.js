import {
  GET_PRODUCT_VARIANT_OPTION,
  GET_PRODUCT_VARIANT_OPTION_SUCCESS,
  GET_PRODUCT_VARIANT_OPTION_ERROR,

  GET_PRODUCT_VARIANT_OPTION_BY_ID,
  GET_PRODUCT_VARIANT_OPTION_BY_ID_SUCCESS,
  GET_PRODUCT_VARIANT_OPTION_BY_ID_ERROR,

  CREATE_PRODUCT_VARIANT_OPTION,
  CREATE_PRODUCT_VARIANT_OPTION_SUCCESS,
  CREATE_PRODUCT_VARIANT_OPTION_ERROR,

  UPDATE_PRODUCT_VARIANT_OPTION,
  UPDATE_PRODUCT_VARIANT_OPTION_SUCCESS,
  UPDATE_PRODUCT_VARIANT_OPTION_ERROR,

  DELETE_PRODUCT_VARIANT_OPTION,
  DELETE_PRODUCT_VARIANT_OPTION_SUCCESS,
  DELETE_PRODUCT_VARIANT_OPTION_ERROR

} from "../actions/productVariantOptionAction";

const initialState = {
  variantOptions: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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
    case GET_PRODUCT_VARIANT_OPTION:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PRODUCT_VARIANT_OPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        variantOptions: action.payload.success,
      };

    case GET_PRODUCT_VARIANT_OPTION_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        variantOptions: [],
      };


    case GET_PRODUCT_VARIANT_OPTION_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PRODUCT_VARIANT_OPTION_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        variantOptions: action.payload.success,
      };

    case GET_PRODUCT_VARIANT_OPTION_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        variantOptions: [],
      };


    case CREATE_PRODUCT_VARIANT_OPTION:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_PRODUCT_VARIANT_OPTION_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_PRODUCT_VARIANT_OPTION_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_PRODUCT_VARIANT_OPTION:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_PRODUCT_VARIANT_OPTION_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_PRODUCT_VARIANT_OPTION_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };

      
    case DELETE_PRODUCT_VARIANT_OPTION:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_PRODUCT_VARIANT_OPTION_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_PRODUCT_VARIANT_OPTION_ERROR:
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
