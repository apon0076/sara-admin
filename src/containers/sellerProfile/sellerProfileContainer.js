import React, { Component } from 'react'
import SellerProfile from '../../components/sellerProfile/SellerProfile'
import authenticationService from '../../store/services/authenticationService'
import { toast, ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'
import * as sellerProfileAction from '../../store/actions/sellerProfileAction'

class sellerProfileContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchId: '',
      sellerId: '',
      sellerEmail: '',
      oldPassword: '',
      newPassword: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.updateSellerPassword = this.updateSellerPassword.bind(this)
    this.clearData = this.clearData.bind(this)
    this.removeLocalStorage = this.removeLocalStorage.bind(this)
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()
    if (roleId === '2') {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
        sellerId: this.props.sellerProfileById.sellerId,
        sellerEmail: this.props.sellerProfileById.sellerEmail,
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push('/SellerLogin')
    }
    //End Temporary Authentication
  }

  handleChange = (e) => {
    const { target } = e
    switch (target.name) {
      case 'sellerEmail':
        this.setState({ sellerEmail: target.value })
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
  //

  updateSellerPassword = async (values) => {
    //e.preventDefault();

    const data = {
      sellerId: this.props.sellerProfileById.sellerId,
      sellerEmail: this.props.sellerProfileById.sellerEmail,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    }

    let result = await this.props.updateSellerPasswordRecord(data)
    if (result.payload && result.payload.success.succeed === true) {
      toast.success('Password Updated Successfully!!')
      setTimeout(() => {
        this.removeLocalStorage()
        this.props.history.push('/SellerLogin')
      }, 2000)
    }
    if (result.payload && result.payload.success.succeed !== true) {
      toast.warning(result.payload.success.errors[0])
      setTimeout(() => {
        this.clearData()
      }, 2000)
    }
  }

  clearData = () => {
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
    localStorage.removeItem('seller-remember')
  }

  render() {
    return (
      <div id='wrapper'>
        <SellerProfile
          key='SellerProfile'
          {...this.state}
          sellerProfileById={this.props.sellerProfileById}
          handleChange={this.handleChange}
          values={this.values}
          searchId={this.props.searchId}
          updateSellerPassword={this.updateSellerPassword}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

// Making vendors  array available in  props
const mapStateToProps = (state) => ({
  sellerProfileById: state.sellerProfileReducer.sellerProfileById,
  searchId: state.searchId,
  handleChange: state.handleChange,
  data: state.sellerProfileReducer.data,
})

// Making available in  props
const mapDispatchToProps = (dispatch) => {
  return {
    getSellerProfileRecord: () =>
      dispatch(sellerProfileAction.getSellerProfileRecord()),
    getSellerProfileByIdRecord: (index) =>
      dispatch(sellerProfileAction.getSellerProfileByIdRecord(index)),
    updateSellerPasswordRecord: (data) =>
      dispatch(sellerProfileAction.updateSellerPasswordRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(sellerProfileContainer)
