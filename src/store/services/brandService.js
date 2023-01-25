import http from "../../utils/httpClient"

class brandService {
  createBrand = async (data) => {

    return await http.post("/api/Brand/CreateBrand", {
      brandId: data.brandId,
      brandName: data.brandName,
      brandDetails: data.brandDetails,
      isActive: data.isActive,
      brandLogoUrl: data.brandLogoUrl,
      productBrandCategoryMap: data.productBrandCategoryMap
    })
  }

  deleteBrand = async (id) => {
    return await http.delete("/api/Brand/" + id)
  }

  getBrand = async () => {
    return await http.get("/api/Brand/GetBrand?getAll=Y")
  }

  getBrandById = async (searchBy) => {
    return await http.get("/api/Brand/" + searchBy)
  }
}
export default new brandService()
