import React, { Component } from "react";
import authenticationService from "../../../store/services/authenticationService";
import { connect } from "react-redux";
import * as roleAction from "../../../store/actions/roleAction";
import RoleList from "../../../components/settings/role/RoleList";

////////////////END/////////////////

class roleListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchId: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount = async () => {
    //Begin Temporary Authentication
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
  };

  handleChange = async (e) => {
    const { target } = e;
    switch (target.name) {
      case "searchId":
        //////debugger;
        this.setState({ searchId: target.value });
        let searchBy = target.value;
        if (searchBy === "") {
          await this.props.getMenuRecord();
        } else {
          await this.props.getMenuByIdRecord(searchBy);
        }

        break;

      default:
    }
  };

  componentDidMount = async () => {
    //////debugger;
    await this.props.getRoleRecord();
  };

  //////debugger;
  deleteRole = async (id) => {
    await this.props.deleteRoleRecord(id);
    await this.props.getRoleRecord();
  };

  render() {
    return (
      <RoleList
        key="RoleList"
        {...this.state}
        roles={this.props.roles}
        loading={this.props.loading}
        error={this.props.error}
        handleChange={this.handleChange}
        values={this.values}
        searchId={this.props.searchId}
        deleteRole={this.deleteRole}
      />
    );
  }
}

// Making categories  array available in  props
const mapStateToProps = (state) => ({
  roles: state.roleReducer.roles,
  loading: state.menuReducer.loading,
  error: state.menuReducer.error,
  searchId: state.searchId,
  handleChange: state.handleChange,
  deleteRole: state.deleteRole,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getRoleRecord: () => dispatch(roleAction.getRoleRecord()),
    getRoleByIdRecord: (index) => dispatch(roleAction.getRoleByIdRecord(index)),
    deleteRoleRecord: (index) => dispatch(roleAction.deleteRoleRecord(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(roleListContainer);
