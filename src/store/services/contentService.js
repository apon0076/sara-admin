import http from "../../utils/httpClient";

class contentService {
    createOrUpdateContentType = async (data) => {
    return await http
      .post("/api/Content/AddOrEditContentType", data)
      .then((response) => {
        return response;
      })
      .catch((err) => Promise.reject("Authorization Failed!", err));
  };

  getContentType = async () => {
    return await http.get(`/api/Content/GetContentType?getAll=Y`);
  };

  createOrUpdateContentPost = async (data) => {
    return await http
      .post("/api/Content/AddOrEditContent", data)
      .then((response) => {
        return response;
      })
      .catch((err) => Promise.reject("Authorization Failed!", err));
  };

  getContentPost = async () => {
    return await http.get(`/api/Content/GetPageContent?getAll=Y`);
  };
}
export default new contentService();
