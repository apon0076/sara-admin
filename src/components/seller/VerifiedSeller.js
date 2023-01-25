import http from "../../utils/httpClient";

export class VerifiedSeller {
    getVerifiedSeller = async () => {
        return await http.get("/api/Seller/GetShopDetails")
        .then(res => res.data);
    }
}

