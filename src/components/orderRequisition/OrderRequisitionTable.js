import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import moment from 'moment'
import { Modal } from 'antd'
import OrderRequisitionModal from './OrderRequisitionModal'
import { Paginator } from '../paginator/Paginator'

const OrderRequisitionTable = (props) => {
  const {
    orderRequisition,
    globalFilter,
    setSelectedOrders,
    selectedOrders,
    reqisitionType,
    totalPage,
    currentPage,
    itemPerPage,
    totalItems,
    handleItemPerPage,
    handleCurrentPage,
  } = props

  const [requisitionInfo, setRequisitionInfo] = useState('')
  const [requisitionModalVisible, setRequisitionModalVisible] = useState(false)

  const reqDateBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{moment(rowData.createDate).format('Do MMMM YYYY, h:mm A')}</span>
      </React.Fragment>
    )
  }
  const refundDetailsBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          <Button
            onClick={() => {
              setRequisitionInfo(rowData)
              setRequisitionModalVisible(true)
            }}
            style={{
              fontSize: '14px',
              padding: '4px 10px',
              marginRight: '5px',
            }}
          >
            Details
          </Button>
        </span>
      </React.Fragment>
    )
  }
  return (
    <div>
      {' '}
      <DataTable
        className='p-datatable-customers p-datatable-responsive-demo'
        value={orderRequisition?.data}
        rowHover
        globalFilter={globalFilter}
        emptyMessage='No requisition found'
        selection={selectedOrders}
        onSelectionChange={(e) => setSelectedOrders(e.value)}
      >
        <Column selectionMode='multiple' />
        <Column
          field='requisitionNo'
          filterField='requisitionNo'
          header='Requisition Invoice No.'
          //
          sortable
        />
        <Column
          field='createDate'
          filterField='createDate'
          header='Requisition Date'
          body={reqDateBodyTemplate}
          sortable
        />
        <Column
          field='orderInvoiceNo'
          filterField='orderInvoiceNo'
          header='Order Invoice No'
          sortable
        />
        <Column
          field='shopName'
          filterField='shopName'
          header='Shop Name'
          sortable
        />
        <Column
          field='customerName'
          filterField='customerName'
          header='Customer'
          sortable
        />
        <Column field='amount' filterField='amount' header='Amount' sortable />
        <Column
          field='statusName'
          filterField='statusName'
          header='Status'
          sortable
        />
        <Column header='Action' body={refundDetailsBodyTemplate} />
      </DataTable>
      <Paginator
        totalPage={totalPage}
        currentPage={currentPage}
        itemPerPage={itemPerPage}
        totalItems={totalItems}
        items={orderRequisition?.data}
        itemsPerPageOptions={[30, 60, 90, 100, 200, 300]}
        handleItemPerPage={handleItemPerPage}
        handleCurrentPage={handleCurrentPage}
      />
      <Modal
        title='Order Requisition Details'
        centered
        visible={requisitionModalVisible}
        onOk={() => setRequisitionModalVisible(false)}
        onCancel={() => setRequisitionModalVisible(false)}
        width={1500}
      >
        <OrderRequisitionModal
          requisitionInfo={requisitionInfo}
          reqisitionType={reqisitionType}
        />
      </Modal>
    </div>
  )
}

export default OrderRequisitionTable
