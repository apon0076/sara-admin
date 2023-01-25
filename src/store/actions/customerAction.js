import customerService from "../services/customerService";

export const CUSTOMER_CONTACT_AVAILABLE = "CUSTOMER_CONTACT_AVAILABLE";
export const CUSTOMER_CONTACT_AVAILABLE_SUCCESS =
  "CUSTOMER_CONTACT_AVAILABLE_SUCCESS";
export const CUSTOMER_CONTACT_AVAILABLE_ERROR =
  "CUSTOMER_CONTACT_AVAILABLE_ERROR";

export const GET_CUSTOMER_DETAILS = "GET_CUSTOMER_DETAILS";
export const GET_CUSTOMER_DETAILS_SUCCESS = "GET_CUSTOMER_DETAILS_SUCCESS";
export const GET_CUSTOMER_DETAILS_ERROR = "GET_CUSTOMER_DETAILS_ERROR";

export const CREATE_NEW_CUSTOMER = "CREATE_NEW_CUSTOMER";
export const CREATE_NEW_CUSTOMER_SUCCESS = "CREATE_NEW_CUSTOMER_SUCCESS";
export const CREATE_NEW_CUSTOMER_ERROR = "CREATE_NEW_CUSTOMER_ERROR";

export const CREATE_CUSTOMER_ADDRESS = "CREATE_CUSTOMER_ADDRESS";
export const CREATE_CUSTOMER_ADDRESS_SUCCESS =
  "CREATE_CUSTOMER_ADDRESS_SUCCESS";
export const CREATE_CUSTOMER_ADDRESS_ERROR = "CREATE_CUSTOMER_ADDRESS_ERROR";
export const CREATE_CUSTOMER_ADDRESS_RESET = "CREATE_CUSTOMER_ADDRESS_RESET";

export const GET_PRODUCT_WITH_SKU = "GET_PRODUCT_WITH_SKU";
export const GET_PRODUCT_WITH_SKU_SUCCESS = "GET_PRODUCT_WITH_SKU_SUCCESS";
export const GET_PRODUCT_WITH_SKU_ERROR = "GET_PRODUCT_WITH_SKU_ERROR";

export const GET_CUSTOMER_ADDRESS = "GET_CUSTOMER_ADDRESS";
export const GET_CUSTOMER_ADDRESS_SUCCESS = "GET_CUSTOMER_ADDRESS_SUCCESS";
export const GET_CUSTOMER_ADDRESS_ERROR = "GET_CUSTOMER_ADDRESS_ERROR";

export const CREATE_ORDER = "CREATE_ORDER";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_ERROR = "CREATE_ORDER_ERROR";

export function customerContactAvailableRecord(contactNo) {
  return async (dispatch) => {
    dispatch(customerContactAvailable());
    return await customerService
      .customerContactAvailable(contactNo)

      .then((response) => dispatch(customerContactAvailableSuccess(response)))
      .catch((error) => dispatch(customerContactAvailableError(error)));
  };
}

export function customerContactAvailable() {
  return {
    type: CUSTOMER_CONTACT_AVAILABLE,
  };
}

export function customerContactAvailableSuccess(success) {
  return {
    type: CUSTOMER_CONTACT_AVAILABLE_SUCCESS,
    payload: { success },
  };
}

export function customerContactAvailableError(error) {
  return {
    type: CUSTOMER_CONTACT_AVAILABLE_ERROR,
    payload: { error },
  };
}

export function getCustomerDetailsRecord(contactNo) {
  return async (dispatch) => {
    dispatch(getCustomerDetails());
    return await customerService
      .getCustomerDetails(contactNo)

      .then((response) => dispatch(getCustomerDetailsSuccess(response.data)))
      .catch((error) => dispatch(getCustomerDetailsError(error)));
  };
}

export function getCustomerDetails() {
  return {
    type: GET_CUSTOMER_DETAILS,
  };
}

export function getCustomerDetailsSuccess(success) {
  return {
    type: GET_CUSTOMER_DETAILS_SUCCESS,
    payload: { success },
  };
}

export function getCustomerDetailsError(error) {
  return {
    type: GET_CUSTOMER_DETAILS_ERROR,
    payload: { error },
  };
}

export function createNewCustomerRecord(data) {
  return async (dispatch) => {
    dispatch(createNewCustomer());
    return await customerService
      .createNewCustomer(data)

      .then((response) => dispatch(createNewCustomerSuccess(response)))
      .catch((error) => dispatch(createNewCustomerError(error)));
  };
}

export function createNewCustomer() {
  return {
    type: CREATE_NEW_CUSTOMER,
  };
}

export function createNewCustomerSuccess(success) {
  return {
    type: CREATE_NEW_CUSTOMER_SUCCESS,
    payload: { success },
  };
}

export function createNewCustomerError(error) {
  return {
    type: CREATE_NEW_CUSTOMER_ERROR,
    payload: { error },
  };
}

export function createCustomerAddressRecord(data) {
  return async (dispatch) => {
    dispatch(createCustomerAddress());
    return await customerService
      .createCustomerAddress(data)

      .then((response) => dispatch(createCustomerAddressSuccess(response)))
      .catch((error) => dispatch(createCustomerAddressError(error)));
  };
}

export function createCustomerAddress() {
  return {
    type: CREATE_CUSTOMER_ADDRESS,
  };
}

export function createCustomerAddressSuccess(success) {
  return {
    type: CREATE_CUSTOMER_ADDRESS_SUCCESS,
    payload: { success },
  };
}

export function createCustomerAddressError(error) {
  return {
    type: CREATE_CUSTOMER_ADDRESS_ERROR,
    payload: { error },
  };
}

export function getProductWithSkuRecord(sku) {
  return async (dispatch) => {
    dispatch(getProductWithSku());
    return await customerService
      .getProductWithSku(sku)

      .then((response) => dispatch(getProductWithSkuSuccess(response)))
      .catch((error) => dispatch(getProductWithSkuError(error)));
  };
}

export function getProductWithSku() {
  return {
    type: GET_PRODUCT_WITH_SKU,
  };
}

export function getProductWithSkuSuccess(success) {
  return {
    type: GET_PRODUCT_WITH_SKU_SUCCESS,
    payload: { success },
  };
}

export function getProductWithSkuError(error) {
  return {
    type: GET_PRODUCT_WITH_SKU_SUCCESS,
    payload: { error },
  };
}

export function getCustomerAddressRecord(id) {
  return async (dispatch) => {
    dispatch(getCustomerAddress());
    return await customerService
      .getCustomerAddress(id)

      .then((response) => dispatch(getCustomerAddressSuccess(response)))
      .catch((error) => dispatch(getCustomerAddressError(error)));
  };
}

export function getCustomerAddress() {
  return {
    type: GET_CUSTOMER_ADDRESS,
  };
}

export function getCustomerAddressSuccess(success) {
  return {
    type: GET_CUSTOMER_ADDRESS_SUCCESS,
    payload: { success },
  };
}

export function getCustomerAddressError(error) {
  return {
    type: GET_CUSTOMER_ADDRESS_SUCCESS,
    payload: { error },
  };
}

export function createOrderRecord(data) {
  return async (dispatch) => {
    dispatch(createOrder());
    return await customerService
      .createOrder(data)

      .then((response) => dispatch(createOrderSuccess(response)))
      .catch((error) => dispatch(createOrderError(error)));
  };
}

export function createOrder() {
  return {
    type: CREATE_ORDER,
  };
}

export function createOrderSuccess(success) {
  return {
    type: CREATE_ORDER_SUCCESS,
    payload: { success },
  };
}

export function createOrderError(error) {
  return {
    type: CREATE_ORDER_ERROR,
    payload: { error },
  };
}
