import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import * as shippingAction from '../../store/actions/shippingAction'
import authenticationService from '../../store/services/authenticationService'
import CreateCourierProductType from '../../components/shipping/CreateCourierProductType'

class createCourierProductTypeContainer extends Component {
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

  handleParentCheck = (e) => {
    const isActive = e.target.checked
    this.setState({ isActive })
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
      let msg = 'Courier Product Type Name Is Required!!!'
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
      toast.success('Courier Product Type Created Successfully')
      setTimeout(() => {
        this.props.history.push('CourierProductTypeList')
      }, 2500)
      this.resetForm()
    } else if (result && result.payload.success.succeed === false) {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    } else if (
      result.type === 'CREATE_OR_UPDATE_COURIER_PRODUCT_TYPE_SUCCESS'
    ) {
      toast.success('Courier Product Type Created Successfully')
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
        <CreateCourierProductType
          key='CreateCourierProductType'
          name='Add Courier Product Type'
          {...this.state}
          handleChange={this.handleChange}
          handleParentCheck={this.handleParentCheck}
          values={this.values}
          saveCourierProductType={this.saveCourierProductType}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.shippingReducer.courierProductType,
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
)(createCourierProductTypeContainer)
