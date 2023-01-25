import http from "../../utils/httpClient";

class activeBreadcrumbsProductCategoryService {
    getActiveBreadcrumbsProductCategory = async () => {
        return await http.get("api/Category/GetCategory?isActive=Y&IsDeleted=N&getAll=Y");
    };
}
export default new activeBreadcrumbsProductCategoryService();