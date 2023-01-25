import React, { Component } from "react";
import SellerHome from "../../components/sellerHome/SellerHome";
import authenticationService from "../../store/services/authenticationService";
// import profileService from "../../store/services/profileService";
// import { NavLink, Redirect } from "react-router-dom";
// import { hashHistory } from "react-router";
import { connect } from "react-redux";

class sellerHomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId();
    if (roleId === "2") {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
      });
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      });
      this.props.history.push("/SellerLogin");
    }
    //End Temporary Authentication
  };

  render() {
    return (
      <div id="wrapper">
        <SellerHome key="SellerHome" {...this.state} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // sellerCheck: state.profileReducer.profiles,
});

export default connect(mapStateToProps, null)(sellerHomeContainer);
