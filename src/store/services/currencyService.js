import http from '../../utils/httpClient'

class currencyService {
  createCurrencyRate = async (data) => {
    return await http.post('/api/Currency/CurrencyRateBulInsert', data)
  }

  getCurrencyRate = async () => {
    return await http.get('/api/Currency/Get')
  }
}

export default new currencyService()
