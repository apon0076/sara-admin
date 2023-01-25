import authenticationService from '../../store/services/authenticationService'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as orderAction from '../../store/actions/orderAction'
import { ToastContainer, toast } from 'react-toastify'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import * as Icon from 'react-feather'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import moment from 'moment'
import 'moment-timezone'
import ManageStatus from '../../components/orders/ManageStatus'
import { stubFalse } from 'lodash-es'
import { InputText } from 'primereact/inputtext'
import baseUrl from '../../utils/baseUrl'
import { Chip } from 'primereact/chip'
import Invoice from '../../utils/reporting/Invoice'
import { PDFDownloadLink } from '@react-pdf/renderer'
import LoadingCard from '../../components/shared/LoadingCard'
import Message from '../../components/shared/Message'

class manageOrderAdminContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: null,
      selectedOrder: null,
      orders: [],
      selectedOrders: null,
      globalFilter: null,
      loading: false,
      position: 'center',
      orderStatusType: [],
      orderTrackingId: 0,
      orderId: 0,
      trackingNumber: 0,
      trackingDate: 0,
      orderStatus: '',
      sender: '',
      receiver: '',
      location: '',
      remarks: '',
      isActive: '',
      address: '',
      shopWiseOrders: '',
      show: false,
      on: false,
    }

    this.invoiceActionBodyTemplate = this.invoiceActionBodyTemplate.bind(this)
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

    await this.props.getOrderRecord()
    await this.props.getOrderStatusTypeRecord()

    this.setState({
      order: this.props.order.sort(
        (a, b) => parseFloat(b.orderProfileId) - parseFloat(a.orderProfileId)
      ),
      orderStatusType: this.props.orderStatusType,
    })
  }

  handleClose = () => this.setState({ show: false })

  printDocument = () => {
    const input = document.getElementById('divToPrint')
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF()
      pdf.addImage(imgData, 'JPEG', 0, 0)
      // pdf.output('dataurlnewwindow');
      pdf.save('invoice.pdf')
    })
  }

  invoiceActionBodyTemplate(rowData) {
    const shipping = rowData.shippingAddress
    const getAddress = JSON.parse(shipping)

    return (
      <React.Fragment>
        <Toast ref={(el) => (this.toast = el)} />
        <span className='p-buttonset'>
          <Button
            label='Details'
            data-toggle='modal'
            data-target='#detailsModal'
            onClick={() =>
              this.setState({
                orders: rowData,
                address: getAddress.address,
                shopWiseOrders: rowData.shopWiseOrders,
                on: true,
              })
            }
            style={{
              marginRight: '2px',
            }}
          />
        </span>
      </React.Fragment>
    )
  }

  onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1
  }

  invoiceNoBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Invoice No</span>
        <span>{rowData.invoiceNo}</span>
      </React.Fragment>
    )
  }

  subtotalBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Subtotal</span>
        <span>{rowData.totalPayableAmount}</span>
      </React.Fragment>
    )
  }

  paymentMethodBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Payment Method</span>
        <span>
          {/* {rowData.paymentMethodName === null || ''
            ? 'N/A'
            : rowData.paymentMethodName} */}

          {rowData.paymentMethodId === 6
            ? 'SSLCOMMERZ'
            : rowData.paymentMethodId === 5
            ? 'Cash On Delevery'
            : rowData.paymentMethodId === 0
            ? 'Not Selected Yet'
            : ''}
        </span>
      </React.Fragment>
    )
  }

  customerBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Customer Name</span>
        <span>{rowData.customerName}</span>
      </React.Fragment>
    )
  }

  productTitleBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Item</span>
        <span>{rowData.productTitle}</span>
      </React.Fragment>
    )
  }

  sellerProductSkuBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>SKU</span>
        <span>
          {rowData.sellerProductSku === null ? 'N/A' : rowData.sellerProductSku}
        </span>
      </React.Fragment>
    )
  }

  productPriceBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Rate</span>
        <span>{rowData.productPrice}</span>
      </React.Fragment>
    )
  }

  shopNameBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Shop</span>
        <span>{rowData.shopName}</span>
      </React.Fragment>
    )
  }

  productQuantityBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Quantity</span>
        <span>{rowData.productQuantity}</span>
      </React.Fragment>
    )
  }

  totalAmountBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Amount</span>
        <span>{rowData.productQuantity * rowData.productPrice}</span>
      </React.Fragment>
    )
  }

  imageBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Image</span>

        <img
          src={baseUrl.concat(rowData.productImage)}
          alt={rowData.productUrl}
          className='product-image'
          style={{
            height: '50px',
            width: '50px',
            cursor: 'pointer',
          }}
        ></img>
      </React.Fragment>
    )
  }

  showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName='invoice.pdf'
      style={{
        marginTop: '5px !important',
      }}
    >
      <Icon.Printer
        className='text-light'
        style={{
          cursor: 'pointer',
          color: 'black',
        }}
      />
    </PDFDownloadLink>
  )

  headerTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className='table-header'>
          <div className='p-d-flex p-jc-between'>
            <div>
              <strong>{rowData.shopName}</strong>
              <strong
                style={{
                  marginLeft: '5px',
                }}
              >
                <Chip label={rowData.orderNo} className='p-mr-2 p-mb-2' />
              </strong>
              <p className='capsule' style={{ marginLeft: '5px' }}>
                {rowData.statusName}
              </p>
              <span style={{ marginLeft: '5px' }}>
                {this.showDownloadLink(rowData)}
              </span>
            </div>
            <div>
              {rowData.statusId === 3 ? (
                <span style={{ display: 'none' }}></span>
              ) : (
                <Button
                  label='Manage Status'
                  data-toggle='modal'
                  data-target='#statusModal'
                  data-dismiss='modal'
                  onClick={() =>
                    this.setState({
                      orders: rowData,
                      show: true,
                    })
                  }
                  style={{ marginRight: '2px' }}
                />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  changeStatus = async (orderTrackingData, updateStatus, resetForm) => {
    const data = {
      shopwiseOrderId: orderTrackingData.shopwiseOrderId,
      statusId: updateStatus.orderStatusTypeId,
      statusName: updateStatus.statusTypeName,
    }

    await this.props.updateShopWiseOrderStatusRecord(data)

    const orderTracking = await this.props.createOrderTrackingRecord(
      orderTrackingData
    )
    if (orderTracking && orderTracking.payload.success === true) {
      toast.success('Status Updated Successfully')
      this.setState({ on: false })
      this.props.history.push('ManageOrdersAdmin')
      resetForm()
      this.handleClose()
    } else if (orderTracking && orderTracking.payload.success === stubFalse) {
      toast.error('Something went wrong, Please try again')
    } else if (orderTracking.type === 'CREATE_ORDER_TRACKING_SUCCESS') {
      toast.success('Status Updated Successfully')
      this.setState({ on: false })
      this.props.history.push('ManageOrdersAdmin')
    } else {
      toast.error('Something went wrong, Please try again')
    }

    await this.props.getOrderRecord()
    this.setState({
      order: this.props.order.sort(
        (a, b) => parseFloat(b.orderProfileId) - parseFloat(a.orderProfileId)
      ),
    })
  }

  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <div className='p-text-bold table-heading-style'>List of Orders</div>
      </React.Fragment>
    )
  }

  rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <span className='p-input-icon-left'>
          <div className='p-d-flex p-jc-center p-ai-center'>
            <div>
              <InputText
                className='form-control text-center'
                type='search'
                value={this.state.globalFilter}
                onChange={(e) =>
                  this.setState({ globalFilter: e.target.value })
                }
                placeholder='Search'
              />
            </div>
          </div>
        </span>
      </React.Fragment>
    )
  }

  render() {
    const {
      invoiceNo,
      customerName,
      cusContactNo,
      createDate,
      paymentMethodName,
      orderSubtotalAmt,
      totalShippingCharge,
      totalVatFlatAmt,
      totalPayableAmount,
    } = this.state.orders

    const leftDetails = (
      <React.Fragment>
        <div className='p-text-bold table-heading-style'>
          {this.headerTemplate}
        </div>
      </React.Fragment>
    )
    const rightDetails = (
      <React.Fragment>
        <div className='p-text-bold table-heading-style'>
          {this.headerTemplate}
        </div>
      </React.Fragment>
    )
    return (
      <>
        <ToastContainer autoClose={1500} />
        <div className='page-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='white-box'>
                  <div className='datatable-rowexpansion-demo datatable-responsive-demo'>
                    <div className='card'>
                      <Toolbar
                        className='p-mb-4'
                        right={this.rightToolbarTemplate}
                        left={this.leftToolbarTemplate}
                      ></Toolbar>
                      <div className='card'>
                        {this.props.loading ? (
                          <LoadingCard count={1} />
                        ) : this.props.error ? (
                          <Message variant='danger'>{this.props.error}</Message>
                        ) : (
                          <DataTable
                            value={this.state.order}
                            className='p-datatable-customers p-datatable-responsive-demo'
                            dataKey='invoiceNo'
                            rowHover
                            globalFilter={this.state.globalFilter}
                            selection={this.state.selectedOrder}
                            onSelectionChange={(e) =>
                              this.setState({ selectedOrder: e.value })
                            }
                            paginator
                            rows={10}
                            emptyMessage='No order(s) found'
                            currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                            paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                            rowsPerPageOptions={[10, 25, 50]}
                            {...this.state}
                            order={this.props.order}
                            loading={this.state.loading}
                          >
                            <Column
                              field='invoiceNo'
                              filterField='invoiceNo'
                              header='Invoice No'
                              body={this.invoiceNoBodyTemplate}
                              sortable
                            />
                            <Column
                              field='customerName'
                              header='Customer Name'
                              body={this.customerBodyTemplate}
                              sortable
                            />
                            <Column
                              field='orderSubtotalAmt'
                              header='Subtotal Amount'
                              body={this.subtotalBodyTemplate}
                              sortable
                            />
                            <Column
                              field='paymentMethodName'
                              header='Payment Method'
                              body={this.paymentMethodBodyTemplate}
                              sortable
                            />
                            <Column
                              field='isApprove'
                              header='Action'
                              body={this.invoiceActionBodyTemplate}
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

        {/* DETAILS MODAL START*/}
        <div
          className='modal fade'
          id='detailsModal'
          tabindex='-1'
          role='dialog'
          aria-labelledby='exampleModalCenterTitle'
          aria-hidden='true'
        >
          <div
            className='modal-dialog modal-dialog-centered modal-lg order-modal-dialog'
            role='document'
          >
            <div className='modal-content'>
              <div id='divToPrint'>
                <div className='modal-header'>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>
                      <h6 className='modal-title' id='exampleModalLongTitle'>
                        Invoice No: #{invoiceNo}
                      </h6>
                    </div>
                    {/* <div>
                      <Icon.Printer
                        className="text-light"
                        style={{ cursor: "pointer" }}
                        onClick={this.printDocument}
                      />
                    </div> */}
                  </div>
                </div>
                <div className='modal-body'>
                  <div className='row'>
                    <div className='col-md-4'>
                      <strong>Customer Details</strong>
                      <div className='table-responsive'>
                        <table className='table'>
                          <thead>
                            <tr>
                              <th>Name:</th>
                              <td>{customerName}</td>
                            </tr>
                            <tr>
                              <th>Contact No:</th>
                              <td>{cusContactNo}</td>
                            </tr>
                            <tr>
                              <th>Order Date:</th>
                              <td>
                                {moment(createDate).format(
                                  'Do MMMM YYYY, h:mm A'
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th>Shipping Address:</th>
                              <td>{this.state.address}</td>
                            </tr>
                            <tr>
                              <th>Payment Method:</th>
                              <td>
                                {paymentMethodName === null || ''
                                  ? 'N/A'
                                  : paymentMethodName}
                              </td>
                              <hr />
                            </tr>
                            <hr />
                            <tr>
                              <th className='text-primary'>Sub-Total:</th>
                              <td>
                                {orderSubtotalAmt === null || ''
                                  ? '0'
                                  : orderSubtotalAmt}
                              </td>
                              <hr />
                            </tr>
                            <tr>
                              <th className='text-primary'>Shipping Cost:</th>
                              <td>
                                {totalShippingCharge === null || ''
                                  ? '0'
                                  : totalShippingCharge}
                              </td>
                              <hr />
                            </tr>
                            <tr>
                              <th className='text-primary'>VAT:</th>
                              <td>
                                {totalVatFlatAmt === null || ''
                                  ? '0'
                                  : totalVatFlatAmt}
                              </td>
                              <hr />
                            </tr>
                            <tr>
                              <th className='text-danger'>Total:</th>
                              <td>
                                {totalPayableAmount === null || ''
                                  ? '0'
                                  : totalPayableAmount}
                              </td>
                              <hr />
                            </tr>
                          </thead>
                        </table>
                      </div>
                    </div>
                    <div className='col-md-8'>
                      <div className='datatable-responsive-demo'>
                        <strong>Order Details</strong>
                        <Toolbar left={leftDetails} />
                        <Toolbar right={rightDetails} />
                        {this.state.shopWiseOrders &&
                          this.state.shopWiseOrders.map((shop, index) => (
                            <DataTable
                              key={index}
                              value={shop.orderDetails}
                              className='p-datatable-customers p-datatable-responsive-demo'
                              dataKey='orderNo'
                              rowHover
                              selection={this.state.selectedOrders}
                              onSelectionChange={(e) =>
                                this.setState({ selectedOrders: e.value })
                              }
                              emptyMessage='No order(s) found'
                              {...this.state}
                              orders={this.state.orders}
                              loading={this.state.loading}
                              header={this.headerTemplate(shop)}
                            >
                              <Column
                                field='Index'
                                header='SN'
                                body={this.onIndexTemplate}
                                className='listSL'
                              />
                              <Column
                                field='productImage'
                                header='Image'
                                body={this.imageBodyTemplate}
                              />
                              <Column
                                field='productTitle'
                                filterField='productTitle'
                                header='Item'
                                body={this.productTitleBodyTemplate}
                                sortable
                              />
                              <Column
                                field='sellerProductSku'
                                filterField='sellerProductSku'
                                header='SKU'
                                body={this.sellerProductSkuBodyTemplate}
                                sortable
                              />
                              <Column
                                field='productPrice'
                                filterField='productPrice'
                                header='Rate'
                                body={this.productPriceBodyTemplate}
                                sortable
                              />
                              <Column
                                field='productQuantity'
                                filterField='productQuantity'
                                header='Quantity'
                                body={this.productQuantityBodyTemplate}
                                sortable
                              />
                              <Column
                                field='totalPayableAmt'
                                header='Total'
                                body={this.totalAmountBodyTemplate}
                                sortable
                              />
                            </DataTable>
                          ))}
                      </div>
                      <br />
                      {/* <div
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                      >
                        <div>
                          <div>Sub-Total: {orderSubtotalAmt}</div>
                          <div>Shipping Cost: {totalShippingCharge}</div>
                          <div>VAT: {totalVatFlatAmt}</div>
                          <div>Total: {totalPayableAmount}</div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <Button
                  label='Close'
                  icon='pi pi-warning'
                  className='p-button-warning'
                  data-dismiss='modal'
                />
              </div>
            </div>
          </div>
        </div>
        {/* DETAILS MODAL END */}

        {/* STATUS MODAL START*/}
        <div>
          {this.state.on && (
            <ManageStatus
              orders={this.state.orders}
              orderStatusType={this.state.orderStatusType}
              changeStatus={this.changeStatus}
              show={this.state.show}
              handleClose={this.handleClose}
            />
          )}
        </div>
        {/* STATUS MODAL END */}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  order: state.orderReducer.order,
  orderStatusType: state.orderReducer.orderStatusType,
  data: state.orderReducer.orderTracking,
  loading: state.orderReducer.loading,
  error: state.orderReducer.error,
  searchId: state.searchId,
  handleChange: state.handleChange,
  error: state.orderReducer.error,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderRecord: () => dispatch(orderAction.getOrderRecord()),
    getOrderStatusTypeRecord: () =>
      dispatch(orderAction.getOrderStatusTypeRecord()),
    createOrderTrackingRecord: (data) =>
      dispatch(orderAction.createOrderTrackingRecord(data)),
    updateShopWiseOrderStatusRecord: (data) =>
      dispatch(orderAction.updateShopWiseOrderStatusRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(manageOrderAdminContainer)
