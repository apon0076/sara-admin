import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import * as voucherAction from '../../../store/actions/voucherAction'
import * as discountTypeAction from '../../../store/actions/discountTypeAction'
import authenticationService from '../../../store/services/authenticationService'
import CreateVoucher from '../../../components/settings/voucher/CreateVoucher'
import Resizer from 'react-image-file-resizer'
class createDiscountContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      discountSummaryId: 0,
      voucherDiscountPercent: '',
      voucherDiscountAmount: '',
      voucherStartDate: new Date(),
      voucherEndDate: new Date(),

      orderVoucherId: 0,
      voucherName: '',

      voucherCode: '',

      discountTypeId: '',
      discountTypeName: '',
      voucherMaximumAmount: '',
      voucherImage: '',
      showFile: '',
      files: [],

      isActive: true,
      errorVoucherDiscountPercent: '',
      errorVoucherDiscountAmount: '',
      errorDiscountTypeId: '',
      errorVoucherCode: '',
      errorVoucherName: '',
      errorVoucherMaximumAmount: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
    this.handleVoucherStartDate = this.handleVoucherStartDate.bind(this)
    this.handleVoucherEndDate = this.handleVoucherEndDate.bind(this)
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
  }

  keyPressed = (e) => {
    if (e.key === 'Enter') {
      this.saveDiscount(e)
    }
  }

  fileSelectedHandler = (event) => {
    const imageFile = event.target.files[0]

    var fileInput = false
    if (imageFile) {
      if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
        toast.error('Select a valid image.')
        return false
      }
      fileInput = true
      if (fileInput) {
        try {
          Resizer.imageFileResizer(
            imageFile,
            600,
            400,
            'JPEG',
            100,
            0,
            (uri) => {
              this.setState({
                voucherImage: uri,
                showFile: URL.createObjectURL(imageFile),
                imageName: imageFile.name,
              })
              toast.success('Image Selected.')
            },
            'base64',
            600,
            400
          )
        } catch (err) {
          toast.error('Something went wrong!')
        }
      }
    }
  }

  handleChange = (e) => {
    const { target } = e
    const { value } = e.target
    switch (target.name) {
      case 'voucherName':
        this.setState({
          voucherName: target.value,
          errorVoucherName:
            value.length < 1 ? 'Atleast 1 characaters required' : '',
        })
        break

      case 'productDiscountTypeName':
        this.setState({
          productDiscountTypeName: target.value,
          discountTypeId: target.value?.productDiscountTypeId,
        })
        break

      case 'voucherCode':
        this.setState({
          voucherCode: target.value,
          errorVoucherCode:
            value.length < 1 ? 'Atleast 1 characaters required' : '',
        })
        break

      case 'voucherMaximumAmount':
        this.setState({
          voucherMaximumAmount: target.value < 0 ? 0 : target.value,
          errorVoucherMaximumAmount:
            value.length < 1 ? 'Atleast 1 characaters required' : '',
        })
        break

      case 'voucherDiscountPercent':
        this.setState({
          voucherDiscountPercent: target.value < 0 ? 0 : target.value,
          errorVoucherDiscountPercent:
            value.length < 1 ? 'Atleast 1 characaters required' : '',
        })
        break

      case 'voucherDiscountAmount':
        this.setState({
          voucherDiscountAmount: target.value < 0 ? 0 : target.value,
          errorVoucherDiscountAmount:
            value.length < 1 ? 'Atleast 1 characaters required' : '',
        })
        break

      default:
    }
  }

  handleVoucherStartDate = (date, dateString) => {
    this.setState({
      voucherStartDate: dateString,
    })
  }

  handleVoucherEndDate = (date, dateString) => {
    this.setState({
      voucherEndDate: dateString,
    })
  }

  handleParentCheck = (e) => {
    const isActive = e.target.checked
    this.setState({ isActive })
  }

  saveDiscount = async (e) => {
    e.preventDefault()

    if (this.state.discountTypeId === '') {
      let msg = 'Discount Type is required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }
    if (this.state.voucherName === '') {
      let msg = 'Voucher Name is required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.voucherCode === '') {
      let msg = 'Voucher Code is required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.voucherMaximumAmount === '') {
      let msg = 'Voucher Maximum Amount is required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.voucherDiscountPercent === '') {
      let msg = 'Voucher Discount Percent is required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.voucherDiscountAmount === '') {
      let msg = 'Voucher Discount Amount is required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    if (this.state.voucherImage === '') {
      let msg = 'Voucher Image is required!!!'
      toast.error(msg)
      setTimeout(() => {}, 3000)
      return
    }

    const data = {
      orderVoucherId: this.state?.orderVoucherId,
      discountTypeId: this.state?.discountTypeId,
      voucherName: this.state?.voucherName,
      voucherCode: this.state?.voucherCode,
      voucherMaximumAmount: this.state?.voucherMaximumAmount,
      voucherImage: this.state?.voucherImage,
      voucherStartDate: this.state?.voucherStartDate,
      voucherEndDate: this.state?.voucherEndDate,
      voucherDiscountAmount: this.state?.voucherDiscountAmount,
      voucherDiscountPercent: this.state?.voucherDiscountPercent,
      isActive: this.state?.isActive === true ? 'Y' : 'N',
    }

    const result = await this.props.createOrUpdateVoucherRecord(data)

    if (result && result?.payload?.success?.data?.succeed === true) {
      toast.success('Voucher Created Successfully')
      setTimeout(() => {
        this.props.history.push('VoucherList')
      }, 2500)
      this.resetForm()
    } else if (result && result?.payload?.success?.data?.succeed === false) {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    } else if (result.type === 'CREATE_OR_UPDATE_VOUCHER_SUCCESS') {
      toast.success('Voucher Created Successfully')
      setTimeout(() => {
        this.props.history.push('VoucherList')
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
      discountTypeId: '',
      discountTypeName: '',
      voucherName: '',
      voucherCode: '',
      voucherMaximumAmount: '',
      voucherImage: '',
      files: [],
      voucherStartDate: new Date(),
      voucherEndDate: new Date(),
      voucherStartTime: new Date(),
      voucheEndTime: new Date(),
      voucherDiscountPercent: '',
      voucherDiscountAmount: '',
      errorVoucherDiscountPercent: '',
      errorVoucherDiscountAmount: '',
      errorVoucherMaximumAmount: '',
      errorDiscountTypeId: '',
      errorVoucherCode: '',
      errorVoucherName: '',
      isActive: false,
    })
  }

  render() {
    return (
      <div id='wrapper'>
        <CreateVoucher
          key='CreateVoucher'
          name='Add Voucher'
          {...this.state}
          handleChange={this.handleChange}
          handleVoucherStartDate={this.handleVoucherStartDate}
          handleVoucherEndDate={this.handleVoucherEndDate}
          handleParentCheck={this.handleParentCheck}
          fileSelectedHandler={this.fileSelectedHandler}
          values={this.values}
          saveDiscount={this.saveDiscount}
          resetForm={this.resetForm}
          discountTypes={this.props?.discountTypes}
          vouchers={this.props?.vouchers}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.voucherReducer?.data,
  discountTypes: state.discountTypeReducer?.discountTypes,
  vouchers: state.productReducer?.vouchers,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createOrUpdateVoucherRecord: (data) =>
      dispatch(voucherAction.createOrUpdateVoucherRecord(data)),
    getDiscountTypeRecord: () =>
      dispatch(discountTypeAction.getDiscountTypeRecord()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createDiscountContainer)
