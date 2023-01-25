import React from "react"
import { Link } from "react-router-dom"
import { Formik, Field } from "formik"
import * as Yup from "yup"

const ResetPasswordSeller2 = (props) => {
  const initialValues = {
    token: "",
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        token: Yup.string().required("Token is Required"),
      })}
      onSubmit={(values, { onSubmitProps }) => {
        props.tokenVerificationResponseCheck(values)
        // onSubmitProps.resetForm()
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
          setFieldValue,
          resetForm,
        } = props
        return (
          <form onSubmit={handleSubmit}>
            <section id="wrapper" className="seller-login-register">
              <nav id="navigation" className="navbar scrollspy">
                <div className="container">
                  <div className="navbar-brand" style={{ paddingTop: "25px" }}>
                    <Link to="/createseller">
                      <img
                        src="./assets/plugins/images/sara_logo.png"
                        style={{ width: "150px" }}
                        alt="sara"
                        title="SaRa"
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
                    {/* //formik fields */}
                    <div className="form-group ">
                      <label className="col-md-12">Token</label>
                      <div className="col-xs-12">
                        <input
                          name="token"
                          type="token"
                          placeholder="Enter your verification token"
                          value={values.token}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          autoComplete="off"
                          className={
                            "form-control" +
                            (errors.token && touched.token ? " is-invalid" : "")
                          }
                        />
                        {errors.token && touched.token && (
                          <div className="input-feedback">{errors.token}</div>
                        )}
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
                          {/* Continue */}
                          Next
                        </button>
                      </div>
                    </div>

                    <div className="form-group m-b-0">
                      <div className="col-sm-12 text-center">
                        <p>
                          Don't have an account?{" "}
                          <Link
                            to="/CreateSeller"
                            className="text-primary m-l-5"
                          >
                            <b>Register</b>
                          </Link>
                        </p>
                      </div>
                    </div>
                    {/* //formik fields */}
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

export default ResetPasswordSeller2
