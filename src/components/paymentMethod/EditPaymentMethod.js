import React from 'react'
import { Link } from 'react-router-dom'
import { Editor } from 'react-draft-wysiwyg'
import * as Icon from 'react-feather'
import { DatePicker } from 'antd'
import moment from 'moment'
import baseUrl from '../../utils/baseUrl'
import { Form, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Select from 'react-select'
import Creatable from 'react-select/creatable'
import { Dropdown } from 'primereact/dropdown'

const EditPaymentMethod = (props) => {
  const {
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  return (
    <div className='page-wrapper'>
      <div className='container-fluid'>
        <Row>
          <Col xs={12} md={12}>
            <div className='panel panel-success'>
              <div className='panel-heading'>
                {' '}
                Update Payment Method{' '}
                <span style={{ float: 'right' }}>
                  <Link to='/PaymentMethodList'>
                    <Icon.List className='text-light' />
                  </Link>
                </span>
              </div>
              <div className='panel-wrapper collapse in' aria-expanded='true'>
                <div className='panel-body'>
                  <form className='form-horizontal'>
                    <div className='form-body'>
                      <Row>
                        <Col xs={12} md={12}>
                          <div className='form-group'>
                            <label className='control_label'>
                              Method Name{' '}
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
                              placeholder='Enter Method Name'
                              name='methodName'
                              value={props.methodName}
                              onChange={props.handleChange}
                              className={
                                props.errorMethodName.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props.errorMethodName && (
                              <span className='error'>
                                {props.errorMethodName}
                              </span>
                            )}
                          </div>
                        </Col>
                      </Row>
                      <div className='p-field p-fluid'>
                        <div className='form-group'>
                          <label className='control_label'>
                            Description{' '}
                            <span
                              aria-hidden='true'
                              style={{ color: 'red', fontWeight: 'bold' }}
                            >
                              *
                            </span>
                          </label>
                          <div
                            className={
                              props.errorDescription.length !== 0
                                ? 'errorClass'
                                : ''
                            }
                          >
                            <Editor
                              editorState={props.editorState}
                              toolbarClassName='toolbarClassName'
                              wrapperClassName='wrapperClassName'
                              editorClassName='form-control'
                              onEditorStateChange={props.onEditorStateChange}
                              // style={{ border: "1px solid black" }}
                              toolbar={{
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: true },
                                image: {
                                  uploadCallback: props._uploadImageCallBack,
                                },
                                inputAccept:
                                  'application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel',
                              }}
                              //style={{ height: "500px" }}
                            />
                          </div>
                          {props.errorDescription && (
                            <span className='error'>
                              {props.errorDescription}
                            </span>
                          )}
                        </div>
                      </div>

                      <Row>
                        <Col xs={12} md={12}>
                          <div className='form-group'>
                            <label className='control_label'>
                              Has Duration{' '}
                            </label>
                            <div className='checkbox checkbox-success'>
                              <input
                                id='duration'
                                type='checkbox'
                                name='duration'
                                checked={props.duration}
                                onChange={props.handleParentCheck}
                              />
                              <label htmlFor='otherCost'> &nbsp;Yes</label>
                            </div>
                          </div>
                        </Col>
                      </Row>

                      {props.duration && (
                        <div style={{ margin: '10px 0' }}>
                          <Row>
                            <Col xs={12} md={6}>
                              <label className='control_label'>
                                Start Date & Time{' '}
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
                              <DatePicker
                                showTime
                                use12Hours={true}
                                format='YYYY-MM-DD HH:mm'
                                className='form-control'
                                placeholder='Select Start Date & Time'
                                value={moment(props.startDate)}
                                onChange={(date, dateString) =>
                                  props.handleStartDate(date, dateString, 1)
                                }
                              />
                            </Col>
                            <Col xs={12} md={6}>
                              <label className='control_label'>
                                End Date & Time{' '}
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
                              <DatePicker
                                showTime
                                use12Hours={true}
                                format='YYYY-MM-DD HH:mm'
                                className='form-control'
                                placeholder='Select End Date & Time'
                                value={moment(props.endDate)}
                                onChange={(date, dateString) =>
                                  props.handleEndDate(date, dateString, 2)
                                }
                              />
                              <br />
                            </Col>
                          </Row>
                        </div>
                      )}

                      {/* <Row>
                                                <Col xs={12} md={12}>
                                                    <div className='form-group'>
                                                        <label className='control_label'>
                                                            More{' '}
                                                        </label>
                                                        <div className='checkbox checkbox-success'>
                                                            <input
                                                                id='hasMore'
                                                                type='checkbox'
                                                                name='hasMore'
                                                                checked={hasMore}
                                                                onChange={(e) => setHasMore(e.target.checked)}
                                                            />
                                                            <label htmlFor='otherCost'> &nbsp;Yes</label>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row> */}

                      {/* {hasMore || props.logo || props.web || props.webPortalLink || props.contactPerson || props.contactNo || props.contactNo || props.email || props.postalCode || props.address && ( */}
                      <>
                        <Row>
                          <Col xs={12} md={6}>
                            <div className='form-group'>
                              <label className='control_label'>Web Address</label>
                              <input
                                type='text'
                                placeholder='Enter Web Address'
                                name='web'
                                value={props.web}
                                onChange={props.handleChange}
                                className='form-control'
                              />
                            </div>
                          </Col>
                          <Col xs={12} md={6}>
                            <div className='form-group'>
                              <label className='control_label'>
                                Web Portal Link
                              </label>
                              <input
                                type='text'
                                placeholder='Enter Web Portal Link'
                                name='webPortalLink'
                                value={props.webPortalLink}
                                onChange={props.handleChange}
                                className='form-control'
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={12} md={4}>
                            <div className='form-group'>
                              <label className='control_label'>
                                Contact Person Name
                              </label>
                              <input
                                type='text'
                                placeholder='Enter Contact Person Name'
                                name='contactPerson'
                                value={props.contactPerson}
                                onChange={props.handleChange}
                                className='form-control'
                              />
                            </div>
                          </Col>
                          <Col xs={12} md={4}>
                            <div className='form-group'>
                              <label className='control_label'>
                                Contact Number
                              </label>
                              <input
                                type='number'
                                placeholder='Enter Contact Number'
                                name='contactNo'
                                value={props.contactNo}
                                onChange={props.handleChange}
                                className='form-control'
                              />
                            </div>
                          </Col>
                          <Col xs={12} md={4}>
                            <div className='form-group'>
                              <label className='control_label'>E-mail</label>
                              <input
                                type='text'
                                placeholder='Enter E-mail Address'
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
                                <span className='error'>
                                  {props.errorEmail}
                                </span>
                              )}
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={12} md={3}>
                            <Form.Group controlId='country'>
                              <Form.Label>Country</Form.Label>
                              <Select
                              placeholder='Select Country Name'
                                options={props.countryList}
                                name='country'
                                value={props.defaultCountry}
                                onChange={(value) =>
                                  props.handleAddressChange(
                                    'countryList',
                                    value
                                  )
                                }
                              />
                            </Form.Group>
                          </Col>
                          <Col xs={12} md={3}>
                            <Form.Group controlId='city'>
                              <Form.Label>City</Form.Label>
                              <Select
                              placeholder='Select City Name'
                                options={props.cityList}
                                name='city'
                                value={props.defaultCity}
                                onChange={(value) =>
                                  props.handleAddressChange('cityList', value)
                                }
                                isLoading={props.loading}
                              />
                            </Form.Group>
                          </Col>
                          <Col xs={12} md={3}>
                            <Form.Group controlId='country'>
                              <Form.Label>Area</Form.Label>
                              <Creatable
                               placeholder='Select or Create Area Name'
                                options={props.areaList}
                                name='area'
                                value={props.defaultArea}
                                onChange={(value) =>
                                  props.handleAddressChange('areaList', value)
                                }
                                isLoading={props.loading}
                              />
                            </Form.Group>
                          </Col>

                          <Col xs={12} md={3}>
                            <div className='form-group'>
                              <label className='control_label'>
                                Postal Code
                              </label>
                              <input
                                type='number'
                                placeholder='Enter Postal Code'
                                name='postalCode'
                                value={props.postalCode}
                                onChange={props.handleChange}
                                className='form-control'
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col xs={12} md={12}>
                            <div className='form-group'>
                              <label className='control_label'>Address</label>
                              <textarea
                                rows='3'
                                placeholder='Enter Address'
                                name='address'
                                value={props.address}
                                onChange={props.handleChange}
                                className='form-control'
                              />
                            </div>
                          </Col>
                        </Row>
                      </>
                      {/* )} */}

                      <Row>
                        <Col xs={12} md={4}>
                          <div className='form-group'>
                            <label className='control_label'>
                              Transaction Charge (%){' '}
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
                              placeholder='Enter Transaction Charge (%)'
                              name='tranCharge'
                              value={props.tranCharge}
                              onChange={props.handleChange}
                              className='form-control'
                            />
                          </div>
                        </Col>
                        <Col xs={12} md={4}>
                          <div className='form-group'>
                            <label className='control_label'>
                              Transaction Charge Bearer{' '}
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
                            <div className='dropdown-demo'>
                              <Dropdown
                                optionLabel='label'
                                options={props.tranChargeBearerList}
                                filter
                                showClear
                                filterBy='label'
                                placeholder='Select Transaction Charge Bearer'
                                name='tranChargeBearer'
                                value={props.tranChargeBearer}
                                onChange={props.handleChange}
                                className='form-control'
                              />
                            </div>
                          </div>
                        </Col>
                        <Col xs={12} md={4}>
                          <div className='form-group'>
                            <label className='control_label'>
                              Display Order{' '}
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
                              placeholder='Enter Display Order'
                              name='displayOrder'
                              value={props.displayOrder}
                              onChange={props.handleChange}
                              className='form-control'
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          <div className='form-group file-area'>
                            <label className='control_label'>Payment Method Logo</label>
                            <input
                              type='file'
                              accept="image/*"
                              name='logo'
                              required='required'
                              className='form-control'
                              onChange={props.logoUrlHandler}
                            />
                            {props.logo === '' ? (
                              <div className='file-dummy'>
                                <div className='default'>Upload Payment Method Logo</div>
                              </div>
                            ) : (
                              <div className='file-dummy'>
                                <div className='success'>
                                  Logo Uploaded Successfully
                                </div>
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col xs={12} md={3}>
                          {props.showLogo ? (
                            <img
                              src={props.showLogo}
                              className='thumb-md product-image'
                              style={{
                                marginTop: '30px',
                                width: '80px',
                                height: '80px',
                              }}
                              alt=''
                            />
                          ) : (
                            <img
                              src={baseUrl.concat(props.logo)}
                              className='thumb-md product-image'
                              style={{
                                marginTop: '30px',
                                width: '60px',
                                height: '60px',
                              }}
                              alt=''
                            />
                          )}
                        </Col>
                        <Col xs={12} md={3}>
                          <div className='form-group'>
                            <label className='control_label'>Active </label>
                            <div className='checkbox checkbox-success'>
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
                        </Col>
                      </Row>
                    </div>

                    <div className='form-footer' style={{ marginTop: '10px' }}>
                      <div className='form-group row'>
                        <div className='text-center'>
                          <div className='btn-group text-center'>
                            <button
                              type='submit'
                              className='btn btn-success'
                              onClick={props.savePaymentMethod}
                            >
                              Update
                            </button>
                            <Link to='/Home'>
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
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default EditPaymentMethod
