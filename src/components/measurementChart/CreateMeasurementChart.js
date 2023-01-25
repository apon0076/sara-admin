import React from "react";

const CreateMeasurementChart = (props) => {
  return (
    <div className="content-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Add Measurement Chart</div>
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
                        name="measurementChartId"
                        value={props.measurementChartId}
                        onChange={props.handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Category</label>
                    <div className="col-sm-10">
                      <select
                        className="form-control single-select"
                        name="categoryId"
                        required
                        onChange={props.handleChange}
                      >
                        <option>Select Category</option>
                        {props.categories.map((category) => (
                          <option
                            key={category.categoryId}
                            value={category.categoryId}
                          >
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">
                      Sub Category
                    </label>
                    <div className="col-sm-10">
                      <select
                        className="form-control single-select"
                        required
                        name="subCategoryId"
                        onChange={props.handleChange}
                      >
                        <option>Select Sub Category</option>
                        {props.subCategories.map((subcategory) => (
                          <option
                            key={subcategory.subCategoryId}
                            value={subcategory.subCategoryId}
                          >
                            {subcategory.subCategoryName}
                          </option>
                        ))}
                      </select>
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
                            Save
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

export default CreateMeasurementChart;
