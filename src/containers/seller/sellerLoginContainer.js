import React, { Component } from "react";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
////////////////END////////////////////////////////////////////////////////////////
import * as sellerAction from "../../store/actions/sellerAction";
import SellerLogin from "../../components/seller/SellerLogin";
import authenticationService from "../../store/services/authenticationService";
////////////////END////////////////////////////////////////////////////////////////

class sellerLoginContainer extends Component {
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
    let check = localStorage.getItem("seller-remember");
    // this.props.history.push("/SellerHome")

    if (check && check === "Y") {
      this.props.history.push("/SellerHome");
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

  // This checks ENTER key (13), then checks if next node is an INPUT
  // Then focuses next input box
  handleKeyPress(event) {
    if (event.keyCode === "ENTER") {
      event.preventDefault(); // Prevent form submission if button present
      this.refs[event].focus();
    }
  }

  submitLogin = async (e) => {
    // event.preventDefault();

    this.setState({ submiting: true });

    const data = {
      email: e.email,
      password: e.password,
      check: e.check,
    };

    const response = await this.props.SellerLogInAuth(data);

    if (response.type === "SELLER_LOGIN_ERROR") {
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
      // window.location = "/SellerHome"
      this.props.history.push("/SellerHome");
      window.location.reload();
    } else {
      let msg = "Something went wrong! Try again later";
      toast.success(msg);
    }
  };

  render() {
    return (
      <div id="wrapper">
        <SellerLogin
          key="SellerLogin"
          {...this.state}
          submitLogin={this.submitLogin}
        />
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
    SellerLogInAuth: (userData) =>
      dispatch(sellerAction.SellerLogInAuth(userData)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(sellerLoginContainer);
