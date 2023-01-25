import http from "../../utils/httpClient"

class profileService {
  createProfile = async (data) => {
    return await http
      .post("/api/Administrator/CreateOrUpdate", {
        adminId: data.adminId,
        roleId: data.roleId,
        adminName: data.adminName,
        adminEmail: data.adminEmail,
        genderId: data.genderId,
        dateOfBirth: data.dateOfBirth,
        adminImageUrl: data.adminImageUrl,
        adminContactNo: data.adminContactNo,
        adminPresentAddress: data.adminPresentAddress,
        adminPermanentAddress: data.adminPermanentAddress,
        isActive: data.isActive,
        designationId: data.designationId,
        employeeId: data.employeeId,
        nidNo: data.nidNo,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => Promise.reject("Failed!", err))
  }

  //
  updateAdminPassword = async (data) => {
    //////debugger;

    return await http
      .post("/api/Administrator/ChangePassword", {
        adminId: data.adminId,
        adminEmail: data.adminEmail,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      })
      .then((response) => {
        return response.data
      })
      .catch((err) => Promise.reject("Failed!", err))
  }

  authenticateUser = async () => {
    return (
      (await localStorage.getItem("x-access-token")) &&
      localStorage.getItem("x-access-token-expiration") > Date.now()
    )
  }

  deauthenticateUser = async () => {
    ;(await localStorage.removeItem("x-access-token")) &&
      localStorage.getItem("x-access-token-expiration")
    window.location = window.location.origin + "/"
  }

  saveToken = async (token) => {
    ;(await localStorage.setItem("x-access-token", token)) &&
      localStorage.getItem("x-access-token-expiration")
  }

  saveToken = async (token) => {
    ;(await localStorage.setItem("x-access-token", token)) &&
      localStorage.getItem("x-access-token")
  }

  getToken = (async) => {
    return localStorage.getItem("x-access-token")
  }

  retriveToken = (async) => {
    return this.getToken()
  }

  retriveEmployeeId = (async) => {
    return this.getEmployeeId()
  }

  retriveRoleId = (async) => {
    return this.getRoleId()
  }

  getEmployeeId = (async) => {
    //////debugger;
    return localStorage.getItem("x-access-employeeId")
  }

  getRoleId = (async) => {
    return localStorage.getItem("x-access-roleId")
  }

  getProfile = async () => {
    return await http.get("/api/Administrator/Get")
  }

  getProfileById = async (userId) => {
    //////debugger;
    return await http.get("/api/Administrator/Get?adminId=" + userId)
  }
}
export default new profileService()
