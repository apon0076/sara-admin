//////////////////////This is import for API Call/////////////
import measurementChartService from "../services/measurementChartService";

export const GET_MEASUREMENT_CHART = "GET_MEASUREMENT_CHART";
export const GET_MEASUREMENT_CHART_SUCCESS = "GET_MEASUREMENT_CHART_SUCCESS";
export const GET_MEASUREMENT_CHART_ERROR = "GET_MEASUREMENT_CHART_ERROR";

export const GET_MEASUREMENT_CHART_BY_ID = "GET_MEASUREMENT_CHART_BY_ID";
export const GET_MEASUREMENT_CHART_BY_ID_SUCCESS =
  "GET_MEASUREMENT_CHART_BY_ID_SUCCESS";
export const GET_MEASUREMENT_CHART_BY_ID_ERROR =
  "GET_MEASUREMENT_CHART_BY_ID_ERROR";

export const CREATE_MEASUREMENT_CHART = "CREATE_MEASUREMENT_CHART";
export const CREATE_MEASUREMENT_CHART_SUCCESS =
  "CREATE_MEASUREMENT_CHART_SUCCESS";
export const CREATE_MEASUREMENT_CHART_ERROR = "CREATE_MEASUREMENT_CHART_ERROR";

export const UPDATE_MEASUREMENT_CHART = "UPDATE_MEASUREMENT_CHART";
export const UPDATE_MEASUREMENT_CHART_SUCCESS =
  "UPDATE_MEASUREMENT_CHART_SUCCESS";
export const UPDATE_MEASUREMENT_CHART_ERROR = "UPDATE_MEASUREMENT_CHART_ERROR";

export const DELETE_MEASUREMENT_CHART = "DELETE_MEASUREMENT_CHART";
export const DELETE_MEASUREMENT_CHART_SUCCESS =
  "DELETE_MEASUREMENT_CHART_SUCCESS";
export const DELETE_MEASUREMENT_CHART_ERROR = "DELETE_MEASUREMENT_CHART_ERROR";
//////////////////End of Brand Action Types/////////////////////////

export function getMeasurementChartRecord() {
  return async (dispatch) => {
    dispatch(getMeasurementChart());
    return await measurementChartService
      .getMeasurementChart()

      .then((response) => dispatch(getMeasurementChartSuccess(response.data)))
      .catch((error) => dispatch(getMeasurementChartError(error)));
  };
}

export function getMeasurementChart() {
  return {
    type: GET_MEASUREMENT_CHART,
  };
}

export function getMeasurementChartSuccess(success) {
  return {
    type: GET_MEASUREMENT_CHART_SUCCESS,
    payload: { success },
  };
}

export function getMeasurementChartError(error) {
  return {
    type: GET_MEASUREMENT_CHART_ERROR,
    payload: { error },
  };
}

export function getMeasurementChartByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getMeasurementChartById());
    return await measurementChartService
      .getMeasurementChartById(id)

      .then((response) =>
        dispatch(getMeasurementChartByIdSuccess(response.data))
      )
      .catch((error) => dispatch(getMeasurementChartByIdError(error)));
  };
}

export function getMeasurementChartById() {
  return {
    type: GET_MEASUREMENT_CHART_BY_ID,
  };
}

export function getMeasurementChartByIdSuccess(success) {
  return {
    type: GET_MEASUREMENT_CHART_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getMeasurementChartByIdError(error) {
  return {
    type: GET_MEASUREMENT_CHART_BY_ID_ERROR,
    payload: { error },
  };
}

export function createMeasurementChartRecord(measurementChart) {
  return async (dispatch) => {
    dispatch(createMeasurementChart());
    return await measurementChartService
      .createMeasurementChart(measurementChart)
      
      .then((response) => dispatch(createMeasurementChartSuccess(response)))
      .catch((error) => dispatch(createMeasurementChartError(error)));
  };
}

export function createMeasurementChart() {
  return {
    type: CREATE_MEASUREMENT_CHART,
  };
}

export function createMeasurementChartSuccess(success) {
  return {
    type: CREATE_MEASUREMENT_CHART_SUCCESS,
    payload: { success },
  };
}

export function createMeasurementChartError(error) {
  return {
    type: CREATE_MEASUREMENT_CHART_ERROR,
    payload: { error },
  };
}

export function updateMeasurementChartRecord(brand) {
  return async (dispatch) => {
    dispatch(updateMeasurementChart());
    return await measurementChartService
      .createMeasurementChart(brand)

      .then((response) => dispatch(updateMeasurementChartSuccess(response)))
      .catch((error) => dispatch(updateMeasurementChartError(error)));
  };
}

export function updateMeasurementChart() {
  return {
    type: UPDATE_MEASUREMENT_CHART,
  };
}

export function updateMeasurementChartSuccess(success) {
  return {
    type: UPDATE_MEASUREMENT_CHART_SUCCESS,
    payload: { success },
  };
}

export function updateMeasurementChartError(error) {
  return {
    type: UPDATE_MEASUREMENT_CHART_ERROR,
    payload: { error },
  };
}

export function deleteMeasurementChartRecord(id) {
  return async (dispatch) => {
    dispatch(deleteMeasurementChart());
    return await measurementChartService
      .deleteMeasurementChart(id)

      .then((response) => dispatch(deleteMeasurementChartSuccess(response)))
      .catch((error) => dispatch(deleteMeasurementChartError(error)));
  };
}

export function deleteMeasurementChart() {
  return {
    type: DELETE_MEASUREMENT_CHART,
  };
}

export function deleteMeasurementChartSuccess(success) {
  return {
    type: DELETE_MEASUREMENT_CHART_SUCCESS,
    payload: { success },
  };
}

export function deleteMeasurementChartError(error) {
  return {
    type: DELETE_MEASUREMENT_CHART_ERROR,
    payload: { error },
  };
}
