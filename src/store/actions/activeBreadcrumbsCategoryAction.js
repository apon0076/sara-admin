import activeBreadcrumbsCategoryService from "../services/activeBreadcrumbsCategoryService";
import activeBreadcrumbsProductCategoryService from "../services/activeBreadcrumbsProductCategoryService";

export const GET_ACTIVE_BREADCRUMBS_CATEGORY =
  "GET_ACTIVE_BREADCRUMBS_CATEGORY";
export const GET_ACTIVE_BREADCRUMBS_CATEGORY_SUCCESS =
  "GET_ACTIVE_BREADCRUMBS_CATEGORY_SUCCESS";
export const GET_ACTIVE_BREADCRUMBS_CATEGORY_ERROR =
  "GET_ACTIVE_BREADCRUMBS_CATEGORY_ERROR";

  export const GET_ACTIVE_BREADCRUMBS_PRODUCT_CATEGORY =
  "GET_ACTIVE_BREADCRUMBS_PRODUCT_CATEGORY";
export const GET_ACTIVE_BREADCRUMBS_PRODUCT_CATEGORY_SUCCESS =
  "GET_ACTIVE_BREADCRUMBS_PRODUCT_CATEGORY_SUCCESS";
export const GET_ACTIVE_BREADCRUMBS_PRODUCT_CATEGORY_ERROR =
  "GET_ACTIVE_BREADCRUMBS_PRODUCT_CATEGORY_ERROR";  

export const GET_ACTIVE_BREADCRUMBS_CATEGORY_BY_ID =
  "GET_ACTIVE_BREADCRUMBS_CATEGORY_BY_ID";
export const GET_ACTIVE_BREADCRUMBS_CATEGORY_BY_ID_SUCCESS =
  "GET_ACTIVE_BREADCRUMBS_CATEGORY_BY_ID_SUCCESS";
export const GET_ACTIVE_BREADCRUMBS_CATEGORY_BY_ID_ERROR =
  "GET_ACTIVE_BREADCRUMBS_CATEGORY_BY_ID_ERROR";

export const CREATE_ACTIVE_BREADCRUMBS_CATEGORY =
  "CREATE_ACTIVE_BREADCRUMBS_CATEGORY";
export const CREATE_ACTIVE_BREADCRUMBS_CATEGORY_SUCCESS =
  "CREATE_ACTIVE_BREADCRUMBS_CATEGORY_SUCCESS";
export const CREATE_ACTIVE_BREADCRUMBS_CATEGORY_ERROR =
  "CREATE_ACTIVE_BREADCRUMBS_CATEGORY_ERROR";

export const UPDATE_ACTIVE_BREADCRUMBS_CATEGORY =
  "UPDATE_ACTIVE_BREADCRUMBS_CATEGORY";
export const UPDATE_ACTIVE_BREADCRUMBS_CATEGORY_SUCCESS =
  "UPDATE_ACTIVE_BREADCRUMBS_CATEGORY_SUCCESS";
export const UPDATE_ACTIVE_BREADCRUMBS_CATEGORY_ERROR =
  "UPDATE_ACTIVE_BREADCRUMBS_CATEGORY_ERROR";

export const DELETE_ACTIVE_BREADCRUMBS_CATEGORY =
  "DELETE_ACTIVE_BREADCRUMBS_CATEGORY";
export const DELETE_ACTIVE_BREADCRUMBS_CATEGORY_SUCCESS =
  "DELETE_ACTIVE_BREADCRUMBS_CATEGORY_SUCCESS";
export const DELETE_ACTIVE_BREADCRUMBS_CATEGORY_ERROR =
  "DELETE_ACTIVE_BREADCRUMBS_CATEGORY_ERROR";

export function getActiveBreadcrumbsProductCategoryRecord() {
  return async (dispatch) => {
    dispatch(getActiveBreadcrumbsProductCategory());
    return await activeBreadcrumbsProductCategoryService
      .getActiveBreadcrumbsProductCategory()

      .then((response) =>
        dispatch(getActiveBreadcrumbsProductCategorySuccess(response.data))
      )
      .catch((error) => dispatch(getActiveBreadcrumbsProductCategoryError(error)));
  };
}

export function getActiveBreadcrumbsProductCategory() {
  return {
    type: GET_ACTIVE_BREADCRUMBS_PRODUCT_CATEGORY,
  };
}

export function getActiveBreadcrumbsProductCategorySuccess(success) {
  return {
    type: GET_ACTIVE_BREADCRUMBS_PRODUCT_CATEGORY_SUCCESS,
    payload: { success },
  };
}

export function getActiveBreadcrumbsProductCategoryError(error) {
  return {
    type: GET_ACTIVE_BREADCRUMBS_PRODUCT_CATEGORY_ERROR,
    payload: { error },
  };
}

export function getActiveBreadcrumbsCategoryRecord() {
  //////debugger;
  return async (dispatch) => {
    dispatch(getActiveBreadcrumbsCategory());
    return await activeBreadcrumbsCategoryService
      .getActiveBreadcrumbsCategory()

      .then((response) =>
        dispatch(getActiveBreadcrumbsCategorySuccess(response.data))
      )
      .catch((error) => dispatch(getActiveBreadcrumbsCategoryError(error)));
  };
}

export function getActiveBreadcrumbsCategory() {
  return {
    type: GET_ACTIVE_BREADCRUMBS_CATEGORY,
  };
}

export function getActiveBreadcrumbsCategorySuccess(success) {
  return {
    type: GET_ACTIVE_BREADCRUMBS_CATEGORY_SUCCESS,
    payload: { success },
  };
}

export function getActiveBreadcrumbsCategoryError(error) {
  return {
    type: GET_ACTIVE_BREADCRUMBS_CATEGORY_ERROR,
    payload: { error },
  };
}

export function getActiveBreadcrumbsCategoryByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getActiveBreadcrumbsCategoryById());
    return await activeBreadcrumbsCategoryService
      .getActiveBreadcrumbsCategoryById(id)

      .then((response) =>
        dispatch(getActiveBreadcrumbsCategoryByIdSuccess(response.data))
      )
      .catch((error) => dispatch(getActiveBreadcrumbsCategoryByIdError(error)));
  };
}

export function getActiveBreadcrumbsCategoryById() {
  return {
    type: GET_ACTIVE_BREADCRUMBS_CATEGORY_BY_ID,
  };
}

export function getActiveBreadcrumbsCategoryByIdSuccess(success) {
  return {
    type: GET_ACTIVE_BREADCRUMBS_CATEGORY_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getActiveBreadcrumbsCategoryByIdError(error) {
  return {
    type: GET_ACTIVE_BREADCRUMBS_CATEGORY_BY_ID_ERROR,
    payload: { error },
  };
}

export function createActiveBreadcrumbsCategoryRecord(data) {
  //////debugger;
  return async (dispatch) => {
    dispatch(createActiveBreadcrumbsCategory());
    return await activeBreadcrumbsCategoryService
      .createActiveBreadcrumbsCategory(data)

      .then((response) =>
        dispatch(
          createActiveBreadcrumbsCategorySuccess(response),
          alert(response.message)
        )
      )
      .catch((error) => dispatch(createActiveBreadcrumbsCategoryError(error)));
  };
}

export function createActiveBreadcrumbsCategory() {
  return {
    type: CREATE_ACTIVE_BREADCRUMBS_CATEGORY,
  };
}

export function createActiveBreadcrumbsCategorySuccess(success) {
  return {
    type: CREATE_ACTIVE_BREADCRUMBS_CATEGORY_SUCCESS,
    payload: { success },
  };
}

export function createActiveBreadcrumbsCategoryError(error) {
  return {
    type: CREATE_ACTIVE_BREADCRUMBS_CATEGORY_ERROR,
    payload: { error },
  };
}

export function updateActiveBreadcrumbsCategoryRecord(
  activeBreadcrumbsCategories
) {
  return async (dispatch) => {
    dispatch(updateActiveBreadcrumbsCategory());
    return await activeBreadcrumbsCategoryService
      .createActiveBreadcrumbsCategory(activeBreadcrumbsCategories)
      
      .then((response) =>
        dispatch(updateActiveBreadcrumbsCategorySuccess(response))
      )
      .catch((error) => dispatch(updateActiveBreadcrumbsCategoryError(error)));
  };
}

export function updateActiveBreadcrumbsCategory() {
  return {
    type: UPDATE_ACTIVE_BREADCRUMBS_CATEGORY,
  };
}

export function updateActiveBreadcrumbsCategorySuccess(success) {
  return {
    type: UPDATE_ACTIVE_BREADCRUMBS_CATEGORY_SUCCESS,
    payload: { success },
  };
}

export function updateActiveBreadcrumbsCategoryError(error) {
  return {
    type: UPDATE_ACTIVE_BREADCRUMBS_CATEGORY_ERROR,
    payload: { error },
  };
}

export function deleteActiveBreadcrumbsCategoryRecord(id) {
  return async (dispatch) => {
    dispatch(deleteActiveBreadcrumbsCategory());
    return await activeBreadcrumbsCategoryService
      .deleteActiveBreadcrumbsCategory(id)

      .then((response) =>
        dispatch(deleteActiveBreadcrumbsCategorySuccess(response))
      )
      .catch((error) => dispatch(deleteActiveBreadcrumbsCategoryError(error)));
  };
}

export function deleteActiveBreadcrumbsCategory() {
  return {
    type: DELETE_ACTIVE_BREADCRUMBS_CATEGORY,
  };
}

export function deleteActiveBreadcrumbsCategorySuccess(success) {
  return {
    type: DELETE_ACTIVE_BREADCRUMBS_CATEGORY_SUCCESS,
    payload: { success },
  };
}

export function deleteActiveBreadcrumbsCategoryError(error) {
  return {
    type: DELETE_ACTIVE_BREADCRUMBS_CATEGORY_ERROR,
    payload: { error },
  };
}
