import wishListService from "../services/wishListService";

export const GET_WISH_LIST = "GET_WISH_LIST";
export const GET_WISH_LIST_SUCCESS = "GET_WISH_LIST_SUCCESS";
export const GET_WISH_LIST_ERROR = "GET_WISH_LIST_ERROR";

export const GET_WISH_LIST_BY_ID = "GET_WISH_LIST_BY_ID";
export const GET_WISH_LIST_BY_ID_SUCCESS = "GET_WISH_LIST_BY_ID_SUCCESS";
export const GET_WISH_LIST_BY_ID_ERROR = "GET_WISH_LIST_BY_ID_ERROR";

export const CREATE_WISH_LIST = "CREATE_WISH_LIST";
export const CREATE_WISH_LIST_SUCCESS = "CREATE_WISH_LIST_SUCCESS";
export const CREATE_WISH_LIST_ERROR = "CREATE_WISH_LIST_ERROR";

export const DELETE_WISH_LIST = "DELETE_WISH_LIST";
export const DELETE_WISH_LIST_SUCCESS = "DELETE_WISH_LIST_SUCCESS";
export const DELETE_WISH_LIST_ERROR = "DELETE_WISH_LIST_ERROR";

//////////////////End of Brand Action Types/////////////////////////

export function getWishListRecord() {
  return async (dispatch) => {
    dispatch(getWishList());
    return await wishListService
      .getWishList()

      .then((response) => dispatch(getWishListSuccess(response.data)))
      .catch((error) => dispatch(getWishListError(error)));
  };
}

export function getWishList() {
  return {
    type: GET_WISH_LIST,
  };
}

export function getWishListSuccess(success) {
  return {
    type: GET_WISH_LIST_SUCCESS,
    payload: { success },
  };
}

export function getWishListError(error) {
  return {
    type: GET_WISH_LIST_ERROR,
    payload: { error },
  };
}

export function getWishListByIdRecord(customerId, searchBy) {
  return async (dispatch) => {
    dispatch(getWishListById());
    return await wishListService
      .getWishListById(customerId, searchBy)

      .then((response) => dispatch(getWishListByIdSuccess(response.data)))
      .catch((error) => dispatch(getWishListByIdError(error)));
  };
}

export function getWishListById() {
  return {
    type: GET_WISH_LIST_BY_ID,
  };
}

export function getWishListByIdSuccess(success) {
  return {
    type: GET_WISH_LIST_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getWishListByIdError(error) {
  return {
    type: GET_WISH_LIST_BY_ID_ERROR,
    payload: { error },
  };
}

export function createWishListRecord(order) {
  return async (dispatch) => {
    dispatch(createWishList());
    return await wishListService
      .createWishList(order)

      .then((response) => dispatch(createWishListSuccess(response)))
      .catch((error) => dispatch(createWishListError(error)));
  };
}

export function createWishList() {
  return {
    type: CREATE_WISH_LIST,
  };
}

export function createWishListSuccess(success) {
  return {
    type: CREATE_WISH_LIST_SUCCESS,
    payload: { success },
  };
}

export function createWishListError(error) {
  return {
    type: CREATE_WISH_LIST_ERROR,
    payload: { error },
  };
}

export function deleteWishListRecord(customerId, id) {
  return async (dispatch) => {
    dispatch(deleteWishList());
    return await wishListService
      .deleteWishList(customerId, id)
      
      .then((response) => dispatch(deleteWishListSuccess(response)))
      .catch((error) => dispatch(deleteWishListError(error)));
  };
}

export function deleteWishList() {
  return {
    type: DELETE_WISH_LIST,
  };
}

export function deleteWishListSuccess(success) {
  return {
    type: DELETE_WISH_LIST_SUCCESS,
    payload: { success },
  };
}

export function deleteWishListError(error) {
  return {
    type: DELETE_WISH_LIST_ERROR,
    payload: { error },
  };
}
