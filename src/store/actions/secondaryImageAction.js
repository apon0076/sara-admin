//////////////////////This is import for API Call/////////////
import secondaryImageService from "../services/secondaryImageService";

export const GET_SECONDARY_IMAGE = "GET_SECONDARY_IMAGE";
export const GET_SECONDARY_IMAGE_SUCCESS = "GET_SECONDARY_IMAGE_SUCCESS";
export const GET_SECONDARY_IMAGE_ERROR = "GET_SECONDARY_IMAGE_ERROR";

export const GET_SECONDARY_IMAGE_BY_ID = "GET_SECONDARY_IMAGE_BY_ID";
export const GET_SECONDARY_IMAGE_BY_ID_SUCCESS =
  "GET_SECONDARY_IMAGE_BY_ID_SUCCESS";
export const GET_SECONDARY_IMAGE_BY_ID_ERROR =
  "GET_SECONDARY_IMAGE_BY_ID_ERROR";

export const CREATE_SECONDARY_IMAGE = "CREATE_SECONDARY_IMAGE";
export const CREATE_SECONDARY_IMAGE_SUCCESS = "CREATE_SECONDARY_IMAGE_SUCCESS";
export const CREATE_SECONDARY_IMAGE_ERROR = "CREATE_SECONDARY_IMAGE_ERROR";

export const UPDATE_SECONDARY_IMAGE = "UPDATE_SECONDARY_IMAGE";
export const UPDATE_SECONDARY_IMAGE_SUCCESS = "UPDATE_SECONDARY_IMAGE_SUCCESS";
export const UPDATE_SECONDARY_IMAGE_ERROR = "UPDATE_SECONDARY_IMAGE_ERROR";

export const DELETE_SECONDARY_IMAGE = "DELETE_SECONDARY_IMAGE";
export const DELETE_SECONDARY_IMAGE_SUCCESS = "DELETE_SECONDARY_IMAGE_SUCCESS";
export const DELETE_SECONDARY_IMAGE_ERROR = "DELETE_SECONDARY_IMAGE_ERROR";

//////////////////End of Attribute Action Types/////////////////////////

export function getSecondaryImageRecord() {
  return async (dispatch) => {
    dispatch(getSecondaryImage());
    return await secondaryImageService
      .getSecondaryImage()

      .then((response) => dispatch(getSecondaryImageSuccess(response.data)))
      .catch((error) => dispatch(getSecondaryImageError(error)));
  };
}

export function getSecondaryImage() {
  return {
    type: GET_SECONDARY_IMAGE,
  };
}

export function getSecondaryImageSuccess(success) {
  return {
    type: GET_SECONDARY_IMAGE_SUCCESS,
    payload: { success },
  };
}

export function getSecondaryImageError(error) {
  return {
    type: GET_SECONDARY_IMAGE_ERROR,
    payload: { error },
  };
}

export function getSecondaryImageByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getSecondaryImageById());
    return await secondaryImageService
      .getSecondaryImageById(id)

      .then((response) => dispatch(getSecondaryImageByIdSuccess(response.data)))
      .catch((error) => dispatch(getSecondaryImageByIdError(error)));
  };
}

export function getSecondaryImageById() {
  return {
    type: GET_SECONDARY_IMAGE_BY_ID,
  };
}

export function getSecondaryImageByIdSuccess(success) {
  return {
    type: GET_SECONDARY_IMAGE_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getSecondaryImageByIdError(error) {
  return {
    type: GET_SECONDARY_IMAGE_BY_ID_ERROR,
    payload: { error },
  };
}

export function createSecondaryImageRecord(image) {
  return async (dispatch) => {
    dispatch(createSecondaryImage());
    return await secondaryImageService
      .createSecondaryImage(image)

      .then((response) => dispatch(createSecondaryImageSuccess(response.data)))
      .catch((error) => dispatch(createSecondaryImageError(error)));
  };
}

export function createSecondaryImage() {
  return {
    type: CREATE_SECONDARY_IMAGE,
  };
}

export function createSecondaryImageSuccess(success) {
  return {
    type: CREATE_SECONDARY_IMAGE_SUCCESS,
    payload: { success },
  };
}

export function createSecondaryImageError(error) {
  return {
    type: CREATE_SECONDARY_IMAGE_ERROR,
    payload: { error },
  };
}

export function updateSecondaryImageRecord(productImage) {
  return async (dispatch) => {
    dispatch(updateSecondaryImage());
    return await secondaryImageService
      .createSecondaryImage(productImage)
      
      .then((response) => dispatch(updateSecondaryImageSuccess(response.data)))
      .catch((error) => dispatch(updateSecondaryImageError(error)));
  };
}

export function updateSecondaryImage() {
  return {
    type: UPDATE_SECONDARY_IMAGE,
  };
}

export function updateSecondaryImageSuccess(success) {
  return {
    type: UPDATE_SECONDARY_IMAGE_SUCCESS,
    payload: { success },
  };
}

export function updateSecondaryImageError(error) {
  return {
    type: UPDATE_SECONDARY_IMAGE_ERROR,
    payload: { error },
  };
}

export function deleteSecondaryImageRecord(
  id,
  firstImageName,
  secondImageName,
  thirdImageName,
  fourthImageName
) {
  return async (dispatch) => {
    dispatch(deleteSecondaryImage());
    return await secondaryImageService
      .deleteSecondaryImage(
        id,
        firstImageName,
        secondImageName,
        thirdImageName,
        fourthImageName
      )

      .then((response) => dispatch(deleteSecondaryImageSuccess(response.data)))
      .catch((error) => dispatch(deleteSecondaryImageError(error)));
  };
}

export function deleteSecondaryImage() {
  return {
    type: DELETE_SECONDARY_IMAGE,
  };
}

export function deleteSecondaryImageSuccess(success) {
  return {
    type: DELETE_SECONDARY_IMAGE_SUCCESS,
    payload: { success },
  };
}

export function deleteSecondaryImageError(error) {
  return {
    type: DELETE_SECONDARY_IMAGE_ERROR,
    payload: { error },
  };
}
