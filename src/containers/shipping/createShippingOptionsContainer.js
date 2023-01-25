import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import * as shippingAction from '../../store/actions/shippingAction'
import authenticationService from '../../store/services/authenticationService'
import CreateShippingOptions from '../../components/shipping/CreateShippingOptions'

class createShippingOptionsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shippingOptionsId: 0,
      optionName: '',
      isActive: true,
      errorOptionName: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.saveShippingOptions = this.saveShippingOptions.bind(this)
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
      case 'optionName':
        this.setState({
          optionName: target.value,
          errorOptionName: value.length < 2 ? 'Atleast 2 characaters required' : '',
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
      optionName: '',
      isActive: true,

      errorOptionName: '',
    })
  }

  saveShippingOptions = async (e) => {
    e.preventDefault()

    if (this.state.optionName === '') {
      let msg = 'Shipping Option Name Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    const data = {
      shippingOptionsId: this.state.shippingOptionsId,
      optionName: this.state.optionName,
      isActive: this.state.isActive === true ? 'Y' : 'N',
    }

    const result = await this.props.createOrUpdateShippingOptionsRecord(data)

    if (result && result.payload.success.succeed === true) {
      toast.success('Shipping Option Created Successfully')
      setTimeout(() => {
        this.props.history.push('ShippingOptionsList')
      }, 2500)
      this.resetForm()
    } else if (result && result.payload.success.succeed === false) {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    } else if (
      result.type === 'CREATE_OR_UPDATE_SHIPPING_OPTIONS_SUCCESS'
    ) {
      toast.success('Shipping Option Created Successfully')
      setTimeout(() => {
        this.props.history.push('ShippingOptionsList')
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
        <CreateShippingOptions
          key='CreateShippingOptions'
          name='Add Shipping Options'
          {...this.state}
          handleChange={this.handleChange}
          handleParentCheck={this.handleParentCheck}
          saveShippingOptions={this.saveShippingOptions}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.shippingReducer.shippingOptions,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createOrUpdateShippingOptionsRecord: (data) =>
      dispatch(shippingAction.createOrUpdateShippingOptionsRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createShippingOptionsContainer)
