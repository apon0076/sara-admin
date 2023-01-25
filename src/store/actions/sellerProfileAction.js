import sellerProfileService from "../services/sellerProfileService"

export const CREATE_SELLER_PROFILE = "CREATE_SELLER_PROFILE"
export const CREATE_SELLER_PROFILE_SUCCESS = "CREATE_SELLER_PROFILE_SUCCESS"
export const CREATE_SELLER_PROFILE_ERROR = "CREATE_SELLER_PROFILE_ERROR"

export const GET_SELLER_PROFILE = "GET_SELLER_PROFILE"
export const GET_SELLER_PROFILE_SUCCESS = "GET_SELLER_PROFILE_SUCCESS"
export const GET_SELLER_PROFILE_ERROR = "GET_SELLER_PROFILE_ERROR"

export const GET_SELLER_PROFILE_BY_ID = "GET_SELLER_PROFILE_BY_ID"
export const GET_SELLER_PROFILE_BY_ID_SUCCESS =
  "GET_SELLER_PROFILE_BY_ID_SUCCESS"
export const GET_SELLER_PROFILE_BY_ID_ERROR = "GET_SELLER_PROFILE_BY_ID_ERROR"

export const UPDATE_SELLER_PROFILE = "UPDATE_SELLER_PROFILE"
export const UPDATE_SELLER_PROFILE_SUCCESS = "UPDATE_SELLER_PROFILE_SUCCESS"
export const UPDATE_SELLER_PROFILE_ERROR = "UPDATE_SELLER_PROFILE_ERROR"

export const UPDATE_SELLER_SHOP_PROFILE = "UPDATE_SELLER_SHOP_PROFILE"
export const UPDATE_SELLER_SHOP_PROFILE_SUCCESS =
  "UPDATE_SELLER_SHOP_PROFILE_SUCCESS"
export const UPDATE_SELLER_SHOP_PROFILE_ERROR =
  "UPDATE_SELLER_SHOP_PROFILE_ERROR"

export const UPDATE_SHOP = "UPDATE_SHOP_PROFILE"
export const UPDATE_SHOP_SUCCESS = "UPDATE_SHOP_SUCCESS"
export const UPDATE_SHOP_ERROR = "UPDATE_SHOP_ERROR"

export const UPDATE_SELLER_PASSWORD = "UPDATE_SELLER_PASSWORD"
export const UPDATE_SELLER_PASSWORD_SUCCESS = "UPDATE_SELLER_PASSWORD_SUCCESS"
export const UPDATE_SELLER_PASSWORD_ERROR = "UPDATE_SELLER_PASSWORD_ERROR"

export const GET_SHOP_DETAILS_BY_SELLER_ID = "GET_SHOP_DETAILS_BY_SELLER_ID"
export const GET_SHOP_DETAILS_BY_SELLER_ID_SUCCESS =
  "GET_SHOP_DETAILS_BY_SELLER_ID_SUCCESS"
export const GET_SHOP_DETAILS_BY_SELLER_ID_ERROR =
  "GET_SHOP_DETAILS_BY_SELLER_ID_ERROR"

//   export const GET_SHOP_PRODUCT_DETAILS_BY_SELLER_ID = "GET_SHOP_PRODUCT_DETAILS_BY_SELLER_ID"
// export const GET_SHOP_PRODUCT_DETAILS_BY_SELLER_ID_SUCCESS =
//   "GET_SHOP_PRODUCT_DETAILS_BY_SELLER_ID_SUCCESS"
// export const GET_SHOP_PRODUCT_DETAILS_BY_SELLER_ID_ERROR =
//   "GET_SHOP_PRODUCT_DETAILS_BY_SELLER_ID_ERROR"

export const SHOP_URL_AVAILABLE = "SHOP_URL_AVAILABLE"
export const SHOP_URL_AVAILABLE_SUCCESS = "SHOP_URL_AVAILABLE_SUCCESS"
export const SHOP_URL_AVAILABLE_ERROR = "SHOP_URL_AVAILABLE_ERROR"

export const CREATE_SELLER_ADDRESS = "CREATE_SELLER_ADDRESS"
export const CREATE_SELLER_ADDRESS_SUCCESS = "CREATE_SELLER_ADDRESS_SUCCESS"
export const CREATE_SELLER_ADDRESS_ERROR = "CREATE_SELLER_ADDRESS_ERROR"

export const GET_SELLER_ADDRESS_BY_SHOP_ID = "GET_SELLER_ADDRESS_BY_SHOP_ID"
export const GET_SELLER_ADDRESS_BY_SHOP_ID_SUCCESS =
  "GET_SELLER_ADDRESS_BY_SHOP_ID_SUCCESS"
export const GET_SELLER_ADDRESS_BY_SHOP_ID_ERROR = "GET_SELLER_ADDRESS_BY_SHOP_ID_ERROR"

export const CREATE_SELLER_BANK_ACCOUNT = "CREATE_SELLER_BANK_ACCOUNT"
export const CREATE_SELLER_BANK_ACCOUNT_SUCCESS = "CREATE_SELLER_BANK_ACCOUNT_SUCCESS"
export const CREATE_SELLER_BANK_ACCOUNT_ERROR = "CREATE_SELLER_BANK_ACCOUNT_ERROR"

export const GET_SELLER_BANK_ACCOUNT_BY_SHOP_ID = "GET_SELLER_BANK_ACCOUNT_BY_SHOP_ID"
export const GET_SELLER_BY_SHOP_ID = "GET_SELLER_BY_SHOP_ID"
export const GET_SELLER_BANK_ACCOUNT_BY_SHOP_ID_SUCCESS = "GET_SELLER_BANK_ACCOUNT_BY_SHOP_ID_SUCCESS"
export const GET_SELLER_BY_SHOP_ID_SUCCESS = "GET_SELLER_BY_SHOP_ID_SUCCESS"

export const GET_SELLER_BANK_ACCOUNT_BY_SHOP_ID_ERROR = "GET_SELLER_BANK_ACCOUNT_BY_SHOP_ID_ERROR"
export const GET_SELLER_BY_SHOP_ID_ERROR = "GET_SELLER_BY_SHOP_ID_ERROR"

export const GET_ALL_SELLER_COMMISSION = "GET_ALL_SELLER_COMMISSION"
export const GET_ALL_SELLER_COMMISSION_SUCCESS = "GET_ALL_SELLER_COMMISSION_SUCCESS"
export const GET_ALL_SELLER_COMMISSION_ERROR = "GET_ALL_SELLER_COMMISSION_ERROR"

export const GET_COMMISSION_SELLER_BY_SHOP_ID = "GET_COMMISSION_SELLER_BY_SHOP_ID"
export const GET_COMMISSION_SELLER_BY_SHOP_ID_SUCCESS = "GET_COMMISSION_SELLER_BY_SHOP_ID_SUCCESS"
export const GET_COMMISSION_SELLER_BY_SHOP_ID_ERROR = "GET_COMMISSION_SELLER_BY_SHOP_ID_ERROR"

export const CREATE_SELLER_COMMISSION_PERCENTAGE = "CREATE_SELLER_COMMISSION_PERCENTAGE"
export const CREATE_SELLER_COMMISSION_PERCENTAGE_SUCCESS = "CREATE_SELLER_COMMISSION_PERCENTAGE_SUCCESS"
export const CREATE_SELLER_COMMISSION_PERCENTAGE_ERROR = "CREATE_SELLER_COMMISSION_PERCENTAGE_ERROR"

export const GET_SELLER_COMMISSION_PERCENTAGE = "GET_SELLER_COMMISSION_PERCENTAGE"
export const GET_SELLER_COMMISSION_PERCENTAGE_SUCCESS = "GET_SELLER_COMMISSION_PERCENTAGE_SUCCESS"
export const GET_SELLER_COMMISSION_PERCENTAGE_ERROR = "GET_SELLER_COMMISSION_PERCENTAGE_ERROR"

export const UPDATE_SELLER_COMMISSION_PERCENTAGE = "UPDATE_SELLER_COMMISSION_PERCENTAGE"
export const UPDATE_SELLER_COMMISSION_PERCENTAGE_SUCCESS = "UPDATE_SELLER_COMMISSION_PERCENTAGE_SUCCESS"
export const UPDATE_SELLER_COMMISSION_PERCENTAGE_ERROR = "UPDATE_SELLER_COMMISSION_PERCENTAGE_ERROR"


//Shop Details by User ID
export function getShopDetailsBySellerIdRecord(userId) {
  return async (dispatch) => {
    dispatch(getShopDetailsBySellerId())
    return await sellerProfileService
      .getShopDetailsBySellerId(userId)

      .then((response) =>
        dispatch(getShopDetailsBySellerIdSuccess(response.data))
      )
      .catch((error) => dispatch(getShopDetailsBySellerIdError(error)))
  }
}

// export function getShopProductDetailsBySellerIdRecord(userId) {
//   return async (dispatch) => {
//     dispatch(getShopProductDetailsBySellerId())
//     return await sellerProfileService
//       .getShopDetailsBySellerId(userId)

//       .then((response) =>
//         dispatch(getShopDetailsBySellerIdSuccess(response.data))
//       )
//       .catch((error) => dispatch(getShopDetailsBySellerIdError(error)))
//   }
// }

export function getShopDetailsBySellerId() {
  return {
    type: GET_SHOP_DETAILS_BY_SELLER_ID,
  }
}

export function getShopDetailsBySellerIdSuccess(success) {
  return {
    type: GET_SHOP_DETAILS_BY_SELLER_ID_SUCCESS,
    payload: { success },
  }
}

export function getShopDetailsBySellerIdError(error) {
  return {
    type: GET_SHOP_DETAILS_BY_SELLER_ID_ERROR,
    payload: { error },
  }
}

// export function getShopProductDetailsBySellerId() {
//   return {
//     type: GET_SHOP_PRODUCT_DETAILS_BY_SELLER_ID,
//   }
// }

// export function getShopProductDetailsBySellerIdSuccess(success) {
//   return {
//     type: GET_SHOP_PRODUCT_DETAILS_BY_SELLER_ID_SUCCESS,
//     payload: { success },
//   }
// }

// export function getShopProductDetailsBySellerIdError(error) {
//   return {
//     type: GET_SHOP_PRODUCT_DETAILS_BY_SELLER_ID_ERROR,
//     payload: { error },
//   }
// }
//

//Bank Details by Shop ID
export function getBankAccountByShopIdRecord(shopId) {
  return async (dispatch) => {
    dispatch(getBankAccountByShopId())
    return await sellerProfileService
      .getBankAccountByShopId(shopId)

      .then((response) =>
        dispatch(getBankAccountByShopIdSuccess(response.data))
      )
      .catch((error) => dispatch(getBankAccountByShopIdError(error)))
  }
}

export function getSellerByShopIdRecord(shopId) {
  return async (dispatch) => {
    dispatch(getSellerByShopId())
    return await sellerProfileService
      .getSellerByShopId(shopId)

      .then((response) =>
        dispatch(getSellerByShopIdSuccess(response.data))
      )
      .catch((error) => dispatch(getSellerByShopIdError(error)))
  }
}

export function getBankAccountByShopId() {
  return {
    type: GET_SELLER_BANK_ACCOUNT_BY_SHOP_ID,
  }
}

export function getSellerByShopId() {
  return {
    type: GET_SELLER_BY_SHOP_ID,
  }
}

export function getBankAccountByShopIdSuccess(success) {
  return {
    type: GET_SELLER_BANK_ACCOUNT_BY_SHOP_ID_SUCCESS,
    payload: { success },
  }
}

export function getSellerByShopIdSuccess(success) {
  return {
    type: GET_SELLER_BY_SHOP_ID_SUCCESS,
    payload: { success },
  }
}

export function getBankAccountByShopIdError(error) {
  return {
    type: GET_SELLER_BANK_ACCOUNT_BY_SHOP_ID_ERROR,
    payload: { error },
  }
}

export function getSellerByShopIdError(error) {
  return {
    type: GET_SELLER_BY_SHOP_ID_ERROR,
    payload: { error },
  }
}

//Commission Seller Shop Id 
export function getCommissionSellerByShopIdRecord(shopId) {
  return async (dispatch) => {
    dispatch(getCommissionSellerByShopId())
    return await sellerProfileService
      .getCommissionSellerByShopId(shopId)

      .then((response) =>
        dispatch(getCommissionSellerByShopIdSuccess(response.data))
      )
      .catch((error) => dispatch(getCommissionSellerByShopIdError(error)))
  }
}

export function getCommissionSellerByShopId() {
  return {
    type: GET_COMMISSION_SELLER_BY_SHOP_ID,
  }
}

export function getCommissionSellerByShopIdSuccess(success) {
  return {
    type: GET_COMMISSION_SELLER_BY_SHOP_ID_SUCCESS,
    payload: { success },
  }
}

export function getCommissionSellerByShopIdError(error) {
  return {
    type: GET_COMMISSION_SELLER_BY_SHOP_ID_ERROR,
    payload: { error },
  }
}
//Address by Shop ID
export function getAddressByShopIdRecord(shopId, addressTypeId) {
  return async (dispatch) => {
    dispatch(getAddressByShopId())
    return await sellerProfileService
      .getAddressByShopId(shopId, addressTypeId)

      .then((response) =>
        dispatch(getAddressByShopIdSuccess(response.data))
      )
      .catch((error) => dispatch(getAddressByShopIdError(error)))
  }
}

export function getAddressByShopId() {
  return {
    type: GET_SELLER_ADDRESS_BY_SHOP_ID,
  }
}

export function getAddressByShopIdSuccess(success) {
  return {
    type: GET_SELLER_ADDRESS_BY_SHOP_ID_SUCCESS,
    payload: { success },
  }
}

export function getAddressByShopIdError(error) {
  return {
    type: GET_SELLER_ADDRESS_BY_SHOP_ID_ERROR,
    payload: { error },
  }
}
//

export function createSellerProfileRecord(sellers) {
  return async (dispatch) => {
    dispatch(createSellerProfile())
    return await sellerProfileService
      .createSellerProfile(sellers)

      .then((response) => dispatch(createSellerProfileSuccess(response)))
      .catch((error) => dispatch(createSellerProfileError(error)))
  }
}

export function createSellerProfile() {
  return {
    type: CREATE_SELLER_PROFILE,
  }
}

export function createSellerProfileSuccess(success) {
  return {
    type: CREATE_SELLER_PROFILE_SUCCESS,
    payload: { success },
  }
}

export function createSellerProfileError(error) {
  return {
    type: CREATE_SELLER_PROFILE_ERROR,
    payload: { error },
  }
}

//
export function getSellerProfileRecord() {
  return async (dispatch) => {
    dispatch(getSellerProfile())
    return await sellerProfileService
      .getSellerProfile()

      .then((response) => dispatch(getSellerProfileSuccess(response.data)))
      .catch((error) => dispatch(getSellerProfileError(error)))
  }
}

export function getSellerProfile() {
  return {
    type: GET_SELLER_PROFILE,
  }
}

export function getSellerProfileSuccess(success) {
  return {
    type: GET_SELLER_PROFILE_SUCCESS,
    payload: { success },
  }
}

export function getSellerProfileError(error) {
  return {
    type: GET_SELLER_PROFILE_ERROR,
    payload: { error },
  }
}

//
export function getSellerProfileByIdRecord(userId) {
  return async (dispatch) => {
    dispatch(getSellerProfileById())
    return await sellerProfileService
      .getSellerProfileById(userId)

      .then((response) => dispatch(getSellerProfileByIdSuccess(response.data)))
      .catch((error) => dispatch(getSellerProfileByIdError(error)))
  }
}

export function getSellerProfileById() {
  return {
    type: GET_SELLER_PROFILE_BY_ID,
  }
}

export function getSellerProfileByIdSuccess(success) {
  return {
    type: GET_SELLER_PROFILE_BY_ID_SUCCESS,
    payload: { success },
  }
}

export function getSellerProfileByIdError(error) {
  return {
    type: GET_SELLER_PROFILE_BY_ID_ERROR,
    payload: { error },
  }
}

//
export function updateSellerProfileRecord(data) {
  return async (dispatch) => {
    dispatch(updateSellerProfile())
    return await sellerProfileService
      .sellerUpdateShop(data)

      .then((response) => dispatch(updateSellerProfileSuccess(response)))
      .catch((error) => dispatch(updateSellerProfileError(error)))
  }
}

export function updateSellerProfile() {
  return {
    type: UPDATE_SELLER_SHOP_PROFILE,
  }
}

export function updateSellerProfileSuccess(success) {
  return {
    type: UPDATE_SELLER_SHOP_PROFILE_SUCCESS,
    payload: { success },
  }
}

export function updateSellerProfileError(error) {
  return {
    type: UPDATE_SELLER_SHOP_PROFILE_ERROR,
    payload: { error },
  }
}

//
export function createOrUpdateSellerProfileRecord(data) {
  return async (dispatch) => {
    dispatch(createOrUpdateSellerProfile())
    return await sellerProfileService
      .createOrUpdateSellerProfile(data)

      .then((response) =>
        dispatch(createOrUpdateSellerProfileSuccess(response))
      )
      .catch((error) => dispatch(createOrUpdateSellerProfileError(error)))
  }
}

export function createOrUpdateSellerProfile() {
  return {
    type: UPDATE_SELLER_PROFILE,
  }
}

export function createOrUpdateSellerProfileSuccess(success) {
  return {
    type: UPDATE_SELLER_PROFILE_SUCCESS,
    payload: { success },
  }
}

export function createOrUpdateSellerProfileError(error) {
  return {
    type: UPDATE_SELLER_PROFILE_ERROR,
    payload: { error },
  }
}

//
export function updateSellerPasswordRecord(data) {
  return async (dispatch) => {
    dispatch(updateSellerPassword())
    return await sellerProfileService
      .updateSellerPassword(data)

      .then((response) => dispatch(updateSellerPasswordSuccess(response)))
      .catch((error) => dispatch(updateSellerPasswordError(error)))
  }
}

export function updateSellerPassword() {
  return {
    type: UPDATE_SELLER_PASSWORD,
  }
}

export function updateSellerPasswordSuccess(success) {
  return {
    type: UPDATE_SELLER_PASSWORD_SUCCESS,
    payload: { success },
  }
}

export function updateSellerPasswordError(error) {
  return {
    type: UPDATE_SELLER_PASSWORD_ERROR,
    payload: { error },
  }
}

//
export function shopUrlAvailableRecord(data) {
  return async (dispatch) => {
    dispatch(shopUrlAvailable())
    return await sellerProfileService
      .checkShopUrlAvailable(data)

      .then((response) => dispatch(shopUrlAvailableSuccess(response)))
      .catch((error) => dispatch(shopUrlAvailableError(error)))
  }
}

export function shopUrlAvailable() {
  return {
    type: SHOP_URL_AVAILABLE,
  }
}

export function shopUrlAvailableSuccess(success) {
  return {
    type: SHOP_URL_AVAILABLE_SUCCESS,
    payload: { success },
  }
}

export function shopUrlAvailableError(error) {
  return {
    type: SHOP_URL_AVAILABLE_ERROR,
    payload: { error },
  }
}

//CREATE SELLER ADDRESS
export function createSellerAddressRecord(data) {
  return async (dispatch) => {
    dispatch(createSellerAddress())
    return await sellerProfileService
      .createSellerAddress(data)

      .then((response) => dispatch(createSellerAddressSuccess(response)))
      .catch((error) => dispatch(createSellerAddressError(error)))
  }
}

export function createSellerAddress() {
  return {
    type: CREATE_SELLER_ADDRESS,
  }
}

export function createSellerAddressSuccess(success) {
  return {
    type: CREATE_SELLER_ADDRESS_SUCCESS,
    payload: { success },
  }
}

export function createSellerAddressError(error) {
  return {
    type: CREATE_SELLER_ADDRESS_ERROR,
    payload: { error },
  }
}


//CREATE SELLER BANK ACCOUNT
export function createSellerBankAccountRecord(data) {
  return async (dispatch) => {
    dispatch(createSellerBankAccount())
    return await sellerProfileService
      .createSellerBankAccount(data)

      .then((response) => dispatch(createSellerBankAccountSuccess(response)))
      .catch((error) => dispatch(createSellerBankAccountError(error)))
  }
}

export function createSellerBankAccount() {
  return {
    type: CREATE_SELLER_BANK_ACCOUNT,
  }
}

export function createSellerBankAccountSuccess(success) {
  return {
    type: CREATE_SELLER_BANK_ACCOUNT_SUCCESS,
    payload: { success },
  }
}

export function createSellerBankAccountError(error) {
  return {
    type: CREATE_SELLER_BANK_ACCOUNT_ERROR,
    payload: { error },
  }
}

//Seller commission Percentage
export function createCommissionPercentageRecord(data) {
  return async (dispatch) => {
    dispatch(createCommissionPercentage())
    return await sellerProfileService
      .createCommissionPercentage(data)

      .then((response) => dispatch(createCommissionPercentageSuccess(response)))
      .catch((error) => dispatch(createCommissionPercentageError(error)))
  }
}

export function createCommissionPercentage() {
  return {
    type: CREATE_SELLER_COMMISSION_PERCENTAGE,
  }
}

export function createCommissionPercentageSuccess(success) {
  return {
    type: CREATE_SELLER_COMMISSION_PERCENTAGE_SUCCESS,
    payload: { success },
  }
}

export function createCommissionPercentageError(error) {
  return {
    type: CREATE_SELLER_COMMISSION_PERCENTAGE_ERROR,
    payload: { error },
  }
}

export function getCommissionPercentageRecord(shopId) {
  return async (dispatch) => {
    dispatch(getCommissionPercentage())
    return await sellerProfileService
      .getCommissionPercentage(shopId)

      .then((response) => dispatch(getCommissionPercentageSuccess(response.data)))
      .catch((error) => dispatch(getCommissionPercentageError(error)))
  }
}

export function getCommissionPercentage() {
  return {
    type: GET_SELLER_COMMISSION_PERCENTAGE,
  }
}

export function getCommissionPercentageSuccess(success) {
  return {
    type: GET_SELLER_COMMISSION_PERCENTAGE_SUCCESS,
    payload: { success },
  }
}

export function getCommissionPercentageError(error) {
  return {
    type: GET_SELLER_COMMISSION_PERCENTAGE_ERROR,
    payload: { error },
  }
}

export function updateCommissionPercentageRecord(sellerCommissionPercentage) {
  return async (dispatch) => {
    dispatch(updateCommissionPercentage())
    return await sellerProfileService
      .updateCommissionPercentage(sellerCommissionPercentage)

      .then((response) => dispatch(updateCommissionPercentageSuccess(response)))
      .catch((error) => dispatch(updateCommissionPercentageError(error)))
  }
}

export function updateCommissionPercentage() {
  return {
    type: UPDATE_SELLER_COMMISSION_PERCENTAGE,
  }
}

export function updateCommissionPercentageSuccess(success) {
  return {
    type: UPDATE_SELLER_COMMISSION_PERCENTAGE_SUCCESS,
    payload: { success },
  }
}

export function updateCommissionPercentageError(error) {
  return {
    type: UPDATE_SELLER_COMMISSION_PERCENTAGE_ERROR,
    payload: { error },
  }
}

// all seller commission 
export function getAllSellerCommissionRecord() {
  return async (dispatch) => {
    dispatch(getAllSellerCommission())
    return await sellerProfileService
      .getAllSellerCommission()
      
      .then((response) =>
        dispatch(getAllSellerCommissionSuccess(response.data))
      )
      .catch((error) => dispatch(getAllSellerCommissionError(error)))
  }
}

export function getAllSellerCommission() {
  return {
    type: GET_ALL_SELLER_COMMISSION,
  }
}

export function getAllSellerCommissionSuccess(success) {
  return {
    type: GET_ALL_SELLER_COMMISSION_SUCCESS,
    payload: { success },
  }
}

export function getAllSellerCommissionError(error) {
  return {
    type: GET_ALL_SELLER_COMMISSION_ERROR,
    payload: { error },
  }
}