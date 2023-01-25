//////////////////////This is import for API Call/////////////
import brandService from "../services/brandService"

export const GET_BRAND = "GET_BRAND"
export const GET_BRAND_SUCCESS = "GET_BRAND_SUCCESS"
export const GET_BRAND_ERROR = "GET_BRAND_ERROR"

export const GET_BRAND_BY_ID = "GET_BRAND_BY_ID"
export const GET_BRAND_BY_ID_SUCCESS = "GET_BRAND_BY_ID_SUCCESS"
export const GET_BRAND_BY_ID_ERROR = "GET_BRAND_BY_ID_ERROR"

export const CREATE_BRAND = "CREATE_BRAND"
export const CREATE_BRAND_SUCCESS = "CREATE_BRAND_SUCCESS"
export const CREATE_BRAND_ERROR = "CREATE_BRAND_ERROR"

export const UPDATE_BRAND = "UPDATE_BRAND"
export const UPDATE_BRAND_SUCCESS = "UPDATE_BRAND_SUCCESS"
export const UPDATE_BRAND_ERROR = "UPDATE_BRAND_ERROR"

export const DELETE_BRAND = "DELETE_BRAND"
export const DELETE_BRAND_SUCCESS = "DELETE_BRAND_SUCCESS"
export const DELETE_BRAND_ERROR = "DELETE_BRAND_ERROR"

//////////////////End of Brand Action Types/////////////////////////

export function getBrandRecord() {
  return async (dispatch) => {
    dispatch(getBrand())
    return await brandService
      .getBrand()
      .then((response) => dispatch(getBrandSuccess(response.data)))
      .catch((error) => dispatch(getBrandError(error)))
  }
}

export function getBrand() {
  return {
    type: GET_BRAND,
  }
}

export function getBrandSuccess(success) {
  return {
    type: GET_BRAND_SUCCESS,
    payload: { success },
  }
}

export function getBrandError(error) {
  return {
    type: GET_BRAND_ERROR,
    payload: { error },
  }
}

export function getBrandByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getBrandById())
    return await brandService
      .getBrandById(id)

      .then((response) => dispatch(getBrandByIdSuccess(response.data)))
      .catch((error) => dispatch(getBrandByIdError(error)))
  }
}

export function getBrandById() {
  return {
    type: GET_BRAND_BY_ID,
  }
}

export function getBrandByIdSuccess(success) {
  return {
    type: GET_BRAND_BY_ID_SUCCESS,
    payload: { success },
  }
}

export function getBrandByIdError(error) {
  return {
    type: GET_BRAND_BY_ID_ERROR,
    payload: { error },
  }
}

export function createBrandRecord(brand) {
  return async (dispatch) => {
    dispatch(createBrand())
    return await brandService
      .createBrand(brand)
      
      .then((response) => dispatch(createBrandSuccess(response)))
      .catch((error) => dispatch(createBrandError(error)))
  }
}

export function createBrand() {
  return {
    type: CREATE_BRAND,
  }
}

export function createBrandSuccess(success) {
  return {
    type: CREATE_BRAND_SUCCESS,
    payload: { success },
  }
}

export function createBrandError(error) {
  return {
    type: CREATE_BRAND_ERROR,
    payload: { error },
  }
}

export function updateBrandRecord(brand) {
  return async (dispatch) => {
    dispatch(updateBrand())
    return await brandService
      .createBrand(brand)

      .then((response) => dispatch(updateBrandSuccess(response)))
      .catch((error) => dispatch(updateBrandError(error)))
  }
}

export function updateBrand() {
  return {
    type: UPDATE_BRAND,
  }
}

export function updateBrandSuccess(success) {
  return {
    type: UPDATE_BRAND_SUCCESS,
    payload: { success },
  }
}

export function updateBrandError(error) {
  return {
    type: UPDATE_BRAND_ERROR,
    payload: { error },
  }
}

export function deleteBrandRecord(id) {
  return async (dispatch) => {
    dispatch(deleteBrand())
    return await brandService
      .deleteBrand(id)

      .then((response) => dispatch(deleteBrandSuccess(response)))
      .catch((error) => dispatch(deleteBrandError(error)))
  }
}

export function deleteBrand() {
  return {
    type: DELETE_BRAND,
  }
}

export function deleteBrandSuccess(success) {
  return {
    type: DELETE_BRAND_SUCCESS,
    payload: { success },
  }
}

export function deleteBrandError(error) {
  return {
    type: DELETE_BRAND_ERROR,
    payload: { error },
  }
}
