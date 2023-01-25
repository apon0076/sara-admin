import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useState } from 'react'
import moment from 'moment'
import 'moment-timezone'
import AdminManageOrderStatus from './AdminManageOrderStatus'
import baseUrl from '../../utils/baseUrl'
import {
  updateProductWiseCancelOrderStatusRecord,
  updateProductWiseReturnOrderStatusRecord,
} from '../../store/actions/orderAction'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

export default function FetchCancelReturnOrderTracking({
  orderInfo,
  setVisible,
  counts,
  setCounts,
  status_for_api_call,
  page,
  setStatusId,
  setStatusName,
  statusId,
  statusName,
}) {
  const [selectedOrders, setSelectedOrders] = useState(null)
  // const [statusId, setStatusId] = useState(null)
  // const [statusName, setStatusName] = useState(null)
  const [senderName, setSenderName] = useState('')
  const [receiverName, setReceiverName] = useState('')
  const [trakingRefNo, setTrakingRefNo] = useState('')
  const [location, setLocation] = useState('')
  const [checked, setChecked] = useState(false)
  const [remarks, setRemarks] = useState('')
  const [note, setNote] = useState('')

  const dispatch = useDispatch()

  const handleChange = (e) => {
    const select = e.target
    switch (select.name) {
      case 'statusTypeName':
        setStatusId(select?.value?.displayOrder)
        setStatusName(select?.value?.statusTypeName)
        break
      default:
    }

    // const order_status_id = select.value
    // setStatusId(order_status_id)
    // const order_status_name = select.options[select.selectedIndex].text
    // setStatusName(order_status_name)
  }
  const onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1
  }
  const locations = useHistory()
  const order_filter_tab = locations?.location?.search?.substring(8)
  const invoiceType = 2
  const imageBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Image</span>
        <img
          src={baseUrl.concat(rowData.productImage)}
          alt={rowData.productUrl}
          className='product-image'
          style={{
            height: '50px',
            width: '50px',
            cursor: 'pointer',
          }}
        ></img>
      </React.Fragment>
    )
  }
  const sellerProductVariantsBodyTemplate = (rowData) => {
    const variant = rowData?.productVariant?.split(',')

    let final = []
    variant &&
      variant.map((v, i) => {
        const single = v.split(': ')
        final.push(single)
      })

    return (
      <React.Fragment>
        <span>
          {final.map((item, i) => (
            <>
              {item[0] === ' null' ? (
                <></>
              ) : (
                <p style={{ marginBottom: '0px' }}>
                  {item[0]}: <strong>{item[1]}</strong>
                </p>
              )}
            </>
          ))}
          {/* {rowData.productVariant === null ? 'N/A' : rowData.productVariant} */}
        </span>
      </React.Fragment>
    )
  }
  const productDiscountBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.discountPercent ? rowData.discountPercent : 0}</span>
      </React.Fragment>
    )
  }
  const totalAmountBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.productPrice * rowData.productQty}</span>
      </React.Fragment>
    )
  }
  const handleSubmit = () => {
    let cancelArrayObj = {
      cancelProductOrderId: orderInfo?.cancelProductOrderId,
      cancelInvoiceNo: orderInfo?.cancelInvoiceNo,
      orderProfileId: orderInfo?.orderProfileId,
      orderInvoiceNo: orderInfo?.orderInvoiceNo,
      shopId: orderInfo?.shopId,
      shopWiseOrderId: orderInfo?.shopWiseOrderId,
      shopwiseOrderNo: orderInfo?.orderNo,
      customerId: orderInfo?.customerId,
      shippingCost: orderInfo?.shippingCharge,
      trackingStatusId: Number(statusId),
      trackingStatus: statusName,
      isActive: 'Y',
      remarks: remarks,
      note: '',
      cancelOrderDetailsViewModels: selectedOrders?.map((item) => ({
        productId: item?.productId,
        productTitle: item?.productTitle,
        sellerProductSku: item?.sellerProductSku,
        shopProductSku: item?.shopProductSku,
        productQty: item?.productQuantity,
        isActive: 'Y',
      })),
    }
    let returnArrayObj = {
      returnOrderId: orderInfo.returnOrderId,
      returnInvoiceNo: orderInfo.returnInvoiceNo,
      orderProfileId: orderInfo.orderProfileId,
      orderInvoiceNo: orderInfo.orderInvoiceNo,
      shopId: orderInfo.shopId,
      shopWiseOrderId: orderInfo.shopWiseOrderId,
      shopwiseOrderNo: orderInfo.shopwiseOrderNo,
      customerId: orderInfo.customerId,
      shippingCost: orderInfo.shippingCharge,
      trackingStatusId: Number(statusId),
      trackingStatus: statusName,
      isActive: 'Y',
      remarks: remarks,
      note: '',
      returnProductOrderDetailsViewModels: selectedOrders?.map((item) => ({
        productId: item.productId,
        productTitle: item.productTitle,
        sellerProductSku: item.sellerProductSku,
        shopProductSku: item?.shopProductSku,
        productQty: item.productQty,
        isActive: 'Y',
      })),
    }
    status_for_api_call === 'return request' ||
    status_for_api_call === 'parcel returning' ||
    status_for_api_call === 'refund processing' ||
    status_for_api_call === 'returned' ||
    status_for_api_call === 'refund' ||
    status_for_api_call === 'parcel pickup pending'
      ? dispatch(updateProductWiseReturnOrderStatusRecord(returnArrayObj))
      : dispatch(updateProductWiseCancelOrderStatusRecord(cancelArrayObj))
    setTimeout(() => {
      setVisible(false)
      setSelectedOrders(null)
      setCounts(counts + 1)
    }, 1000)
  }
  return (
    <div style={{ margin: '0px -10px -10px' }}>
      <div className='row'>
        <div className='col-md-4'>
          <strong>Customer Details</strong>
          <div className='table-responsive'>
            <table style={{ width: '100%' }}>
              <tr>
                <th style={{ padding: '2px' }}>Name:</th>
                <td style={{ padding: '2px' }}>
                  {JSON.parse(orderInfo?.shippingAddress)?.recipientName}
                </td>
              </tr>
              <tr>
                <th style={{ padding: '2px' }}>Contact No:</th>
                <td style={{ padding: '2px' }}>
                  {JSON.parse(orderInfo?.shippingAddress)?.contactNumber}
                </td>
              </tr>
              <tr>
                <th style={{ padding: '2px' }}>Cancel Date:</th>
                <td style={{ padding: '2px' }}>
                  {moment(orderInfo?.cancelDate).format('Do MMMM YYYY, h:mm A')}
                </td>
              </tr>
              <tr>
                <th style={{ padding: '2px' }}>Shipping Address:</th>
                <td style={{ padding: '2px' }}>
                  {JSON.parse(orderInfo?.shippingAddress)?.address}
                </td>
              </tr>
            </table>
            <br />
            <table style={{ width: '100%' }}>
              <tr
                style={{
                  borderTop: '1px solid #dee2e6',
                }}
              >
                <th style={{ padding: '2px', color: '#0283D4' }}>Sub-Total:</th>
                <td style={{ padding: '2px', fontWeight: '600' }}>
                  {orderInfo?.totalAmount}
                </td>
              </tr>
              <tr>
                <th style={{ padding: '2px', color: '#0283D4' }}>
                  Shipping Cost:
                </th>
                <td style={{ padding: '2px', fontWeight: '600' }}>
                  {orderInfo?.shippingCost}
                </td>
              </tr>
              <tr>
                <th style={{ padding: '2px', color: '#0283D4' }}>Discount:</th>
                <td style={{ padding: '2px', fontWeight: '600' }}>
                  {orderInfo?.discountPercentage}
                </td>
              </tr>
              <tr>
                <th style={{ padding: '2px', color: '#0283D4' }}>
                  Coupon Code:
                </th>
                <td style={{ padding: '2px', fontWeight: '600' }}>N/A</td>
              </tr>
              <tr>
                <th style={{ padding: '2px', color: '#0283D4' }}>VAT:</th>
                <td style={{ padding: '2px', fontWeight: '600' }}>
                  {orderInfo?.vatAmount}
                </td>
              </tr>
              <tr style={{ borderTop: '1px solid #dee2e6' }}>
                <th style={{ padding: '2px', color: '#E74A4F' }}>Total:</th>
                <td style={{ padding: '2px', fontWeight: '600' }}>
                  {orderInfo?.totalAmount}
                </td>
              </tr>
            </table>
            <br />
            {order_filter_tab === 'refund_processing' ||
            order_filter_tab === 'canceled' ? null : (
              <div>
                <AdminManageOrderStatus
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  selectedOrders={selectedOrders}
                  setSenderName={setSenderName}
                  setReceiverName={setReceiverName}
                  setTrakingRefNo={setTrakingRefNo}
                  setLocation={setLocation}
                  setRemarks={setRemarks}
                  setChecked={setChecked}
                  checked={checked}
                  setNote={setNote}
                  page={page}
                  remarks={remarks}
                  statusName={statusName}
                />
              </div>
            )}
          </div>
        </div>
        <div className='col-md-8'>
          <div className='datatable-responsive-demo'>
            <strong>Order Details</strong>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 5px',
                backgroundColor: '#F8F9FA',
                borderTop: '1px solid #dee2e6',
                borderBottom: '1px solid #dee2e6',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p
                  style={{
                    color: '#0283d4',
                    fontSize: '14px',
                    fontWeight: '700',
                  }}
                >
                  {orderInfo?.shopName}
                </p>
                <p
                  style={{
                    marginLeft: '5px',
                    backgroundColor: '#DEE2E6',
                    color: '#0283d4',
                    fontSize: '14px',
                    fontWeight: '600',
                    borderRadius: '20px',
                    padding: '3px 8px',
                  }}
                >
                  {orderInfo?.cancelInvoiceNo}
                </p>
                <Link
                  to={{
                    pathname: `/sellerInvoice`,
                    selectedOrders: [orderInfo],
                    invoiceType,
                    order_filter_tab,
                  }}
                >
                  <button
                    className='btn btn-info'
                    style={{
                      fontSize: '8px',
                      padding: '5px',
                      borderRadius: '15px',
                      marginLeft: '5px',
                    }}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      class='bi bi-printer'
                      viewBox='0 0 16 16'
                    >
                      <path d='M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z' />
                      <path d='M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z' />
                    </svg>
                  </button>
                </Link>
              </div>

              <p
                style={{
                  color: '#0283d4',
                  fontSize: '14px',
                  fontWeight: '650',
                }}
              >
                Payment Method:{' '}
                {orderInfo?.paymentMethodName
                  ? orderInfo?.paymentMethodName === 'COD'
                    ? 'Cash On Delivery'
                    : orderInfo?.paymentMethodName
                  : 'Not Selected Yet'}
              </p>
            </div>
            <div
              style={{
                maxHeight: '50vh',
                overflowY: 'auto',
                position: 'relative',
                width: '100%',
                overflowX: 'hidden',
              }}
            >
              <DataTable
                value={
                  status_for_api_call === 'return request' ||
                  status_for_api_call === 'parcel returning' ||
                  status_for_api_call === 'parcel pickup pending' ||
                  status_for_api_call === 'refund processing' ||
                  status_for_api_call === 'refund' ||
                  status_for_api_call === 'returned'
                    ? orderInfo?.returnProductOrderDetailsViewModels
                    : orderInfo?.cancelOrderDetailsViewModels
                }
                className='p-datatable-customers p-datatable-responsive-demo'
                rowHover
                emptyMessage='No order(s) found'
                selection={selectedOrders}
                onSelectionChange={(e) => setSelectedOrders(e.value)}
                responsiveLayout='scroll'
              >
                {order_filter_tab === 'refund_processing' ? null : (
                  <Column selectionMode='multiple' />
                )}
                <Column
                  field='Index'
                  header='SN'
                  body={onIndexTemplate}
                  className='listSL'
                />
                <Column
                  field='productImage'
                  header='Image'
                  body={imageBodyTemplate}
                />
                <Column
                  field='productTitle'
                  filterField='productTitle'
                  header='Product Name'
                  sortable
                />
                <Column
                  field='sellerProductSku'
                  filterField='sellerProductSku'
                  header='SKU'
                  sortable
                />
                <Column
                  field='productVariant'
                  filterField='productVariant'
                  header='Variants'
                  body={sellerProductVariantsBodyTemplate}
                  sortable
                />
                <Column
                  style={{ whiteSpace: 'no-wrap' }}
                  ield='discountPercent'
                  filterField='discountPercent'
                  header='Discount(%)'
                  body={productDiscountBodyTemplate}
                />
                <Column
                  field='productPrice'
                  filterField='productPrice'
                  header='Rate'
                  sortable
                />
                <Column
                  field='productQty'
                  filterField='productQty'
                  header='Quantity'
                  sortable
                />
                <Column
                  field='totalPayableAmt'
                  header='Total'
                  body={totalAmountBodyTemplate}
                  sortable
                />
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
