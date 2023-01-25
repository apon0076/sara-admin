import subSubCategoryService from "../services/subSubCategoryService";

export const GET_SUBSUBCATEGORY = "GET_SUBSUBCATEGORY";
export const GET_SUBSUBCATEGORY_SUCCESS = "GET_SUBSUBCATEGORY_SUCCESS";
export const GET_SUBSUBCATEGORY_ERROR = "GET_SUBSUBCATEGORY_ERROR";

export const GET_SUBSUBCATEGORY_BY_ID = "GET_SUBSUBCATEGORY_BY_ID";
export const GET_SUBSUBCATEGORY_BY_ID_SUCCESS =
  "GET_SUBSUBCATEGORY_BY_ID_SUCCESS";
export const GET_SUBSUBCATEGORY_BY_ID_ERROR = "GET_SUBSUBCATEGORY_BY_ID_ERROR";

export const CREATE_SUBSUBCATEGORY = "CREATE_SUBSUBCATEGORY";
export const CREATE_SUBSUBCATEGORY_SUCCESS = "CREATE_SUBSUBCATEGORY_SUCCESS";
export const CREATE_SUBSUBCATEGORY_ERROR = "CREATE_SUBSUBCATEGORY_ERROR";

export const UPDATE_SUBSUBCATEGORY = "UPDATE_SUBSUBCATEGORY";
export const UPDATE_SUBSUBCATEGORY_SUCCESS = "UPDATE_SUBSUBCATEGORY_SUCCESS";
export const UPDATE_SUBSUBCATEGORY_ERROR = "UPDATE_SUBSUBCATEGORY_ERROR";

export const DELETE_SUBSUBCATEGORY = "DELETE_SUBSUBCATEGORY";
export const DELETE_SUBSUBCATEGORY_SUCCESS = "DELETE_SUBSUBCATEGORY_SUCCESS";
export const DELETE_SUBSUBCATEGORY_ERROR = "DELETE_SUBSUBCATEGORY_ERROR";

//////////////////SUB CATEGORY ACTION TYPES/////////////////////////

export function getSubSubCategoryRecord() {
  return async (dispatch) => {
    dispatch(getSubSubCategory());
    return await subSubCategoryService
      .getSubSubCategory()

      .then((response) => dispatch(getSubSubCategorySuccess(response.data)))
      .catch((error) => dispatch(getSubSubCategoryError(error)));
  };
}

export function getSubSubCategory() {
  return {
    type: GET_SUBSUBCATEGORY,
  };
}

export function getSubSubCategorySuccess(success) {
  return {
    type: GET_SUBSUBCATEGORY_SUCCESS,
    payload: { success },
  };
}

export function getSubSubCategoryError(error) {
  return {
    type: GET_SUBSUBCATEGORY_ERROR,
    payload: { error },
  };
}

export function getSubSubCategoryByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getSubSubCategoryById());
    return await subSubCategoryService
      .getSubSubCategoryById(id)

      .then((response) => dispatch(getSubSubCategoryByIdSuccess(response.data)))
      .catch((error) => dispatch(getSubSubCategoryByIdError(error)));
  };
}

export function getSubSubCategoryById() {
  return {
    type: GET_SUBSUBCATEGORY_BY_ID,
  };
}

export function getSubSubCategoryByIdSuccess(success) {
  return {
    type: GET_SUBSUBCATEGORY_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getSubSubCategoryByIdError(error) {
  return {
    type: GET_SUBSUBCATEGORY_ERROR,
    payload: { error },
  };
}

export function createSubSubCategoryRecord(subSubCategories) {
  return async (dispatch) => {
    dispatch(createSubSubCategory());
    return await subSubCategoryService
      .createSubSubCategory(subSubCategories)

      .then((response) => dispatch(createSubSubCategorySuccess(response)))
      .catch((error) => dispatch(createSubSubCategoryError(error)));
  };
}

export function createSubSubCategory() {
  return {
    type: CREATE_SUBSUBCATEGORY,
  };
}

export function createSubSubCategorySuccess(success) {
  return {
    type: CREATE_SUBSUBCATEGORY_SUCCESS,
    payload: { success },
  };
}

export function createSubSubCategoryError(error) {
  return {
    type: CREATE_SUBSUBCATEGORY_ERROR,
    payload: { error },
  };
}

export function updateSubSubCategoryRecord(subSubCategories) {
  return async (dispatch) => {
    dispatch(updateSubSubCategory());
    return await subSubCategoryService
      .createSubSubCategory(subSubCategories)
      
      .then((response) => dispatch(updateSubSubCategorySuccess(response)))
      .catch((error) => dispatch(updateSubSubCategoryError(error)));
  };
}

export function updateSubSubCategory() {
  return {
    type: UPDATE_SUBSUBCATEGORY,
  };
}

export function updateSubSubCategorySuccess(success) {
  return {
    type: UPDATE_SUBSUBCATEGORY_SUCCESS,
    payload: { success },
  };
}

export function updateSubSubCategoryError(error) {
  return {
    type: UPDATE_SUBSUBCATEGORY_ERROR,
    payload: { error },
  };
}

export function deleteSubSubCategoryRecord(id) {
  return async (dispatch) => {
    dispatch(deleteSubSubCategory());
    return await subSubCategoryService
      .deleteSubSubCategory(id)

      .then((response) => dispatch(deleteSubSubCategorySuccess(response)))
      .catch((error) => dispatch(deleteSubSubCategoryError(error)));
  };
}

export function deleteSubSubCategory() {
  return {
    type: DELETE_SUBSUBCATEGORY,
  };
}

export function deleteSubSubCategorySuccess(success) {
  return {
    type: DELETE_SUBSUBCATEGORY_SUCCESS,
    payload: { success },
  };
}

export function deleteSubSubCategoryError(error) {
  return {
    type: DELETE_SUBSUBCATEGORY_ERROR,
    payload: { error },
  };
}
