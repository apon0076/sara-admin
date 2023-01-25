import {
    CREATE_DISCOUNT_HISTORY,
    CREATE_DISCOUNT_HISTORY_SUCCESS,
    CREATE_DISCOUNT_HISTORY_ERROR
    
  } from "../actions/discountHistoryAction";
  
  const initialState = {
    discountHistories: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
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
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case CREATE_DISCOUNT_HISTORY:
        return {
          ...state,
          saving: true,
          saved: false,
          error: null,
        };
  
      case CREATE_DISCOUNT_HISTORY_SUCCESS:
        return {
          ...state,
          saving: false,
          saved: true,
          data: action.payload.success,
        };
  
      case CREATE_DISCOUNT_HISTORY_ERROR:
        return {
          ...state,
          saving: false,
          saved: false,
          error: action.payload.error,
          data: {},
        };
      default:
        return state;
    }
  }
  