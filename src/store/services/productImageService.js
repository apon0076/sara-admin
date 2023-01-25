import http from "../../utils/httpClient";

class productImageService {
  createProductImage = async (data) => {
    return await http.post("/api/ProductImage", {
      imageId: data.imageId,
      productId: data.productId,
      imageName: data.imageName,
    });
  };

  deleteProductImage = async (id, imageName) => {
    return await http.delete(`/api/ProductImage/${id}/${imageName}`);
  };

  getProductImage = async () => {
    return await http.get("/api/ProductImage");
  };

  getProductImageById = async (searchBy) => {
    return await http.get("/api/ProductImage/" + searchBy);
  };
}
export default new productImageService();
