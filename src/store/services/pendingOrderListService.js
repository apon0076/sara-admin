import http from "../../utils/httpClient"

class pendingOrderListService {
  getOrderList = async () => {
    return await http.get("/api/Order")
  }

  getOrderListById = async (customerId, searchBy) => {
    return await http.get(`/api/order/${customerId}/${searchBy}`)
  }

  getOrderListByOrderId = async (customerId, id) => {
    return await http.get(`/api/order/GetOrderByOrderId/${customerId}/${id}`)
  }

  deleteOrder = async (customerId, id) => {
    return await http.delete(`/api/order/${customerId}/${id}`)
  }

  processOrder = async (data) => {
    //////debugger;
    return await http
      .post("/api/order/processOrder", {
        orderNo: data.orderNo,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => Promise.reject("Failed!", err))
  }

  cancelOrder = async (data) => {
    //////debugger;
    return await http
      .post("/api/order/cancelPendingOrder", {
        orderNo: data.orderNo,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => Promise.reject("Failed!", err))
  }
}
export default new pendingOrderListService()
