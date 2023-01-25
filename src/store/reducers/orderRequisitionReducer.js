import {
  GET_ORDER_REQUISITION,
  GET_ORDER_REQUISITION_SUCCESS,
  GET_ORDER_REQUISITION_ERROR,
} from '../actions/orderRequisitionAction'

const initialState = {
  orderRequisition: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
  data: {}, // THIS IS USED FOR TO HOLD SAVE DATA
  loading: false,
  loaded: false,
  error: null,
}

export const orderRequisitionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUISITION:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }

    case GET_ORDER_REQUISITION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        orderRequisition: action.payload.success,
      }

    case GET_ORDER_REQUISITION_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        orderRequisition: [],
      }

    default:
      return state
  }
}
