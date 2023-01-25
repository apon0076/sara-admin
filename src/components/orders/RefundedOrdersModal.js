import React from 'react'
import Column from 'antd/es/table/Column'
import { DataTable } from 'primereact/datatable'
import './../../components/refund/refund.css'
import baseUrl from '../../utils/baseUrl'
import { Button } from 'primereact/button'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

const RefundedOrdersModal = ({ orderInfo, totalRefundAmount }) => {
  let history = useHistory()
  const refund_page_location = history?.location?.pathname

  const onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1
  }

  const productImageBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
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
  const productAmountBodyTemplate = (rowData) => {
    const total_amount = rowData?.productPrice * rowData?.productQty
    return (
      <React.Fragment>
        <span>{total_amount}</span>
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
          {final?.map((item, i) => (
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
  return (
    <div className='refund_modal__container'>
      <div className='order_n_product_section'>
        <div className='order_details'>
          <div className='order_details_section'>
            <p className='order_info'>
              <strong>Refund Trnx. No:</strong>
              <strong>{orderInfo?.refundTranNo}</strong>
            </p>
            <p className='order_info'>
              {refund_page_location === '/ReturnOrders' ||
              refund_page_location === '/ReturnSellerOrders' ? (
                <>
                  <strong>Return Invoice No:</strong>
                  <strong>{orderInfo?.cancelReturnInvoiceNo}</strong>
                </>
              ) : (
                <>
                  <strong>Cancel Invoice No:</strong>
                  <strong> {orderInfo?.cancelReturnInvoiceNo}</strong>
                </>
              )}
            </p>
            <p className='order_info'>
              <strong>Order Invoice No:</strong>{' '}
              <strong>{orderInfo?.orderInvoiceNo}</strong>
            </p>
          </div>
          <div className='order_details_section'>
            <p className='order_info'>
              <strong>Refund Date:</strong>
              <strong style={{ whiteSpace: 'nowrap' }}>
                {moment(orderInfo?.refundDate).format('Do MMMM YYYY, h:mm A')}
              </strong>
            </p>
            <p className='order_info'>
              <strong>Total Amount:</strong>
              <strong>{totalRefundAmount} TK</strong>
            </p>
            <p className='order_info'>
              <strong>Payment Method:</strong>
              <strong>{orderInfo?.methodName}</strong>
            </p>
          </div>
        </div>
        <div
          style={{
            maxHeight: '40vh',
            overflowY: 'auto',
            position: 'relative',
            width: '100%',
            overflowX: 'hidden',
          }}
        >
          <DataTable
            className='p-datatable-customers p-datatable-responsive-demo'
            value={orderInfo.productDetails}
            rowHover
            emptyMessage='No order(s) found'
          >
            <Column field='Index' header='SN' body={onIndexTemplate} />
            <Column
              field='productTitle'
              filterField='productTitle'
              header='Product Title'
              headerStyle={{ width: '20%' }}
              sortable
            />
            <Column
              field='productImage'
              filterField='productImage'
              header='Image'
              body={productImageBodyTemplate}
            />
            <Column
              field='sellerProductSku'
              filterField='sellerProductSku'
              header='Seller SKU'
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
              field='productPrice'
              filterField='productPrice'
              header='Price'
              sortable
            />
            <Column
              field='productQty'
              filterField='productQty'
              header='QTY'
              sortable
            />
            <Column
              field='amount'
              filterField='amount'
              header='Amount'
              body={productAmountBodyTemplate}
              sortable
            />
          </DataTable>
        </div>
      </div>
      <div className='refund_section'>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 10px 8px 10px',
            borderBottom: '1px solid #ddd',
          }}
        >
          <label style={{ width: '50%' }}>Reference No.</label>
          <p style={{ width: '50%', fontWeight: '600', margin: '0' }}>
            {orderInfo.referenceNo}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 10px 8px 10px',
            borderBottom: '1px solid #ddd',
          }}
        >
          <label style={{ width: '50%' }}>Payment Method</label>
          <p style={{ width: '50%', fontWeight: '600', margin: '0' }}>
            {orderInfo.methodName}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 10px 8px 10px',
            borderBottom: '1px solid #ddd',
          }}
        >
          <label style={{ width: '50%' }}>Amount</label>
          <p style={{ width: '50%', fontWeight: '600', margin: '0' }}>
            {totalRefundAmount}
          </p>
        </div>

        {orderInfo?.paymentMethodId === 11 ? (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px 8px 10px',
                borderBottom: '1px solid #ddd',
              }}
            >
              <label style={{ width: '50%' }}>Name of Bank</label>
              <p style={{ width: '50%', fontWeight: '600', margin: '0' }}>
                {orderInfo.methodName}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px 8px 10px',
                borderBottom: '1px solid #ddd',
              }}
            >
              <label style={{ width: '50%' }}>Cheque No.</label>
              <p style={{ width: '50%', fontWeight: '600', margin: '0' }}>
                {orderInfo?.chequeNo}
              </p>
            </div>
          </>
        ) : null}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 10px 8px 10px',
            borderBottom: '1px solid #ddd',
          }}
        >
          <label style={{ width: '50%' }}>Account No.</label>
          <p style={{ width: '50%', fontWeight: '600', margin: '0' }}>
            {orderInfo?.accountNo}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 10px 8px 10px',
            borderBottom: '1px solid #ddd',
          }}
        >
          <label style={{ width: '50%' }}>Remarks</label>
          <p style={{ width: '50%', fontWeight: '600', margin: '0' }}>
            {orderInfo?.remarks ? orderInfo?.remarks : '------'}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 10px 8px 10px',
            borderBottom: '1px solid #ddd',
          }}
        >
          <label style={{ width: '50%' }}>Download Documents</label>
          {orderInfo?.documentUrl ? (
            <a
              href={baseUrl.concat(orderInfo.documentUrl)}
              target='_blank'
              download
            >
              <Button className='google' style={{ padding: '6px 20px' }}>
                <i
                  style={{ marginRight: '10px', fontSize: '16px' }}
                  className='pi pi-download px-2'
                ></i>
                <span style={{ fontSize: '16px' }} className='px-3'>
                  Download
                </span>
              </Button>
            </a>
          ) : (
            <p style={{ width: '50%', fontWeight: '600', margin: '0' }}>
              No Documents Attached!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default RefundedOrdersModal
