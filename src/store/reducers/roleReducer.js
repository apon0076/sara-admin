import {
  GET_ROLE,
  GET_ROLE_SUCCESS,
  GET_ROLE_ERROR,

  GET_ROLE_BY_ID,
  GET_ROLE_BY_ID_SUCCESS,
  GET_ROLE_BY_ID_ERROR,

  CREATE_ROLE,
  CREATE_ROLE_SUCCESS,
  CREATE_ROLE_ERROR,

  UPDATE_ROLE,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_ERROR,

  DELETE_ROLE,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_ERROR

} from "../actions/roleAction";

const initialState = {
  roles: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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
    case GET_ROLE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        roles: action.payload.success,
      };

    case GET_ROLE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        roles: [],
      };


    case GET_ROLE_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_ROLE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        roles: action.payload.success,
      };

    case GET_ROLE_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        roles: [],
      };


    case CREATE_ROLE:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_ROLE_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_ROLE_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_ROLE:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_ROLE_ERROR:
      return {
        ...state,
        updating: true,
        updated: false,
        error: action.payload.error,
        data: {},
      };

      
    case DELETE_ROLE:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_ROLE_ERROR:
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
