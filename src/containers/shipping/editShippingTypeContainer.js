import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import * as shippingAction from '../../store/actions/shippingAction'
import authenticationService from '../../store/services/authenticationService'
import EditShippingType from '../../components/shipping/EditShippingType'

class editShippingTypeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shippingTypeId: 0,
      typeName: '',
      isActive: true,
      errorTypeName: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.saveShippingType = this.saveShippingType.bind(this)
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
        shippingTypeId: this.props.location.state.rowData.shippingTypeId,
        typeName: this.props.location.state.rowData.typeName,
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
      case 'typeName':
        this.setState({
          typeName: target.value,
          errorTypeName:
            value.length < 2 ? 'Atleast 2 characaters required' : '',
        })
        break
      default:
    }
  }

  resetForm = () => {
    this.setState({
      typeName: '',
      isActive: true,
      errorTypeName: '',
    })
  }

  saveShippingType = async (e) => {
    e.preventDefault()

    if (this.state.typeName === '') {
      let msg = 'Shipping Type Name Is Required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    const data = {
      shippingTypeId: this.state.shippingTypeId,
      typeName: this.state.typeName,
      isActive: this.state.isActive === true ? 'Y' : 'N',
    }

    const result = await this.props.createOrUpdateShipppingTypeRecord(data)

    if (result && result.payload.success.succeed === true) {
      toast.success('Shipping Type Updated Successfully')
      setTimeout(() => {
        this.props.history.push('ShippingTypeList')
      }, 2500)
      this.resetForm()
    } else if (result && result.payload.success.succeed === false) {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    } else if (result.type === 'CREATE_OR_UPDATE_SHIPPING_TYPE_SUCCESS') {
      toast.success('Shipping Type Updated Successfully')
      setTimeout(() => {
        this.props.history.push('ShippingTypeList')
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
        <EditShippingType
          key='EditShippingType'
          name='Edit Shipping Type'
          {...this.state}
          handleChange={this.handleChange}
          handleParentCheck={this.handleParentCheck}
          values={this.values}
          resetForm={this.resetForm}
          saveShippingType={this.saveShippingType}
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
    createOrUpdateShipppingTypeRecord: (data) =>
      dispatch(shippingAction.createOrUpdateShipppingTypeRecord(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(editShippingTypeContainer)
