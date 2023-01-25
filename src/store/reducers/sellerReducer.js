import {
  APPROVE_SHOP,
  APPROVE_SHOP_SUCCESS,
  APPROVE_SHOP_ERROR,
  AUTHENTICATE_SELLER,
  AUTHENTICATE_SELLER_SUCCESS,
  AUTHENTICATE_SELLER_ERROR,
  CREATE_SELLER,
  CREATE_SELLER_SUCCESS,
  CREATE_SELLER_ERROR,
  CREATE_SELLER_TOKEN,
  CREATE_SELLER_TOKEN_SUCCESS,
  CREATE_SELLER_TOKEN_ERROR,
  DEAUTHENTICATE_SELLER,
  DEAUTHENTICATE_SELLER_SUCCESS,
  DEAUTHENTICATE_SELLER_ERROR,
  DELETE_SELLER,
  DELETE_SELLER_SUCCESS,
  DELETE_SELLER_ERROR,
  GET_PENDING_SELLER,
  GET_PENDING_SELLER_SUCCESS,
  GET_PENDING_SELLER_ERROR,
  GET_PENDING_SELLER_BY_ID,
  GET_PENDING_SELLER_BY_ID_SUCCESS,
  GET_PENDING_SELLER_BY_ID_ERROR,
  GET_SELLER,
  GET_SELLER_SUCCESS,
  GET_SELLER_ERROR,
  GET_SELLER_BY_ID,
  GET_SELLER_BY_ID_SUCCESS,
  GET_SELLER_BY_ID_ERROR,
  GET_VERIFIED_SHOP,
  GET_VERIFIED_SHOP_SUCCESS,
  GET_VERIFIED_SHOP_ERROR,
  GET_VERIFIED_SHOP_BY_ID,
  GET_VERIFIED_SHOP_BY_ID_SUCCESS,
  GET_VERIFIED_SHOP_BY_ID_ERROR,
  REJECT_SHOP,
  REJECT_SHOP_SUCCESS,
  REJECT_SHOP_ERROR,
  SELLER_LOGIN,
  SELLER_LOGIN_SUCCESS,
  SELLER_LOGIN_ERROR,
  SELLER_LOGOUT,
  SELLER_LOGOUT_SUCCESS,
  SELLER_LOGOUT_ERROR,
  SELLER_TOKEN_VERIFY,
  SELLER_TOKEN_VERIFY_SUCCESS,
  SELLER_TOKEN_VERIFY_ERROR,
  UPDATE_SELLER,
  UPDATE_SELLER_SUCCESS,
  UPDATE_SELLER_ERROR,
  SELLER_EMAIL_AVAILABLE,
  SELLER_EMAIL_AVAILABLE_SUCCESS,
  SELLER_EMAIL_AVAILABLE_ERROR,
  SELLER_CONTACT_AVAILABLE,
  SELLER_CONTACT_AVAILABLE_SUCCESS,
  SELLER_CONTACT_AVAILABLE_ERROR,
  SELLER_PASSWORD_RESET,
  SELLER_PASSWORD_RESET_SUCCESS,
  SELLER_PASSWORD_RESET_ERROR,
  GET_SELLER_RETURN_POLICY,
  GET_SELLER_RETURN_POLICY_ERROR,
  GET_SELLER_RETURN_POLICY_SUCCESS,
  ADD_OR_EDIT_SELLER_RETURN_POLICY,
  ADD_OR_EDIT_SELLER_RETURN_POLICY_ERROR,
  ADD_OR_EDIT_SELLER_RETURN_POLICY_SUCCESS,
  GET_PENDING_SELLER_RETURN_POLICY,
  GET_PENDING_SELLER_RETURN_POLICY_ERROR,
  GET_PENDING_SELLER_RETURN_POLICY_SUCCESS,
  GET_APPROVED_SELLER_RETURN_POLICY,
  GET_APPROVED_SELLER_RETURN_POLICY_ERROR,
  GET_APPROVED_SELLER_RETURN_POLICY_SUCCESS,
  GET_REJECTED_SELLER_RETURN_POLICY,
  GET_REJECTED_SELLER_RETURN_POLICY_ERROR,
  GET_REJECTED_SELLER_RETURN_POLICY_SUCCESS,
  GET_APPROVED_RETURN_POLICY_BY_SHOP_ID,
  GET_APPROVED_RETURN_POLICY_BY_SHOP_ID_ERROR,
  GET_APPROVED_RETURN_POLICY_BY_SHOP_ID_SUCCESS,
  POST_DELIVERY_STATUS,
  POST_DELIVERY_STATUS_ERROR,
  POST_DELIVERY_STATUS_SUCCESS,
  GET_ALL_SELLER,
  GET_ALL_SELLER_ERROR,
  GET_ALL_SELLER_SUCCESS,
} from "../actions/sellerAction.js";

//let seller = JSON.parse(localStorage.getItem("seller"));
//consSELLER_EMAIL_State = seller ? { loggedIn: true, seller } : {};

const intialState = {
  sellers: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
  data: {}, // THIS IS USED FOR TO HOLD SAVE DATA
  sellerReturnPolicy: [],
  pendingReturnPolicy: [],
  approvedReturnPolicy: [],
  rejectedReturnPolicy: [],
  approvedReturnPolicyById: [],
  deliveryStatus: [],
  sellerList: [],
  emailAvailable: null,
  contactAvailable: null,
  loading: false,
  loaded: false,
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
};

export default function (state = intialState, action) {
  switch (action.type) {
    case GET_SELLER:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_SELLER_SUCCESS:
      return {
        ...state,
        loading: false,
        sellers: action.payload.success,
      };

    case GET_SELLER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        sellers: [],
      };

    case GET_SELLER_BY_ID:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_SELLER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        sellers: action.payload.success,
      };

    case GET_SELLER_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        sellers: [],
      };

    case CREATE_SELLER_TOKEN:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case CREATE_SELLER_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.success,
      };

    case CREATE_SELLER_TOKEN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: {},
      };

    case SELLER_PASSWORD_RESET:
      return {
        loading: true,
      };

    case SELLER_PASSWORD_RESET_SUCCESS:
      return {
        loading: false,
        passwordResetData: action.payload,
      };

    case SELLER_PASSWORD_RESET_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    case SELLER_TOKEN_VERIFY:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SELLER_TOKEN_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.success,
      };

    case SELLER_TOKEN_VERIFY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: {},
      };

    case CREATE_SELLER:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_SELLER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.success,
      };

    case CREATE_SELLER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: {},
      };

    case UPDATE_SELLER:
      return {
        ...state,
        error: null,
      };

    case UPDATE_SELLER_SUCCESS:
      return {
        ...state,
        data: action.payload.success,
      };

    case UPDATE_SELLER_ERROR:
      return {
        ...state,
        error: action.payload.error,
        data: {},
      };

    case DELETE_SELLER:
      return {
        ...state,
        error: null,
      };

    case DELETE_SELLER_SUCCESS:
      return {
        ...state,
        data: action.payload.success,
      };

    case DELETE_SELLER_ERROR:
      return {
        ...state,
        error: action.payload.error,
        data: {},
      };

    case GET_PENDING_SELLER:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_PENDING_SELLER_SUCCESS:
      return {
        ...state,
        loading: false,
        sellers: action.payload.success,
      };

    case GET_PENDING_SELLER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        sellers: [],
      };

    case GET_PENDING_SELLER_BY_ID:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_PENDING_SELLER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        sellers: action.payload.success,
      };

    case GET_PENDING_SELLER_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        sellers: [],
      };

    //SELLER_LOGIN
    case SELLER_LOGIN:
      return {
        loggingIn: true,
        loggedIn: false,
        error: null,
      };

    case SELLER_LOGIN_SUCCESS:
      return {
        loggedIn: false,
        data: action.payload.success,
      };

    case SELLER_LOGIN_ERROR:
      return {
        loggedIn: false,
        error: action.payload.error,
      };

    case SELLER_LOGOUT:
      return {
        loggingOut: true,
        loggedOut: false,
      };

    case SELLER_LOGOUT_SUCCESS:
      return {
        loggingOut: false,
        loggedOut: true,
        data: action.payload.success,
      };

    case SELLER_LOGOUT_ERROR:
      return {
        loggingOut: false,
        loggedOut: false,
        error: action.payload.error,
      };

    case AUTHENTICATE_SELLER:
      return {
        authenticating: true,
        authenticated: false,
      };

    case AUTHENTICATE_SELLER_SUCCESS:
      return {
        authenticating: false,
        authenticated: true,
        data: action.payload.success,
      };

    case AUTHENTICATE_SELLER_ERROR:
      return {
        authenticating: false,
        authenticated: false,
        error: action.payload.error,
      };

    case DEAUTHENTICATE_SELLER:
      return {
        deAuthenticating: true,
        deAuthenticated: false,
      };

    case DEAUTHENTICATE_SELLER_SUCCESS:
      return {
        deAuthenticating: false,
        deAuthenticated: true,
        data: action.payload.error,
      };

    case DEAUTHENTICATE_SELLER_ERROR:
      return {
        deAuthenticating: false,
        deAuthenticated: false,
        error: action.payload.error,
      };

    case APPROVE_SHOP:
      return {
        ...state,
        processing: true,
        processed: false,
        error: null,
      };

    case APPROVE_SHOP_SUCCESS:
      return {
        ...state,
        processing: false,
        processed: true,
        data: action.payload.success,
      };

    case APPROVE_SHOP_ERROR:
      return {
        ...state,
        processing: false,
        processed: false,
        error: action.payload.error,
        data: {},
      };

    case REJECT_SHOP:
      return {
        ...state,
        processing: true,
        processed: false,
        error: null,
      };

    case REJECT_SHOP_SUCCESS:
      return {
        ...state,
        processing: false,
        processed: true,
        data: action.payload.success,
      };

    case REJECT_SHOP_ERROR:
      return {
        ...state,
        processing: false,
        processed: false,
        error: action.payload.error,
        data: {},
      };

    // Verified Shop
    case GET_VERIFIED_SHOP:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_VERIFIED_SHOP_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        sellers: action.payload.success,
      };

    case GET_VERIFIED_SHOP_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        sellers: [],
      };

    case GET_VERIFIED_SHOP_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_VERIFIED_SHOP_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        sellers: action.payload.success,
      };

    case GET_VERIFIED_SHOP_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        sellers: [],
      };

    case SELLER_EMAIL_AVAILABLE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case SELLER_EMAIL_AVAILABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        //////loaded: true,
        emailAvailable: action.payload.success,
      };

    case SELLER_EMAIL_AVAILABLE_ERROR:
      return {
        ...state,
        loading: false,
        //////loaded: false,
        error: action.payload.error,
      };

    case SELLER_CONTACT_AVAILABLE:
      return {
        ...state,
        loading: true,
        //////loaded: false,
        error: null,
      };

    case SELLER_CONTACT_AVAILABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        //////loaded: true,
        contactAvailable: action.payload.success,
      };

    case SELLER_CONTACT_AVAILABLE_ERROR:
      return {
        ...state,
        loading: false,
        //////loaded: false,
        error: action.payload.error,
      };

    ///-----

    case GET_SELLER_RETURN_POLICY:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_SELLER_RETURN_POLICY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        sellerReturnPolicy: action.payload.success,
      };

    case GET_SELLER_RETURN_POLICY_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        sellerReturnPolicy: [],
      };

    case ADD_OR_EDIT_SELLER_RETURN_POLICY:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case ADD_OR_EDIT_SELLER_RETURN_POLICY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        sellerReturnPolicy: action.payload.success,
      };

    case ADD_OR_EDIT_SELLER_RETURN_POLICY_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        sellerReturnPolicy: [],
      };

    case GET_PENDING_SELLER_RETURN_POLICY:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PENDING_SELLER_RETURN_POLICY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        pendingReturnPolicy: action.payload.success,
      };

    case GET_PENDING_SELLER_RETURN_POLICY_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        pendingReturnPolicy: [],
      };
    case GET_APPROVED_SELLER_RETURN_POLICY:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_APPROVED_SELLER_RETURN_POLICY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        approvedReturnPolicy: action.payload.success,
      };

    case GET_APPROVED_SELLER_RETURN_POLICY_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        approvedReturnPolicy: [],
      };
    case GET_REJECTED_SELLER_RETURN_POLICY:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_REJECTED_SELLER_RETURN_POLICY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        rejectedReturnPolicy: action.payload.success,
      };

    case GET_REJECTED_SELLER_RETURN_POLICY_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        rejectedReturnPolicy: [],
      };

    case GET_APPROVED_RETURN_POLICY_BY_SHOP_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_APPROVED_RETURN_POLICY_BY_SHOP_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        approvedReturnPolicyById: action.payload.success,
      };

    case GET_APPROVED_RETURN_POLICY_BY_SHOP_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        approvedReturnPolicyById: [],
      };

    case POST_DELIVERY_STATUS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case POST_DELIVERY_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        deliveryStatus: action.payload.success,
      };

    case POST_DELIVERY_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        deliveryStatus: [],
      };

    // Get All Seller Start
    case GET_ALL_SELLER:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_ALL_SELLER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        sellerList: action.payload.success,
      };

    case GET_ALL_SELLER_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        sellerList: [],
      };
    // Get All Seller End

    default:
      return state;
  }
}
