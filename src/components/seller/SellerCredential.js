import { ErrorMessage, Field, Form, Formik } from "formik"
import React, { Component } from "react"
import { Link } from "react-router-dom"
import * as Yup from "yup"

class SellerCredential extends Component {
  // continue = (e) => {
  //   e.preventDefault();
  //   this.props.nextStep();
  // };

  componentDidMount = async () => {
    //var tokenId = localStorage.getItem("x-access-tokenId");
  }

  back = (e) => {
    e.preventDefault()
    this.props.prevStep()
  }

  render() {
    return (
      <Formik
        initialValues={{
          tokenCode: "",
          sellerPassword: "",
          rePassword: "",
        }}
        validationSchema={Yup.object().shape({
          tokenCode: Yup.string().required("Token code is required"),
          sellerPassword: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
          rePassword: Yup.string()
            .oneOf([Yup.ref("sellerPassword"), null], "Passwords must match")
            .required("Confirm Password is required"),
        })}
        onSubmit={async (fields, actions) => {
          //actions.setSubmitting(false)
          //props.saveSeller(fields);
          this.props.nextStepCredential(fields)
        }}
        render={({ errors, touched, isSubmitting }) => (
          <section id="wrapper" className="seller-login-register">
            <nav id="navigation" className="navbar scrollspy">
              <div className="container">
                <div className="navbar-brand" style={{ paddingTop: "25px" }}>
                  <Link to="/createseller">
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
                  <h3>Seller Registration</h3>
                  {/* /STEP START/ */}
                  <div>
                    <ul
                      id="progressbar"
                      style={{
                        paddingLeft: "0",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <li id="personal">
                        <strong>Personal</strong>
                      </li>
                      <li className="active" id="account">
                        <strong>Account</strong>
                      </li>

                      <li id="confirm">
                        <strong>Finish</strong>
                      </li>
                    </ul>
                  </div>

                  {/* /STEP END/ */}
                </div>
                <Form
                  className="form-horizontal form-material"
                  id="loginform"
                  style={{ marginTop: "30px" }}
                >
                  <div className="form-group ">
                    <label className="col-md-12">Token code</label>
                    <div className="col-xs-12">
                      <Field
                        type="text"
                        placeholder="123456"
                        name="tokenCode"
                        className={
                          "form-control" +
                          (errors.tokenCode && touched.tokenCode
                            ? " is-invalid"
                            : "")
                        }
                        autocomplete="off"
                      />
                      <ErrorMessage
                        name="tokenCode"
                        component="div"
                        className="has-error"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-md-12">Password</label>
                    <div className="col-xs-12">
                      <Field
                        type="password"
                        placeholder="********"
                        name="sellerPassword"
                        className={
                          "form-control" +
                          (errors.sellerPassword && touched.sellerPassword
                            ? " is-invalid"
                            : "")
                        }
                        autocomplete="off"
                      />
                      <ErrorMessage
                        name="sellerPassword"
                        component="div"
                        className="has-error"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-md-12">Confirm password</label>
                    <div className="col-xs-12">
                      <Field
                        type="password"
                        placeholder="********"
                        name="rePassword"
                        className={
                          "form-control" +
                          (errors.rePassword && touched.rePassword
                            ? " is-invalid"
                            : "")
                        }
                        autocomplete="off"
                      />
                      <ErrorMessage
                        name="rePassword"
                        component="div"
                        className="has-error"
                      />
                    </div>
                  </div>

                  <div className="form-group text-center m-t-20">
                    <div className="col-xs-12">
                      <button
                        disabled={isSubmitting}
                        //onClick={this.continue}
                        type="submit"
                        className="col-sm-6 btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light"
                        style={{ cursor: "pointer" }}
                      >
                        Next
                      </button>
                    </div>
                  </div>

                  <div className="form-group m-b-0">
                    <div className="col-sm-12 text-center">
                      <p>
                        Already have an account?{" "}
                        <Link to="/SellerLogin" className="text-primary m-l-5">
                          <b>Sign In</b>
                        </Link>
                      </p>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </section>
        )}
      />
    )
  }
}

export default SellerCredential
