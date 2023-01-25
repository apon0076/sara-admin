import React from "react"
import { Link } from "react-router-dom"
import { Formik } from "formik"
import * as Yup from "yup"
import { Loader } from "../../containers"

const ResetStep3 = (props) => {
  const initialValues = {
    password: "",
    passwordConfirm: "",
    Loading: false,
  }

  const savedValues = {
    password: "",
    passwordConfirm: "",
    Loading: props.TrackLoadingState.loading,
  }

  return (
    <Formik
      initialValues={savedValues || initialValues}
      validationSchema={Yup.object().shape({
        password: Yup.string()
          .required("No password provided.")
          .min(6, "Password is too short - should be 6 characters minimum.")
          .matches(/(?=.*[0-9])/, "Password must contain a number."),
        passwordConfirm: Yup.string().oneOf(
          [Yup.ref("password")],
          "Passwords do not match"
        ),
      })}
      onSubmit={(values, { onSubmitProps }) => {
        props.submitResetPassword(values)
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
        } = props
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
                    <h3 style={{ fontWeight: "600", fontSize: "23px" }}>
                      Reset Password
                    </h3>
                  </div>
                  <div
                    className="form-horizontal form-material"
                    style={{ marginTop: "50px" }}
                  >
                    {/* //formik fields */}
                    <div className="form-group ">
                      <label className="col-md-12">New Password</label>
                      <div className="col-xs-12">
                        <input
                          name="password"
                          type="password"
                          placeholder="Enter New password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
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

                    <div className="form-group ">
                      <label className="col-md-12">Confirm Password</label>
                      <div className="col-xs-12">
                        <input
                          name="passwordConfirm"
                          type="password"
                          placeholder="Confirm New password"
                          value={values.passwordConfirm}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                          className={
                            "form-control" +
                            (errors.passwordConfirm && touched.passwordConfirm
                              ? " is-invalid"
                              : "")
                          }
                        />
                        {errors.passwordConfirm && touched.passwordConfirm && (
                          <div className="input-feedback">
                            {errors.passwordConfirm}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group text-center m-t-20">
                      <div className="col-xs-12">
                        {values.Loading === false ? (
                          <button
                            type="submit"
                            className="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light"
                            style={{ cursor: "pointer" }}
                          >
                            Confirm
                          </button>
                        ) : (
                          <div style={{ textAlign: "center" }}>
                            <Loader />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        )
      }}
    </Formik>
  )
}

export default ResetStep3
