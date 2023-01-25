import http from "../../utils/httpClient";

class subcategoryService {
  createSubCategory = async (data) => {
    
    return await http.post("/api/subcategory", {
      subCategoryId: data.subCategoryId,
      subCategoryName: data.subCategoryName,
      categoryId: data.categoryId,
      activeYn: data.activeYn,
    });
  };

  deleteSubCategory = async (id) => {
    
    return await http.delete("/api/subCategory/" + id);
  };

  getSubCategory = async () => {
    
    return await http.get("/api/subCategory");
  };

  getSubCategoryById = async (id) => {
    
    return await http.get("/api/subCategory/" + id);
  };

  searchSubCategories = async (id) => {
    
    return await http.get("/api/SubCategory/SearchSubCategories/" + id);
  };

  getSubCategoryByCategory = async (id) => {
    
    return await http.get("/api/SubCategory/GetSubCategoryByCategory/" + id);
  };
}
export default new subcategoryService();
