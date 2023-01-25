import '../../../../node_modules/primeicons/primeicons.css'
import '../../../../node_modules/primereact/resources/themes/saga-blue/theme.css'
import '../../../../node_modules/primereact/resources/primereact.css'
import '../../../../node_modules/primeflex/primeflex.css'
import authenticationService from '../../../store/services/authenticationService'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as adsAction from '../../../store/actions/adsAction'
import { AdsList } from '../../../components/settings/ads/AdsList'
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

class adsListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ads: null,
      selectedAds: null,
      globalFilter: null,
      loading: false,
      position: 'center',
      expandedRows: null,
    }

    this.adService = new AdsList()
    this.adsImageUrlTemplate = this.adsImageUrlTemplate.bind(this)
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    this.imageTypeIdBodyTemplate = this.imageTypeIdBodyTemplate.bind(this)
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

    this.adService.getAdsRecord().then((data) =>
      this.setState({
        ads: data.sort((a, b) => (a.timeM > b.timeM ? 1 : -1)),
      })
    )
  }

  adsImageUrlTemplate = (rowData) => {
    return (
      <img
        src={baseUrl.concat(rowData?.adsImageUrl)}
        alt={rowData?.adsImageSeoName}
        className='product-image'
      />
    )
  }
  imageTypeIdBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>
          {rowData?.imageTypeId === 1
            ? 'Slider'
            : rowData?.imageTypeId === 2
            ? 'Large Banner'
            : rowData?.imageTypeId === 3
            ? 'Medium Banner'
            : rowData?.imageTypeId === 4
            ? 'Small Banner'
            : rowData?.imageTypeId === 5
            ? 'Notice'
            : rowData?.imageTypeId === 6
            ? 'Pop Up'
            : rowData?.imageTypeId === 7
            ? 'Desktop Banner'
            : rowData?.imageTypeId === 8
            ? 'Mobile Banner'
            : ''}
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
            pathname: `/EditAds`,
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

  rowExpansionTemplate(data) {
    return (
      <div className='orders-subtable datatable-responsive-demo'>
        <DataTable value={data.adsImages}>
          <Column field='adsImageId' header='SN'></Column>
          <Column field='adsImageSeoName' header='SEO Name'></Column>
          <Column field='adsLink' header='Link'></Column>
          <Column
            field='adsImageUrl'
            header='Ads Image'
            body={this.adsImageUrlTemplate}
          />
          <Column field='isActive' header='Status' sortable></Column>
        </DataTable>
      </div>
    )
  }

  render() {
    const header = this.renderHeader()
    const leftContents = (
      <React.Fragment>
        <div className='p-text-bold table-heading-style'>List of Ads & Banners</div>
      </React.Fragment>
    )

    const rightContents = (
      <React.Fragment>
        <Link to='/CreateAds'>
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
                        {this.props.loading ? (
                          <LoadingCard count={1} />
                        ) : this.props.error ? (
                          <Message variant='danger'>{this.props.error}</Message>
                        ) : (
                          <DataTable
                            header={header}
                            value={this.state.ads}
                            className='p-datatable-customers p-datatable-responsive-demo'
                            dataKey='adsName'
                            rowHover
                            globalFilter={this.state.globalFilter}
                            selection={this.state.selectedAds}
                            onSelectionChange={(e) =>
                              this.setState({ selectedAds: e.value })
                            }
                            paginator
                            rows={10}
                            emptyMessage='No ads found'
                            currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                            paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                            rowsPerPageOptions={[10, 25, 50]}
                            {...this.state}
                            ads={this.props?.ads}
                            loading={this.state?.loading}
                            expandedRows={this.state?.expandedRows}
                            onRowToggle={(e) =>
                              this.setState({ expandedRows: e.data })
                            }
                            rowExpansionTemplate={this.rowExpansionTemplate}
                          >
                            <Column style={{ width: '3em' }} />
                            <Column
                              field='adsName'
                              header='Content Name'
                              sortable
                            />
                            <Column
                              field='imageTypeId'
                              header='Image Type'
                              body={this.imageTypeIdBodyTemplate}
                              sortable
                            />
                            <Column
                              field='adsDetails'
                              header='Content Details'
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

// Making ads  array available in  props
const mapStateToProps = (state) => ({
  ads: state.adsReducer.ads,
  loading: state.adsReducer.loading,
  error: state.adsReducer.error,
  searchId: state.searchId,
  handleChange: state.handleChange,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAdsRecord: () => dispatch(adsAction.getAdsRecord()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(adsListContainer)
