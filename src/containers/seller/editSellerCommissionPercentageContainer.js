import React, { Component } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { connect } from "react-redux"
import * as sellerProfileAction from "../../store/actions/sellerProfileAction"
import authenticationService from "../../store/services/authenticationService"
import EditSellerCommissionPercentage from "../../components/seller/EditSellerCommissionPercentage"
import Resizer from 'react-image-file-resizer';

class editSellerCommissionPercentageContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sellerCommissionId: 0,
      localCommissionPercentage: "",
      globalCommissionPercentage: "",
      aggrementDocument: "",
      file: "",
      showFile: "",
      files: [],
      shopId: 0,
      sellerId: 0,
      details: "",
      isActive: true,
      isApprove: true,
      status: true,
      errorDetails: "",
      errorLocalCommissionPercentage: "",
      errorGlobalCommissionPercentage: "",
    }

    this.handleChange = this.handleChange.bind(this)
    // this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
    this.saveCommissionPercentage = this.saveCommissionPercentage.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.handleParentCheck = this.handleParentCheck.bind(this)
    this.handleApproveCheck = this.handleApproveCheck.bind(this)
    this.fileSelectedHandlerDoc =
      this.fileSelectedHandlerDoc.bind(this)
  }

  componentDidMount = async () => {

    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()
    if (roleId === "2") {

      this.setState({
        authenticated: true,
        loginSuccessful: true,
        sellerCommissionId:
          this.props.location.state.rowData.sellerCommissionId,
        shopId: this.props.location.state.rowData.shopId,
        sellerId: this.props.location.state.rowData.sellerId,
        details: this.props.location.state.rowData.details,
        localCommissionPercentage:
          this.props.location.state.rowData.localCommissionPercentage,
        globalCommissionPercentage:
          this.props.location.state.rowData.globalCommissionPercentage,
        aggrementDocument: this.props.location.state.rowData.aggrementDoc,
        isActive:
          this.props.location.state.rowData.isActive === "Y" ? true : false,
        isApprove:
          this.props.location.state.rowData.isApprove === "Y" ? true : false,
        status: this.props.location.state.rowData.status === "Y" ? true : false,
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
      case "details":
        this.setState({
          details: target.value,
          errorDetails:
            value.length < 1 ? "Atleast 1 characaters required" : "",
        })
        break

      case "localCommissionPercentage":
        this.setState({
          localCommissionPercentage: target.value,
          errorLocalCommissionPercentage:
            value.length < 1 ? "Atleast 1 characaters required" : "",
        })
        break
      case "globalCommissionPercentage":
        this.setState({
          globalCommissionPercentage: target.value,
          errorGlobalCommissionPercentage:
            value.length < 1 ? "Atleast 1 characaters required" : "",
        })
        break

      default:
    }
  }

  handleParentCheck = (e) => {
    const isActive = e.target.checked
    this.setState({ isActive })
  }
  handleApproveCheck = (e) => {
    const isApprove = e.target.checked
    this.setState({ isApprove })
  }

  fileSelectedHandlerDoc = (event) => {
    const imageFile = event.target.files[0]

    var fileInput = false;
    if (imageFile) {
      if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        toast.error("Select a valid image.")
        return false
      }
      fileInput = true;
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            imageFile,
            180,
            180,
            "JPEG",
            100,
            0,
            (uri) => {
              this.setState({
                aggrementDocument: uri,
                showFile: URL.createObjectURL(imageFile),
                fileName: imageFile.name,
              })
              toast.success("Image Selected.")
            },
            "base64",
            180,
            180
          )
        } catch (err) {
          toast.error("Something went wrong!")
        }
      }
      
    }
  }

  fileSelectedHandler = (e) => {
    const documentFile = e.target.files[0]
    var fileInput = false
    if (documentFile) {
    if (!documentFile.name.match(/\.(jpg|jpeg|png|gif|webp|doc|pdf|docx)$/)) {
      toast.error("Select a valid document or image file.")
      return false
    }
    fileInput = true
    if (fileInput) {
      try {
        let reader = new FileReader()
        let file = e.target.files[0]
        reader.onload = (e) => {
          this.setState({ file: file, aggrementDocument: reader.result })
          this.aggrementDocument = e.target.result
          this.setState({ aggrementDocument: e.target.result, bussinessDocUrlFileName: file.name })
        }
        
        reader.readAsDataURL(file)

        toast.success("Document Selected.")

      } catch (err) {
        toast.error("Something went wrong!")
      }
    }
  }
  }

  saveCommissionPercentage = async (e) => {
    e.preventDefault()

    const data = {
      sellerCommissionId: this.state.sellerCommissionId,
      shopId: this.state.shopId,
      sellerId: this.state.sellerId,
      details: this.state.details,
      localCommissionPercentage: this.state.localCommissionPercentage,
      globalCommissionPercentage: this.state.globalCommissionPercentage,
      aggrementDocument: this.state.aggrementDocument,
      isActive: this.state.isActive === true ? "Y" : "N",
      isApprove: this.state.isApprove === true ? "Y" : "N",
      status: this.state.status === true ? "Y" : "N",
    }

    const result = await this.props.updateCommissionPercentageRecord(data)

    if (result && result.payload.success === true) {
      toast.success("Commission Percentage Updated Successfully")
      setTimeout(() => {
        this.props.history.push("CommissionPercentageList")
      }, 2500)
      this.resetForm()
    } else if (result && result.payload.success === false) {
      toast.error("Something went wrong, Please try again")
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    } else if (result.type === "UPDATE_SELLER_COMMISSION_PERCENTAGE_SUCCESS") {
      toast.success("Commission Percentage Updated Successfully")
      setTimeout(() => {
        this.props.history.push("CommissionPercentageList")
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
      details: "",
      localCommissionPercentage: "",
      globalCommissionPercentage: "",
      aggrementDocument: "",
      files: [],

      isActive: false,
      isApprove: false,
      status: false,
      errorDetails: "",
      errorLocalCommissionPercentage: "",
      errorGlobalCommissionPercentage: "",
    })
  }

  render() {

    return (
      <div id="wrapper">
        <EditSellerCommissionPercentage
          key="EditSellerCommissionPercentage"
          name="Update Commission Percentage"
          {...this.state}
          handleChange={this.handleChange}
          handleParentCheck={this.handleParentCheck}
          handleApproveCheck={this.handleApproveCheck}
          // fileSelectedHandler={this.fileSelectedHandler}
          values={this.values}
          saveCommissionPercentage={this.saveCommissionPercentage}
          resetForm={this.resetForm}
          sellerCommissionPercentage={this.props.sellerCommissionPercentage}
          fileSelectedHandlerDoc={this.fileSelectedHandlerDoc}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sellerCommissionPercentage:
    state.sellerProfileReducer.sellerCommissionPercentage,
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateCommissionPercentageRecord: (data) =>
      dispatch(sellerProfileAction.updateCommissionPercentageRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editSellerCommissionPercentageContainer)
