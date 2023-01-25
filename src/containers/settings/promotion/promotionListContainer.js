import React, { Component } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'
import * as promotionAction from '../../../store/actions/promotionAction'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import { Link } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import authenticationService from '../../../store/services/authenticationService'
import baseUrl from '../../../utils/baseUrl'
import moment from 'moment'
import 'moment-timezone'

class promotionListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      promotions: null,
      selectedPromotions: null,
      globalFilter: null,
      loading: false,
      position: 'center',
    }
    //this.promotionList = new PromotionList()
    this.nameTemplate = this.nameTemplate.bind(this)
    this.startDateTemplate = this.startDateTemplate.bind(this)
    this.endDateTemplate = this.endDateTemplate.bind(this)
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this)
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    this.onIndexTemplate = this.onIndexTemplate.bind(this)
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this)
    this.deleteDiscountType = this.deleteDiscountType.bind(this)
    this.promotionImageUrlTemplate = this.promotionImageUrlTemplate.bind(this)
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

    await this.props.getPromotionRecord()
    this.setState({
      promotions: this.props.data.sort((a, b) => (a.timeM > b.timeM ? 1 : -1)),
    })
  }

  promotionImageUrlTemplate = (rowData) => {
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

  nameTemplate = (rowData) => {
    return <React.Fragment>{rowData.name}</React.Fragment>
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

  actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Toast ref={(el) => (this.toast = el)} />
        <span className='p-column-title'>Action</span>
        <Link
          to={{
            pathname: `/EditPromotion`,
            state: { rowData },
          }}
        >
          <Button
            icon='pi pi-pencil'
            className='p-button-rounded p-button-success p-mr-2'
          />
        </Link>
        {/* <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => this.deleteDiscountType(rowData)}
        /> */}
      </React.Fragment>
    )
  }

  onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1
  }

  deleteDiscountType = async (data) => {
    const resultData = {
      productDiscountTypeId: data.productDiscountTypeId,
      productDiscountTypeName: data.productDiscountTypeName,
      isActive: 'D',
    }

    await this.props.createOrUpdatePromotionRecord(resultData)
    window.location.reload(true)
    this.setState({
      loading: true,
    })
    this.showTrue(true)
  }

  rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Link to='/CreatePromotion'>
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
              placeholder='Search by promotion name'
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
                      <DataTable
                        header={header}
                        ref={(el) => (this.dt = el)}
                        value={this.state.promotions}
                        // header={header}
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
                        emptyMessage='No promotion data found'
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
                          sortField='promotionLogo'
                          filterField='promotionLogo'
                          header='Promotion Logo'
                          body={this.promotionImageUrlTemplate}
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
  data: state.promotionReducer.promotions,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getPromotionRecord: () => dispatch(promotionAction.getPromotionRecord()),
    deletePromotionRecord: (index) =>
      dispatch(promotionAction.deletePromotionRecord(index)),
    createOrUpdatePromotionRecord: (data) =>
      dispatch(promotionAction.createOrUpdatePromotionRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(promotionListContainer)
