import React, { Component } from "react"
import EditAdmin from "../../components/admin/EditAdmin"
import { toast, ToastContainer } from "react-toastify"
import authenticationService from "../../store/services/authenticationService"
import { connect } from "react-redux"

import * as authAction from "../../store/actions/authAction"
import * as designationAction from "../../store/actions/designation"
////////////////END/////////////////

class editAdminContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.saveAdmin = this.saveAdmin.bind(this)
    this.showWarning = this.showWarning.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService.getRoleId()
    if (roleId === "1") {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
      })
      await this.props.getDesignationRecord()
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push("/Login")
    }
    //End Temporary Authentication
  }

  showWarning = (message) => {
    toast.error(message)
    setTimeout(() => {}, 3500)
  }

  goBack = () => {
    setTimeout(() => {
      this.props.history.push("/Home")
    }, 500)
  }

  saveAdmin = async (e) => {
    // e.preventDefault()
    ////debugger;

    const data = {
      roleId: 1,
      adminId: e?.adminId,
      adminName: e?.adminName,
      adminEmail: e?.adminEmail,
      genderId: e?.genderId * 1,
      dateOfBirth: e?.dateOfBirth,
      adminImageUrl: e?.adminImageUrl,
      adminContactNo: e?.adminContactNo,
      adminPresentAddress: e?.adminPresentAddress,
      adminPermanentAddress: e?.adminPermanentAddress,
      isActive: e?.isActive === true ? "Y" : "N",
      employeeId: e?.employeeId,
      nidNo: e?.nidNo,
      designationId: e?.designationId * 1,
    }

    const resultAdmin = await this.props.createOrUpdateNewAdminRecord(data)
    if (resultAdmin.type === "CREATE_OR_UPDATE_NEW_ADMIN_SUCCESS") {
      toast.success("Data Updated Successfully.")
      setTimeout(() => {
        this.props.history.push("/AdminList")
      }, 3500)
    }
    if (resultAdmin?.type === "CREATE_OR_UPDATE_NEW_ADMIN_ERROR") {
      toast.error("Something Went Wrong! Try again later..")
      setTimeout(() => {}, 3500)
    }
  }

  render() {
    return (
      <div id="wrapper">
        <EditAdmin
          key="CreateNewAdmin"
          name="Add Role"
          saveAdmin={this.saveAdmin}
          showWarning={this.showWarning}
          goBack={this.goBack}
          data={this.props?.history?.location?.state?.rowData}
          designation={this.props?.designation}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.roleReducer?.data,
  designation: state.designation?.data,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createOrUpdateNewAdminRecord: (data) =>
      dispatch(authAction.createOrUpdateNewAdminRecord(data)),
    getDesignationRecord: () =>
      dispatch(designationAction.getDesignationRecord()),
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(editAdminContainer)
