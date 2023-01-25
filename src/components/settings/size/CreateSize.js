import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateSize = (props) => {
  return (
    <Formik
      initialValues={{
        sizeId: 0,
        sizeName: "",
        activeYn: "Y",
      }}
      validationSchema={Yup.object().shape({
        sizeName: Yup.string().required("Size is required"),
      })}
      onSubmit={(fields) => {
        props.saveSize(fields);
      }}
    >
      {(props) => {
        const { touched, errors, setFieldValue } = props;
        return (
          <div className="page-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="panel panel-success">
                    <div className="panel-heading">
                      Create Size
                      <span style={{ float: "right" }}>
                        <Link to="/SizeList">Size List</Link>
                      </span>
                    </div>
                    <div
                      className="panel-wrapper collapse in"
                      aria-expanded="true"
                    >
                      <div className="panel-body">
                        <Form>
                          <div className="form-group row">
                            <label className="col-sm-2 col-form-label">
                              Size Name
                            </label>
                            <div className="col-sm-10">
                              <Field
                                type="text"
                                //  className="form-control"
                                placeholder="Size Name"
                                // required
                                name="sizeName"
                                // onKeyPress={props.keyPressed}
                                value={props.sizeName}
                                //  onChange={props.handleChange}
                                className={
                                  "form-control" +
                                  (errors.sizeName && touched.sizeName
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="sizeName"
                                component="div"
                                className="has-error"
                              />
                            </div>
                          </div>

                          <div className="form-footer">
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label"></label>
                              <div className="col-sm-10">
                                <div className="btn-group">
                                  <button
                                    className="btn btn-success"
                                    //onClick={props.saveSize}
                                    style={{ cursor: "pointer" }}
                                  >
                                    Create
                                  </button>

                                  <button
                                    className="btn btn-danger"
                                    // onClick={props.resetForm}
                                    style={{ cursor: "pointer" }}
                                    type="reset"
                                    // onClick={resetForm}
                                    onClick={() =>
                                      setFieldValue("sizeName", "")
                                    }
                                  >
                                    Clear
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
          </div>
        );
      }}
    </Formik>
  );
};

export default CreateSize;
