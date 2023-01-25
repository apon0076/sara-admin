import http from "../../utils/httpClient";
//////debugger;
class menuPermissionService {
  createMenuPermission = async (data) => {
    return await http
      .post("/api/Menu/", {
        moduleTypeId: data.moduleTypeId,
        parentMenuId: data.parentMenuId,
        pageDispalyName: data.pageDispalyName,
        pageUrl: data.pageUrl,
        pageSerailNo: data.pageSerailNo,
        pageDescription: data.pageDescription,
        isActive: data.isActive,
        isUi: data.isUi,
        pageId: data.pageId,
        pageTitle: data.pageTitle,
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

  deleteMenu = async (id) => {
    return await http.delete("/api/Menu/" + id);
  };

  getMenu = async () => {
    return await http.get("/api/Menu");
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
export default new menuPermissionService();
