//////////////////////This is import for API Call/////////////
import breadcrumbsCategoryService from "../services/breadcrumbsCategoryService";

export const GET_BREADCRUMBS_CATEGORY = "GET_BREADCRUMBS_CATEGORY";
export const GET_BREADCRUMBS_CATEGORY_SUCCESS =
  "GET_BREADCRUMBS_CATEGORY_SUCCESS";
export const GET_BREADCRUMBS_CATEGORY_ERROR = "GET_BREADCRUMBS_CATEGORY_ERROR";

export const GET_BREADCRUMBS_CATEGORY_BY_ID = "GET_BREADCRUMBS_CATEGORY_BY_ID";
export const GET_BREADCRUMBS_CATEGORY_BY_ID_SUCCESS =
  "GET_BREADCRUMBS_CATEGORY_BY_ID_SUCCESS";
export const GET_BREADCRUMBS_CATEGORY_BY_ID_ERROR =
  "GET_BREADCRUMBS_CATEGORY_BY_ID_ERROR";

export const CREATE_BREADCRUMBS_CATEGORY = "CREATE_BREADCRUMBS_CATEGORY";
export const CREATE_BREADCRUMBS_CATEGORY_SUCCESS =
  "CREATE_BREADCRUMBS_CATEGORY_SUCCESS";
export const CREATE_BREADCRUMBS_CATEGORY_ERROR =
  "CREATE_BREADCRUMBS_CATEGORY_ERROR";

export const UPDATE_BREADCRUMBS_CATEGORY = "UPDATE_BREADCRUMBS_CATEGORY";
export const UPDATE_BREADCRUMBS_CATEGORY_SUCCESS =
  "UPDATE_BREADCRUMBS_CATEGORY_SUCCESS";
export const UPDATE_BREADCRUMBS_CATEGORY_ERROR =
  "UPDATE_BREADCRUMBS_CATEGORY_ERROR";

export const DELETE_BREADCRUMBS_CATEGORY = "DELETE_BREADCRUMBS_CATEGORY";
export const DELETE_BREADCRUMBS_CATEGORY_SUCCESS =
  "DELETE_BREADCRUMBS_CATEGORY_SUCCESS";
export const DELETE_BREADCRUMBS_CATEGORY_ERROR =
  "DELETE_BREADCRUMBS_CATEGORY_ERROR";

//////////////////END OF COLOR ACTION TYPES/////////////////////////

export function getBreadcrumbsCategoryRecord() {
  //////debugger;
  return async (dispatch) => {
    dispatch(getBreadcrumbsCategory());
    return await breadcrumbsCategoryService
      .getBreadcrumbsCategory()

      .then((response) =>
        dispatch(getBreadcrumbsCategorySuccess(response.data))
      )
      .catch((error) => dispatch(getBreadcrumbsCategoryError(error)));
  };
}

export function getBreadcrumbsCategory() {
  return {
    type: GET_BREADCRUMBS_CATEGORY,
  };
}

export function getBreadcrumbsCategorySuccess(success) {
  return {
    type: GET_BREADCRUMBS_CATEGORY_SUCCESS,
    payload: { success },
  };
}

export function getBreadcrumbsCategoryError(error) {
  return {
    type: GET_BREADCRUMBS_CATEGORY_ERROR,
    payload: { error },
  };
}

export function getBreadcrumbsCategoryByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getBreadcrumbsCategoryById());
    return await breadcrumbsCategoryService
      .getBreadcrumbsCategoryById(id)

      .then((response) =>
        dispatch(getBreadcrumbsCategoryByIdSuccess(response.data))
      )
      .catch((error) => dispatch(getBreadcrumbsCategoryByIdError(error)));
  };
}

export function getBreadcrumbsCategoryById() {
  return {
    type: GET_BREADCRUMBS_CATEGORY_BY_ID,
  };
}

export function getBreadcrumbsCategoryByIdSuccess(success) {
  return {
    type: GET_BREADCRUMBS_CATEGORY_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getBreadcrumbsCategoryByIdError(error) {
  return {
    type: GET_BREADCRUMBS_CATEGORY_BY_ID_ERROR,
    payload: { error },
  };
}

export function createBreadcrumbsCategoryRecord(data) {
  //////debugger;
  return async (dispatch) => {
    dispatch(createBreadcrumbsCategory());
    return await breadcrumbsCategoryService
      .createBreadcrumbsCategory(data)

      .then((response) =>
        dispatch(
          createBreadcrumbsCategorySuccess(response),
          alert(response.message)
        )
      )
      .catch((error) => dispatch(createBreadcrumbsCategoryError(error)));
  };
}

export function createBreadcrumbsCategory() {
  return {
    type: CREATE_BREADCRUMBS_CATEGORY,
  };
}

export function createBreadcrumbsCategorySuccess(success) {
  return {
    type: CREATE_BREADCRUMBS_CATEGORY_SUCCESS,
    payload: { success },
  };
}

export function createBreadcrumbsCategoryError(error) {
  return {
    type: CREATE_BREADCRUMBS_CATEGORY_ERROR,
    payload: { error },
  };
}

export function updateBreadcrumbsCategoryRecord(breadcrumbsCategories) {
  return async (dispatch) => {
    dispatch(updateBreadcrumbsCategory());
    return await breadcrumbsCategoryService
      .createBreadcrumbsCategory(breadcrumbsCategories)

      .then((response) => dispatch(updateBreadcrumbsCategorySuccess(response)))
      .catch((error) => dispatch(updateBreadcrumbsCategoryError(error)));
  };
}

export function updateBreadcrumbsCategory() {
  return {
    type: UPDATE_BREADCRUMBS_CATEGORY,
  };
}

export function updateBreadcrumbsCategorySuccess(success) {
  return {
    type: UPDATE_BREADCRUMBS_CATEGORY_SUCCESS,
    payload: { success },
  };
}

export function updateBreadcrumbsCategoryError(error) {
  return {
    type: UPDATE_BREADCRUMBS_CATEGORY_ERROR,
    payload: { error },
  };
}

export function deleteBreadcrumbsCategoryRecord(id) {
  return async (dispatch) => {
    dispatch(deleteBreadcrumbsCategory());
    return await breadcrumbsCategoryService
      .deleteBreadcrumbsCategory(id)

      .then((response) => dispatch(deleteBreadcrumbsCategorySuccess(response)))
      .catch((error) => dispatch(deleteBreadcrumbsCategoryError(error)));
  };
}

export function deleteBreadcrumbsCategory() {
  return {
    type: DELETE_BREADCRUMBS_CATEGORY,
  };
}

export function deleteBreadcrumbsCategorySuccess(success) {
  return {
    type: DELETE_BREADCRUMBS_CATEGORY_SUCCESS,
    payload: { success },
  };
}

export function deleteBreadcrumbsCategoryError(error) {
  return {
    type: DELETE_BREADCRUMBS_CATEGORY_ERROR,
    payload: { error },
  };
}
