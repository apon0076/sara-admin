import React, { Component } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { connect } from "react-redux"
import * as orderAction from "../../store/actions/orderAction"
import authenticationService from "../../store/services/authenticationService"
import CreateOrderType from "../../components/orders/CreateOrderType"


class createOrderTypeAdminContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderStatusTypeId: 0,
      statusTypeName: "",
      isActive: true,
      errorStatusTypeName: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.saveOrderType = this.saveOrderType.bind(this)
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
    const { target } = e
    const { value } = e.target

    switch (target.name) {
      case "statusTypeName":
        this.setState({
          statusTypeName: target.value,
          errorStatusTypeName:
            value.length < 2 ? "Atleast 2 characaters required" : "",
        })
        break

      default:
    }
  }

  handleParentCheck = (e) => {
    const isActive = e.target.checked
    this.setState({ isActive })
  }

  saveOrderType = async (e) => {
    e.preventDefault()
    
    if (this.state.statusTypeName === "") {
      let msg = "Order Type Name is Required!!!"
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    const data = {
      orderStatusTypeId: this.state.orderStatusTypeId,
      statusTypeName: this.state.statusTypeName,
      isActive: this.state.isActive === true ? "Y" : "N",
    }

    const result = await this.props.createOrUpdateOrderStatusTypeRecord(data)

    if (result && result.payload.success.succeed === true) {
      toast.success("Order Type Created Successfully")
      setTimeout(() => {
        this.props.history.push("OrdersTypeList")
      }, 2500)
      this.resetForm()
    } else if (result && result.payload.success.succeed === false) {
      toast.error("Something went wrong, Please try again")
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    } else if (result.type === "CREATE_OR_UPDATE_NEW_ADMIN_SUCCESS") {
      toast.success("Order Type Created Successfully")
      setTimeout(() => {
        this.props.history.push("OrdersTypeList")
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
      statusTypeName: "",
      isActive: true,
      errorStatusTypeName: "",
    })
  }

  render() {
    return (
      <div id="wrapper">
        <CreateOrderType
          key="CreateOrderType"
          name="Add Order Type"
          {...this.state}
          handleChange={this.handleChange}
          handleParentCheck={this.handleParentCheck}
          values={this.values}
          saveOrderType={this.saveOrderType}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.orderReducer.orderStatusType,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createOrUpdateOrderStatusTypeRecord: (data) =>
      dispatch(orderAction.createOrUpdateOrderStatusTypeRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createOrderTypeAdminContainer)
