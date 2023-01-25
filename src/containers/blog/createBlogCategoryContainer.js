import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import * as blogCategoryAction from '../../store/actions/blogCategoryAction'
import authenticationService from '../../store/services/authenticationService'
import CreateBlogCategory from '../../components/blog/CreateBlogCategory'
import Resizer from 'react-image-file-resizer'

class createBlogCategoryContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blogCategoryId: 0,
      blogCategoryName: '',
      metaKeywords: '',
      metaDescription: '',
      featureImagePath: '',
      uploadedImages: [],
      file: '', // to store the Single pictures in base64 format.
      files: [],
      fileName: '',
      isActive: true,
      errorBlogCategoryName: '',
      errorMetaKeywords: '',
      errorMetaDescription: '',
      errorExternalLink: '',

      showFile: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.saveBlog = this.saveBlog.bind(this)
    this.blogCategoryLogoUrlHandler = this.blogCategoryLogoUrlHandler.bind(this)
    this._uploadImageCallBack = this._uploadImageCallBack.bind(this)
    this.handleParentCheck = this.handleParentCheck.bind(this)
  }

  blogCategoryLogoUrlHandler = (event) => {
    const imageFile = event.target.files[0]
    //1)    CHECK IF IT'S A IMAGE

    var fileInput = false
    if (imageFile) {
      if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        toast.error('Select a valid image.')
        return false
      }
      fileInput = true
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            imageFile,
            600,
            400,
            'JPEG',
            100,
            0,
            (uri) => {
              this.setState({
                featureImagePath: uri,
                blogCategoryLogoUrlFileName: imageFile.name,
                showFile: URL.createObjectURL(imageFile),
              })
              toast.success('Image Selected.')
            },
            'base64',
            600,
            400
          )
        } catch (err) {
          toast.error('Something went wrong!')
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
    if (roleId === '1') {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push('/Login')
    }
    //End Temporary Authentication
  }

  handleChange = (e) => {
    const { target } = e
    const { value } = e.target
    switch (target.name) {
      case 'blogCategoryName':
        this.setState({
          blogCategoryName: target.value,
          errorBlogCategoryName:
            value.length < 2 ? 'Atleast 2 characaters required' : '',
        })
        break
      case 'metaKeywords':
        this.setState({
          metaKeywords: target.value,
          errorMetaKeywords:
            value.length < 4 ? 'Atleast 4 characaters required' : '',
        })
        break
      case 'metaDescription':
        this.setState({
          metaDescription: target.value,
          errorMetaDescription:
            value.length < 4 ? 'Atleast 4 characaters required' : '',
        })
        break

      default:
    }
  }

  handleParentCheck = (e) => {
    const isActive = e.target.checked
    this.setState({ isActive })
  }

  saveBlog = async (e) => {
    e.preventDefault()
    if (this.state.blogCategoryName === '') {
      let msg = 'Blog Category Name Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.metaKeywords === '') {
      let msg = 'Meta Keywords is required!!!'
      toast.error(msg)
      setTimeout(() => {
      }, 3000)
      return
    }

    if (this.state.metaDescription === '') {
      let msg = 'Meta Description is required!!!'
      toast.error(msg)
      setTimeout(() => {
      }, 3000)
      return
    }

    if (this.state.featureImagePath === '') {
      let msg = 'Please Upload an Blog Category Image !!'
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
      isActive: this.state.isActive === true ? 'Y' : 'N',
    }

    const result = await this.props.createOrUpdateBlogCategoryRecord(data)

    if (result && result?.payload?.success?.succeed === true) {
      toast.success('Blog Category Created Successfully')
      setTimeout(() => {
        this.props.history.push('BlogCategoryList')
      }, 2500)
    } else if (result && result?.payload?.success?.succeed === false) {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
      }, 2500)
    } else if (
      result.type === 'CREATE_OR_UPDATE_BLOG_CATEGORY_DETAILS_SUCCESS'
    ) {
      toast.success('Blog Category Created Successfully')
      setTimeout(() => {
        this.props.history.push('BlogCategoryList')
      }, 2500)
    } else {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
      }, 2500)
    }
  }

  render() {
    return (
      <div id='wrapper'>
        <CreateBlogCategory
          key='CreateBlogCategory'
          name='Add Blog'
          {...this.state}
          handleChange={this.handleChange}
          blogCategoryLogoUrlHandler={this.blogCategoryLogoUrlHandler}
          _uploadImageCallBack={this._uploadImageCallBack}
          handleParentCheck={this.handleParentCheck}
          values={this.values}
          saveBlog={this.saveBlog}
        />
        <ToastContainer autoClose={1500} />
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
)(createBlogCategoryContainer)
