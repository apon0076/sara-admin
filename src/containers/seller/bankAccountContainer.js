import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as sellerProfileAction from '../../store/actions/sellerProfileAction'
import authenticationService from '../../store/services/authenticationService'
import { toast, ToastContainer } from 'react-toastify'
import BankAccount from '../../components/seller/BankAccount'
import Resizer from 'react-image-file-resizer'
class bankAccountContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sellerBankAccountId: 0,
      accountHolderName: '',
      accountNo: '',
      bankName: '',
      branchName: '',
      routingNo: '',
      documentUrl: '',
      shopId: '',
      sellerId: '',
      ChequeShowFile: '',
      isActive: true,
      isApprove: true,
      status: true,
      bussinessDocUrlFileName: '',
      isError: {
        accountHolderName: '',
        accountNo: '',
        bankName: '',
        branchName: '',
        routingNo: '',
        documentUrl: '',
      },
    }
    this.handleChange = this.handleChange.bind(this)
    this.documentUrlHandler = this.documentUrlHandler.bind(this)
    this.saveBankAccount = this.saveBankAccount.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication

    let roleId = authenticationService.getRoleId()
    if (roleId === '2') {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
        shopId: this.props.sellerProfileById.shopId,
        sellerId: this.props.sellerProfileById.sellerId,
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push('/SellerLogin')
    }
    //End Temporary Authentication

    let shopId = this.props.sellerProfileById.shopId
    await this.props.getBankAccountByShopIdRecord(shopId)

    {
      this.props.sellerBankAccountById.map((data) =>
        this.setState({
          sellerBankAccountId: data.sellerBankAccountId,
          accountHolderName: data.accountHolderName,
          accountNo: data.accountNo,
          bankName: data.bankName,
          branchName: data.branchName,
          routingNo: data.routingNo,
          documentUrl: data.documentUrl,
          isActive: data.isActive,
          isApprove: data.isApprove,
          status: data.status,
        })
      )
    }
  }

  documentUrlHandler = (event) => {
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
            180,
            180,
            'JPEG',
            100,
            0,
            (uri) => {
              this.setState({
                documentUrl: uri,
                ChequeShowFile: URL.createObjectURL(imageFile),
                bussinessDocUrlFileName: imageFile.name,
              })
              toast.success('Image Selected.')
            },
            'base64',
            180,
            180
          )
        } catch (err) {
          toast.error('Something went wrong!')
        }
      }
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    let isError = { ...this.state.isError }
    switch (name) {
      case 'accountHolderName':
        isError.accountHolderName =
          value.length < 2 ? 'Atleast 2 characaters required' : ''
        break
      case 'accountNo':
        isError.accountNo =
          value.length < 2 ? 'Atleast 2 characaters required' : ''
        break
      case 'bankName':
        isError.bankName = value.length === 0 ? 'Bank name is required' : ''
        break
      case 'branchName':
        isError.branchName =
          value.length < 2 ? 'Atleast 2 characaters required' : ''
        break
      case 'routingNo':
        isError.routingNo =
          value.length < 2 ? 'Atleast 2 characaters required' : ''
        break
      default:
        break
    }
    this.setState({
      isError,
      [name]: value,
    })
  }

  saveBankAccount = async (e) => {
    e.preventDefault()
    if (this.state.accountHolderName === '') {
      toast.error('Account holder name is required')
      setTimeout(() => {}, 2500)
      return
    }

    if (this.state.accountNo === '') {
      toast.error('Account no is required')
      setTimeout(() => {}, 2500)
      return
    }

    if (this.state.bankName === '') {
      toast.error('Bank name is required')
      setTimeout(() => {}, 2500)
      return
    }

    if (this.state.branchName === '') {
      toast.error('Branch name is required')
      setTimeout(() => {}, 2500)
      return
    }

    if (this.state.routingNo === '') {
      toast.error('Routing no is required')
      setTimeout(() => {}, 2500)
      return
    }

    if (this.state.documentUrl === '') {
      toast.error('Cheque Copy is required')
      setTimeout(() => {}, 2500)
      return
    }

    const data = {
      sellerBankAccountId: this.state.sellerBankAccountId,
      accountHolderName: this.state.accountHolderName,
      accountNo: this.state.accountNo,
      bankName: this.state.bankName,
      branchName: this.state.branchName,
      routingNo: this.state.routingNo,
      documentUrl: this.state.documentUrl,
      shopId: this.state.shopId,
      sellerId: this.state.sellerId,
      isActive: this.state.isActive === true ? 'Y' : 'N',
      isApprove: this.state.isApprove === true ? 'Y' : 'N',
      status: this.state.status === true ? 'Y' : 'N',
    }

    const result = await this.props.createSellerBankAccountRecord(data)

    if (result && result.payload.success.succeed === true) {
      toast.success('Bank Account Information Updated Successfully')
      setTimeout(() => {
        this.props.history.push('SellerHome')
      }, 2500)
      this.resetForm()
    } else if (result && result.payload.success.succeed === false) {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        this.resetForm()
      }, 2500)
    } else if (result.type === 'CREATE_SELLER_BANK_ACCOUNT') {
      toast.success('Bank Account Information Updated Successfully')
      setTimeout(() => {
        this.props.history.push('SellerHome')
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
      accountHolderName: '',
      accountNo: '',
      bankName: '',
      branchName: '',
      routingNo: '',
      documentUrl: '',
      isError: {
        accountHolderName: '',
        accountNo: '',
        bankName: '',
        branchName: '',
        routingNo: '',
        documentUrl: '',
      },
    })
  }

  render() {
    return (
      <div id='wrapper'>
        <BankAccount
          key='BankAccount'
          name='Bank Account'
          {...this.state}
          handleChange={this.handleChange}
          saveBankAccount={this.saveBankAccount}
          documentUrlHandler={this.documentUrlHandler}
          resetForm={this.resetForm}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  sellerBankAccountById: state.sellerProfileReducer.sellerBankAccountById,
  sellerProfileById: state.sellerProfileReducer.sellerProfileById,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createSellerBankAccountRecord: (data) =>
      dispatch(sellerProfileAction.createSellerBankAccountRecord(data)),
    getBankAccountByShopIdRecord: (shopId) =>
      dispatch(sellerProfileAction.getBankAccountByShopIdRecord(shopId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(bankAccountContainer)
