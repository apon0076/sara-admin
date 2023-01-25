import http from "../../utils/httpClient";

class invoiceService {
  getInvoice = async () => {
    return await http.get("/api/order/getInvoice");
  };

  getInvoiceById = async (searchBy) => {
    //////debugger;
    return await http.get("/api/order/getInvoiceById/" + searchBy);
  };
}
export default new invoiceService();
