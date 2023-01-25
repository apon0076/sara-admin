import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Navbar from "../../components/shared/navbar/Navbar";
import * as authAction from "../../store/actions/authAction";
import * as profileAction from "../../store/actions/profileAction";
import authenticationService from "../../store/services/authenticationService";
import authService from "../../store/services/authService";

class navBarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loginSuccessful: false,
      redirectTo: null,
      searchBy: "",
    };

    this.logOut = this.logOut.bind(this);
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let userId = authService.getEmployeeId();
    let roleId = authenticationService.getRoleId();
    if (roleId === "1") {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
      });
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      });
      this.props.history.push("/Login");
    }
    //End Temporary Authentication
    await this.props.getProfileByIdRecord(userId);
  };

  logOut = async () => {
    //////debugger;
    await this.props.isDeAuthenticateUser();
    return <Redirect to="/Login" />;
  };

  render() {
    return (
      <div id="wrapper">
        <Navbar
          key="Navbar"
          {...this.state}
          logOut={this.logOut}
          profileById={this.props?.profileById}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.authReducer.data,
  profileById: state.profileReducer.profileById,
});

const mapDispatchToProps = (dispatch) => {
  return {
    isAuthenticateUser: () => dispatch(authAction.isAuthenticateUser()),
    isDeAuthenticateUser: () => dispatch(authAction.isDeAuthenticateUser()),
    getProfileByIdRecord: (index) =>
      dispatch(profileAction.getProfileByIdRecord(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(navBarContainer);
