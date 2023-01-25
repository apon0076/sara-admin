import {
  GET_HOMEPAGE_SLIDER,
  GET_HOMEPAGE_SLIDER_SUCCESS,
  GET_HOMEPAGE_SLIDER_ERROR,

  GET_HOMEPAGE_SLIDER_BY_ID,
  GET_HOMEPAGE_SLIDER_BY_ID_SUCCESS,
  GET_HOMEPAGE_SLIDER_BY_ID_ERROR,

  CREATE_HOMEPAGE_SLIDER,
  CREATE_HOMEPAGE_SLIDER_SUCCESS,
  CREATE_HOMEPAGE_SLIDER_ERROR,

  UPDATE_HOMEPAGE_SLIDER,
  UPDATE_HOMEPAGE_SLIDER_SUCCESS,
  UPDATE_HOMEPAGE_SLIDER_ERROR,

  DELETE_HOMEPAGE_SLIDER,
  DELETE_HOMEPAGE_SLIDER_SUCCESS,
  DELETE_HOMEPAGE_SLIDER_ERROR

} from "../actions/homePageSliderAction";

const initialState = {
  sliders: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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
    case GET_HOMEPAGE_SLIDER:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_HOMEPAGE_SLIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        sliders: action.payload.success,
      };

    case GET_HOMEPAGE_SLIDER_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        sliders: [],
      };


    case GET_HOMEPAGE_SLIDER_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_HOMEPAGE_SLIDER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        sliders: action.payload.success,
      };

    case GET_HOMEPAGE_SLIDER_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        sliders: [],
      };


    case CREATE_HOMEPAGE_SLIDER:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_HOMEPAGE_SLIDER_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_HOMEPAGE_SLIDER_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_HOMEPAGE_SLIDER:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_HOMEPAGE_SLIDER_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_HOMEPAGE_SLIDER_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };

      
    case DELETE_HOMEPAGE_SLIDER:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_HOMEPAGE_SLIDER_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_HOMEPAGE_SLIDER_ERROR:
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
