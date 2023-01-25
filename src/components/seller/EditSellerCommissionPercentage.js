import React from 'react'
import { Link } from 'react-router-dom'
import * as Icon from 'react-feather'
import baseUrl from '../../utils/baseUrl'

const EditSellerCommissionPercentage = (props) => {
  return (
    <div className='page-wrapper'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-success'>
              <div className='panel-heading'>
                {' '}
                Update Commission Percentage{' '}
                <span style={{ float: 'right' }}>
                  <Link to='/CommissionPercentageList'>
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
                          <label className='control_label'>
                            Local Commission (%){' '}
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
                            placeholder=' Local Commission (%)'
                            name='localCommissionPercentage'
                            value={props.localCommissionPercentage}
                            onChange={props.handleChange}
                            className={
                              props.errorLocalCommissionPercentage.length !== 0
                                ? 'errorClass form-control'
                                : 'form-control' && 'form-control'
                            }
                          />
                          {props.errorLocalCommissionPercentage && (
                            <span className='error'>
                              {props.errorLocalCommissionPercentage}
                            </span>
                          )}
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <label className='control_label'>
                            Global Commission (%){' '}
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
                            placeholder='Global Commission (%)'
                            name='globalCommissionPercentage'
                            value={props.globalCommissionPercentage}
                            onChange={props.handleChange}
                            className={
                              props.errorGlobalCommissionPercentage.length !== 0
                                ? 'errorClass form-control'
                                : 'form-control' && 'form-control'
                            }
                          />
                          {props.errorGlobalCommissionPercentage && (
                            <span className='error'>
                              {props.errorGlobalCommissionPercentage}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-sm-12 col-md-12'>
                          <label className='control_label'>
                            Commission Percentage Details{' '}
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
                            placeholder='Commission Percentage Details'
                            name='details'
                            value={props.details}
                            onChange={props.handleChange}
                            className={
                              props.errorDetails.length !== 0
                                ? 'errorClass form-control'
                                : 'form-control' && 'form-control'
                            }
                          />
                          {props.errorDetails && (
                            <span className='error'>{props.errorDetails}</span>
                          )}
                        </div>
                      </div>
                      <div class='row'>
                        <div className='col-md-6 col-sm-12'>
                          <div className='row'>
                            <div className='col-md-8'>
                              <div className='form-group'>
                                <label className='control_label'>
                                  Aggrement Document{' '}
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
                                    name='aggrementDocument'
                                    id='my-file'
                                    onChange={props.fileSelectedHandlerDoc}
                                  />
                                  <div
                                    className='file-dummy'
                                    style={{
                                      width: '300px',
                                      height: '80px',
                                    }}
                                  >
                                    {props.showFile ? (
                                      <div className='success'>
                                        {' '}
                                        Aggrement Document Selected
                                      </div>
                                    ) : (
                                      <div className='success'>
                                        Select Aggrement Document for Update
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-4'>
                              {props.showFile ? (
                                <img
                                  src={props.showFile}
                                  style={{
                                    marginTop: '25px',
                                    width: 80,
                                    height: 80,
                                  }}
                                />
                              ) : (
                                <img
                                  src={baseUrl.concat(props.aggrementDocument)}
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

                        <div className='col-sm-12 col-md-2'>
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
                        <div className='col-sm-12 col-md-2'>
                          <div className='form-group'>
                            <label className='control_label'>Approved </label>
                            <div className='checkbox checkbox-success d-flex align-items-center'>
                              <input
                                id='isApprove'
                                type='checkbox'
                                name='isApprove'
                                checked={props.isApprove}
                                onChange={props.handleApproveCheck}
                              />
                              <label htmlFor='isApprove'> &nbsp;Yes </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='form-footer '>
                      <div className='form-group row'>
                        <div className='text-center'>
                          <div className='btn-group text-center'>
                            <Link to='/CommissionPercentageList'>
                              <button
                                type='submit'
                                className='btn btn-success'
                                onClick={props.saveCommissionPercentage}
                              >
                                Update
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

export default EditSellerCommissionPercentage
