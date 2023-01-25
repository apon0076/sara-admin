import http from "../../utils/httpClient";

export class PromotionList {
    getPromotionRecord = async () => {
        return await http.get("/api/Discount/GetAllPromotion")
        .then(res => res.data);
    }
}