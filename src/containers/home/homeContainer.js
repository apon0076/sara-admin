import React, { Component } from "react";
import Home from "../../components/home/Home";
import HomeTest from "../../components/home/HomeTest";
import authService from "../../store/services/authService";
import { connect } from "react-redux";

class homeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {

    // For Login Check
    let userId = authService.getEmployeeId();

    if (userId != null) {
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
  };

  render() {
    return (
      <div id="wrapper">
        {/* <Home key="Home" {...this.state} /> */}
        <HomeTest key="HomeTest" {...this.state} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // data: state.vendorReducer.data,
});

export default connect(
  mapStateToProps, 
  null
)(homeContainer);
