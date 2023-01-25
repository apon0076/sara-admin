import {
  GET_POPUP,
  GET_POPUP_SUCCESS,
  GET_POPUP_ERROR,

  GET_POPUP_BY_ID,
  GET_POPUP_BY_ID_SUCCESS,
  GET_POPUP_BY_ID_ERROR,

  CREATE_POPUP,
  CREATE_POPUP_SUCCESS,
  CREATE_POPUP_ERROR,

  UPDATE_POPUP,
  UPDATE_POPUP_SUCCESS,
  UPDATE_POPUP_ERROR,

  DELETE_POPUP,
  DELETE_POPUP_SUCCESS,
  DELETE_POPUP_ERROR

} from "../actions/popUpAction";

const initialState = {
  banners: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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
    case GET_POPUP:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_POPUP_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        banners: action.payload.success,
      };

    case GET_POPUP_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        banners: [],
      };


    case GET_POPUP_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_POPUP_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        banners: action.payload.success,
      };

    case GET_POPUP_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        banners: [],
      };


    case CREATE_POPUP:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_POPUP_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_POPUP_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_POPUP:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_POPUP_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_POPUP_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };

      
    case DELETE_POPUP:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_POPUP_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_POPUP_ERROR:
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
