import {
  GET_PRODUCT_VARIANT_OPTION_VALUE,
  GET_PRODUCT_VARIANT_OPTION_VALUE_SUCCESS,
  GET_PRODUCT_VARIANT_OPTION_VALUE_ERROR,

  CREATE_PRODUCT_VARIANT_OPTION_VALUE,
  CREATE_PRODUCT_VARIANT_OPTION_VALUE_SUCCESS,
  CREATE_PRODUCT_VARIANT_OPTION_VALUE_ERROR,

  DELETE_PRODUCT_VARIANT_OPTION_VALUE,
  DELETE_PRODUCT_VARIANT_OPTION_VALUE_SUCCESS,
  DELETE_PRODUCT_VARIANT_OPTION_VALUE_ERROR

} from "../actions/productVariantOptionValueAction";

const initialState = {
  variantOptionValues: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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
    case GET_PRODUCT_VARIANT_OPTION_VALUE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PRODUCT_VARIANT_OPTION_VALUE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        variantOptionValues: action.payload.success,
      };

    case GET_PRODUCT_VARIANT_OPTION_VALUE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        variantOptionValues: [],
      };


    case CREATE_PRODUCT_VARIANT_OPTION_VALUE:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_PRODUCT_VARIANT_OPTION_VALUE_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_PRODUCT_VARIANT_OPTION_VALUE_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case DELETE_PRODUCT_VARIANT_OPTION_VALUE:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_PRODUCT_VARIANT_OPTION_VALUE_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_PRODUCT_VARIANT_OPTION_VALUE_ERROR:
      return {
        ...state,
        deleting: false,
        deleted: false,
        error: action.payload.error,
        data: {},
      };
      
    default: // need this for default case
      return state
  }
}
