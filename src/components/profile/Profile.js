import React from 'react'
import { Link } from 'react-router-dom'
import baseUrl from '../../utils/baseUrl'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import * as Icon from 'react-feather'
import moment from 'moment'

const Profile = (props) => {
  //
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  }

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required('Enter Your Old Password.'),
    newPassword: Yup.string()
      .required('No password provided.')
      .matches(
        /^[A-Za-z\d@$!%*#?&]{10,}$/,
        'Password should be at least 10 characters.'
      ),
    newPasswordConfirm: Yup.string()
      .required('Required Field')
      .oneOf([Yup.ref('newPassword')], 'Password do not match'),
  })

  const handlePasswordChangeSubmit = async (values, onSubmitProps) => {
    props.updateAdminPassword(values)
    onSubmitProps.resetForm()
  }

  return (
    <div className='page-wrapper'>
      <div className='container-fluid'>
        {props.profileById.map((profile) => (
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
                          src={baseUrl.concat(profile.adminImageUrl)}
                          className='thumb-lg img-circle'
                          alt='img'
                        />
                      </a>
                      <h4
                        className='text-white'
                        style={{ textTransform: 'capitalize' }}
                      >
                        {profile.adminName}
                      </h4>
                      <h5 className='text-white'>{profile.designation}</h5>
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
                  <div
                    className='col-xs-9'
                    style={{
                      marginLeft: '-14px',
                    }}
                  >
                    <ul className='nav nav-tabs tabs customtab'>
                      <li className='active tab'>
                        <a href='#profile' data-toggle='tab'>
                          <span className='visible-xs'>
                            <i className='fa fa-user'></i>
                          </span>{' '}
                          <span className='hidden-xs'>Profile</span>
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
                        marginLeft: '80%',
                        paddingTop: '15px',
                      }}
                    >
                      <Link
                        to={`/EditProfile/${profile.adminId}/${profile.adminName} `}
                        data-toggle='tooltip'
                        data-placement='top'
                        title='Edit Your Profile'
                      >
                        <Icon.Edit className='text-dark' />
                      </Link>
                    </li>
                  </div>
                </div>
                {/* // */}
                <div className='tab-content'>
                  <div className='tab-pane active' id='profile'>
                    <div className='row'>
                      <div
                        className='col-md-4 col-xs-6 b-r'
                        style={{ paddingBottom: '5px' }}
                      >
                        {' '}
                        <strong>Full Name</strong>
                        <br />
                        <p className='text-muted'>{profile.adminName}</p>
                      </div>
                      <div
                        className='col-md-4 col-xs-6 b-r'
                        style={{ paddingBottom: '5px' }}
                      >
                        {' '}
                        <strong>Mobile Number</strong>
                        <br />
                        <p className='text-muted'>{profile.adminContactNo}</p>
                      </div>
                      <div
                        className='col-md-4 col-xs-6 b-r'
                        style={{ paddingBottom: '5px' }}
                      >
                        {' '}
                        <strong>Email</strong>
                        <br />
                        <p className='text-muted'>{profile.adminEmail}</p>
                      </div>
                      <div
                        className='col-md-4 col-xs-6 b-r'
                        style={{ paddingBottom: '5px' }}
                      >
                        {' '}
                        <strong>Present Address</strong>
                        <br />
                        <p className='text-muted'>
                          {profile.adminPresentAddress}
                        </p>
                      </div>
                      {/* // */}
                      <div
                        className='col-md-4 col-xs-6 b-r'
                        style={{ paddingBottom: '5px' }}
                      >
                        {' '}
                        <strong>Permanent Address</strong>
                        <br />
                        <p className='text-muted'>
                          {profile.adminPermanentAddress}
                        </p>
                      </div>
                      <div
                        className='col-md-4 col-xs-6 b-r'
                        style={{ paddingBottom: '5px' }}
                      >
                        {' '}
                        <strong>Date of Birth</strong>
                        <br />
                        <p className='text-muted'>
                          {profile.dateOfBirth &&
                          moment(profile?.dateOfBirth).format('Do MMMM, YYYY')}
                        </p>
                      </div>
                      <div
                        className='col-md-4 col-xs-6 b-r'
                        style={{ paddingBottom: '5px' }}
                      >
                        {' '}
                        <strong>Gender</strong>
                        <br />
                        <p className='text-muted'>{profile.genderName}</p>
                      </div>
                      <div
                        className='col-md-4 col-xs-6 b-r'
                        style={{ paddingBottom: '5px' }}
                      >
                        {' '}
                        <strong>NID Number</strong>
                        <br />
                        <p className='text-muted'>{profile.nidNo}</p>
                      </div>
                    </div>
                  </div>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handlePasswordChangeSubmit}
                    errors
                    // enableReinitialize
                  >
                    {(props) => {
                      const { values, touched, errors, isSubmitting } = props
                      return (
                        <div
                          className='tab-pane'
                          // href="#profile"
                          //   data-toggle="tab"
                          id='password'
                        >
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

                  {/* //Password */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile
