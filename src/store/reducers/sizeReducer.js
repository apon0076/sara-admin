import // GET_SIZE,
// GET_SIZE_SUCCESS,
// GET_SIZE_ERROR,
// GET_SIZE_BY_ID,
// GET_SIZE_BY_ID_SUCCESS,
// GET_SIZE_BY_ID_ERROR,
// CREATE_SIZE,
// CREATE_SIZE_SUCCESS,
// CREATE_SIZE_ERROR,
// UPDATE_SIZE,
// UPDATE_SIZE_SUCCESS,
// UPDATE_SIZE_ERROR,
// DELETE_SIZE,
// DELETE_SIZE_SUCCESS,
// DELETE_SIZE_ERROR,
"../actions/sizeAction";

const intialState = {
  sizes: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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
};

export default function (state = intialState, action) {
  switch (action.type) {
    // case GET_SIZE:
    //   return {
    //     ...state,
    //     loading: true,
    //     loaded: false,
    //     error: null,
    //   };

    // case GET_SIZE_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: true,
    //     sizes: action.payload.success,
    //   };

    // case GET_SIZE_ERROR:
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: false,
    //     error: action.payload.error,
    //     sizes: [],
    //   };

    // case GET_SIZE_BY_ID:
    //   return {
    //     ...state,
    //     loading: true,
    //     loaded: false,
    //     error: null,
    //   };

    // case GET_SIZE_BY_ID_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: true,
    //     sizes: action.payload.success,
    //   };

    // case GET_SIZE_BY_ID_ERROR:
    //   return {
    //     ...state,
    //     loading: false,
    //     loaded: false,
    //     error: action.payload.error,
    //     sizes: [],
    //   };

    // case CREATE_SIZE:
    //   return {
    //     ...state,
    //     saving: true,
    //     saved: false,
    //     error: null,
    //   };

    // case CREATE_SIZE_SUCCESS:
    //   return {
    //     ...state,
    //     saving: false,
    //     saved: true,
    //     data: action.payload.success,
    //   };

    // case CREATE_SIZE_ERROR:
    //   return {
    //     ...state,
    //     saving: false,
    //     saved: false,
    //     error: action.payload.error,
    //     data: {},
    //   };

    // case UPDATE_SIZE:
    //   return {
    //     ...state,
    //     updating: true,
    //     updated: false,
    //     error: null,
    //   };

    // case UPDATE_SIZE_SUCCESS:
    //   return {
    //     ...state,
    //     updating: false,
    //     updated: true,
    //     data: action.payload.success,
    //   };

    // case UPDATE_SIZE_ERROR:
    //   return {
    //     ...state,
    //     updating: false,
    //     updated: false,
    //     error: action.payload.error,
    //     data: {},
    //   };

    // case DELETE_SIZE:
    //   return {
    //     ...state,
    //     deleting: true,
    //     deleted: false,
    //     error: null,
    //   };

    // case DELETE_SIZE_SUCCESS:
    //   return {
    //     ...state,
    //     deleting: false,
    //     deleted: true,
    //     data: action.payload.success,
    //   };

    // case DELETE_SIZE_ERROR:
    //   return {
    //     ...state,
    //     deleting: false,
    //     deleted: false,
    //     error: action.payload.error,
    //     data: {},
    //   };

    default:
      return state;
  }
}
