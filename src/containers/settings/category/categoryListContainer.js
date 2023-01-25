import authenticationService from '../../../store/services/authenticationService'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as categoryAction from '../../../store/actions/categoryAction'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { Toolbar } from 'primereact/toolbar'
import baseUrl from '../../../utils/baseUrl'
import { Link } from 'react-router-dom'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LoadingCard from '../../../components/shared/LoadingCard'
import Message from '../../../components/shared/Message'
////////////////END/////////////////

class categoryListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customers: null,
      categories: null,
      selectedCustomers: null,
      globalFilter: null,
      loading: false,
      categoryLoading: false,
      position: 'center',
    }

    //body cells
    this.nameBodyTemplate = this.nameBodyTemplate.bind(this)
    this.displayOrderBodyTemplate = this.displayOrderBodyTemplate.bind(this)
    this.breadcrumbCategoryBodyTemplate =
      this.breadcrumbCategoryBodyTemplate.bind(this)
    this.imageBodyTemplate = this.imageBodyTemplate.bind(this)
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    this.onIndexTemplate = this.onIndexTemplate.bind(this)
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this)
    this.showSuccess = this.showSuccess.bind(this)
    this.showWarn = this.showWarn.bind(this)
    this.showTrue = this.showTrue.bind(this)
    this.showFalse = this.showFalse.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
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

    await this.props.getCategoryRecord()
    this.setState({
      categories: this.props.categories.sort((a, b) =>
        a.timeM > b.timeM ? 1 : -1
      ),
    })
  }

  showSuccess() {
    this.toast.show({
      severity: 'success',
      summary: 'Category Updated',
      detail: 'Message Content',
      life: 3000,
    })
  }

  showWarn() {
    this.toast.show({
      severity: 'warn',
      summary: 'Category Deleted',
      detail: 'Message Content',
      life: 3000,
    })
  }

  showTrue() {
    this.toast.show({
      severity: 'warn',
      summary: 'Success',
      detail: 'Category Deleted',
      life: 6000,
    })
  }

  showFalse() {
    this.toast.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Category Inserted',
      life: 6000,
    })
  }

  deleteCategory = async (category) => {
    const data = {
      categoryId: category.categoryId,
      categoryName: category.categoryName,
      metaKeywords: category.metaKeywords,
      metaTitle: category.metaTitle,
      description: category.description,
      metaDescription: category.metaDescription,
      parentCategoryId: category.parentCategoryId,
      productImagePath: category.productImagePath,
      pageSize: 0,
      showOnHomepage: category.showOnHomepage,
      includeInTopMenu: category.includeInTopMenu,
      isDeleted: 'Y',
      displayOrder: 0,
      isActive: category.isActive,
      isProduct: category.isProduct,
    }

    await this.props.createCategoryRecord(data)
    window.location.reload(true)
    this.setState({
      loading: true,
    })
    this.showTrue(true)
  }

  onClick(name, position) {
    let state = {
      [`${name}`]: true,
    }

    if (position) {
      state = {
        ...state,
        position,
      }
    }
    this.setState(state)
  }

  nameBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {rowData?.categoryName}
      </React.Fragment>
    )
  }

  displayOrderBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {rowData?.displayOrder}
      </React.Fragment>
    )
  }

  breadcrumbCategoryBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {rowData?.breadcrumbCategory}
      </React.Fragment>
    )
  }

  imageBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <img
          src={baseUrl.concat(rowData?.productImagePath)}
          className='thumb-md product-image'
          alt='img'
          style={{ verticalAlign: 'middle', objectFit: 'contain' }}
        />
      </React.Fragment>
    )
  }

  statusBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <span
          className={
            rowData?.isActive === 'Y' ? 'text-success' : 'text-warning'
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
        <Toast ref={(el) => (this.toast = el)} />
        <Link
          to={{
            pathname: `/EditCategory`,
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

  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <div className='p-text-bold table-heading-style'>Category List</div>
      </React.Fragment>
    )
  }

  rightToolbarTemplate() {
    return (
      <React.Fragment>
        <Link to='/CreateCategory'>
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

  renderHeader() {
    return (
      <>
        <div className='table-header'>
          <span className='p-input-icon-left'>
            <InputText
              className='form-control text-center text-field'
              type='search'
              onInput={(e) => this.setState({ globalFilter: e.target.value })}
              placeholder='Search by category name'
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
                        left={this.leftToolbarTemplate}
                        right={this.rightToolbarTemplate}
                      ></Toolbar>
                      {this.props?.loading ? (
                        <LoadingCard count={1} />
                      ) : this.props?.error ? (
                        <Message variant='danger'>{this.props.error}</Message>
                      ) : (
                        <DataTable
                          ref={(el) => (this.dt = el)}
                          value={this.state?.categories}
                          header={header}
                          className='p-datatable-customers p-datatable-responsive-demo'
                          dataKey='id'
                          rowHover
                          globalFilter={this.state?.globalFilter}
                          selection={this.state?.selectedCustomers}
                          onSelectionChange={(e) =>
                            this.setState({ selectedCustomers: e.value })
                          }
                          paginator
                          rows={10}
                          emptyMessage='No category found'
                          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                          rowsPerPageOptions={[10, 25, 50]}
                          {...this.state}
                          categories={this.props?.categories}
                          loading={this.state?.loading}
                        >
                          <Column
                            field='Index'
                            header='SN'
                            body={this.onIndexTemplate}
                          />
                          <Column
                            sortField='categoryName'
                            filterField='categoryName'
                            header='Category Name'
                            body={this.nameBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='parentCategoryId'
                            header='Breadcrumb Category'
                            body={this.breadcrumbCategoryBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='productImagePath'
                            header='Category Image'
                            body={this.imageBodyTemplate}
                          />
                          <Column
                            sortField='isActive'
                            header='Status'
                            body={this.statusBodyTemplate}
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
      </>
    )
  }
}

// Making categories  array available in  props
const mapStateToProps = (state) => ({
  categories: state.categoryReducer?.categories,
  searchId: state.searchId,
  handleChange: state.handleChange,
  loading: state.categoryReducer?.loading,
  error: state.categoryReducer?.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryRecord: () => dispatch(categoryAction.getCategoryRecord()),

    getCategoryByIdRecord: (index) =>
      dispatch(categoryAction.getCategoryByIdRecord(index)),

    createCategoryRecord: (data) =>
      dispatch(categoryAction.createCategoryRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(categoryListContainer)
