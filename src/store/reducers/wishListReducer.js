import {
  GET_WISH_LIST,
  GET_WISH_LIST_SUCCESS,
  GET_WISH_LIST_ERROR,

  GET_WISH_LIST_BY_ID,
  GET_WISH_LIST_BY_ID_SUCCESS,
  GET_WISH_LIST_BY_ID_ERROR,

  CREATE_WISH_LIST,
  CREATE_WISH_LIST_SUCCESS,
  CREATE_WISH_LIST_ERROR,

  DELETE_WISH_LIST,
  DELETE_WISH_LIST_SUCCESS,
  DELETE_WISH_LIST_ERROR

} from "../actions/wishListAction";

const intialState = {
  wishLists: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
  data: {}, // THIS IS USED FOR TO HOLD SAVE DATA
  loading: false,
  loaded: false,
};

export default function (state = intialState, action) {
  switch (action.type) {
    case GET_WISH_LIST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_WISH_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        wishLists: action.payload.success,
      };

    case GET_WISH_LIST_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        wishLists: [],
      };


    case GET_WISH_LIST_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_WISH_LIST_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        wishLists: action.payload.success,
      };

    case GET_WISH_LIST_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        wishLists: [],
      };


    case CREATE_WISH_LIST:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_WISH_LIST_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_WISH_LIST_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };

      
    case DELETE_WISH_LIST:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case DELETE_WISH_LIST_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case DELETE_WISH_LIST_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };

    default:
      return state;
  }
}
