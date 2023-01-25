import React, { useState } from "react"
import { Link } from "react-router-dom"
import * as Icon from "react-feather"
import { Dropdown } from "primereact/dropdown"
import { DatePicker } from "antd"
import moment from "moment"
import baseUrl from "../../utils/baseUrl"
const CreateSellerCommissionPercentage = (props) => {
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                {" "}
                Create Commission Percentage{" "}
                <span style={{ float: "right" }}>
                  <Link to="/CommissionPercentageList">
                    <Icon.List className="text-light" />
                  </Link>
                </span>
              </div>
              <div className="panel-wrapper collapse in" aria-expanded="true">
                <div className="panel-body">
                  <form className="form-horizontal">
                    <div className="form-body">
                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <label className="control_label">
                            Local Commission Percentage{" "}
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
                            placeholder="Local Commission Percentage"
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

                        <div className="col-sm-12 col-md-6">
                          <label className="control_label">
                            Global Commission Percentage{" "}
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
                            placeholder="Global Commission Percentage"
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
                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <label className="control_label">
                            Details{" "}
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
                            type="text"
                            placeholder="Details of Commission Percentage"
                            rows="4"
                            name="details"
                            value={props.details}
                            onChange={props.handleChange}
                            className={
                              props.errorDetails.length !== 0
                                ? "errorClass form-control"
                                : "form-control" && "form-control"
                            }
                          />
                          {props.errorDetails && (
                            <span className="error">{props.errorDetails}</span>
                          )}
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <div className="form-group file-area">
                            <label className="control_label">
                              Document File
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
                              type="file"
                              className="form-control"
                              id="input-8"
                              name="aggrementDocument"
                              required
                              imgExtension={[
                                ".jpg",
                                ".gif",
                                ".png",
                                ".docx",
                                ".txt",
                                ".pdf",
                              ]}
                              onChange={props.fileSelectedHandler}
                            />
                            {props.aggrementDocument === "" ? (
                              <div className="file-dummy">
                                <div className="default">Upload Document</div>
                              </div>
                            ) : (
                              <div className="file-dummy">
                                <div className="success">
                                  Document Uploaded Successfully
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-3 col-sm-12">
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
                        <div className="col-md-3 col-sm-12">
                          <div className="form-group">
                            <label className="control_label">Is Approve </label>
                            <div className="checkbox checkbox-success">
                              <input
                                id="isApprove"
                                type="checkbox"
                                name="isApprove"
                                checked={props.isApprove}
                                onChange={props.handleApproveCheck}
                              />
                              <label htmlFor="isApprove"> &nbsp;Yes </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-footer ">
                      <div className="form-group row">
                        <div className="text-center">
                          <div className="btn-group text-center">
                            <Link to="/sellerCommissionPercentageList">
                              <button
                                type="submit"
                                className="btn btn-success"
                                onClick={props.saveCommissionPercentage}
                              >
                                Create
                              </button>
                            </Link>

                            <Link to="/Home">
                              <button
                                className="btn btn-danger"
                                style={{ cursor: "pointer" }}
                                onClick={props.resetForm}
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

export default CreateSellerCommissionPercentage
