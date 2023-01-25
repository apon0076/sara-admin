import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import * as productAction from '../../../store/actions/productAction'
import * as discountAction from '../../../store/actions/discountAction'
import * as discountTypeAction from '../../../store/actions/discountTypeAction'
import authenticationService from '../../../store/services/authenticationService'
import CreateDiscount from '../../../components/settings/discount/CreateDiscount'

class createDiscountContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      discountSummaryId: 0,
      discountPercentage: '',

      discountId: 0,

      startDate: '',
      endDate: '',

      productId: '',
      productName: '',

      discountTypeId: '',
      discountTypeName: '',

      isActive: true,
      errorDiscountPercentage: '',
      errorProductId: '',
      errorDiscountTypeId: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleStartDate = this.handleStartDate.bind(this)
    this.handleEndDate = this.handleEndDate.bind(this)
    this.saveDiscount = this.saveDiscount.bind(this)
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

    await this.props.getDiscountTypeRecord()
    await this.props.getProductRecord()
  }

  keyPressed = (e) => {
    if (e.key === 'Enter') {
      this.saveDiscount(e)
    }
  }

  handleChange = (e) => {
    const { target } = e
    const { value } = e.target
    switch (target.name) {
      case 'discountPercentage':
        this.setState({
          discountPercentage: target.value,
          errorDiscountPercentage:
            value.length < 1 ? 'Atleast 1 characaters required' : '',
        })
        break

      case 'productName':
        this.setState({
          productName: target.value,
          productId: target.value.productId,
        })
        break

      case 'productDiscountTypeName':
        this.setState({
          productDiscountTypeName: target.value,
          discountTypeId: target.value.productDiscountTypeId,
        })
        break

      default:
    }
  }

  handleStartDate = (date, dateString) => {
    this.setState({
      startDate: dateString,
    })
  }

  handleEndDate = (date, dateString) => {
    this.setState({
      endDate: dateString,
    })
  }

  handleParentCheck = (e) => {
    const isActive = e.target.checked
    this.setState({ isActive })
  }

  saveDiscount = async (e) => {
    e.preventDefault()
    const data = {
      discountId: this.state.discountId,
      discountPercentage: this.state.discountPercentage,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      productId: this.state.productId,
      discountTypeId: this.state.discountTypeId,
      isActive: this.state.isActive === true ? 'Y' : 'N',
    }

    const result = await this.props.createDiscountRecord(data)

    // if (result.type === 'CREATE_DISCOUNT_SUCCESS') {
    //   toast.success('Discount Created Successfully')
    //   setTimeout(() => {
    //     this.props.history.push('DiscountList')
    //   }, 2500)
    //   this.resetForm()
    // }
    // else if (result && result.payload.success.succeed === true) {
    //   toast.success('Voucher Updated Successfully')
    //   setTimeout(() => {
    //     this.props.history.push('VoucherList')
    //   }, 2500)
    //   this.resetForm()
    // } else {
    //   toast.error('Something went wrong, Please try again')
    //   setTimeout(() => {
    //     this.resetForm()
    //   }, 2500)
    // }
  }

  resetForm = () => {
    this.setState({
      discountPercentage: '',
      startDate: new Date(),
      endDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      productId: '',
      discountTypeId: '',
      productName: '',
      discountTypeName: '',
      isActive: false,
    })
  }

  render() {
    return (
      <div id='wrapper'>
        <CreateDiscount
          key='CreateDiscount'
          name='Add Discount'
          {...this.state}
          handleChange={this.handleChange}
          handleStartDate={this.handleStartDate}
          handleEndDate={this.handleEndDate}
          handleParentCheck={this.handleParentCheck}
          values={this.values}
          saveDiscount={this.saveDiscount}
          resetForm={this.resetForm}
          discountTypes={this.props.discountTypes}
          products={this.props.products}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.discountReducer.data,
  discountTypes: state.discountTypeReducer.discountTypes,
  products: state.productReducer.products,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createDiscountRecord: (data) =>
      dispatch(discountAction.createDiscountRecord(data)),
    getDiscountTypeRecord: () =>
      dispatch(discountTypeAction.getDiscountTypeRecord()),
    getProductRecord: () => dispatch(productAction.getProductRecord()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createDiscountContainer)
