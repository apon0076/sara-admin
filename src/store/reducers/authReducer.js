import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,

  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,

  REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,

  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,

  AUTHENTICATE_USER,
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_ERROR,

  DEAUTHENTICATE_USER,
  DEAUTHENTICATE_USER_SUCCESS,
  DEAUTHENTICATE_USER_ERROR,

  CREATE_OR_UPDATE_NEW_ADMIN,
  CREATE_OR_UPDATE_NEW_ADMIN_SUCCESS,
  CREATE_OR_UPDATE_NEW_ADMIN_ERROR,
  
  GET_ADMIN,
  GET_ADMIN_SUCCESS,
  GET_ADMIN_ERROR,

  TOKEN_VERIFY,
  TOKEN_VERIFY_SUCCESS,
  TOKEN_VERIFY_ERROR,

  CREATE_TOKEN,
  CREATE_TOKEN_SUCCESS,
  CREATE_TOKEN_ERROR
  
} from "../actions/authAction"

const initialState = {
  sellers: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
  data: {}, // THIS IS USED FOR TO HOLD SAVE DATA
  loading: false,
  error: null,
  reseting: false,
  reseted: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    //login
    case LOGIN:
      return {
        ...state,
        loggingIn: true,
        loggedIn: false,
        error: null,
      }

    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: false,
        data: action.payload.success,
      }

    case LOGIN_ERROR:
      return {
        ...state,
        loggedIn: false,
        error: action.payload.error,
      }


    //logout
    case LOGOUT:
      return {
        ...state,
        loggingOut: true,
        loggedOut: false,
      }

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        loggedOut: true,
        data: action.payload.success,
      }

    case LOGOUT_ERROR:
      return {
        ...state,
        loggingOut: false,
        loggedOut: false,
        error: action.payload.error,
      }


    //registration
    case REGISTRATION:
      return {
        ...state,
        registraing: true,
        registered: false,
      }

    case REGISTRATION_SUCCESS:
      return {
        ...state,
        registraing: false,
        registered: true,
        data: action.payload.success,
      }

    case REGISTRATION_ERROR:
      return {
        ...state,
        registraing: false,
        registered: false,
        error: action.payload.error,
      }


    //authenticate-user
    case AUTHENTICATE_USER:
      return {
        ...state,
        authenticating: true,
        authenticated: false,
      }

    case AUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        authenticating: false,
        authenticated: true,
        data: action.payload.success,
      }

    case AUTHENTICATE_USER_ERROR:
      return {
        ...state,
        authenticating: false,
        authenticated: false,
        error: action.payload.error,
      }


    //deauthenticate-user
    case DEAUTHENTICATE_USER:
      return {
        ...state,
        deAuthenticating: true,
        deAuthenticated: false,
      }

    case DEAUTHENTICATE_USER_SUCCESS:
      return {
        ...state,
        deAuthenticating: false,
        deAuthenticated: true,
        data: action.payload.error,
      }

    case DEAUTHENTICATE_USER_ERROR:
      return {
        ...state,
        deAuthenticating: false,
        deAuthenticated: false,
        error: action.payload.error,
      }


    //create-new-admin
    case CREATE_OR_UPDATE_NEW_ADMIN:
      return {
        ...state,
        loading: true,
        error: null,
        resultData: [],
      }

    case CREATE_OR_UPDATE_NEW_ADMIN_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        resultData: action.payload.success,
      }

    case CREATE_OR_UPDATE_NEW_ADMIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        resultData: [],
      }


    //get-admin
    case GET_ADMIN:
      return {
        ...state,
        loading: true,
        error: null,
        adminesultData: [],
      }

    case GET_ADMIN_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        adminesultData: action.payload.success,
      }

    case GET_ADMIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        adminesultData: [],
      }


    //create-token
    case CREATE_TOKEN:
      return {
        ...state,
        error: null,
        loading: true,
      }

    case CREATE_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.success,
      }

    case CREATE_TOKEN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: {},
      }


    //token-verify
    case TOKEN_VERIFY:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case TOKEN_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload.success,
      }

    case TOKEN_VERIFY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: {},
      }


    //reset-password
    case RESET_PASSWORD:
      return {
        ...state,
        loading: true,
      }

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        passwordResetData: action.payload,
      }

    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
      
    default:
      return state
  }
}
