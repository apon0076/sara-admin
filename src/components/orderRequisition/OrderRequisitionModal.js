import React from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import moment from 'moment'
import baseUrl from '../../utils/baseUrl'
import { Link } from 'react-router-dom'

const OrderRequisitionModal = (props) => {
  const { requisitionInfo, reqisitionType } = props

  const onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1
  }

  const imageBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Image</span> */}
        <img
          src={`${baseUrl}${rowData?.productImage}`}
          alt='Product Image'
          //   className='product-image'
          style={{
            height: '60px',
            width: '60px',
          }}
        ></img>
      </React.Fragment>
    )
  }
  const productTitleBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData?.productStyle}</span>
      </React.Fragment>
    )
  }
  const sellerSkuTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData?.barcode}</span>
      </React.Fragment>
    )
  }
  const shopSkuTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData?.shopProductSku}</span>
      </React.Fragment>
    )
  }
  const productVariantsTemplate = (rowData) => {
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
        </span>
      </React.Fragment>
    )
  }

  const rateTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData?.salePrice}</span>
      </React.Fragment>
    )
  }
  const orderQuantityTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData?.orderQuantity}</span>
      </React.Fragment>
    )
  }
  const amountTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData?.amount}</span>
      </React.Fragment>
    )
  }
  const statusNameTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData?.statusName}</span>
      </React.Fragment>
    )
  }
  const headerTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className='row'>
          <div className='col-md-4 col-12'>
            <div className='d-flex justify-content-between'>
              <div className='d-flex align-items-center'>
                <span
                  className='mr-2'
                  style={{
                    fontSize: '14px',
                    fontWeight: '700',
                  }}
                >
                  <strong style={{ color: '#0283d4' }}>Shop Name: </strong>{' '}
                  {rowData?.reqShopName ? rowData?.reqShopName : 'Not Found'}
                </span>
              </div>
            </div>
          </div>
          <div className='col-md-4 col-12'>
            <div className='d-flex justify-content-between'>
              <div className='d-flex align-items-center'>
                <span
                  className='mr-2'
                  style={{
                    fontSize: '14px',
                    fontWeight: '700',
                  }}
                >
                  <strong style={{ color: '#0283d4' }}>Shop Req. No: </strong>{' '}
                  {rowData?.shopRequisitionNo
                    ? rowData?.shopRequisitionNo
                    : 'Not Found'}
                </span>
              </div>
            </div>
          </div>
          <div className='col-md-4 col-12'>
            <div className='d-flex justify-content-between'>
              <div className='d-flex align-items-center'>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: '700',
                  }}
                >
                  <strong style={{ color: '#0283d4' }}>Amount: </strong> BDT{' '}
                  {rowData?.amount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
  const path =
    reqisitionType === 1 ? `/print-requisition` : `/print-seller-requisition`
  return (
    <div style={{ maxHeight: '65vh' }}>
      <div role='document'>
        <Link
          to={{
            pathname: path,
            selectedOrders: [requisitionInfo],
            reqisitionType,
          }}
        >
          <button
            className='btn btn-info'
            style={{
              padding: '4px 8px',
              fontSize: '13px ',
              marginRight: '5px',
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
            {/* <p style={{ fontSize: '13px' }}>Print</p> */}
          </button>
        </Link>
        <div className='modal-body card card-body p-3 m-3'>
          <div className='ps-section__content pt-2'>
            <div className='row'>
              <div className='col-md-4 col-12'>
                <figure className='ps-block--invoice'>
                  <div className='ps-block__content'>
                    <strong
                      style={{
                        fontSize: '16px ',
                      }}
                    >
                      Requisition Invoice No:
                    </strong>{' '}
                    <span
                      style={{
                        fontSize: '16px ',
                      }}
                    >
                      {requisitionInfo?.requisitionNo
                        ? requisitionInfo?.requisitionNo
                        : 'Not Found'}
                    </span>
                  </div>
                </figure>
              </div>
              <div className='col-md-4 col-12'>
                <figure className='ps-block--invoice'>
                  <div className='ps-block__content'>
                    <strong
                      style={{
                        fontSize: '16px ',
                      }}
                    >
                      Customer:
                    </strong>{' '}
                    <span
                      style={{
                        fontSize: '16px ',
                      }}
                    >
                      {requisitionInfo?.customerName
                        ? requisitionInfo?.customerName
                        : 'Not Found'}
                    </span>
                  </div>
                </figure>
              </div>
              <div className='col-md-4 col-12'>
                <figure className='ps-block--invoice'>
                  <div className='ps-block__content'>
                    <strong
                      style={{
                        fontSize: '16px ',
                      }}
                    >
                      Requisition Date:
                    </strong>{' '}
                    <span
                      style={{
                        fontSize: '16px ',
                      }}
                    >
                      {moment(requisitionInfo?.createDate).format(
                        'Do MMMM YYYY, h:mm A'
                      )}
                    </span>
                  </div>
                </figure>
              </div>
            </div>
            <div
              className='datatable-responsive-demo'
              style={{
                maxHeight: '50vh',
                overflowY: 'auto',
                position: 'relative',
                width: '100%',
                overflowX: 'hidden',
              }}
            >
              {requisitionInfo?.requistions &&
                requisitionInfo?.requistions.map((item, index) => (
                  <div
                    style={{
                      maxHeight: '50vh',
                      overflowY: 'auto',
                      position: 'relative',
                      width: '100%',
                      overflowX: 'hidden',
                    }}
                  >
                    <div key={index} className='card mb-5'>
                      <DataTable
                        // dataKey={data?.barcode}
                        header={headerTemplate(item)}
                        value={item?.requistionDetails}
                        className='p-datatable-responsive-demo'
                      >
                        <Column
                          field='Index'
                          header='SN'
                          body={onIndexTemplate}
                          //   headerStyle={{ width: '3em' }}
                        />
                        <Column
                          field='productImage'
                          header='Image'
                          body={imageBodyTemplate}
                          //   headerStyle={{ width: '6%' }}
                        />
                        <Column
                          field='productStyle'
                          filterField='productStyle'
                          header='Product Name'
                          body={productTitleBodyTemplate}
                          //   headerStyle={{ width: '20%' }}
                          sortable
                        />
                        <Column
                          field='barcode'
                          filterField='barcode'
                          header='Seller SKU'
                          body={sellerSkuTemplate}
                          sortable
                        />
                        <Column
                          field='shopProductSku'
                          filterField='shopProductSku'
                          header='Shop SKU'
                          body={shopSkuTemplate}
                          sortable
                        />
                        <Column
                          field='productVariant'
                          filterField='productVariant'
                          header='Variant'
                          body={productVariantsTemplate}
                        />
                        <Column
                          field='salePrice'
                          filterField='salePrice'
                          header='Rate'
                          body={rateTemplate}
                          sortable
                        />
                        <Column
                          field='orderQuantity'
                          filterField='orderQuantity'
                          header='Quantity'
                          body={orderQuantityTemplate}
                          sortable
                        />
                        <Column
                          field='amount'
                          filterField='amount'
                          header='Total'
                          body={amountTemplate}
                          sortable
                        />
                        <Column
                          field='statusName'
                          filterField='statusName'
                          header='Status'
                          body={statusNameTemplate}
                          sortable
                        />
                      </DataTable>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderRequisitionModal
