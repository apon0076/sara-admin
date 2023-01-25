import http from "../../utils/httpClient";
////debugger;
class adsService {
  createAds = async (data) => {
    return await http
      .post("/api/Content/CraeteAds", {
        adsInfoId: data.adsInfoId,
        adsName: data.adsName,
        adsDetails: data.adsDetails,
        adsTypeId: data.adsTypeId,
        imageTypeId: data.imageTypeId,
        adsLocationId: data.adsLocationId,
        advertisingImages: data.advertisingImages,
        isDelete: data.isDelete,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Authorization Failed!", err));
  };

  deleteAds = async (data) => {
    return await http
      .post("/api/Content/CraeteAds", {
        adsInfoId: data.adsInfoId,
        adsName: data.adsName,
        adsDetails: data.adsDetails,
        adsTypeId: data.adsTypeId,
        imageTypeId: data.imageTypeId,
        adsLocationId: data.adsLocationId,
        advertisingImages: data.advertisingImages,
        isDelete: data.isDelete,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
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

  getAds = async () => {
    return await http.get("/api/Ads/GetAds/");
  };

  getEmployeeId = (async) => {
    return localStorage.getItem("x-access-employeeId");
  };

  getRoleId = (async) => {
    return localStorage.getItem("x-access-roleId");
  };
}
export default new adsService();
