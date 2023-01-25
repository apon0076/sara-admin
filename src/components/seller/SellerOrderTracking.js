import moment from 'moment'
import 'moment-timezone'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateProductWiseCancelOrderStatusRecord,
  updateProductWiseOrderStatusRecord,
} from '../../store/actions/orderAction'
import baseUrl from '../../utils/baseUrl'
import SellerManageOrderStatus from './SellerManageOrderStatus'
import { Link } from 'react-router-dom'
import LoadingCard from '../shared/LoadingCard'

export default function SellerOrderTracking({
  orderInfo,
  setVisible,
  setCounts,
  counts,
  seller_info,
  order_filter_tab,
  setStatusId,
  setStatusName,
  statusId,
  statusName,
  customerData
}) {
  const [selectedOrders, setSelectedOrders] = useState(null)
  // const [statusId, setStatusId] = useState(null)
  // const [statusName, setStatusName] = useState(null)
  const [senderName, setSenderName] = useState('')
  const [receiverName, setReceiverName] = useState('')
  const [trakingRefNo, setTrakingRefNo] = useState('')
  const [location, setLocation] = useState('')
  const [remarks, setRemarks] = useState('')
  const [checked, setChecked] = useState(false)
  const dispatch = useDispatch()
  const update_status = useSelector((state) => state.orderReducer)
  const { updateProductWiseOrderStatus, loading } = update_status

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

  const handleSubmit = () => {
    let arrayObj = {
      orderTrackingId: 0,
      orderProfileId: orderInfo?.orderProfileId,
      shopwiseOrderId: orderInfo?.shopwiseOrderId,
      shopwiseOrderNo: orderInfo?.orderNo,
      courierId: orderInfo.customerId,
      courierTrackingNo: '',
      trackingNumber: '',
      trackingStatusId: Number(statusId),
      trackingStatusName: statusName,
      orderInvoiceNo: orderInfo?.orderInvoiceNo,
      sender: senderName,
      receiver: receiverName,
      location: location,
      remarks: remarks,
      isActive: 'Y',
      trackingRefNo: trakingRefNo,
      requestType: 'order',
      customerId: orderInfo?.customerId,
      orderDetails: selectedOrders?.map((item) => ({
        orderDetailId: item?.orderDetailId,
        orderProfileId: item?.orderProfileId,
        shopId: item?.shopId,
        productId: item?.productId,
        productPrice: item?.productPrice,
        productQuantity: item?.productQuantity,
        statusId: Number(statusId),
        statusName: statusName,
        vatTypeId: item?.vatTypeId,
        vatType: item?.vatType,
        vatAmt: item?.vatFaltAmt,
        sellerProductSku: item?.sellerProductSku,
        inventoryTypeId: item?.inventoryTypeId,
        shopProductSku: item?.shopProductSku,
        productDetailsId: 0,
        productName: item?.productTitle,
        productTitle: item?.productTitle,
        thumbnailImage: item?.productImage,
      })),
    }

    let cancelArrayObj = {
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
      cancelOrderDetailsViewModels: selectedOrders?.map((item) => ({
        productId: item?.productId,
        productTitle: item?.productTitle,
        sku: item?.sku,
        sellerProductSku: item?.sellerProductSku,
        shopProductSku: item?.shopProductSku,
        productQty: item?.productQuantity,
        isActive: 'Y',
      })),
    }
    if (statusId === 37) {
      dispatch(updateProductWiseCancelOrderStatusRecord(cancelArrayObj))
    } else {
      dispatch(updateProductWiseOrderStatusRecord(arrayObj))
    }
  }
  const update_status_msg = useSelector(
    (state) => state.orderReducer.updateProductWiseOrderStatus
  )
  const cancel_status_msg = useSelector(
    (state) => state.orderReducer.cancelOrderStatus
  )
  useEffect(() => {
    if (
      update_status_msg?.succeed === true ||
      cancel_status_msg?.succeed === true
    ) {
      setCounts(counts + 1)
      setVisible(false)
      setSelectedOrders(null)
      setStatusId(null)
      setStatusName(null)
      setChecked(false)
      setRemarks('')
      setLocation('')
      setTrakingRefNo('')
      setReceiverName('')
      setSenderName('')
    }
  }, [update_status_msg, cancel_status_msg])

  const invoiceType = 1

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
  const productTitleBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Item</span>
        <span>{rowData.productTitle}</span>
      </React.Fragment>
    )
  }
  const sellerProductSkuBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          {rowData.sellerProductSku === null ? 'N/A' : rowData.sellerProductSku}
        </span>
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
  const productPriceBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.productPrice}</span>
      </React.Fragment>
    )
  }
  const productDiscountBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.discountPercent}</span>
      </React.Fragment>
    )
  }
  const productQuantityBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.productQuantity}</span>
      </React.Fragment>
    )
  }
  const totalAmountBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          {(rowData.productPrice -
            (rowData.productPrice * rowData.discountPercent) / 100) *
            rowData.productQuantity}
        </span>
      </React.Fragment>
    )
  }
  const onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1
  }
  let totalPrice = 0
  for (var i = 0; i < orderInfo?.orderDetails?.length; i++) {
    totalPrice =
      totalPrice +
      (orderInfo?.orderDetails[i]?.productPrice -
        (orderInfo?.orderDetails[i]?.productPrice *
          orderInfo?.orderDetails[i]?.discountPercent) /
          100) *
        orderInfo?.orderDetails[i]?.productQuantity
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
                <td style={{ padding: '2px' }}>{customerData?.customerName}</td>
              </tr>
              <tr>
                <th style={{ padding: '2px' }}>Contact No:</th>
                <td style={{ padding: '2px' }}>
                  {customerData?.customerContactNo }
                </td>
              </tr>
              <tr>
                <th style={{ padding: '2px' }}>Order Date:</th>
                <td style={{ padding: '2px' }}>
                  {moment(orderInfo?.createDate).format('Do MMMM YYYY, h:mm A')}
                </td>
              </tr>
              <tr>
                <th style={{ padding: '2px' }}>Shipping Address:</th>
                <td style={{ padding: '2px' }}>
                  {JSON.parse(customerData?.shippingAddress)?.address}
                </td>
              </tr>
            </table>
            <br />
            <table style={{ width: '100%' }}>
              {!checked && (
                <>
                  <tr
                    style={{
                      borderTop: '1px solid #dee2e6',
                    }}
                  >
                    <th style={{ padding: '2px', color: '#0283D4' }}>
                      Sub-Total:
                    </th>
                    <td style={{ padding: '2px', fontWeight: '600' }}>
                      {totalPrice}
                    </td>
                  </tr>
                  <tr>
                    <th style={{ padding: '2px', color: '#0283D4' }}>
                      Shipping Cost:
                    </th>
                    <td style={{ padding: '2px', fontWeight: '600' }}>
                      {orderInfo?.shippingCharge}
                    </td>
                  </tr>
                  <tr>
                    <th style={{ padding: '2px', color: '#0283D4' }}>
                      Discount:
                    </th>
                    <td style={{ padding: '2px', fontWeight: '600' }}>
                      {orderInfo?.totalDiscountFlatAmt}
                    </td>
                  </tr>
                  <tr>
                    <th style={{ padding: '2px', color: '#0283D4' }}>
                      Coupon Code:
                    </th>
                    <td style={{ padding: '2px', fontWeight: '600' }}>N/A</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #dee2e6' }}>
                    <th style={{ padding: '2px', color: '#0283D4' }}>VAT:</th>
                    <td style={{ padding: '2px', fontWeight: '600' }}>0</td>
                  </tr>
                </>
              )}

              <tr>
                <th style={{ padding: '2px', color: '#E74A4F' }}>Total:</th>
                <td style={{ padding: '2px', fontWeight: '600' }}>
                  {totalPrice +
                    orderInfo?.shippingCharge -
                    orderInfo?.totalDiscountFlatAmt}
                </td>
              </tr>
            </table>
            <br />
            {seller_info.isSellerDelivered === 'Y' &&
            order_filter_tab !== 'delivered' ? (
              <div>
                <SellerManageOrderStatus
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
                  statusName={statusName}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className='col-md-8'>
          {loading ? (
            <LoadingCard count={1} />
          ) : (
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
                      marginRight: '5px',
                      backgroundColor: '#DEE2E6',
                      color: '#0283d4',
                      fontSize: '14px',
                      fontWeight: '600',
                      borderRadius: '20px',
                      padding: '2px 10px',
                    }}
                  >
                    {orderInfo?.orderNo}
                  </p>
                  <div className='m-3 border rounded'>
                    <Link
                      to={{
                        pathname: `/SellerInvoice`,
                        data: [orderInfo],
                        invoiceType,
                        order_filter_tab,
                      }}
                    >
                      <button
                        className='btn btn-primary'
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
                </div>
                <p
                  style={{
                    color: '#0283d4',
                    fontSize: '14px',
                    fontWeight: '650',
                  }}
                >
                  Payment Method:{' '}
                  {customerData?.paymentMethodName
                    ? customerData?.paymentMethodName === 'COD'
                      ? 'Cash On Delivery'
                      : customerData?.paymentMethodName
                    : 'Not Selected Yet'}
                </p>
              </div>
              <div
                style={{
                  maxHeight: '60vh',
                  overflowY: 'auto',
                  position: 'relative',
                  width: '100%',
                  overflowX: 'hidden',
                }}
              >
                <DataTable
                  value={orderInfo?.orderDetails}
                  className='p-datatable-customers p-datatable-responsive-demo'
                  rowHover
                  emptyMessage='No order(s) found'
                  selection={selectedOrders}
                  onSelectionChange={(e) => setSelectedOrders(e.value)}
                  responsiveLayout='scroll'
                >
                  {order_filter_tab !== 'delivered' ? (
                    <Column selectionMode='multiple' />
                  ) : null}
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
                    header='Product Title'
                    body={productTitleBodyTemplate}
                    headerStyle={{ width: '20%' }}
                    sortable
                  />
                  <Column
                    field='sellerProductSku'
                    filterField='sellerProductSku'
                    header='SKU'
                    body={sellerProductSkuBodyTemplate}
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
                    ield='discountPercent'
                    filterField='discountPercent'
                    header='Discount (%)'
                    body={productDiscountBodyTemplate}
                  />
                  <Column
                    field='productPrice'
                    filterField='productPrice'
                    header='Rate'
                    body={productPriceBodyTemplate}
                    sortable
                  />
                  <Column
                    field='productQuantity'
                    filterField='productQuantity'
                    header='Quantity'
                    body={productQuantityBodyTemplate}
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
          )}
        </div>
      </div>
    </div>
  )
}
