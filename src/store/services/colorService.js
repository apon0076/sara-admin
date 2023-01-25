import http from "../../utils/httpClient";

class colorService {
  createColor = async (data) => {
    return await http.post("/api/Color", {
      colorId: data.colorId,
      colorName: data.colorName,
      activeYn: data.activeYn,
    });
  };

  deleteColor = async (id) => {
    return await http.delete("/api/Color/" + id);
  };

  getColor = async () => {
    return await http.get("/api/Color");
  };

  getColorById = async (searchBy) => {
    

    return await http.get("/api/Color/" + searchBy);
  };
}
export default new colorService();
