//////////////////////This is import for API Call/////////////
import productImageByColorService from "../services/productImageByColorService";

export const GET_PRODUCT_IMAGE_BY_COLOR = "GET_PRODUCT_IMAGE_BY_COLOR";
export const GET_PRODUCT_IMAGE_BY_COLOR_SUCCESS =
  "GET_PRODUCT_IMAGE_BY_COLOR_SUCCESS";
export const GET_PRODUCT_IMAGE_BY_COLOR_ERROR =
  "GET_PRODUCT_IMAGE_BY_COLOR_ERROR";

export const GET_PRODUCT_IMAGE_BY_COLOR_BY_ID =
  "GET_PRODUCT_IMAGE_BY_COLOR_BY_ID";
export const GET_PRODUCT_IMAGE_BY_COLOR_BY_ID_SUCCESS =
  "GET_PRODUCT_IMAGE_BY_COLOR_BY_ID_SUCCESS";
export const GET_PRODUCT_IMAGE_BY_COLOR_BY_ID_ERROR =
  "GET_PRODUCT_IMAGE_BY_COLOR_BY_ID_ERROR";

export const GET_PRODUCT_IMAGE_BY_COLOR_ID = "GET_PRODUCT_IMAGE_BY_COLOR_ID";
export const GET_PRODUCT_IMAGE_BY_COLOR_ID_SUCCESS =
  "GET_PRODUCT_IMAGE_BY_COLOR_ID_SUCCESS";
export const GET_PRODUCT_IMAGE_BY_COLOR_ID_ERROR =
  "GET_PRODUCT_IMAGE_BY_COLOR_ID_ERROR";

export const GET_COLOR_BY_PRODUCT_ID = "GET_COLOR_BY_PRODUCT_ID";
export const GET_COLOR_BY_PRODUCT_ID_SUCCESS =
  "GET_COLOR_BY_PRODUCT_ID_SUCCESS";
export const GET_COLOR_BY_PRODUCT_ID_ERROR = "GET_COLOR_BY_PRODUCT_ID_ERROR";

export const CREATE_PRODUCT_IMAGE_BY_COLOR = "CREATE_PRODUCT_IMAGE_BY_COLOR";
export const CREATE_PRODUCT_IMAGE_BY_COLOR_SUCCESS =
  "CREATE_PRODUCT_IMAGE_BY_COLOR_SUCCESS";
export const CREATE_PRODUCT_IMAGE_BY_COLOR_ERROR =
  "CREATE_PRODUCT_IMAGE_BY_COLOR_ERROR";

export const UPDATE_PRODUCT_IMAGE_BY_COLOR = "UPDATE_PRODUCT_IMAGE_BY_COLOR";
export const UPDATE_PRODUCT_IMAGE_BY_COLOR_SUCCESS =
  "UPDATE_PRODUCT_IMAGE_BY_COLOR_SUCCESS";
export const UPDATE_PRODUCT_IMAGE_BY_COLOR_ERROR =
  "UPDATE_PRODUCT_IMAGE_BY_COLOR_ERROR";

export const DELETE_PRODUCT_IMAGE_BY_COLOR = "DELETE_PRODUCT_IMAGE_BY_COLOR";
export const DELETE_PRODUCT_IMAGE_BY_COLOR_SUCCESS =
  "DELETE_PRODUCT_IMAGE_BY_COLOR_SUCCESS";
export const DELETE_PRODUCT_IMAGE_BY_COLOR_ERROR =
  "DELETE_PRODUCT_IMAGE_BY_COLOR_ERROR";

//////////////////End of Attribute Action Types/////////////////////////

export function getProductImageByColorRecord() {
  return async (dispatch) => {
    dispatch(getProductImageByColor());
    return await productImageByColorService
      .getProductImageByColor()

      .then((response) =>
        dispatch(getProductImageByColorSuccess(response.data))
      )
      .catch((error) => dispatch(getProductImageByColorError(error)));
  };
}

export function getProductImageByColor() {
  return {
    type: GET_PRODUCT_IMAGE_BY_COLOR,
  };
}

export function getProductImageByColorSuccess(success) {
  return {
    type: GET_PRODUCT_IMAGE_BY_COLOR_SUCCESS,
    payload: { success },
  };
}

export function getProductImageByColorError(error) {
  return {
    type: GET_PRODUCT_IMAGE_BY_COLOR_ERROR,
    payload: { error },
  };
}

export function getProductImageByColorByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getProductImageByColorById());
    return await productImageByColorService
      .getProductImageByColorById(id)

      .then((response) =>
        dispatch(getProductImageByColorByIdSuccess(response.data))
      )
      .catch((error) => dispatch(getProductImageByColorByIdError(error)));
  };
}

export function getProductImageByColorById() {
  return {
    type: GET_PRODUCT_IMAGE_BY_COLOR_BY_ID,
  };
}

export function getProductImageByColorByIdSuccess(success) {
  return {
    type: GET_PRODUCT_IMAGE_BY_COLOR_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getProductImageByColorByIdError(error) {
  return {
    type: GET_PRODUCT_IMAGE_BY_COLOR_BY_ID_ERROR,
    payload: { error },
  };
}

export function getColorByProductIdRecord(id) {
  return async (dispatch) => {
    dispatch(getColorByProductId());
    return await productImageByColorService
      .getColorByProductId(id)

      .then((response) =>
        dispatch(getProductImageByColorByIdSuccess(response.data))
      )
      .catch((error) => dispatch(getProductImageByColorByIdError(error)));
  };
}

export function getColorByProductId() {
  return {
    type: GET_COLOR_BY_PRODUCT_ID,
  };
}

export function getColorByProductIdSuccess(success) {
  return {
    type: GET_COLOR_BY_PRODUCT_ID_SUCCESS,
    payload: { success },
  };
}

export function getColorByProductIdError(error) {
  return {
    type: GET_COLOR_BY_PRODUCT_ID_ERROR,
    payload: { error },
  };
}

export function createProductImageByColorRecord(products) {
  return async (dispatch) => {
    dispatch(createProductImageByColor());
    return await productImageByColorService
      .createProductImageByColor(products)

      .then((response) => dispatch(createProductImageByColorSuccess(response)))
      .catch((error) => dispatch(createProductImageByColorError(error)));
  };
}

export function createProductImageByColor() {
  return {
    type: CREATE_PRODUCT_IMAGE_BY_COLOR,
  };
}

export function createProductImageByColorSuccess(success) {
  return {
    type: CREATE_PRODUCT_IMAGE_BY_COLOR_SUCCESS,
    payload: { success },
  };
}

export function createProductImageByColorError(error) {
  return {
    type: CREATE_PRODUCT_IMAGE_BY_COLOR_ERROR,
    payload: { error },
  };
}

export function updateProductImageByColorRecord(products) {
  return async (dispatch) => {
    dispatch(updateProductImageByColor());
    return await productImageByColorService
      .createProductImageByColor(products)
      
      .then((response) => dispatch(updateProductImageByColorSuccess(response)))
      .catch((error) => dispatch(updateProductImageByColorError(error)));
  };
}

export function updateProductImageByColor() {
  return {
    type: UPDATE_PRODUCT_IMAGE_BY_COLOR,
  };
}

export function updateProductImageByColorSuccess(success) {
  return {
    type: UPDATE_PRODUCT_IMAGE_BY_COLOR_SUCCESS,
    payload: { success },
  };
}

export function updateProductImageByColorError(error) {
  return {
    type: UPDATE_PRODUCT_IMAGE_BY_COLOR_ERROR,
    payload: { error },
  };
}

export function deleteProductImageByColorRecord(id) {
  return async (dispatch) => {
    dispatch(deleteProductImageByColor());
    return await productImageByColorService
      .deleteProductImageByColor(id)

      .then((response) => dispatch(deleteProductImageByColorSuccess(response)))
      .catch((error) => dispatch(deleteProductImageByColorError(error)));
  };
}

export function deleteProductImageByColor() {
  return {
    type: DELETE_PRODUCT_IMAGE_BY_COLOR,
  };
}

export function deleteProductImageByColorSuccess(success) {
  return {
    type: DELETE_PRODUCT_IMAGE_BY_COLOR_SUCCESS,
    payload: { success },
  };
}

export function deleteProductImageByColorError(error) {
  return {
    type: DELETE_PRODUCT_IMAGE_BY_COLOR_ERROR,
    payload: { error },
  };
}
