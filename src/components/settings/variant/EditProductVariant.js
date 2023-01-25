import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import * as Icon from 'react-feather'

const initialValues = {
  productVariantId: '',
  variantName: '',
  variantDescription: '',
  variantSetupTempleteId: '',
  variantDisplayTempleteId: '',
  isActive: '',
  isDelete: '',
}

const validationSchema = Yup.object({
  variantName: Yup.string()
    .required('Required')
    .min(3, 'Variant Name must be at least 3 characters'),
  variantDescription: Yup.string()
    .required('Required')
    .min(5, 'Variant description must be at least 5 characters'),
  variantSetupTempleteId: Yup.string().required('Required'),
  variantDisplayTempleteId: Yup.string().required('Required'),
  //isActive: Yup.string().required("Required"),
})

const editProductVariant = (props) => {
  let savedData = props.formData

  const savedValues = {
    productVariantId: savedData && savedData?.productVariantId,
    variantName: savedData && savedData?.variantName,
    variantDescription: savedData && savedData?.variantDescription,
    variantSetupTempleteId: savedData && savedData?.variantSetupTempleteId,
    variantDisplayTempleteId: savedData && savedData?.variantDisplayTempleteId,
    isActive: savedData && savedData?.isActive === 'Y' ? true : false,
    isDelete: savedData && savedData?.isDelete,
    imgChgVariant: savedData && savedData?.imgChgVariant === 'Y' ? true : false,
  }

  const onSubmit = (values) => {
    props.saveProductVariant(values)
  }

  return (
    <Formik
      initialValues={savedValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      errors
      enableReinitialize
    >
      {(props) => {
        const { values, touched, errors, handleChange, isSubmitting } = props
        return (
          <Form>
            <div className='page-wrapper'>
              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='panel panel-success'>
                      <div className='panel-heading'>
                        {' '}
                        Edit Product Variant{' '}
                        <span style={{ float: 'right' }}>
                          <Link to='/ProductVariantList'>
                            <Icon.List className='text-light' />
                          </Link>
                        </span>
                      </div>
                      <div
                        className='panel-wrapper collapse in'
                        aria-expanded='true'
                      >
                        <div className='panel-body'>
                          <div className='form-body'>
                            {/* 1 */}
                            <div className='p-field p-fluid'>
                              <div className=''>
                                <div className='row'>
                                  <div className='col-md-12'>
                                    <label
                                      htmlFor='variantName'
                                      className='control_label'
                                    >
                                      Variant Name{' '}
                                      <span
                                        aria-hidden='true'
                                        style={{
                                          color: 'red',
                                          fontWeight: 'bold',
                                        }}
                                      >
                                        *
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div className='row'>
                                  <div className='col-md-12'>
                                    <Field
                                      type='text'
                                      id='variantName'
                                      name='variantName'
                                      value={values?.variantName}
                                      className={
                                        'form-control' +
                                        (errors?.variantName &&
                                        touched?.variantName
                                          ? ' is-invalid'
                                          : '')
                                      }
                                    />
                                    {touched?.variantName &&
                                    errors?.variantName ? (
                                      <div className='error'>
                                        {errors?.variantName}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* 1 end */}
                            {/* 2 */}
                            <div className='p-field p-fluid'>
                              <div className=''>
                                <div className='row'>
                                  <div className='col-md-12'>
                                    <label
                                      htmlFor='variantName'
                                      className='control_label'
                                    >
                                      Variant Description{' '}
                                      <span
                                        aria-hidden='true'
                                        style={{
                                          color: 'red',
                                          fontWeight: 'bold',
                                        }}
                                      >
                                        *
                                      </span>
                                    </label>
                                  </div>
                                </div>
                                <div className='row'>
                                  <div className='col-md-12'>
                                    <Field
                                      type='text'
                                      component='textarea'
                                      rows='4'
                                      id='variantDescription'
                                      name='variantDescription'
                                      value={values?.variantDescription}
                                      className={
                                        'form-control' +
                                        (errors?.variantDescription &&
                                        touched?.variantDescription
                                          ? ' is-invalid'
                                          : '')
                                      }
                                    />
                                    {touched?.variantDescription &&
                                    errors?.variantDescription ? (
                                      <div className='error'>
                                        {errors?.variantDescription}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* 2 end */}

                            <div className='row'>
                              <div className='col-md-6'>
                                <div className='row form-group'>
                                  <div
                                    className='col-sm-3'
                                    style={{ paddingTop: '10px' }}
                                  >
                                    <label className='control_label'>
                                      Active
                                    </label>
                                  </div>
                                  <div className='col-sm-3 checkbox checkbox-success'>
                                    <input
                                      id='isActive'
                                      type='checkbox'
                                      name='isActive'
                                      defaultChecked={values?.isActive}
                                      onChange={handleChange}
                                    />
                                    <label htmlFor='isActive'>&nbsp;Yes </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* 3 end */}
                            <div className='form-footer'>
                              <div className='form-group row'>
                                <div className='text-center'>
                                  <div className='btn-group text-center'>
                                    <button
                                      type='submit'
                                      className='btn btn-success'
                                      style={{ cursor: 'pointer' }}
                                      disabled={isSubmitting}
                                    >
                                      Update
                                    </button>
                                    <Link to='/ProductVariantList'>
                                      <button
                                        type='reset'
                                        className='btn btn-danger'
                                        style={{ cursor: 'pointer' }}
                                      >
                                        Cancel
                                      </button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
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

export default editProductVariant
