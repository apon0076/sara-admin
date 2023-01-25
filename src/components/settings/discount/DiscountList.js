import http from "../../utils/httpClient";

export class DiscountList {
    getDiscountRecord = async () => {
        return await http.get("/api/Discount/GetAllDiscount")
        .then(res => res.data);
    }
}