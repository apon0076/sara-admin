import React from "react"
import { Link } from "react-router-dom"
import * as Icon from "react-feather"

const CreateDiscountType = (props) => {
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">

              {/* For header */}
              <div className="panel-heading">
                {" "}
                Create Discount Type{" "}
                <span style={{ float: "right" }}>
                  <Link to="/DiscountTypeList">
                    <Icon.List className="text-light" />
                  </Link>
                </span>
              </div>

              <div className="panel-wrapper collapse in" aria-expanded="true">
                <div className="panel-body">
                  <form className="form-horizontal">
                    <div className="form-body">
                      <div className="row">
                        <div className="col-md-12 col-sm-12">
                          <div className="form-group">
                            {/*  Input label */}
                            <label className="control_label">
                              Discount Type Name{" "}
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
                            {/* Input box */}
                            <input
                              type="text"
                              placeholder="Enter Discount Type Name"
                              name="productDiscountTypeName"
                              value={props.productDiscountTypeName}
                              onChange={props.handleChange}
                              className={
                                props.errorDiscountTypeName.length !== 0
                                  ? "errorClass form-control"
                                  : "form-control" && "form-control"
                              }
                            />
                            {/* For showing error */}
                            {props.errorDiscountTypeName && (
                              <span className="error">
                                {props.errorDiscountTypeName}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* For checkbox isActive */}
                      <div className="row">
                        <div className="col-md-12 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">Active </label>
                            <div className="checkbox checkbox-success">
                              <input
                                id="isActive"
                                type="checkbox"
                                name="isActive"
                                checked={props.isActive}
                                onChange={props.handleParentCheck}
                              />
                              <label htmlFor="isActive"> &nbsp;Yes </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="form-footer ">
                        <div className="form-group row">
                          <div className="text-center">
                            <div className="btn-group text-center">
                              {/* Save button */}
                              <button
                                type="submit"
                                className="btn btn-success"
                                onClick={props.saveDiscountType}
                              >
                                Create
                              </button>
                              {/* Cancel button */}
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

export default CreateDiscountType
