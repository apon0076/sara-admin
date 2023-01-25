import React, { Component } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { connect } from "react-redux"
import * as productAction from "../../../store/actions/productAction"
import * as discountAction from "../../../store/actions/discountAction"
import * as discountTypeAction from "../../../store/actions/discountTypeAction"
import authenticationService from "../../../store/services/authenticationService"
import EditDiscount from "../../../components/settings/discount/EditDiscount"

class editDiscountContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      discountId: 0,

      productId: "",
      selectedProductId: "",
      productName: "",

      discountTypeId: "",
      selectedDiscountTypeId: "",
      discountTypeName: "",

      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",

      discountPercentage: "",

      isActive: true,
      errorDiscountPercentage: "",
      errorProductId: "",
      errorDiscountTypeId: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleStartDate = this.handleStartDate.bind(this)
    this.handleEndDate = this.handleEndDate.bind(this)
    this.updateDiscount = this.updateDiscount.bind(this)
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
        discountId: this.props.location.state.rowData.productDiscountId,
        discountPercentage: this.props.location.state.rowData.productDiscountPercentage,
        startDate: this.props.location.state.rowData.discountStartDate,
        endDate: this.props.location.state.rowData.discountEndDate,
        startTime: this.props.location.state.rowData.discountStartTime,
        endTime: this.props.location.state.rowData.discountEndTime,
        productId: this.props.location.state.rowData.productId,
        productName: this.props.location.state.rowData.productName,
        discountTypeId: this.props.location.state.rowData.discountTypeId,
        discountTypeName: this.props.location.state.rowData.discountTypeName,
        isActive: this.props.location.state.rowData.isActive === "Y" ? true : false
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push("/Login")
    }
    //End Temporary Authentication

    await this.props.getDiscountTypeRecord()
    await this.props.getProductRecord()
  }

  handleParentCheck = (e) => {
    const isActive = e.target.checked;
    this.setState({ isActive });
  };

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.saveDiscountType(e)
    }
  }

  handleChange = (e) => {
    const { target } = e
    const { value } = e.target
    switch (target.name) {
      case "selectedProductId":
        this.setState({
          selectedProductId: target.value,
          productId: target.value.productId,
        })
        break
      case "productName":
        this.setState({ productName: target.value })
        break
      case "selectedDiscountTypeId":
        this.setState({
          selectedDiscountTypeId: target.value,
          discountTypeId: target.value.productDiscountTypeId,
        })
        break
      case "discountTypeName":
        this.setState({ discountTypeName: target.value })
        break
      case "discountPercentage":
        this.setState({
          discountPercentage: target.value,
          errorDiscountPercentage:
            value.length < 2 ? "Atleast 2 characaters required" : "",
        })
        break
      default:
    }
  }

  handleStartDate = (date, dateString) => {

    this.setState({
      startDate: dateString,
    })
  }

  handleEndDate = (date, dateString) => {

    this.setState({
      endDate: dateString,
    })
  }

  updateDiscount = async (e) => {
    e.preventDefault()
    if (this.state.discountPercentage === "") {
      let msg = "Discount Parcentage Is Required!!!"
      toast.error(msg)
      setTimeout(() => { }, 3000)
      return
    }

    if (this.state.productId === "") {
      let msg = "Product Name Is Required!!!"
      toast.error(msg)
      setTimeout(() => { }, 3000)
      return
    }

    if (this.state.discountTypeId === "") {
      let msg = "Discount Type Id Is Required!!!"
      toast.error(msg)
      setTimeout(() => { }, 3000)
      return
    }

    const data = {
      discountId: this.state.discountId,
      discountPercentage: this.state.discountPercentage,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      productId: this.state.productId,
      discountTypeId: this.state.discountTypeId,
      isActive: this.state.isActive === true ? "Y" : "N",
    }

    const result = await this.props.updateDiscountRecord(data)

    if (result && result.payload.success.succeed === true) {
      toast.success("Discount Updated Successfully")
      setTimeout(() => {
        this.props.history.push("DiscountList")
      }, 2500)
      this.resetForm()
    } else if (result && result.payload.success.succeed === false) {
      toast.error("Something went wrong, Please try again")
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    } else if (result.type === "UPDATE_DISCOUNT_SUCCESS") {
      toast.success("Discount Updated Successfully")
      setTimeout(() => {
        this.props.history.push("DiscountList")
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
      discountId: "",
      discountPercentage: "",
      startDate: new Date(),
      endDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      productId: "",
      productName: "",
      discountTypeId: "",
      isActive: "",
      errorDiscountId: "",
      errorDiscountPercentage: "",
      errorProductId: "",
      errorDiscountTypeId: "",
    })
  }

  render() {

    return (
      <div id="wrapper">
        <ToastContainer autoClose={1500} />
        <EditDiscount
          key="EditDiscount"
          name="Edit Discount"
          {...this.state}
          handleChange={this.handleChange}
          handleStartDate={this.handleStartDate}
          handleEndDate={this.handleEndDate}
          handleStartTime={this.handleStartTime}
          handleEndTime={this.handleEndTime}
          handleParentCheck={this.handleParentCheck}
          values={this.values}
          updateDiscount={this.updateDiscount}
          resetForm={this.resetForm}
          products={this.props.products}
          discountTypes={this.props.discountTypes}
          value={this.props.location.state.rowData}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.discountReducer.data,
  discountTypes: state.discountTypeReducer.discountTypes,
  products: state.productReducer.products,
})


const mapDispatchToProps = (dispatch) => {
  return {
    updateDiscountRecord: (data) =>
      dispatch(discountAction.updateDiscountRecord(data)),
    getDiscountTypeRecord: () =>
      dispatch(discountTypeAction.getDiscountTypeRecord()),
    getProductRecord: () =>
      dispatch(productAction.getProductRecord()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editDiscountContainer)
