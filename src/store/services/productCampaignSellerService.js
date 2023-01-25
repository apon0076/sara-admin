import http from "../../utils/httpClient";

class productCampaignSellerService {
    addOrEditProductCampaignSeller = async (data) => {
        return await http.post("/api/Product/AddOrEditProductCampaignSeller", {
            productSellerCampaigns: data,
        });
    };

    getProductCampaignSeller = async () => {
        return await http.get(`/api/Product/GetProductCampaignSeller`);
    };
}

export default new productCampaignSellerService();