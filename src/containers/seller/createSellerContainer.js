import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import * as bussinessTypeAction from '../../store/actions/bussinessTypeAction'
import * as sellerAction from '../../store/actions/sellerAction'
import PersonalInfo from '../../components/seller/PersonalInfo'
import SellerCredential from '../../components/seller/SellerCredential'
import SellerShopInfo from '../../components/seller/SellerShopInfo'
import * as addressAction from '../../store/actions/addressAction'
import Resizer from 'react-image-file-resizer'

export class StepForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      step: 1,

      // step 1
      sellerName: '',
      userContactNo: '',
      userEmail: '',
      acceptTerms: '',

      // step 2
      tokenId: '',
      tokenCode: '',

      // step 3

      sellerPassword: '',
      sellerTypeId: '',
      ownerName: '',
      shopName: '',
      shopDescription: '',
      binNo: '',
      shopCity: '',
      shopState: '',
      shopAddress: '',
      shopZipCode: '',

      ownerNidUrl: '',
      shopLogoUrl: '',
      bussinessDocUrl: '',
      isSellerDelivered: false,
      files: [],
      NIDFile: '', // to store the Single pictures in base64 format.
      ShopLogoFile: '', // to store the Single pictures in base64 format.
      BusDocFile: '', // to store the Single pictures in base64 format.

      country: '',
      countryId: '',
      countryList: '',

      bussinessType: '',
      bussinessTypeId: '',
      bussinessTypeList: '',

      sellerCurrency: 'BDT',
      showNIDFile: '',
      showShopLogoFile: '',

      redirect: false,
      businessTypesData: [],
      countries: [],
      //
      isEmailAvailable: true,
      isContactAvailable: true,
    }

    this.fileSelectedHandlerNid = this.fileSelectedHandlerNid.bind(this)
    this.fileSelectedHandlerLogo = this.fileSelectedHandlerLogo.bind(this)
    this.fileSelectedHandlerBusinessDoc =
      this.fileSelectedHandlerBusinessDoc.bind(this)
    this.clearData = this.clearData.bind(this)
  }

  componentDidMount = async () => {
    await this.props.getBussinessTypeRecord()
    this.setState({
      bussinessTypeList: this.props.bussinessTypes.map(
        ({ bussinessTypeName: label, bussinessTypeId: value }) => ({
          label,
          value,
        })
      ),
    })
    await this.props.getAllCountryRecord()
    this.setState({
      countryList: this.props.allCountries.map(
        ({ countryName: label, countryId: value }) => ({
          label,
          value,
        })
      ),
    })
  }

  fileSelectedHandlerNid = (e) => {
    const imageFile = e.target.files[0]
    //1)    CHECK IF IT'S A IMAGE
    let fileInput = false
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
            640,
            480,
            'JPEG',
            100,
            0,
            (uri) => {
              this.setState({
                ownerNidUrl: uri,
                NIDFile: imageFile,
                showNIDFile: URL.createObjectURL(imageFile),
              })
              toast.success('NID Image Selected.')
            },
            'base64',
            640,
            480
          )
        } catch (err) {
          toast.error('Something went wrong!')
        }
      }
    }
  }

  fileSelectedHandlerLogo = (e) => {
    const ShopLogoImageFile = e.target.files[0]
    //1)    CHECK IF IT'S A IMAGE
    let ShopLogoFileInput = false
    if (ShopLogoImageFile) {
      if (!ShopLogoImageFile.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        toast.error('Select a valid image.')
        return false
      }
      ShopLogoFileInput = true
      if (ShopLogoFileInput) {
        try {
          Resizer.imageFileResizer(
            ShopLogoImageFile,
            180,
            180,
            'JPEG',
            100,
            0,
            (uri) => {
              this.setState({
                shopLogoUrl: uri,
                ShopLogoFile: ShopLogoImageFile,
                showShopLogoFile: URL.createObjectURL(ShopLogoImageFile),
              })
              toast.success('Shop Logo Image Selected.')
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

  fileSelectedHandlerBusinessDoc = (e) => {
    //////debugger;

    //---------------
    const BusDocImageFile = e.target.files[0]
    //1)    CHECK IF IT'S A IMAGE
    let BusDocFileInput = false
    if (BusDocImageFile) {
      if (!BusDocImageFile.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        toast.error('Select a valid image.')
        return false
      }
      BusDocFileInput = true
      if (BusDocFileInput) {
        try {
          Resizer.imageFileResizer(
            BusDocImageFile,
            1000,
            1000,
            'JPEG',
            100,
            0,
            (uri) => {
              this.setState({
                bussinessDocUrl: uri,
                BusDocFile: BusDocImageFile,
                showBusDocFile: URL.createObjectURL(BusDocImageFile),
              })
              toast.success('Business Document Image Selected.')
            },
            'base64',
            1000,
            1000
          )
        } catch (err) {
          toast.error('Something went wrong!')
        }
      }
    }
  }

  handleChange = (e) => {
    const { target } = e
    const { value } = e.target

    switch (target.name) {
      case 'ownerName':
        this.setState({
          ownerName: target.value,
        })
        break

      case 'shopName':
        this.setState({
          shopName: target.value,
        })
        break

      case 'shopCity':
        this.setState({
          shopCity: target.value,
        })
        break

      case 'shopState':
        this.setState({
          shopState: target.value,
        })
        break

      case 'shopDescription':
        this.setState({
          shopDescription: target.value,
        })
        break

      case 'shopAddress':
        this.setState({
          shopAddress: target.value,
        })
        break

      case 'shopZipCode':
        this.setState({
          shopZipCode: target.value,
        })
        break

      case 'binNo':
        this.setState({
          binNo: target.value,
        })
        break

      default:
    }
  }

  handleBusinessTypesChange = async (field, e) => {
    switch (field) {
      case 'bussinessTypeList':
        this.setState({
          bussinessType: e,
        })
        this.setState({
          bussinessTypeId: e.value,
        })
        break

      default:
        break
    }
  }
  handleAddressChange = async (field, e) => {
    switch (field) {
      case 'countryList':
        this.setState({
          country: e,
        })
        this.setState({
          countryId: e.value,
        })
        break

      default:
        break
    }
  }

  clearData = (e) => {
    //e.preventDefault();
    this.setState({
      sellerName: '',
      ownerName: '',
      shopName: '',
      shopDescription: '',
      binNo: '',
      shopCity: '',
      shopState: '',
      shopAddress: '',
      shopZipCode: '',
      bussinessTypeId: '',
      ownerNidUrl: '',
      shopLogoUrl: '',
      bussinessDocUrl: '',
      sellerCurrency: '',
    })
  }

  nextStep = async (e) => {
    const { step } = this.state
    const sellerName = e.sellerName
    const userContactNo = e.userContactNo
    const userEmail = e.userEmail
    const acceptTerms = e.acceptTerms

    const data = {
      userContactNo: e.userContactNo,
      userEmail: e.userEmail,
    }
    const dataemail = await this.props.isEmailAvailable(data.userEmail)
    const datacontact = await this.props.isContactAvailable(data.userContactNo)

    if (
      dataemail.payload.success.succeed === true &&
      datacontact.payload.success.succeed === true
    ) {
      await this.props.createSellerTokenRecord(data)

      this.setState({
        step: step + 1,
        sellerName: sellerName,
        userContactNo: userContactNo,
        userEmail: userEmail,
        acceptTerms: acceptTerms,
        //
        isEmailAvailable: true,
        isContactAvailable: true,
      })
    } else if (
      dataemail.payload.success.succeed === false &&
      datacontact.payload.success.succeed === false
    ) {
      this.setState({
        isContactAvailable: false,
        isEmailAvailable: false,
      })
      setTimeout(
        () =>
          this.setState({ isContactAvailable: true, isEmailAvailable: true }),
        2000
      )
    } else if (dataemail.payload.success.succeed === false) {
      this.setState({
        isEmailAvailable: false,
      })

      setTimeout(() => this.setState({ isEmailAvailable: true }), 2000)
    } else if (datacontact.payload.success.succeed === false) {
      this.setState({
        isContactAvailable: false,
      })

      setTimeout(() => this.setState({ isContactAvailable: true }), 2000)
    }
  }

  nextStepCredential = async (e) => {
    const { step } = this.state
    const tokentId = localStorage.getItem('x-access-tokenId')
    const sellerName = this.state.sellerName
    const userContactNo = this.state.userContactNo
    const userEmail = this.state.userEmail
    const acceptTerms = this.state.acceptTerms

    const sellerPassword = e.sellerPassword
    const rePassword = e.rePassword

    const data = {
      tokenId: tokentId,
      tokenCode: e.tokenCode,
    }

    const response = await this.props.sellerTokenVerifyRecord(data)
    if (response.payload.success.succeed === false) {
      toast.warning('Token code is not correct!')

      return false
    }

    this.setState({
      step: step + 1,
      sellerName: sellerName,
      userContactNo: userContactNo,
      userEmail: userEmail,
      sellerPassword: sellerPassword,
      rePassword: rePassword,
      acceptTerms: acceptTerms,
    })
  }

  saveSellerInfo = async (e) => {
    e.preventDefault()

    const data = {
      sellerName: this.state.sellerName,
      sellerContactNo: this.state.userContactNo,
      sellerEmail: this.state.userEmail,
      sellerPassword: this.state.sellerPassword,
      shopName: this.state.shopName,
      sellerTypeId: 1,
      shopLogoUrl: this.state.shopLogoUrl,
      bussinessTypeId: this.state.bussinessTypeId,
      shopDescription: this.state.shopDescription,
      binNo: this.state.binNo,
      shopCity: this.state.shopCity,
      shopState: this.state.shopState,
      shopZipCode: this.state.shopZipCode,
      shopAddress: this.state.shopAddress,
      ownerName: this.state.ownerName,
      ownerNidUrl: this.state.ownerNidUrl,
      bussinessDocUrl: this.state.bussinessDocUrl,
      isSellerDelivered: 'N',
      sellerCurrency:
        this.state.countryId === 19
          ? 'BDT'
          : this.state.countryId === 45
          ? 'CNY'
          : this.state.countryId === 101
          ? 'INR'
          : this.state.countryId === 232
          ? 'GBP'
          : this.state.countryId === 233
          ? 'USD'
          : 'USD',
    }

    const response = await this.props.createSellerRecord(data)

    if (response && response?.payload?.success?.succeed === true) {
      if (response.type === 'CREATE_SELLER_SUCCESS') {
        toast.info('Registration Successful! Redirection to Login')
        setTimeout(() => {
          this.props.history.push('SellerLogin')
        }, 2500)
      } else {
        toast.error('Something went wrong, Please try again')
        setTimeout(() => {
          this.setState({
            step: 1,
          })
        }, 2500)
      }
    } else if (response && response?.payload?.success?.succeed === false) {
      toast.error('Seller Already Exists!')
      setTimeout(() => {}, 2500)
    }
    if (response.type === 'CREATE_SELLER_ERROR') {
      toast.error('Something Went Wrong!! Try again later.')
      setTimeout(() => {
        this.setState({
          step: 1,
        })
      }, 2500)
    }

    if (response.payload.error) {
      toast.error('Something Went Wrong!!!Try again later.')
      setTimeout(() => {
        this.setState({
          step: 1,
        })
      }, 2500)
    }

    this.clearData()
  }

  showStep = () => {
    const { sellerName, tokenId, tokenCode, userContactNo, userEmail, step } =
      this.state

    if (step === 1)
      return (
        <PersonalInfo
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          sellerName={sellerName}
          userContactNo={userContactNo}
          userEmail={userEmail}
          isEmailAvailable={this.state.isEmailAvailable}
          isContactAvailable={this.state.isContactAvailable}
          sellerLoadingInfoFromReducer={this.props.sellerInfoFromReducer}
        />
      )
    if (step === 2)
      return (
        <>
          <SellerCredential
            nextStepCredential={this.nextStepCredential}
            handleChange={this.handleChange}
            tokenId={tokenId}
            tokenCode={tokenCode}
          />
          <ToastContainer autoClose={2500} />
        </>
      )

    if (step === 3)
      return (
        <>
          <SellerShopInfo
            name='Seller Shop Info'
            key='SellerShopInfo'
            saveSellerInfo={this.saveSellerInfo}
            {...this.state}
            values={this.values}
            businessTypes={this.props.businessTypes}
            allCountries={this.props.allCountries}
            handleChange={this.handleChange}
            fileSelectedHandlerNid={this.fileSelectedHandlerNid}
            fileSelectedHandlerLogo={this.fileSelectedHandlerLogo}
            fileSelectedHandlerBusinessDoc={this.fileSelectedHandlerBusinessDoc}
            clearData={this.clearData}
            handleAddressChange={this.handleAddressChange}
            handleBusinessTypesChange={this.handleBusinessTypesChange}
          />
          <ToastContainer autoClose={2500} />
        </>
      )
  }

  render() {
    //const { step } = this.state;
    return <>{this.showStep()}</>
  }
}

const mapStateToProps = (state) => ({
  bussinessTypes: state.bussinessTypeReducer.bussinessTypes,
  sellerInfoFromReducer: state.sellerReducer.loading,
  allCountries: state.addressReducer.allCountries,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCountryRecord: () => dispatch(addressAction.getAllCountryRecord()),
    getBussinessTypeRecord: () =>
      dispatch(bussinessTypeAction.getBussinessTypeRecord()),
    createSellerTokenRecord: (data) =>
      dispatch(sellerAction.createSellerTokenRecord(data)),
    sellerTokenVerifyRecord: (data) =>
      dispatch(sellerAction.sellerTokenVerifyRecord(data)),
    createSellerRecord: (data) =>
      dispatch(sellerAction.createSellerRecord(data)),
    isEmailAvailable: (data) =>
      dispatch(sellerAction.sellerEmailAvailableRecord(data)),
    isContactAvailable: (data) =>
      dispatch(sellerAction.sellerMobileNumberAvailableRecord(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StepForm)
