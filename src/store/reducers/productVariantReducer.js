import {
  GET_PRODUCT_VARIANT,
  GET_PRODUCT_VARIANT_SUCCESS,
  GET_PRODUCT_VARIANT_ERROR,

  GET_PRODUCT_VARIANT_BY_ID,
  GET_PRODUCT_VARIANT_BY_ID_SUCCESS,
  GET_PRODUCT_VARIANT_BY_ID_ERROR,

  CREATE_PRODUCT_VARIANT,
  CREATE_PRODUCT_VARIANT_SUCCESS,
  CREATE_PRODUCT_VARIANT_ERROR,

  UPDATE_PRODUCT_VARIANT,
  UPDATE_PRODUCT_VARIANT_SUCCESS,
  UPDATE_PRODUCT_VARIANT_ERROR,

  DELETE_PRODUCT_VARIANT,
  DELETE_PRODUCT_VARIANT_SUCCESS,
  DELETE_PRODUCT_VARIANT_ERROR,

  GET_PRODUCT_VARIANT_BY_CATEGORY_ID,
  GET_PRODUCT_VARIANT_BY_CATEGORY_ID_SUCCESS,
  GET_PRODUCT_VARIANT_BY_CATEGORY_ID_ERROR

} from "../actions/productVariantAction";

const initialState = {
  variants: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
  variantsWithCategoryId: [],
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
    case GET_PRODUCT_VARIANT:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PRODUCT_VARIANT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        variants: action.payload.success,
      };

    case GET_PRODUCT_VARIANT_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        variants: [],
      };


    case GET_PRODUCT_VARIANT_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PRODUCT_VARIANT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        variants: action.payload.success,
      };

    case GET_PRODUCT_VARIANT_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        variants: [],
      };


    case CREATE_PRODUCT_VARIANT:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_PRODUCT_VARIANT_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_PRODUCT_VARIANT_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_PRODUCT_VARIANT:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_PRODUCT_VARIANT_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_PRODUCT_VARIANT_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };


    case DELETE_PRODUCT_VARIANT:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_PRODUCT_VARIANT_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_PRODUCT_VARIANT_ERROR:
      return {
        ...state,
        deleting: false,
        deleted: false,
        error: action.payload.error,
        data: {},
      };


    case GET_PRODUCT_VARIANT_BY_CATEGORY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PRODUCT_VARIANT_BY_CATEGORY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        variantsWithCategoryId: action.payload.success,
      };

    case GET_PRODUCT_VARIANT_BY_CATEGORY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        variantsWithCategoryId: [],
      };
      
    default:
      return state;
  }
}
