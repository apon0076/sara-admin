import React from 'react'
import { Link } from 'react-router-dom'
import * as Icon from 'react-feather'

const EditCourierCost = (props) => {
  return (
    <div className='page-wrapper'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-success'>
              <div className='panel-heading'>
                {' '}
                Update Courier Cost{' '}
                <span style={{ float: 'right' }}>
                  <Link to='/CourierCostList'>
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
                              name='courierName' 
                              value={props.courierName}
                              className={
                                props.errorCustomsDutiesChargePer.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                              readOnly
                            />
                            {props.errorCustomsDutiesChargePer && (
                              <span className='error'>
                                {props.errorCustomsDutiesChargePer}
                              </span>
                            )}

                          </div>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Customs Duties Charge (%){' '}
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
                              placeholder='Enter Customs Duties Charge (%)'
                              name='customsDutiesChargePer'
                              value={props.customsDutiesChargePer}
                              onChange={props.handleChange}
                              className={
                                props.errorCustomsDutiesChargePer.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props.errorCustomsDutiesChargePer && (
                              <span className='error'>
                                {props.errorCustomsDutiesChargePer}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div class='row'>
                        <div className='col-sm-12 col-md-6'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Tax (%){' '}
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
                              placeholder='Enter Tax (%)'
                              name='taxPer'
                              value={props.taxPer}
                              onChange={props.handleChange}
                              className={
                                props.errorTaxPer.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props.errorTaxPer && (
                              <span className='error'>{props.errorTaxPer}</span>
                            )}
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <div className='form-group'>
                            <label className='control_label'>
                              VAT (%){' '}
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
                              placeholder='Enter VAT (%)'
                              name='vatPer'
                              value={props.vatPer}
                              onChange={props.handleChange}
                              className={
                                props.errorVatPer.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props.errorVatPer && (
                              <span className='error'>{props.errorVatPer}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                          <div className='form-group'>
                            <label className='control_label'>
                              AIT (%){' '}
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
                              //   rows={4}
                              type='number'
                              placeholder='Enter AIT (%)'
                              name='aitPer'
                              value={props.aitPer}
                              onChange={props.handleChange}
                              className={
                                props.errorAitPer.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props.errorAitPer && (
                              <span className='error'>{props.errorAitPer}</span>
                            )}
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Fuel Surcharge (%){' '}
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
                              placeholder='Enter Fuel Surcharge (%)'
                              name='fuelSurchargePer'
                              value={props.fuelSurchargePer}
                              onChange={props.handleChange}
                              className={
                                props.errorFuelSurchargePer.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props.errorFuelSurchargePer && (
                              <span className='error'>
                                {props.errorFuelSurchargePer}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div class='row'>
                        <div className='col-sm-12 col-md-6'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Other Cost{' '}
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
                              placeholder='Enter Other Cost'
                              name='otherCost'
                              value={props.otherCost}
                              onChange={props.handleChange}
                              className={
                                props.errorOtherCost.length !== 0
                                  ? 'errorClass form-control'
                                  : 'form-control' && 'form-control'
                              }
                            />
                            {props.errorOtherCost && (
                              <span className='error'>
                                {props.errorOtherCost}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-6'>
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
                      </div>
                    </div>

                    <div className='form-footer '>
                      <div className='form-group row'>
                        <div className='text-center'>
                          <div className='btn-group text-center'>
                              <button
                                type='submit'
                                className='btn btn-success'
                                onClick={props.saveCourierCost}
                              >
                                Update
                              </button>

                            <Link to='/CourierCostList'>
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
        </div>
      </div>
    </div>
  )
}

export default EditCourierCost
