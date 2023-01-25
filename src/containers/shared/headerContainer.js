/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
// import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as authAction from "../../store/actions/authAction";
// import { LogOutAuth } from "../../store/actions/authAction";
import * as Icon from "react-feather";
import { Link, NavLink } from "react-router-dom";
import * as orderAction from "../../store/actions/orderAction";

class headerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getCountOrderStatusData: "",
      statusNoArray:[0]
    };
    this.logout = this.logout.bind(this);
    this.removeLocalStorage = this.removeLocalStorage.bind(this);
    this.allStatusInfo = this.allStatusInfo.bind(this);
  }

  componentDidMount = async () => {
    var initialStatusNoArray = [0];
    await this.props.getCountOrderStatusRecord();
    this.setState({
      getCountOrderStatusData: this.props.getCountOrderStatusData,
    });
    this.allStatusInfo(this.state.getCountOrderStatusData.data, initialStatusNoArray)
    setInterval(async () => {
      await this.props.getCountOrderStatusRecord();
      this.setState({
        getCountOrderStatusData: this.props.getCountOrderStatusData,
      });
      this.allStatusInfo(this.state.getCountOrderStatusData.data, initialStatusNoArray)
    }, 10000);
    
  };


  removeLocalStorage = () => {
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("x-access-employeeId");
    localStorage.removeItem("x-access-roleId");
    localStorage.removeItem("x-access-token-expiration");
    localStorage.removeItem("admin-remember");
  };

  logout = (event) => {
    this.props.LogOutAuth(this.props.history);
  };

  allStatusInfo = (allStatusData, statusNo) => {
    allStatusData &&
      allStatusData.map((data) => {
        if (data.statusName === "Pending") {
          statusNo[0] = data.countStatus;
        }
        this.setState({
          statusNoArray: statusNo,
        });
      });
  }
  render() {
    return (
      <div id="wrapper" style={{ position: "fixed", top: "0", zIndex: "1000" }}>
        {/* <Header key="Header" {...this.state} logout={this.logout} /> */}
        <div>
          <nav className="navbar navbar-default navbar-static-top m-b-0">
            <div className="navbar-header">
              <button
                className="navbar-toggle font-20 hidden-sm hidden-md hidden-lg "
                //href="#"onClick={(e) => {e.preventDefault()}}
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <i className="fa fa-bars"></i>
              </button>
              <div className="top-left-part">
                <Link className="logo" to="/Home">
                  <b>
                    <img src="/assets/plugins/images/logo.png" alt="home" />
                  </b>
                  <span>
                    <img
                      src="/assets/plugins/images/Website_Logo_255x64.png"
                      alt="homepage"
                      className="dark-logo"
                      style={{ width: "130px" }}
                    />
                  </span>
                </Link>
              </div>
              <ul className="nav navbar-top-links navbar-left hidden-xs">
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                    className="sidebartoggler font-20 waves-effect waves-light"
                  >
                    <i className="icon-arrow-left-circle"></i>
                  </a>
                </li>
              </ul>

              {/* Right side designs */}
              <ul className="nav navbar-top-links navbar-right pull-right">
                <li>
                  <NavLink
                    to="/Login"
                    onClick={() => this.removeLocalStorage()}
                  >
                    <span style={{ fontSize: "16px" }}>
                      <i className="fa fa-power-off"></i>
                    </span>
                    <span style={{ fontSize: "15px", fontWeight: 700 }}>
                      Logout
                    </span>
                  </NavLink>
                </li>
                <li className="dropdown">
                  <Link to="/ManageOrdersAdmin?status=pending">
                    <Icon.Bell className="text-light" />
                    <span className="badge badge-xs badge-danger">
                      {this.state.statusNoArray[0]}
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getCountOrderStatusData: state.orderReducer.getCountOrderStatusData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    LogOutAuth: () => dispatch(authAction.LogOutAuth()),
    getCountOrderStatusRecord: () => dispatch(orderAction.getCountOrderStatusRecord()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(headerContainer);
