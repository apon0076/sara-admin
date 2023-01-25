import React from 'react'
import { Link } from 'react-router-dom'
import * as Icon from 'react-feather'
import { Dropdown } from 'primereact/dropdown'
import { DatePicker } from 'antd'
import moment from 'moment'
import baseUrl from '../../../utils/baseUrl'

const CreateVoucher = (props) => {
  return (
    <div className='page-wrapper'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-success'>
              <div className='panel-heading'>
                {' '}
                Create Voucher{' '}
                <span style={{ float: 'right' }}>
                  <Link to='/VoucherList'>
                    <Icon.List className='text-light' />
                  </Link>
                </span>
              </div>
              <div className='panel-wrapper collapse in' aria-expanded='true'>
                <div className='panel-body'>
                  <form className='form-horizontal'>
                    <div className='form-body'>
                      <div className='row'>
                        <div className='col-sm-12 col-md-4'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Discount Type{' '}
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
                                optionLabel='productDiscountTypeName'
                                options={props.discountTypes}
                                filter
                                showClear
                                filterBy='productDiscountTypeName'
                                placeholder='Select Discount Type'
                                className='form-control'
                                name='productDiscountTypeName'
                                value={props.productDiscountTypeName}
                                onChange={props.handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-4'>
                          <label className='control_label'>
                            Voucher Name{' '}
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
                            placeholder='Voucher Name'
                            name='voucherName'
                            value={props.voucherName}
                            onChange={props.handleChange}
                            className={
                              props.errorVoucherName.length !== 0
                                ? 'errorClass form-control'
                                : 'form-control' && 'form-control'
                            }
                          />
                          {props.errorVoucherName && (
                            <span className='error'>
                              {props.errorVoucherName}
                            </span>
                          )}
                        </div>
                        <div className='col-sm-12 col-md-4'>
                          <label className='control_label'>
                            Voucher Code Name{' '}
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
                            placeholder='Voucher Code Name'
                            name='voucherCode'
                            value={props.voucherCode}
                            onChange={props.handleChange}
                            className={
                              props.errorVoucherCode.length !== 0
                                ? 'errorClass form-control'
                                : 'form-control' && 'form-control'
                            }
                          />
                          {props.errorVoucherCode && (
                            <span className='error'>
                              {props.errorVoucherCode}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-12 col-md-4'>
                          <label className='control_label'>
                            Maximum Amount Discount{' '}
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
                            placeholder='Maximum Amount Discount'
                            name='voucherMaximumAmount'
                            value={props.voucherMaximumAmount}
                            onChange={props.handleChange}
                            className={
                              props.errorVoucherMaximumAmount.length !== 0
                                ? 'errorClass form-control'
                                : 'form-control' && 'form-control'
                            }
                          />
                          {props.errorVoucherMaximumAmount && (
                            <span className='error'>
                              {props.errorVoucherMaximumAmount}
                            </span>
                          )}
                        </div>

                        <div className='col-sm-12 col-md-4'>
                          <label className='control_label'>
                            Voucher Discount Parcentage{' '}
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
                            placeholder='Voucher Discount Parcentage'
                            name='voucherDiscountPercent'
                            value={props.voucherDiscountPercent}
                            onChange={props.handleChange}
                            className={
                              props.errorVoucherDiscountPercent.length !== 0
                                ? 'errorClass form-control'
                                : 'form-control' && 'form-control'
                            }
                          />
                          {props.errorVoucherDiscountPercent && (
                            <span className='error'>
                              {props.errorVoucherDiscountPercent}
                            </span>
                          )}
                        </div>

                        <div className='col-sm-12 col-md-4'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Voucher Discount Amount{' '}
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
                              placeholder='Voucher Discount Amount'
                              name='voucherDiscountAmount'
                              value={props.voucherDiscountAmount}
                              onChange={props.handleChange}
                              className={
                                props.errorVoucherDiscountAmount.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props.errorVoucherDiscountAmount && (
                              <span className='error'>
                                {props.errorVoucherDiscountAmount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-12 col-md-4'>
                          <label className='control_label'>
                            Voucher Start Date & Time{' '}
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
                            placeholder='Select Voucher Start Date & Time'
                            defaultValue={moment}
                            onChange={(date, dateString) =>
                              props.handleVoucherStartDate(date, dateString, 1)
                            }
                          />
                        </div>
                        <div className='col-sm-12 col-md-4'>
                          <label className='control_label'>
                            Voucher End Date & Time{' '}
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
                            placeholder='Select Voucher End Date & Time'
                            defaultValue={moment}
                            onChange={(date, dateString) =>
                              props.handleVoucherEndDate(date, dateString, 2)
                            }
                          />
                          <br />
                        </div>
                        <div className='col-sm-12 col-md-3'>
                          <div className='form-group file-area'>
                            <label className='control_label'>
                              Voucher Image
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
                              name='voucherImage'
                              required='required'
                              className='form-control'
                              onChange={props.fileSelectedHandler}
                            />
                            {props.voucherImage === '' ? (
                              <div className='file-dummy'>
                                <div className='default'>
                                  Upload Voucher Logo
                                </div>
                              </div>
                            ) : (
                              <div className='file-dummy'>
                                <div className='success'>
                                  Voucher Logo Uploaded Successfully
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='col-md-1 col-sm-12'>
                          {props.showFile ? (
                            <img
                              src={props.showFile}
                              style={{
                                marginTop: '25px',
                                width: 100,
                                height: 100,
                              }}
                            />
                          ) : (
                            <img
                              src={baseUrl.concat(props.voucherImage)}
                              alt='blank'
                              style={{
                                marginTop: '25px',
                                width: 100,
                                height: 100,
                                display: 'none',
                              }}
                            />
                          )}
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-12 col-sm-12'>
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
                        </div>
                      </div>
                    </div>

                    <div className='form-footer '>
                      <div className='form-group row'>
                        <div className='text-center'>
                          <div className='btn-group text-center'>
                            <Link to='/discountTypeList'>
                              <button
                                type='submit'
                                className='btn btn-success'
                                onClick={props.saveDiscount}
                              >
                                Create
                              </button>
                            </Link>

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

export default CreateVoucher
