import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import baseUrl from "../../utils/baseUrl";

const ChangeSellerPassword = (props) => {
  useEffect(() => {
  }, [props]);
  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 col-xs-12">
            <div className="white-box">
              <div className="user-bg">
                <img
                  width="100%"
                  alt="user"
                  src="/assets/plugins/images/large/img1.jpg"
                />
                <div className="overlay-box">
                  <div className="user-content">
                    <a href="#!">
                      <img
                        //src={props.sellerImage}
                        src={baseUrl.concat(
                          props.sellerProfileById.sellerImageUrl
                        )}
                        //src="/assets/plugins/images/large/img1.jpg"
                        className="thumb-lg img-circle"
                        alt="seller"
                      />
                    </a>
                    <h4
                      className="text-white"
                      style={{ textTransform: "capitalize" }}
                    >
                      {props.sellerProfileById.sellerName}
                    </h4>
                    <h5 className="text-white">
                      {props.sellerProfileById.sellerEmail}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-8 col-xs-12">
            <div className="white-box">
              <h4>Change Password</h4>
              <div className="tab-content">
                <form className="form-horizontal form-material">
                  {/* <div className="form-group hidden">
                    <label className="col-md-12">Seller Id</label>
                    <div className="col-md-12">
                      <input
                        type="hidden"
                        placeholder="Seller Id"
                        className="form-control form-control-line"
                        name="sellerId"
                        value={props.sellerId}
                        onChange={props.handleChange}
                      />{" "}
                    </div>
                  </div> */}

                  <div className="form-group">
                    <label className="col-md-12">Email</label>
                    <div className="col-md-12">
                      <input
                        type="email"
                        placeholder="Email"
                        className="form-control form-control-line"
                        name="sellerEmail"
                        value={props.sellerEmail}
                        onChange={props.handleChange}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-md-12">Old Password</label>
                    <div className="col-md-12">
                      <input
                        type="password"
                        placeholder="*********"
                        className="form-control form-control-line"
                        name="oldPassword"
                        ref={props.inputRef}
                        // value={props.oldPassword}
                        onChange={props.handleChange}
                        onKeyPress={props.keyPressed}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-md-12">New Password</label>
                    <div className="col-md-12">
                      <input
                        type="password"
                        placeholder="*********"
                        className="form-control form-control-line"
                        name="newPassword"
                        value={props.newPassword}
                        onChange={props.handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-sm-12">
                      <button
                        onClick={props.checkValidation}
                        className="btn btn-success"
                        style={{ marginLeft: "0" }}
                      >
                        <i className="fa fa-edit"></i> Change Password
                      </button>
                      <Link to="/SellerProfile">
                        <button
                          className="btn btn-info"
                          style={{ marginLeft: "0" }}
                        >
                          <i className="fa fa-backward"></i> Go Back
                        </button>
                      </Link>
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

export default ChangeSellerPassword;
