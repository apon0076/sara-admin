import React from 'react'
import './requisition.css'
import moment from 'moment'
import baseUrl from '../../utils/baseUrl'

const PrintReqIndividual = (props) => {
  const { requisitionInfo } = props

  const showVariant = (rowData) => {
    const variant = rowData?.productVariant?.split(',')

    let final = []
    variant &&
      variant.map((v, i) => {
        const single = v.split(': ')
        final.push(single)
      })

    return (
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
    )
  }

  return (
    <div className='requisition_container' style={{ marginBottom: '100vh' }}>
      <div
        className='requisition_purchase_history'
        style={{ paddingTop: '5vh' }}
      >
        <div className='requisition_purchase_history__header'>
          <div className='ps-block__content'>
            <strong
              style={{
                fontSize: '16px ',
              }}
            >
              Requisition Invoice No:
            </strong>
            <br />
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
          <div className='requisition_purchase_history__header_info'>
            <div className='ps-block__content'>
              <strong
                style={{
                  fontSize: '16px ',
                }}
              >
                Customer:
              </strong>
              <br />
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
          </div>
          <div className='requisition_purchase_history__header_info'>
            <div className='ps-block__content'>
              <strong
                style={{
                  fontSize: '16px ',
                }}
              >
                Requisition Date:
              </strong>
              <br />
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
          </div>
        </div>

        {requisitionInfo?.requistions.map((data, index) => (
          <div className='requisition_product__list_section'>
            <div className='requisition_purchase_history__header'>
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
                      {data?.reqShopName ? data?.reqShopName : 'Not Found'}
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
                      <strong style={{ color: '#0283d4' }}>
                        Shop Req. No:{' '}
                      </strong>{' '}
                      {data?.shopRequisitionNo
                        ? data?.shopRequisitionNo
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
                      {data?.amount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className='requisition_product__list_section_title'>
              Ordered Items :
            </p>
            <table className='requisition_product__list_section_table'>
              <thead>
                <tr>
                  <th className='requisition__index_col'>#</th>
                  <th className='requisition__name_col'>Product Name</th>
                  <th className='requisition__sku_col'>Image</th>
                  <th className='requisition__sku_col'>Seller SKU</th>
                  <th className='requisition__sku_col'>Shop SKU</th>
                  <th className='requisition__sku_col'>Variants</th>
                  <th className='requisition__price_col'>Rate</th>
                  <th className='requisition__quantity_col'>Quantity</th>
                  <th className='requisition__total_col'>Total</th>
                  <th className='requisition__total_col'>Status</th>
                </tr>
              </thead>
              <tbody>
                {data?.requistionDetails.map((data, index) => (
                  <tr>
                    <td className='requisition__index_col'>{index + 1}</td>
                    <td className='requisition__name_col'>
                      {data?.productStyle}
                    </td>
                    <td className='requisition__sku_col'>
                      <img
                        src={`${baseUrl}${data?.productImage}`}
                        alt='Product Image'
                        //   className='product-image'
                        style={{
                          height: '60px',
                          width: '60px',
                        }}
                      ></img>
                    </td>
                    <td className='requisition__sku_col'>{data?.barcode}</td>
                    <td className='requisition__sku_col'>
                      {data?.shopProductSku}
                    </td>
                    <td className='requisition__sku_col'>
                      {showVariant(data)}
                    </td>
                    <td className='requisition__price_col'>
                      {data?.salePrice}
                    </td>
                    <td className='requisition__quantity_col'>
                      {data?.orderQuantity}
                    </td>
                    <td className='requisition__total_col'>{data?.amount}</td>
                    <td className='requisition__total_col'>
                      {data?.statusName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PrintReqIndividual
