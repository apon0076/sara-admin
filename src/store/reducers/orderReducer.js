import {
  CREATE_ORDER_TRACKING,
  CREATE_ORDER_TRACKING_ERROR,
  CREATE_ORDER_TRACKING_SUCCESS,
  CREATE_OR_UPDATE_ORDER_STATUS_TYPE,
  CREATE_OR_UPDATE_ORDER_STATUS_TYPE_ERROR,
  CREATE_OR_UPDATE_ORDER_STATUS_TYPE_SUCCESS,
  FETCH_SINGLE_ORDER,
  FETCH_SINGLE_ORDER_ERROR,
  FETCH_SINGLE_ORDER_SUCCESS,
  FETCH_STATUS_WISE_ORDER_LIST,
  FETCH_STATUS_WISE_ORDER_LIST_ERROR,
  FETCH_STATUS_WISE_ORDER_LIST_SUCCESS,
  FILTER_DATE_ORDER_BY_ID,
  FILTER_DATE_ORDER_BY_ID_ERROR,
  FILTER_DATE_ORDER_BY_ID_SUCCESS,
  GET_CANCEL_ORDER,
  GET_CANCEL_ORDER_BY_ID,
  GET_CANCEL_ORDER_ERROR,
  GET_CANCEL_ORDER_ERROR_BY_ID,
  GET_CANCEL_ORDER_SUCCESS,
  GET_CANCEL_ORDER_SUCCESS_BY_ID,
  GET_COUNT_ORDER_STATUS,
  GET_COUNT_ORDER_STATUS_ERROR,
  GET_COUNT_ORDER_STATUS_SUCCESS,
  GET_ORDER,
  GET_ORDER_ERROR,
  GET_ORDER_STATUS_TYPE,
  GET_ORDER_STATUS_TYPE_ERROR,
  GET_ORDER_STATUS_TYPE_SUCCESS,
  GET_ORDER_STATUS_WISE,
  GET_ORDER_STATUS_WISE_ERROR,
  GET_ORDER_STATUS_WISE_SUCCESS,
  GET_ORDER_STATUS_WISE_SUMMARY,
  GET_ORDER_STATUS_WISE_SUMMARY_ERROR,
  GET_ORDER_STATUS_WISE_SUMMARY_RESET,
  GET_ORDER_STATUS_WISE_SUMMARY_SUCCESS,
  GET_ORDER_SUCCESS,
  GET_RETURN_ORDER,
  GET_RETURN_ORDER_BY_ID,
  GET_RETURN_ORDER_ERROR,
  GET_RETURN_ORDER_ERROR_BY_ID,
  GET_RETURN_ORDER_SUCCESS,
  GET_RETURN_ORDER_SUCCESS_BY_ID,
  GET_SELLER_ORDER_DETAILS,
  GET_SELLER_ORDER_DETAILS_ERROR,
  GET_SELLER_ORDER_DETAILS_SUCCESS,
  GET_SHOPWISE_ORDER_BY_ID,
  GET_SHOPWISE_ORDER_BY_ID_ERROR,
  GET_SHOPWISE_ORDER_BY_ID_SUCCESS,
  GET_SHOP_ORDER_DETAILS,
  GET_SHOP_ORDER_DETAILS_ERROR,
  GET_SHOP_ORDER_DETAILS_RESET,
  GET_SHOP_ORDER_DETAILS_SUCCESS,
  POST_CANCEL_ORDER,
  POST_CANCEL_ORDER_ERROR,
  POST_CANCEL_ORDER_RESET,
  POST_CANCEL_ORDER_SUCCESS,
  POST_RETURN_ORDER,
  POST_RETURN_ORDER_ERROR,
  POST_RETURN_ORDER_SUCCESS,
  SELLER_STATUS_WISE_ORDER_LIST,
  SELLER_STATUS_WISE_ORDER_LIST_ERROR,
  SELLER_STATUS_WISE_ORDER_LIST_SUCCESS,
  UPDATE_ORDER,
  UPDATE_ORDER_DETAILS_STATUS,
  UPDATE_ORDER_DETAILS_STATUS_ERROR,
  UPDATE_ORDER_DETAILS_STATUS_RESET,
  UPDATE_ORDER_DETAILS_STATUS_SUCCESS,
  UPDATE_ORDER_ERROR,
  UPDATE_ORDER_STATUS,
  UPDATE_ORDER_STATUS_ERROR,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_SUCCESS,
  GET_SELLER_ORDER_INVOICE,
  GET_SELLER_ORDER_INVOICE_ERROR,
  GET_SELLER_ORDER_INVOICE_SUCCESS,
} from "../actions/orderAction";

const initialState = {
  order: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
  orderStatusType: [],
  orderTracking: [],
  updateOrderStatus: [],
  updateProductWiseOrderStatus: [],
  shopWiseOrderList: [],
  filterDateOrderList: [],
  singleOrderDetails: [],
  statusWiseOrderList: [],
  sellerStatusWiseOrderList: [],
  orderListByStatus: [],
  cancelOrderStatus: [],
  fetchCancelOrders: [],
  fetchCancelOrderById: [],
  fetchReturnOrders: [],
  fetchReturnOrderById: [],
  postReturnOrder: [],
  getStatusWiseOrderSummary: [],
  orderSummaryLoading: false,
  getShopWiseOrderDetails: [],
  orderDetailsLoading: false,
  getCountOrderStatusData: [],
  sellerOrderDetails: [],
  sellerOrderInvoice: [],
  getCountOrderStatusLoading: false,
  getCountOrderStatusError: null,
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
  detailsLoading: false,
  detailsLoaded: false,
  detailsError: null,
  invoiceLoading: false,
  invoiceLoaded: false,
  invoiceError: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        order: action.payload.success,
      };

    case GET_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        order: [],
      };

    case GET_SHOPWISE_ORDER_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_SHOPWISE_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        shopWiseOrderList: action.payload.success,
      };

    case GET_SHOPWISE_ORDER_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        shopWiseOrderList: [],
      };

    case FILTER_DATE_ORDER_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case FILTER_DATE_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        filterDateOrderList: action.payload.success,
      };

    case FILTER_DATE_ORDER_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        filterDateOrderList: [],
      };

    case UPDATE_ORDER:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        data: action.payload.success,
      };

    case UPDATE_ORDER_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: action.payload.error,
        data: {},
      };

    case GET_ORDER_STATUS_TYPE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_ORDER_STATUS_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        orderStatusType: action.payload.success,
      };

    case GET_ORDER_STATUS_TYPE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        orderStatusType: [],
      };

    case CREATE_OR_UPDATE_ORDER_STATUS_TYPE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case CREATE_OR_UPDATE_ORDER_STATUS_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        orderStatusType: action.payload.success,
      };

    case CREATE_OR_UPDATE_ORDER_STATUS_TYPE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        orderStatusType: [],
      };

    case CREATE_ORDER_TRACKING:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case CREATE_ORDER_TRACKING_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        orderTracking: action.payload.success,
      };

    case CREATE_ORDER_TRACKING_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        orderTracking: [],
      };

    case UPDATE_ORDER_STATUS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        updateOrderStatus: action.payload.success,
      };

    case UPDATE_ORDER_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        updateOrderStatus: [],
      };

    case FETCH_SINGLE_ORDER:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case FETCH_SINGLE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        singleOrderDetails: action.payload.success,
      };

    case FETCH_SINGLE_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        singleOrderDetails: [],
      };

    case FETCH_STATUS_WISE_ORDER_LIST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case FETCH_STATUS_WISE_ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        statusWiseOrderList: action.payload.success,
      };

    case FETCH_STATUS_WISE_ORDER_LIST_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        statusWiseOrderList: [],
      };

    case UPDATE_ORDER_DETAILS_STATUS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case UPDATE_ORDER_DETAILS_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        updateProductWiseOrderStatus: action.payload.success,
      };

    case UPDATE_ORDER_DETAILS_STATUS_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        updateProductWiseOrderStatus: [],
      };

    case UPDATE_ORDER_DETAILS_STATUS_RESET:
      return {
        ...state,
        loading: false,
        loaded: false,
        updateProductWiseOrderStatus: [],
      };
    // Get Status Wise Order List Start
    case GET_ORDER_STATUS_WISE:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_ORDER_STATUS_WISE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        orderListByStatus: action.payload.success,
      };

    case GET_ORDER_STATUS_WISE_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        orderListByStatus: [],
      };
    // Get Status Wise Order List End
    // Get Status Wise Order List Summary Start
    case GET_ORDER_STATUS_WISE_SUMMARY:
      return {
        ...state,
        orderSummaryLoading: true,
        loaded: false,
        error: null,
      };

    case GET_ORDER_STATUS_WISE_SUMMARY_SUCCESS:
      return {
        ...state,
        orderSummaryLoading: false,
        loaded: true,
        getStatusWiseOrderSummary: action.payload.success,
      };

    case GET_ORDER_STATUS_WISE_SUMMARY_ERROR:
      return {
        ...state,
        orderSummaryLoading: false,
        loaded: false,
        error: action.payload.error,
        getStatusWiseOrderSummary: [],
      };

    case GET_ORDER_STATUS_WISE_SUMMARY_RESET:
      return {
        ...state,
        orderSummaryLoading: false,
        loaded: false,
        getStatusWiseOrderSummary: [],
      };
    // Get Status Wise Order List Summary End

    // Get Shop Wise Order Details Summary Start
    case GET_SHOP_ORDER_DETAILS:
      return {
        ...state,
        orderDetailsLoading: true,
        loaded: false,
        error: null,
      };

    case GET_SHOP_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orderDetailsLoading: false,
        loaded: true,
        getShopWiseOrderDetails: action.payload.success,
      };

    case GET_SHOP_ORDER_DETAILS_ERROR:
      return {
        ...state,
        orderDetailsLoading: false,
        loaded: false,
        error: action.payload.error,
        getShopWiseOrderDetails: [],
      };

    case GET_SHOP_ORDER_DETAILS_RESET:
      return {
        ...state,
        orderDetailsLoading: false,
        loaded: false,
        getShopWiseOrderDetails: [],
      };
    // Get Shop Wise Order Details Summary End

    case POST_CANCEL_ORDER:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case POST_CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        cancelOrderStatus: action.payload.success,
      };

    case POST_CANCEL_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        cancelOrderStatus: [],
      };

    case POST_CANCEL_ORDER_RESET:
      return {
        ...state,
        loading: false,
        loaded: false,
        cancelOrderStatus: [],
      };

    case GET_CANCEL_ORDER:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        fetchCancelOrders: action.payload.success,
      };

    case GET_CANCEL_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        fetchCancelOrders: [],
      };

    case GET_CANCEL_ORDER_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_CANCEL_ORDER_SUCCESS_BY_ID:
      return {
        ...state,
        loading: false,
        loaded: true,
        fetchCancelOrderById: action.payload.success,
      };

    case GET_CANCEL_ORDER_ERROR_BY_ID:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        fetchCancelOrderById: [],
      };

    case GET_RETURN_ORDER:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_RETURN_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        fetchReturnOrders: action.payload.success,
      };

    case GET_RETURN_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        fetchReturnOrders: [],
      };

    // ==post return order
    case POST_RETURN_ORDER:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case POST_RETURN_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        postReturnOrder: action.payload.success,
      };

    case POST_RETURN_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        postReturnOrder: [],
      };
    // ==

    case GET_RETURN_ORDER_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_RETURN_ORDER_SUCCESS_BY_ID:
      return {
        ...state,
        loading: false,
        loaded: true,
        fetchReturnOrderById: action.payload.success,
      };

    case GET_RETURN_ORDER_ERROR_BY_ID:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        fetchReturnOrderById: [],
      };

    case GET_COUNT_ORDER_STATUS:
      return {
        ...state,
        getCountOrderStatusLoading: true,
        getCountOrderStatusError: null,
      };

    case GET_COUNT_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        getCountOrderStatusLoading: false,
        getCountOrderStatusData: action.payload.success,
      };

    case GET_COUNT_ORDER_STATUS_ERROR:
      return {
        ...state,
        getCountOrderStatusLoading: false,
        getCountOrderStatusError: action.payload.error,
        getCountOrderStatusData: [],
      };

    case SELLER_STATUS_WISE_ORDER_LIST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case SELLER_STATUS_WISE_ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        sellerStatusWiseOrderList: action.payload.success,
      };

    case SELLER_STATUS_WISE_ORDER_LIST_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        sellerStatusWiseOrderList: [],
      };
    case GET_SELLER_ORDER_DETAILS:
      return {
        ...state,
        detailsLoading: true,
        detailsLoaded: false,
        error: null,
      };

    case GET_SELLER_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        detailsLoading: false,
        detailsLoaded: true,
        sellerOrderDetails: action.payload.success,
      };

    case GET_SELLER_ORDER_DETAILS_ERROR:
      return {
        ...state,
        detailsLoading: false,
        detailsLoaded: false,
        detailsError: action.payload.error,
        sellerOrderDetails: [],
      };

    case GET_SELLER_ORDER_INVOICE:
      return {
        ...state,
        invoiceLoading: true,
        invoiceLoaded: false,
        error: null,
      };

    case GET_SELLER_ORDER_INVOICE_SUCCESS:
      return {
        ...state,
        invoiceLoading: false,
        invoiceLoaded: true,
        sellerOrderInvoice: action.payload.success,
      };

    case GET_SELLER_ORDER_INVOICE_ERROR:
      return {
        ...state,
        invoiceLoading: false,
        invoiceLoaded: false,
        invoiceError: action.payload.error,
        sellerOrderInvoice: [],
      };
      
    default:
      return state;
  }
}
