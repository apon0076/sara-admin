import React from "react";

import { Link } from "react-router-dom";

import baseUrl from "../../utils/baseUrl";

const HomePageSliderList = (props) => {
  var homePageSliderData = props.sliders.map(function (slider) {
    return (
      <tr Key={slider.sliderId}>
        <td> {slider.sliderId}</td>
        <td> {slider.sliderName}</td>
        <td> {slider.description}</td>
        <td> {slider.url}</td>
        <td> {slider.displayOrder}</td>
        <td> {slider.imageName}</td>

        <td> {slider.imageType}</td>
        <td>
          <img
            style={{ width: "50px", height: "50px" }}
            src={baseUrl.concat(slider.sliderImage)}
            alt="IMG"
          />
        </td>

        <td>{slider.activeYn === "Y" ? "ACTIVE" : "INACTVE"}</td>
        <td>
          <div className="btn-group">
            <Link
              to={`/EditHomePageSlider/${slider.sliderId}`}
              /*  to={`/Brand`} */
              className="btn btn-success"
            >
              Edit
            </Link>

            <button
              className="btn btn-warning"
              onClick={(event) => {
                props.deleteSlider(slider.sliderId);
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
                        <th>NAME</th>
                        <th>DESCRIPTION</th>
                        <th>URL</th>
                        <th>ORDER</th>
                        <th>NAME</th>
                        <th>TYPE</th>
                        <th>IMAGE</th>

                        <th>STATUS</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>{homePageSliderData}</tbody>

                    <tfoot>
                      <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>DESCRIPTION</th>
                        <th>URL</th>
                        <th>ORDER</th>
                        <th>NAME</th>
                        <th>TYPE</th>
                        <th>IMAGE</th>

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
  );
};
export default HomePageSliderList;
