import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import * as discountSummaryAction from '../../../store/actions/discountSummaryAction'
import * as sellerProfileAction from '../../../store/actions/sellerProfileAction'
import * as productCampaignSellerAction from '../../../store/actions/productCampaignSellerAction'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { Link } from 'react-router-dom'
import baseUrl from '../../../utils/baseUrl'
import authenticationService from '../../../store/services/authenticationService'
import SellerCommissionModal from '../../../components/seller/SellerCommissionModal'
import moment from 'moment'
import 'moment-timezone'
import LoadingCard from '../../../components/shared/LoadingCard'
import Message from '../../../components/shared/Message'

class discountSummaryListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      discounts: null,
      selectedDiscounts: null,
      sellerCommission: null,
      globalFilter: null,
      loading: false,
      position: 'center',
      selectedSellers: null,
      discountSummaryId: null,
      // modal state
      displayResponsive: false,
      id: 0,
      summaryId: null,
      status: 'Y',
      remarks: null,
      isSuccessful: null,
    }

    this.nameTemplate = this.nameTemplate.bind(this)
    this.imageTemplate = this.imageTemplate.bind(this)
    this.discountTypeTemplate = this.discountTypeTemplate.bind(this)
    this.discountAmountTemplate = this.discountAmountTemplate.bind(this)
    this.discountPercentTemplate = this.discountPercentTemplate.bind(this)
    this.startDateTemplate = this.startDateTemplate.bind(this)
    this.endDateTemplate = this.endDateTemplate.bind(this)
    this.regEndDateTemplate = this.regEndDateTemplate.bind(this)
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this)
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    this.onIndexTemplate = this.onIndexTemplate.bind(this)
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this)
    this.deleteDiscount = this.deleteDiscount.bind(this)

    this.onClick = this.onClick.bind(this)
    this.onHide = this.onHide.bind(this)
    // this.setId = this.setId.bind(this);
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()
    if (roleId === '1') {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push('/Login')
    }
    //End Temporary Authentication

    await this.props.getDiscountSummaryRecord()
    this.setState({ discounts: this.props.discountSummary })
    await this.props.getAllSellerCommissionRecord()
  }

  nameTemplate = (rowData) => {
    return <React.Fragment>{rowData.name}</React.Fragment>
  }

  discountAmountTemplate = (rowData) => {
    return <React.Fragment>{rowData.discountAmount}Tk</React.Fragment>
  }

  discountPercentTemplate = (rowData) => {
    return <React.Fragment>{rowData.discountPercent}%</React.Fragment>
  }

  imageTemplate = (rowData) => {
    return (
      <React.Fragment>
        <img
          src={baseUrl.concat(rowData.image)}
          className='thumb-md product-image'
          alt='img'
          style={{ verticalAlign: 'middle', objectFit: 'contain' }}
        />
      </React.Fragment>
    )
  }

  discountTypeTemplate = (rowData) => {
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

  regEndDateTemplate = (rowData) => {
    return (
      <React.Fragment>
        {moment(rowData.regEndDate).format('Do MMMM YYYY')}
      </React.Fragment>
    )
  }

  regEndTimeTemplate = (rowData) => {
    return (
      <React.Fragment>
        {moment(rowData.regEndTime).format('h:mm a')}
      </React.Fragment>
    )
  }

  statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Status</span> */}
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

  onClick(name, position) {
    let state = {
      [`${name}`]: true,
    }

    if (position) {
      state = {
        ...state,
        position,
      }
    }

    this.setState(state)
  }

  onHide(name) {
    this.setState({
      [`${name}`]: false,
    })
  }

  actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Toast ref={(el) => (this.toast = el)} />
        {/* <span className='p-column-title'>Action</span> */}
        <Link
          to={{
            pathname: `/EditDiscountSummary`,
            state: { rowData },
          }}
        >
          <Button
            icon='pi pi-pencil'
            className='p-button-rounded p-button-success p-mr-2'
          />
        </Link>
        <Button
          icon='pi pi-user'
          className='p-button-rounded p-button-info'
          onClick={() => {
            this.setState({
              discountSummaryId: rowData.discountSummaryId,
              sellerCommission: this.props.sellerCommission,
            })
            this.onClick('displayResponsive')
          }}
        />
      </React.Fragment>
    )
  }

  onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1
  }

  deleteDiscount = async (data) => {
    const resultData = {
      productDiscountTypeId: data.productDiscountTypeId,
      productDiscountTypeName: data.productDiscountTypeName,
      isActive: 'D',
    }

    await this.props.createDiscountTypeRecord(resultData)
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
          List of Discount Summary Name
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
              placeholder='Search by Discount name'
            />
          </span>
        </div>
      </>
    )
  }

  getSelectedSellers = async (selectedSellers, discountSummaryId) => {
    var finalData = []
    selectedSellers.forEach((val) => {
      const data = {
        id: this.state.id * 0,
        discountSummaryId: discountSummaryId,
        sellerId: val.sellerId,
        shopId: val.shopId,
        localCommissionPercentage: val.shopId,
        globalCommissionPercentage: val.shopId,
        status: this.state.status,
        remarks: this.state.remarks,
      }
      finalData = [...finalData, data]
    })

    const result = await this.props.addOrEditProductCampaignSellerRecord(
      finalData
    )

    if (result && result.payload.success.succeed === true) {
      toast.success('Seller Added To Campaigns Successfully')
      setTimeout(() => {
        this.props.history.push('DiscountSummaryList')
      }, 2500)
      this.setState({ isSuccessful: true })
      {
        this.state.isSuccessful && this.onHide('displayResponsive')
      }
    } else if (result && result.payload.success.succeed === false) {
      toast.error('Something went wrong, Please try again')
    } else if (result.type === 'ADD_OR_EDIT_PRODUCT_CAMPAIGN_SELLER_SUCCESS') {
      toast.success('Seller Added To Campaigns Successfully')
      setTimeout(() => {
        this.props.history.push('DiscountSummaryList')
      }, 2500)
      this.setState({ isSuccessful: true })
      {
        this.state.isSuccessful && this.onHide('displayResponsive')
      }
    } else {
      toast.error('Something went wrong, Please try again')
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
                        value={this.state.discounts}
                        className='p-datatable-customers p-datatable-responsive-demo'
                        dataKey='id'
                        rowHover
                        globalFilter={this.state.globalFilter}
                        selection={this.state.selectedDiscounts}
                        onSelectionChange={(e) =>
                          this.setState({ selectedDiscounts: e.value })
                        }
                        paginator
                        rows={10}
                        emptyMessage='No Discount Summary found'
                        currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                        paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                        rowsPerPageOptions={[10, 25, 50]}
                        {...this.state}
                        discounts={this.props.discounts}
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
                          header='Discount Name'
                          body={this.nameTemplate}
                          sortable
                        />
                        <Column
                          header='Image'
                          body={this.imageTemplate}
                        />
                        <Column
                          sortField='discountType'
                          header='Discount Type'
                          body={this.discountTypeTemplate}
                          sortable
                        />
                        <Column
                          sortField='discountAmount'
                          header='Discount Amount'
                          body={this.discountAmountTemplate}
                          sortable
                        />
                        <Column
                          sortField='discountPercent'
                          header='Discount (%)'
                          body={this.discountPercentTemplate}
                          sortable
                        />
                        <Column
                          sortField='startDate'
                          header='Start Date'
                          body={this.startDateTemplate}
                          sortable
                        />

                        <Column
                          sortField='endDate'
                          header='End Date'
                          body={this.endDateTemplate}
                          sortable
                        />
                        <Column
                          sortField='regEndDate'
                          header='Registration End'
                          body={this.regEndDateTemplate}
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
                      <Dialog
                        header='Add Seller'
                        visible={this.state.displayResponsive}
                        onHide={() => this.onHide('displayResponsive')}
                        breakpoints={{ '960px': '75vw' }}
                        style={{ width: '50vw' }}
                      >
                        <SellerCommissionModal
                          sellers={this.state.sellerCommission}
                          discountSummaryId={this.state.discountSummaryId}
                          getSelectedSellers={this.getSelectedSellers}
                        />
                      </Dialog>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={1500} />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  discountSummary: state.discountSummaryReducer.discountSummary,
  sellerCommission: state.sellerProfileReducer.allSellerCommission,
  loading: state.sellerProfileReducer.loading,
  error: state.sellerProfileReducer.error
})

const mapDispatchToProps = (dispatch) => {
  return {
    getDiscountSummaryRecord: () =>
      dispatch(discountSummaryAction.getDiscountSummaryRecord()),
    getAllSellerCommissionRecord: () =>
      dispatch(sellerProfileAction.getAllSellerCommissionRecord()),
    addOrEditProductCampaignSellerRecord: (data) =>
      dispatch(
        productCampaignSellerAction.addOrEditProductCampaignSellerRecord(data)
      ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(discountSummaryListContainer)
