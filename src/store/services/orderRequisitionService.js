import http from '../../utils/httpClient'

class orderRequisitionService {
  getOrderRequisition = async (currentPage, itemPerPage) => {
    return await http.post(
      `/api/Order/GetOrderRequisition?currentPage=${currentPage}&itemsPerPage=${itemPerPage}`
    )
  }
}

export default new orderRequisitionService()
