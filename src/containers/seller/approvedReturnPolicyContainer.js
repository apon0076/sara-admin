import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { connect } from 'react-redux'
import * as sellerAction from '../../store/actions/sellerAction'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { Link } from 'react-router-dom'
import authenticationService from '../../store/services/authenticationService'
import 'moment-timezone'
import LoadingCard from '../../components/shared/LoadingCard'
import Message from '../../components/shared/Message'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

class approvedReturnPolicyContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      approvedReturn: null,
      globalFilter: null,
      loading: false,
      position: 'center',
      sellerReturn: [],
    }

    this.statusActionBodyTemplate = this.statusActionBodyTemplate.bind(this)
    this.viewBodyTemplate = this.viewBodyTemplate.bind(this)
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

    await this.props.getApprovedSellerReturnPolicyRecord()
    this.setState({
      approvedReturn: this.props.approvedReturnPolicy.sort((a, b) =>
        a.timeM > b.timeM ? 1 : -1
      ),
    })
  }

  sellerNameBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className="p-column-title">Name</span> */}
        {rowData?.sellerName}
      </React.Fragment>
    )
  }
  shopNameBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className="p-column-title">Name</span> */}
        {rowData?.shopName}
      </React.Fragment>
    )
  }
  returnDetailBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className="p-column-title">Name</span> */}
        {rowData?.returnPolicy}
      </React.Fragment>
    )
  }

  durationBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className="p-column-title">Name</span> */}
        {rowData?.duration} Days
      </React.Fragment>
    )
  }

  statusBodyTemplate(rowData) {
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

  statusActionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Toast ref={(el) => (this.toast = el)} />
        {/* <span className="p-column-title">Action</span> */}
        <span className='p-buttonset'>
          {rowData?.isActive === 'Y' ? (
            <Button
              label='Inactive'
              data-toggle='modal'
              data-target='#inactivateModal'
              className='p-button-danger'
              // onClick={() => this.inactiveShop(rowData)}
              onClick={() => this.setState({ sellerReturn: rowData })}
            />
          ) : (
            <Button
              label='Active'
              data-toggle='modal'
              data-target='#activateModal'
              className='p-button-success'
              // onClick={() => this.activeShop(rowData)}
              onClick={() => this.setState({ sellerReturn: rowData })}
            />
          )}
        </span>
      </React.Fragment>
    )
  }

  viewBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className="p-column-title">Action</span> */}
        <span className='p-buttonset'>
          <Button
            label='View'
            data-toggle='modal'
            data-target='#viewModal'
            className='p-button-success'
            onClick={() => this.setState({ sellerReturn: rowData })}
          />
        </span>
      </React.Fragment>
    )
  }

  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {/* <span className='p-column-title'>Details</span> */}
        <Link
          to={{
            pathname: `/EditReturnPolicy`,
            state: { rowData },
          }}
        >
          <Button
            icon='pi pi-pencil'
            className='p-button-rounded p-button-info p-mr-2'
          />
        </Link>
      </React.Fragment>
    )
  }

  onIndexTemplate(rowData, props) {
    return props.rowIndex + 1
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
              placeholder='Search'
            />
          </span>
        </div>
      </>
    )
  }

  activeReturnPolicy = async (e) => {
    e.preventDefault()

    const data = {
      sellerReturnPolicyId: this.state.approvedReturn[0].sellerReturnPolicyId,
      duration: this.state.approvedReturn[0].duration,
      returnPolicy: this.state.approvedReturn[0].returnPolicy,
      shopId: this.state.approvedReturn[0].shopId,
      sellerId: this.state.approvedReturn[0].sellerId,
      isActive: 'Y',
      isApprove: this.state.approvedReturn[0].isApprove,
    }

    const result = await this.props.addOrEditSellerReturnPolicyRecord(data)

    if (result && result?.payload?.success?.succeed === true) {
      toast.success('Return Policy Activated!!')
      setTimeout(() => {
        this.props.history.push('pendingReturnPolicy')
      }, 2500)
      //   this.resetForm()
    } else if (result && result?.payload?.success?.succeed === false) {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        // this.resetForm()
      }, 2500)
    } else if (result?.type === 'ADD_OR_EDIT_SELLER_RETURN_POLICY_SUCCESS') {
      toast.success('Return Policy Activated!!')
      setTimeout(() => {
        this.props.history.push('pendingReturnPolicy')
      }, 2500)
      //   this.resetForm()
    } else {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        // this.resetForm()
      }, 2500)
    }
  }

  inctiveReturnPolicy = async (e) => {
    e.preventDefault()

    const data = {
      sellerReturnPolicyId: this.state.approvedReturn[0].sellerReturnPolicyId,
      duration: this.state.approvedReturn[0].duration,
      returnPolicy: this.state.approvedReturn[0].returnPolicy,
      shopId: this.state.approvedReturn[0].shopId,
      sellerId: this.state.approvedReturn[0].sellerId,
      isActive: 'N',
      isApprove: this.state.approvedReturn[0].isApprove,
    }

    const result = await this.props.addOrEditSellerReturnPolicyRecord(data)

    if (result && result?.payload?.success?.succeed === true) {
      toast.success('Return Policy Inactivated')
      setTimeout(() => {
        this.props.history.push('pendingReturnPolicy')
      }, 2500)
      //   this.resetForm()
    } else if (result && result?.payload?.success?.succeed === false) {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        // this.resetForm()
      }, 2500)
    } else if (result?.type === 'ADD_OR_EDIT_SELLER_RETURN_POLICY_SUCCESS') {
      toast.success('Return Policy Inactivated')
      setTimeout(() => {
        this.props.history.push('pendingReturnPolicy')
      }, 2500)
      //   this.resetForm()
    } else {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        // this.resetForm()
      }, 2500)
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
                      <ul className='nav nav-tabs seller-tabs'>
                        <li>
                          <Link to='/pendingSeller'>Pending Seller</Link>
                        </li>
                        <li>
                          <Link to='/approvedSeller'>Approved Seller</Link>
                        </li>
                        <li className='active'>
                          <Link>
                            Return Policy
                            <hr />
                            <ul className='nav nav-tabs seller-tabs'>
                              <li>
                                <Link to='/pendingReturnPolicy'>
                                  Pending Return Policy
                                </Link>
                              </li>
                              <li className='active'>
                                <Link to='/approvedReturnPolicy'>
                                  Approved Return Policy
                                </Link>
                              </li>
                              <li>
                                <Link to='/rejectedReturnPolicy'>
                                  Rejected Return Policy
                                </Link>
                              </li>
                            </ul>
                          </Link>
                        </li>
                      </ul>
                      {this.props?.loading ? (
                        <LoadingCard count={1} />
                      ) : this.props.error ? (
                        <Message variant='danger'>{this.props.error}</Message>
                      ) : (
                        <DataTable
                          header={header}
                          ref={(el) => (this.dt = el)}
                          value={this.state.approvedReturn}
                          className='p-datatable-customers p-datatable-responsive-demo'
                          dataKey='approvedReturnPolicyId'
                          rowHover
                          globalFilter={this.state.globalFilter}
                          paginator
                          rows={10}
                          emptyMessage='No Approved Return Policy Found!'
                          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                          rowsPerPageOptions={[10, 25, 50]}
                          {...this.state}
                          values={this?.values}
                          loading={this.state?.loading}
                        >
                          <Column
                            field='Index'
                            header='SN'
                            body={this.onIndexTemplate}
                          />

                          <Column
                            sortField='sellerName'
                            filterField='sellerName'
                            header='Seller Name'
                            body={this.sellerNameBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='shopName'
                            filterField='shopName'
                            header='Shop Name'
                            body={this.shopNameBodyTemplate}
                            sortable
                          />
                          {/* <Column
                            sortField='detail'
                            filterField='detail'
                            header='Detail'
                            body={this.returnDetailBodyTemplate}
                            // sortable
                          /> */}
                          <Column
                            sortField='duration'
                            filterField='duration'
                            header='Duration'
                            body={this.durationBodyTemplate}
                            sortable
                          />
                          <Column
                            field='action'
                            header='Detail'
                            body={this.viewBodyTemplate}
                          />
                          <Column
                            sortField='isActive'
                            header='Status'
                            body={this.statusBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='isActivesAction'
                            header='Action'
                            body={this.statusActionBodyTemplate}
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
        {/* Activate Modal Start*/}
        <div id='activateModal' className='modal fade'>
          <div className='modal-dialog modal-confirm'>
            <div className='modal-content'>
              <div className='modal-header flex-column'>
                <h4 className='modal-title w-100'>Active Return Policy</h4>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-hidden='true'
                >
                  &times;
                </button>
              </div>
              <div className='modal-body'>
                <p>Are you sure to active the Return Policy?</p>
              </div>
              <div className='modal-footer justify-content-center'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                >
                  Cancel
                </button>
                <button
                  type='button'
                  className='btn btn-success'
                  data-dismiss='modal'
                  onClick={this.activeReturnPolicy}
                >
                  Active
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Activate Modal End*/}

        {/* Inactive Modal Start*/}
        <div id='inactivateModal' className='modal fade'>
          <div className='modal-dialog modal-confirm'>
            <div className='modal-content'>
              <div className='modal-header flex-column'>
                <h4 className='modal-title w-100'>Inactive Return Policy</h4>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-hidden='true'
                >
                  &times;
                </button>
              </div>
              <div className='modal-body'>
                <p>Are you sure to inactive the Return Policy?</p>
              </div>
              <div className='modal-footer justify-content-center'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                >
                  Cancel
                </button>
                <button
                  type='button'
                  className='btn btn-danger'
                  data-dismiss='modal'
                  onClick={this.inctiveReturnPolicy}
                >
                  Inactive
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Inactive Modal End*/}

        {/* View Modal Start*/}
        <div id='viewModal' className='modal fade'>
          <div className='modal-dialog modal-confirm modal-lg'>
            <div className='modal-content'>
              <div className='modal-header flex-column'>
                <h4 className='modal-title w-75'>Return Policy Detail</h4>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-hidden='true'
                >
                  &times;
                </button>
              </div>
              <div className='modal-body'>
                <div className='row'>
                  <div className='col-md-6 col-sm-12'>
                    <div className='form-group'>
                      <label className='control_label'>
                        Seller Name{' '}
                        <span
                          aria-hidden='true'
                          style={{
                            color: 'red',
                            fontWeight: 'bold',
                          }}
                        >
                          *
                        </span>
                      </label>
                      <input
                        type='text'
                        className={'form-control'}
                        placeholder='Product Name'
                        value={this.state.sellerReturn?.sellerName}
                        disabled
                      />
                    </div>
                  </div>
                  <div className='col-md-6 col-sm-12'>
                    <div className='form-group'>
                      <label className='control_label'>
                        Shop Name{' '}
                        <span
                          aria-hidden='true'
                          style={{
                            color: 'red',
                            fontWeight: 'bold',
                          }}
                        >
                          *
                        </span>
                      </label>
                      <input
                        type='text'
                        className={'form-control'}
                        placeholder='Product Title'
                        value={this.state.sellerReturn?.shopName}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12 col-sm-12'>
                    <div className='form-group'>
                      <label className='control_label'>
                        Return Duration{' '}
                        <span
                          aria-hidden='true'
                          style={{
                            color: 'red',
                            fontWeight: 'bold',
                          }}
                        >
                          *
                        </span>
                      </label>
                      <input
                        type='number'
                        className={'form-control'}
                        placeholder='Product Title'
                        value={this.state.sellerReturn?.duration}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12 col-sm-12'>
                    <div className='form-group'>
                      <label className='control_label'>
                        Return Policy Detail{' '}
                        <span
                          aria-hidden='true'
                          style={{
                            color: 'red',
                            fontWeight: 'bold',
                          }}
                        >
                          *
                        </span>
                      </label>
                      <div className='row'>
                        <div className='col-md-12 '>
                          <div className='form-group'>
                            <div className={'editor'}>
                              <CKEditor
                                editor={ClassicEditor}
                                data={this.state.sellerReturn?.returnPolicy}
                                className={'form-control'}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-footer justify-content-center'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* View Modal End*/}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  approvedReturnPolicy: state.sellerReducer.approvedReturnPolicy,
  loading: state.paymentMethodReducer.loading,
  error: state.paymentMethodReducer.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getApprovedSellerReturnPolicyRecord: () =>
      dispatch(sellerAction.getApprovedSellerReturnPolicyRecord()),
    addOrEditSellerReturnPolicyRecord: (data) =>
      dispatch(sellerAction.addOrEditSellerReturnPolicyRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(approvedReturnPolicyContainer)
