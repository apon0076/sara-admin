import React from "react"
import { Link } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import * as Icon from "react-feather"

const CreateRole = (props) => {

  return (
    <Formik
      initialValues={{
        moduleId: "",
        roleName: "",
        roleId: "",
        isActive: true,
      }}
      validationSchema={Yup.object().shape({
        roleName: Yup.string().required("Role name is required"),
        moduleId: Yup.string().required("Module type is required"),
      })}
      onSubmit={(fields, { resetForm }) => {
        props.saveRole(fields)
        resetForm()
      }}
    >
      {(props) => {
        const { values, touched, errors, handleChange } = props
        return (
          <div className="page-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="panel panel-success">
                    <div className="panel-heading">
                      {" "}
                      Create Role{" "}
                      <span style={{ float: "right" }}>
                        <Link to="/RoleList">
                          <Icon.List className="text-light" />
                        </Link>
                      </span>
                    </div>
                    <div
                      className="panel-wrapper collapse in"
                      aria-expanded="true"
                    >
                      <div className="panel-body">
                        <Form className="form-horizontal">
                          <div className="form-body">
                            <h3 className="box-title">Role Info</h3>
                            <hr className="m-t-0 m-b-40" />
                            <div className="row">
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="control-label col-md-3">
                                    Role Name
                                  </label>
                                  <div className="col-md-9">
                                    <Field
                                      type="text"
                                      placeholder="Role name"
                                      name="roleName"
                                      className={
                                        "form-control" +
                                        (errors.roleName && touched.roleName
                                          ? " is-invalid"
                                          : "")
                                      }
                                    />
                                    <ErrorMessage
                                      name="roleName"
                                      component="div"
                                      className="has-error"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <label className="control-label col-md-3">
                                    Module Type
                                  </label>
                                  <div className="col-md-9">
                                    <Field
                                      as="select"
                                      name="moduleId"
                                      className={
                                        "form-control" +
                                        (errors.moduleId && touched.moduleId
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
                                      name="moduleId"
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
                                        type="checkbox"
                                        name="isActive"
                                        onChange={handleChange}
                                        checked={values.isActive}
                                        defaultChecked={values.isActive}
                                      />
                                      <label htmlFor="isActive">
                                        {" "}
                                        Is Active ?
                                      </label>
                                      <ErrorMessage
                                        name="isActive"
                                        component="div"
                                        className="has-error"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group hidden">
                                  <label className="control-label col-md-3">
                                    Role ID
                                  </label>
                                  <div className="col-md-9">
                                    <Field
                                      type="text"
                                      placeholder="Page ID"
                                      name="roleId"
                                      className={
                                        "form-control" +
                                        (errors.roleId && touched.roleId
                                          ? " is-invalid"
                                          : "")
                                      }
                                    />
                                    <ErrorMessage
                                      name="roleId"
                                      component="div"
                                      className="has-error"
                                    />
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
        )
      }}
    </Formik>
  )
}
export default CreateRole
