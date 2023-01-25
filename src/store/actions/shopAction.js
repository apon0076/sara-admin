import shopService from "../services/shopService";

export const GET_SHOP = "GET_SHOP";
export const GET_SHOP_SUCCESS = "GET_SHOP_SUCCESS";
export const GET_SHOP_ERROR = "GET_SHOP_ERROR";

export const GET_SHOP_BY_ID = "GET_SHOP_BY_ID";
export const GET_SHOP_BY_ID_SUCCESS = "GET_SHOP_BY_ID_SUCCESS";
export const GET_SHOP_BY_ID_ERROR = "GET_SHOP_BY_ID_ERROR";

export const CREATE_SHOP = "CREATE_SHOP";
export const CREATE_SHOP_SUCCESS = "CREATE_SHOP_SUCCESS";
export const CREATE_SHOP_ERROR = "CREATE_SHOP_ERROR";

export const UPDATE_SHOP = "UPDATE_SHOP";
export const UPDATE_SHOP_SUCCESS = "UPDATE_SHOP_SUCCESS";
export const UPDATE_SHOP_ERROR = "UPDATE_SHOP_ERROR";

export const DELETE_SHOP = "DELETE_SHOP";
export const DELETE_SHOP_SUCCESS = "DELETE_SHOP_SUCCESS";
export const DELETE_SHOP_ERROR = "DELETE_SHOP_ERROR";

export const GET_PENDING_SHOP = "GET_PENDING_SHOP";
export const GET_PENDING_SHOP_SUCCESS = "GET_PENDING_SHOP_SUCCESS";
export const GET_PENDING_SHOP_ERROR = "GET_PENDING_SHOP_ERROR";

export const GET_PENDING_SHOP_BY_ID = "GET_PENDING_SHOP_BY_ID";
export const GET_PENDING_SHOP_BY_ID_SUCCESS = "GET_PENDING_SHOP_BY_ID_SUCCESS";
export const GET_PENDING_SHOP_BY_ID_ERROR = "GET_PENDING_SHOP_BY_ID_ERROR";

//////////////////END OF SHOP ACTION TYPES/////////////////////////

export function getShopRecord() {
  return async (dispatch) => {
    dispatch(getShop());
    return await shopService
      .getShop()

      .then((response) => dispatch(getShopSuccess(response.data)))
      .catch((error) => dispatch(getShopError(error)));
  };
}

export function getShop() {
  return {
    type: GET_SHOP,
  };
}

export function getShopSuccess(success) {
  return {
    type: GET_SHOP_SUCCESS,
    payload: { success },
  };
}

export function getShopError(error) {
  return {
    type: GET_SHOP_ERROR,
    payload: { error },
  };
}

export function getShopByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getShopById());
    return await shopService
      .getShopById(id)

      .then((response) => dispatch(getShopByIdSuccess(response.data)))
      .catch((error) => dispatch(getShopByIdError(error)));
  };
}

export function getShopById() {
  return {
    type: GET_SHOP_BY_ID,
  };
}

export function getShopByIdSuccess(success) {
  return {
    type: GET_SHOP_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getShopByIdError(error) {
  return {
    type: GET_SHOP_BY_ID_ERROR,
    payload: { error },
  };
}

export function createShopRecord(shops) {
  //////debugger;
  return async (dispatch) => {
    dispatch(createShop());
    return await shopService
      .createShop(shops)

      .then((response) => dispatch(createShopSuccess(response)))
      .catch((error) => dispatch(createShopError(error)));
  };
}

export function createShop() {
  return {
    type: CREATE_SHOP,
  };
}

//////debugger;
export function createShopSuccess(success) {
  return {
    type: CREATE_SHOP_SUCCESS,
    payload: { success },
  };
}

export function createShopError(error) {
  return {
    type: CREATE_SHOP_ERROR,
    payload: { error },
  };
}

export function updateShopRecord(shops) {
  return async (dispatch) => {
    dispatch(updateShop());
    return await shopService
      .createShop(shops)
      
      .then((response) => dispatch(updateShopSuccess(response)))
      .catch((error) => dispatch(updateShopError(error)));
  };
}

export function updateShop() {
  return {
    type: UPDATE_SHOP,
  };
}

export function updateShopSuccess(success) {
  return {
    type: UPDATE_SHOP_SUCCESS,
    payload: { success },
  };
}

export function updateShopError(error) {
  return {
    type: UPDATE_SHOP_ERROR,
    payload: { error },
  };
}

export function deleteShopRecord(id) {
  return async (dispatch) => {
    dispatch(deleteShop());
    return await shopService
      .deleteShop(id)

      .then((response) => dispatch(deleteShopSuccess(response)))
      .catch((error) => dispatch(deleteShopError(error)));
  };
}

export function deleteShop() {
  return {
    type: DELETE_SHOP,
  };
}

export function deleteShopSuccess(success) {
  return {
    type: DELETE_SHOP_SUCCESS,
    payload: { success },
  };
}

export function deleteShopError(error) {
  return {
    type: DELETE_SHOP_ERROR,
    payload: { error },
  };
}

export function getPendingShopRecord() {
  return async (dispatch) => {
    dispatch(getPendingShop());
    return await shopService
      .getPendingShop()

      .then((response) => dispatch(getPendingShopSuccess(response.data)))
      .catch((error) => dispatch(getPendingShopError(error)));
  };
}

export function getPendingShop() {
  return {
    type: GET_PENDING_SHOP,
  };
}

export function getPendingShopSuccess(success) {
  return {
    type: GET_PENDING_SHOP_SUCCESS,
    payload: { success },
  };
}

export function getPendingShopError(error) {
  return {
    type: GET_PENDING_SHOP_ERROR,
    payload: { error },
  };
}

export function getPendingShopByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getPendingShopById());
    return await shopService
      .getPendingShopById(id)

      .then((response) => dispatch(getPendingShopByIdSuccess(response.data)))
      .catch((error) => dispatch(getPendingShopByIdError(error)));
  };
}

export function getPendingShopById() {
  return {
    type: GET_PENDING_SHOP_BY_ID,
  };
}

export function getPendingShopByIdSuccess(success) {
  return {
    type: GET_PENDING_SHOP_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getPendingShopByIdError(error) {
  return {
    type: GET_PENDING_SHOP_BY_ID_ERROR,
    payload: { error },
  };
}
