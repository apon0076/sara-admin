import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'
import * as voucherAction from '../../../store/actions/voucherAction'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import { InputText } from 'primereact/inputtext'
import { Link } from 'react-router-dom'
import baseUrl from '../../../utils/baseUrl'
import authenticationService from '../../../store/services/authenticationService'
import moment from 'moment'
import 'moment-timezone'
import LoadingCard from '../../../components/shared/LoadingCard'
import Message from '../../../components/shared/Message'

class voucherListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productVoucher: null,
      selectedVoucher: null,
      globalFilter: null,
      loading: false,
      position: 'center',
    }

    this.nameTemplate = this.nameTemplate.bind(this)
    this.voucherCodeTemplate = this.voucherCodeTemplate.bind(this)
    this.imageTemplate = this.imageTemplate.bind(this)
    this.discountTypeTemplate = this.discountTypeTemplate.bind(this)
    this.voucherDiscountAmountTemplate =
      this.voucherDiscountAmountTemplate.bind(this)
    this.voucherDiscountPercentTemplate =
      this.voucherDiscountPercentTemplate.bind(this)
    this.startDateTemplate = this.startDateTemplate.bind(this)
    this.endDateTemplate = this.endDateTemplate.bind(this)
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this)
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    this.onIndexTemplate = this.onIndexTemplate.bind(this)
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this)
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

    await this.props.getVoucherRecord()
    this.setState({ productVoucher: this.props?.vouchers })
  }

  nameTemplate = (rowData) => {
    return <React.Fragment>{rowData?.voucherName}</React.Fragment>
  }

  voucherCodeTemplate = (rowData) => {
    return <React.Fragment>{rowData?.voucherCode}</React.Fragment>
  }

  voucherMaximumAmountTemplate = (rowData) => {
    return <React.Fragment>{rowData?.voucherMaximumAmount}Tk</React.Fragment>
  }

  voucherDiscountAmountTemplate = (rowData) => {
    return <React.Fragment>{rowData?.voucherDiscountAmount}Tk</React.Fragment>
  }
  voucherDiscountPercentTemplate = (rowData) => {
    return <React.Fragment>{rowData?.voucherDiscountPercent}%</React.Fragment>
  }

  imageTemplate = (rowData) => {
    return (
      <React.Fragment>
        <img
          src={baseUrl.concat(rowData?.voucherImage)}
          className='thumb-md product-image'
          alt='img'
          style={{ verticalAlign: 'middle', objectFit: 'contain' }}
        />
      </React.Fragment>
    )
  }

  discountTypeTemplate = (rowData) => {
    return <React.Fragment>{rowData?.discountTypeName}</React.Fragment>
  }

  startDateTemplate = (rowData) => {
    return (
      <React.Fragment>
        {moment(rowData?.voucherStartDate).format('Do MMMM YYYY')}
      </React.Fragment>
    )
  }

  startTimeTemplate = (rowData) => {
    return (
      <React.Fragment>
        {moment(rowData?.voucherStartDate).format('h:mm a')}
      </React.Fragment>
    )
  }

  endDateTemplate = (rowData) => {
    return (
      <React.Fragment>
        {moment(rowData?.voucherEndDate).format('Do MMMM YYYY')}
      </React.Fragment>
    )
  }

  endTimeTemplate = (rowData) => {
    return (
      <React.Fragment>
        {moment(rowData?.voucherEndDate).format('h:mm a')}
      </React.Fragment>
    )
  }

  statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span
          className={
            rowData?.isActive === 'Y'
              ? 'p-tag p-tag-primary'
              : 'p-tag p-tag-warning'
          }
        >
          {rowData?.isActive === 'Y' ? 'ACTIVE' : 'INACTIVE'}
        </span>
      </React.Fragment>
    )
  }

  actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Toast ref={(el) => (this.toast = el)} />
        <Link
          to={{
            pathname: `/EditVoucher`,
            state: { rowData },
          }}
        >
          <Button
            icon='pi pi-pencil'
            className='p-button-rounded p-button-success p-mr-2'
          />
        </Link>
      </React.Fragment>
    )
  }

  onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1
  }

  rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Link to='/CreateVoucher'>
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
        <div className='p-text-bold table-heading-style'>List of Vouchers</div>
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
              placeholder='Search Here'
            />
          </span>
        </div>
      </>
    )
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
                      {this.props?.loading ? (
                        <LoadingCard count={1} />
                      ) : this.props?.error ? (
                        <Message variant='danger'>{this.props?.error}</Message>
                      ) : (
                        <DataTable
                          header={header}
                          ref={(el) => (this.dt = el)}
                          value={this.state?.productVoucher}
                          className='p-datatable-customers p-datatable-responsive-demo'
                          dataKey='id'
                          rowHover
                          globalFilter={this.state?.globalFilter}
                          selection={this.state?.selectedVoucher}
                          onSelectionChange={(e) =>
                            this.setState({ selectedVoucher: e.value })
                          }
                          paginator
                          rows={10}
                          emptyMessage='No Voucher found'
                          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                          rowsPerPageOptions={[10, 25, 50]}
                          {...this.state}
                          productVoucher={this.props?.productVoucher}
                          values={this.values}
                          loading={this.state?.loading}
                        >
                          <Column
                            field='Index'
                            header='SN'
                            body={this.onIndexTemplate}
                          />

                          <Column
                            sortField='voucherName'
                            filterField='voucherName'
                            header='Voucher Name'
                            body={this.nameTemplate}
                            sortable
                          />
                          <Column
                            sortField='voucherCode'
                            filterField='voucherCode'
                            header='Voucher Code'
                            body={this.voucherCodeTemplate}
                            sortable
                          />
                          <Column
                            sortField='voucherImage'
                            filterField='voucherImage'
                            header='Voucher Logo'
                            body={this.imageTemplate}
                          />
                          <Column
                            sortField='discountTypeName'
                            filterField='discountTypeName'
                            header='Discount Type'
                            body={this.discountTypeTemplate}
                            sortable
                          />
                          <Column
                            sortField='voucherMaximumAmount'
                            filterField='voucherMaximumAmount'
                            header='Maximum Discount Amount'
                            body={this.voucherMaximumAmountTemplate}
                            sortable
                          />
                          <Column
                            sortField='voucherDiscountAmount'
                            filterField='voucherDiscountAmount'
                            header='Voucher Amount'
                            body={this.voucherDiscountAmountTemplate}
                            sortable
                          />
                          <Column
                            sortField='voucherDiscountPercent'
                            filterField='voucherDiscountPercent'
                            header='Voucher (%)'
                            body={this.voucherDiscountPercentTemplate}
                            sortable
                          />
                          <Column
                            sortField='voucherStartDate'
                            filterField='voucherStartDate'
                            header='Voucher Start Date'
                            body={this.startDateTemplate}
                            sortable
                          />

                          <Column
                            sortField='voucherEndDate'
                            filterField='voucherEndDate'
                            header='Voucher End Date'
                            body={this.endDateTemplate}
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
                            header='Edit'
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
        <ToastContainer autoClose={1500} />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  vouchers: state.voucherReducer?.vouchers,
  loading: state.voucherReducer?.loading,
  error: state.voucherReducer?.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getVoucherRecord: () => dispatch(voucherAction.getVoucherRecord()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(voucherListContainer)
