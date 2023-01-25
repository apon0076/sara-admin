//////////////////////This is import for API Call/////////////
import productVariantOptionService from "../services/productVariantOptionService";
////////////////////End of API CALL/////////////////////////

//////////////////Variant Option Action Types/////////////////////////
export const GET_PRODUCT_VARIANT_OPTION = "GET_PRODUCT_VARIANT_OPTION";
export const GET_PRODUCT_VARIANT_OPTION_SUCCESS =
  "GET_PRODUCT_VARIANT_OPTION_SUCCESS";
export const GET_PRODUCT_VARIANT_OPTION_ERROR =
  "GET_PRODUCT_VARIANT_OPTION_ERROR";

export const GET_PRODUCT_VARIANT_OPTION_BY_ID =
  "GET_PRODUCT_VARIANT_OPTION_BY_ID";
export const GET_PRODUCT_VARIANT_OPTION_BY_ID_SUCCESS =
  "GET_PRODUCT_VARIANT_OPTION_BY_ID_SUCCESS";
export const GET_PRODUCT_VARIANT_OPTION_BY_ID_ERROR =
  "GET_PRODUCT_VARIANT_OPTION_BY_ID_ERROR";

export const CREATE_PRODUCT_VARIANT_OPTION = "CREATE_PRODUCT_VARIANT_OPTION";
export const CREATE_PRODUCT_VARIANT_OPTION_SUCCESS =
  "CREATE_PRODUCT_VARIANT_OPTION_SUCCESS";
export const CREATE_PRODUCT_VARIANT_OPTION_ERROR =
  "CREATE_PRODUCT_VARIANT_OPTION_ERROR";

export const UPDATE_PRODUCT_VARIANT_OPTION = "UPDATE_PRODUCT_VARIANT_OPTION";
export const UPDATE_PRODUCT_VARIANT_OPTION_SUCCESS =
  "UPDATE_PRODUCT_VARIANT_OPTION_SUCCESS";
export const UPDATE_PRODUCT_VARIANT_OPTION_ERROR =
  "UPDATE_PRODUCT_VARIANT_OPTION_ERROR";

export const DELETE_PRODUCT_VARIANT_OPTION = "DELETE_PRODUCT_VARIANT_OPTION";
export const DELETE_PRODUCT_VARIANT_OPTION_SUCCESS =
  "DELETE_PRODUCT_VARIANT_OPTION_SUCCESS";
export const DELETE_PRODUCT_VARIANT_OPTION_ERROR =
  "DELETE_PRODUCT_VARIANT_OPTION_ERROR";

//////////////////End of Variant Option Action Types/////////////////////////

export function getProductVariantOptionRecord() {
  return async (dispatch) => {
    dispatch(getProductVariantOption());
    return await productVariantOptionService
      .getProductVariantOption()

      .then((response) =>
        dispatch(getProductVariantOptionSuccess(response.data))
      )
      .catch((error) => dispatch(getProductVariantOptionError(error)));
  };
}

export function getProductVariantOption() {
  return {
    type: GET_PRODUCT_VARIANT_OPTION,
  };
}

export function getProductVariantOptionSuccess(success) {
  return {
    type: GET_PRODUCT_VARIANT_OPTION_SUCCESS,
    payload: { success },
  };
}

export function getProductVariantOptionError(error) {
  return {
    type: GET_PRODUCT_VARIANT_OPTION_ERROR,
    payload: { error },
  };
}

export function getProductVariantOptionByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getProductVariantOptionById());
    return await productVariantOptionService
      .getProductVariantOptionById(id)

      .then((response) =>
        dispatch(getProductVariantOptionByIdSuccess(response.data))
      )
      .catch((error) => dispatch(getProductVariantOptionByIdError(error)));
  };
}

export function getProductVariantOptionById() {
  return {
    type: GET_PRODUCT_VARIANT_OPTION_BY_ID,
  };
}

export function getProductVariantOptionByIdSuccess(success) {
  return {
    type: GET_PRODUCT_VARIANT_OPTION_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getProductVariantOptionByIdError(error) {
  return {
    type: GET_PRODUCT_VARIANT_OPTION_BY_ID_ERROR,
    payload: { error },
  };
}

export function createProductVariantOptionRecord(productVariantOption) {
  return async (dispatch) => {
    dispatch(createProductVariantOption());
    return await productVariantOptionService
      .createProductVariantOption(productVariantOption)

      .then((response) =>
        dispatch(createProductVariantOptionSuccess(response.data))
      )
      .catch((error) => dispatch(createProductVariantOptionError(error)));
  };
}

export function createProductVariantOption() {
  return {
    type: CREATE_PRODUCT_VARIANT_OPTION,
  };
}

export function createProductVariantOptionSuccess(success) {
  return {
    type: CREATE_PRODUCT_VARIANT_OPTION_SUCCESS,
    payload: { success },
  };
}

export function createProductVariantOptionError(error) {
  return {
    type: CREATE_PRODUCT_VARIANT_OPTION_ERROR,
    payload: { error },
  };
}

export function updateProductVariantOptionRecord(productVariantOption) {
  return async (dispatch) => {
    dispatch(updateProductVariantOption());
    return await productVariantOptionService
      .updateProductVariantOption(productVariantOption)
      
      .then((response) => dispatch(updateProductVariantOptionSuccess(response.data)))
      .catch((error) => dispatch(updateProductVariantOptionError(error)));
  };
}



export function updateProductVariantOption() {
  return {
    type: UPDATE_PRODUCT_VARIANT_OPTION,
  };
}

export function updateProductVariantOptionSuccess(success) {
  return {
    type: UPDATE_PRODUCT_VARIANT_OPTION_SUCCESS,
    payload: { success },
  };
}

export function updateProductVariantOptionError(error) {
  return {
    type: UPDATE_PRODUCT_VARIANT_OPTION_ERROR,
    payload: { error },
  };
}

export function deleteProductVariantOptionRecord(id) {
  return async (dispatch) => {
    dispatch(deleteProductVariantOption());
    return await productVariantOptionService
      .deleteProductVariantOption(id)

      .then((response) => dispatch(deleteProductVariantOptionSuccess(response)))
      .catch((error) => dispatch(deleteProductVariantOptionError(error)));
  };
}

export function deleteProductVariantOption() {
  return {
    type: DELETE_PRODUCT_VARIANT_OPTION,
  };
}

export function deleteProductVariantOptionSuccess(success) {
  return {
    type: DELETE_PRODUCT_VARIANT_OPTION_SUCCESS,
    payload: { success },
  };
}

export function deleteProductVariantOptionError(error) {
  return {
    type: DELETE_PRODUCT_VARIANT_OPTION_ERROR,
    payload: { error },
  };
}
