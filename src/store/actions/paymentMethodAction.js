import paymentMethodService from "../services/paymentMethodService";

export const GET_PAYMENT_METHOD = "GET_PAYMENT_METHOD";
export const GET_PAYMENT_METHOD_SUCCESS = "GET_PAYMENT_METHOD_SUCCESS";
export const GET_PAYMENT_METHOD_ERROR = "GET_PAYMENT_METHOD_ERROR";

export const CREATE_OR_UPDATE_PAYMENT_METHOD =
  "CREATE_OR_UPDATE_PAYMENT_METHOD";
export const CREATE_OR_UPDATE_PAYMENT_METHOD_SUCCESS =
  "CREATE_OR_UPDATE_PAYMENT_METHOD_SUCCESS";
export const CREATE_OR_UPDATE_PAYMENT_METHOD_ERROR =
  "CREATE_OR_UPDATE_PAYMENT_METHOD_ERROR";

export const CREATE_ORDER_PAYMENT_MANUAL = "CREATE_ORDER_PAYMENT_MANUAL";
export const CREATE_ORDER_PAYMENT_MANUAL_SUCCESS =
  "CREATE_ORDER_PAYMENT_MANUAL_SUCCESS";
export const CREATE_ORDER_PAYMENT_MANUAL_ERROR =
  "CREATE_ORDER_PAYMENT_MANUAL_ERROR";
export const CREATE_ORDER_PAYMENT_MANUAL_RESET =
  "CREATE_ORDER_PAYMENT_MANUAL_RESET";

export function getPaymentMethodRecord() {
  return async (dispatch) => {
    dispatch(getPaymentMethod());
    return await paymentMethodService
      .getPaymentMethod()

      .then((response) => dispatch(getPaymentMethodSuccess(response.data)))
      .catch((error) => dispatch(getPaymentMethodError(error)));
  };
}

export function getPaymentMethod() {
  return {
    type: GET_PAYMENT_METHOD,
  };
}

export function getPaymentMethodSuccess(success) {
  return {
    type: GET_PAYMENT_METHOD_SUCCESS,
    payload: { success },
  };
}

export function getPaymentMethodError(error) {
  return {
    type: GET_PAYMENT_METHOD_ERROR,
    payload: { error },
  };
}

export function createOrUpdatePaymentMethodRecord(paymentMethod) {
  return async (dispatch) => {
    dispatch(createOrUpdatePaymentMethod());
    return await paymentMethodService
      .createOrUpdatePaymentMethod(paymentMethod)

      .then((response) =>
        dispatch(createOrUpdatePaymentMethodSuccess(response.data))
      )
      .catch((error) => dispatch(createOrUpdatePaymentMethodError(error)));
  };
}

export function createOrUpdatePaymentMethod() {
  return {
    type: CREATE_OR_UPDATE_PAYMENT_METHOD,
  };
}

export function createOrUpdatePaymentMethodSuccess(success) {
  return {
    type: CREATE_OR_UPDATE_PAYMENT_METHOD_SUCCESS,
    payload: { success },
  };
}

export function createOrUpdatePaymentMethodError(error) {
  return {
    type: CREATE_OR_UPDATE_PAYMENT_METHOD_ERROR,
    payload: { error },
  };
}

// Manual Order Payment Start
export function createOrderPaymentManualRecord(data) {
  return async (dispatch) => {
    dispatch(createOrderPaymentManual());
    return await paymentMethodService
      .createOrderPaymentManual(data)

      .then((response) =>
        dispatch(createOrderPaymentManualSuccess(response))
      )
      .catch((error) => dispatch(createOrderPaymentManualError(error)));
  };
}
export function createOrderPaymentManual() {
  return {
    type: CREATE_ORDER_PAYMENT_MANUAL,
  };
}
export function createOrderPaymentManualSuccess(success) {
  return {
    type: CREATE_ORDER_PAYMENT_MANUAL_SUCCESS,
    payload: { success },
  };
}
export function createOrderPaymentManualError(error) {
  return {
    type: CREATE_ORDER_PAYMENT_MANUAL_ERROR,
    payload: { error },
  };
}
export function createOrderPaymentManualReset() {
  return {
    type: CREATE_ORDER_PAYMENT_MANUAL_RESET,
  };
}
// Manual Order Payment End
