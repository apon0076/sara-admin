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
import authenticationService from '../../store/services/authenticationService'
import LoadingCard from '../../components/shared/LoadingCard'
import Message from '../../components/shared/Message'

class courierCostListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courierCost: null,
      selectedCourierCost: null,
      globalFilter: null,
      loading: false,
      position: 'center',
    }

    this.courierNameBodyTemplate = this.courierNameBodyTemplate.bind(this)
    this.customsDutiesChargePerBodyTemplate =
      this.customsDutiesChargePerBodyTemplate.bind(this)
    this.taxPerBodyTemplate = this.taxPerBodyTemplate.bind(this)
    this.vatPerBodyTemplate = this.vatPerBodyTemplate.bind(this)
    this.aitPerBodyTemplate =
      this.aitPerBodyTemplate.bind(this)
    this.otherCostBodyTemplate = this.otherCostBodyTemplate.bind(this)

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

    await this.props.getCourierCostRecord()
    this.setState({
      courierCost: this.props.data.sort((a, b) => (a.timeM > b.timeM ? 1 : -1)),
    })
  }

  courierNameBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {rowData.courierName}
      </React.Fragment>
    )
  }

  customsDutiesChargePerBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {rowData.customsDutiesChargePer}
      </React.Fragment>
    )
  }

  taxPerBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {rowData.taxPer}
      </React.Fragment>
    )
  }

  vatPerBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Vat Percentage</span> */}
        {rowData.vatPer}
      </React.Fragment>
    )
  }

  aitPerBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Ait Percentage</span> */}
        {rowData.aitPer}
      </React.Fragment>
    )
  }

  fuelSurchargePerBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Fuel Surcharge Percentage</span> */}
        {rowData.fuelSurchargePer}
      </React.Fragment>
    )
  }
  otherCostBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Other Cost</span> */}
        {rowData.otherCost}
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
        <Link
          to={{
            pathname: `/EditCourierCost`,
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
        <Link to='/CreateCourierCost'>
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
          List of Courier Cost
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
              placeholder='Search by Courier Name'
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
                        value={this.state.courierCost}
                        className='p-datatable-customers'
                        dataKey='id'
                        rowHover
                        globalFilter={this.state.globalFilter}
                        paginator
                        rows={10}
                        emptyMessage='No Courier found'
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
                          header='Courier Name'
                          body={this.courierNameBodyTemplate}
                          sortable
                        />
                        <Column
                          sortField='customsDutiesChargePer'
                          header='Customs Duties Charge (%)'
                          body={this.customsDutiesChargePerBodyTemplate}
                          sortable
                        />
                        <Column
                          sortField='taxPer'
                          header='Tax (%)'
                          body={this.taxPerBodyTemplate}
                          sortable
                        />
                        <Column
                          sortField='vatPer'
                          header='Vat (%)'
                          body={this.vatPerBodyTemplate}
                          sortable
                        />
                        <Column
                          sortField='aitPer'
                          header='AIT (%)'
                          body={this.aitPerBodyTemplate}
                          sortable
                        />
                        <Column
                          sortField='fuelSurchargePer'
                          header='Fuel Surcharge (%)'
                          body={this.fuelSurchargePerBodyTemplate}
                          sortable
                        />
                        <Column
                          sortField='otherCost'
                          header='Other Cost'
                          body={this.otherCostBodyTemplate}
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
  data: state.shippingReducer.courierCost,
  loading: state.shippingReducer.loading,
  error: state.shippingReducer.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getCourierCostRecord: (data) =>
      dispatch(shippingAction.getCourierCostRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(courierCostListContainer)
