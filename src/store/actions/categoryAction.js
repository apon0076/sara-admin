//////////////////////This is import for API Call/////////////
import categoryService from "../services/categoryService";

export const GET_CATEGORY = "GET_CATEGORY";
export const GET_CATEGORY_SUCCESS = "GET_CATEGORY_SUCCESS";
export const GET_CATEGORY_ERROR = "GET_CATEGORY_ERROR";

export const GET_CATEGORY_BY_ID = "GET_CATEGORY_BY_ID";
export const GET_CATEGORY_BY_ID_SUCCESS = "GET_CATEGORY_BY_ID_SUCCESS";
export const GET_CATEGORY_BY_ID_ERROR = "GET_CATEGORY_BY_ID_ERROR";

export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const CREATE_CATEGORY_SUCCESS = "CREATE_CATEGORY_SUCCESS";
export const CREATE_CATEGORY_ERROR = "CREATE_CATEGORY_ERROR";

export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const UPDATE_CATEGORY_SUCCESS = "UPDATE_CATEGORY_SUCCESS";
export const UPDATE_CATEGORY_ERROR = "UPDATE_CATEGORY_ERROR";

export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS";
export const DELETE_CATEGORY_ERROR = "DELETE_CATEGORY_ERROR";

//////////////////End of Category Action Types/////////////////////////

export function getCategoryRecord() {
  return async (dispatch) => {
    dispatch(getCategory());
    return await categoryService
      .getCategory()

      .then((response) => dispatch(getCategorySuccess(response.data)))
      .catch((error) => dispatch(getCategoryError(error)));
  };
}

export function getCategory() {
  return {
    type: GET_CATEGORY,
  };
}

export function getCategorySuccess(success) {
  return {
    type: GET_CATEGORY_SUCCESS,
    payload: { success },
  };
}

export function getCategoryError(error) {
  return {
    type: GET_CATEGORY_ERROR,
    payload: { error },
  };
}

export function getCategoryByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getCategoryById());
    return await categoryService
      .getCategory(id)

      .then((response) => dispatch(getCategoryByIdSuccess(response.data)))
      .catch((error) => dispatch(getCategoryByIdError(error)));
  };
}

export function getCategoryById() {
  return {
    type: GET_CATEGORY_BY_ID,
  };
}

export function getCategoryByIdSuccess(success) {
  return {
    type: GET_CATEGORY_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getCategoryByIdError(error) {
  return {
    type: GET_CATEGORY_BY_ID_ERROR,
    payload: { error },
  };
}

export function createCategoryRecord(category) {
  return async (dispatch) => {
    dispatch(createCategory());
    return await categoryService
      .createCategory(category)
      
      .then((response) => dispatch(createCategorySuccess(response.data)))
      .catch((error) => dispatch(createCategoryError(error)));
  };
}

export function createCategory() {
  return {
    type: CREATE_CATEGORY,
  };
}

export function createCategorySuccess(success) {
  return {
    type: CREATE_CATEGORY_SUCCESS,
    payload: { success },
  };
}

export function createCategoryError(error) {
  return {
    type: CREATE_CATEGORY_ERROR,
    payload: { error },
  };
}

export function updateCategoryRecord(category) {
  return async (dispatch) => {
    dispatch(updateCategory());
    return await categoryService
      .createCategory(category)

      .then((response) => dispatch(updateCategorySuccess(response)))
      .catch((error) => dispatch(updateCategoryError(error)));
  };
}

export function updateCategory() {
  return {
    type: UPDATE_CATEGORY,
  };
}

export function updateCategorySuccess(success) {
  return {
    type: UPDATE_CATEGORY_SUCCESS,
    payload: { success },
  };
}

export function updateCategoryError(error) {
  return {
    type: UPDATE_CATEGORY_ERROR,
    payload: { error },
  };
}

export function deleteCategoryRecord(data) {
  return async (dispatch) => {
    dispatch(deleteCategory());
    return await categoryService
      .deleteCategory(data)

      .then((response) => dispatch(deleteCategorySuccess(response.data)))
      .catch((error) => dispatch(deleteCategoryError(error)));
  };
}

export function deleteCategory() {
  return {
    type: DELETE_CATEGORY,
  };
}

export function deleteCategorySuccess(success) {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    payload: { success },
  };
}

export function deleteCategoryError(error) {
  return {
    type: DELETE_CATEGORY_ERROR,
    payload: { error },
  };
}