/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Loader } from "..";
import BasicInformation from "../../components/product/BasicInformation";
import EditSizeChart from "../../components/product/EditSizeChart";
import PriceAndStock from "../../components/product/PriceAndStock";
import ProductDetails from "../../components/product/ProductDetails";
import ReturnPolicy from "../../components/product/ReturnPolicy";
import ServiceAndDelivery from "../../components/product/ServiceAndDelivery";
import LoadingCard from "../../components/shared/LoadingCard";
import { getActiveBreadcrumbsProductCategoryRecord } from "../../store/actions/activeBreadcrumbsCategoryAction";
import { getBrandRecord } from "../../store/actions/brandAction";
import {
  getProductDetailsRecord,
  updateProductRecord,
  updateProductReset,
} from "../../store/actions/productAction";
import { getShopRecord } from "../../store/actions/shopAction";
import { getUnitRecord } from "../../store/actions/unitAction";
import authenticationService from "../../store/services/authenticationService";

const EditProductContainer = (props) => {
  let { id } = useParams();
  const [currentPage, setCurrentPage] = useState(
    props?.location?.state?.currentPage
  );
  const [itemPerPage, setItemPerPage] = useState(
    props?.location?.state?.itemPerPage
  );
  const [activeTab, setActiveTab] = useState(1);
  const [productId, setProductId] = useState(id);
  const [shopId, setShopId] = useState(null);
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [shopName, setShopName] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [brandName, setBrandName] = useState(null);
  const [unitId, setUnitId] = useState(null);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [unitName, setUnitName] = useState(null);
  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [productVideoUrl, setProductVideoUrl] = useState("");
  const [productStatus, setProductStatus] = useState("Y");
  const [warrantyTypeId, setWarrantyTypeId] = useState(0);
  const [warrantyPeriodId, setWarrantyPeriodId] = useState(0);
  const [warrantyPolicy, setWarrantyPolicy] = useState("");
  const [packageWeight, setPackageWeight] = useState("");
  const [packageLength, setPackageLength] = useState("");
  const [packageWidth, setPackageWidth] = useState("");
  const [packageHeight, setPackageHeight] = useState("");
  const [boxInsideElement, setBoxInsideElement] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [commissionPercentage, setCommissionPercentage] = useState(0);
  const [metaKeywords, setMetaKeywords] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [thumbnailImage2, setThumbnailImage2] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productSpecification, setProductSpecification] = useState("");
  const [isReturnable, setIsReturnable] = useState(false);
  const [returnDuration, setReturnDuration] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [remarks, setRemarks] = useState("");
  const [selectedSizeChart, setSelectedSizeChart] = useState({
    sizeChartId: 91,
    chartName: 'Reg 2 Int 1'
  });
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    let roleId = authenticationService.getRoleId();
    if (roleId !== "1") {
      history.push("/Login");
    }
  }, [dispatch, history]);
  useEffect(() => {
    dispatch(getActiveBreadcrumbsProductCategoryRecord());
    dispatch(getUnitRecord());
    dispatch(getBrandRecord());
    dispatch(getShopRecord());
  }, [dispatch]);
  useEffect(() => {
    dispatch(
      getProductDetailsRecord(
        props?.location?.state?.id,
        props?.location?.state?.currency,
        props?.location?.state?.isApproved
      )
    );
  }, [
    dispatch,
    props.location.state.currency,
    props.location.state.id,
    props.location.state.isApproved,
  ]);
  const { activeBreadcrumbsProductCategories } = useSelector(
    (state) => state?.activeBreadcrumbsCategoryReducer
  );
  const { units } = useSelector((state) => state?.unitReducer);
  const { brands } = useSelector((state) => state?.brandReducer);
  const { shops } = useSelector((state) => state?.shopReducer);
  const productUpdate = useSelector((state) => state?.productReducer);
  const { updating, updatedData, getProductDetails, getDataLoaded } =
    productUpdate;

  useEffect(() => {
    if (updatedData?.data?.message === "success") {
      toast.success("Product Updated Successfully");
      dispatch(updateProductReset());
      setTimeout(() => {
        history.push("/manage-products?status=approved", {
          state: {
            currentPage,
            itemPerPage,
          },
        });
      }, 1000);
    } else if (updatedData?.data?.errors === []) {
      toast.error("Something went wrong, Please try again");
    }
  }, [currentPage, dispatch, history, itemPerPage, updatedData]);

  useEffect(() => {
    let data = getProductDetails?.data;
    setShopId(data?.shopId);
    setShopName(data?.shopName);
    setCategoryId(data?.categoryId);
    setCategoryName(data?.categoryName);
    setBrandId(data?.brandId);
    setBrandName(data?.brandName);
    setBoxInsideElement(data?.boxInsideElement);
    setMaxPrice(data?.maxPrice);
    setMetaKeywords(data?.metaKeywords);
    setPackageHeight(data?.packageHeight);
    setPackageLength(data?.packageLength);
    setPackageWeight(data?.packageWeight);
    setPackageWidth(data?.packageWidth);
    setProductDescription(data?.productDescription);
    setProductDetails(data?.productDetails);
    setProductId(data?.productId);
    setProductName(data?.productName);
    setProductSpecification(data?.productSpecification);
    setProductStatus(data?.productStatus);
    setSku(data?.sku);
    setProductUrl(data?.productUrl);
    setProductVideoUrl(data?.productVideoUrl);
    setThumbnailImage(data?.thumbnailImage);
    setThumbnailImage2(data?.thumbnailImage2);
    setUnitId(data?.unitId);
    setUnitName(data?.unitId === "1" ? "PCS" : "KG");
    setWarrantyPeriodId(data?.warrantyPeriodId);
    setWarrantyPolicy(data?.warrantyPolicy);
    setWarrantyTypeId(data?.warrantyTypeId);
    setIsReturnable(data?.isReturnable === "Y" ? true : false);
    setReturnDuration(data?.returnDuration);
    setReturnPolicy(data?.returnPolicy);
    setRemarks(data?.remarks ? data?.remarks : "");
  }, [getProductDetails]);

  const updateProduct = async (e) => {
    if (productName === "") {
      let msg = "Product Name is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    if (sku === "") {
      let msg = "Product SKU/Style is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    if (categoryId === null) {
      let msg = "Category is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    if (brandId === null) {
      let msg = "Brand is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    if (unitId === "") {
      let msg = "Unit is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    if (maxPrice === "") {
      let msg = "Maximum Price is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    if (boxInsideElement === "") {
      let msg = "Box Inside Element is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    if (metaKeywords === "") {
      let msg = "Meta Keywords is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    if (thumbnailImage === "") {
      let msg = "Product Image is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    if (productDescription === "") {
      let msg = "Product Description is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    if (productSpecification === "") {
      let msg = "Product Specification is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    if (warrantyPolicy === "") {
      let msg = "Warranty Policy is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    if (packageWeight === "") {
      let msg = "Package Weight is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    if (packageLength === "") {
      let msg = "Package Length is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    if (packageWidth === "") {
      let msg = "Package Width is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }
    if (packageHeight === "") {
      let msg = "Package Height is required!!!";
      toast.error(msg);
      setTimeout(() => {}, 3000);
      return;
    }

    const details = [];
    const variants = [];
    const images = [];

    productDetails.forEach((item) => {
      details.push({
        productDetailsId: 0,
        productId: Number(productId),
        shopId: Number(shopId),
        productPrice: Number(item.productPrice),
        baseCurrency: "BDT",
        productQuantity: Number(item.productQuantity),
        sellerProductSku: item.sellerProductSku,
        inventoryTypeId: Number(item.inventoryTypeId),
        shopProductSku: item.shopProductSku,
        productDetailsNote: "PROD DETAILS",
        productDetailsStatus: "Y",
        isAvailable: "Y",
        commissionPercentage: commissionPercentage,
        commissionAmount: Number(
          (item.productPrice * 1 * commissionPercentage) / 100
        ),
      });

      item.productVariants.forEach((item) => {
        variants.push({
          variationWiseProductId: item.variationWiseProductId,
          variantOptionId: item.variantOptionId,
          sellerProductSku: item.sellerProductSku,
          shopProductSku: item.shopProductSku,
          productId: Number(productId),
          shopId: Number(shopId),
          status: item.status,
          productVariantId: item.productVariantId,
          variantOptionText: item.variantOptionText,
          variantName: item.variantName,
        });
      });
      item.productImages.forEach((item) => {
        images.push({
          productImageId: item.productImageId,
          variantId: item.variantId,
          variantOptionId: item.variantOptionId,
          imageUrl: item.imageUrl,
          imageSeoName: item.imageSeoName,
          productImageDetails: item.productImageDetails,
          productId: Number(productId),
          shopId: Number(shopId),
          status: item.status,
          shopProductSku: item.shopProductSku,
        });
      });
    });
    let UpdatedData = {
      productId: productId,
      shopId: shopId,
      baseCurrency: "BDT",
      productName: productName,
      productTitle: productName?.slice(0, 50),
      sku: sku,
      productUrl: productUrl,
      categoryId: categoryId,
      productVideoUrl: productVideoUrl,
      productDescription: productDescription,
      productSpecification: productSpecification,
      boxInsideElement: boxInsideElement,
      brandId: brandId,
      unitId: unitId,
      warrantyTypeId: warrantyTypeId,
      warrantyPeriodId: warrantyPeriodId,
      warrantyPolicy: warrantyPolicy,
      packageWeight: Number(packageWeight),
      packageLength: Number(packageLength),
      packageWidth: Number(packageWidth),
      packageHeight: Number(packageHeight),
      productStatus: productStatus,
      maxPrice: Number(maxPrice),
      metaKeywords: metaKeywords,
      thumbnailImage: thumbnailImage,
      thumbnailImage2: thumbnailImage2,
      remarks: remarks,
      productDetails: details,
      variationWiseProducts: variants,
      productImages: images,
      isReturnable: isReturnable === true ? "Y" : "N",
      returnDuration: Number(isReturnable === true ? returnDuration : 0),
      returnPolicy: isReturnable === true ? returnPolicy : "",
    };
    dispatch(updateProductRecord(UpdatedData));
  };

  const handleCancel = () => {
    history.push("/manage-products?status=approved", {
      state: {
        currentPage,
        itemPerPage,
      },
    });
  };

  const onSizeChartOptionsChange = (e) => {
    setSelectedSizeChart(e.value);
  };

  // console.log('selectedSizeChart:',selectedSizeChart)
  
  return (
    <>
      <div id="wrapper">
        <div className="page-wrapper">
          <div className="container-fluid">
            <>
              <div className="row">
                <div className="col-md-12">
                  <div className="panel panel-info">
                    <div className="white-box">
                      <div className="card">
                        <ul className="nav nav-tabs seller-tabs">
                          <li className="active">
                            <Link to="/createProductAdmin">Create Product</Link>
                          </li>
                          <li>
                            <Link to="/manage-products?status=pending">
                              Pending Product
                            </Link>
                          </li>
                          <li>
                            <Link to="/manage-products?status=approved">
                              Approved Product
                            </Link>
                          </li>
                          <li>
                            <Link to="/manage-products?status=rejected">
                              Rejected Product
                            </Link>
                          </li>
                        </ul>

                        <div
                          className="panel-wrapper collapse in"
                          aria-expanded="true"
                        >
                          <div className="panel-body crate_new_product">
                            <div>
                              <div className="form-body">
                                <h3 className="box-title add-product-title">
                                  Edit Product
                                </h3>
                                <ul className="nav nav-tabs">
                                  <li
                                    onClick={() => setActiveTab(1)}
                                    className={
                                      activeTab === 1
                                        ? `edit_tab__active`
                                        : `edit_tab`
                                    }
                                  >
                                    Basic Information
                                  </li>
                                  <li
                                    onClick={() => setActiveTab(2)}
                                    className={
                                      activeTab === 2
                                        ? `edit_tab__active`
                                        : `edit_tab`
                                    }
                                  >
                                    Product Details
                                  </li>
                                  <li
                                    onClick={() => setActiveTab(3)}
                                    className={
                                      activeTab === 3
                                        ? `edit_tab__active`
                                        : `edit_tab`
                                    }
                                  >
                                    Price & Stock
                                  </li>
                                  <li
                                    onClick={() => setActiveTab(4)}
                                    className={
                                      activeTab === 4
                                        ? `edit_tab__active`
                                        : `edit_tab`
                                    }
                                  >
                                    Service & Delivery
                                  </li>
                                  <li
                                    onClick={() => setActiveTab(5)}
                                    className={
                                      activeTab === 5
                                        ? `edit_tab__active`
                                        : `edit_tab`
                                    }
                                  >
                                    Return Policy
                                  </li>
                                  {/* <li
                                    onClick={() => setActiveTab(6)}
                                    className={
                                      activeTab === 6
                                        ? `edit_tab__active`
                                        : `edit_tab`
                                    }
                                  >
                                    Size Chart
                                  </li> */}
                                </ul>

                                {!getDataLoaded ? (
                                  <LoadingCard count={1} />
                                ) : (
                                  <div className="tab-content">
                                    {activeTab === 1 && (
                                      <BasicInformation
                                        accType='Admin'
                                        shops={shops}
                                        shopName={shopName}
                                        selectedShopId={selectedShopId}
                                        setSelectedShopId={setSelectedShopId}
                                        setShopId={setShopId}
                                        setShopName={setShopName}
                                        productName={productName}
                                        setProductName={setProductName}
                                        sku={sku}
                                        setSku={setSku}
                                        activeBreadcrumbsProductCategories={
                                          activeBreadcrumbsProductCategories
                                        }
                                        categoryName={categoryName}
                                        selectedCategoryId={selectedCategoryId}
                                        setSelectedCategoryId={
                                          setSelectedCategoryId
                                        }
                                        setCategoryId={setCategoryId}
                                        brands={brands}
                                        brandName={brandName}
                                        selectedBrandId={selectedBrandId}
                                        setSelectedBrandId={setSelectedBrandId}
                                        setBrandId={setBrandId}
                                        units={units}
                                        unitName={unitName}
                                        selectedUnitId={selectedUnitId}
                                        setSelectedUnitId={setSelectedUnitId}
                                        setUnitId={setUnitId}
                                        maxPrice={maxPrice}
                                        setMaxPrice={setMaxPrice}
                                        boxInsideElement={boxInsideElement}
                                        setBoxInsideElement={
                                          setBoxInsideElement
                                        }
                                        metaKeywords={metaKeywords}
                                        setMetaKeywords={setMetaKeywords}
                                        productVideoUrl={productVideoUrl}
                                        setProductVideoUrl={setProductVideoUrl}
                                        thumbnailImage={thumbnailImage}
                                        setThumbnailImage={setThumbnailImage}
                                        thumbnailImage2={thumbnailImage2}
                                        setThumbnailImage2={setThumbnailImage2}
                                      />
                                    )}

                                    {activeTab === 2 && (
                                      <ProductDetails
                                        productDescription={productDescription}
                                        setProductDescription={
                                          setProductDescription
                                        }
                                        productSpecification={
                                          productSpecification
                                        }
                                        setProductSpecification={
                                          setProductSpecification
                                        }
                                      />
                                    )}
                                    {activeTab === 3 && (
                                      <PriceAndStock
                                        productDetails={productDetails}
                                        setProductDetails={setProductDetails}
                                      />
                                    )}
                                    {activeTab === 4 && (
                                      <ServiceAndDelivery
                                        warrantyTypeId={warrantyTypeId}
                                        setWarrantyTypeId={setWarrantyTypeId}
                                        warrantyPeriodId={warrantyPeriodId}
                                        setWarrantyPeriodId={
                                          setWarrantyPeriodId
                                        }
                                        warrantyPolicy={warrantyPolicy}
                                        setWarrantyPolicy={setWarrantyPolicy}
                                        packageWeight={packageWeight}
                                        setPackageWeight={setPackageWeight}
                                        packageLength={packageLength}
                                        setPackageLength={setPackageLength}
                                        packageWidth={packageWidth}
                                        setPackageWidth={setPackageWidth}
                                        packageHeight={packageHeight}
                                        setPackageHeight={setPackageHeight}
                                      />
                                    )}
                                    {activeTab === 5 && (
                                      <ReturnPolicy
                                        isReturnable={isReturnable}
                                        setIsReturnable={setIsReturnable}
                                        returnDuration={returnDuration}
                                        setReturnDuration={setReturnDuration}
                                        returnPolicy={returnPolicy}
                                        setReturnPolicy={setReturnPolicy}
                                      />
                                    )}
                                    {/* {activeTab === 6 && (
                                      <EditSizeChart 
                                      selectedSizeChart={selectedSizeChart}
                                      onSizeChartOptionsChange={
                                        onSizeChartOptionsChange
                                      }
                                      shopId={shopId}
                                  categoryId={categoryId}
                                      />
                                    )} */}
                                  </div>
                                )}

                                {/* SUBMIT BUTTON Start*/}
                                <div className="form-actions m-t-30 fixed-footer">
                                  {updating === false ? (
                                    <>
                                      <button
                                        type="submit"
                                        className="btn btn-success"
                                        onClick={() => updateProduct()}
                                      >
                                        <i className="fa fa-check"></i> Update
                                      </button>
                                      <button
                                        onClick={() => handleCancel()}
                                        className="btn btn-default"
                                        style={{ cursor: "pointer" }}
                                      >
                                        Cancel
                                      </button>
                                    </>
                                  ) : (
                                    <div style={{ textAlign: "center" }}>
                                      <Loader />
                                    </div>
                                  )}
                                </div>
                                {/* SUBMIT BUTTON End*/}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default EditProductContainer;
