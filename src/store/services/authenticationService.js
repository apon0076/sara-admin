class authenticationService {
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

  saveToken = async (token) => {
    (await localStorage.setItem("x-access-token", token)) &&
      localStorage.getItem("x-access-token");
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

  getEmployeeId = (async) => {
    return localStorage.getItem("x-access-employeeId");
  };

  getRoleId = (async) => {
    return localStorage.getItem("x-access-roleId");
  };
}

export default new authenticationService();
