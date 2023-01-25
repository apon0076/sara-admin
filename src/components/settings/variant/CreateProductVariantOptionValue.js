import React from "react"
import { Link } from "react-router-dom"
import { Dropdown } from "primereact/dropdown"
import * as Icon from "react-feather"

const CreateProductVariantOptionValue = (props) => {

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                {" "}
                Create Product Variant Option Value{" "}
                <span style={{ float: "right" }}>
                  <Link to="/ProductVariantOptionValueList">
                    <Icon.List className="text-light" />
                  </Link>
                </span>
              </div>
              <div className="panel-wrapper collapse in" aria-expanded="true">
                <div className="panel-body">
                  <form className="form-horizontal">
                    <div className="form-body">
                      <div className="p-field p-fluid">
                        <div className="form-group">
                          <label className="control_label">
                            Variant Name{" "}
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
                              optionLabel="variantName"
                              options={props?.variants}
                              filter
                              showClear
                              filterBy="variantName"
                              placeholder="Select Product Variant*"
                              name="variantName"
                              value={props?.variantName}
                              onChange={props?.handleChange}
                              className={
                                props?.errorVariantName.length !== 0
                                  ? "errorClass form-control"
                                  : "form-control" && "form-control"
                              }
                            />
                            {props?.errorVariantName && (
                              <span className="error">
                                {props?.errorVariantName}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="p-field p-fluid">
                        <div className="form-group">
                          <label className="control_label">
                            Variant Attribute{" "}
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
                            id="variantOptionName"
                            type="text"
                            placeholder="Enter Variant Attribute Name"
                            name="variantOptionName"
                            value={props?.variantOptionName}
                            onChange={props?.handleChange}
                            className={
                              props?.errorVariantOptionName.length !== 0
                                ? "errorClass form-control"
                                : "form-control" && "form-control"
                            }
                          />
                          {props?.errorVariantOptionName && (
                            <span className="error">
                              {props?.errorVariantOptionName}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="p-field p-fluid">
                        <div className="form-group">
                          <label className="control_label">
                            Variant Attribute Value{" "}
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
                            id="variantOptionValue"
                            type="text"
                            placeholder="Enter Variant Attribute Value"
                            name="variantOptionValue"
                            value={props?.variantOptionValue}
                            onChange={props?.handleChange}
                            className="form-control"
                          />

                        </div>
                      </div>
                      <div className="p-field p-fluid">
                        <div className="form-group">
                          <label className="control_label">
                            Display Order Number{" "}
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
                            id="displayOrder"
                            type="number"
                            placeholder="Enter Display Order Number"
                            name="displayOrder"
                            value={props?.displayOrder}
                            onChange={props?.handleChange}
                            className="form-control"
                          />

                        </div>
                      </div>
                    </div>
                    <div className="form-footer">
                      <div className="form-group row">
                        <div className="text-center">
                          <div className="btn-group text-center">
                            <button
                              className="btn btn-success"
                              onClick={props?.saveProductVariantOptionValue}
                              style={{ cursor: "pointer" }}
                            >
                              Create
                            </button>
                            <Link to="/Home">
                              <button
                                className="btn btn-danger"
                                style={{ cursor: "pointer" }}
                              >
                                Cancel
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProductVariantOptionValue
