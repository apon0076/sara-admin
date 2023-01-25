import React, { Component } from 'react'
import EditSellerProfile from '../../components/sellerProfile/EditSellerProfile'
import authenticationService from '../../store/services/authenticationService'
import { toast, ToastContainer } from 'react-toastify'
import baseUrl from '../../utils/baseUrl'
import { connect } from 'react-redux'
import * as sellerProfileAction from '../../store/actions/sellerProfileAction'
import Resizer from 'react-image-file-resizer'

class editSellerProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sellerId: '',
      roleId: '',
      sellerName: '',
      sellerEmail: '',
      sellerContactNo: '',
      sellerPresentAddress: '',
      sellerPermanentAddress: '',
      isActive: '',
      sellerImageUrl: '',
      sellerImage: '',
      imageType: '',
      file: '', // to store the Single pictures in base64 format.
      files: [],
      fileName: '',
      //
      isError: {
        sellerName: '',
        sellerContactNo: '',
        sellerPresentAddress: '',
        sellerPermanentAddress: '',
      },
    }

    this.handleChange = this.handleChange.bind(this)
    this.updateSellerProfile = this.updateSellerProfile.bind(this)
    this.clearData = this.clearData.bind(this)
    //this.onImgLoad = this.onImgLoad.bind(this);
    this.changeName = this.changeName.bind(this)
    this.fileSelectedHandlerSellerLogo =
      this.fileSelectedHandlerSellerLogo.bind(this)
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()
    if (roleId === '2') {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push('/SellerLogin')
    }
    //End Temporary Authentication
    const sellerD = await this.props.getSellerProfileByIdRecord(
      this.props.match.params.id
    )
    //////debugger;
    this.setState({
      sellerId: sellerD.payload['success'].sellerId,
      roleId: sellerD.payload['success'].roleId,
      shopId: sellerD.payload['success'].shopId,
      sellerName: sellerD.payload['success'].sellerName,
      sellerEmail: sellerD.payload['success'].sellerEmail,
      sellerContactNo: sellerD.payload['success'].sellerContactNo,
      sellerPresentAddress: sellerD.payload['success'].sellerPresentAddress,
      sellerPermanentAddress: sellerD.payload['success'].sellerPermanentAddress,
      isActive: sellerD.payload['success'].isActive,
      sellerImageUrl: sellerD.payload['success'].sellerImageUrl,
      imageType: sellerD.payload['success'].imageType,
      sellerImage: baseUrl.concat(sellerD.payload['success'].sellerImage),
      sellerImageDup: sellerD.payload['success'].sellerImageDup,
    })
  }

  changeName = (e) => {
    this.setState({
      fileName: e.target.files[0].name,
    })
  }

  keyPressed = (e) => {
    if (e.key === 'Enter') {
      this.updateSellerProfile(e)
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    let isError = { ...this.state.isError }
    switch (name) {
      case 'sellerName':
        isError.sellerName =
          value.length < 4 ? 'Atleast 4 characaters required' : ''
        break
      case 'sellerContactNo':
        isError.sellerContactNo =
          value.length < 11 || value.length > 11
            ? 'Please, enter a valid number'
            : ''
        break
      case 'sellerPresentAddress':
        isError.sellerPresentAddress =
          value.length < 4 ? 'Please, enter a valid address' : ''
        break
      case 'sellerPermanentAddress':
        isError.sellerPermanentAddress =
          value.length < 4 ? 'Please, enter a valid address' : ''
        break
      default:
        break
    }
    this.setState({
      isError,
      [name]: value,
    })
  }

  fileSelectedHandlerSellerLogo = (event) => {
    const imageFile = event.target.files[0]

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
            180,
            180,
            'JPEG',
            100,
            0,
            (uri) => {
              this.setState({
                sellerImageUrl: uri,
                showFile: URL.createObjectURL(imageFile),
                fileName: imageFile.name,
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

  updateSellerProfile = async (e) => {
    e.preventDefault()

    if (this.state.sellerName === '') {
      let msg = 'Select Seller Name!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.sellerContactNo === '') {
      let msg = 'Select Seller Contact!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.sellerPresentAddress === '') {
      let msg = 'Select Present Address!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.sellerPermanentAddress === '') {
      let msg = 'Select Permanent Address!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    const {
      sellerName,
      sellerContactNo,
      sellerPresentAddress,
      sellerPermanentAddress,
    } = this.state.isError
    if (
      sellerName === '' &&
      sellerContactNo === '' &&
      sellerPresentAddress === '' &&
      sellerPermanentAddress === ''
    ) {
      const data = {
        sellerId: this.state.sellerId,
        roleId: this.state.roleId,
        sellerName: this.state.sellerName,
        sellerContactNo: this.state.sellerContactNo,
        sellerEmail: this.state.sellerEmail,
        sellerImageUrl: this.state.sellerImageUrl,
        sellerPresentAddress: this.state.sellerPresentAddress,
        sellerPermanentAddress: this.state.sellerPermanentAddress,
        isActive: 'Y',
        shopId: this.state.shopId,
      }

      //////debugger;
      await this.props.createOrUpdateSellerProfileRecord(data)
      toast.success('Data Updated Successfully')
      setTimeout(() => {
        this.props.getSellerProfileByIdRecord(this.props.match.params.id)
        this.props.history.push('/SellerProfile')
        this.clearData(e)
      }, 2500)
    } else {
      toast.error('Please fill up the required fields')
      setTimeout(() => {}, 2000)
      return
    }
  }

  clearData = (e) => {
    // e.preventDefault();
    this.setState({
      sellerId: '',
      sellerName: '',
      sellerEmail: '',
      sellerContactNo: '',
      sellerPresentAddress: '',
      isActive: '',
      sellerImageUrl: '',
      sellerImage: '',
      imageType: '',
      files: undefined,
      imgSrc: undefined,
    })
  }

  render() {
    return (
      <>
        <div id='wrapper'>
          <EditSellerProfile
            key='EditSellerProfile'
            name='Update Seller Profile'
            {...this.state}
            handleChange={this.handleChange}
            sellerProfileById={this.props.sellerProfileById}
            updateSellerProfile={this.updateSellerProfile}
            fileSelectedHandlerSellerLogo={this.fileSelectedHandlerSellerLogo}
            changeName={this.changeName}
          />
        </div>
        <ToastContainer autoClose={1500} />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.sellerProfileReducer.data,
  sellerProfileById: state.sellerProfileReducer.sellerProfileById,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createOrUpdateSellerProfileRecord: (data) =>
      dispatch(sellerProfileAction.createOrUpdateSellerProfileRecord(data)),
    updateSellerProfileRecord: (data) =>
      dispatch(sellerProfileAction.updateSellerProfileRecord(data)),
    getSellerProfileByIdRecord: (index) =>
      dispatch(sellerProfileAction.getSellerProfileByIdRecord(index)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editSellerProfileContainer)
