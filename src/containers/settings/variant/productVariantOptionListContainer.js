import '../../../../node_modules/primeicons/primeicons.css'
import '../../../../node_modules/primereact/resources/themes/saga-blue/theme.css'
import '../../../../node_modules/primereact/resources/primereact.css'
import '../../../../node_modules/primeflex/primeflex.css'
import authenticationService from '../../../store/services/authenticationService'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as productVariantOptionAction from '../../../store/actions/productVariantOptionAction'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { ToastContainer } from 'react-toastify'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { Toolbar } from 'primereact/toolbar'
import { Link } from 'react-router-dom'
import LoadingCard from '../../../components/shared/LoadingCard'
import Message from '../../../components/shared/Message'

class productVariantOptionListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productVariantOptions: null,
      selectedProductVariantOptions: null,
      globalFilter: null,
      loading: false,
      position: 'center',
    }
    this.variantNameBodyTemplate = this.variantNameBodyTemplate.bind(this)
    this.categoryNameBodyTemplate = this.categoryNameBodyTemplate.bind(this)
    this.variantOptionTextBodyTemplate =
      this.variantOptionTextBodyTemplate.bind(this)
    this.variantOptionValueTemplate = this.variantOptionValueTemplate.bind(this)
    this.variantRemarkBodyTemplate = this.variantRemarkBodyTemplate.bind(this)
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this)
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    this.onIndexTemplate = this.onIndexTemplate.bind(this)
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this)
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
    await this.props.getProductVariantOptionRecord()
    this.setState({ productVariantOptions: this.props?.data.reverse() })
  }

  variantNameBodyTemplate(rowData) {
    return <React.Fragment>{rowData?.variantName}</React.Fragment>
  }

  categoryNameBodyTemplate(rowData) {
    return <React.Fragment>{rowData?.categoryName}</React.Fragment>
  }

  variantOptionTextBodyTemplate(rowData) {
    return <React.Fragment>{rowData?.variantOptionText}</React.Fragment>
  }

  variantOptionValueTemplate(rowData) {
    return <React.Fragment>{rowData?.variantOptionValue}</React.Fragment>
  }

  variantRemarkBodyTemplate(rowData) {
    return <React.Fragment>{rowData?.variantRemark}</React.Fragment>
  }
  displayOrderTemplate(rowData) {
    return <React.Fragment>{rowData?.displayOrder}</React.Fragment>
  }

  statusBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <span
          className={
            rowData?.isCommon === 'Y'
              ? 'p-tag p-tag-primary'
              : 'p-tag p-tag-warning'
          }
        >
          {rowData?.isCommon === 'Y' ? 'YES' : 'NO'}
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
            pathname: `/EditProductVariantOption`,
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
        <Link to='/CreateProductVariantOption'>
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
          List of Product Variant Options
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
                        <Message variant='danger'>{this.props?.error}</Message>
                      ) : (
                        <DataTable
                          header={header}
                          ref={(el) => (this.dt = el)}
                          value={this.state?.productVariantOptions}
                          className='p-datatable-customers p-datatable-responsive-demo'
                          dataKey='id'
                          rowHover
                          globalFilter={this.state?.globalFilter}
                          selection={this.state?.selectedProductVariantOptions}
                          onSelectionChange={(e) =>
                            this.setState({
                              selectedProductVariantOptions: e.value,
                            })
                          }
                          paginator
                          rows={10}
                          emptyMessage='No product variant option found'
                          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                          rowsPerPageOptions={[10, 25, 50]}
                          {...this.state}
                          loading={this.state.loading}
                        >
                          <Column
                            field='Index'
                            header='SN'
                            body={this.onIndexTemplate}
                          />
                          <Column
                            sortField='variantName'
                            filterField='variantName'
                            header='Variant Name'
                            body={this.variantNameBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='categoryName'
                            filterField='categoryName'
                            header='Category Name'
                            body={this.categoryNameBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='variantOptionText'
                            filterField='variantOptionText'
                            header='Variant Option Text'
                            body={this.variantOptionTextBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='variantOptionValue'
                            filterField='variantOptionValue'
                            header='Variant Option Value'
                            body={this.variantOptionValueTemplate}
                            sortable
                          />
                          <Column
                            sortField='displayOrder'
                            filterField='displayOrder'
                            header='Display Order'
                            body={this.displayOrderTemplate}
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
  data: state.productVariantOptionReducer?.variantOptions,
  loading: state.productVariantOptionReducer?.loading,
  error: state.productVariantOptionReducer?.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getProductVariantOptionRecord: () =>
      dispatch(productVariantOptionAction.getProductVariantOptionRecord()),

    getProductVariantOptionByIdRecord: (index) =>
      dispatch(
        productVariantOptionAction.getProductVariantOptionByIdRecord(index)
      ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(productVariantOptionListContainer)
