import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
import * as Icon from "react-feather";
import { Link } from "react-router-dom";

const SizeChartCreateAttribute = ({
  attributeName,
  setAttributeName,
  setAttributeDisplayOrder,
  handleAttributeSubmit,
  loading,
  setAttributeIsActive,
  attributeIsActive,
}) => {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 30,
      }}
      spin
    />
  );
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                Create Size Chart Attributes
                <span style={{ float: "right" }}>
                  <Link to="/size-chart-attributes-list">
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
                              Attribute Name
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
                              placeholder="Enter Attribute Name"
                              name="name"
                              className={" form-control"}
                              value={attributeName}
                              onChange={(e) => setAttributeName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-sm-12 col-md-6">
                          <div className="form-group">
                            <label className="control_label">
                              Display Order
                            </label>
                            <input
                              type="number"
                              placeholder="Enter Display Order"
                              name="name"
                              className={" form-control"}
                              onChange={(e) =>
                                setAttributeDisplayOrder(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                          <div className="form-group">
                            <label className="control_label">Is Active</label>
                            <div className="checkbox checkbox-success">
                              <input
                                id="contentActive"
                                type="checkbox"
                                name="contentActive"
                                checked={attributeIsActive}
                                onChange={(e) =>
                                  setAttributeIsActive(e.target.checked)
                                }
                              />
                              <label htmlFor="contentActive"> &nbsp;Yes </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-footer ">
                      <div className="form-group row">
                        <div className="text-center">
                          {loading ? (
                            <Spin indicator={antIcon} />
                          ) : (
                            <div className="btn-group text-center">
                              <button
                                type="submit"
                                className="btn btn-success"
                                disabled={!attributeName}
                                onClick={(e) => handleAttributeSubmit(e)}
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
                          )}
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

export default SizeChartCreateAttribute;
