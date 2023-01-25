import React from "react";
import Home from "../../home/Home";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";

const EditAttribute = (props) => {
  return (
    <div id="wrapper">
      <Home />
      <div className="content-wrapper">
        <div className="container-fluid">
          <Breadcrumb />
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="card-title">{props.name}</div>
                  <hr />
                  <form>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Id</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          disabled
                          className="form-control"
                          placeholder="ID"
                          name="attributeId"
                          value={props.attributeId}
                          onChange={props.handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Name</label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          required
                          name="attributeName"
                          onKeyPress={props.keyPressed}
                          value={props.attributeName}
                          onChange={props.handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label"></label>
                      <div className="col-sm-10">
                        <div className="icheck-material-primary">
                          <input
                            id="user-checkbox"
                            type="checkbox"
                            name="activeYn"
                            value={props.activeYn}
                            checked={props.activeYn}
                            onChange={props.handleChange}
                          />
                          <label for="user-checkbox">Active</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-footer">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                          <div className="btn-group">
                            <button
                              className="btn btn-success"
                              onClick={props.updateAttribute}
                              style={{ cursor: "pointer" }}
                            >
                              {props.buttonName}
                            </button>

                            <button
                              className="btn btn-danger"
                              onClick={props.clearData}
                              style={{ cursor: "pointer" }}
                            >
                              Clear
                            </button>
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
};

export default EditAttribute;
