import http from '../../../utils/httpClient'

export class AdsList {
  getAdsRecord = async () => {
    return await http.get('/api/Content/GetContent').then((res) => res.data)
  }
}
