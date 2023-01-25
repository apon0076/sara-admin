import React from "react";
//import Breadcrumb from "../shared/breadcrumb/Breadcrumb";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateShop = (props) => {
  ////////debugger;

  return (
    <Formik
      initialValues={{
        shopName: "",
        bussinessTypeId: "",
        //shopDescription: "",
        binNo: "",
        shopCity: "",
        shopState: "",
        zipCode: "",
        shopAddress: "",
      }}
      validationSchema={Yup.object().shape({
        shopName: Yup.string().required("Shop name is required"),
        bussinessTypeId: Yup.string().required("Business type is required"),
        // shopDescription: Yup.string().required(
        //   "Shop description type is required"
        // ),
        binNo: Yup.string().required("Bin no is required"),
        shopCity: Yup.string().required("Shop city is required"),
        shopState: Yup.string().required("Shop state is required"),
        zipCode: Yup.string().required("Zip code is required"),
        shopAddress: Yup.string().required("Shop address is required"),
      })}
      onSubmit={(fields) => {
        //alert("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4));

        // props.saveSeller(fields);
        props.saveShop(fields);
      }}
      // onSubmit={(fields) => {
      //   alert("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4));
      //   {
      //     {
      //       props.saveShop(fields);
      //     }
      //   }
      // }}
      render={({ errors, status, touched }) => (
        <div className="page-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-success">
                  <div className="panel-heading"> Create Seller Shop</div>
                  <div
                    className="panel-wrapper collapse in"
                    aria-expanded="true"
                  >
                    <div className="panel-body">
                      <Form className="form-horizontal">
                        <div className="form-body">
                          <h3 className="box-title">Shop Info</h3>
                          <hr className="m-t-0 m-b-40" />
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label col-md-3">
                                  Shop Name
                                </label>
                                <div className="col-md-9">
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
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label col-md-3">
                                  Business Type
                                </label>
                                <div className="col-md-9">
                                  <Field
                                    as="select"
                                    name="bussinessTypeId"
                                    className={
                                      "form-control" +
                                      (errors.bussinessTypeId &&
                                      touched.bussinessTypeId
                                        ? " is-invalid"
                                        : "")
                                    }
                                  >
                                    <option value="">
                                      Select Business Type
                                    </option>

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
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label col-md-3">
                                  Bin No
                                </label>
                                <div className="col-md-9">
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
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label col-md-3">
                                  Shop City
                                </label>
                                <div className="col-md-9">
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
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label col-md-3">
                                  Shop State
                                </label>
                                <div className="col-md-9">
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
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label col-md-3">
                                  Zip Code
                                </label>
                                <div className="col-md-9">
                                  <Field
                                    type="text"
                                    placeholder="Zip code"
                                    name="zipCode"
                                    className={
                                      "form-control" +
                                      (errors.zipCode && touched.zipCode
                                        ? " is-invalid"
                                        : "")
                                    }
                                  />
                                  <ErrorMessage
                                    name="zipCode"
                                    component="div"
                                    className="has-error"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="control-label col-md-3">
                                  Full Address
                                </label>
                                <div className="col-md-9">
                                  <Field
                                    type="text"
                                    placeholder="Full Address"
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
                            </div>
                          </div>
                          <div className="form-actions">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-offset-3 col-md-9">
                                    <div className="form-actions">
                                      <button
                                        type="submit"
                                        className="btn btn-success"
                                      >
                                        <i className="fa fa-check"></i>
                                        Create
                                      </button>

                                      <button
                                        type="button"
                                        className="btn btn-default"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6"> </div>
                            </div>
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  );
};
export default CreateShop;
