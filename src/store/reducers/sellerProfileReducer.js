//import { SUCCESS, ERROR, CLEAR } from "../actions/alertAction";
import {
  CREATE_SELLER_PROFILE,
  CREATE_SELLER_PROFILE_SUCCESS,
  CREATE_SELLER_PROFILE_ERROR,

  UPDATE_SELLER_SHOP_PROFILE,
  UPDATE_SELLER_SHOP_PROFILE_SUCCESS,
  UPDATE_SELLER_SHOP_PROFILE_ERROR,

  UPDATE_SELLER_PASSWORD,
  UPDATE_SELLER_PASSWORD_SUCCESS,
  UPDATE_SELLER_PASSWORD_ERROR,

  GET_SELLER_PROFILE,
  GET_SELLER_PROFILE_SUCCESS,
  GET_SELLER_PROFILE_ERROR,

  GET_SELLER_PROFILE_BY_ID,
  GET_SELLER_PROFILE_BY_ID_SUCCESS,
  GET_SELLER_PROFILE_BY_ID_ERROR,

  GET_SHOP_DETAILS_BY_SELLER_ID,
  GET_SHOP_DETAILS_BY_SELLER_ID_SUCCESS,
  GET_SHOP_DETAILS_BY_SELLER_ID_ERROR,

  SHOP_URL_AVAILABLE,
  SHOP_URL_AVAILABLE_SUCCESS,
  SHOP_URL_AVAILABLE_ERROR,

  CREATE_SELLER_ADDRESS,
  CREATE_SELLER_ADDRESS_SUCCESS,
  CREATE_SELLER_ADDRESS_ERROR,

  GET_SELLER_ADDRESS_BY_SHOP_ID,
  GET_SELLER_ADDRESS_BY_SHOP_ID_SUCCESS,
  GET_SELLER_ADDRESS_BY_SHOP_ID_ERROR,

  CREATE_SELLER_BANK_ACCOUNT,
  CREATE_SELLER_BANK_ACCOUNT_SUCCESS,
  CREATE_SELLER_BANK_ACCOUNT_ERROR,

  GET_SELLER_BANK_ACCOUNT_BY_SHOP_ID,
  GET_SELLER_BANK_ACCOUNT_BY_SHOP_ID_SUCCESS,
  GET_SELLER_BANK_ACCOUNT_BY_SHOP_ID_ERROR,

  GET_ALL_SELLER_COMMISSION,
  GET_ALL_SELLER_COMMISSION_SUCCESS,
  GET_ALL_SELLER_COMMISSION_ERROR,

  GET_COMMISSION_SELLER_BY_SHOP_ID,
  GET_COMMISSION_SELLER_BY_SHOP_ID_SUCCESS,
  GET_COMMISSION_SELLER_BY_SHOP_ID_ERROR,

  GET_SELLER_COMMISSION_PERCENTAGE,
  GET_SELLER_COMMISSION_PERCENTAGE_SUCCESS,
  GET_SELLER_COMMISSION_PERCENTAGE_ERROR,

  CREATE_SELLER_COMMISSION_PERCENTAGE,
  CREATE_SELLER_COMMISSION_PERCENTAGE_SUCCESS,
  CREATE_SELLER_COMMISSION_PERCENTAGE_ERROR,

  UPDATE_SELLER_COMMISSION_PERCENTAGE,
  UPDATE_SELLER_COMMISSION_PERCENTAGE_SUCCESS,
  UPDATE_SELLER_COMMISSION_PERCENTAGE_ERROR

} from "../actions/sellerProfileAction"

//let profile = JSON.parse(localStorage.getItem("x-access-employeeId"));
//const initialState = profile ? { loggedIn: true, profile } : {};

const initialState = {
  sellerprofiles: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
  data: {}, // THIS IS USED FOR TO HOLD SAVE DATA
  shopDetails: [],
  sellerProfileById: [],
  sellerAddress: [],
  sellerAddressById: [],
  sellerBankAccount: [],
  sellerBankAccountById: [],
  allSellerCommission: [],
  commissionSellerById: [],
  sellerCommissionPercentage: [],
  shopUrlAvailable: null,
  loading: false,
  loaded: false,
  success: false,
  saving: false,
  saved: false,
  updating: false,
  updated: false,
  deleting: false,
  deleted: false,
  error: null,
  loggingIn: false,
  loggedIn: false,
  loggingOut: false,
  loggedOut: false,
  registraing: false,
  registered: false,
  reseting: false,
  reseted: false,
  authenticating: false,
  authenticated: true,
  deAuthenticating: false,
  deAuthenticated: false,
}

export default function (state = initialState, action) {

  switch (action.type) {
    //
    case GET_SELLER_PROFILE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }

    case GET_SELLER_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        sellerprofiles: action.payload.success,
      }

    case GET_SELLER_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        sellerprofiles: [],
      }

 
    case GET_SELLER_PROFILE_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }

    case GET_SELLER_PROFILE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        sellerProfileById: action.payload.success,
      }

    case GET_SELLER_PROFILE_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        sellerProfileById: [],
      }

      
    case GET_SHOP_DETAILS_BY_SELLER_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }

    case GET_SHOP_DETAILS_BY_SELLER_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        shopDetails: action.payload.success,
      }

    case GET_SHOP_DETAILS_BY_SELLER_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        sellerprofiles: [],
      }

      
    case CREATE_SELLER_PROFILE:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      }

    case CREATE_SELLER_PROFILE_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      }

    case CREATE_SELLER_PROFILE_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      }

      
    case UPDATE_SELLER_SHOP_PROFILE:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      }

    case UPDATE_SELLER_SHOP_PROFILE_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      }

    case UPDATE_SELLER_SHOP_PROFILE_ERROR:
      return {
        ...state,
        updating: true,
        updated: false,
        error: action.payload.error,
        data: {},
      }

      
    case UPDATE_SELLER_PASSWORD:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      }

    case UPDATE_SELLER_PASSWORD_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      }

    case UPDATE_SELLER_PASSWORD_ERROR:
      return {
        ...state,
        updating: true,
        updated: false,
        error: action.payload.error,
        data: {},
      }

      
    case SHOP_URL_AVAILABLE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }

    case SHOP_URL_AVAILABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        shopUrlAvailable: action.payload.success,
      }

    case SHOP_URL_AVAILABLE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
      }

      
    case CREATE_SELLER_ADDRESS:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case CREATE_SELLER_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        sellerAddress: action.payload.success,
      }

    case CREATE_SELLER_ADDRESS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }

      
    case GET_SELLER_ADDRESS_BY_SHOP_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }

    case GET_SELLER_ADDRESS_BY_SHOP_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        sellerAddressById: action.payload.success,
      }

    case GET_SELLER_ADDRESS_BY_SHOP_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        sellerAddressById: [],
      }

      
    case CREATE_SELLER_BANK_ACCOUNT:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case CREATE_SELLER_BANK_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        sellerBankAccount: action.payload.success,
      }

    case CREATE_SELLER_BANK_ACCOUNT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }

      
    case GET_SELLER_BANK_ACCOUNT_BY_SHOP_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }

    case GET_SELLER_BANK_ACCOUNT_BY_SHOP_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        sellerBankAccountById: action.payload.success,
      }

    case GET_SELLER_BANK_ACCOUNT_BY_SHOP_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        sellerBankAccountById: [],
      }


    case GET_COMMISSION_SELLER_BY_SHOP_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }

    case GET_COMMISSION_SELLER_BY_SHOP_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        commissionSellerById: action.payload.success,
      }

    case GET_COMMISSION_SELLER_BY_SHOP_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        commissionSellerById: [],
      }


    // Seller commission Percentage
    case GET_SELLER_COMMISSION_PERCENTAGE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }

    case GET_SELLER_COMMISSION_PERCENTAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        sellerCommissionPercentage: action.payload.success,
      }

    case GET_SELLER_COMMISSION_PERCENTAGE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        sellerCommissionPercentage: [],
      }


    case CREATE_SELLER_COMMISSION_PERCENTAGE:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
        success: false
      }

    case CREATE_SELLER_COMMISSION_PERCENTAGE_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        success: true,
        sellerCommissionPercentage: action.payload.success,
      }

    case CREATE_SELLER_COMMISSION_PERCENTAGE_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        sellerCommissionPercentage: {},
      }


    case UPDATE_SELLER_COMMISSION_PERCENTAGE:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
        success: false
      }

    case UPDATE_SELLER_COMMISSION_PERCENTAGE_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        success: true,
        sellerCommissionPercentage: action.payload.success,
      }

    case UPDATE_SELLER_COMMISSION_PERCENTAGE_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        sellerCommissionPercentage: {},
      }


    case GET_ALL_SELLER_COMMISSION:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }

    case GET_ALL_SELLER_COMMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        allSellerCommission: action.payload.success,
      }

    case GET_ALL_SELLER_COMMISSION_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        allSellerCommission: [],
      }

    default:
      return state
  }
}
