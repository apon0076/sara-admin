import React from "react"
import { Link } from "react-router-dom"
import * as Icon from "react-feather"

const EditOrderType = (props) => {

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                {" "}
                Edit Order Type{" "}
                <span style={{ float: "right" }}>
                  <Link to="/OrdersTypeList">
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
                            <label className="control_label">
                              Edit Order Types Name{" "}
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
                              placeholder="Enter Order Type Name"
                              name="statusTypeName"
                              value={props.statusTypeName}
                              onChange={props.handleChange}
                              className={
                                props.errorStatusTypeName.length !== 0
                                  ? "errorClass form-control"
                                  : "form-control" && "form-control"
                              }
                            />
                            {props.errorStatusTypeName && (
                              <span className="error">
                                {props.errorStatusTypeName}
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
                              <button
                                type="submit"
                                className="btn btn-success"
                                onClick={props.saveOrderType}
                              >
                                Update
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

export default EditOrderType
