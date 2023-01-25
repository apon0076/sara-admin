import {
  GET_UNIT,
  GET_UNIT_SUCCESS,
  GET_UNIT_ERROR,

  GET_UNIT_BY_ID,
  GET_UNIT_BY_ID_SUCCESS,
  GET_UNIT_BY_ID_ERROR,

  CREATE_UNIT,
  CREATE_UNIT_SUCCESS,
  CREATE_UNIT_ERROR,

  UPDATE_UNIT,
  UPDATE_UNIT_SUCCESS,
  UPDATE_UNIT_ERROR,

  DELETE_UNIT,
  DELETE_UNIT_SUCCESS,
  DELETE_UNIT_ERROR

} from "../actions/unitAction";

const intialState = {
  units: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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
    case GET_UNIT:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_UNIT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        units: action.payload.success,
      };

    case GET_UNIT_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        units: [],
      };


    case GET_UNIT_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_UNIT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        units: action.payload.success,
      };

    case GET_UNIT_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        units: [],
      };


    case CREATE_UNIT:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_UNIT_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_UNIT_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_UNIT:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_UNIT_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_UNIT_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };

      
    case DELETE_UNIT:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_UNIT_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_UNIT_ERROR:
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
