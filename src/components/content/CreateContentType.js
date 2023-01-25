import React from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";
import "../../containers/content/content.css";

export default function CreateContentType(props) {
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                {" "}
                Create Content Type{" "}
                <span style={{ float: "right" }}>
                  <span className="content__options_btn">
                    <button onClick={() => props.setContentTypePageOptions(2)}>
                      <Icon.List />
                    </button>
                  </span>
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
                              Content Type Name{" "}
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
                              placeholder="Enter Content Type Here"
                              name="contentTypeName"
                              value={props.contentTypeName}
                              onChange={(e) =>
                                props.setContentTypeName(e.target.value)
                              }
                              className={"form-control"}
                            />
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
                                checked={props.contentActive}
                                onChange={(e) =>
                                  props.setContentActive(e.target.checked)
                                }
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
                                className="btn btn-success"
                                onClick={props.createContentType}
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
}
