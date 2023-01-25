import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import * as voucherAction from '../../../store/actions/voucherAction'
import * as discountTypeAction from '../../../store/actions/discountTypeAction'
import authenticationService from '../../../store/services/authenticationService'
import EditVoucher from '../../../components/settings/voucher/EditVoucher'
import Resizer from 'react-image-file-resizer'

class editVoucherContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderVoucherId: 0,
      discountSummaryId: 0,
      discountTypeId: '',
      selectedDiscountTypeId: '',
      discountTypeName: '',

      voucherName: '',
      voucherCode: '',
      voucherDiscountPercent: '',
      voucherDiscountAmount: '',
      voucherMaximumAmount: '',
      voucherImage: '',
      showFile: '',
      files: [],

      voucherStartDate: new Date(),
      voucherEndDate: new Date(),

      isActive: true,

      errorVoucherName: '',
      errorVoucherDiscountPercent: '',
      errorVoucherDiscountAmount: '',
      errorVoucherMaximumAmount: '',
      errorDiscountTypeId: '',
      errorVoucherCode: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
    this.handleVoucherStartDate = this.handleVoucherStartDate.bind(this)
    this.handleVoucherEndDate = this.handleVoucherEndDate.bind(this)
    this.saveVoucher = this.saveVoucher.bind(this)
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
        orderVoucherId:
          this.props?.location?.state?.rowData?.orderVoucherSummaryId,
        discountTypeId: this.props?.location?.state?.rowData?.discountTypeId,
        discountTypeName:
          this.props?.location?.state?.rowData?.discountTypeName,
        voucherName: this.props?.location?.state?.rowData?.voucherName,
        voucherCode: this.props?.location?.state?.rowData?.voucherCode,
        voucherMaximumAmount:
          this.props?.location?.state?.rowData?.voucherMaximumAmount,
        voucherDiscountPercent:
          this.props?.location?.state?.rowData?.voucherDiscountPercent,
        voucherDiscountAmount:
          this.props?.location?.state?.rowData?.voucherDiscountAmount,
        voucherImage: this.props?.location?.state?.rowData?.voucherImage,
        voucherStartDate:
          this.props?.location?.state?.rowData?.voucherStartDate,
        voucherEndDate: this.props?.location?.state?.rowData?.voucherEndDate,
        isActive:
          this.props?.location?.state?.rowData?.isActive === 'Y' ? true : false,
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

      case 'selectedDiscountTypeId':
        this.setState({
          selectedDiscountTypeId: target.value,
          discountTypeId: target.value.productDiscountTypeId,
        })
        break
      case 'discountTypeName':
        this.setState({ discountTypeName: target.value })
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

  saveVoucher = async (e) => {
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
      discountTypeId: this.state?.discountTypeId,
      orderVoucherId: this.state?.orderVoucherId,
      voucherName: this.state?.voucherName,
      voucherCode: this.state?.voucherCode,
      voucherMaximumAmount: this.state?.voucherMaximumAmount,
      voucherDiscountPercent: this.state?.voucherDiscountPercent,
      voucherDiscountAmount: this.state?.voucherDiscountAmount,
      voucherImage: this.state?.voucherImage,
      voucherStartDate: this.state?.voucherStartDate,
      voucherEndDate: this.state?.voucherEndDate,
      isActive: this.state?.isActive === true ? 'Y' : 'N',
    }

    const result = await this.props.createOrUpdateVoucherRecord(data)

    if (result && result?.payload?.success?.succeed === true) {
      toast.success('Voucher Updated Successfully')
      setTimeout(() => {
        this.props.history.push('VoucherList')
      }, 2500)
    } else if (result && result?.payload?.success?.succeed === false) {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    } else if (result.type === 'CREATE_OR_UPDATE_VOUCHER_SUCCESS') {
      toast.success('Voucher Updated Successfully')
      setTimeout(() => {
        this.props.history.push('VoucherList')
      }, 2500)
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
      voucherDiscountPercent: '',
      voucherDiscountAmount: '',
      voucherImage: '',
      files: [],
      multiProductImages: [],

      voucherStartDate: new Date(),
      voucherEndDate: new Date(),
      startTime: new Date(),
      endTime: new Date(),

      isActive: false,

      errorVoucherName: '',
      errorDiscountTypeId: '',
      errorVoucherCode: '',
      errorVoucherDiscountPercent: '',
      errorVoucherDiscountAmount: '',
      errorVoucherMaximumAmount: '',
    })
  }

  render() {
    return (
      <div id='wrapper'>
        <EditVoucher
          key='EditVoucher'
          name='Update Voucher'
          {...this.state}
          handleChange={this.handleChange}
          handleVoucherStartDate={this.handleVoucherStartDate}
          handleVoucherEndDate={this.handleVoucherEndDate}
          handleParentCheck={this.handleParentCheck}
          fileSelectedHandler={this.fileSelectedHandler}
          values={this.values}
          saveVoucher={this.saveVoucher}
          resetForm={this.resetForm}
          discountTypes={this.props?.discountTypes}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.voucherReducer.data,
  discountTypes: state.discountTypeReducer?.discountTypes,
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
)(editVoucherContainer)
