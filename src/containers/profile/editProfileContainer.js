import React, { Component } from 'react'
import sellerService from '../../store/services/sellerService'
import authenticationService from '../../store/services/authenticationService'
import { toast, ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'
import * as profileAction from '../../store/actions/profileAction'
import EditProfile from '../../components/profile/EditProfile'
import Resizer from 'react-image-file-resizer'

class editProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      adminContactNo: '',
      adminEmail: '',
      adminId: '',
      adminImageUrl: '',
      adminName: '',
      adminPermanentAddress: '',
      adminPresentAddress: '',
      dateOfBirth: '',
      genderId: '',
      genderName: '',
      isActive: '',
      roleId: '',
      //
      designationId: '',
      employeeId: '',
      nidNo: '',
      //
      adminProfilePicFileName: '',
      showFile: '',
      //
      //
      isError: {
        adminName: '',
        adminContactNo: '',
        adminPresentAddress: '',
        adminPermanentAddress: '',
        nidNo: '',
        dateOfBirth: '',
      },
    }

    this.handleChange = this.handleChange.bind(this)
    this.clearData = this.clearData.bind(this)
    this.fileSelectedHandlerSellerLogo =
      this.fileSelectedHandlerSellerLogo.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
  }
  //////debugger;

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

    let userId = await sellerService.getEmployeeId()
    await this.props.getProfileByIdRecord(userId)
    {
      this.props.profileById.map((profile) =>
        this.setState({
          adminContactNo: profile.adminContactNo,
          adminEmail: profile.adminEmail,
          adminId: profile.adminId,
          adminImageUrl: profile.adminImageUrl,
          adminName: profile.adminName,
          adminPermanentAddress: profile.adminPermanentAddress,
          adminPresentAddress: profile.adminPresentAddress,
          dateOfBirth: profile.dateOfBirth,
          genderId: profile.genderId,
          genderName: profile.genderName,
          isActive: profile.isActive,
          roleId: profile.roleId,
          designationId: profile.designationId,
          employeeId: profile.employeeId,
          nidNo: profile.nidNo,
        })
      )
    }
  }

  //////debugger;

  handleChange = (e) => {
    // e.preventDefault()
    const { name, value } = e.target
    let isError = { ...this.state.isError }
    switch (name) {
      case 'adminName':
        isError.adminName =
          value.length < 4 ? 'Atleast 4 characaters required' : ''
        break
      case 'adminContactNo':
        isError.adminContactNo =
          value.length < 11 || value.length > 11
            ? 'Please, enter a valid number'
            : ''
        break
      case 'adminPresentAddress':
        isError.adminPresentAddress =
          value.length < 4 ? 'Please, enter a valid address' : ''
        break
      case 'adminPermanentAddress':
        isError.adminPermanentAddress =
          value.length < 4 ? 'Please, enter a valid address' : ''
        break
      case 'nidNo':
        isError.nidNo = value.length < 4 ? 'Please, enter a valid address' : ''
        break
      case 'dateOfBirth':
        isError.dateOfBirth =
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
      if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        toast.error('Select a valid image.')
        return false
      }
      fileInput = true
    }
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
              adminImageUrl: uri,
              adminProfilePicFileName: imageFile.name,
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

  updateProfile = async (e) => {
    e.preventDefault()

    if (this.state.adminName === '') {
      let msg = 'Select Admin Name!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.adminContactNo === '') {
      let msg = 'Select Admin Contact!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.nidNo === '') {
      let msg = 'Select Admin NID Number!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.adminPresentAddress === '') {
      let msg = 'Select Present Address!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.adminPermanentAddress === '') {
      let msg = 'Select Permanent Address!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    //////debugger;
    const {
      adminName,
      adminContactNo,
      adminPresentAddress,
      adminPermanentAddress,
    } = this.state.isError
    if (
      adminName === '' &&
      adminContactNo === '' &&
      adminPresentAddress === '' &&
      adminPermanentAddress === ''
    ) {
      const data = {
        adminId: this.state.adminId,
        roleId: this.state.roleId,
        adminName: this.state.adminName,
        adminEmail: this.state.adminEmail,
        genderId: this.state.genderId,
        dateOfBirth: this.state.dateOfBirth,
        adminImageUrl: this.state.adminImageUrl,
        adminContactNo: this.state.adminContactNo,
        adminPresentAddress: this.state.adminPresentAddress,
        adminPermanentAddress: this.state.adminPermanentAddress,
        isActive: this.state.isActive,
        designationId: this.state.designationId,
        employeeId: this.state.employeeId,
        nidNo: this.state.nidNo,
      }

      const result = await this.props.updateProfileRecord(data)

      if (result.type === 'UPDATE_PROFILE_SUCCESS') {
        toast.success('Profile Updated Successfully')
        setTimeout(() => {
          this.props.history.push('/Profile')
        }, 2500)
        this.clearData(e)
      } else {
        toast.error('Something went wrong, Please try again')
        setTimeout(() => {
          this.clearData(e)
        }, 2500)
      }
    }
  }

  clearData = (e) => {
    e.preventDefault()
    this.setState({
      adminName: '',
      adminEmail: '',
      adminContactNo: '',
      adminPresentAddress: '',
      adminProfilePic: '',
    })
  }

  render() {
    return (
      <div id='page-wrapper'>
        <EditProfile
          profileById={this.props.profileById}
          handleChange={this.handleChange}
          updateProfile={this.updateProfile}
          fileSelectedHandlerSellerLogo={this.fileSelectedHandlerSellerLogo}
          {...this.state}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  profileById: state.profileReducer.profileById,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getProfileByIdRecord: (data) =>
      dispatch(profileAction.getProfileByIdRecord(data)),
    updateProfileRecord: (data) =>
      dispatch(profileAction.updateProfileRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editProfileContainer)
