import 'primeicons/primeicons.css'
import '../../../node_modules/primereact/resources/themes/saga-blue/theme.css'
import '../../../node_modules/primereact/resources/primereact.css'
import '../../../node_modules/primeflex/primeflex.css'
import authenticationService from '../../store/services/authenticationService'
import { connect } from 'react-redux'
import * as sellerAction from '../../store/actions/sellerAction'
import React, { Component } from 'react'
import classNames from 'classnames'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { PendingSeller } from '../../components/seller/PendingSeller'
import { Toast } from 'primereact/toast'
import baseUrl from '../../utils/baseUrl'
import { Link } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import LoadingCard from '../../components/shared/LoadingCard'
import Message from '../../components/shared/Message'

class pendingSellerContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customers: null,
      selectedCustomers: null,
      shops: [],
      displayBasic: false,
      position: 'center',
      activeIndex: 1,
      agreementDocument: null,
    }

    this.pendingSellerService = new PendingSeller()
    this.onClick = this.onClick.bind(this)
    this.onHide = this.onHide.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.setSellerRecord = this.setSellerRecord.bind(this)
    this.setApprove = this.setApprove.bind(this)
    this.setReject = this.setApprove.bind(this)

    //body cells
    this.nameBodyTemplate = this.nameBodyTemplate.bind(this)
    this.contactBodyTemplate = this.contactBodyTemplate.bind(this)
    this.emailBodyTemplate = this.emailBodyTemplate.bind(this)
    this.logoBodyTemplate = this.logoBodyTemplate.bind(this)
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    this.onIndexTemplate = this.onIndexTemplate.bind(this)

    this.handleChange = this.handleChange.bind(this)
    this.approveShop = this.approveShop.bind(this)
    this.rejectShop = this.rejectShop.bind(this)

    this.showSuccess = this.showSuccess.bind(this)
    this.showWarn = this.showWarn.bind(this)
  }

  handleChange = async (e) => {
    const { target } = e
    switch (target.name) {
      case 'searchId':
        //////debugger;
        this.setState({ searchId: target.value })
        let searchBy = target.value
        if (searchBy === '') {
          await this.props.getPendingSellerRecord()
        } else {
          await this.props.getPendingSellerByIdRecord(searchBy)
        }
        break
      default:
    }
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

    this.pendingSellerService
      .getPendingSeller()
      .then((data) => this.setState({ customers: data }))
  }

  showSuccess() {
    this.toast.show({
      severity: 'success',
      summary: 'Seller Approved',
      detail: 'Message Content',
      life: 6000,
    })
  }

  showWarn() {
    this.toast.show({
      severity: 'warn',
      summary: 'Seller Rejected',
      detail: 'Message Content',
      life: 6000,
    })
  }

  approveShop = async (seller) => {
    //////debugger;
    const data = {
      shopId: seller.shopId,
      sellerId: seller.sellerId,
      status: 'Y',
    }
    //////debugger;
    //  const response =
    await this.props.approveShopRecord(data)
    window.location.reload(true)
    this.showSuccess(true)
  }

  rejectShop = async (seller) => {
    //////debugger;
    const data = {
      shopId: seller.shopId,
      sellerId: seller.sellerId,
      status: 'R',
    }
    await this.props.rejectShopRecord(data)
    await this.props.getPendingSellerRecord()

    window.location.reload(true)
    this.showWarn(true)
  }

  uploadShop = () => {}

  setSellerRecord = async (seller) => {
    //////debugger;
    this.setState({ shops: [seller] })
    this.setState({
      displayBasic: true,
    })
  }

  setApprove = async (seller) => {
    //////debugger;
    // const data = {
    //     shopId: seller.shopId,
    //     sellerId: seller.sellerId,
    //     status: "N",
    // };
  }

  renderHeader() {
    return (
      <div className='table-header'>
        Pending Seller List
        <span className='p-input-icon-left'>
          <InputText
            type='search'
            onInput={(e) => this.setState({ globalFilter: e.target.value })}
            placeholder='Search by Seller Name'
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

  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Toast ref={(el) => (this.toast = el)} />
        {/* <span className='p-column-title'>Activity</span> */}
        <span className='p-buttonset'>
          <Button
            label='Details'
            data-toggle='modal'
            data-target='#exampleModalCenter'
            onClick={() => this.setState({ shops: rowData })}
            style={{ margin: '2px 0px 2px 0px' }}
          />
          <Button
            label='Approve'
            icon='pi pi-check'
            className='p-button-success'
            onClick={() => this.approveShop(rowData)}
            style={{ margin: '2px 2px 2px 2px' }}
          />
          <Button
            label='Reject'
            icon='pi pi-trash'
            className='p-button-danger'
            onClick={() => this.rejectShop(rowData)}
            style={{ margin: '2px 0px 2px 0px' }}
          />
        </span>
      </React.Fragment>
    )
  }

  // serialBodyTemplate(rowData) {
  //   return (
  //     <React.Fragment>
  //       <span className="p-column-title">Sl</span>
  //       {rowData.sellerId}
  //     </React.Fragment>
  //   )
  // }

  nameBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Name</span> */}
        {rowData.sellerName}
      </React.Fragment>
    )
  }

  contactBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Contact No</span> */}
        {rowData.sellerContactNo}
      </React.Fragment>
    )
  }

  emailBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Email</span> */}
        {rowData.sellerEmail}
      </React.Fragment>
    )
  }

  logoBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Logo</span> */}
        <span>
          <img
            src={baseUrl.concat(rowData.shopLogoUrl)}
            className='thumb-md img-circle'
            alt='img'
            style={{ verticalAlign: 'middle' }}
          />
        </span>
      </React.Fragment>
    )
  }

  statusBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Status</span> */}
        <span
          className={classNames('customer-badge', 'status-' + rowData.status)}
        >
          {rowData.activeYn === 'Y' ? 'ACTIVE' : 'INACTIVE'}
        </span>
      </React.Fragment>
    )
  }

  handleChange = (e) => {
    this.setState({ agreementDocument: e.target.files })
    // this.setState({ agreementDocument:{ ...this.state.agreementDocument, [event.target.name]: event.target.value } })
  }

  handleSubmit(event) {
    event.preventDefault()
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
                        <li className='active'>
                          <Link to='/pendingSeller'>Pending Seller</Link>
                        </li>
                        <li>
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
                          {...this.state}
                          sellers={this.props.sellers}
                          approveShop={this.approveShop}
                          setApprove={this.setApprove}
                          rejectShop={this.rejectShop}
                          values={this.values}
                          searchId={this.props.searchId}
                          shopDetails={this.shopDetails}
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
                          emptyMessage='No pending seller found'
                          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                          rowsPerPageOptions={[10, 25, 50]}
                        >
                          <Column
                            field='Index'
                            header='SN'
                            body={this.onIndexTemplate}
                          />
                          <Column
                            sortField='sellerName'
                            filterField='sellerName'
                            header='Seller Name'
                            body={this.nameBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='sellerContactNo'
                            header='Contact Number'
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
                            sortField='shopLogoUrl'
                            header='Logo'
                            body={this.logoBodyTemplate}
                          />
                          <Column
                            sortField='activity'
                            header='Actions'
                            body={this.actionBodyTemplate}
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
        </div>

        {/* MODAL */}
        <div
          className='modal fade '
          id='exampleModalCenter'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='exampleModalCenterTitle'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-lg' role='document'>
            <div
              className='modal-content'
            >
              <div className='modal-header'>
                <h6 className='modal-title' id='exampleModalLongTitle'>
                  Seller Information
                </h6>
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
                <div className='pending-seller'>
                  <div className='form_wrapper'>
                    <div className='form_container'>
                      <div className='row clearfix'>
                        <div className=''>
                          <form onSubmit={this.handleSubmit}>
                            <div className='row clearfix'>
                              <div className='col-md-8'>
                                <div className='form-group'>
                                  <label htmlFor='sellerName'>
                                    Seller Name
                                  </label>
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
                                      <label htmlFor='sellerContactNo'>
                                        Seller Contact Number
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
                                      <label htmlFor='sellerEmail'>
                                        Seller E-mail
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
                              </div>
                              <div className='col-md-4'>
                                <div className='d-flex flex-column'>
                                  <div className='form-group align-items-center text-center'>
                                    <label
                                      htmlFor='shopLogoUrl'
                                      style={{ display: 'flex' }}
                                    >
                                      Shop Logo
                                    </label>
                                    <img
                                      className='img-thumbnail'
                                      src={baseUrl.concat(
                                        this.state.shops.shopLogoUrl
                                      )}
                                      alt='shopLogoUrl'
                                    />
                                  </div>
                                  <div className='row clearfix align-items-center text-center'>
                                    <button
                                      type='button'
                                      className='btn btn-outline-info btn-sm'
                                      style={{ marginRight: '5px' }}
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
                                      style={{ marginRight: '5px' }}
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
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='form-group'>
                              <label htmlFor='shopName'>Shop Name</label>
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
                              <label htmlFor='shopDescription'>
                                Shop Description
                              </label>
                              <div className='input_field'>
                                <textarea
                                  rows='4'
                                  value={this.state.shops.shopDescription}
                                  readOnly
                                  style={{ width: '100%', padding: '8px 10px' }}
                                />
                              </div>
                            </div>
                            <div className='row clearfix'>
                              <div className='col-md-4'>
                                <div className='form-group'>
                                  <label htmlFor='shopCity'>Shop City</label>
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
                                  <label htmlFor='shopState'>Shop State</label>
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
                                  <label htmlFor='shopZipCode'>
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
                              <label htmlFor='shopAddress'>Shop Address</label>
                              <div className='input_field'>
                                {' '}
                                <span>
                                  <i
                                    aria-hidden='true'
                                    className='fa fa-map-marker'
                                  ></i>
                                </span>
                                <input
                                  type='text'
                                  name='shopAddress'
                                  value={this.state.shops.shopAddress}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className='form-group'>
                              <label htmlFor='shopAddress'>
                                Commission Parcentage
                              </label>
                              <input
                                className='form-control'
                                type='text'
                                placeholder='Commission Percentage'
                              />
                            </div>

                            <Button
                              label='Confirm Commission'
                              //icon="pi pi-upload"
                              className='p-button-success'
                              onClick={() => this.uploadShop()}
                              style={{ margin: '2px 0px 2px 2px' }}
                            />

                            <input
                              type='file'
                              name='agreementDocument'
                              // value={this.state.agreementDocument}
                              onChange={this.handleChange}
                              className='form-control'
                              required
                            />
                            <input type='submit' value='Submit' />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <Button
                  label='Approve'
                  icon='pi pi-check'
                  className='p-button-success'
                  onClick={() => this.approveShop(this.state.shops)}
                  style={{ margin: '2px 0px 2px 0px' }}
                />
                <Button
                  label='Reject'
                  icon='pi pi-trash'
                  className='p-button-danger'
                  onClick={() => this.rejectShop(this.state.shops)}
                  style={{ margin: '2px 2px 2px 2px' }}
                />

                <Button
                  label='Close'
                  icon='pi pi-warning'
                  className='p-button-warning'
                  data-dismiss='modal'
                  style={{ margin: '2px 0px 2px 2px' }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* MODAL END */}
      </>
    )
  }
}

// Making vendors  array available in  props
const mapStateToProps = (state) => ({
  sellers: state.sellerReducer.sellers,
  loading: state.sellerReducer.loading,
  error: state.sellerReducer.error,
  //deleteSeller: state.deleteSeller,
  data: state.sellerReducer.shopId,
})

// Making available in  props
const mapDispatchToProps = (dispatch) => {
  return {
    getPendingSellerRecord: () =>
      dispatch(sellerAction.getPendingSellerRecord()),

    getPendingSellerByIdRecord: (index) =>
      dispatch(sellerAction.getPendingSellerByIdRecord(index)),

    getPendingSellerById: (index) =>
      dispatch(sellerAction.getPendingSellerById(index)),

    approveShopRecord: (data) => dispatch(sellerAction.approveShopRecord(data)),
    rejectShopRecord: (data) => dispatch(sellerAction.rejectShopRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(pendingSellerContainer)
