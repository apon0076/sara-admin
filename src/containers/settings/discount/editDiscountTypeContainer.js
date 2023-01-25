import React, { Component } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { connect } from "react-redux"
import * as discountTypeAction from "../../../store/actions/discountTypeAction"
import authenticationService from "../../../store/services/authenticationService"
import EditDiscountType from "../../../components/settings/discount/EditDiscountType"

class editDiscountTypeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productDiscountTypeId: 0,
      productDiscountTypeName: "",
      isActive: true,
      errorDiscountTypeName: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.saveDiscountType = this.saveDiscountType.bind(this)
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
        productDiscountTypeId: this.props.location.state.rowData.productDiscountTypeId,
        productDiscountTypeName: this.props.location.state.rowData.productDiscountTypeName,
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
  }

  handleParentCheck = (e) => {
    const isActive = e.target.checked;
    this.setState({ isActive });
  };

  handleChange = (e) => {
    const { target } = e
    const { value } = e.target
    switch (target.name) {
      case "productDiscountTypeName":
        this.setState({
          productDiscountTypeName: target.value,
          errorDiscountTypeName:
            value.length < 2 ? "Atleast 2 characaters required" : "",
        })
        break
      default:
    }
  }

  saveDiscountType = async (e) => {
    e.preventDefault()
    if (this.state.productDiscountTypeName === "") {
      let msg = "Discount Type Name Is Required!!!"
      toast.error(msg)
      setTimeout(() => { }, 3000)
      return
    }

    const data = {
      productDiscountTypeId: this.state.productDiscountTypeId,
      productDiscountTypeName: this.state.productDiscountTypeName,
      isActive: this.state.isActive === true ? "Y" : "N",
    }

    const result = await this.props.updateDiscountTypeRecord(data)

    if (result && result.payload.success.succeed === true) {
      toast.success("Discount Type Updated Successfully")
      setTimeout(() => {
        this.props.history.push("DiscountTypeList")
      }, 2500)
      this.resetForm()
    } else if (result && result.payload.success.succeed === false) {
      toast.error("Something went wrong, Please try again")
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    } else if (result.type === "UPDATE_DISCOUNT_TYPE_SUCCESS") {
      toast.success("Discount Type Updated Successfully")
      setTimeout(() => {
        this.props.history.push("DiscountTypeList")
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
        <EditDiscountType
          key="EditDiscountType"
          name="Edit Discount Type"
          {...this.state}
          handleChange={this.handleChange}
          handleParentCheck={this.handleParentCheck}
          values={this.values}
          resetForm={this.resetForm}
          saveDiscountType={this.saveDiscountType}
          value={this.props.location.state.rowData}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.discountTypeReducer.data,
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateDiscountTypeRecord: (data) =>
      dispatch(discountTypeAction.updateDiscountTypeRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editDiscountTypeContainer)
