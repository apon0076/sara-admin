import {
  APPROVE_PRODUCT,
  APPROVE_PRODUCT_ERROR,
  APPROVE_PRODUCT_SUCCESS,
  CHECK_DUPLICATE_PRODUCT,
  CHECK_DUPLICATE_PRODUCT_ERROR,
  CHECK_DUPLICATE_PRODUCT_SUCCESS,
  CHECK_REAL_TIME_INVENTORY,
  CHECK_REAL_TIME_INVENTORY_ERROR,
  CHECK_REAL_TIME_INVENTORY_SUCCESS,
  CREATE_PRODUCT,
  CREATE_PRODUCT_ERROR,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_SUCCESS,
  GET_ALL_VERIFIED_PRODUCTS,
  GET_ALL_VERIFIED_PRODUCTS_ERROR,
  GET_ALL_VERIFIED_PRODUCTS_SUCCESS,
  GET_PENDING_PRODUCTS,
  GET_PENDING_PRODUCTS_ERROR,
  GET_PENDING_PRODUCTS_SUCCESS,
  GET_PENDING_SELLER_PRODUCTS,
  GET_PENDING_SELLER_PRODUCTS_ERROR,
  GET_PENDING_SELLER_PRODUCTS_SUCCESS,
  GET_PRODUCT,
  GET_PRODUCTS_DETAILS,
  GET_PRODUCTS_DETAILS_ERROR,
  GET_PRODUCTS_DETAILS_SUCCESS,
  GET_PRODUCTS_LIST,
  GET_PRODUCTS_LIST_ERROR,
  GET_PRODUCTS_LIST_SUCCESS,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_BY_ID_ERROR,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_DATA_BY_ID,
  GET_PRODUCT_DATA_BY_ID_ERROR,
  GET_PRODUCT_DATA_BY_ID_SUCCESS,
  GET_PRODUCT_ERROR,
  GET_PRODUCT_SUCCESS,
  GET_REJECTED_PRODUCTS,
  GET_REJECTED_PRODUCTS_ERROR,
  GET_REJECTED_PRODUCTS_SUCCESS,
  GET_SELLER_PROMOTIONAL_PRODUCTS,
  GET_SELLER_PROMOTIONAL_PRODUCTS_ERROR,
  GET_SELLER_PROMOTIONAL_PRODUCTS_SUCCESS,
  GET_SELLER_REJECTED_PRODUCTS,
  GET_SELLER_REJECTED_PRODUCTS_ERROR,
  GET_SELLER_REJECTED_PRODUCTS_SUCCESS,
  GET_VERIFIED_PRODUCTS,
  GET_VERIFIED_PRODUCTS_ERROR,
  GET_VERIFIED_PRODUCTS_SUCCESS,
  GET_VERIFIED_SELLER_PRODUCTS,
  GET_VERIFIED_SELLER_PRODUCTS_ERROR,
  GET_VERIFIED_SELLER_PRODUCTS_SUCCESS,
  REJECT_PRODUCT,
  REJECT_PRODUCT_ERROR,
  REJECT_PRODUCT_SUCCESS,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_ERROR,
  UPDATE_PRODUCT_REMARKS,
  UPDATE_PRODUCT_REMARKS_ERROR,
  UPDATE_PRODUCT_REMARKS_SUCCESS,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
} from "../actions/productAction";

const initialState = {
  products: [], //THIS IS UESED FOR TO HOLD ARRAY DATA
  productsHeader: [],
  colors: [], //THIS IS UESED FOR TO HOLD ARRAY DATA AFTER SERACHING RECORD BY PRODUCT ID
  productColors: [], //THIS IS UESED FOR TO HOLD PRODUCT COLOR ARRAY DATA AFTER SERACHING RECORD BY PRODUCT ID
  productSizes: [], //THIS IS UESED FOR TO HOLD PRODUCT SIZE ARRAY DATA AFTER SERACHING RECORD BY PRODUCT ID
  data: {}, // THIS IS USED FOR TO HOLD SAVE DATA
  updatedData: {},
  pendingProducts: [],
  rejectedProducts: [],
  sellerRejectedProducts: [],
  productRemarks: [],
  verifiedProducts: [],
  allVerifiedProducts: [],
  pendingSellerProducts: [],
  verifiedSellerProducts: [],
  sellerPromotionalProducts: [],
  checkDuplicateSKU: [],
  checkRealTimeInventory: [],
  getProductList: [],
  getProductDetails: [],
  approvedProductStatus: [],
  rejectedProductStatus: [],
  productDetailsLoading: false,
  loading: false,
  loaded: false,
  getDataLoaded: false,
  saving: false,
  saved: false,
  updating: false,
  updated: false,
  deleting: false,
  deleted: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    //Get Product
    case GET_PRODUCT:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        products: action.payload.success,
      };

    case GET_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        products: [],
      };

    //Get Product by ID
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        products: action.payload.success,
      };

    case GET_PRODUCT_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        products: [],
      };

    //Get Product data by ID
    case GET_PRODUCT_DATA_BY_ID:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PRODUCT_DATA_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        products: action.payload.success,
      };

    case GET_PRODUCT_DATA_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        products: [],
      };

    //Create Product
    case CREATE_PRODUCT:
      return {
        ...state,
        saving: true,
        saved: false,
        error: null,
      };

    case CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        saving: false,
        saved: true,
        data: action.payload.success,
      };

    case CREATE_PRODUCT_ERROR:
      return {
        ...state,
        saving: false,
        saved: false,
        error: action.payload.error,
        data: {},
      };

    //Update Product
    case UPDATE_PRODUCT:
      return {
        ...state,
        updating: true,
        updated: false,
        error: null,
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        updating: false,
        updated: true,
        updatedData: action.payload.success,
      };

    case UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        updating: false,
        updated: false,
        error: null,
        updatedData: {},
      };

    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        updating: false,
        updated: false,
        error: null,
        updatedData: {},
      };

    //Delete Product
    case DELETE_PRODUCT:
      return {
        ...state,
        deleting: true,
        deleted: false,
        error: null,
      };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        deleting: false,
        deleted: true,
        data: action.payload.success,
      };

    case DELETE_PRODUCT_ERROR:
      return {
        ...state,
        deleting: false,
        deleted: false,
        error: action.payload.error,
        data: {},
      };

    //Pending Product  //GET
    case GET_PENDING_PRODUCTS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PENDING_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        pendingProducts: action.payload.success,
      };

    case GET_PENDING_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        pendingProducts: [],
      };

    case GET_PENDING_SELLER_PRODUCTS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PENDING_SELLER_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        pendingSellerProducts: action.payload.success,
      };

    case GET_PENDING_SELLER_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        pendingSellerProducts: [],
      };

    //Verified Product  //GET
    case GET_VERIFIED_PRODUCTS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_VERIFIED_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        verifiedProducts: action.payload.success.data,
        productsHeader: action.payload.success.headers,
      };
    }

    case GET_VERIFIED_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        verifiedProducts: [],
      };

    case GET_ALL_VERIFIED_PRODUCTS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_ALL_VERIFIED_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        allVerifiedProducts: action.payload.success,
      };

    case GET_ALL_VERIFIED_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        allVerifiedProducts: [],
      };

    case GET_VERIFIED_SELLER_PRODUCTS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_VERIFIED_SELLER_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        verifiedSellerProducts: action.payload.success,
      };

    case GET_VERIFIED_SELLER_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        verifiedSellerProducts: [],
      };

    //Seller Promotional Products
    case GET_SELLER_PROMOTIONAL_PRODUCTS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_SELLER_PROMOTIONAL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        sellerPromotionalProducts: action.payload.success,
      };

    case GET_SELLER_PROMOTIONAL_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        sellerPromotionalProducts: [],
      };

    //Product Approve
    case APPROVE_PRODUCT:
      return {
        ...state,
        processing: true,
        processed: false,
        error: null,
      };

    case APPROVE_PRODUCT_SUCCESS:
      return {
        ...state,
        processing: false,
        processed: true,
        approvedProductStatus: action.payload.success,
      };

    case APPROVE_PRODUCT_ERROR:
      return {
        ...state,
        processing: false,
        processed: false,
        error: action.payload.error,
        approvedProductStatus: {},
      };

    //Get Rejected Products
    case GET_REJECTED_PRODUCTS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_REJECTED_PRODUCTS_SUCCESS:
      debugger;
      return {
        ...state,
        loading: false,
        loaded: true,
        rejectedProducts: action.payload.success,
      };

    case GET_REJECTED_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        rejectedProducts: [],
      };

    //Product Reject
    case REJECT_PRODUCT:
      return {
        ...state,
        processing: true,
        processed: false,
        error: null,
      };

    case REJECT_PRODUCT_SUCCESS:
      return {
        ...state,
        processing: false,
        processed: true,
        rejectedProductStatus: action.payload.success,
      };

    case REJECT_PRODUCT_ERROR:
      return {
        ...state,
        processing: false,
        processed: false,
        error: action.payload.error,
        rejectedProductStatus: {},
      };

    //Seller Rejected Products
    case GET_SELLER_REJECTED_PRODUCTS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_SELLER_REJECTED_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        sellerRejectedProducts: action.payload.success,
      };

    case GET_SELLER_REJECTED_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        sellerRejectedProducts: [],
      };

    //Product Reject Remarks
    case UPDATE_PRODUCT_REMARKS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case UPDATE_PRODUCT_REMARKS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        productRemarks: action.payload.success,
      };

    case UPDATE_PRODUCT_REMARKS_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        productRemarks: [],
      };

    //Check Duplicate Sku
    case CHECK_DUPLICATE_PRODUCT:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case CHECK_DUPLICATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        checkDuplicateSKU: action.payload.success,
      };

    case CHECK_DUPLICATE_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        checkDuplicateSKU: [],
      };

    // Check RealTime Inventory Start
    case CHECK_REAL_TIME_INVENTORY:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case CHECK_REAL_TIME_INVENTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        checkRealTimeInventory: action.payload.success,
      };

    case CHECK_REAL_TIME_INVENTORY_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        checkRealTimeInventory: [],
      };
    // Check RealTime Inventory End

    // Get Products List Start
    case GET_PRODUCTS_LIST:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };

    case GET_PRODUCTS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        getProductList: action.payload.success,
      };

    case GET_PRODUCTS_LIST_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload.error,
        getProductList: [],
      };
    // Get Products List End

    // Get Products Details Start
    case GET_PRODUCTS_DETAILS:
      return {
        ...state,
        productDetailsLoading: true,
        getDataLoaded: false,
        error: null,
      };

    case GET_PRODUCTS_DETAILS_SUCCESS:
      return {
        ...state,
        productDetailsLoading: false,
        getDataLoaded: true,
        getProductDetails: action.payload.success,
      };

    case GET_PRODUCTS_DETAILS_ERROR:
      return {
        ...state,
        productDetailsLoading: false,
        getDataLoaded: false,
        error: action.payload.error,
        getProductDetails: [],
      };
    // Get Products Details End

    default:
      return state;
  }
}
