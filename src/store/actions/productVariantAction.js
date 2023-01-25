//////////////////////This is import for API Call/////////////
import productVariantService from "../services/productVariantService";

export const GET_PRODUCT_VARIANT = "GET_PRODUCT_VARIANT";
export const GET_PRODUCT_VARIANT_SUCCESS = "GET_PRODUCT_VARIANT_SUCCESS";
export const GET_PRODUCT_VARIANT_ERROR = "GET_PRODUCT_VARIANT_ERROR";

export const GET_PRODUCT_VARIANT_BY_ID = "GET_PRODUCT_VARIANT_BY_ID";
export const GET_PRODUCT_VARIANT_BY_ID_SUCCESS =
  "GET_PRODUCT_VARIANT_BY_ID_SUCCESS";
export const GET_PRODUCT_VARIANT_BY_ID_ERROR =
  "GET_PRODUCT_VARIANT_BY_ID_ERROR";

export const CREATE_PRODUCT_VARIANT = "CREATE_PRODUCT_VARIANT";
export const CREATE_PRODUCT_VARIANT_SUCCESS = "CREATE_PRODUCT_VARIANT_SUCCESS";
export const CREATE_PRODUCT_VARIANT_ERROR = "CREATE_PRODUCT_VARIANT_ERROR";

export const UPDATE_PRODUCT_VARIANT = "UPDATE_PRODUCT_VARIANT";
export const UPDATE_PRODUCT_VARIANT_SUCCESS = "UPDATE_PRODUCT_VARIANT_SUCCESS";
export const UPDATE_PRODUCT_VARIANT_ERROR = "UPDATE_PRODUCT_VARIANT_ERROR";

export const DELETE_PRODUCT_VARIANT = "DELETE_PRODUCT_VARIANT";
export const DELETE_PRODUCT_VARIANT_SUCCESS = "DELETE_PRODUCT_VARIANT_SUCCESS";
export const DELETE_PRODUCT_VARIANT_ERROR = "DELETE_PRODUCT_VARIANT_ERROR";

export const GET_PRODUCT_VARIANT_BY_CATEGORY_ID =
  "GET_PRODUCT_VARIANT_BY_CATEGORY_ID";
export const GET_PRODUCT_VARIANT_BY_CATEGORY_ID_SUCCESS =
  "GET_PRODUCT_VARIANT_BY_CATEGORY_ID_SUCCESS";
export const GET_PRODUCT_VARIANT_BY_CATEGORY_ID_ERROR =
  "GET_PRODUCT_VARIANT_BY_CATEGORY_ID_ERROR";

//////////////////End of ProductVariant Action Types/////////////////////////

export function getProductVariantRecord() {
  return async (dispatch) => {
    dispatch(getProductVariant());
    return await productVariantService
      .getProductVariant()

      .then((response) => dispatch(getProductVariantSuccess(response.data)))
      .catch((error) => dispatch(getProductVariantError(error)));
  };
}

export function getProductVariant() {
  return {
    type: GET_PRODUCT_VARIANT,
  };
}

export function getProductVariantSuccess(success) {
  return {
    type: GET_PRODUCT_VARIANT_SUCCESS,
    payload: { success },
  };
}

export function getProductVariantError(error) {
  return {
    type: GET_PRODUCT_VARIANT_ERROR,
    payload: { error },
  };
}

export function getProductVariantByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getProductVariantById());
    return await productVariantService
      .getProductVariantById(id)

      .then((response) => dispatch(getProductVariantByIdSuccess(response.data)))
      .catch((error) => dispatch(getProductVariantByIdError(error)));
  };
}

export function getProductVariantById() {
  return {
    type: GET_PRODUCT_VARIANT_BY_ID,
  };
}

export function getProductVariantByIdSuccess(success) {
  return {
    type: GET_PRODUCT_VARIANT_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getProductVariantByIdError(error) {
  return {
    type: GET_PRODUCT_VARIANT_BY_ID_ERROR,
    payload: { error },
  };
}

export function createProductVariantRecord(productVariant) {
  return async (dispatch) => {
    dispatch(createProductVariant());
    return await productVariantService
      .createProductVariant(productVariant)

      .then((response) => dispatch(createProductVariantSuccess(response.data)))
      .catch((error) => dispatch(createProductVariantError(error)));
  };
}

export function createProductVariant() {
  return {
    type: CREATE_PRODUCT_VARIANT,
  };
}

export function createProductVariantSuccess(success) {
  return {
    type: CREATE_PRODUCT_VARIANT_SUCCESS,
    payload: { success },
  };
}

export function createProductVariantError(error) {
  return {
    type: CREATE_PRODUCT_VARIANT_ERROR,
    payload: { error },
  };
}

export function updateProductVariantRecord(productVariant) {
  return async (dispatch) => {
    dispatch(updateProductVariant());
    return await productVariantService
      .createProductVariant(productVariant)

      .then((response) => dispatch(updateProductVariantSuccess(response)))
      .catch((error) => dispatch(updateProductVariantError(error)));
  };
}

export function updateProductVariant() {
  return {
    type: UPDATE_PRODUCT_VARIANT,
  };
}

export function updateProductVariantSuccess(success) {
  return {
    type: UPDATE_PRODUCT_VARIANT_SUCCESS,
    payload: { success },
  };
}

export function updateProductVariantError(error) {
  return {
    type: UPDATE_PRODUCT_VARIANT_ERROR,
    payload: { error },
  };
}

export function deleteProductVariantRecord(id) {
  return async (dispatch) => {
    dispatch(deleteProductVariant());
    return await productVariantService
      .deletProductVariant(id)

      .then((response) => dispatch(deleteProductVariantSuccess(response)))
      .catch((error) => dispatch(deleteProductVariantError(error)));
  };
}

export function deleteProductVariant() {
  return {
    type: DELETE_PRODUCT_VARIANT,
  };
}

export function deleteProductVariantSuccess(success) {
  return {
    type: DELETE_PRODUCT_VARIANT_SUCCESS,
    payload: { success },
  };
}

export function deleteProductVariantError(error) {
  return {
    type: DELETE_PRODUCT_VARIANT_ERROR,
    payload: { error },
  };
}
////
export function getProductVariantByCategoryIdRecord(id) {
  return async (dispatch) => {
    dispatch(getProductVariantByCategoryId());
    return await productVariantService
      .getProductVariantByCategoryId(id)

      .then((response) =>
        dispatch(getProductVariantByCategoryIdSuccess(response.data))
      )
      .catch((error) => dispatch(getProductVariantByCategoryIdError(error)));
  };
}

export function getProductVariantByCategoryId() {
  return {
    type: GET_PRODUCT_VARIANT_BY_CATEGORY_ID,
  };
}

export function getProductVariantByCategoryIdSuccess(success) {
  return {
    type: GET_PRODUCT_VARIANT_BY_CATEGORY_ID_SUCCESS,
    payload: { success },
  };
}

export function getProductVariantByCategoryIdError(error) {
  return {
    type: GET_PRODUCT_VARIANT_BY_CATEGORY_ID_ERROR,
    payload: { error },
  };
}
