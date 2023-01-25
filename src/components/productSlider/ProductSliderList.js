import React from "react";
import Home from "../home/Home";
import { Link } from "react-router-dom";
import Breadcrumb from "../shared/breadcrumb/Breadcrumb";
import baseUrl from "../../utils/baseUrl";

const ProductSliderList = (props) => {
  var sliderData = props.sliders.map(function (slider) {
    //////debugger;
    return (
      <tr Key={slider.sliderId}>
        <td> {slider.sliderId}</td>
        <td> {slider.sliderName}</td>
        <td> {slider.imageName}</td>
        <td>
          <img
            style={{ width: "50px", height: "50px" }}
            src={baseUrl.concat(slider.sliderImage)}
            alt="IMG"
          />
        </td>

        <td>
          <div className="btn-group">
            <Link
              to={`/EditHomePageSlider/${slider.sliderId}/${slider.imageName}`}
              /*  to={`/Brand`} */
              className="btn btn-success"
            >
              Edit
            </Link>

            <button
              className="btn btn-warning"
              onClick={(event) => {
                props.deleteProductSlider(slider.sliderId, slider.imageName);
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
                          <th>NAME</th>
                          <th>IMAGE NAME</th>
                          <th>IMAGE</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>{sliderData}</tbody>

                      <tfoot>
                        <tr>
                          <th>ID</th>
                          <th>NAME</th>
                          <th>IMAGE NAME</th>
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
      {/*  Table End */}
    </div>
  );
};
export default ProductSliderList;
