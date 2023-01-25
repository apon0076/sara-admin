import http from "../../utils/httpClient";

export class PendingProduct {
  getCustomersLarge = async () => {
    return await http
      .get("/api/Seller/GetRequestedShopDetails")
      .then((res) => res.data);
  };
}
