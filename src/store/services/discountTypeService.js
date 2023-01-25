import http from "../../utils/httpClient"

// Calling API using http with data
class discountTypeService {

  // For discountTypeAction
  createDiscountType = async (data) => {
    return await http.post("/api/Discount/CreateDiscountType", {
      productDiscountTypeId: data.productDiscountTypeId,
      productDiscountTypeName: data.productDiscountTypeName,
      isActive: data.isActive,
    })
  }

  updateDiscountType = async (data) => {
    return await http.post("/api/Discount/UpdateDiscountType", {
      productDiscountTypeId: data.productDiscountTypeId,
      productDiscountTypeName: data.productDiscountTypeName,
      isActive: data.isActive,
    })
  }

  deleteDiscountType = async (id) => {
    return await http.delete("/api/DiscountType/" + id), {}
  }

  // For discountTypeAction
  getDiscountType = async () => {
    return await http.get("/api/Discount/GetAllDiscountType")
  }

  getDiscountTypeById = async (searchBy) => {
    return await http.get("/api/Discount/" + searchBy)
  }
}
export default new discountTypeService()
