import {
  GET_APPLICANT,
  GET_APPLICANT_ERROR,
  GET_APPLICANT_RESET,
  GET_APPLICANT_SUCCESS,
  GET_CIRCULAR_LIST,
  GET_CIRCULAR_LIST_ERROR,
  GET_CIRCULAR_LIST_RESET,
  GET_CIRCULAR_LIST_SUCCESS,
  GET_SINGLE_CIRCULAR,
  GET_SINGLE_CIRCULAR_ERROR,
  GET_SINGLE_CIRCULAR_RESET,
  GET_SINGLE_CIRCULAR_SUCCESS,
  POST_JOB_CIRCULAR,
  POST_JOB_CIRCULAR_ERROR,
  POST_JOB_CIRCULAR_RESET,
  POST_JOB_CIRCULAR_SUCCESS,
} from "../actions/careerAction";

const initialState = {
  loading: false,
  error: null,
  postJobCircular: [],
  jobCircularList: [],
  singleJobCircular: {},
  applicantList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    // Post Job Circular Start
    case POST_JOB_CIRCULAR:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case POST_JOB_CIRCULAR_SUCCESS:
      return {
        ...state,
        loading: false,
        postJobCircular: action.payload.success,
      };

    case POST_JOB_CIRCULAR_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        postJobCircular: [],
      };
    case POST_JOB_CIRCULAR_RESET:
      return {
        ...state,
        loading: false,
        error: null,
      };
    // Post Job Circular End

    // Get Circular List Start
    case GET_CIRCULAR_LIST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_CIRCULAR_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        jobCircularList: action.payload.success,
      };

    case GET_CIRCULAR_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobCircularList: [],
      };
    case GET_CIRCULAR_LIST_RESET:
      return {
        ...state,
        loading: false,
        error: null,
      };
    // Get Circular List End

    // Get Single Circular Start
    case GET_SINGLE_CIRCULAR:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_SINGLE_CIRCULAR_SUCCESS:
      return {
        ...state,
        loading: false,
        singleJobCircular: action.payload.success,
      };

    case GET_SINGLE_CIRCULAR_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        singleJobCircular: [],
      };
    case GET_SINGLE_CIRCULAR_RESET:
      return {
        ...state,
        loading: false,
        error: null,
      };
    // Get Single Circular End

    // Get Applicant List Start
    case GET_APPLICANT:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_APPLICANT_SUCCESS:
      return {
        ...state,
        loading: false,
        applicantList: action.payload.success,
      };

    case GET_APPLICANT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        applicantList: [],
      };
    case GET_APPLICANT_RESET:
      return {
        ...state,
        loading: false,
        error: null,
      };
    // Get Applicant List End

    default:
      return state;
  }
}
