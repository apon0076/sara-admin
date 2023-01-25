import http from "../../utils/httpClient";

class wishListService {
  createWishList = async (data) => {
    return await http
      .post("/api/wishList", {
        wishListId: data.wishListId,
        productId: data.productId,
        categoryId: data.categoryId,
        subCategoryId: data.subCategoryId,
        subSubCategoryId: data.subSubCategoryId,
        colorName: data.colorName,
        sizeName: data.sizeName,
        ImageName: data.ImageName,
        orderQuantity: data.orderQuantity,
        unitPrice: data.unitPrice,
        discountAmount: data.discountAmount,
        vatAmount: data.vatAmount,
        paymentAmount: data.paymentAmount,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  deleteWishList = async (customerId, id) => {
    return await http.delete(`/api/wishList/${customerId}/${id}`);
  };

  getWishList = async () => {
    return await http.get("/api/wishList");
  };

  getWishListById = async (customerId, searchBy) => {
    return await http.get(`/api/wishList/${customerId}/${searchBy}`);
  };
}
export default new wishListService();
