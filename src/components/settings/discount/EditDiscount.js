import React from "react"
import { Link } from "react-router-dom"
import * as Icon from "react-feather"
import "react-datepicker/dist/react-datepicker.css"
import { Dropdown } from "primereact/dropdown"
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment-timezone'

const EditDiscount = (props) => {

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                {" "}
                Update Discount {" "}
                <span style={{ float: "right" }}>
                  <Link to="/DiscountList">
                    <Icon.List className="text-light" />
                  </Link>
                </span>
              </div>
              <div className="panel-wrapper collapse in" aria-expanded="true">
                <div className="panel-body">
                  <form className="form-horizontal">
                    <div className="form-body">
                      <div className="row">
                        <div className="col-sm-12 col-md-4">
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
                            <div className="dropdown-demo">
                              <Dropdown
                                optionLabel="productName"
                                options={props.products}
                                filter
                                showClear
                                filterBy="productName"
                                placeholder={props.productName}
                                name="selectedProductId"
                                value={props.selectedProductId}
                                onChange={props.handleChange}
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-4">
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
                                options={props.discountTypes}
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
                        <div className="col-sm-12 col-md-4">
                          <label className="control_label">
                            Discount Parcentage{" "}
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
                            placeholder="Discount Parcentage"
                            name="discountPercentage"
                            value={props.discountPercentage}
                            onChange={props.handleChange}
                            className={
                              props.errorDiscountPercentage.length !== 0
                                ? "errorClass form-control"
                                : "form-control" && "form-control"
                            }
                          />
                          {props.errorDiscountPercentage && (
                            <span className="error">
                              {props.errorDiscountPercentage}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="row">
                      <div className="col-sm-12 col-md-6">
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
                            use12Hours = {true} 
                            format="YYYY-MM-DD HH:mm"
                            className="form-control"
                            placeholder="Select Start Date & Time"
                            value={moment(props.startDate)}
                            onChange={(date, dateString) => props.handleStartDate(date, dateString, 1)}
                          />
                        </div>
                        
                        <div className="col-sm-12 col-md-6">
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
                            use12Hours = {true} 
                            format="YYYY-MM-DD HH:mm"
                            className="form-control"
                            placeholder="Select End Date & Time"
                            value={moment(props.endDate)}
                            onChange={(date, dateString) => props.handleEndDate(date, dateString, 2)}
                          />
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
                            <button
                              type="submit"
                              className="btn btn-success"
                              onClick={props.updateDiscount}
                            >
                              Update
                              </button>

                            <Link to="/DiscountList">
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

export default EditDiscount
