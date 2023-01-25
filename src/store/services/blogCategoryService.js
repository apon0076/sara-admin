import http from "../../utils/httpClient"

class blogService {
  createOrUpdateBlogCategory = async (data) => {
    return await http.post("/api/Content/AddOrUpdateCategory", {
      blogCategoryId: data.blogCategoryId,
      blogCategoryName: data.blogCategoryName,
      metaKeywords: data.metaKeywords,
      metaDescription: data.metaDescription,
      metaAuthor: null,
      status: "Y",
      isActive: data.isActive,
      ip: null,
      featureImagePath: data.featureImagePath,
    })
  }

  getBlogCategory = async () => {
    return await http.get("/api/Content/GetCategory")
  }
}
export default new blogService()
