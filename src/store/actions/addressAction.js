import addressService from "../services/addressService";

export const GET_ADDRESS_ID = "GET_ADDRESS_ID";
export const GET_ADDRESS_ID_SUCCESS = "GET_ADDRESS_ID_SUCCESS";
export const GET_ADDRESS_ID_ERROR = "GET_ADDRESS_ID_ERROR";

export const GET_ALL_COUNTRY = "GET_ALL_COUNTRY";
export const GET_ALL_COUNTRY_SUCCESS = "GET_ALL_COUNTRY_SUCCESS";
export const GET_ALL_COUNTRY_ERROR = "GET_ALL_COUNTRY_ERROR";

export const GET_ALL_CITY = "GET_ALL_CITY";
export const GET_ALL_CITY_SUCCESS = "GET_ALL_CITY_SUCCESS";
export const GET_ALL_CITY_ERROR = "GET_ALL_CITY_ERROR";

export const GET_ALL_AREA = "GET_ALL_AREA";
export const GET_ALL_AREA_SUCCESS = "GET_ALL_AREA_SUCCESS";
export const GET_ALL_AREA_ERROR = "GET_ALL_AREA_ERROR";

export function getAddressByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getAddressById());
    return await addressService
      .getAddressById(id)

      .then((response) => dispatch(getAddressByIdSuccess(response.data)))
      .catch((error) => dispatch(getAddressByIdError(error)));
  };
}

export function getAddressById() {
  return {
    type: GET_ADDRESS_ID,
  };
}

export function getAddressByIdSuccess(success) {
  return {
    type: GET_ADDRESS_ID_SUCCESS,
    payload: { success },
  };
}

export function getAddressByIdError(error) {
  return {
    type: GET_ADDRESS_ID_ERROR,
    payload: { error },
  };
}

export function getAllCountryRecord() {
  return async (dispatch) => {
    dispatch(getAllCountry());
    return await addressService
      .getAllCountry()

      .then((response) => dispatch(getAllCountrySuccess(response.data)))
      .catch((error) => dispatch(getAllCountryError(error)));
  };
}

export function getAllCountry() {
  return {
    type: GET_ALL_COUNTRY,
  };
}

export function getAllCountrySuccess(success) {
  return {
    type: GET_ALL_COUNTRY_SUCCESS,
    payload: { success },
  };
}

export function getAllCountryError(error) {
  return {
    type: GET_ALL_COUNTRY_ERROR,
    payload: { error },
  };
}

export function getAllCityRecord(countryId) {
  return async (dispatch) => {
    dispatch(getAllCity());
    return await addressService
      .getAllCity(countryId)

      .then((response) => dispatch(getAllCitySuccess(response.data)))
      .catch((error) => dispatch(getAllCityError(error)));
  };
}

export function getAllCity() {
  return {
    type: GET_ALL_CITY,
  };
}

export function getAllCitySuccess(success) {
  return {
    type: GET_ALL_CITY_SUCCESS,
    payload: { success },
  };
}

export function getAllCityError(error) {
  return {
    type: GET_ALL_CITY_ERROR,
    payload: { error },
  };
}

export function getAllAreaRecord(cityId) {
  return async (dispatch) => {
    dispatch(getAllArea());
    return await addressService
      .getAllArea(cityId)

      .then((response) => dispatch(getAllAreaSuccess(response.data)))
      .catch((error) => dispatch(getAllAreaError(error)));
  };
}

export function getAllArea() {
  return {
    type: GET_ALL_AREA,
  };
}

export function getAllAreaSuccess(success) {
  return {
    type: GET_ALL_AREA_SUCCESS,
    payload: { success },
  };
}

export function getAllAreaError(error) {
  return {
    type: GET_ALL_AREA_ERROR,
    payload: { error },
  };
}
