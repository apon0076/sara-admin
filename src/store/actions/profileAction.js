import profileService from "../services/profileService";

export const GET_PROFILE = "GET_PROFILE";
export const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
export const GET_PROFILE_ERROR = "GET_PROFILE_ERROR";

export const GET_PROFILE_BY_ID = "GET_PROFILE_BY_ID";
export const GET_PROFILE_BY_ID_SUCCESS = "GET_PROFILE_BY_ID_SUCCESS";
export const GET_PROFILE_BY_ID_ERROR = "GET_PROFILE_BY_ID_ERROR";

export const CREATE_PROFILE = "CREATE_PROFILE";
export const CREATE_PROFILE_SUCCESS = "CREATE_PROFILE_SUCCESS";
export const CREATE_PROFILE_ERROR = "CREATE_PROFILE_ERROR";

export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_ERROR = "UPDATE_PROFILE_ERROR";

export const UPDATE_ADMIN_PASSWORD = "UPDATE_ADMIN_PASSWORD";
export const UPDATE_ADMIN_PASSWORD_SUCCESS = "UPDATE_ADMIN_PASSWORD_SUCCESS";
export const UPDATE_ADMIN_PASSWORD_ERROR = "UPDATE_ADMIN_PASSWORD_ERROR";

//////////////////END OF PROFILE ACTION TYPES/////////////////////////
 
export function getProfileRecord() {
  //////debugger;
  return async (dispatch) => {
    dispatch(getProfile());
    return await profileService
      .getProfile()

      .then((response) => dispatch(getProfileSuccess(response.data)))
      .catch((error) => dispatch(getProfileError(error)));
  };
}

export function getProfile() {
  return {
    type: GET_PROFILE,
  };
}

export function getProfileSuccess(success) {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: { success },
  };
}

export function getProfileError(error) {
  return {
    type: GET_PROFILE_ERROR,
    payload: { error },
  };
}

export function getProfileByIdRecord(userId) {
  //////debugger;
  return async (dispatch) => {
    dispatch(getProfileById());
    return await profileService
      .getProfileById(userId)

      .then((response) => dispatch(getProfileByIdSuccess(response.data)))
      .catch((error) => dispatch(getProfileByIdError(error)));
  };
}

//////debugger;
export function getProfileById() {
  return {
    type: GET_PROFILE_BY_ID,
  };
}

//////debugger;
export function getProfileByIdSuccess(success) {
  return {
    type: GET_PROFILE_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getProfileByIdError(error) {
  return {
    type: GET_PROFILE_BY_ID_ERROR,
    payload: { error },
  };
}

export function createProfileRecord(profiles) {
  return async (dispatch) => {
    dispatch(createProfile());
    return await profileService
      .createProfile(profiles)

      .then((response) => dispatch(createProfileSuccess(response)))
      .catch((error) => dispatch(createProfileError(error)));
  };
}

export function createProfile() {
  return {
    type: CREATE_PROFILE,
  };
}

export function createProfileSuccess(success) {
  return {
    type: CREATE_PROFILE_SUCCESS,
    payload: { success },
  };
}

export function createProfileError(error) {
  return {
    type: CREATE_PROFILE_ERROR,
    payload: { error },
  };
}

export function updateProfileRecord(profiles) {
  return async (dispatch) => {
    dispatch(updateProfile());
    return await profileService
      .createProfile(profiles)

      .then((response) => dispatch(updateProfileSuccess(response)))
      .catch((error) => dispatch(updateProfileError(error)));
  };
}

export function updateProfile() {
  return {
    type: UPDATE_PROFILE,
  };
}

export function updateProfileSuccess(success) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload: { success },
  };
}

export function updateProfileError(error) {
  return {
    type: UPDATE_PROFILE_ERROR,
    payload: { error },
  };
}

//
export function updateAdminPasswordRecord(data) {
  return async (dispatch) => {
    dispatch(updateAdminPassword());
    return await profileService
      .updateAdminPassword(data)
      
      .then((response) => dispatch(updateAdminPasswordSuccess(response)))
      .catch((error) => dispatch(updateAdminPasswordError(error)));
  };
}

export function updateAdminPassword() {
  return {
    type: UPDATE_ADMIN_PASSWORD,
  };
}

export function updateAdminPasswordSuccess(success) {
  return {
    type: UPDATE_ADMIN_PASSWORD_SUCCESS,
    payload: { success },
  };
}

export function updateAdminPasswordError(error) {
  return {
    type: UPDATE_ADMIN_PASSWORD_ERROR,
    payload: { error },
  };
}
