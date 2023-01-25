import {
  GET_ATTRIBUTE,
  GET_ATTRIBUTE_SUCCESS,
  GET_ATTRIBUTE_ERROR,

  GET_ATTRIBUTE_BY_ID,
  GET_ATTRIBUTE_BY_ID_SUCCESS,
  GET_ATTRIBUTE_BY_ID_ERROR,

  CREATE_ATTRIBUTE,
  CREATE_ATTRIBUTE_SUCCESS,
  CREATE_ATTRIBUTE_ERROR,

  UPDATE_ATTRIBUTE,
  UPDATE_ATTRIBUTE_SUCCESS,
  UPDATE_ATTRIBUTE_ERROR,

  DELETE_ATTRIBUTE,
  DELETE_ATTRIBUTE_SUCCESS,
  DELETE_ATTRIBUTE_ERROR
  
} from "../actions/attributeAction";

const initialState = {
  attributes: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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
    case GET_ATTRIBUTE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        attributes: action.payload.success,
      };

    case GET_ATTRIBUTE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        attributes: [],
      };

    case GET_ATTRIBUTE_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_ATTRIBUTE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        attributes: action.payload.success,
      };

    case GET_ATTRIBUTE_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        colors: [],
      };

    case CREATE_ATTRIBUTE:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_ATTRIBUTE_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };

    case UPDATE_ATTRIBUTE:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_ATTRIBUTE_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };

    case DELETE_ATTRIBUTE:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_ATTRIBUTE_ERROR:
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
