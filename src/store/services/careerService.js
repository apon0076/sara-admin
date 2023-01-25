import http from "../../utils/httpClient";
class careerService {
  postJobCircular = async (data) => {
    return await http.post(
      `/api/Administrator/AddOrEditCareerCirculation`,
      data
    );
  };
  listOfJobCircular = async (
    startDate,
    endDate,
    position,
    isActive,
    currentPage,
    itemPerPage
  ) => {
    return await http.get(
      `/api/Administrator/GetCareerCirculation?startDate=${startDate}&endDate=${endDate}&position=${position}&isActive=${isActive}&currentPage=${currentPage}&itemsPerPage=${itemPerPage}`
    );
  };
  singleJobCircular = async (id) => {
    return await http.get(
      `/api/Administrator/GetCareerCirculation?careerCirculationId=${id}`
    );
  };
  getApplicantList = async (
    startDate,
    endDate,
    id,
    position,
    name,
    phone,
    email,
    currentPage,
    itemPerPage
  ) => {
    return await http.get(
      `/api/Administrator/GetCareerCirculationApply?startDate=${startDate}&endDate=${endDate}&circulationId=${id}&position=${position}&name=${name}&mobileNo=${phone}&email=${email}&currentPage=${currentPage}&itemsPerPage=${itemPerPage}`
    );
  };
}
export default new careerService();
