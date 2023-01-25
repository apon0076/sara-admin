import http from "../../utils/httpClient"

class promotionDetailsService {

    getPromotionDetails = async () => {
        return await http.get("/api/Discount/GetAllDiscountSummary")
    }
}
export default new promotionDetailsService()
