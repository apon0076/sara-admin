import http from "../../utils/httpClient";

class ProductService {
  createProduct = async (data) => {
    return await http.post("api/Product/CreateProduct", data);
  };

  updateProduct = async (data) => {
    return await http.post("/api/Product/UpdateProduct", data);
  };

  authenticateUser = async () => {
    return (
      (await localStorage.getItem("x-access-token")) &&
      localStorage.getItem("x-access-token-expiration") > Date.now()
    );
  };

  deauthenticateUser = async () => {
    (await localStorage.removeItem("x-access-token")) &&
      localStorage.getItem("x-access-token-expiration");
    window.location = window.location.origin + "/";
  };

  saveToken = async (token) => {
    (await localStorage.setItem("x-access-token", token)) &&
      localStorage.getItem("x-access-token-expiration");
  };

  getToken = (async) => {
    return localStorage.getItem("x-access-token");
  };

  retrieveToken = (async) => {
    return this.getToken();
  };

  retriveEmployeeId = (async) => {
    return this.getEmployeeId();
  };

  retriveRoleId = (async) => {
    return this.getRoleId();
  };

  getEmployeeId = (async) => {
    return localStorage.getItem("x-access-employeeId");
  };

  getRoleId = (async) => {
    return localStorage.getItem("x-access-roleId");
  };

  deleteProduct = async (data) => {
    return await http.delete(
      `/api/HomePageSlider/${data.id}/${data.imageName}`
    );
  };

  DeleteProductColor = async (productId, productColorId, colorName) => {
    //////debugger;
    return await http.delete(
      `/api/product/DeleteProductColor/${productId}/${productColorId}/${colorName}`
    );
  };

  DeleteProductSize = async (productId, productSizeId, sizeName) => {
    return await http.delete(
      `/api/product/DeleteProductSize/${productId}/${productSizeId}/${sizeName}`
    );
  };

  getProduct = async () => {
    return await http.get("/api/Product/GetProductDetails");
  };

  getProductById = async (searchBy) => {
    return await http.get("/api/product/" + searchBy);
  };

  getProductDataId = async (productId) => {
    return await http.get(
      `/api/Product/GetProductDetailsById?productId=${productId}`
    );
  };

  getColorByProductId = async (searchBy) => {
    return await http.get("/api/product/GetColorByProductId/" + searchBy);
  };

  getColorById = async (searchBy) => {
    return await http.get("/api/product/GetProductColorById/" + searchBy);
  };

  getSizeById = async (searchBy) => {
    return await http.get("/api/product/GetProductSizeById/" + searchBy);
  };

  getPendingProducts = async () => {
    return await http.get(
      "/api/Product/v1/ProductFilterOption?currency=BDT&isApprove=N&isDeleted=N&currentPage=1&itemsPerPage=10"
    );
  };
  getRejectedProducts = async () => {
    // return await http.get("/api/Product/ProductFilterOption?currency=BDT&isApprove=R&isDeleted=N")
    return await http.get(
      "/api/Product/v1/ProductFilterOption?currency=BDT&isApprove=R&isDeleted=N&&currentPage=1&itemsPerPage=10"
    );
  };

  // get verified products
  getVerifiedProducts = async (currentPage, itemsPerPage) => {
    return await http.get(
      `/api/Product/v1/ProductFilterOption?currency=BDT&isApprove=Y&isDeleted=N&&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
    );
  };

  getAllVerifiedProducts = async () => {
    return await http.get(
      "/api/Product/ProductFilterOption?isApprove=Y&isDeleted=N&currency=BDT&getAll=Y"
    );
  };

  //
  getSellerPendingProducts = async (shopId) => {
    return await http.get(
      `/api/Product/v1/ProductFilterOption?currency=BDT&isApprove=N&isDeleted=N&getAll=Y&shopId=${shopId}`
    );
  };

  //
  getSellerVerifiedProducts = async (shopId) => {
    return await http.get(
      `/api/Product/v1/ProductFilterOption?currency=BDT&isApprove=Y&isDeleted=N&getAll=Y&shopId=${shopId}`
    );
  };
  getSellerRejectedProducts = async (shopId) => {
    return await http.get(
      `/api/Product/v1/ProductFilterOption?currency=BDT&isApprove=R&isDeleted=N&getAll=Y&shopId=${shopId}`
    );
  };

  //
  getSellerPromotionalProducts = async (shopId) => {
    return await http.get(
      `/api/Seller/SellerPromosionalProduct?shopId=${shopId}`
    );
  };

  //Approve Product
  approveProduct = async (data) => {
    return await http
      .post("/api/Product/UpdateProductStatus", {
        productId: data.productId,
        isApprove: data.isApprove,
        isDelete: data.isDelete,
        productStatus: data.productStatus,
        operationType: data.operationType,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  //Reject Product
  rejectProduct = async (data) => {
    return await http
      .post("/api/Product/UpdateProductStatus", {
        productId: data.productId,
        isApprove: data.isApprove,
        isDelete: data.isDelete,
        productStatus: data.productStatus,
        operationType: data.operationType,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };
  updateProductRemarks = async (data) => {
    return await http
      .post("/api/Product/UpdateProductRemarks", {
        productId: data.productId,
        remarks: data.remarks,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  checkDuplicateProducts = async (sku) => {
    return await http
      .post("/api/Product/CheckDuplicateMultipleProductSku", {
        checkDuplicateSkuMultipleProduct: sku,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  checkRealTimeInventory = async (sku) => {
    return await http
      .get(
        `http://182.160.113.106:98/api/RealTimeInventory/GetRealTimeStock/${sku}`
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };
  getProductList = async (
    currency,
    isApproved,
    isDeleted,
    currentPage,
    itemPerPage,
    searchKeyword,
    categoryId,
    brand,
    statusCode
  ) => {
    return await http
      .get(
        `/api/Product/GetProductsSummary?keywords=${searchKeyword}&categoryId=${categoryId}&brandId=${brand}&currency=${currency}&currentPage=${currentPage}&itemsPerPage=${itemPerPage}&isApprove=${isApproved}&isDeleted=${isDeleted}&productStatus=${statusCode}`
      )
      .then((response) => {
        return response;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  getProductDetails = async (id, currency, isApproved) => {
    return await http
      .get(
        `/api/Product/GetProductDetailsByProductId?productId=${id}&currency=${currency}&isApprove=${isApproved}`
      )
      .then((response) => {
        return response;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };
}
export default new ProductService();
