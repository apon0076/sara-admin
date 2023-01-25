import http from "../../utils/httpClient"

class designationService {
  getDesignation = async () => {
    return await http.get("/api/Master/GetDesignation")
  }
}

export default new designationService()
