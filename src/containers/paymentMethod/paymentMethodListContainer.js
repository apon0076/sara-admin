import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'
import * as paymentMethodAction from '../../store/actions/paymentMethodAction'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { InputText } from 'primereact/inputtext'
import { Link } from 'react-router-dom'
import authenticationService from '../../store/services/authenticationService'
import baseUrl from '../../utils/baseUrl'
import 'moment-timezone'
import LoadingCard from '../../components/shared/LoadingCard'
import Message from '../../components/shared/Message'

class paymentMethodListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paymentMethods: null,
      globalFilter: null,
      loading: false,
      position: 'center',
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

    await this.props.getPaymentMethodRecord()
    this.setState({
      paymentMethods: this.props.data.sort((a, b) =>
        a.timeM > b.timeM ? 1 : -1
      ),
    })
  }

  methodNameBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {rowData?.methodName}
      </React.Fragment>
    )
  }

  contactPersonBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {rowData?.contactPerson ? rowData?.contactPerson : 'N/A'}
      </React.Fragment>
    )
  }

  displayOrderBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {rowData?.displayOrder ? rowData?.displayOrder : 'N/A'}
      </React.Fragment>
    )
  }
  contactNoBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {rowData?.contactNo ? rowData?.contactNo : 'N/A'}
      </React.Fragment>
    )
  }

  emailBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {rowData?.email ? rowData?.email : 'N/A'}
      </React.Fragment>
    )
  }

  webBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {rowData?.web ? rowData?.web : 'N/A'}
      </React.Fragment>
    )
  }

  webPortalLinkBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {rowData?.webPortalLink ? rowData?.webPortalLink : 'N/A'}
      </React.Fragment>
    )
  }

  logoTemplate = (rowData) => {
    return (
      <React.Fragment>
        {rowData.logo ? (
          <img
            src={baseUrl.concat(rowData?.logo)}
            className='thumb-md product-image'
            alt='img'
            style={{ verticalAlign: 'middle', objectFit: 'contain' }}
          />
        ) : (
          'N/A'
        )}
      </React.Fragment>
    )
  }

  durationBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <span
          className={
            rowData?.duration === 'Y'
              ? 'p-tag p-tag-primary'
              : 'p-tag p-tag-warning'
          }
        >
          {rowData?.duration === 'Y' ? 'Yes' : 'No'}
        </span>
      </React.Fragment>
    )
  }

  statusBodyTemplate(rowData) {
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

  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Link
          to={{
            pathname: `/EditPaymentMethod`,
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

  onIndexTemplate(rowData, props) {
    return props?.rowIndex + 1
  }

  rightToolbarTemplate() {
    return (
      <React.Fragment>
        <Link to='/CreatePaymentMethod'>
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
          List of Payment Methods
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
                        <Message variant='danger'>{this.props.error}</Message>
                      ) : (
                        <DataTable
                          header={header}
                          ref={(el) => (this.dt = el)}
                          value={this.state?.paymentMethods}
                          className='p-datatable-customers p-datatable-responsive-demo'
                          dataKey='paymentMethodId'
                          rowHover
                          globalFilter={this.state?.globalFilter}
                          paginator
                          rows={10}
                          emptyMessage='No payment method found!'
                          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                          rowsPerPageOptions={[10, 25, 50]}
                          {...this.state}
                          values={this.values}
                          loading={this.state?.loading}
                        >
                          <Column
                            field='Index'
                            header='SN'
                            body={this.onIndexTemplate}
                          />

                          <Column
                            sortField='methodName'
                            filterField='methodName'
                            header='Payment Method'
                            body={this.methodNameBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='logo'
                            header='Logo'
                            body={this.logoTemplate}
                          />
                          <Column
                            sortField='contactPerson'
                            filterField='contactPerson'
                            header='Contact Person'
                            body={this.contactPersonBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='contactNo'
                            filterField='contactNo'
                            header='Contact No'
                            body={this.contactNoBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='email'
                            filterField='email'
                            header='Email'
                            body={this.emailBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='web'
                            filterField='web'
                            header='Web Address'
                            body={this.webBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='webPortalLink'
                            filterField='webPortalLink'
                            header='Web Portal Link'
                            body={this.webPortalLinkBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='displayOrder'
                            filterField='displayOrder'
                            header='Display Order'
                            body={this.displayOrderBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='duration'
                            header='Duration'
                            body={this.durationBodyTemplate}
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
  data: state.paymentMethodReducer?.paymentMethods,
  loading: state.paymentMethodReducer?.loading,
  error: state.paymentMethodReducer?.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getPaymentMethodRecord: () =>
      dispatch(paymentMethodAction.getPaymentMethodRecord()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(paymentMethodListContainer)
