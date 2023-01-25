import 'primeicons/primeicons.css'
import '../../../node_modules/primereact/resources/themes/saga-blue/theme.css'
import '../../../node_modules/primereact/resources/primereact.css'
import '../../../node_modules/primeflex/primeflex.css'
import { connect } from 'react-redux'
import * as productAction from '../../store/actions/productAction'
import React, { Component } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { PendingSeller } from '../../components/seller/PendingSeller'
import { PendingProduct } from '../../components/product/pendingProduct'
import baseUrl from '../../utils/baseUrl'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { Button } from 'primereact/button'
import authenticationService from '../../store/services/authenticationService'
import { InputText } from 'primereact/inputtext'
import LoadingCard from '../../components/shared/LoadingCard'
import Message from '../../components/shared/Message'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

class pendingProductContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: null,
      selectedProducts: null,
      shops: [],
      shopss: [],
      position: 'center',
      productsData: null,
      displayBasic: false,
      remarks: '',
      errorRemarks: '',
    }

    this.pendingSellerService = new PendingSeller()
    this.productService = new PendingProduct()
    this.setApprove = this.setApprove.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.nameBodyTemplate = this.nameBodyTemplate.bind(this)
    this.contactBodyTemplate = this.contactBodyTemplate.bind(this)
    this.emailBodyTemplate = this.emailBodyTemplate.bind(this)
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    this.onIndexTemplate = this.onIndexTemplate.bind(this)
    this.rejectShop = this.rejectShop.bind(this)
    this.takeActionctionBodyTemplate =
      this.takeActionctionBodyTemplate.bind(this)
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

    await this.props.getPendingProductRecord()
    this.setState({
      productsData: this.props?.products,
    })

    this.pendingSellerService.getPendingSeller().then((data) =>
      this.setState({
        products: data.sort((a, b) => (a.timeM > b.timeM ? 1 : -1)),
      })
    )
  }

  handleChange = async (e) => {
    e.preventDefault()
    const { value } = e.target
    const { target } = e

    switch (target.name) {
      case 'remarks':
        this.setState({
          remarks: target.value,
          errorRemarks:
            value.length < 4 ? 'Atleast 4 characaters required' : '',
        })
        break
      default:
    }
  }

  renderHeader() {
    return (
      <>
        <div className='table-header'>
          Pending Products List
          <span className='p-input-icon-left'>
            <InputText
              type='search'
              className='form-control text-center text-field'
              onInput={(e) => this.setState({ globalFilter: e.target.value })}
              placeholder='Search by Product name'
            />
          </span>
        </div>
      </>
    )
  }

  verifiedBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <span
          className={
            rowData.isApprove === 'Y'
              ? 'p-tag p-tag-primary'
              : 'p-tag p-tag-warning'
          }
        >
          {rowData.isApprove === 'Y' ? 'ACTIVE' : 'INACTIVE'}
        </span>
      </React.Fragment>
    )
  }

  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {rowData.brandName === null ? (
          <p className='text-danger'>Not Found</p>
        ) : (
          rowData.brandName
        )}
      </React.Fragment>
    )
  }

  nameBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {rowData.shopName === null ? (
          <p className='text-danger'>Not Found</p>
        ) : (
          rowData.shopName
        )}
      </React.Fragment>
    )
  }

  contactBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {rowData.productName === null ? (
          <p className='text-danger'>Not Found</p>
        ) : (
          rowData.productName
        )}
      </React.Fragment>
    )
  }

  emailBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {rowData.productTitle === null ? (
          <p className='text-danger'>Not Found</p>
        ) : (
          rowData.productTitle
        )}
      </React.Fragment>
    )
  }

  logoBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <span>
          <img
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              objectFit: 'contain',
            }}
            src={baseUrl.concat(rowData.thumbnailImage)}
            alt='IMG'
          />
        </span>
      </React.Fragment>
    )
  }

  statusBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {rowData.categoryName === null ? (
          <p className='text-danger'>Not Found</p>
        ) : (
          rowData.categoryName
        )}
      </React.Fragment>
    )
  }

  maxPriceBodyTemplate(rowData) {
    return (
      <React.Fragment>
        {rowData.maxPrice === null ? (
          <p className='text-danger'>Not Found</p>
        ) : (
          rowData.maxPrice
        )}
      </React.Fragment>
    )
  }

  takeActionctionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <span className='p-buttonset verified-button'>
          <Button
            label='View Details'
            className='p-button-success'
            data-toggle='modal'
            data-target='#exampleModalCenter'
            onClick={() => this.setState({ shops: rowData })}
          />
        </span>
      </React.Fragment>
    )
  }

  onIndexTemplate(rowData, props) {
    return props.rowIndex + 1
  }

  //Approve product
  setApprove = async (seller) => {
    const data = {
      productId: seller.productId,
      isApprove: 'Y',
      isDelete: '',
      productStatus: seller.productStatus,
      operationType: 'isApprove',
    }

    const res = await this.props.approveProductRecord(data)

    if (res.type === 'APPROVE_SHOP_SUCCESS') {
      toast.success('Product approved.')
    } else if (res.type === 'APPROVE_SHOP_ERROR') {
      toast.error('Something Went Wrong.')
    }
    await this.props.getPendingProductRecord()
    window.location.reload(true)
  }

  //Reject product
  rejectShop = async (seller) => {
    const initialData = {
      productId: seller.productId,
      remarks: this.state.remarks,
    }

    await this.props.updateProductRemarksRecord(initialData)
    const data = {
      productId: seller.productId,
      isApprove: 'R',
      isDelete: seller.isDelete,
      productStatus: seller.productStatus,
      operationType: 'isApprove',
    }

    const res = await this.props.rejectShopRecord(data)

    if (res.type === 'REJECT_SHOP_SUCCESS') {
      toast.success('Product Rejected.')
    } else if (res.type === 'REJECT_SHOP_ERROR') {
      toast.error('Something Went Wrong.')
    }

    setTimeout(() => {
      this.props.history.push('/rejectedProduct')
    }, 2500)
  }

  render() {
    const header = this.renderHeader()
    return (
      <>
        <ToastContainer autoClose={2000} />
        <div className='page-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-sm-12'>
                <div className='white-box'>
                  <div className='datatable-doc-demo datatable-responsive-demo'>
                    <div className='card'>
                      <ul className='nav nav-tabs seller-tabs'>
                        <li>
                          <Link to='/createProductAdmin'>Create Product</Link>
                        </li>
                        <li className='active'>
                          <Link to='/pendingProduct'>Pending Product</Link>
                        </li>
                        <li>
                          <Link to='/approvedProduct'>Approved Product</Link>
                        </li>
                        <li>
                          <Link to='/rejectedProduct'>Rejected Product</Link>
                        </li>
                      </ul>
                      {this.props.loadingInfo ? (
                        <LoadingCard count={1} />
                      ) : this.props.error ? (
                        <Message variant='danger'>{this.props.error}</Message>
                      ) : (
                        <DataTable
                          ref={(el) => (this.dt = el)}
                          value={this.state.productsData}
                          {...this.state}
                          handleChange={this.handleChange}
                          sellers={this.props.sellers}
                          setApprove={this.setApprove}
                          rejectShop={this.rejectShop}
                          values={this.values}
                          searchId={this.props.searchId}
                          header={header}
                          className='p-datatable-customers p-datatable-responsive-demo'
                          dataKey='productName'
                          rowHover
                          globalFilter={this.state.globalFilter}
                          selection={this.state.selectedProducts}
                          onSelectionChange={(e) =>
                            this.setState({ selectedProducts: e.value })
                          }
                          paginator
                          rows={10}
                          emptyMessage='No Product Data found'
                          currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                          paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                          rowsPerPageOptions={[10, 25, 50]}
                        >
                          <Column
                            sortField='shopName'
                            header='Shop Name'
                            body={this.nameBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='productName'
                            filterField='productName'
                            header='Product Name'
                            body={this.contactBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='productTitle'
                            header='Product Style / SKU'
                            body={this.emailBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='categoryName'
                            header='Category Name'
                            body={this.statusBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='brandName'
                            header='Brand Name'
                            body={this.actionBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='thumbnailImage'
                            header='Thumbnail Image'
                            body={this.logoBodyTemplate}
                          />
                          <Column
                            sortField='maxPrice'
                            header='Price'
                            body={this.maxPriceBodyTemplate}
                            sortable
                          />
                          <Column
                            sortField='isVerified'
                            header='Status'
                            body={this.verifiedBodyTemplate}
                            sortable
                          />
                          <Column
                            field='action'
                            header='Action'
                            body={this.takeActionctionBodyTemplate}
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

        {/* MODAL Start*/}
        <div
          className='modal fade '
          id='exampleModalCenter'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='exampleModalCenterTitle'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-lg' role='document'>
            <div className='modal-content'>
              <div className='panel-wrapper collapse in' aria-expanded='true'>
                <div className='form-body'>
                  <h3 className='box-title add-product-title'>
                    View Product Details
                    <div class='pull-right'>
                      <button
                        type='button'
                        className='close'
                        data-dismiss='modal'
                        aria-label='Close'
                      >
                        <span aria-hidden='true'>&times;</span>
                      </button>
                    </div>
                  </h3>

                  <ul className='nav nav-tabs'>
                    <li className='active'>
                      <a data-toggle='tab' href='#BasicInformation'>
                        Basic Information
                      </a>
                    </li>
                    <li>
                      <a data-toggle='tab' href='#ProductDescriptions'>
                        Descriptions
                      </a>
                    </li>
                    <li>
                      <a data-toggle='tab' href='#ProductSpecification'>
                        Specifications
                      </a>
                    </li>
                    <li>
                      <a data-toggle='tab' href='#PRICEANDSTOCK'>
                        Price & Stock
                      </a>
                    </li>
                    <li>
                      <a data-toggle='tab' href='#SERVICEANDDELIVERY'>
                        Service & Delivery
                      </a>
                    </li>
                    <li>
                      <a data-toggle='tab' href='#RETURNPOLICY'>
                        Return Policy
                      </a>
                    </li>
                  </ul>

                  <div className='tab-content modal-body'>
                    {/* BasicInformation Start */}
                    <div
                      id='BasicInformation'
                      className='tab-pane fade in active'
                    >
                      <div className='row'>
                        <div className='col-md-12 col-sm-12'>
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
                            <div>
                              <input
                                type='text'
                                className={'form-control'}
                                placeholder='Shop Name'
                                value={this.state.shops.shopName}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Product Name{' '}
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
                              value={this.state.shops.productName}
                              disabled
                            />
                          </div>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Product Style / SKU{' '}
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
                              placeholder='Product Style / SKU'
                              value={this.state.shops.productTitle}
                              disabled
                            />
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Category{' '}
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
                            <div>
                              <input
                                type='text'
                                className={'form-control'}
                                placeholder='Category Name'
                                value={this.state.shops.categoryName}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Brand{' '}
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
                            <div>
                              <input
                                type='text'
                                className={'form-control'}
                                placeholder='Brand Name'
                                value={this.state.shops.brandName}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Product Quantity Unit{' '}
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
                            <div>
                              <input
                                type='text'
                                className={'form-control'}
                                placeholder='Unit Name'
                                value={this.state.shops.unitName}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Maximum Price{' '}
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
                              value={this.state.shops.maxPrice}
                              disabled
                            />
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              What's in the box?{' '}
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
                              placeholder='Whats in the Box'
                              value={this.state.shops.boxInsideElement}
                              disabled
                            />
                          </div>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>
                              Meta Keywords{' '}
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
                              placeholder='Meta Keywords'
                              value={this.state.shops.metaKeywords}
                              disabled
                            />
                          </div>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <div className='form-group'>
                            <label className='control_label'>Video URL </label>

                            <input
                              type='text'
                              className={'form-control'}
                              placeholder='Video URL'
                              value={this.state.shops.productVideoUrl}
                              disabled
                            />
                          </div>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                          <div className='row'>
                            <div className='col-md-6'>
                              <div className='form-group'>
                                <div className='row'>
                                  <label className='control_label'>
                                    Thumbnail Image{' '}
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

                                  <div className='col-md-6'>
                                    <img
                                      src={baseUrl.concat(
                                        this.state.shops.thumbnailImage
                                      )}
                                      className='thumb-md product-image'
                                      style={{
                                        marginTop: '30px',
                                        width: '120px',
                                        height: '120px',
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* BasicInformation End */}

                    {/* //Product Description Start // */}
                    <div id='ProductDescriptions' className='tab-pane fade'>
                      <label className='control_label'>
                        Product Description{' '}
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
                                data={this.state.shops.productDescription}
                                className={'form-control'}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* //Product Description End // */}

                    {/* //Product Specification Start // */}
                    <div id='ProductSpecification' className='tab-pane fade'>
                      <div>
                        <label className='control_label'>
                          Product Specification{' '}
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
                        <div className='row' style={{ display: '' }}>
                          <div className='col-md-12 '>
                            <div className='form-group'>
                              <div className={'editor'}>
                                <CKEditor
                                  editor={ClassicEditor}
                                  data={this.state.shops.productSpecification}
                                  className={'form-control'}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* //Product Specification End // */}

                    {/* //Price and Stock Start // */}
                    <div id='PRICEANDSTOCK' className='tab-pane fade'>
                      {this.state.shops.productDetails &&
                        this.state.shops.productDetails.map(
                          (prodDetails, indexx) => {
                            return (
                              <React.Fragment key={indexx}>
                                <table className='table table-bordered'>
                                  <thead>
                                    <tr>
                                      {prodDetails.productVariants.map(
                                        (pv, indexx) => {
                                          return (
                                            <th
                                              style={{
                                                fontWeight: '900',
                                              }}
                                              key={indexx}
                                            >
                                              {pv.variantName}
                                            </th>
                                          )
                                        }
                                      )}
                                      <th>Price</th>
                                      <th>Quantity</th>
                                      <th>Seller Product SKU</th>
                                      <th>Shop Product SKU</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      {prodDetails.productVariants.map(
                                        (pv, index) => {
                                          return (
                                            <td key={index}>
                                              <select
                                                className='form-control'
                                                data-placeholder='Select'
                                                tabIndex='1'
                                                disabled
                                              >
                                                <option defaultValue>
                                                  {pv.variantOptionText}
                                                </option>
                                                {this.state.shops
                                                  .productVariant &&
                                                  this.state.shops
                                                    .productVariant[index] &&
                                                  this.state.shops.productVariant[
                                                    index
                                                  ].productVariantOptions.map(
                                                    (pv, index) => {
                                                      return (
                                                        <option
                                                          id={
                                                            pv.variantOptionId
                                                          }
                                                        >
                                                          {pv.variantOptionText}
                                                        </option>
                                                      )
                                                    }
                                                  )}
                                              </select>
                                            </td>
                                          )
                                        }
                                      )}

                                      <td>
                                        <input
                                          type='text'
                                          className={'form-control'}
                                          name='productPrice'
                                          value={prodDetails.productPrice}
                                          disabled
                                        ></input>
                                      </td>
                                      <td>
                                        {' '}
                                        <input
                                          type='text'
                                          className={'form-control'}
                                          name='productQuantity'
                                          value={prodDetails.productQuantity}
                                          disabled
                                        ></input>
                                      </td>
                                      <td>{prodDetails.sellerProductSku}</td>
                                      <td>{prodDetails.shopProductSku}</td>
                                    </tr>
                                    <tr>
                                      <td colSpan='100%'>
                                        {prodDetails.productImages.map(
                                          (pv, index) => {
                                            return (
                                              // prodDetails.shopProductSku === pv.shopProductSku &&
                                              <>
                                                <div>
                                                  <div
                                                    style={{
                                                      float: 'left',
                                                    }}
                                                  >
                                                    <div
                                                      className='parent'
                                                      style={{
                                                        position: 'relative',
                                                      }}
                                                    >
                                                      {pv.imageUrl.length <
                                                      500 ? (
                                                        <img
                                                          src={baseUrl.concat(
                                                            pv.imageUrl
                                                          )}
                                                          alt='img'
                                                          key={index}
                                                          height='98px'
                                                          width='98px'
                                                          style={{
                                                            borderRadius:
                                                              '10px',
                                                            marginLeft: '10px',
                                                            marginRight: '10px',
                                                            cursor: 'pointer',
                                                          }}
                                                        />
                                                      ) : (
                                                        <img
                                                          src={pv.imageUrl}
                                                          alt='img'
                                                          key={index}
                                                          height='98px'
                                                          width='98px'
                                                          style={{
                                                            borderRadius:
                                                              '10px',
                                                            marginLeft: '10px',
                                                            marginRight: '10px',
                                                            cursor: 'pointer',
                                                          }}
                                                        />
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              </>
                                            )
                                          }
                                        )}
                                        <div
                                          style={{
                                            textAlign: 'right',
                                          }}
                                        ></div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </React.Fragment>
                            )
                          }
                        )}
                    </div>
                    {/* //Price and Stock End // */}

                    {/* //Return Policy Start // */}
                    <div id='SERVICEANDDELIVERY' className='tab-pane fade'>
                      <div className='service_and_delivery'>
                        <div className='row'>
                          <div className='col-md-6 col-sm-12'>
                            <div className='form-group'>
                              <label className='control_label'>
                                Warranty Type{' '}
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
                              <select
                                className='form-control'
                                data-placeholder='Select'
                                tabIndex='1'
                                name='warrantyTypeId'
                                value={this.state.shops.warrantyTypeId}
                                disabled
                              >
                                <option key='0' value='0'>
                                  No Warrenty
                                </option>
                                <option key='1' value='1'>
                                  Local Seller Warrenty
                                </option>
                                <option key='2' value='2'>
                                  Non-local Warrenty
                                </option>
                                <option key='3' value='3'>
                                  International Seller Warrenty
                                </option>
                                <option key='4' value='4'>
                                  International Manufacturer Warrenty
                                </option>
                              </select>
                            </div>
                          </div>
                          <div className='col-md-6 col-sm-12'>
                            <div className='form-group'>
                              <label className='control_label'>
                                Warranty Period{' '}
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
                              <select
                                className='form-control'
                                data-placeholder='Select'
                                tabIndex='1'
                                name='warrantyPeriodId'
                                value={this.state.shops.warrantyPeriodId}
                                disabled
                              >
                                <option key='0' value='0'>
                                  No Warrrenty
                                </option>
                                <option key='1' value='1'>
                                  1 Month
                                </option>
                                <option key='2' value='2'>
                                  2 Month
                                </option>
                                <option key='3' value='3'>
                                  3 Month
                                </option>
                                <option key='4' value='4'>
                                  4 Month
                                </option>
                                <option key='5' value='5'>
                                  5 Month
                                </option>
                                <option key='6' value='6'>
                                  6 Month
                                </option>
                                <option key='12' value='12'>
                                  12 Month
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col-md-6 col-sm-12'>
                            <div className='form-group'>
                              <label className='control_label'>
                                Warranty Policy{' '}
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
                                id='warrantyPolicy'
                                className={'form-control'}
                                placeholder='Warranty Policy'
                                value={this.state.shops.warrantyPolicy}
                                disabled
                              />
                            </div>
                          </div>
                          <div className='col-md-6 col-sm-12'>
                            <div className='form-group'>
                              <label className='control_label'>
                                Package Weight (kg){' '}
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
                                id='packageWeight'
                                className={'form-control'}
                                value={this.state.shops.packageWeight}
                                placeholder='Package Weight'
                                disabled
                              />
                            </div>
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col-md-12 col-sm-12'>
                            <div className='form-group'>
                              <label className='control_label'>
                                Package Dimensions (cm){' '}
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
                                <div className='col-sm-4'>
                                  <label className='control_label'>
                                    Length (cm){' '}
                                    <span
                                      aria-hidden='true'
                                      style={{
                                        color: 'red',
                                        fontSize: '5',
                                      }}
                                    >
                                      *
                                    </span>
                                  </label>
                                  <input
                                    type='number'
                                    id='packageLength'
                                    className={'form-control'}
                                    placeholder='Length (cm)'
                                    disabled
                                    value={this.state.shops.packageLength}
                                  />
                                </div>
                                <div className='col-sm-4'>
                                  <label className='control_label'>
                                    Width (cm){' '}
                                    <span
                                      aria-hidden='true'
                                      style={{
                                        color: 'red',
                                        fontSize: '5',
                                      }}
                                    >
                                      *
                                    </span>
                                  </label>
                                  <input
                                    type='number'
                                    id='packageWidth'
                                    className={'form-control'}
                                    placeholder='Width (cm)'
                                    disabled
                                    value={this.state.shops.packageWidth}
                                  />
                                </div>
                                <div className='col-sm-4'>
                                  <label className='control_label'>
                                    Height (cm){' '}
                                    <span
                                      aria-hidden='true'
                                      style={{
                                        color: 'red',
                                        fontSize: '5',
                                      }}
                                    >
                                      *
                                    </span>
                                  </label>
                                  <input
                                    type='number'
                                    id='packageHeight'
                                    className={'form-control'}
                                    placeholder='Height (cm)'
                                    disabled
                                    value={this.state.shops.packageHeight}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* //Return Policy End // */}

                    {/* Return Policy Start*/}
                    {
                      <div id='RETURNPOLICY' className='tab-pane fade'>
                        <div className='row'>
                          {this.state.shops.isReturnable === 'N' && (
                            <div className='col-md-12 col-sm-12'>
                              <div className='form-group'>
                                <label className='control_label'>
                                  Product is Not Returnable{' '}
                                </label>
                              </div>
                            </div>
                          )}

                          {this.state.shops.isReturnable === 'Y' && (
                            <div className='col-md-4 col-sm-12'>
                              <div className='form-group'>
                                <label className='control_label'>
                                  Return Duration (Days){' '}
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
                                  placeholder='Enter Return Duration (Days)'
                                  value={this.state.shops.returnDuration || 0}
                                  disabled
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {this.state.shops.isReturnable === 'Y' && (
                          <>
                            <div className='row'>
                              <div className='col-md-10 col-sm-12'>
                                <div className='form-group'>
                                  <label className='control_label'>
                                    Return Poilcy Description{' '}
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
                                  <CKEditor
                                    editor={ClassicEditor}
                                    data={this.state.shops.returnPolicy || ''}
                                    className={'form-control'}
                                    disabled
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    }
                    {/* Return Policy End*/}
                  </div>
                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-dismiss='modal'
                    >
                      Close
                    </button>
                    <button
                      type='button'
                      className='btn btn-primary'
                      onClick={() => this.setApprove(this.state.shops)}
                      data-dismiss='modal'
                    >
                      Approve
                    </button>
                    <button
                      type='button'
                      className='btn btn-danger'
                      onClick={() => this.rejectShop(this.state.shops)}
                      data-dismiss='modal'
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* MODAL END */}
      </>
    )
  }
}
const mapStateToProps = (state) => ({
  products: state.productReducer.pendingProducts,
  loadingInfo: state.productReducer.loading,
  error: state.productReducer.error,
})

// Making available in  props
const mapDispatchToProps = (dispatch) => {
  return {
    approveProductRecord: (data) =>
      dispatch(productAction.approveProductRecord(data)),
    rejectShopRecord: (data) =>
      dispatch(productAction.rejectProductRecord(data)),
    updateProductRemarksRecord: (data) =>
      dispatch(productAction.updateProductRemarksRecord(data)),
    getPendingProductRecord: () =>
      dispatch(productAction.getPendingProductsRecord()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(pendingProductContainer)
