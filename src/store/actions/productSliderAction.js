//////////////////////This is import for API Call/////////////
import productSliderService from "../services/productSliderService";

export const GET_PRODUCT_SLIDER = "GET_PRODUCT_SLIDER";
export const GET_PRODUCT_SLIDER_SUCCESS = "GET_PRODUCT_SLIDER_SUCCESS";
export const GET_PRODUCT_SLIDER_ERROR = "GET_PRODUCT_SLIDER_ERROR";

export const GET_PRODUCT_SLIDER_BY_ID = "GET_PRODUCT_SLIDER_BY_ID";
export const GET_PRODUCT_SLIDER_BY_ID_SUCCESS =
  "GET_PRODUCT_SLIDER_BY_ID_SUCCESS";
export const GET_PRODUCT_SLIDER_BY_ID_ERROR = "GET_PRODUCT_SLIDER_BY_ID_ERROR";

export const CREATE_PRODUCT_SLIDER = "CREATE_PRODUCT_SLIDER";
export const CREATE_PRODUCT_SLIDER_SUCCESS = "CREATE_PRODUCT_SLIDER_SUCCESS";
export const CREATE_PRODUCT_SLIDER_ERROR = "CREATE_PRODUCT_SLIDER_ERROR";

export const UPDATE_PRODUCT_SLIDER = "UPDATE_PRODUCT_SLIDER";
export const UPDATE_PRODUCT_SLIDER_SUCCESS = "UPDATE_PRODUCT_SLIDER_SUCCESS";
export const UPDATE_PRODUCT_SLIDER_ERROR = "UPDATE_PRODUCT_SLIDER_ERROR";

export const DELETE_PRODUCT_SLIDER = "DELETE_PRODUCT_SLIDER";
export const DELETE_PRODUCT_SLIDER_SUCCESS = "DELETE_PRODUCT_SLIDER_SUCCESS";
export const DELETE_PRODUCT_SLIDER_ERROR = "DELETE_PRODUCT_SLIDER_ERROR";

//////////////////End of Attribute Action Types/////////////////////////

export function getProductSliderRecord() {
  return async (dispatch) => {
    dispatch(getProductSlider());
    return await productSliderService
      .getProductSlider()

      .then((response) => dispatch(getProductSliderSuccess(response.data)))
      .catch((error) => dispatch(getProductSliderError(error)));
  };
}

export function getProductSlider() {
  return {
    type: GET_PRODUCT_SLIDER,
  };
}

export function getProductSliderSuccess(success) {
  return {
    type: GET_PRODUCT_SLIDER_SUCCESS,
    payload: { success },
  };
}

export function getProductSliderError(error) {
  return {
    type: GET_PRODUCT_SLIDER_ERROR,
    payload: { error },
  };
}

export function getProductSliderByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getProductSliderById());
    return await productSliderService
      .getProductSliderById(id)

      .then((response) => dispatch(getProductSliderByIdSuccess(response.data)))
      .catch((error) => dispatch(getProductSliderByIdError(error)));
  };
}

export function getProductSliderById() {
  return {
    type: GET_PRODUCT_SLIDER_BY_ID,
  };
}

export function getProductSliderByIdSuccess(success) {
  return {
    type: GET_PRODUCT_SLIDER_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getProductSliderByIdError(error) {
  return {
    type: GET_PRODUCT_SLIDER_BY_ID_ERROR,
    payload: { error },
  };
}

export function createProductSliderRecord(slider) {
  return async (dispatch) => {
    dispatch(createProductSlider());
    return await productSliderService
      .createProductSlider(slider)

      .then((response) => dispatch(createProductSliderSuccess(response)))
      .catch((error) => dispatch(createProductSliderError(error)));
  };
}

export function createProductSlider() {
  return {
    type: CREATE_PRODUCT_SLIDER,
  };
}

export function createProductSliderSuccess(success) {
  return {
    type: CREATE_PRODUCT_SLIDER_SUCCESS,
    payload: { success },
  };
}

export function createProductSliderError(error) {
  return {
    type: CREATE_PRODUCT_SLIDER_ERROR,
    payload: { error },
  };
}

export function updateProductSliderRecord(slider) {
  return async (dispatch) => {
    dispatch(updateProductSlider());
    return await productSliderService
      .createProductSlider(slider)
      
      .then((response) => dispatch(updateProductSliderSuccess(response)))
      .catch((error) => dispatch(updateProductSliderError(error)));
  };
}

export function updateProductSlider() {
  return {
    type: UPDATE_PRODUCT_SLIDER,
  };
}

export function updateProductSliderSuccess(success) {
  return {
    type: UPDATE_PRODUCT_SLIDER_SUCCESS,
    payload: { success },
  };
}

export function updateProductSliderError(error) {
  return {
    type: UPDATE_PRODUCT_SLIDER_ERROR,
    payload: { error },
  };
}

export function deleteProductSliderRecord(id, imageName) {
  return async (dispatch) => {
    dispatch(deleteProductSlider());
    return await productSliderService
      .deleteProductSlider(id, imageName)

      .then((response) => dispatch(deleteProductSliderSuccess(response)))
      .catch((error) => dispatch(deleteProductSliderError(error)));
  };
}

export function deleteProductSlider() {
  return {
    type: DELETE_PRODUCT_SLIDER,
  };
}

export function deleteProductSliderSuccess(success) {
  return {
    type: DELETE_PRODUCT_SLIDER_SUCCESS,
    payload: { success },
  };
}

export function deleteProductSliderError(error) {
  return {
    type: DELETE_PRODUCT_SLIDER_ERROR,
    payload: { error },
  };
}
