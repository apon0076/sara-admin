import orderService from "../services/orderService";

export const GET_ORDER = "GET_ORDER";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_ERROR = "GET_ORDER_ERROR";

export const GET_SHOPWISE_ORDER_BY_ID = "GET_SHOPWISE_ORDER_BY_ID";
export const GET_SHOPWISE_ORDER_BY_ID_SUCCESS =
  "GET_SHOPWISE_ORDER_BY_ID_SUCCESS";
export const GET_SHOPWISE_ORDER_BY_ID_ERROR = "GET_SHOPWISE_ORDER_BY_ID_ERROR";

export const FILTER_DATE_ORDER_BY_ID = "FILTER_DATE_ORDER_BY_ID";
export const FILTER_DATE_ORDER_BY_ID_SUCCESS =
  "FILTER_DATE_ORDER_BY_ID_SUCCESS";
export const FILTER_DATE_ORDER_BY_ID_ERROR = "FILTER_DATE_ORDER_BY_ID_ERROR";

export const UPDATE_ORDER = "UPDATE_ORDER";
export const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS";
export const UPDATE_ORDER_ERROR = "UPDATE_ORDER_ERROR";

export const GET_ORDER_STATUS_TYPE = "GET_ORDER_STATUS_TYPE";
export const GET_ORDER_STATUS_TYPE_SUCCESS = "GET_ORDER_STATUS_TYPE_SUCCESS";
export const GET_ORDER_STATUS_TYPE_ERROR = "GET_ORDER_STATUS_TYPE_ERROR";

export const CREATE_OR_UPDATE_ORDER_STATUS_TYPE =
  "CREATE_OR_UPDATE_ORDER_STATUS_TYPE";
export const CREATE_OR_UPDATE_ORDER_STATUS_TYPE_SUCCESS =
  "CREATE_OR_UPDATE_ORDER_STATUS_TYPE_SUCCESS";
export const CREATE_OR_UPDATE_ORDER_STATUS_TYPE_ERROR =
  "CREATE_OR_UPDATE_ORDER_STATUS_TYPE_ERROR";

export const CREATE_ORDER_TRACKING = "CREATE_ORDER_TRACKING";
export const CREATE_ORDER_TRACKING_SUCCESS = "CREATE_ORDER_TRACKING_SUCCESS";
export const CREATE_ORDER_TRACKING_ERROR = "CREATE_ORDER_TRACKING_ERROR";

export const UPDATE_ORDER_STATUS = "UPDATE_ORDER_STATUS";
export const UPDATE_ORDER_STATUS_SUCCESS = "UPDATE_ORDER_STATUS_SUCCESS";
export const UPDATE_ORDER_STATUS_ERROR = "UPDATE_ORDER_STATUS_ERROR";

export const FETCH_SINGLE_ORDER = "FETCH_SINGLE_ORDER";
export const FETCH_SINGLE_ORDER_SUCCESS = "FETCH_SINGLE_ORDER_SUCCESS";
export const FETCH_SINGLE_ORDER_ERROR = "FETCH_SINGLE_ORDER_ERROR";

export const FETCH_STATUS_WISE_ORDER_LIST = "FETCH_STATUS_WISE_ORDER_LIST";
export const FETCH_STATUS_WISE_ORDER_LIST_SUCCESS =
  "FETCH_STATUS_WISE_ORDER_LIST_SUCCESS";
export const FETCH_STATUS_WISE_ORDER_LIST_ERROR =
  "FETCH_STATUS_WISE_ORDER_LIST_ERROR";

export const UPDATE_ORDER_DETAILS_STATUS = "UPDATE_ORDER_DETAILS_STATUS";
export const UPDATE_ORDER_DETAILS_STATUS_SUCCESS =
  "UPDATE_ORDER_DETAILS_STATUS_SUCCESS";
export const UPDATE_ORDER_DETAILS_STATUS_ERROR =
  "UPDATE_ORDER_DETAILS_STATUS_ERROR";
export const UPDATE_ORDER_DETAILS_STATUS_RESET =
  "UPDATE_ORDER_DETAILS_STATUS_RESET";

export const GET_ORDER_STATUS_WISE = "GET_ORDER_STATUS_WISE";
export const GET_ORDER_STATUS_WISE_SUCCESS = "GET_ORDER_STATUS_WISE_SUCCESS";
export const GET_ORDER_STATUS_WISE_ERROR = "GET_ORDER_STATUS_WISE_ERROR";

export const GET_ORDER_STATUS_WISE_SUMMARY = "GET_ORDER_STATUS_WISE_SUMMARY";
export const GET_ORDER_STATUS_WISE_SUMMARY_SUCCESS =
  "GET_ORDER_STATUS_WISE_SUMMARY_SUCCESS";
export const GET_ORDER_STATUS_WISE_SUMMARY_ERROR =
  "GET_ORDER_STATUS_WISE_SUMMARY_ERROR";
export const GET_ORDER_STATUS_WISE_SUMMARY_RESET =
  "GET_ORDER_STATUS_WISE_SUMMARY_RESET";

export const GET_SHOP_ORDER_DETAILS = "GET_SHOP_ORDER_DETAILS";
export const GET_SHOP_ORDER_DETAILS_SUCCESS = "GET_SHOP_ORDER_DETAILS_SUCCESS";
export const GET_SHOP_ORDER_DETAILS_ERROR = "GET_SHOP_ORDER_DETAILS_ERROR";
export const GET_SHOP_ORDER_DETAILS_RESET = "GET_SHOP_ORDER_DETAILS_RESET";

export const POST_CANCEL_ORDER = "POST_CANCEL_ORDER";
export const POST_CANCEL_ORDER_SUCCESS = "POST_CANCEL_ORDER_SUCCESS";
export const POST_CANCEL_ORDER_ERROR = "POST_CANCEL_ORDER_ERROR";
export const POST_CANCEL_ORDER_RESET = "POST_CANCEL_ORDER_RESET";

export const GET_CANCEL_ORDER = "GET_CANCEL_ORDER";
export const GET_CANCEL_ORDER_SUCCESS = "GET_CANCEL_ORDER_SUCCESS";
export const GET_CANCEL_ORDER_ERROR = "GET_CANCEL_ORDER_ERROR";

export const GET_CANCEL_ORDER_BY_ID = "GET_CANCEL_ORDER_BY_ID";
export const GET_CANCEL_ORDER_SUCCESS_BY_ID = "GET_CANCEL_ORDER_SUCCESS_BY_ID";
export const GET_CANCEL_ORDER_ERROR_BY_ID = "GET_CANCEL_ORDER_ERROR_BY_ID";

export const GET_RETURN_ORDER = "GET_RETURN_ORDER";
export const GET_RETURN_ORDER_SUCCESS = "GET_RETURN_ORDER_SUCCESS";
export const GET_RETURN_ORDER_ERROR = "GET_RETURN_ORDER_ERROR";

export const GET_RETURN_ORDER_BY_ID = "GET_CANCEL_ORDER_BY_ID";
export const GET_RETURN_ORDER_SUCCESS_BY_ID = "GET_CANCEL_ORDER_SUCCESS_BY_ID";
export const GET_RETURN_ORDER_ERROR_BY_ID = "GET_CANCEL_ORDER_ERROR_BY_ID";

export const POST_RETURN_ORDER = "POST_RETURN_ORDER";
export const POST_RETURN_ORDER_SUCCESS = "POST_RETURN_ORDER_SUCCESS";
export const POST_RETURN_ORDER_ERROR = "POST_RETURN_ORDER_ERROR";

export const GET_COUNT_ORDER_STATUS = "GET_COUNT_ORDER_STATUS";
export const GET_COUNT_ORDER_STATUS_SUCCESS = "GET_COUNT_ORDER_STATUS_SUCCESS";
export const GET_COUNT_ORDER_STATUS_ERROR = "GET_COUNT_ORDER_STATUS_ERROR";

export const SELLER_STATUS_WISE_ORDER_LIST = "SELLER_STATUS_WISE_ORDER_LIST";
export const SELLER_STATUS_WISE_ORDER_LIST_SUCCESS = "SELLER_STATUS_WISE_ORDER_LIST_SUCCESS";
export const SELLER_STATUS_WISE_ORDER_LIST_ERROR = "SELLER_STATUS_WISE_ORDER_LIST_ERROR";

export const GET_SELLER_ORDER_DETAILS = "GET_SELLER_ORDER_DETAILS";
export const GET_SELLER_ORDER_DETAILS_SUCCESS = "GET_SELLER_ORDER_DETAILS_SUCCESS";
export const GET_SELLER_ORDER_DETAILS_ERROR = "GET_SELLER_ORDER_DETAILS_ERROR";
export const GET_SELLER_ORDER_DETAILS_RESET = "GET_SELLER_ORDER_DETAILS_RESET";

export const GET_SELLER_ORDER_INVOICE = "GET_SELLER_ORDER_INVOICE";
export const GET_SELLER_ORDER_INVOICE_SUCCESS = "GET_SELLER_ORDER_INVOICE_SUCCESS";
export const GET_SELLER_ORDER_INVOICE_ERROR = "GET_SELLER_ORDER_INVOICE_ERROR";
export const GET_SELLER_ORDER_INVOICE_RESET = "GET_SELLER_ORDER_INVOICE_RESET";

// ----------------
export function getOrderRecord() {
  return async (dispatch) => {
    dispatch(getOrder());
    return await orderService
      .getOrder()

      .then((response) => dispatch(getOrderSuccess(response.data)))
      .catch((error) => dispatch(getOrderError(error)));
  };
}

export function getOrder() {
  return {
    type: GET_ORDER,
  };
}

export function getOrderSuccess(success) {
  return {
    type: GET_ORDER_SUCCESS,
    payload: { success },
  };
}

export function getOrderError(error) {
  return {
    type: GET_ORDER_ERROR,
    payload: { error },
  };
}
// -------------

// Get Status Wise Order List Start
export function getOrderStatusWiseRecord(
  status_name_from_url,
  currentPage,
  itemPerPage,
  searchKeyword,
  startDate,
  endDate,
  selectVendor,
  selectPaymentStatus,
  selectPaymentMethod
) {
  return async (dispatch) => {
    dispatch(getOrderStatusWise());
    return await orderService
      .getOrderStatusWise(
        status_name_from_url,
        currentPage,
        itemPerPage,
        searchKeyword,
        startDate,
        endDate,
        selectVendor,
        selectPaymentStatus,
        selectPaymentMethod
      )
      .then((response) => dispatch(getOrderStatusWiseSuccess(response)))
      .catch((error) => dispatch(getOrderStatusWiseError(error)));
  };
}

export function getOrderStatusWise() {
  return {
    type: GET_ORDER_STATUS_WISE,
  };
}

export function getOrderStatusWiseSuccess(success) {
  return {
    type: GET_ORDER_STATUS_WISE_SUCCESS,
    payload: { success },
  };
}

export function getOrderStatusWiseError(error) {
  return {
    type: GET_ORDER_STATUS_WISE_ERROR,
    payload: { error },
  };
}
// Get Status Wise Order List End

// Get Status Wise Order Summary Start
export function getOrderStatusWiseSummaryRecord(status, invoice) {
  return async (dispatch) => {
    dispatch(getOrderStatusWiseSummary());
    return await orderService
      .getOrderStatusWiseSummary(status, invoice)
      .then((response) => dispatch(getOrderStatusWiseSummarySuccess(response)))
      .catch((error) => dispatch(getOrderStatusWiseSummaryError(error)));
  };
}

export function getOrderStatusWiseSummary() {
  return {
    type: GET_ORDER_STATUS_WISE_SUMMARY,
  };
}

export function getOrderStatusWiseSummarySuccess(success) {
  return {
    type: GET_ORDER_STATUS_WISE_SUMMARY_SUCCESS,
    payload: { success },
  };
}

export function getOrderStatusWiseSummaryError(error) {
  return {
    type: GET_ORDER_STATUS_WISE_SUMMARY_ERROR,
    payload: { error },
  };
}
// Get Status Wise Order Summary End

// Get Shop Wise Order Details Start
export function getShopWiseOrderDetailsRecord(statusName, invoiceNo, orderNo) {
  return async (dispatch) => {
    dispatch(getShopWiseOrderDetails());
    return await orderService
      .getShopWiseOrderDetails(statusName, invoiceNo, orderNo)
      .then((response) => dispatch(getShopWiseOrderDetailsSuccess(response)))
      .catch((error) => dispatch(getShopWiseOrderDetailsError(error)));
  };
}

export function getShopWiseOrderDetails() {
  return {
    type: GET_SHOP_ORDER_DETAILS,
  };
}

export function getShopWiseOrderDetailsSuccess(success) {
  return {
    type: GET_SHOP_ORDER_DETAILS_SUCCESS,
    payload: { success },
  };
}

export function getShopWiseOrderDetailsError(error) {
  return {
    type: GET_SHOP_ORDER_DETAILS_ERROR,
    payload: { error },
  };
}
// Get Shop Wise Order Details End

// ---------------
export function getShopWiseOrderByIdRecord(shopId) {
  return async (dispatch) => {
    dispatch(getShopWiseOrderById());
    return await orderService
      .getShopWiseOrderById(shopId)

      .then((response) => dispatch(getShopWiseOrderByIdSuccess(response.data)))
      .catch((error) => dispatch(getShopWiseOrderByIdError(error)));
  };
}

export function getShopWiseOrderById() {
  return {
    type: GET_SHOPWISE_ORDER_BY_ID,
  };
}

export function getShopWiseOrderByIdSuccess(success) {
  return {
    type: GET_SHOPWISE_ORDER_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getShopWiseOrderByIdError(error) {
  return {
    type: GET_SHOPWISE_ORDER_BY_ID_ERROR,
    payload: { error },
  };
}

export function filterDateOrderByIdRecord(shopId, startDate, endDate) {
  return async (dispatch) => {
    dispatch(filterDateOrderById());
    return await orderService
      .filterDateOrderById(shopId, startDate, endDate)

      .then((response) => dispatch(filterDateOrderByIdSuccess(response.data)))
      .catch((error) => dispatch(filterDateOrderByIdError(error)));
  };
}

export function filterDateOrderById() {
  return {
    type: FILTER_DATE_ORDER_BY_ID,
  };
}

export function filterDateOrderByIdSuccess(success) {
  return {
    type: FILTER_DATE_ORDER_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function filterDateOrderByIdError(error) {
  return {
    type: FILTER_DATE_ORDER_BY_ID_ERROR,
    payload: { error },
  };
}

export function updateOrderRecord(breadcrumbsCategories) {
  return async (dispatch) => {
    dispatch(updateOrder());
    return await orderService
      .createOrder(breadcrumbsCategories)

      .then((response) => dispatch(updateOrderSuccess(response)))
      .catch((error) => dispatch(updateOrderError(error)));
  };
}

export function updateOrder() {
  return {
    type: UPDATE_ORDER,
  };
}

export function updateOrderSuccess(success) {
  return {
    type: UPDATE_ORDER_SUCCESS,
    payload: { success },
  };
}

export function updateOrderError(error) {
  return {
    type: UPDATE_ORDER_ERROR,
    payload: { error },
  };
}

//Order Types

export function getOrderStatusTypeRecord() {
  return async (dispatch) => {
    dispatch(getOrderStatusType());
    return await orderService
      .getOrderStatusType()

      .then((response) => dispatch(getOrderStatusTypeSuccess(response.data)))
      .catch((error) => dispatch(getOrderStatusTypeError(error)));
  };
}

export function getOrderStatusType() {
  return {
    type: GET_ORDER_STATUS_TYPE,
  };
}

export function getOrderStatusTypeSuccess(success) {
  return {
    type: GET_ORDER_STATUS_TYPE_SUCCESS,
    payload: { success },
  };
}

export function getOrderStatusTypeError(error) {
  return {
    type: GET_ORDER_STATUS_TYPE_ERROR,
    payload: { error },
  };
}

export function createOrUpdateOrderStatusTypeRecord(data) {
  return async (dispatch) => {
    dispatch(createOrUpdateOrderStatusType());
    return await orderService
      .createOrUpdateOrderStatusType(data)

      .then((response) =>
        dispatch(createOrUpdateOrderStatusTypeSuccess(response.data))
      )
      .catch((error) => dispatch(createOrUpdateOrderStatusTypeError(error)));
  };
}

export function createOrUpdateOrderStatusType() {
  return {
    type: CREATE_OR_UPDATE_ORDER_STATUS_TYPE,
  };
}

export function createOrUpdateOrderStatusTypeSuccess(success) {
  return {
    type: CREATE_OR_UPDATE_ORDER_STATUS_TYPE_SUCCESS,
    payload: { success },
  };
}

export function createOrUpdateOrderStatusTypeError(error) {
  return {
    type: CREATE_OR_UPDATE_ORDER_STATUS_TYPE_ERROR,
    payload: { error },
  };
}

export function createOrderTrackingRecord(data) {
  return async (dispatch) => {
    dispatch(createOrderTracking());
    return await orderService
      .createOrderTracking(data)

      .then((response) => dispatch(createOrderTrackingSuccess(response.data)))
      .catch((error) => dispatch(createOrderTrackingError(error)));
  };
}

export function createOrderTracking() {
  return {
    type: CREATE_ORDER_TRACKING,
  };
}

export function createOrderTrackingSuccess(success) {
  return {
    type: CREATE_ORDER_TRACKING_SUCCESS,
    payload: { success },
  };
}

export function createOrderTrackingError(error) {
  return {
    type: CREATE_ORDER_TRACKING_ERROR,
    payload: { error },
  };
}

export function updateShopWiseOrderStatusRecord(data) {
  return async (dispatch) => {
    dispatch(updateShopWiseOrderStatus());
    return await orderService
      .updateShopWiseOrderStatus(data)

      .then((response) =>
        dispatch(updateShopWiseOrderStatusSuccess(response.data))
      )
      .catch((error) => dispatch(updateShopWiseOrderStatusError(error)));
  };
}

export function updateShopWiseOrderStatus() {
  return {
    type: UPDATE_ORDER_STATUS,
  };
}

export function updateShopWiseOrderStatusSuccess(success) {
  return {
    type: UPDATE_ORDER_STATUS_SUCCESS,
    payload: { success },
  };
}

export function updateShopWiseOrderStatusError(error) {
  return {
    type: UPDATE_ORDER_STATUS_ERROR,
    payload: { error },
  };
}

// ---------------------
export function fetchSingleOrderRecord(data) {
  return async (dispatch) => {
    dispatch(fetchSingleOrder());
    return await orderService
      .fetchSingleOrder(data)

      .then((response) => dispatch(fetchSingleOrderSuccess(response.data)))
      .catch((error) => dispatch(fetchSingleOrderError(error)));
  };
}

export function fetchSingleOrder() {
  return {
    type: FETCH_SINGLE_ORDER,
  };
}

export function fetchSingleOrderSuccess(success) {
  return {
    type: FETCH_SINGLE_ORDER_SUCCESS,
    payload: { success },
  };
}

export function fetchSingleOrderError(error) {
  return {
    type: FETCH_SINGLE_ORDER_ERROR,
    payload: { error },
  };
}

// ---------------------
export function fetchStatusWiseOrderListRecord(
  statusId,
  shopId,
  currentPage,
  itemPerPage
) {
  return async (dispatch) => {
    dispatch(fetchStatusWiseOrderList());
    return await orderService
      .fetchStatusWiseOrderList(statusId, shopId, currentPage, itemPerPage)

      .then((response) => dispatch(fetchStatusWiseOrderListSuccess(response)))
      .catch((error) => dispatch(fetchStatusWiseOrderListError(error)));
  };
}

export function fetchStatusWiseOrderList() {
  return {
    type: FETCH_STATUS_WISE_ORDER_LIST,
  };
}

export function fetchStatusWiseOrderListSuccess(success) {
  return {
    type: FETCH_STATUS_WISE_ORDER_LIST_SUCCESS,
    payload: { success },
  };
}

export function fetchStatusWiseOrderListError(error) {
  return {
    type: FETCH_STATUS_WISE_ORDER_LIST_ERROR,
    payload: { error },
  };
}

// --------------------

export function updateProductWiseOrderStatusRecord(data) {
  return async (dispatch) => {
    dispatch(updateProductWiseOrderStatus());
    return await orderService
      .updateProductWiseOrderStatus(data)

      .then((response) =>
        dispatch(updateProductWiseOrderStatusSuccess(response.data))
      )
      .catch((error) => dispatch(updateProductWiseOrderStatusError(error)));
  };
}

export function updateProductWiseOrderStatus() {
  return {
    type: UPDATE_ORDER_DETAILS_STATUS,
  };
}

export function updateProductWiseOrderStatusSuccess(success) {
  return {
    type: UPDATE_ORDER_DETAILS_STATUS_SUCCESS,
    payload: { success },
  };
}

export function updateProductWiseOrderStatusError(error) {
  return {
    type: UPDATE_ORDER_DETAILS_STATUS_ERROR,
    payload: { error },
  };
}

export function updateProductWiseOrderStatusReset() {
  return {
    type: UPDATE_ORDER_DETAILS_STATUS_RESET,
  };
}
// --------------------

// Update Cancel Order Status
export function updateProductWiseCancelOrderStatusRecord(data) {
  return async (dispatch) => {
    dispatch(updateProductWiseCancelOrderStatus());
    return await orderService
      .updateProductWiseCancelOrderStatus(data)
      .then((response) =>
        dispatch(updateProductWiseCancelOrderStatusSuccess(response.data))
      )
      .catch((error) =>
        dispatch(updateProductWiseCancelOrderStatusError(error))
      );
  };
}

export function updateProductWiseCancelOrderStatus() {
  return {
    type: POST_CANCEL_ORDER,
  };
}

export function updateProductWiseCancelOrderStatusSuccess(success) {
  return {
    type: POST_CANCEL_ORDER_SUCCESS,
    payload: { success },
  };
}

export function updateProductWiseCancelOrderStatusError(error) {
  return {
    type: POST_CANCEL_ORDER_ERROR,
    payload: { error },
  };
}

export function updateProductWiseCancelOrderStatusReset() {
  return {
    type: POST_CANCEL_ORDER_RESET,
  };
}
// --------------------

// --------------------
export function fetchCancelOrdersRecord(
  status_for_api_call,
  currentPage,
  itemPerPage
) {
  return async (dispatch) => {
    dispatch(fetchCancelOrder());
    return await orderService
      .fetchCancelOrder(status_for_api_call, currentPage, itemPerPage)

      .then((response) => dispatch(fetchCancelOrderSuccess(response)))
      .catch((error) => dispatch(fetchCancelOrderError(error)));
  };
}

export function fetchCancelOrder() {
  return {
    type: GET_CANCEL_ORDER,
  };
}

export function fetchCancelOrderSuccess(success) {
  return {
    type: GET_CANCEL_ORDER_SUCCESS,
    payload: { success },
  };
}

export function fetchCancelOrderError(error) {
  return {
    type: GET_CANCEL_ORDER_ERROR,
    payload: { error },
  };
}

export function fetchCancelOrderByIdRecord(
  status_for_api_call,
  shopId,
  currentPage,
  itemPerPage
) {
  return async (dispatch) => {
    dispatch(fetchCancelOrderById());
    return await orderService
      .fetchCancelOrderById(
        status_for_api_call,
        shopId,
        currentPage,
        itemPerPage
      )

      .then((response) => dispatch(fetchCancelOrderByIdSuccess(response)))
      .catch((error) => dispatch(fetchCancelOrderByIdError(error)));
  };
}

export function fetchCancelOrderById() {
  return {
    type: GET_CANCEL_ORDER_BY_ID,
  };
}

export function fetchCancelOrderByIdSuccess(success) {
  return {
    type: GET_CANCEL_ORDER_SUCCESS_BY_ID,
    payload: { success },
  };
}

export function fetchCancelOrderByIdError(error) {
  return {
    type: GET_CANCEL_ORDER_ERROR_BY_ID,
    payload: { error },
  };
}

// --------------------

// Get Return Orders
export function fetchReturnOrdersRecord(
  status_for_api_call,
  currentPage,
  itemPerPage
) {
  return async (dispatch) => {
    dispatch(fetchReturnOrders());
    return await orderService
      .fetchReturnOrders(status_for_api_call, currentPage, itemPerPage)

      .then((response) => dispatch(fetchReturnOrdersSuccess(response)))
      .catch((error) => dispatch(fetchReturnOrdersError(error)));
  };
}
export function fetchReturnOrders() {
  return {
    type: GET_RETURN_ORDER,
  };
}
export function fetchReturnOrdersSuccess(success) {
  return {
    type: GET_RETURN_ORDER_SUCCESS,
    payload: { success },
  };
}
export function fetchReturnOrdersError(error) {
  return {
    type: GET_RETURN_ORDER_ERROR,
    payload: { error },
  };
}
// --------------------

// --------------------
export function fetchReturnOrderByIdRecord(
  status_for_api_call,
  shopId,
  currentPage,
  itemPerPage
) {
  return async (dispatch) => {
    dispatch(fetchReturnOrderById());
    return await orderService
      .fetchReturnOrderById(
        status_for_api_call,
        shopId,
        currentPage,
        itemPerPage
      )

      .then((response) => dispatch(fetchReturnOrderByIdSuccess(response.data)))
      .catch((error) => dispatch(fetchReturnOrderByIdError(error)));
  };
}

export function fetchReturnOrderById() {
  return {
    type: GET_RETURN_ORDER_BY_ID,
  };
}

export function fetchReturnOrderByIdSuccess(success) {
  return {
    type: GET_RETURN_ORDER_SUCCESS_BY_ID,
    payload: { success },
  };
}

export function fetchReturnOrderByIdError(error) {
  return {
    type: GET_RETURN_ORDER_ERROR_BY_ID,
    payload: { error },
  };
}
// --------------------

// Update Return Order Status
export function updateProductWiseReturnOrderStatusRecord(data) {
  return async (dispatch) => {
    dispatch(updateProductWiseReturnOrderStatus());
    return await orderService
      .updateProductWiseReturnOrderStatus(data)

      .then((response) =>
        dispatch(updateProductWiseReturnOrderStatusSuccess(response.data))
      )
      .catch((error) =>
        dispatch(updateProductWiseReturnOrderStatusError(error))
      );
  };
}

export function updateProductWiseReturnOrderStatus() {
  return {
    type: POST_RETURN_ORDER,
  };
}

export function updateProductWiseReturnOrderStatusSuccess(success) {
  return {
    type: POST_RETURN_ORDER_SUCCESS,
    payload: { success },
  };
}

export function updateProductWiseReturnOrderStatusError(error) {
  return {
    type: POST_RETURN_ORDER_ERROR,
    payload: { error },
  };
}
// --------------------
// Get Count Order Status - Start
export function getCountOrderStatusRecord() {
  return async (dispatch) => {
    dispatch(getCountOrderStatus());
    return await orderService
      .getCountOrderStatus()

      .then((response) => dispatch(getCountOrderStatusSuccess(response)))
      .catch((error) => dispatch(getCountOrderStatusError(error)));
  };
}

export function getCountOrderStatus() {
  return {
    type: GET_COUNT_ORDER_STATUS,
  };
}

export function getCountOrderStatusSuccess(success) {
  return {
    type: GET_COUNT_ORDER_STATUS_SUCCESS,
    payload: { success },
  };
}

export function getCountOrderStatusError(error) {
  return {
    type: GET_COUNT_ORDER_STATUS_ERROR,
    payload: { error },
  };
}
// Get Count Order Status - End

// ---- Seller Status wise order start ---- 

export function sellerStatusWiseOrderListRecord(
  statusName,
  currentPage,
  itemPerPage
) {
  return async (dispatch) => {
    dispatch(sellerStatusWiseOrderList());
    return await orderService
      .sellerStatusWiseOrderList(statusName, currentPage, itemPerPage)

      .then((response) => dispatch(sellerStatusWiseOrderListSuccess(response)))
      .catch((error) => dispatch(sellerStatusWiseOrderListError(error)));
  };
}

export function sellerStatusWiseOrderList() {
  return {
    type: SELLER_STATUS_WISE_ORDER_LIST,
  };
}

export function sellerStatusWiseOrderListSuccess(success) {
  return {
    type: SELLER_STATUS_WISE_ORDER_LIST_SUCCESS,
    payload: { success },
  };
}

export function sellerStatusWiseOrderListError(error) {
  return {
    type: SELLER_STATUS_WISE_ORDER_LIST_ERROR,
    payload: { error },
  };
}

// ---- Seller Status wise order end ---- 

// Get seller Order Details Start
export function getSellerOrderDetailsRecord(orderProfileId) {
  return async (dispatch) => {
    dispatch(getSellerOrderDetails());
    return await orderService
      .getSellerOrderDetails(orderProfileId)
      .then((response) => dispatch(getSellerOrderDetailsSuccess(response)))
      .catch((error) => dispatch(getSellerOrderDetailsError(error)));
  };
}

export function getSellerOrderDetails() {
  return {
    type: GET_SELLER_ORDER_DETAILS,
  };
}

export function getSellerOrderDetailsSuccess(success) {
  return {
    type: GET_SELLER_ORDER_DETAILS_SUCCESS,
    payload: { success },
  };
}

export function getSellerOrderDetailsError(error) {
  return {
    type: GET_SELLER_ORDER_DETAILS_ERROR,
    payload: { error },
  };
}
// Get seller Order Details End

// Get seller Order Invoice Start
export function getSellerOrderInvoiceRecord(shopWiseOrderNo) {
  return async (dispatch) => {
    dispatch(getSellerOrderInvoice());
    return await orderService
      .getSellerOrderInvoice(shopWiseOrderNo)
      .then((response) => dispatch(getSellerOrderInvoiceSuccess(response)))
      .catch((error) => dispatch(getSellerOrderInvoiceError(error)));
  };
}

export function getSellerOrderInvoice() {
  return {
    type: GET_SELLER_ORDER_INVOICE,
  };
}

export function getSellerOrderInvoiceSuccess(success) {
  return {
    type: GET_SELLER_ORDER_INVOICE_SUCCESS,
    payload: { success },
  };
}

export function getSellerOrderInvoiceError(error) {
  return {
    type: GET_SELLER_ORDER_INVOICE_ERROR,
    payload: { error },
  };
}
// Get seller Order Invoice End