import {
  GET_BUSSINESS_TYPE,
  GET_BUSSINESS_TYPE_SUCCESS,
  GET_BUSSINESS_TYPE_ERROR,

  GET_BUSSINESS_TYPE_BY_ID,
  GET_BUSSINESS_TYPE_BY_ID_SUCCESS,
  GET_BUSSINESS_TYPE_BY_ID_ERROR,

  CREATE_BUSSINESS_TYPE,
  CREATE_BUSSINESS_TYPE_SUCCESS,
  CREATE_BUSSINESS_TYPE_ERROR,

  UPDATE_BUSSINESS_TYPE,
  UPDATE_BUSSINESS_TYPE_SUCCESS,
  UPDATE_BUSSINESS_TYPE_ERROR,

  DELETE_BUSSINESS_TYPE,
  DELETE_BUSSINESS_TYPE_SUCCESS,
  DELETE_BUSSINESS_TYPE_ERROR

} from "../actions/bussinessTypeAction";

const initialState = {
  bussinessTypes: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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
    case GET_BUSSINESS_TYPE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_BUSSINESS_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        bussinessTypes: action.payload.success,
      };

    case GET_BUSSINESS_TYPE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        bussinessTypes: [],
      };


    case GET_BUSSINESS_TYPE_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_BUSSINESS_TYPE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        bussinessTypes: action.payload.success,
      };

    case GET_BUSSINESS_TYPE_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        bussinessTypes: [],
      };


    case CREATE_BUSSINESS_TYPE:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_BUSSINESS_TYPE_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_BUSSINESS_TYPE_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_BUSSINESS_TYPE:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_BUSSINESS_TYPE_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_BUSSINESS_TYPE_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };

      
    case DELETE_BUSSINESS_TYPE:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_BUSSINESS_TYPE_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_BUSSINESS_TYPE_ERROR:
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
