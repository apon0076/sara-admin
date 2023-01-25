import React, { Component } from "react"
import { toast, ToastContainer } from "react-toastify"
import { connect } from "react-redux"
import * as sellerAction from "../../store/actions/sellerAction"
import ResetPasswordSeller3 from "../../components/auth/ResetPasswordSeller3"
import ResetPasswordSeller2 from "../../components/auth/ResetPasswordSeller2"
import ResetPasswordSeller1 from "../../components/auth/ResetPasswordSeller1"

////////////////END////////////////////////////////////////////////////////////////

class resetPasswordContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      userEmail: "",
      mobile: "",
      password: "",
    }

    this.nextStep = this.nextStep.bind(this)
    this.tokenVerificationResponseCheck = this.tokenVerificationResponseCheck.bind(
      this
    )
    this.submitResetPassword = this.submitResetPassword.bind(this)
  }

  nextStep = async (e) => {
    const { step } = this.state

    const userData = {
      userEmail: e.email,
      userContactNo: e.mobileNumber,
    }

    const response = await this.props.CreateTokenRecord(userData)

    if (response.type === "CREATE_SELLER_TOKEN_ERROR") {
      toast.error("Something Went Wrong! Try Again Later...")
      setTimeout(() => {}, 2000)
    } else if (response.payload.success.result.succeed === true) {
      toast.success("Reset Token sent to your mobile & email.")
      setTimeout(() => {
        this.setState({
          step: 2,
          userEmail: e.email,
        })
      }, 2000)
    } else if (response.payload.success.result.succeed === false) {
      toast.error("Something Went Wrong! Try Again Later...")
      setTimeout(() => {}, 2000)
    }

  }

  tokenVerificationResponseCheck = async (e) => {
    const { step } = this.state

    const tokenId = localStorage.getItem("x-access-tokenId")

    const userData = {
      tokenId: tokenId,
      tokenCode: e.token,
    }

    const response = await this.props.VerifyTokenRecord(userData)

    if (response.type === "SELLER_TOKEN_VERIFY_ERROR") {
      toast.error("Something Went Wrong! Try Again Later...")
      setTimeout(() => {}, 2000)
    } else if (response.payload.success.succeed === true) {
      toast.success("Token verification successful.")
      setTimeout(() => {
        this.setState({
          step: 3,
        })
      }, 2000)
    } else if (response.payload.success.succeed === false) {
      toast.error("Something Went Wrong! Try Again Later...")
      setTimeout(() => {
        this.setState({
          step: 1,
        })
      }, 2000)
    }
  }

  submitResetPassword = async (event) => {
    const { step } = this.state

    const tokenId = localStorage.getItem("x-access-tokenId")
    const tokenCode = localStorage.getItem("x-access-tokenCode")

    const userData = {
      email: this.state.userEmail,
      tokenId: tokenId,
      tokenCode: tokenCode,
      password: event.password,
    }

    const response = await this.props.ResetPasswordRecord(userData)

    if (response.type === "SELLER_PASSWORD_RESET_ERROR") {
      toast.error("Something Went Wrong! Try Again Later...")
      setTimeout(() => {}, 2000)
    } else if (response.payload.success.succeed === true) {
      toast.success("Password reset successful.")
      setTimeout(() => {
        this.props.history.push("/SellerLogin")
      }, 2500)
    } else if (response.payload.success.succeed === false) {
      toast.error("Something Went Wrong! Try Again Later...")
      setTimeout(() => {
        this.setState({
          step: 1,
        })
      }, 2000)
    }
  }

  showStep = () => {
    const { step } = this.state

    if (step === 1)
      return (
        <>
          <ResetPasswordSeller1
            nextStep={this.nextStep}
            TrackLoadingState={this.props.sellerState}
          />
          <ToastContainer autoClose={2000} />
        </>
      )

    else if (step === 2)
      return (
        <>
          <ResetPasswordSeller2
            tokenVerificationResponseCheck={this.tokenVerificationResponseCheck}
          />
          <ToastContainer autoClose={2000} />
        </>
      )

    else if (step === 3)
      return (
        <>
          <ResetPasswordSeller3
            submitResetPassword={this.submitResetPassword}
            TrackLoadingState={this.props.sellerState}
          />
          <ToastContainer autoClose={2000} />
        </>
      )
  }

  render() {
    return <>{this.showStep()}</>
  }
}

const mapStateToProps = (state) => ({
  sellerState: state.sellerReducer,
})

const mapDispatchToProps = (dispatch) => {
  return {
    CreateTokenRecord: (userData) =>
      dispatch(sellerAction.createTokenRecord(userData)),
    VerifyTokenRecord: (userData) =>
      dispatch(sellerAction.sellerTokenVerifyRecord(userData)),
    ResetPasswordRecord: (userData) =>
      dispatch(sellerAction.PasswordResetRecord(userData)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(resetPasswordContainer)
