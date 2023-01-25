import React from "react";

const EditSize = (props) => {
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-success">
              <div className="panel-heading">Update Size</div>

              <div className="panel-wrapper collapse in" aria-expanded="true">
                <div className="panel-body">
                  <form>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">
                        Size Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          required
                          name="sizeName"
                          onKeyPress={props.keyPressed}
                          value={props.sizeName}
                          onChange={props.handleChange}
                        />
                        {props.sizeName === "" ? (
                          <p
                            style={{
                              padding: "5px 0px 5px 5px",
                              color: "#FF0000",
                              margin: "auto",
                              fontWeight: "600",
                            }}
                          >
                            Size is required
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="form-footer">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label"></label>
                        <div className="col-sm-10">
                          <div className="btn-group">
                            <button
                              className="btn btn-success"
                              onClick={props.updateSize}
                              style={{ cursor: "pointer" }}
                            >
                              Update
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

export default EditSize;
