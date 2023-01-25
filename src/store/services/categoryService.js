import http from "../../utils/httpClient";

class categoryService {
  createCategory = async (data) => {
    return await http.post("/api/Category",data);
  };

  deleteCategory = async (data) => {
    return await http.post("/api/Category", {
      categoryId: data.categoryId,
      categoryName: data.categoryName,
      metaKeywords: data.metaKeywords,
      metaTitle: data.metaTitle,
      description: data.description,
      metaDescription: data.metaDescription,
      parentCategoryId: data.parentCategoryId,
      productImagePath: data.productImagePath,
      pageSize: 0,
      showOnHomepage: data.showOnHomepage,
      includeInTopMenu: data.includeInTopMenu,
      isDeleted: data.isDeleted,
      displayOrder: 0,
      isActive: data.isActive,
      isProduct: data.isProduct,
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => Promise.reject("Failed!", err));
  };

  authenticateUser = async () => {
    return (
      (await localStorage.getItem("x-access-token")) &&
      localStorage.getItem("x-access-token-expiration") > Date.now()
    );
  };

  deauthenticateUser = async () => {
    (await localStorage.removeItem("x-access-token")) &&
      localStorage.getItem("x-access-token-expiration");
    window.location = window.location.origin + "/";
  };

  saveToken = async (token) => {
    (await localStorage.setItem("x-access-token", token)) &&
      localStorage.getItem("x-access-token-expiration");
  };

  getToken = (async) => {
    return localStorage.getItem("x-access-token");
  };

  retrieveToken = (async) => {
    return this.getToken();
  };

  retriveEmployeeId = (async) => {
    return this.getEmployeeId();
  };

  retriveRoleId = (async) => {
    return this.getRoleId();
  };

  getCategory = async () => {
    return await http.get("/api/Category/GetCategory?getAll=Y");
  };

  getCategoryById = async (searchBy) => {
    return await http.get("/api/Category/" + searchBy);
  };

  getEmployeeId = (async) => {
    return localStorage.getItem("x-access-employeeId");
  };

  getRoleId = (async) => {
    return localStorage.getItem("x-access-roleId");
  };
}

export default new categoryService();
