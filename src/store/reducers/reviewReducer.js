import {
  GET_REVIEW,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_ERROR,

  GET_REVIEW_BY_ID,
  GET_REVIEW_BY_ID_SUCCESS,
  GET_REVIEW_BY_ID_ERROR,

  CREATE_REVIEW,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_ERROR,

  UPDATE_REVIEW,
  UPDATE_REVIEW_SUCCESS,
  UPDATE_REVIEW_ERROR,

  DELETE_REVIEW,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_ERROR

} from "../actions/reviewAction";

const initialState = {
  categories: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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
    case GET_REVIEW:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        categories: action.payload.success,
      };

    case GET_REVIEW_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        categories: [],
      };


    case GET_REVIEW_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_REVIEW_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        categories: action.payload.success,
      };

    case GET_REVIEW_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        categories: [],
      };


    case CREATE_REVIEW:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_REVIEW_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_REVIEW:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_REVIEW_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };

      
    case DELETE_REVIEW:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_REVIEW_ERROR:
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
