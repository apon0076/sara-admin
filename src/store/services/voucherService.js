import http from "../../utils/httpClient"

class voucherService {
  createOrUpdateVoucher = async (data) => {
    return await http.post("/api/Order/AddOrEditVoucher", data)
  }

  getVoucher = async () => {
    return await http.get("/api/Order/GetOrderVoucherSummary?getAll=Y")
  }
}

export default new voucherService()
