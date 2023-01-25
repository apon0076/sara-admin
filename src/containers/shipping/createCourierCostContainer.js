import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import * as shippingAction from '../../store/actions/shippingAction'
import authenticationService from '../../store/services/authenticationService'
import CreateCourierCost from '../../components/shipping/CreateCourierCost'

class createCourierCostContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courierCostId: 0,
      courierId: '',
      customsDutiesChargePer: '',
      taxPer: '',
      vatPer: '',
      aitPer: '',
      fuelSurchargePer: '',
      otherCost: '',
      isActive: true,

      errorCourierId: '',
      errorCustomsDutiesChargePer: '',
      errorTaxPer: '',
      errorVatPer: '',
      errorAitPer: '',
      errorFuelSurchargePer: '',
      errorOtherCost: '',

      showFile: '',
    }

    this.saveCourierCost = this.saveCourierCost.bind(this)
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
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push('/Login')
    }
    //End Temporary Authentication
    await this.props.getCourierProfileRecord()
  }

  handleChange = (e) => {
    const { target } = e
    const { value } = e.target

    switch (target.name) {
      case 'courierName':
        this.setState({
          courierName: target.value,
          courierId: target.value.courierId,
          errorCourierId:
            target.value.length < 1 ? 'Select one Courier Name' : '',
        })
        break
      case 'customsDutiesChargePer':
        this.setState({
          customsDutiesChargePer: target.value < 0 ? 0 : target.value,
        })
        break

      case 'taxPer':
        this.setState({
          taxPer: target.value < 0 ? 0 : target.value,
        })
        break

      case 'vatPer':
        this.setState({
          vatPer: target.value < 0 ? 0 : target.value,
        })
        break

      case 'aitPer':
        this.setState({
          aitPer: target.value < 0 ? 0 : target.value,
        })
        break

      case 'fuelSurchargePer':
        this.setState({
          fuelSurchargePer: target.value < 0 ? 0 : target.value,
        })
        break

      case 'otherCost':
        this.setState({
          otherCost: target.value < 0 ? 0 : target.value,
        })
        break

      default:
    }
  }

  handleParentCheck = (e) => {
    const isActive = e.target.checked
    this.setState({ isActive })
  }

  resetForm = () => {
    this.setState({
      courierId: '',
      customsDutiesChargePer: '',
      taxPer: '',
      vatPer: '',
      aitPer: '',
      fuelSurchargePer: '',
      otherCost: '',
      isActive: true,
    })
  }

  saveCourierCost = async (e) => {
    e.preventDefault()

    if (this.state.courierId === '') {
      let msg = 'Courier ID is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.customsDutiesChargePer === '') {
      let msg = 'Customs Duties Charge Percentage is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.taxPer === '') {
      let msg = 'Tax Percentage is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.vatPer === '') {
      let msg = 'Vat Percentage is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.aitPer === '') {
      let msg = 'AIT Percentage is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.fuelSurchargePer === '') {
      let msg = 'Fuel Surcharge Percentage is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.otherCost === '') {
      let msg = 'Other cost is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    const data = {
      courierCostId: this.state.courierCostId,
      courierId: this.state.courierId,
      customsDutiesChargePer: this.state.customsDutiesChargePer,
      taxPer: this.state.taxPer,
      vatPer: this.state.vatPer,
      aitPer: this.state.aitPer,
      fuelSurchargePer: this.state.fuelSurchargePer,
      otherCost: this.state.otherCost,
      isActive: this.state.isActive === true ? 'Y' : 'N',
    }

    const result = await this.props.createOrUpdateCourierCostRecord(data)

    if (result && result.payload.success.succeed === true) {
      if (result.type === 'CREATE_OR_UPDATE_COURIER_COST_SUCCESS') {
        toast.success('Courier Cost Created Successfully')
        setTimeout(() => {
          this.props.history.push('CourierCostList')
        }, 2500)
        this.resetForm()
      } else {
        toast.error('Something went wrong, Please try again')
        setTimeout(() => {
          this.resetForm()
          this.props.history.push('CreateCourierCost')
        }, 2500)
      }
    } else if (result && result.payload.success.succeed === false) {
      toast.error('Courier Cost Already Exists!')
      setTimeout(() => {}, 2500)
    } else if (result && result.payload.success.succeed === false) {
      toast.error('Courier Already Exists!')
      setTimeout(() => {}, 2500)
    }
  }

  render() {
    return (
      <div id='wrapper'>
        <CreateCourierCost
          key='CreateCourierCost'
          name='Add Courier Cost'
          {...this.state}
          handleChange={this.handleChange}
          handleParentCheck={this.handleParentCheck}
          values={this.values}
          saveCourierCost={this.saveCourierCost}
          courierProfile={this.props.courierProfile}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.shippingReducer.courierCost,
  courierProfile: state.shippingReducer.courierProfile.filter(
    (item) => item.isActive === 'Y'
  ),
})

const mapDispatchToProps = (dispatch) => {
  return {
    createOrUpdateCourierCostRecord: (data) =>
      dispatch(shippingAction.createOrUpdateCourierCostRecord(data)),
    getCourierProfileRecord: (data) =>
      dispatch(shippingAction.getCourierProfileRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createCourierCostContainer)
