import regionService from "../services/regionService"

export const GET_ADDRESS_ONE_API = "GET_ADDRESS_ONE_API"
export const GET_ADDRESS_ONE_API_SUCCESS = "GET_ADDRESS_ONE_API_SUCCESS"
export const GET_ADDRESS_ONE_API_ERROR = "GET_ADDRESS_ONE_API_ERROR"


export function getAddressOneApiRecord() {
  return async (dispatch) => {
    dispatch(getAddressOneApi())
    return await regionService
      .getAddressOneApi()

      .then((response) => dispatch(getAddressOneApiSuccess(response.data)))
      .catch((error) => dispatch(getAddressOneApiError(error)))
  }
}

export function getAddressOneApi() {
  return {
    type: GET_ADDRESS_ONE_API,
  }
}

export function getAddressOneApiSuccess(success) {
  return {
    type: GET_ADDRESS_ONE_API_SUCCESS,
    payload: { success },
  }
}

export function getAddressOneApiError(error) {
  return {
    type: GET_ADDRESS_ONE_API_ERROR,
    payload: { error },
  }
}