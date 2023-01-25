import {
    GET_ADDRESS_ONE_API,
    GET_ADDRESS_ONE_API_SUCCESS,
    GET_ADDRESS_ONE_API_ERROR
    
  } from "../actions/regionAction"
  
  
  const initialState = {
    regions: [],
    loading: false,
    loaded: false,
    saving: false,
    saved: false,
    updating: false,
    updated: false,
    error: null
  }
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case GET_ADDRESS_ONE_API:
        return {
          ...state,
          loading: true,
          loaded: false,
          error: null,
        }
  
      case GET_ADDRESS_ONE_API_SUCCESS:
        return {
          ...state,
          loading: false,
          loaded: true,
          regions: action.payload.success,
        }
  
      case GET_ADDRESS_ONE_API_ERROR:
        return {
          ...state,
          loading: false,
          loaded: false,
          error: action.payload.error,
          regions: [],
        }
  
      default:
        return state
    }
  }
  