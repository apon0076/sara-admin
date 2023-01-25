import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "primeicons/primeicons.css";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "../../../node_modules/primeflex/primeflex.css";
import "../../../node_modules/primereact/resources/primereact.css";
import "../../../node_modules/primereact/resources/themes/saga-blue/theme.css";
import { Loader } from "../../containers";
import { checkDuplicateProductsRecord } from "../../store/actions/productAction";
import baseUrl from "../../utils/baseUrl";
import BackTop from "../BackTop/BackTop";
import CreateProductAttribute from "./CreateProductAttribute";
import CreateProductVariantTable from "./CreateProductVariantTable";
import SizeChart from "./SizeChart";

const CreateProductAdmin = (props) => {
  const animatedComponents = makeAnimated();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [productSku, setProductSku] = useState("");
  const [checkDuplicateProduct, setCheckDuplicateProduct] = useState(null);
  const [variantUpdated, setVariantUpdated] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setProductSku(checkDuplicateProduct);
    if (checkDuplicateProduct !== null) {
      dispatch(checkDuplicateProductsRecord(checkDuplicateProduct));
    }
  }, [checkDuplicateProduct, dispatch]);

  const duplicate_SKU_Entry = useSelector(
    (state) => state.productReducer.checkDuplicateSKU
  );
  let price_validation_count = 0;
  let qty_validation_count = 0;
  for (var i = 0; i < variantUpdated?.length; i++) {
    if (variantUpdated[i]?.productPrice < 1) {
      price_validation_count = price_validation_count + 1;
    }
    if (variantUpdated[i]?.productQuantity < 1) {
      qty_validation_count = qty_validation_count + 1;
    }
  }
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-info">
              <div className="white-box">
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
              </div>
              <div className="panel-wrapper collapse in" aria-expanded="true">
                <div className="panel-body">
                  <form className="form-horizontal">
                    <div className="form-body">
                      <div className="row">
                        <div className="col-md-12 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
                              Select Shop Name{" "}
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
                                filter
                                showClear
                                filterBy="shopName"
                                placeholder="Select Shop"
                                className={
                                  props.errorShopName.length !== 0
                                    ? "errorClass form-control"
                                    : "form-control" && "form-control"
                                }
                                name="shopName"
                                value={props.shopName}
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
                                props.errorProductName.length !== 0
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
                              Product Category{" "}
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
                                placeholder="Select Product Category"
                                className={
                                  props.errorCategoryVarient.length !== 0
                                    ? "errorClass form-control"
                                    : "form-control" && "form-control"
                                }
                                name="parentCategoryId"
                                value={props.parentCategoryId}
                                onChange={props.handleChange}
                              />
                              <span className="text-danger">
                                {props.errorCategoryVarient}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
                              Product Brand{" "}
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
                                placeholder="Select Brand"
                                className={
                                  props.errorBrandName.length !== 0
                                    ? "errorClass form-control"
                                    : "form-control" && "form-control"
                                }
                                name="brandName"
                                value={props.brandName}
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
                                placeholder="Select Product Quantity Unit"
                                className={
                                  props.errorUnitName.length !== 0
                                    ? "errorClass form-control"
                                    : "form-control" && "form-control"
                                }
                                name="unitName"
                                value={props.unitName}
                                onChange={props.handleChange}
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
                              placeholder="Enter Maximum Price for Product"
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
                                props.errorBoxInsideElement.length !== 0
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
                            <label className="control_label">Video URL </label>
                            <input
                              type="text"
                              id="productVideoUrl"
                              className={
                                props.errorProductVideoUrl.length !== 0
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
                            <div className="col-md-6">
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
                                      width: "300px",
                                      height: "80px",
                                    }}
                                  >
                                    <div className="success">
                                      Please Upload Product Image
                                    </div>
                                  </div>
                                  <span
                                    style={{
                                      fontSize: "12px",
                                      color: "#db1b1b",
                                    }}
                                  >
                                    *Image size must be within 300Kb and only
                                    1:1 Ratio Allowed.
                                  </span>{" "}
                                  <br />
                                  <span
                                    style={{
                                      fontSize: "12px",
                                      color: "#db1b1b",
                                    }}
                                  >
                                    *Image resolution must be (500x500)px to
                                    (1000x1000)px.
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              {props.showFile ? (
                                <img
                                  alt="product"
                                  src={props.showFile}
                                  style={{
                                    marginTop: "25px",
                                    width: 100,
                                    height: 100,
                                  }}
                                />
                              ) : (
                                <img
                                  src={baseUrl.concat(props.thumbnailImage)}
                                  alt="blank"
                                  style={{
                                    marginTop: "25px",
                                    width: 100,
                                    height: 100,
                                    display: "none",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="row">
                            <div className="col-md-6">
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
                                      width: "300px",
                                      height: "80px",
                                    }}
                                  >
                                    <div className="success">
                                      Please Upload Product Zoom Image
                                    </div>
                                  </div>
                                  <span
                                    style={{
                                      fontSize: "12px",
                                      color: "#db1b1b",
                                    }}
                                  >
                                    *Image size must be within 300Kb and only
                                    1:1 Ratio Allowed.
                                  </span>{" "}
                                  <br />
                                  <span
                                    style={{
                                      fontSize: "12px",
                                      color: "#db1b1b",
                                    }}
                                  >
                                    *Image resolution must be (500x500)px to
                                    (1000x1000)px.
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              {props.showFile2 ? (
                                <img
                                  alt="zoom"
                                  src={props.showFile2}
                                  style={{
                                    marginTop: "25px",
                                    width: 100,
                                    height: 100,
                                  }}
                                />
                              ) : (
                                <img
                                  src={baseUrl.concat(props.thumbnailImage2)}
                                  alt="blank"
                                  style={{
                                    marginTop: "25px",
                                    width: 100,
                                    height: 100,
                                    display: "none",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-md-6 col-sm-12"
                          style={{ display: "none" }}
                        >
                          <div className="form-group">
                            <label className="control_label">
                              Product Status
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
                            <div className="checkbox checkbox-success">
                              <input
                                name="isActive"
                                id="acceptTerms"
                                type="checkbox"
                                defaultChecked="true"
                                style={{ border: "1px solid #6c7273" }}
                              />
                              <label className="col-md-12" htmlFor="Available">
                                &nbsp;Is Available?
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
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
                            </label>
                            <div
                              className={
                                props.errorProductDescription.length !== 0
                                  ? "errorClass editor"
                                  : "editor"
                              }
                            >
                              <CKEditor
                                editor={ClassicEditor}
                                data={props.productDescription}
                                onChange={props.productDescriptionChange}
                                className={
                                  props.productDescription.length !== 0
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
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
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
                            </label>
                            <div
                              className={
                                props.errorProductSpecification.length !== 0
                                  ? "errorClass editor"
                                  : "editor"
                              }
                            >
                              <CKEditor
                                editor={ClassicEditor}
                                data={props.productSpecification}
                                onChange={props.productSpecificationChange}
                              />
                            </div>
                            <span className="text-danger">
                              {props.errorProductSpecification}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Returnable Start*/}
                      {props.shopName && (
                        <>
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
                              <div className="col-md-3 col-sm-12">
                                <div className="form-group">
                                  <label className="control_label">
                                    Return Duration (Days)
                                  </label>
                                  <input
                                    type="number"
                                    className={"form-control"}
                                    placeholder="Enter Return Duration (Days)"
                                    name="returnDuration"
                                    value={props.returnDuration}
                                    onChange={props.handleChange}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      )}

                      {props.isReturnable && (
                        <>
                          <div className="row">
                            <div className="col-md-8 col-sm-12">
                              <div className="form-group">
                                <label className="control_label">
                                  Return Poilcy?
                                </label>
                                <CKEditor
                                  editor={ClassicEditor}
                                  data={
                                    (props.approvedReturnPolicyById[0] &&
                                      props.approvedReturnPolicyById[0]
                                        .returnPolicy) ||
                                    ""
                                  }
                                  name="returnPolicy"
                                  onChange={props.handleReturnPolicyChange}
                                  className={"form-control"}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      {/* Returnable End*/}

                      {props.productVariant.length === 0 ? null : (
                        <div className="row">
                          <div className="col-md-12 col-sm-12">
                            <div className="form-group">
                              <label className="control_label">
                                Price &amp; Stock{" "}
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
                              {props.categoryId === 1076 ? null : (
                                <form>
                                  <div className="price_and_stock">
                                    <div className="form-group">
                                      <div className="row">
                                        <div className="col-md-12">
                                          <table
                                            className="table mt-30"
                                            id="tableImg"
                                          >
                                            <tbody>
                                              <tr
                                                style={
                                                  props.productVariant.filter(
                                                    (variantData) =>
                                                      variantData.variantSetupTempleteId ===
                                                      1
                                                  ).length > 2
                                                    ? {
                                                        display: "grid",
                                                        gridTemplateColumns:
                                                          "repeat(3, minmax(0, 1fr))",
                                                      }
                                                    : props.productVariant.filter(
                                                        (variantData) =>
                                                          variantData.variantSetupTempleteId ===
                                                          1
                                                      ).length > 1
                                                    ? {
                                                        display: "grid",
                                                        gridTemplateColumns:
                                                          "repeat(2, minmax(0, 1fr))",
                                                      }
                                                    : {
                                                        display: "grid",
                                                        gridTemplateColumns:
                                                          "repeat(1, minmax(0, 1fr))",
                                                      }
                                                }
                                              >
                                                {props.productVariant
                                                  .filter(
                                                    (variantData) =>
                                                      variantData.variantSetupTempleteId ===
                                                      1
                                                  )
                                                  .map((variant, index) => {
                                                    return (
                                                      <td
                                                        key={index}
                                                        style={{
                                                          width:
                                                            "calc(100%-84px)",
                                                        }}
                                                      >
                                                        <Select
                                                          name={`field${index}`}
                                                          placeholder={`Select ${variant.variantName}`}
                                                          options={variant.productVariantOptions.map(
                                                            (data) => ({
                                                              label:
                                                                data.variantOptionText,
                                                              value:
                                                                data.variantOptionId,
                                                            })
                                                          )}
                                                          components={
                                                            animatedComponents
                                                          }
                                                          isMulti
                                                          isSearchable
                                                          onChange={
                                                            props.handleMultiSelectChange
                                                          }
                                                          value={
                                                            props.productVariantMap
                                                          }
                                                        />
                                                      </td>
                                                    );
                                                  })}
                                              </tr>
                                            </tbody>
                                          </table>
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              justifyContent: "center",
                                              borderBottom: "1px solid #eeeeee",
                                              paddingBottom: "1rem",
                                              marginTop: "-1.5rem",
                                            }}
                                          >
                                            <button
                                              style={{ width: "32.4%" }}
                                              type="submit"
                                              className="btn btn-info"
                                              onClick={
                                                props.combineProductVariant
                                              }
                                            >
                                              <i className="fa fa-check"></i>
                                              Add
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              )}
                              <CreateProductVariantTable
                                category_id={props.categoryId}
                                productVariants={props}
                                duplicate_SKU_Entry={duplicate_SKU_Entry}
                                checkDuplicateProduct={checkDuplicateProduct}
                                productSku={productSku}
                                setCheckDuplicateProduct={
                                  setCheckDuplicateProduct
                                }
                                setVariantUpdated={setVariantUpdated}
                                price_validation_count={price_validation_count}
                                qty_validation_count={qty_validation_count}
                              />
                              <CreateProductAttribute
                                categoryId={props.categoryId}
                                productVariant={props.productVariant}
                                handleAttributeChanges={
                                  props.handleAttributeChange
                                }
                              />
                              {props.shopId && (
                                <SizeChart
                                  selectedSizeChart={props.selectedSizeChart}
                                  onSizeChartOptionsChange={
                                    props.onSizeChartOptionsChange
                                  }
                                  shopId={props.shopId}
                                  categoryId={props.categoryId}
                                />
                              )}

                              <form>
                                <div className="price_and_stock">
                                  <div
                                    className="alert text-center"
                                    role="alert"
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                  >
                                    {isCollapsed ? (
                                      <div className="display-icon">
                                        <span className="text">Less</span>{" "}
                                        <Icon.ChevronsUp className="text-dark icon" />
                                      </div>
                                    ) : (
                                      <div className="display-icon">
                                        <span className="text">More</span>{" "}
                                        <Icon.ChevronsDown className="text-dark icon" />
                                      </div>
                                    )}
                                  </div>
                                  {isCollapsed && (
                                    <>
                                      <label className="control_label">
                                        Service &amp; Delivery{" "}
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
                                      <div className="container-fluid">
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
                                                >
                                                  <option key="0" value="0">
                                                    No Warranty Type
                                                  </option>
                                                  <option key="1" value="1">
                                                    Seller Warranty
                                                  </option>
                                                  <option key="3" value="3">
                                                    International Seller
                                                    Warranty
                                                  </option>
                                                  <option key="4" value="4">
                                                    International Manufacturer
                                                    Warranty
                                                  </option>
                                                  <option key="5" value="5">
                                                    Brand Warranty
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
                                                >
                                                  <option key="0" value="0">
                                                    No Warranty Period
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
                                                </label>
                                                <input
                                                  type="text"
                                                  id="warrantyPolicy"
                                                  className={
                                                    props.errorWarrantyPolicy
                                                      .length !== 0
                                                      ? "errorClass form-control"
                                                      : "form-control" &&
                                                        "form-control"
                                                  }
                                                  placeholder="Default: No Warranty Policy"
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
                                                  Package Weight (kg){" "}
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
                                                    props.errorPackageWeight
                                                      .length !== 0
                                                      ? "errorClass form-control"
                                                      : "form-control" &&
                                                        "form-control"
                                                  }
                                                  value={props.packageWeight}
                                                  placeholder="Enter Package Weight"
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
                                                      placeholder="Enter Package Length (cm)"
                                                      name="packageLength"
                                                      value={
                                                        props.packageLength
                                                      }
                                                      onChange={
                                                        props.handleChange
                                                      }
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
                                                      placeholder="Enter Package Width (cm)"
                                                      name="packageWidth"
                                                      value={props.packageWidth}
                                                      onChange={
                                                        props.handleChange
                                                      }
                                                    />
                                                    <span className="text-danger">
                                                      {props.errorPackageWidth}
                                                    </span>
                                                  </div>
                                                  <div className="col-sm-4">
                                                    <label className="control_label">
                                                      Height (cm){" "}
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
                                                      placeholder="Enter Package Height (cm)"
                                                      name="packageHeight"
                                                      value={
                                                        props.packageHeight
                                                      }
                                                      onChange={
                                                        props.handleChange
                                                      }
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
                                      </div>
                                    </>
                                  )}
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                  <div className="form-actions m-t-30 fixed-footer">
                    {props?.saving === false && props?.isUploadable === true ? (
                      <>
                        <button
                          type="submit"
                          className="btn btn-success"
                          onClick={props.createProduct}
                          // disabled={duplicate_SKU_Entry?.length != 0}
                        >
                          <i className="fa fa-check"></i> Create
                        </button>
                        <Link to="/Home">
                          <button
                            className="btn btn-default"
                            style={{ cursor: "pointer" }}
                          >
                            Cancel
                          </button>
                        </Link>
                      </>
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        <Loader />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackTop />
    </div>
  );
};
export default CreateProductAdmin;
