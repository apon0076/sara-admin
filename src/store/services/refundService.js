import http from '../../utils/httpClient'
class refundService {
  postRefundData = async (data) => {
    return await http.post(`/api/Payment/CreateCustomerRefund`, data)
  }
  fetchRefundedData = async (data, currentPage, itemPerPage) => {
    return await http.get(
      `/api/Payment/GetPaymentCustomerRefund?requestType=${data}&currentPage=${currentPage}&itemsPerPage=${itemPerPage}`
    )
  }
}
export default new refundService()
