import http from "../../utils/httpClient";

class productVariantOptionValueService {
  createProductVariantOptionValue = async (data) => {
    return await http.post("/api/ProductVariant/CreateOrUpdateProductVariantOptionValue", data)
  }

  deleteProductVariantOptionValue = async (id) => {
    return await http.delete("/api/ProductVariant/" + id);
  };

  getProductVariantOptionValue = async () => {
    return await http.get("/api/ProductVariant/GetProductVariantOptionValue?getAll=Y");
  };
}

export default new productVariantOptionValueService();
