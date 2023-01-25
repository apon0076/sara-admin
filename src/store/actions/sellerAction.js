import sellerService from "../services/sellerService";

import * as alertAction from "./alertAction";

export const GET_SELLER = "GET_SELLER";
export const GET_SELLER_SUCCESS = "GET_SELLER_SUCCESS";
export const GET_SELLER_ERROR = "GET_SELLER_ERROR";

export const GET_SELLER_BY_ID = "GET_SELLER_BY_ID";
export const GET_SELLER_BY_ID_SUCCESS = "GET_SELLER_BY_ID_SUCCESS";
export const GET_SELLER_BY_ID_ERROR = "GET_SELLER_BY_ID_ERROR";

export const CREATE_SELLER = "CREATE_SELLER";
export const CREATE_SELLER_SUCCESS = "CREATE_SELLER_SUCCESS";
export const CREATE_SELLER_ERROR = "CREATE_SELLER_ERROR";

export const UPDATE_SELLER = "UPDATE_SELLER";
export const UPDATE_SELLER_SUCCESS = "UPDATE_SELLER_SUCCESS";
export const UPDATE_SELLER_ERROR = "UPDATE_SELLER_ERROR";

export const DELETE_SELLER = "DELETE_SELLER";
export const DELETE_SELLER_SUCCESS = "DELETE_SELLER_SUCCESS";
export const DELETE_SELLER_ERROR = "DELETE_SELLER_ERROR";

export const GET_PENDING_SELLER = "GET_PENDING_SELLER";
export const GET_PENDING_SELLER_SUCCESS = "GET_PENDING_SELLER_SUCCESS";
export const GET_PENDING_SELLER_ERROR = "GET_PENDING_SELLER_ERROR";

export const GET_PENDING_SELLER_BY_ID = "GET_PENDING_SELLER_BY_ID";
export const GET_PENDING_SELLER_BY_ID_SUCCESS =
  "GET_PENDING_SELLER_BY_ID_SUCCESS";
export const GET_PENDING_SELLER_BY_ID_ERROR = "GET_PENDING_SELLER_BY_ID_ERROR";

export const SELLER_LOGIN = "SELLER_LOGIN";
export const SELLER_LOGIN_SUCCESS = "SELLER_LOGIN_SUCCESS";
export const SELLER_LOGIN_ERROR = "SELLER_LOGIN_ERROR";

export const SELLER_LOGOUT = "SELLER_LOGOUT";
export const SELLER_LOGOUT_SUCCESS = "SELLER_LOGOUT_SUCCESS";
export const SELLER_LOGOUT_ERROR = "SELLER_LOGOUT_ERROR";

export const AUTHENTICATE_SELLER = "AUTHENTICATE_SELLER";
export const AUTHENTICATE_SELLER_SUCCESS = "AUTHENTICATE_SELLER_SUCCESS";
export const AUTHENTICATE_SELLER_ERROR = "AUTHENTICATE_SELLER_ERROR";

export const DEAUTHENTICATE_SELLER = "DEAUTHENTICATE_SELLER";
export const DEAUTHENTICATE_SELLER_SUCCESS = "DEAUTHENTICATE_SELLER_SUCCESS";
export const DEAUTHENTICATE_SELLER_ERROR = "DEAUTHENTICATE_SELLER_ERROR";

export const APPROVE_SHOP = "APPROVE_SHOP";
export const APPROVE_SHOP_SUCCESS = "APPROVE_SHOP_SUCCESS";
export const APPROVE_SHOP_ERROR = "APPROVE_SHOP_ERROR";

export const REJECT_SHOP = "REJECT_SHOP";
export const REJECT_SHOP_SUCCESS = "REJECT_SHOP_SUCCESS";
export const REJECT_SHOP_ERROR = "REJECT_SHOP_ERROR";

export const GET_VERIFIED_SHOP = "GET_VERIFIED_SHOP";
export const GET_VERIFIED_SHOP_SUCCESS = "GET_VERIFIED_SHOP_SUCCESS";
export const GET_VERIFIED_SHOP_ERROR = "GET_VERIFIED_SHOP_ERROR";
export const GET_VERIFIED_SHOP_BY_ID = "GET_VERIFIED_SHOP_BY_ID";
export const GET_VERIFIED_SHOP_BY_ID_SUCCESS =
  "GET_VERIFIED_SHOP_BY_ID_SUCCESS";
export const GET_VERIFIED_SHOP_BY_ID_ERROR = "GET_VERIFIED_SHOP_BY_ID_ERROR";

export const SELLER_EMAIL_AVAILABLE = "SELLER_EMAIL_AVAILABLE";
export const SELLER_EMAIL_AVAILABLE_SUCCESS = "SELLER_EMAIL_AVAILABLE_SUCCESS";
export const SELLER_EMAIL_AVAILABLE_ERROR = "SELLER_EMAIL_AVAILABLE_ERROR";

export const SELLER_CONTACT_AVAILABLE = "SELLER_CONTACT_AVAILABLE";
export const SELLER_CONTACT_AVAILABLE_SUCCESS =
  "SELLER_CONTACT_AVAILABLE_SUCCESS";
export const SELLER_CONTACT_AVAILABLE_ERROR = "SELLER_CONTACT_AVAILABLE_ERROR";

export const CREATE_SELLER_TOKEN = "CREATE_SELLER_TOKEN";
export const CREATE_SELLER_TOKEN_SUCCESS = "CREATE_SELLER_TOKEN_SUCCESS";
export const CREATE_SELLER_TOKEN_ERROR = "CREATE_SELLER_TOKEN_ERROR";

export const SELLER_TOKEN_VERIFY = "SELLER_TOKEN_VERIFY";
export const SELLER_TOKEN_VERIFY_SUCCESS = "SELLER_TOKEN_VERIFY_SUCCESS";
export const SELLER_TOKEN_VERIFY_ERROR = "SELLER_TOKEN_VERIFY_ERROR";

export const SELLER_PASSWORD_RESET = "SELLER_PASSWORD_RESET";
export const SELLER_PASSWORD_RESET_SUCCESS = "SELLER_PASSWORD_RESET_SUCCESS";
export const SELLER_PASSWORD_RESET_ERROR = "SELLER_PASSWORD_RESET_ERROR";

export const GET_SELLER_RETURN_POLICY = "GET_SELLER_RETURN_POLICY";
export const GET_SELLER_RETURN_POLICY_SUCCESS =
  "GET_SELLER_RETURN_POLICY_SUCCESS";
export const GET_SELLER_RETURN_POLICY_ERROR = "GET_SELLER_RETURN_POLICY_ERROR";

export const ADD_OR_EDIT_SELLER_RETURN_POLICY =
  "ADD_OR_EDIT_SELLER_RETURN_POLICY";
export const ADD_OR_EDIT_SELLER_RETURN_POLICY_SUCCESS =
  "ADD_OR_EDIT_SELLER_RETURN_POLICY_SUCCESS";
export const ADD_OR_EDIT_SELLER_RETURN_POLICY_ERROR =
  "ADD_OR_EDIT_SELLER_RETURN_POLICY_ERROR";

export const GET_PENDING_SELLER_RETURN_POLICY =
  "GET_PENDING_SELLER_RETURN_POLICY";
export const GET_PENDING_SELLER_RETURN_POLICY_SUCCESS =
  "GET_PENDING_SELLER_RETURN_POLICY_SUCCESS";
export const GET_PENDING_SELLER_RETURN_POLICY_ERROR =
  "GET_PENDING_SELLER_RETURN_POLICY_ERROR";

export const GET_APPROVED_SELLER_RETURN_POLICY =
  "GET_APPROVED_SELLER_RETURN_POLICY";
export const GET_APPROVED_SELLER_RETURN_POLICY_SUCCESS =
  "GET_APPROVED_SELLER_RETURN_POLICY_SUCCESS";
export const GET_APPROVED_SELLER_RETURN_POLICY_ERROR =
  "GET_APPROVED_SELLER_RETURN_POLICY_ERROR";

export const GET_REJECTED_SELLER_RETURN_POLICY =
  "GET_REJECTED_SELLER_RETURN_POLICY";
export const GET_REJECTED_SELLER_RETURN_POLICY_SUCCESS =
  "GET_REJECTED_SELLER_RETURN_POLICY_SUCCESS";
export const GET_REJECTED_SELLER_RETURN_POLICY_ERROR =
  "GET_REJECTED_SELLER_RETURN_POLICY_ERROR";

export const GET_APPROVED_RETURN_POLICY_BY_SHOP_ID =
  "GET_APPROVED_RETURN_POLICY_BY_SHOP_ID";
export const GET_APPROVED_RETURN_POLICY_BY_SHOP_ID_SUCCESS =
  "GET_APPROVED_RETURN_POLICY_BY_SHOP_ID_SUCCESS";
export const GET_APPROVED_RETURN_POLICY_BY_SHOP_ID_ERROR =
  "GET_APPROVED_RETURN_POLICY_BY_SHOP_ID_ERROR";

export const POST_DELIVERY_STATUS = "POST_DELIVERY_STATUS";
export const POST_DELIVERY_STATUS_SUCCESS = "POST_DELIVERY_STATUS_SUCCESS";
export const POST_DELIVERY_STATUS_ERROR = "POST_DELIVERY_STATUS_ERROR";

export const GET_ALL_SELLER = "GET_ALL_SELLER";
export const GET_ALL_SELLER_SUCCESS = "GET_ALL_SELLER_SUCCESS";
export const GET_ALL_SELLER_ERROR = "GET_ALL_SELLER_ERROR";
//
export function getSellerRecord() {
  return async (dispatch) => {
    dispatch(getSeller());
    return await sellerService
      .getSeller()

      .then((response) => dispatch(getSellerSuccess(response.data)))
      .catch((error) => dispatch(getSellerError(error)));
  };
}

export function getSeller() {
  return {
    type: GET_SELLER,
  };
}

export function getSellerSuccess(success) {
  return {
    type: GET_SELLER_SUCCESS,
    payload: { success },
  };
}

export function getSellerError(error) {
  return {
    type: GET_SELLER_ERROR,
    payload: { error },
  };
}

//
export function getSellerByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getSellerById());
    return await sellerService
      .getSellerById(id)

      .then((response) => dispatch(getSellerByIdSuccess(response.data)))
      .catch((error) => dispatch(getSellerByIdError(error)));
  };
}

export function getSellerById() {
  return {
    type: GET_SELLER_BY_ID,
  };
}

export function getSellerByIdSuccess(success) {
  return {
    type: GET_SELLER_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getSellerByIdError(error) {
  return {
    type: GET_SELLER_BY_ID_ERROR,
    payload: { error },
  };
}

//
export function sellerTokenVerifyRecord(sellers) {
  return async (dispatch) => {
    dispatch(sellerTokenVerify());
    return await sellerService
      .sellerTokenVerify(sellers)

      .then((response) => dispatch(sellerTokenVerifySuccess(response)))
      .catch((error) => dispatch(sellerTokenVerifyError(error)));
  };
}

export function sellerTokenVerify() {
  return {
    type: SELLER_TOKEN_VERIFY,
  };
}

export function sellerTokenVerifySuccess(success) {
  return {
    type: SELLER_TOKEN_VERIFY_SUCCESS,
    payload: { success },
  };
}

export function sellerTokenVerifyError(error) {
  return {
    type: SELLER_TOKEN_VERIFY_ERROR,
    payload: { error },
  };
}

//
export function createSellerTokenRecord(sellers) {
  return async (dispatch) => {
    dispatch(createSellerToken());
    return await sellerService
      .createSellerToken(sellers)

      .then((response) => dispatch(createSellerTokenSuccess(response)))
      .catch((error) => dispatch(createSellerTokenError(error)));
  };
}

export function createSellerToken() {
  return {
    type: CREATE_SELLER_TOKEN,
  };
}

export function createSellerTokenSuccess(success) {
  //////debugger;
  return {
    type: CREATE_SELLER_TOKEN_SUCCESS,
    payload: { success },
  };
}

export function createSellerTokenError(error) {
  return {
    type: CREATE_SELLER_TOKEN_ERROR,
    payload: { error },
  };
}

//
export function createSellerRecord(sellers) {
  return async (dispatch) => {
    dispatch(createSeller());
    return await sellerService
      .createSeller(sellers)

      .then((response) => dispatch(createSellerSuccess(response)))
      .catch((error) => dispatch(createSellerError(error)));
  };
}

export function createSeller() {
  return {
    type: CREATE_SELLER,
  };
}

export function createSellerSuccess(success) {
  //////debugger;
  return {
    type: CREATE_SELLER_SUCCESS,
    payload: { success },
  };
}

export function createSellerError(error) {
  return {
    type: CREATE_SELLER_ERROR,
    payload: { error },
  };
}

//
export function updateSellerRecord(sellers) {
  return async (dispatch) => {
    dispatch(updateSeller());
    return await sellerService
      .createSeller(sellers)

      .then((response) => dispatch(updateSellerSuccess(response)))
      .catch((error) => dispatch(updateSellerError(error)));
  };
}

export function updateSeller() {
  return {
    type: UPDATE_SELLER,
  };
}

export function updateSellerSuccess(success) {
  return {
    type: UPDATE_SELLER_SUCCESS,
    payload: { success },
  };
}

export function updateSellerError(error) {
  return {
    type: UPDATE_SELLER_ERROR,
    payload: { error },
  };
}

//
export function deleteSellerRecord(id) {
  return async (dispatch) => {
    dispatch(deleteSeller());
    return await sellerService
      .deleteSeller(id)

      .then((response) => dispatch(deleteSellerSuccess(response)))
      .catch((error) => dispatch(deleteSellerError(error)));
  };
}

export function deleteSeller() {
  return {
    type: DELETE_SELLER,
  };
}

export function deleteSellerSuccess(success) {
  return {
    type: DELETE_SELLER_SUCCESS,
    payload: { success },
  };
}

export function deleteSellerError(error) {
  return {
    type: DELETE_SELLER_ERROR,
    payload: { error },
  };
}

//
export function getPendingSellerRecord() {
  ////////debugger;
  return async (dispatch) => {
    dispatch(getPendingSeller());
    return await sellerService
      .getPendingSeller()

      .then((response) => dispatch(getPendingSellerSuccess(response.data)))
      .catch((error) => dispatch(getPendingSellerError(error)));
  };
}

export function getPendingSeller() {
  return {
    type: GET_PENDING_SELLER,
  };
}

export function getPendingSellerSuccess(success) {
  return {
    type: GET_PENDING_SELLER_SUCCESS,
    payload: { success },
  };
}

export function getPendingSellerError(error) {
  return {
    type: GET_PENDING_SELLER_ERROR,
    payload: { error },
  };
}

//
export function getPendingSellerByIdRecord(shopId) {
  //////debugger;
  return async (dispatch) => {
    dispatch(getPendingSellerById());
    return await sellerService
      .getPendingSellerById(shopId)

      .then((response) => dispatch(getPendingSellerByIdSuccess(response.data)))
      .catch((error) => dispatch(getPendingSellerByIdError(error)));
  };
}

export function getPendingSellerById() {
  return {
    type: GET_PENDING_SELLER_BY_ID,
  };
}

export function getPendingSellerByIdSuccess(success) {
  return {
    type: GET_PENDING_SELLER_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getPendingSellerByIdError(error) {
  return {
    type: GET_PENDING_SELLER_BY_ID_ERROR,
    payload: { error },
  };
}

// SELLER LOGIN
//
// export function SellerLogInAuth(data) {
//   return (dispatch) => {
//     dispatch(sellerlogIn({}))
//   }
// }

export function SellerLogInAuth(data) {
  return async (dispatch) => {
    dispatch(sellerlogIn());
    return await sellerService
      .SellerLogInAuth(data)

      .then((response) => dispatch(sellerlogInSuccess(response)))
      .catch((error) => dispatch(sellerlogInError(error)));
  };
}

export function sellerlogIn() {
  return {
    type: SELLER_LOGIN,
  };
}

export function sellerlogInSuccess(success) {
  return {
    type: SELLER_LOGIN_SUCCESS,
    payload: { success },
  };
}

export function sellerlogInError(error) {
  return {
    type: SELLER_LOGIN_ERROR,
    payload: { error },
  };
}

// Seller Logout
///////////////////LOGOUT/////////////////////////////////
export function SellerLogOutAuth() {
  return (dispatch) => {
    dispatch(sellerlogOut({}));

    sellerService.deauthenticateSeller().then(
      (user) => {
        dispatch(sellerlogOutSuccess(user));
        localStorage.clear();
        window.location = "/SellerLogin";
        //history.push("/");

        // dispatch(alertAction.success("Logout Successfull"));
        //window.location.reload();
      },
      (error) => {
        dispatch(sellerlogOutError(error.toString()));
        dispatch(alertAction.error(error.toString()));
      }
    );
  };
}

export function sellerlogOut() {
  return {
    type: SELLER_LOGOUT,
  };
}

export function sellerlogOutSuccess(success) {
  return {
    type: SELLER_LOGOUT_SUCCESS,
    payload: { success },
  };
}

export function sellerlogOutError(error) {
  return {
    type: SELLER_LOGOUT_ERROR,
    payload: { error },
  };
}

// Authentic Seller
export function isAuthenticateSeller() {
  return async (dispatch) => {
    dispatch(authenticateSeller());
    return await sellerService
      .authenticateSeller()

      .then((response) => dispatch(authenticateSellerSuccess(response)))
      .catch((error) => dispatch(authenticateSellerError(error)));
  };
}

export function authenticateSeller() {
  return {
    type: AUTHENTICATE_SELLER,
  };
}

export function authenticateSellerSuccess(success) {
  return {
    type: AUTHENTICATE_SELLER_SUCCESS,
    payload: { success },
  };
}

export function authenticateSellerError(error) {
  return {
    type: AUTHENTICATE_SELLER_ERROR,
    payload: { error },
  };
}

// deAuthentic Seller
export function isDeAuthenticateSeller(userData) {
  return async (dispatch) => {
    dispatch(deAuthenticateSeller());
    return await sellerService
      .deAuthenticateSeller(userData)

      .then((response) => dispatch(deAuthenticateSellerSuccess(response)))
      .catch((error) => dispatch(deAuthenticateSellerError(error)));
  };
}

export function deAuthenticateSeller() {
  return {
    type: DEAUTHENTICATE_SELLER,
  };
}

export function deAuthenticateSellerSuccess(success) {
  return {
    type: DEAUTHENTICATE_SELLER_SUCCESS,
    payload: { success },
  };
}

export function deAuthenticateSellerError(error) {
  return {
    type: DEAUTHENTICATE_SELLER_ERROR,
    payload: { error },
  };
}

// Approve Shop
export function approveShopRecord(data) {
  return async (dispatch) => {
    dispatch(approveShop());
    return await sellerService
      .approveShop(data)

      .then((response) => dispatch(approveShopSuccess(response.data)))
      .catch((error) => dispatch(approveShopError(error)));
  };
}

export function approveShop() {
  return {
    type: APPROVE_SHOP,
  };
}

export function approveShopSuccess(success) {
  return {
    type: APPROVE_SHOP_SUCCESS,
    payload: { success },
  };
}

export function approveShopError(error) {
  return {
    type: APPROVE_SHOP_ERROR,
    payload: { error },
  };
}

// Reject Shop
export function rejectShopRecord(data) {
  return async (dispatch) => {
    dispatch(rejectShop());
    return await sellerService
      .rejectShop(data)

      .then((response) => dispatch(rejectShopSuccess(response.data)))
      .catch((error) => dispatch(rejectShopError(error)));
  };
}

export function rejectShop() {
  return {
    type: REJECT_SHOP,
  };
}

export function rejectShopSuccess(success) {
  return {
    type: REJECT_SHOP_SUCCESS,
    payload: { success },
  };
}

export function rejectShopError(error) {
  return {
    type: REJECT_SHOP_ERROR,
    payload: { error },
  };
}

//CommissionSeller

// export function commisionSellerReord(data) {
//   return async (dispatch) => {
//     dispatch(commisionSeller())
//     return await sellerService
//       .commisionSeller(data)

//       .then((response) => dispatch(commisionSellerSuccess(response.data)))
//       .catch((error) => dispatch(commisionSellerError(error)))
//   }
// }

// export function commisionSeller() {
//   return {
//     type: COMMISSION_SELLER,
//   }
// }

// export function commisionSellerSuccess(success) {
//   return {
//     type: COMMISSION_SELLER_SUCCESS,
//     payload: { success },
//   }
// }

// export function commisionSellerError(error) {
//   return {
//     type: COMMISSION_SELLER_ERROR,
//     payload: { error },
//   }
// }

// Verified Shop
export function getVerifiedShopRecord() {
  //////debugger;
  return async (dispatch) => {
    dispatch(getVerifiedShop());
    return await sellerService
      .getVerifiedShop()

      .then((response) => dispatch(getVerifiedShopSuccess(response.data)))
      .catch((error) => dispatch(getVerifiedShopError(error)));
  };
}

export function getVerifiedShop() {
  return {
    type: GET_VERIFIED_SHOP,
  };
}

export function getVerifiedShopSuccess(success) {
  return {
    type: GET_VERIFIED_SHOP_SUCCESS,
    payload: { success },
  };
}

export function getVerifiedShopError(error) {
  return {
    type: GET_VERIFIED_SHOP_ERROR,
    payload: { error },
  };
}

//Verified Shop by ID
export function getVerifiedShopByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getVerifiedShopById());
    return await sellerService
      .getVerifiedShopById(id)

      .then((response) => dispatch(getVerifiedShopByIdSuccess(response.data)))
      .catch((error) => dispatch(getVerifiedShopByIdError(error)));
  };
}

export function getVerifiedShopById() {
  return {
    type: GET_VERIFIED_SHOP_BY_ID,
  };
}

export function getVerifiedShopByIdSuccess(success) {
  return {
    type: GET_VERIFIED_SHOP_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getVerifiedShopByIdError(error) {
  return {
    type: GET_VERIFIED_SHOP_BY_ID_ERROR,
    payload: { error },
  };
}

////
export function sellerEmailAvailableRecord(data) {
  return async (dispatch) => {
    dispatch(sellerEmailAvailable());
    return await sellerService
      .checkEmailAvailable(data)

      .then((response) => dispatch(sellerEmailAvailableSuccess(response)))
      .catch((error) => dispatch(sellerEmailAvailableError(error)));
  };
}

export function sellerEmailAvailable() {
  return {
    type: SELLER_EMAIL_AVAILABLE,
  };
}

export function sellerEmailAvailableSuccess(success) {
  return {
    type: SELLER_EMAIL_AVAILABLE_SUCCESS,
    payload: { success },
  };
}

export function sellerEmailAvailableError(error) {
  return {
    type: SELLER_EMAIL_AVAILABLE_ERROR,
    payload: { error },
  };
}

////
export function sellerMobileNumberAvailableRecord(data) {
  return async (dispatch) => {
    dispatch(sellerMobileNumberAvailable());
    return await sellerService
      .checkMobileNumberAvailable(data)

      .then((response) =>
        dispatch(sellerMobileNumberAvailableSuccess(response))
      )
      .catch((error) => dispatch(sellerMobileNumberAvailableError(error)));
  };
}

export function sellerMobileNumberAvailable() {
  return {
    type: SELLER_CONTACT_AVAILABLE,
  };
}

export function sellerMobileNumberAvailableSuccess(success) {
  return {
    type: SELLER_CONTACT_AVAILABLE_SUCCESS,
    payload: { success },
  };
}

export function sellerMobileNumberAvailableError(error) {
  return {
    type: SELLER_CONTACT_AVAILABLE_ERROR,
    payload: { error },
  };
}

//CREATE TOKEN
//
export function createTokenRecord(sellers) {
  return async (dispatch) => {
    dispatch(createToken());
    return await sellerService
      .createSellerToken(sellers)

      .then((response) => dispatch(createTokenSuccess(response)))
      .catch((error) => dispatch(createTokenError(error)));
  };
}

export function createToken() {
  return {
    type: CREATE_SELLER_TOKEN,
  };
}

export function createTokenSuccess(success) {
  return {
    type: CREATE_SELLER_TOKEN_SUCCESS,
    payload: { success },
  };
}

export function createTokenError(error) {
  return {
    type: CREATE_SELLER_TOKEN_ERROR,
    payload: { error },
  };
}

//TOKEN VERIFY
export function TokenVerifyRecord(data) {
  return async (dispatch) => {
    dispatch(TokenVerify());
    return await sellerService
      .tokenVerify(data)

      .then((response) => dispatch(TokenVerifySuccess(response)))
      .catch((error) => dispatch(TokenVerifyError(error)));
  };
}

export function TokenVerify() {
  return {
    type: SELLER_TOKEN_VERIFY,
  };
}

export function TokenVerifySuccess(success) {
  return {
    type: SELLER_TOKEN_VERIFY_SUCCESS,
    payload: { success },
  };
}

export function TokenVerifyError(error) {
  return {
    type: SELLER_TOKEN_VERIFY_ERROR,
    payload: { error },
  };
}

//PASSWORD RESET
export function PasswordResetRecord(data) {
  return async (dispatch) => {
    dispatch(passwordReset());
    return await sellerService
      .passwordReset(data)

      .then((response) => dispatch(passwordResetSuccess(response)))
      .catch((error) => dispatch(passwordResetError(error)));
  };
}

export function passwordReset() {
  return {
    type: SELLER_PASSWORD_RESET,
  };
}

export function passwordResetSuccess(success) {
  return {
    type: SELLER_PASSWORD_RESET_SUCCESS,
    payload: { success },
  };
}

export function passwordResetError(error) {
  return {
    type: SELLER_PASSWORD_RESET_ERROR,
    payload: { error },
  };
}

//
export function getSellerReturnPolicyRecord(sellerId) {
  return async (dispatch) => {
    dispatch(getSellerReturnPolicy());
    return await sellerService
      .getSellerReturnPolicy(sellerId)

      .then((response) => dispatch(getSellerReturnPolicySuccess(response.data)))
      .catch((error) => dispatch(getSellerReturnPolicyError(error)));
  };
}

export function getSellerReturnPolicy() {
  return {
    type: GET_SELLER_RETURN_POLICY,
  };
}

export function getSellerReturnPolicySuccess(success) {
  return {
    type: GET_SELLER_RETURN_POLICY_SUCCESS,
    payload: { success },
  };
}

export function getSellerReturnPolicyError(error) {
  return {
    type: GET_SELLER_RETURN_POLICY_ERROR,
    payload: { error },
  };
}
//
export function addOrEditSellerReturnPolicyRecord(data) {
  return async (dispatch) => {
    dispatch(addOrEditSellerReturnPolicy());
    return await sellerService
      .addOrEditSellerReturnPolicy(data)

      .then((response) =>
        dispatch(addOrEditSellerReturnPolicySuccess(response.data))
      )
      .catch((error) => dispatch(addOrEditSellerReturnPolicyError(error)));
  };
}

export function addOrEditSellerReturnPolicy() {
  return {
    type: ADD_OR_EDIT_SELLER_RETURN_POLICY,
  };
}

export function addOrEditSellerReturnPolicySuccess(success) {
  return {
    type: ADD_OR_EDIT_SELLER_RETURN_POLICY_SUCCESS,
    payload: { success },
  };
}

export function addOrEditSellerReturnPolicyError(error) {
  return {
    type: ADD_OR_EDIT_SELLER_RETURN_POLICY_ERROR,
    payload: { error },
  };
}

//
export function getPendingSellerReturnPolicyRecord() {
  return async (dispatch) => {
    dispatch(getPendingSellerReturnPolicy());
    return await sellerService
      .getReturnPolicy("N")

      .then((response) =>
        dispatch(getPendingSellerReturnPolicySuccess(response.data))
      )
      .catch((error) => dispatch(getPendingSellerReturnPolicyError(error)));
  };
}

export function getPendingSellerReturnPolicy() {
  return {
    type: GET_PENDING_SELLER_RETURN_POLICY,
  };
}

export function getPendingSellerReturnPolicySuccess(success) {
  return {
    type: GET_PENDING_SELLER_RETURN_POLICY_SUCCESS,
    payload: { success },
  };
}

export function getPendingSellerReturnPolicyError(error) {
  return {
    type: GET_PENDING_SELLER_RETURN_POLICY_ERROR,
    payload: { error },
  };
}
//
export function getApprovedSellerReturnPolicyRecord() {
  return async (dispatch) => {
    dispatch(getApprovedSellerReturnPolicy());
    return await sellerService
      .getReturnPolicy("Y")

      .then((response) =>
        dispatch(getApprovedSellerReturnPolicySuccess(response.data))
      )
      .catch((error) => dispatch(getApprovedSellerReturnPolicyError(error)));
  };
}

export function getApprovedSellerReturnPolicy() {
  return {
    type: GET_APPROVED_SELLER_RETURN_POLICY,
  };
}

export function getApprovedSellerReturnPolicySuccess(success) {
  return {
    type: GET_APPROVED_SELLER_RETURN_POLICY_SUCCESS,
    payload: { success },
  };
}

export function getApprovedSellerReturnPolicyError(error) {
  return {
    type: GET_APPROVED_SELLER_RETURN_POLICY_ERROR,
    payload: { error },
  };
}
//
export function getRejectedSellerReturnPolicyRecord() {
  return async (dispatch) => {
    dispatch(getRejectedSellerReturnPolicy());
    return await sellerService
      .getReturnPolicy("R")

      .then((response) =>
        dispatch(getRejectedSellerReturnPolicySuccess(response.data))
      )
      .catch((error) => dispatch(getRejectedSellerReturnPolicyError(error)));
  };
}

export function getRejectedSellerReturnPolicy() {
  return {
    type: GET_REJECTED_SELLER_RETURN_POLICY,
  };
}

export function getRejectedSellerReturnPolicySuccess(success) {
  return {
    type: GET_REJECTED_SELLER_RETURN_POLICY_SUCCESS,
    payload: { success },
  };
}

export function getRejectedSellerReturnPolicyError(error) {
  return {
    type: GET_REJECTED_SELLER_RETURN_POLICY_ERROR,
    payload: { error },
  };
}
//
export function getApprovedReturnPolicyByShopIdRecord(shopId) {
  return async (dispatch) => {
    dispatch(getApprovedReturnPolicyByShopId());
    return await sellerService
      .getApprovedReturnPolicyByShopId(shopId)

      .then((response) =>
        dispatch(getApprovedReturnPolicyByShopIdSuccess(response.data))
      )
      .catch((error) => dispatch(getApprovedReturnPolicyByShopIdError(error)));
  };
}

export function getApprovedReturnPolicyByShopId() {
  return {
    type: GET_APPROVED_RETURN_POLICY_BY_SHOP_ID,
  };
}

export function getApprovedReturnPolicyByShopIdSuccess(success) {
  return {
    type: GET_APPROVED_RETURN_POLICY_BY_SHOP_ID_SUCCESS,
    payload: { success },
  };
}

export function getApprovedReturnPolicyByShopIdError(error) {
  return {
    type: GET_APPROVED_RETURN_POLICY_BY_SHOP_ID_ERROR,
    payload: { error },
  };
}

///

export function deliveryStatusChangeRecord(id, status) {
  return async (dispatch) => {
    dispatch(createToken());
    return await sellerService
      .deliveryStatusChange(id, status)

      .then((response) => dispatch(deliveryStatusChangeSuccess(response)))
      .catch((error) => dispatch(deliveryStatusChangeError(error)));
  };
}

export function deliveryStatusChange() {
  return {
    type: POST_DELIVERY_STATUS,
  };
}

export function deliveryStatusChangeSuccess(success) {
  return {
    type: POST_DELIVERY_STATUS_SUCCESS,
    payload: { success },
  };
}

export function deliveryStatusChangeError(error) {
  return {
    type: POST_DELIVERY_STATUS_ERROR,
    payload: { error },
  };
}

// Get All Seller Start
export function getAllSellerRecord() {
  return async (dispatch) => {
    dispatch(getAllSeller());
    return await sellerService
      .getAllSeller()

      .then((response) => dispatch(getAllSellerSuccess(response)))
      .catch((error) => dispatch(getAllSellerError(error)));
  };
}

export function getAllSeller() {
  return {
    type: GET_ALL_SELLER,
  };
}

export function getAllSellerSuccess(success) {
  return {
    type: GET_ALL_SELLER_SUCCESS,
    payload: { success },
  };
}

export function getAllSellerError(error) {
  return {
    type: GET_ALL_SELLER_ERROR,
    payload: { error },
  };
}
// Get All Seller End
