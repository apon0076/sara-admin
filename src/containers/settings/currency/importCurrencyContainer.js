import 'primeicons/primeicons.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import React, { Component } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { FileUpload } from 'primereact/fileupload'
import { Toast } from 'primereact/toast'
import authenticationService from '../../../store/services/authenticationService'
import * as currencyAction from '../../../store/actions/currencyAction'
import * as loaderAction from '../../../store/actions/loaderAction'
import { connect } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import * as Icon from 'react-feather'
import FullPageLoader from '../../../components/Loader/FullPageLoader'

class ImportCurrencyContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      selectedProducts: [],
      importedData: [],
      selectedImportedData: [],
      importedCols: [{ field: '' }],
      isImported: false,
    }

    this.importCSV = this.importCSV.bind(this)
    this.importExcel = this.importExcel.bind(this)
    this.onImportSelectionChange = this.onImportSelectionChange.bind(this)
    this.clear = this.clear.bind(this)
    this.submit = this.submit.bind(this)
    this.onSelectionChange = this.onSelectionChange.bind(this)

    this.onUpload = this.onUpload.bind(this)
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
  }

  onUpload() {
    this.toast.show({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded',
    })
  }

  importCSV(e) {
    const file = e.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      const csv = e.target.result
      const data = csv.split('\n')

      // Prepare DataTable
      const cols = data[0].replace(/['"]+/g, '').split(',')
      data.shift()

      let importedCols = cols.map((col) => ({
        field: col,
        header: this.toCapitalize(col.replace(/['"]+/g, '')),
      }))
      let importedData = data.map((d) => {
        d = d.split(',')
        return cols.reduce((obj, c, i) => {
          obj[c] = d[i].replace(/['"]+/g, '')
          return obj
        }, {})
      })

      this.setState({
        importedCols,
        importedData,
        isImported: true,
      })
    }

    reader.readAsText(file, 'UTF-8')
  }

  importExcel(e) {
    const file = e.files[0]

    import('xlsx').then((xlsx) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const wb = xlsx.read(e.target.result, { type: 'array' })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const data = xlsx.utils.sheet_to_json(ws, { header: 1 })

        // Prepare DataTable
        const cols = data[0]
        data.shift()

        let importedCols = cols.map((col) => ({
          field: col,
          header: this.toCapitalize(col),
        }))
        let importedData = data.map((d) => {
          return cols.reduce((obj, c, i) => {
            obj[c] = d[i]
            return obj
          }, {})
        })

        this.setState({
          importedCols,
          importedData,
          isImported: true,
        })
      }
      reader.readAsArrayBuffer(file)
    })
  }

  saveAsExcelFile(buffer, fileName) {
    import('file-saver').then((FileSaver) => {
      let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
      let EXCEL_EXTENSION = '.xlsx'
      const data = new Blob([buffer], {
        type: EXCEL_TYPE,
      })
      FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
      )
    })
  }

  toCapitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  clear() {
    this.setState({
      importedData: [],
      selectedImportedData: [],
      importedCols: [{ field: '' }],
      isImported: true,
    })
  }

  submit() {
    this.importCurrency()
  }

  onImportSelectionChange(e) {
    this.setState({ selectedImportedData: e.value }, () => {
      const detail = this.state.selectedImportedData
        .map((d) => Object.values(d)[0])
        .join(', ')
      this.toast.show({
        severity: 'info',
        summary: 'Data Selected',
        detail,
        life: 3000,
      })
    })
  }

  onSelectionChange(e) {
    this.setState({ selectedProducts: e.value })
  }

  importCurrency = async (e) => {
    await this.props.showLoader()
    const dataForImport = {
      currencyRateCharts: this.state.importedData,
    }
    const result = await this.props.createCurrencyRateRecord(dataForImport)
    if (result.type === 'CREATE_CURRENCY_RATE_SUCCESS') {
      toast.success('Currency Rate Added Successfully')
      setTimeout(async () => {
        this.props.history.push('CurrencyRateList')
        await this.props.hideLoader()
      }, 2500)
    } else {
      toast.error('Something went wrong!')
      setTimeout(async () => {
        this.props.history.push('ImportCurrency')
        await this.props.hideLoader()
      }, 2500)
    }
  }

  render() {
    return (
      <>
        <ToastContainer autoClose={1500} />
        <div className='page-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='panel panel-success'>
                  <div className='panel-heading'>
                    {' '}
                    Import Currency Rate{' '}
                    <span style={{ float: 'right' }}>
                      <Link to='/CurrencyRateList'>
                        <Icon.List className='text-light' />
                      </Link>
                    </span>
                  </div>
                  <div
                    className='panel-wrapper collapse in'
                    aria-expanded='true'
                  >
                    <div className='panel-body'>
                      <Toast ref={(el) => (this.toast = el)} />

                      <div className='p-d-flex p-ai-center p-py-2'>
                        <FileUpload
                          name='excel'
                          accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                          customUpload={true}
                          uploadHandler={this.importExcel}
                          onUpload={this.onUpload}
                          mode='basic'
                          auto
                          chooseOptions={{
                            label: 'Select Excel File',
                            icon: 'pi pi-file',
                          }}
                          className='p-mr-2 info'
                        />
                        {/* <FileUpload
                          name='csv'
                          accept='.csv'
                          customUpload={true}
                          uploadHandler={this.importCSV}
                          onUpload={this.onUpload}
                          mode='basic'
                          auto
                          chooseOptions={{
                            label: 'Select CSV File',
                            icon: 'pi pi-file',
                            className: 'p-button-success',
                          }}
                          className='p-mr-2'
                        /> */}

                        {/* <FileUpload
                          chooseOptions={{ label: 'CSV', icon: 'pi pi-file' }}
                          mode='basic'
                          name='demo[]'
                          auto
                          url='https://primefaces.org/primereact/showcase/upload.php'
                          accept='.csv'
                          className='p-mr-2'
                          onUpload={this.importCSV}
                        />
                         */}
                        {this.state.isImported && (
                          <Button
                            type='button'
                            label='Clear'
                            icon='pi pi-times'
                            onClick={this.clear}
                            className='p-button-danger p-ml-auto'
                          />
                        )}
                      </div>
                      {this.state.isImported && (
                        <>
                          <DataTable
                            value={this.state.importedData}
                            emptyMessage='No data'
                            paginator
                            rows={10}
                            alwaysShowPaginator={false}
                            responsiveLayout='scroll'
                            // selectionMode="multiple"
                            // selection={this.state.selectedImportedData}
                            // onSelectionChange={this.onImportSelectionChange}
                            className='p-mt-5'
                          >
                            {this.state.importedCols.map((col, index) => (
                              <Column
                                key={index}
                                field={col.field}
                                header={col.header}
                              />
                            ))}
                          </DataTable>

                          <Button
                            type='button'
                            label='Submit'
                            icon='pi pi-check'
                            onClick={this.submit}
                            className='p-button-error p-ml-auto p-mt-5'
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <FullPageLoader />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  // data: state.currencyReducer.data
})

const mapDispatchToProps = (dispatch) => {
  return {
    createCurrencyRateRecord: (data) =>
      dispatch(currencyAction.createCurrencyRateRecord(data)),
    showLoader: (data) => dispatch(loaderAction.showLoader(data)),
    hideLoader: (data) => dispatch(loaderAction.hideLoader(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportCurrencyContainer)
