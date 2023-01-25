import React, { Component } from "react"
import { connect } from "react-redux"
import { ToastContainer, toast } from "react-toastify"
import * as activeBreadcrumbsCategoryAction from "../../../store/actions/activeBreadcrumbsCategoryAction"
import * as categoryAction from "../../../store/actions/categoryAction"
import CreateCategory from "../../../components/settings/category/CreateCategory"
import authenticationService from "../../../store/services/authenticationService"
import { convertToRaw, EditorState } from "draft-js"
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import draftToHtml from "draftjs-to-html"
import Resizer from "react-image-file-resizer"

class createCategoryContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryId: 0,
      categoryName: "",
      metaKeywords: "",
      metaTitle: "",
      displayOrder: "",
      description: "",
      metaDescription: "",
      parentCategoryId: 0,
      selectedParentCategoryId: "",
      productImagePath: "",
      imageType: "",
      file: "", // to store the Single pictures in base64 format.
      files: [],
      fileName: "",
      showOnHomepage: true,
      includeInTopMenu: true,
      isActive: true,
      isProduct: true,
      editorState: EditorState.createEmpty(),
      uploadedImages: [],
      pageSize: 0,
      isDeleted: "N",
      errorDescription: "",
      errorCategoryName: "",
      errorMetaTitle: "",
      errorDisplayOrder: "",
      errorMetaKeywords: "",
      errorMetaDescription: "",

      isReturnable: true,
      showFile: '',
    }
    this.onBasicUpload = this.onBasicUpload.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.saveCategory = this.saveCategory.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.categoryLogoUrlHandler = this.categoryLogoUrlHandler.bind(this)
    this._uploadImageCallBack = this._uploadImageCallBack.bind(this)
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.handleParentCheck = this.handleParentCheck.bind(this)
  }

  categoryLogoUrlHandler = (event) => {
    const imageFile = event.target.files[0]
    //1)    CHECK IF IT'S A IMAGE
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
            180,
            180,
            "JPEG",
            100,
            0,
            (uri) => {
              this.setState({
                productImagePath: uri,
                categoryLogoUrlFileName: imageFile.name,
                showFile: URL.createObjectURL(imageFile),
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
    await this.props.getActiveBreadcrumbsCategoryRecord()
  }

  onBasicUpload(event) {
    this.growl.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded with Basic Mode",
    })
  }

  onEditorStateChange = (editorState) => {
    let value = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    this.setState({
      editorState,
      description: value,
      //
      errorDescription:
        value.length < 12 ? "Atleast 4 characaters required" : "",
    })
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

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ value: e.target.value })
    const { value } = e.target
    const { target } = e
    switch (target.name) {
      case "categoryId":
        this.setState({ categoryId: target.value })
        break
      case "categoryName":
        this.setState({
          categoryName: target.value,
          errorCategoryName:
            value.length < 2 ? "Atleast 2 characaters required" : "",
        })
        break
      case "description":
        this.setState({ description: target.value })
        break
      case "metaTitle":
        this.setState({
          metaTitle: target.value,
          errorMetaTitle:
            value.length < 2 ? "Atleast 2 characaters required" : "",
        })
        break
      case "metaDescription":
        this.setState({
          metaDescription: target.value,
          errorMetaDescription:
            value.length < 4 ? "Atleast 4 characaters required" : "",
        })
        break
      case "displayOrder":
        this.setState({
          displayOrder: target.value < 0 ? 0 : target.value,
          errorDisplayOrder:
            value.length < 1 ? "Display order is required" : "",
        })
        break
      case "metaKeywords":
        this.setState({
          metaKeywords: target.value,
          errorMetaKeywords:
            value.length < 2 ? "Atleast 2 characaters required" : "",
        })
        break
      case "selectedParentCategoryId":
        this.setState({
          selectedParentCategoryId: target.value,
          parentCategoryId: target.value.categoryId,
        })
        break
      default:
    }
  }

  handleParentCheck = (e) => {
    const { target } = e
    switch (target.name) {
      case "showOnHomepage":
        this.setState({ showOnHomepage: !this.state.showOnHomepage })
        break
      case "includeInTopMenu":
        this.setState({ includeInTopMenu: !this.state.includeInTopMenu })
        break
      case "isActive":
        this.setState({ isActive: !this.state.isActive })
        break
      case "isProduct":
        this.setState({ isProduct: !this.state.isProduct })
        break
      case "isReturnable":
        this.setState({ isReturnable: !this.state.isReturnable })
        break
      default:
    }
  }

  saveCategory = async (e) => {
    e.preventDefault()
    if (this.state.categoryName === "") {
      let msg = "Category Name is required!!!"
      toast.error(msg)
      setTimeout(() => {
      }, 3000)
      return
    }

    if (this.state.description === "") {
      let msg = "Category Details is required!!!"
      toast.error(msg)
      setTimeout(() => {
      }, 3000)
      return
    }

    if (this.state.metaTitle === "") {
      let msg = "Meta Title is required!!!"
      toast.error(msg)
      setTimeout(() => {
      }, 3000)
      return
    }

    if (this.state.displayOrder === "") {
      let msg = "Display Order is required!!!"
      toast.error(msg)
      setTimeout(() => {
      }, 3000)
      return
    }

    if (this.state.metaKeywords === "") {
      let msg = "Meta Keywords is required!!!"
      toast.error(msg)
      setTimeout(() => {
      }, 3000)
      return
    }

    if (this.state.metaDescription === "") {
      let msg = "Meta Description is required!!!"
      toast.error(msg)
      setTimeout(() => {
      }, 3000)
      return
    }

    if (this.state.productImagePath === "") {
      let msg = "Upload an Image!!!"
      toast.error(msg)
      setTimeout(() => {
      }, 3000)
      return
    }

    const data = {
      categoryId: this.state.categoryId,
      categoryName: this.state.categoryName,
      metaKeywords: this.state.metaKeywords,
      metaTitle: this.state.metaTitle,
      displayOrder: this.state.displayOrder,
      description: this.state.description,
      metaDescription: this.state.metaDescription,
      parentCategoryId: this.state.parentCategoryId,
      productImagePath: this.state.productImagePath,
      pageSize: this.state.pageSize,
      showOnHomepage: this.state.showOnHomepage === true ? "Y" : "N",
      includeInTopMenu: this.state.includeInTopMenu === true ? "Y" : "N",
      isDeleted: this.state.isDeleted,
      isActive: this.state.isActive === true ? "Y" : "N",
      isProduct: this.state.isProduct === true ? "Y" : "N",
      isReturnable: this.state.isReturnable === true ? "Y" : "N",
    }

    const result = await this.props.createCategoryRecord(data)

    if (result && result?.payload?.success?.succeed === true) {
      if (result.type === "CREATE_CATEGORY_SUCCESS") {
        toast.success("Category Created Successfully")
        setTimeout(() => {
          this.props.history.push("CategoryList")
        }, 2500)
        this.resetForm()
      } else {
        toast.error("Something went wrong, Please try again")
        setTimeout(() => {
          this.resetForm()
          this.props.history.push("CreateCategory")
        }, 2500)
      }
    } else if (result && result?.payload?.success?.succeed === false) {
      toast.error("Category Already Exists!")
      setTimeout(() => {}, 2500)
    }
  }

  resetForm = () => {
    this.setState({
      categoryId: 0,
      categoryName: "",
      metaKeywords: "",
      metaTitle: "",
      description: "",
      metaDescription: "",
      displayOrder: "",
      parentCategoryId: 0,
      selectedParentCategoryId: "",
      productImagePath: "",
      imageType: "",
      file: "", // to store the Single pictures in base64 format.
      files: [],
      fileName: "",
      showOnHomepage: "Y",
      includeInTopMenu: "Y",
      isActive: "Y",
      isReturnable: "N",
      isProduct: "Y",
      editorState: EditorState.createEmpty(),
      uploadedImages: [],
      pageSize: 0,
      isDeleted: "N",
      isError: {
        categoryName: "",
        description: "",
        metaTitle: "",
        displayOrder: "",
        metaKeywords: "",
        metaDescription: "",
      },
    })
  }

  render() {
    return (
      <div id="wrapper">
        <CreateCategory
          key="CreateCategory"
          name="Add Category"
          {...this.state}
          handleChange={this.handleChange}
          values={this.values}
          resetForm={this.resetForm}
          categoryLogoUrlHandler={this.categoryLogoUrlHandler}
          saveCategory={this.saveCategory}
          onEditorStateChange={this.onEditorStateChange}
          _uploadImageCallBack={this._uploadImageCallBack}
          activeBreadcrumbsCategories={this.props.activeBreadcrumbsCategories}
          handleParentCheck={this.handleParentCheck}
          categoryAvailable={this.state.categoryAvailable}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  activeBreadcrumbsCategories:
    state.activeBreadcrumbsCategoryReducer.activeBreadcrumbsCategories,
  data: state.activeBreadcrumbsCategoryReducer.data,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getActiveBreadcrumbsCategoryRecord: () =>
      dispatch(
        activeBreadcrumbsCategoryAction.getActiveBreadcrumbsCategoryRecord()
      ),
    createCategoryRecord: (data) =>
      dispatch(categoryAction.createCategoryRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createCategoryContainer)
