import http from "../../utils/httpClient";
//////debugger;
class productVariantService {
  createProductVariant = async (data) => {
    return await http.post("/api/ProductVariant/CreateProductVariant", {
      productVariantId: data.productVariantId,
      variantName: data.variantName,
      variantDescription: data.variantDescription,
      variantSetupTempleteId: data.variantSetupTempleteId,
      variantDisplayTempleteId: data.variantDisplayTempleteId,
      isActive: data.isActive,
      isDelete: data.isDelete,
      imgChgVariant: data.imgChgVariant,
    });
  };

  deleteProductVariant = async (id) => {
    return await http.delete("/api/ProductVariant/" + id);
  };

  getProductVariant = async () => {
    return await http.get("/api/ProductVariant/GetProductVariant?getAll=Y");
  };

  getProductVariantById = async (searchBy) => {
    return await http.get("/api/ProductVariant/GetProductVariant" + searchBy);
  };

  getProductVariantByCategoryId = async (id) => {
    return await http.get(
      "/api/ProductVariant/GetVariantWithOptionByCategoryId?CategoryId=" + id
    );
  };
}

export default new productVariantService();
