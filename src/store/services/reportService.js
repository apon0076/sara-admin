import http from '../../utils/httpClient'

class reportService {
  // Order Report Service Start
  getExcelOrder = async (
    startDate,
    endDate,
    sku,
    paymentMethod,
    paymentStatus,
    orderSource,
    orderStatus
  ) => {
    return await http.get(
      `/api/Order/GenerateExcelOrderV2?getAll=Y&startDate=${startDate}&endDate=${endDate}&sku=${sku}&paymentStatus=${paymentStatus}&paymentMethod=${paymentMethod}&orderSource=${orderSource}&statusName=${orderStatus}`
    )
  }
  // Order Report Service End

  // Order Invoice List Report Start
  getOrderInvoiceList = async (
    startDate,
    endDate,
    orderStatus,
    shopId,
    paymentMethodId,
    PaymentStatusNameId,
    orderSource
  ) => {
    return await http.get(
      `/api/Order/GetShopwiseOrderByStatusWise?startDate=${startDate}&endDate=${endDate}&paymentMethodId=${paymentMethodId}&paymentStatusId=${PaymentStatusNameId}&orderSourch=${orderSource}&status=${orderStatus}&getAll=Y&shopId=${shopId}`
    )
  }
  // Order Invoice List Report End
}

export default new reportService()
