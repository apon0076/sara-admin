import React, { Component } from "react"
import { toast, ToastContainer } from "react-toastify"
import { connect } from "react-redux"
import * as authAction from "../../store/actions/authAction"
import ResetStep1 from "../../components/auth/ResetStep1"
import ResetStep2 from "../../components/auth/ResetStep2"
import ResetStep3 from "../../components/auth/ResetStep3"

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
    this.tokenVerificationResponseCheck = this.tokenVerificationResponseCheck.bind(this)
    this.submitResetPassword = this.submitResetPassword.bind(this)
  }

  nextStep = async (e) => {
    const userData = {
      userEmail: e.email,
      userContactNo: e.mobileNumber,
    }

    const response = await this.props.CreateTokenRecord(userData)

    if (response.type === "CREATE_TOKEN_ERROR") {
      toast.error("Something Went Wrong! Try Again Later...")
      setTimeout(() => { }, 2000)
    } else if (response.payload.success.result.succeed === true) {
      toast.success("OTP sent to your Email & Mobile Number.")
      setTimeout(() => {
        this.setState({
          step: 2,
          userEmail: e.email,
        })
      }, 2000)
    } else if (response.payload.success.result.succeed === false) {
      toast.error("Something Went Wrong! Try Again Later...")
      setTimeout(() => { }, 2000)
    }

  }

  tokenVerificationResponseCheck = async (e) => {
    const tokenId = localStorage.getItem("x-access-tokenId")

    const userData = {
      tokenId: tokenId,
      tokenCode: e.token,
    }
    
    const response = await this.props.VerifyTokenRecord(userData)

    if (response.type === "TOKEN_VERIFY_ERROR") {
      toast.error("Something Went Wrong! Try Again Later...")
      setTimeout(() => { }, 2000)
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
    const tokenId = localStorage.getItem("x-access-tokenId")
    const tokenCode = localStorage.getItem("x-access-tokenCode")

    const userData = {
      email: this.state.userEmail,
      tokenId: tokenId,
      tokenCode: tokenCode,
      password: event.password,
    }

    const response = await this.props.ResetPasswordRecord(userData)

    if (response.type === "PASSWORD_RESET_ERROR") {
      toast.error("Something Went Wrong! Try Again Later...")
      setTimeout(() => { }, 2000)
    } else if (response.payload.success.succeed === true) {
      toast.success("Password reset successful.")
      setTimeout(() => {
        this.props.history.push("/Login")
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
          <ResetStep1
            nextStep={this.nextStep}
            TrackLoadingState={this.props.authState}
          />
          <ToastContainer autoClose={2000} />
        </>
      )

    if (step === 2)
      return (
        <>
          <ResetStep2
            tokenVerificationResponseCheck={this.tokenVerificationResponseCheck}
          />
          <ToastContainer autoClose={2000} />
        </>
      )

    if (step === 3)
      return (
        <>
          <ResetStep3
            submitResetPassword={this.submitResetPassword}
            TrackLoadingState={this.props.authState}
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
  authState: state.authReducer,
})

const mapDispatchToProps = (dispatch) => {
  return {
    CreateTokenRecord: (userData) =>
      dispatch(authAction.CreateTokenRecord(userData)),
    VerifyTokenRecord: (userData) =>
      dispatch(authAction.TokenVerifyRecord(userData)),
    ResetPasswordRecord: (userData) =>
      dispatch(authAction.ResetPasswordRecord(userData)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(resetPasswordContainer)
