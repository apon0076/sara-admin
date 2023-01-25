import http from '../../utils/httpClient'

class paymentMethodService {
  createOrUpdatePaymentMethod = async (data) => {
    return await http.post('/api/Payment/CreateOrUpdatePaymentMethodName', data)
  }

  getPaymentMethod = async () => {
    return await http.get('/api/Payment/GetPaymentMethod?getAll=Y')
  }
  
  createOrderPaymentManual = async (data) => {
    return await http.post('/api/Payment/OrderPaymentManual', data)
  }
}

export default new paymentMethodService()
