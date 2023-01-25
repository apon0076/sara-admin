import http from "../../utils/httpClient"

class realtimeDataService {
  getRealtimeData = async (barcode) => {
    return await http.get(`http://192.168.2.231/api/RealTimeInventory/${barcode}`)
  }
}
export default new realtimeDataService()
