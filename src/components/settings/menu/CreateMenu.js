import React from "react";
import { Link } from "react-router-dom";
//import Breadcrumb from "../shared/breadcrumb/Breadcrumb";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as Icon from "react-feather"

const CreateMenu = (props) => {
  ////////debugger;

  return (
    <Formik
      initialValues={{
        moduleTypeId: "",
        parentMenuId: "",
        pageDispalyName: "",
        pageUrl: "",
        pageSerailNo: "",
        pageDescription: "",
        isActive: "",
        isUi: "",
        pageId: "",
        pageTitle: "",
      }}
      validationSchema={Yup.object().shape({
        moduleTypeId: Yup.string().required("Module type is required"),
        parentMenuId: Yup.string().required("Parent menu is required"),
        pageDispalyName: Yup.string().required("Menu name is required"),
        pageUrl: Yup.string().required("Page url is required"),
        pageSerailNo: Yup.string().required("Page serial is required"),
        pageDescription: Yup.string().required("Page description is required"),
        pageTitle: Yup.string().required("Page title is required"),
        //isActive: Yup.bool().oneOf([true], "Required"),
        //isUi: Yup.bool().oneOf([true], "Required"),
      })}
      onSubmit={(fields, { resetForm }) => {
        //alert("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4));

        props.saveMenu(fields);
        resetForm();
      }}
    >
      {(props) => {
        const {
          //values,
          touched,
          errors,
          // isSubmitting,
          // handleChange,
          // handleBlur,
          // handleSubmit,
        } = props;
        return (
          <div className="page-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="panel panel-success">
                    <div className="panel-heading">
                      {" "}
                      Create Menu{" "}
                      <span style={{ float: "right" }}>
                        <Link to="/MenuList"><Icon.List className="text-light" /></Link>
                      </span>
                    </div>
                    <div
                      className="panel-wrapper collapse in"
                      aria-expanded="true"
                    >
                      <div className="panel-body">
                        <Form className="form-horizontal">
                          <div className="form-body">
                            <h3 className="box-title">Menu Info</h3>
                            <hr className="m-t-0 m-b-40" />
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="control-label col-md-3">
                                    Module Type
                                  </label>
                                  <div className="col-md-9">
                                    <Field
                                      as="select"
                                      name="moduleTypeId"
                                      className={
                                        "form-control" +
                                        // (props.categoryName === ""
                                        //   ? "is-invalid"
                                        //   : "")
                                        (errors.moduleTypeId &&
                                        touched.moduleTypeId
                                          ? " is-invalid"
                                          : "")
                                      }
                                    >
                                      <option value="">
                                        Select Module Type
                                      </option>

                                      <option value="1">
                                        Administrator Module
                                      </option>
                                      <option value="2">Seller Module</option>
                                      <option value="4">Customer Module</option>
                                    </Field>
                                    <ErrorMessage
                                      name="moduleTypeId"
                                      component="div"
                                      className="has-error"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="control-label col-md-3">
                                    Parent Menu
                                  </label>
                                  <div className="col-md-9">
                                    <Field
                                      as="select"
                                      name="parentMenuId"
                                      className={
                                        "form-control" +
                                        (errors.parentMenuId &&
                                        touched.parentMenuId
                                          ? " is-invalid"
                                          : "")
                                      }
                                    >
                                      <option value="">
                                        Select Parent Menu Type
                                      </option>

                                      <option value="4">Ecommerce</option>
                                      <option value="5">Books</option>
                                      <option value="4">Ecommerce</option>
                                      <option value="6">Electronics</option>
                                      <option value="7">
                                        Garments Product
                                      </option>
                                      <option value="8">Grocery</option>
                                    </Field>
                                    <ErrorMessage
                                      name="parentMenuId"
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
                                    Menu Name
                                  </label>
                                  <div className="col-md-9">
                                    <Field
                                      type="text"
                                      placeholder="Menu name"
                                      name="pageDispalyName"
                                      className={
                                        "form-control" +
                                        (errors.pageDispalyName &&
                                        touched.pageDispalyName
                                          ? " is-invalid"
                                          : "")
                                      }
                                    />
                                    <ErrorMessage
                                      name="pageDispalyName"
                                      component="div"
                                      className="has-error"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="control-label col-md-3">
                                    Page URL
                                  </label>
                                  <div className="col-md-9">
                                    <Field
                                      type="text"
                                      placeholder="Page url"
                                      name="pageUrl"
                                      className={
                                        "form-control" +
                                        (errors.pageUrl && touched.pageUrl
                                          ? " is-invalid"
                                          : "")
                                      }
                                    />
                                    <ErrorMessage
                                      name="pageUrl"
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
                                    Page Serial No
                                  </label>
                                  <div className="col-md-9">
                                    <Field
                                      type="text"
                                      placeholder="Page serial no"
                                      name="pageSerailNo"
                                      className={
                                        "form-control" +
                                        (errors.pageSerailNo &&
                                        touched.pageSerailNo
                                          ? " is-invalid"
                                          : "")
                                      }
                                    />
                                    <ErrorMessage
                                      name="pageSerailNo"
                                      component="div"
                                      className="has-error"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="control-label col-md-3">
                                    Page Description
                                  </label>
                                  <div className="col-md-9">
                                    <Field
                                      type="text"
                                      placeholder="Page description"
                                      name="pageDescription"
                                      className={
                                        "form-control" +
                                        (errors.pageDescription &&
                                        touched.pageDescription
                                          ? " is-invalid"
                                          : "")
                                      }
                                    />
                                    <ErrorMessage
                                      name="pageDescription"
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
                                    Page Title
                                  </label>
                                  <div className="col-md-9">
                                    <Field
                                      type="text"
                                      placeholder="Page serial no"
                                      name="pageTitle"
                                      className={
                                        "form-control" +
                                        (errors.pageTitle && touched.pageTitle
                                          ? " is-invalid"
                                          : "")
                                      }
                                    />
                                    <ErrorMessage
                                      name="pageTitle"
                                      component="div"
                                      className="has-error"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group hidden">
                                  <label className="control-label col-md-3">
                                    Page ID
                                  </label>
                                  <div className="col-md-9">
                                    <Field
                                      type="text"
                                      placeholder="Page ID"
                                      name="pageId"
                                      className={
                                        "form-control" +
                                        (errors.pageId && touched.pageId
                                          ? " is-invalid"
                                          : "")
                                      }
                                    />
                                    <ErrorMessage
                                      name="pageId"
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
                                  <div className="col-sm-offset-3 col-sm-9">
                                    <div className="checkbox checkbox-success">
                                      <input
                                        id="checkbox33"
                                        type="checkbox"
                                        name="isActive"
                                      />
                                      <label htmlFor="checkbox33">
                                        {" "}
                                        Is Active ?
                                      </label>
                                      <ErrorMessage
                                        name="isActive"
                                        component="div"
                                        className="has-error"
                                      />

                                      {/* <Field
                                      type="checkbox"
                                      name="isActive"
                                      id="isActive"
                                      //value="Y"
                                      className={
                                        "form-check-input " +
                                        (errors.isActive && touched.isActive
                                          ? " is-invalid"
                                          : "")
                                      }
                                    />
                                    <label
                                      htmlFor="isActive"
                                      className="form-check-label"
                                    >
                                      Is Active?
                                    </label>
                                    <ErrorMessage
                                      name="isActive"
                                      component="div"
                                      className="has-error"
                                    /> */}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <div className="col-sm-offset-3 col-sm-9">
                                    <div className="checkbox checkbox-success">
                                      <input
                                        id="checkbox34"
                                        type="checkbox"
                                        name="isUi"
                                      />
                                      <label htmlFor="checkbox34">
                                        {" "}
                                        Is UI ?
                                      </label>
                                      <ErrorMessage
                                        name="isUi"
                                        component="div"
                                        className="has-error"
                                      />

                                      {/* <Field
                                      type="checkbox"
                                      name="isUi"
                                      id="isUi"
                                      className={
                                        "form-check-input " +
                                        (errors.isUi && touched.isUi
                                          ? " is-invalid"
                                          : "")
                                      }
                                    />
                                    <label
                                      htmlFor="isUi"
                                      className="form-check-label"
                                    >
                                      Is UI ?
                                    </label>
                                    <ErrorMessage
                                      name="isUi"
                                      component="div"
                                      className="has-error"
                                    /> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-actions">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="row">
                                  <div className="col-md-offset-3 col-md-9">
                                    <button
                                      type="submit"
                                      className="btn btn-success"
                                    >
                                      <i className="fa fa-check"></i> Create
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
                              <div className="col-md-6"> </div>
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
        );
      }}
    </Formik>
  );
};
export default CreateMenu;
