import http from "../../utils/httpClient";

class measurementChartService {
  createMeasurementChart = async (data) => {
    
    return await http
      .post("/api/measurementchart", {
        mesurementChartId: data.mesurementChartId,
        categoryId: data.categoryId,
        subCategoryId: data.subCategoryId,
        imageName: data.imageName,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  deleteMeasurementChart = async (id) => {
    
    return await http.delete("/api/measurementchart/" + id);
  };

  getMeasurementChart = async () => {
    
    return await http.get("/api/measurementchart");
  };

  getMeasurementChartById = async (searchBy) => {
    
    return await http.get("/api/measurementchart/" + searchBy);
  };
}
export default new measurementChartService();
