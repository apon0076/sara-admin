import http from "../../utils/httpClient";

class homePageSliderService {
  createHomePageSlider = async (data) => {
    
    return await http.post("/api/HomePageSlider", {
      sliderId: data.sliderId,
      sliderName: data.sliderName,
      description: data.description,
      url: data.url,
      displayOrder: data.displayOrder,
      imageName: data.imageName,
      sliderImage: data.sliderImage,
      imageType: data.imageType,
      activeYn: data.activeYn,
    });
  };

  deleteHomePageSlider = async (data) => {
    
    return await http.delete(
      `/api/HomePageSlider/${data.id}/${data.imageName}`
    );
  };

  getHomePageSlider = async () => {
    

    return await http.get("/api/HomePageSlider");
  };

  getHomePageSliderById = async (searchBy) => {
    

    return await http.get("/api/HomePageSlider/" + searchBy);
  };
}
export default new homePageSliderService();
