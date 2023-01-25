import React from "react";
import Home from "../../home/Home";
import { Link } from "react-router-dom";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";

const VendorList = (props) => {
  var vendorData = props.vendors.map(function (vendor) {
    return (
      <tr key={vendor.vendorId}>
        <td> {vendor.vendorId}</td>
        <td> {vendor.vendorName}</td>
        <td> {vendor.bussinessTypeId}</td>
        <td> {vendor.binNo}</td>
        <td> {vendor.city}</td>
        <td> {vendor.state}</td>
        <td> {vendor.zipCode}</td>
        <td> {vendor.url}</td>
        <td> {vendor.contactNo}</td>
        <td> {vendor.email}</td>
        <td> {vendor.address}</td>

        <td>{vendor.activeYn === "Y" ? "ACTIVE" : "INACTVE"}</td>
        <td>
          <div className="btn-group">
            <Link
              to={`/EditVendor/${vendor.vendorId} `}
              className="btn btn-success"
            >
              Edit
            </Link>

            <button
              className="btn btn-warning"
              onClick={(event) => {
                props.deleteSeller(vendor.vendorId);
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
      <Home />

      <div className="content-wrapper">
        <div className="container-fluid">
          <Breadcrumb />

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
                          <th>VENDOR</th>
                          <th>BUSSINESS TYPE</th>
                          <th>BIN NO</th>
                          <th>CITY</th>
                          <th>STATE</th>
                          <th>ZIP CODE</th>
                          <th>URL</th>
                          <th>CONTACT NO</th>
                          <th>EMAIL</th>
                          <th>ADDRESS</th>
                          <th>STATUS</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>{vendorData}</tbody>

                      <tfoot>
                        <tr>
                          <th>ID</th>
                          <th>VENDOR</th>
                          <th>BUSSINESS TYPE</th>
                          <th>BIN NO</th>
                          <th>CITY</th>
                          <th>STATE</th>
                          <th>ZIP CODE</th>
                          <th>URL</th>
                          <th>CONTACT NO</th>
                          <th>EMAIL</th>
                          <th>ADDRESS</th>
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
export default VendorList;
