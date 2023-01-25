import React, { Component } from "react"
import CreateRole from "../../../components/settings/role/CreateRole"
import { toast, ToastContainer } from "react-toastify"
import authenticationService from "../../../store/services/authenticationService"
import { connect } from "react-redux"
import * as roleAction from "../../../store/actions/roleAction"

class createRoleContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moduleId: "",
      roleName: "",
      roleId: "",
      isActive: "",
    }

    //this.handleChange = this.handleChange.bind(this);
    this.saveRole = this.saveRole.bind(this)
    this.clearData = this.clearData.bind(this)
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()
    if (roleId === "1") {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push("/Login")
    }
    //End Temporary Authentication
  }

  keyPressed = (e) => {
    if (e.key === "Enter") {
      this.saveRole(e)
    }
  }

  saveRole = async (e) => {

    //////debugger;
    const data = {
      moduleId: e.moduleId,
      roleName: e.roleName,
      roleId: 0,
      isActive: e.isActive === true ? "Y" : "N",
    }
    // const resultRole = await this.props.createRoleRecord(data);
    // if (resultRole.payload.success.succeed === true) {
    //   toast.success(resultRole.payload.success.message);
    //   setTimeout(() => { }, 3500);
    // }
    // this.clearData(e);
  }

  clearData = (e) => {
    this.setState({
      moduleId: "",
      roleName: "",
      roleId: "",
      isActive: "",
    })
  }

  render() {
    return (
      <div id="wrapper">
        <CreateRole
          key="CreateRole"
          name="Add Role"
          {...this.state}
          handleChange={this.handleChange}
          values={this.values}
          saveRole={this.saveRole}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.roleReducer.data,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createRoleRecord: (data) => dispatch(roleAction.createRoleRecord(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(createRoleContainer)
