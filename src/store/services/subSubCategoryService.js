import http from "../../utils/httpClient";

class SubSubCategoryService {
  createSubSubCategory = async (data) => {
    
    return await http.post("/api/subsubcategory", {
      subSubCategoryId: data.subSubCategoryId,
      subSubCategoryName: data.subSubCategoryName,
      subCategoryId: data.subCategoryId,
      categoryId: data.categoryId,
      activeYn: data.activeYn,
    });
  };

  deleteSubSubCategory = async (id) => {
    return await http.delete("api/subsubcategory/" + id);
  };

  getSubSubCategory = async () => {
    return await http.get("api/subsubcategory");
  };

  getSubSubCategoryById = async (id) => {
    return await http.get("api/subsubcategory/" + id);
  };

  getSubSubCategoryById = async (searchBy) => {
    return await http.get("api/subsubcategory/" + searchBy);
  };
}
export default new SubSubCategoryService();
