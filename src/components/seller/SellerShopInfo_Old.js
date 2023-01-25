import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { Component } from "react";
import * as Yup from "yup";

class SellerShopInfo extends Component {
  constructor() {}

  render() {
    //const { jobTitle, jobCompany, jobLocation, bussinessTypeId, handleChange } = this.props;
    return (
      <Formik
        initialValues={{
          ownerName: "",
          sellerTypeId: "",
          shopName: "",
          shopDescription: "",
          binNo: "",
          shopCity: "",
          shopState: "",
          shopAddress: "",
          shopZipCode: "",
          bussinessTypeId: "",
          ownerNid: "",
          shopLogo: "",
          businessDocument: "",
        }}
        validationSchema={Yup.object().shape({
          ownerName: Yup.string().required("Owner name is required"),

          shopName: Yup.string().required("Shop name is required"),

          // ownerNid: Yup.string().required(
          //   "Owner nid is required"
          // ),

          // shopLogo: Yup.string().required(
          //   "Shop logo is required"
          // ),
          shopDescription: Yup.string().required(
            "Shop description is required"
          ),
          binNo: Yup.string().required("Bin no is required"),
          shopCity: Yup.string().required("Shop city is required"),
          shopState: Yup.string().required("Shop state is required"),
          shopAddress: Yup.string().required("Shop address is required"),
          shopZipCode: Yup.string().required("Shop xip code is required"),

          bussinessTypeId: Yup.string().required("Business type is required"),
        })}
        onSubmit={async (fields, actions) => {
          //////debugger;
          //actions.setSubmitting(false)
          //props.saveSeller(fields);
          this.props.saveSellerInfo(fields);
        }}
        render={({ errors, touched, isSubmitting }) => (
          <section id="wrapper" className="seller-login-register">
            <nav id="navigation" className="navbar scrollspy">
              <div className="container">
                <div className="navbar-brand" style={{ paddingTop: "25px" }}>
                  <a href="/createseller">
                    <img
                      src="./assets/plugins/images/sarawhite.png"
                      alt="Logo"
                    />
                  </a>
                </div>

                <div className="menu-btn" style={{ float: "right" }}>
                  <span>
                    <a
                      href="#"
                      style={{
                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      +88 01885 998899
                    </a>
                  </span>
                </div>
              </div>
            </nav>
            <div className="login-box">
              <div className="row">
                <div className="col-md-12">
                  <div className="white-box-shop">
                    <div className="text-center">
                      <h3>Seller Registration</h3>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 col-xs-12">
                        <Form
                          className="form-horizontal form-material"
                          id="loginform"
                        >
                          <div className="col-sm-6 col-xs-12 hidden">
                            <div className="form-group ">
                              <Field
                                type="hidden"
                                placeholder="Owner name"
                                name="sellerTypeId"
                                value="1"
                                className="form-control"
                              />
                            </div>
                          </div>

                          <div className="col-sm-6 col-xs-12">
                            <div className="form-group ">
                              <label>Legal Owner Name</label>
                              <Field
                                type="text"
                                placeholder="Owner name"
                                name="ownerName"
                                className={
                                  "form-control" +
                                  (errors.ownerName && touched.ownerName
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="ownerName"
                                component="div"
                                className="has-error"
                              />
                            </div>
                          </div>

                          <div className="col-sm-6 col-xs-12">
                            <div className="form-group ">
                              <label>Shop Name</label>
                              <Field
                                type="text"
                                placeholder="Shop name"
                                name="shopName"
                                className={
                                  "form-control" +
                                  (errors.shopName && touched.shopName
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="shopName"
                                component="div"
                                className="has-error"
                              />
                            </div>
                          </div>

                          {/* <div className="col-sm-6 col-xs-12">
                            <div className="form-group">
                              <label className="">Business Document</label>
                              <div className="">
                                <div
                                  className="fileinput fileinput-new input-group"
                                  data-provides="fileinput"
                                >
                                  <div className="form-control" data-trigger="fileinput">
                                    {" "}
                                    <i className="glyphicon glyphicon-file fileinput-exists"></i>{" "}
                                    <span className="fileinput-filename"></span>
                                  </div>{" "}
                                  <span className="input-group-addon btn btn-default btn-file">
                                    {" "}
                                    <span className="fileinput-new">Select file</span>{" "}
                                    <span className="fileinput-exists">Change</span>
                                    <input type="hidden" />
                                    <input type="file" name="..." />{" "}
                                  </span>
                                  <a
                                    href="#"
                                    className="input-group-addon btn btn-default fileinput-exists"
                                    data-dismiss="fileinput"
                                  >
                                    Remove
                                </a>
                                </div>
                              </div>
                            </div>
                          </div> */}

                          <div className="col-sm-6 col-xs-12">
                            <div className="form-group ">
                              <label>Shop Description</label>
                              <Field
                                type="text"
                                placeholder="Shop description"
                                name="shopDescription"
                                className={
                                  "form-control" +
                                  (errors.shopDescription &&
                                  touched.shopDescription
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="shopDescription"
                                component="div"
                                className="has-error"
                              />
                            </div>
                          </div>

                          <div className="col-sm-6 col-xs-12">
                            <div className="form-group ">
                              <label>Bin No</label>
                              <Field
                                type="text"
                                placeholder="Bin no"
                                name="binNo"
                                className={
                                  "form-control" +
                                  (errors.binNo && touched.binNo
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="binNo"
                                component="div"
                                className="has-error"
                              />
                            </div>
                          </div>

                          <div className="col-sm-6 col-xs-12">
                            <div className="form-group ">
                              <label>Shop City</label>
                              <Field
                                type="text"
                                placeholder="Shop city"
                                name="shopCity"
                                className={
                                  "form-control" +
                                  (errors.shopCity && touched.shopCity
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="shopCity"
                                component="div"
                                className="has-error"
                              />
                            </div>
                          </div>

                          <div className="col-sm-6 col-xs-12">
                            <div className="form-group ">
                              <label>Shop State</label>
                              <Field
                                type="text"
                                placeholder="Shop state"
                                name="shopState"
                                className={
                                  "form-control" +
                                  (errors.shopState && touched.shopState
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="shopState"
                                component="div"
                                className="has-error"
                              />
                            </div>
                          </div>

                          <div className="col-sm-6 col-xs-12">
                            <div className="form-group ">
                              <label>Shop Address</label>
                              <Field
                                type="text"
                                placeholder="Shop address"
                                name="shopAddress"
                                className={
                                  "form-control" +
                                  (errors.shopAddress && touched.shopAddress
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="shopAddress"
                                component="div"
                                className="has-error"
                              />
                            </div>
                          </div>

                          <div className="col-sm-6 col-xs-12">
                            <div className="form-group ">
                              <label>Shop Zip Code</label>
                              <Field
                                type="text"
                                placeholder="Zip code"
                                name="shopZipCode"
                                className={
                                  "form-control" +
                                  (errors.shopZipCode && touched.shopZipCode
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="shopZipCode"
                                component="div"
                                className="has-error"
                              />
                            </div>
                          </div>

                          <div className="col-sm-6 col-xs-12">
                            <div className="form-group">
                              <label className="">Business Type</label>

                              {/* <Field
                                    as="select"
                                    name="bussinessTypeId"
                                    onChange={this.props.handleChange}
                                    className={
                                      "form-control" +
                                      (errors.bussinessTypeId &&
                                      touched.bussinessTypeId
                                        ? " is-invalid"
                                        : "")
                                    }
                                  >

                                    <option value="4">Ecommerce</option>
                                    <option value="5">Books</option>
                                    <option value="4">Ecommerce</option>
                                    <option value="6">Electronics</option>
                                    <option value="7">Garments Product</option>
                                    <option value="8">Grocery</option>

                                  </Field>
                                  <ErrorMessage
                                    name="bussinessTypeId"
                                    component="div"
                                    className="has-error"
                                  /> */}

                              <select
                                className="form-control"
                                data-placeholder="Choose a Category"
                                tabindex="1"
                                name="bussinessTypeId"
                                required
                                onChange={this.props.handleChange}
                              >
                                <option>Select Business Type</option>
                                {this.props.bussinessTypes &&
                                  this.props.bussinessTypes.map(
                                    (businessType) => (
                                      <option
                                        key={businessType.bussinessTypeId}
                                        value={businessType.bussinessTypeId}
                                      >
                                        {businessType.bussinessTypeName}
                                      </option>
                                    )
                                  )}
                              </select>
                            </div>
                          </div>

                          <div className="col-sm-6 col-xs-12">
                            <div className="form-group ">
                              <label className="">Owner NID</label>

                              <input
                                type="file"
                                className="form-control"
                                id="input-8"
                                name="ownerNid"
                                required
                                imgExtension={[
                                  ".jpg",
                                  ".gif",
                                  ".png",
                                  ".gif",
                                  ".pdf",
                                ]}
                                multiple
                                onChange={this.props.fileMultiSelectedHandler}
                              />
                            </div>
                          </div>

                          <div className="col-sm-6 col-xs-12">
                            <div className="form-group ">
                              <label className="">Shop Logo</label>

                              <input
                                type="file"
                                className="form-control"
                                name="shopLogo"
                                id="input-8"
                                //required
                                imgExtension={[
                                  ".jpg",
                                  ".gif",
                                  ".png",
                                  ".gif",
                                  ".pdf",
                                ]}
                                multiple
                                onChange={this.props.fileSelectedHandler}
                              />
                            </div>
                          </div>

                          <div className="col-sm-6 col-xs-12">
                            <div className="form-group ">
                              <label className="">Business Document</label>
                              {
                                <input
                                  type="file"
                                  className="form-control"
                                  id="input-8"
                                  name="businessDocument"
                                  required
                                  onChange={this.props.fileSelectedHandler}
                                />
                              }
                            </div>
                          </div>

                          <div className="col-sm-6 col-xs-12">
                            <button
                              type="submit"
                              className="btn btn-success waves-effect waves-light "
                              style={{ marginLeft: "-7px" }}
                            >
                              Submit
                            </button>

                            {/* <button type="reset" className="btn btn-inverse waves-effect waves-light">Cancel</button> */}
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      />
    );
  }
}

export default SellerShopInfo;
