import React, { useState } from "react"
import { Link } from "react-router-dom"
import * as Icon from "react-feather"
import "file-upload-with-preview/dist/file-upload-with-preview.min.css";
import { DatePicker } from 'antd';
import moment from 'moment'

const CreatePromotion = (props) => {

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                {" "}
                Create Promotion{" "}
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
                              placeholder="Promotion Name"
                              name="name"
                              value={props.name}
                              onChange={props.handleChange}
                              className={
                                props.errorPromotionName.length !== 0
                                  ? "errorClass form-control"
                                  : "form-control" && "form-control"
                              }
                            />
                            {props.errorPromotionName && (
                              <span className="error">
                                {props.errorPromotionName}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <div className="form-group">
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
                            <div className="input-file-container file-area">
                              <input
                                type="file"
                                name="image"
                                id="my-file"
                                onChange={props.handleImageChange}
                              />
                              <div
                                className="file-dummy"
                                style={{
                                  padding: "15px",
                                }}
                              >
                                <div className="">
                                  {props.image.length > 1000
                                    ? "Image Selected"
                                    : "Select Image"}
                                </div>
                              </div>
                            </div>
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
                            use12Hours={true}
                            format="YYYY-MM-DD HH:mm"
                            className="form-control"
                            placeholder="Select Start Date & Time"
                            defaultValue={moment}
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
                            use12Hours={true}
                            format="YYYY-MM-DD HH:mm"
                            className="form-control"
                            placeholder="Select End Date & Time"
                            defaultValue={moment}
                            onChange={(date, dateString) => props.handleEndDate(date, dateString, 2)}
                          />
                          <br />
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
                            <Link to="/">
                              <button
                                type="submit"
                                className="btn btn-success"
                                onClick={props.savePromotion}
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

export default CreatePromotion
