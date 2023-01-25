import http from "../../utils/httpClient";

class ShopService {
  createShop = async (data) => {
    return await http
      .post("/api/Seller/CreateShop/", {
        shopName: data.shopName,
        bussinessTypeId: data.bussinessTypeId,
        //shopDescription: data.shopDescription,
        binNo: data.binNo,
        shopCity: data.shopCity,
        shopState: data.shopState,
        zipCode: data.zipCode,
        shopAddress: data.shopAddress,
      })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("x-access-token", token);

        const result = response.data.succeed;
        const msg = response.data.message;
        if (result) {
          window.alert(
            "Shop create successful! Please wait for vafification. Thanks."
          );
          return response.data;
        } else {
          window.alert(msg);
        }

        return response.data;
      })
      .catch((err) => Promise.reject("Authorization Failed!", err));
  };

  getShop = async () => {
    return await http.get("api/Seller/GetShopDetails?getAll=Y");
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

  getEmployeeId = (async) => {
    return localStorage.getItem("x-access-employeeId");
  };

  getRoleId = (async) => {
    return localStorage.getItem("x-access-roleId");
  };
}
export default new ShopService();
