//////////////////////This is import for API Call/////////////
import adsService from "../services/adsService";

export const GET_ADS = "GET_ADS";
export const GET_ADS_SUCCESS = "GET_ADS_SUCCESS";
export const GET_ADS_ERROR = "GET_ADS_ERROR";

export const GET_ADS_BY_ID = "GET_ADS_BY_ID";
export const GET_ADS_BY_ID_SUCCESS = "GET_ADS_BY_ID_SUCCESS";
export const GET_ADS_BY_ID_ERROR = "GET_ADS_BY_ID_ERROR";

export const CREATE_ADS = "CREATE_ADS";
export const CREATE_ADS_SUCCESS = "CREATE_ADS_SUCCESS";
export const CREATE_ADS_ERROR = "CREATE_ADS_ERROR";

export const UPDATE_ADS = "UPDATE_ADS";
export const UPDATE_ADS_SUCCESS = "UPDATE_ADS_SUCCESS";
export const UPDATE_ADS_ERROR = "UPDATE_ADS_ERROR";

export const DELETE_ADS = "DELETE_ADS";
export const DELETE_ADS_SUCCESS = "DELETE_ADS_SUCCESS";
export const DELETE_ADS_ERROR = "DELETE_ADS_ERROR";

//////////////////END OF COLOR ACTION TYPES/////////////////////////

export function getAdsRecord() {
  return async (dispatch) => {
    dispatch(getAds());
    return await adsService
      .getAds()

      .then((response) => dispatch(getAdsSuccess(response.data)))
      .catch((error) => dispatch(getAdsError(error)));
  };
}

export function getAds() {
  return {
    type: GET_ADS,
  };
}

export function getAdsSuccess(success) {
  return {
    type: GET_ADS_SUCCESS,
    payload: { success },
  };
}

export function getAdsError(error) {
  return {
    type: GET_ADS_ERROR,
    payload: { error },
  };
}

export function getAdsByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getAdsById());
    return await adsService
      .getAdsById(id)

      .then((response) => dispatch(getAdsByIdSuccess(response.data)))
      .catch((error) => dispatch(getAdsByIdError(error)));
  };
}

export function getAdsById() {
  return {
    type: GET_ADS_BY_ID,
  };
}

export function getAdsByIdSuccess(success) {
  return {
    type: GET_ADS_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getAdsByIdError(error) {
  return {
    type: GET_ADS_BY_ID_ERROR,
    payload: { error },
  };
}

export function createAdsRecord(data) {
  return async (dispatch) => {
    dispatch(createAds());
    return await adsService
      .createAds(data)
      
      .then((response) => dispatch(createAdsSuccess(response)))
      .catch((error) => dispatch(createAdsError(error)));
  };
}

export function createAds() {
  return {
    type: CREATE_ADS,
  };
}

export function createAdsSuccess(success) {
  return {
    type: CREATE_ADS_SUCCESS,
    payload: { success },
  };
}

export function createAdsError(error) {
  return {
    type: CREATE_ADS_ERROR,
    payload: { error },
  };
}

export function updateAdsRecord(breadcrumbsCategories) {
  return async (dispatch) => {
    dispatch(updateAds());
    return await adsService
      .createAds(breadcrumbsCategories)

      .then((response) => dispatch(updateAdsSuccess(response)))
      .catch((error) => dispatch(updateAdsError(error)));
  };
}

export function updateAds() {
  return {
    type: UPDATE_ADS,
  };
}

export function updateAdsSuccess(success) {
  return {
    type: UPDATE_ADS_SUCCESS,
    payload: { success },
  };
}

export function updateAdsError(error) {
  return {
    type: UPDATE_ADS_ERROR,
    payload: { error },
  };
}

export function deleteAdsRecord(data) {
  return async (dispatch) => {
    dispatch(deleteAds());
    return await adsService
      .deleteAds(data)

      .then((response) => dispatch(deleteAdsSuccess(response.data)))
      .catch((error) => dispatch(deleteAdsError(error)));
  };
}

export function deleteAds() {
  return {
    type: DELETE_ADS,
  };
}

export function deleteAdsSuccess(success) {
  return {
    type: DELETE_ADS_SUCCESS,
    payload: { success },
  };
}

export function deleteAdsError(error) {
  return {
    type: DELETE_ADS_ERROR,
    payload: { error },
  };
}
