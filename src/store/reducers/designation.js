import {
  GET_DESIGNATION,
  GET_DESIGNATION_SUCCESS,
  GET_DESIGNATION_ERROR
  
} from "../actions/designation"

const initialState = {
  data: [],
  loading: false,
  error: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DESIGNATION:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case GET_DESIGNATION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload.success,
      }

    case GET_DESIGNATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: [],
      }

    default:
      return state
  }
}
