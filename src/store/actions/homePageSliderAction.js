//////////////////////This is import for API Call/////////////
import homePageSliderService from "../services/homePageSliderService";

export const GET_HOMEPAGE_SLIDER = "GET_HOMEPAGE_SLIDER";
export const GET_HOMEPAGE_SLIDER_SUCCESS = "GET_HOMEPAGE_SLIDER_SUCCESS";
export const GET_HOMEPAGE_SLIDER_ERROR = "GET_HOMEPAGE_SLIDER_ERROR";

export const GET_HOMEPAGE_SLIDER_BY_ID = "GET_HOMEPAGE_SLIDER_BY_ID";
export const GET_HOMEPAGE_SLIDER_BY_ID_SUCCESS =
  "GET_HOMEPAGE_SLIDER_BY_ID_SUCCESS";
export const GET_HOMEPAGE_SLIDER_BY_ID_ERROR =
  "GET_HOMEPAGE_SLIDER_BY_ID_ERROR";

export const CREATE_HOMEPAGE_SLIDER = "CREATE_HOMEPAGE_SLIDER";
export const CREATE_HOMEPAGE_SLIDER_SUCCESS = "CREATE_HOMEPAGE_SLIDER_SUCCESS";
export const CREATE_HOMEPAGE_SLIDER_ERROR = "CREATE_HOMEPAGE_SLIDER_ERROR";

export const UPDATE_HOMEPAGE_SLIDER = "UPDATE_HOMEPAGE_SLIDER";
export const UPDATE_HOMEPAGE_SLIDER_SUCCESS = "UPDATE_HOMEPAGE_SLIDER_SUCCESS";
export const UPDATE_HOMEPAGE_SLIDER_ERROR = "UPDATE_HOMEPAGE_SLIDER_ERROR";

export const DELETE_HOMEPAGE_SLIDER = "DELETE_HOMEPAGE_SLIDER";
export const DELETE_HOMEPAGE_SLIDER_SUCCESS = "DELETE_HOMEPAGE_SLIDER_SUCCESS";
export const DELETE_HOMEPAGE_SLIDER_ERROR = "DELETE_HOMEPAGE_SLIDER_ERROR";

//////////////////End of HomePageSlider Action Types/////////////////////////

export function getHomePageSliderRecord() {
  return async (dispatch) => {
    dispatch(getHomePageSlider());
    return await homePageSliderService
      .getHomePageSlider()

      .then((response) => dispatch(getHomePageSliderSuccess(response.data)))
      .catch((error) => dispatch(getHomePageSliderError(error)));
  };
}

export function getHomePageSlider() {
  return {
    type: GET_HOMEPAGE_SLIDER,
  };
}

export function getHomePageSliderSuccess(success) {
  return {
    type: GET_HOMEPAGE_SLIDER_SUCCESS,
    payload: { success },
  };
}

export function getHomePageSliderError(error) {
  return {
    type: CREATE_HOMEPAGE_SLIDER_ERROR,
    payload: { error },
  };
}

export function getHomePageSliderByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getHomePageSliderById());
    return await homePageSliderService
      .getHomePageSliderById(id)

      .then((response) => dispatch(getHomePageSliderByIdSuccess(response.data)))
      .catch((error) => dispatch(getHomePageSliderByIdError(error)));
  };
}

export function getHomePageSliderById() {
  return {
    type: GET_HOMEPAGE_SLIDER_BY_ID,
  };
}

export function getHomePageSliderByIdSuccess(success) {
  return {
    type: GET_HOMEPAGE_SLIDER_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getHomePageSliderByIdError(error) {
  return {
    type: GET_HOMEPAGE_SLIDER_BY_ID_ERROR,
    payload: { error },
  };
}

export function createHomePageSliderRecord(sliders) {
  return async (dispatch) => {
    dispatch(createHomePageSlider());
    return await homePageSliderService
      .createHomePageSlider(sliders)
      
      .then((response) => dispatch(createHomePageSliderSuccess(response)))
      .catch((error) => dispatch(createHomePageSliderError(error)));
  };
}

export function createHomePageSlider() {
  return {
    type: CREATE_HOMEPAGE_SLIDER,
  };
}

export function createHomePageSliderSuccess(success) {
  return {
    type: CREATE_HOMEPAGE_SLIDER_SUCCESS,
    payload: { success },
  };
}

export function createHomePageSliderError(error) {
  return {
    type: CREATE_HOMEPAGE_SLIDER_ERROR,
    payload: { error },
  };
}

export function updateHomePageSliderRecord(sliders) {
  return async (dispatch) => {
    dispatch(updateHomePageSlider());
    return await homePageSliderService
      .createHomePageSlider(sliders)

      .then((response) => dispatch(updateHomePageSliderSuccess(response)))
      .catch((error) => dispatch(updateHomePageSliderError(error)));
  };
}

export function updateHomePageSlider() {
  return {
    type: UPDATE_HOMEPAGE_SLIDER,
  };
}

export function updateHomePageSliderSuccess(success) {
  return {
    type: UPDATE_HOMEPAGE_SLIDER_SUCCESS,
    payload: { success },
  };
}

export function updateHomePageSliderError(error) {
  return {
    type: UPDATE_HOMEPAGE_SLIDER_ERROR,
    payload: { error },
  };
}

export function deleteHomePageSliderRecord(data) {
  return async (dispatch) => {
    dispatch(deleteHomePageSlider());
    return await homePageSliderService
      .deleteHomePageSlider(data)

      .then((response) => dispatch(deleteHomePageSliderSuccess(response)))
      .catch((error) => dispatch(deleteHomePageSliderError(error)));
  };
}

export function deleteHomePageSlider() {
  return {
    type: DELETE_HOMEPAGE_SLIDER,
  };
}

export function deleteHomePageSliderSuccess(success) {
  return {
    type: DELETE_HOMEPAGE_SLIDER_SUCCESS,
    payload: { success },
  };
}

export function deleteHomePageSliderError(error) {
  return {
    type: DELETE_HOMEPAGE_SLIDER_ERROR,
    payload: { error },
  };
}
