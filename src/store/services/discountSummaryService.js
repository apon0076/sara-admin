import http from "../../utils/httpClient"

class discountSummaryService {

  createOrUpdateDiscountSummary = async (data) => {
    return await http.post("/api/Discount/AddOrEditDiscountSummary", {
      discountSummaryId: data.discountSummaryId,
      discountTypeId: data.discountTypeId,
      name: data.name,
      discountAmount: data.discountAmount,
      discountPercent: data.discountPercent,
      image: data.image,
      startDate: data.startDate,
      endDate: data.endDate,
      regEndDate: data.regEndDate,
      isActive: data.isActive,
    })
  }

  getDiscountSummary = async () => {
    return await http.get("/api/Discount/GetAllDiscountSummary?getAll=Y")
  }
}
export default new discountSummaryService()
