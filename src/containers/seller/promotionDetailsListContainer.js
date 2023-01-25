import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'
import * as promotionDetailsAction from '../../store/actions/promotionDetailsAction'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import { InputText } from 'primereact/inputtext'
import { Link } from 'react-router-dom'
import baseUrl from '../../utils/baseUrl'
import authenticationService from '../../store/services/authenticationService'
import moment from 'moment'
import 'moment-timezone'
import sellerService from '../../store/services/sellerService'
import * as sellerProfileAction from '../../store/actions/sellerProfileAction'
import * as productAction from '../../store/actions/productAction'
import * as discountHistoryAction from '../../store/actions/discountHistoryAction'
import LoadingCard from '../../components/shared/LoadingCard'
import Message from '../../components/shared/Message'

class promotionDetailsListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      promotions: null,
      selectedPromotions: null,
      selectedProducts: null,
      products: null,
      globalFilter: null,
      shopProducts: null,
      input: null,
      result: null,
      loading: false,
      position: 'center',
      allSelected: false,
      discount: null,
      discountAmount: '',
      selectedProducts: [],
      singleDiscountProfile: [],
      mergedData: [],
      productDiscountHistories: [],
      today: new Date(),
    }
    this.nameTemplate = this.nameTemplate.bind(this)
    this.imageTemplate = this.imageTemplate.bind(this)
    this.promotionTypeTemplate = this.promotionTypeTemplate.bind(this)
    this.startDateTemplate = this.startDateTemplate.bind(this)
    this.endDateTemplate = this.endDateTemplate.bind(this)
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this)
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    this.onIndexTemplate = this.onIndexTemplate.bind(this)
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this)
    this.deletePromotion = this.deletePromotion.bind(this)
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let userId = sellerService.getEmployeeId()
    let roleId = authenticationService.getRoleId()
    if (roleId === '2') {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push('/sellerLogin')
    }
    //End Temporary Authentication

    await this.props.getShopDetailsBySellerIdRecord(userId)

    this.props.sellerProfile[0] &&
      this.setState({
        shopId: this.props.sellerProfile[0].shopId,
      })

    let id = this.state.shopId
    await this.props.getSellerPromotionalProductsRecord(id)

    this.setState({
      products: this.props.products,
    })

    await this.props.getPromotionDetailsRecord()
    this.setState({ promotions: this.props.promotionDetails })
  }

  priceBodyTemplate(rowData) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(rowData.price)
  }

  productPrice = (rowData) => {
    return <React.Fragment>{rowData.productPrice}</React.Fragment>
  }

  nameTemplate = (rowData) => {
    return <React.Fragment>{rowData.name}</React.Fragment>
  }

  imageTemplate = (rowData) => {
    return (
      <React.Fragment>
        <img
          src={baseUrl.concat(rowData.image)}
          className='thumb-md product-image'
          alt='img'
          style={{ verticalAlign: 'middle' }}
        />
      </React.Fragment>
    )
  }

  sellerProductImage = (products) => {
    return (
      <React.Fragment>
        <img
          src={baseUrl.concat(products.thumbnailImage)}
          className='thumb-pic product-image'
          style={{ width: '50px', height: '50px', borderRadius: '5px' }}
          alt='img'
        />
      </React.Fragment>
    )
  }

  promotionTypeTemplate = (rowData) => {
    return <React.Fragment>{rowData.discountTypeName}</React.Fragment>
  }

  startDateTemplate = (rowData) => {
    return (
      <React.Fragment>
        {moment(rowData.startDate).format('Do MMMM YYYY')}
      </React.Fragment>
    )
  }

  startTimeTemplate = (rowData) => {
    return (
      <React.Fragment>
        {moment(rowData.startDate).format('h:mm a')}
      </React.Fragment>
    )
  }

  endDateTemplate = (rowData) => {
    return (
      <React.Fragment>
        {moment(rowData.endDate).format('Do MMMM YYYY')}
      </React.Fragment>
    )
  }

  endTimeTemplate = (rowData) => {
    return (
      <React.Fragment>
        {moment(rowData.endDate).format('h:mm a')}
      </React.Fragment>
    )
  }

  statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Status</span>
        <span
          className={
            rowData.isActive === 'Y'
              ? 'p-tag p-tag-primary'
              : 'p-tag p-tag-warning'
          }
        >
          {rowData.isActive === 'Y' ? 'ACTIVE' : 'INACTIVE'}
        </span>
      </React.Fragment>
    )
  }

  discountPrice = (rowData) => {
    //this.setState({ discountAmount: Math.round((rowData.productPrice)-(rowData.productPrice / 100) * rowData.discountPercent) });
    return (
      <React.Fragment>
        {Math.round(
          rowData.productPrice -
            (rowData.productPrice / 100) * rowData.discountPercent
        )}
      </React.Fragment>
    )
  }

  productQuantityBody = (rowData) => {
    //this.setState({ discountAmount: Math.round((rowData.productPrice)-(rowData.productPrice / 100) * rowData.discountPercent) });
    return <React.Fragment>{rowData.productQuantity}</React.Fragment>
  }

  sellerProductSkuBody = (rowData) => {
    //this.setState({ discountAmount: Math.round((rowData.productPrice)-(rowData.productPrice / 100) * rowData.discountPercent) });
    return <React.Fragment>{rowData.sellerProductSku}</React.Fragment>
  }

  mergeAction(products, rowData) {
    this.setState({ shopProducts: products, singleDiscountProfile: rowData })
    this.handleMergeData(products, rowData)
  }

  handleMergeData = (products, rowData) => {
    this.setState({
      mergedData: products && products.map((v) => ({ ...v, ...rowData })),
    })
  }

  actionBodyTemplate = (rowData) => {
    const d = new Date(rowData.regEndDate)
    const isReg = d > this.state.today

    return (
      <React.Fragment>
        <Toast ref={(el) => (this.toast = el)} />
        <span className='p-column-title'>Action</span>
        <span className='p-buttonset'>
          {isReg && rowData.isActive === 'Y' ? (
            <Button
              label='Join Now'
              data-toggle='modal'
              data-target='#detailsModal'
              onClick={() => this.mergeAction(this.state.products, rowData)}
              style={{ marginRight: '2px' }}
            />
          ) : (
            <Button label='Join Now' disabled />
          )}
        </span>
      </React.Fragment>
    )
  }

  onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1
  }

  deletePromotion = async (data) => {
    const resultData = {
      productPromotionTypeId: data.productPromotionTypeId,
      productPromotionTypeName: data.productPromotionTypeName,
      isActive: 'D',
    }

    await this.props.createPromotionTypeRecord(resultData)
    window.location.reload(true)
    this.setState({
      loading: true,
    })
    this.showTrue(true)
  }

  rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Link to='/CreateDiscountSummary'>
          <div className='button-demo'>
            <Button
              icon='pi pi-times'
              className='p-button-rounded p-button-danger p-button-outlined'
            />
          </div>
        </Link>
      </React.Fragment>
    )
  }

  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <div className='p-text-bold table-heading-style'>
          List of Promotions
        </div>
      </React.Fragment>
    )
  }

  renderHeader() {
    return (
      <>
        <div className='table-header'>
          <span className='p-input-icon-left'>
            <InputText
              type='search'
              className='form-control text-center text-field'
              onInput={(e) => this.setState({ globalFilter: e.target.value })}
              placeholder='Search by Promotion name'
            />
          </span>
        </div>
      </>
    )
  }

  createDiscountHistoryRecord = async () => {
    const result = await this.props.createDiscountHistoryRecord(
      this.state.productDiscountHistories
    )

    if (result.type === 'CREATE_DISCOUNT_HISTORY_SUCCESS') {
      toast.success('Product(s) Added To Capaign Successfully')
      setTimeout(() => {
        this.props.history.push('PromotionDetailsList')
      }, 2500)
    }
    if (result.type === 'CREATE_DISCOUNT_HISTORY_ERROR') {
      toast.error('Something Went Wrong! Please Try Again Later...')
      setTimeout(() => {
        this.props.history.push('PromotionDetailsList')
      }, 2500)
    }
  }

  render() {
    const header = this.renderHeader()

    return (
      <>
        <div className='page-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='white-box'>
                  <div className='datatable-doc-demo datatable-responsive-demo'>
                    <div className='card'>
                      <Toolbar
                        className='p-mb-4'
                        right={this.rightToolbarTemplate}
                        left={this.leftToolbarTemplate}
                      ></Toolbar>
                      {this.props.loading ? (
                        <LoadingCard count={1} />
                      ) : this.props.error ? (
                        <Message variant='danger'>{this.props.error}</Message>
                      ) : (
                        <DataTable
                          header={header}
                          ref={(el) => (this.dt = el)}
                          value={this.state.promotions}
                          className='p-datatable-customers p-datatable-responsive-demo'
                          dataKey='id'
                          rowHover
                          globalFilter={this.state.globalFilter}
                          selection={this.state.selectedPromotions}
                          onSelectionChange={(e) =>
                            this.setState({ selectedPromotions: e.value })
                          }
                          paginator
                          rows={10}
                          emptyMessage='No Promotion found'
                          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                          rowsPerPageOptions={[10, 25, 50]}
                          {...this.state}
                          promotions={this.props.promotions}
                          values={this.values}
                          loading={this.state.loading}
                        >
                          <Column
                            field='Index'
                            header='SN'
                            body={this.onIndexTemplate}
                          />
                          
                          <Column
                            sortField='name'
                            filterField='name'
                            header='Promotion Name'
                            body={this.nameTemplate}
                            sortable
                          />
                          <Column
                            sortField='image'
                            header='Logo'
                            body={this.imageTemplate}
                          />
                          <Column
                            sortField='promotionType'
                            filterField='promotionType'
                            header='Promotion Type'
                            body={this.promotionTypeTemplate}
                            sortable
                          />
                          <Column
                            sortField='startDate'
                            filterField='startDate'
                            header='Start Date'
                            body={this.startDateTemplate}
                            sortable
                          />
                          <Column
                            sortField='startTime'
                            filterField='startTime'
                            header='Start Time'
                            body={this.startTimeTemplate}
                            sortable
                          />
                          <Column
                            sortField='endDate'
                            filterField='endDate'
                            header='End Date'
                            body={this.endDateTemplate}
                            sortable
                          />
                          <Column
                            sortField='endTime'
                            filterField='endTime'
                            header='End Time'
                            body={this.endTimeTemplate}
                            sortable
                          />
                          <Column
                            sortField='isActive'
                            header='Status'
                            body={this.statusBodyTemplate}
                            sortable
                          />
                          <Column
                            field='action'
                            header='Action'
                            body={this.actionBodyTemplate}
                          />
                        </DataTable>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* MODAL */}
        <div
          className='modal fade '
          id='detailsModal'
          tabindex='-1'
          role='dialog'
          aria-labelledby='exampleModalCenterTitle'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-xl' role='document'>
            <div
              className='modal-content'
              // style={{ height: " 90vh", width: " 60vw" }}
            >
              <div className='modal-header'>
                <h4 className='modal-title' id='exampleModalLongTitle'>
                  Product List
                </h4>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <div className='datatable-editing-demo datatable-responsive-demo'>
                  <Toast ref={(el) => (this.toast = el)} />
                  <div className='card'>
                    <DataTable
                      value={this.state.mergedData}
                      selection={this.state.selectedProducts}
                      onSelectionChange={(e) =>
                        this.setState({
                          selectedProducts: e.value,
                          productDiscountHistories:
                            e.value &&
                            e.value.map((data) => ({
                              discountHistoryId: 0,
                              discountSummaryId: data.discountSummaryId,
                              productId: data.productId,
                              productDetailsId: data.productDetailsId,
                              campaignPrice: Math.round(
                                data.productPrice -
                                  (data.productPrice / 100) *
                                    data.discountPercent
                              ),
                              discountPercent: data.discountPercent,
                              discountAmount: Math.round(
                                (data.productPrice / 100) * data.discountPercent
                              ),
                              unitId: data.unitId,
                              productPrice: data.productPrice,
                              isActive: 'Y',
                            })),
                        })
                      }
                      dataKey='productDetailsId'
                      paginator
                      rows={10}
                      emptyMessage='No Products found'
                      currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                      paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                      // rowsPerPageOptions={[10, 25, 50]}
                    >
                      <Column
                        selectionMode='multiple'
                        headerStyle={{ width: '3em' }}
                      ></Column>
                      <Column
                        field='productTitle'
                        header='Product Title'
                      ></Column>
                      <Column
                        field='thumbnailImage'
                        header='Image'
                        body={this.sellerProductImage}
                      ></Column>
                      <Column
                        field='productPrice'
                        header='Product Price'
                      ></Column>
                      <Column
                        field='discountPrice'
                        header='Discount Price'
                        body={this.discountPrice}
                      ></Column>
                      <Column
                        field='discountPercent'
                        header='Discount (%)'
                      ></Column>
                      <Column
                        field='productQuantity'
                        header='Quantity'
                        body={this.productQuantityBody}
                      ></Column>
                      <Column
                        field='sellerProductSku'
                        header='Product SKU'
                        body={this.sellerProductSkuBody}
                      ></Column>
                    </DataTable>
                  </div>
                </div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => this.createDiscountHistoryRecord()}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* MODAL END */}

        <ToastContainer autoClose={1500} />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  sellerProfile: state.sellerProfileReducer.shopDetails,
  promotionDetails: state.promotionDetailsReducer.promotionDetails,
  products: state.productReducer.sellerPromotionalProducts,
  loading: state.promotionDetailsReducer.loading,
  error: state.promotionDetailsReducer.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getPromotionDetailsRecord: () =>
      dispatch(promotionDetailsAction.getPromotionDetailsRecord()),

    getShopDetailsBySellerIdRecord: (index) =>
      dispatch(sellerProfileAction.getShopDetailsBySellerIdRecord(index)),

    getSellerPromotionalProductsRecord: (shopId) =>
      dispatch(productAction.getSellerPromotionalProductsRecord(shopId)),

    createDiscountHistoryRecord: (data) =>
      dispatch(discountHistoryAction.createDiscountHistoryRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(promotionDetailsListContainer)
