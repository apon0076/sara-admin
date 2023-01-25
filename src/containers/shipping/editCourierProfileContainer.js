import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import * as shippingAction from '../../store/actions/shippingAction'
import * as addressAction from '../../store/actions/addressAction'
import authenticationService from '../../store/services/authenticationService'
import EditCourierProfile from '../../components/shipping/EditCourierProfile'
import Resizer from 'react-image-file-resizer'

class editCourierProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courierId: 0,
      courierUrl: '',
      courierName: '',
      courierLogoUrl: '',
      courierDescription: '',
      contactPerson: '',
      contactPersonNo: '',
      binNo: '',
      vatNo: '',
      etinNo: '',
      isActive: true,
      contactNo: '',
      email: '',
      cityId: '',
      areaId: '',
      zipCode: '',
      address: '',

      errorCourierUrl: '',
      errorCourierName: '',
      errorCourierLogoUrl: '',
      errorCourierDescription: '',
      errorContactPerson: '',
      errorContactPersonNo: '',
      errorBinNo: '',
      errorVatNo: '',
      errorEtinNo: '',
      errorContactNo: '',
      errorEmail: '',
      errorCityId: '',
      errorAreaId: '',
      errorZipCode: '',
      errorAddress: '',

      showFile: '',

      country: '',
      defaultCountry: [],
      countryId: '',
      countryList: '',

      city: '',
      defaultCity: [],
      cityId: '',
      cityList: '',

      area: '',
      defaultArea: [],
      areaId: '',
      areaName: '',
      areaList: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.saveCourierProfile = this.saveCourierProfile.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.handleParentCheck = this.handleParentCheck.bind(this)
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()
    if (roleId === '1') {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
        courierId: this.props.location.state.rowData.courierId,
        courierUrl: this.props.location.state.rowData.courierUrl,
        courierName: this.props.location.state.rowData.courierName,
        courierLogoUrl: this.props.location.state.rowData.courierLogoUrl,
        courierDescription:
          this.props.location.state.rowData.courierDescription,
        contactPerson: this.props.location.state.rowData.contactPerson,
        contactPersonNo: this.props.location.state.rowData.contactPersonNo,
        binNo: this.props.location.state.rowData.binNo,
        vatNo: this.props.location.state.rowData.vatNo,
        etinNo: this.props.location.state.rowData.etinNo,
        contactNo: this.props.location.state.rowData.contactNo,
        email: this.props.location.state.rowData.email,
        defaultCountry: [
          {
            value: this.props.location.state.rowData.countryId,
            label: this.props.location.state.rowData.countryName,
          },
        ],
        defaultCity: [
          {
            value: this.props.location.state.rowData.cityId,
            label: this.props.location.state.rowData.cityName,
          },
        ],
        defaultArea: [
          {
            value: this.props.location.state.rowData.areaId,
            label: this.props.location.state.rowData.areaName,
          },
        ],
        countryId: this.props.location.state.rowData.countryId,
        countryName: this.props.location.state.rowData.countryName,
        cityId: this.props.location.state.rowData.cityId,
        cityName: this.props.location.state.rowData.cityName,
        areaId: this.props.location.state.rowData.areaId,
        areaName: this.props.location.state.rowData.areaName,
        zipCode: this.props.location.state.rowData.zipCode,
        address: this.props.location.state.rowData.address,
        isActive:
          this.props.location.state.rowData.isActive === 'Y' ? true : false,
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

  handleChange = (e) => {
    const { target } = e
    const { value } = e.target

    switch (target.name) {
      case 'courierUrl':
        this.setState({
          courierUrl: target.value,
          errorCourierUrl:
            value.length < 2 ? 'Atleast 2 characaters required' : '',
        })
        break
      case 'courierName':
        this.setState({
          courierName: target.value,
          errorCourierName:
            value.length < 2 ? 'Atleast 2 characaters required' : '',
        })
        break

      case 'courierDescription':
        this.setState({
          courierDescription: target.value,
          errorCourierDescription:
            value.length < 2 ? 'Atleast 2 characaters required' : '',
        })
        break

      case 'contactPerson':
        this.setState({
          contactPerson: target.value,
          errorContactPerson:
            value.length < 2 ? 'Atleast 2 characaters required' : '',
        })
        break

      case 'contactPersonNo':
        this.setState({
          contactPersonNo: target.value < 0 ? 0 : target.value,
          errorContactPersonNo:
            value.length < 2 ? 'Atleast 2 characaters required' : '',
        })
        break

      case 'binNo':
        this.setState({
          binNo: target.value < 0 ? 0 : target.value,
          errorBinNo: value.length < 2 ? 'Atleast 2 characaters required' : '',
        })
        break

      case 'vatNo':
        this.setState({
          vatNo: target.value < 0 ? 0 : target.value,
          errorVatNo: value.length < 2 ? 'Atleast 2 characaters required' : '',
        })
        break

      case 'etinNo':
        this.setState({
          etinNo: target.value < 0 ? 0 : target.value,
          errorEtinNo: value.length < 2 ? 'Atleast 2 characaters required' : '',
        })
        break

      case 'contactNo':
        this.setState({
          contactNo: target.value < 0 ? 0 : target.value,
          errorContactNo:
            value.length < 2 ? 'Atleast 2 characaters required' : '',
        })
        break

      case 'email':
        this.setState({
          email: target.value,
          errorEmail: value.length < 2 ? 'Atleast 2 characaters required' : '',
        })
        break

      case 'zipCode':
        this.setState({
          zipCode: target.value < 0 ? 0 : target.value,
          errorZipCode:
            value.length < 2 ? 'Atleast 2 characaters required' : '',
        })
        break

      case 'address':
        this.setState({
          address: target.value,
          errorAddress:
            value.length < 2 ? 'Atleast 2 characaters required' : '',
        })
        break

      default:
    }
  }

  handleAddressChange = async (field, e) => {
    switch (field) {
      case 'countryList':
        this.setState({
          defaultCountry: e,
        })

        await this.props.getAllCityRecord(e.value)
        this.setState({
          countryId: e.value,
          defaultArea: '',
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
          defaultCity: e,
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
          defaultArea: '',
        })
        break

      case 'areaList':
        this.setState({
          defaultArea: e,
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

  handleParentCheck = (e) => {
    const isActive = e.target.checked
    this.setState({ isActive })
  }

  resetForm = () => {
    this.setState({
      courierUrl: '',
      courierName: '',
      courierLogoUrl: '',
      courierDescription: '',
      contactPerson: '',
      contactPersonNo: '',
      binNo: '',
      vatNo: '',
      etinNo: '',
      isActive: true,
      contactNo: '',
      email: '',
      cityId: '',
      areaId: '',
      zipCode: '',
      address: '',
    })
  }

  fileSelectedHandler = (event) => {
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
            200,
            200,
            'JPEG',
            100,
            0,
            (uri) => {
              this.setState({
                courierLogoUrl: uri,
                imageName: imageFile.name,
                showFile: URL.createObjectURL(imageFile),
              })
              toast.success('Image Selected.')
            },
            'base64',
            200,
            200
          )
        } catch (err) {
          toast.error('Something went wrong!')
        }
      }
    }
  }

  saveCourierProfile = async (e) => {
    e.preventDefault()

    if (this.state.courierUrl === '') {
      let msg = 'Courier Url Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.courierName === '') {
      let msg = 'Courier Name Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.courierLogoUrl === '') {
      let msg = 'Courier Logo Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.courierDescription === '') {
      let msg = 'Courier Description Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.contactPerson === '') {
      let msg = 'Contact Person Name Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.contactPersonNo === '') {
      let msg = 'Contact Person No. Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.binNo === '') {
      let msg = 'BIN No. Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.vatNo === '') {
      let msg = 'Vat No. Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.etinNo === '') {
      let msg = 'TIN No. Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.contactNo === '') {
      let msg = 'Contact No. Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }
    if (this.state.email === '') {
      let msg = 'Email Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.zipCode === '') {
      let msg = 'ZipCode Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }
    if (this.state.address === '') {
      let msg = 'Address Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    const data = {
      courierId: this.state.courierId,
      courierUrl: this.state.courierUrl,
      courierName: this.state.courierName,
      courierLogoUrl: this.state.courierLogoUrl,
      courierDescription: this.state.courierDescription,
      contactPerson: this.state.contactPerson,
      contactPersonNo: this.state.contactPersonNo,
      binNo: this.state.binNo,
      vatNo: this.state.vatNo,
      etinNo: this.state.etinNo,
      isActive: this.state.isActive === true ? 'Y' : 'N',
      contactNo: this.state.contactNo,
      email: this.state.email,
      cityId: this.state.cityId,
      areaId: typeof this.state.areaId === 'string' ? 0 : this.state.areaId,
      areaName: this.state.areaName,
      zipCode: this.state.zipCode,
      address: this.state.address,
    }

    const result = await this.props.createOrUpdateCourierProfileRecord(data)

    if (result && result.payload.success.succeed === true) {
      if (result.type === 'CREATE_OR_UPDATE_COURIER_PROFILE_SUCCESS') {
        toast.success('Courier Profile Updated Successfully')
        setTimeout(() => {
          this.props.history.push('CourierProfileList')
        }, 2500)
        this.resetForm()
      } else {
        toast.error('Something went wrong, Please try again')
        setTimeout(() => {
          this.resetForm()
          this.props.history.push('CreateCourierProfile')
        }, 2500)
      }
    } else if (result && result.payload.success.succeed === false) {
      toast.error('Courier Already Exists!')
      setTimeout(() => {}, 2500)
    }
  }

  render() {
    return (
      <div id='wrapper'>
        <EditCourierProfile
          key='EditCourierProfile'
          name='Add Courier Type'
          {...this.state}
          handleChange={this.handleChange}
          handleParentCheck={this.handleParentCheck}
          values={this.values}
          saveCourierProfile={this.saveCourierProfile}
          fileSelectedHandler={this.fileSelectedHandler}
          allCountries={this.props.allCountries}
          allCities={this.props.allCities}
          allAreas={this.props.allAreas}
          loading={this.props.loading}
          handleAddressChange={this.handleAddressChange}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.shippingReducer.courierProfile,
  allCountries: state.addressReducer.allCountries,
  allCities: state.addressReducer.allCities,
  allAreas: state.addressReducer.allAreas,
  loading: state.addressReducer.loading,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCountryRecord: () => dispatch(addressAction.getAllCountryRecord()),
    getAllCityRecord: (countryId) =>
      dispatch(addressAction.getAllCityRecord(countryId)),
    getAllAreaRecord: (cityId) =>
      dispatch(addressAction.getAllAreaRecord(cityId)),
    createOrUpdateCourierProfileRecord: (data) =>
      dispatch(shippingAction.createOrUpdateCourierProfileRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editCourierProfileContainer)
