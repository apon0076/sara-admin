import React, { Component } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { connect } from "react-redux"
import * as discountTypeAction from "../../../store/actions/discountTypeAction"
import authenticationService from "../../../store/services/authenticationService"
import CreateDiscountType from "../../../components/settings/discount/CreateDiscountType"

// Called from containers/index.js
class createDiscountTypeContainer extends Component {
  constructor(props) {
    super(props)
    // For state initial value ( Alternative to useState variable part with initial value)
    this.state = {
      productDiscountTypeId: 0,
      productDiscountTypeName: "",
      isActive: true,
      errorDiscountTypeName: "",
    }

    // Need to bind all the methods within this
    this.handleChange = this.handleChange.bind(this)
    this.saveDiscountType = this.saveDiscountType.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.handleParentCheck = this.handleParentCheck.bind(this)
  }

  // This method calls as first method like useEffect
  componentDidMount = async () => {
    //Begin Authentication
    let roleId = authenticationService.getRoleId();
    // roleId = 1 means admin login and roleId = 2 means seller login
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
    //End Authentication
  }

  // After giving input, Press enter
  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.saveDiscountType(e)
    }
  }

  handleChange = (e) => {
    const { target } = e;
    const { value } = e.target;
    switch (target.name) {
      // Getting this name value from (Component) CreateDiscountType ( input > name)
      case "productDiscountTypeName":
         // For state setter function ( Alternative to useState setMethod part ( Multiple method ))
        this.setState({
          productDiscountTypeName: target.value,
          errorDiscountTypeName:
            // If input is less then 2 character it shows error
            value.length < 2 ? "Atleast 2 characaters required" : "",
        })
        break
      default:
    }
  }

  // For getting, CheckBox value ( true / false )
  handleParentCheck = (e) => {
    const isActive = e.target.checked
    this.setState({ isActive })
  }

  // This method calls after pressing save method
  saveDiscountType = async (e) => {
    e.preventDefault()
    // Triggers if input field is empty
    if (this.state.productDiscountTypeName === "") {
      let msg = "Discount Type Name Is Required!!!"
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    // Data Object to send
    const data = {
      productDiscountTypeId: this.state.productDiscountTypeId,
      productDiscountTypeName: this.state.productDiscountTypeName,
      isActive: this.state.isActive === true ? "Y" : "N",
    }

    // Calling Redux action 'discountTypeAction'
    const result = await this.props.createDiscountTypeRecord(data)

    // Getting the success check and after success it pushes to 'DiscountTypeList' component
    // Check success using payload
    if (result && result.payload.success.succeed === true) {
      toast.success("Discount Type Created Successfully")
      setTimeout(() => {
        this.props.history.push("DiscountTypeList")
      }, 2500)
      this.resetForm()
    } 
    // Check not success using payload
    else if (result && result.payload.success.succeed === false) {
      toast.error("Something went wrong, Please try again")
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    } 
    // Check success using type
    else if (result.type === "CREATE_DISCOUNT_TYPE_SUCCESS") {
      toast.success("Discount Type Created Successfully")
      setTimeout(() => {
        this.props.history.push("DiscountTypeList")
      }, 2500)
      this.resetForm()
    } 
    // success is falsed
    else {
      toast.error("Something went wrong, Please try again")
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    }
  }

  // Clear form input value
  resetForm = () => {
    this.setState({
      productDiscountTypeName: "",
      isActive: true,
      errorDiscountTypeName: "",
    })
  }

  render() {
    
    return (
      <div id="wrapper">
        {/* Calling 'CreateDiscountType' component with props */}
        <CreateDiscountType
          key="CreateDiscountType"
          name="Add Discount Type"
          {...this.state}
          handleChange={this.handleChange}
          handleParentCheck={this.handleParentCheck}
          values={this.values}
          saveDiscountType={this.saveDiscountType}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

// Calling redux reducer
const mapStateToProps = (state) => ({
  data: state.discountTypeReducer.data,
})

// Calling redux action
const mapDispatchToProps = (dispatch) => {
  return {
    createDiscountTypeRecord: (data) =>
      dispatch(discountTypeAction.createDiscountTypeRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createDiscountTypeContainer)
