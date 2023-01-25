import React, { Component } from 'react'
import { toast } from 'react-toastify'
import authenticationService from '../../store/services/authenticationService'
import { connect } from 'react-redux'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import baseUrl from '../../utils/baseUrl'
import { Link } from 'react-router-dom'
import * as authAction from '../../store/actions/authAction'
import { InputText } from 'primereact/inputtext'
import LoadingCard from '../../components/shared/LoadingCard'
import Message from '../../components/shared/Message'

class adminListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customers: null,
      selectedCustomers: null,
      globalFilter: null,
      loading: false,
      position: 'center',
    }

    //this.handleChange = this.handleChange.bind(this);
    this.deleteAdmin = this.deleteAdmin.bind(this)
    this.showWarning = this.showWarning.bind(this)
    this.goBack = this.goBack.bind(this)
    //
    this.nameBodyTemplate = this.nameBodyTemplate.bind(this)
    this.contactBodyTemplate = this.contactBodyTemplate.bind(this)
    this.imageBodyTemplate = this.imageBodyTemplate.bind(this)
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    this.onIndexTemplate = this.onIndexTemplate.bind(this)
    this.viewBodyTemplate = this.viewBodyTemplate.bind(this)
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

    await this.props.getAdminRecord()
    this.setState({
      customers: this.props.data.sort((a, b) => (a.timeM > b.timeM ? 1 : -1)),
    })
  }

  showWarning = (message) => {
    toast.error(message)
    setTimeout(() => {}, 3500)
  }

  keyPressed = (e) => {
    if (e.key === 'Enter') {
      this.saveRole(e)
    }
  }

  goBack = () => {
    setTimeout(() => {
      this.props.history.push('/Home')
    }, 500)
  }

  nameBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Admin Name</span> */}
        {rowData?.adminName}
      </React.Fragment>
    )
  }

  contactBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Contact No</span> */}
        {rowData?.adminContactNo}
      </React.Fragment>
    )
  }

  emailBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>E-mail</span> */}
        {rowData?.adminEmail}
      </React.Fragment>
    )
  }

  imageBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Admin's Image</span> */}
        <img
          src={baseUrl.concat(rowData?.adminImageUrl)}
          className='thumb-md img-circle'
          alt='img'
          style={{ verticalAlign: 'middle', objectFit: 'contain' }}
        />
      </React.Fragment>
    )
  }

  statusBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Status</span> */}
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
        {/* <span className='p-column-title'>Action</span> */}
        <Link
          to={{
            // pathname: `/EditAdmin/${rowData.adminId}/${rowData.adminName}`,
            pathname: `/EditAdmin`,
            state: { rowData },
          }}
        >
          <Button
            label='Update'
            icon='pi pi-check'
            className='p-button-help p-mr-2'
          />
        </Link>
        {/* <Button
          label="Delete"
          icon="pi pi-eye-slash"
          className="p-button-warning"
          //onClick={() => this.deleteAdmin(rowData)}
        /> */}
      </React.Fragment>
    )
  }

  onIndexTemplate(rowData, props) {
    return props.rowIndex + 1
  }

  viewBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Contact No</span> */}
        {rowData?.designation}
      </React.Fragment>
    )
  }

  rightToolbarTemplate() {
    return (
      <React.Fragment>
        <Link
          className='button-demo'
          to='/addNewAdmin'
          // onClick={() => this.props.history.goBack()}
        >
          <Button
            icon='pi pi-times'
            className='p-button-rounded p-button-outlined'
          />
        </Link>
      </React.Fragment>
    )
  }

  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <div className='p-text-bold table-heading-style'>Admin List</div>
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
              placeholder='Search by Name, Contact or Email'
            />
          </span>
        </div>
      </>
    )
  }
  deleteAdmin = async (e) => {
    //e.preventDefault();
    ////debugger;

    const data = {
      roleId: 1,
      adminId: e?.adminId,
      adminName: e?.adminName,
      adminEmail: e?.adminEmail,
      genderId: e?.genderId * 1,
      dateOfBirth: e?.dateOfBirth,
      adminImageUrl: e?.adminImageUrl,
      adminContactNo: e?.adminContactNo,
      adminPresentAddress: e?.adminPresentAddress,
      adminPermanentAddress: e?.adminPermanentAddress,
      isActive: 'D',
    }

    const resultAdmin = await this.props.createNewAdminRecord(data)
    if (resultAdmin.type === 'CREATE_NEW_ADMIN_SUCCESS') {
      toast.success('Data Deleted Successfully.')
      setTimeout(() => {
        this.props.history.push('/AdminList')
      }, 3500)
    }
    if (resultAdmin.type === 'CREATE_NEW_ADMIN_ERROR') {
      toast.error('Something Went Wrong! Try again later..')
      setTimeout(() => {}, 3500)
    }
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
                      ) : this.props.error ? (
                        <Message variant='danger'>{this.props.error}</Message>
                      ) : (
                        <DataTable
                          header={header}
                          ref={(el) => (this.dt = el)}
                          value={this.state.customers}
                          className='p-datatable-customers p-datatable-responsive-demo'
                          dataKey='index'
                          rowHover
                          globalFilter={this.state.globalFilter}
                          selection={this.state.selectedCustomers}
                          onSelectionChange={(e) =>
                            this.setState({ selectedCustomers: e.value })
                          }
                          paginator
                          rows={10}
                          emptyMessage='No Admin Found!'
                          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                          rowsPerPageOptions={[10, 25, 50]}
                          {...this.state}
                          categories={this.props.categories}
                          loading={this.state.loading}
                        >
                          <Column
                            field='Index'
                            header='SN'
                            body={this.onIndexTemplate}
                          />
                          <Column
                            sortField='adminName'
                            filterField='adminName'
                            header='Admin Name'
                            body={this.nameBodyTemplate}
                            sortable
                          />
                          <Column
                            header='Image'
                            body={this.imageBodyTemplate}
                          />
                          <Column
                            sortField='adminContactNo'
                            filterField='adminContactNo'
                            header='Contact No'
                            body={this.contactBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='adminEmail'
                            filterField='adminEmail'
                            header='E-mail'
                            body={this.emailBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='designation'
                            field='designation'
                            header='Designation'
                            body={this.viewBodyTemplate}
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
                            header='Action'
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

const mapStateToProps = (state) => ({
  data: state.authReducer.adminesultData,
  loading: state.authReducer.loading,
  error: state.authReducer.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAdminRecord: () => dispatch(authAction.getAdminRecord()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(adminListContainer)
