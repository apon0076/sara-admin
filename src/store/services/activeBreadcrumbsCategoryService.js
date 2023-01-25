import http from "../../utils/httpClient";

class activeBreadcrumbsCategoryService {
    getActiveBreadcrumbsCategory = async () => {
        return await http.get("/api/Category/GetCategory?isActive=Y&getAll=Y");
    };
}

export default new activeBreadcrumbsCategoryService();
