import React, { useEffect, useState } from 'react'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderStatusTypeRecord } from '../../store/actions/orderAction'
import { useHistory } from 'react-router-dom'
import { Dropdown } from 'primereact/dropdown'

export default function SellerManageOrderStatus({
  handleSubmit,
  handleChange,
  selectedOrders,
  setSenderName,
  setReceiverName,
  setTrakingRefNo,
  setLocation,
  setRemarks,
  checked,
  setChecked,
  statusName,
}) {
  const dispatch = useDispatch()
  const location = useHistory()
  var page_pathname = location?.location?.pathname
  const order_status = useSelector(
    (state) => state.orderReducer.orderStatusType
  )
  const order_filter_tab = location?.location?.search?.substring(8)
  const status_for_api_call = order_filter_tab.replaceAll('_', ' ')
  useEffect(() => {
    dispatch(getOrderStatusTypeRecord())
  }, [dispatch])

  return (
    <div>
      <label style={{ margin: '0' }}>Order Tracking</label>
      <div
        style={{
          border: '1px solid #ddd',
          padding: '5px',
          borderRadius: '5px',
        }}
      >
        <label>Order Status</label>
        <Dropdown
          style={{
            width: '100%',
            padding: '5px',
            border: '1px solid #B3B3B3',
            borderRadius: '3px',
          }}
          name='statusTypeName'
          // value={statusName}
          options={order_status?.filter((status, i) =>
            page_pathname === '/CancelSellerOrders'
              ? status?.displayOrder > 36 && status?.displayOrder < 43
              : page_pathname === '/ManageOrder' && order_filter_tab === 'pending'
              ? (status?.displayOrder >= 3 && status?.displayOrder <= 7) ||
                status?.displayOrder === 37
              : page_pathname === '/ManageOrder' &&
                order_filter_tab === 'order_confirm'
              ? (status?.displayOrder >= 7 && status?.displayOrder <= 12) ||
                status?.displayOrder === 37
              : page_pathname === '/ManageOrder' &&
                order_filter_tab === 'order_processing'
              ? (status?.displayOrder >= 12 && status?.displayOrder <= 17) ||
                status?.displayOrder === 37
              : page_pathname === '/ManageOrder' &&
                order_filter_tab === 'ready_to_ship'
              ? status?.displayOrder >= 17 && status?.displayOrder <= 22
              : page_pathname === '/ManageOrder' && order_filter_tab === 'picked'
              ? status?.displayOrder >= 22 && status?.displayOrder <= 27
              : page_pathname === '/ManageOrder' &&
                order_filter_tab === 'delivery_failed'
              ? status?.displayOrder >= 26 && status?.displayOrder <= 27
              : page_pathname === '/ReturnOrders' &&
                order_filter_tab === 'return_request'
              ? status?.displayOrder >= 47 && status?.displayOrder <= 52
              : page_pathname === '/ReturnOrders' &&
                order_filter_tab === 'parcel_pickup_pending'
              ? status?.displayOrder >= 52 && status?.displayOrder <= 57
              : page_pathname === '/ReturnOrders' &&
                order_filter_tab === 'parcel_returning'
              ? status?.displayOrder >= 57 &&
                status?.displayOrder <= 67 &&
                status?.displayOrder != 62
              : null
          )}
          onChange={handleChange}
          optionLabel='statusTypeName'
          placeholder={
            statusName
              ? statusName
              : order_status?.map((status_name, index) =>
                  status_for_api_call ===
                  status_name?.statusTypeName.toLowerCase()
                    ? status_name?.statusTypeName
                    : ''
                )
          }
        />
        {/* <br />
        <select
          style={{
            width: '100%',
            padding: '5px',
            border: '1px solid #B3B3B3',
            borderRadius: '3px',
          }}
          onChange={(e) => {
            handleChange(e)
          }}
        >
          {order_status?.length &&
            order_status
              ?.filter((status, i) =>
                page_pathname === '/CancelSellerOrders'
                  ? status?.displayOrder > 36 && status?.displayOrder < 43
                  : page_pathname === '/ManageOrder' &&
                    order_filter_tab === 'pending'
                  ? (status?.displayOrder >= 3 && status?.displayOrder <= 7) ||
                    status?.displayOrder === 37
                  : page_pathname === '/ManageOrder' &&
                    order_filter_tab === 'order_confirm'
                  ? (status?.displayOrder >= 7 && status?.displayOrder <= 12) ||
                    status?.displayOrder === 37
                  : page_pathname === '/ManageOrder' &&
                    order_filter_tab === 'order_processing'
                  ? (status?.displayOrder >= 12 &&
                      status?.displayOrder <= 17) ||
                    status?.displayOrder === 37
                  : page_pathname === '/ManageOrder' &&
                    order_filter_tab === 'ready_to_ship'
                  ? status?.displayOrder >= 17 && status?.displayOrder <= 22
                  : page_pathname === '/ManageOrder' &&
                    order_filter_tab === 'picked'
                  ? status?.displayOrder >= 22 && status?.displayOrder <= 32
                  : page_pathname === '/ManageOrder' &&
                    order_filter_tab === 'delivery_failed'
                  ? status?.displayOrder >= 27 && status?.displayOrder <= 32
                  : page_pathname === '/ReturnOrders' &&
                    order_filter_tab === 'return_request'
                  ? status?.displayOrder >= 47 && status?.displayOrder <= 52
                  : page_pathname === '/ReturnOrders' &&
                    order_filter_tab === 'parcel_pickup_pending'
                  ? status?.displayOrder >= 52 && status?.displayOrder <= 57
                  : page_pathname === '/ReturnOrders' &&
                    order_filter_tab === 'parcel_returning'
                  ? status?.displayOrder >= 57 &&
                    status?.displayOrder <= 67 &&
                    status?.displayOrder != 62
                  : null
              )
              ?.map((status_name, index) => (
                <option
                  key={index}
                  value={status_name?.displayOrder}
                  selected={
                    status_for_api_call ===
                    status_name?.statusTypeName.toLowerCase()
                      ? status_name?.statusTypeName
                      : ''
                  }
                >
                  {status_name?.statusTypeName}
                </option>
              ))}
        </select> */}
        <br />
        <div style={{ display: 'flex', margin: '7px 0' }}>
          <Checkbox
            inputId='cb2'
            onChange={(e) => setChecked(e.checked)}
            checked={checked}
          ></Checkbox>
          <label htmlFor='cb2' style={{ margin: '0 0 0 5px' }}>
            Show More Options
          </label>
        </div>
        {checked ? (
          <div style={{ height: '200px', overflowY: 'scroll' }}>
            <label>Sender Name</label>
            <br />
            <input
              onChange={(e) => setSenderName(e.target.value)}
              style={{
                width: '100%',
                padding: '5px',
                border: '1px solid #B3B3B3',
                borderRadius: '3px',
              }}
              type='text'
              placeholder='Enter Senter Name'
            />
            <br />
            <label>Receiver Name</label>
            <br />
            <input
              onChange={(e) => setReceiverName(e.target.value)}
              style={{
                width: '100%',
                padding: '5px',
                border: '1px solid #B3B3B3',
                borderRadius: '3px',
              }}
              type='text'
              placeholder='Enter Receiver Name'
            />
            <br />
            <label>Tracking Reference No.</label>
            <br />
            <input
              onChange={(e) => setTrakingRefNo(e.target.value)}
              style={{
                width: '100%',
                padding: '5px',
                border: '1px solid #B3B3B3',
                borderRadius: '3px',
              }}
              type='text'
              placeholder='Enter Tracking Reference No.'
            />
            <br />
            <label>Location</label>
            <br />
            <input
              onChange={(e) => setLocation(e.target.value)}
              style={{
                width: '100%',
                padding: '5px',
                border: '1px solid #B3B3B3',
                borderRadius: '3px',
              }}
              type='text'
              placeholder='Enter Location'
            />
            <br />
            <label>Remarks.</label>
            <br />
            <textarea
              onChange={(e) => setRemarks(e.target.value)}
              style={{
                width: '100%',
                padding: '5px',
                border: '1px solid #B3B3B3',
                borderRadius: '3px',
              }}
              rows='2'
              placeholder='Enter Remarks'
            />
          </div>
        ) : null}
        <Button
          className='ps-btn ps-btn--fullwidth'
          type='submit'
          onClick={() => handleSubmit()}
          disabled={selectedOrders === null || selectedOrders?.length === 0}
        >
          <i className='fa fa-send'></i> Submit
        </Button>
      </div>
    </div>
  )
}
