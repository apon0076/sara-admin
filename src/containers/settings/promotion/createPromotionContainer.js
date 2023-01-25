import React, { Component } from "react"
import { connect } from "react-redux"
import "../../../../node_modules/react-summernote/dist/react-summernote.css"
import CreatePromotion from "../../../components/settings/promotion/CreatePromotion"
import { Toast } from "primereact/toast"
import promotionService from "../../../store/services/promotionService"
import * as promotionAction from "../../../store/actions/promotionAction"
import { InputSwitch } from "primereact/inputswitch"

class createPromotionContainer extends Component {
  fileObj = []
  fileArray = []
  constructor(props) {
    super(props)
    this.state = {
      promotionId: "",
      promotionName: "",
      promotionType: "",
      promotionPosition: "",
      productId: "",
      detailedDescription: "",
      files: [],
      multiProductImages: [],
      isActive: true,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleStartDate = this.handleStartDate.bind(this)
    this.handleEndDate = this.handleEndDate.bind(this)
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
    this.fileMultiSelectedHandler = this.fileMultiSelectedHandler.bind(this)
    this.renderPhotos = this.renderPhotos.bind(this)
    this.savePromotion = this.savePromotion.bind(this)
    this.clearData = this.clearData.bind(this)
    this.showSuccess = this.showSuccess.bind(this)
  }

  componentDidMount = async () => {
    // For Login Check
    let userId = promotionService.getEmployeeId()

    if (userId != null) {
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

    //////debugger;
    await this.props.getPromotionRecord()
  }

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.savePromotion(e)
    }
  }

  fileMultiSelectedHandler = (e) => {
    e.preventDefault()
    //FileList to Array
    let files = Array.from(e.target.files)
    //file reader for each file and update state arrays
    files.forEach((file, i) => {
      let reader = new FileReader()
      reader.onload = () => {
        this.setState((prevState) => ({
          files: [...prevState.files, file],
          multiProductImages: [...prevState.multiProductImages, reader.result],
        }))
      }

      reader.readAsDataURL(file)
    })
  }

  fileSelectedHandler = (e) => {
    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onload = (e) => {
      this.setState({ file: file, primaryImage: reader.result })
      this.primaryImage = e.target.result
      this.setState({ primaryImage: e.target.result })
    }
    reader.readAsDataURL(file)
  }

  renderPhotos = (source) => {

    return source.map((photo) => {
      return (
        <>
          <img
            className="product_upload_image"
            src={photo}
            alt=""
            key={photo}
          />
          <InputSwitch
            checked={this.state.isActive}
            onChange={(e) => this.setState({ isActive: e.value })}
          />
        </>
      )
    })
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ value: e.target.value })
    const { target } = e
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

  showSuccess() {
    this.toast.show({
      severity: "success",
      summary: "Success",
      detail: "Promotion Created",
      life: 3000,
    })
  }

  savePromotion = async (e) => {
    //////debugger;
    const data = {
      promotionId: this.state.promotionId,
      promotionName: this.state.promotionName,
      promotionType: this.state.promotionType,
      promotionPosition: this.state.promotionPosition,
      promotionImagePath: this.state.promotionImagePath,
      isActive: "Y",
    }

    if (data.promotionId === "") {
      data.promotionId = 0
    }

    await this.props.createOrUpdatePromotionRecord(data)
    e.preventDefault()
    this.clearData(e)
    this.showSuccess(true)
  }

  clearData = (e) => {
    e.preventDefault()
    this.setState({
      promotionId: "",
      promotionName: "",
      promotionType: "",
      promotionPosition: "",
      promotionImagePath: "",
      isActive: "N",
    })
  }

  render() {
    return (
      <div id="wrapper">
        <Toast ref={(el) => (this.toast = el)} />
        <CreatePromotion
          key="CreatePromotion"
          name="Add Promotion"
          {...this.state}
          handleChange={this.handleChange}
          fileSelectedHandler={this.fileSelectedHandler}
          fileMultiSelectedHandler={this.fileMultiSelectedHandler}
          renderPhotos={this.renderPhotos}
          values={this.values}
          savePromotion={this.savePromotion}
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
    getPromotionRecord: () => dispatch(promotionAction.getPromotionRecord()),
    createOrUpdatePromotionRecord: (data) =>
      dispatch(promotionAction.createOrUpdatePromotionRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createPromotionContainer)
