import React from "react";

const CreateProductSlider = (props) => {
  return (
    <div className="content-wrapper">
      <div className="container-fluid">
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
                        name="sliderId"
                        value={props.sliderId}
                        onChange={props.handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        required
                        className="form-control"
                        placeholder="Name"
                        name="sliderName"
                        value={props.sliderName}
                        onChange={props.handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label for="input-8" className="col-sm-2 col-form-label">
                      Select File
                    </label>
                    <div className="col-sm-10">
                      {
                        <input
                          type="file"
                          className="form-control"
                          id="input-8"
                          required
                          onChange={props.fileSelectedHandler}
                        />
                      }
                      <br />
                      <img
                        style={{ width: "100px", height: "100px" }}
                        src={props.imageName}
                        alt="IMG"
                      />
                    </div>
                  </div>

                  <div className="form-footer">
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label"></label>
                      <div className="col-sm-10">
                        <div className="btn-group">
                          <button
                            className="btn btn-success"
                            onClick={props.checkValidation}
                            style={{ cursor: "pointer" }}
                          >
                            Create
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
  );
};
export default CreateProductSlider;
