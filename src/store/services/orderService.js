import http from "../../utils/httpClient";

class orderService {
  getOrder = async () => {
    return await http.get("/api/Order/GetOrder?getAll=y");
  };

  getOrderByInvoiceNumber = async (invoiceNumber) => {
    return await http.get(`/api/Order/GetOrder?invoiceNumber=${invoiceNumber}`);
  };

  //Get Shopwise Order By Id
  getShopWiseOrderById = async (shopId) => {
    return await http.get(
      `/api/Seller/GetSellerOrderInfo?shopId=${shopId}&getAll=Y`
    );
  };

  //Filter Date Order By Id
  filterDateOrderById = async (shopId, startDate, endDate) => {
    return await http.get(
      `api/Order/GetShopWiseOrderById?shopId=${shopId}&startDate=${startDate}&endDate=${endDate}&getAll=y`
    );
  };

  // Order Status Type - Start
  getOrderStatusType = async () => {
    return await http.get("/api/Order/GetOrderStatusType");
  };
  createOrUpdateOrderStatusType = async (data) => {
    return await http.post("/api/Order/AddOrEditOrderStatusType", data);
  };
  // Order Status Type - End

  //Order Tracking
  createOrderTracking = async (data) => {
    return await http.post("/api/Order/AddOrEditOrderTracking", data);
  };

  //Order Tracking
  updateShopWiseOrderStatus = async (data) => {
    return await http.post(
      "http://192.168.27.190:56771/api/Order/ShopWiseOrderStatusUpdate",
      data
    );
  };

  //Order Tracking
  updateProductWiseOrderStatus = async (data) => {
    return await http.post("/api/Order/AddOrderTracking", data);
  };
  //Order Tracking Cancel
  updateProductWiseCancelOrderStatus = async (data) => {
    return await http.post("/api/Order/AddOrEditCancelProductOrder", data);
  };
  //Order Tracking Return
  updateProductWiseReturnOrderStatus = async (data) => {
    return await http.post("/api/Order/AddOrEditOrderReturn", data);
  };
  //Fetch single order
  fetchSingleOrder = async (id) => {
    return await http.get(
      `/api/Order/GetOrderDetailsById?orderDetailsId=${id}`
    );
  };
  //Fetch status wise order list
  fetchStatusWiseOrderList = async (
    statusId,
    shopId,
    currentPage,
    itemPerPage
  ) => {
    return await http.get(
      `api/Order/GetShopWiseOrderDetailsByTrackingStatus?isActive=Y&status=${statusId}&shopId=${shopId}&currentPage=${currentPage}&itemsPerPage=${itemPerPage}`
    );
  };
  //Get Status Wise Order List Start
  getOrderStatusWise = async (
    status_name_from_url,
    currentPage,
    itemPerPage,
    searchKeyword,
    startDate,
    endDate,
    selectVendor,
    selectPaymentStatus,
    selectPaymentMethod
  ) => {
    return await http.get(
      `/api/Order/V2/GetOrderByStatusWise?keywords=${
        searchKeyword === undefined ? "" : searchKeyword
      }&startDate=${
        startDate === undefined || startDate === null ? "" : startDate
      }&endDate=${
        endDate === undefined || endDate === null ? "" : endDate
      }&paymentMethodId=${
        selectPaymentMethod === undefined || selectPaymentMethod === null
          ? 0
          : selectPaymentMethod
      }&paymentStatusId=${
        selectPaymentStatus === undefined || selectPaymentStatus === null
          ? 0
          : selectPaymentStatus
      }&status=${status_name_from_url}&shopId=${
        selectVendor === undefined || selectVendor === null ? 0 : selectVendor
      }&currentPage=${currentPage}&itemsPerPage=${itemPerPage}`
    );
  };
  //Get Status Wise Order List End

  //Get Status Wise Order Summary Start
  getOrderStatusWiseSummary = async (status, invoice) => {
    return await http.get(
      `/api/Order/GetOrderByStatusWise?invoiceNumber=${invoice}&status=${status}`
    );
  };
  //Get Status Wise Order Summary End

  //Get Shop Wise Order Details Start
  getShopWiseOrderDetails = async (statusName, invoiceNo, orderNo) => {
    return await http.get(
      `/api/Order/V2/GetOrderDetailByStatusWise?orderNo=${invoiceNo}&shopWiseOrderNo=${orderNo}&status=${statusName}`
    );
  };
  //Get Shop Wise Order Details End

  //Get Cancel Orders
  fetchCancelOrder = async (status_for_api_call, currentPage, itemPerPage) => {
    return await http.get(
      `/api/Order/GetCancelOrderByTrackingStatus?status=${status_for_api_call}&shopId=0&currentPage=${currentPage}&itemsPerPage=${itemPerPage}`
    );
  };
  //Get Cancel Order By Id
  fetchCancelOrderById = async (
    status_for_api_call,
    shopId,
    currentPage,
    itemPerPage
  ) => {
    return await http.get(
      `/api/Order/GetCancelOrderByTrackingStatus?shopId=${shopId}&status=${status_for_api_call}&currentPage=${currentPage}&itemsPerPage=${itemPerPage}`
    );
  };
  //Get Return Order By Id
  fetchReturnOrderById = async (
    status_for_api_call,
    shopId,
    currentPage,
    itemPerPage
  ) => {
    return await http.get(
      `/api/Order/GetReturnOrderByTrackingStatus?shopId=${shopId}&status=${status_for_api_call}&currentPage=${currentPage}&itemsPerPage=${itemPerPage}`
    );
  };
  //Get Return Order By status
  fetchReturnOrders = async (status, currentPage, itemPerPage) => {
    return await http.get(
      `/api/Order/GetReturnOrderByTrackingStatus?status=${status}&currentPage=${currentPage}&itemsPerPage=${itemPerPage}`
    );
  };

  getCountOrderStatus = async () => {
    return await http.get("/api/Order/GeCounttOrderStatus");
  };

  //Fetch status wise order list
  sellerStatusWiseOrderList = async (statusName, currentPage, itemPerPage) => {
    return await http.get(
      `/api/Order/GetSellerOrder?statusName=${statusName}&currentPage=${currentPage}&itemsPerPage=${itemPerPage}`
    );
  };

  //Get Seller Order Details Start
  getSellerOrderDetails = async (orderProfileId) => {
    return await http.get(
      `/api/Order/GetSellerOrderDetailsById?orderProfileId=${orderProfileId}`
    );
  };
  //Get Seller Order Details End

  //Get Seller Order Invoice Start
  getSellerOrderInvoice = async (shopWiseOrderNo) => {
    return await http.get(
      `/api/Order/GetShopwiseOrderByStatusWise?shopWiseOrderNo=${shopWiseOrderNo}`
    );
  };
  //Get Seller Order Invoice End
}

export default new orderService();
