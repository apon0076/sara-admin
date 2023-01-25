import http from "../../utils/httpClient";

export class DiscountTypeList {
    getDiscountTypeRecord = async () => {
        return await http.get("/api/Discount/GetAllDiscountType")
        .then(res => res.data);
    }
}