import React from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"

const EditColor = (props) => {

  const { updateColor } = props
  const initialValues = {
    colorName: props.colorName,
    colorId: props.colorId,
    activeYn: props.activeYn,
  }

  const validationSchema = Yup.object({
    colorName: Yup.string().required("Required Field"),
  })

  const onSubmit = (values) => {
    updateColor(values)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      errors
      enableReinitialize
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          //handleChange,
          // handleBlur,
          // handleSubmit,
        } = props
        return (
          <Form>
            <div className="page-wrapper">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="panel panel-success">
                      <div className="panel-heading"> Update Color </div>
                      <div
                        className="panel-wrapper collapse in"
                        aria-expanded="true"
                      >
                        <div className="panel-body">
                          <form>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Color Name
                              </label>
                              <div className="col-sm-10">
                                <Field
                                  type="text"
                                  className="form-control"
                                  placeholder="Name"
                                  name="colorName"
                                  value={values.colorName}
                                />
                                {touched.colorName && errors.colorName ? (
                                  <div className="error">
                                    {errors.colorName}
                                  </div>
                                ) : null}
                              </div>
                            </div>

                            <div className="form-footer">
                              <div className="form-group row">
                                <label className="col-sm-2 col-form-label"></label>
                                <div className="col-sm-10">
                                  <div className="btn-group">
                                    <button
                                      className="btn btn-success"
                                      // onClick={props.updateColor}
                                      style={{ cursor: "pointer" }}
                                      disabled={isSubmitting}
                                    >
                                      Update
                                    </button>

                                    <button
                                      className="btn btn-danger"
                                      style={{ cursor: "pointer" }}
                                      onClick={props.goBack}
                                    >
                                      Clear
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default EditColor
