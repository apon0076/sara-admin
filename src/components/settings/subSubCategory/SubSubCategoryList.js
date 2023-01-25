import React from "react";

import { Link } from "react-router-dom";

const SubSubCategoryList = (props) => {
  var subSubcategoryData = props.subSubCategories.map(function (
    subSubCategory
  ) {
    return (
      <tr Key={subSubCategory.subSubCategoryId}>
        <td> {subSubCategory.subSubCategoryId}</td>
        <td> {subSubCategory.categoryId}</td>
        <td> {subSubCategory.subCategoryId}</td>
        <td> {subSubCategory.subSubCategoryName}</td>
        <td>{subSubCategory.activeYn === "Y" ? "ACTIVE" : "INACTVE"}</td>
        <td>
          <div className="btn-group">
            <Link
              to={`/EditSubSubCategory/${subSubCategory.subSubCategoryId}/${subSubCategory.categoryId}/${subSubCategory.subCategoryId}/${subSubCategory.subSubCategoryName} `}
              className="btn btn-success"
            >
              Edit
            </Link>

            <button
              className="btn btn-warning"
              onClick={(event) => {
                props.deleteSubSubCategory(subSubCategory.subSubCategoryId);
              }}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div id="wrapper">
      <div className="content-wrapper">
        <div className="container-fluid">
          {/*  Table Start */}

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <i className="fa fa-table"></i> Data Exporting
                </div>

                <ul className="navbar-nav mr-auto align-items-center">
                  <li className="nav-item">
                    <a className="nav-link toggle-menu" href="#!">
                      <i></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <form className="search-bar">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter keywords"
                        name="searchId"
                        value={props.searchId}
                        onChange={props.handleChange}
                      />
                      <a href="#!">
                        <i
                          className="icon-magnifier"
                          style={{ cursor: "pointer" }}
                        ></i>
                      </a>
                    </form>
                  </li>
                </ul>

                <div className="card-body">
                  <div className="table-responsive">
                    <table id="example" className="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>CATEGORY</th>
                          <th>SUB CATEGORY</th>
                          <th>SUB SUB CATEGORY</th>
                          <th>STATUS</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>{subSubcategoryData}</tbody>

                      <tfoot>
                        <tr>
                          <th>ID</th>
                          <th>CATEGORY</th>
                          <th>SUB CATEGORY</th>
                          <th>SUB SUB CATEGORY</th>
                          <th>STATUS</th>
                          <th>ACTION</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  Table End */}
    </div>
  );
};
export default SubSubCategoryList;
