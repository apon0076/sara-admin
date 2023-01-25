import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import * as shippingAction from '../../store/actions/shippingAction'
import * as addressAction from '../../store/actions/addressAction'
import * as unitAction from '../../store/actions/unitAction'
import * as activeBreadcrumbsCategoryAction from '../../store/actions/activeBreadcrumbsCategoryAction'
import * as sellerAction from '../../store/actions/sellerAction'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import { InputText } from 'primereact/inputtext'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import authenticationService from '../../store/services/authenticationService'
import EditShippingCostModal from '../../components/shipping/shippingOptions/EditShippingCostModal'
import LoadingCard from '../../components/shared/LoadingCard'
import Message from '../../components/shared/Message'

class shippingCostListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shippingCost: null,
      selectedShippingCost: null,
      shippingTypes: '',
      shippingTypeId: 0,
      typeName: '',
      getShippingType: '',
      shippingOptions: '',
      shippingOptionsId: 0,
      optionName: '',
      getShippingOption: '',
      allCountries: '',
      categories: '',
      shops: '',
      units: '',
      singleRow: '',
      globalFilter: null,
      loading: false,
      position: 'center',
      success: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.typeNameBodyTemplate = this.typeNameBodyTemplate.bind(this)
    this.optionNameBodyTemplate = this.optionNameBodyTemplate.bind(this)
    this.actualCostBodyTemplate = this.actualCostBodyTemplate.bind(this)
    this.shippingTotalCostBodyTemplate =
      this.shippingTotalCostBodyTemplate.bind(this)
    this.countryNameBodyTemplate = this.countryNameBodyTemplate.bind(this)
    this.areaNameBodyTemplate = this.areaNameBodyTemplate.bind(this)
    this.categoryNameBodyTemplate = this.categoryNameBodyTemplate.bind(this)
    this.shopNameBodyTemplate = this.shopNameBodyTemplate.bind(this)
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
    await this.props.getShippingCostRecord()
    this.setState({
      shippingCost: this.props.data.sort((a, b) =>
        a.timeM > b.timeM ? 1 : -1
      ),
    })
    await this.props.getShippingTypeRecord()
    this.setState({ shippingTypes: this.props.shippingType })
    await this.props.getShippingOptionsRecord()
    this.setState({ shippingOptions: this.props.shippingOptions })
    await this.props.getAllCountryRecord()
    this.setState({ allCountries: this.props.allCountries })
    await this.props.getActiveBreadcrumbsProductCategoryRecord()
    this.setState({ categories: this.props.categories })
    await this.props.getUnitRecord()
    this.setState({ units: this.props.units })
    await this.props.getVerifiedShopRecord()
    this.setState({ shops: this.props.shops })
  }

  handleChange = async (e) => {
    const { target } = e
    switch (target.name) {
      case 'typeName':
        this.setState({
          typeName: target.value,
          shippingTypeId: target.value.shippingTypeId,
        })
        break
      case 'optionName':
        this.setState({
          optionName: target.value,
          shippingOptionsId: target.value.shippingOptionsId,
        })
        break
      default:
    }
  }

  filterData = async () => {
    await this.props.getShippingCostRecord(
      this.state.shippingTypeId,
      this.state.shippingOptionsId
    )
    this.setState({ shippingCost: this.props.data })
  }

  typeNameBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Type Name</span> */}
        {rowData.typeName ? rowData.typeName : 'N/A'}
      </React.Fragment>
    )
  }

  optionNameBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Option Name</span> */}
        {rowData.optionName ? rowData.optionName : 'N/A'}
      </React.Fragment>
    )
  }

  minValueBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Actual Cost</span> */}
        {rowData.minValue
          ? rowData.minValue
          : rowData.shippingOptionsId === 2
          ? 0
          : 'N/A'}
      </React.Fragment>
    )
  }

  maxValueBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Actual Cost</span> */}
        {rowData.maxValue
          ? rowData.maxValue
          : rowData.shippingOptionsId === 2
          ? 0
          : 'N/A'}
      </React.Fragment>
    )
  }

  actualCostBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Actual Cost</span> */}
        {rowData.actualCost ? rowData.actualCost : 0}
      </React.Fragment>
    )
  }

  shippingTotalCostBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Shipping Total Cost</span> */}
        {rowData.shippingTotalCost ? rowData.shippingTotalCost : 0}
      </React.Fragment>
    )
  }

  countryNameBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Country Name</span> */}
        {rowData.countryName ? rowData.countryName : 'N/A'}
      </React.Fragment>
    )
  }

  cityNameBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Country Name</span> */}
        {rowData.cityName ? rowData.cityName : 'N/A'}
      </React.Fragment>
    )
  }

  areaNameBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Area Name</span> */}
        {rowData.areaName ? rowData.areaName : 'N/A'}
      </React.Fragment>
    )
  }

  categoryNameBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Category Name</span> */}
        {rowData.categoryName ? rowData.categoryName : 'N/A'}
      </React.Fragment>
    )
  }

  shopNameBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'> Shop Name</span> */}
        {rowData.shopName ? rowData.shopName : 'N/A'}
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
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-success p-mr-2'
          onClick={() => this.setState({ singleRow: rowData })}
          data-toggle='modal'
          data-target='#editModal'
        />
      </React.Fragment>
    )
  }

  onIndexTemplate(rowData, props) {
    return props.rowIndex + 1
  }

  rightToolbarTemplate() {
    return (
      <React.Fragment>
        <Link to='/CreateShippingCost'>
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
          List of Shipping Cost
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
              placeholder='Search here'
            />
          </span>
        </div>
      </>
    )
  }

  updateShippingCost = async (data) => {
    const result = await this.props.updateShippingCostRecord(data)

    if (result && result.payload.success === true) {
      toast.success('Shipping Cost Updated Successfully')
      setTimeout(() => {
        this.props.history.push('ShippingCostList')
      }, 2500)
      this.setState({ success: true })
      await this.props.getShippingCostRecord(0, 0)
      this.setState({ shippingCost: this.props.data, success: false })
    } else if (result && result.payload.success === false) {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
      }, 2500)
    } else if (result.type === 'UPDATE_SHIPPING_COST_SUCCESS') {
      toast.success('Shipping Cost Updated Successfully')
      setTimeout(() => {
        this.props.history.push('ShippingCostList')
      }, 2500)
      this.setState({ success: true })
      await this.props.getShippingCostRecord(0, 0)
      this.setState({ shippingCost: this.props.data, success: false })
    } else {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
      }, 2500)
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
                  <div className='datatable-doc-demo'>
                    <div className='card'>
                      <Toolbar
                        className='p-mb-4'
                        right={this.rightToolbarTemplate}
                        left={this.leftToolbarTemplate}
                      ></Toolbar>

                      <Row>
                        <Col xs={12} md={4}>
                          <div className='form-group'>
                            <label className='control_label'>
                              Shipping Type Name
                            </label>
                            <div className='dropdown-demo'>
                              <Dropdown
                                optionLabel='typeName'
                                options={this.state.shippingTypes}
                                filter
                                showClear
                                filterBy='typeName'
                                placeholder='Select Shipping Type'
                                name='typeName'
                                value={this.state.typeName}
                                onChange={this.handleChange}
                                className='form-control'
                              />
                            </div>
                          </div>
                        </Col>
                        <Col xs={12} md={4}>
                          <div className='form-group'>
                            <label className='control_label'>
                              Shipping Option Name
                            </label>
                            <div className='dropdown-demo'>
                              <Dropdown
                                optionLabel='optionName'
                                options={this.state.shippingOptions}
                                filter
                                showClear
                                filterBy='optionName'
                                placeholder='Select Option Name'
                                name='optionName'
                                value={this.state.optionName}
                                onChange={this.handleChange}
                                className='form-control'
                              />
                            </div>
                          </div>
                        </Col>
                        <Col xs={12} md={1}>
                          <div className='form-group'>
                            <label className='control_label'>{''}</label>
                            <div className='dropdown-demo'>
                              <button
                                type='submit'
                                className='btn btn-success'
                                onClick={this.filterData}
                              >
                                Filter
                              </button>
                            </div>
                          </div>
                        </Col>
                        <Col xs={12} md={2}>
                          <div className='form-group'>
                          <label className='control_label'>{''}</label>
                            <InputText
                              type='search'
                              className='form-control text-center text-field'
                              onInput={(e) =>
                                this.setState({ globalFilter: e.target.value })
                              }
                              placeholder='Search Here'
                            />
                          </div>
                        </Col>
                      </Row>
                      {this.props.loading ? (
                        <LoadingCard count={1} />
                      ) : this.props.error ? (
                        <Message variant='danger'>{this.props.error}</Message>
                      ) : (
                        <>
                          <DataTable
                            ref={(el) => (this.dt = el)}
                            value={this.state.shippingCost}
                            className='p-datatable-customers'
                            dataKey='id'
                            rowHover
                            globalFilter={this.state.globalFilter}
                            paginator
                            rows={10}
                            emptyMessage='No Shipping Option found'
                            currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                            paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                            rowsPerPageOptions={[10, 25, 50]}
                            {...this.state}
                            shippingCost={this.props.shippingCost} //
                            values={this.values}
                            loading={this.state.loading}
                          >
                            <Column
                              field='Index'
                              header='SN'
                              body={this.onIndexTemplate}
                            />
                            <Column
                              sortField='typeName'
                              filterField='typeName'
                              header='Type Name'
                              body={this.typeNameBodyTemplate}
                              sortable
                            />
                            <Column
                              sortField='optionName'
                              filterField='optionName'
                              header='Option Name'
                              body={this.optionNameBodyTemplate}
                              sortable
                            />
                            <Column
                              sortField='categoryName'
                              filterField='categoryName'
                              header='Category Name'
                              body={this.categoryNameBodyTemplate}
                              sortable
                              style={{
                                display:
                                  this.state.shippingOptionsId === 5
                                    ? 'block'
                                    : 'none',
                              }}
                            />
                            <Column
                              sortField='shopName'
                              filterField='shopName'
                              header='Shop Name'
                              body={this.shopNameBodyTemplate}
                              sortable
                              style={{
                                display:
                                  this.state.shippingOptionsId === 6
                                    ? 'block'
                                    : 'none',
                              }}
                            />

                            <Column
                              sortField='countryName'
                              filterField='countryName'
                              header='Country'
                              body={this.countryNameBodyTemplate}
                              sortable
                            />
                            <Column
                              sortField='cityName'
                              filterField='cityName'
                              header='City'
                              body={this.cityNameBodyTemplate}
                              sortable
                            />
                            <Column
                              sortField='areaName'
                              filterField='areaName'
                              header='Area'
                              body={this.areaNameBodyTemplate}
                              sortable
                            />
                            <Column
                              sortField='minValue'
                              filterField='minValue'
                              header='Min Value'
                              body={this.minValueBodyTemplate}
                              sortable
                            />
                            <Column
                              sortField='maxValue'
                              filterField='maxValue'
                              header='Max Value'
                              body={this.maxValueBodyTemplate}
                              sortable
                            />
                            <Column
                              sortField='actualCost'
                              filterField='actualCost'
                              header='Actual Cost'
                              body={this.actualCostBodyTemplate}
                              sortable
                            />
                            <Column
                              sortField='shippingTotalCost'
                              filterField='shippingTotalCost'
                              header='Shipping Cost'
                              body={this.shippingTotalCostBodyTemplate}
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
                          {!this.state.success && (
                            <EditShippingCostModal
                              data={this.state.singleRow}
                              allCountries={this.state.allCountries}
                              categories={this.state.categories}
                              units={this.state.units}
                              shops={this.state.shops}
                              success={this.state.success}
                              updateShippingCost={this.updateShippingCost}
                            />
                          )}
                        </>
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
  data: state.shippingReducer.shippingCost,
  // shippingType: state.shippingReducer.shippingType,
  shippingType: state.shippingReducer.shippingType.filter(
    (item) => item.isActive === 'Y'
  ),
  shippingOptions: state.shippingReducer.shippingOptions.filter(
    (item) => item.isActive === 'Y'
  ),
  allCountries: state.addressReducer.allCountries,
  categories:
    state.activeBreadcrumbsCategoryReducer.activeBreadcrumbsProductCategories,
  units: state.unitReducer.units,
  sellers: state.sellerReducer.sellers,
  loading: state.shippingReducer.loading,
  error: state.shippingReducer.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getShippingTypeRecord: (data) =>
      dispatch(shippingAction.getShippingTypeRecord(data)),
    getShippingOptionsRecord: (data) =>
      dispatch(shippingAction.getShippingOptionsRecord(data)),
    getAllCountryRecord: () => dispatch(addressAction.getAllCountryRecord()),
    getActiveBreadcrumbsProductCategoryRecord: () =>
      dispatch(
        activeBreadcrumbsCategoryAction.getActiveBreadcrumbsProductCategoryRecord()
      ),
    getVerifiedShopRecord: () => dispatch(sellerAction.getVerifiedShopRecord()),
    getUnitRecord: () => dispatch(unitAction.getUnitRecord()),
    getShippingCostRecord: (shippingTypeId, shippingOptionsId) =>
      dispatch(
        shippingAction.getShippingCostRecord(shippingTypeId, shippingOptionsId)
      ),
    updateShippingCostRecord: (data) =>
      dispatch(shippingAction.updateShippingCostRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(shippingCostListContainer)
