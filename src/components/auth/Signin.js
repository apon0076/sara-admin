import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Signin = (props) => {
  const initialValues = {
    email: "",
    password: "",
    check: false,
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required("Required Field"),
        password: Yup.string().required("Required Field"),
      })}
      onSubmit={(values, { onSubmitProps }) => {
        props.submitLogin(values);
        onSubmitProps.resetForm();
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <section id="wrapper" className="login-register">
              <nav id="navigation" className="navbar scrollspy">
                <div className="container">
                  <div className="navbar-brand" style={{ paddingTop: "25px" }}>
                    <Link to="/">
                      <img
                        src="./assets/plugins/images/sarawhite.png"
                        alt="Logo"
                      />
                    </Link>
                  </div>

                  <div className="menu-btn" style={{ float: "right" }}>
                    <span>
                      <Link
                        to="#!"
                        style={{
                          color: "#fff",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        +88 01885 998899
                      </Link>
                    </span>
                  </div>
                </div>
              </nav>

              <div className="login-box">
                <div className="white-box-admin-login">
                  <div className="text-center">
                    <img
                      src="./assets/plugins/images/sara_logo.png"
                      style={{ width: "150px" }}
                      alt="sara"
                      title="SaRa"
                    />
                  </div>
                  <div
                    className="form-horizontal form-material"
                    style={{ marginTop: "20px" }}
                  >
                    {/* //formik fields */}
                    <div className="form-group ">
                      <label className="col-md-12">Email</label>
                      <div className="col-xs-12">
                        <input
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            "form-control" +
                            (errors.email && touched.email ? " is-invalid" : "")
                          }
                        />
                        {errors.email && touched.email && (
                          <div className="input-feedback">{errors.email}</div>
                        )}
                      </div>
                    </div>

                    <div className="form-group ">
                      <label className="col-md-12">Password</label>
                      <div className="col-xs-12">
                        <input
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            "form-control" +
                            (errors.password && touched.password
                              ? " is-invalid"
                              : "")
                          }
                        />
                        {errors.password && touched.password && (
                          <div className="input-feedback">
                            {errors.password}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-md-12">
                        <div className="checkbox checkbox-primary pull-left p-t-0">
                          <input
                            id="checkbox-signup"
                            type="checkbox"
                            name="check"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            checked={values.check}
                          />
                          <label htmlFor="checkbox-signup"> Remember me </label>
                        </div>
                        <Link
                          to="/ResetPasswordAdmin"
                          id="to-recover"
                          className="text-dark pull-right"
                        >
                          <i className="fa fa-lock m-r-5"></i> Forgot password?
                        </Link>{" "}
                      </div>
                    </div>

                    <div className="form-group text-center m-t-20">
                      <div className="col-xs-12">
                        <button
                          //  type="button"
                          type="submit"
                          className="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light"
                          style={{ cursor: "pointer" }}
                          // onClick={props.chekcValidation}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                    {/* //formik fields */}
                  </div>
                </div>
              </div>
            </section>
          </form>
        );
      }}
    </Formik>
  );
};

export default Signin;
