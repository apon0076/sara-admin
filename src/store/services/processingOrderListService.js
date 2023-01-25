import http from "../../utils/httpClient";

class processingOrderListService {
  getProcessingOrderList = async () => {
    return await http.get("/api/order/getProcessingOrder");
  };

  getProcessingOrderListById = async (searchBy) => {
    //////debugger;
    return await http.get(`/api/order/getProcessingOrderById/${searchBy}`);
  };

  deliverOrder = async (data) => {
    //////debugger;
    return await http
      .post("/api/order/deliverOrder", {
        orderNo: data.orderNo,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  cancelOrder = async (data) => {
    //////debugger;
    return await http
      .post("/api/order/cancelProcessingOrder", {
        orderNo: data.orderNo,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };
}
export default new processingOrderListService();
