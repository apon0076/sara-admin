import http from "../../utils/httpClient"

class regionService {
    getAddressOneApi = async () => {
        return await http.get("/api/Customer/GetAddressOneApi")
    }
}

export default new regionService()
