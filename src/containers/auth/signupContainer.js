import React, { Component } from "react";
import Signup from "../../components/auth/Signup";

////////////////bellow libary used for Redux implementation purpose/////////////////
// import { bindActionCreators } from "redux";
import { connect } from "react-redux";
////////////////END////////////////////////////////////////////////////////////////

import * as authAction from "../../store/actions/authAction";
// import { LogOutAuth } from "../../store/actions/authAction";

////////////////END////////////////////////////////////////////////////////////////

class signupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userPass: "",
      email: "",
      phoneNumber: "",
      chkTerms: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.SubmitSignup = this.SubmitSignup.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.SubmitLogin(e);
    }
  };

  // This checks ENTER key (13), then checks if next node is an INPUT
  // Then focuses next input box
  handleKeyPress(event) {
    //////debugger;
    if (event.keyCode === "ENTER") {
      event.preventDefault(); // Prevent form submission if button present
      this.refs[event].focus();
    }
  }

  handleChange = (e) => {
    const { target } = e;
    switch (target.name) {
      case "userName":
        this.setState({ userName: target.value });
        break;

      case "userPass":
        this.setState({ userPass: target.value });
        break;

      case "email":
        this.setState({ email: target.value });
        break;

      case "phoneNumber":
        this.setState({ phoneNumber: target.value });
        break;

      case "chkTerms":
        this.setState({ chkTerms: target.value });
        break;

      default:
    }
  };

  SubmitSignup = async (event) => {
    //////debugger;
    event.preventDefault();

    this.setState({ submiting: true });

    const userData = {
      userName: this.state.userName,
      password: this.state.userPass,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      chkTerms: this.state.chkTerms,
    };

    this.props.RegistrationAuth(userData);
  };

  clearData = (e) => {
    e.preventDefault();
    this.setState({
      userName: "",
      userPass: "",
      userEmail: "",
      phoneNumber: "",
      chkTerms: "",
    });
  };

  render() {
    return (
      <div id="wrapper">
        <Signup
          key="Signup"
          {...this.state}
          handleChange={this.handleChange}
          handleKeyPress={this.handleKeyPress}
          values={this.values}
          SubmitSignup={this.SubmitSignup}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const props = {
    userName: state.userName,
    userPass: state.userPass,
    userEmail: state.userEmail,
    phoneNumber: state.phoneNumber,
    chkTerms: state.chkTerms,
  };

  return props;
};

const mapDispatchToProps = (dispatch) => {
  return {
    RegistrationAuth: (userData) =>
      dispatch(authAction.RegistrationAuth(userData)),
  };
};

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(signupContainer);
