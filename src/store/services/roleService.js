import http from "../../utils/httpClient";
//////debugger;
class roleService {
  createRole = async (data) => {
    return await http
      .post("api/Role/", {
        moduleTypeId: data.moduleTypeId,
        roleName: data.roleName,
        roleId: data.roleId,
        isActive: data.isActive,
      })
      .then((response) => {

        return response.data;
      })
      .catch((err) => Promise.reject("Authorization Failed!", err));
  };

  authenticateUser = async () => {
    return (
      (await localStorage.getItem("x-access-token")) &&
      localStorage.getItem("x-access-token-expiration") > Date.now()
    );
  };

  deauthenticateUser = async () => {
    (await localStorage.removeItem("x-access-token")) &&
      localStorage.getItem("x-access-token-expiration");
    window.location = window.location.origin + "/";
  };

  saveToken = async (token) => {
    (await localStorage.setItem("x-access-token", token)) &&
      localStorage.getItem("x-access-token-expiration");
  };

  getToken = (async) => {
    return localStorage.getItem("x-access-token");
  };

  retriveToken = (async) => {
    return this.getToken();
  };

  retriveEmployeeId = (async) => {
    return this.getEmployeeId();
  };

  retriveRoleId = (async) => {
    return this.getRoleId();
  };

  deleteRole = async (id) => {
    return await http.delete("/api/Role/" + id);
  };

  getRole = async () => {
    return await http.get("/api/Role/");
  };

  getMenuById = async (searchBy) => {
    return await http.get("/api/Color/" + searchBy);
  };

  getEmployeeId = (async) => {
    return localStorage.getItem("x-access-employeeId");
  };

  getRoleId = (async) => {
    return localStorage.getItem("x-access-roleId");
  };
}
export default new roleService();
