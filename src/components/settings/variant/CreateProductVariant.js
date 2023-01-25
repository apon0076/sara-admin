import React from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";

const CreateProductVariant = (props) => {
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                Create Product Variants and Attributes
                <span style={{ float: "right" }}>
                  <Link to="/ProductVariantList">
                    <Icon.List className="text-light" />
                  </Link>
                </span>
              </div>
              <div className="panel-wrapper collapse in" aria-expanded="true">
                {/* <div
                  style={{
                    paddingTop: "25px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={() => props.handleTabChange(1)}
                    style={
                      props.variantSetupTempleteId === 1
                        ? {
                            border: "1px solid #1f5da0",
                            background: "#1f5da0",
                            padding: "9px 30px",
                            fontSize: "16px",
                            width: "170px",
                            transition: "all ease-in-out 0.2s",
                            fontWeight: "500",
                            color: "#fff",
                          }
                        : {
                            border: "1px solid #ddd",
                            background: "#fff",
                            padding: "9px 30px",
                            fontSize: "16px",
                            width: "170px",
                            transition: "all ease-in-out 0.2s",
                            fontWeight: "500",
                          }
                    }
                  >
                    Variant
                  </button>
                  <button
                    onClick={() => props.handleTabChange(2)}
                    style={
                      props.variantSetupTempleteId === 2
                        ? {
                            border: "1px solid #1f5da0",
                            background: "#1f5da0",
                            padding: "9px 30px",
                            fontSize: "16px",
                            width: "170px",
                            transition: "all ease-in-out 0.2s",
                            fontWeight: "500",
                            color: "#fff",
                          }
                        : {
                            border: "1px solid #ddd",
                            background: "#fff",
                            padding: "9px 30px",
                            fontSize: "16px",
                            width: "170px",
                            transition: "all ease-in-out 0.2s",
                            fontWeight: "500",
                          }
                    }
                  >
                    Attribute
                  </button>
                </div> */}
                <div className="panel-body">
                  <form className="form-horizontal">
                    <div className="form-body">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                        className="p-field p-fluid"
                      >
                        <div style={{ width: "49%" }} className="form-group">
                          <label className="control_label">
                            {/* {props.variantSetupTempleteId === 1
                              ? "Variant Name"
                              : "Attribute Name"} */}
                            Name
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
                            placeholder={
                              // props.variantSetupTempleteId === 1
                              //   ? "Variant Name"
                              //   : "Attribute Name"
                              "Name"
                            }
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

                        <div style={{ width: "49%" }} className="form-group">
                          <label className="control_label">
                            Type
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
                            className="form-control form-control"
                            value={props.variantSetupTempleteId}
                            onChange={(e) =>
                              props.handleTabChange(e.target.value)
                            }
                          >
                            <option value="0">--Please Select Type--</option>
                            <option value="1">Variant</option>
                            <option value="2">Attribute</option>
                          </select>
                        </div>
                      </div>
                      <div className="p-field p-fluid">
                        <div className="form-group">
                          <label className="control_label">
                            {/* {props.variantSetupTempleteId === 1
                              ? "Variant Description"
                              : "Attribute Description"} */}
                            Description
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
                          <textarea
                            rows="4"
                            placeholder={
                              // props.variantSetupTempleteId === 1
                              //   ? "Variant Description"
                              //   : "Attribute Description"
                              "Description"
                            }
                            name="variantDescription"
                            value={props?.variantDescription}
                            onChange={props?.handleChange}
                            className={
                              props?.errorVariantDescription.length !== 0
                                ? "errorClass form-control"
                                : "form-control" && "form-control"
                            }
                          />
                          {props?.errorVariantDescription && (
                            <span className="error">
                              {props?.errorVariantDescription}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-footer">
                      <div className="form-group row">
                        <div className="text-center">
                          <div className="btn-group text-center">
                            <button
                              type="submit"
                              className="btn btn-success"
                              style={{ cursor: "pointer" }}
                              onClick={props?.saveProductVariant}
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
  );
};

export default CreateProductVariant;
