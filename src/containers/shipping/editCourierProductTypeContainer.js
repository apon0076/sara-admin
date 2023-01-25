import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import * as shippingAction from '../../store/actions/shippingAction'
import authenticationService from '../../store/services/authenticationService'
import EditCourierProductType from '../../components/shipping/EditCourierProductType'

class editCourierProductTypeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      courierProductTypeId: 0,
      courierName: '',
      isActive: true,
      errorCourierName: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.saveCourierProductType = this.saveCourierProductType.bind(this)
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
        courierProductTypeId: this.props.location.state.rowData.courierProductTypeId,
        courierName: this.props.location.state.rowData.courierName,
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
      case 'courierName':
        this.setState({
            courierName: target.value,
            errorCourierName:
            value.length < 2 ? 'Atleast 2 characaters required' : '',
        })
        break
      default:
    }
  }

  resetForm = () => {
    this.setState({
        courierName: '',
        isActive: true,
        errorCourierName: '',
    })
  }

  saveCourierProductType = async (e) => {
    e.preventDefault()

    if (this.state.courierName === '') {
      let msg = 'Courier Name Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    const data = {
        courierProductTypeId: this.state.courierProductTypeId,
        courierName: this.state.courierName,
      isActive: this.state.isActive === true ? 'Y' : 'N',
    }

    const result = await this.props.createOrUpdateCourierProductTypeRecord(data)

    if (result && result.payload.success.succeed === true) {
      toast.success('Courier Product Type Updated Successfully')
      setTimeout(() => {
        this.props.history.push('CourierProductTypeList')
      }, 2500)
      this.resetForm()
    } else if (result && result.payload.success.succeed === false) {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    } else if (result.type === 'CREATE_OR_UPDATE_COURIER_PRODUCT_TYPE_SUCCESS') {
      toast.success('Courier Product Type Updated Successfully')
      setTimeout(() => {
        this.props.history.push('CourierProductTypeList')
      }, 2500)
      this.resetForm()
    } else {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    }
  }

  render() {
    return (
      <div id='wrapper'>
        <ToastContainer autoClose={1500} />
        <EditCourierProductType
          key='EditCourierProductType'
          name='Edit Courier Product Type'
          {...this.state}
          handleChange={this.handleChange}
          handleParentCheck={this.handleParentCheck}
          values={this.values}
          resetForm={this.resetForm}
          saveCourierProductType={this.saveCourierProductType}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.shippingReducer.shippingType,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createOrUpdateCourierProductTypeRecord: (data) =>
      dispatch(shippingAction.createOrUpdateCourierProductTypeRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editCourierProductTypeContainer)
