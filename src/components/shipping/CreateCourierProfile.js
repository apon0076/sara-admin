import React from 'react'
import { Link } from 'react-router-dom'
import * as Icon from 'react-feather'

import baseUrl from '../../utils/baseUrl'
import { Form, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import Creatable from 'react-select/creatable'

const CreateCourierProfile = (props) => {
  const {
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  return (
    <div className='page-wrapper'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-success'>
              <div className='panel-heading'>
                {' '}
                Create Courier Profile{' '}
                <span style={{ float: 'right' }}>
                  <Link to='/CourierProfileList'>
                    <Icon.List className='text-light' />
                  </Link>
                </span>
              </div>
              <div className='panel-wrapper collapse in' aria-expanded='true'>
                <div className='panel-body'>
                  <form className='form-horizontal'>
                    <div className='form-body'>
                      <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Courier Name{' '}
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
                              placeholder='Enter Courier Name'
                              name='courierName'
                              value={props.courierName}
                              onChange={props.handleChange}
                              className={
                                props.errorCourierName.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props.errorCourierName && (
                              <span className='error'>
                                {props.errorCourierName}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <div className='form-group'>
                            <label className='control_label'>
                              URL{' '}
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
                              type='url'
                              placeholder='Enter Courier URL'
                              name='courierUrl'
                              value={props.courierUrl}
                              onChange={props.handleChange}
                              className={
                                props.errorCourierUrl.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props.errorCourierUrl && (
                              <span className='error'>
                                {props.errorCourierUrl}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div class='row'>
                        <div className='col-sm-12 col-md-6'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Contact Number{' '}
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
                              type='number'
                              placeholder='Enter Contact Number'
                              name='contactNo'
                              value={props.contactNo}
                              onChange={props.handleChange}
                              className={
                                props.errorContactNo.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props.errorContactNo && (
                              <span className='error'>
                                {props.errorContactNo}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Email{' '}
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
                              type='email'
                              placeholder='Enter Email Address'
                              name='email'
                              value={props.email}
                              onChange={props.handleChange}
                              className={
                                props.errorEmail.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props.errorEmail && (
                              <span className='error'>{props.errorEmail}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                          <div className='form-group'>
                            <label className='control_label'>
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
                            <textarea
                              rows={4}
                              type='text'
                              placeholder='Enter Address'
                              name='address'
                              value={props.address}
                              onChange={props.handleChange}
                              className={
                                props.errorAddress.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props.errorAddress && (
                              <span className='error'>
                                {props.errorAddress}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Description{' '}
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
                              rows={4}
                              type='text'
                              placeholder='Enter Description'
                              name='courierDescription'
                              value={props.courierDescription}
                              onChange={props.handleChange}
                              className={
                                props.errorCourierDescription.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props.errorCourierDescription && (
                              <span className='error'>
                                {props.errorCourierDescription}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div class='row'>
                        <div className='col-sm-12 col-md-6'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Contact Person Name{' '}
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
                              placeholder='Enter Contact Person Name'
                              name='contactPerson'
                              value={props.contactPerson}
                              onChange={props.handleChange}
                              className={
                                props.errorContactPerson.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props.errorContactPerson && (
                              <span className='error'>
                                {props.errorContactPerson}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Contact Person Number{' '}
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
                              type='number'
                              placeholder='Enter Contact Person Number'
                              name='contactPersonNo'
                              value={props.contactPersonNo}
                              onChange={props.handleChange}
                              className={
                                props.errorContactPersonNo.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props.errorContactPersonNo && (
                              <span className='error'>
                                {props.errorContactPersonNo}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div class='row'>
                        <div className='col-sm-12 col-md-4'>
                          <div className='form-group'>
                            <label className='control_label'>
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
                              type='number'
                              placeholder='Enter BIN Number'
                              name='binNo'
                              value={props.binNo}
                              onChange={props.handleChange}
                              className={
                                props.errorBinNo.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props.errorBinNo && (
                              <span className='error'>{props.errorBinNo}</span>
                            )}
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-4'>
                          <div className='form-group'>
                            <label className='control_label'>
                              VAT Number{' '}
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
                              type='number'
                              placeholder='Enter VAT Number'
                              name='vatNo'
                              value={props.vatNo}
                              onChange={props.handleChange}
                              className={
                                props.errorVatNo.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props.errorVatNo && (
                              <span className='error'>{props.errorVatNo}</span>
                            )}
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-4'>
                          <div className='form-group'>
                            <label className='control_label'>
                              TIN Number{' '}
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
                              type='number'
                              placeholder='Enter Tin Number'
                              name='etinNo'
                              value={props.etinNo}
                              onChange={props.handleChange}
                              className={
                                props.errorEtinNo.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props.errorEtinNo && (
                              <span className='error'>{props.errorEtinNo}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <Row style={{ marginTop: '5px' }}>
                        <Col xs={12} md={6}>
                          <Form.Group controlId='country'>
                            <Form.Label>
                              Country{' '}
                              <span
                                aria-hidden='true'
                                style={{
                                  color: 'red',
                                  fontWeight: 'bold',
                                }}
                              >
                                *
                              </span>
                            </Form.Label>
                            <Select
                              options={props.countryList}
                              placeholder='Select Country Name'
                              name='country'
                              value={props.country}
                              onChange={(value) =>
                                props.handleAddressChange('countryList', value)
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Group controlId='city'>
                            <Form.Label>City{' '}
                              <span
                                aria-hidden='true'
                                style={{
                                  color: 'red',
                                  fontWeight: 'bold',
                                }}
                              >
                                *
                              </span></Form.Label>
                            <Select
                              options={props.cityList}
                              name='city'
                              placeholder='Select City Name'
                              value={props.city}
                              onChange={(value) =>
                                props.handleAddressChange('cityList', value)
                              }
                              isLoading={props.loading}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row style={{ marginTop: '5px' }}>
                        <Col xs={12} md={6}>
                          <Form.Group controlId='country'>
                            <Form.Label>Area Name{' '}
                              <span
                                aria-hidden='true'
                                style={{
                                  color: 'red',
                                  fontWeight: 'bold',
                                }}
                              >
                                *
                              </span></Form.Label>
                            <Creatable
                              options={props.areaList}
                              placeholder='Select or Create Area Name'
                              name='area'
                              value={props.area}
                              onChange={(value) =>
                                props.handleAddressChange('areaList', value)
                              }
                              isLoading={props.loading}
                            />
                          </Form.Group>
                        </Col>
                        <div className='col-sm-12 col-md-6'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Zip Code{' '}
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
                              type='number'
                              placeholder='Enter Zip Code'
                              name='zipCode'
                              value={props.zipCode}
                              onChange={props.handleChange}
                              className={
                                props.errorZipCode.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props.errorZipCode && (
                              <span className='error'>
                                {props.errorZipCode}
                              </span>
                            )}
                          </div>
                        </div>
                      </Row>

                      <div className='row'>
                        <div className='col-sm-12 col-md-3'>
                          <div className='form-group'>
                            <label className='control_label'>Active </label>
                            <div className='checkbox checkbox-success d-flex align-items-center'>
                              <input
                                id='isActive'
                                type='checkbox'
                                name='isActive'
                                checked={props.isActive}
                                onChange={props.handleParentCheck}
                              />
                              <label htmlFor='isActive'> &nbsp;Yes </label>
                            </div>
                          </div>
                        </div>

                        <div className='col-sm-12 col-md-6'>
                          <div className='form-group file-area'>
                            <label className='control_label'>
                              Courier Logo Image
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
                              accept="image/*"
                              name='courierLogoUrl'
                              required='required'
                              className='form-control'
                              onChange={props.fileSelectedHandler}
                            />
                            {props.courierLogoUrl === '' ? (
                              <div className='file-dummy'>
                                <div className='default'>
                                  Please Upload Courier Logo
                                </div>
                              </div>
                            ) : (
                              <div className='file-dummy'>
                                <div className='success'>
                                  Image Uploaded Successfully
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='col-md-3 col-sm-12'>
                          {props.showFile ? (
                            <img
                              src={props.showFile}
                              style={{
                                height: '70px',
                                width: '70px',
                                borderRadius: '10px',
                                marginTop: '30px',
                              }}
                              alt='showFile'
                            />
                          ) : (
                            <img
                              src={baseUrl.concat(props.courierLogoUrl)}
                              style={{
                                height: '70px',
                                width: '70px',
                                borderRadius: '10px',
                                marginTop: '30px',
                                display: 'none',
                              }}
                              alt='courierLogoUrl'
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className='form-footer '>
                      <div className='form-group row'>
                        <div className='text-center'>
                          <div className='btn-group text-center'>
                            <button
                              type='submit'
                              className='btn btn-success'
                              onClick={props.saveCourierProfile}
                            >
                              Create
                            </button>

                            <Link to='/Home'>
                              <button
                                className='btn btn-danger'
                                style={{ cursor: 'pointer' }}
                                onClick={props.resetForm}
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
        </div>
      </div>
    </div>
  )
}

export default CreateCourierProfile
