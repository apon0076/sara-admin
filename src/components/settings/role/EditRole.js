import React from "react";
import { Link } from "react-router-dom";

const EditRole = (props) => {
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">
                {" "}
                Edit Role{" "}
                <span style={{ float: "right" }}>
                  <Link to="/RoleList">Role List</Link>
                </span>
              </div>
              <div className="panel-wrapper collapse in" aria-expanded="true">
                <div className="panel-body">
                  <form className="form-horizontal">
                    <div className="form-body">
                      <h3 className="box-title">Edit Role Info</h3>
                      <hr className="m-t-0 m-b-40" />
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label col-md-3">
                              Role Name
                            </label>
                            <div className="col-md-9">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Role Name"
                                name="roleName"
                                value={props.roleName}
                                onChange={props.handleChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label col-md-3">
                              Module Type
                            </label>
                            <div className="col-md-9">
                              <select
                                name="moduleId"
                                className={"form-control"}
                              >
                                <option value="">Select Module Type</option>

                                <option value="1">Administrator Module</option>
                                <option value="2">Seller Module</option>
                                <option value="4">Customer Module</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <div className="col-sm-offset-3 col-sm-9">
                              <div className="checkbox checkbox-success">
                                <input
                                  id="checkbox33"
                                  type="checkbox"
                                  name="isActive"
                                />
                                <label htmlFor="checkbox33"> Is Active ?</label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6"></div>
                      </div>
                    </div>

                    <div className="form-actions">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="row">
                            <div className="col-md-offset-3 col-md-9">
                              <button type="submit" className="btn btn-success">
                                <i className="fa fa-pencil"></i> Update
                              </button>
                              <button type="button" className="btn btn-default">
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6"> </div>
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

export default EditRole;
