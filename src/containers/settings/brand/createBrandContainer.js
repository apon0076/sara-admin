import React, { Component } from 'react'
import CreateBrand from '../../../components/settings/brand/CreateBrand'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as activeBreadcrumbsCategoryAction from '../../../store/actions/activeBreadcrumbsCategoryAction'
import { connect } from 'react-redux'
import * as brandAction from '../../../store/actions/brandAction'
import authenticationService from '../../../store/services/authenticationService'
import Resizer from 'react-image-file-resizer'

class createBrandContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      brandId: 0,
      brandName: '',
      brandDetails: '',
      isActive: true,
      productBrandCategoryMapId: 0,
      categories: [],
      productBrandCategoryMap: [],
      brandLogoUrl: '',
      imageType: '',
      file: '', // to store the Single pictures in base64 format.
      files: [],
      fileName: '',
      errorBrandName: '',
      errorBrandDetails: '',

      showFile: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.saveBrand = this.saveBrand.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.handleParentCheck = this.handleParentCheck.bind(this)
    this.onBasicUpload = this.onBasicUpload.bind(this)
    this.brandLogoUrlHandler = this.brandLogoUrlHandler.bind(this)
    this.imageUploadHandler = this.imageUploadHandler.bind(this)
  }

  brandLogoUrlHandler = (event) => {
    const imageFile = event.target.files[0]
    //1)    CHECK IF IT'S A IMAGE
    var fileInput = false
    if (imageFile) {
      if (!imageFile?.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) {
        toast.error('Select a valid image.')
        return false
      }
      fileInput = true
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            imageFile,
            180,
            180,
            'JPEG',
            100,
            0,
            (uri) => {
              this.setState({
                brandLogoUrl: uri,
                brandLogoUrlFileName: imageFile?.name,
                showFile: URL.createObjectURL(imageFile),
              })
              toast.success('Image Selected.')
            },
            'base64',
            180,
            180
          )
        } catch (err) {
          toast.error('Something went wrong!')
        }
      }
    }
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
    await this.props.getActiveBreadcrumbsCategoryRecord()
    this.setState({
      categories: this.props?.activeBreadcrumbsCategories,
    })
  }

  categories() {
    return this.state.categories
      .filter((item) => item?.parentCategoryId === 0)
      .map((data) => ({
        label: data?.breadcrumbCategory,
        value: data?.categoryId,
      }))
  }

  imageUploadHandler = ({ files }) => {
    const [file] = files
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      this.setState({
        brandLogoUrl: e.target.result,
      })
    }
    fileReader.readAsDataURL(file)
  }

  onBasicUpload(event) {
    this.growl.show({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Basic Mode',
    })
  }

  handleChange = (e) => {
    const { target } = e
    const { value } = e.target
    switch (target.name) {
      case 'brandName':
        this.setState({
          brandName: target.value,
          errorBrandName:
            value.length < 2 ? 'Atleast 2 characaters required' : '',
        })
        break
      case 'brandDetails':
        this.setState({
          brandDetails: target.value,
          errorBrandDetails: value.length < 2 ? 'Required Field' : '',
        })
        break
      default:
    }
  }

  handleMultiSelectChange = (productBrandCategoryMap) => {
    this.setState({ productBrandCategoryMap })
  }

  handleParentCheck = (e) => {
    const isActive = e.target?.checked
    this.setState({ isActive })
  }

  saveBrand = async (e) => {
    e.preventDefault()

    if (this.state?.brandLogoUrl === '') {
      let msg = 'Upload an Image!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    const transformed = this.state?.productBrandCategoryMap.map(
      ({ value }) => ({
        categoryId: value,
      })
    )

    const finalArray = transformed?.map((obj) => ({
      ...obj,
      brandId: this.state?.brandId,
      productBrandCategoryMapId: this.state?.productBrandCategoryMapId,
    }))

    const data = {
      brandId: this.state?.brandId,
      brandName: this.state?.brandName,
      brandDetails: this.state?.brandDetails,
      isActive: this.state?.isActive === true ? 'Y' : 'N',
      brandLogoUrl: this.state?.brandLogoUrl,
      productBrandCategoryMap: [...finalArray],
    }

    let result = await this?.props?.createBrandRecord(data)

    if (result && result?.payload?.success?.data?.succeed === true) {
      if (result.type === 'CREATE_BRAND_SUCCESS') {
        toast.success('Brand Created Successfully')
        setTimeout(() => {
          this.props.history.push('BrandList')
        }, 2500)
        this.resetForm()
      } else {
        toast.error('Something went wrong, Please try again')
        setTimeout(() => {
          this.resetForm()
          this.props.history.push('CreateBrand')
        }, 2500)
      }
    } else if (result && result?.payload?.success?.data?.succeed === false) {
      toast.error('Brand Already Exists!')
      setTimeout(() => {}, 2500)
    }
  }

  resetForm = (e) => {
    this.setState({
      brandName: '',
      categoryName: '',
      categoryId: '',
      brandDetails: '',
      isActive: true,
      parentCategoryId: '',
      productBrandCategoryMapId: 0,
      categories: [],
      productBrandCategoryMap: [],
      brandLogoUrl: '',
      imageType: '',
      file: '', // to store the Single pictures in base64 format.
      files: [],
      fileName: '',

      errorBrandName: '',
      errorCategoryName: '',
      errorCategoryId: '',
      errorBrandDetails: '',
    })
  }

  render() {
    return (
      <div id='wrapper'>
        <CreateBrand
          key='CreateBrand'
          name='Add Brand'
          {...this.state}
          handleChange={this.handleChange}
          handleMultiSelectChange={this.handleMultiSelectChange}
          resetForm={this.resetForm}
          values={this.values}
          saveBrand={this.saveBrand}
          handleParentCheck={this.handleParentCheck}
          brandLogoUrlHandler={this.brandLogoUrlHandler}
          imageUploadHandler={this.imageUploadHandler}
          _uploadImageCallBack={this?._uploadImageCallBack}
          activeBreadcrumbsCategories={this.props?.activeBreadcrumbsCategories}
          categories={this.categories()}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.brandReducer?.data,
  activeBreadcrumbsCategories:
    state.activeBreadcrumbsCategoryReducer?.activeBreadcrumbsCategories,
  data: state.activeBreadcrumbsCategoryReducer?.data,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createBrandRecord: (data) => dispatch(brandAction.createBrandRecord(data)),
    getActiveBreadcrumbsCategoryRecord: () =>
      dispatch(
        activeBreadcrumbsCategoryAction.getActiveBreadcrumbsCategoryRecord()
      ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createBrandContainer)
