import orderRequisitionService from '../services/orderRequisitionService'

export const GET_ORDER_REQUISITION = 'GET_ORDER_REQUISITION'
export const GET_ORDER_REQUISITION_SUCCESS = 'GET_ORDER_REQUISITION_SUCCESS'
export const GET_ORDER_REQUISITION_ERROR = 'GET_ORDER_REQUISITION_ERROR'

// ----------------
export function getOrderRequisitionRecord(currentPage, itemPerPage) {
  return async (dispatch) => {
    dispatch(getOrderRequisition())
    return await orderRequisitionService
      .getOrderRequisition(currentPage, itemPerPage)
      .then((response) => dispatch(getOrderRequisitionSuccess(response)))
      .catch((error) => dispatch(getOrderRequisitionError(error)))
  }
}

export function getOrderRequisition() {
  return {
    type: GET_ORDER_REQUISITION,
  }
}

export function getOrderRequisitionSuccess(success) {
  return {
    type: GET_ORDER_REQUISITION_SUCCESS,
    payload: { success },
  }
}

export function getOrderRequisitionError(error) {
  return {
    type: GET_ORDER_REQUISITION_ERROR,
    payload: { error },
  }
}
