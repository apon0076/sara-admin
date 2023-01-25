import React from "react"
import { Link } from "react-router-dom"
import * as Icon from "react-feather"
import TextArea from "antd/es/input/TextArea"

const EditProductCampaignSellerList = (props) => {

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                {" "}
                Edit Product Campaign Seller{" "}
                <span style={{ float: "right" }}>
                  <Link to="/ProductCampaignSellerList">
                    <Icon.List className="text-light" />
                  </Link>
                </span>
              </div>
              <div className="panel-wrapper collapse in" aria-expanded="true">
                <div className="panel-body">
                  <form className="form-horizontal">
                    <div className="form-body">
                      <div className="row">
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
                              Seller Name{" "}
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
                              value={props.sellerName}
                              readOnly
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
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
                            <input
                              type="text"
                              value={props.shopName}
                              readOnly
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
                              Seller Local Percentage{" "}
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
                              placeholder="Seller Local Percentage"
                              name="localCommissionPercentage"
                              value={props.localCommissionPercentage}
                              onChange={props.handleChange}
                              className={
                                props.errorLocalCommissionPercentage.length !== 0
                                  ? "errorClass form-control"
                                  : "form-control" && "form-control"
                              }
                            />
                            {props.errorLocalCommissionPercentage && (
                              <span className="error">
                                {props.errorLocalCommissionPercentage}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
                              Seller Global Percentage{" "}
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
                              placeholder="Seller Local Percentage"
                              name="globalCommissionPercentage"
                              value={props.globalCommissionPercentage}
                              onChange={props.handleChange}
                              className={
                                props.errorGlobalCommissionPercentage.length !== 0
                                  ? "errorClass form-control"
                                  : "form-control" && "form-control"
                              }
                            />
                            {props.errorGlobalCommissionPercentage && (
                              <span className="error">
                                {props.errorGlobalCommissionPercentage}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-md-12 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">
                              Remarks{" "}
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
                            <TextArea
                              type="text"
                              placeholder="Remarks"
                              name="remarks"
                              value={props.remarks}
                              onChange={props.handleChange}
                              className={
                                props.errorRemarks.length !== 0
                                  ? "errorClass form-control"
                                  : "form-control" && "form-control"
                              }
                            />
                            {props.errorRemarks && (
                              <span className="error">
                                {props.errorRemarks}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">Active </label>
                            <div className="checkbox checkbox-success">
                              <input
                                id="isActive"
                                type="checkbox"
                                name="isActive"
                                checked={props.status}
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
                              <button
                                type="submit"
                                className="btn btn-success"
                                onClick={props.saveProductCampaignSellerList}
                              >
                                Update
                              </button>
                              <Link to="/ProductCampaignSellerList">
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

export default EditProductCampaignSellerList
