import React, { Component } from "react";
////////////////bellow libary used for Redux implementation purpose/////////////////
import { connect } from "react-redux";
////////////////////////END/////////////////////////////////////////////////////////
///////////////Bellow part is used for to load MENU List////////////////////
import * as menuAction from "../../../store/actions/menuAction";
import * as menuPermissionAction from "../../../store/actions/menuPermissionAction";
////////////////END/////////////////
///////////////Bellow part is used for to load Role Dropdown////////////////////
import * as roleAction from "../../../store/actions/roleAction";
import CreateMenuPermission from "../../../components/settings/menuPermission/CreateMenuPermission";

////////////////////////END/////////////////////////////////////////////////////////

class createMenuPermissionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckedAdd: false,
      isCheckedDelete: false,
      isCheckedModify: false,
      isCheckedRead: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveMenuPermission = this.saveMenuPermission.bind(this);
    this.clearData = this.clearData.bind(this);
    this.handleParentCheck = this.handleParentCheck.bind(this);
  }

  componentDidMount = async () => {
    // For Login Check
    // let userId = menuPermissionService.getEmployeeId();

    // if (userId != null) {
    //   this.setState({
    //     authenticated: true,
    //     loginSuccessful: true,
    //   });
    // } else {
    //   this.setState({
    //     authenticated: false,
    //     loginSuccessful: false,
    //   });

    //   this.props.history.push("/Login");
    // }

    //////debugger;
    await this.props.getRoleRecord();
    await this.props.getMenuRecord();
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

  handleAllChecked = (event) => {
    let fruites = this.state.fruites;
    fruites.forEach((fruite) => (fruite.isChecked = event.target.checked));
    this.setState({ fruites: fruites });
  };

  handleCheckChieldElement = (event) => {
    let fruites = this.state.fruites;
    fruites.forEach((fruite) => {
      if (fruite.value === event.target.value)
        fruite.isChecked = event.target.checked;
    });
    this.setState({ fruites: fruites });
  };

  saveMenuPermission = async (e) => {
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

    await this.props.createMenuPermissionRecord(data);

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

  handleParentCheck = (e) => {
    const { target } = e;
    switch (target.name) {
      case "isCheckedAdd":
        this.setState({ isCheckedAdd: !this.state.isCheckedAdd });
        break;

      case "isCheckedDelete":
        this.setState({ isCheckedDelete: !this.state.isCheckedDelete });
        break;

      case "isCheckedModify":
        this.setState({ isCheckedModify: !this.state.isCheckedModify });
        break;

      case "isCheckedRead":
        this.setState({ isCheckedRead: !this.state.isCheckedRead });
        break;
      default:
    }
  };

  render() {
    return (
      <div id="wrapper">
        <CreateMenuPermission
          key="CreateMenuPermission"
          name="Add Menu Permission"
          {...this.state}
          roles={this.props.roles}
          menus={this.props.menus}
          handleChange={this.handleChange}
          values={this.values}
          saveMenuPermission={this.saveMenuPermission}
          handleAllChecked={this.handleAllChecked}
          handleCheckChieldElement={this.handleCheckChieldElement}
          handleParentCheck={this.handleParentCheck}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  roles: state.roleReducer.roles,
  menus: state.menuReducer.menus,
  data: state.menuPermissionReducer.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getRoleRecord: () => dispatch(roleAction.getRoleRecord()),
    getMenuRecord: () => dispatch(menuAction.getMenuRecord()),
    createMenuPermissionRecord: (data) =>
      dispatch(menuPermissionAction.createMenuPermissionRecord(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createMenuPermissionContainer);
