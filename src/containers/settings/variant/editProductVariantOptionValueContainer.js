import React, { Component } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { connect } from "react-redux"
import EditProductVariantOptionValue from "../../../components/settings/variant/EditProductVariantOptionValue"
import authenticationService from "../../../store/services/authenticationService"
import * as productVariantOptionValueAction from "../../../store/actions/productVariantOptionValueAction"
import * as productVariantAction from "../../../store/actions/productVariantAction"

class editProductVariantOptionValueContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
        variantOptionId: 0,
        variantOptionName: "",
        variantOptionValue: "",
        productVariantId: "",
        selectedProductVariantId: "",
        variantName: "",
        displayOrder: "",
        errorVariantOptionName: "",
        errorVariantName: "",
        errorDisplayOrder: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.updateProductVariantOptionValue = this.updateProductVariantOptionValue.bind(this)
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()
    if (roleId === "1") {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
        variantOptionId: this.props?.location?.state?.rowData?.variantOptionId,
        variantOptionName: this.props?.location?.state?.rowData?.variantOptionName,
        variantOptionValue: this.props?.location?.state?.rowData?.variantOptionValue,
        productVariantId: this.props?.location?.state?.rowData?.productVariantId,
        variantName: this.props?.location?.state?.rowData?.variantName,
        displayOrder: this.props?.location?.state?.rowData?.displayOrder,
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

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ value: e.target.value })
    const { target } = e
    switch (target.name) {
      case "variantName":
        this.setState({
          variantName: target.value,
          errorVariantName: target.value.length < 4 ? "Atleast 4 characaters required" : "",
        })
        break
      case "productVariantId":
        this.setState({ productVariantId: target.value })
        break
      case "selectedProductVariantId":
        this.setState({
          selectedProductVariantId: target.value,
          productVariantId: target.value?.productVariantId,
          errorVariantName: target.value.length < 1 ? "Select one variant" : ""
        })
        break
      case "variantOptionName":
        this.setState({
          variantOptionName: e.target.value
        })
        break
      case "variantOptionValue":
        this.setState({
          variantOptionValue: e.target.value
        })
        break
      case "displayOrder":
        this.setState({
          displayOrder: e.target.value < 0 ? 0 : e.target.value,
          errorDisplayOrder: target.value.length < 1 ? "Select one variant" : ""
        })
        break
      default:
    }
  }

  updateProductVariantOptionValue = async (e) => {
    e.preventDefault()
    if (this.state?.productVariantId === "") {
      let msg = "Variant Name Is Required!!!"
      toast.error(msg)
      setTimeout(() => { }, 3000)
      return
    }

    if (this.state?.variantOptionName === "") {
      let msg = "Variant Attribute Is Required!!!"
      toast.error(msg)
      setTimeout(() => { }, 3000)
      return
    }

    if (this.state?.displayOrder === "") {
      let msg = "Display Order Number Is Required!!!"
      toast.error(msg)
      setTimeout(() => { }, 3000)
      return
    }

    const data = {
      variantOptionId: this.state?.variantOptionId,
      variantOptionName: this.state?.variantOptionName,
      variantOptionValue: this.state?.variantOptionValue,
      productVariantId: this.state?.productVariantId,
      displayOrder: this.state?.displayOrder,
    }

    const result = await this.props.createProductVariantOptionValueRecord(data)

    if (result && result?.payload?.success?.succeed === true) {
      if (result.type === "CREATE_PRODUCT_VARIANT_OPTION_VALUE_SUCCESS") {
        toast.success("Product Variant Option Value Updated Successfully")
        setTimeout(() => {
          this.props.history.push("ProductVariantOptionValueList")
        }, 2500)
        this.clearData()
      } else {
        toast.error("Something went wrong, Please try again")
        setTimeout(() => {
          this.clearData()
          this.props.history.push("CreateProductVariantOptionValue")
        }, 2500)
      }
    } else if (result && result?.payload?.success?.succeed === false) {
      toast.error("Variant Option Value Already Exists!")
      setTimeout(() => { }, 2500)
    }
  }

  clearData = (e) => {
    this.setState({
      variantOptionId: 0,
      variantOptionName: "",
      variantOptionValue: "",
      productVariantId: 0,
      variantName: "",
      displayOrder: "",
      errorVariantOptionName: "",
      errorVariantName: "",
      errorDisplayOrder: "",
    })
  }

  render() {
    return (
      <div id="wrapper">
        <ToastContainer autoClose={1500} />
        <EditProductVariantOptionValue
          key="EditProductVariantOptionValue"
          name="Edit Product Variant Option"
          {...this.state}
          handleChange={this.handleChange}
          values={this.values}
          variants={this.props?.variants}
          updateProductVariantOptionValue={this.updateProductVariantOptionValue}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    data: state.productVariantOptionReducer?.data,
    variants: state.productVariantReducer?.variants
})

const mapDispatchToProps = (dispatch) => {
  return {
    getProductVariantRecord: () =>
      dispatch(productVariantAction.getProductVariantRecord()),
    createProductVariantOptionValueRecord: (data) =>
      dispatch(productVariantOptionValueAction.createProductVariantOptionValueRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editProductVariantOptionValueContainer)
