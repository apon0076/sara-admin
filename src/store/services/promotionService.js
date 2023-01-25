import http from "../../utils/httpClient"

class promotionService {
    createOrUpdatePromotion = async (data) => {
        return await http.post("/api/Discount/Promotion", {
            promotionId: data.promotionId,
            name: data.name,
            image: data.image,
            startDate: data.startDate,
            endDate: data.endDate,
            isActive: data.isActive
        })
    }

    deletePromotion = async (id) => {
        return await http.delete("/api/Discount/" + id)
    }

    getPromotion = async () => {
        return await http.get("/api/Discount/GetAllPromotion")
    }

    getPromotionById = async (searchBy) => {
        return await http.get("/api/Discount/" + searchBy)
    }
}
export default new promotionService()
