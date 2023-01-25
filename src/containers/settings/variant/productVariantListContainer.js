import '../../../../node_modules/primeicons/primeicons.css'
import '../../../../node_modules/primereact/resources/themes/saga-blue/theme.css'
import '../../../../node_modules/primereact/resources/primereact.css'
import '../../../../node_modules/primeflex/primeflex.css'
import authenticationService from '../../../store/services/authenticationService'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as productVariantAction from '../../../store/actions/productVariantAction'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toolbar } from 'primereact/toolbar'

import { Link } from 'react-router-dom'
import LoadingCard from '../../../components/shared/LoadingCard'
import Message from '../../../components/shared/Message'

////////////////END/////////////////

class productVariantListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      variants: null,
      selectedVariants: null,
      globalFilter: null,
      loading: false,
      position: 'center',
      variants: null,
    }

    //body cells
    this.variantNameTemplate = this.variantNameTemplate.bind(this)
    this.variantDescriptionTemplate = this.variantDescriptionTemplate.bind(this)
    this.variantSetupTempleteIdTemplate =
      this.variantSetupTempleteIdTemplate.bind(this)
    this.variantDisplayTempleteIdTemplate =
      this.variantDisplayTempleteIdTemplate.bind(this)
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this)
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    this.onIndexTemplate = this.onIndexTemplate.bind(this)
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

    await this.props.getProductVariantRecord()
    this.setState({ variants: this.props.variants.reverse() })
  }

  variantNameTemplate(rowData) {
    return <React.Fragment>{rowData?.variantName}</React.Fragment>
  }

  variantDescriptionTemplate(rowData) {
    return <React.Fragment>{rowData?.variantDescription}</React.Fragment>
  }

  variantSetupTempleteIdTemplate(rowData) {
    return <React.Fragment>{rowData?.variantSetupTempleteId}</React.Fragment>
  }

  variantDisplayTempleteIdTemplate(rowData) {
    return <React.Fragment>{rowData?.variantDisplayTempleteId}</React.Fragment>
  }

  imgChgVariantBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <span
          className={
            rowData?.imgChgVariant === 'Y' ? 'text-success' : 'text-warning'
          }
        >
          {rowData?.imgChgVariant === 'Y' ? 'Yes' : 'No'}
        </span>
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
        {/* <Toast ref={(el) => (this.toast = el)} /> */}
        <span className='p-column-title'>Action</span>
        <Link
          to={{
            pathname: `/EditProductVariant`,
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

  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <div className='p-text-bold table-heading-style'>
          Product Variant List
        </div>
      </React.Fragment>
    )
  }

  rightToolbarTemplate() {
    return (
      <React.Fragment>
        <Link to='/CreateProductVariant'>
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
      <div className='table-header'>
        <span className='p-input-icon-left'>
          <InputText
            type='search'
            onInput={(e) => this.setState({ globalFilter: e.target.value })}
            placeholder='Search by Variant Name'
            className='form-control text-center text-field'
          />
        </span>
      </div>
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
                        <Message variant='danger'>{this.props?.error}</Message>
                      ) : (
                        <DataTable
                          ref={(el) => (this.dt = el)}
                          value={this.state?.variants}
                          header={header}
                          className='p-datatable-customers p-datatable-responsive-demo'
                          dataKey='id'
                          rowHover
                          globalFilter={this.state?.globalFilter}
                          selection={this.state?.selectedVariants}
                          onSelectionChange={(e) =>
                            this.setState({ selectedVariants: e.value })
                          }
                          paginator
                          rows={10}
                          emptyMessage='No product variant found'
                          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                          rowsPerPageOptions={[10, 25, 50]}
                          {...this.state}
                          productVariants={this.props?.variants}
                          values={this.values}
                          loading={this.state?.loading}
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
                            body={this.variantNameTemplate}
                            sortable
                          />
                          <Column
                            sortField='variantDescription'
                            header='Variant Description'
                            body={this.variantDescriptionTemplate}
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
      </>
    )
  }
}

// Making variants  array available in  props
const mapStateToProps = (state) => ({
  variants: state.productVariantReducer.variants,
  loading: state.productVariantReducer.loading,
  error: state.productVariantReducer.error,
  searchId: state.searchId,
  handleChange: state.handleChange,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getProductVariantRecord: () =>
      dispatch(productVariantAction.getProductVariantRecord()),

    getProductVariantByIdRecord: (index) =>
      dispatch(productVariantAction.getProductVariantByIdRecord(index)),

    createProductVariantRecord: (data) =>
      dispatch(productVariantAction.createProductVariantRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(productVariantListContainer)
