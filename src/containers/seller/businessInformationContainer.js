import React, { Component } from 'react'
import { connect } from 'react-redux'
import sellerService from '../../store/services/sellerService'
import authenticationService from '../../store/services/authenticationService'
import * as sellerProfileAction from '../../store/actions/sellerProfileAction'
import * as addressAction from '../../store/actions/addressAction'
import BusinessInformation from '../../components/seller/BusinessInformation'
import { toast, ToastContainer } from 'react-toastify'
import Resizer from 'react-image-file-resizer'

class businessInformationContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      binNo: '',
      bussinessDocUrl: '',
      bussinessTypeId: '',
      isDelete: '',
      isVerified: '',
      ownerName: '',
      ownerNidUrl: '',
      roleId: '',
      sellerAcNo: '',
      sellerContactNo: '',
      sellerEmail: '',
      sellerId: '',
      sellerImageUrl: '',
      sellerName: '',
      sellerPassword: '',
      sellerPermanentAddress: '',
      sellerPresentAddress: '',
      sellerPwdSalt: '',
      sellerTypeId: '',
      shopAddress: '',
      shopCity: '',
      shopDescription: '',
      shopId: '',
      shopLogoUrl: '',
      shopName: '',
      shopState: '',
      shopUrl: '',
      shopZipCode: '',
      shopBannerUrl: '',

      LogoShowFile: '',
      BannerShowFile: '',
      DocumentShowFile: '',

      isActive: true,
      shopLogoUrlFileName: '',
      shopBannerUrlFileName: '',
      bussinessDocUrlFileName: '',
      countryName: '',
      countryId: '',
      currency: '',
      errorCountryName: '',
      isError: {
        shopDescription: '',
        shopCity: '',
        shopState: '',
        shopZipCode: '',
        shopAddress: '',
        binNo: '',
        ownerName: '',
        shopLogoUrl: '',
        shopBannerUrl: '',
        bussinessDocUrl: '',
      },
      shopUrlAvalibleState: true,
      CustomerCurrentShopUrl: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
    this.clearData = this.clearData.bind(this)
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let userId = sellerService.getEmployeeId()
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
    await this.props.getAllCountryRecord()

    await this.props.getShopDetailsBySellerIdRecord(userId)

    this.props.sellerProfile[0] &&
      this.setState({
        binNo: this.props.sellerProfile[0].binNo,
        bussinessDocUrl: this.props.sellerProfile[0].bussinessDocUrl,
        bussinessTypeId: this.props.sellerProfile[0].bussinessTypeId,
        isDelete: this.props.sellerProfile[0].isDelete,
        isVerified: this.props.sellerProfile[0].isVerified,
        ownerName: this.props.sellerProfile[0].ownerName,
        ownerNidUrl: this.props.sellerProfile[0].ownerNidUrl,
        roleId: this.props.sellerProfile[0].roleId,
        sellerAcNo: this.props.sellerProfile[0].sellerAcNo,
        sellerContactNo: this.props.sellerProfile[0].sellerContactNo,
        sellerEmail: this.props.sellerProfile[0].sellerEmail,
        sellerId: this.props.sellerProfile[0].sellerId,
        sellerImageUrl: this.props.sellerProfile[0].sellerImageUrl,
        sellerName: this.props.sellerProfile[0].sellerName,
        sellerPassword: this.props.sellerProfile[0].sellerPassword,
        sellerPermanentAddress:
          this.props.sellerProfile[0].sellerPermanentAddress,
        sellerPresentAddress: this.props.sellerProfile[0].sellerPresentAddress,
        sellerPwdSalt: this.props.sellerProfile[0].sellerPwdSalt,
        sellerTypeId: this.props.sellerProfile[0].sellerTypeId,
        shopAddress: this.props.sellerProfile[0].shopAddress,
        shopCity: this.props.sellerProfile[0].shopCity,
        shopDescription: this.props.sellerProfile[0].shopDescription,
        shopId: this.props.sellerProfile[0].shopId,
        shopLogoUrl: this.props.sellerProfile[0].shopLogoUrl,
        shopName: this.props.sellerProfile[0].shopName,
        shopState: this.props.sellerProfile[0].shopState,
        shopUrl: this.props.sellerProfile[0].shopUrl,
        CustomerCurrentShopUrl: this.props.sellerProfile[0].shopUrl,
        shopZipCode: this.props.sellerProfile[0].shopZipCode,
        shopBannerUrl: this.props.sellerProfile[0].shopBannerUrl,
        countryId: this.props.sellerProfile[0].countryId,
        countryName: this.props.sellerProfile[0].countryName,
        isActive: this.props.sellerProfile[0].isActive === 'Y' ? true : false,
      })
  }

  shopLogoUrldHandler = (event) => {
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
                shopLogoUrl: uri,
                shopLogoUrlFileName: imageFile.name,
                LogoShowFile: URL.createObjectURL(imageFile),
              })
              toast.success('Shop Logo Selected.')
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

  shopBannerdHandler = (event) => {
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
            1230,
            425,
            'JPEG',
            100,
            0,
            (uri) => {
              this.setState({
                shopBannerUrl: uri,
                BannerShowFile: URL.createObjectURL(imageFile),
                shopBannerUrlFileName: imageFile.name,
              })
              toast.success('Shop Banner Selected.')
            },
            'base64',
            1230,
            425
          )
        } catch (err) {
          toast.error('Something went wrong!')
        }
      }
    }
  }

  businessDocHandler = (event) => {
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
                bussinessDocUrl: uri,
                DocumentShowFile: URL.createObjectURL(imageFile),
                bussinessDocUrlFileName: imageFile.name,
              })
              toast.success('Bussiness Document Selected.')
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

  handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    let isError = { ...this.state.isError }
    switch (name) {
      case 'shopDescription':
        isError.shopDescription =
          value.length < 6 ? 'Atleast 6 characaters required' : ''
        break
      case 'shopCity':
        isError.shopCity =
          value.length < 4 ? 'Atleast 4 characaters required' : ''
        break
      case 'shopState':
        isError.shopState =
          value.length < 4 ? 'Atleast 4 characaters required' : ''
        break
      case 'shopZipCode':
        isError.shopZipCode =
          value.length < 4 ? 'Atleast 4 characaters required' : ''
        break
      case 'shopAddress':
        isError.shopAddress =
          value.length < 6 ? 'Atleast 6 characaters required' : ''
        break
      case 'binNo':
        isError.binNo = value.length < 4 ? 'Atleast 4 characaters required' : ''
        break
      case 'ownerName':
        isError.ownerName =
          value.length < 4 ? 'Atleast 4 characaters required' : ''
        break
      default:
        break
    }
    this.setState({
      isError,
      [name]: value,
    })
  }

  handleParentCheck = (e) => {
    const isActive = e.target?.checked
    this.setState({ isActive })
  }

  handleCountryChange = async (e) => {
    e.preventDefault()
    const { value } = e.target
    const { target } = e

    switch (target.name) {
      case 'countryName':
        this.setState({
          countryName: target.value,
          countryId: target.value.countryId,
          currency: target.value.currency,
          errorCountryName:
            value.length < 4 ? 'Atleast 4 characaters required' : '',
        })
        break
      default:
    }
  }

  updateProfile = async (e) => {
    e.preventDefault()
    if (this.state.shopUrl === '') {
      toast.error('Please fill up the required fields')
      setTimeout(() => {}, 2500)
      return
    }
    //////debugger;
    const {
      shopDescription,
      shopCity,
      shopState,
      shopZipCode,
      shopAddress,
      binNo,
      ownerName,
    } = this.state.isError

    if (
      shopDescription === '' &&
      shopCity === '' &&
      shopState === '' &&
      shopZipCode === '' &&
      shopAddress === '' &&
      binNo === '' &&
      ownerName === ''
    ) {
      const data = {
        shopId: this.state.shopId,
        sellerId: this.state.sellerId,
        shopName: this.state.shopName,
        shopDescription: this.state.shopDescription,
        binNo: this.state.binNo,
        shopCity: this.state.shopCity,
        shopState: this.state.shopState,
        shopZipCode: this.state.shopZipCode,
        shopAddress: this.state.shopAddress,
        ownerName: this.state.ownerName,
        sellerTypeId: this.state.sellerTypeId,
        sellerAccountNo: this.state.sellerAcNo,
        bussinessTypeId: this.state.bussinessTypeId,
        shopUrl: this.state.shopUrl,
        isVerified: this.state.isVerified,
        isActive: this.state.isActive === true ? 'Y' : 'N',
        shopLogoUrl: this.state.shopLogoUrl,
        ownerNidUrl: this.state.ownerNidUrl,
        shopBannerUrl: this.state.shopBannerUrl,
        bussinessDocUrl: this.state.bussinessDocUrl,
        countryId: this.state.countryId,
        //19
        currency: 'BDT',
      }
      await this.props.updateSellerShopRecord(data)
      toast.success('Bussiness Information Updated Successfully')
      setTimeout(() => {
        this.props.history.push('/SellerHome')
      }, 2500)
    } else {
      toast.error('Please fill up the required fields')
      setTimeout(() => {}, 2500)
      return
    }
  }

  clearData = (e) => {
    e.preventDefault()
    this.setState({
      createDate: '',
      createdBy: '',
      isDelete: '',
      roleId: '',
      sellerAcNo: '',
      sellerContactNo: '',
      sellerEmail: '',
      sellerId: '',
      sellerImageUrl: '',
      sellerName: '',
      sellerPassword: '',
      sellerPermanentAddress: '',
      sellerPresentAddress: '',
      sellerPwdSalt: '',
      shopId: '',
      updateBy: '',
      updateDate: '',
      isActive: 'Y',
    })
  }

  shopAvailabilityCheck = async (e) => {
    e.preventDefault()
    //////debugger;
    const data = {
      shopUrl: this.state.shopUrl,
    }

    const res = await this.props.shopAvailable(data)
    if (res && res.type === 'SHOP_URL_AVAILABLE_ERROR') {
      this.setState({
        //false
        shopUrlAvalibleState: false,
      })
    } else {
      this.setState({
        //true
        shopUrlAvalibleState: true,
      })
    }
    if (this.state.CustomerCurrentShopUrl === this.state.shopUrl) {
      this.setState({
        shopUrlAvalibleState: true,
      })
    }
  }

  render() {
    return (
      <div id='wrapper'>
        <BusinessInformation
          key='BusinessInformation'
          name='BusinessInformation'
          {...this.state}
          handleChange={this.handleChange}
          handleParentCheck={this.handleParentCheck}
          handleCountryChange={this.handleCountryChange}
          updateProfile={this.updateProfile}
          shopLogoUrldHandler={this.shopLogoUrldHandler}
          businessDocHandler={this.businessDocHandler}
          shopBannerdHandler={this.shopBannerdHandler}
          shopAvailability={this.shopAvailabilityCheck}
          allCountries={this.props.allCountries}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sellerProfile: state.sellerProfileReducer.shopDetails,
  allCountries: state.addressReducer.allCountries,
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateSellerShopRecord: (data) =>
      dispatch(sellerProfileAction.updateSellerProfileRecord(data)),
    shopAvailable: (data) =>
      dispatch(sellerProfileAction.shopUrlAvailableRecord(data)),
    //
    getShopDetailsBySellerIdRecord: (index) =>
      dispatch(sellerProfileAction.getShopDetailsBySellerIdRecord(index)),
    getAllCountryRecord: (index) =>
      dispatch(addressAction.getAllCountryRecord(index)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(businessInformationContainer)
