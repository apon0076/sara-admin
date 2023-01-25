import "primeicons/primeicons.css";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { CKEditor } from "../../../node_modules/@ckeditor/ckeditor5-react";
import "../../../node_modules/primeflex/primeflex.css";
import "../../../node_modules/primereact/resources/primereact.css";
import "../../../node_modules/primereact/resources/themes/saga-blue/theme.css";
import { Loader } from "../../containers";
import baseUrl from "../../utils/baseUrl";
import BackTop from "../BackTop/BackTop";
import LoadingCard from "../shared/LoadingCard";
import ClassicEditor from "./../../../node_modules/@ckeditor/ckeditor5-build-classic";
import PriceAndStock_v2 from "./PriceAndStock_v2";

const EditProduct = (props) => {
  const [productDescription, setProductDescription] = useState();
  const [productSpecification, setProductSpecification] = useState();
  const history = useHistory();
  var productDetailss = props?.productDetailss?.productDetails;
  useEffect(() => {
    setProductDescription(props.productDescription);
  }, [props.productDescription]);
  useEffect(() => {
    setProductSpecification(props.productSpecification);
  }, [props.productSpecification]);
  const handleCancel = () => {
    history.push("/manage-products?status=approved", {
      state: {
        currentPage: props.currentPage,
        itemPerPage: props.itemPerPage,
      },
    });
  };
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        {props.loading ? (
          <LoadingCard count={1} />
        ) : (
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
                              <li className="active">
                                <a data-toggle="tab" href="#BasicInformation">
                                  Basic Information
                                </a>
                              </li>
                              <li>
                                <a
                                  data-toggle="tab"
                                  href="#ProductDescriptions"
                                >
                                  Product Details
                                </a>
                              </li>
                              <li>
                                <a data-toggle="tab" href="#PRICEANDSTOCK">
                                  Price & Stock
                                </a>
                              </li>
                              <li>
                                <a data-toggle="tab" href="#SERVICEANDDELIVERY">
                                  Service & Delivery
                                </a>
                              </li>
                              <li>
                                <a data-toggle="tab" href="#RETURNPOLICY">
                                  Return Policy
                                </a>
                              </li>
                            </ul>
                            
                            <div className="tab-content">
                              {/* BasicInformation */}
                              <div
                                id="BasicInformation"
                                // className="tab-pane fade in"
                                className="tab-pane fade in active"
                              >
                                <div className="row">
                                  <div className="col-md-12 col-sm-12">
                                    <div className="form-group">
                                      <label className="control_label">
                                        Shop Name{" "}
                                        <span
                                          aria-hidden="true"
                                          style={{
                                            color: "red",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          *
                                        </span>
                                      </label>
                                      <div className="dropdown-demo">
                                        <Dropdown
                                          optionLabel="shopName"
                                          options={props.shops}
                                          placeholder={
                                            props.shopName
                                          }
                                          className="form-control"
                                          name="shopName"
                                          value={props.shopName}
                                          onChange={
                                            props.handleChange
                                          }
                                          disabled
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                      <label className="control_label">
                                        Product Name{" "}
                                        <span
                                          aria-hidden="true"
                                          style={{
                                            color: "red",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          *
                                        </span>
                                      </label>
                                      <input
                                        type="text"
                                        id="productName"
                                        className={
                                          props.errorProductName?.length !== 0
                                            ? "errorClass form-control"
                                            : "form-control" && "form-control"
                                        }
                                        placeholder="Enter Product Name"
                                        name="productName"
                                        value={props.productName}
                                        onChange={props.handleChange}
                                      />

                                      <span className="text-danger">
                                        {props.errorProductName}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                      <label className="control_label">
                                        Product Style / SKU{" "}
                                        <span
                                          aria-hidden="true"
                                          style={{
                                            color: "red",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          *
                                        </span>
                                      </label>
                                      <input
                                        type="text"
                                        id="sku"
                                        className={
                                          props.errorSku.length !== 0
                                            ? "errorClass form-control"
                                            : "form-control" && "form-control"
                                        }
                                        placeholder="Enter Product Style / SKU"
                                        name="sku"
                                        value={props.sku}
                                        onChange={props.handleChange}
                                      />
                                      <span className="text-danger">
                                        {props.errorSku}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                      <label className="control_label">
                                        Category{" "}
                                        <span
                                          aria-hidden="true"
                                          style={{
                                            color: "red",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          *
                                        </span>
                                      </label>
                                      <div className="dropdown-demo">
                                        <Dropdown
                                          optionLabel="breadcrumbCategory"
                                          options={
                                            props.activeBreadcrumbsProductCategories
                                          }
                                          filter
                                          showClear
                                          filterBy="breadcrumbCategory"
                                          placeholder={
                                            props.categoryName
                                              ? props.categoryName
                                              : "Select Category"
                                          }
                                          className="form-control"
                                          name="parentCategoryId"
                                          value={props.parentCategoryId}
                                          onChange={props.handleChange}
                                          disabled
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                      <label className="control_label">
                                        Brand{" "}
                                        <span
                                          aria-hidden="true"
                                          style={{
                                            color: "red",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          *
                                        </span>
                                      </label>
                                      <div className="dropdown-demo">
                                        <Dropdown
                                          optionLabel="brandName"
                                          options={props.brands}
                                          filter
                                          showClear
                                          filterBy="brandName"
                                          placeholder={
                                            props.brandName
                                              ? props.brandName
                                              : "Select Brand"
                                          }
                                          className={
                                            props.errorBrandName.length !== 0
                                              ? "errorClass form-control"
                                              : "form-control" && "form-control"
                                          }
                                          name="selectedBrandId"
                                          value={props.selectedBrandId}
                                          onChange={props.handleChange}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                      <label className="control_label">
                                        Product Quantity Unit{" "}
                                        <span
                                          aria-hidden="true"
                                          style={{
                                            color: "red",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          *
                                        </span>
                                      </label>
                                      <div className="dropdown-demo">
                                        <Dropdown
                                          optionLabel="unitName"
                                          options={props.units}
                                          filter
                                          showClear
                                          filterBy="unitName"
                                          placeholder={
                                            props.unitName
                                              ? props.unitName
                                              : "Select Unit"
                                          }
                                          className={
                                            props.errorUnitName.length !== 0
                                              ? "errorClass form-control"
                                              : "form-control" && "form-control"
                                          }
                                          name="selectedUnitId"
                                          value={props.selectedUnitId}
                                          onChange={props.handleChange}
                                          disabled
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                      <label className="control_label">
                                        Maximum Price{" "}
                                        <span
                                          aria-hidden="true"
                                          style={{
                                            color: "red",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          *
                                        </span>
                                      </label>
                                      <input
                                        type="number"
                                        id="maxPrice"
                                        className={
                                          props.errorMaxPrice.length !== 0
                                            ? "errorClass form-control"
                                            : "form-control" && "form-control"
                                        }
                                        placeholder="Enter Maximum Price"
                                        name="maxPrice"
                                        value={props.maxPrice}
                                        onChange={props.handleChange}
                                      />
                                      <span className="text-danger">
                                        {props.errorMaxPrice}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                      <label className="control_label">
                                        What's in the box?{" "}
                                        <span
                                          aria-hidden="true"
                                          style={{
                                            color: "red",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          *
                                        </span>
                                      </label>
                                      <input
                                        type="text"
                                        id="boxInsideElement"
                                        className={
                                          props.errorBoxInsideElement.length !==
                                          0
                                            ? "errorClass form-control"
                                            : "form-control" && "form-control"
                                        }
                                        placeholder="Enter What's in the box"
                                        name="boxInsideElement"
                                        value={props.boxInsideElement}
                                        onChange={props.handleChange}
                                      />
                                      <span className="text-danger">
                                        {props.errorBoxInsideElement}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-sm-12">
                                    <div className="form-group">
                                      <label className="control_label">
                                        Meta Keywords{" "}
                                        <span
                                          aria-hidden="true"
                                          style={{
                                            color: "red",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          *
                                        </span>
                                      </label>
                                      <input
                                        type="text"
                                        id="metaKeywords"
                                        className={
                                          props.errorMetaKeywords.length !== 0
                                            ? "errorClass form-control"
                                            : "form-control" && "form-control"
                                        }
                                        placeholder="Enter Meta Keywords"
                                        name="metaKeywords"
                                        value={props.metaKeywords}
                                        onChange={props.handleChange}
                                      />
                                      <span className="text-danger">
                                        {props.errorMetaKeywords}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-12 col-sm-12">
                                    <div className="form-group">
                                      <label className="control_label">
                                        Video URL{" "}
                                      </label>
                                      <input
                                        type="text"
                                        id="productVideoUrl"
                                        className={
                                          props.errorProductVideoUrl.length !==
                                          0
                                            ? "errorClass form-control"
                                            : "form-control" && "form-control"
                                        }
                                        placeholder="Enter Video URL"
                                        name="productVideoUrl"
                                        value={props.productVideoUrl}
                                        onChange={props.handleChange}
                                      />
                                      <span className="text-danger">
                                        {props.errorProductVideoUrl}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-md-6 col-sm-12">
                                    <div className="row">
                                      <div className="col-md-8">
                                        <div className="form-group">
                                          <label className="control_label">
                                            Product Image{" "}
                                            <span
                                              aria-hidden="true"
                                              style={{
                                                color: "red",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              *
                                            </span>
                                          </label>
                                          <div className="input-file-container file-area">
                                            <input
                                              type="file"
                                              accept="image/*"
                                              name="thumbnailImage"
                                              id="my-file"
                                              onChange={
                                                props.fileSelectedHandlerThumbnailImage
                                              }
                                            />
                                            <div
                                              className="file-dummy"
                                              style={{
                                                padding: "20px",
                                                width: "230px",
                                                height: "80px",
                                              }}
                                            >
                                              <div className="success">
                                                Select Product Image
                                              </div>
                                            </div>
                                            <span
                                              style={{
                                                fontSize: "12px",
                                                color: "#db1b1b",
                                              }}
                                            >
                                              *Image size must be within 300Kb
                                              and only 1:1 Ratio Allowed.
                                            </span>{" "}
                                            <br />
                                            <span
                                              style={{
                                                fontSize: "12px",
                                                color: "#db1b1b",
                                              }}
                                            >
                                              *Image resolution must be
                                              (500x500)px to (1000x1000)px.
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        {props.showFile ? (
                                          <img
                                            src={props.showFile}
                                            className="thumb-md product-image"
                                            style={{
                                              marginTop: "30px",
                                              width: "120px",
                                              height: "120px",
                                              objectFit: "contain",
                                            }}
                                          />
                                        ) : props.thumbnailImage ? (
                                          <img
                                            src={baseUrl.concat(
                                              props.thumbnailImage
                                            )}
                                            className="thumb-md product-image"
                                            style={{
                                              marginTop: "30px",
                                              width: "120px",
                                              height: "120px",
                                              objectFit: "contain",
                                            }}
                                          />
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 col-sm-12">
                                    <div className="row">
                                      <div className="col-md-8">
                                        <div className="form-group">
                                          <label className="control_label">
                                            Product Zoom Image (Optional)
                                          </label>
                                          <div className="input-file-container file-area">
                                            <input
                                              type="file"
                                              accept="image/*"
                                              name="thumbnailImage2"
                                              id="my-file"
                                              onChange={
                                                props.fileSelectedHandlerThumbnailImage2
                                              }
                                            />
                                            <div
                                              className="file-dummy"
                                              style={{
                                                padding: "20px",
                                                width: "230px",
                                                height: "80px",
                                              }}
                                            >
                                              <div className="success">
                                                Select Product Zoom Image
                                              </div>
                                            </div>
                                            <span
                                              style={{
                                                fontSize: "12px",
                                                color: "#db1b1b",
                                              }}
                                            >
                                              *Image size must be within 300Kb
                                              and only 1:1 Ratio Allowed.
                                            </span>{" "}
                                            <br />
                                            <span
                                              style={{
                                                fontSize: "12px",
                                                color: "#db1b1b",
                                              }}
                                            >
                                              *Image resolution must be
                                              (500x500)px to (1000x1000)px.
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        {props.showFile2 ? (
                                          <img
                                            src={props.showFile2}
                                            className="thumb-md product-image"
                                            style={{
                                              marginTop: "30px",
                                              width: "120px",
                                              height: "120px",
                                              objectFit: "contain",
                                            }}
                                          />
                                        ) : props.thumbnailImage2 ? (
                                          <img
                                            src={baseUrl.concat(
                                              props.thumbnailImage2
                                            )}
                                            className="thumb-md product-image"
                                            style={{
                                              marginTop: "30px",
                                              width: "120px",
                                              height: "120px",
                                              objectFit: "contain",
                                            }}
                                          />
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* BasicInformation */}

                              {/* //Product Description Start// */}
                              <div
                                id="ProductDescriptions"
                                className="tab-pane fade"
                              >
                                <h3 className="box-title m-t-20">
                                  Product Description{" "}
                                  <span
                                    aria-hidden="true"
                                    style={{
                                      color: "red",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    *
                                  </span>
                                </h3>

                                <div className="row" style={{ display: "" }}>
                                  <div className="col-md-12 ">
                                    <div className="form-group">
                                      <div
                                        className={
                                          props.errorProductDescription
                                            .length !== 0
                                            ? "errorClass editor"
                                            : "editor"
                                        }
                                      >
                                        <CKEditor
                                          editor={ClassicEditor}
                                          data={productDescription}
                                          onChange={
                                            props.productDescriptionChange
                                          }
                                          className={
                                            props?.productDescription
                                              ?.length !== 0
                                              ? "errorClass form-control"
                                              : "form-control" && "form-control"
                                          }
                                        />
                                      </div>
                                      <span className="text-danger">
                                        {props.errorProductDescription}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* //Product Specification // */}
                                <h3 className="box-title m-t-20">
                                  Product Specification{" "}
                                  <span
                                    aria-hidden="true"
                                    style={{
                                      color: "red",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    *
                                  </span>
                                </h3>
                                <div className="row" style={{ display: "" }}>
                                  <div className="col-md-12 ">
                                    <div className="form-group">
                                      <div
                                        className={
                                          props.errorProductSpecification
                                            .length !== 0
                                            ? "errorClass editor"
                                            : "editor"
                                        }
                                      >
                                        <CKEditor
                                          editor={ClassicEditor}
                                          data={productSpecification}
                                          onChange={
                                            props.productSpecificationChange
                                          }
                                        />
                                      </div>
                                      <span className="text-danger">
                                        {props.errorProductSpecification}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* //Product Description End// */}

                              {/* //Price And Stock start// */}
                              <div id="PRICEANDSTOCK" className="tab-pane fade">
                                {/* <PriceAndStock
                                  productDetailss={productDetailss}
                                  props={props}
                                /> */}
                                <PriceAndStock_v2
                                  productDetailss={productDetailss}
                                  props={props}
                                />
                              </div>
                              {/* Price And Stock End */}

                              {/* // Return Policy Start// */}
                              <div
                                id="SERVICEANDDELIVERY"
                                className="tab-pane fade"
                              >
                                <div className="service_and_delivery">
                                  <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                      <div className="form-group">
                                        <label className="control_label">
                                          Warranty Type{" "}
                                          <span
                                            aria-hidden="true"
                                            style={{
                                              color: "red",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            *
                                          </span>
                                        </label>
                                        <select
                                          className="form-control"
                                          data-placeholder="Select"
                                          tabIndex="1"
                                          name="warrantyTypeId"
                                          onChange={props.handleChange}
                                          value={props.warrantyTypeId?.toString()}
                                        >
                                          <option key="0" value="0">
                                            No Warrenty
                                          </option>
                                          <option key="1" value="1">
                                            Local Seller Warrenty
                                          </option>
                                          <option key="2" value="2">
                                            Non-local Warrenty
                                          </option>
                                          <option key="3" value="3">
                                            International Seller Warrenty
                                          </option>
                                          <option key="4" value="4">
                                            International Manufacturer Warrenty
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                      <div className="form-group">
                                        <label className="control_label">
                                          Warranty Period{" "}
                                          <span
                                            aria-hidden="true"
                                            style={{
                                              color: "red",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            *
                                          </span>
                                        </label>
                                        <select
                                          className="form-control"
                                          data-placeholder="Select"
                                          tabIndex="1"
                                          name="warrantyPeriodId"
                                          onChange={props.handleChange}
                                          value={props.warrantyPeriodId?.toString()}
                                        >
                                          <option key="0" value="0">
                                            No Warrrenty
                                          </option>
                                          <option key="1" value="1">
                                            1 Month
                                          </option>
                                          <option key="2" value="2">
                                            2 Month
                                          </option>
                                          <option key="3" value="3">
                                            3 Month
                                          </option>
                                          <option key="4" value="4">
                                            4 Month
                                          </option>
                                          <option key="5" value="5">
                                            5 Month
                                          </option>
                                          <option key="6" value="6">
                                            6 Month
                                          </option>
                                          <option key="12" value="12">
                                            12 Month
                                          </option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                      <div className="form-group">
                                        <label className="control_label">
                                          Warranty Policy{" "}
                                          <span
                                            aria-hidden="true"
                                            style={{
                                              color: "red",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            *
                                          </span>
                                        </label>
                                        <input
                                          type="text"
                                          id="warrantyPolicy"
                                          className={
                                            props.errorWarrantyPolicy.length !==
                                            0
                                              ? "errorClass form-control"
                                              : "form-control" && "form-control"
                                          }
                                          placeholder="Warranty Policy"
                                          name="warrantyPolicy"
                                          value={props.warrantyPolicy}
                                          onChange={props.handleChange}
                                        />
                                        <span className="text-danger">
                                          {props.errorWarrantyPolicy}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                      <div className="form-group">
                                        <label className="control_label">
                                          Package Weight (KG){" "}
                                          <span
                                            aria-hidden="true"
                                            style={{
                                              color: "red",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            *
                                          </span>
                                        </label>
                                        <input
                                          type="number"
                                          id="packageWeight"
                                          className={
                                            props.errorPackageWeight.length !==
                                            0
                                              ? "errorClass form-control"
                                              : "form-control" && "form-control"
                                          }
                                          value={props.packageWeight}
                                          placeholder="Package Weight"
                                          name="packageWeight"
                                          onChange={props.handleChange}
                                        />
                                        <span className="text-danger">
                                          {props.errorPackageWeight}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-md-12 col-sm-12">
                                      <div className="form-group">
                                        <label className="control_label">
                                          Package Dimensions (cm){" "}
                                          <span
                                            aria-hidden="true"
                                            style={{
                                              color: "red",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            *
                                          </span>
                                        </label>
                                        <div className="row">
                                          <div className="col-sm-4">
                                            <label className="control_label">
                                              Length (cm){" "}
                                              <span
                                                aria-hidden="true"
                                                style={{
                                                  color: "red",
                                                  fontSize: "5",
                                                }}
                                              >
                                                *
                                              </span>
                                            </label>
                                            <input
                                              type="number"
                                              id="packageLength"
                                              className={
                                                props.errorPackageLength
                                                  .length !== 0
                                                  ? "errorClass form-control"
                                                  : "form-control" &&
                                                    "form-control"
                                              }
                                              placeholder="Length (cm)"
                                              name="packageLength"
                                              value={props.packageLength}
                                              onChange={props.handleChange}
                                            />
                                            <span className="text-danger">
                                              {props.errorPackageLength}
                                            </span>
                                          </div>
                                          <div className="col-sm-4">
                                            <label className="control_label">
                                              Width (cm){" "}
                                              <span
                                                aria-hidden="true"
                                                style={{
                                                  color: "red",
                                                  fontSize: "5",
                                                }}
                                              >
                                                *
                                              </span>
                                            </label>
                                            <input
                                              type="number"
                                              id="packageWidth"
                                              className={
                                                props.errorPackageWidth
                                                  .length !== 0
                                                  ? "errorClass form-control"
                                                  : "form-control" &&
                                                    "form-control"
                                              }
                                              placeholder="Width (cm)"
                                              name="packageWidth"
                                              value={props.packageWidth}
                                              onChange={props.handleChange}
                                            />
                                            <span className="text-danger">
                                              {props.errorPackageWidth}
                                            </span>
                                          </div>
                                          <div className="col-sm-4">
                                            <label className="control_label">
                                              Heigth (cm){" "}
                                              <span
                                                aria-hidden="true"
                                                style={{
                                                  color: "red",
                                                  fontSize: "5",
                                                }}
                                              >
                                                *
                                              </span>
                                            </label>
                                            <input
                                              type="number"
                                              id="packageHeight"
                                              className={
                                                props.errorPackageHeight
                                                  .length !== 0
                                                  ? "errorClass form-control"
                                                  : "form-control" &&
                                                    "form-control"
                                              }
                                              placeholder="Height (cm)"
                                              name="packageHeight"
                                              value={props.packageHeight}
                                              onChange={props.handleChange}
                                            />
                                            <span className="text-danger">
                                              {props.errorPackageHeight}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <hr />
                              </div>
                              {/* //Return Policy End// */}

                              {/* Returnable Start*/}
                              {
                                <div
                                  id="RETURNPOLICY"
                                  className="tab-pane fade"
                                >
                                  <div className="row">
                                    <div className="col-md-3 col-sm-12">
                                      <div className="form-group">
                                        <label className="control_label">
                                          Is Returnable ?{" "}
                                        </label>
                                        <div className="checkbox checkbox-success">
                                          <input
                                            id="isReturnable"
                                            type="checkbox"
                                            name="isReturnable"
                                            checked={props.isReturnable}
                                            onChange={props.handleIsReturnable}
                                          />
                                          <label htmlFor="isReturnable">
                                            {" "}
                                            &nbsp;Yes
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                    {props.isReturnable && (
                                      <div className="col-md-4 col-sm-12">
                                        <div className="form-group">
                                          <label className="control_label">
                                            Return Duration (Days){" "}
                                            <span
                                              aria-hidden="true"
                                              style={{
                                                color: "red",
                                                fontWeight: "bold",
                                              }}
                                            >
                                              *
                                            </span>
                                          </label>
                                          <input
                                            type="number"
                                            className={"form-control"}
                                            placeholder="Enter Return Duration (Days)"
                                            name="returnDuration"
                                            value={props.returnDuration || 0}
                                            onChange={props.handleChange}
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {props.isReturnable && (
                                    <>
                                      <div className="row">
                                        <div className="col-md-10 col-sm-12">
                                          <div className="form-group">
                                            <label className="control_label">
                                              Return Poilcy Description{" "}
                                              <span
                                                aria-hidden="true"
                                                style={{
                                                  color: "red",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                *
                                              </span>
                                            </label>
                                            <CKEditor
                                              editor={ClassicEditor}
                                              data={props.returnPolicy || ""}
                                              onChange={
                                                props.handleReturnPolicyChange
                                              }
                                              className={"form-control"}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              }
                              {/* Returnable End*/}
                            </div>

                            {/* SUBMIT BUTTON Start*/}
                            <div className="form-actions m-t-30 fixed-footer">
                              {props?.updating === false ? (
                                <>
                                  <button
                                    type="submit"
                                    className="btn btn-success"
                                    onClick={props.updateProduct}
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
        )}
      </div>
      <BackTop />
    </div>
  );
};
export default EditProduct;
