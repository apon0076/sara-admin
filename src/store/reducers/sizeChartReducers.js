import {
  ADD_OR_EDIT_SIZE_CHART,
  ADD_OR_EDIT_SIZE_CHART_ERROR,
  ADD_OR_EDIT_SIZE_CHART_RESET,
  ADD_OR_EDIT_SIZE_CHART_SUCCESS,
  GET_ALL_SIZE_CHART_ATTRIBUTE,
  GET_ALL_SIZE_CHART_ATTRIBUTE_ERROR,
  GET_ALL_SIZE_CHART_ATTRIBUTE_RESET,
  GET_ALL_SIZE_CHART_ATTRIBUTE_SUCCESS,
  GET_SELLER_WISE_SIZE_CHART_LIST,
  GET_SELLER_WISE_SIZE_CHART_LIST_ERROR,
  GET_SELLER_WISE_SIZE_CHART_LIST_RESET,
  GET_SELLER_WISE_SIZE_CHART_LIST_SUCCESS,
  GET_SINGLE_SIZE_CHART_ATTRIBUTE,
  GET_SINGLE_SIZE_CHART_ATTRIBUTE_ERROR,
  GET_SINGLE_SIZE_CHART_ATTRIBUTE_RESET,
  GET_SINGLE_SIZE_CHART_ATTRIBUTE_SUCCESS,
  GET_SINGLE_SIZE_CHART_TEMPLATE,
  GET_SINGLE_SIZE_CHART_TEMPLATE_ERROR,
  GET_SINGLE_SIZE_CHART_TEMPLATE_RESET,
  GET_SINGLE_SIZE_CHART_TEMPLATE_SUCCESS,
  GET_SIZE_CHART_ATTRIBUTE,
  GET_SIZE_CHART_ATTRIBUTE_ERROR,
  GET_SIZE_CHART_ATTRIBUTE_RESET,
  GET_SIZE_CHART_ATTRIBUTE_SUCCESS,
  GET_SIZE_CHART_TEMPLATE,
  GET_SIZE_CHART_TEMPLATE_ERROR,
  GET_SIZE_CHART_TEMPLATE_RESET,
  GET_SIZE_CHART_TEMPLATE_SUCCESS,
  POST_SIZE_CHART_ATTRIBUTE,
  POST_SIZE_CHART_ATTRIBUTE_ERROR,
  POST_SIZE_CHART_ATTRIBUTE_RESET,
  POST_SIZE_CHART_ATTRIBUTE_SUCCESS,
  GET_SIZE_CHART_SUMMARY_TEMPLATE,
  GET_SIZE_CHART_SUMMARY_TEMPLATE_ERROR,
  GET_SIZE_CHART_SUMMARY_TEMPLATE_RESET,
  GET_SIZE_CHART_SUMMARY_TEMPLATE_SUCCESS,
} from "../actions/sizeChartAction";

const initialState = {
  post_size_chart_attribute: [],
  get_size_chart_attribute: [],
  get_all_size_chart_attribute: [],
  get_single_size_chart_attribute: [],
  add_or_edit_size_chart: [],
  size_chart_template_list: [],
  size_chart_summary_template_list: [],
  size_chart_single_data: [],
  seller_wise_size_chart_list: [],
  success: false,
  loading: false,
  loaded: true,
  error: null,
  single_success: false,
  single_loading: false,
  single_loaded: true,
  single_error: null,
};

export const sizeChartReducers = (state = initialState, action) => {
  switch (action.type) {
    //Create Attribute Start
    case POST_SIZE_CHART_ATTRIBUTE:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case POST_SIZE_CHART_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        post_size_chart_attribute: action.payload,
      };
    case POST_SIZE_CHART_ATTRIBUTE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case POST_SIZE_CHART_ATTRIBUTE_RESET:
      return {
        post_size_chart_attribute: [],
        loading: false,
        error: null,
      };
    //Create Attribute End

    //Get Size Chart List Attributes Start
    case GET_SIZE_CHART_ATTRIBUTE:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case GET_SIZE_CHART_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        get_size_chart_attribute: action.payload,
      };
    case GET_SIZE_CHART_ATTRIBUTE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_SIZE_CHART_ATTRIBUTE_RESET:
      return {
        get_size_chart_attribute: [],
        loading: false,
        error: null,
      };
    //Get Size Chart List Attributes End

    //Get All Size Chart List Attributes Start
    case GET_ALL_SIZE_CHART_ATTRIBUTE:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case GET_ALL_SIZE_CHART_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        get_all_size_chart_attribute: action.payload,
      };
    case GET_ALL_SIZE_CHART_ATTRIBUTE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_ALL_SIZE_CHART_ATTRIBUTE_RESET:
      return {
        get_all_size_chart_attribute: [],
        loading: false,
        error: null,
      };
    //Get All Size Chart List Attributes End

    //Get Single Size Chart List Attributes Start
    case GET_SINGLE_SIZE_CHART_ATTRIBUTE:
      return {
        ...state,
        single_loading: true,
        single_success: false,
      };
    case GET_SINGLE_SIZE_CHART_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        single_loading: false,
        single_success: true,
        get_single_size_chart_attribute: action.payload,
      };
    case GET_SINGLE_SIZE_CHART_ATTRIBUTE_ERROR:
      return {
        ...state,
        single_loading: false,
        single_error: action.payload,
      };
    case GET_SINGLE_SIZE_CHART_ATTRIBUTE_RESET:
      return {
        get_single_size_chart_attribute: [],
        single_loading: false,
        single_error: null,
      };
    //Get Single Size Chart List Attributes End

    //Create Size chart
    case ADD_OR_EDIT_SIZE_CHART:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case ADD_OR_EDIT_SIZE_CHART_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        add_or_edit_size_chart: action.payload,
      };
    case ADD_OR_EDIT_SIZE_CHART_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_OR_EDIT_SIZE_CHART_RESET:
      return {
        add_or_edit_size_chart: [],
        loading: false,
        error: null,
      };
    //Create Attribute End

    //Get Size Chart Template List Start
    case GET_SIZE_CHART_TEMPLATE:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case GET_SIZE_CHART_TEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        size_chart_template_list: action.payload,
      };
    case GET_SIZE_CHART_TEMPLATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_SIZE_CHART_TEMPLATE_RESET:
      return {
        size_chart_template_list: [],
        loading: false,
        error: null,
      };
    //Get Size Chart Template List End

    //Get Size Chart Template Single Data Start
    case GET_SINGLE_SIZE_CHART_TEMPLATE:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case GET_SINGLE_SIZE_CHART_TEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        size_chart_single_data: action.payload,
      };
    case GET_SINGLE_SIZE_CHART_TEMPLATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_SINGLE_SIZE_CHART_TEMPLATE_RESET:
      return {
        size_chart_single_data: [],
        loading: false,
        error: null,
      };
    //Get Size Chart Template Single Data End

    //Get Size Chart Template Single Data Start
    case GET_SELLER_WISE_SIZE_CHART_LIST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case GET_SELLER_WISE_SIZE_CHART_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        seller_wise_size_chart_list: action.payload,
      };
    case GET_SELLER_WISE_SIZE_CHART_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_SELLER_WISE_SIZE_CHART_LIST_RESET:
      return {
        seller_wise_size_chart_list: [],
        loading: false,
        error: null,
      };
    //Get Size Chart Template Single Data End

     //Get Size Chart Summary Template Data Start
     case GET_SIZE_CHART_SUMMARY_TEMPLATE:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case GET_SIZE_CHART_SUMMARY_TEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        size_chart_summary_template_list: action.payload,
      };
    case GET_SIZE_CHART_SUMMARY_TEMPLATE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_SIZE_CHART_SUMMARY_TEMPLATE_RESET:
      return {
        size_chart_summary_template_list: [],
        loading: false,
        error: null,
      };
    //Get Size Chart Summary Template Data End

    default:
      return state;
  }
};
