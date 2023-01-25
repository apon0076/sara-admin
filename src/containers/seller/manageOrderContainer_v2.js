/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import LoadingCard from '../../components/shared/LoadingCard'
import { sellerStatusWiseOrderListRecord, getSellerOrderDetailsRecord } from '../../store/actions/orderAction'
import { Modal } from 'antd'
import SellerOrderTracking from '../../components/seller/SellerOrderTracking'
import authenticationService from '../../store/services/authenticationService'
import moment from 'moment'
import { Paginator } from '../../components/paginator/Paginator'

export default function ManageOrderContainer_v2() {
  const [globalFilter, setGlobalFilter] = useState(null)
  const [orderInfo, setOrderInfo] = useState(null)
  const [visible, setVisible] = useState(false)
  const [counts, setCounts] = useState(1)
  const [selectedOrders, setSelectedOrders] = useState(null)
  const [statusId, setStatusId] = useState(null)
  const [statusName, setStatusName] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(30)
  const [totalPage, setTotalPage] = useState(null)
  const [totalItems, setTotalItems] = useState(null)
  const [customerData, setCustomerData] = useState(null)

  const dispatch = useDispatch()
  let history = useHistory()
  useEffect(() => {
    let roleId = authenticationService.getRoleId()
    if (roleId === '2') {
    } else {
      history.push('/SellerLogin')
    }
  }, [])

  useEffect(() => {
    setStatusId(null)
    setStatusName(null)
  }, [visible])

  const location = useHistory()
  const order_filter_tab = location?.location?.search?.substring(8)
  const status_for_api_call = order_filter_tab.replaceAll('_', ' ')
  const status_arr = status_for_api_call.split(' ')
  for (var i = 0; i < status_arr.length; i++) {
    status_arr[i] =
      status_arr[i].charAt(0).toUpperCase() + status_arr[i].slice(1)
  }
  const reformed_status = status_arr.join(' ')
  const orders_info = useSelector(
    (state) => state.orderReducer.sellerStatusWiseOrderList
  )
  
  const sellerOrderDetails = useSelector(
    (state) => state.orderReducer.sellerOrderDetails
  )
  useEffect(() => {
  sellerOrderDetails && setOrderInfo(sellerOrderDetails?.data)
}, [sellerOrderDetails])

  useEffect(() => {
    if (orders_info?.headers?.pagination) {
      var paginated_data_to_parse = orders_info.headers.pagination
      const paginated_data = JSON.parse(paginated_data_to_parse)
      setCurrentPage(paginated_data.currentPage)
      setTotalPage(paginated_data.totalPages)
      setTotalItems(paginated_data.totalItems)
      setItemPerPage(paginated_data.itemsPerPage)
    }
  }, [orders_info?.headers?.pagination])

  const loading = useSelector((state) => state.orderReducer.loading)
  const seller_info = useSelector(
    (state) => state.sellerProfileReducer.sellerProfileById
  )
  const handleItemPerPage = (pagePerItems) => {
    setCurrentPage(1)
    setItemPerPage(pagePerItems)
  }
  const handleCurrentPage = (currentPage) => {
    setCurrentPage(currentPage)
  }
  const handleSellerManageOrder = ( orderProfileId ) => {
    dispatch(getSellerOrderDetailsRecord(orderProfileId));
  };

  useEffect(() => {
      dispatch(
        sellerStatusWiseOrderListRecord(
          reformed_status,
          currentPage,
          itemPerPage
        )
      )
  }, [
    reformed_status,
    counts,
    currentPage,
    itemPerPage,
  ])
  const invoiceType = 1

  const orderNoBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.orderNo}</span>
      </React.Fragment>
    )
  }
  const orderInvoiceNoBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.orderInvoiceNo}</span>
      </React.Fragment>
    )
  }
  const customerNameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.customerName}</span>
      </React.Fragment>
    )
  }

  const orderDateTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          {moment(rowData.createDate).format('Do MMMM YYYY, h:mm A')}{' '}
        </span>
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
  const productPriceBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.totalPayableAmt}</span>
      </React.Fragment>
    )
  }

  const productDetailsTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          onClick={() => {
            handleSellerManageOrder(
              rowData?.orderProfileId
            );
            setCustomerData(rowData)
            setVisible(true)
          }}
        >
          Details
        </Button>
      </React.Fragment>
    )
  }

  return (
    <div className='page-wrapper'>
      <div className='container-fluid'>
        <div className='col-md-12'>
          <div className='white-box'>
            <div className='datatable-doc-demo datatable-responsive-demo'>
              <div className='card'>
                <ul class='nav nav-tabs seller-tabs'>
                  <li>
                    <Link
                      to={`/ManageOrder?status=pending`}
                      style={
                        order_filter_tab === 'pending'
                          ? { color: '#7391CD' }
                          : null
                      }
                    >
                      Pending
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/ManageOrder?status=order_confirm`}
                      style={
                        order_filter_tab === 'order_confirm'
                          ? { color: '#7391CD' }
                          : null
                      }
                    >
                      Order Confirm
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/ManageOrder?status=order_processing`}
                      style={
                        order_filter_tab === 'order_processing'
                          ? { color: '#7391CD' }
                          : null
                      }
                    >
                      Order Processing
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/ManageOrder?status=ready_to_ship`}
                      style={
                        order_filter_tab === 'ready_to_ship'
                          ? { color: '#7391CD' }
                          : null
                      }
                    >
                      Ready to Ship
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/ManageOrder?status=picked`}
                      style={
                        order_filter_tab === 'picked'
                          ? { color: '#7391CD' }
                          : null
                      }
                    >
                      Picked
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/ManageOrder?status=delivered`}
                      style={
                        order_filter_tab === 'delivered'
                          ? { color: '#7391CD' }
                          : null
                      }
                    >
                      Delivered
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={`/ManageOrder?status=delivery_failed`}
                      style={
                        order_filter_tab === 'delivery_failed'
                          ? { color: '#7391CD' }
                          : null
                      }
                    >
                      Delivery Failed
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <p
                  style={{
                    display: 'flex',
                    fontWeight: '600',
                    fontSize: '16px',
                    margin: '0',
                  }}
                >
                  <span style={{ marginRight: '4px' }}>
                    {order_filter_tab === 'pending' ? (
                      <p>Pending</p>
                    ) : order_filter_tab === 'order_confirm' ? (
                      <p>Order Confirm</p>
                    ) : order_filter_tab === 'order_processing' ? (
                      <p>Order Processing</p>
                    ) : order_filter_tab === 'ready_to_ship' ? (
                      <p>Ready to Ship</p>
                    ) : order_filter_tab === 'picked' ? (
                      <p>Picked</p>
                    ) : order_filter_tab === 'delivered' ? (
                      <p>Delivered</p>
                    ) : order_filter_tab === 'shipped' ? (
                      <p>Shipped</p>
                    ) : order_filter_tab === 'delivery_failed' ? (
                      <p>Failed Delivery</p>
                    ) : (
                      <p>Return</p>
                    )}
                  </span>
                  Products List
                  <Link
                    to={{
                      pathname: `/SellerInvoice`,
                      data: selectedOrders,
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
                </p>

                <div style={{ width: '20%' }}>
                  <InputText
                    className='form-control text-center'
                    type='search'
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder='Search'
                  />
                </div>
              </div>
              <div className='card'>
                {loading ? (
                  <LoadingCard count={1} />
                ) : (
                  <>
                    <DataTable
                      className='p-datatable-customers p-datatable-responsive-demo'
                      value={orders_info.data}
                      rowHover
                      globalFilter={globalFilter}                   
                      emptyMessage='No order(s) found'
                      selection={selectedOrders}
                      onSelectionChange={(e) => setSelectedOrders(e.value)}
                    >
                      <Column selectionMode='multiple' />
                      <Column
                        field='orderInvoiceNo'
                        filterField='orderInvoiceNo'
                        header='Invoice No'
                        body={orderInvoiceNoBodyTemplate}
                        sortable
                      />
                      <Column
                        field='orderNo'
                        filterField='orderNo'
                        header='Order No'
                        body={orderNoBodyTemplate}
                        sortable
                      />
                      <Column
                        field='customerName'
                        filterField='customerName'
                        header='Customer Name'
                        body={customerNameBodyTemplate}
                        sortable
                      />
                      <Column
                        field='productTitle'
                        filterField='productTitle'
                        header='Order Date'
                        body={orderDateTemplate}
                        sortable
                      />
                      <Column
                        field='methodName'
                        filterField='methodName'
                        header='Payment Method'
                        body={paymentMethodTemplate}
                        sortable
                      />
                      <Column
                        field='bdtTotalPayableAmount'
                        filterField='bdtTotalPayableAmount'
                        header='Price'
                        body={productPriceBodyTemplate}
                        sortable
                      />
                      <Column header='Action' body={productDetailsTemplate} />
                    </DataTable>
                    <Paginator
                      totalPage={totalPage}
                      currentPage={currentPage}
                      itemPerPage={itemPerPage}
                      totalItems={totalItems}
                      items={orders_info.data}
                      itemsPerPageOptions={[30, 60, 90, 100, 200, 300]}
                      handleItemPerPage={handleItemPerPage}
                      handleCurrentPage={handleCurrentPage}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title='Order Details'
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1500}
      >
        <SellerOrderTracking
          orderInfo={orderInfo}
          customerData={customerData}
          setVisible={setVisible}
          setCounts={setCounts}
          counts={counts}
          seller_info={seller_info}
          order_filter_tab={order_filter_tab}
          setStatusId={setStatusId}
          setStatusName={setStatusName}
          statusId={statusId}
          statusName={statusName}
        />
      </Modal>
    </div>
  )
}
