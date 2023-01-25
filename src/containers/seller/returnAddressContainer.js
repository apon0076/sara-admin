import React, { Component } from "react"
import { connect } from "react-redux"
import * as sellerProfileAction from "../../store/actions/sellerProfileAction"
import authenticationService from "../../store/services/authenticationService"
import { toast, ToastContainer } from "react-toastify"
import ReturnAddress from "../../components/seller/ReturnAddress"

class returnAddressContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sellerAddressId: 0,
      fullName: "",
      address: "",
      phoneNo: "",
      postCode: "",
      division: "",
      city: "",
      addressTypeId: 2,
      shopId: "",
      sellerId: "",
      isActive: true,
      isApprove: true,
      status: true,
      isError: {
        fullName: "",
        address: "",
        phoneNo: "",
        postCode: "",
        division: "",
        city: "",
      },
    }
    this.handleChange = this.handleChange.bind(this)
    this.saveAdddress = this.saveAdddress.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()
    if (roleId === "2") {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
        sellerId: this.props.sellerProfileById.sellerId,
        shopId: this.props.sellerProfileById.shopId,
        addressTypeId: 2,
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push("/SellerLogin")
    }
    //End Temporary Authentication

    let shopId = this.props.sellerProfileById.shopId
    let addressTypeId = 2
    await this.props.getAddressByShopIdRecord(shopId, addressTypeId)
    {
      this.props.sellerAddressById.map((data) => (
        this.setState({
          sellerAddressId: data.sellerAddressId,
          fullName: data.fullName,
          address: data.address,
          phoneNo: data.phoneNo,
          postCode: data.postCode,
          division: data.division,
          city: data.city,
          isActive: data.isActive,
          isApprove: data.isApprove,
          status: data.status,
          addressTypeId: 2
        })
      ))
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    let isError = { ...this.state.isError }
    switch (name) {
      case "fullName":
        isError.fullName =
          value.length < 2 ? "Atleast 2 characaters required" : ""
        break
      case "address":
        isError.address =
          value.length < 2 ? "Atleast 2 characaters required" : ""
        break
      case "phoneNo":
        isError.phoneNo =
          value.length < 11 ? "Atleast 11 characaters required" : ""
        break
      case "postCode":
        isError.postCode =
          value.length < 4 ? "Atleast 4 characaters required" : ""
        break
      case "division":
        isError.division =
          value.length < 2 ? "Atleast 2 characaters required" : ""
        break
      case "city":
        isError.city =
          value.length < 2 ? "Atleast 2 characaters required" : ""
        break
      default:
        break
    }
    this.setState({
      isError,
      [name]: value,
    })
  }

  saveAdddress = async (e) => {
    e.preventDefault()
    if (this.state.fullName === "") {
      toast.error("Full name is requeired")
      setTimeout(() => { }, 2500)
      return
    }

    if (this.state.address === "") {
      toast.error("Address is requeired")
      setTimeout(() => { }, 2500)
      return
    }

    if (this.state.phoneNo === "") {
      toast.error("Phone no is requeired")
      setTimeout(() => { }, 2500)
      return
    }

    if (this.state.postCode === "") {
      toast.error("Post code is requeired")
      setTimeout(() => { }, 2500)
      return
    }

    if (this.state.division === "") {
      toast.error("Division is requeired")
      setTimeout(() => { }, 2500)
      return
    }

    if (this.state.city === "") {
      toast.error("City is requeired")
      setTimeout(() => { }, 2500)
      return
    }

    const data = {
      sellerAddressId: this.state.sellerAddressId,
      fullName: this.state.fullName,
      address: this.state.address,
      phoneNo: this.state.phoneNo,
      postCode: this.state.postCode,
      division: this.state.division,
      city: this.state.city,
      addressTypeId: this.state.addressTypeId,
      shopId: this.state.shopId,
      sellerId: this.state.sellerId,
      sellerId: this.state.sellerId,
      isActive: this.state.isActive === true ? "Y" : "N",
      isApprove: this.state.isApprove === true ? "Y" : "N",
      status: this.state.status === true ? "Y" : "N"
    }

    const result = await this.props.createSellerAddressRecord(data)

    if (result && result.payload.success.succeed === true) {
      toast.success("Return Address Updated Successfully")
      setTimeout(() => {
        this.props.history.push("SellerHome")
      }, 2500)
      // this.resetForm()
    } else if (result && result.payload.success.succeed === false) {
      toast.error("Something went wrong, Please try again")
      setTimeout(() => {
        // this.resetForm()
      }, 2500)
    } else if (result.type === "CREATE_SELLER_ADDRESS_SUCCESS") {
      toast.success("Return Address Updated Successfully")
      setTimeout(() => {
        this.props.history.push("SellerHome")
      }, 2500)
      // this.resetForm()
    } else {
      toast.error("Something went wrong, Please try again")
      setTimeout(() => {
        // this.resetForm()
      }, 2500)
    }
  }

  resetForm = () => {
    this.setState({
      fullName: "",
      address: "",
      phoneNo: "",
      postCode: "",
      division: "",
      city: "",
      isError: {
        fullName: "",
        address: "",
        phoneNo: "",
        postCode: "",
        division: "",
        city: "",
      },
    })
  }

  render() {
    return (
      <div id="wrapper">
        <ReturnAddress
          {...this.state}
          key="ReturnAddress"
          name="ReturnAddress"
          handleChange={this.handleChange}
          saveAdddress={this.saveAdddress}
          resetForm={this.resetForm}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sellerAddressById: state.sellerProfileReducer.sellerAddressById,
  sellerProfileById: state.sellerProfileReducer.sellerProfileById,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createSellerAddressRecord: (data) =>
      dispatch(sellerProfileAction.createSellerAddressRecord(data)),
    getAddressByShopIdRecord: (shopId, addressTypeId) =>
      dispatch(sellerProfileAction.getAddressByShopIdRecord(shopId, addressTypeId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(returnAddressContainer)
