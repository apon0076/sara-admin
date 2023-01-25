import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'
import * as shippingAction from '../../store/actions/shippingAction'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import { InputText } from 'primereact/inputtext'
import { Link } from 'react-router-dom'
import baseUrl from '../../utils/baseUrl'
import authenticationService from '../../store/services/authenticationService'
import LoadingCard from '../../components/shared/LoadingCard'
import Message from '../../components/shared/Message'

class courierProfileListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courierProfile: null,
      selectedCourierProfile: null,
      globalFilter: null,
      loading: false,
      position: 'center',
    }

    this.courierNameBodyTemplate = this.courierNameBodyTemplate.bind(this)
    this.courierLogoUrlBodyTemplate = this.courierLogoUrlBodyTemplate.bind(this)
    this.contactNoBodyTemplate = this.contactNoBodyTemplate.bind(this)
    this.contactPersonBodyTemplate = this.contactPersonBodyTemplate.bind(this)
    this.contactPersonNoBodyTemplate =
      this.contactPersonNoBodyTemplate.bind(this)
    this.emailBodyTemplate = this.emailBodyTemplate.bind(this)

    this.statusBodyTemplate = this.statusBodyTemplate.bind(this)
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    this.onIndexTemplate = this.onIndexTemplate.bind(this)
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this)
    this.leftToolbarTemplate = this.leftToolbarTemplate.bind(this)
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

    await this.props.getCourierProfileRecord()
    this.setState({
      courierProfile: this.props.data.sort((a, b) =>
        a.timeM > b.timeM ? 1 : -1
      ),
    })
  }

  courierNameBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Courier Name</span> */}
        {rowData.courierName}
      </React.Fragment>
    )
  }

  courierLogoUrlBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <img
          src={baseUrl.concat(rowData.courierLogoUrl)}
          className='thumb-md product-image'
          alt='Courier Logo'
          style={{ verticalAlign: 'middle', objectFit: 'contain' }}
        />
      </React.Fragment>
    )
  }

  contactNoBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Contact No.</span> */}
        {rowData.contactNo}
      </React.Fragment>
    )
  }

  contactPersonBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Contact Person Name</span> */}
        {rowData.contactPerson}
      </React.Fragment>
    )
  }

  contactPersonNoBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Contact Person No.</span> */}
        {rowData.contactPersonNo}
      </React.Fragment>
    )
  }

  emailBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Email</span> */}
        {rowData.email}
      </React.Fragment>
    )
  }

  statusBodyTemplate(rowData) {
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

  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Toast ref={(el) => (this.toast = el)} />
        {/* <span className='p-column-title'>Action</span> */}
        <Link
          to={{
            pathname: `/EditCourierProfile`,
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
    return props.rowIndex + 1
  }

  rightToolbarTemplate() {
    return (
      <React.Fragment>
        <Link to='/CreateCourierProfile'>
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
          List of Courier Profiles
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
                  <div className='datatable-doc-demo'>
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
                          value={this.state.courierProfile}
                          className='p-datatable-customers'
                          dataKey='id'
                          rowHover
                          globalFilter={this.state.globalFilter}
                          paginator
                          rows={10}
                          emptyMessage='No Courier Profile found'
                          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                          rowsPerPageOptions={[10, 25, 50]}
                          {...this.state}
                          values={this.values}
                          loading={this.state.loading}
                        >
                          <Column
                            field='Index'
                            header='SN'
                            body={this.onIndexTemplate}
                          />
                          <Column
                            sortField='courierName'
                            filterField='courierName'
                            header='Profile Name'
                            body={this.courierNameBodyTemplate}
                            sortable
                          />
                          <Column
                            field='courierLogoUrl'
                            header='Logo'
                            body={this.courierLogoUrlBodyTemplate}
                          />
                          <Column
                            sortField='contactNo'
                            filterField='contactNo'
                            header='Contact No.'
                            body={this.contactNoBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='contactPerson'
                            filterField='contactPerson'
                            header='Contact Person Name'
                            body={this.contactPersonBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='contactPersonNo'
                            filterField='contactPersonNo'
                            header='Contact Person No'
                            body={this.contactPersonNoBodyTemplate}
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
  data: state.shippingReducer.courierProfile,
  loading: state.shippingReducer.loading,
  error: state.shippingReducer.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getCourierProfileRecord: (data) =>
      dispatch(shippingAction.getCourierProfileRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(courierProfileListContainer)
