import {
  GET_SECONDARY_IMAGE,
  GET_SECONDARY_IMAGE_SUCCESS,
  GET_SECONDARY_IMAGE_ERROR,

  GET_SECONDARY_IMAGE_BY_ID,
  GET_SECONDARY_IMAGE_BY_ID_SUCCESS,
  GET_SECONDARY_IMAGE_BY_ID_ERROR,

  CREATE_SECONDARY_IMAGE,
  CREATE_SECONDARY_IMAGE_SUCCESS,
  CREATE_SECONDARY_IMAGE_ERROR,

  UPDATE_SECONDARY_IMAGE,
  UPDATE_SECONDARY_IMAGE_SUCCESS,
  UPDATE_SECONDARY_IMAGE_ERROR,

  DELETE_SECONDARY_IMAGE,
  DELETE_SECONDARY_IMAGE_SUCCESS,
  DELETE_SECONDARY_IMAGE_ERROR

} from "../actions/secondaryImageAction";

const initialState = {
  secondaryImages: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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
    case GET_SECONDARY_IMAGE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_SECONDARY_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        secondaryImages: action.payload.success,
      };

    case GET_SECONDARY_IMAGE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        secondaryImages: [],
      };


    case GET_SECONDARY_IMAGE_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_SECONDARY_IMAGE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        secondaryImages: action.payload.success,
      };

    case GET_SECONDARY_IMAGE_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        secondaryImages: [],
      };


    case CREATE_SECONDARY_IMAGE:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_SECONDARY_IMAGE_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_SECONDARY_IMAGE_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_SECONDARY_IMAGE:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_SECONDARY_IMAGE_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_SECONDARY_IMAGE_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };

      
    case DELETE_SECONDARY_IMAGE:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_SECONDARY_IMAGE_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_SECONDARY_IMAGE_ERROR:
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
