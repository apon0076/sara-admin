import React, { Component } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { connect } from "react-redux"
import * as discountSummaryAction from "../../../store/actions/discountSummaryAction"
import * as discountTypeAction from "../../../store/actions/discountTypeAction"
import authenticationService from "../../../store/services/authenticationService"
import EditDiscountSummary from "../../../components/settings/discount/EditDiscountSummary"
import Resizer from "react-image-file-resizer"

class editDiscountSummaryContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      discountSummaryId: 0,

      discountTypeId: "",
      selectedDiscountTypeId: "",
      discountTypeName: "",

      name: "",
      image: "",
      showFile: "",
      file: "", // to store the Single pictures in base64 format.
      files: [],
      fileName: "",

      startDate: "",
      endDate: "",
      regEndDate: "",
      isActive: true,
      discountAmount: "",
      discountPercent: "",
      errorName: "",
      errorDiscountAmount: "",
      errorDiscountPercent: "",
      errorProductId: "",
      errorDiscountTypeId: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
    this.handleStartDate = this.handleStartDate.bind(this)
    this.handleEndDate = this.handleEndDate.bind(this)
    this.handleRegEndDate = this.handleRegEndDate.bind(this)
    this.saveDiscount = this.saveDiscount.bind(this)
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
        discountSummaryId: this.props.location.state.rowData.discountSummaryId,
        discountTypeId: this.props.location.state.rowData.discountTypeId,
        discountTypeName: this.props.location.state.rowData.discountTypeName,
        name: this.props.location.state.rowData.name,
        discountAmount: this.props.location.state.rowData.discountAmount,
        discountPercent: this.props.location.state.rowData.discountPercent,
        image: this.props.location.state.rowData.image,
        startDate: this.props.location.state.rowData.startDate,
        endDate: this.props.location.state.rowData.endDate,
        regEndDate: this.props.location.state.rowData.regEndDate,
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
  }

  handleChange = (e) => {
    const { target } = e
    const { value } = e.target

    switch (target.name) {
      case "name":
        this.setState({
          name: target.value,
          errorName: value.length < 1 ? "Atleast 1 characaters required" : "",
        })
        break
      case "discountAmount":
        this.setState({
          discountAmount: target.value,
          errorDiscountAmount:
            value.length < 1 ? "Atleast 1 characaters required" : "",
        })
        break
      case "discountPercent":
        this.setState({
          discountPercent: target.value,
          errorDiscountPercent:
            value.length < 1 ? "Atleast 1 characaters required" : "",
        })
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
  handleRegEndDate = (date, dateString) => {

    this.setState({
      regEndDate: dateString,
    })
  }

  handleParentCheck = (e) => {
    const isActive = e.target.checked
    this.setState({ isActive })
  }

  fileSelectedHandler = (event) => {
    const imageFile = event.target.files[0]

    var fileInput = false
    if (imageFile) {
      if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        toast.error("Select a valid image.")
        return false
      }
      fileInput = true
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            imageFile,
            600,
            400,
            "JPEG",
            100,
            0,
            (uri) => {
              this.setState({
                image: uri,
                showFile: URL.createObjectURL(imageFile),
                imageName: imageFile.name,
              })
              toast.success("Discount Summary Image Selected.")
            },
            "base64",
            600,
            400
          )
        } catch (err) {
          toast.error("Something went wrong!")
        }
      }
    }
  }

  saveDiscount = async (e) => {
    e.preventDefault()

    if (this.state.name === "") {
      let msg = "Discount Name is Required!!!"
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }
    if (this.state.discountTypeName === "") {
      let msg = "Discount Type is Required!!!"
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }
    if (this.state.discountAmount === "") {
      let msg = "Discount Amount is Required!!!"
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }
    if (this.state.discountPercent === "") {
      let msg = "Discount Percent is Required!!!"
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }
    if (this.state.startDate === this.state.endDate) {
      let msg = "Discount Start and End Date Can Not Be Same!!!"
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }
    if (this.state.image === "") {
      let msg = "Discount Summary Image is Required!!!"
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    const data = {
      discountSummaryId: this.state.discountSummaryId,
      discountTypeId: this.state.discountTypeId,
      name: this.state.name,
      discountAmount: this.state.discountAmount,
      discountPercent: this.state.discountPercent,
      image: this.state.image,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      regEndDate: this.state.regEndDate,
      isActive: this.state.isActive === true ? "Y" : "N",
    }

    const result = await this.props.createOrUpdateDiscountSummaryRecord(data)

    if (result && result.payload.success.succeed === true) {
      toast.success("Discount Summary Updated Successfully")
      setTimeout(() => {
        this.props.history.push("DiscountSummaryList")
      }, 2500)
      this.resetForm()
    } else if (result && result.payload.success.succeed === false) {
      toast.error("Something went wrong, Please try again")
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    } else if (result.type === "CREATE_OR_UPDATE_DISCOUNT_SUMMARY_SUCCESS") {
      toast.success("Discount Summary Updated Successfully")
      setTimeout(() => {
        this.props.history.push("DiscountSummaryList")
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
      discountTypeId: "",
      discountTypeName: "",

      name: "",
      discountAmount: "",
      discountPercent: "",
      image: "",
      files: [],
      multiProductImages: [],

      startDate: new Date(),
      endDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      regEndDate: new Date(),
      regEndTime: new Date(),

      isActive: "",

      errorName: "",
      errorDiscountTypeId: "",
      errorDiscountAmount: "",
      errorDiscountPercent: "",
    })
  }

  render() {
    return (
      <div id="wrapper">
        <EditDiscountSummary
          key="EditDiscountSummary"
          name="Update Discount Summary"
          {...this.state}
          handleChange={this.handleChange}
          handleStartDate={this.handleStartDate}
          handleEndDate={this.handleEndDate}
          handleRegEndDate={this.handleRegEndDate}
          handleParentCheck={this.handleParentCheck}
          fileSelectedHandler={this.fileSelectedHandler}
          values={this.values}
          saveDiscount={this.saveDiscount}
          resetForm={this.resetForm}
          discountTypes={this.props.discountTypes}
          value={this.props.location.state.rowData}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.discountReducer.data,
  discountTypes: state.discountTypeReducer.discountTypes,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createOrUpdateDiscountSummaryRecord: (data) =>
      dispatch(discountSummaryAction.createOrUpdateDiscountSummaryRecord(data)),
    getDiscountTypeRecord: () =>
      dispatch(discountTypeAction.getDiscountTypeRecord()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editDiscountSummaryContainer)
