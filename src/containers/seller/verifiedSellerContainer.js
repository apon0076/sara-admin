import '../../../node_modules/primeicons/primeicons.css'
import '../../../node_modules/primereact/resources/themes/saga-blue/theme.css'
import '../../../node_modules/primereact/resources/primereact.css'
import '../../../node_modules/primeflex/primeflex.css'
import authenticationService from '../../store/services/authenticationService'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as sellerAction from '../../store/actions/sellerAction'
import * as sellerProfileAction from '../../store/actions/sellerProfileAction'
import { VerifiedSeller } from '../../components/seller/VerifiedSeller'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { Link } from 'react-router-dom'
import baseUrl from '../../utils/baseUrl'
import SellerCommissionReport from '../../components/seller/SellerCommissionReport'
import LoadingCard from '../../components/shared/LoadingCard'
import Message from '../../components/shared/Message'
import { toast } from 'react-toastify'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

class verifiedSellerContainer extends Component {
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
      sellerCommission: [],
      shopId: '',
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
    this.deliveryActionBodyTemplate = this.deliveryActionBodyTemplate.bind(this)
    this.commissionBodyTemplate = this.commissionBodyTemplate.bind(this)
    this.onIndexTemplate = this.onIndexTemplate.bind(this)

    this.inactiveShop = this.inactiveShop.bind(this)
    this.activeShop = this.activeShop.bind(this)
    this.inactiveDelivery = this.inactiveDelivery.bind(this)

    this.showSuccess = this.showSuccess.bind(this)
    this.showWarn = this.showWarn.bind(this)
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

    this.verifiedSellerService.getVerifiedSeller().then((data) =>
      this.setState({
        customers: data.sort((a, b) => (a.timeM > b.timeM ? 1 : -1)),
      })
    )
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

    toast.success('Seller Activated')
    this.verifiedSellerService.getVerifiedSeller().then((data) =>
      this.setState({
        customers: data.sort((a, b) => (a.timeM > b.timeM ? 1 : -1)),
      })
    )
    // this.showSuccess(true)
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
    toast.error('Seller Inactivated')
    this.verifiedSellerService.getVerifiedSeller().then((data) =>
      this.setState({
        customers: data.sort((a, b) => (a.timeM > b.timeM ? 1 : -1)),
      })
    )
    // this.showWarn(true)
  }

  inactiveDelivery = async (seller) => {
    await this.props.deliveryStatusChangeRecord(seller.sellerId, 'N')
    toast.error('Seller Delivery Status Deactivated')
    this.verifiedSellerService.getVerifiedSeller().then((data) =>
      this.setState({
        customers: data.sort((a, b) => (a.timeM > b.timeM ? 1 : -1)),
      })
    )
    // this.showWarn(true)
  }

  activeDelivery = async (seller) => {
    await this.props.deliveryStatusChangeRecord(seller.sellerId, 'Y')
    toast.success('Seller Delivery Status Activated')
    this.verifiedSellerService
      .getVerifiedSeller()
      .then((data) =>
        this.setState({
          customers: data.sort((a, b) => (a.timeM > b.timeM ? 1 : -1)),
        })
      )
    // this.showWarn(true)
  }

  renderHeader() {
    return (
      <div className='table-header'>
        Approved Seller List
        <span className='p-input-icon-left'>
          <InputText
            type='search'
            onInput={(e) => this.setState({ globalFilter: e.target.value })}
            placeholder='Search by Contact No'
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

  deliveryActionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Toast ref={(el) => (this.toast = el)} />
        {/* <span className="p-column-title">Action</span> */}
        <span className='p-buttonset'>
          {rowData.isSellerDelivered === 'Y' ? (
            <Button
              label='Inactive'
              data-toggle='modal'
              data-target='#inactivateDeliveredModal'
              className='p-button-danger'
              // onClick={() => this.inactiveShop(rowData)}
              onClick={() => this.setState({ shops: rowData })}
            />
          ) : (
            <Button
              label='Active'
              data-toggle='modal'
              data-target='#activateDeliveredModal'
              className='p-button-success'
              // onClick={() => this.activeShop(rowData)}
              onClick={() => this.setState({ shops: rowData })}
            />
          )}
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
            data-target='#detailsModal'
            onClick={() => this.setState({ shops: rowData })}
            style={{ marginRight: '2px' }}
          />
          {rowData.isVerified === 'Y' ? (
            <Button
              label='Inactive'
              data-toggle='modal'
              data-target='#inactivateModal'
              className='p-button-danger'
              // onClick={() => this.inactiveShop(rowData)}
              onClick={() => this.setState({ shops: rowData })}
            />
          ) : (
            <Button
              label='Active'
              data-toggle='modal'
              data-target='#activateModal'
              className='p-button-success'
              // onClick={() => this.activeShop(rowData)}
              onClick={() => this.setState({ shops: rowData })}
            />
          )}
        </span>
      </React.Fragment>
    )
  }

  commissionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Toast ref={(el) => (this.toast = el)} />
        {/* <span className="p-column-title">Commission</span> */}

        <Button
          label='Details'
          data-toggle='modal'
          data-target='#commissionModal'
          onClick={() => this.sellerCommission(rowData)}
          target='_blank'
          style={{ marginRight: '2px' }}
        />
      </React.Fragment>
    )
  }

  sellerCommission = async (rowData) => {
    await this.props.getCommissionSellerByShopIdRecord(rowData.shopId)
    this.setState({ sellerCommission: this.props.commissionSellerById })
  }

  onIndexTemplate(rowData, props) {
    return props.rowIndex + 1
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
                      <ul className='nav nav-tabs seller-tabs'>
                        <li>
                          <Link to='/pendingSeller'>Pending Seller</Link>
                        </li>
                        <li className='active'>
                          <Link to='/approvedSeller'>Approved Seller</Link>
                        </li>
                        <li>
                          <Link to='/pendingReturnPolicy'>Return Policy</Link>
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
                          emptyMessage='No approved seller found'
                          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                          rowsPerPageOptions={[10, 25, 50]}
                          {...this.state}
                          sellers={this.props.sellers}
                          values={this.values}
                          loading={this.state.loading}
                        >
                          <Column
                            field='Index'
                            header='SN'
                            body={this.onIndexTemplate}
                          />
                          <Column
                            sortField='sellerName'
                            header='Seller Name'
                            body={this.nameBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='sellerContactNo'
                            filterField='sellerContactNo'
                            header='Contact No'
                            body={this.contactBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='sellerEmail'
                            header='Email'
                            body={this.emailBodyTemplate}
                            style={{ width: '250px' }}
                            sortable
                          />
                          <Column
                            sortField='shopAddress'
                            header='Address'
                            body={this.addressBodyTemplate}
                            sortable
                          />
                          <Column
                            field='isSellerDelivered'
                            header='Delivered'
                            body={this.deliveryActionBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='isVerified'
                            header='Status'
                            body={this.statusBodyTemplate}
                            sortable
                          />
                          <Column
                            field='commission'
                            header='Commission'
                            body={this.commissionBodyTemplate}
                          />
                          <Column
                            field='isApprove'
                            header='Actions'
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

        {/* Detail MODAL Start */}
        <div
          className='modal fade '
          id='detailsModal'
          tabindex='-1'
          role='dialog'
          aria-labelledby='exampleModalCenterTitle'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-lg' role='document'>
            <div className='modal-content'>
              <h3 className='box-title add-product-title'>
                Seller Information
                <div class='pull-right'>
                  <button
                    type='button'
                    className='close'
                    data-dismiss='modal'
                    aria-label='Close'
                  >
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
              </h3>
              <ul className='nav nav-tabs'>
                <li className='active'>
                  <a data-toggle='tab' href='#BasicInformation'>
                    Basic Information
                  </a>
                </li>
                <li>
                  <a data-toggle='tab' href='#WarehouseAddress'>
                    Warehouse Address
                  </a>
                </li>
                <li>
                  <a data-toggle='tab' href='#ReturnAddress'>
                    Return Address
                  </a>
                </li>
                <li>
                  <a data-toggle='tab' href='#BankAccount'>
                    Bank Account
                  </a>
                </li>
                <li>
                  <a data-toggle='tab' href='#RETURNPOLICY'>
                    Return Policy
                  </a>
                </li>
              </ul>

              <div className='tab-content modal-body'>
                {/* BasicInformation Start */}
                <div id='BasicInformation' className='tab-pane fade in active'>
                  <div className='pending-seller'>
                    <div className='form_wrapper'>
                      <div className='form_container'>
                        <div className='row clearfix'>
                          <div className=''>
                            <form>
                              <div className='row clearfix'>
                                <div className='col-md-8'>
                                  <div className='form-group'>
                                    <label for='sellerName'>Seller Name</label>
                                    <div className='input_field'>
                                      {' '}
                                      <span>
                                        <i
                                          aria-hidden='true'
                                          className='fa fa-user'
                                        ></i>
                                      </span>
                                      <input
                                        type='text'
                                        name='sellerName'
                                        value={this.state.shops.sellerName}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className='row clearfix'>
                                    <div className='col-md-6'>
                                      <div className='form-group'>
                                        <label for='sellerContactNo'>
                                          Contact Number
                                        </label>
                                        <div className='input_field'>
                                          {' '}
                                          <span>
                                            <i
                                              aria-hidden='true'
                                              className='fa fa-mobile'
                                            ></i>
                                          </span>
                                          <input
                                            type='text'
                                            name='sellerContactNo'
                                            value={
                                              this.state.shops.sellerContactNo
                                            }
                                            readOnly
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className='col-md-6'>
                                      <div className='form-group'>
                                        <label for='sellerEmail'>
                                          Email Address
                                        </label>
                                        <div className='input_field'>
                                          {' '}
                                          <span>
                                            <i
                                              aria-hidden='true'
                                              className='fa fa-envelope'
                                            ></i>
                                          </span>
                                          <input
                                            type='text'
                                            name='sellerEmail'
                                            value={this.state.shops.sellerEmail}
                                            readOnly
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className='row clearfix'>
                                    <div className='col-md-6'>
                                      <div className='form-group'>
                                        <label for='sellerPresentAddress'>
                                          Present Address
                                        </label>
                                        <div className='input_field'>
                                          <textarea
                                            rows='3'
                                            value={
                                              this.state.shops
                                                .sellerPresentAddress
                                            }
                                            readOnly
                                            style={{
                                              width: '100%',
                                              padding: '8px 10px',
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className='col-md-6'>
                                      <div className='form-group'>
                                        <label for='sellerPermanentAddress'>
                                          Permanent Address
                                        </label>
                                        <div className='input_field'>
                                          <textarea
                                            rows='3'
                                            value={
                                              this.state.shops
                                                .sellerPermanentAddress
                                            }
                                            style={{
                                              width: '100%',
                                              padding: '8px 10px',
                                            }}
                                            readOnly
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='col-md-4'>
                                  <div className='d-flex flex-column'>
                                    <div className='form-group'>
                                      <label
                                        for='shopLogoUrl'
                                        style={{ display: 'flex' }}
                                      >
                                        Seller Image
                                      </label>
                                      <img
                                        // className='img-thumbnail'
                                        src={baseUrl.concat(
                                          this.state.shops.sellerImageUrl
                                        )}
                                        alt='sellerImageUrl'
                                        height='150px'
                                        width='150px'
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='row clearfix'>
                                <div className='col-md-8'>
                                  <div className='form-group'>
                                    <label for='shopName'>Shop Name</label>
                                    <div className='input_field'>
                                      {' '}
                                      <span>
                                        <i
                                          aria-hidden='true'
                                          className='fa fa-map-pin'
                                        ></i>
                                      </span>
                                      <input
                                        type='text'
                                        name='shopName'
                                        value={this.state.shops.shopName}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                  <div className='form-group'>
                                    <label for='shopDescription'>
                                      Shop Description
                                    </label>
                                    <div className='input_field'>
                                      <textarea
                                        rows='4'
                                        value={this.state.shops.shopDescription}
                                        style={{
                                          width: '100%',
                                          padding: '8px 10px',
                                        }}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='col-md-4'>
                                  <div className='d-flex flex-column'>
                                    <div className='form-group'>
                                      <label
                                        for='shopLogoUrl'
                                        style={{ display: 'flex' }}
                                      >
                                        Shop Logo
                                      </label>
                                      <img
                                        // className='img-thumbnail'
                                        src={baseUrl.concat(
                                          this.state.shops.shopLogoUrl
                                        )}
                                        alt='shopLogoUrl'
                                        height='150px'
                                        width='150px'
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='row clearfix align-items-center text-center'>
                                <button
                                  type='button'
                                  className='btn btn-outline-info btn-sm'
                                  style={{ margin: '5px' }}
                                >
                                  <a
                                    href={baseUrl.concat(
                                      this.state.shops.ownerNidUrl
                                    )}
                                    target='_blank'
                                  >
                                    Owner NID
                                  </a>
                                </button>
                                <button
                                  type='button'
                                  className='btn btn-outline-info btn-sm'
                                  style={{ margin: '5px' }}
                                >
                                  <a
                                    href={baseUrl.concat(
                                      this.state.shops.bussinessDocUrl
                                    )}
                                    target='_blank'
                                  >
                                    Bussiness Document
                                  </a>
                                </button>
                                <button
                                  type='button'
                                  className='btn btn-outline-info btn-sm'
                                  style={{ margin: '5px' }}
                                >
                                  <a
                                    href={baseUrl.concat(
                                      this.state.shops.shopBannerUrl
                                    )}
                                    target='_blank'
                                  >
                                    Shop Banner
                                  </a>
                                </button>
                                <button
                                  type='button'
                                  className='btn btn-outline-info btn-sm'
                                  style={{ margin: '5px' }}
                                >
                                  <a
                                    href={this.state.shops.shopUrl}
                                    target='_blank'
                                  >
                                    Shop URL
                                  </a>
                                </button>
                              </div>
                              <div className='row clearfix'>
                                <div className='col-md-4'>
                                  <div className='form-group'>
                                    <label for='shopCity'>Shop City</label>
                                    <div className='input_field'>
                                      {' '}
                                      <span>
                                        <i
                                          aria-hidden='true'
                                          className='fa fa-location-arrow'
                                        ></i>
                                      </span>
                                      <input
                                        type='text'
                                        name='shopCity'
                                        value={this.state.shops.shopCity}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='col-md-4'>
                                  <div className='form-group'>
                                    <label for='shopState'>Shop State</label>
                                    <div className='input_field'>
                                      {' '}
                                      <span>
                                        <i
                                          aria-hidden='true'
                                          className='fa fa-location-arrow'
                                        ></i>
                                      </span>
                                      <input
                                        type='text'
                                        name='shopState'
                                        value={this.state.shops.shopState}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className='col-md-4'>
                                  <div className='form-group'>
                                    <label for='shopZipCode'>
                                      Shop Zip Code
                                    </label>
                                    <div className='input_field'>
                                      {' '}
                                      <span>
                                        <i
                                          aria-hidden='true'
                                          className='fa fa-location-arrow'
                                        ></i>
                                      </span>
                                      <input
                                        type='text'
                                        name='shopZipCode'
                                        value={this.state.shops.shopZipCode}
                                        readOnly
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='form-group'>
                                <label for='shopAddress'>Shop Address</label>
                                <div className='input_field'>
                                  <textarea
                                    rows='2'
                                    value={this.state.shops.shopAddress}
                                    style={{
                                      width: '100%',
                                      padding: '8px 10px',
                                    }}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* BasicInformation End */}

                {/* //Warehouse Address Start // */}
                <div id='WarehouseAddress' className='tab-pane fade'>
                  <div className='pending-seller'>
                    <div className='form_wrapper'>
                      <div className='form_container'>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label
                                className='control-label col-md-4'
                                htmlFor='name'
                              >
                                Full Name
                              </label>
                              <div className='col-md-8'>
                                <input
                                  name='fullName'
                                  type='string'
                                  placeholder=''
                                  className='form-control'
                                  value={
                                    this.state.shops?.sellerAddresse?.fullName
                                  }
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          {/* 1.2 */}
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label
                                className='control-label col-md-4'
                                htmlFor='phoneNo'
                              >
                                Mobile number
                              </label>
                              <div className='col-md-8'>
                                <input
                                  name='phoneNo'
                                  type='string'
                                  placeholder=''
                                  className='form-control'
                                  value={
                                    this.state.shops?.sellerAddresse?.phoneNo
                                  }
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label
                                className='control-label col-md-4'
                                htmlFor='address'
                              >
                                Address
                              </label>
                              <div className='col-md-8'>
                                <input
                                  name='address'
                                  type='string'
                                  placeholder=''
                                  className='form-control'
                                  value={
                                    this.state.shops?.sellerAddresse?.address
                                  }
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          {/* 2.2 */}
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label
                                className='control-label col-md-4'
                                htmlFor='division'
                              >
                                Division
                              </label>
                              <div className='col-md-8'>
                                <input
                                  name='division'
                                  type='string'
                                  placeholder=''
                                  className='form-control'
                                  value={
                                    this.state.shops?.sellerAddresse?.division
                                  }
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label
                                className='control-label col-md-4'
                                htmlFor='name'
                              >
                                City
                              </label>
                              <div className='col-md-8'>
                                <input
                                  name='city'
                                  type='string'
                                  placeholder=''
                                  className='form-control'
                                  value={this.state.shops?.sellerAddresse?.city}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          {/* 3.2 */}
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label
                                className='control-label col-md-4'
                                htmlFor='postCode'
                              >
                                Post Code
                              </label>
                              <div className='col-md-8'>
                                <input
                                  name='postCode'
                                  type='string'
                                  placeholder=''
                                  className='form-control'
                                  value={
                                    this.state.shops?.sellerAddresse?.postCode
                                  }
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* //Warehouse Address End // */}

                {/* //Return Address Start // */}
                <div id='ReturnAddress' className='tab-pane fade'>
                  <div className='pending-seller'>
                    <div className='form_wrapper'>
                      <div className='form_container'>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label
                                className='control-label col-md-4'
                                htmlFor='name'
                              >
                                Full Name
                              </label>
                              <div className='col-md-8'>
                                <input
                                  name='fullName'
                                  type='string'
                                  placeholder=''
                                  className='form-control'
                                  value={this.state.shops.fullName}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          {/* 1.2 */}
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label
                                className='control-label col-md-4'
                                htmlFor='phoneNo'
                              >
                                Mobile number
                              </label>
                              <div className='col-md-8'>
                                <input
                                  name='phoneNo'
                                  type='string'
                                  placeholder=''
                                  className='form-control'
                                  value={this.state.shops.phoneNo}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label
                                className='control-label col-md-4'
                                htmlFor='address'
                              >
                                Address
                              </label>
                              <div className='col-md-8'>
                                <input
                                  name='address'
                                  type='string'
                                  placeholder=''
                                  className='form-control'
                                  value={this.state.shops.address}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          {/* 2.2 */}
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label
                                className='control-label col-md-4'
                                htmlFor='division'
                              >
                                Division
                              </label>
                              <div className='col-md-8'>
                                <input
                                  name='division'
                                  type='string'
                                  placeholder=''
                                  className='form-control'
                                  value={this.state.shops.division}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label
                                className='control-label col-md-4'
                                htmlFor='name'
                              >
                                City
                              </label>
                              <div className='col-md-8'>
                                <input
                                  name='city'
                                  type='string'
                                  placeholder=''
                                  className='form-control'
                                  value={this.state.shops.city}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          {/* 3.2 */}
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label
                                className='control-label col-md-4'
                                htmlFor='postCode'
                              >
                                Post Code
                              </label>
                              <div className='col-md-8'>
                                <input
                                  name='postCode'
                                  type='string'
                                  placeholder=''
                                  className='form-control'
                                  value={this.state.shops.postCode}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* //Return Address End // */}

                {/* //Bank Account Start // */}
                <div id='BankAccount' className='tab-pane fade'>
                  <div className='pending-seller'>
                    <div className='form_wrapper'>
                      <div className='form_container'>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label
                                className='control-label col-md-4'
                                htmlFor='name'
                              >
                                Account Title
                              </label>
                              <div className='col-md-8'>
                                <input
                                  name='fullName'
                                  type='string'
                                  placeholder=''
                                  className='form-control'
                                  value={
                                    this.state.shops?.sellerBankAccount
                                      ?.accountHolderName
                                  }
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          {/* 1.2 */}
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label
                                className='control-label col-md-4'
                                htmlFor='phoneNo'
                              >
                                Account Number
                              </label>
                              <div className='col-md-8'>
                                <input
                                  name='phoneNo'
                                  type='string'
                                  placeholder=''
                                  className='form-control'
                                  value={
                                    this.state.shops?.sellerBankAccount
                                      ?.accountNo
                                  }
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label
                                className='control-label col-md-4'
                                htmlFor='address'
                              >
                                Bank Name
                              </label>
                              <div className='col-md-8'>
                                <select
                                  className='form-control'
                                  name='bankName'
                                  value={
                                    this.state.shops?.sellerBankAccount
                                      ?.bankName
                                  }
                                  disabled
                                >
                                  <option value=''>Select Bank</option>
                                  <option value='1'>Standard Chartered</option>
                                  <option value='2'>Eastern Bank Ltd</option>
                                  <option value='3'>Dutch Bangla Bank</option>
                                  <option value='4'>Mutual Trust Bank</option>
                                  <option value='5'>Brac Bank</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          {/* 2.2 */}
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label
                                className='control-label col-md-4'
                                htmlFor='division'
                              >
                                Branch Name
                              </label>
                              <div className='col-md-8'>
                                <input
                                  name='division'
                                  type='string'
                                  placeholder=''
                                  className='form-control'
                                  value={
                                    this.state.shops?.sellerBankAccount
                                      ?.branchName
                                  }
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label
                                className='control-label col-md-4'
                                htmlFor='name'
                              >
                                Routing Number
                              </label>
                              <div className='col-md-8'>
                                <input
                                  name='city'
                                  type='string'
                                  placeholder=''
                                  className='form-control'
                                  value={
                                    this.state.shops?.sellerBankAccount
                                      ?.routingNo
                                  }
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          {/* 3.2 */}
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label
                                for='shopLogoUrl'
                                style={{ display: 'flex' }}
                              >
                                Cheque Copy
                              </label>
                              <img
                                // className='img-thumbnail'
                                src={baseUrl.concat(
                                  this.state.shops?.sellerBankAccount
                                    ?.documentUrl
                                )}
                                alt='sellerImageUrl'
                                height='150px'
                                width='350px'
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* //Bank Account End // */}

                {/* Return Policy Start*/}
                {
                  <div id='RETURNPOLICY' className='tab-pane fade'>
                    <div className='pending-seller'>
                      <div className='form_wrapper'>
                        <div className='form_container'>
                          <div className='row'>
                            <div className='col-md-12'>
                              <div className='form-group'>
                                <label for='shopAddress'>Return Policy</label>
                                <div className='input_field'>
                                  <CKEditor
                                    editor={ClassicEditor}
                                    data={
                                      this.state.shops?.sellerReturnPolicie
                                        ?.returnPolicy
                                    }
                                    className={'form-control'}
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* // */}
                          <div className='row'>
                            <div className='col-md-6'>
                              <div className='form-group'>
                                <label>
                                  Duration (Days){' '}
                                  <span
                                    aria-hidden='true'
                                    style={{ color: 'red', fontWeight: 'bold' }}
                                  >
                                    *
                                  </span>
                                </label>
                                <input
                                  type='number'
                                  placeholder='Enter Return Duration Day Number'
                                  className='form-control'
                                  value={
                                    this.state.shops?.sellerReturnPolicie
                                      ?.duration
                                  }
                                  name='duration'
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className='col-md-6'>
                              <div className='form-group'>
                                <div className='checkbox checkbox-success'>
                                  <input
                                    name='isActive'
                                    id='acceptTerms'
                                    type='checkbox'
                                    checked={
                                      this.state.shops?.sellerReturnPolicie
                                        ?.isActive === 'Y'
                                        ? true
                                        : false
                                    }
                                    readOnly
                                  />
                                  <label
                                    className='col-md-12'
                                    htmlFor='acceptTerms'
                                  >
                                    &nbsp;Is Active?
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                }
                {/* Return Policy End*/}
              </div>
              <div className='modal-footer'>
                <Button
                  label='Close'
                  icon='pi pi-warning'
                  className='p-button-warning'
                  data-dismiss='modal'
                />
              </div>
            </div>
          </div>
        </div>
        {/* Detail MODAL End */}

        {/* Commission Modal Start*/}
        <div
          className='modal fade'
          id='commissionModal'
          tabindex='-1'
          role='dialog'
          aria-labelledby='exampleModalCenterTitle'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-confirm modal-lg'>
            <div className='modal-content modal-lg'>
              {this.props.commissionSellerById === [] ? (
                <>No Commission Data Found</>
              ) : (
                <>
                  {this.props.commissionSellerById.map((commissionData) => (
                    <>
                      {' '}
                      <div className='modal-body'>
                        <SellerCommissionReport
                          commissionData={commissionData}
                        />
                      </div>
                    </>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        {/* Commission Modal End*/}

        {/* Activate Modal Start*/}
        <div id='activateModal' className='modal fade'>
          <div className='modal-dialog modal-confirm'>
            <div className='modal-content'>
              <div className='modal-header flex-column'>
                <h4 className='modal-title w-100'>Active Seller?</h4>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-hidden='true'
                >
                  &times;
                </button>
              </div>
              <div className='modal-body'>
                <p>Are you sure to active the seller?</p>
              </div>
              <div className='modal-footer justify-content-center'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                >
                  Cancel
                </button>
                <button
                  type='button'
                  className='btn btn-success'
                  data-dismiss='modal'
                  onClick={() => this.activeShop(this.state.shops)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Activate Modal End*/}

        {/* Inactive Modal Start*/}
        <div id='inactivateModal' className='modal fade'>
          <div className='modal-dialog modal-confirm'>
            <div className='modal-content'>
              <div className='modal-header flex-column'>
                <h4 className='modal-title w-100'>Inactive Seller</h4>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-hidden='true'
                >
                  &times;
                </button>
              </div>
              <div className='modal-body'>
                <p>Are you sure to inactive the seller?</p>
              </div>
              <div className='modal-footer justify-content-center'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                >
                  Cancel
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  data-dismiss='modal'
                  onClick={() => this.inactiveShop(this.state.shops)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Inactive Modal End*/}

        {/* Active Delivery Modal Start*/}
        <div id='activateDeliveredModal' className='modal fade'>
          <div className='modal-dialog modal-confirm'>
            <div className='modal-content'>
              <div className='modal-header flex-column'>
                <h4 className='modal-title w-100'>Active Delivery Status?</h4>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-hidden='true'
                >
                  &times;
                </button>
              </div>
              <div className='modal-body'>
                <p>Are you sure to active Delivery Status?</p>
              </div>
              <div className='modal-footer justify-content-center'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                >
                  Cancel
                </button>
                <button
                  type='button'
                  className='btn btn-success'
                  data-dismiss='modal'
                  onClick={() => this.activeDelivery(this.state.shops)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Active Delivery Modal End*/}

        {/* Inactive Delivery Modal Start*/}
        <div id='inactivateDeliveredModal' className='modal fade'>
          <div className='modal-dialog modal-confirm'>
            <div className='modal-content'>
              <div className='modal-header flex-column'>
                <h4 className='modal-title w-100'>Inactive Delivery Status?</h4>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-hidden='true'
                >
                  &times;
                </button>
              </div>
              <div className='modal-body'>
                <p>Are you sure to Inactive Delivery Status?</p>
              </div>
              <div className='modal-footer justify-content-center'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                >
                  Cancel
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  data-dismiss='modal'
                  onClick={() => this.inactiveDelivery(this.state.shops)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Inactive Delivery Modal End*/}
      </>
    )
  }
}

// Making vendors  array available in  props
const mapStateToProps = (state) => ({
  sellers: state.sellerReducer.sellers,
  searchId: state.searchId,
  handleChange: state.handleChange,
  commissionSellerById: state.sellerProfileReducer.commissionSellerById,
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

    getCommissionSellerByShopIdRecord: (shopId) =>
      dispatch(sellerProfileAction.getCommissionSellerByShopIdRecord(shopId)),

    deliveryStatusChangeRecord: (id, status) =>
      dispatch(sellerAction.deliveryStatusChangeRecord(id, status)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(verifiedSellerContainer)
