import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";

const BussinessTypeList = (props) => {
  var bussinessData = props.bussinessTypes.map(function (bussinessType) {
    return (
      <tr Key={bussinessType.bussinessTypeId}>
        <td> {bussinessType.bussinessTypeId}</td>
        <td> {bussinessType.bussinessTypeName}</td>
        <td>{bussinessType.activeYn === "Y" ? "ACTIVE" : "INACTVE"}</td>
        <td>
          <div className="btn-group">
            <Link
              to={`/EditBussinessType/${bussinessType.bussinessTypeId}/${bussinessType.bussinessTypeName}`}
              className="btn btn-success mr-2"
            >
              Edit
            </Link>

            <button
              className="btn btn-danger"
              onClick={(event) => {
                props.deleteBrand(bussinessType.brandId);
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
      {/* <Home /> */}

      <div className="content-wrapper">
        <div className="container-fluid">
          <Breadcrumb />

          {/*  Table Start */}

          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <i className="fa fa-table"></i> Business Type List
                  <Link to="/CreateBussinessType">
                    <button
                      type="button"
                      className="btn btn-success waves-effect waves-light m-1 pull-right"
                    >
                      Add Business Type
                    </button>
                  </Link>
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
                          <th>NAME</th>
                          <th>STATUS</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>{bussinessData}</tbody>
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
export default BussinessTypeList;
