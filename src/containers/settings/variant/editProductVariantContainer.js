import React, { Component } from "react"
import { toast, ToastContainer } from "react-toastify"
import { connect } from "react-redux"
import * as productVariantAction from "../../../store/actions/productVariantAction"
import authenticationService from "../../../store/services/authenticationService"
import EditProductVariant from "../../../components/settings/variant/EditProductVariant"

class editProductVariantContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.saveProductVariant = this.saveProductVariant.bind(this)
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
  }

  saveProductVariant = async (data) => {
    let resultData = {
      productVariantId: data?.productVariantId,
      variantName: data?.variantName,
      variantDescription: data?.variantDescription,
      variantSetupTempleteId: data?.variantSetupTempleteId * 1,
      variantDisplayTempleteId: data?.variantDisplayTempleteId * 1,
      isActive: data?.isActive === true ? "Y" : "N",
      isDelete: data?.isDelete,
      imgChgVariant: data?.imgChgVariant === true ? "Y" : "N",
    }

    const result = await this.props.createProductVariantRecord(resultData)
    if (result.type === "CREATE_PRODUCT_VARIANT_SUCCESS") {
      toast.success("Product Variant Updated Successfully")
      setTimeout(() => {
        this.props.history.push("ProductVariantList")
      }, 2500)
    }
    if (result.type === "CREATE_PRODUCT_VARIANT_ERROR") {
      toast.error("Something Went Wrong! Please Try Again Later...")
      setTimeout(() => {
        this.props.history.push("ProductVariantList");
      }, 2500)
    }
  }

  render() {

    return (
      <div id="wrapper">
        <EditProductVariant
          key="CreateProductVariant"
          name="Add ProductVariant"
          {...this.state}
          saveProductVariant={this.saveProductVariant}
          resetForm={this.resetForm}
          formData={
            this.props?.history?.location?.state &&
            this.props?.history?.location?.state?.rowData &&
            this.props?.history?.location?.state?.rowData
          }
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.productVariantReducer?.data,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createProductVariantRecord: (data) =>
      dispatch(productVariantAction.createProductVariantRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editProductVariantContainer)
