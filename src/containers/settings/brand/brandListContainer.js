import authenticationService from '../../../store/services/authenticationService'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as brandAction from '../../../store/actions/brandAction'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { Toolbar } from 'primereact/toolbar'
import baseUrl from '../../../utils/baseUrl'
import { Link } from 'react-router-dom'
import LoadingCard from '../../../components/shared/LoadingCard'
import Message from '../../../components/shared/Message'

class brandListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      brands: null,
      selectedBrands: null,
      globalFilter: null,
      loading: false,
      position: 'center',
      expandedRows: null,
    }
    this.brandImageUrlTemplate = this.brandImageUrlTemplate.bind(this)
    this.isActiveTemplate = this.isActiveTemplate.bind(this)
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
    await this.props.getBrandRecord()
    this.setState({
      brands: this.props?.brands.sort((a, b) => (a.timeM > b.timeM ? 1 : -1)),
    })
  }

  brandDetailsBodyTemplate(rowData) {
    return (
      <React.Fragment>{rowData?.brandDetails.substring(0, 50)}</React.Fragment>
    )
  }

  brandImageUrlTemplate(rowData) {
    return (
      <React.Fragment>
        <img
          src={baseUrl.concat(rowData?.brandLogo)}
          className='thumb-md product-image'
          alt='img'
          style={{ verticalAlign: 'middle', objectFit: 'contain' }}
        />
      </React.Fragment>
    )
  }

  isActiveTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className="p-column-title">Status</span> */}
        <span
          className={
            rowData?.isActive === 'Y'
              ? 'p-tag p-tag-primary'
              : 'p-tag p-tag-warning'
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
            pathname: `/EditBrand`,
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

  renderHeader() {
    return (
      <>
        <div className='table-header'>
          <span className='p-input-icon-left'>
            <InputText
              type='search'
              className='form-control text-center text-field'
              onInput={(e) => this.setState({ globalFilter: e.target?.value })}
              placeholder='Search by Brand name'
            />
          </span>
        </div>
      </>
    )
  }

  rowExpansionTemplate(data) {
    return (
      <div className='orders-subtable datatable-responsive-demo'>
        <DataTable value={data?.productCategories}>
          <Column field='name' header='Category Name' />
        </DataTable>
      </div>
    )
  }

  render() {
    const header = this.renderHeader()
    const leftContents = (
      <React.Fragment>
        <div className='p-text-bold table-heading-style'>List of Brands</div>
      </React.Fragment>
    )

    const rightContents = (
      <React.Fragment>
        <Link to='/CreateBrand'>
          <div className='button-demo'>
            <Button
              icon='pi pi-times'
              className='p-button-rounded p-button-danger p-button-outlined'
            />
          </div>
        </Link>
      </React.Fragment>
    )
    return (
      <>
        <div className='page-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='white-box'>
                  <div className='datatable-rowexpansion-demo datatable-responsive-demo'>
                    <div className='card'>
                      <Toolbar left={leftContents} right={rightContents} />
                      <div className='card'>
                        {this.props?.loading ? (
                          <LoadingCard count={1} />
                        ) : this.props?.error ? (
                          <Message variant='danger'>
                            {this.props?.error}
                          </Message>
                        ) : (
                          <DataTable
                            header={header}
                            value={this.state?.brands}
                            className='p-datatable-customers p-datatable-responsive-demo'
                            dataKey='brandName'
                            rowHover
                            globalFilter={this.state?.globalFilter}
                            selection={this.state?.selectedBrands}
                            onSelectionChange={(e) =>
                              this.setState({ selectedBrands: e.value })
                            }
                            paginator
                            rows={10}
                            emptyMessage='No brand found'
                            currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                            paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                            rowsPerPageOptions={[10, 25, 50]}
                            {...this.state}
                            brands={this.props?.brands}
                            loading={this.state?.loading}
                            expandedRows={this.state?.expandedRows}
                            onRowToggle={(e) =>
                              this.setState({ expandedRows: e.data })
                            }
                            rowExpansionTemplate={this.rowExpansionTemplate}
                          >
                            <Column expander style={{ width: '3em' }} />
                            <Column
                              field='brandName'
                              header='Brand Name'
                              sortable
                            />
                            <Column
                              field='brandDetails'
                              header='Brand Details'
                              body={this.brandDetailsBodyTemplate}
                              sortable
                            />
                            <Column
                              field='brandLogo'
                              header='Brand Logo'
                              body={this.brandImageUrlTemplate}
                            />
                            <Column
                              sortField='isActive'
                              header='Status'
                              body={this.isActiveTemplate}
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

// Making brands  array available in  props
const mapStateToProps = (state) => ({
  brands: state.brandReducer?.brands,
  loading: state.brandReducer?.loading,
  error: state.brandReducer?.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getBrandRecord: () => dispatch(brandAction.getBrandRecord()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(brandListContainer)
