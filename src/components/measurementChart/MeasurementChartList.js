import React from "react";
import { Link } from "react-router-dom";
import baseUrl from "../../utils/baseUrl";

const MeasurementChartList = (props) => {
  //////debugger;
  var measurementChartData = props.measurements.map(function (measurement) {
    return (
      <tr Key={measurement.measurementChartId}>
        <td> {measurement.measurementChartId}</td>
        <td> {measurement.categoryName}</td>
        <td> {measurement.subCategoryName}</td>
        <img
          style={{ width: "50px", height: "50px" }}
          src={baseUrl.concat(measurement.measurementImage)}
          alt="IMG"
        />
        <td>
          <div className="btn-group">
            <Link
              to={`/EditBrand/${measurement.measurementChartId}`}
              className="btn btn-success"
            >
              Edit
            </Link>

            <button
              className="btn btn-warning"
              onClick={(event) => {
                props.deleteBrand(measurement.brandId);
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
                        <th>IMAGE</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>{measurementChartData}</tbody>

                    <tfoot>
                      <tr>
                        <th>ID</th>
                        <th>CATEGORY</th>
                        <th>SUB CATEGORY</th>
                        <th>IMAGE</th>
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
  );
};
export default MeasurementChartList;
