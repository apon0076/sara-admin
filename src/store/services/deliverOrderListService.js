import http from "../../utils/httpClient";

class deliverOrderListService {
  getDeliverOrderList = async () => {
    return await http.get("/api/order/getDeliverOrder");
  };

  getDeliverOrderListById = async (searchBy) => {
    return await http.get(`/api/order/getDeliverOrderById/${searchBy}`);
  };

  confirmOrder = async (data) => {
    return await http
      .post("/api/order/confirmOrder", {
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
      .post("/api/order/cancelDeliverOrder", {
        orderNo: data.orderNo,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };
}
export default new deliverOrderListService();
