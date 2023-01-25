import React, { Component } from "react"
import { ToastContainer } from "react-toastify"
import { connect } from "react-redux"
import * as discountTypeAction from "../../../store/actions/discountTypeAction"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Button } from "primereact/button"
import { Toast } from "primereact/toast"
import { Toolbar } from "primereact/toolbar"
import { InputText } from "primereact/inputtext"
import { Link } from "react-router-dom"
import authenticationService from "../../../store/services/authenticationService"
import LoadingCard from '../../../components/shared/LoadingCard'
import Message from '../../../components/shared/Message'

class discountTypeListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      discountTypes: null,
      selectedDiscountTypes: null,
      globalFilter: null,
      loading: false,
      position: "center",
    }
    //this.discountTypeList = new DiscountTypeList()
    this.nameBodyTemplate = this.nameBodyTemplate.bind(this)
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this)
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    this.onIndexTemplate = this.onIndexTemplate.bind(this)
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this)
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

    await this.props.getDiscountTypeRecord()
    this.setState({
      discountTypes: this.props.data.sort((a, b) =>
        a.timeM > b.timeM ? 1 : -1
      ),
    })
 
  }

  nameBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className="p-column-title">Discount Type Name</span> */}
        {rowData.productDiscountTypeName}
      </React.Fragment>
    )
  }

  statusBodyTemplate(rowData) {
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

  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Toast ref={(el) => (this.toast = el)} />
        {/* <span className="p-column-title">Action</span> */}
        <Link
          to={{
            pathname: `/EditDiscountType`,
            state: { rowData },
          }}
        >
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success p-mr-2"
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
        <Link to="/CreateDiscountType">
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
          List of Discount Types
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
              placeholder="Search by Discount Type name"
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
                      {this.props.loading ? (
                        <LoadingCard count={1} />
                      ) : this.props.error ? (
                        <Message variant='danger'>{this.props.error}</Message>
                      ) : (
                      <DataTable
                        header={header}
                        ref={(el) => (this.dt = el)}
                        value={this.state.discountTypes}
                        className="p-datatable-customers p-datatable-responsive-demo"
                        dataKey="id"
                        rowHover
                        globalFilter={this.state.globalFilter}
                        paginator
                        rows={10}
                        emptyMessage="No Discount Type found"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[10, 25, 50]}
                        {...this.state}
                        values={this.values}
                        loading={this.state.loading}
                      >
                        <Column
                          field="Index"
                          header="SN"
                          body={this.onIndexTemplate}
                        />
                        <Column
                          sortField="productDiscountTypeName"
                          filterField="productDiscountTypeName"
                          header="Discount Type Name"
                          body={this.nameBodyTemplate}
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
                          header="Edit"
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
  data: state.discountTypeReducer.discountTypes,
  loading: state.discountTypeReducer.loading,
  error: state.discountTypeReducer.error
})

const mapDispatchToProps = (dispatch) => {
  return {
    getDiscountTypeRecord: () =>
      dispatch(discountTypeAction.getDiscountTypeRecord())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(discountTypeListContainer)
