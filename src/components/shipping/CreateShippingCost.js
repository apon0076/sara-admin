import React from 'react'
import { Link } from 'react-router-dom'
import * as Icon from 'react-feather'
import { Dropdown } from 'primereact/dropdown'
import FlatRateFixedRate from './shippingOptions/FlatRateFixedRate'
import FlatRateProductCategory from './shippingOptions/FlatRateProductCategory'
import FlatRateOrderWeight from './shippingOptions/FlatRateOrderWeight'
import FlatRateSellerShippingCost from './shippingOptions/FlatRateSellerShippingCost'
import CouponShipping from './shippingOptions/CouponShipping/CouponShipping'
import FreeShippingFixedRate from './shippingOptions/FreeShippingFixedRate'
import FreeShippingProductCategory from './shippingOptions/FreeShippingProductCategory'
import FreeShippingOrderWeight from './shippingOptions/FreeShippingOrderWeight'
import FreeShippingSellerShippingCost from './shippingOptions/FreeShippingSellerShippingCost'
import CouponShippingSellerShippingCost from './shippingOptions/CouponShipping/CouponShippingSellerShippingCost'

const CreateShippingCost = (props) => {
  return (
    <div className='page-wrapper'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='panel panel-success'>
              <div className='panel-heading'>
                {' '}
                Create Shipping Cost{' '}
                <span style={{ float: 'right' }}>
                  <Link to='/ShippingCostList'>
                    <Icon.List className='text-light' />
                  </Link>
                </span>
              </div>
              <div className='panel-wrapper collapse in' aria-expanded='true'>
                <div className='panel-body'>
                  <form className='form-horizontal'>
                    <div className='form-body'>
                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Shipping Type Name{' '}
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
                                optionLabel='typeName'
                                options={props.shippingType}
                                filter
                                showClear
                                filterBy='typeName'
                                placeholder='Select Shipping Type'
                                name='typeName'
                                value={props.typeName}
                                onChange={props.handleChange}
                                className={
                                  props.errorShippingTypeId.length !== 0
                                    ? 'errorClass form-control'
                                    : 'form-control' && 'form-control'
                                }
                              />
                              {props.errorShippingTypeId && (
                                <span className='error'>
                                  {props.errorShippingTypeId}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Shipping Option Name{' '}
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
                                optionLabel='optionName'
                                options={props.shippingOptions}
                                filter
                                showClear
                                filterBy='optionName'
                                placeholder='Select Shipping Option'
                                name='optionName'
                                value={props.optionName}
                                onChange={props.handleChange}
                                className={
                                  props.errorShippingOptionsId.length !== 0
                                    ? 'errorClass form-control'
                                    : 'form-control' && 'form-control'
                                }
                              />
                              {props.errorShippingOptionsId && (
                                <span className='error'>
                                  {props.errorShippingOptionsId}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <FlatRateFixedRate shippingCostData={props} />
                      <FlatRateOrderWeight shippingCostData={props} />
                      <FlatRateProductCategory shippingCostData={props} />
                      <FlatRateSellerShippingCost shippingCostData={props} />
                      <FreeShippingFixedRate shippingCostData={props} />
                      <FreeShippingOrderWeight shippingCostData={props} />
                      <FreeShippingProductCategory shippingCostData={props} />
                      <FreeShippingSellerShippingCost
                        shippingCostData={props}
                      />
                      <CouponShipping shippingCostData={props} />
                      <CouponShippingSellerShippingCost
                        shippingCostData={props}
                      />
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

export default CreateShippingCost
