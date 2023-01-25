//////////////////////This is import for API Call/////////////
import productVariantOptionValueService from "../services/productVariantOptionValueService";

export const GET_PRODUCT_VARIANT_OPTION_VALUE = "GET_PRODUCT_VARIANT_OPTION_VALUE";
export const GET_PRODUCT_VARIANT_OPTION_VALUE_SUCCESS = "GET_PRODUCT_VARIANT_OPTION_VALUE_SUCCESS";
export const GET_PRODUCT_VARIANT_OPTION_VALUE_ERROR = "GET_PRODUCT_VARIANT_OPTION_VALUE_ERROR";

export const CREATE_PRODUCT_VARIANT_OPTION_VALUE = "CREATE_PRODUCT_VARIANT_OPTION_VALUE";
export const CREATE_PRODUCT_VARIANT_OPTION_VALUE_SUCCESS = "CREATE_PRODUCT_VARIANT_OPTION_VALUE_SUCCESS";
export const CREATE_PRODUCT_VARIANT_OPTION_VALUE_ERROR = "CREATE_PRODUCT_VARIANT_OPTION_VALUE_ERROR";

export const DELETE_PRODUCT_VARIANT_OPTION_VALUE = "DELETE_PRODUCT_VARIANT_OPTION_VALUE";
export const DELETE_PRODUCT_VARIANT_OPTION_VALUE_SUCCESS = "DELETE_PRODUCT_VARIANT_OPTION_VALUE_SUCCESS";
export const DELETE_PRODUCT_VARIANT_OPTION_VALUE_ERROR = "DELETE_PRODUCT_VARIANT_OPTION_VALUE_ERROR";

export function getProductVariantOptionValueRecord() {
  return async (dispatch) => {
    dispatch(getProductVariantOptionValue());
    return await productVariantOptionValueService
      .getProductVariantOptionValue()

      .then((response) => dispatch(getProductVariantOptionValueSuccess(response.data)))
      .catch((error) => dispatch(getProductVariantOptionValueError(error)));
  };
}

export function getProductVariantOptionValue() {
  return {
    type: GET_PRODUCT_VARIANT_OPTION_VALUE,
  };
}

export function getProductVariantOptionValueSuccess(success) {
  return {
    type: GET_PRODUCT_VARIANT_OPTION_VALUE_SUCCESS,
    payload: { success },
  };
}

export function getProductVariantOptionValueError(error) {
  return {
    type: GET_PRODUCT_VARIANT_OPTION_VALUE_ERROR,
    payload: { error },
  };
}

export function createProductVariantOptionValueRecord(productVariantOptionValue) {
  return async (dispatch) => {
    dispatch(createProductVariantOptionValue());
    return await productVariantOptionValueService
      .createProductVariantOptionValue(productVariantOptionValue)
      
      .then((response) => dispatch(createProductVariantOptionValueSuccess(response.data)))
      .catch((error) => dispatch(createProductVariantOptionValueError(error)));
  };
}

export function createProductVariantOptionValue() {
  return {
    type: CREATE_PRODUCT_VARIANT_OPTION_VALUE,
  };
}

export function createProductVariantOptionValueSuccess(success) {
  return {
    type: CREATE_PRODUCT_VARIANT_OPTION_VALUE_SUCCESS,
    payload: { success },
  };
}

export function createProductVariantOptionValueError(error) {
  return {
    type: CREATE_PRODUCT_VARIANT_OPTION_VALUE_ERROR,
    payload: { error },
  };
}

export function deleteProductVariantOptionValueRecord(id) {
  return async (dispatch) => {
    dispatch(deleteProductVariantOptionValue());
    return await productVariantOptionValueService
      .deletProductVariantOptionValue(id)

      .then((response) => dispatch(deleteProductVariantOptionValueSuccess(response)))
      .catch((error) => dispatch(deleteProductVariantOptionValueError(error)));
  };
}

export function deleteProductVariantOptionValue() {
  return {
    type: DELETE_PRODUCT_VARIANT_OPTION_VALUE,
  };
}

export function deleteProductVariantOptionValueSuccess(success) {
  return {
    type: DELETE_PRODUCT_VARIANT_OPTION_VALUE_SUCCESS,
    payload: { success },
  };
}

export function deleteProductVariantOptionValueError(error) {
  return {
    type: DELETE_PRODUCT_VARIANT_OPTION_VALUE_ERROR,
    payload: { error },
  };
}
