import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { Loader } from '../../containers'

class PersonalInfo extends Component {
  render() {
    //const { firstName, lastName, handleChange } = this.props;

    return (
      <Formik
        initialValues={{
          sellerName: '',
          userContactNo: '',
          userEmail: '',
          acceptTerms: false,
        }}
        validationSchema={Yup.object().shape({
          sellerName: Yup.string().required('Seller name is required'),
          userContactNo: Yup.string()
            .matches(/(?=.*[0-9])/, 'Contact Number must contain number.')
            .required('Contact number is required'),
          userEmail: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),

          acceptTerms: Yup.bool().oneOf(
            [true],
            'Accept Terms & Conditions is required'
          ),
        })}
        onSubmit={async (fields, actions) => {
          //////debugger;
          //  e.preventDefault();
          this.props.nextStep(fields)
          //actions.setSubmitting(false)
          //this.props.saveSeller(fields);
        }}
        render={({ errors, touched, isSubmitting }) => (
          <section id='wrapper' className='seller-login-register'>
            <nav id='navigation' className='navbar scrollspy'>
              <div className='container'>
                <div className='navbar-brand' style={{ paddingTop: '25px' }}>
                  <Link to='/SellerHome'>
                    <img
                      src='./assets/plugins/images/sarawhite.png'
                      alt='Logo'
                    />
                  </Link>
                </div>

                <div className='menu-btn' style={{ float: 'right' }}>
                  <span>
                    <Link
                      to='#!'
                      style={{
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                    >
                      +88 01885 998899
                    </Link>
                  </span>
                </div>
              </div>
            </nav>

            <div className='login-box'>
              <div className='white-box-admin-login'>
                <div className='text-center'>
                  <h3>Seller Registration</h3>
                  {/* /STEP START/ */}
                  <div>
                    <ul
                      id='progressbar'
                      style={{
                        paddingLeft: '0',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <li className='active' id='personal'>
                        <strong>Personal</strong>
                      </li>
                      <li id='account'>
                        <strong>Account</strong>
                      </li>

                      <li id='confirm'>
                        <strong>Finish</strong>
                      </li>
                    </ul>
                  </div>
                  {/* /STEP END/ */}
                </div>
                <Form
                  className='form-horizontal form-material'
                  id='loginform'
                  style={{ marginTop: '30px' }}
                >
                  <div className='form-group '>
                    <label className='col-md-12'>Seller Name</label>
                    <div className='col-xs-12'>
                      <Field
                        type='text'
                        placeholder='Seller Name'
                        name='sellerName'
                        className={
                          'form-control' +
                          (errors.sellerName && touched.sellerName
                            ? ' is-invalid'
                            : '')
                        }
                      />
                      <ErrorMessage
                        name='sellerName'
                        component='div'
                        className='has-error'
                      />
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='col-md-12'>Seller Contact number</label>
                    <div className='col-xs-12'>
                      <Field
                        type='text'
                        placeholder='Contact number'
                        name='userContactNo'
                        className={
                          'form-control' +
                          (errors.userContactNo && touched.userContactNo
                            ? ' is-invalid'
                            : '')
                        }
                      />
                      <ErrorMessage
                        name='userContactNo'
                        component='div'
                        className='has-error'
                      />
                    </div>
                    {this.props.isContactAvailable === false ? (
                      <p
                        style={{
                          padding: '20px ',
                          color: '#FF0000',
                          margin: 'auto',
                          fontWeight: '600',
                        }}
                      >
                        This Mobile Number already exist!!!!
                      </p>
                    ) : (
                      ''
                    )}
                  </div>

                  <div className='form-group'>
                    <label className='col-md-12'>Seller Email</label>
                    <div className='col-xs-12'>
                      <Field
                        type='email'
                        placeholder='Seller Email'
                        name='userEmail'
                        className={
                          'form-control' +
                          (errors.userEmail && touched.userEmail
                            ? ' is-invalid'
                            : '')
                        }
                      />
                      <ErrorMessage
                        name='userEmail'
                        component='div'
                        className='has-error'
                      />
                    </div>
                    {this.props.isEmailAvailable === false ? (
                      <p
                        style={{
                          padding: '20px ',
                          color: '#FF0000',
                          margin: 'auto',
                          fontWeight: '600',
                        }}
                      >
                        This EMAIL already exist!!!!
                      </p>
                    ) : (
                      ''
                    )}
                  </div>

                  <div className='form-group'>
                    <div className='col-xs-12'>
                      <div className='checkbox checkbox-success'>
                        <Field
                          id='acceptTerms'
                          name='acceptTerms'
                          type='checkbox'
                          data-toggle='modal'
                          data-target='#exampleModalCenter'
                          className={
                            'form-control' +
                            (errors.acceptTerms && touched.acceptTerms
                              ? ' is-invalid'
                              : '')
                          }
                          style={{ paddingTop: '5px' }}
                        />

                        <label
                          className='col-md-12'
                          htmlFor='acceptTerms'
                          style={{ paddingTop: '5px' }}
                        >
                          &nbsp;I have read and agree the terms &amp; conditions{' '}
                        </label>
                      </div>
                      <ErrorMessage
                        name='acceptTerms'
                        component='div'
                        className='has-error'
                      />
                    </div>
                  </div>

                  <div className='form-group text-center m-t-30'>
                    <div className='col-xs-12'>
                      {this.props.sellerLoadingInfoFromReducer === false ? (
                        <button
                          // disabled={!Formik.isValid}
                          // onClick={this.continue}
                          type='submit'
                          className='btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light'
                          style={{ cursor: 'pointer' }}
                        >
                          Next
                        </button>
                      ) : (
                        <div style={{ textAlign: 'center' }}>
                          <Loader />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='form-group m-b-0'>
                    <div className='col-sm-12 text-center'>
                      <p>
                        Already have an account?{' '}
                        <Link to='/SellerLogin' className='text-primary m-l-5'>
                          <b>Sign In</b>
                        </Link>
                      </p>
                    </div>
                  </div>
                </Form>
              </div>
            </div>

            <div
              className='modal fade'
              id='exampleModalCenter'
              tabindex='-1'
              role='dialog'
              aria-labelledby='exampleModalCenterTitle'
              aria-hidden='true'
            >
              <div
                className='modal-dialog modal-dialog-centered'
                role='document'
              >
                <div className='modal-content'>
                  <div className='modal-header'>
                    <h4 className='modal-title' id='exampleModalLongTitle'>
                      Terms &amp; Conditions
                    </h4>
                  </div>
                  <div className='modal-body'>
                    <p className='terms-conditons'>
                      Terms & Conditions A. Introduction: Welcome to
                      Saralifestyle.com.bd additionally thusly known as "we",
                      "us" or "Saralifestyle". We are an online commercial
                      center and these are the terms and conditions overseeing
                      your entrance and utilization of Saralifestyle alongside
                      its related sub-areas, destinations, portable application,
                      administrations and apparatuses (the "Website"). By
                      utilizing the Site, you thusly acknowledge these terms and
                      conditions (counting the connected data in this) and speak
                      to that you consent to conform to these terms and
                      conditions (the "Client Agreement"). This User Agreement
                      is regarded as successful upon your utilization of the
                      Site which means your acknowledgment of these terms. On
                      the off chance that you don't consent to be bound by this
                      User Agreement kindly don't get to, register with or
                      utilize this Site. This Site is claimed and worked by
                      Saralifestyle Bangladesh Limited, an organization
                      consolidated under the Companies Act, 1994. The Site
                      maintains whatever authority is needed to change, adjust,
                      include, or expel bits of these Terms and Conditions
                      whenever with no earlier warning. This User Agreement is
                      regarded as successful upon your utilization of the Site
                      which means your acknowledgment of these terms. On the off
                      chance that you don't consent to be bound by this User
                      Agreement kindly don't get to, register with or utilize
                      this Site. This Site is claimed and worked by
                      Saralifestyle Bangladesh Limited, an organization
                      consolidated under the Companies Act, 1994. The Site
                      maintains whatever authority is needed to change, adjust,
                      include, or expel bits of these Terms and Conditions
                      whenever with no earlier warning.
                    </p>
                  </div>

                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-dismiss='modal'
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      />
    )
  }
}

export default PersonalInfo
