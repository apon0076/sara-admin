import React, { Component } from "react";
import CreateMenu from "../../../components/settings/menu/CreateMenu";

import menuService from "../../../store/services/menuService";

////////////////bellow libary used for Redux implementation purpose/////////////////

import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

import * as menuAction from "../../../store/actions/menuAction";
// import { createMenuRecord } from "../../../store/actions/menuAction";
// import menuReducer from "../../../store/reducers/menuReducer";

////////////////END/////////////////

class createMenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleTypeId: "",
      parentMenuId: "",
      pageDispalyName: "",
      pageUrl: "",
      pageSerailNo: "",
      pageDescription: "",
      isActive: "",
      isUi: "",
      pageId: "",
      pageTitle: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveMenu = this.saveMenu.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  componentDidMount = async () => {
    //this.refs.categoryName.focus();

    // For Login Check
    let userId = menuService.getEmployeeId();

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

    //await this.props.getMenuRecord();
  };

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.saveMenu(e);
    }
  };

  handleChange = (e) => {
    const { target } = e;
    switch (target.name) {
      case "moduleTypeId":
        this.setState({ moduleTypeId: target.value });
        break;

      case "parentMenuId":
        this.setState({ parentMenuId: target.value });
        break;

      case "menuName":
        this.setState({ menuName: target.value });
        break;

      case "pageUrl":
        this.setState({ pageUrl: target.value });
        break;

      case "pageSerailNo":
        this.setState({ pageSerailNo: target.value });
        break;

      case "pageDescription":
        this.setState({ pageDescription: target.value });
        break;

      case "isActive":
        this.setState({ isActive: target.value });
        break;

      case "isUi":
        this.setState({ isUi: target.value });
        break;

      default:
    }
  };

  saveMenu = async (e) => {
    //e.preventDefault();
    //////debugger;

    const data = {
      moduleTypeId: e.moduleTypeId,
      parentMenuId: e.parentMenuId,
      pageDispalyName: e.pageDispalyName,
      pageUrl: e.pageUrl,
      pageSerailNo: e.pageSerailNo,
      pageDescription: e.pageDescription,
      isActive: "Y",
      isUi: "Y",
      pageTitle: "",
      pageId: 0,
    };

    await this.props.createMenuRecord(data);

    this.clearData(e);
  };

  clearData = (e) => {
    //e.preventDefault();
    this.setState({
      moduleTypeId: "",
      parentMenuId: "",
      pageDispalyName: "",
      pageUrl: "",
      pageSerailNo: "",
      pageDescription: "",
      isActive: "",
      isUi: "",
      pageId: 0,
      pageTitle: "",
    });
  };

  render() {
    return (
      <div id="wrapper">
        <CreateMenu
          key="CreateMenu"
          name="Add Menu"
          {...this.state}
          handleChange={this.handleChange}
          values={this.values}
          saveMenu={this.saveMenu}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.menuReducer.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createMenuRecord: (data) => dispatch(menuAction.createMenuRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createMenuContainer);
