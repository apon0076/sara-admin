import React from "react";
import { ToastContainer } from "react-toastify";

const ServiceAndDelivery = (props) => {
  const {
    warrantyTypeId,
    setWarrantyTypeId,
    warrantyPeriodId,
    setWarrantyPeriodId,
    warrantyPolicy,
    setWarrantyPolicy,
    packageWeight,
    setPackageWeight,
    packageLength,
    setPackageLength,
    packageWidth,
    setPackageWidth,
    packageHeight,
    setPackageHeight
  } = props;
  return (
    <>
      <div className="product_variants__section">
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
                onChange={(e) => setWarrantyTypeId(e.target.value)}
                value={warrantyTypeId?.toString()}
              >
                <option key="0" value="0">
                  No Warranty
                </option>
                <option key="1" value="1">
                  Local Seller Warranty
                </option>
                <option key="2" value="2">
                  Non-local Warranty
                </option>
                <option key="3" value="3">
                  International Seller Warranty
                </option>
                <option key="4" value="4">
                  International Manufacturer Warranty
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
                onChange={(e) => setWarrantyPeriodId(e.target.value)}
                value={warrantyPeriodId?.toString()}
              >
                <option key="0" value="0">
                  No Warranty
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
                  warrantyPolicy.length === 0
                    ? "errorClass form-control"
                    : "form-control" && "form-control"
                }
                placeholder="Warranty Policy"
                name="warrantyPolicy"
                value={warrantyPolicy}
                onChange={(e) => setWarrantyPolicy(e.target.value)}
              />
              <span className="text-danger">
                {warrantyPolicy.length < 4
                  ? "At least 4 characters required"
                  : ""}
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
                  packageWeight.length === 0
                    ? "errorClass form-control"
                    : "form-control" && "form-control"
                }
                value={packageWeight}
                placeholder="Package Weight"
                name="packageWeight"
                onChange={(e) => setPackageWeight(e.target.value)}
              />
              <span className="text-danger">
                {packageWeight.length < 1 ? "Required Field" : ""}
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
                      packageLength.length === 0
                        ? "errorClass form-control"
                        : "form-control" && "form-control"
                    }
                    placeholder="Length (cm)"
                    name="packageLength"
                    value={packageLength}
                    onChange={(e) => setPackageLength(e.target.value)}
                  />
                  <span className="text-danger">
                    {packageLength.length < 1 ? "Required Field" : ""}
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
                      packageWidth.length === 0
                        ? "errorClass form-control"
                        : "form-control" && "form-control"
                    }
                    placeholder="Width (cm)"
                    name="packageWidth"
                    value={props.packageWidth}
                    onChange={(e) => setPackageWidth(e.target.value)}
                  />
                  <span className="text-danger">{packageWidth.length < 1 ? "Required Field" : ""}</span>
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
                      packageHeight.length === 0
                        ? "errorClass form-control"
                        : "form-control" && "form-control"
                    }
                    placeholder="Height (cm)"
                    name="packageHeight"
                    value={packageHeight}
                    onChange={(e) => setPackageHeight(e.target.value)}
                  />
                  <span className="text-danger">
                    {packageHeight.length < 1 ? "Required Field" : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2500} />
    </>
  );
};

export default ServiceAndDelivery;
