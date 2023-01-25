//import { SUCCESS, ERROR, CLEAR } from "../actions/alertAction";
import {
  CREATE_PROFILE,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_ERROR,

  UPDATE_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,

  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,

  GET_PROFILE_BY_ID,
  GET_PROFILE_BY_ID_SUCCESS,
  GET_PROFILE_BY_ID_ERROR,

  UPDATE_ADMIN_PASSWORD,
  UPDATE_ADMIN_PASSWORD_SUCCESS,
  UPDATE_ADMIN_PASSWORD_ERROR

} from "../actions/profileAction";

const initialState = {
  profiles: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
  data: {}, // THIS IS USED FOR TO HOLD SAVE DATA
  profileById: [],
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
    case GET_PROFILE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        profiles: action.payload.success,
      };

    case GET_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        profiles: [],
      };


    case GET_PROFILE_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }

    case GET_PROFILE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        profileById: action.payload.success,
      }

    case GET_PROFILE_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        profileById: [],
      }


    case CREATE_PROFILE:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_PROFILE_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_PROFILE_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_PROFILE:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_PROFILE_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };

      
    case UPDATE_ADMIN_PASSWORD:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_ADMIN_PASSWORD_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_ADMIN_PASSWORD_ERROR:
      return {
        ...state,
        updating: true,
        updated: false,
        error: action.payload.error,
        data: {},
      };

    default:
      return state;
  }
}
