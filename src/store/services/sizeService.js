import http from "../../utils/httpClient";

class sizeService {
  createSize = async (data) => {
    
    return await http
      .post("/api/size", {
        sizeId: data.sizeId,
        sizeName: data.sizeName,
        activeYn: data.activeYn,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  deleteSize = async (id) => {
    
    return await http.delete("/api/size/" + id);
  };

  getSize = async () => {
    
    return await http.get("/api/size");
  };

  getSizeById = async (searchBy) => {
    

    return await http.get("/api/size/" + searchBy);
  };
}
export default new sizeService();
