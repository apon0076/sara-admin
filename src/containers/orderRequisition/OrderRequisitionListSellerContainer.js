import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import LoadingCard from '../../components/shared/LoadingCard'
import authenticationService from '../../store/services/authenticationService'
import { getOrderRequisitionRecord } from '../../store/actions/orderRequisitionAction'
import OrderRequisitionTable from '../../components/orderRequisition/OrderRequisitionTable'
import sellerService from '../../store/services/sellerService'
import { getSellerProfileByIdRecord } from '../../store/actions/sellerProfileAction'

const OrderRequisitionListContainer = () => {
  const [selectedOrders, setSelectedOrders] = useState(null)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage, setItemPerPage] = useState(30)
  const [totalPage, setTotalPage] = useState(null)
  const [totalItems, setTotalItems] = useState(null)

  const dispatch = useDispatch()
  let history = useHistory()

  useEffect(() => {
    let userId = sellerService.getEmployeeId()
    let roleId = authenticationService.getRoleId()
    if (roleId === '2') {
    } else {
      history.push('/SellerLogin')
    }
    dispatch(getSellerProfileByIdRecord(userId))
  }, [])

  const SellerProfileReducer = useSelector(
    (state) => state.sellerProfileReducer
  )
  const {
    shopDetails,
    loading: shopDetailsLoading,
    error: shopDetailsError,
  } = SellerProfileReducer

  useEffect(() => {
    if (shopDetails[0]?.sellerId === 2) dispatch(getOrderRequisitionRecord(currentPage, itemPerPage))
  }, [ shopDetails[0]?.sellerId,currentPage, itemPerPage])

  const OrderRequisition = useSelector((state) => state.orderRequisition)
  const { orderRequisition, loading, error } = OrderRequisition
  useEffect(() => {
    if (orderRequisition?.headers?.pagination) {
      var paginated_data_to_parse = orderRequisition.headers.pagination
      const paginated_data = JSON.parse(paginated_data_to_parse)
      setCurrentPage(paginated_data.currentPage)
      setTotalPage(paginated_data.totalPages)
      setTotalItems(paginated_data.totalItems)
      setItemPerPage(paginated_data.itemsPerPage)
    }
  }, [orderRequisition?.headers?.pagination])
  
  const handleItemPerPage = (pagePerItems) => {
    setCurrentPage(1)
    setItemPerPage(pagePerItems)
  }
  const handleCurrentPage = (currentPage) => {
    setCurrentPage(currentPage)
  }

  const reqisitionType = 2

  return (
    <div className='page-wrapper'>
      {shopDetails[0]?.sellerId === 2 ? (
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
                  <h4>Order Requisition</h4>
                  <Link
                    to={{
                      pathname: `/print-seller-requisition`,
                      selectedOrders,
                      reqisitionType,
                    }}
                  >
                    <button
                      className='btn btn-info'
                      style={{
                        padding: '4px 20px',
                        fontSize: '13px ',
                        marginRight: '5px',
                      }}
                      disabled={
                        selectedOrders === null || selectedOrders?.length === 0
                      }
                    >
                      <p style={{ fontSize: '16px' }}>Print</p>
                    </button>
                  </Link>
                </div>
                <InputText
                  style={{ width: '20%' }}
                  className='form-control text-center'
                  type='search'
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder='Search'
                />
                <div className='card'>
                  {loading ? (
                    <LoadingCard count={1} />
                  ) : (
                    <OrderRequisitionTable
                      orderRequisition={orderRequisition}
                      globalFilter={globalFilter}
                      setSelectedOrders={setSelectedOrders}
                      selectedOrders={selectedOrders}
                      reqisitionType={reqisitionType}
                      sellerID={shopDetails[0]?.sellerId}
                      totalPage={totalPage}
                      currentPage={currentPage}
                      itemPerPage={itemPerPage}
                      totalItems={totalItems}
                      handleItemPerPage={handleItemPerPage}
                      handleCurrentPage={handleCurrentPage}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
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
                    <h4>You have no Permission for Order Requisition Page.</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default OrderRequisitionListContainer
