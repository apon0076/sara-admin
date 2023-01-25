import '../../../../node_modules/primeicons/primeicons.css'
import '../../../../node_modules/primereact/resources/themes/saga-blue/theme.css'
import '../../../../node_modules/primereact/resources/primereact.css'
import '../../../../node_modules/primeflex/primeflex.css'
import authenticationService from '../../../store/services/authenticationService'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as productVariantOptionValueAction from '../../../store/actions/productVariantOptionValueAction'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toolbar } from 'primereact/toolbar'
import { Link } from 'react-router-dom'
import LoadingCard from '../../../components/shared/LoadingCard'
import Message from '../../../components/shared/Message'

class productVariantOptionValueListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      variantOptionValues: null,
      selectedVariantOptionValues: null,
      globalFilter: null,
      loading: false,
      position: 'center',
    }

    //body cells
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
    await this.props.getProductVariantOptionValueRecord()
    this.setState({
      variantOptionValues: this.props?.variantOptionValues.reverse(),
    })
  }

  variantNameTemplate(rowData) {
    return <React.Fragment>{rowData?.variantName}</React.Fragment>
  }

  variantOptionNameTemplate(rowData) {
    return <React.Fragment>{rowData?.variantOptionName}</React.Fragment>
  }

  variantOptionValueTemplate(rowData) {
    return <React.Fragment>{rowData?.variantOptionValue}</React.Fragment>
  }
  displayOrderTemplate(rowData) {
    return <React.Fragment>{rowData?.displayOrder}</React.Fragment>
  }

  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Link
          to={{
            pathname: `/EditProductVariantOptionValue`,
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
          Product Variant Option Value List
        </div>
      </React.Fragment>
    )
  }

  rightToolbarTemplate() {
    return (
      <React.Fragment>
        <Link to='/CreateProductVariantOptionValue'>
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
            placeholder='Search Here'
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
                        <Message variant='danger'>{this.props.error}</Message>
                      ) : (
                        <DataTable
                          ref={(el) => (this.dt = el)}
                          value={this.state?.variantOptionValues}
                          header={header}
                          className='p-datatable-customers p-datatable-responsive-demo'
                          dataKey='variantOptionName'
                          rowHover
                          globalFilter={this.state?.globalFilter}
                          selection={this.state?.selectedVariantOptionValues}
                          onSelectionChange={(e) =>
                            this.setState({
                              selectedVariantOptionValues: e.value,
                            })
                          }
                          paginator
                          rows={10}
                          emptyMessage='No product variant option found'
                          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                          rowsPerPageOptions={[10, 25, 50]}
                          {...this.state}
                          variantOptionValues={this.props?.variantOptionValues}
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
                            sortField='variantOptionName'
                            filterField='variantOptionName'
                            header='Variant Attribute Name'
                            body={this.variantOptionNameTemplate}
                            sortable
                          />
                          <Column
                            sortField='variantOptionValue'
                            header='Variant Attribute Value'
                            body={this.variantOptionValueTemplate}
                            sortable
                          />
                          <Column
                            sortField='displayOrder'
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
      </>
    )
  }
}

// Making variants  array available in  props
const mapStateToProps = (state) => ({
  variantOptionValues:
    state.productVariantOptionValueReducer?.variantOptionValues,
  loading: state.productVariantOptionValueReducer?.loading,
  error: state.productVariantOptionValueReducer?.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getProductVariantOptionValueRecord: () =>
      dispatch(
        productVariantOptionValueAction.getProductVariantOptionValueRecord()
      ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(productVariantOptionValueListContainer)
