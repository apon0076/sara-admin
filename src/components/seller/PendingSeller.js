import http from "../../utils/httpClient";

export class PendingSeller {
    getPendingSeller = async () => {
        return await http.get("/api/Seller/GetRequestedShopDetails").then(res => res.data);
    }
}
