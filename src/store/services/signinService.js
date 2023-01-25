import http from "../../utils/httpClient";
/**
 * Authenticate a user. Save a token string in Local Storage
 *
 * @param {string} token
 */
//Merge with Branch
class singinService {
  loginAuth = async (data) => {
    return await http
      .post(`/api/auth/login`, {
        email: data.userEmail,
        password: data.userPass,
      })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("x-access-token", response.data.token);
        localStorage.setItem(
          "x-access-token-expiration",
          Date.now() + 2 * 60 * 60 * 1000 //expires in 2 hours
        );

        return response.data;
      })
      .catch((err) => Promise.reject("Authentication Failed!"));
  };

  isAuthenticated = async () => {
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
}
export default new singinService();
