import {
  GET_SHOP,
  GET_SHOP_SUCCESS,
  GET_SHOP_ERROR,

  GET_SHOP_BY_ID,
  GET_SHOP_BY_ID_SUCCESS,
  GET_SHOP_BY_ID_ERROR,

  CREATE_SHOP,
  CREATE_SHOP_SUCCESS,
  CREATE_SHOP_ERROR,

  UPDATE_SHOP,
  UPDATE_SHOP_SUCCESS,
  UPDATE_SHOP_ERROR,

  DELETE_SHOP,
  DELETE_SHOP_SUCCESS,
  DELETE_SHOP_ERROR,

  GET_PENDING_SHOP,
  GET_PENDING_SHOP_SUCCESS,
  GET_PENDING_SHOP_ERROR,

  GET_PENDING_SHOP_BY_ID,
  GET_PENDING_SHOP_BY_ID_SUCCESS,
  GET_PENDING_SHOP_BY_ID_ERROR

} from "../actions/shopAction";

const initialState = {
  shops: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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
    case GET_SHOP:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_SHOP_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        shops: action.payload.success,
      };

    case GET_SHOP_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        shops: [],
      };


    case GET_SHOP_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_SHOP_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        shops: action.payload.success,
      };

    case GET_SHOP_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        shops: [],
      };


    case CREATE_SHOP:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_SHOP_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_SHOP_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_SHOP:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_SHOP_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_SHOP_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };


    case DELETE_SHOP:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_SHOP_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_SHOP_ERROR:
      return {
        ...state,
        deleting: false,
        deleted: false,
        error: action.payload.error,
        data: {},
      };


    case GET_PENDING_SHOP:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PENDING_SHOP_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        shops: action.payload.success,
      };

    case GET_PENDING_SHOP_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        shops: [],
      };


    case GET_PENDING_SHOP_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PENDING_SHOP_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        shops: action.payload.success,
      };

    case GET_PENDING_SHOP_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        shops: [],
      };

    default:
      return state;
  }
}
