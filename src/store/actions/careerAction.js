//This is import for API Call
import careerService from "../services/careerService";

export const POST_JOB_CIRCULAR = " POST_JOB_CIRCULAR";
export const POST_JOB_CIRCULAR_SUCCESS = " POST_JOB_CIRCULAR_SUCCESS";
export const POST_JOB_CIRCULAR_ERROR = " POST_JOB_CIRCULAR_ERROR";
export const POST_JOB_CIRCULAR_RESET = " POST_JOB_CIRCULAR_RESET";
export const GET_CIRCULAR_LIST = " GET_CIRCULAR_LIST";
export const GET_CIRCULAR_LIST_SUCCESS = " GET_CIRCULAR_LIST_SUCCESS";
export const GET_CIRCULAR_LIST_ERROR = " GET_CIRCULAR_LIST_ERROR";
export const GET_CIRCULAR_LIST_RESET = " GET_CIRCULAR_LIST_RESET";
export const GET_SINGLE_CIRCULAR = " GET_SINGLE_CIRCULAR";
export const GET_SINGLE_CIRCULAR_SUCCESS = " GET_SINGLE_CIRCULAR_SUCCESS";
export const GET_SINGLE_CIRCULAR_ERROR = " GET_SINGLE_CIRCULAR_ERROR";
export const GET_SINGLE_CIRCULAR_RESET = " GET_SINGLE_CIRCULAR_RESET";

export const GET_APPLICANT = " GET_APPLICANT";
export const GET_APPLICANT_SUCCESS = " GET_APPLICANT_SUCCESS";
export const GET_APPLICANT_ERROR = " GET_APPLICANT_ERROR";
export const GET_APPLICANT_RESET = " GET_APPLICANT_RESET";
//END OF CAREER ACTION TYPES

// Post Job Circular Start
export function postJobCircularRecord(data) {
  return async (dispatch) => {
    dispatch(postJobCircular());
    return await careerService
      .postJobCircular(data)
      .then((response) => dispatch(postJobCircularSuccess(response)))
      .catch((error) => dispatch(postJobCircularError(error)));
  };
}
export function postJobCircular() {
  return {
    type: POST_JOB_CIRCULAR,
  };
}
export function postJobCircularSuccess(success) {
  return {
    type: POST_JOB_CIRCULAR_SUCCESS,
    payload: { success },
  };
}
export function postJobCircularError(error) {
  return {
    type: POST_JOB_CIRCULAR_ERROR,
    payload: { error },
  };
}
// Post Job Circular End

// List of Job Circular Start
export function listOfJobCircularRecord(
  startDate,
  endDate,
  position,
  isActive,
  currentPage,
  itemPerPage
) {
  return async (dispatch) => {
    dispatch(listOfJobCircular());
    return await careerService
      .listOfJobCircular(
        startDate,
        endDate,
        position,
        isActive,
        currentPage,
        itemPerPage
      )
      .then((response) => dispatch(listOfJobCircularSuccess(response)))
      .catch((error) => dispatch(listOfJobCircularError(error)));
  };
}
export function listOfJobCircular() {
  return {
    type: GET_CIRCULAR_LIST,
  };
}
export function listOfJobCircularSuccess(success) {
  return {
    type: GET_CIRCULAR_LIST_SUCCESS,
    payload: { success },
  };
}
export function listOfJobCircularError(error) {
  return {
    type: GET_CIRCULAR_LIST_ERROR,
    payload: { error },
  };
}
// List of Job Circular End

// Single Job Circular Start
export function singleJobCircularRecord(data) {
  return async (dispatch) => {
    dispatch(singleJobCircular());
    return await careerService
      .singleJobCircular(data)
      .then((response) => dispatch(singleJobCircularSuccess(response)))
      .catch((error) => dispatch(singleJobCircularError(error)));
  };
}
export function singleJobCircular() {
  return {
    type: GET_SINGLE_CIRCULAR,
  };
}
export function singleJobCircularSuccess(success) {
  return {
    type: GET_SINGLE_CIRCULAR_SUCCESS,
    payload: { success },
  };
}
export function singleJobCircularError(error) {
  return {
    type: GET_SINGLE_CIRCULAR_ERROR,
    payload: { error },
  };
}
// Single Job Circular End

// Get Applicant List Start
export function getApplicantListRecord(
  startDate,
  endDate,
  id,
  position,
  name,
  phone,
  email,
  currentPage,
  itemPerPage
) {
  return async (dispatch) => {
    dispatch(getApplicantList());
    return await careerService
      .getApplicantList(
        startDate,
        endDate,
        id,
        position,
        name,
        phone,
        email,
        currentPage,
        itemPerPage
      )
      .then((response) => dispatch(getApplicantListSuccess(response)))
      .catch((error) => dispatch(getApplicantListError(error)));
  };
}
export function getApplicantList() {
  return {
    type: GET_APPLICANT,
  };
}
export function getApplicantListSuccess(success) {
  return {
    type: GET_APPLICANT_SUCCESS,
    payload: { success },
  };
}
export function getApplicantListError(error) {
  return {
    type: GET_APPLICANT_ERROR,
    payload: { error },
  };
}
// Get Applicant List End
