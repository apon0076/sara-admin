import http from "../../utils/httpClient";

class popUpService {
  createPopUp = async (data) => {
    
    return await http
      .post("/api/popup", {
        bannerId: data.bannerId,
        bannerName: data.bannerName,
        imageName: data.imageName,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  deletePopUp = async (data) => {
    

    return await http.delete(`/api/popup/${data.id}/${data.imageName}`);
  };

  getPopUp = async () => {
    
    return await http.get("/api/popup");
  };

  getPopUpById = async (searchBy) => {
    

    return await http.get("/api/popup/" + searchBy);
  };
}
export default new popUpService();
