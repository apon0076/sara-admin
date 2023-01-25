import React from "react"
import { Link } from "react-router-dom"
import * as Icon from "react-feather"
import "react-datepicker/dist/react-datepicker.css"
import { DatePicker } from "antd"
import moment from 'moment'
import 'moment-timezone'
import baseUrl from "../../../utils/baseUrl"

const EditPromotion = (props) => {

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                {" "}
                Update Promotion{" "}
                <span style={{ float: "right" }}>
                  <Link to="/PromotionList">
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
                              Promotion Name{" "}
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
                              filterBy="name"
                              placeholder={props.name}
                              name="name"
                              value={props.name}
                              onChange={props.handleChange}
                              className={
                                props.errorPromotionName.length !== 0
                                  ? "errorClass form-control"
                                  : "form-control" && "form-control"
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <div className="col-md-8 col-sm-8">
                            <div className="form-group file-area">
                              <label className="control_label">
                                Image
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
                                name="image"
                                required="required"
                                className="form-control"
                                onChange={props.promotionImageUrlHandler}
                              />
                              {props.image === "" ? (
                                <div className="file-dummy">
                                  <div className="default">
                                    Please Upload Promotion Image
                                  </div>
                                </div>
                              ) : (
                                <div className="file-dummy">
                                  <div className="success">
                                  Promotion Image Uploaded Successfully
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-md-4 col-sm-4">
                          
                            <img
                              src={baseUrl.concat(props.image)}
                              alt="img"
                              style={{
                                height: "70px",
                                width: "70px",
                                borderRadius: "10px",
                                marginTop: "30px",
                              }}
                            />
                          </div>
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
                              onClick={props.updatePromotion}
                            >
                              Update
                            </button>

                            <Link to="/PromotionList">
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

export default EditPromotion
