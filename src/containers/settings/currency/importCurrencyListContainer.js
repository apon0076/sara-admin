import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'
import * as currencyAction from '../../../store/actions/currencyAction'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { InputText } from 'primereact/inputtext'
import { Link } from 'react-router-dom'
import authenticationService from '../../../store/services/authenticationService'
import LoadingCard from '../../../components/shared/LoadingCard'
import Message from '../../../components/shared/Message'
import XLSX from 'xlsx'

class importCurrencyListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currencyRate: null,
      selectedCurrancyRate: null,
      globalFilter: null,
      loading: false,
      position: 'center',
    }
    this.baseCountryBodyTemplate = this.baseCountryBodyTemplate.bind(this)
    this.baseCurrencyBodyTemplate = this.baseCurrencyBodyTemplate.bind(this)
    this.baseCurrencySymbolBodyTemplate =
      this.baseCurrencySymbolBodyTemplate.bind(this)
    this.baseCurrencyRateBodyTemplate =
      this.baseCurrencyRateBodyTemplate.bind(this)
    this.baseCurrencyBodyTemplate = this.baseCurrencyBodyTemplate.bind(this)
    this.bdtRateBodyTemplate = this.bdtRateBodyTemplate.bind(this)
    this.usdRateBodyTemplate = this.usdRateBodyTemplate.bind(this)
    this.eurRateBodyTemplate = this.eurRateBodyTemplate.bind(this)
    this.gbpRateBodyTemplate = this.gbpRateBodyTemplate.bind(this)
    this.cynRateBodyTemplate = this.cynRateBodyTemplate.bind(this)
    this.inrRateBodyTemplate = this.inrRateBodyTemplate.bind(this)
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

    await this.props.getCurrencyRateRecord()
    this.setState({
      currencyRate: this.props.data.sort((a, b) =>
        a.timeM > b.timeM ? 1 : -1
      ),
    })
  }

  baseCountryBodyTemplate(rowData) {
    return <React.Fragment>{rowData.baseCountry}</React.Fragment>
  }
  baseCurrencyBodyTemplate(rowData) {
    return <React.Fragment>{rowData.baseCurrency}</React.Fragment>
  }
  baseCurrencySymbolBodyTemplate(rowData) {
    return <React.Fragment>{rowData.baseCurrencySymbol}</React.Fragment>
  }
  baseCurrencyRateBodyTemplate(rowData) {
    return <React.Fragment>{rowData.baseCurrencyRate}</React.Fragment>
  }
  bdtRateBodyTemplate(rowData) {
    return <React.Fragment>{rowData.bdtRate}</React.Fragment>
  }
  usdRateBodyTemplate(rowData) {
    return <React.Fragment>{rowData.usdRate}</React.Fragment>
  }
  eurRateBodyTemplate(rowData) {
    return <React.Fragment>{rowData.eurRate}</React.Fragment>
  }
  gbpRateBodyTemplate(rowData) {
    return <React.Fragment>{rowData.gbpRate}</React.Fragment>
  }
  cynRateBodyTemplate(rowData) {
    return <React.Fragment>{rowData.cynRate}</React.Fragment>
  }
  inrRateBodyTemplate(rowData) {
    return <React.Fragment>{rowData.inrRate}</React.Fragment>
  }
  onIndexTemplate(rowData, props) {
    return props.rowIndex + 1
  }

  rightToolbarTemplate() {
    return (
      <React.Fragment>
        <Link to='/ImportCurrency'>
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
          List of Base Currency
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

          <button className='btn btn-info' onClick={this.downloadExcel}>
            Download
          </button>
        </div>
      </>
    )
  }

  downloadExcel() {
    // Acquire Data (reference to the HTML table)
    var table_elt = document.getElementById('my-table-id')

    // Extract Data (create a workbook object from the table)
    var workbook = XLSX.utils.table_to_book(table_elt)

    // Process Data (add a new row)
    var ws = workbook.Sheets['Sheet1']
    XLSX.utils.sheet_add_aoa(ws, [], {
      origin: -1,
    })

    // Package and Release Data (`writeFile` tries to write and save an XLSB file)
    XLSX.writeFile(workbook, 'Base_Currency.xlsx')
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
                      {this.props.loading ? (
                        <LoadingCard count={1} />
                      ) : this.props.error ? (
                        <Message variant='danger'>{this.props.error}</Message>
                      ) : (
                        <DataTable
                          id='my-table-id'
                          header={header}
                          ref={(el) => (this.dt = el)}
                          value={this.state.currencyRate}
                          className='p-datatable-customers p-datatable-responsive-demo'
                          dataKey='id'
                          rowHover
                          globalFilter={this.state.globalFilter}
                          selection={this.state.selectedCurrancyRate}
                          onSelectionChange={(e) =>
                            this.setState({ selectedCurrancyRate: e.value })
                          }
                          paginator
                          rows={10}
                          emptyMessage='No Base Currency found'
                          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                          rowsPerPageOptions={[10, 25, 50]}
                          {...this.state}
                          currencyRate={this.props.currencyRate}
                          values={this.values}
                          loading={this.state.loading}
                        >
                          <Column
                            field='Index'
                            header='SN'
                            body={this.onIndexTemplate}
                          />
                          <Column
                            sortField='baseCountry'
                            filterField='baseCountry'
                            header='Country Name'
                            body={this.baseCountryBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='baseCurrency'
                            filterField='baseCurrency'
                            header='Currency Name'
                            body={this.baseCurrencyBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='baseCurrencySymbol'
                            filterField='baseCurrencySymbol'
                            header='Currency Symbol'
                            body={this.baseCurrencySymbolBodyTemplate}
                            sortable
                          />

                          <Column
                            sortField='baseCurrencyRate'
                            header='Currency Rate'
                            body={this.baseCurrencyRateBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='bdtRate'
                            header='BDT Rate'
                            body={this.bdtRateBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='usdRate'
                            header='USD Rate'
                            body={this.usdRateBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='eurRate'
                            header='Euro Rate'
                            body={this.eurRateBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='gbpRate'
                            header='GBP Rate'
                            body={this.gbpRateBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='cynRate'
                            header='CYN Rate'
                            body={this.cynRateBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='inrRate'
                            header='INR Rate'
                            body={this.inrRateBodyTemplate}
                            sortable
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
  data: state.currencyReducer.currencyRate,
  loading: state.currencyReducer.loading,
  error: state.currencyReducer.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrencyRateRecord: () =>
      dispatch(currencyAction.getCurrencyRateRecord()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(importCurrencyListContainer)
