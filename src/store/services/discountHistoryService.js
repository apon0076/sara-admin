import http from "../../utils/httpClient";
//debugger;
class discountHistoryService {
    createDiscountHistory = async (data) => {
        return await http.post("/api/Discount/AddOrEditDiscountHistory", {
            productDiscountHistories: data,
        });
    };
}

export default new discountHistoryService();
