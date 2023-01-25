import React, { Component } from 'react'
import AddNewAdmin from '../../components/admin/AddNewAdmin'
import { toast, ToastContainer } from 'react-toastify'
import authenticationService from '../../store/services/authenticationService'
import { connect } from 'react-redux'

import * as authAction from '../../store/actions/authAction'
import * as designationAction from '../../store/actions/designation'
////////////////END/////////////////

class addNewAdminContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.saveAdmin = this.saveAdmin.bind(this)
    this.showWarning = this.showWarning.bind(this)
    this.showSuccess = this.showSuccess.bind(this)
    // this.goBack = this.goBack.bind(this)
  }

  componentDidMount = async () => {
    //Begin Temporary Authentication
    let roleId = authenticationService?.getRoleId()
    if (roleId === '1') {
      this.setState({
        authenticated: true,
        loginSuccessful: true,
      })
    } else {
      this.setState({
        authenticated: false,
        loginSuccessful: false,
      })
      this.props.history.push('/Login')
    }
    await this.props?.getDesignationRecord()
    //End Temporary Authentication
  }

  showWarning = (message) => {
    toast.error(message)
    setTimeout(() => {}, 3500)
  }

  showSuccess = (message) => {
    toast.success(message)
    setTimeout(() => {}, 3500)
  }

  saveAdmin = async (e) => {
    // e.preventDefault()
    ////debugger;

    const data = {
      roleId: 1,
      adminId: 0,
      adminName: e?.adminName,
      adminEmail: e?.adminEmail,
      genderId: e?.genderId * 1,
      dateOfBirth: e?.dateOfBirth,
      adminImageUrl: e?.adminImageUrl,
      adminContactNo: e?.adminContactNo,
      adminPresentAddress: e?.adminPresentAddress,
      adminPermanentAddress: e?.adminPermanentAddress,
      isActive: e?.isActive === true ? 'Y' : 'N',
      employeeId: e?.employeeId,
      nidNo: e?.nidNo,
      designationId: e?.designationId * 1,
    }

    const resultAdmin = await this.props?.createOrUpdateNewAdminRecord(data)

    if (resultAdmin && resultAdmin?.payload?.success?.succeed === true) {
      toast.success('New Admin Created Successfully')
      setTimeout(() => {
        this.props.history.push('AdminList')
      }, 2500)
    } else if (resultAdmin && resultAdmin?.payload?.success?.succeed === false) {
      toast.error('Something went wrong, Please try again')
    } else if (resultAdmin.type === 'CREATE_OR_UPDATE_NEW_ADMIN_SUCCESS') {
      toast.success('New Admin Created Successfully')
      setTimeout(() => {
        this.props.history.push('AdminList')
      }, 2500)
      // this.resetForm()
    } else {
      toast.error('Something went wrong, Please try again')
      setTimeout(() => {
        // this.resetForm()
      }, 2500)
    }
  }

  render() {
    return (
      <div id='wrapper'>
        <AddNewAdmin
          key='CreateNewAdmin'
          name='Add Role'
          saveAdmin={this?.saveAdmin}
          showWarning={this?.showWarning}
          showSuccess={this?.showSuccess}
          designation={this?.props?.designation}
        />
        <ToastContainer autoClose={1500} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.authReducer.data,
  designation: state.designation.data,
})

const mapDispatchToProps = (dispatch) => {
  return {
    createOrUpdateNewAdminRecord: (data) =>
      dispatch(authAction?.createOrUpdateNewAdminRecord(data)),
    getDesignationRecord: () =>
      dispatch(designationAction?.getDesignationRecord()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(addNewAdminContainer)
