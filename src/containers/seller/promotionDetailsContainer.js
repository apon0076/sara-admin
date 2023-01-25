import React, { Component } from "react"
import { toast, ToastContainer } from "react-toastify"
import { connect } from "react-redux"
import * as promotionAction from "../../store/actions/productAction"
import * as sellerProfileAction from "../../store/actions/sellerProfileAction"
import * as productAction from "../../store/actions/productAction"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Button } from "primereact/button"
import { Toast } from "primereact/toast"
import { Toolbar } from "primereact/toolbar"
import { Link } from "react-router-dom"
import { InputText } from "primereact/inputtext"
import authenticationService from "../../store/services/authenticationService"
import { PromotionDetails } from "../../components/seller/PromotionDetails"
import baseUrl from "../../utils/baseUrl"
import sellerService from "../../store/services/sellerService"
import { InputNumber } from "primereact/inputnumber"

class PromotionDetailsContainer extends Component {
  constructor(props) {

    super(props)
    this.state = {
      promotions: null,
      selectedPromotions: null,
      globalFilter: null,
      loading: false,
      position: "center",
      products: null,
      shopProducts: null,
      input: null,
      parcentage: null,
      result: null,
    }
    this.promotionDetails = new PromotionDetails()
    this.nameTemplate = this.nameTemplate.bind(this)
    this.startDateTemplate = this.startDateTemplate.bind(this)
    this.endDateTemplate = this.endDateTemplate.bind(this)
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this)
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this)
    this.onIndexTemplate = this.onIndexTemplate.bind(this)
    this.rightToolbarTemplate = this.rightToolbarTemplate.bind(this)
    this.deleteDiscountType = this.deleteDiscountType.bind(this)
    this.promotionImageUrlTemplate = this.promotionImageUrlTemplate.bind(this)
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let userId = sellerService.getEmployeeId()
    let roleId = authenticationService.getRoleId()

    if (roleId === "2") {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push("/SellerLogin")
    }
    //End Temporary Authentication
    await this.props.getShopDetailsBySellerIdRecord(userId)

    this.props.sellerProfile[0] &&
      this.setState({
        shopId: this.props.sellerProfile[0].shopId,
      })

    let id = this.state.shopId
    await this.props.getSellerPromotionalProductsRecord(id)

    this.setState({
      products: this.props.products,
    })


    this.promotionDetails
      .getPromotionRecord()
      .then((data) => this.setState({ promotions: data }))
  }

  // Prime React Editable Table Start
  onEditorValueChange = (productKey, props, value, products) => {
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex][props.field] = value;
    this.setState({ [`${productKey}`]: updatedProducts });

    // let discount = {[`${products.maxPrice}`] * (value/100)};
    this.setState({parcentage: value})
    // let discount = [`${products.maxPrice}`] * (this.state.parcentage/100)
}



inputTextEditor = (productKey, props, field) => {
    return <InputText type="text" value={props.rowData[field]} onChange={(e) => this.onEditorValueChange(productKey, props, e.target.value)} />;
}

maxPriceEditor = (productKey, props) => {
    return <InputNumber value={props.rowData['maxPrice']} onValueChange={(e) => this.onEditorValueChange(productKey, props, e.value)} mode="currency" currency="BDT" locale="en-US" />
}

discountParcentageEditor = (productKey, props) => {
  //this.setState({parcentage: value})
  const discount = [`${props.maxPrice}`] * (this.state.parcentage/100)
  return (
    <InputNumber value={props.rowData['discountParcentage']} onValueChange={(e) => this.onEditorValueChange(productKey, props, e.value)}  />
 
  )
}



  // Prime React Editable Table End

  sellerProductImage = (products) => {
    return (
      <React.Fragment>
        <img
          src={baseUrl.concat(products.thumbnailImage)}
          className="thumb-pic product-image"
          style={{ width: "50px", height: "50px", borderRadius: "5px" }}
          alt="img"
          
        />
      </React.Fragment>
    )
  }

  promotionImageUrlTemplate = (rowData) => {
    return (
      <React.Fragment>
        <img
          src={baseUrl.concat(rowData.image)}
          className="thumb-pic product-image"
          alt="img"
          style={{ verticalAlign: "middle" }}
        />
      </React.Fragment>
    )
  }

  nameTemplate = (rowData) => {
    return <React.Fragment>{rowData.name}</React.Fragment>
  }

  startDateTemplate = (rowData) => {
    return <React.Fragment>{rowData.startDate.slice(0, 10)}</React.Fragment>
  }

  startTimeTemplate = (rowData) => {
    return <React.Fragment>{rowData.startDate.slice(12, 16)}</React.Fragment>
  }

  endDateTemplate = (rowData) => {
    return <React.Fragment>{rowData.endDate.slice(0, 10)}</React.Fragment>
  }

  endTimeTemplate = (rowData) => {
    return <React.Fragment>{rowData.endDate.slice(12, 16)}</React.Fragment>
  }

  statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="p-column-title">Status</span>
        <span
          className={
            rowData.isActive === "Y"
              ? "p-tag p-tag-primary"
              : "p-tag p-tag-warning"
          }
        >
          {rowData.isActive === "Y" ? "ACTIVE" : "INACTIVE"}
        </span>
      </React.Fragment>
    )
  }

  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Toast ref={(el) => (this.toast = el)} />
        <span className="p-column-title">Action</span>
        <span className="p-buttonset">
          <Button
            label="Details"
            data-toggle="modal"
            data-target="#detailsModal"
            onClick={() => this.setState({ shopProducts: this.state.products })}
            style={{ marginRight: "2px" }}
          />
        </span>
      </React.Fragment>
    )
  }

  onIndexTemplate = (rowData, props) => {
    return props.rowIndex + 1
  }

  deleteDiscountType = async (data) => {
    const resultData = {
      productDiscountTypeId: data.productDiscountTypeId,
      productDiscountTypeName: data.productDiscountTypeName,
      isActive: "D",
    }

    await this.props.createPromotionRecord(resultData)
    window.location.reload(true)
    this.setState({
      loading: true,
    })
    this.showTrue(true)
  }

  rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Link to="/CreatePromotion">
          <div className="button-demo">
            <Button
              icon="pi pi-times"
              className="p-button-rounded p-button-danger p-button-outlined"
            />
          </div>
        </Link>
      </React.Fragment>
    )
  }

  leftToolbarTemplate() {
    return (
      <React.Fragment>
        <div className="p-text-bold table-heading-style">
          List of Promotions
        </div>
      </React.Fragment>
    )
  }

  renderHeader() {
    return (
      <>
        <div className="table-header">
          <span className="p-input-icon-left">
            <InputText
              type="search"
              className="form-control text-center text-field"
              onInput={(e) => this.setState({ globalFilter: e.target.value })}
              placeholder="Search by promotion list name"
            />
          </span>
        </div>
      </>
    )
  }

 

  render() {
    const header = this.renderHeader()

    return (
      <>
        <div className="page-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12">
                <div className="white-box">
                  <div className="datatable-doc-demo datatable-responsive-demo">
                    <div className="card">
                      <Toolbar
                        className="p-mb-4"
                        right={this.rightToolbarTemplate}
                        left={this.leftToolbarTemplate}
                      ></Toolbar>
                      <DataTable
                        header={header}
                        ref={(el) => (this.dt = el)}
                        value={this.state.promotions}
                        // header={header}
                        className="p-datatable-customers p-datatable-responsive-demo"
                        dataKey="id"
                        rowHover
                        globalFilter={this.state.globalFilter}
                        selection={this.state.selectedPromotions}
                        onSelectionChange={(e) =>
                          this.setState({ selectedPromotions: e.value })
                        }
                        paginator
                        rows={10}
                        emptyMessage="No promotion data found"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[10, 25, 50]}
                        {...this.state}
                        promotions={this.props.promotions}
                        values={this.values}
                        loading={this.state.loading}
                      >
                        <Column
                          field="Index"
                          header="SN"
                          body={this.onIndexTemplate}
                        />
                        <Column
                          sortField="name"
                          filterField="name"
                          header="Promotion Name"
                          body={this.nameTemplate}
                          sortable
                        />

                        <Column
                          sortField="startDate"
                          filterField="startDate"
                          header="Start Date"
                          body={this.startDateTemplate}
                          sortable
                        />

                        <Column
                          sortField="startTime"
                          filterField="startTime"
                          header="Start Time"
                          body={this.startTimeTemplate}
                          sortable
                        />

                        <Column
                          sortField="endDate"
                          filterField="endDate"
                          header="End Date"
                          body={this.endDateTemplate}
                          sortable
                        />

                        <Column
                          sortField="endTime"
                          filterField="endTime"
                          header="End Time"
                          body={this.endTimeTemplate}
                          sortable
                        />

                        <Column
                          sortField="promotionLogo"
                          filterField="promotionLogo"
                          header="Promotion Logo"
                          body={this.promotionImageUrlTemplate}
                          sortable
                        />

                        <Column
                          sortField="isActive"
                          header="Status"
                          body={this.statusBodyTemplate}
                          sortable
                        />
                        <Column
                          field="action"
                          header="Action"
                          body={this.actionBodyTemplate}
                        />
                      </DataTable>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL */}
        <div
          className="modal fade "
          id="detailsModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div
              className="modal-content"
              // style={{ height: " 90vh", width: " 60vw" }}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="exampleModalLongTitle">
                  Seller Information
                </h6>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Category Name</th>
                      <th>Product Description</th>
                      <th>Product Price</th>
                      <th>Price Difference</th>
                      <th>Discount Parcentage</th>
                      <th>Offer Price</th>
                      <th>Product Image</th>
                    </tr>
                  </thead>

                  {this.state.shopProducts &&
                    this.state.shopProducts.map((data, index) => {
                      return (
                        <React.Fragment>
                          <tbody>
                            <tr key={index}>
                              <td>{data.productName}</td>

                              <td>{data.categoryName}</td>
                              <td>{data.metaKeywords}</td>
                              <td>{data.maxPrice}</td>
                              <td>&#62;</td>
                              <td>
                                <input
                                  type="text"
                                  id="discount"
                                  placeholder="Discount(%)"
                                  className="form-control "
                                  value={this.state.input}
                                  onChange={this.handleChange}
                                />
                                <br />
                                <button
                                  id={index}
                                  className="btn btn-primary"
                                  style={{ marginLeft: "20px" }}
                                  onClick={() =>
                                    this.setState({ discount: data })
                                  }
                                >
                                  Add
                                </button>
                              </td>
                              <td></td>
                              <td colSpan="25%">
                                <img
                                  src={baseUrl.concat(data.thumbnailImage)}
                                  alt="img"
                                  height="98px"
                                  width="98px"
                                  style={{
                                    borderRadius: "10px",
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                  }}
                                />
                              </td>
                            </tr>
                            <tr></tr>
                          </tbody>
                        </React.Fragment>
                      )
                    })}
                </table>
                {/* Prime React Editable Table Start */}
                <div className="datatable-editing-demo datatable-responsive-demo">
                  <Toast ref={(el) => (this.toast = el)} />

                  <div className="card">
                    <DataTable
                      value={this.state.products}
                      editMode="cell"
                      className="editable-cells-table"
                    >
                      <Column
                        field="productName"
                        header="Product Name"
                      ></Column>
                      <Column
                        field="metaKeywords"
                        header="Product Description"
                      ></Column>
                      
                      <Column
                        field="maxPrice"
                        header="Product Price"
                        editor={(props) => this.maxPriceEditor("products", props)}
                      ></Column>
                      <Column
                        field="result"
                        header="Discount Parcentage"
                        editor={(props) => this.discountParcentageEditor("discountParcentage", props)}
                        onClick ={this.handleChange}
                      ></Column>
                      <Column
                        field="discountPrice"
                        header="Discount Price"
                        value={this.state.result}
                      ></Column>
                      <Column
                        field="thumbnailImage"
                        header="Product Image"
                        body={this.sellerProductImage}
                      ></Column>
                    </DataTable>
                  </div>
                </div>
                {/* Prime React Editable Table End */}
              </div>
            </div>
          </div>
        </div>
        {/* MODAL END */}

        <ToastContainer autoClose={1500} />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  sellerProfile: state.sellerProfileReducer.shopDetails,
  promotions: state.promotionReducer.promotions,
  products: state.productReducer.sellerPromotionalProducts,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getShopDetailsBySellerIdRecord: (index) =>
      dispatch(sellerProfileAction.getShopDetailsBySellerIdRecord(index)),

    getSellerPromotionalProductsRecord: (shopId) =>
      dispatch(productAction.getSellerPromotionalProductsRecord(shopId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PromotionDetailsContainer)
