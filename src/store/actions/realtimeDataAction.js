import realtimeDataService from "../services/realtimeDataService";

export const GET_REALTIME_DATA_BY_BARCODE = "GET_REALTIME_DATA_BY_BARCODE"
export const GET_REALTIME_DATA_BY_BARCODE_SUCCESS = "GET_REALTIME_DATA_BY_BARCODE_SUCCESS"
export const GET_REALTIME_DATA_BY_BARCODE_ERROR = "GET_REALTIME_DATA_BY_BARCODE_ERROR"
export const GET_REALTIME_DATA_BY_BARCODE_RESET = "GET_REALTIME_DATA_BY_BARCODE_RESET"

export function getRealtimeDataByBarcode(barcode) {
  return async (dispatch) => {
    dispatch(getRealtimeData())
    return await realtimeDataService
      .getRealtimeData(barcode)
      
      .then((response) => dispatch(getRealtimeDataSuccess(response.data)))
      .catch((error) => dispatch(getRealtimeDataError(error)))
  }
}

export function getRealtimeData() {
  return {
    type: GET_REALTIME_DATA_BY_BARCODE,
  }
}

export function getRealtimeDataSuccess(success) {
  return {
    type: GET_REALTIME_DATA_BY_BARCODE_SUCCESS,
    payload: { success },
  }
}

export function getRealtimeDataError(error) {
  return {
    type: GET_REALTIME_DATA_BY_BARCODE_ERROR,
    payload: { error },
  }
}