import http from "../../utils/httpClient";

export class PromotionDetails {
    getPromotionRecord = async () => {
        return await http.get("/api/Discount/GetAllPromotion")
        .then(res => res.data);
    }
}