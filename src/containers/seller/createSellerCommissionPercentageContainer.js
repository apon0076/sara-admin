import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import * as sellerProfileAction from '../../store/actions/sellerProfileAction'
import authenticationService from '../../store/services/authenticationService'
import CreateSellerCommissionPercentage from '../../components/seller/CreateSellerCommissionPercentage'

class createSellerCommissionPercentageContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sellerCommissionId: 0,
      localCommissionPercentage: '',
      globalCommissionPercentage: '',
      aggrementDocument: '',
      file: '',
      files: [],
      details: '',

      shopId: '',
      sellerId: '',

      isActive: true,
      isApprove: true,
      status: 'Y',
      errorLocalCommissionPercentage: '',
      errorGlobalCommissionPercentage: '',
      errorDetails: '',

      showFile: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
    this.saveCommissionPercentage = this.saveCommissionPercentage.bind(this)
    this.resetForm = this.resetForm.bind(this)
    this.handleParentCheck = this.handleParentCheck.bind(this)
    this.handleApproveCheck = this.handleApproveCheck.bind(this)
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
      this.props.history.push('/sellerLogin')
    }
    //End Temporary Authentication

    let shopId = this.props.sellerProfileById.shopId
    await this.props.getCommissionPercentageRecord(shopId)

    this.setState({
      ...this.state,
      shopId: this.props.sellerProfileById.shopId,
      sellerId: this.props.sellerProfileById.sellerId,
    })
  }

  keyPressed = (e) => {
    if (e.key === 'Enter') {
      this.saveCommissionPercentage(e)
    }
  }

  fileSelectedHandler = (e) => {
    var fileInput = false
    fileInput = true
    if (fileInput) {
      try {
        let reader = new FileReader()
        let file = e.target.files[0]
        reader.onload = (e) => {
          this.setState({ file: file, aggrementDocument: reader.result })
          this.aggrementDocument = e.target.result
          this.setState({ aggrementDocument: e.target.result })
        }
        reader.readAsDataURL(file)

        toast.success('Document Selected.')
      } catch (err) {
        toast.error('Something went wrong!')
      }
    }
  }

  handleChange = (e) => {
    const { target } = e
    const { value } = e.target
    switch (target.name) {
      case 'details':
        this.setState({
          details: target.value,
          errorDetails:
            value.length < 1 ? 'Atleast 1 characaters required' : '',
        })
        break

      case 'localCommissionPercentage':
        this.setState({
          localCommissionPercentage: target.value,
          errorLocalCommissionPercentage:
            value.length < 1 ? 'Atleast 1 characaters required' : '',
        })
        break

      case 'globalCommissionPercentage':
        this.setState({
          globalCommissionPercentage: target.value,
          errorGlobalCommissionPercentage:
            value.length < 1 ? 'Atleast 1 characaters required' : '',
        })
        break

      default:
    }
  }

  handleParentCheck = (e) => {
    const isActive = e.target.checked
    this.setState({ isActive })
  }
  handleApproveCheck = (e) => {
    const isApprove = e.target.checked
    this.setState({ isApprove })
  }

  saveCommissionPercentage = async (e) => {
    e.preventDefault()
    if (this.state.localCommissionPercentage === '') {
      toast.error('Local Commission Percentage is requeired')
      setTimeout(() => {}, 2500)
      return
    }
    if (this.state.globalCommissionPercentage === '') {
      toast.error('Global Commission Percentage is required')
      setTimeout(() => {}, 2500)
      return
    }
    if (this.state.details === '') {
      toast.error('Percentage Commision Details is required')
      setTimeout(() => {}, 2500)
      return
    }
    if (this.state.aggrementDocument === '') {
      toast.error('Aggrement Document is required')
      setTimeout(() => {}, 2500)
      return
    }
    const data = {
      sellerCommissionId: this.state.sellerCommissionId,
      shopId: this.state.shopId,
      sellerId: this.state.sellerId,
      details: this.state.details,
      aggrementDocument: this.state.aggrementDocument,
      globalCommissionPercentage: this.state.globalCommissionPercentage,
      localCommissionPercentage: this.state.localCommissionPercentage,
      isActive: this.state.isActive === true ? 'Y' : 'N',
      isApprove: this.state.isApprove === true ? 'Y' : 'N',
      status: this.state.status,
    }

    const result = await this.props.createCommissionPercentageRecord(data)

    if (result && result.payload.success === true) {
      toast.success('CommissionPercentage Created Successfully')
      setTimeout(() => {
        this.props.history.push('CommissionPercentageList')
      }, 2500)
      this.resetForm()
    } else if (result && result.payload.success === false) {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    } else if (result.type === 'CREATE_SELLER_COMMISSION_PERCENTAGE_SUCCESS') {
      toast.success('CommissionPercentage Created Successfully')
      setTimeout(() => {
        this.props.history.push('CommissionPercentageList')
      }, 2500)
      this.resetForm()
    } else {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    }
  }

  resetForm = () => {
    this.setState({
      details: '',
      aggrementDocument: '',
      files: [],
      localCommissionPercentage: '',
      globalCommissionPercentage: '',
      errorLocalCommissionPercentage: '',
      errorGlobalCommissionPercentage: '',
      errorDetails: '',
      isActive: false,
      isApprove: false,
      status: 'N',
    })
  }

  render() {
    return (
      <div id='wrapper'>
        <CreateSellerCommissionPercentage
          key='CreateSellerCommissionPercentage'
          name='Add CreateSellerCommissionPercentage'
          {...this.state}
          handleChange={this.handleChange}
          handleParentCheck={this.handleParentCheck}
          handleApproveCheck={this.handleApproveCheck}
          fileSelectedHandler={this.fileSelectedHandler}
          values={this.values}
          saveCommissionPercentage={this.saveCommissionPercentage}
          resetForm={this.resetForm}
          sellerCommissionPercentage={this.props.sellerCommissionPercentage}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  //data: state.sellerProfileReducer.data,
  sellerCommissionPercentage:
    state.sellerProfileReducer.sellerCommissionPercentage,
  sellerProfileById: state.sellerProfileReducer.sellerProfileById,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createCommissionPercentageRecord: (data) =>
      dispatch(sellerProfileAction.createCommissionPercentageRecord(data)),
    getCommissionPercentageRecord: (shopId) =>
      dispatch(sellerProfileAction.getCommissionPercentageRecord(shopId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createSellerCommissionPercentageContainer)
