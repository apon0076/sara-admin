import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as Icon from 'react-feather'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const EditReturnPolicy = (props) => {

  const [returnPolicy, setReturnPolicy] = useState('')
  useEffect(() => {
    setReturnPolicy(props.returnPolicy)
  }, [props.returnPolicy])

  return (
    <div className='page-wrapper'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-success'>
              <div className='panel-heading'>
                {' '}
                Update{' '}
                {props.isApprove === 'Y' ? (
                  <> Approved </>
                ) : props.isApprove === 'N' ? (
                  <> Pending </>
                ) : (
                  <> Rejected </>
                )}
                Return Policy{' '}
                <span style={{ float: 'right' }}>
                  {props.isApprove === 'Y' ? (
                    <Link to='/approvedReturnPolicy'>
                      <Icon.List className='text-light' />
                    </Link>
                  ) : props.isApprove === 'N' ? (
                    <Link to='/pendingReturnPolicy'>
                      <Icon.List className='text-light' />
                    </Link>
                  ) : (
                    <Link to='/rejectedReturnPolicy'>
                      <Icon.List className='text-light' />
                    </Link>
                  )}
                </span>
              </div>
              <div className='panel-wrapper collapse in' aria-expanded='true'>
                <div className='panel-body'>
                  <form className='form-horizontal'>
                    <div className='form-body'>
                      <div className='row'>
                        <div className='col-md-12 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Return Policy Description{' '}
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
                            <CKEditor
                              editor={ClassicEditor}
                              data={returnPolicy}
                              // placeholder='Enter Return Policy'
                              onChange={props.handleReturnPolicyChange}
                              // onChange={(event, editor) =>
                              // }
                              className={'form-control'}
                            />
                            {/* <textarea
                              type='text'
                              rows='3'
                              placeholder='Return Policy Description'
                              name='returnPolicy'
                              value={props.returnPolicy}
                              onChange={props.handleChange}
                              className={'form-control' && 'form-control'}
                            /> */}
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-12 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Return Duration (Days){' '}
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
                              placeholder='Return Duration (Days)'
                              name='duration'
                              value={props.duration}
                              onChange={props.handleChange}
                              className={'form-control' && 'form-control'}
                            />
                          </div>
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
                      <div className='form-footer '>
                        <div className='form-group row'>
                          <div className='text-center'>
                            <div className='btn-group text-center'>
                              <div className='btn-group text-right'>
                                {props.isApprove === 'Y' ? (
                                  <>
                                    <button
                                      // type='submit'
                                      className='btn btn-success'
                                      onClick={props.rejectReturnPolicy}
                                    >
                                      Reject
                                    </button>
                                    <button
                                      // type='submit'
                                      className='btn btn-success'
                                      onClick={props.pendingReturnPolicy}
                                    >
                                      Pending
                                    </button>
                                  </>
                                ) : props.isApprove === 'N' ? (
                                  <>
                                    <button
                                      // type='submit'
                                      className='btn btn-success'
                                      onClick={props.approveReturnPolicy}
                                    >
                                      Approve
                                    </button>
                                    <button
                                      // type='submit'
                                      className='btn btn-success'
                                      onClick={props.rejectReturnPolicy}
                                    >
                                      Reject
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      // type='submit'
                                      className='btn btn-success'
                                      onClick={props.approveReturnPolicy}
                                    >
                                      Approve
                                    </button>

                                    <button
                                      // type='submit'
                                      className='btn btn-success'
                                      onClick={props.pendingReturnPolicy}
                                    >
                                      Pending
                                    </button>
                                  </>
                                )}
                              </div>

                              {/* <button
                                // type='submit'
                                className='btn btn-success'
                                onClick={props.approveReturnPolicy}
                              >
                                Approve
                              </button>
                              <button
                                // type='submit'
                                className='btn btn-success'
                                onClick={props.rejectReturnPolicy}
                              >
                                Reject
                              </button>
                              <button
                                // type='submit'
                                className='btn btn-success'
                                onClick={props.pendingReturnPolicy}
                              >
                                Pending
                              </button> */}
                            </div>
                            <div className='btn-group'>
                              <button
                                type='submit'
                                className='btn btn-success'
                                onClick={props.updateReturnPolicy}
                              >
                                Update
                              </button>
                            </div>
                            <div className='btn-group text-right'>
                              {props.isApprove === 'Y' ? (
                                <Link to='/approvedReturnPolicy'>
                                  <button
                                    className='btn btn-secondary'
                                    style={{ cursor: 'pointer' }}
                                  >
                                    Back
                                  </button>
                                </Link>
                              ) : props.isApprove === 'N' ? (
                                <Link to='/pendingReturnPolicy'>
                                  <button
                                    className='btn btn-secondary'
                                    style={{ cursor: 'pointer' }}
                                  >
                                    Back
                                  </button>
                                </Link>
                              ) : (
                                <Link to='/rejectedReturnPolicy'>
                                  <button
                                    className='btn btn-secondary'
                                    style={{ cursor: 'pointer' }}
                                  >
                                    Back
                                  </button>
                                </Link>
                              )}
                            </div>
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

export default EditReturnPolicy
