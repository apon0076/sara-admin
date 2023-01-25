import http from "../../utils/httpClient";

class productImageByColorService {
  createProductImageByColor = async (data) => {
    return await http.post("/api/ProductImageByColor", {
      imageId: data.imageId,
      productId: data.productId,
      productImageByColorDetails: data.productImageByColorDetails,
    });
  };

  deleteProductImage = async (id) => {
    return await http.delete("/api/ProductImageByColor" + id);
  };

  getProductImageByColor = async () => {
    return await http.get("/api/ProductImageByColor");
  };

  getProductImageByColorById = async (searchBy) => {
    return await http.get("/api/ProductImageByColor/" + searchBy);
  };

  getProductImageByColorByIdRecord = async (searchBy) => {
    return await http.get(
      "/api/ProductImageByColor/GetColorByProductId/" + searchBy
    );
  };
}
export default new productImageByColorService();
