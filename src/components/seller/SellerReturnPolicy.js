import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BackTop from '../BackTop/BackTop'
import 'primeicons/primeicons.css'
import '../../../node_modules/primereact/resources/themes/saga-blue/theme.css'
import '../../../node_modules/primereact/resources/primereact.css'
import '../../../node_modules/primeflex/primeflex.css'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const SellerReturnPolicy = (props) => {
  const [returnPolicy, setReturnPolicy] = useState('')
  useEffect(() => {
    setReturnPolicy(props.returnPolicy)
  }, [props.returnPolicy])

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
                  <li>
                    <Link to='/BankAccount'>Bank Account</Link>
                  </li>
                  <li className='active'>
                    <Link to='/ReturnPolicy'>Return Policy</Link>
                  </li>
                </ul>
                <form className='form-horizontal form-material'>
                  <div className='form-body'>
                    <h3 className='box-title'> Return Policy</h3>
                    <hr className='m-t-0 m-b-40' />
                    <div className='m-20'>
                      {/* // */}
                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='form-group'>
                            <label>
                              Duration (Days){' '}
                              <span
                                aria-hidden='true'
                                style={{ color: 'red', fontWeight: 'bold' }}
                              >
                                *
                              </span>
                            </label>
                            <input
                              type='number'
                              placeholder='Enter Return Duration Day Number'
                              className='form-control'
                              value={props.duration || 0}
                              name='duration'
                              onChange={props.handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='form-group'>
                            <label>
                              Return Policy Details{' '}
                              <span
                                aria-hidden='true'
                                style={{ color: 'red', fontWeight: 'bold' }}
                              >
                                *
                              </span>
                            </label>
                            <CKEditor
                              editor={ClassicEditor}
                              data={returnPolicy}
                              onChange={props.handleReturnPolicyChange}
                              className={'form-control'}
                            />
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='form-group'>
                            <div className='checkbox checkbox-success'>
                              <input
                                name='isActive'
                                id='acceptTerms'
                                type='checkbox'
                                checked={props.isActive}
                                onChange={props.handleParentCheck}
                              />
                              <label
                                className='col-md-12'
                                htmlFor='acceptTerms'
                              >
                                &nbsp;Is Active?
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className='form-actions'>
                          <div
                            className='col-md-12'
                            style={{ textAlign: 'center' }}
                          >
                            <button
                              type='submit'
                              className='btn btn-info'
                              style={{ marginRight: '5px' }}
                              onClick={props.saveReturnPolicy}
                            >
                              <i className='fa fa-edit'></i> Update
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
export default SellerReturnPolicy
