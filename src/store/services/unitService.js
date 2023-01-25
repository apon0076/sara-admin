import http from "../../utils/httpClient";

class unitService {
  createUnit = async (data) => {
    return await http
      .post("/api/unit", {
        unitId: data.unitId,
        unitName: data.unitName,
        activeYn: data.activeYn,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  deleteUnit = async (id) => {
    return await http.delete("/api/unit/" + id);
  };

  getUnit = async () => {
    return await http.get("/api/unit");
  };

  getUnitById = async (searchBy) => {
    return await http.get("/api/unit/" + searchBy);
  };
}
export default new unitService();
