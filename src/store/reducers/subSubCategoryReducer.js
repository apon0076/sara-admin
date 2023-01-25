import {
  GET_SUBSUBCATEGORY,
  GET_SUBSUBCATEGORY_SUCCESS,
  GET_SUBSUBCATEGORY_ERROR,

  GET_SUBSUBCATEGORY_BY_ID,
  GET_SUBSUBCATEGORY_BY_ID_SUCCESS,
  GET_SUBSUBCATEGORY_BY_ID_ERROR,

  CREATE_SUBSUBCATEGORY,
  CREATE_SUBSUBCATEGORY_SUCCESS,
  CREATE_SUBSUBCATEGORY_ERROR,

  UPDATE_SUBSUBCATEGORY,
  UPDATE_SUBSUBCATEGORY_SUCCESS,
  UPDATE_SUBSUBCATEGORY_ERROR,

  DELETE_SUBSUBCATEGORY,
  DELETE_SUBSUBCATEGORY_SUCCESS,
  DELETE_SUBSUBCATEGORY_ERROR

} from "../actions/subSubCategoryAction";

const intialState = {
  subSubCategories: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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
    case GET_SUBSUBCATEGORY:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_SUBSUBCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        subSubCategories: action.payload.success,
      };

    case GET_SUBSUBCATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        subSubCategories: [],
      };


    case GET_SUBSUBCATEGORY_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_SUBSUBCATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        subSubCategories: action.payload.success,
      };

    case GET_SUBSUBCATEGORY_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        subSubCategories: [],
      };


    case UPDATE_SUBSUBCATEGORY:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_SUBSUBCATEGORY_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_SUBSUBCATEGORY_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };


    case CREATE_SUBSUBCATEGORY:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_SUBSUBCATEGORY_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_SUBSUBCATEGORY_ERROR:
      return {
        ...state,
        saving: false,
        saved: true,
        error: action.payload.error,
        data: {},
      };

      
    case DELETE_SUBSUBCATEGORY:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_SUBSUBCATEGORY_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_SUBSUBCATEGORY_ERROR:
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
