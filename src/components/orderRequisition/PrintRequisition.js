import React, { useEffect } from 'react'
import PrintReqIndividual from './PrintReqIndividual'
import './requisition.css'

const PrintRequisition = (props) => {
  const requisitions = props?.location?.selectedOrders
    ? props?.location?.selectedOrders
    : ''

  const reqType = props?.location?.reqisitionType
  const oldPath = props?.location?.pathname

  const navigate = () => {
    if (reqType === 1 || oldPath === '/print-requisition')
      window.location.href = `/order-requisition`
    else if (reqType === 2 || oldPath === '/print-seller-requisition')
      window.location.href = `/seller-order-requisition`
  }
  return (
    <>
      <span className='requisition__print_btn'>
        <button className='btn btn-primary' onClick={() => window.print()}>
          Print
        </button>
        <button className='btn btn-danger' onClick={navigate}>
          Back
        </button>
      </span>
      <div className='requisition__print'>
        {requisitions &&
          requisitions.map((reqis) => (
            <PrintReqIndividual requisitionInfo={reqis} />
            // <SellerInvoiceAllDisplay invoice={invoice} />
          ))}
      </div>
    </>
  )
}

export default PrintRequisition
