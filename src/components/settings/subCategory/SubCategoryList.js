import React from "react";

import { Link } from "react-router-dom";

const SubCategoryList = (props) => {
  var subcategoryData = props.subCategories.map(function (subCategory) {
    return (
      <tr key={subCategory.subCategoryId}>
        <td> {subCategory.subCategoryId}</td>
        <td> {subCategory.categoryName}</td>
        <td> {subCategory.subCategoryName}</td>
        <td>{subCategory.activeYn === "Y" ? "ACTIVE" : "INACTVE"}</td>
        <td>
          <div className="btn-group">
            <Link
              to={`/EditSubCategory/${subCategory.subCategoryId}/${subCategory.categoryId}/${subCategory.subCategoryName} `}
              className="btn btn-success"
            >
              Edit
            </Link>

            <button
              className="btn btn-warning"
              onClick={(event) => {
                props.deleteSubCategory(subCategory.subCategoryId);
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

                          <th>STATUS</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>{subcategoryData}</tbody>

                      <tfoot>
                        <tr>
                          <th>ID</th>
                          <th>CATEGORY</th>
                          <th>SUB CATEGORY</th>
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
export default SubCategoryList;
