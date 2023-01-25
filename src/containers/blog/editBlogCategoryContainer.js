import React, { Component } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { connect } from "react-redux"
import * as blogCategoryAction from "../../store/actions/blogCategoryAction"
import authenticationService from "../../store/services/authenticationService"
import EditBlogCategory from "../../components/blog/EditBlogCategory"
import Resizer from 'react-image-file-resizer';

class editBlogCategoryContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blogCategoryId: 0,
      blogCategoryName: "",
      metaKeywords: "",
      metaDescription: "",
      featureImagePath: "",
      uploadedImages: [],
      file: "", // to store the Single pictures in base64 format.
      files: [],
      fileName: "",
      showFile: "",
      isActive: true,
      errorBlogCategoryName: "",
      errorMetaKeywords: "",
      errorMetaDescription: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.saveBlogCategory = this.saveBlogCategory.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.blogCategoryLogoUrlHandler = this.blogCategoryLogoUrlHandler.bind(this)
    this._uploadImageCallBack = this._uploadImageCallBack.bind(this)
    this.handleParentCheck = this.handleParentCheck.bind(this)
  }

  blogCategoryLogoUrlHandler = (event) => {
    const imageFile = event.target.files[0]

    //1)    CHECK IF IT'S A IMAGE
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
                featureImagePath: uri,
                showFile: URL.createObjectURL(imageFile),
                blogCategoryLogoUrlFileName: imageFile.name,
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

  _uploadImageCallBack(file) {
    let uploadedImages = this.state.uploadedImages

    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    }

    uploadedImages.push(imageObject)

    this.setState({ uploadedImages: uploadedImages })
    return new Promise((resolve, reject) => {
      resolve({ data: { link: imageObject.localSrc } })
    })
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()
    if (roleId === "1") {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
        blogCategoryId: this.props.location.state.rowData.blogCategoryId,
        blogCategoryName: this.props.location.state.rowData.blogCategoryName,
        metaKeywords: this.props.location.state.rowData.metaKeywords,
        metaDescription: this.props.location.state.rowData.metaDescription,
        featureImagePath: this.props.location.state.rowData.featureImagePath,
        isActive:
          this.props.location.state.rowData.isActive === "Y" ? true : false,
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
    const isActive = e.target.checked
    this.setState({ isActive })
}

  handleChange = (e) => {
    const { target } = e
    const { value } = e.target
    switch (target.name) {
      case "blogCategoryName":
        this.setState({
          blogCategoryName: target.value,
          errorBlogCategoryName:
            value.length < 2 ? "Atleast 2 characaters required" : "",
        })
        break
      case "metaKeywords":
        this.setState({
          metaKeywords: target.value,
          errorMetaKeywords:
            value.length < 4 ? "Atleast 4 characaters required" : "",
        })
        break
      case "metaDescription":
        this.setState({
          metaDescription: target.value,
          errorMetaDescription:
            value.length < 4 ? "Atleast 4 characaters required" : "",
        })
        break
      default:
    }
  }

  saveBlogCategory = async (e) => {
    e.preventDefault()
    if (this.state.blogCategoryName === "") {
      let msg = "Blog Category Name Is Required!!!"
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.metaKeywords === "") {
      let msg = "Meta Keywords is required!!!"
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.metaDescription === "") {
      let msg = "Meta Description is required!!!"
      toast.error(msg)
      setTimeout(() => {
      }, 3000)
      return
    }

    if (this.state.featureImagePath === "") {
      let msg = "Please Upload an Blog Category Image !!"
      toast.error(msg)
      setTimeout(() => {
      }, 3000)
      return
    }


    const data = {
      blogCategoryId: this.state.blogCategoryId,
      blogCategoryName: this.state.blogCategoryName,
      featureImagePath: this.state.featureImagePath,
      metaKeywords: this.state.metaKeywords,
      metaDescription: this.state.metaDescription,
      isActive: this.state.isActive === true ? "Y" : "N",
    }

    const result = await this.props.createOrUpdateBlogCategoryRecord(data)

    if (result && result?.payload?.success?.succeed === true) {
      toast.success("Blog Category Updated Successfully")
      setTimeout(() => {
        this.props.history.push("BlogCategoryList")
      }, 2500)
      this.resetForm()
    } else if (result && result?.payload?.success?.succeed === false) {
      toast.error("Something went wrong, Please try again")
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    } else if (result.type === "CREATE_OR_UPDATE_BLOG_CATEGORY_DETAILS_SUCCESS") {
      toast.success("Blog Category Updated Successfully")
      setTimeout(() => {
        this.props.history.push("BlogCategoryList")
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
      blogCategoryName: "",
      errorBlogCategoryName: "",
      featureImagePath: "",
      uploadedImages: [],
      file: "", // to store the Single pictures in base64 format.
      files: [],
      fileName: "",
      metaKeywords: "",
      metaDescription: "",
      errorMetaKeywords: "",
      errorMetaDescription: "",
      isActive: false,
    })
  }

  render() {

    return (
      <div id="wrapper">
        <ToastContainer autoClose={1500} />
        <EditBlogCategory
          key="EditBlogCategory"
          name="Edit Blog Category"
          {...this.state}
          handleChange={this.handleChange}
          handleParentCheck={this.handleParentCheck}
          values={this.values}
          resetForm={this.resetForm}
          blogCategoryLogoUrlHandler={this.blogCategoryLogoUrlHandler}
          _uploadImageCallBack={this._uploadImageCallBack}
          saveBlogCategory={this.saveBlogCategory}
          value={this.props.location.state.rowData}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.blogCategoryReducer.data,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createOrUpdateBlogCategoryRecord: (data) =>
      dispatch(blogCategoryAction.createOrUpdateBlogCategoryRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editBlogCategoryContainer)
