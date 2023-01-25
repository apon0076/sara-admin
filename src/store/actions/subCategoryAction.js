import subCategoryService from "../services/subCategoryService";

export const GET_SUBCATEGORY = "GET_SUBCATEGORY";
export const GET_SUBCATEGORY_SUCCESS = "GET_SUBCATEGORY_SUCCESS";
export const GET_SUBCATEGORY_ERROR = "GET_SUBCATEGORY_ERROR";

export const GET_SUBCATEGORY_BY_ID = "GET_SUBCATEGORY_BY_ID";
export const GET_SUBCATEGORY_BY_ID_SUCCESS = "GET_SUBCATEGORY_BY_ID_SUCCESS";
export const GET_SUBCATEGORY_BY_ID_ERROR = "GET_SUBCATEGORY_BY_ID_ERROR";

export const CREATE_SUBCATEGORY = "CREATE_SUBCATEGORY";
export const CREATE_SUBCATEGORY_SUCCESS = "CREATE_SUBCATEGORY_SUCCESS";
export const CREATE_SUBCATEGORY_ERROR = "CREATE_SUBCATEGORY_ERROR";

export const UPDATE_SUBCATEGORY = "UPDATE_SUBCATEGORY";
export const UPDATE_SUBCATEGORY_SUCCESS = "UPDATE_SUBCATEGORY_SUCCESS";
export const UPDATE_SUBCATEGORY_ERROR = "UPDATE_SUBCATEGORY_ERROR";

export const DELETE_SUBCATEGORY = "DELETE_SUBCATEGORY";
export const DELETE_SUBCATEGORY_SUCCESS = "DELETE_SUBCATEGORY_SUCCESS";
export const DELETE_SUBCATEGORY_ERROR = "DELETE_SUBCATEGORY_ERROR";

//////////////////SUB CATEGORY ACTION TYPES/////////////////////////

export function getSubCategoryRecord() {
  return async (dispatch) => {
    dispatch(getSubCategory());
    return await subCategoryService
      .getSubCategory()

      .then((response) => dispatch(getSubCategorySuccess(response.data)))
      .catch((error) => dispatch(getSubCategoryError(error)));
  };
}

export function getSubCategory() {
  return {
    type: GET_SUBCATEGORY,
  };
}

export function getSubCategorySuccess(success) {
  return {
    type: GET_SUBCATEGORY_SUCCESS,
    payload: { success },
  };
}

export function getSubCategoryError(error) {
  return {
    type: GET_SUBCATEGORY_ERROR,
    payload: { error },
  };
}

export function getSubCategoryByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getSubCategoryById());
    return await subCategoryService
      .getSubCategoryById(id)

      .then((response) => dispatch(getSubCategoryByIdSuccess(response.data)))
      .catch((error) => dispatch(getSubCategoryByIdError(error)));
  };
}

export function getSubCategoryById() {
  return {
    type: GET_SUBCATEGORY_BY_ID,
  };
}

export function getSubCategoryByIdSuccess(success) {
  return {
    type: GET_SUBCATEGORY_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getSubCategoryByIdError(error) {
  return {
    type: GET_SUBCATEGORY_ERROR,
    payload: { error },
  };
}

export function createSubCategoryRecord(subCategories) {
  return async (dispatch) => {
    dispatch(createSubCategory());
    return await subCategoryService
      .createSubCategory(subCategories)

      .then((response) => dispatch(createSubCategorySuccess(response)))
      .catch((error) => dispatch(createSubCategoryError(error)));
  };
}

export function createSubCategory() {
  return {
    type: CREATE_SUBCATEGORY,
  };
}

export function createSubCategorySuccess(success) {
  return {
    type: CREATE_SUBCATEGORY_SUCCESS,
    payload: { success },
  };
}

export function createSubCategoryError(error) {
  return {
    type: CREATE_SUBCATEGORY_ERROR,
    payload: { error },
  };
}

export function updateSubCategoryRecord(subCategories) {
  return async (dispatch) => {
    dispatch(updateSubCategory());
    return await subCategoryService
      .createSubCategory(subCategories)
      
      .then((response) => dispatch(updateSubCategorySuccess(response)))
      .catch((error) => dispatch(updateSubCategoryError(error)));
  };
}

export function updateSubCategory() {
  return {
    type: UPDATE_SUBCATEGORY,
  };
}

export function updateSubCategorySuccess(success) {
  return {
    type: UPDATE_SUBCATEGORY_SUCCESS,
    payload: { success },
  };
}

export function updateSubCategoryError(error) {
  return {
    type: UPDATE_SUBCATEGORY_ERROR,
    payload: { error },
  };
}

export function deleteSubCategoryRecord(id) {
  return async (dispatch) => {
    dispatch(deleteSubCatory());
    return await subCategoryService
      .deleteSubCategory(id)

      .then((response) => dispatch(deleteSubCategorySuccess(response)))
      .catch((error) => dispatch(deleteSubCategoryError(error)));
  };
}

export function deleteSubCatory() {
  return {
    type: DELETE_SUBCATEGORY,
  };
}

export function deleteSubCategorySuccess(success) {
  return {
    type: DELETE_SUBCATEGORY_SUCCESS,
    payload: { success },
  };
}

export function deleteSubCategoryError(error) {
  return {
    type: DELETE_SUBCATEGORY_ERROR,
    payload: { error },
  };
}
