import {
  GET_MEASUREMENT_CHART,
  GET_MEASUREMENT_CHART_SUCCESS,
  GET_MEASUREMENT_CHART_ERROR,

  GET_MEASUREMENT_CHART_BY_ID,
  GET_MEASUREMENT_CHART_BY_ID_SUCCESS,
  GET_MEASUREMENT_CHART_BY_ID_ERROR,

  CREATE_MEASUREMENT_CHART,
  CREATE_MEASUREMENT_CHART_SUCCESS,
  CREATE_MEASUREMENT_CHART_ERROR,

  UPDATE_MEASUREMENT_CHART,
  UPDATE_MEASUREMENT_CHART_SUCCESS,
  UPDATE_MEASUREMENT_CHART_ERROR,

  DELETE_MEASUREMENT_CHART,
  DELETE_MEASUREMENT_CHART_SUCCESS,
  DELETE_MEASUREMENT_CHART_ERROR

} from "../actions/measurementChartAction";

const initialState = {
  measurements: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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
    case GET_MEASUREMENT_CHART:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_MEASUREMENT_CHART_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        measurements: action.payload.success,
      };

    case GET_MEASUREMENT_CHART_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        measurements: [],
      };


    case GET_MEASUREMENT_CHART_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_MEASUREMENT_CHART_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        measurements: action.payload.success,
      };

    case GET_MEASUREMENT_CHART_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        measurements: [],
      };


    case CREATE_MEASUREMENT_CHART:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_MEASUREMENT_CHART_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_MEASUREMENT_CHART_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };


    case UPDATE_MEASUREMENT_CHART:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_MEASUREMENT_CHART_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_MEASUREMENT_CHART_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };

      
    case DELETE_MEASUREMENT_CHART:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_MEASUREMENT_CHART_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_MEASUREMENT_CHART_ERROR:
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
