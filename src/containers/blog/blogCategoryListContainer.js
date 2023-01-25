import React, { Component } from "react"
import { ToastContainer } from "react-toastify"
import { connect } from "react-redux"
import * as blogCategoryAction from "../../store/actions/blogCategoryAction"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Button } from "primereact/button"
import { Toast } from "primereact/toast"
import { Toolbar } from "primereact/toolbar"
import { InputText } from "primereact/inputtext"
import { Link } from "react-router-dom"
import authenticationService from "../../store/services/authenticationService"
import baseUrl from "../../utils/baseUrl"
import LoadingCard from '../../components/shared/LoadingCard'
import Message from '../../components/shared/Message'

class blogCategoryListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blogCategoryDetails: null,
      selectedBlogCategory: null,
      globalFilter: null,
      loading: false,
      position: "center",
    }
    this.nameBodyTemplate = this.nameBodyTemplate.bind(this)
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

    await this.props.getBlogCategoryRecord()
    this.setState({
      blogCategoryDetails: this.props.data.sort((a, b) =>
        a.timeM > b.timeM ? 1 : -1
      ),
    })
  }

  nameBodyTemplate(rowData) {

    return (
      <React.Fragment>
        {rowData.blogCategoryName}
      </React.Fragment>
    )
  }

  statusBodyTemplate(rowData) {
    return (
      <React.Fragment>
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
        <Link
          to={{
            pathname: `/EditBlogCategory`,
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

  deleteDiscountType = async (data) => {
    const resultData = {
      productDiscountTypeId: data.productDiscountTypeId,
      productDiscountTypeName: data.productDiscountTypeName,
      isActive: "D",
    }

    await this.props.createOrUpdateBlogCategoryRecord(resultData)
    window.location.reload(true)
    this.setState({
      loading: true,
    })
    this.showTrue(true)
  }

  rightToolbarTemplate() {
    return (
      <React.Fragment>
        <Link to="/CreateBlogCategory">
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
          List of Blog Category Name
        </div>
      </React.Fragment>
    )
  }

  promotionImageUrlTemplate = (rowData) => {
    return (
      <React.Fragment>
        <img
          src={baseUrl.concat(rowData.featureImagePath)}
          className="thumb-md product-image"
          alt="img"
          style={{ verticalAlign: "middle",objectFit: 'contain' }}
        />
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
              placeholder="Search by Blog Category name"
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
                        value={this.state.blogCategoryDetails}
                        className="p-datatable-customers p-datatable-responsive-demo"
                        dataKey="id"
                        rowHover
                        globalFilter={this.state.globalFilter}
                        selection={this.state.selectedBlogCategory}
                        onSelectionChange={(e) =>
                          this.setState({ selectedBlogCategory: e.value })
                        }
                        paginator
                        rows={10}
                        emptyMessage="No Blog category found"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[10, 25, 50]}
                        {...this.state}
                        blogCategoryDetails={this.props.blogCategoryDetails}
                        values={this.values}
                        loading={this.state.loading}
                      >
                        <Column
                          field="Index"
                          header="SN"
                          body={this.onIndexTemplate}
                        />
                        
                        <Column
                          sortField="blogCategoryName"
                          filterField="blogCategoryName"
                          header="Blog Category Name"
                          body={this.nameBodyTemplate}
                          sortable
                        />
                        <Column
                          sortField="featureImagePath"
                          header="Blog Category Image"
                          body={this.promotionImageUrlTemplate}
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
  data: state.blogCategoryReducer.blogCategoryDetails,
  loading: state.blogCategoryReducer.loading,
  error: state.blogCategoryReducer.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getBlogCategoryRecord: () =>
      dispatch(blogCategoryAction.getBlogCategoryRecord()),

      createOrUpdateBlogCategoryRecord: (data) =>
      dispatch(blogCategoryAction.createOrUpdateBlogCategoryRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(blogCategoryListContainer)
