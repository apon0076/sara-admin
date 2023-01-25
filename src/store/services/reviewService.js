import http from "../../utils/httpClient";
//debugger;
class reviewService {
  createReview = async (data) => {
    return await http
      .post("/api/Review/CreateReview", {
        reviews: data,
      })
      .then((response) => {
        //debugger;
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

  deleteReview = async (id) => {
    return await http.delete("/api/Review/GetReview/" + id);
  };

  getReview = async () => {
    return await http.get("/api/Review/GetReview/");
  };

  getEmployeeId = (async) => {
    return localStorage.getItem("x-access-employeeId");
  };

  getRoleId = (async) => {
    return localStorage.getItem("x-access-roleId");
  };
}
export default new reviewService();
