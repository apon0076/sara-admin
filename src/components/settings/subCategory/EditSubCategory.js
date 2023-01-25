import React from "react";

const EditSubCategory = (props) => {
  return (
    <div id="wrapper">
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
                          name="subCategoryId"
                          value={props.subCategoryId}
                          onChange={props.handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="input-3"
                        className="col-sm-2 col-form-label"
                      >
                        Category
                      </label>
                      <div className="col-sm-10">
                        <select
                          className="form-control"
                          name="categoryId"
                          onChange={props.handleChange}
                        >
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
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          required
                          name="subCategoryName"
                          onKeyPress={props.keyPressed}
                          value={props.subCategoryName}
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
                            defaultChecked={true}
                            onChange={props.handleChange}
                          />
                          <label htmlFor="user-checkbox">Active</label>
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
                              onClick={props.updateSubCategory}
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
export default EditSubCategory;
