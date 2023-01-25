import {
    GET_REALTIME_DATA_BY_BARCODE,
    GET_REALTIME_DATA_BY_BARCODE_SUCCESS,
    GET_REALTIME_DATA_BY_BARCODE_ERROR,
    GET_REALTIME_DATA_BY_BARCODE_RESET

  } from "../actions/realtimeDataAction"
  
  const initialState = {
    realtimeData: [],
    success: false,
    loading: false,
    error: null
  };
  
  export const realtimeDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_REALTIME_DATA_BY_BARCODE:
        return { 
          ...state, 
          loading: true, 
          success: false 
        };

      case GET_REALTIME_DATA_BY_BARCODE_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          realtimeData: action.payload
        };

      case GET_REALTIME_DATA_BY_BARCODE_ERROR:
        return { 
          ...state, 
          loading: false, 
          error: action.payload 
        };

      case GET_REALTIME_DATA_BY_BARCODE_RESET:
        return { 
          realtimeData: [], 
          loading: false, 
          error: null 
        };
        
      default:
        return state;
    }
  };
  