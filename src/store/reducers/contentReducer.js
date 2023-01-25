import {
  CREATE_OR_UPDATE_CONTENT_TYPE,
  CREATE_OR_UPDATE_CONTENT_TYPE_ERROR,
  CREATE_OR_UPDATE_CONTENT_TYPE_SUCCESS,

  GET_CONTENT_TYPE,
  GET_CONTENT_TYPE_ERROR,
  GET_CONTENT_TYPE_SUCCESS,

  CREATE_OR_UPDATE_CONTENT_POST,
  CREATE_OR_UPDATE_CONTENT_POST_ERROR,
  CREATE_OR_UPDATE_CONTENT_POST_SUCCESS,
  CREATE_OR_UPDATE_CONTENT_POST_RESET,

  GET_CONTENT_POST,
  GET_CONTENT_POST_ERROR,
  GET_CONTENT_POST_SUCCESS,
  GET_CONTENT_POST_RESET

} from "../actions/contentAction";

const initialState = {
  contentTypeList: [], 
  contentPostList: [], 
  data: {}, // THIS IS USED FOR TO HOLD SAVE DATA
  loading: false,
  loadingPost: false,
  created: true,
  posted:true,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_OR_UPDATE_CONTENT_TYPE:
      return {
        ...state,
        created: false,
        error: null,
      };

    case CREATE_OR_UPDATE_CONTENT_TYPE_SUCCESS:
      return {
        ...state,
        created: true,
        data: action.payload.success,
      };

    case CREATE_OR_UPDATE_CONTENT_TYPE_ERROR:
      return {
        ...state,
        created: true,
        error: action.payload.error,
        data: {},
      };

      case GET_CONTENT_TYPE:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_CONTENT_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        contentTypeList: action.payload.success,
      };

    case GET_CONTENT_TYPE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        contentTypeList: [],
      };

      case CREATE_OR_UPDATE_CONTENT_POST:
      return {
        ...state,
        posted: false,
        error: null,
      };

    case CREATE_OR_UPDATE_CONTENT_POST_SUCCESS:
      return {
        ...state,
        posted: true,
        data: action.payload.success,
      };

    case CREATE_OR_UPDATE_CONTENT_POST_ERROR:
      return {
        ...state,
        posted: true,
        error: action.payload.error,
        data: {},
      };
    case CREATE_OR_UPDATE_CONTENT_POST_RESET:
      return {
        ...state,
        posted: true,
        error: null,
        data: {},
      };

      case GET_CONTENT_POST:
        return {
          ...state,
          loadingPost: true,
          error: null,
        };
  
      case GET_CONTENT_POST_SUCCESS:
        return {
          ...state,
          loadingPost: false,
          contentPostList: action.payload.success,
        };
  
      case GET_CONTENT_POST_ERROR:
        return {
          ...state,
          loadingPost: false,
          error: action.payload.error,
          contentPostList: [],
        };
  
      case GET_CONTENT_POST_RESET:
        return {
          ...state,
          loadingPost: false,
          error: null,
          contentPostList: [],
        };
    default:
      return state;
  }
}
