import React, { Component } from "react"
import { connect } from "react-redux"
import * as productVariantAction from "../../../store/actions/productVariantAction"
import "../../../../node_modules/react-summernote/dist/react-summernote.css"
import "bootstrap/js/dist/modal"
import "bootstrap/js/dist/dropdown"
import "bootstrap/js/dist/tooltip"
import CreateProductVariantOptionValue from "../../../components/settings/variant/CreateProductVariantOptionValue"
import { toast, ToastContainer } from "react-toastify"
import authenticationService from "../../../store/services/authenticationService"
import * as productVariantOptionValueAction from "../../../store/actions/productVariantOptionValueAction"

class createProductVariantOptionValueContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      variantOptionId: 0,
      variantOptionName: "",
      variantOptionValue: "",
      productVariantId: 0,
      variantName: "",
      displayOrder: "",
      errorVariantOptionName: "",
      errorVariantName: "",
      errorDisplayOrder: "",

    }
    this.handleChange = this.handleChange.bind(this)
    this.saveProductVariantOptionValue = this.saveProductVariantOptionValue.bind(this)
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()
    if (roleId === "1") {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push("/Login")
    }
    //End Temporary Authentication
    await this.props.getProductVariantRecord()
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ value: e.target.value })
    const { target } = e
    switch (target.name) {
      case "variantName":
        this.setState({
          variantName: target.value,
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
          displayOrder: target.value < 0 ? 0 : target.value,
        })
        break
      default:
    }
  }

  saveProductVariantOptionValue = async (e) => {
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
        toast.success("Product Variant Option Value Created Successfully")
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
        <CreateProductVariantOptionValue
          key="CreateProductVariantOptionValue"
          name="Add Product Variant Option"
          {...this.state}
          handleChange={this.handleChange}
          values={this.values}
          // variants={this.props.variants}
          variants={this.props?.variants.filter(
            (item) => item?.isActive === 'Y'
          )}
          saveProductVariantOptionValue={this.saveProductVariantOptionValue}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.productVariantOptionReducer.data,
  variants: state.productVariantReducer.variants,
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
)(createProductVariantOptionValueContainer)
