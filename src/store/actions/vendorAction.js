import vendorService from "../services/vendorService";

export const GET_VENDOR = "GET_VENDOR";
export const GET_VENDOR_SUCCESS = "GET_VENDOR_SUCCESS";
export const GET_VENDOR_ERROR = "GET_VENDOR_ERROR";

export const GET_VENDOR_BY_ID = "GET_VENDOR_BY_ID";
export const GET_VENDOR_BY_ID_SUCCESS = "GET_VENDOR_BY_ID_SUCCESS";
export const GET_VENDOR_BY_ID_ERROR = "GET_VENDOR_BY_ID_ERROR";

export const CREATE_VENDOR = "CREATE_VENDOR";
export const CREATE_VENDOR_SUCCESS = "CREATE_VENDOR_SUCCESS";
export const CREATE_VENDOR_ERROR = "CREATE_VENDOR_ERROR";

export const UPDATE_VENDOR = "UPDATE_VENDOR";
export const UPDATE_VENDOR_SUCCESS = "UPDATE_VENDOR_SUCCESS";
export const UPDATE_VENDOR_ERROR = "UPDATE_VENDOR_ERROR";

export const DELETE_VENDOR = "DELETE_SUBCATEDELETE_VENDORGORY";
export const DELETE_VENDOR_SUCCESS = "DELETE_VENDOR_ERROR";
export const DELETE_VENDOR_ERROR = "DELETE_VENDOR_ERROR";

//////////////////END OF VENDOR ACTION TYPES/////////////////////////

export function getVendorRecord() {
  return async (dispatch) => {
    dispatch(getVendor());
    return await vendorService
      .getVendor()

      .then((response) => dispatch(getVendorSuccess(response.data)))
      .catch((error) => dispatch(getVendorError(error)));
  };
}

export function getVendor() {
  return {
    type: GET_VENDOR,
  };
}

export function getVendorSuccess(success) {
  return {
    type: GET_VENDOR_SUCCESS,
    payload: { success },
  };
}

export function getVendorError(error) {
  return {
    type: GET_VENDOR_ERROR,
    payload: { error },
  };
}

export function getVendorByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getVendorById());
    return await vendorService
      .getVendorById(id)

      .then((response) => dispatch(getVendorByIdSuccess(response.data)))
      .catch((error) => dispatch(getVendorByIdError(error)));
  };
}

export function getVendorById() {
  return {
    type: GET_VENDOR_BY_ID,
  };
}

export function getVendorByIdSuccess(success) {
  return {
    type: GET_VENDOR_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getVendorByIdError(error) {
  return {
    type: GET_VENDOR_BY_ID_ERROR,
    payload: { error },
  };
}

export function createVendorRecord(vendors) {
  return async (dispatch) => {
    dispatch(createVendor());
    return await vendorService
      .createVendor(vendors)

      .then((response) => dispatch(createVendorSuccess(response)))
      .catch((error) => dispatch(createVendorError(error)));
  };
}

export function createVendor() {
  return {
    type: CREATE_VENDOR,
  };
}

export function createVendorSuccess(success) {
  return {
    type: CREATE_VENDOR_SUCCESS,
    payload: { success },
  };
}

export function createVendorError(error) {
  return {
    type: CREATE_VENDOR_ERROR,
    payload: { error },
  };
}

export function updateVendorRecord(vendors) {
  return async (dispatch) => {
    dispatch(updateVendor());
    return await vendorService
      .createVendor(vendors)
      
      .then((response) => dispatch(updateVendorSuccess(response)))
      .catch((error) => dispatch(updateVendorError(error)));
  };
}

export function updateVendor() {
  return {
    type: UPDATE_VENDOR,
  };
}

export function updateVendorSuccess(success) {
  return {
    type: UPDATE_VENDOR_SUCCESS,
    payload: { success },
  };
}

export function updateVendorError(error) {
  return {
    type: UPDATE_VENDOR_ERROR,
    payload: { error },
  };
}

export function deleteVendorRecord(id) {
  return async (dispatch) => {
    dispatch(deleteVendor());
    return await vendorService
      .deleteVendor(id)

      .then((response) => dispatch(deleteVendorSuccess(response)))
      .catch((error) => dispatch(deleteVendorError(error)));
  };
}

export function deleteVendor() {
  return {
    type: DELETE_VENDOR,
  };
}

export function deleteVendorSuccess(success) {
  return {
    type: DELETE_VENDOR_SUCCESS,
    payload: { success },
  };
}

export function deleteVendorError(error) {
  return {
    type: DELETE_VENDOR_ERROR,
    payload: { error },
  };
}
