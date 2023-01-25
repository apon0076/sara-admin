import React from 'react'
import { Link } from 'react-router-dom'
import baseUrl from '../../utils/baseUrl'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const SellerProfile = (props) => {
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  }

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required('Enter Your Old Password.'),
    newPassword: Yup.string()
      .required('No password provided.')
      // .matches(/^.{6,}$/, "Password should be at least 6 characters."),
      .matches(
        // /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        /^[A-Za-z\d@$!%*#?&]{10,}$/,
        'Password should be at least 10 characters.'
      ),
    newPasswordConfirm: Yup.string()
      .required('Required Field')
      .oneOf([Yup.ref('newPassword')], 'Passwords do not match'),
  })

  const handlePasswordChangeSubmit = async (values, onSubmitProps) => {
    props.updateSellerPassword(values)
    onSubmitProps.resetForm()
  }

  return (
    <div className='page-wrapper'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-4 col-xs-12'>
            <div className='white-box'>
              <div className='user-bg'>
                {' '}
                <img
                  width='100%'
                  alt='user'
                  src='/assets/plugins/images/large/Sara_Logo.jpg'
                />
                <div className='overlay-box'>
                  <div className='user-content'>
                    <a>
                      <img
                        src={baseUrl.concat(
                          props.sellerProfileById.sellerImageUrl
                        )}
                        className='thumb-lg img-circle'
                        alt='img'
                      />
                    </a>
                    <h4
                      className='text-white'
                      style={{ textTransform: 'capitalize' }}
                    >
                      {props.sellerProfileById.sellerName}
                    </h4>
                    <h5 className='text-white'>
                      {props.sellerProfileById.sellerEmail}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-8 col-xs-12'>
            <div className='white-box'>
              <div
                className='row'
                style={{
                  borderBottom: '1px solid rgb(237 237 237)',
                }}
              >
                <div className='col-xs-9'>
                  <ul className='nav nav-tabs tabs customtab'>
                    <li className='active tab'>
                      <a href='#profile' data-toggle='tab'>
                        {' '}
                        <span className='visible-xs'>
                          <i className='fa fa-user'></i>
                        </span>{' '}
                        <span className='hidden-xs'>Profile Info</span>{' '}
                      </a>
                    </li>
                    <li className='tab'>
                      <a href='#password' data-toggle='tab'>
                        Change Password
                      </a>
                    </li>
                  </ul>
                </div>

                <div className='col-xs-3'>
                  <li
                    className='tab'
                    style={{
                      listStyle: 'none',
                      marginLeft: '70%',
                      paddingTop: '15px',
                    }}
                  >
                    <Link
                      to={`/EditSellerProfile/${props.sellerProfileById.sellerId}`}
                      data-toggle='tooltip'
                      data-placement='top'
                      title='Edit Your Profile'
                    >
                      <i
                        className='fa fa-edit'
                        style={{ fontSize: '25px', color: 'black' }}
                      ></i>
                    </Link>
                  </li>
                </div>
              </div>

              <div className='tab-content'>
                <div className='tab-pane active' id='profile'>
                  <div className='row'>
                    <div
                      className='col-md-3 col-xs-6'
                      style={{ paddingBottom: '5px' }}
                    >
                      {' '}
                      <strong> Account Number</strong>
                      <br />
                      <p className='text-muted'>
                        {props.sellerProfileById.sellerAcNo}
                      </p>
                    </div>
                    <div
                      className='col-md-3 col-xs-6 b-r'
                      style={{ paddingBottom: '5px' }}
                    >
                      {' '}
                      <strong>Full Name</strong>
                      <br />
                      <p className='text-muted'>
                        {props.sellerProfileById.sellerName}
                      </p>
                    </div>
                    <div
                      className='col-md-3 col-xs-6 b-r'
                      style={{ paddingBottom: '5px' }}
                    >
                      {' '}
                      <strong>Mobile Number</strong>
                      <br />
                      <p className='text-muted'>
                        {props.sellerProfileById.sellerContactNo}
                      </p>
                    </div>
                    <div
                      className='col-md-3 col-xs-6 b-r'
                      style={{ paddingBottom: '5px' }}
                    >
                      {' '}
                      <strong>Email</strong>
                      <br />
                      <p className='text-muted'>
                        {props.sellerProfileById.sellerEmail}
                      </p>
                    </div>

                    <div
                      className='col-md-3 col-xs-6'
                      style={{ paddingBottom: '5px' }}
                    >
                      {' '}
                      <strong>Present Address</strong>
                      <br />
                      <p className='text-muted'>
                        {props.sellerProfileById.sellerPresentAddress}
                      </p>
                    </div>
                    <div
                      className='col-md-3 col-xs-6'
                      style={{ paddingBottom: '5px' }}
                    >
                      {' '}
                      <strong>Permanent Address</strong>
                      <br />
                      <p className='text-muted'>
                        {props.sellerProfileById.sellerPermanentAddress}
                      </p>
                    </div>
                    <div
                      className='col-md-3 col-xs-6'
                      style={{ paddingBottom: '5px' }}
                    >
                      {' '}
                      <strong>Created At</strong>
                      <br />
                      <p className='text-muted'>
                        {props.sellerProfileById.createDate &&
                          props.sellerProfileById.createDate.substring(0, 10)}
                      </p>
                    </div>
                  </div>
                </div>
                {/* ///  */}
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handlePasswordChangeSubmit}
                  errors
                >
                  {(props) => {
                    const { values, touched, errors, isSubmitting } = props
                    return (
                      <div className='tab-pane' id='password'>
                        <Form className='ps-form--account'>
                          <div className=''>
                            <div className='tab-content'>
                              <div className='form-horizontal form-material'>
                                <div className='form-group'>
                                  <label className='col-md-12'>
                                    Old Password
                                  </label>
                                  <div className='col-md-12'>
                                    <Field
                                      name='oldPassword'
                                      type='password'
                                      placeholder='******'
                                      value={values.oldPassword}
                                      className={`form-control ${
                                        errors.oldPassword &&
                                        touched.oldPassword &&
                                        'error is-invalid'
                                      }`}
                                      
                                    />
                                    {errors.oldPassword &&
                                      touched.oldPassword && (
                                        <div className='input-feedback'>
                                          {errors.oldPassword}
                                        </div>
                                      )}
                                  </div>
                                </div>
                                <div className='form-group'>
                                  <label className='col-md-12'>
                                    New Password
                                  </label>
                                  <div className='col-md-12'>
                                    <Field
                                      name='newPassword'
                                      type='password'
                                      placeholder='******'
                                      value={values.newPassword}
                                      className={`form-control ${
                                        errors.newPassword &&
                                        touched.newPassword &&
                                        'error is-invalid'
                                      }`}
                                    />
                                    {errors.newPassword &&
                                      touched.newPassword && (
                                        <div className='input-feedback'>
                                          {errors.newPassword}
                                        </div>
                                      )}
                                  </div>
                                </div>
                                <div className='form-group'>
                                  <label className='col-md-12'>
                                    Confirm New Password
                                  </label>
                                  <div className='col-md-12'>
                                    <Field
                                      name='newPasswordConfirm'
                                      type='password'
                                      placeholder='******'
                                      value={values.newPasswordConfirm}
                                      className={`form-control ${
                                        errors.newPasswordConfirm &&
                                        touched.newPasswordConfirm &&
                                        'error is-invalid'
                                      }`}
                                    />
                                    {errors.newPasswordConfirm &&
                                      touched.newPasswordConfirm && (
                                        <div className='input-feedback'>
                                          {errors.newPasswordConfirm}
                                        </div>
                                      )}
                                  </div>
                                </div>
                                <div
                                  className='form-group submit'
                                  style={{
                                    textAlign: 'center',
                                    marginTop: '36px',
                                  }}
                                >
                                  <div className='col-sm-12'>
                                    <button
                                      type='submit'
                                      className='btn btn-success '
                                      style={{ marginLeft: '0' }}
                                      disabled={isSubmitting}
                                    >
                                      Change Password
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Form>
                      </div>
                    )
                  }}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerProfile
