import // GET_COLOR,
// GET_COLOR_SUCCESS,
// GET_COLOR_ERROR,
// GET_COLOR_BY_ID,
// GET_COLOR_BY_ID_SUCCESS,
// GET_COLOR_BY_ID_ERROR,
// CREATE_COLOR,
// CREATE_COLOR_SUCCESS,
// CREATE_COLOR_ERROR,
// UPDATE_COLOR,
// // UPDATE_COLOR_SUCCESS,
// // UPDATE_COLOR_ERROR,
// DELETE_COLOR,
// DELETE_COLOR_SUCCESS,
// DELETE_COLOR_ERROR,
"../actions/colorAction"

const initialState = {
  colors: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
  data: {}, // THIS IS USED FOR TO HOLD SAVE DATA
  loading: false,
  loaded: false,
  saving: false,
  saved: false,
  updating: false,
  updated: false,
  deleting: false,
  deleted: false,
  error: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    // case GET_COLOR:
    //   // Mark the state as "loading" so we can show a spinner or something
    //   // Also, reset any errors. We're starting fresh.
    //   return {
    //     ...state,
    //     loading: true,
    //     loaded: false,
    //     error: null,
    //   };

    // case GET_COLOR_SUCCESS:
    //   // All done: set loading "false".
    //   // Also, replace the items with the ones from the server
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: true,
    //     colors: action.payload.success,
    //   };

    // case GET_COLOR_ERROR:
    //   // The request failed, but it did stop, so set loading to "false".
    //   // Save the error, and we can display it somewhere
    //   // Since it failed, we don't have items to display anymore, so set it empty.
    //   // This is up to you and your app though: maybe you want to keep the items
    //   // around! Do whatever seems right.
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: false,
    //     error: action.payload.error,
    //     colors: [],
    //   };

    // case GET_COLOR_BY_ID:
    //   // Mark the state as "loading" so we can show a spinner or something
    //   // Also, reset any errors. We're starting fresh.
    //   return {
    //     ...state,
    //     loading: true,
    //     loaded: false,
    //     error: null,
    //   };

    // case GET_COLOR_BY_ID_SUCCESS:
    //   // All done: set loading "false".
    //   // Also, replace the items with the ones from the server
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: true,
    //     colors: action.payload.success,
    //   };

    // case GET_COLOR_BY_ID_ERROR:
    //   // The request failed, but it did stop, so set loading to "false".
    //   // Save the error, and we can display it somewhere
    //   // Since it failed, we don't have items to display anymore, so set it empty.
    //   // This is up to you and your app though: maybe you want to keep the items
    //   // around! Do whatever seems right.
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: false,
    //     error: action.payload.error,
    //     colors: [],
    //   };

    // case CREATE_COLOR:
    //   return {
    //     ...state,
    //     saving: true,
    //     saved: false,
    //     error: null,
    //   };

    // case CREATE_COLOR_SUCCESS:
    //   return {
    //     ...state,
    //     saving: false,
    //     saved: true,
    //     data: action.payload.success,
    //   };

    // case CREATE_COLOR_ERROR:
    //   return {
    //     ...state,
    //     saving: false,
    //     saved: false,
    //     error: action.payload.error,
    //     data: {},
    //   };

    // case UPDATE_COLOR:
    //   return {
    //     ...state,
    //     updating: true,
    //     updated: false,
    //     error: null,
    //   };

    // case DELETE_COLOR:
    //   return {
    //     ...state,
    //     deleting: true,
    //     deleted: false,
    //     error: null,
    //   };

    // case DELETE_COLOR_SUCCESS:
    //   return {
    //     ...state,
    //     deleting: false,
    //     deleted: true,
    //     data: action.payload.success,
    //   };

    // case DELETE_COLOR_ERROR:
    //   return {
    //     ...state,
    //     deleting: false,
    //     deleted: false,
    //     error: action.payload.error,
    //     data: {},
    //   };

    default:
      return state
  }
}
