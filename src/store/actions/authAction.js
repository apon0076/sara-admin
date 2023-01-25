import authService from "../services/authService";
import * as alertAction from "./alertAction";

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const REGISTRATION = "REGISTRATION";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_ERROR = "REGISTRATION_ERROR";

export const RESET_PASSWORD = "RESET_PASSWORD";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";

export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const AUTHENTICATE_USER_SUCCESS = "AUTHENTICATE_USER_SUCCESS";
export const AUTHENTICATE_USER_ERROR = "RESET_PASSWORD_ERROR";

export const DEAUTHENTICATE_USER = "DEAUTHENTICATE_USER";
export const DEAUTHENTICATE_USER_SUCCESS = "DEAUTHENTICATE_USER_SUCCESS";
export const DEAUTHENTICATE_USER_ERROR = "DEAUTHENTICATE_USER_ERROR";

export const CREATE_OR_UPDATE_NEW_ADMIN = "CREATE_OR_UPDATE_NEW_ADMIN";
export const CREATE_OR_UPDATE_NEW_ADMIN_SUCCESS =
  "CREATE_OR_UPDATE_NEW_ADMIN_SUCCESS";
export const CREATE_OR_UPDATE_NEW_ADMIN_ERROR =
  "CREATE_OR_UPDATE_NEW_ADMIN_ERROR";

export const GET_ADMIN = "GET_ADMIN";
export const GET_ADMIN_SUCCESS = "GET_ADMIN_SUCCESS";
export const GET_ADMIN_ERROR = "GET_ADMIN_ERROR";

export const CREATE_TOKEN = "CREATE_TOKEN";
export const CREATE_TOKEN_SUCCESS = "CREATE_TOKEN_SUCCESS";
export const CREATE_TOKEN_ERROR = "CREATE_TOKEN_ERROR";

export const TOKEN_VERIFY = "TOKEN_VERIFY";
export const TOKEN_VERIFY_SUCCESS = "TOKEN_VERIFY_SUCCESS";
export const TOKEN_VERIFY_ERROR = "TOKEN_VERIFY_ERROR";

export const PASSWORD_RESET = "PASSWORD_RESET";
export const PASSWORD_RESET_SUCCESS = "PASSWORD_RESET_SUCCESS";
export const PASSWORD_RESET_ERROR = "PASSWORD_RESET_ERROR";

//Login
export function LogInAuth(data) {
  return async (dispatch) => {
    dispatch(logIn());
    return await authService
      .LogInAuth(data)

      .then((response) => dispatch(logInSuccess(response)))
      .catch((error) => dispatch(logInError(error)));
  };
}

export function logIn() {
  return {
    type: LOGIN,
  };
}

export function logInSuccess(success) {
  return {
    type: LOGIN_SUCCESS,
    payload: { success },
  };
}

export function logInError(error) {
  return {
    type: LOGIN_ERROR,
    payload: { error },
  };
}

//Logout
export function LogOutAuth() {
  return (dispatch) => {
    dispatch(logOut({}));

    authService.deauthenticateUser().then(
      (user) => {
        dispatch(logOutSuccess(user));
        localStorage.clear();
        window.location = "/Login";
      },
      (error) => {
        dispatch(logOutError(error.toString()));
        dispatch(alertAction.error(error.toString()));
      }
    );
  };
}

export function logOut() {
  return {
    type: LOGOUT,
  };
}

export function logOutSuccess(success) {
  return {
    type: LOGOUT_SUCCESS,
    payload: { success },
  };
}

export function logOutError(error) {
  return {
    type: LOGOUT_ERROR,
    payload: { error },
  };
}

//Registration
export function RegistrationAuth(userData) {
  return (dispatch) => {
    dispatch(Registration({}));

    authService.signUpAuth(userData).then(
      (userData) => {
        dispatch(RegistrationSuccess(userData));
        dispatch(alertAction.success("Registration Successfull"));
      },
      (error) => {
        dispatch(RegistrationError(error.toString()));
        dispatch(alertAction.error(error.toString()));
      }
    );
  };
}

export function Registration() {
  return {
    type: REGISTRATION,
  };
}

export function RegistrationSuccess(success) {
  return {
    type: REGISTRATION_SUCCESS,
    payload: { success },
  };
}

export function RegistrationError(error) {
  return {
    type: REGISTRATION_ERROR,
    payload: { error },
  };
}

//CreateToken
export function CreateTokenRecord(data) {
  return async (dispatch) => {
    dispatch(createToken());
    return await authService
      .createToken(data)

      .then((response) => dispatch(createTokenSuccess(response)))
      .catch((error) => dispatch(createTokenError(error)));
  };
}

export function createToken() {
  return {
    type: CREATE_TOKEN,
  };
}

export function createTokenSuccess(success) {
  return {
    type: CREATE_TOKEN_SUCCESS,
    payload: { success },
  };
}

export function createTokenError(error) {
  return {
    type: CREATE_TOKEN_ERROR,
    payload: { error },
  };
}

//TokenVerify
export function TokenVerifyRecord(data) {
  return async (dispatch) => {
    dispatch(TokenVerify());
    return await authService
      .tokenVerify(data)

      .then((response) => dispatch(TokenVerifySuccess(response)))
      .catch((error) => dispatch(TokenVerifyError(error)));
  };
}

export function TokenVerify() {
  return {
    type: TOKEN_VERIFY,
  };
}

export function TokenVerifySuccess(success) {
  return {
    type: TOKEN_VERIFY_SUCCESS,
    payload: { success },
  };
}

export function TokenVerifyError(error) {
  return {
    type: TOKEN_VERIFY_ERROR,
    payload: { error },
  };
}

//PasswordReset
export function ResetPasswordRecord(data) {
  return async (dispatch) => {
    dispatch(passwordReset());
    return await authService
      .passwordReset(data)

      .then((response) => dispatch(passwordResetSuccess(response)))
      .catch((error) => dispatch(passwordResetError(error)));
  };
}

export function passwordReset() {
  return {
    type: PASSWORD_RESET,
  };
}

export function passwordResetSuccess(success) {
  return {
    type: PASSWORD_RESET_SUCCESS,
    payload: { success },
  };
}

export function passwordResetError(error) {
  return {
    type: PASSWORD_RESET_ERROR,
    payload: { error },
  };
}

//Authenticate
export function isAuthenticateUser() {
  return async (dispatch) => {
    dispatch(authenticateUser());
    return await authService
      .authenticateUser()

      .then((response) => dispatch(authenticateUserSuccess(response)))
      .catch((error) => dispatch(authenticateUserError(error)));
  };
}

export function authenticateUser() {
  return {
    type: AUTHENTICATE_USER,
  };
}

export function authenticateUserSuccess(success) {
  return {
    type: AUTHENTICATE_USER_SUCCESS,
    payload: { success },
  };
}

export function authenticateUserError(error) {
  return {
    type: AUTHENTICATE_USER_ERROR,
    payload: { error },
  };
}

//DeAuthenticate
export function isDeAuthenticateUser(userData) {
  return async (dispatch) => {
    dispatch(deAuthenticateUser());
    return await authService
      .deAuthenticateUser(userData)

      .then((response) => dispatch(deAuthenticateUserSuccess(response)))
      .catch((error) => dispatch(deAuthenticateUserError(error)));
  };
}

export function deAuthenticateUser() {
  return {
    type: DEAUTHENTICATE_USER,
  };
}

export function deAuthenticateUserSuccess(success) {
  return {
    type: DEAUTHENTICATE_USER_SUCCESS,
    payload: { success },
  };
}

export function deAuthenticateUserError(error) {
  return {
    type: DEAUTHENTICATE_USER_ERROR,
    payload: { error },
  };
}

//create Or Update New Admin Record
export function createOrUpdateNewAdminRecord(userData) {
  return async (dispatch) => {
    dispatch(createOrUpdateNewAdmin(userData));
    return await authService
      .createOrUpdateNewAdmin(userData)

      .then((response) =>
        dispatch(createOrUpdateNewAdminSuccess(response.data))
      )
      .catch((error) => dispatch(createOrUpdateNewAdminError(error)));
  };
}

export function createOrUpdateNewAdmin() {
  return {
    type: CREATE_OR_UPDATE_NEW_ADMIN,
  };
}

export function createOrUpdateNewAdminSuccess(success) {
  return {
    type: CREATE_OR_UPDATE_NEW_ADMIN_SUCCESS,
    payload: { success },
  };
}

export function createOrUpdateNewAdminError(error) {
  return {
    type: CREATE_OR_UPDATE_NEW_ADMIN_ERROR,
    payload: { error },
  };
}

//Admin
export function getAdminRecord() {
  return async (dispatch) => {
    dispatch(getAdmin());
    return await authService
      .getAdmin()

      .then((response) => dispatch(getAdminSuccess(response.data)))
      .catch((error) => dispatch(getAdminError(error)));
  };
}

export function getAdmin() {
  return {
    type: GET_ADMIN,
  };
}

export function getAdminSuccess(success) {
  return {
    type: GET_ADMIN_SUCCESS,
    payload: { success },
  };
}

export function getAdminError(error) {
  return {
    type: GET_ADMIN_ERROR,
    payload: { error },
  };
}
