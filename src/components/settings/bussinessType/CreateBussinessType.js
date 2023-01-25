import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../shared/breadcrumb/Breadcrumb";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateBussinessType = (props) => {
  return (
    <Formik
      initialValues={{
        bussinessTypeName: "",
      }}
      validationSchema={Yup.object().shape({
        bussinessTypeName: Yup.string().required("Bussiness type is required"),
      })}
      onSubmit={(fields) => {
        props.saveBussinessType(fields);
      }}
      render={({ errors, status, touched }) => (
        <div className="page-wrapper">
          <div className="container-fluid">
            <Breadcrumb />
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <div className="card-title">
                      Create Business Type
                      <Link to="/BussinessTypeList" className="pull-right">
                        <button
                          type="button"
                          style={{ lineHeight: "1" }}
                          className="btn btn-primary waves-effect waves-light pull-right"
                        >
                          Business Type List
                        </button>
                      </Link>
                    </div>

                    <hr />
                    <Form>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Business Type Name
                        </label>
                        <div className="col-sm-10">
                          <Field
                            type="text"
                            placeholder="BUSINESS TYPE NAME"
                            name="bussinessTypeName"
                            className={
                              "form-control" +
                              (errors.bussinessTypeName &&
                              touched.bussinessTypeName
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="bussinessTypeName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>

                      <div className="form-footer">
                        <div className="form-group row">
                          <label className="col-sm-2 col-form-label"></label>
                          <div className="col-sm-10">
                            <div className="form-group">
                              <button
                                type="submit"
                                className="btn btn-primary mr-2"
                              >
                                Create
                              </button>
                              <button
                                type="reset"
                                className="btn btn-secondary"
                              >
                                Reset
                              </button>
                            </div>
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
      )}
    />
  );
};
export default CreateBussinessType;
