import {
  GET_ACTIVE_BREADCRUMBS_CATEGORY,
  GET_ACTIVE_BREADCRUMBS_CATEGORY_SUCCESS,
  GET_ACTIVE_BREADCRUMBS_CATEGORY_ERROR,

  GET_ACTIVE_BREADCRUMBS_PRODUCT_CATEGORY,
  GET_ACTIVE_BREADCRUMBS_PRODUCT_CATEGORY_SUCCESS,
  GET_ACTIVE_BREADCRUMBS_PRODUCT_CATEGORY_ERROR,

  GET_ACTIVE_BREADCRUMBS_CATEGORY_BY_ID,
  GET_ACTIVE_BREADCRUMBS_CATEGORY_BY_ID_SUCCESS,
  GET_ACTIVE_BREADCRUMBS_CATEGORY_BY_ID_ERROR,

  CREATE_ACTIVE_BREADCRUMBS_CATEGORY,
  CREATE_ACTIVE_BREADCRUMBS_CATEGORY_SUCCESS,
  CREATE_ACTIVE_BREADCRUMBS_CATEGORY_ERROR,

  UPDATE_ACTIVE_BREADCRUMBS_CATEGORY,
  UPDATE_ACTIVE_BREADCRUMBS_CATEGORY_SUCCESS,
  UPDATE_ACTIVE_BREADCRUMBS_CATEGORY_ERROR,

  DELETE_ACTIVE_BREADCRUMBS_CATEGORY,
  DELETE_ACTIVE_BREADCRUMBS_CATEGORY_SUCCESS,
  DELETE_ACTIVE_BREADCRUMBS_CATEGORY_ERROR
  
} from "../actions/activeBreadcrumbsCategoryAction";

const initialState = {
  activeBreadcrumbsCategories: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
  activeBreadcrumbsProductCategories: [],
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
    case GET_ACTIVE_BREADCRUMBS_CATEGORY:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_ACTIVE_BREADCRUMBS_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        activeBreadcrumbsCategories: action.payload.success,
      };

    case GET_ACTIVE_BREADCRUMBS_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        activeBreadcrumbsCategories: [],
      };

    case GET_ACTIVE_BREADCRUMBS_PRODUCT_CATEGORY:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_ACTIVE_BREADCRUMBS_PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        activeBreadcrumbsProductCategories: action.payload.success,
      };

    case GET_ACTIVE_BREADCRUMBS_PRODUCT_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        activeBreadcrumbsProductCategories: [],
      };


    case GET_ACTIVE_BREADCRUMBS_CATEGORY_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_ACTIVE_BREADCRUMBS_CATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        activeBreadcrumbsCategories: action.payload.success,
      };

    case GET_ACTIVE_BREADCRUMBS_CATEGORY_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        activeBreadcrumbsCategories: [],
      };


    case CREATE_ACTIVE_BREADCRUMBS_CATEGORY:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_ACTIVE_BREADCRUMBS_CATEGORY_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_ACTIVE_BREADCRUMBS_CATEGORY_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_ACTIVE_BREADCRUMBS_CATEGORY:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_ACTIVE_BREADCRUMBS_CATEGORY_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_ACTIVE_BREADCRUMBS_CATEGORY_ERROR:
      return {
        ...state,
        updating: true,
        updated: false,
        error: action.payload.error,
        data: {},
      };


    case DELETE_ACTIVE_BREADCRUMBS_CATEGORY:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_ACTIVE_BREADCRUMBS_CATEGORY_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_ACTIVE_BREADCRUMBS_CATEGORY_ERROR:
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
