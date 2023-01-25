import { Modal } from 'antd'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import FetchReturnOrderTrackingAdmin from '../../components/orders/FetchReturnOrderTrackingAdmin'
import LoadingCard from '../../components/shared/LoadingCard'
import { fetchReturnOrdersRecord } from '../../store/actions/orderAction'
import authenticationService from '../../store/services/authenticationService'
import { Tag } from 'primereact/tag'
import CancelRefundModal from '../../components/refund/CancelRefundModal'
import moment from 'moment'
import { fetchRefundedDataRecord } from '../../store/actions/refundActions'
import RefundedOrdersModal from '../../components/orders/RefundedOrdersModal'
import { Paginator } from '../../components/paginator/Paginator'

export default function ReturnOrdersListContainer() {
  const [globalFilter, setGlobalFilter] = useState(null)
  const [visible, setVisible] = useState(false)
  const [orderInfo, setOrderInfo] = useState(null)
  const [counts, setCounts] = useState(1)
  const [refundVisible, setRefundVisible] = useState(false)
  const [selectedOrders, setSelectedOrders] = useState([])
  const [pathnameOptions, setPathnameOptions] = useState(null)
  const [totalRefundAmount, setTotalRefundAmount] = useState(null)
  const [refundedVisible, setRefundedVisible] = useState(false)
  const [statusId, setStatusId] = useState(null)
  const [statusName, setStatusName] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(30)
  const [totalPage, setTotalPage] = useState(null)
  const [totalItems, setTotalItems] = useState(null)

  const dispatch = useDispatch()
  const location = useHistory()
  let history = useHistory()
  useEffect(() => {
    let roleId = authenticationService.getRoleId()
    if (roleId === '1') {
    } else {
      history.push('/Login')
    }
  }, [])

  useEffect(() => {
    setStatusId(null)
    setStatusName(null)
  }, [visible])

  const order_filter_tab = location?.location?.search?.substring(8)
  const status_for_api_call = order_filter_tab.replaceAll('_', ' ')
  const status_arr = status_for_api_call.split(' ')
  for (var i = 0; i < status_arr.length; i++) {
    status_arr[i] =
      status_arr[i].charAt(0).toUpperCase() + status_arr[i].slice(1)
  }
  const reformed_status = status_arr.join(' ')
  useEffect(() => {
    dispatch(fetchReturnOrdersRecord(reformed_status, currentPage, itemPerPage))
  }, [reformed_status, counts, currentPage, itemPerPage])
  const return_orders = useSelector((state) => state.orderReducer)
  const { fetchReturnOrders, loading } = return_orders
  useEffect(() => {
    if (fetchReturnOrders?.headers?.pagination) {
      var paginated_data_to_parse = fetchReturnOrders.headers.pagination
      const paginated_data = JSON.parse(paginated_data_to_parse)
      setCurrentPage(paginated_data.currentPage)
      setTotalPage(paginated_data.totalPages)
      setTotalItems(paginated_data.totalItems)
      setItemPerPage(paginated_data.itemsPerPage)
    }
  }, [fetchReturnOrders?.headers?.pagination])

  const handleItemPerPage = (pagePerItems) => {
    setCurrentPage(1)
    setItemPerPage(pagePerItems)
  }
  const handleCurrentPage = (currentPage) => {
    setCurrentPage(currentPage)
  }

  const invoiceType = 3

  const returnOrderDateTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{moment(rowData.returnDate).format('Do MMMM YYYY, h:mm A')}</span>
      </React.Fragment>
    )
  }
  const paymentStatusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {rowData?.paymentStatus === 'Pending' ? (
          <Tag severity='danger' value={rowData?.paymentStatus} rounded></Tag>
        ) : (
          <Tag severity='success' value={rowData?.paymentStatus} rounded></Tag>
        )}
      </React.Fragment>
    )
  }
  const productDetailsTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          <Button
            onClick={() => {
              setOrderInfo(rowData)
              setVisible(true)
            }}
            style={{
              fontSize: '14px',
              padding: '4px 10px',
              marginRight: '5px',
            }}
          >
            Details
          </Button>
          {order_filter_tab === 'refund_processing' ? (
            <Button
              onClick={() => {
                setOrderInfo(rowData)
                setRefundVisible(true)
              }}
              className='p-button-success'
              style={{
                fontSize: '14px',
                padding: '4px 10px',
              }}
            >
              Refund
            </Button>
          ) : null}
        </span>
      </React.Fragment>
    )
  }

  useEffect(() => {
    if (location.location.pathname === '/ReturnOrders')
      setPathnameOptions('return')
  }, [location.location.pathname])
  useEffect(() => {
    if (pathnameOptions !== null && order_filter_tab === 'refund') {
      dispatch(
        fetchRefundedDataRecord(pathnameOptions, currentPage, itemPerPage)
      )
    }
  }, [pathnameOptions, order_filter_tab, currentPage, itemPerPage])
  const refunded_data = useSelector(
    (state) => state.refundReducer.get_refunded_data
  )
  useEffect(() => {
    if (refunded_data?.headers?.pagination) {
      var paginated_data_to_parse = refunded_data.headers.pagination
      const paginated_data = JSON.parse(paginated_data_to_parse)
      setCurrentPage(paginated_data.currentPage)
      setTotalPage(paginated_data.totalPages)
      setTotalItems(paginated_data.totalItems)
      setItemPerPage(paginated_data.itemsPerPage)
    }
  }, [refunded_data?.headers?.pagination])
  const refunded_loading = useSelector((state) => state.refundReducer.loading)

  const refundTateBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{moment(rowData.refundDate).format('Do MMMM YYYY, h:mm A')}</span>
      </React.Fragment>
    )
  }
  const refundDetailsBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          <Button
            onClick={() => {
              setOrderInfo(rowData)
              setRefundedVisible(true)
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
  const refundTotalBodyTateBodyTemplate = (rowData) => {
    const total_amount = rowData.productDetails.reduce(
      (total, currentValue) => (total = total + currentValue.amount),
      0
    )
    setTotalRefundAmount(total_amount)
    return (
      <React.Fragment>
        <span>{total_amount}</span>
      </React.Fragment>
    )
  }
  const paymentMethodTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          {rowData.paymentMethodName
            ? rowData.paymentMethodName === 'COD'
              ? 'Cash On Delivery'
              : rowData.paymentMethodName
            : 'Not Selected Yet'}
        </span>
      </React.Fragment>
    )
  }

  return (
    <div className='page-wrapper'>
      <div className='container-fluid'>
        <div className='col-md-12'>
          <div className='white-box'>
            <div className='datatable-doc-demo datatable-responsive-demo'>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                className='card'
              >
                <ul class='nav nav-tabs seller-tabs'>
                  <li>
                    <Link
                      to={`/ReturnOrders?status=return_request`}
                      style={
                        order_filter_tab === 'return_request'
                          ? { color: '#7391CD' }
                          : null
                      }
                    >
                      Return Request
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/ReturnOrders?status=parcel_pickup_pending`}
                      style={
                        order_filter_tab === 'parcel_pickup_pending'
                          ? { color: '#7391CD' }
                          : null
                      }
                    >
                      Parcel Pickup Pending
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/ReturnOrders?status=parcel_returning`}
                      style={
                        order_filter_tab === 'parcel_returning'
                          ? { color: '#7391CD' }
                          : null
                      }
                    >
                      Parcel Returning
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/ReturnOrders?status=refund_processing`}
                      style={
                        order_filter_tab === 'refund_processing'
                          ? { color: '#7391CD' }
                          : null
                      }
                    >
                      Refund Processing
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/ReturnOrders?status=refund`}
                      style={
                        order_filter_tab === 'refund'
                          ? { color: '#7391CD' }
                          : null
                      }
                    >
                      Refund
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/ReturnOrders?status=returned`}
                      style={
                        order_filter_tab === 'returned'
                          ? { color: '#7391CD' }
                          : null
                      }
                    >
                      Returned
                    </Link>
                  </li>
                </ul>
                {order_filter_tab !== 'refund' && (
                  <Link
                    to={{
                      pathname: `/invoiceAdmin`,
                      selectedOrders,
                      invoiceType,
                      order_filter_tab,
                    }}
                  >
                    <button
                      className='btn btn-info'
                      style={{
                        padding: '4px 20px',
                        fontSize: '13px ',
                        marginRight: '5px',
                        marginLeft: '10px',
                      }}
                      disabled={
                        selectedOrders === null || selectedOrders?.length === 0
                      }
                    >
                      Print
                    </button>
                  </Link>
                )}

                <InputText
                  style={{ width: '25%' }}
                  className='form-control text-center'
                  type='search'
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder='Search'
                />
              </div>
              {order_filter_tab === 'refund' ? (
                <div className='card'>
                  {refunded_loading ? (
                    <LoadingCard count={1} />
                  ) : (
                    <>
                      <DataTable
                        className='p-datatable-customers p-datatable-responsive-demo'
                        value={refunded_data?.data}
                        rowHover
                        globalFilter={globalFilter}
                        emptyMessage='No order(s) found'
                        selection={selectedOrders}
                        onSelectionChange={(e) => setSelectedOrders(e.value)}
                      >
                        {order_filter_tab !== 'refund' && (
                          <Column selectionMode='multiple' />
                        )}
                        <Column
                          field='refundTranNo'
                          filterField='refundTranNo'
                          header='Transaction No'
                          sortable
                        />
                        <Column
                          field='refundDate'
                          filterField='refundDate'
                          header='Transaction Date'
                          body={refundTateBodyTemplate}
                          sortable
                        />
                        <Column
                          field='orderInvoiceNo'
                          filterField='orderInvoiceNo'
                          header='Order No'
                          sortable
                        />
                        <Column
                          field='customerName'
                          filterField='customerName'
                          header='Customer'
                          sortable
                        />
                        <Column
                          field='methodName'
                          filterField='methodName'
                          header='Payment Method'
                          sortable
                        />
                        <Column
                          field='accountNo'
                          filterField='accountNo'
                          header='Account No.'
                          sortable
                        />
                        <Column
                          header='Amount'
                          body={refundTotalBodyTateBodyTemplate}
                        />
                        <Column
                          header='Action'
                          body={refundDetailsBodyTemplate}
                        />
                      </DataTable>
                      <Paginator
                        totalPage={totalPage}
                        currentPage={currentPage}
                        itemPerPage={itemPerPage}
                        totalItems={totalItems}
                        items={refunded_data.data}
                        itemsPerPageOptions={[30, 60, 90, 100, 200, 300]}
                        handleItemPerPage={handleItemPerPage}
                        handleCurrentPage={handleCurrentPage}
                      />
                    </>
                  )}
                </div>
              ) : (
                <div className='card'>
                  {loading ? (
                    <LoadingCard count={1} />
                  ) : (
                    <>
                      <DataTable
                        className='p-datatable-customers p-datatable-responsive-demo'
                        value={fetchReturnOrders?.data}
                        rowHover
                        globalFilter={globalFilter}
                        emptyMessage='No order(s) found'
                        selection={selectedOrders}
                        onSelectionChange={(e) => setSelectedOrders(e.value)}
                      >
                        <Column selectionMode='multiple' />
                        <Column
                          field='returnInvoiceNo'
                          filterField='returnInvoiceNo'
                          header='Return Invoice No'
                          sortable
                        />
                        <Column
                          field='returnDate'
                          filterField='returnDate'
                          header='Return Date'
                          body={returnOrderDateTemplate}
                          sortable
                        />
                        <Column
                          field='orderInvoiceNo'
                          filterField='orderInvoiceNo'
                          header='Invoice No'
                          sortable
                        />
                        <Column
                          field='shopName'
                          filterField='shopName'
                          header='Shop Name'
                          sortable
                        />
                        <Column
                          field='paymentMethodName'
                          filterField='paymentMethodName'
                          header='Payment Method'
                          body={paymentMethodTemplate}
                          sortable
                        />
                        <Column
                          field='paymentStatus'
                          filterField='paymentStatus'
                          header='Payment Status'
                          body={paymentStatusBodyTemplate}
                          sortable
                        />
                        <Column
                          field='totalAmount'
                          filterField='totalAmount'
                          header='Amount'
                          sortable
                        />
                        <Column header='Action' body={productDetailsTemplate} />
                      </DataTable>
                      <Paginator
                        totalPage={totalPage}
                        currentPage={currentPage}
                        itemPerPage={itemPerPage}
                        totalItems={totalItems}
                        items={fetchReturnOrders?.data}
                        itemsPerPageOptions={[30, 60, 90, 100, 200, 300]}
                        handleItemPerPage={handleItemPerPage}
                        handleCurrentPage={handleCurrentPage}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        title='Return Order Details'
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1500}
      >
        <FetchReturnOrderTrackingAdmin
          orderInfo={orderInfo}
          setVisible={setVisible}
          status_for_api_call={status_for_api_call}
          page={history.location.pathname}
          setCounts={setCounts}
          counts={counts}
          setStatusId={setStatusId}
          setStatusName={setStatusName}
          statusId={statusId}
          statusName={statusName}
        />
      </Modal>
      <Modal
        title='Refund Returned Orders'
        centered
        visible={refundVisible}
        onOk={() => setRefundVisible(false)}
        onCancel={() => setRefundVisible(false)}
        width={1500}
      >
        <CancelRefundModal
          orderInfo={orderInfo}
          counts={counts}
          setCounts={setCounts}
          setRefundVisible={setRefundVisible}
        />
      </Modal>
      <Modal
        title='Refunded Cancel Orders'
        centered
        visible={refundedVisible}
        onOk={() => setRefundedVisible(false)}
        onCancel={() => setRefundedVisible(false)}
        width={1500}
      >
        <RefundedOrdersModal
          orderInfo={orderInfo}
          totalRefundAmount={totalRefundAmount}
        />
      </Modal>
    </div>
  )
}
