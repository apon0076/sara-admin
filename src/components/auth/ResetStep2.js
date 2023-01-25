import React from "react"
import { Link } from "react-router-dom"
import { Formik, Field } from "formik"
import * as Yup from "yup"

const ResetStep2 = (props) => {
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
                          type="submit"
                          className="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light"
                          style={{ cursor: "pointer" }}
                        >
                          Next
                        </button>
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

export default ResetStep2
