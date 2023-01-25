import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import * as paymentMethodAction from '../../store/actions/paymentMethodAction'
import * as addressAction from '../../store/actions/addressAction'
import CreatePaymentMethod from '../../components/paymentMethod/CreatePaymentMethod'
import authenticationService from '../../store/services/authenticationService'
import { convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import Resizer from 'react-image-file-resizer'

class createPaymentMethodContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paymentMethodId: 0,
      methodName: '',
      errorMethodName: '',
      editorState: EditorState.createEmpty(),
      description: '',
      errorDescription: '',
      status: false,
      duration: false,
      startDate: new Date(),
      endDate: new Date(),
      logo: '',
      logoName: '',
      showLogo: '',
      email: '',
      errorEmail: '',
      web: '',
      webPortalLink: '',
      contactNo: '',
      contactPerson: '',

      country: '',
      countryId: '',
      countryList: '',

      city: '',
      cityId: 0,
      cityList: '',

      area: '',
      areaId: 0,
      areaName: '',
      areaList: '',

      postalCode: '',

      address: '',
      isActive: true,
      displayOrder: '',

      tranCharge: '',
      tranChargeBearer: '',
      tranChargeBearerList: [
        {
          value: 'MP',
          label: 'Market Place',
        },
        {
          value: 'CS',
          label: 'Customer',
        },
      ],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleParentCheck = this.handleParentCheck.bind(this)
    this.handleStartDate = this.handleStartDate.bind(this)
    this.handleEndDate = this.handleEndDate.bind(this)
    this.savePaymentMethod = this.savePaymentMethod.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.logoUrlHandler = this.logoUrlHandler.bind(this)
    this._uploadImageCallBack = this._uploadImageCallBack.bind(this)
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
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

  logoUrlHandler = (event) => {
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
            180,
            180,
            'JPEG',
            100,
            0,
            (uri) => {
              this.setState({
                logo: uri,
                logoName: imageFile.name,
                showLogo: URL.createObjectURL(imageFile),
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

  onEditorStateChange = (editorState) => {
    let value = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    this.setState({
      editorState,
      description: value,
      errorDescription:
        value.length < 12 ? 'At least 4 characters required' : '',
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
    const { value } = e.target
    const { target } = e

    switch (target.name) {
      case 'methodName':
        this.setState({
          methodName: target.value,
          errorMethodName: value.length < 0 ? 'Method name is required' : '',
        })
        break
      case 'description':
        this.setState({ description: target.value })
        break
      case 'email':
        this.setState({ email: target.value })
        break
      case 'web':
        this.setState({ web: target.value })
        break
      case 'webPortalLink':
        this.setState({ webPortalLink: target.value })
        break
      case 'contactNo':
        this.setState({ contactNo: target.value < 0 ? 0 : target.value })
        break
      case 'contactPerson':
        this.setState({ contactPerson: target.value })
        break
      case 'postalCode':
        this.setState({ postalCode: target.value < 0 ? 0 : target.value })
        break
      case 'address':
        this.setState({ address: target.value })
        break
      case 'displayOrder':
        this.setState({ displayOrder: target.value < 0 ? 0 : target.value })
        break
      case 'tranCharge':
        this.setState({ tranCharge: target.value < 0 ? 0 : target.value })
        break
      case 'tranChargeBearer':
        this.setState({ tranChargeBearer: target.value })
        break

      default:
    }
  }

  handleParentCheck = (e) => {
    const { target } = e
    switch (target.name) {
      case 'status':
        this.setState({ status: target.checked })
        break
      case 'duration':
        this.setState({ duration: target.checked, startDate: new Date(), endDate: new Date() })
        break
      case 'isActive':
        this.setState({ isActive: target.checked })
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

  handleAddressChange = async (field, e) => {
    switch (field) {
      case 'countryList':
        this.setState({
          country: e,
        })
        await this.props.getAllCityRecord(e.value)
        this.setState({
          countryId: e.value,
          area: '',
        })
        this.setState({
          cityList: this.props.allCities.map(
            ({ cityName: label, cityId: value }) => ({
              label,
              value,
            })
          ),
        })
        break

      case 'cityList':
        this.setState({
          city: e,
        })
        await this.props.getAllAreaRecord(e.value)
        this.setState({
          areaList: this.props.allAreas.map(
            ({ areaName: label, areaId: value }) => ({
              label,
              value,
            })
          ),
        })
        this.setState({
          cityId: e.value,
          area: '',
        })
        break

      case 'areaList':
        this.setState({
          area: e,
        })
        this.setState({
          areaId: e.value,
          areaName: e.label,
        })
        break

      default:
        break
    }
  }

  contactNoValidation() {
    const regex = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/
    return !(
      !this.state.contactNo || regex.test(this.state.contactNo) === false
    )
  }

  emailValidation() {
    const regex =
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    return !(!this.state.email || regex.test(this.state.email) === false)
  }

  savePaymentMethod = async (e) => {
    e.preventDefault()

    if (this.state.methodName === '') {
      let msg = 'Method Name is required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.description === '') {
      let msg = 'Description is required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.contactNo === !'') {
      const isContactNoValid = this.contactNoValidation()
      if (!isContactNoValid) {
        let msg = 'Phone Number not valid!'
        toast.error(msg)
        setTimeout(() => {}, 3000)
        return
      }
    }

    if (this.state.email === !'') {
      const isEmailValid = this.emailValidation()
      if (!isEmailValid) {
        let msg = 'E-mail not valid!'
        toast.error(msg)
        setTimeout(() => {}, 3000)
        return
      }
    }
    if (this.state.tranCharge === '') {
      let msg = 'Transaction Charge is required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }
    if (this.state.tranChargeBearer === '') {
      let msg = 'Transaction Charge Bearer is required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }
    if (this.state.displayOrder === 0) {
      let msg = 'Display Order is required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }
    if (this.state.logo === '') {
      let msg = 'Method Logo is required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    const data = {
      paymentMethodId: this.state.paymentMethodId,
      methodName: this.state.methodName,
      description: this.state.description,
      status: this.state.status === true ? 'Y' : 'N',
      duration: this.state.duration === true ? 'Y' : 'N',
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      logo: this.state.logo,
      email: this.state.email,
      web: this.state.web,
      webPortalLink: this.state.webPortalLink,
      contactNo: this.state.contactNo,
      contactPerson: this.state.contactPerson,
      cityId: this.state.cityId,
      areaId: typeof this.state.areaId === 'string' ? 0 : this.state.areaId,
      postalCode: this.state.postalCode,
      address: this.state.address,
      isActive: this.state.isActive === true ? 'Y' : 'N',
      displayOrder: this.state.displayOrder,
      tranCharge: this.state.tranCharge,
      tranChargeBearer: this.state.tranChargeBearer,
    }

    const result = await this.props.createOrUpdatePaymentMethodRecord(data)

    if (result && result?.payload?.success?.succeed === true) {
      if (result.type === 'CREATE_OR_UPDATE_PAYMENT_METHOD_SUCCESS') {
        toast.success('Payment Method Created Successfully')
        setTimeout(() => {
          this.props.history.push('PaymentMethodList')
        }, 2500)
        this.resetForm()
      } else {
        toast.error('Something went wrong, Please try again')
        setTimeout(() => {
          this.resetForm()
          this.props.history.push('CreatePaymentMethod')
        }, 2500)
      }
    } else if (result && result?.payload?.success?.succeed === false) {
      toast.error('Payment Method Already Exists!')
      setTimeout(() => {}, 2500)
    }
  }

  resetForm = () => {
    this.setState({
      paymentMethodId: 0,
      methodName: '',
      errorMethodName: '',
      editorState: EditorState.createEmpty(),
      description: '',
      errorDescription: '',
      status: '',
      duration: '',
      startDate: new Date(),
      endDate: new Date(),
      logo: '',
      logoName: '',
      showLogo: '',
      email: '',
      web: '',
      webPortalLink: '',
      contactNo: '',
      contactPerson: '',
      countryId: '',
      cityId: '',
      areaId: '',
      country: '',
      city: '',
      area: '',
      areaName: '',
      countryList: '',
      cityList: '',
      areaList: '',
      postalCode: '',
      address: '',
      isActive: '',

      tranCharge: 0,
      tranChargeBearer: '',
    })
  }

  render() {
    return (
      <div id='wrapper'>
        <CreatePaymentMethod
          key='CreatePaymentMethod'
          name='Create Payment Method'
          {...this.state}
          values={this.values}
          handleChange={this.handleChange}
          handleParentCheck={this.handleParentCheck}
          handleStartDate={this.handleStartDate}
          handleEndDate={this.handleEndDate}
          onEditorStateChange={this.onEditorStateChange}
          _uploadImageCallBack={this._uploadImageCallBack}
          logoUrlHandler={this.logoUrlHandler}
          savePaymentMethod={this.savePaymentMethod}
          resetForm={this.resetForm}
          allCountries={this.props.allCountries}
          allCities={this.props.allCities}
          allAreas={this.props.allAreas}
          loading={this.props.loading}
          handleAddressChange={this.handleAddressChange}
          tranChargeBearerList={this.state.tranChargeBearerList}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.paymentMethodReducer.data,
  allCountries: state.addressReducer.allCountries,
  allCities: state.addressReducer.allCities,
  allAreas: state.addressReducer.allAreas,
  loading: state.addressReducer.loading,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createOrUpdatePaymentMethodRecord: (data) =>
      dispatch(paymentMethodAction.createOrUpdatePaymentMethodRecord(data)),
    getAllCountryRecord: () => dispatch(addressAction.getAllCountryRecord()),
    getAllCityRecord: (countryId) =>
      dispatch(addressAction.getAllCityRecord(countryId)),
    getAllAreaRecord: (cityId) =>
      dispatch(addressAction.getAllAreaRecord(cityId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createPaymentMethodContainer)
