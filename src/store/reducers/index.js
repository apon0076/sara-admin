import { combineReducers } from "redux";

import activeBreadcrumbsCategoryReducer from "./activeBreadcrumbsCategoryReducer";
import addressReducer from "./addressReducer";
import adsReducer from "./adsReducer";
import alertReducer from "./alertReducer";
import attributeReducer from "./attributeReducer";
import authReducer from "./authReducer";
import blogCategoryReducer from "./blogCategoryReducer";
import blogPostReducer from "./blogPostReducer";
import brandReducer from "./brandReducer";
import breadcrumbsCategoryReducer from "./breadcrumbsCategoryReducer";
import bussinessTypeReducer from "./bussinessTypeReducer";
import careerReducer from "./careerReducer";
import categoryReducer from "./categoryReducer";
import colorReducer from "./colorReducer";
import contentReducer from "./contentReducer";
import currencyReducer from "./currencyReducer";
import customerReducer from "./customerReducer";
import deliverOrderListReducer from "./deliverOrderListReducer";
import designation from "./designation";
import discountReducer from "./discountReducer";
import discountSummaryReducer from "./discountSummaryReducer";
import discountTypeReducer from "./discountTypeReducer";
import homePageSliderReducer from "./homePageSliderReducer";
import inventoryReducer from "./inventoryReducer";
import invoiceReducer from "./invoiceReducer";
import { loaderReducer } from "./loaderReducer";
import manageOrderReducer from "./manageOrder/manageOrderReducer";
import measurementChartReducer from "./measurementChartReducer";
import menuPermissionReducer from "./menuPermissionReducer";
import menuReducer from "./menuReducer";
import orderReducer from "./orderReducer";
import { orderRequisitionReducer } from "./orderRequisitionReducer";
import paymentMethodReducer from "./paymentMethodReducer";
import pendingOrderListReducer from "./pendingOrderListReducer";
import popUpReducer from "./popUpReducer";
import processingOrderListReducer from "./processingOrderListReducer";
import productCampaignSellerReducer from "./productCampaignSellerReducer";
import productImageByColorReducer from "./productImageByColorReducer";
import productImageReducer from "./productImageReducer";
import productReducer from "./productReducer";
import productSliderReducer from "./productSliderReducer";
import productVariantOptionReducer from "./productVariantOptionReducer";
import productVariantOptionValueReducer from "./productVariantOptionValueReducer";
import productVariantReducer from "./productVariantReducer";
import profileReducer from "./profileReducer";
import promotionDetailsReducer from "./promotionDetailsReducer";
import promotionReducer from "./promotionReducer";
import { realtimeDataReducer } from "./realtimeDataReducer";
import { refundReducer } from "./refundReducer";
import regionReducer from "./regionReducer";
import reportReducer from "./reportReducer";
import roleReducer from "./roleReducer";
import secondaryImageReducer from "./secondaryImageReducer";
import sellerProfileReducer from "./sellerProfileReducer";
import sellerReducer from "./sellerReducer";
import shippingReducer from "./shippingReducer";
import shopReducer from "./shopReducer";
import { sizeChartReducers } from "./sizeChartReducers";
import sizeReducer from "./sizeReducer";
import subCategoryReducer from "./subCategoryReducer";
import subSubCategoryReducer from "./subSubCategoryReducer";
import unitReducer from "./unitReducer";
import vendorReducer from "./vendorReducer";
import voucherReducer from "./voucherReducer";
import wishListReducer from "./wishListReducer";

export default combineReducers({
  activeBreadcrumbsCategoryReducer: activeBreadcrumbsCategoryReducer,
  adsReducer: adsReducer,
  addressReducer: addressReducer,
  alertReducer: alertReducer,
  attributeReducer: attributeReducer,
  authReducer: authReducer,
  blogCategoryReducer: blogCategoryReducer,
  blogPostReducer: blogPostReducer,
  brandReducer: brandReducer,
  breadcrumbsCategoryReducer: breadcrumbsCategoryReducer,
  bussinessTypeReducer: bussinessTypeReducer,
  categoryReducer: categoryReducer,
  colorReducer: colorReducer,
  contentReducer: contentReducer,
  currencyReducer: currencyReducer,
  customerReducer: customerReducer,
  deliverOrderListReducer: deliverOrderListReducer,
  designation: designation,
  discountReducer: discountReducer,
  discountSummaryReducer: discountSummaryReducer,
  discountTypeReducer: discountTypeReducer,
  homePageSliderReducer: homePageSliderReducer,
  inventoryReducer: inventoryReducer,
  invoiceReducer: invoiceReducer,
  loader: loaderReducer,
  manageOrder: manageOrderReducer,
  measurementChartReducer: measurementChartReducer,
  menuPermissionReducer: menuPermissionReducer,
  menuReducer: menuReducer,
  orderReducer: orderReducer,
  paymentMethodReducer: paymentMethodReducer,
  pendingOrderListReducer: pendingOrderListReducer,
  popUpReducer: popUpReducer,
  productCampaignSellerReducer: productCampaignSellerReducer,
  processingOrderListReducer: processingOrderListReducer,
  productImageByColorReducer: productImageByColorReducer,
  productImageReducer: productImageReducer,
  productReducer: productReducer,
  productSliderReducer: productSliderReducer,
  productVariantOptionReducer: productVariantOptionReducer,
  productVariantOptionValueReducer: productVariantOptionValueReducer,
  productVariantReducer: productVariantReducer,
  profileReducer: profileReducer,
  promotionDetailsReducer: promotionDetailsReducer,
  promotionReducer: promotionReducer,
  realtimeDataReducer: realtimeDataReducer,
  regionReducer: regionReducer,
  roleReducer: roleReducer,
  reportReducer: reportReducer,
  secondaryImageReducer: secondaryImageReducer,
  sellerProfileReducer: sellerProfileReducer,
  sellerReducer: sellerReducer,
  shippingReducer: shippingReducer,
  shopReducer: shopReducer,
  sizeReducer: sizeReducer,
  subCategoryReducer: subCategoryReducer,
  subSubCategoryReducer: subSubCategoryReducer,
  unitReducer: unitReducer,
  vendorReducer: vendorReducer,
  voucherReducer: voucherReducer,
  voucherValidity: voucherReducer,
  wishListReducer: wishListReducer,
  refundReducer: refundReducer,
  orderRequisition: orderRequisitionReducer,
  careerReducer: careerReducer,
  sizeChartReducers: sizeChartReducers,
});