import React, { Component } from 'react'
import { connect } from 'react-redux'
import sellerService from '../../store/services/sellerService'
import authenticationService from '../../store/services/authenticationService'
import * as sellerAction from '../../store/actions/sellerAction'
import * as sellerProfileAction from '../../store/actions/sellerProfileAction'
import * as addressAction from '../../store/actions/addressAction'
import SellerReturnPolicy from '../../components/seller/SellerReturnPolicy'
import { toast, ToastContainer } from 'react-toastify'

class sellerReturnPolicyContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sellerReturnPolicyId: 0,
      sellerId: '',
      shopId: '',
      duration: 0,
      returnPolicy: '',
      isActive: true,
      isApprove: 'N',
      isError: {
        duration: 0,
        returnPolicy: '',
      },
    }

    this.handleChange = this.handleChange.bind(this)
    this.saveReturnPolicy = this.saveReturnPolicy.bind(this)
    this.clearData = this.clearData.bind(this)
    this.handleParentCheck = this.handleParentCheck.bind(this)
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let userId = sellerService.getEmployeeId()
    let roleId = authenticationService.getRoleId()
    if (roleId === '2') {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
        // sellerId: this.props.sellerProfileById.sellerId,
        // shopId: this.props.sellerProfileById.shopId,
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push('/SellerLogin')
    }
    //End Temporary Authentication
    // await this.props.getAllCountryRecord()

    // let shopId = this.props.sellerProfileById.shopId
    // let sellerId = this.props.sellerProfileById.sellerId

    await this.props.getShopDetailsBySellerIdRecord(userId)

    this.props.sellerProfile[0] &&
      this.setState({
        sellerId: this.props.sellerProfile[0].sellerId,
        shopId: this.props.sellerProfile[0].shopId,
      })

    await this.props.getSellerReturnPolicyRecord(this.state.sellerId)

    {
      this.props.sellerReturnPolicy.map((data) =>
        this.setState({
          sellerReturnPolicyId: data.sellerReturnPolicyId,
          returnPolicy: data.returnPolicy,
          duration: data.duration,
          isActive: data.isActive === 'Y' ? true : false,
          isApprove: data.isApprove,
        })
      )
    }

  }

  handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    let isError = { ...this.state.isError }
    switch (name) {
      case 'duration':
        isError.duration =
          value.length < 1 ? 'Atleast 1 characaters required' : ''
        break
      case 'returnPolicy':
        isError.returnPolicy =
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
    const isActive = e.target.checked
    this.setState({ isActive })
  }

  handleReturnPolicyChange = (event, editor) => {
    const data = editor.getData()

    this.setState({
      returnPolicy: data,
    })
  }
  saveReturnPolicy = async (e) => {
    e.preventDefault()

    if (this.state.returnPolicy === '') {
      toast.error('Return Policy is required')
      setTimeout(() => {}, 2500)
      return
    }

    const data = {
      sellerReturnPolicyId: this.state.sellerReturnPolicyId || 0,
      shopId: this.state.shopId,
      sellerId: this.state.sellerId,
      returnPolicy: this.state.returnPolicy,
      duration: this.state.duration,
      isActive: this.state.isActive === true ? 'Y' : 'N',
      isApprove: this.state.isApprove,
    }

    const result = await this.props.addOrEditSellerReturnPolicyRecord(data)

    if (result && result.payload.success.succeed === true) {
      toast.success('Return Type Updated Successfully')
      setTimeout(() => {
        this.props.history.push('ReturnPolicy')
      }, 2500)
      //   this.resetForm()
    } else if (result && result.payload.success.succeed === false) {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        // this.resetForm()
      }, 2500)
    } else if (result.type === 'ADD_OR_EDIT_SELLER_RETURN_POLICY_SUCCESS') {
      toast.success('Order Type Updated Successfully')
      setTimeout(() => {
        this.props.history.push('ReturnPolicy')
      }, 2500)
      //   this.resetForm()
    } else {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        // this.resetForm()
      }, 2500)
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

  render() {
    return (
      <div id='wrapper'>
        <SellerReturnPolicy
          key='SellerReturnPolicy'
          name='SellerReturnPolicy'
          {...this.state}
          handleChange={this.handleChange}
          handleParentCheck={this.handleParentCheck}
          saveReturnPolicy={this.saveReturnPolicy}
          handleReturnPolicyChange={this.handleReturnPolicyChange}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sellerProfileById: state.sellerProfileReducer.sellerProfileById,
  sellerProfile: state.sellerProfileReducer.shopDetails,
  allCountries: state.addressReducer.allCountries,
  sellerReturnPolicy: state.sellerReducer.sellerReturnPolicy,
})

const mapDispatchToProps = (dispatch) => {
  return {
    // updateSellerShopRecord: (data) =>
    //   dispatch(sellerProfileAction.updateSellerProfileRecord(data)),
    addOrEditSellerReturnPolicyRecord: (data) =>
      dispatch(sellerAction.addOrEditSellerReturnPolicyRecord(data)),
    getSellerReturnPolicyRecord: (sellerId) =>
      dispatch(sellerAction.getSellerReturnPolicyRecord(sellerId)),
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
)(sellerReturnPolicyContainer)
