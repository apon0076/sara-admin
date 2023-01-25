import React, { Component } from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import authenticationService from "../../store/services/authenticationService";
import * as authAction from "../../store/actions/authAction";
import Signin from "../../components/auth/Signin";

////////////////END////////////////////////////////////////////////////////////////

class signinContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userPass: "",
      chkRemember: false,
      user: {
        userEmail: "",
        employeeId: "",
      },
    };

    this.submitLogin = this.submitLogin.bind(this);
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let check = localStorage.getItem("admin-remember");
    if (check && check === "Y") {
      this.props.history.push("/Home");
    }
    //End Temporary Authentication

    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId();
    if (roleId === "1") {
      this.props.history.push("/Home");
    } else if (roleId === "2") {
      this.props.history.push("/SellerHome");
    }
  };

  submitLogin = async (e) => {
    // event.preventDefault();

    this.setState({ submiting: true });

    const data = {
      email: e.email,
      password: e.password,
      check: e.check,
    };

    const response = await this.props.LogInAuth(data);

    if (response.type === "LOGIN_ERROR") {
      let msg = "Invalid Email or Password!";
      toast.error(msg);
    } else if (
      response.payload.success &&
      response.payload.success.token &&
      response.payload.success &&
      response.payload.success.user.id
    ) {
      let msg = "Login successful! Redirecting to Home,now...";
      toast.success(msg);
      this.props.history.push("/Home");
      window.location.reload();
    } else {
      let msg = "Something went wrong! Try again later";
      toast.success(msg);
    }
  };

  render() {
    return (
      <div id="wrapper">
        <Signin key="SignIn" {...this.state} submitLogin={this.submitLogin} />
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const props = {
    userEmail: state.userEmail,
    userPass: state.userPass,
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    LogInAuth: (userData) => dispatch(authAction.LogInAuth(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(signinContainer);
