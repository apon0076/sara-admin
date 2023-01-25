//////////////////////This is import for API Call/////////////
import productImageService from "../services/productImageService";

export const GET_PRODUCTIMAGE = "GET_PRODUCTIMAGE";
export const GET_PRODUCTIMAGE_SUCCESS = "GET_PRODUCTIMAGE_SUCCESS";
export const GET_PRODUCTIMAGE_ERROR = "GET_PRODUCTIMAGE_ERROR";

export const GET_PRODUCTIMAGE_BY_ID = "GET_PRODUCTIMAGE_BY_ID";
export const GET_PRODUCTIMAGE_BY_ID_SUCCESS = "GET_PRODUCTIMAGE_BY_ID_SUCCESS";
export const GET_PRODUCTIMAGE_BY_ID_ERROR = "GET_PRODUCTIMAGE_BY_ID_ERROR";

export const CREATE_PRODUCTIMAGE = "CREATE_PRODUCTIMAGE";
export const CREATE_PRODUCTIMAGE_SUCCESS = "CREATE_PRODUCTIMAGE_SUCCESS";
export const CREATE_PRODUCTIMAGE_ERROR = "CREATE_PRODUCTIMAGE_ERROR";

export const UPDATE_PRODUCTIMAGE = "UPDATE_PRODUCTIMAGE";
export const UPDATE_PRODUCTIMAGE_SUCCESS = "UPDATE_PRODUCTIMAGE_SUCCESS";
export const UPDATE_PRODUCTIMAGE_ERROR = "UPDATE_PRODUCTIMAGE_ERROR";

export const DELETE_PRODUCTIMAGE = "DELETE_PRODUCTIMAGE";
export const DELETE_PRODUCTIMAGE_SUCCESS = "DELETE_PRODUCTIMAGE_SUCCESS";
export const DELETE_PRODUCTIMAGE_ERROR = "DELETE_PRODUCTIMAGE_ERROR";

//////////////////End of Attribute Action Types/////////////////////////

export function getProductImageRecord() {
  return async (dispatch) => {
    dispatch(getProductImage());
    return await productImageService
      .getProductImage()

      .then((response) => dispatch(getProductImageSuccess(response.data)))
      .catch((error) => dispatch(getProductImageError(error)));
  };
}

export function getProductImage() {
  return {
    type: GET_PRODUCTIMAGE,
  };
}

export function getProductImageSuccess(success) {
  return {
    type: GET_PRODUCTIMAGE_SUCCESS,
    payload: { success },
  };
}

export function getProductImageError(error) {
  return {
    type: GET_PRODUCTIMAGE_ERROR,
    payload: { error },
  };
}

export function getProductImageByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getProductImageById());
    return await productImageService
      .getProductImageById(id)

      .then((response) => dispatch(getProductImageByIdSuccess(response.data)))
      .catch((error) => dispatch(getProductImageByIdError(error)));
  };
}

export function getProductImageById() {
  return {
    type: GET_PRODUCTIMAGE_BY_ID,
  };
}

export function getProductImageByIdSuccess(success) {
  return {
    type: GET_PRODUCTIMAGE_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getProductImageByIdError(error) {
  return {
    type: GET_PRODUCTIMAGE_BY_ID_ERROR,
    payload: { error },
  };
}

export function createProductImageRecord(images) {
  return async (dispatch) => {
    dispatch(createProductImage());
    return await productImageService
      .createProductImage(images)

      .then((response) => dispatch(createProductImageSuccess(response.data)))
      .catch((error) => dispatch(createProductImageError(error)));
  };
}

export function createProductImage() {
  return {
    type: CREATE_PRODUCTIMAGE,
  };
}

export function createProductImageSuccess(success) {
  return {
    type: CREATE_PRODUCTIMAGE_SUCCESS,
    payload: { success },
  };
}

export function createProductImageError(error) {
  return {
    type: CREATE_PRODUCTIMAGE_ERROR,
    payload: { error },
  };
}

export function updateProductImageRecord(productImage) {
  return async (dispatch) => {
    dispatch(updateProductImage());
    return await productImageService
      .createProductImage(productImage)
      
      .then((response) => dispatch(updateProductImageSuccess(response.data)))
      .catch((error) => dispatch(updateProductImageError(error)));
  };
}

export function updateProductImage() {
  return {
    type: UPDATE_PRODUCTIMAGE,
  };
}

export function updateProductImageSuccess(success) {
  return {
    type: UPDATE_PRODUCTIMAGE_SUCCESS,
    payload: { success },
  };
}

export function updateProductImageError(error) {
  return {
    type: UPDATE_PRODUCTIMAGE_ERROR,
    payload: { error },
  };
}

export function deleteProductImageRecord(id, name) {
  return async (dispatch) => {
    dispatch(deleteProductImage());
    return await productImageService
      .deleteProductImage(id, name)

      .then((response) => dispatch(deleteProductImageSuccess(response)))
      .catch((error) => dispatch(deleteProductImageError(error)));
  };
}

export function deleteProductImage() {
  return {
    type: DELETE_PRODUCTIMAGE,
  };
}

export function deleteProductImageSuccess(success) {
  return {
    type: DELETE_PRODUCTIMAGE_SUCCESS,
    payload: { success },
  };
}

export function deleteProductImageError(error) {
  return {
    type: DELETE_PRODUCTIMAGE_ERROR,
    payload: { error },
  };
}
