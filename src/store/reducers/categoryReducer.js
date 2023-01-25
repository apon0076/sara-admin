import {
  GET_CATEGORY,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_ERROR,

  GET_CATEGORY_BY_ID,
  GET_CATEGORY_BY_ID_SUCCESS,
  GET_CATEGORY_BY_ID_ERROR,

  CREATE_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_ERROR,

  UPDATE_CATEGORY,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_ERROR,

  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR

} from "../actions/categoryAction";

const initialState = {
  categories: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
  data: {}, // THIS IS USED FOR TO HOLD SAVE DATA
  categoryAvailable: null,
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
    case GET_CATEGORY:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        categories: action.payload.success,
      };

    case GET_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        categories: [],
      };


    case GET_CATEGORY_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_CATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        categories: action.payload.success,
      };

    case GET_CATEGORY_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        categories: [],
      };


    case CREATE_CATEGORY:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_CATEGORY_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_CATEGORY:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_CATEGORY_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };


    case DELETE_CATEGORY:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_CATEGORY_ERROR:
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
