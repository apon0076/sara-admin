import React from 'react'
import { Link } from 'react-router-dom'
import BackTop from '../BackTop/BackTop'
import baseUrl from '../../utils/baseUrl'

const BankAccount = (props) => {
  if (props.documentUrl) {
    const imageUrl = props.documentUrl
    const result = imageUrl && imageUrl.split('/')
    var documentUrlName = result && result.slice(-1).pop()
  }

  let fieldName
  if (props.bussinessDocUrlFileName === '') {
    fieldName = documentUrlName
  } else {
    fieldName = ''
  }

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
                  <li>
                    <Link to='/ReturnAddress'>Return Address</Link>
                  </li>
                  <li className='active'>
                    <Link to='/BankAccount'>Bank Account</Link>
                  </li>
                  <li>
                    <Link to='/ReturnPolicy'>Return Policy</Link>
                  </li>
                </ul>
                <form className='form-horizontal'>
                  <div className='form-body'>
                    <h3 className='box-title'> Bank Account</h3>
                    <hr className='m-t-0 m-b-40' />
                    <div id='bank'>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label
                              className='control-label col-md-4'
                              htmlFor='name'
                            >
                              Account Title{' '}
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
                                name='accountHolderName'
                                type='text'
                                placeholder='Enter Account Title'
                                className='form-control'
                                value={props.accountHolderName || ''}
                                onChange={props.handleChange}
                              />
                              <span
                                style={{
                                  color: '#FF0000',
                                  margin: 'auto',
                                  fontWeight: '600',
                                }}
                              >
                                {props.isError.accountHolderName.length > 0 && (
                                  <span className='invalid-feedback'>
                                    {props.isError.accountHolderName}
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label
                              className='control-label col-md-4'
                              htmlFor='adminEmail'
                            >
                              Account Number{' '}
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
                                name='accountNo'
                                type='text'
                                placeholder='Enter Account Number'
                                className='form-control'
                                value={props.accountNo || ''}
                                onChange={props.handleChange}
                              />
                              <span
                                style={{
                                  color: '#FF0000',
                                  margin: 'auto',
                                  fontWeight: '600',
                                }}
                              >
                                {props.isError.accountNo.length > 0 && (
                                  <span className='invalid-feedback'>
                                    {props.isError.accountNo}
                                  </span>
                                )}
                              </span>
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
                              Bank Name{' '}
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
                              <select
                                className='form-control'
                                name='bankName'
                                value={props.bankName || ''}
                                onChange={props.handleChange}
                              >
                                <option value=''>Select Bank</option>
                                <option value='1'>Standard Chartered</option>
                                <option value='2'>Eastern Bank Ltd</option>
                                <option value='3'>Dutch Bangla Bank</option>
                                <option value='4'>Mutual Trust Bank</option>
                                <option value='5'>Brac Bank</option>
                              </select>
                              <span
                                style={{
                                  color: '#FF0000',
                                  margin: 'auto',
                                  fontWeight: '600',
                                }}
                              >
                                {props.isError.bankName.length > 0 && (
                                  <span className='invalid-feedback'>
                                    {props.isError.bankName}
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label
                              className='control-label col-md-4'
                              htmlFor='adminEmail'
                            >
                              Branch Name{' '}
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
                                name='branchName'
                                type='text'
                                placeholder='Enter Branch Name'
                                className='form-control'
                                value={props.branchName || ''}
                                onChange={props.handleChange}
                              />
                              <span
                                style={{
                                  color: '#FF0000',
                                  margin: 'auto',
                                  fontWeight: '600',
                                }}
                              >
                                {props.isError.branchName.length > 0 && (
                                  <span className='invalid-feedback'>
                                    {props.isError.branchName}
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label className='control-label col-md-4'>
                              Routing Number{' '}
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
                                name='routingNo'
                                type='text'
                                placeholder='Enter Routing Number'
                                className='form-control'
                                value={props.routingNo || ''}
                                onChange={props.handleChange}
                              />
                              <span
                                style={{
                                  color: '#FF0000',
                                  margin: 'auto',
                                  fontWeight: '600',
                                }}
                              >
                                {props.isError.routingNo.length > 0 && (
                                  <span className='invalid-feedback'>
                                    {props.isError.routingNo}
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className='row align-items-center text-center'>
                          <div className='col-md-6 col-sm-12'>
                            <div className='row'>
                              <div className='col-md-8'>
                                <div className='form-group'>
                                  <label className='control_label'>
                                    Upload Cheque Copy{' '}
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
                                  <div className='input-file-container file-area'>
                                    <input
                                      type='file'
                                      name='documentUrl'
                                      id='my-file'
                                      onChange={props.documentUrlHandler}
                                    />
                                    <div
                                      className='file-dummy'
                                      style={{
                                        width: '300px',
                                        height: '80px',
                                      }}
                                    >
                                      {props.ChequeShowFile ? (
                                        <div className='success'>
                                          {' '}
                                          Cheque Copy Selected
                                        </div>
                                      ) : (
                                        <div className='success'>
                                          Select Cheque Copy for Upload 
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-md-4'>
                                {props.ChequeShowFile ? (
                                  <img
                                    src={props.ChequeShowFile}
                                    style={{
                                      marginTop: '25px',
                                      width: 80,
                                      height: 80,
                                    }}
                                  />
                                ) : (
                                  <img
                                    src={baseUrl.concat(props.documentUrl)}
                                    alt='blank'
                                    style={{
                                      marginTop: '25px',
                                      width: 80,
                                      height: 80,
                                    }}
                                  />
                                )}
                              </div>
                            </div>
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
                            onClick={props.saveBankAccount}
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
export default BankAccount
