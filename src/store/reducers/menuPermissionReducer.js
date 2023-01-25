import {
  GET_MENU_PERMISSION,
  GET_MENU_PERMISSION_SUCCESS,
  GET_MENU_PERMISSION_ERROR,

  GET_MENU_PERMISSION_BY_ID,
  GET_MENU_PERMISSION_BY_ID_SUCCESS,
  GET_MENU_PERMISSION_BY_ID_ERROR,

  CREATE_MENU_PERMISSION,
  CREATE_MENU_PERMISSION_SUCCESS,
  CREATE_MENU_PERMISSION_ERROR,

  UPDATE_MENU_PERMISSION,
  UPDATE_MENU_PERMISSION_SUCCESS,
  UPDATE_MENU_PERMISSION_ERROR,

  DELETE_MENU_PERMISSION,
  DELETE_MENU_PERMISSION_SUCCESS,
  DELETE_MENU_PERMISSION_ERROR

} from "../actions/menuPermissionAction";

const initialState = {
  menupermissions: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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
    case GET_MENU_PERMISSION:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_MENU_PERMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        menus: action.payload.success,
      };

    case GET_MENU_PERMISSION_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        menus: [],
      };


    case GET_MENU_PERMISSION_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_MENU_PERMISSION_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        menus: action.payload.success,
      };

    case GET_MENU_PERMISSION_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        menus: [],
      };


    case CREATE_MENU_PERMISSION:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_MENU_PERMISSION_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_MENU_PERMISSION_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_MENU_PERMISSION:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_MENU_PERMISSION_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_MENU_PERMISSION_ERROR:
      return {
        ...state,
        updating: true,
        updated: false,
        error: action.payload.error,
        data: {},
      };

      
    case DELETE_MENU_PERMISSION:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_MENU_PERMISSION_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_MENU_PERMISSION_ERROR:
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
