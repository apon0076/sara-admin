import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  approveProductRecord,
  getProductDetailsRecord,
  getProductListRecord,
  rejectProductRecord,
} from '../../store/actions/productAction'
import { getCategoryRecord } from '../../store/actions/categoryAction'
import { getBrandRecord } from '../../store/actions/brandAction'
import { ProductDetailsModal } from '../../components/product/ProductDetailsModal'
import { ProductListTable } from '../../components/product/ProductListTable'
import authenticationService from '../../store/services/authenticationService'

export const ManageSellerProducts = () => {
  const [currency, setCurrency] = useState('BDT')
  const [isApproved, setIsApproved] = useState()
  const [isDeleted, setIsDeleted] = useState('N')
  const [viewDetailsProductId, setViewDetailsProductId] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(null)
  const [itemPerPage, setItemPerPage] = useState(30)
  const [totalItems, setTotalItems] = useState(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchKeywordApi, setSearchKeywordApi] = useState('')
  const [category, setCategory] = useState('')
  const [categoryApi, setCategoryApi] = useState('')
  const [brandId, setBrandId] = useState('')
  const [brandIdApi, setBrandIdApi] = useState('')
  const [statusCode, setStatusCode] = useState('')
  const [statusCodeApi, setStatusCodeApi] = useState('')

  const location = useHistory()

  const currentLocation = location?.location?.pathname

  useEffect(() => {
    if (location.location.state) {
      setCurrentPage(location.location?.state.state.currentPage)
      setItemPerPage(location.location?.state.state.itemPerPage)
    }
  }, [])
  const dispatch = useDispatch()

  const product_status = location?.location?.search?.substring(8)
  useEffect(() => {
    if (
      product_status !== 'pending' &&
      product_status !== 'approved' &&
      product_status !== 'rejected'
    ) {
      location.push('/manage-products?status=pending')
    }
  }, [location, product_status])
  useEffect(() => {
    if (product_status === 'pending') {
      setIsApproved('N')
    } else if (product_status === 'approved') {
      setIsApproved('Y')
    } else {
      setIsApproved('R')
    }
  }, [isApproved === undefined])
  useEffect(() => {
    if (isApproved && isDeleted) {
      dispatch(
        getProductListRecord(
          currency,
          isApproved,
          isDeleted,
          currentPage,
          itemPerPage,
          searchKeywordApi,
          categoryApi,
          brandIdApi,
          statusCodeApi
        )
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isApproved,
    currentPage,
    itemPerPage,
    searchKeywordApi,
    categoryApi,
    brandIdApi,
    statusCodeApi,
  ])
  const searchProductList = () => {
    setSearchKeywordApi(searchKeyword)
    setCategoryApi(category)
    setBrandIdApi(brandId)
    setStatusCodeApi(statusCode)
  }
  useEffect(() => {
    if (viewDetailsProductId !== null) {
      dispatch(
        getProductDetailsRecord(viewDetailsProductId, currency, isApproved)
      )
    }
  }, [dispatch, viewDetailsProductId, currency, isApproved])
  const products = useSelector((state) => state.productReducer)
  const {
    getProductList,
    loading,
    getProductDetails,
    approvedProductStatus,
    rejectedProductStatus,
    productDetailsLoading,
  } = products
  const handleItemPerPage = (pagePerItems) => {
    setCurrentPage(1)
    setItemPerPage(pagePerItems)
  }
  const handleCurrentPage = (currentPage) => {
    setCurrentPage(currentPage)
  }
  useEffect(() => {
    dispatch(getCategoryRecord())
    dispatch(getBrandRecord())
  }, [])
  const categories = useSelector((state) => state.categoryReducer.categories)
  const brands = useSelector((state) => state.brandReducer.brands)
  const handleActiveProduct = (rowData) => {
    const data = {
      productId: rowData.productId,
      isApprove: 'Y',
      isDelete: '',
      productStatus: 'Y',
      operationType: 'productStatus',
    }
    dispatch(rejectProductRecord(data))
  }
  const handleInActiveProduct = (rowData) => {
    const data = {
      productId: rowData.productId,
      isApprove: 'Y',
      isDelete: '',
      productStatus: 'N',
      operationType: 'productStatus',
    }
    dispatch(rejectProductRecord(data))
  }
  const handleApproveProduct = (id) => {
    const data = {
      productId: id,
      isApprove: 'Y',
      isDelete: '',
      productStatus: 'Y',
      operationType: 'isApprove',
    }
    dispatch(approveProductRecord(data))
  }
  useEffect(() => {
    if (approvedProductStatus.length !== 0) {
      if (approvedProductStatus?.data?.succeed === true) {
        toast.success('Product  Approved.')
        dispatch(
          getProductListRecord(
            currency,
            isApproved,
            isDeleted,
            currentPage,
            itemPerPage,
            searchKeywordApi,
            categoryApi,
            brandIdApi,
            statusCodeApi
          )
        )
      } else {
        toast.error('Something Went Wrong.')
      }
    }
  }, [approvedProductStatus])
  const handleRejectedProduct = (id) => {
    const data = {
      productId: id,
      isApprove: 'R',
      isDelete: 'N',
      productStatus: 'Y',
      operationType: 'isApprove',
    }
    dispatch(rejectProductRecord(data))
  }
  useEffect(() => {
    if (rejectedProductStatus.length !== 0) {
      if (rejectedProductStatus?.succeed === true) {
        toast.success('Product  Rejected.')
        dispatch(
          getProductListRecord(
            currency,
            isApproved,
            isDeleted,
            currentPage,
            itemPerPage,
            searchKeywordApi,
            categoryApi,
            brandIdApi,
            statusCodeApi
          )
        )
      } else {
        toast.error('Something Went Wrong.')
      }
    }
  }, [rejectedProductStatus])

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className='page-wrapper'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='white-box'>
                <div className='datatable-doc-demo datatable-responsive-demo'>
                  <div className='card'>
                    <ul className='nav nav-tabs seller-tabs'>
                      <li>
                        <Link to='/createProductSeller'>Create Product</Link>
                      </li>
                      <li
                        className={
                          product_status === 'pending' ? 'active' : null
                        }
                        onClick={() => {
                          setIsApproved('N')
                          setCurrentPage(1)
                          setItemPerPage(30)
                        }}
                      >
                        <Link to='/manage-seller-products?status=pending'>
                          Pending Product
                        </Link>
                      </li>
                      <li
                        className={
                          product_status === 'approved' ? 'active' : null
                        }
                        onClick={() => {
                          setIsApproved('Y')
                          setCurrentPage(1)
                          setItemPerPage(30)
                        }}
                      >
                        <Link to='/manage-seller-products?status=approved'>
                          Approved Product
                        </Link>
                      </li>
                      <li
                        className={
                          product_status === 'rejected' ? 'active' : null
                        }
                        onClick={() => {
                          setIsApproved('R')
                          setCurrentPage(1)
                          setItemPerPage(30)
                        }}
                      >
                        <Link to='/manage-seller-products?status=rejected'>
                          Rejected Product
                        </Link>
                      </li>
                    </ul>
                    <ProductListTable
                      currentLocation={currentLocation}
                      product_status={product_status}
                      product_list={getProductList}
                      setViewDetailsProductId={setViewDetailsProductId}
                      handleItemPerPage={handleItemPerPage}
                      handleCurrentPage={handleCurrentPage}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      totalPage={totalPage}
                      setTotalPage={setTotalPage}
                      itemPerPage={itemPerPage}
                      setItemPerPage={setItemPerPage}
                      totalItems={totalItems}
                      setTotalItems={setTotalItems}
                      handleActiveProduct={handleActiveProduct}
                      handleInActiveProduct={handleInActiveProduct}
                      currency={currency}
                      isApproved={isApproved}
                      setSearchKeyword={setSearchKeyword}
                      searchKeyword={searchKeyword}
                      searchProductList={searchProductList}
                      categories={categories}
                      setCategory={setCategory}
                      category={category}
                      brands={brands}
                      setBrandId={setBrandId}
                      brandId={brandId}
                      setStatusCode={setStatusCode}
                      loading={loading}
                      setSearchKeywordApi={setSearchKeywordApi}
                      setCategoryApi={setCategoryApi}
                      setBrandIdApi={setBrandIdApi}
                      setStatusCodeApi={setStatusCodeApi}
                    />
                  </div>
                  <ProductDetailsModal
                    products={getProductDetails?.data}
                    loading={productDetailsLoading}
                    product_status={product_status}
                    handleApproveProduct={handleApproveProduct}
                    handleRejectedProduct={handleRejectedProduct}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
