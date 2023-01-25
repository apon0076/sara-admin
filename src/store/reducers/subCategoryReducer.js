import {
  GET_SUBCATEGORY,
  GET_SUBCATEGORY_SUCCESS,
  GET_SUBCATEGORY_ERROR,

  GET_SUBCATEGORY_BY_ID,
  GET_SUBCATEGORY_BY_ID_SUCCESS,
  GET_SUBCATEGORY_BY_ID_ERROR,

  CREATE_SUBCATEGORY,
  CREATE_SUBCATEGORY_SUCCESS,
  CREATE_SUBCATEGORY_ERROR,

  UPDATE_SUBCATEGORY,
  UPDATE_SUBCATEGORY_SUCCESS,
  UPDATE_SUBCATEGORY_ERROR,

  DELETE_SUBCATEGORY,
  DELETE_SUBCATEGORY_SUCCESS,
  DELETE_SUBCATEGORY_ERROR

} from "../actions/subCategoryAction";

const intialState = {
  subCategories: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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
    case GET_SUBCATEGORY:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        subCategories: action.payload.success,
      };

    case GET_SUBCATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        subCategories: [],
      };


    case GET_SUBCATEGORY_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_SUBCATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        subCategories: action.payload.success,
      };

    case GET_SUBCATEGORY_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        subCategories: [],
      };


    case CREATE_SUBCATEGORY:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_SUBCATEGORY_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_SUBCATEGORY:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_SUBCATEGORY_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };

      
    case DELETE_SUBCATEGORY:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_SUBCATEGORY_ERROR:
      return {
        ...state,
        deleting: false,
        deleted: true,
        error: action.payload.error,
        data: {},
      };

    default:
      return state;
  }
}
