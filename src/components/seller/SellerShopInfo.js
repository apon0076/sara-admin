import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Col } from 'react-bootstrap'
import Select from 'react-select'
import baseUrl from '../../utils/baseUrl'

const SellerShopInfo = (props) => {
  return (
    <div className=''>
      <section id='wrapper' className='seller-login-register-detail container-fluid'>
        <nav id='navigation' className='navbar'>
          <div className='container'>
            <div className='navbar-brand' style={{ paddingTop: '25px' }}>
              <Link to='/SellerHome'>
                <img src='./assets/plugins/images/sarawhite.png' alt='Logo' />
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
        <div className='container'>
          <div
            className='white-box-shop'
            style={{
              padding: '20px',
            }}
          >
            <div className='text-center'>
              <h3>Seller Registration</h3>
              {/* /STEP START/ */}

              <div
                style={{
                  width: '358px',
                  margin: 'auto',
                }}
              >
                <ul
                  id='progressbar'
                  style={{
                    paddingLeft: '0',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <li id='personal'>
                    <strong>Personal</strong>
                  </li>
                  <li id='account'>
                    <strong>Account</strong>
                  </li>

                  <li id='confirm' className='active'>
                    <strong>Finish</strong>
                  </li>
                </ul>
              </div>

              {/* /STEP END/ */}
            </div>

            <div className='row'>
              <div className='col-md-12 col-sm-12'>
                <form className='form-horizontal'>
                  <div className='row'>
                    <div className='col-sm-6 col-xs-12'>
                      <div className='form-group '>
                        <label>
                          Legal Seller Name{' '}
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
                        <input
                          type='text'
                          placeholder='Enter Legal Seller Name'
                          name='ownerName'
                          value={props.ownerName}
                          onChange={props.handleChange}
                          className={'form-control'}
                        />
                      </div>
                    </div>

                    <div className='col-sm-6 col-xs-12'>
                      <div className='form-group '>
                        <label>
                          Shop Name{' '}
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
                        <input
                          type='text'
                          placeholder='Enter Shop Name'
                          name='shopName'
                          value={props.shopName}
                          onChange={props.handleChange}
                          className={'form-control'}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <Col xs={12} md={4}>
                      <Form.Group controlId='country'>
                        <Form.Label>Country</Form.Label>
                        <Select
                          options={props.countryList}
                          name='country'
                          value={props.country}
                          onChange={(value) =>
                            props.handleAddressChange('countryList', value)
                          }
                        />
                      </Form.Group>
                    </Col>
                    <div className='col-md-4 col-sm-12'>
                      <div className='form-group '>
                        <label>
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
                        <input
                          type='text'
                          placeholder='Enter City Name'
                          name='shopCity'
                          value={props.shopCity}
                          onChange={props.handleChange}
                          className={'form-control'}
                        />
                      </div>
                    </div>
                    <div className='col-md-4 col-sm-12'>
                      <div className='form-group '>
                        <label>
                          Area{' '}
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
                        <input
                          type='text'
                          placeholder='Enter Area Name'
                          name='shopState'
                          value={props.shopState}
                          onChange={props.handleChange}
                          className={'form-control'}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-6 col-sm-12'>
                      <div className='form-group '>
                        <label>
                          Shop Description{' '}
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
                        <textarea
                          rows={3}
                          type='text'
                          placeholder='Enter Shop Description'
                          name='shopDescription'
                          value={props.shopDescription}
                          onChange={props.handleChange}
                          className={'form-control'}
                        />
                      </div>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                      <div className='form-group '>
                        <label>
                          Shop Address{' '}
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
                        <textarea
                          rows={3}
                          type='text'
                          placeholder='Enter Shop Address'
                          name='shopAddress'
                          value={props.shopAddress}
                          onChange={props.handleChange}
                          className={'form-control'}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-md-4 col-sm-12'>
                      <div className='form-group '>
                        <label>
                          Shop Zip Code{' '}
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
                        <input
                          type='text'
                          placeholder='Shop ZipCode'
                          name='shopZipCode'
                          value={props.shopZipCode}
                          onChange={props.handleChange}
                          className={'form-control'}
                        />
                      </div>
                    </div>
                    <div className='col-md-4 col-sm-12'>
                      <div className='form-group '>
                        <label>
                          BIN Number{' '}
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
                        <input
                          type='text'
                          placeholder='Enter BIN number'
                          name='binNo'
                          value={props.binNo}
                          onChange={props.handleChange}
                          className={'form-control'}
                        />
                      </div>
                    </div>
                    <Col xs={12} md={4}>
                      <Form.Group controlId='bussinessType'>
                        <Form.Label>Business Type</Form.Label>
                        <Select
                          options={props.bussinessTypeList}
                          name='bussinessType'
                          value={props.bussinessType}
                          onChange={(value) =>
                            props.handleBusinessTypesChange(
                              'bussinessTypeList',
                              value
                            )
                          }
                        />
                      </Form.Group>
                    </Col>
                  </div>

                  <div className='row'>
                    <div className='col-md-4 col-sm-12'>
                      <div className='row'>
                        <div className='col-sm-12 col-md-9'>
                          <div className='form-group file-area'>
                            <label className='control_label'>
                              Owner NID
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
                            <input
                              type='file'
                              name='shopNIDUrl'
                              required='required'
                              className='form-control'
                              onChange={props.fileSelectedHandlerNid}
                            />
                            {props.ownerNidUrl === '' ? (
                              <div className='file-dummy'>
                                <div className='default'>
                                  Select Owner NID for Upload
                                </div>
                              </div>
                            ) : (
                              <div className='file-dummy'>
                                <div className='success'>
                                  Owner NID Selected
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='col-md-3 col-sm-12'>
                          {props.showNIDFile ? (
                            <img
                              src={props.showNIDFile}
                              style={{
                                height: '80px',
                                width: '80px',
                                marginTop: '30px',
                              }}
                              alt='showFile'
                            />
                          ) : (
                            <img
                              src={baseUrl.concat(props.ownerNidUrl)}
                              style={{
                                height: '80px',
                                width: '250px',
                                marginTop: '30px',
                                display: 'none',
                              }}
                              alt='ownerNidUrl'
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className='col-md-4 col-sm-12'>
                      <div className='row'>
                        <div className='col-sm-12 col-md-9'>
                          <div className='form-group file-area'>
                            <label className='control_label'>
                              Shop Logo
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
                            <input
                              type='file'
                              name='shopLogoUrl'
                              required='required'
                              className='form-control'
                              onChange={props.fileSelectedHandlerLogo}
                            />
                            {props.shopLogoUrl === '' ? (
                              <div className='file-dummy'>
                                <div className='default'>
                                  Select Shop Logo for Upload
                                </div>
                              </div>
                            ) : (
                              <div className='file-dummy'>
                                <div className='success'>
                                  Shop Logo Selected
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='col-md-3 col-sm-12'>
                          {props.showShopLogoFile ? (
                            <img
                              src={props.showShopLogoFile}
                              style={{
                                height: '80px',
                                width: '80px',
                                marginTop: '30px',
                              }}
                              alt='showFile'
                            />
                          ) : (
                            <img
                              src={baseUrl.concat(props.shopLogoUrl)}
                              style={{
                                height: '80px',
                                width: '80px',
                                marginTop: '30px',
                                display: 'none',
                              }}
                              alt='ownerNidUrl'
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className='col-md-4 col-sm-12'>
                      <div className='row'>
                        <div className='col-sm-12 col-md-9'>
                          <div className='form-group file-area'>
                            <label className='control_label'>
                              Business Document
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
                            <input
                              type='file'
                              name='bussinessDocUrl'
                              required='required'
                              className='form-control'
                              onChange={props.fileSelectedHandlerBusinessDoc}
                            />
                            {props.bussinessDocUrl === '' ? (
                              <div className='file-dummy'>
                                <div className='default'>
                                  Select Business Document
                                </div>
                              </div>
                            ) : (
                              <div className='file-dummy'>
                                <div className='success'>
                                  Business Document Selected
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='col-md-3 col-sm-12'>
                          {props.showBusDocFile ? (
                            <img
                              src={props.showBusDocFile}
                              style={{
                                height: '80px',
                                width: '80px',
                                marginTop: '30px',
                              }}
                              alt='showFile'
                            />
                          ) : (
                            <img
                              src={baseUrl.concat(props.bussinessDocUrl)}
                              style={{
                                height: '80px',
                                width: '80px',
                                marginTop: '30px',
                                display: 'none',
                              }}
                              alt='ownerNidUrl'
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='form-footer '>
                    <div className='form-group row'>
                      <div className='text-center'>
                        <div className='btn-group text-center'>
                          {/* Save button */}
                          <button
                            type='submit'
                            className='btn btn-success'
                            onClick={props.saveSellerInfo}
                          >
                            Submit
                          </button>
                          {/* Cancel button */}
                          <Link to='/SellerLogin'>
                            <button
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SellerShopInfo
