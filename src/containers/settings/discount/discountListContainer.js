import React, { Component } from "react"
import { toast, ToastContainer } from "react-toastify"
import { connect } from "react-redux"
import * as discountTypeAction from "../../../store/actions/discountTypeAction"
import * as discountAction from "../../../store/actions/discountAction"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Button } from "primereact/button"
import { Toast } from "primereact/toast"
import { Toolbar } from "primereact/toolbar"
import { InputText } from "primereact/inputtext"
import { Link } from "react-router-dom"
import authenticationService from "../../../store/services/authenticationService"
import moment from 'moment'
import 'moment-timezone'

class discountListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      discounts: null,
      productName: null,
      discountType: null,
      startDate: null,
      enddate: null,
      discountPercentage: null,
      selectedDiscounts: null,
      globalFilter: null,
      loading: false,
      position: "center",
    }
    //this.discountList = new DiscountList()
    this.productNameTemplate = this.productNameTemplate.bind(this)
    this.discountTypeTemplate = this.discountTypeTemplate.bind(this)
    this.startDateTemplate = this.startDateTemplate.bind(this)
    this.endDateTemplate = this.endDateTemplate.bind(this)
    this.discountPercentageTemplate = this.discountPercentageTemplate.bind(this)
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this)
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    this.onIndexTemplate = this.onIndexTemplate.bind(this)
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this)
    this.deleteDiscountType = this.deleteDiscountType.bind(this)
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()
    if (roleId === "1") {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push("/Login")
    }
    //End Temporary Authentication


    await this.props.getDiscountRecord()
    this.setState({ discounts: this.props.discounts })
  }

  productNameTemplate = (rowData) => {
    return <React.Fragment>{rowData.productName}</React.Fragment>
  }

  discountTypeTemplate = (rowData) => {
    return <React.Fragment>{rowData.discountTypeName}</React.Fragment>
  }

  startDateTemplate = (rowData) => {
    return <React.Fragment>{moment(rowData.discountStartDate).format('Do MMMM YYYY')}</React.Fragment>
  }

  startTimeTemplate = (rowData) => {
    return <React.Fragment>{moment(rowData.discountStartDate).format('h:mm a')}</React.Fragment>
  }

  endDateTemplate = (rowData) => {
    return <React.Fragment>{moment(rowData.discountEndDate).format('Do MMMM YYYY')}</React.Fragment>
  }

  endTimeTemplate = (rowData) => {
    return <React.Fragment>{moment(rowData.discountEndDate).format('h:mm a')}</React.Fragment>
  }

  discountPercentageTemplate = (rowData) => {
    return <React.Fragment>{rowData.productDiscountPercentage}%</React.Fragment>
  }

  statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <span className="p-column-title">Status</span> */}
        <span
          className={
            rowData.isActive === "Y"
              ? "p-tag p-tag-primary"
              : "p-tag p-tag-warning"
          }
        >
          {rowData.isActive === "Y" ? "ACTIVE" : "INACTIVE"}
        </span>
      </React.Fragment>
    )
  }

  actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Toast ref={(el) => (this.toast = el)} />
        {/* <span className="p-column-title">Action</span> */}
        <Link
          to={{
            pathname: `/EditDiscount`,
            state: { rowData },
          }}
        >
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success p-mr-2"
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
      isActive: "D",
    }

    await this.props.createDiscountTypeRecord(resultData)
    window.location.reload(true)
    this.setState({
      loading: true,
    })
    this.showTrue(true)
  }

  rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Link to="/CreateDiscount">
          <div className="button-demo">
            <Button
              icon="pi pi-times"
              className="p-button-rounded p-button-danger p-button-outlined"
            />
          </div>
        </Link>
      </React.Fragment>
    )
  }

  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <div className="p-text-bold table-heading-style">
          List of Discount Names
        </div>
      </React.Fragment>
    )
  }

  renderHeader() {
    return (
      <>
        <div className="table-header">
          <span className="p-input-icon-left">
            <InputText
              type="search"
              className="form-control text-center text-field"
              onInput={(e) => this.setState({ globalFilter: e.target.value })}
              placeholder="Search by discount name"
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
        <div className="page-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="white-box">
                  <div className="datatable-doc-demo datatable-responsive-demo">
                    <div className="card">
                      <Toolbar
                        className="p-mb-4"
                        right={this.rightToolbarTemplate}
                        left={this.leftToolbarTemplate}
                      ></Toolbar>
                      <DataTable
                        header={header}
                        ref={(el) => (this.dt = el)}
                        value={this.state.discounts}
                        // header={header}
                        className="p-datatable-customers p-datatable-responsive-demo"
                        dataKey="id"
                        rowHover
                        globalFilter={this.state.globalFilter}
                        selection={this.state.selectedDiscounts}
                        onSelectionChange={(e) =>
                          this.setState({ selectedDiscounts: e.value })
                        }
                        paginator
                        rows={10}
                        emptyMessage="No Discount found"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[10, 25, 50]}
                        {...this.state}
                        discounts={this.props.discounts}
                        values={this.values}
                        loading={this.state.loading}
                      >
                        <Column
                          field="Index"
                          header="SN"
                          body={this.onIndexTemplate}
                        />
                        <Column
                          sortField="productName"
                          filterField="productName"
                          header="Product Name"
                          body={this.productNameTemplate}
                          sortable
                        />

                        <Column
                          sortField="discountType"
                          filterField="discountType"
                          header="Discount Name"
                          body={this.discountTypeTemplate}
                          sortable
                        />

                        <Column
                          sortField="startDate"
                          filterField="startDate"
                          header="Start Date"
                          body={this.startDateTemplate}
                          sortable
                        />
                        <Column
                          sortField="startTime"
                          filterField="startTime"
                          header="Start Time"
                          body={this.startTimeTemplate}
                          sortable
                        />

                        <Column
                          sortField="endDate"
                          filterField="endDate"
                          header="End Date"
                          body={this.endDateTemplate}
                          sortable
                        />
                        <Column
                          sortField="endTime"
                          filterField="endTime"
                          header="End Time"
                          body={this.endTimeTemplate}
                          sortable
                        />

                        <Column
                          sortField="discountPercentage"
                          filterField="discountPercentage"
                          header="Discount Percentage (%)"
                          body={this.discountPercentageTemplate}
                          sortable
                        />
                        <Column
                          sortField="isActive"
                          header="Status"
                          body={this.statusBodyTemplate}
                          sortable
                        />
                        <Column
                          field="action"
                          header="Action"
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
  discounts: state.discountTypeReducer.discounts,
  discounts: state.discountReducer.discounts,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getDiscountRecord: () =>
      dispatch(discountAction.getDiscountRecord()),
    getDiscountTypeByIdRecord: (index) =>
      dispatch(discountTypeAction.getDiscountTypeByIdRecord(index)),
    deleteDiscountTypeRecord: (index) =>
      dispatch(discountTypeAction.deleteDiscountTypeRecord(index)),
    createDiscountTypeRecord: (data) =>
      dispatch(discountTypeAction.createDiscountTypeRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(discountListContainer)
