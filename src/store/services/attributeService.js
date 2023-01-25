import http from "../../utils/httpClient";

class attributeService {
  createAttribute = async (data) => {
    return await http
      .post("/api/attribute", {
        attributeId: data.attributeId,
        attributeName: data.attributeName,
        activeYn: data.activeYn,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  deleteAttribute = async (id) => {
    return await http.delete("/api/attribute/" + id);
  };

  getAttribute = async () => {
    return await http.get("/api/attribute");
  };

  getAttrbuteById = async (searchBy) => {
    return await http.get("/api/attribute/" + searchBy);
  };
}
export default new attributeService();
