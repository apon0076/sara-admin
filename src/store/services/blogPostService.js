import http from "../../utils/httpClient"

class blogPostService {
    createOrUpdateBlogPost = async (data) => {
        return await http.post("/api/Content/AddOrUpdateBlogPost", {
            postId: data.postId,
            postCategoryId: data.postCategoryId,
            postTitle: data.postTitle,
            postDescription: data.postDescription,
            featureImagePath: data.featureImagePath,
            publishDatetime: data.publishDatetime,
            metaKeywords: data.metaKeywords,
            metaDescription: data.metaDescription,
            metaAuthor: data.metaAuthor,
            externalLink: data.externalLink,
            status: data.status,
            isActive: data.isActive,
            ip: data.ip
        })
    }

    getBlogPost = async () => {
        return await http.get("/api/Content/GetBlogPost?getAll=y")
    }
}

export default new blogPostService()