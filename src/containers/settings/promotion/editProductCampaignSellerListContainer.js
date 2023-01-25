import React, { Component } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { connect } from "react-redux"
import * as productCampaignSellerAction from "../../../store/actions/productCampaignSellerAction"
import authenticationService from "../../../store/services/authenticationService"
import EditProductCampaignSellerList from "../../../components/settings/promotion/EditProductCampaignSellerList"

class editProductCampaignSellerListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      discountSummaryId: null,
      sellerId: null,
      sellerName: null,
      shopId: null,
      shopName: null,
      localCommissionPercentage: null,
      globalCommissionPercentage: null,
      status: null,
      remarks: null,
      errorLocalCommissionPercentage: "",
      errorGlobalCommissionPercentage: "",
      errorRemarks: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.saveProductCampaignSellerList =
    this.saveProductCampaignSellerList.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.handleParentCheck = this.handleParentCheck.bind(this)
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()
    if (roleId === "1") {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
        id: this.props.location.state.rowData.id,
        discountSummaryId: this.props.location.state.rowData.discountSummaryId,
        sellerId: this.props.location.state.rowData.sellerId,
        sellerName: this.props.location.state.rowData.sellerName,
        shopId: this.props.location.state.rowData.shopId,
        shopName: this.props.location.state.rowData.shopName,
        localCommissionPercentage:
          this.props.location.state.rowData.localCommissionPercentage,
        globalCommissionPercentage:
          this.props.location.state.rowData.globalCommissionPercentage,
        status: this.props.location.state.rowData.status === "Y" ? true : false,
        remarks: this.props.location.state.rowData.remarks,
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push("/Login")
    }
    //End Temporary Authentication
  }

  handleParentCheck = (e) => {
    const status = e.target.checked
    this.setState({ status })
  }

  // keyPressed = (e) => {
  //   if (e.key === "Enter") {
  //     this.saveDiscountType(e)
  //   }
  // }

  handleChange = (e) => {
    const { target } = e
    const { value } = e.target
    switch (target.name) {
      case "localCommissionPercentage":
        this.setState({
          localCommissionPercentage: target.value,
          errorLocalCommissionPercentage:
            value.length < 2 ? "Atleast 2 characaters required" : "",
        })
        break
      case "globalCommissionPercentage":
        this.setState({
            globalCommissionPercentage: target.value,
          errorGlobalCommissionPercentage:
            value.length < 2 ? "Atleast 2 characaters required" : "",
        })
        break
      case "remarks":
            this.setState({
                remarks: target.value,
              errorRemarks:
                value.length < 2 ? "Atleast 2 characaters required" : "",
            })
            break
      default:
    }
  }

  saveProductCampaignSellerList = async (e) => {
    e.preventDefault()
    if (this.state.localCommissionPercentage === "") {
      let msg = "Local Commission Percentage Is Required!!!"
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }
    else if (this.state.globalCommissionPercentage === "") {
        let msg = "Global Commission Percentage Is Required!!!"
        toast.error(msg)
        setTimeout(() => {}, 3000)
        return
    }
    // else if (this.state.remarks === "") {
    //     let msg = "Re Is Required!!!"
    //     toast.error(msg)
    //     setTimeout(() => {}, 3000)
    //     return
    // }

    const data = {
      id: this.state.id,
      discountSummaryId: this.state.discountSummaryId,
      sellerId: this.state.sellerId,
      shopId: this.state.shopId,
      localCommissionPercentage: this.state.localCommissionPercentage,
      globalCommissionPercentage: this.state.globalCommissionPercentage,
      status: this.state.status  === true ? "Y" : "N",
      remarks: this.state.remarks,
    }

    const result = await this.props.addOrEditProductCampaignSellerRecord([data])
    
     if (result.type === "ADD_OR_EDIT_PRODUCT_CAMPAIGN_SELLER_SUCCESS") {
      toast.success("Product Seller Campaign Updated Successfully")
      setTimeout(() => {
        this.props.history.push("ProductCampaignSellerList")
      }, 2500)
      this.resetForm()
    } else {
      toast.error("Something went wrong, Please try again")
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    }
  }

  resetForm = () => {
    this.setState({
      productDiscountTypeName: "",
      isActive: "",
      errorDiscountTypeName: "",
    })
  }

  render() {
  
    return (
      <div id="wrapper">
        <ToastContainer autoClose={1500} />
        <EditProductCampaignSellerList
          key="EditDiscountType"
          name="Edit Product Campaign Seller List"
          {...this.state}
          handleChange={this.handleChange}
          handleParentCheck={this.handleParentCheck}
          values={this.values}
          resetForm={this.resetForm}
          saveProductCampaignSellerList={this.saveProductCampaignSellerList}
          value={this.props.location.state.rowData}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.productCampaignSellerReducer.data,
})

const mapDispatchToProps = (dispatch) => {
  return {
    addOrEditProductCampaignSellerRecord: (data) =>
      dispatch(
        productCampaignSellerAction.addOrEditProductCampaignSellerRecord(data)
      ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editProductCampaignSellerListContainer)
