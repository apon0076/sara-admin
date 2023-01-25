import React from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const CreateColor = (props) => {
  return (
    <Formik
      initialValues={{
        colorId: 0,
        colorName: "",
        activeYn: "Y",
      }}
      validationSchema={Yup.object().shape({
        colorName: Yup.string().required("Color is required"),
      })}
      onSubmit={(fields) => {

        props.saveColor(fields);
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
                      Color Name
                      <span style={{ float: "right" }}>
                        <Link to="/Color">Color List</Link>
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
                              Color Name
                            </label>
                            <div className="col-sm-10">
                              <Field
                                type="text"
                                //  className="form-control"
                                placeholder="Color Name"
                                // required
                                name="colorName"
                                // onKeyPress={props.keyPressed}
                                value={props.colorName}
                                //  onChange={props.handleChange}
                                className={
                                  "form-control" +
                                  (errors.colorName && touched.colorName
                                    ? " is-invalid"
                                    : "")
                                }
                              />
                              <ErrorMessage
                                name="colorName"
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
                                      setFieldValue("colorName", "")
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

export default CreateColor;
