import blogPostService from "../services/blogPostService"

export const GET_BLOG_POST = "GET_BLOG_POST"
export const GET_BLOG_POST_SUCCESS = "GET_BLOG_POST_SUCCESS"
export const GET_BLOG_POST_ERROR = "GET_BLOG_POST_ERROR"

export const CREATE_OR_UPDATE_BLOG_POST = "CREATE_OR_UPDATE_BLOG_POST"
export const CREATE_OR_UPDATE_BLOG_POST_SUCCESS = "CREATE_OR_UPDATE_BLOG_POST_SUCCESS"
export const CREATE_OR_UPDATE_BLOG_POST_ERROR = "CREATE_OR_UPDATE_BLOG_POST_ERROR"

export function getBlogPostRecord() {
  return async (dispatch) => {
    dispatch(getBlogPost())
    return await blogPostService
      .getBlogPost()
      
      .then((response) => dispatch(getBlogPostSuccess(response.data)))
      .catch((error) => dispatch(getBlogPostError(error)))
  }
}

export function getBlogPost() {
  return {
    type: GET_BLOG_POST,
  }
}

export function getBlogPostSuccess(success) {
  return {
    type: GET_BLOG_POST_SUCCESS,
    payload: { success },
  }
}

export function getBlogPostError(error) {
  return {
    type: GET_BLOG_POST_ERROR,
    payload: { error },
  }
}

export function createOrUpdateBlogPostRecord(blog) {
  return async (dispatch) => {
    dispatch(createOrUpdateBlogPost())
    return await blogPostService
      .createOrUpdateBlogPost(blog)

      .then((response) => dispatch(createOrUpdateBlogPostSuccess(response)))
      .catch((error) => dispatch(createOrUpdateBlogPostError(error)))
  }
}

export function createOrUpdateBlogPost() {
  return {
    type: CREATE_OR_UPDATE_BLOG_POST,
  }
}

export function createOrUpdateBlogPostSuccess(success) {
  return {
    type: CREATE_OR_UPDATE_BLOG_POST_SUCCESS,
    payload: { success },
  }
}

export function createOrUpdateBlogPostError(error) {
  return {
    type: CREATE_OR_UPDATE_BLOG_POST_ERROR,
    payload: { error },
  }
}

