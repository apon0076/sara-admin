import http from "../../utils/httpClient";

class secondaryImageService {
  createSecondaryImage = async (data) => {
    
    return await http
      .post("/api/SecondaryImage", {
        imageId: data.imageId,
        productId: data.productId,
        firstImageName: data.firstImageName,
        secondImageName: data.secondImageName,
        thirdImageName: data.thirdImageName,
        fourthImageName: data.fourthImageName,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  deleteSecondaryImage = async (
    id,
    firstImageName,
    secondImageName,
    thirdImageName,
    fourthImageName
  ) => {
    
    return await http.delete(
      `/api/SecondaryImage/${id}/${firstImageName}/${secondImageName}/${thirdImageName}/${fourthImageName}`
    );
  };

  getSecondaryImage = async () => {
    
    return await http.get("/api/SecondaryImage");
  };

  getSecondaryImageById = async (searchBy) => {
    
    return await http.get(`/api/SecondaryImage/${searchBy}`);
  };
}
export default new secondaryImageService();
