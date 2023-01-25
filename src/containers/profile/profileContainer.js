import React, { Component } from 'react'
import Profile from '../../components/profile/Profile'
import profileService from '../../store/services/profileService'
import authenticationService from '../../store/services/authenticationService'
import { toast, ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'
import * as profileAction from '../../store/actions/profileAction'

class profileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchId: '',
      adminId: '',
      adminName: '',
      adminEmail: '',
      adminContactNo: '',
      adminPresentAddress: '',
      oldPassword: '',
      newPassword: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
    this.goBack = this.goBack.bind(this)
    this.clearData = this.clearData.bind(this)
    this.removeLocalStorage = this.removeLocalStorage.bind(this)
    this.updateAdminPassword = this.updateAdminPassword.bind(this)
  }

  componentDidMount = async (e) => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()
    let userId = profileService.getEmployeeId()
    if (roleId === '1') {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
        adminId: this.props.profileById.adminId,
        adminEmail: this.props.profileById.adminEmail,
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push('/Login')
    }
    //End Temporary Authentication
    await this.props.getProfileByIdRecord(userId)
    this.setState({
      adminId: this.props.profileById[0].adminId,
      adminEmail: this.props.profileById[0].adminEmail,
    })
  }

  handleChange = async (e) => {
    const { target } = e
    switch (target.name) {
      case 'adminId':
        this.setState({ adminId: target.value })
        break
      case 'adminName':
        this.setState({ adminName: target.value })
        break
      case 'adminEmail':
        this.setState({ adminEmail: target.value })
        break
      case 'adminContactNo':
        this.setState({ adminContactNo: target.value })
        break
      case 'adminPresentAddress':
        this.setState({ adminPresentAddress: target.value })
        break
      case 'oldPassword':
        this.setState({ oldPassword: target.value })
        break
      case 'newPassword':
        this.setState({ newPassword: target.value })
        break
      default:
    }
  }

  updateProfile = async (e) => {
    e.preventDefault()
    //////debugger;

    const data = {
      adminId: this.state.adminId,
      adminName: this.state.adminName,
      adminEmail: this.state.adminEmail,
      adminContactNo: this.state.adminContactNo,
      adminPresentAddress: this.state.adminPresentAddress,
    }

    if (data.sizeId === '') {
      data.sizeId = 0
    }

    await this.props.updateProfileRecord(data)

    this.clearData(e)
    this.props.history.push('/Profile')
  }

  //

  updateAdminPassword = async (values) => {
    // e.preventDefault()

    const data = {
      adminId: this.state.adminId,
      adminEmail: this.state.adminEmail,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    }

    let result = await this.props.updateAdminPasswordRecord(data)

    if (result.payload && result.payload.success.succeed === true) {
      toast.success('Password Updated Successfully!!')
      setTimeout(() => {
        this.removeLocalStorage()
        this.props.history.push('/Login')
      }, 2000)
    }
    if (result.payload && result.payload.success.succeed !== true) {
      toast.warning(result.payload.success.errors[0])
      setTimeout(() => {
        this.clearData()
      }, 2000)
    }
  }

  goBack = (e) => {
    e.preventDefault()

    this.props.history.push('/Home')
  }

  clearData = (e) => {
    this.setState({
      oldPassword: '',
      newPassword: '',
    })
  }

  removeLocalStorage = async () => {
    localStorage.removeItem('x-access-token')
    localStorage.removeItem('x-access-employeeId')
    localStorage.removeItem('x-access-roleId')
    localStorage.removeItem('x-access-token-expiration')
    localStorage.removeItem('admin-remember')
  }

  render() {
    return (
      <div className='wrapper'>
        <Profile
          key='Profile'
          {...this.state}
          profileById={this.props.profileById}
          handleChange={this.handleChange}
          values={this.values}
          searchId={this.props.searchId}
          goBack={this.goBack}
          checkValidation={this.checkValidation}
          updateAdminPassword={this.updateAdminPassword}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

// Making vendors  array available in  props
const mapStateToProps = (state) => ({
  profiles: state.profileReducer.profiles,
  profileById: state.profileReducer.profileById,
  searchId: state.searchId,
  handleChange: state.handleChange,
})

// Making available in  props
const mapDispatchToProps = (dispatch) => {
  return {
    getProfileRecord: () => dispatch(profileAction.getProfileRecord()),
    getProfileByIdRecord: (userId) =>
      dispatch(profileAction.getProfileByIdRecord(userId)),
    updateAdminPasswordRecord: (data) =>
      dispatch(profileAction.updateAdminPasswordRecord(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(profileContainer)
