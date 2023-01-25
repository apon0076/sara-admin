import React from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import { Loader } from "../../containers"
import { Link } from "react-router-dom"

const ResetStep1 = (props) => {

  const initialValues = {
    email: "",
    mobileNumber: "",
    Loading: false,
  }

  const savedValues = {
    email: "",
    mobileNumber: "",
    Loading: props.TrackLoadingState.loading,
  }

  return (
    <Formik
      initialValues={savedValues || initialValues}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required("Required Field"),
        mobileNumber: Yup.string()
          .required("No number provided.")
          .matches(
            /(01[3-9]\d{8})$/,
            "Number must be a valid Bangladeshi number."
          ),
      })}
      onSubmit={(values, { onSubmitProps }) => {
        props.nextStep(values)
      }}
      enableReinitialize
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
                      Password Reset
                    </h3>
                  </div>
                  <div
                    className="form-horizontal form-material"
                    style={{ marginTop: "50px" }}
                  >

                    <div className="form-group ">
                      <label className="col-md-12">Email</label>
                      <div className="col-xs-12">
                        <input
                          name="email"
                          type="email"
                          placeholder="Enter Email Address"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
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
                      <label className="col-md-12">Mobile Number</label>
                      <div className="col-xs-12">
                        <input
                          name="mobileNumber"
                          type="text"
                          placeholder="Enter Mobile Number"
                          value={values.mobileNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                          className={
                            "form-control" +
                            (errors.mobileNumber && touched.mobileNumber
                              ? " is-invalid"
                              : "")
                          }
                        />
                        {errors.mobileNumber && touched.mobileNumber && (
                          <div className="input-feedback">
                            {errors.mobileNumber}
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
                            Next
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

export default ResetStep1