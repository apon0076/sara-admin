//////////////////////This is import for API Call/////////////
import productService from "../services/productService";

export const GET_PRODUCT = "GET_PRODUCT";
export const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
export const GET_PRODUCT_ERROR = "GET_PRODUCT_ERROR";

export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const GET_PRODUCT_BY_ID_SUCCESS = "GET_PRODUCT_BY_ID_SUCCESS";
export const GET_PRODUCT_BY_ID_ERROR = "GET_PRODUCT_BY_ID_ERROR";

export const GET_COLOR_BY_PRODUCT_ID = "GET_COLOR_BY_PRODUCT_ID";
export const GET_COLOR_BY_PRODUCT_ID_SUCCESS =
  "GET_COLOR_BY_PRODUCT_ID_SUCCESS";
export const GET_COLOR_BY_PRODUCT_ID_ERROR = "GET_COLOR_BY_PRODUCT_ID_ERROR";

export const GET_PRODUCT_COLOR_BY_ID = "GET_PRODUCT_COLOR_BY_ID";
export const GET_PRODUCT_COLOR_BY_ID_SUCCESS =
  "GET_PRODUCT_COLOR_BY_ID_SUCCESS";
export const GET_PRODUCT_COLOR_BY_ID_ERROR = "GET_PRODUCT_COLOR_BY_ID_ERROR";

export const GET_PRODUCT_DATA_BY_ID = "GET_PRODUCT_DATA_BY_ID";
export const GET_PRODUCT_DATA_BY_ID_SUCCESS = "GET_PRODUCT_DATA_BY_ID_SUCCESS";
export const GET_PRODUCT_DATA_BY_ID_ERROR = "GET_PRODUCT_DATA_BY_ID_ERROR";

export const GET_COLOR_BY_ID = "GET_COLOR_BY_ID";
export const GET_COLOR_BY_ID_SUCCESS = "GET_COLOR_BY_ID_SUCCESS";
export const GET_COLOR_BY_ID_ERROR = "GET_COLOR_BY_ID_ERROR";

export const GET_SIZE_BY_ID = "GET_SIZE_BY_ID";
export const GET_SIZE_BY_ID_SUCCESS = "GET_SIZE_BY_ID_SUCCESS";
export const GET_SIZE_BY_ID_ERROR = "GET_SIZE_BY_ID_ERROR";

export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_ERROR = "CREATE_PRODUCT_ERROR";

export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_ERROR = "UPDATE_PRODUCT_ERROR";
export const UPDATE_PRODUCT_RESET = "UPDATE_PRODUCT_RESET";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_ERROR = "DELETE_PRODUCT_ERROR";

export const DELETE_PRODUCT_COLOR = "DELETE_PRODUCT_COLOR";
export const DELETE_PRODUCT_COLOR_SUCCESS = "DELETE_PRODUCT_COLOR_SUCCESS";
export const DELETE_PRODUCT_COLOR_ERROR = "DELETE_PRODUCT_COLOR_ERROR";

export const DELETE_PRODUCT_SIZE = "DELETE_PRODUCT_SIZE";
export const DELETE_PRODUCT_SIZE_SUCCESS = "DELETE_PRODUCT_SIZE_SUCCESS";
export const DELETE_PRODUCT_SIZE_ERROR = "DELETE_PRODUCT_SIZE_ERROR";

export const GET_PENDING_PRODUCTS = "GET_PENDING_PRODUCTS";
export const GET_PENDING_PRODUCTS_SUCCESS = "GET_PENDING_PRODUCTS_SUCCESS";
export const GET_PENDING_PRODUCTS_ERROR = "GET_PENDING_PRODUCTS_ERROR";

export const GET_REJECTED_PRODUCTS = "GET_REJECTED_PRODUCTS";
export const GET_REJECTED_PRODUCTS_SUCCESS = "GET_REJECTED_PRODUCTS_SUCCESS";
export const GET_REJECTED_PRODUCTS_ERROR = "GET_REJECTED_PRODUCTS_ERROR";

export const GET_PENDING_SELLER_PRODUCTS = "GET_PENDING_SELLER_PRODUCTS";
export const GET_PENDING_SELLER_PRODUCTS_SUCCESS =
  "GET_PENDING_SELLER_PRODUCTS_SUCCESS";
export const GET_PENDING_SELLER_PRODUCTS_ERROR =
  "GET_PENDING_SELLER_PRODUCTS_ERROR";

export const GET_ALL_VERIFIED_PRODUCTS = "GET_ALL_VERIFIED_PRODUCTS";
export const GET_ALL_VERIFIED_PRODUCTS_SUCCESS =
  "GET_ALL_VERIFIED_PRODUCTS_SUCCESS";
export const GET_ALL_VERIFIED_PRODUCTS_ERROR =
  "GET_ALL_VERIFIED_PRODUCTS_ERROR";

export const GET_VERIFIED_PRODUCTS = "GET_VERIFIED_PRODUCTS";
export const GET_VERIFIED_PRODUCTS_SUCCESS = "GET_VERIFIED_PRODUCTS_SUCCESS";
export const GET_VERIFIED_PRODUCTS_ERROR = "GET_VERIFIED_PRODUCTS_ERROR";

export const GET_VERIFIED_SELLER_PRODUCTS = "GET_VERIFIED_SELLER_PRODUCTS";
export const GET_VERIFIED_SELLER_PRODUCTS_SUCCESS =
  "GET_VERIFIED_SELLER_PRODUCTS_SUCCESS";
export const GET_VERIFIED_SELLER_PRODUCTS_ERROR =
  "GET_VERIFIED_SELLER_PRODUCTS_ERROR";

export const GET_SELLER_REJECTED_PRODUCTS = "GET_SELLER_REJECTED_PRODUCTS";
export const GET_SELLER_REJECTED_PRODUCTS_SUCCESS =
  "GET_SELLER_REJECTED_PRODUCTS_SUCCESS";
export const GET_SELLER_REJECTED_PRODUCTS_ERROR =
  "GET_SELLER_REJECTED_PRODUCTS_ERROR";

export const GET_SELLER_PROMOTIONAL_PRODUCTS =
  "GET_SELLER_PROMOTIONAL_PRODUCTS";
export const GET_SELLER_PROMOTIONAL_PRODUCTS_SUCCESS =
  "GET_SELLER_PROMOTIONAL_PRODUCTS_SUCCESS";
export const GET_SELLER_PROMOTIONAL_PRODUCTS_ERROR =
  "GET_SELLER_PROMOTIONAL_PRODUCTS_ERROR";

export const APPROVE_PRODUCT = "APPROVE_SHOP";
export const APPROVE_PRODUCT_SUCCESS = "APPROVE_SHOP_SUCCESS";
export const APPROVE_PRODUCT_ERROR = "APPROVE_SHOP_ERROR";

export const REJECT_PRODUCT = "REJECT_SHOP";
export const REJECT_PRODUCT_SUCCESS = "REJECT_SHOP_SUCCESS";
export const REJECT_PRODUCT_ERROR = "REJECT_SHOP_ERROR";

export const UPDATE_PRODUCT_REMARKS = "UPDATE_PRODUCT_REMARKS";
export const UPDATE_PRODUCT_REMARKS_SUCCESS = "UPDATE_PRODUCT_REMARKS_SUCCESS";
export const UPDATE_PRODUCT_REMARKS_ERROR = "UPDATE_PRODUCT_REMARKS_ERROR";

export const CHECK_DUPLICATE_PRODUCT = "CHECK_DUPLICATE_PRODUCT";
export const CHECK_DUPLICATE_PRODUCT_SUCCESS =
  "CHECK_DUPLICATE_PRODUCT_SUCCESS";
export const CHECK_DUPLICATE_PRODUCT_ERROR = "CHECK_DUPLICATE_PRODUCT_ERROR";

export const CHECK_REAL_TIME_INVENTORY = "CHECK_REAL_TIME_INVENTORY";
export const CHECK_REAL_TIME_INVENTORY_SUCCESS =
  "CHECK_REAL_TIME_INVENTORY_SUCCESS";
export const CHECK_REAL_TIME_INVENTORY_ERROR =
  "CHECK_REAL_TIME_INVENTORY_ERROR";

export const GET_PRODUCTS_LIST = "GET_PRODUCTS_LIST";
export const GET_PRODUCTS_LIST_SUCCESS = "GET_PRODUCTS_LIST_SUCCESS";
export const GET_PRODUCTS_LIST_ERROR = "GET_PRODUCTS_LIST_ERROR";

export const GET_PRODUCTS_DETAILS = "GET_PRODUCTS_DETAILS";
export const GET_PRODUCTS_DETAILS_SUCCESS = "GET_PRODUCTS_DETAILS_SUCCESS";
export const GET_PRODUCTS_DETAILS_ERROR = "GET_PRODUCTS_DETAILS_ERROR";

//////////////////End of Attribute Action Types/////////////////////////
export function getAllVerifiedProductsRecord() {
  return async (dispatch) => {
    dispatch(getAllVerifiedProducts());
    return await productService
      .getAllVerifiedProducts()

      .then((response) =>
        dispatch(getAllVerifiedProductsSuccess(response.data))
      )
      .catch((error) => dispatch(getAllVerifiedProductsError(error)));
  };
}

export function getAllVerifiedProducts() {
  return {
    type: GET_ALL_VERIFIED_PRODUCTS,
  };
}

export function getAllVerifiedProductsSuccess(success) {
  return {
    type: GET_ALL_VERIFIED_PRODUCTS_SUCCESS,
    payload: { success },
  };
}

export function getAllVerifiedProductsError(error) {
  return {
    type: GET_ALL_VERIFIED_PRODUCTS_ERROR,
    payload: { error },
  };
}

export function getProductRecord() {
  return async (dispatch) => {
    dispatch(getProduct());
    return await productService
      .getProduct()

      .then((response) => dispatch(getProductSuccess(response.data)))
      .catch((error) => dispatch(getProductError(error)));
  };
}

export function getProduct() {
  return {
    type: GET_PRODUCT,
  };
}

export function getProductSuccess(success) {
  return {
    type: GET_PRODUCT_SUCCESS,
    payload: { success },
  };
}

export function getProductError(error) {
  return {
    type: GET_PRODUCT_ERROR,
    payload: { error },
  };
}

export function getProductByIdRecord(id) {
  return async (dispatch) => {
    dispatch(getProductById());
    return await productService
      .getProductById(id)

      .then((response) => dispatch(getProductByIdSuccess(response.data)))
      .catch((error) => dispatch(getProductByIdError(error)));
  };
}

export function getProductById() {
  return {
    type: GET_PRODUCT_BY_ID,
  };
}

export function getProductByIdSuccess(success) {
  return {
    type: GET_PRODUCT_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getProductByIdError(error) {
  return {
    type: GET_PRODUCT_BY_ID_ERROR,
    payload: { error },
  };
}

export function getColorByProductIdRecord(id) {
  return async (dispatch) => {
    dispatch(getColorByProductId());
    return await productService
      .getColorByProductId(id)

      .then((response) => dispatch(getProductByIdSuccess(response.data)))
      .catch((error) => dispatch(getProductByIdError(error)));
  };
}

export function getColorByProductId() {
  return {
    type: GET_COLOR_BY_PRODUCT_ID,
  };
}

export function getColorByProductIdSuccess(success) {
  return {
    type: GET_COLOR_BY_PRODUCT_ID_SUCCESS,
    payload: { success },
  };
}

export function getColorByProductIdError(error) {
  return {
    type: GET_COLOR_BY_PRODUCT_ID_ERROR,
    payload: { error },
  };
}

export function createProductRecord(products) {
  return async (dispatch) => {
    dispatch(createProduct());
    return await productService
      .createProduct(products)

      .then((response) => dispatch(createProductSuccess(response)))
      .catch((error) => dispatch(createProductError(error)));
  };
}

export function createProduct() {
  return {
    type: CREATE_PRODUCT,
  };
}

export function createProductSuccess(success) {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    payload: { success },
  };
}

export function createProductError(error) {
  return {
    type: CREATE_PRODUCT_ERROR,
    payload: { error },
  };
}

export function updateProductRecord(data) {
  return async (dispatch) => {
    dispatch(updateProduct());
    return await productService
      .updateProduct(data)
      .then((response) => dispatch(updateProductSuccess(response)))
      .catch((error) => dispatch(updateProductError(error)));
  };
}

export function updateProduct() {
  return {
    type: UPDATE_PRODUCT,
  };
}

export function updateProductSuccess(success) {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    payload: { success },
  };
}

export function updateProductError(error) {
  return {
    type: UPDATE_PRODUCT_ERROR,
    payload: { error },
  };
}

export function updateProductReset() {
  return {
    type: UPDATE_PRODUCT_RESET,
  };
}

export function deleteProductRecord(id) {
  return async (dispatch) => {
    dispatch(deleteProduct());
    return await productService
      .deleteProduct(id)

      .then((response) => dispatch(deleteProductSuccess(response)))
      .catch((error) => dispatch(deleteProductError(error)));
  };
}

export function deleteProduct() {
  return {
    type: DELETE_PRODUCT,
  };
}

export function deleteProductSuccess(success) {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    payload: { success },
  };
}

export function deleteProductError(error) {
  return {
    type: DELETE_PRODUCT_ERROR,
    payload: { error },
  };
}

export function getProductDataIdRecord(id) {
  return async (dispatch) => {
    dispatch(getProductDataId());
    return await productService
      .getProductDataId(id)

      .then((response) => dispatch(getProductDataIdSuccess(response.data)))
      .catch((error) => dispatch(getProductDataIdError(error)));
  };
}

export function getProductDataId() {
  return {
    type: GET_PRODUCT_BY_ID,
  };
}

export function getProductDataIdSuccess(success) {
  return {
    type: GET_PRODUCT_DATA_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getProductDataIdError(error) {
  return {
    type: GET_PRODUCT_DATA_BY_ID_ERROR,
    payload: { error },
  };
}

export function getColorByIdRecord(searchBy) {
  return async (dispatch) => {
    dispatch(getColorById());
    return await productService
      .getColorById(searchBy)

      .then((response) => dispatch(getColorByIdSuccess(response.data)))
      .catch((error) => dispatch(getColorByIdError(error)));
  };
}

export function getColorById() {
  return {
    type: GET_COLOR_BY_ID,
  };
}

export function getColorByIdSuccess(success) {
  return {
    type: GET_COLOR_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getColorByIdError(error) {
  return {
    type: GET_COLOR_BY_ID_ERROR,
    payload: { error },
  };
}

export function getSizeByIdRecord(searchBy) {
  return async (dispatch) => {
    dispatch(getSizeById());
    return await productService
      .getSizeById(searchBy)

      .then((response) => dispatch(getSizeByIdSuccess(response.data)))
      .catch((error) => dispatch(getSizeByIdError(error)));
  };
}

export function getSizeById() {
  return {
    type: GET_COLOR_BY_ID,
  };
}

export function getSizeByIdSuccess(success) {
  return {
    type: GET_SIZE_BY_ID_SUCCESS,
    payload: { success },
  };
}

export function getSizeByIdError(error) {
  return {
    type: GET_SIZE_BY_ID_ERROR,
    payload: { error },
  };
}

export function deleteProductColorRecord(productId, productColorId, colorName) {
  return async (dispatch) => {
    dispatch(DeleteProductColor());
    return await productService
      .DeleteProductColor(productId, productColorId, colorName)

      .then((response) => dispatch(deleteProductColorSuccess(response)))
      .catch((error) => dispatch(deleteProductColorError(error)));
  };
}

export function DeleteProductColor() {
  return {
    type: DELETE_PRODUCT_COLOR,
  };
}

export function deleteProductColorSuccess(success) {
  return {
    type: DELETE_PRODUCT_COLOR_SUCCESS,
    payload: { success },
  };
}

export function deleteProductColorError(error) {
  return {
    type: DELETE_PRODUCT_COLOR_ERROR,
    payload: { error },
  };
}

export function deleteProductSizeRecord(productId, productSizeId, sizeName) {
  return async (dispatch) => {
    dispatch(DeleteProductSize());
    return await productService
      .DeleteProductSize(productId, productSizeId, sizeName)

      .then((response) => dispatch(deleteProductSizeSuccess(response)))
      .catch((error) => dispatch(deleteProductSizeError(error)));
  };
}

export function DeleteProductSize() {
  return {
    type: DELETE_PRODUCT_SIZE,
  };
}

export function deleteProductSizeSuccess(success) {
  return {
    type: DELETE_PRODUCT_SIZE_SUCCESS,
    payload: { success },
  };
}

export function deleteProductSizeError(error) {
  return {
    type: DELETE_PRODUCT_SIZE_ERROR,
    payload: { error },
  };
}

export function getPendingProductsRecord() {
  return async (dispatch) => {
    dispatch(getPendingProducts());
    return await productService
      .getPendingProducts()

      .then((response) => dispatch(getPendingProductsSuccess(response.data)))
      .catch((error) => dispatch(getPendingProductsError(error)));
  };
}

export function getPendingProducts() {
  return {
    type: GET_PENDING_PRODUCTS,
  };
}

export function getPendingProductsSuccess(success) {
  return {
    type: GET_PENDING_PRODUCTS_SUCCESS,
    payload: { success },
  };
}

export function getPendingProductsError(error) {
  return {
    type: GET_PENDING_PRODUCTS_ERROR,
    payload: { error },
  };
}

//
export function getSellerPendingProductsRecord(shopId) {
  return async (dispatch) => {
    dispatch(getSellerPendingProducts());
    return await productService
      .getSellerPendingProducts(shopId)

      .then((response) =>
        dispatch(getSellerPendingProductsSuccess(response.data))
      )
      .catch((error) => dispatch(getSellerPendingProductsError(error)));
  };
}

export function getSellerPendingProducts() {
  return {
    type: GET_PENDING_SELLER_PRODUCTS,
  };
}

export function getSellerPendingProductsSuccess(success) {
  return {
    type: GET_PENDING_SELLER_PRODUCTS_SUCCESS,
    payload: { success },
  };
}

export function getSellerPendingProductsError(error) {
  return {
    type: GET_PENDING_SELLER_PRODUCTS_ERROR,
    payload: { error },
  };
}

//

export function getVerifiedProductsRecord(currentPage, itemsPerPage) {
  return async (dispatch) => {
    dispatch(getVerifiedProducts());
    return await productService
      .getVerifiedProducts(currentPage, itemsPerPage)
      .then((response) => dispatch(getVerifiedProductsSuccess(response)))
      .catch((error) => dispatch(getVerifiedProductsError(error)));
  };
}

export function getVerifiedProducts() {
  return {
    type: GET_VERIFIED_PRODUCTS,
  };
}

export function getVerifiedProductsSuccess(success) {
  return {
    type: GET_VERIFIED_PRODUCTS_SUCCESS,
    payload: { success },
  };
}

export function getVerifiedProductsError(error) {
  return {
    type: GET_VERIFIED_PRODUCTS_ERROR,
    payload: { error },
  };
}

//

export function getSellerVerifiedProductsRecord(shopId) {
  return async (dispatch) => {
    dispatch(getSellerVerifiedProducts());
    return await productService
      .getSellerVerifiedProducts(shopId)

      .then((response) =>
        dispatch(getSellerVerifiedProductsSuccess(response.data))
      )
      .catch((error) => dispatch(getSellerVerifiedProductsError(error)));
  };
}

export function getSellerVerifiedProducts() {
  return {
    type: GET_VERIFIED_SELLER_PRODUCTS,
  };
}

export function getSellerVerifiedProductsSuccess(success) {
  return {
    type: GET_VERIFIED_SELLER_PRODUCTS_SUCCESS,
    payload: { success },
  };
}

export function getSellerVerifiedProductsError(error) {
  return {
    type: GET_VERIFIED_SELLER_PRODUCTS_ERROR,
    payload: { error },
  };
}

//Get Seller Rejected Products
export function getSellerRejectedProductsRecord(shopId) {
  return async (dispatch) => {
    dispatch(getSellerRejectedProducts());
    return await productService
      .getSellerRejectedProducts(shopId)

      .then((response) =>
        dispatch(getSellerRejectedProductsSuccess(response.data))
      )
      .catch((error) => dispatch(getSellerRejectedProductsError(error)));
  };
}

export function getSellerRejectedProducts() {
  return {
    type: GET_SELLER_REJECTED_PRODUCTS,
  };
}

export function getSellerRejectedProductsSuccess(success) {
  return {
    type: GET_SELLER_REJECTED_PRODUCTS_SUCCESS,
    payload: { success },
  };
}

export function getSellerRejectedProductsError(error) {
  return {
    type: GET_SELLER_REJECTED_PRODUCTS_ERROR,
    payload: { error },
  };
}

//Get Rejected Products

export function getRejectedProductsRecord() {
  return async (dispatch) => {
    dispatch(getRejectedProducts());
    return await productService
      .getRejectedProducts()

      .then((response) => dispatch(getRejectedProductsSuccess(response.data)))
      .catch((error) => dispatch(getRejectedProductsError(error)));
  };
}

export function getRejectedProducts() {
  return {
    type: GET_REJECTED_PRODUCTS,
  };
}

export function getRejectedProductsSuccess(success) {
  return {
    type: GET_REJECTED_PRODUCTS_SUCCESS,
    payload: { success },
  };
}

export function getRejectedProductsError(error) {
  return {
    type: GET_REJECTED_PRODUCTS_ERROR,
    payload: { error },
  };
}

//Get Seller Promotional Product

export function getSellerPromotionalProductsRecord(shopId) {
  return async (dispatch) => {
    dispatch(getSellerPromotionalProducts());
    return await productService
      .getSellerPromotionalProducts(shopId)

      .then((response) =>
        dispatch(getSellerPromotionalProductsSuccess(response.data))
      )
      .catch((error) => dispatch(getSellerPromotionalProductsError(error)));
  };
}

export function getSellerPromotionalProducts() {
  return {
    type: GET_SELLER_PROMOTIONAL_PRODUCTS,
  };
}

export function getSellerPromotionalProductsSuccess(success) {
  return {
    type: GET_SELLER_PROMOTIONAL_PRODUCTS_SUCCESS,
    payload: { success },
  };
}

export function getSellerPromotionalProductsError(error) {
  return {
    type: GET_SELLER_PROMOTIONAL_PRODUCTS_ERROR,
    payload: { error },
  };
}

// Approve Product Start
export function approveProductRecord(data) {
  return async (dispatch) => {
    dispatch(approveProduct());
    return await productService
      .approveProduct(data)
      .then((response) => dispatch(approveProductSuccess(response)))
      .catch((error) => dispatch(approveProductError(error)));
  };
}

export function approveProduct() {
  return {
    type: APPROVE_PRODUCT,
  };
}

export function approveProductSuccess(success) {
  return {
    type: APPROVE_PRODUCT_SUCCESS,
    payload: { success },
  };
}

export function approveProductError(error) {
  return {
    type: APPROVE_PRODUCT_ERROR,
    payload: { error },
  };
}
// Approve Product End

// Reject Shop
export function rejectProductRecord(data) {
  return async (dispatch) => {
    dispatch(rejectProduct());
    return await productService
      .rejectProduct(data)

      .then((response) => dispatch(rejectProductSuccess(response)))
      .catch((error) => dispatch(rejectProductError(error)));
  };
}

export function rejectProduct() {
  return {
    type: REJECT_PRODUCT,
  };
}

export function rejectProductSuccess(success) {
  return {
    type: REJECT_PRODUCT_SUCCESS,
    payload: { success },
  };
}

export function rejectProductError(error) {
  return {
    type: REJECT_PRODUCT_ERROR,
    payload: { error },
  };
}

//Update Product Remarks
export function updateProductRemarksRecord(data) {
  return async (dispatch) => {
    dispatch(updateProductRemarks());
    return await productService
      .updateProductRemarks(data)

      .then((response) => dispatch(updateProductRemarksSuccess(response.data)))
      .catch((error) => dispatch(updateProductRemarksError(error)));
  };
}

export function updateProductRemarks() {
  return {
    type: UPDATE_PRODUCT_REMARKS,
  };
}

export function updateProductRemarksSuccess(success) {
  return {
    type: UPDATE_PRODUCT_REMARKS_SUCCESS,
    payload: { success },
  };
}

export function updateProductRemarksError(error) {
  return {
    type: UPDATE_PRODUCT_REMARKS_ERROR,
    payload: { error },
  };
}

//Check Duplicate Product
export function checkDuplicateProductsRecord(sku) {
  return async (dispatch) => {
    dispatch(checkDuplicateProducts());
    return await productService
      .checkDuplicateProducts(sku)

      .then((response) => dispatch(checkDuplicateProductsSuccess(response)))
      .catch((error) => dispatch(checkDuplicateProductsError(error)));
  };
}

export function checkDuplicateProducts() {
  return {
    type: CHECK_DUPLICATE_PRODUCT,
  };
}

export function checkDuplicateProductsSuccess(success) {
  return {
    type: CHECK_DUPLICATE_PRODUCT_SUCCESS,
    payload: { success },
  };
}

export function checkDuplicateProductsError(error) {
  return {
    type: CHECK_DUPLICATE_PRODUCT_ERROR,
    payload: { error },
  };
}

//Check Real Time Inventory Start
export function checkRealTimeInventoryRecord(sku) {
  return async (dispatch) => {
    dispatch(checkRealTimeInventory());
    return await productService
      .checkRealTimeInventory(sku)

      .then((response) => dispatch(checkRealTimeInventorySuccess(response)))
      .catch((error) => dispatch(checkRealTimeInventoryError(error)));
  };
}

export function checkRealTimeInventory() {
  return {
    type: CHECK_REAL_TIME_INVENTORY,
  };
}

export function checkRealTimeInventorySuccess(success) {
  return {
    type: CHECK_REAL_TIME_INVENTORY_SUCCESS,
    payload: { success },
  };
}

export function checkRealTimeInventoryError(error) {
  return {
    type: CHECK_REAL_TIME_INVENTORY_ERROR,
    payload: { error },
  };
}
//Check Real Time Inventory End

//Get Product List Start
export function getProductListRecord(
  currency,
  isApproved,
  isDeleted,
  currentPage,
  itemPerPage,
  searchKeyword,
  categoryId,
  brand,
  statusCode
) {
  return async (dispatch) => {
    dispatch(getProductList());
    return await productService
      .getProductList(
        currency,
        isApproved,
        isDeleted,
        currentPage,
        itemPerPage,
        searchKeyword,
        categoryId,
        brand,
        statusCode
      )

      .then((response) => dispatch(getProductListSuccess(response)))
      .catch((error) => dispatch(getProductListError(error)));
  };
}
export function getProductList() {
  return {
    type: GET_PRODUCTS_LIST,
  };
}
export function getProductListSuccess(success) {
  return {
    type: GET_PRODUCTS_LIST_SUCCESS,
    payload: { success },
  };
}
export function getProductListError(error) {
  return {
    type: GET_PRODUCTS_LIST_ERROR,
    payload: { error },
  };
}
//Get Product List End

//Get Product Details Start
export function getProductDetailsRecord(id, currency, isApproved) {
  return async (dispatch) => {
    dispatch(getProductDetails());
    return await productService
      .getProductDetails(id, currency, isApproved)

      .then((response) => dispatch(getProductDetailsSuccess(response)))
      .catch((error) => dispatch(getProductDetailsError(error)));
  };
}
export function getProductDetails() {
  return {
    type: GET_PRODUCTS_DETAILS,
  };
}
export function getProductDetailsSuccess(success) {
  return {
    type: GET_PRODUCTS_DETAILS_SUCCESS,
    payload: { success },
  };
}
export function getProductDetailsError(error) {
  return {
    type: GET_PRODUCTS_DETAILS_ERROR,
    payload: { error },
  };
}
//Get Product Details End
