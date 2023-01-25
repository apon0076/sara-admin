import http from "../../utils/httpClient";
//debugger;
class productVariantOptionService {
  createProductVariantOption = async (data) => {
    return await http.post("/api/ProductVariant/CreateProductVariantOption", {
      productVariantOptions: data,
    });
  };

  updateProductVariantOption = async (data) => {
    return await http.post("/api/ProductVariant/CreateProductVariantOption", {
      productVariantOptions: data.productVariantOptions,
    });
  };

  deleteProductVariantOptionValue = async (id) => {
    return await http.delete("/api/ProductVariantOption/" + id);
  };

  getProductVariantOption = async () => {
    return await http.get("api/ProductVariant/GetProductVariantOption?getAll=Y");
  };

  getProductVariantOptionById = async (searchBy) => {
    return await http.get("/api/ProductVariantOption/" + searchBy);
  };
}

export default new productVariantOptionService();
