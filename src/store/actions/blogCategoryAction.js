//////////////////////This is import for API Call/////////////
import blogCategoryService from "../services/blogCategoryService"

export const GET_BLOG_CATEGORY_DETAILS = "GET_BLOG_CATEGORY_DETAILS"
export const GET_BLOG_CATEGORY_DETAILS_SUCCESS =
  "GET_BLOG_CATEGORY_DETAILS_SUCCESS"
export const GET_BLOG_CATEGORY_DETAILS_ERROR = "GET_BLOG_CATEGORY_DETAILS_ERROR"

export const CREATE_OR_UPDATE_BLOG_CATEGORY_DETAILS = "CREATE_OR_UPDATE_BLOG_CATEGORY_DETAILS"
export const CREATE_OR_UPDATE_BLOG_CATEGORY_DETAILS_SUCCESS =
  "CREATE_OR_UPDATE_BLOG_CATEGORY_DETAILS_SUCCESS"
export const CREATE_OR_UPDATE_BLOG_CATEGORY_DETAILS_ERROR =
  "CREATE_OR_UPDATE_BLOG_CATEGORY_DETAILS_ERROR"

//////////////////End of blog Action Types/////////////////////////

export function getBlogCategoryRecord() {
  return async (dispatch) => {
    dispatch(getBlogCategory())
    return await blogCategoryService
      .getBlogCategory()

      .then((response) => dispatch(getBlogCategorySuccess(response.data)))
      .catch((error) => dispatch(getBlogCategoryError(error)))
  }
}

export function getBlogCategory() {
  return {
    type: GET_BLOG_CATEGORY_DETAILS,
  }
}

export function getBlogCategorySuccess(success) {
  return {
    type: GET_BLOG_CATEGORY_DETAILS_SUCCESS,
    payload: { success },
  }
}

export function getBlogCategoryError(error) {
  return {
    type: GET_BLOG_CATEGORY_DETAILS_ERROR,
    payload: { error },
  }
}

export function createOrUpdateBlogCategoryRecord(blog) {
  return async (dispatch) => {
    dispatch(createOrUpdateBlogCategory())
    return await blogCategoryService
      .createOrUpdateBlogCategory(blog)
      
      .then((response) => dispatch(createOrUpdateBlogCategorySuccess(response)))
      .catch((error) => dispatch(createOrUpdateBlogCategoryError(error)))
  }
}

export function createOrUpdateBlogCategory() {
  return {
    type: CREATE_OR_UPDATE_BLOG_CATEGORY_DETAILS,
  }
}

export function createOrUpdateBlogCategorySuccess(success) {
  return {
    type: CREATE_OR_UPDATE_BLOG_CATEGORY_DETAILS_SUCCESS,
    payload: { success },
  }
}

export function createOrUpdateBlogCategoryError(error) {
  return {
    type: CREATE_OR_UPDATE_BLOG_CATEGORY_DETAILS_ERROR,
    payload: { error },
  }
}

