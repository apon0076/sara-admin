import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import * as shippingAction from '../../store/actions/shippingAction'
import * as sellerAction from '../../store/actions/sellerAction'
import authenticationService from '../../store/services/authenticationService'
import EditReturnPolicy from '../../components/seller/EditReturnPolicy'

class editReturnPolicyContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sellerReturnPolicyId: 0,
      duration: 0,
      returnPolicy: '',
      shopId: '',
      sellerId: '',
      isActive: '',
      isApprove: '',
      shopName: '',
      sellerName: '',
      errorReturnPolicy: '',
      errorDuration: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.updateReturnPolicy = this.updateReturnPolicy.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.handleParentCheck = this.handleParentCheck.bind(this)
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()
    if (roleId === '1') {
      this.setState({
        authenticated: true,
        loginSuccessful: true,

        sellerReturnPolicyId:
          this.props.location.state.rowData.sellerReturnPolicyId,
        sellerId: this.props.location.state.rowData.sellerId,
        sellerName: this.props.location.state.rowData.sellerName,
        shopId: this.props.location.state.rowData.shopId,
        shopName: this.props.location.state.rowData.shopName,
        returnPolicy: this.props.location.state.rowData.returnPolicy,
        duration: this.props.location.state.rowData.duration,
        isApprove: this.props.location.state.rowData.isApprove,

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
  }

  handleParentCheck = (e) => {
    const isActive = e.target.checked
    this.setState({ isActive })
  }

  handleChange = (e) => {
    const { target } = e
    const { value } = e.target
    switch (target.name) {
      case 'returnPolicy':
        this.setState({
          returnPolicy: target.value,
        })
        break
      case 'duration':
        this.setState({
          duration: target.value < 0 ? 0 : target.value,
        })
        break
      default:
    }
  }

  handleReturnPolicyChange = (event, editor) => {
    const data = editor.getData()

    this.setState({
      returnPolicy: data,
      // errorProductDescription: data < 4 ? "required field" : "",
    })
  }
  resetForm = () => {
    this.setState({
      returnPolicy: '',
      isActive: true,
      duration: '',
    })
  }
  approveReturnPolicy = async (e) => {
    e.preventDefault()

    const data = {
      sellerReturnPolicyId: this.state.sellerReturnPolicyId,
      duration: this.state.duration,
      returnPolicy: this.state.returnPolicy,
      shopId: this.state.shopId,
      sellerId: this.state.sellerId,
      isActive: this.state.isActive === true ? 'Y' : 'N',
      isApprove: 'Y',
    }

    const result = await this.props.addOrEditSellerReturnPolicyRecord(data)

    if (result && result.payload.success.succeed === true) {
      toast.success('Return Policy Approved')
      setTimeout(() => {
        this.props.history.push('approvedReturnPolicy')
      }, 2500)
      //   this.resetForm()
    } else if (result && result.payload.success.succeed === false) {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        // this.resetForm()
      }, 2500)
    } else if (result.type === 'ADD_OR_EDIT_SELLER_RETURN_POLICY_SUCCESS') {
      toast.success('Return Policy Updated Successfully')
      setTimeout(() => {
        this.props.history.push('approvedReturnPolicy')
      }, 2500)
      //   this.resetForm()
    } else {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        // this.resetForm()
      }, 2500)
    }
  }
  rejectReturnPolicy = async (e) => {
    e.preventDefault()

    // if (this.state.returnPolicy === '') {
    //   let msg = 'Shipping Type Name Is Required!!!'
    //   toast.error(msg)
    //   setTimeout(() => {}, 3000)
    //   return
    // }

    const data = {
      sellerReturnPolicyId: this.state.sellerReturnPolicyId,
      duration: this.state.duration,
      returnPolicy: this.state.returnPolicy,
      shopId: this.state.shopId,
      sellerId: this.state.sellerId,
      isActive: this.state.isActive === true ? 'Y' : 'N',
      isApprove: 'R',
    }

    const result = await this.props.addOrEditSellerReturnPolicyRecord(data)

    if (result && result.payload.success.succeed === true) {
      toast.success('Return Policy Rejected')
      setTimeout(() => {
        this.props.history.push('rejectedReturnPolicy')
      }, 2500)
      //   this.resetForm()
    } else if (result && result.payload.success.succeed === false) {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        // this.resetForm()
      }, 2500)
    } else if (result.type === 'ADD_OR_EDIT_SELLER_RETURN_POLICY_SUCCESS') {
      toast.success('Return Policy Rejected')
      setTimeout(() => {
        this.props.history.push('rejectedReturnPolicy')
      }, 2500)
      //   this.resetForm()
    } else {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        // this.resetForm()
      }, 2500)
    }
  }
  pendingReturnPolicy = async (e) => {
    e.preventDefault()

    // if (this.state.returnPolicy === '') {
    //   let msg = 'Shipping Type Name Is Required!!!'
    //   toast.error(msg)
    //   setTimeout(() => {}, 3000)
    //   return
    // }

    const data = {
      sellerReturnPolicyId: this.state.sellerReturnPolicyId,
      duration: this.state.duration,
      returnPolicy: this.state.returnPolicy,
      shopId: this.state.shopId,
      sellerId: this.state.sellerId,
      isActive: this.state.isActive === true ? 'Y' : 'N',
      isApprove: 'N',
    }

    const result = await this.props.addOrEditSellerReturnPolicyRecord(data)

    if (result && result.payload.success.succeed === true) {
      toast.success('Return Policy Added to Pending List')
      setTimeout(() => {
        this.props.history.push('pendingReturnPolicy')
      }, 2500)
      //   this.resetForm()
    } else if (result && result.payload.success.succeed === false) {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        // this.resetForm()
      }, 2500)
    } else if (result.type === 'ADD_OR_EDIT_SELLER_RETURN_POLICY_SUCCESS') {
      toast.success('Return Policy Added to Pending List')
      setTimeout(() => {
        this.props.history.push('pendingReturnPolicy')
      }, 2500)
      //   this.resetForm()
    } else {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        // this.resetForm()
      }, 2500)
    }
  }

  updateReturnPolicy = async (e) => {
    e.preventDefault()

    // if (this.state.returnPolicy === '') {
    //   let msg = 'Shipping Type Name Is Required!!!'
    //   toast.error(msg)
    //   setTimeout(() => {}, 3000)
    //   return
    // }

    const data = {
      sellerReturnPolicyId: this.state.sellerReturnPolicyId,
      duration: this.state.duration,
      returnPolicy: this.state.returnPolicy,
      shopId: this.state.shopId,
      sellerId: this.state.sellerId,
      isActive: this.state.isActive === true ? 'Y' : 'N',
      isApprove: 'N',
    }

    const result = await this.props.addOrEditSellerReturnPolicyRecord(data)

    if (result && result.payload.success.succeed === true) {
      toast.success('Return Policy Updated Successfully')
      setTimeout(() => {
        this.props.history.push('pendingReturnPolicy')
      }, 2500)
      //   this.resetForm()
    } else if (result && result.payload.success.succeed === false) {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        // this.resetForm()
      }, 2500)
    } else if (result.type === 'ADD_OR_EDIT_SELLER_RETURN_POLICY_SUCCESS') {
      toast.success('Return Policy Updated Successfully')
      setTimeout(() => {
        this.props.history.push('pendingReturnPolicy')
      }, 2500)
      //   this.resetForm()
    } else {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        // this.resetForm()
      }, 2500)
    }
  }

  render() {
    return (
      <div id='wrapper'>
        <ToastContainer autoClose={1500} />
        <EditReturnPolicy
          key='EditReturnPolicy'
          name='Edit Return Policy'
          {...this.state}
          handleChange={this.handleChange}
          handleParentCheck={this.handleParentCheck}
          values={this.values}
          resetForm={this.resetForm}
          updateReturnPolicy={this.updateReturnPolicy}
          approveReturnPolicy={this.approveReturnPolicy}
          rejectReturnPolicy={this.rejectReturnPolicy}
          pendingReturnPolicy={this.pendingReturnPolicy}
          handleReturnPolicyChange={this.handleReturnPolicyChange}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sellerReturnPolicy: state.sellerReducer.sellerReturnPolicy,
})

const mapDispatchToProps = (dispatch) => {
  return {
    addOrEditSellerReturnPolicyRecord: (data) =>
      dispatch(sellerAction.addOrEditSellerReturnPolicyRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editReturnPolicyContainer)
