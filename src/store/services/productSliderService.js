import http from "../../utils/httpClient";

class productSliderService {
  createProductSlider = async (data) => {
    
    return await http
      .post("/api/productslider", {
        sliderId: data.sliderId,
        sliderName: data.sliderName,
        imageName: data.imageName,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  deleteProductSlider = async (data) => {
    
    return await http.delete(`/api/productslider/${data.id}/${data.imageName}`);
  };

  getProductSlider = async () => {
    
    return await http.get("/api/productslider");
  };

  getProductSliderById = async (searchBy) => {
    
    return await http.get("/api/productslider/" + searchBy);
  };
}
export default new productSliderService();
