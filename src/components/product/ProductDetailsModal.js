/* eslint-disable jsx-a11y/alt-text */
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from "react";
import baseUrl from "../../utils/baseUrl";
import LoadingCard from "../shared/LoadingCard";

export const ProductDetailsModal = ({
  currentLocation,
  products,
  loading,
  product_status,
  handleApproveProduct,
  handleRejectedProduct,
}) => {
  return (
    <div
      className="modal fade "
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="panel-wrapper collapse in" aria-expanded="true">
            {/* Modal Contents */}
            {loading ? (
              <LoadingCard count={1} />
            ) : (
              <div className="form-body">
                <h3 className="box-title add-product-title">
                  View Product Details
                  <div className="pull-right">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </h3>

                <ul className="nav nav-tabs">
                  <li className="active">
                    <a data-toggle="tab" href="#BasicInformation">
                      Basic Information
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#ProductDescriptions">
                      Descriptions
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#ProductSpecification">
                      Specifications
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
                <div className="tab-content modal-body">
                  {/* BasicInformation Start */}
                  <div
                    id="BasicInformation"
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
                          <div>
                            <input
                              type="text"
                              className={"form-control"}
                              placeholder="Shop Name"
                              value={products?.shopName}
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
                            className={"form-control"}
                            placeholder="Product Name"
                            value={products?.productName}
                            disabled
                          />
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
                            className={"form-control"}
                            placeholder="Product Style / SKU"
                            value={products?.sku}
                            disabled
                          />
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
                          <div>
                            <input
                              type="text"
                              className={"form-control"}
                              placeholder="Category Name"
                              value={products?.categoryName}
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
                          <div>
                            <input
                              type="text"
                              className={"form-control"}
                              placeholder="Brand Name"
                              value={products?.brandName}
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
                          <div>
                            <input
                              type="text"
                              className={"form-control"}
                              placeholder="Unit Name"
                              value={products?.unitName}
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
                            type="text"
                            className={"form-control"}
                            placeholder="Product Name"
                            value={products?.maxPrice}
                            disabled
                          />
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
                            className={"form-control"}
                            placeholder="Whats in the Box"
                            value={products?.boxInsideElement}
                            disabled
                          />
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
                            className={"form-control"}
                            placeholder="Meta Keywords"
                            value={products?.metaKeywords}
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <label className="control_label">Video URL </label>
                          <input
                            type="text"
                            className={"form-control"}
                            placeholder="Video URL"
                            value={products?.productVideoUrl}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <div
                                className="row"
                                style={{
                                  marginRight: "0px",
                                  marginLeft: "0px",
                                }}
                              >
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

                                <div className="col-md-6">
                                  <img
                                    src={baseUrl.concat(
                                      products?.thumbnailImage
                                    )}
                                    className="thumb-md product-image"
                                    style={{
                                      marginTop: "30px",
                                      width: "120px",
                                      height: "120px",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {products?.thumbnailImage2 && (
                            <div className="col-md-6">
                              <div className="form-group">
                                <div className="row">
                                  <label className="control_label">
                                    Product Zoom Image{" "}
                                  </label>
                                  <div className="col-md-6">
                                    <img
                                      src={baseUrl.concat(
                                        products?.thumbnailImage2
                                      )}
                                      className="thumb-md product-image"
                                      style={{
                                        marginTop: "30px",
                                        width: "120px",
                                        height: "120px",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* BasicInformation End */}

                  {/* //Product Description Start // */}
                  <div id="ProductDescriptions" className="tab-pane fade">
                    <div>
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
                      <div className="row" style={{ display: "" }}>
                        <div className="col-md-12 ">
                          <div className="form-group">
                            <div className={"editor"}>
                              <CKEditor
                                editor={ClassicEditor}
                                data={products?.productDescription}
                                className={"form-control"}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* //Product Description End // */}

                  {/* //Product Specification Start // */}
                  <div id="ProductSpecification" className="tab-pane fade">
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
                    <div className="row" style={{ display: "" }}>
                      <div className="col-md-12 ">
                        <div className="form-group">
                          <div className={"editor"}>
                            <CKEditor
                              editor={ClassicEditor}
                              data={products?.productSpecification}
                              className={"form-control"}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* //Product Specification End // */}

                  {/* //Price and Stock Start // */}
                  <div id="PRICEANDSTOCK" className="tab-pane fade">
                    {products?.productDetails &&
                      products?.productDetails.map((prodDetails, indexx) => {
                        return (
                          <React.Fragment key={indexx}>
                            <table
                              key={indexx}
                              className="table table-bordered"
                            >
                              <thead>
                                <tr>
                                  {prodDetails.productVariants
                                    .filter(
                                      (data) => data.variantTempleteId === 1
                                    )
                                    .map((pv, indexx) => {
                                      return (
                                        <th
                                          style={{
                                            fontWeight: "900",
                                          }}
                                          key={indexx}
                                        >
                                          {pv.variantName}
                                        </th>
                                      );
                                    })}
                                  <th>Price</th>
                                  <th>Quantity</th>
                                  <th>Seller Product SKU</th>
                                  <th>Shop Product SKU</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  {prodDetails.productVariants
                                    .filter(
                                      (data) => data.variantTempleteId === 1
                                    )
                                    .map((pv, index) => {
                                      return (
                                        <td key={index}>
                                          <select
                                            className="form-control"
                                            data-placeholder="Select"
                                            tabIndex="1"
                                            disabled
                                          >
                                            <option defaultValue>
                                              {pv.variantOptionText}
                                            </option>
                                          </select>
                                        </td>
                                      );
                                    })}

                                  <td>
                                    <input
                                      type="text"
                                      className={"form-control"}
                                      name="productPrice"
                                      value={prodDetails.productPrice}
                                      disabled
                                    ></input>
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className={"form-control"}
                                      name="productQuantity"
                                      value={prodDetails.productQuantity}
                                      disabled
                                    ></input>
                                  </td>
                                  <td>{prodDetails.sellerProductSku}</td>
                                  <td>{prodDetails.shopProductSku}</td>
                                </tr>
                                <tr>
                                  <td colSpan="100%">
                                    {prodDetails.productImages.map(
                                      (pv, index) => {
                                        return (
                                          <>
                                            <div>
                                              <div
                                                style={{
                                                  float: "left",
                                                }}
                                              >
                                                <div
                                                  className="parent"
                                                  style={{
                                                    position: "relative",
                                                  }}
                                                >
                                                  {pv.imageUrl.length < 500 ? (
                                                    <img
                                                      src={baseUrl.concat(
                                                        pv.imageUrl
                                                      )}
                                                      alt="img"
                                                      key={index}
                                                      height="98px"
                                                      width="98px"
                                                      style={{
                                                        borderRadius: "10px",
                                                        marginLeft: "10px",
                                                        marginRight: "10px",
                                                        cursor: "pointer",
                                                      }}
                                                    />
                                                  ) : (
                                                    <img
                                                      src={pv.imageUrl}
                                                      alt="img"
                                                      key={index}
                                                      height="98px"
                                                      width="98px"
                                                      style={{
                                                        borderRadius: "10px",
                                                        marginLeft: "10px",
                                                        marginRight: "10px",
                                                        cursor: "pointer",
                                                      }}
                                                    />
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        );
                                      }
                                    )}
                                    <div
                                      style={{
                                        textAlign: "right",
                                      }}
                                    ></div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </React.Fragment>
                        );
                      })}
                  </div>
                  {/* //Price and Stock End // */}

                  {/* //Service And Delivery Start // */}
                  <div id="SERVICEANDDELIVERY" className="tab-pane fade">
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
                              value={products?.warrantyTypeId}
                              disabled
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
                              value={products?.warrantyPeriodId}
                              disabled
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
                              className={"form-control"}
                              placeholder="Warranty Policy"
                              value={products?.warrantyPolicy}
                              disabled
                            />
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
                              className={"form-control"}
                              value={products?.packageWeight}
                              placeholder="Package Weight"
                              disabled
                            />
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
                                  className={"form-control"}
                                  placeholder="Length (cm)"
                                  disabled
                                  value={products?.packageLength}
                                />
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
                                  className={"form-control"}
                                  placeholder="Width (cm)"
                                  disabled
                                  value={products?.packageWidth}
                                />
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
                                  className={"form-control"}
                                  placeholder="Height (cm)"
                                  disabled
                                  value={products?.packageHeight}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* //Service And Delivery End // */}

                  {/* Return Policy Start*/}
                  <div id="RETURNPOLICY" className="tab-pane fade">
                    <div className="row">
                      {products?.isReturnable === "N" && (
                        <div className="col-md-12 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
                              Product is Not Returnable{" "}
                            </label>
                          </div>
                        </div>
                      )}
                      {products?.isReturnable === "Y" && (
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
                              value={products?.returnDuration || 0}
                              disabled
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    {products?.isReturnable === "Y" && (
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
                                data={products?.returnPolicy || ""}
                                className={"form-control"}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {/* Return Policy End*/}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  {currentLocation === "/manage-products" ? (
                    <>
                      {product_status === "pending" ||
                      product_status === "rejected" ? (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() =>
                            handleApproveProduct(products?.productId)
                          }
                          data-dismiss="modal"
                        >
                          Approve
                        </button>
                      ) : null}
                    </>
                  ) : null}
                  {currentLocation === "/manage-products" ? (
                    <>
                      {product_status === "pending" ||
                      product_status === "approved" ? (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() =>
                            handleRejectedProduct(products?.productId)
                          }
                          data-dismiss="modal"
                        >
                          Reject
                        </button>
                      ) : null}
                    </>
                  ) : null}
                </div>
              </div>
            )}
            {/* Modal Contents */}
          </div>
        </div>
      </div>
    </div>
  );
};
