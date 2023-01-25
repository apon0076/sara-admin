import http from "../../utils/httpClient"

class discountService {
    createDiscount = async (data) => {
        return await http.post("/api/Discount/CreateDiscount", {
            discountId: data.discountId,
            discountPercentage: data.discountPercentage,
            startDate: data.startDate,
            endDate: data.endDate,
            productId: data.productId,
            discountTypeId: data.discountTypeId,
            isActive: data.isActive,
        })
    }

    updateDiscount = async (data) => {
        return await http.post("/api/Discount/UpdateDiscount", {
            discountId: data.discountId,
            discountPercentage: data.discountPercentage,
            startDate: data.startDate,
            endDate: data.endDate,
            productId: data.productId,
            discountTypeId: data.discountTypeId,
            isActive: data.isActive,
        })
    }

    deleteDiscount = async (id) => {
        return await http.delete("/api/Discount/" + id)
    }

    getDiscount = async () => {
        return await http.get("/api/Discount/GetAllDiscount")
    }

    getDiscountById = async (searchBy) => {
        return await http.get("/api/Discount/" + searchBy)
    }
}
export default new discountService()
