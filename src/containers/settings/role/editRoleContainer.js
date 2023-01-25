import React, { Component } from "react";
import EditRole from "../../../components/settings/role/EditRole";
import authenticationService from "../../../store/services/authenticationService";
import { connect } from "react-redux";
import * as roleAction from "../../../store/actions/roleAction";

class editRoleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorId: "",
      roleName: "",
      activeYn: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.updateRole = this.updateRole.bind(this);
    this.clearData = this.clearData.bind(this);
  }

  componentDidMount = () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId();
    if (roleId === "1") {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
        colorId: this.props.match.params.id,
        roleName: this.props.match.params.roleName,
      });
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      });
      this.props.history.push("/Login");
    }
    //End Temporary Authentication
  };

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.updateColor(e);
    }
  };

  handleChange = (e) => {
    const { target } = e;
    switch (target.name) {
      case "colorId":
        this.setState({ colorId: target.value });
        break;

      case "colorName":
        this.setState({ colorName: target.value });
        break;

      case "activeYn":
        this.setState({ activeYn: target.value });
        break;

      default:
    }
  };

  updateRole = async (e) => {
    e.preventDefault();
    //////debugger;
    const data = {
      colorId: this.state.colorId,
      colorName: this.state.colorName,
      activeYn: "Y",
    };

    if (data.colorId === "") {
      data.colorId = 0;
    }

    await this.props.updateColorRecord(data);
    this.clearData(e);
    this.props.history.push("/ColorList");
  };

  clearData = (e) => {
    e.preventDefault();
    this.setState({
      colorId: "",
      colorName: "",
      activeYn: "false",
    });
  };

  render() {
    return (
      <div id="wrapper">
        <EditRole
          key="EditRole"
          name="Update Role"
          {...this.state}
          handleChange={this.handleChange}
          values={this.values}
          updateRole={this.updateRole}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.roleReducer.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateRoleRecord: (data) => dispatch(roleAction.updateRoleRecord(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(editRoleContainer);
