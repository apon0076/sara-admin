import discountHistoryService from "../services/discountHistoryService";

export const CREATE_DISCOUNT_HISTORY = "CREATE_DISCOUNT_HISTORY";
export const CREATE_DISCOUNT_HISTORY_SUCCESS =
  "CREATE_DISCOUNT_HISTORY_SUCCESS";
export const CREATE_DISCOUNT_HISTORY_ERROR =
  "CREATE_DISCOUNT_HISTORY_ERROR";

export function createDiscountHistoryRecord(data) {
  return async (dispatch) => {
    dispatch(createDiscountHistory());
    return await discountHistoryService
      .createDiscountHistory(data)
      
      .then((response) =>
        dispatch(createDiscountHistorySuccess(response.data))
      )
      .catch((error) => dispatch(createDiscountHistoryError(error)));
  };
}

export function createDiscountHistory() {
  return {
    type: CREATE_DISCOUNT_HISTORY,
  };
}

export function createDiscountHistorySuccess(success) {
  return {
    type: CREATE_DISCOUNT_HISTORY_SUCCESS,
    payload: { success },
  };
}

export function createDiscountHistoryError(error) {
  return {
    type: CREATE_DISCOUNT_HISTORY_ERROR,
    payload: { error },
  };
}