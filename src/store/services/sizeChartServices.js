import http from "../../utils/httpClient";

class sizeChartService {
  // Create Size Chart Attributes
  createOrUpdateSizeChartAttribute = async (data) => {
    return await http.post("/api/SizeChart/AddOrEditSizeCharAttribute", data);
  };
  // Get and Filters Size Chart Attributes
  getSizeChartAttribute = async (currentPage, itemsPerPage, name) => {
    return await http.get(
      `/api/SizeChart/GetSizeChartAttribute?name=${name}&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}`
    );
  };
  // Get All Size Chart Attributes
  getAllSizeChartAttribute = async () => {
    return await http.get(`/api/SizeChart/GetSizeChartAttribute?getAll=Y`);
  };
  // Get Single Size Chart Attribute Id Wise
  getSingleSizeChartAttribute = async (attributeId) => {
    return await http.get(
      `/api/SizeChart/GetSizeChartAttribute?id=${attributeId}`
    );
  };
  //Add of Update Size Chart Template
  AddOrEditSizeChart = async (data) => {
    return await http.post("/api/SizeChart/AddOrEditSizeChart", data);
  };
  //Get Size Chart Template
  getSizeChartTemplate = async (
    currentPage,
    itemPerPage,
    templateNameApi,
    templateCodeApi,
    isInternationalApi,
    isActiveApi
  ) => {
    return await http.get(
      `/api/SizeChart/GetSizeChart?name=${templateNameApi}&code=${templateCodeApi}&isSizeInt=${
        isInternationalApi === null || isInternationalApi === undefined
          ? ""
          : isInternationalApi
      }&isActive=${
        isActiveApi === null || isActiveApi === undefined ? "" : isActiveApi
      }&currentPage=${currentPage}&itemsPerPage=${itemPerPage}`
    );
  };
  //Get Size Chart Template
  getSingleSizeChartTemplate = async (id) => {
    return await http.get(`/api/SizeChart/GetSizeChart?id=${id}`);
  };
  // Get Seller Wise Size Chart List
  getSellerWiseSizeChartList = async (shopId) => {
    return await http.get(`/api/SizeChart/GetSizeChart?shopId=${shopId}&getAll=Y`);
  };

    //Get Size Chart Summary Template
    getSizeChartSummaryTemplate = async (categoryId) => {
      return await http.get(`/api/SizeChart/GetSizeChartSummary?categoryId=${categoryId}&getAll=Y`);
    };

}
export default new sizeChartService();
