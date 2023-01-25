//////////////////CALLING NECESSARY ACTION/////////////////////////////
import {
  GET_BLOG_CATEGORY_DETAILS,
  GET_BLOG_CATEGORY_DETAILS_SUCCESS,
  GET_BLOG_CATEGORY_DETAILS_ERROR,

  CREATE_OR_UPDATE_BLOG_CATEGORY_DETAILS,
  CREATE_OR_UPDATE_BLOG_CATEGORY_DETAILS_SUCCESS,
  CREATE_OR_UPDATE_BLOG_CATEGORY_DETAILS_ERROR

} from "../actions/blogCategoryAction"

/////////////////END OF CALLING//////////////////////////////

const initialState = {
  blogCategoryDetails: [],
  data: {},
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  updating: false,
  updated: false,
  error: null,
}

export default function blogCategoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BLOG_CATEGORY_DETAILS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }

    case GET_BLOG_CATEGORY_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        blogCategoryDetails: action.payload.success,
      }

    case GET_BLOG_CATEGORY_DETAILS_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        blogCategoryDetails: [],
      }

      
    case CREATE_OR_UPDATE_BLOG_CATEGORY_DETAILS:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      }

    case CREATE_OR_UPDATE_BLOG_CATEGORY_DETAILS_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      }

    case CREATE_OR_UPDATE_BLOG_CATEGORY_DETAILS_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      }

    default:
      return state
  }
}
