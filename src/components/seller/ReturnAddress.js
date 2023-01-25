import React from 'react'
import { Link } from 'react-router-dom'
import BackTop from '../BackTop/BackTop'

const ReturnAddress = (props) => {
  return (
    <>
      <div className='page-wrapper'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='white-box'>
                <h3 className='box-title m-b-0'>Account &#38; Settings</h3>
                <p className='text-muted m-b-15'>Update Profile Information</p>
                <ul className='nav nav-tabs seller-tabs'>
                  <li>
                    <Link to='/BusinessInformation'>Business Information</Link>
                  </li>
                  <li>
                    <Link to='/ShippingProvider'>Shipping Provider</Link>
                  </li>
                  <li>
                    <Link to='/WarehouseAddress'>Warehouse Address</Link>
                  </li>
                  <li className='active'>
                    <Link to='/ReturnAddress'>Return Address</Link>
                  </li>
                  <li>
                    <Link to='/BankAccount'>Bank Account</Link>
                  </li>
                  <li>
                    <Link to='/ReturnPolicy'>Return Policy</Link>
                  </li>
                </ul>
                <form className='form-horizontal'>
                  <div className='form-body'>
                    <h3 className='box-title'> Return Address</h3>
                    <hr className='m-t-0 m-b-40' />
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='form-group'>
                          <label
                            className='control-label col-md-4'
                            htmlFor='name'
                          >
                            Full Name{' '}
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
                          <div className='col-md-8'>
                            <input
                              name='fullName'
                              type='string'
                              placeholder='Enter Your Name'
                              className='form-control'
                              value={props.fullName || ''}
                              onChange={props.handleChange}
                            />
                            <span
                              style={{
                                color: '#FF0000',
                                margin: 'auto',
                                fontWeight: '600',
                              }}
                            >
                              {props.isError.fullName.length > 0 && (
                                <span className='invalid-feedback'>
                                  {props.isError.fullName}
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* 1.2 */}
                      <div className='col-md-6'>
                        <div className='form-group'>
                          <label
                            className='control-label col-md-4'
                            htmlFor='phoneNo'
                          >
                            Mobile number{' '}
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
                          <div className='col-md-8'>
                            <input
                              name='phoneNo'
                              type='string'
                              placeholder='Enter Mobile Number'
                              className='form-control'
                              value={props.phoneNo || ''}
                              onChange={props.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='form-group'>
                          <label
                            className='control-label col-md-4'
                            htmlFor='address'
                          >
                            Address{' '}
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
                          <div className='col-md-8'>
                            <input
                              name='address'
                              type='string'
                              placeholder='Enter Address'
                              className='form-control'
                              value={props.address || ''}
                              onChange={props.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      {/* 2.2 */}
                      <div className='col-md-6'>
                        <div className='form-group'>
                          <label
                            className='control-label col-md-4'
                            htmlFor='division'
                          >
                            Division{' '}
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
                          <div className='col-md-8'>
                            <input
                              name='division'
                              type='string'
                              placeholder='Enter Division'
                              className='form-control'
                              value={props.division || ''}
                              onChange={props.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className='form-group'>
                          <label
                            className='control-label col-md-4'
                            htmlFor='name'
                          >
                            City{' '}
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
                          <div className='col-md-8'>
                            <input
                              name='city'
                              type='string'
                              placeholder='Enter City'
                              className='form-control'
                              value={props.city || ''}
                              onChange={props.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      {/* 3.2 */}
                      <div className='col-md-6'>
                        <div className='form-group'>
                          <label
                            className='control-label col-md-4'
                            htmlFor='postCode'
                          >
                            Post Code{' '}
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
                          <div className='col-md-8'>
                            <input
                              name='postCode'
                              type='string'
                              placeholder='Enter Post Code'
                              className='form-control'
                              value={props.postCode || ''}
                              onChange={props.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className='form-footer '
                    style={{
                      textAlign: 'center',
                      paddingTop: ' 40px',
                    }}
                  >
                    <div className='form-group row'>
                      <div className='text-center'>
                        <div className='btn-group text-center'>
                          <button
                            type='submit'
                            className='btn btn-success'
                            onClick={props.saveAdddress}
                          >
                            Update
                          </button>
                          <Link to='/SellerHome'>
                            <button type='button' className='btn btn-default'>
                              Cancel
                            </button>
                          </Link>
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
      <BackTop />
    </>
  )
}
export default ReturnAddress
