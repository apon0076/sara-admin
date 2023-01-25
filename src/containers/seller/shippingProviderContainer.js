import React, { Component } from 'react'
import sellerService from '../../store/services/sellerService'
import { toast, ToastContainer } from 'react-toastify'
import '../../../node_modules/primeicons/primeicons.css'
import '../../../node_modules/primereact/resources/themes/saga-blue/theme.css'
import '../../../node_modules/primereact/resources/primereact.css'
import '../../../node_modules/primeflex/primeflex.css'
import authenticationService from '../../store/services/authenticationService'
import { connect } from 'react-redux'
import * as sellerAction from '../../store/actions/sellerAction'
import { VerifiedSeller } from '../../components/seller/VerifiedSeller'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { Link } from 'react-router-dom'
import baseUrl from '../../utils/baseUrl'
import BackTop from '../../components/BackTop/BackTop'
import LoadingCard from '../../components/shared/LoadingCard'
import Message from '../../components/shared/Message'

////////////////END/////////////////

class shippingProviderContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customers: null,
      selectedCustomers: null,
      globalFilter: null,
      loading: false,
      displayBasic: false,
      position: 'center',
      shops: [],
      activeIndex: 1,
    }

    this.verifiedSellerService = new VerifiedSeller()
    this.onClick = this.onClick.bind(this)
    this.onHide = this.onHide.bind(this)

    //body cells
    this.nameBodyTemplate = this.nameBodyTemplate.bind(this)
    this.contactBodyTemplate = this.contactBodyTemplate.bind(this)
    this.emailBodyTemplate = this.emailBodyTemplate.bind(this)
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this)
    this.addressBodyTemplate = this.addressBodyTemplate.bind(this)
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)

    this.inactiveShop = this.inactiveShop.bind(this)
    this.activeShop = this.activeShop.bind(this)

    this.showSuccess = this.showSuccess.bind(this)
    this.showWarn = this.showWarn.bind(this)
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
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
      this.props.history.push('/SellerLogin')
    }
    //End Temporary Authentication

    this.verifiedSellerService
      .getVerifiedSeller()
      .then((data) => this.setState({ customers: data }))
  }

  showSuccess() {
    this.toast.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Seller Activated',
      life: 6000,
    })
  }

  showWarn() {
    this.toast.show({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Seller Deactivated',
      life: 6000,
    })
  }

  activeShop = async (seller) => {
    //////debugger;
    const data = {
      shopId: seller.shopId,
      sellerId: seller.sellerId,
      status: 'Y',
    }
    //////debugger;
    await this.props.rejectShopRecord(data)
    window.location.reload(true)
    this.setState({
      loading: true,
    })
    this.showSuccess(true)
  }

  inactiveShop = async (seller) => {
    //////debugger;
    const data = {
      shopId: seller.shopId,
      sellerId: seller.sellerId,
      status: 'N',
    }
    //////debugger;
    await this.props.rejectShopRecord(data)
    window.location.reload(true)
    this.setState({
      loading: true,
    })
    this.showWarn(true)
  }

  renderHeader() {
    return (
      <div className='table-header'>
        Shipment Provider
        <span className='p-input-icon-left'>
          <InputText
            type='search'
            onInput={(e) => this.setState({ globalFilter: e.target.value })}
            placeholder='Name'
            className='form-control text-center'
          />
        </span>
      </div>
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

  nameBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className="p-column-title">Seller Name</span> */}
        {rowData.sellerName}
      </React.Fragment>
    )
  }

  contactBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className="p-column-title">Contact No</span> */}
        {rowData.sellerContactNo}
      </React.Fragment>
    )
  }

  emailBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className="p-column-title">Email</span> */}
        <span>{rowData.sellerEmail}</span>
      </React.Fragment>
    )
  }

  addressBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className="p-column-title">Address</span> */}
        {rowData.shopAddress}
      </React.Fragment>
    )
  }

  statusBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className="p-column-title">Status</span> */}
        <span
          className={
            rowData.isVerified === 'Y' ? 'text-success' : 'text-warning'
          }
        >
          {rowData.isVerified === 'Y' ? 'ACTIVE' : 'INACTIVE'}
        </span>
      </React.Fragment>
    )
  }

  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Toast ref={(el) => (this.toast = el)} />
        {/* <span className="p-column-title">Action</span> */}
        <span className='p-buttonset'>
          <Button
            label='Details'
            data-toggle='modal'
            data-target='#exampleModalCenter'
            onClick={() => this.setState({ shops: rowData })}
            style={{ marginRight: '2px' }}
          />
          {rowData.isVerified === 'Y' ? (
            <Button
              label='Inactive'
              className='p-button-danger'
              onClick={() => this.inactiveShop(rowData)}
            />
          ) : (
            <Button
              label='Active'
              className='p-button-success'
              onClick={() => this.activeShop(rowData)}
            />
          )}
        </span>
      </React.Fragment>
    )
  }

  render() {
    const header = this.renderHeader()
    return (
      <>
        <div className='page-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='white-box'>
                  <div className='datatable-doc-demo datatable-responsive-demo'>
                    <h3 className='box-title m-b-0'>Account &#38; Settings</h3>
                    <p className='text-muted m-b-15'>
                      Update Profile Information
                    </p>
                    <ul className='nav nav-tabs seller-tabs'>
                      <li>
                        <Link to='/BusinessInformation'>
                          Business Information
                        </Link>
                      </li>
                      <li className='active'>
                        <Link to='/ShippingProvider'>Shipping Provider</Link>
                      </li>
                      <li>
                        <Link to='/WarehouseAddress'>Warehouse Address</Link>
                      </li>
                      <li>
                        <Link to='/ReturnAddress'>Return Address</Link>
                      </li>
                      <li>
                        <Link to='/BankAccount'>Bank Account</Link>
                      </li>
                      <li>
                        <Link to='/ReturnPolicy'>Return Policy</Link>
                      </li>
                    </ul>
                    {this.props.loading ? (
                      <LoadingCard count={1} />
                    ) : this.props.error ? (
                      <Message variant='danger'>{this.props.error}</Message>
                    ) : (
                      <DataTable
                        ref={(el) => (this.dt = el)}
                        value={this.state.customers}
                        header={header}
                        className='p-datatable-customers p-datatable-responsive-demo'
                        dataKey='id'
                        rowHover
                        globalFilter={this.state.globalFilter}
                        selection={this.state.selectedCustomers}
                        onSelectionChange={(e) =>
                          this.setState({ selectedCustomers: e.value })
                        }
                        paginator
                        rows={10}
                        emptyMessage='No data'
                        currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                        paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                        rowsPerPageOptions={[10, 25, 50]}
                        {...this.state}
                        sellers={this.props.sellers}
                        values={this.values}
                        loading={this.state.loading}
                      >
                        <Column
                          sortField='sellerName'
                          header='Warehouse ID'
                          filterField='sellerName'
                          body={this.nameBodyTemplate}
                          sortable
                        />
                        <Column
                          sortField='sellerContactNo'
                          header='Shipping Provider'
                          body={this.contactBodyTemplate}
                          sortable
                        />
                        <Column
                          sortField='sellerEmail'
                          header='Package Profile'
                          body={this.emailBodyTemplate}
                          style={{ width: '250px' }}
                          sortable
                        />
                        <Column
                          sortField='shopAddress'
                          header='Type'
                          body={this.addressBodyTemplate}
                          sortable
                        />
                        <Column
                          sortField='isVerified'
                          header='Drop-Off Point Locator'
                          body={this.statusBodyTemplate}
                          sortable
                        />
                      </DataTable>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BackTop />
      </>
    )
  }
}

// Making vendors  array available in  props
const mapStateToProps = (state) => ({
  sellers: state.sellerReducer.sellers,
  searchId: state.searchId,
  handleChange: state.handleChange,
  loading: state.sellerReducer.loading,
  error: state.sellerReducer.error,
})

// Making available in  props
const mapDispatchToProps = (dispatch) => {
  return {
    getVerifiedShopRecord: () => dispatch(sellerAction.getVerifiedShopRecord()),

    getVerifiedShopByIdRecord: (index) =>
      dispatch(sellerAction.getVerifiedShopByIdRecord(index)),

    rejectShopRecord: (data) => dispatch(sellerAction.rejectShopRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(shippingProviderContainer)
