import http from "../../utils/httpClient";

class bussinessTypeService {
  createBussinessType = async (data) => {
    return await http
      .post("/api/bussinessType", {
        bussinessTypeName: data.bussinessTypeName,
        updateBy: data.updateBy,
      })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("x-access-token", token);
        return response.data;
      })
      .catch((err) => Promise.reject("Authorization Failed!", err));
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

  deleteBussinessType = async (id) => {
    return await http.delete("/api/bussinessType/" + id);
  };

  getBussinessType = async () => {
    return await http.get("/api/bussinessType");
  };

  getBussinessTypeId = async (searchBy) => {
    return await http.get("/api/bussinessType/" + searchBy);
  };
}

export default new bussinessTypeService();
