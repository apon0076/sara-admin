import http from "../../utils/httpClient";

class breadcrumbsCategoryService {
  deleteBreadcrumbsCategory = async (id) => {
    return await http.delete("/api/Category/GetBreadcrumbsCategory/" + id);
  };

  getBreadcrumbsCategory = async () => {
    return await http.get("/api/Category/GetBreadcrumbsCategory/");
  };
}
export default new breadcrumbsCategoryService();
