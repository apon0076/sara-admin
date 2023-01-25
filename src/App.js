import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./assets/styles/framework.scss";
import AuthLayout from "./components/auth/AuthLayout";
import NoMatch from "./components/NoMatch/NoMatch";
import ProtectedLayout from "./components/ProtectedLayout";
import SellerLayout from "./components/seller/SellerLayout";
import SellerDashboardLayout from "./components/SellerLayout";
import {
  AddNewAdmin,
  AdminList,
  AdsList,
  ApprovedReturnPolicy,
  AttributeList,
  BankAccount,
  BlogCategoryList,
  BlogPostList,
  BrandList,
  BusinessInformation,
  BussinessTypeList,
  CategoryList,
  ChangeSellerPassword,
  CourierCostList,
  CourierProductTypeList,
  CourierProfileList,
  CreateAds,
  CreateAttribute,
  CreateBlogCategory,
  CreateBlogPost,
  CreateBrand,
  CreateBussinessType,
  CreateCategory,
  CreateCourierCost,
  CreateCourierProductType,
  CreateCourierProfile,
  CreateDiscount,
  CreateDiscountSummary,
  CreateDiscountType,
  CreateHomePageSlider,
  CreateInventory,
  CreateMeasurementChart,
  CreateMenu,
  CreateMenuPermission,
  CreateOrder,
  CreateOrderType,
  CreatePaymentMethod,
  CreatePopUpBanner,
  CreateProductAdminTest,
  CreateProductImage,
  CreateProductImageByColor,
  CreateProductSellerTest,
  CreateProductShippingCostMapping,
  CreateProductSlider,
  CreateProductVariant,
  CreateProductVariantOption,
  CreateProductVariantOptionValue,
  CreatePromotion,
  CreateRole,
  CreateSecondaryImage,
  CreateSeller,
  CreateSellerCommissionPercentage,
  CreateShippingCost,
  CreateShippingOptions,
  CreateShippingType,
  CreateShop,
  CreateSubCategory,
  CreateSubSubCategory,
  CreateUnit,
  CreateVendor,
  CreateVoucher,
  DeliverOrderList,
  DiscountList,
  DiscountSummaryList,
  DiscountTypeList,
  EditAdmin,
  EditAds,
  EditAttribute,
  EditBlogCategory,
  EditBlogPost,
  EditBrand,
  EditBussinessType,
  EditCategory,
  EditCourierCost,
  EditCourierProductType,
  EditCourierProfile,
  EditDiscount,
  EditDiscountSummary,
  EditDiscountType,
  EditHomePageSlider,
  EditInventory,
  EditOrderType,
  EditPaymentMethod,
  EditProductCampaignSellerList,
  EditProductVariant,
  EditProductVariantOption,
  EditProductVariantOptionValue,
  EditProfile,
  EditPromotion,
  EditReturnPolicy,
  EditRole,
  EditSeller,
  EditSellerCommissionPercentage,
  EditSellerProduct,
  EditSellerProfile,
  EditShippingOptions,
  EditShoppingType,
  EditSubCategory,
  EditSubSubCategory,
  EditUnit,
  EditVendor,
  EditVoucher,
  Home,
  HomePageSliderList,
  ImportCurrency,
  ImportCurrencyList,
  ImportOrExport,
  InventoryList,
  Invoice,
  InvoicePDF,
  Login,
  ManageOrder,
  ManageReviews,
  MeasurementChartList,
  MenuList,
  OrderTypeList,
  PaymentMethodList,
  PendingOrderList,
  PendingProduct,
  PendingReturnPolicy,
  PendingSeller,
  PendingSellerProduct,
  PopUpBannerList,
  ProcessingOrderList,
  ProductCampaignSellerList,
  ProductImageByColorList,
  ProductImageList,
  ProductSliderList,
  ProductVariantList,
  ProductVariantOptionList,
  ProductVariantOptionValueList,
  Profile,
  PromotionDetails,
  PromotionDetailsList,
  PromotionList,
  Register,
  RejectedProduct,
  RejectedReturnPolicy,
  RejectedSellerProduct,
  ResetPasswordAdmin,
  ResetPasswordSeller,
  ReturnAddress,
  RoleList,
  SecondaryImageList,
  SellerCommission,
  SellerCommissionPercentageList,
  SellerHome,
  SellerList,
  SellerLogin,
  SellerProfile,
  SellerReturnPolicy,
  ShippingCostList,
  ShippingOptionsList,
  ShippingProvider,
  ShippingTypeList,
  ShopDetails,
  SubCategoryList,
  SubSubCategoryList,
  UnitList,
  VendorList,
  VerifiedProduct,
  VerifiedSeller,
  VerifiedSellerProduct,
  VerifiedShopList,
  VoucherList,
  WarehouseAddress,
} from "./containers";
import manageOrderAdminContainer_v2 from "./containers/orders/manageOrderAdminContainer_v2";
import SellerInvoiceAll from "./components/invoice/SellerInvoiceAll";
import PrintRequisition from "./components/orderRequisition/PrintRequisition";
import Applicants from "./containers/career/Applicants";
import Career from "./containers/career/Career";
import ContentPost from "./containers/content/ContentPost";
import ContentType from "./containers/content/ContentType";
import OrderRequisition from "./containers/orderRequisition/OrderRequisitionListContainer";
import OrderRequisitionSeller from "./containers/orderRequisition/OrderRequisitionListSellerContainer";
import cancelOrdersListContainer from "./containers/orders/cancelOrdersListContainer";
import ReturnOrdersListContainer from "./containers/orders/returnOrdersListContainer";
import EditProductContainer from "./containers/product/editProductContainer";
import { ManageProducts } from "./containers/product/manageProducts";
import { ManageSellerProducts } from "./containers/product/manageSellerProducts";
import report from "./containers/report/reportContainer";
import cancelSellerOrdersListContainer from "./containers/seller/cancelSellerOrdersListContainer";
import ReturnSellerOrdersListContainer from "./containers/seller/returnSellerOrdersListContainer";
import SizeChartAttributeList from "./containers/sizeChart/SizeChartAttributeList";
import SizeChartAttributes from "./containers/sizeChart/SizeChartAttributes";
import SizeGuideMeasurement from "./containers/sizeChart/SizeGuideMeasurement";
import SizeGuideMeasurementList from "./containers/sizeChart/SizeGuideMeasurementList";
import SizeChartTemplateViewOrUpdate from "./containers/sizeChart/SizeChartTemplateViewOrUpdate";
import MultipleInvoicePrint from "./containers/invoice/MultipleInvoicePrint";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/SellerLogin" />
        </Route>

        <AuthLayout path="/Login" component={Login} />
        <AuthLayout path="/Register" component={Register} />
        <AuthLayout path="/ResetPasswordAdmin" component={ResetPasswordAdmin} />
        <AuthLayout
          path="/ResetPasswordSeller"
          component={ResetPasswordSeller}
        />

        <SellerLayout path="/CreateSeller" component={CreateSeller} />
        <SellerLayout path="/SellerLogin" component={SellerLogin} />

        <SellerDashboardLayout path="/SellerHome" component={SellerHome} />
        <SellerDashboardLayout path="/CreateShop" component={CreateShop} />

        <SellerDashboardLayout
          path="/createProductSeller"
          component={CreateProductSellerTest}
        />
        <SellerDashboardLayout
          path="/EditSellerProduct/:id"
          component={EditSellerProduct}
        />
        <SellerDashboardLayout
          path="/SellerProfile"
          component={SellerProfile}
        />
        <SellerDashboardLayout
          path="/EditSellerProfile/:id"
          component={EditSellerProfile}
        />
        <SellerDashboardLayout
          path="/ChangeSellerPassword/:id"
          component={ChangeSellerPassword}
        />
        <SellerDashboardLayout
          path="/BusinessInformation"
          component={BusinessInformation}
        />
        <SellerDashboardLayout
          path="/ShippingProvider"
          component={ShippingProvider}
        />
        <SellerDashboardLayout
          path="/WarehouseAddress"
          component={WarehouseAddress}
        />
        <SellerDashboardLayout
          path="/ReturnAddress"
          component={ReturnAddress}
        />
        <SellerDashboardLayout
          path="/ReturnPolicy"
          component={SellerReturnPolicy}
        />
        <SellerDashboardLayout path="/BankAccount" component={BankAccount} />
        <SellerDashboardLayout path="/ManageOrder" component={ManageOrder} />
        <SellerDashboardLayout
          path="/CancelSellerOrders"
          component={cancelSellerOrdersListContainer}
        />
        <SellerDashboardLayout
          path="/ReturnSellerOrders"
          component={ReturnSellerOrdersListContainer}
        />
        <SellerDashboardLayout
          path="/ManageReviews"
          component={ManageReviews}
        />

        <SellerDashboardLayout
          path="/PromotionDetailsList"
          component={PromotionDetailsList}
        />
        <SellerDashboardLayout
          path="/PromotionDetails"
          component={PromotionDetails}
        />
        <SellerDashboardLayout
          path="/SellerCommission"
          component={SellerCommission}
        />

        <SellerDashboardLayout
          path="/CreateCommissionPercentage"
          component={CreateSellerCommissionPercentage}
        />
        <SellerDashboardLayout
          path="/EditCommissionPercentage"
          component={EditSellerCommissionPercentage}
        />
        <SellerDashboardLayout
          path="/CommissionPercentageList"
          component={SellerCommissionPercentageList}
        />

        <SellerDashboardLayout
          path="/pendingSellerProduct"
          component={PendingSellerProduct}
        />
        <SellerDashboardLayout
          path="/approvedSellerProduct"
          component={VerifiedSellerProduct}
        />

        <SellerDashboardLayout
          path="/rejectedSellerProduct"
          component={RejectedSellerProduct}
        />
        <SellerDashboardLayout
          path="/sellerInvoice"
          component={SellerInvoiceAll}
        />
        <SellerDashboardLayout
          path="/SellerInvoiceAll"
          component={SellerInvoiceAll}
        />
        <SellerDashboardLayout
          path="/seller-order-requisition"
          component={OrderRequisitionSeller}
        />
        <SellerDashboardLayout
          path="/print-seller-requisition"
          component={PrintRequisition}
        />
        <SellerDashboardLayout
          path="/manage-seller-products"
          component={ManageSellerProducts}
        />
        {/* //---------------------------------------------------------------------------------------// */}
        <ProtectedLayout path="/Home" component={Home} />
        <ProtectedLayout
          path="/CreateMenuPermission"
          component={CreateMenuPermission}
        />
        <ProtectedLayout path="/CreateOrder" component={CreateOrder} />
        <ProtectedLayout path="/CreateRole" component={CreateRole} />
        <ProtectedLayout path="/EditRole/:id" component={EditRole} />
        <ProtectedLayout path="/RoleList" component={RoleList} />
        <ProtectedLayout path="/Profile" component={Profile} />
        <ProtectedLayout
          path="/editProfile/:id/:name"
          component={EditProfile}
        />
        <ProtectedLayout path="/CreateMenu" component={CreateMenu} />
        <ProtectedLayout path="/MenuList" component={MenuList} />
        <ProtectedLayout path="/approvedSeller" component={VerifiedSeller} />
        <ProtectedLayout
          path="/createProductAdmin"
          component={CreateProductAdminTest}
        />
        <ProtectedLayout path="/manage-products" component={ManageProducts} />
        <ProtectedLayout path="/approvedProduct" component={VerifiedProduct} />
        <ProtectedLayout path="/pendingProduct" component={PendingProduct} />
        <ProtectedLayout path="/rejectedProduct" component={RejectedProduct} />
        <ProtectedLayout path="/PendingSeller" component={PendingSeller} />
        <ProtectedLayout
          path="/ManageOrdersAdmin"
          component={manageOrderAdminContainer_v2}
        />
        <ProtectedLayout path="/CreateOrderType" component={CreateOrderType} />
        <ProtectedLayout
          path="/CancelOrders"
          component={cancelOrdersListContainer}
        />
        <ProtectedLayout
          path="/ReturnOrders"
          component={ReturnOrdersListContainer}
        />
        <ProtectedLayout path="/OrdersTypeList" component={OrderTypeList} />
        <ProtectedLayout path="/EditOrdersType" component={EditOrderType} />
        <ProtectedLayout path="/ImportOrExport" component={ImportOrExport} />
        <ProtectedLayout path="/ImportCurrency" component={ImportCurrency} />
        <ProtectedLayout
          path="/CurrencyRateList"
          component={ImportCurrencyList}
        />
        <ProtectedLayout
          path="/VerifiedShopList"
          component={VerifiedShopList}
        />
        <ProtectedLayout path="/ShopDetails" component={ShopDetails} />
        <ProtectedLayout path="/CreateCategory" component={CreateCategory} />
        <ProtectedLayout path="/EditCategory" component={EditCategory} />
        <ProtectedLayout path="/CategoryList" component={CategoryList} />
        <ProtectedLayout
          path="/CreateBlogCategory"
          component={CreateBlogCategory}
        />
        <ProtectedLayout
          path="/EditBlogCategory"
          component={EditBlogCategory}
        />
        <ProtectedLayout
          path="/BlogCategoryList"
          component={BlogCategoryList}
        />
        <ProtectedLayout path="/CreateBlogPost" component={CreateBlogPost} />
        <ProtectedLayout path="/EditBlogPost" component={EditBlogPost} />
        <ProtectedLayout path="/BlogPostList" component={BlogPostList} />

        <ProtectedLayout
          path="/CreatePaymentMethod"
          component={CreatePaymentMethod}
        />
        <ProtectedLayout
          path="/PaymentMethodList"
          component={PaymentMethodList}
        />
        <ProtectedLayout
          path="/EditPaymentMethod"
          component={EditPaymentMethod}
        />
        <ProtectedLayout
          path="/CreateProductVariant"
          component={CreateProductVariant}
        />
        <ProtectedLayout
          path="/EditProductVariant"
          component={EditProductVariant}
        />
        <ProtectedLayout
          path="/ProductVariantList"
          component={ProductVariantList}
        />
        <ProtectedLayout
          path="/CreateProductVariantOption"
          component={CreateProductVariantOption}
        />
        <ProtectedLayout
          path="/CreateProductVariantOptionValue"
          component={CreateProductVariantOptionValue}
        />
        <ProtectedLayout
          path="/ProductVariantOptionList"
          component={ProductVariantOptionList}
        />
        <ProtectedLayout
          path="/ProductVariantOptionValueList"
          component={ProductVariantOptionValueList}
        />
        <ProtectedLayout
          path="/EditProductVariantOption"
          component={EditProductVariantOption}
        />
        <ProtectedLayout
          path="/EditProductVariantOptionValue"
          component={EditProductVariantOptionValue}
        />
        <ProtectedLayout path="/addNewAdmin" component={AddNewAdmin} />
        <ProtectedLayout path="/AdminList" component={AdminList} />
        {/* <ProtectedLayout path="/EditAdmin/:id/:name" component={EditAdmin} /> */}
        <ProtectedLayout path="/EditAdmin" component={EditAdmin} />
        <ProtectedLayout path="/CreateBrand" component={CreateBrand} />
        <ProtectedLayout path="/EditBrand" component={EditBrand} />
        <ProtectedLayout path="/BrandList" component={BrandList} />
        <ProtectedLayout
          path="/DiscountTypeList"
          component={DiscountTypeList}
        />
        <ProtectedLayout path="/DiscountList" component={DiscountList} />
        <ProtectedLayout
          path="/DiscountSummaryList"
          component={DiscountSummaryList}
        />
        <ProtectedLayout
          path="/EditDiscountType"
          component={EditDiscountType}
        />
        <ProtectedLayout path="/EditDiscount" component={EditDiscount} />
        <ProtectedLayout
          path="/EditDiscountSummary"
          component={EditDiscountSummary}
        />
        <ProtectedLayout
          path="/CreateBussinessType"
          component={CreateBussinessType}
        />
        <ProtectedLayout
          path="/EditBussinessType/:id/:name"
          component={EditBussinessType}
        />
        <ProtectedLayout
          path="/BussinessTypeList"
          component={BussinessTypeList}
        />
        <ProtectedLayout path="/CreateAttribute" component={CreateAttribute} />
        <ProtectedLayout
          path="/EditAttribute/:id/:name/:activeYn"
          component={EditAttribute}
        />
        <ProtectedLayout path="/AttributeList" component={AttributeList} />
        <ProtectedLayout
          path="/CreateSubCategory"
          component={CreateSubCategory}
        />
        <ProtectedLayout
          path="/EditSubCategory/:id/:categoryId/:name"
          component={EditSubCategory}
        />
        <ProtectedLayout path="/SubCategoryList" component={SubCategoryList} />
        <ProtectedLayout
          path="/CreateSubSubCategory"
          component={CreateSubSubCategory}
        />
        <ProtectedLayout
          path="/EditSubSubCategory/:id/:categoryId/:subCategoryId/:name"
          component={EditSubSubCategory}
        />
        <ProtectedLayout
          path="/SubSubCategoryList"
          component={SubSubCategoryList}
        />
        <ProtectedLayout path="/CreateVendor" component={CreateVendor} />
        <ProtectedLayout path="/EditVendor/:id" component={EditVendor} />
        <ProtectedLayout path="/VendorList" component={VendorList} />
        <ProtectedLayout path="/CreateSeller" component={CreateSeller} />
        <ProtectedLayout path="/EditSeller/:id" component={EditSeller} />
        <ProtectedLayout path="/SellerList" component={SellerList} />
        <ProtectedLayout
          path="/CreateHomePageSlider"
          component={CreateHomePageSlider}
        />
        <ProtectedLayout
          path="/EditHomePageSlider/:id"
          component={EditHomePageSlider}
        />
        <ProtectedLayout
          path="/HomePageSliderList"
          component={HomePageSliderList}
        />

        <ProtectedLayout
          path="/EditProduct/:id"
          component={EditProductContainer}
        />

        <ProtectedLayout path="/CreateUnit" component={CreateUnit} />
        <ProtectedLayout
          path="/EditUnit/:id/:name/:activeYn"
          component={EditUnit}
        />
        <ProtectedLayout path="/UnitList" component={UnitList} />
        <ProtectedLayout
          path="/CreateProductImage"
          component={CreateProductImage}
        />
        <ProtectedLayout
          path="/ProductImageList"
          component={ProductImageList}
        />
        <ProtectedLayout
          path="/CreateMeasurementChart"
          component={CreateMeasurementChart}
        />
        <ProtectedLayout path="/CreateInventory" component={CreateInventory} />
        <ProtectedLayout
          path="/CreatePopUpBanner"
          component={CreatePopUpBanner}
        />
        <ProtectedLayout path="/CreateAds" component={CreateAds} />
        <ProtectedLayout path="/AdsList" component={AdsList} />
        <ProtectedLayout path="/EditAds" component={EditAds} />
        <ProtectedLayout path="/PopUpBannerList" component={PopUpBannerList} />
        <ProtectedLayout
          path="/CreateProductSlider"
          component={CreateProductSlider}
        />
        <ProtectedLayout
          path="/ProductSliderList"
          component={ProductSliderList}
        />
        <ProtectedLayout
          path="/MeasurementChartList"
          component={MeasurementChartList}
        />
        <ProtectedLayout
          path="/CreateSecondaryImage"
          component={CreateSecondaryImage}
        />
        <ProtectedLayout
          path="/CreateProductImageByColor"
          component={CreateProductImageByColor}
        />
        <ProtectedLayout
          path="/SecondaryImageList"
          component={SecondaryImageList}
        />
        <ProtectedLayout
          path="/ProductImageByColorList"
          component={ProductImageByColorList}
        />
        <ProtectedLayout path="/InventoryList" component={InventoryList} />
        <ProtectedLayout path="/EditInventory/:id" component={EditInventory} />
        <ProtectedLayout
          path="/PendingOrderList"
          component={PendingOrderList}
        />
        <ProtectedLayout
          path="/ProcessingOrderList"
          component={ProcessingOrderList}
        />
        <ProtectedLayout
          path="/DeliverOrderList"
          component={DeliverOrderList}
        />
        <ProtectedLayout path="/Invoice/:id" component={Invoice} />
        <ProtectedLayout path="/CreateDiscount" component={CreateDiscount} />
        <ProtectedLayout
          path="/CreateDiscountSummary"
          component={CreateDiscountSummary}
        />
        {/* CreateDiscountType called which is in containers/index.js */}
        <ProtectedLayout
          path="/CreateDiscountType"
          component={CreateDiscountType}
        />
        <ProtectedLayout path="/CreatePromotion" component={CreatePromotion} />
        <ProtectedLayout path="/PromotionList" component={PromotionList} />
        <ProtectedLayout path="/EditPromotion" component={EditPromotion} />
        <ProtectedLayout
          path="/ProductCampaignSellerList"
          component={ProductCampaignSellerList}
        />
        <ProtectedLayout path="/InvoicePDF" component={InvoicePDF} />
        <ProtectedLayout path="/CreateVoucher" component={CreateVoucher} />
        <ProtectedLayout path="/EditVoucher" component={EditVoucher} />
        <ProtectedLayout path="/VoucherList" component={VoucherList} />
        <ProtectedLayout
          path="/CreateShippingType"
          component={CreateShippingType}
        />
        <ProtectedLayout
          path="/ShippingTypeList"
          component={ShippingTypeList}
        />
        <ProtectedLayout
          path="/EditShippingType"
          component={EditShoppingType}
        />
        <ProtectedLayout
          path="/CreateCourierProfile"
          component={CreateCourierProfile}
        />
        <ProtectedLayout
          path="/CourierProfileList"
          component={CourierProfileList}
        />
        <ProtectedLayout
          path="/EditCourierProfile"
          component={EditCourierProfile}
        />
        <ProtectedLayout
          path="/CreateCourierProductType"
          component={CreateCourierProductType}
        />
        <ProtectedLayout
          path="/CourierProductTypeList"
          component={CourierProductTypeList}
        />
        <ProtectedLayout
          path="/EditCourierProductType"
          component={EditCourierProductType}
        />
        <ProtectedLayout
          path="/CreateProductShippingCostMapping"
          component={CreateProductShippingCostMapping}
        />
        <ProtectedLayout
          path="/CreateShippingCost"
          component={CreateShippingCost}
        />
        <ProtectedLayout
          path="/CreateShippingOptions"
          component={CreateShippingOptions}
        />
        <ProtectedLayout
          path="/ShippingCostList"
          component={ShippingCostList}
        />
        <ProtectedLayout
          path="/ShippingOptionsList"
          component={ShippingOptionsList}
        />
        <ProtectedLayout
          path="/EditShippingOptions"
          component={EditShippingOptions}
        />
        <ProtectedLayout
          path="/CreateCourierCost"
          component={CreateCourierCost}
        />
        <ProtectedLayout path="/CourierCostList" component={CourierCostList} />
        <ProtectedLayout path="/EditCourierCost" component={EditCourierCost} />
        <ProtectedLayout
          path="/EditProductCampaignSellerList"
          component={EditProductCampaignSellerList}
        />
        <ProtectedLayout
          path="/pendingReturnPolicy"
          component={PendingReturnPolicy}
        />
        <ProtectedLayout
          path="/approvedReturnPolicy"
          component={ApprovedReturnPolicy}
        />
        <ProtectedLayout
          path="/rejectedReturnPolicy"
          component={RejectedReturnPolicy}
        />
        <ProtectedLayout
          path="/editReturnPolicy"
          component={EditReturnPolicy}
        />

        <ProtectedLayout path="/invoiceAdmin" component={SellerInvoiceAll} />
        <ProtectedLayout
          path="/SellerInvoiceAllAdmin"
          component={SellerInvoiceAll}
        />
        <ProtectedLayout
          path="/order-requisition"
          component={OrderRequisition}
        />
        <ProtectedLayout
          path="/print-requisition"
          component={PrintRequisition}
        />
        <ProtectedLayout path="/report" component={report} />
        <ProtectedLayout path="/career" component={Career} />
        <ProtectedLayout path="/career-applicant/:id" component={Applicants} />

        <ProtectedLayout path="/content-type" component={ContentType} />
        <ProtectedLayout path="/content-post" component={ContentPost} />
        <ProtectedLayout
          path="/size-chart-attribute"
          component={SizeChartAttributes}
        />
        <ProtectedLayout
          path="/size-chart-attributes-list"
          component={SizeChartAttributeList}
        />
        <ProtectedLayout
          path="/size-guide-measurement"
          component={SizeGuideMeasurement}
        />
        <ProtectedLayout
          path="/size-guide-measurement-list"
          component={SizeGuideMeasurementList}
        />
        <ProtectedLayout
          path="/size-guide-template-edit/:id"
          component={SizeChartTemplateViewOrUpdate}
        />
        <ProtectedLayout
          path="/multiple_invoice_print"
          component={MultipleInvoicePrint}
        />
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
