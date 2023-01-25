import {
  GET_ADDRESS_ID,
  GET_ADDRESS_ID_ERROR,
  GET_ADDRESS_ID_SUCCESS,
  GET_ALL_AREA,
  GET_ALL_AREA_ERROR,
  GET_ALL_AREA_SUCCESS,
  GET_ALL_CITY,
  GET_ALL_CITY_ERROR,
  GET_ALL_CITY_SUCCESS,
  GET_ALL_COUNTRY,
  GET_ALL_COUNTRY_ERROR,
  GET_ALL_COUNTRY_SUCCESS,
} from "../actions/addressAction";

const initialState = {
  addressById: [],
  allCountries: [],
  allCities: [],
  allAreas: [],
  data: {},
  loading: false,
  loaded: false,
  success: false,
  saving: false,
  saved: false,
  error: null,
  addressLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ADDRESS_ID:
      return {
        ...state,
        addressLoading: true,
        loaded: false,
        error: null,
      };

    case GET_ADDRESS_ID_SUCCESS:
      return {
        ...state,
        addressLoading: false,
        loaded: true,
        addressById: action.payload.success,
      };

    case GET_ADDRESS_ID_ERROR:
      return {
        ...state,
        addressLoading: false,
        loaded: false,
        error: action.payload.error,
        addressById: [],
      };

    case GET_ALL_COUNTRY:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_ALL_COUNTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        allCountries: action.payload.success,
      };

    case GET_ALL_COUNTRY_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        allCountries: [],
      };

    case GET_ALL_CITY:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_ALL_CITY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        success: true,
        allCities: action.payload.success,
      };

    case GET_ALL_CITY_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        allCities: [],
      };

    case GET_ALL_AREA:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_ALL_AREA_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        success: true,
        allAreas: action.payload.success,
      };

    case GET_ALL_AREA_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        allAreas: [],
      };

    default:
      return state;
  }
}