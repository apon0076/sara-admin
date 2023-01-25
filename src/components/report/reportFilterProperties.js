import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import './report.css'
import { getPaymentMethodRecord } from '../../store/actions/paymentMethodAction'
import { getShopRecord } from '../../store/actions/shopAction';

const ReportFilterProperties = (props) => {
  const {
    handleChange,
    option,
    sku,
    orderStatus,
    orderSource,
    paymentStatus,
    paymentMethod,
    startDate,
    endDate,
    handleDateChange,
    order_filter_tab,
    shopName
  } = props

  const dispatch = useDispatch()

  let year = new Date().toLocaleDateString('en-us', {
    year: 'numeric',
  })

  const orderSourceOptions = [
    {
      OrderSource: 'Website',
    },
    {
      OrderSource: 'Facebook',
    },
    {
      OrderSource: 'Instagram',
    },
    {
      OrderSource: 'Email',
    },
    {
      OrderSource: 'Whats App',
    },
    {
      OrderSource: 'Over Phone Call',
    },
    {
      OrderSource: 'SaRa Office Employee',
    },
    {
      OrderSource: 'Snowtex Office Employee',
    },
    {
      OrderSource: 'Shop Employee',
    },
    {
      OrderSource: 'Other',
    },
  ]

  const allPaymentStatus = [
    {
      PaymentStatusNameId: 1,
      PaymentStatusName: 'Initial',
    },
    {
      PaymentStatusNameId: 2,
      PaymentStatusName: 'Pending',
    },
    {
      PaymentStatusNameId: 3,
      PaymentStatusName: 'Success',
    },
    {
      PaymentStatusNameId: 4,
      PaymentStatusName: 'Partial',
    },
    {
      PaymentStatusNameId: 5,
      PaymentStatusName: 'Failed',
    },
    {
      PaymentStatusNameId: 6,
      PaymentStatusName: 'Cancel',
    },
  ]

  const allOrderStatus = [
    {
      OrderStatusNameId: 1,
      OrderStatusName: 'Pending',
    },
    {
      OrderStatusNameId: 2,
      OrderStatusName: 'Order Confirm',
    },
    {
      OrderStatusNameId: 3,
      OrderStatusName: 'Order Processing',
    },
    {
      OrderStatusNameId: 4,
      OrderStatusName: 'Ready to Ship',
    },
    {
      OrderStatusNameId: 5,
      OrderStatusName: 'Picked',
    },
    {
      OrderStatusNameId: 6,
      OrderStatusName: 'Delivered',
    },
    {
      OrderStatusNameId: 7,
      OrderStatusName: 'Delivery Failed',
    },
    {
      OrderStatusNameId: 8,
      OrderStatusName: 'Cancel Request',
    },
    {
      OrderStatusNameId: 9,
      OrderStatusName: 'Cancel Confirm',
    },
    {
      OrderStatusNameId: 10,
      OrderStatusName: 'Return Request',
    },
    {
      OrderStatusNameId: 11,
      OrderStatusName: 'Parcel Pickup Pending',
    },
    {
      OrderStatusNameId: 12,
      OrderStatusName: 'Parcel Returning',
    },
    {
      OrderStatusNameId: 13,
      OrderStatusName: 'Returned',
    },
    {
      OrderStatusNameId: 14,
      OrderStatusName: 'Refund Processing',
    },
    {
      OrderStatusNameId: 15,
      OrderStatusName: 'Refund',
    },
    {
      OrderStatusNameId: 17,
      OrderStatusName: 'Canceled',
    },
  ]

  const { paymentMethods } = useSelector((state) => state?.paymentMethodReducer)
  const { shops } = useSelector((state) => state?.shopReducer)
  useEffect(() => {
    dispatch(getPaymentMethodRecord())
    dispatch(getShopRecord())
  }, [dispatch])

  return (
    <>
      <div className='option-attribute-container'>
        {/* Start Date Picker */}
        <div className='option-attributes'>
          <div className='row'>
            <div className='col-md-12 col-sm-12'>
              <div className='form-group'>
                <label className='control_label' htmlFor='basic'>
                  {order_filter_tab === 'order' ? 'Order ' : ''}Start Date{' '}
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
                <div className='calender-container'>
                  <Calendar
                    monthNavigator
                    yearNavigator
                    yearRange={`2016:${year}`}
                    id='basic'
                    maxDate={endDate}
                    value={startDate}
                    onChange={(e) => handleDateChange(e.value, 'start')}
                    showIcon
                    placeholder={`Pick ${
                      order_filter_tab === 'order' ? 'Order ' : ''
                    }Start Date`}
                  />
                  {startDate !== null ? (
                    <button
                      style={{
                        position: 'absolute',
                        top: '6px',
                        right: '33px',
                        borderRadius: '100%',
                        border: '1px solid #ced4da',
                        height: '25px',
                        width: '25px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onClick={() => {
                        handleDateChange(null, 'start')
                      }}
                    >
                      <i className='pi pi-times'></i>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* End Date Picker */}
        <div className='option-attributes'>
          <div className='row'>
            <div className='col-md-12 col-sm-12'>
              <div className='form-group'>
                <label className='control_label'>
                  {order_filter_tab === 'order' ? 'Order ' : ''}End Date{' '}
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
                <div className='calender-container'>
                  <Calendar
                    monthNavigator
                    yearNavigator
                    yearRange={`2016:${year}`}
                    id='icon'
                    minDate={startDate}
                    value={endDate}
                    onChange={(e) => handleDateChange(e.value, 'end')}
                    showIcon
                    placeholder={`Pick ${
                      order_filter_tab === 'order' ? 'Order ' : ''
                    }End Date`}
                  />

                  {endDate !== null ? (
                    <button
                      style={{
                        position: 'absolute',
                        top: '6px',
                        right: '33px',
                        borderRadius: '100%',
                        border: '1px solid #ced4da',
                        height: '25px',
                        width: '25px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onClick={() => {
                        handleDateChange(null, 'end')
                      }}
                    >
                      <i className='pi pi-times'></i>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Style/SKU Input */}
        {order_filter_tab === 'order' && option !== 7 && (
          <div className='option-attributes'>
            <div className='row'>
              <div className='col-md-12 col-sm-12'>
                <div className='form-group'>
                  <label className='control_label'>
                    Product Style/SKU{' '}
                    {option === 2 ? (
                      <span
                        aria-hidden='true'
                        style={{
                          color: 'red',
                          fontWeight: 'bold',
                        }}
                      >
                        *
                      </span>
                    ) : (
                      <></>
                    )}
                  </label>
                  <div>
                    <InputText
                      type='text'
                      placeholder={
                        option === 2 || option === 7 || option === 0
                          ? 'Enter Product Style/SKU'
                          : 'Product Style/SKU Disabled'
                      }
                      name='sku'
                      value={sku}
                      onChange={handleChange}
                      className='input-control'
                      disabled={option === 2 || option === 7 || option === 0 ? false : true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shop Name Dropdown */}
        {order_filter_tab === 'order' && option === 7 && (
          <div className='option-attributes'>
            <div className='row'>
              <div className='col-md-12 col-sm-12'>
                <div className='form-group'>
                  <label className='control_label'>
                    Shop Name{' '}
                  </label>
                  <div>
                    <Dropdown
                      value={shopName}
                      options={shops}
                      onChange={handleChange}
                      optionLabel='shopName'
                      className='drop-control'
                      name='shopName'
                      placeholder={
                        option === 7 
                          ? 'Select Shop Name'
                          : 'Shop Name Disabled'
                      }
                      filter
                      filterBy='shopName'
                      disabled={option === 7 ? false : true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Method Dropdown */}
        {order_filter_tab === 'order' && (
          <div className='option-attributes'>
            <div className='row'>
              <div className='col-md-12 col-sm-12'>
                <div className='form-group'>
                  <label className='control_label'>
                    Payment Method Name{' '}
                    {option === 3 ? (
                      <span
                        aria-hidden='true'
                        style={{
                          color: 'red',
                          fontWeight: 'bold',
                        }}
                      >
                        *
                      </span>
                    ) : (
                      <></>
                    )}
                  </label>
                  <div>
                    <Dropdown
                      value={paymentMethod}
                      options={paymentMethods}
                      onChange={handleChange}
                      optionLabel='methodName'
                      className='drop-control'
                      name='paymentMethodName'
                      placeholder={
                        option === 3 || option === 7 || option === 0
                          ? 'Select Payment Method Name'
                          : 'Payment Method Disabled'
                      }
                      filter
                      filterBy='methodName'
                      disabled={option === 3 || option === 7 || option === 0 ? false : true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Status Dropdown */}
        {order_filter_tab === 'order' && (
          <div className='option-attributes'>
            <div className='row'>
              <div className='col-md-12 col-sm-12'>
                <div className='form-group'>
                  <label className='control_label'>
                    Payment Status{' '}
                    {option === 4 ? (
                      <span
                        aria-hidden='true'
                        style={{
                          color: 'red',
                          fontWeight: 'bold',
                        }}
                      >
                        *
                      </span>
                    ) : (
                      <></>
                    )}
                  </label>
                  <div>
                    <Dropdown
                      value={paymentStatus}
                      options={allPaymentStatus}
                      onChange={handleChange}
                      optionLabel='PaymentStatusName'
                      className='drop-control'
                      name='paymentStatusName'
                      placeholder={
                        option === 4 || option === 7 || option === 0
                          ? 'Select Payment Status'
                          : 'Payment Status Disabled'
                      }
                      filter
                      filterBy='PaymentStatusName'
                      disabled={option === 4 || option === 7 || option === 0 ? false : true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Source Dropdown */}
        {order_filter_tab === 'order' && (
          <div className='option-attributes'>
            <div className='row'>
              <div className='col-md-12 col-sm-12'>
                <div className='form-group'>
                  <label className='control_label'>
                    Order Source{' '}
                    {option === 5 ? (
                      <span
                        aria-hidden='true'
                        style={{
                          color: 'red',
                          fontWeight: 'bold',
                        }}
                      >
                        *
                      </span>
                    ) : (
                      <></>
                    )}
                  </label>
                  <div>
                    <Dropdown
                      value={orderSource}
                      options={orderSourceOptions}
                      onChange={handleChange}
                      optionLabel='OrderSource'
                      className='drop-control'
                      name='orderSourceName'
                      placeholder={
                        option === 5 || option === 7 || option === 0
                          ? 'Select Order Source'
                          : 'Order Source Disabled'
                      }
                      filter
                      filterBy='OrderSource'
                      disabled={option === 5 || option === 7 ||option === 0  ? false : true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Order Status Dropdown */}
        {order_filter_tab === 'order' && (
          <div className='option-attributes'>
            <div className='row'>
              <div className='col-md-12 col-sm-12'>
                <div className='form-group'>
                  <label className='control_label'>
                    Order Status{' '}
                    {option === 6 ? (
                      <span
                        aria-hidden='true'
                        style={{
                          color: 'red',
                          fontWeight: 'bold',
                        }}
                      >
                        *
                      </span>
                    ) : (
                      <></>
                    )}
                  </label>
                  <div>
                    <Dropdown
                      value={orderStatus}
                      options={allOrderStatus}
                      onChange={handleChange}
                      optionLabel='OrderStatusName'
                      className='drop-control'
                      name='orderStatusName'
                      placeholder={
                        option === 7 || option === 6 || option === 0
                          ? 'Select Order Status'
                          : 'Order Status Disabled'
                      }
                      filter
                      filterBy='OrderStatusName'
                      disabled={option === 7 || option === 6 || option === 0 ? false : true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}

export default ReportFilterProperties
