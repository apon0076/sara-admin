import {
  GET_ADS,
  GET_ADS_SUCCESS,
  GET_ADS_ERROR,

  GET_ADS_BY_ID,
  GET_ADS_BY_ID_SUCCESS,
  GET_ADS_BY_ID_ERROR,

  CREATE_ADS,
  CREATE_ADS_SUCCESS,
  CREATE_ADS_ERROR,

  UPDATE_ADS,
  UPDATE_ADS_SUCCESS,
  UPDATE_ADS_ERROR,

  DELETE_ADS,
  DELETE_ADS_SUCCESS,
  DELETE_ADS_ERROR
  
} from "../actions/adsAction";

const initialState = {
  ads: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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
    case GET_ADS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_ADS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        categories: action.payload.success,
      };

    case GET_ADS_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        categories: [],
      };


    case GET_ADS_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_ADS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        categories: action.payload.success,
      };

    case GET_ADS_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        categories: [],
      };


    case CREATE_ADS:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_ADS_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_ADS_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_ADS:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_ADS_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_ADS_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };


    case DELETE_ADS:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_ADS_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_ADS_ERROR:
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
