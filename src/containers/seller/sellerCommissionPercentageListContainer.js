import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import * as sellerProfileAction from '../../store/actions/sellerProfileAction'
import authenticationService from '../../store/services/authenticationService'
import sellerService from '../../store/services/sellerService'
import { Link } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import LoadingCard from '../../components/shared/LoadingCard'
import Message from '../../components/shared/Message'

class sellerCommissionPercentageListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commissionPercentage: null,
      selectedCommissionPercentage: null,
      globalFilter: null,
      loading: false,
    }

    this.localCommissionPercentageTemplate =
      this.localCommissionPercentageTemplate.bind(this)
    this.globalCommissionPercentageTemplate =
      this.globalCommissionPercentageTemplate.bind(this)
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this)
    this.approveBodyTemplate = this.approveBodyTemplate.bind(this)
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    this.onIndexTemplate = this.onIndexTemplate.bind(this)
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this)
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
      this.props.history.push('/SellerLogin')
    }
    //End Temporary Authentication
    await this.props.getShopDetailsBySellerIdRecord(userId)

    this.props.sellerProfile[0] &&
      this.setState({
        shopId: this.props.sellerProfile[0].shopId,
      })

    let id = this.state.shopId
    await this.props.getCommissionPercentageRecord(id)
    this.setState({
      commissionPercentage: this.props.commissionPercentage,
    })
  }
  localCommissionPercentageTemplate = (rowData) => {
    return <React.Fragment>{rowData.localCommissionPercentage}%</React.Fragment>
  }
  globalCommissionPercentageTemplate = (rowData) => {
    return (
      <React.Fragment>{rowData.globalCommissionPercentage}%</React.Fragment>
    )
  }

  statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
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

  approveBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span
          className={
            rowData.isApprove === 'Y'
              ? 'p-tag p-tag-primary'
              : 'p-tag p-tag-warning'
          }
        >
          {rowData.isApprove === 'Y' ? 'APPROVED' : 'REJECTED'}
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
            pathname: `/EditCommissionPercentage`,
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
        <Link to='/'>
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
          List of Commission Percentage
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
              placeholder='Search by Commission Percentage'
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
                  <div className='datatable-rowexpansion-demo'>
                    <div className='card'>
                      <Toolbar
                        className='p-mb-4'
                        right={this.rightToolbarTemplate}
                        left={this.leftToolbarTemplate}
                      ></Toolbar>
                      <div className='card'>
                        {this.props.loading ? (
                          <LoadingCard count={1} />
                        ) : this.props.error ? (
                          <Message variant='danger'>{this.props.error}</Message>
                        ) : (
                          <DataTable
                            header={header}
                            ref={(el) => (this.dt = el)}
                            value={this.state.commissionPercentage}
                            className='p-datatable-customers'
                            dataKey='id'
                            rowHover
                            globalFilter={this.state.globalFilter}
                            selection={this.state.selectedCommissionPercentage}
                            onSelectionChange={(e) =>
                              this.setState({
                                selectedCommissionPercentage: e.value,
                              })
                            }
                            paginator
                            rows={10}
                            emptyMessage='No Commission Percentage found'
                            currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                            paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                            rowsPerPageOptions={[10, 25, 50]}
                            {...this.state}
                            commissionPercentage={
                              this.props.commissionPercentage
                            }
                            values={this.values}
                            loading={this.state.loading}
                          >
                            <Column
                              field='Index'
                              header='SN'
                              body={this.onIndexTemplate}
                            />
                            <Column
                              sortField='localCommissionPercentage'
                              filterField='localCommissionPercentage'
                              header='Local Commission (%)'
                              body={this.localCommissionPercentageTemplate}
                              sortable
                            />
                            <Column
                              sortField='globalCommissionPercentage'
                              filterField='globalCommissionPercentage'
                              header='Global Commission (%)'
                              body={this.globalCommissionPercentageTemplate}
                              sortable
                            />
                            <Column
                              sortField='isActive'
                              header='Status'
                              body={this.statusBodyTemplate}
                              sortable
                            />
                            <Column
                              sortField='isApprove'
                              header='Approval'
                              body={this.approveBodyTemplate}
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
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  sellerProfile: state.sellerProfileReducer.shopDetails,
  commissionPercentage: state.sellerProfileReducer.sellerCommissionPercentage,
  loading: state.sellerProfileReducer.loading,
  error: state.sellerProfileReducer.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getShopDetailsBySellerIdRecord: (index) =>
      dispatch(sellerProfileAction.getShopDetailsBySellerIdRecord(index)),

    getCommissionPercentageRecord: (shopId) =>
      dispatch(sellerProfileAction.getCommissionPercentageRecord(shopId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(sellerCommissionPercentageListContainer)
