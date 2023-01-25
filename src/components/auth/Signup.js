import React from "react";
import { Link } from "react-router-dom";

const Signup = (props) => {
  return (
    <div className="card card-authentication1 mx-auto">
      <div className="card-body">
        <div className="card-content p-2">
          <div className="text-center">
            <img
              src="./assets/images/sara_logo.png"
              style={{ width: "150px" }}
              alt="sara"
              title="SaRa"
            />
          </div>
          <div className="card-title text-uppercase text-center py-3">
            Sign Up
          </div>
          <form>
            <div className="form-group">
              <label for="exampleInputName" className="sr-only">
                Name
              </label>
              <div className="position-relative has-icon-right">
                <input
                  type="text"
                  id="exampleInputName"
                  className="form-control input-shadow"
                  placeholder="Enter Your Name"
                  name="userName"
                  value={props.userName}
                  onChange={props.handleChange}
                />
                <div className="form-control-position">
                  <i className="icon-user"></i>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label for="exampleInputEmailId" className="sr-only">
                Email ID
              </label>
              <div className="position-relative has-icon-right">
                <input
                  type="text"
                  id="exampleInputEmailId"
                  className="form-control input-shadow"
                  placeholder="Enter Your Email ID"
                  name="email"
                  value={props.email}
                  onChange={props.handleChange}
                />
                <div className="form-control-position">
                  <i className="icon-envelope-open"></i>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label for="exampleInputContactlId" className="sr-only">
                Phone No
              </label>
              <div className="position-relative has-icon-right">
                <input
                  type="text"
                  id="exampleInputPhonelId"
                  className="form-control input-shadow"
                  placeholder="Enter Your Contact No"
                  name="phoneNumber"
                  value={props.phoneNumber}
                  onChange={props.handleChange}
                />
                <div className="form-control-position">
                  <i className="icon-envelope-open"></i>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label for="exampleInputPassword" className="sr-only">
                Password
              </label>
              <div className="position-relative has-icon-right">
                <input
                  type="password"
                  id="exampleInputPassword"
                  className="form-control input-shadow"
                  placeholder="********"
                  name="userPass"
                  value={props.userPass}
                  onChange={props.handleChange}
                />
                <div className="form-control-position">
                  <i className="icon-lock"></i>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="icheck-material-primary">
                <input
                  type="checkbox"
                  id="user-checkbox"
                  name="chkTerms"
                  value={props.chkTerms}
                  onChange={props.handleChange}
                />
                <label for="user-checkbox">
                  I Agree With Terms & Conditions
                </label>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block waves-effect waves-light"
              style={{ cursor: "pointer" }}
              onClick={props.SubmitSignup}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className="card-footer text-center py-3">
        <p className="text-dark mb-0">
          Already have an account?{" "}
          <router>
            <Link to="/">Sign In here</Link>
          </router>
          {/*    <a href="authentication-signin.html"> Sign In here</a> */}
        </p>
      </div>
    </div>
  );
};

export default Signup;
