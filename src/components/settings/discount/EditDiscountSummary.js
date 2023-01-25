import React from "react"
import { Link } from "react-router-dom"
import * as Icon from "react-feather"
import { Dropdown } from "primereact/dropdown"
import { DatePicker } from "antd"
import moment from "moment"
import baseUrl from "../../../utils/baseUrl"

const EditDiscountSummary = (props) => {
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                {" "}
                Edit Discount Summary{" "}
                <span style={{ float: "right" }}>
                  <Link to="/DiscountSummaryList">
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
                          <div className="form-group">
                            <label className="control_label">
                              Discount Name{" "}
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
                              placeholder="Enter Discount Name"
                              name="name"
                              value={props.name}
                              onChange={props.handleChange}
                              className={
                                props.errorName.length !== 0
                                  ? "errorClass form-control"
                                  : "form-control" && "form-control"
                              }
                            />
                            {props.errorName && (
                              <span className="error">{props.errorName}</span>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <div className="form-group">
                            <label className="control_label">
                              Discount Type{" "}
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
                                optionLabel="productDiscountTypeName"
                                options={props.discountTypes.filter((item) => item.isActive === 'Y' )}
                                filter
                                showClear
                                filterBy="productDiscountTypeName"
                                placeholder={props.discountTypeName}
                                className="form-control"
                                name="selectedDiscountTypeId"
                                value={props.selectedDiscountTypeId}
                                onChange={props.handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                      <div className="col-sm-12 col-md-6">
                          <div className="form-group">
                            <label className="control_label">
                            Discount Amount{" "}
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
                              placeholder="Enter Discount Amount"
                              name="discountAmount"
                              value={props.discountAmount}
                              onChange={props.handleChange}
                              className={
                                props.errorDiscountAmount.length !== 0
                                  ? "errorClass form-control"
                                  : "form-control" && "form-control"
                              }
                            />
                            {props.errorDiscountAmount && (
                              <span className="error">{props.errorDiscountAmount}</span>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <div className="form-group">
                            <label className="control_label">
                            Discount (%){" "}
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
                              placeholder="Enter Discount (%)"
                              name="discountPercent"
                              value={props.discountPercent}
                              onChange={props.handleChange}
                              className={
                                props.errorDiscountPercent.length !== 0
                                  ? "errorClass form-control"
                                  : "form-control" && "form-control"
                              }
                            />
                            {props.errorDiscountPercent && (
                              <span className="error">{props.errorDiscountPercent}</span>
                            )}
                          </div>
                        </div>
                        
                      </div>

                      <div className="row">
                        <div className="col-sm-12 col-md-4">
                          <label className="control_label">
                            Start Date & Time{" "}
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
                          <DatePicker
                            showTime
                            use12Hours={true}
                            format="YYYY-MM-DD HH:mm"
                            className="form-control"
                            placeholder="Select Start Date & Time"
                            value={moment(props.startDate)}
                            onChange={(date, dateString) =>
                              props.handleStartDate(date, dateString, 1)
                            }
                          />
                        </div>
                        <div className="col-sm-12 col-md-4">
                          <label className="control_label">
                            End Date & Time{" "}
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
                          <DatePicker
                            showTime
                            use12Hours={true}
                            format="YYYY-MM-DD HH:mm"
                            className="form-control"
                            placeholder="Select End Date & Time"
                            value={moment(props.endDate)}
                            onChange={(date, dateString) =>
                              props.handleEndDate(date, dateString, 2)
                            }
                          />
                        </div>
                        <div className="col-sm-12 col-md-4">
                          <div className="form-group">
                            <label className="control_label">
                              Registration End Date & Time{" "}
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
                            <DatePicker
                              showTime
                              use12Hours={true}
                              format="YYYY-MM-DD HH:mm"
                              className="form-control"
                              placeholder="Select Reg End Date & Time"
                              defaultValue={moment}
                              onChange={(date, dateString) =>
                                props.handleRegEndDate(date, dateString, 2)
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 col-md-6">
                          <div className="row">
                            <div className="col-sm-9 col-md-9">
                              <div className="form-group file-area">
                                <label className="control_label">
                                Discount Summary Image
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
                                  accept="image/*"
                                  name="image"
                                  required="required"
                                  className="form-control"
                                  onChange={props.fileSelectedHandler}
                                />
                                {props.image ? (
                                  <div className="file-dummy">
                                    <div className="default">Upload Image to Change</div>
                                  </div>
                                ) : (
                                  <div className="file-dummy">
                                    <div className="success">
                                      Image Uploaded Successfully
                                    </div>
                                  </div>
                                )}
                                
                              </div>
                            </div>
                            <div className="col-sm-3 col-md-3">
                              {props.showFile ? (
                                <img
                                  src={props.showFile}
                                  className="thumb-md product-image"
                                  style={{
                                    marginTop: "30px",
                                    width: "120px",
                                    height: "70px",
                                  }}
                                />
                              ) : (
                                <img
                                  src={baseUrl.concat(props.image)}
                                  className="thumb-md product-image"
                                  style={{
                                    marginTop: "30px",
                                    width: "120px",
                                    height: "60px",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <div className="form-group">
                            <label className="control_label">Active </label>
                            <div className="checkbox checkbox-success d-flex align-items-center">
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
                    </div>
                    <div className="form-footer ">
                      <div className="form-group row">
                        <div className="text-center">
                          <div className="btn-group text-center">
                            <Link to="/discountTypeList">
                              <button
                                type="submit"
                                className="btn btn-success"
                                onClick={props.saveDiscount}
                              >
                                Update
                              </button>
                            </Link>

                            <Link to="/DiscountSummaryList">
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

export default EditDiscountSummary
