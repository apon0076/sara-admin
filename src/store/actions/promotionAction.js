import promotionService from "../services/promotionService";

export const GET_PROMOTION = "GET_PROMOTION";
export const GET_PROMOTION_SUCCESS = "GET_PROMOTION_SUCCESS";
export const GET_PROMOTION_ERROR = "GET_PROMOTION_ERROR";

export const GET_PROMOTION_BY_ID = "GET_PROMOTION_BY_ID";
export const GET_PROMOTION_BY_ID_SUCCESS = "GET_PROMOTION_BY_ID_SUCCESS";
export const GET_PROMOTION_BY_ID_ERROR = "GET_PROMOTION_BY_ID_ERROR";

export const CREATE_OR_UPDATE_PROMOTION = "CREATE_OR_UPDATE_PROMOTION";
export const CREATE_OR_UPDATE_PROMOTION_SUCCESS = "CREATE_OR_UPDATE_PROMOTION_SUCCESS";
export const CREATE_OR_UPDATE_PROMOTION_ERROR = "CREATE_OR_UPDATE_PROMOTION_ERROR";

export const DELETE_PROMOTION = "DELETE_PROMOTION";
export const DELETE_PROMOTION_SUCCESS = "DELETE_PROMOTION_SUCCESS";
export const DELETE_PROMOTION_ERROR = "DELETE_PROMOTION_ERROR";

//////////////////END OF COLOR ACTION TYPES/////////////////////////

export function getPromotionRecord() {
  return async (dispatch) => {
    dispatch(getPromotion());
    return await promotionService
      .getPromotion()

      .then((response) => dispatch(getPromotionSuccess(response.data)))
      .catch((error) => dispatch(getPromotionError(error)));
  };
}

export function getPromotion() {
  return {
    type: GET_PROMOTION,
  };
}

export function getPromotionSuccess(success) {
  return {
    type: GET_PROMOTION_SUCCESS,
    payload: { success },
  };
}

export function getPromotionError(error) {
  return {
    type: GET_PROMOTION_ERROR,
    payload: { error },
  };
}

export function getPromotionByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getPromotionById());
    return await promotionService
      .getPromotionById(id)

      .then((response) => dispatch(getPromotionByIdSuccess(response.data)))
      .catch((error) => dispatch(getPromotionByIdError(error)));
  };
}

export function getPromotionById() {
  return {
    type: GET_PROMOTION_BY_ID,
  };
}

export function getPromotionByIdSuccess(success) {
  return {
    type: GET_PROMOTION_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getPromotionByIdError(error) {
  return {
    type: GET_PROMOTION_BY_ID_ERROR,
    payload: { error },
  };
}

export function createOrUpdatePromotionRecord(data) {
  return async (dispatch) => {
    dispatch(createOrUpdatePromotion());
    return await promotionService
      .createOrUpdatePromotion(data)

      .then((response) =>
        dispatch(createOrUpdatePromotionSuccess(response))
      )
      .catch((error) => dispatch(createOrUpdatePromotionError(error)));
  };
}

export function createOrUpdatePromotion() {
  return {
    type: CREATE_OR_UPDATE_PROMOTION,
  };
}

export function createOrUpdatePromotionSuccess(success) {
  return {
    type: CREATE_OR_UPDATE_PROMOTION_SUCCESS,
    payload: { success },
  };
}

export function createOrUpdatePromotionError(error) {
  return {
    type: CREATE_OR_UPDATE_PROMOTION_ERROR,
    payload: { error },
  };
}

export function deletePromotionRecord(id) {
  return async (dispatch) => {
    dispatch(deletePromotion());
    return await promotionService
      .deletePromotion(id)

      .then((response) => dispatch(deletePromotionSuccess(response)))
      .catch((error) => dispatch(deletePromotionError(error)));
  };
}

export function deletePromotion() {
  return {
    type: DELETE_PROMOTION,
  };
}

export function deletePromotionSuccess(success) {
  return {
    type: DELETE_PROMOTION_SUCCESS,
    payload: { success },
  };
}

export function deletePromotionError(error) {
  return {
    type: DELETE_PROMOTION_ERROR,
    payload: { error },
  };
}
