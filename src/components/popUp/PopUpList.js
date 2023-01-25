import React from "react";
import { Link } from "react-router-dom";
import baseUrl from "../../utils/baseUrl";

const PopUpList = (props) => {
  var bannerData = props.banners.map(function (banner) {
    //////debugger;
    return (
      <tr Key={banner.bannerId}>
        <td> {banner.bannerId}</td>
        <td> {banner.bannerName}</td>
        <td> {banner.imageName}</td>
        <td>
          <img
            style={{ width: "50px", height: "50px" }}
            src={baseUrl.concat(banner.bannerImage)}
            alt="IMG"
          />
        </td>

        <td>
          <div className="btn-group">
            <Link
              to={`/EditHomePageSlider/${banner.bannerId}/${banner.imageName}`}
              /*  to={`/Brand`} */
              className="btn btn-success mr-2"
            >
              Edit
            </Link>

            <button
              className="btn btn-warning"
              onClick={(event) => {
                props.deletePopUpBanner(banner.bannerId, banner.imageName);
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
        {/* <Breadcrumb /> */}
        <div className="row pt-2 pb-2">
          <div className="col-sm-9">
            <h4 className="page-title">Pop Up Banner List</h4>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#!">New</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#!">Popup</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Banner
              </li>
            </ol>
          </div>
        </div>
        {/* <!-- End Breadcrumb--> */}

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-table"></i> Pop Up Banner List
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
                    <tbody>{bannerData}</tbody>

                    {/* <tfoot>
                      <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>IMAGE NAME</th>
                        <th>IMAGE</th>
                        <th>ACTION</th>
                      </tr>
                    </tfoot> */}
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
export default PopUpList;
