import React, { Component } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { connect } from "react-redux"
import * as promotionAction from "../../../store/actions/promotionAction"
import authenticationService from "../../../store/services/authenticationService"
import EditPromotion from "../../../components/settings/promotion/EditPromotion"

class editPromotionContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      promotionId: 0,
      name: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      imageType: "",
      file: "", // to store the Single pictures in base64 format.
      files: [],
      image: [],
      isActive: true,
      errorPromotionName: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleStartDate = this.handleStartDate.bind(this)
    this.handleEndDate = this.handleEndDate.bind(this)
    this.updatePromotion = this.updatePromotion.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.handleParentCheck = this.handleParentCheck.bind(this)
    this.promotionImageUrlHandler = this.promotionImageUrlHandler.bind(this)
  }

  promotionImageUrlHandler = (event) => {
    const imageFile = event.target.files[0]
    //1)    CHECK IF IT'S A IMAGE
    if (imageFile) {
      if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        toast.error("Select a valid image.")
        return false
      }

      //2)    CHECK THE SIZE OF FILE
      let aceptedSize = imageFile.size / 1000
      if (aceptedSize > 150) {
        toast.error("Size must be less than 150 kb")
        return false
      }

      //3)     CHECK THE HEIGHT AND WIDTH OF THE IMAGE
      const reader = new FileReader()
      reader.readAsDataURL(imageFile)
      reader.addEventListener("load", (event) => {
        const _loadedImageUrl = event.target.result
        const image = document.createElement("img")
        image.src = _loadedImageUrl

        image.addEventListener("load", () => {

          const { width, height } = image
          if (width !== 180 || height !== 180) {
            toast.error("Size must be of 180 x 180 pixels")
            return false
          } else {
            this.setState({
              brandLogoUrlFileName: imageFile.name,
            })
            const reader = new FileReader()
            reader.readAsDataURL(imageFile)
            reader.onload = (e) => {
              this.setState({
                image: e.target.result,
              })
              toast.success("Image Selected.")
            }
          }
        })
      })
    }
  }

  componentDidMount = async () => {

    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()

    if (roleId === "1") {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
        promotionId: this.props.location.state.rowData.discountId,
        startDate: this.props.location.state.rowData.startDate,
        endDate: this.props.location.state.rowData.endDate,
        startTime: this.props.location.state.rowData.startTime,
        endTime: this.props.location.state.rowData.endTime,
        name: this.props.location.state.rowData.name,
        image: this.props.location.state.rowData.image,
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
    // await this.props.getDiscountTypeRecord()
    // await this.props.getProductRecord()
  }

  handleParentCheck = (e) => {
    const isActive = e.target.checked;
    this.setState({ isActive });
  };

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.savePromotion(e)
    }
  }

  handleChange = (e) => {
    const { target } = e
    const { value } = e.target
    switch (target.name) {
      case "name":
        this.setState({
          name: target.value,
          errorPromotionName:
            value.length < 2 ? "Atleast 2 characaters required" : "",
        })
        break
      case "isActive":
        this.setState({ isActive: target.value })
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

  updatePromotion = async (e) => {
    e.preventDefault()
    if (this.state.image === "") {
      let msg = "Upload an Promotion Image!!!"
      toast.error(msg)
      setTimeout(() => { }, 3000)
      return
    }

    if (this.state.name === "") {
      let msg = "Promotion Name Is Required!!!"
      toast.error(msg)
      setTimeout(() => { }, 3000)
      return
    }

    const data = {
      promotionId: this.state.promotionId,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      image: this.state.image,
      name: this.state.name,
      isActive: this.state.isActive === true ? "Y" : "N",
    }

    const result = await this.props.createOrUpdatePromotionRecord(data)

    if (result && result.payload.success.succeed === true) {
      toast.success("Promotion Updated Successfully")
      setTimeout(() => {
        this.props.history.push("PromotionList")
      }, 2500)
      this.resetForm()
    } else if (result && result.payload.success.succeed === false) {
      toast.error("Something went wrong, Please try again")
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    } else if (result.type === "CREATE_OR_UPDATE_PROMOTION_SUCCESS") {
      toast.success("Promotion Updated Successfully")
      setTimeout(() => {
        this.props.history.push("PromotionList")
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
      promotionId: "",
      startDate: new Date(),
      endDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      name: "",
      image: "",
      isActive: "",
    })
  }

  render() {

    return (
      <div id="wrapper">
        <ToastContainer autoClose={1500} />
        <EditPromotion
          key="EditPromotion"
          name="Edit Promotion"
          {...this.state}
          handleChange={this.handleChange}
          handleStartDate={this.handleStartDate}
          handleEndDate={this.handleEndDate}
          handleStartTime={this.handleStartTime}
          handleEndTime={this.handleEndTime}
          handleParentCheck={this.handleParentCheck}
          values={this.values}
          updatePromotion={this.updatePromotion}
          resetForm={this.resetForm}
          value={this.props.location.state.rowData}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.promotionReducer.data,
})


const mapDispatchToProps = (dispatch) => {
  return {
    createOrUpdatePromotionRecord: (data) =>
      dispatch(promotionAction.createOrUpdatePromotionRecord(data)),
    getPromotionRecord: () =>
      dispatch(promotionAction.getPromotionRecord()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editPromotionContainer)
